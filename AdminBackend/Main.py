from fastapi import Body
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, date
import json
from passlib.context import CryptContext

from .Database import (
    get_db, Student, Teacher, Notice, GalleryImage, ExamResult,
    TCRequest, Appointment, Admission, Admin, engine, Base
)

# Create Tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Goodwill School Admin API")

# Enable CORS For All Origins (For Development)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or ["http://localhost:8080"] For Stricter Security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Password Hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

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
    teacher_id: str
    name: str
    subject: str
    qualification: str
    experience: str
    contact: str

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
    return [{"id": t.teacher_id, "name": t.name, "subject": t.subject, "qualification": t.qualification,
             "experience": t.experience, "contact": t.contact} for t in teachers]

@app.post("/api/teachers")
def create_teacher(teacher: TeacherCreate, db: Session = Depends(get_db)):
    db_teacher = Teacher(**teacher.dict())
    db.add(db_teacher)
    db.commit()
    return {"message": "Teacher Created"}

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
@app.get("/api/notices")
def get_notices(db: Session = Depends(get_db)):
    notices = db.query(Notice).order_by(Notice.date.desc()).all()
    return [{"id": n.id, "title": n.title, "content": n.content, 
             "date": n.date.isoformat(), "status": n.status} for n in notices]

@app.post("/api/notices")
def create_notice(notice: NoticeCreate, db: Session = Depends(get_db)):
    db_notice = Notice(**notice.dict(), status="Active")
    db.add(db_notice)
    db.commit()
    return {"message": "Notice Created"}

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
    return [{"id": r.id, "studentId": r.student_id, "name": r.name, "class": r.class_name,
             "section": r.section, "reason": r.reason, "requestDate": r.request_date.isoformat(),
             "status": r.status} for r in requests]

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
    return [{"name": t.name, "subject": t.subject, "photo": t.photo or ""} for t in teachers]

@app.get("/api/public/notices")
def get_public_notices(db: Session = Depends(get_db)):
    notices = db.query(Notice).filter(Notice.status == "Active").order_by(Notice.date.desc()).limit(5).all()
    return [{"title": n.title, "date": n.date.isoformat(), "content": n.content} for n in notices]

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
