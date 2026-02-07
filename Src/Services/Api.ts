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
  email: string;
  phone: string;
  joining_date: string;
  photo_url?: string;
}

export const teachersAPI = {
  getAll: () => apiCall<Teacher[]>('/teachers'),
  getAllPublic: () => apiCall<Teacher[]>('/public/teachers'),
  create: (teacher: Omit<Teacher, 'id'>) =>
    apiCall<Teacher>('/teachers', {
      method: 'POST',
      body: JSON.stringify(teacher),
    }),
  delete: (id: number) =>
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
}

export const noticesAPI = {
  getAll: () => apiCall<Notice[]>('/notices'),
  getAllPublic: () => apiCall<Notice[]>('/public/notices'),
  create: (notice: Omit<Notice, 'id'>) =>
    apiCall<Notice>('/notices', {
      method: 'POST',
      body: JSON.stringify(notice),
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
  reason: string;
  request_date: string;
  status: string;
}

export const tcRequestsAPI = {
  getAll: () => apiCall<TCRequest[]>('/tc-requests'),
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
