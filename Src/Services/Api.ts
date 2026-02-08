// API Service For Backend Communication
const API_BASE_URL = 'http://localhost:8000/api';

// Helper Function For API Calls
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'An Error Occurred' }));
    throw new Error(error.detail || `HTTP Error! Status : ${response.status}`);
  }

  return response.json();
}

// Auth API
export const authAPI = {
  login: (email: string, password: string) =>
    apiCall<{ success: boolean; email: string; name: string }>('/admin/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
};

// Students API
export interface Student {
  id?: number;
  student_id: string;
  name: string;
  class: string;
  section: string;
  roll_no: string;
  father_name: string;
  mother_name: string;
  dob: string;
  contact: string;
  email: string;
  address: string;
  status: string;
}

export const studentsAPI = {
  getAll: () => apiCall<Student[]>('/students'),
  create: (student: Omit<Student, 'id'>) =>
    apiCall<Student>('/students', {
      method: 'POST',
      body: JSON.stringify(student),
    }),
  delete: (id: number) =>
    apiCall<{ message: string }>(`/students/${id}`, {
      method: 'DELETE',
    }),
  update: (id: number | string, student: Partial<Student>) =>
    apiCall<Student>(`/students/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(student),
    }),
};

// Teachers API
export interface Teacher {
  id?: number;
  teacher_id: string;
  name: string;
  subject: string;
  qualification: string;
  experience: string;
  contact?: string;
  email?: string;
  photo?: string;
}

export const teachersAPI = {
  getAll: () => apiCall<Teacher[]>('/teachers'),
  getAllPublic: () => apiCall<Teacher[]>('/public/teachers'),
  create: (teacher: Omit<Teacher, 'id' | 'teacher_id'>) =>
    apiCall<Teacher>('/teachers', {
      method: 'POST',
      body: JSON.stringify(teacher),
    }),
  update: (id: string, teacher: Partial<Teacher>) =>
    apiCall<{ message: string }>(`/teachers/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(teacher),
    }),
  delete: (id: string) =>
    apiCall<{ message: string }>(`/teachers/${id}`, {
      method: 'DELETE',
    }),
};

// Notices API
export interface Notice {
  id?: number;
  title: string;
  content: string;
  date: string;
  status: string;
  category: string;
  attachment?: string;
}

export const noticesAPI = {
  getAll: () => apiCall<Notice[]>('/notices'),
  getAllPublic: () => apiCall<Notice[]>('/public/notices'),
  create: (notice: Omit<Notice, 'id'>) =>
    apiCall<Notice>('/notices', {
      method: 'POST',
      body: JSON.stringify(notice),
      headers: { 'Content-Type': 'application/json' },
    }),
  update: (id: number, notice: Partial<Notice>) =>
    apiCall<{ message: string }>(`/notices/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(notice),
      headers: { 'Content-Type': 'application/json' },
    }),
  createWithAttachment: (formData: FormData) =>
    fetch(`${API_BASE_URL}/notices/upload`, {
      method: 'POST',
      body: formData,
    }).then(async res => {
      if (!res.ok) throw new Error((await res.json()).detail || 'Failed To Upload');
      return res.json();
    }),
  delete: (id: number) =>
    apiCall<{ message: string }>(`/notices/${id}`, {
      method: 'DELETE',
    }),
};

// Gallery API
export interface GalleryImage {
  id?: number;
  title: string;
  image_url: string;
  date: string;
  category: string;
}

export const galleryAPI = {
  getAll: () => apiCall<GalleryImage[]>('/gallery'),
  getAllPublic: () => apiCall<GalleryImage[]>('/public/gallery'),
  create: (image: Omit<GalleryImage, 'id'>) =>
    apiCall<GalleryImage>('/gallery', {
      method: 'POST',
      body: JSON.stringify(image),
    }),
  delete: (id: number) =>
    apiCall<{ message: string }>(`/gallery/${id}`, {
      method: 'DELETE',
    }),
};

// Exam Results API
export interface ExamResult {
  id?: number;
  student_id: string;
  student_name: string;
  class: string;
  section?: string;
  exam_type: string;
  marks_json: string;
  percentage: number;
  grade: string;
  rank: number;
}

// Backend Expects Different Field Names For Creation
export interface ResultCreate {
  student_id: string;
  name: string;
  class_name: string;
  section: string;
  exam_type: string;
  marks: Record<string, number>;  // Object, Not JSON String
  percentage: number;
  grade: string;
  rank: number;
}

export const resultsAPI = {
  getAll: () => apiCall<ExamResult[]>('/results'),
  getByStudentAndExam: (studentId: string, examType: string) =>
    apiCall<ExamResult | null>(`/results/${studentId}/${examType}`),
  create: (result: ResultCreate) =>
    apiCall<ExamResult>('/results', {
      method: 'POST',
      body: JSON.stringify(result),
    }),
};

// TC Requests API
export interface TCRequest {
  id?: number;
  student_id: string;
  student_name: string;
  class: string;
  section?: string;
  reason: string;
  request_date: string;
  status: string;
  tcDocument?: string;
}

export const tcRequestsAPI = {
  getAll: () => apiCall<TCRequest[]>('/tc-requests'),
  create: (request: { student_id: string, student_name: string, class: string, reason: string, request_date: string }) =>
    apiCall<{ message: string; id: number }>('/tc-requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        student_id: request.student_id,
        name: request.student_name,
        class: request.class,
        reason: request.reason,
        request_date: request.request_date
      }),
    }),
  updateStatus: (id: number, status: string) =>
    apiCall<TCRequest>(`/tc-requests/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
};

// Appointments API
export interface Appointment {
  id?: number;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  purpose: string;
  status: string;
  notes?: string;
}

export const appointmentsAPI = {
  getAll: () => apiCall<Appointment[]>('/appointments'),
  create: (appointment: Omit<Appointment, 'id'>) =>
    apiCall<Appointment>('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointment),
    }),
  updateStatus: (id: number, status: string, notes?: string) =>
    apiCall<Appointment>(`/appointments/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status, notes }),
    }),
};

// Admissions API
export interface Admission {
  id?: number;
  application_id: string;
  student_name: string;
  class: string;
  dob: string;
  father_name: string;
  mother_name: string;
  contact: string;
  email: string;
  address: string;
  status: string;
  notes?: string;
  applied_date?: string;
}

export const admissionsAPI = {
  getAll: () => apiCall<Admission[]>('/admissions'),
  updateStatus: (id: number, status: string, notes?: string) =>
    apiCall<Admission>(`/admissions/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status, notes }),
    }),
};

