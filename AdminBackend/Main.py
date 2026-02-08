from fastapi import Body
from fastapi import FastAPI, Depends, HTTPException, status, UploadFile, File, Form
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional
import os
from datetime import datetime, date
import json
from passlib.context import CryptContext
from .Database import (
    get_db, Student, Teacher, Notice, GalleryImage, ExamResult,
    TCRequest, Appointment, Admission, Admin, CalendarEvent, FeeRule, ContactMessage, engine, Base
)
# Create Tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Goodwill School Admin API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
UPLOAD_DIR = os.path.join(os.path.dirname(__file__), "Uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)
app.mount("/Static", StaticFiles(directory=UPLOAD_DIR), name="Static")
@app.post("/api/notices/upload")
def create_notice_with_attachment(
    title: str = Form(...),
    content: str = Form(...),
    category: str = Form(...),
    status: str = Form(...),
    date: str = Form(...),
    attachment: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    attachment_path = None
    if attachment:
        filename = f"notice_{int(datetime.utcnow().timestamp())}_{attachment.filename}"
        file_path = os.path.join(UPLOAD_DIR, filename)
        with open(file_path, "wb") as f:
            f.write(attachment.file.read())
        attachment_path = filename
    db_notice = Notice(
        title=title,
        content=content,
        category=category,
        status=status,
        date=datetime.strptime(date, "%Y-%m-%d").date(),
        attachment=attachment_path
    )
    db.add(db_notice)
    db.commit()
    db.refresh(db_notice)
    return {"message": "Notice Created", "id": db_notice.id, "attachment": attachment_path}

# Pydantic Models
class StudentCreate(BaseModel):
    student_id: str
    name: str
    class_name: str = ""
    section: str = ""
    roll_no: str = ""
    contact: Optional[str] = ""
    father_name: Optional[str] = ""
    mother_name: Optional[str] = ""
    dob: Optional[str] = ""
    email: Optional[str] = ""
    address: Optional[str] = ""
    status: Optional[str] = "Active"

class StudentUpdate(BaseModel):
    name: Optional[str] = None
    class_name: Optional[str] = None
    section: Optional[str] = None
    roll_no: Optional[str] = None
    contact: Optional[str] = None
    father_name: Optional[str] = None
    mother_name: Optional[str] = None
    dob: Optional[str] = None
    email: Optional[str] = None
    address: Optional[str] = None
    status: Optional[str] = None

# PATCH Endpoint For Updating A Student (By Numeric ID)
@app.patch("/api/students/{id}")
def update_student(id: int, update: StudentUpdate = Body(...), db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.id == id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student Not Found")
    update_data = update.dict(exclude_unset=True)
    for key, value in update_data.items():
        # Map 'class_name' To Model Field
        if key == "class_name":
            setattr(student, "class_name", value)
        else:
            setattr(student, key, value)
    db.commit()
    db.refresh(student)
    return {"message": "Student Updated"}

class TeacherCreate(BaseModel):
    teacher_id: str = None
    name: str
    subject: str
    qualification: str
    experience: str
    contact: str = None
    email: Optional[str] = None
    phone: Optional[str] = None
    joining_date: Optional[str] = None
    photo: Optional[str] = None

class NoticeCreate(BaseModel):
    title: str
    content: str
    date: date

class GalleryImageCreate(BaseModel):
    title: str
    image_url: str
    date: date
    category: Optional[str] = ""

class ResultCreate(BaseModel):
    student_id: str
    name: str
    class_name: str
    section: str
    exam_type: str
    marks: dict
    percentage: int
    grade: str
    rank: int

class TCRequestUpdate(BaseModel):
    status: str

class AppointmentCreate(BaseModel):
    name: str
    email: str
    phone: str
    date: date
    time: str
    purpose: str

class AppointmentUpdate(BaseModel):
    status: str

class AdmissionUpdate(BaseModel):
    status: str

class AdminLogin(BaseModel):
    email: str
    password: str

# Initialize Demo Admin
def init_demo_admin(db: Session):
    admin = db.query(Admin).filter(Admin.email == "admin@goodwill.edu.in").first()
    if not admin:
        hashed = pwd_context.hash("admin123")
        admin = Admin(email="admin@goodwill.edu.in", hashed_password=hashed, name="Admin")
        db.add(admin)
        db.commit()

# Startup Event
@app.on_event("startup")
def startup_event():
    db = next(get_db())
    init_demo_admin(db)

# Root
@app.get("/")
def read_root():
    return {"message": "Goodwill School Admin API Running", "version": "1.0"}

# ====================
# AUTH ENDPOINTS
# ====================
@app.post("/api/admin/login")
def admin_login(login: AdminLogin, db: Session = Depends(get_db)):
    admin = db.query(Admin).filter(Admin.email == login.email).first()
    if not admin or not pwd_context.verify(login.password, admin.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid Credentials")
    return {"success": True, "email": admin.email, "name": admin.name}

# ====================
# STUDENTS ENDPOINTS
# ====================
@app.get("/api/students")
def get_students(db: Session = Depends(get_db)):
    students = db.query(Student).all()
    return [
        {
            "id": s.id,
            "student_id": s.student_id,
            "name": s.name,
            "class": s.class_name,
            "section": s.section,
            "roll_no": s.roll_no,
            "father_name": getattr(s, "father_name", ""),
            "mother_name": getattr(s, "mother_name", ""),
            "dob": getattr(s, "dob", ""),
            "contact": s.contact,
            "email": getattr(s, "email", ""),
            "address": getattr(s, "address", ""),
            "status": s.status
        }
        for s in students
    ]

@app.post("/api/students")
def create_student(student: StudentCreate, db: Session = Depends(get_db)):
    # Map all fields explicitly to avoid missing/extra fields
    data = student.dict()
    db_student = Student(
        student_id=data.get("student_id"),
        name=data.get("name"),
        class_name=data.get("class_name") or data.get("class"),
        section=data.get("section"),
        roll_no=data.get("roll_no"),
        father_name=data.get("father_name"),
        mother_name=data.get("mother_name"),
        dob=data.get("dob"),
        contact=data.get("contact"),
        email=data.get("email"),
        address=data.get("address"),
        status=data.get("status", "Active")
    )
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return {"message": "Student Created", "id": db_student.id}

@app.delete("/api/students/{id}")
def delete_student(id: int, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.id == id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student Not Found")
    db.delete(student)
    db.commit()
    return {"message": "Student Deleted"}

# ====================
# TEACHERS ENDPOINTS
# ====================
@app.get("/api/teachers")
def get_teachers(db: Session = Depends(get_db)):
    teachers = db.query(Teacher).all()
    return [{
        "id": t.id,
        "teacher_id": t.teacher_id,
        "name": t.name,
        "subject": t.subject,
        "qualification": t.qualification,
        "experience": t.experience,
        "contact": t.contact,
        "email": t.email,
        "photo": t.photo
    } for t in teachers]

@app.post("/api/teachers")
def create_teacher(teacher: TeacherCreate, db: Session = Depends(get_db)):
    data = teacher.dict(exclude_unset=True)
    # Auto-Generate teacher_id If Not Provided Or Empty
    if not data.get("teacher_id") or data.get("teacher_id") == "":
        import uuid
        data["teacher_id"] = str(uuid.uuid4())
    
    # Check If Teacher_id Already Exists
    existing = db.query(Teacher).filter(Teacher.teacher_id == data["teacher_id"]).first()
    if existing:
        raise HTTPException(status_code=400, detail="Teacher ID Already Exists")
    
    db_teacher = Teacher(
        teacher_id=data["teacher_id"],
        name=data["name"],
        subject=data["subject"],
        qualification=data["qualification"],
        experience=data["experience"],
        contact=data.get("contact"),
        email=data.get("email"),
        photo=data.get("photo") or data.get("photo_url")
    )
    db.add(db_teacher)
    db.commit()
    db.refresh(db_teacher)
    return {"message": "Teacher Created", "teacher_id": db_teacher.teacher_id}

@app.patch("/api/teachers/{teacher_id}")
def update_teacher(teacher_id: str, teacher: TeacherCreate, db: Session = Depends(get_db)):
    db_teacher = db.query(Teacher).filter(Teacher.teacher_id == teacher_id).first()
    if not db_teacher:
        raise HTTPException(status_code=404, detail="Teacher Not Found")
    
    data = teacher.dict(exclude_unset=True)
    for key, value in data.items():
        setattr(db_teacher, key, value)
    
    db.commit()
    db.refresh(db_teacher)
    return {"message": "Teacher Updated", "teacher_id": db_teacher.teacher_id}

@app.delete("/api/teachers/{teacher_id}")
def delete_teacher(teacher_id: str, db: Session = Depends(get_db)):
    teacher = db.query(Teacher).filter(Teacher.teacher_id == teacher_id).first()
    if not teacher:
        raise HTTPException(status_code=404, detail="Teacher Not Found")
    db.delete(teacher)
    db.commit()
    return {"message": "Teacher Deleted"}

# ====================
# NOTICES ENDPOINTS
# ====================

from pydantic import BaseModel
class NoticeUpdate(BaseModel):
    title: str = None
    content: str = None
    category: str = None
    status: str = None
    date: str = None

@app.get("/api/notices")
def get_notices(db: Session = Depends(get_db)):
    notices = db.query(Notice).order_by(Notice.date.desc()).all()
    return [{
        "id": n.id,
        "title": n.title,
        "content": n.content,
        "category": getattr(n, "category", None),
        "status": n.status,
        "date": n.date.isoformat() if n.date else None,
        "attachment": getattr(n, "attachment", None)
    } for n in notices]

@app.patch("/api/notices/{notice_id}")
def update_notice(notice_id: int, update: NoticeUpdate, db: Session = Depends(get_db)):
    notice = db.query(Notice).filter(Notice.id == notice_id).first()
    if not notice:
        raise HTTPException(status_code=404, detail="Notice Not Found")
    update_data = update.dict(exclude_unset=True)
    # Convert date string to date object if present
    if "date" in update_data and isinstance(update_data["date"], str):
        from datetime import datetime
        try:
            update_data["date"] = datetime.strptime(update_data["date"], "%Y-%m-%d").date()
        except Exception:
            raise HTTPException(status_code=400, detail="Invalid date format. Use YYYY-MM-DD.")
    for key, value in update_data.items():
        setattr(notice, key, value)
    db.commit()
    db.refresh(notice)
    return {"message": "Notice Updated"}


@app.delete("/api/notices/{notice_id}")
def delete_notice(notice_id: int, db: Session = Depends(get_db)):
    notice = db.query(Notice).filter(Notice.id == notice_id).first()
    if not notice:
        raise HTTPException(status_code=404, detail="Notice Not Found")
    db.delete(notice)
    db.commit()
    return {"message": "Notice Deleted"}

# ====================
# GALLERY ENDPOINTS
# ====================
@app.get("/api/gallery")
def get_gallery(db: Session = Depends(get_db)):
    images = db.query(GalleryImage).order_by(GalleryImage.date.desc()).all()
    return [{"id": i.id, "title": i.title, "image_url": i.url, 
             "date": i.date.isoformat(), "category": i.category or ""} for i in images]

@app.post("/api/gallery")
def create_gallery_image(image: GalleryImageCreate, db: Session = Depends(get_db)):
    db_image = GalleryImage(
        title=image.title,
        url=image.image_url,
        date=image.date,
        category=image.category
    )
    db.add(db_image)
    db.commit()
    db.refresh(db_image)
    return {"id": db_image.id, "title": db_image.title, "image_url": db_image.url,
            "date": db_image.date.isoformat(), "category": db_image.category or ""}

@app.delete("/api/gallery/{image_id}")
def delete_gallery_image(image_id: int, db: Session = Depends(get_db)):
    image = db.query(GalleryImage).filter(GalleryImage.id == image_id).first()
    if not image:
        raise HTTPException(status_code=404, detail="Gallery Image Not Found")
    db.delete(image)
    db.commit()
    return {"message": "Gallery Image Deleted"}

# ====================
# RESULTS ENDPOINTS
# ====================
@app.get("/api/results")
def get_results(db: Session = Depends(get_db)):
    results = db.query(ExamResult).all()
    return [{"id": str(r.id), "student_id": r.student_id, "student_name": r.name, "class": r.class_name,
             "section": r.section, "exam_type": r.exam_type, "marks_json": r.marks_json, "percentage": r.percentage,
             "grade": r.grade, "rank": r.rank} for r in results]

@app.get("/api/results/{student_id}/{exam_type}")
def get_result_by_student(student_id: str, exam_type: str, db: Session = Depends(get_db)):
    result = db.query(ExamResult).filter(
        ExamResult.student_id == student_id,
        ExamResult.exam_type == exam_type
    ).first()
    if not result:
        return None
    return {
        "student_id": result.student_id,
        "student_name": result.name,
        "class": result.class_name,
        "section": result.section,
        "exam_type": result.exam_type,
        "marks_json": result.marks_json,
        "percentage": result.percentage,
        "grade": result.grade,
        "rank": result.rank
    }

@app.post("/api/results")
def create_result(result: ResultCreate, db: Session = Depends(get_db)):
    db_result = ExamResult(
        student_id=result.student_id,
        name=result.name,
        class_name=result.class_name,
        section=result.section,
        exam_type=result.exam_type,
        marks_json=json.dumps(result.marks),
        percentage=result.percentage,
        grade=result.grade,
        rank=result.rank
    )
    db.add(db_result)
    db.commit()
    return {"message": "Result Created"}

# ====================
# TC REQUESTS ENDPOINTS
# ====================
@app.get("/api/tc-requests")
def get_tc_requests(db: Session = Depends(get_db)):
    requests = db.query(TCRequest).all()
    return [{
        "id": r.id,
        "student_id": r.student_id,
        "student_name": r.name,
        "class": r.class_name,
        "section": r.section,
        "reason": r.reason,
        "request_date": r.request_date.isoformat() if r.request_date else None,
        "status": r.status,
        "tcDocument": r.tc_document
    } for r in requests]

@app.post("/api/tc-requests")
def create_tc_request(
    student_id: str = Body(...),
    name: str = Body(...),
    class_name: str = Body(..., alias="class"),
    reason: str = Body(...),
    request_date: date = Body(...),
    db: Session = Depends(get_db)
):
    tc_request = TCRequest(
        student_id=student_id,
        name=name,
        class_name=class_name,
        section="",
        reason=reason,
        request_date=request_date
    )
    db.add(tc_request)
    db.commit()
    db.refresh(tc_request)
    return {"message": "TC Request Created", "id": tc_request.id}

@app.patch("/api/tc-requests/{request_id}")
def update_tc_request(request_id: int, update: TCRequestUpdate, db: Session = Depends(get_db)):
    request = db.query(TCRequest).filter(TCRequest.id == request_id).first()
    if not request:
        raise HTTPException(status_code=404, detail="TC Request Not Found")
    request.status = update.status
    db.commit()
    return {"message": "TC Request Updated"}

# ====================
# APPOINTMENTS ENDPOINTS
# ====================
@app.get("/api/appointments")
def get_appointments(db: Session = Depends(get_db)):
    appointments = db.query(Appointment).all()
    return [{"id": a.id, "name": a.name, "email": a.email, "phone": a.phone,
             "date": a.date.isoformat(), "time": a.time, "purpose": a.purpose,
             "status": a.status} for a in appointments]

@app.post("/api/appointments")
def create_appointment(appointment: AppointmentCreate, db: Session = Depends(get_db)):
    db_appointment = Appointment(**appointment.dict())
    db.add(db_appointment)
    db.commit()
    return {"message": "Appointment Created", "id": db_appointment.id}

@app.patch("/api/appointments/{appointment_id}")
def update_appointment(appointment_id: int, update: AppointmentUpdate, db: Session = Depends(get_db)):
    appointment = db.query(Appointment).filter(Appointment.id == appointment_id).first()
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment Not Found")
    appointment.status = update.status
    db.commit()
    return {"message": "Appointment Updated"}

# ====================
# ADMISSIONS ENDPOINTS
# ====================
from pydantic import BaseModel
class AdmissionCreate(BaseModel):
    student_name: str
    dob: str  # Will Convert To Date In Endpoint
    class_name: str
    father_name: str
    mother_name: str = ""
    contact: str
    email: str
    address: str

@app.post("/api/admissions")
def create_admission(admission: AdmissionCreate, db: Session = Depends(get_db)):
    # Convert Dob String To Date Object
    try:
        dob_date = datetime.strptime(admission.dob, "%Y-%m-%d").date()
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid Date Format For Dob. Use YYYY-MM-DD.")
    new_admission = Admission(
        application_id = f"APP{int(datetime.utcnow().timestamp())}",
        name = admission.student_name,
        class_name = admission.class_name,
        dob = dob_date,
        father_name = admission.father_name,
        mother_name = admission.mother_name,
        contact = admission.contact,
        email = admission.email,
        address = admission.address,
        status = "Pending",
        applied_date = datetime.utcnow().date()
    )
    db.add(new_admission)
    db.commit()
    db.refresh(new_admission)
    return {"message": "Application Submitted", "application_id": new_admission.application_id}

@app.get("/api/admissions")
def get_admissions(db: Session = Depends(get_db)):
    admissions = db.query(Admission).all()
    return [
        {
            "id": a.id,
            "application_id": a.application_id,
            "student_name": a.name,
            "class": a.class_name,
            "dob": a.dob.isoformat() if a.dob else None,
            # Show mother_name If father_name Is Empty
            "father_name": a.father_name if a.father_name else "-",
            "mother_name": a.mother_name if a.mother_name else "-",
            "contact": a.contact,
            "email": a.email,
            "address": a.address,
            "status": a.status,
            "applied_date": a.applied_date.isoformat() if a.applied_date else "-"
        }
        for a in admissions
    ]

@app.patch("/api/admissions/{admission_id}")
def update_admission(admission_id: int, update: AdmissionUpdate, db: Session = Depends(get_db)):
    admission = db.query(Admission).filter(Admission.id == admission_id).first()
    if not admission:
        raise HTTPException(status_code=404, detail="Admission Not Found")
    admission.status = update.status
    db.commit()
    return {"message": "Admission Updated"}

# ====================
# PUBLIC ENDPOINTS (For Main Site)
# ====================
@app.get("/api/public/teachers")
def get_public_teachers(db: Session = Depends(get_db)):
    teachers = db.query(Teacher).all()
    return [{
        "id": t.teacher_id,
        "teacher_id": t.teacher_id,
        "name": t.name,
        "subject": t.subject,
        "qualification": t.qualification,
        "experience": t.experience,
        "contact": t.contact,
        "email": t.email,
        "photo": t.photo
    } for t in teachers]

@app.get("/api/public/notices")
def get_public_notices(db: Session = Depends(get_db)):
    notices = db.query(Notice).filter(Notice.status.in_(["Active", "Important"])).order_by(Notice.date.desc()).limit(5).all()
    return [
        {
            "id": n.id,
            "title": n.title,
            "content": n.content,
            "date": n.date.isoformat() if n.date else None,
            "status": n.status,
            "category": n.category if hasattr(n, "category") else None,
            "attachment": n.attachment if hasattr(n, "attachment") else None
        }
        for n in notices
    ]

@app.get("/api/public/gallery")
def get_public_gallery(db: Session = Depends(get_db)):
    images = db.query(GalleryImage).order_by(GalleryImage.date.desc()).all()
    return [
        {
            "id": i.id,
            "title": i.title,
            "image_url": i.url,
            "date": i.date.isoformat() if i.date else None,
            "category": i.category or ""
        }
        for i in images
    ]

# ====================
# CALENDAR EVENTS
# ====================

class CalendarEventCreate(BaseModel):
    title: str
    description: Optional[str] = None
    event_date: date
    event_type: str = "General"

@app.get("/api/calendar-events")
def get_calendar_events(db: Session = Depends(get_db)):
    events = db.query(CalendarEvent).order_by(CalendarEvent.event_date.desc()).all()
    return [{
        "id": e.id,
        "title": e.title,
        "description": e.description,
        "event_date": e.event_date.isoformat() if e.event_date else None,
        "event_type": e.event_type
    } for e in events]

@app.post("/api/calendar-events")
def create_calendar_event(event: CalendarEventCreate, db: Session = Depends(get_db)):
    db_event = CalendarEvent(
        title=event.title,
        description=event.description,
        event_date=event.event_date,
        event_type=event.event_type
    )
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return {"message": "Event Created", "id": db_event.id}

@app.delete("/api/calendar-events/{event_id}")
def delete_calendar_event(event_id: int, db: Session = Depends(get_db)):
    event = db.query(CalendarEvent).filter(CalendarEvent.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event Not Found")
    db.delete(event)
    db.commit()
    return {"message": "Event Deleted"}

@app.get("/api/public/calendar-events")
def get_public_calendar_events(db: Session = Depends(get_db)):
    events = db.query(CalendarEvent).order_by(CalendarEvent.event_date.desc()).limit(10).all()
    return [{
        "id": e.id,
        "title": e.title,
        "description": e.description,
        "event_date": e.event_date.isoformat() if e.event_date else None,
        "event_type": e.event_type
    } for e in events]

# ====================
# FEE & RULES
# ====================

class FeeRuleCreate(BaseModel):
    title: str
    description: str
    category: str = "Fee"
    amount: Optional[str] = None

@app.get("/api/fee-rules")
def get_fee_rules(db: Session = Depends(get_db)):
    items = db.query(FeeRule).all()
    return [{
        "id": f.id,
        "title": f.title,
        "description": f.description,
        "category": f.category,
        "amount": f.amount,
        "attachment": f.attachment
    } for f in items]

@app.post("/api/fee-rules/upload")
async def create_fee_rule_with_attachment(
    title: str = Form(...),
    description: str = Form(...),
    category: str = Form("Fee"),
    amount: Optional[str] = Form(None),
    attachment: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    attachment_url = None
    if attachment:
        file_content = await attachment.read()
        file_path = os.path.join(UPLOAD_DIR, attachment.filename)
        with open(file_path, "wb") as f:
            f.write(file_content)
        attachment_url = f"/Static/{attachment.filename}"
    
    db_item = FeeRule(
        title=title,
        description=description,
        category=category,
        amount=amount,
        attachment=attachment_url
    )
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return {"message": "Created Successfully", "id": db_item.id}

@app.delete("/api/fee-rules/{item_id}")
def delete_fee_rule(item_id: int, db: Session = Depends(get_db)):
    item = db.query(FeeRule).filter(FeeRule.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item Not Found")
    db.delete(item)
    db.commit()
    return {"message": "Deleted Successfully"}

@app.get("/api/public/fee-rules")
def get_public_fee_rules(category: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(FeeRule)
    if category:
        query = query.filter(FeeRule.category == category)
    items = query.all()
    return [{
        "id": f.id,
        "title": f.title,
        "description": f.description,
        "category": f.category,
        "amount": f.amount,
        "attachment": f.attachment
    } for f in items]

# ====================
# CONTACT MESSAGES
# ====================

class ContactMessageCreate(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    subject: str
    message: str

@app.get("/api/contact-messages")
def get_contact_messages(db: Session = Depends(get_db)):
    messages = db.query(ContactMessage).order_by(ContactMessage.created_at.desc()).all()
    return [{
        "id": m.id,
        "name": m.name,
        "email": m.email,
        "phone": m.phone,
        "subject": m.subject,
        "message": m.message,
        "status": m.status,
        "created_at": m.created_at.isoformat() if m.created_at else None
    } for m in messages]

@app.post("/api/contact-messages")
def create_contact_message(message: ContactMessageCreate, db: Session = Depends(get_db)):
    db_message = ContactMessage(
        name=message.name,
        email=message.email,
        phone=message.phone,
        subject=message.subject,
        message=message.message
    )
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return {"message": "Message Sent Successfully", "id": db_message.id}

@app.patch("/api/contact-messages/{message_id}")
def update_contact_message_status(message_id: int, status: str = Body(..., embed=True), db: Session = Depends(get_db)):
    message = db.query(ContactMessage).filter(ContactMessage.id == message_id).first()
    if not message:
        raise HTTPException(status_code=404, detail="Message Not Found")
    message.status = status
    db.commit()
    return {"message": "Status Updated"}

@app.delete("/api/contact-messages/{message_id}")
def delete_contact_message(message_id: int, db: Session = Depends(get_db)):
    message = db.query(ContactMessage).filter(ContactMessage.id == message_id).first()
    if not message:
        raise HTTPException(status_code=404, detail="Message Not Found")
    db.delete(message)
    db.commit()
    return {"message": "Message Deleted"}

# ====================
# TC REQUESTS WITH ATTACHMENT
# ====================

@app.patch("/api/tc-requests/{request_id}/approve")
async def approve_tc_request(
    request_id: int,
    tc_document: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    tc_request = db.query(TCRequest).filter(TCRequest.id == request_id).first()
    if not tc_request:
        raise HTTPException(status_code=404, detail="TC Request Not Found")
    
    tc_request.status = "Approved"
    
    if tc_document:
        file_content = await tc_document.read()
        file_path = os.path.join(UPLOAD_DIR, tc_document.filename)
        with open(file_path, "wb") as f:
            f.write(file_content)
        tc_request.tc_document = f"/Static/{tc_document.filename}"
    
    db.commit()
    db.refresh(tc_request)
    return {"message": "TC Request Approved", "tc_document": tc_request.tc_document}

@app.get("/api/tc-requests/{request_id}/download")
def get_tc_download(request_id: int, db: Session = Depends(get_db)):
    tc_request = db.query(TCRequest).filter(TCRequest.id == request_id).first()
    if not tc_request:
        raise HTTPException(status_code=404, detail="TC Request Not Found")
    if tc_request.status != "Approved" or not tc_request.tc_document:
        raise HTTPException(status_code=403, detail="TC Not Available")
    return {"tc_document": tc_request.tc_document}

