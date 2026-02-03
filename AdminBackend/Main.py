from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow Frontend To Access API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Goodwill Admin Backend Is Running!"}

# Example: Teachers API
@app.get("/teachers")
def get_teachers():
    return [
        {
            "name": "Mrs. Anjali Sharma",
            "subject": "Mathematics",
            "bio": "Senior Mathematics Teacher With 15+ Years Of Experience.",
            "photo": "/Assets/Teachers/anjali-sharma.jpg"
        },
        {
            "name": "Mr. Rajesh Kumar",
            "subject": "Science",
            "bio": "Passionate About Practical Science And Student Engagement.",
            "photo": "/Assets/Teachers/rajesh-kumar.jpg"
        }
    ]


# Academic Calendar Events
@app.get("/calendar-events")
def get_calendar_events():
    return [
        {"date": "2026-02-10", "title": "Annual Exam - Class X", "type": "Exam"},
        {"date": "2026-02-15", "title": "Sports Day", "type": "Event"},
        {"date": "2026-02-20", "title": "Holiday - Guru Ravidas Jayanti", "type": "Holiday"},
        {"date": "2026-02-25", "title": "Parent-Teacher Meeting", "type": "Meeting"}
    ]

# Notices
@app.get("/notices")
def get_notices():
    return [
        {"title": "School Reopens", "date": "2026-03-01", "content": "School Will Reopen On March 1st."},
        {"title": "Annual Sports Day", "date": "2026-02-15", "content": "Join Us For Sports Day!"}
    ]

# Gallery
@app.get("/gallery")
def get_gallery():
    return [
        {"image": "/Assets/Gallery/sports-day.jpg", "caption": "Sports Day Highlights"},
        {"image": "/Assets/Gallery/annual-exam.jpg", "caption": "Annual Exam"}
    ]

# Admin Login (Dummy)
@app.post("/admin/login")
def admin_login(username: str, password: str):
    # Replace With Real Authentication
    if username == "Admin" and password == "Password":
        return {"success": True, "token": "Dummy-Token"}
    return {"success": False}