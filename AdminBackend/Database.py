from sqlalchemy import create_engine, Column, Integer, String, Text, Date, DateTime, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

SQLALCHEMY_DATABASE_URL = "sqlite:///./AdminBackend/Database.db"

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Database Models
class Student(Base):
    __tablename__ = "students"
    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(String, unique=True, index=True)
    name = Column(String, index=True)
    class_name = Column(String)
    section = Column(String)
    roll_no = Column(String)
    father_name = Column(String, nullable=True)
    mother_name = Column(String, nullable=True)
    dob = Column(String, nullable=True)
    contact = Column(String)
    email = Column(String, nullable=True)
    address = Column(String, nullable=True)
    status = Column(String, default="Active")
    created_at = Column(DateTime, default=datetime.utcnow)

class Teacher(Base):
    __tablename__ = "teachers"
    id = Column(Integer, primary_key=True, index=True)
    teacher_id = Column(String, unique=True, index=True)
    name = Column(String, index=True)
    subject = Column(String)
    qualification = Column(String)
    experience = Column(String)
    contact = Column(String, nullable=True)
    email = Column(String, nullable=True)
    photo = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class Notice(Base):
    __tablename__ = "notices"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    content = Column(Text)
    date = Column(Date)
    status = Column(String, default="Active")
    category = Column(String, default="General")
    attachment = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class GalleryImage(Base):
    __tablename__ = "gallery_images"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    url = Column(String)
    date = Column(Date)
    category = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class ExamResult(Base):
    __tablename__ = "exam_results"
    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(String, index=True)
    name = Column(String)
    class_name = Column(String)
    section = Column(String)
    exam_type = Column(String)
    marks_json = Column(Text)  # Store Marks As JSON String
    percentage = Column(Integer)
    grade = Column(String)
    rank = Column(Integer)
    created_at = Column(DateTime, default=datetime.utcnow)

class TCRequest(Base):
    __tablename__ = "tc_requests"
    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(String, index=True)
    name = Column(String)
    class_name = Column(String)
    section = Column(String)
    reason = Column(Text)
    request_date = Column(Date)
    status = Column(String, default="Pending")
    tc_document = Column(String, nullable=True)  # TC attachment for approved requests
    created_at = Column(DateTime, default=datetime.utcnow)

class CalendarEvent(Base):
    __tablename__ = "calendar_events"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text, nullable=True)
    event_date = Column(Date)
    event_type = Column(String, default="General")  # General, Holiday, Exam, etc.
    created_at = Column(DateTime, default=datetime.utcnow)
    start_time = Column(String, nullable=True)
    end_time = Column(String, nullable=True)
    location = Column(String, nullable=True)

class FeeRule(Base):
    __tablename__ = "fee_rules"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    category = Column(String, default="Fee")  # Fee or Rule
    amount = Column(String, nullable=True)  # For fee entries
    attachment = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class ContactMessage(Base):
    __tablename__ = "contact_messages"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String)
    phone = Column(String, nullable=True)
    subject = Column(String)
    message = Column(Text)
    status = Column(String, default="Unread")  # Unread, Read, Replied
    created_at = Column(DateTime, default=datetime.utcnow)

class Appointment(Base):
    __tablename__ = "appointments"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String)
    phone = Column(String)
    date = Column(Date)
    time = Column(String)
    purpose = Column(Text)
    status = Column(String, default="Pending")
    created_at = Column(DateTime, default=datetime.utcnow)

class Admission(Base):
    __tablename__ = "admissions"
    id = Column(Integer, primary_key=True, index=True)
    application_id = Column(String, unique=True, index=True)
    name = Column(String, index=True)
    class_name = Column(String)
    dob = Column(Date)
    father_name = Column(String)
    mother_name = Column(String, default="")
    contact = Column(String)
    email = Column(String, default="")
    address = Column(String, default="")
    status = Column(String, default="Pending")
    applied_date = Column(Date)
    created_at = Column(DateTime, default=datetime.utcnow)

class Admin(Base):
    __tablename__ = "admins"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    name = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

# Create All Tables
Base.metadata.create_all(bind=engine)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