// Calendar Events API
export interface CalendarEvent {
  id?: number;
  title: string;
  description?: string;
  event_date: string;
  event_type: string;
}

export const calendarEventsAPI = {
  getAll: () => apiCall<CalendarEvent[]>('/calendar-events'),
  getAllPublic: () => apiCall<CalendarEvent[]>('/public/calendar-events'),
  create: (event: Omit<CalendarEvent, 'id'>) =>
    apiCall<{ message: string; id: number }>('/calendar-events', {
      method: 'POST',
      body: JSON.stringify(event),
    }),
  delete: (id: number) =>
    apiCall<{ message: string }>(`/calendar-events/${id}`, {
      method: 'DELETE',
    }),
};

// Fee & Rules API
export interface FeeRule {
  id?: number;
  title: string;
  description: string;
  category: string;
  amount?: string;
  attachment?: string;
}

export const feeRulesAPI = {
  getAll: () => apiCall<FeeRule[]>('/fee-rules'),
  getAllPublic: (category?: string) => 
    apiCall<FeeRule[]>(`/public/fee-rules${category ? `?category=${category}` : ''}`),
  createWithAttachment: (formData: FormData) =>
    fetch(`${API_BASE_URL}/fee-rules/upload`, {
      method: 'POST',
      body: formData,
    }).then(async res => {
      if (!res.ok) throw new Error((await res.json()).detail || 'Failed to upload');
      return res.json();
    }),
  delete: (id: number) =>
    apiCall<{ message: string }>(`/fee-rules/${id}`, {
      method: 'DELETE',
    }),
};

// Contact Messages API
export interface ContactMessage {
  id?: number;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status?: string;
  created_at?: string;
}

export const contactMessagesAPI = {
  getAll: () => apiCall<ContactMessage[]>('/contact-messages'),
  create: (message: Omit<ContactMessage, 'id' | 'status' | 'created_at'>) =>
    apiCall<{ message: string; id: number }>('/contact-messages', {
      method: 'POST',
      body: JSON.stringify(message),
    }),
  updateStatus: (id: number, status: string) =>
    apiCall<{ message: string }>(`/contact-messages/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
  delete: (id: number) =>
    apiCall<{ message: string }>(`/contact-messages/${id}`, {
      method: 'DELETE',
    }),
};

// TC Requests API (Enhanced)
export const tcRequestsAPIEnhanced = {
  ...tcRequestsAPI,
  approveTCRequest: (id: number, tcDocument?: File) => {
    const formData = new FormData();
    if (tcDocument) {
      formData.append('tc_document', tcDocument);
    }
    return fetch(`${API_BASE_URL}/tc-requests/${id}/approve`, {
      method: 'PATCH',
      body: formData,
    }).then(async res => {
      if (!res.ok) throw new Error((await res.json()).detail || 'Failed To Approve');
      return res.json();
    });
  },
  getTCDownload: (id: number) =>
    apiCall<{ tc_document: string }>(`/tc-requests/${id}/download`),
};
