/**
 * Saarthi AI — API Service Layer
 * Connects React frontend to Spring Boot backend
 */

const API_BASE = '/api';

// ==================== Token Management ====================

export function getToken() {
  return localStorage.getItem('saarthi_token');
}

export function setToken(token) {
  localStorage.setItem('saarthi_token', token);
}

export function removeToken() {
  localStorage.removeItem('saarthi_token');
  localStorage.removeItem('saarthi_user');
}

export function getStoredUser() {
  const user = localStorage.getItem('saarthi_user');
  return user ? JSON.parse(user) : null;
}

export function setStoredUser(user) {
  localStorage.setItem('saarthi_user', JSON.stringify(user));
}

// ==================== Fetch Wrapper ====================

async function apiFetch(endpoint, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    removeToken();
    window.location.href = '/login';
    throw new Error('Session expired. Please log in again.');
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.message || 'Something went wrong');
  }

  return data;
}

// ==================== Auth API ====================

export const authAPI = {
  async login(email, password, role) {
    const data = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, role }),
    });
    setToken(data.token);
    setStoredUser({ email: data.email, name: data.name, role: data.role, userId: data.userId });
    return data;
  },

  async register(formData) {
    const data = await apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    setToken(data.token);
    setStoredUser({ email: data.email, name: data.name, role: data.role, userId: data.userId });
    return data;
  },

  async verify() {
    return apiFetch('/auth/verify');
  },

  logout() {
    removeToken();
  },
};

// ==================== Assessment API ====================

export const assessmentAPI = {
  async submit(submission) {
    return apiFetch('/assessment/submit', {
      method: 'POST',
      body: JSON.stringify(submission),
    });
  },

  async getHistory() {
    return apiFetch('/assessment/history');
  },

  async getLatestResult() {
    return apiFetch('/assessment/results/latest');
  },

  async getAllResults() {
    return apiFetch('/assessment/results');
  },
};

// ==================== Chat API ====================

export const chatAPI = {
  async send(message, sessionId) {
    return apiFetch('/chat/send', {
      method: 'POST',
      body: JSON.stringify({ message, sessionId }),
    });
  },

  async getHistory() {
    return apiFetch('/chat/history');
  },
};

// ==================== Dashboard API ====================

export const dashboardAPI = {
  async getStudentDashboard() {
    return apiFetch('/dashboard/student');
  },

  async getTeacherDashboard() {
    return apiFetch('/dashboard/teacher');
  },

  async getParentDashboard() {
    return apiFetch('/dashboard/parent');
  },
};

// ==================== Career API ====================

export const careerAPI = {
  async explore() {
    return apiFetch('/careers/explore');
  },

  async getRecommended() {
    return apiFetch('/careers/recommended');
  },

  async save(careerTitle) {
    return apiFetch(`/careers/save/${encodeURIComponent(careerTitle)}`, {
      method: 'POST',
    });
  },

  async getRoadmap(careerTitle) {
    return apiFetch(`/careers/roadmap/${encodeURIComponent(careerTitle)}`);
  },
};
