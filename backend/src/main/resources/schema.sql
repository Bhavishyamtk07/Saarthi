-- ================================================
-- Saarthi AI - Database Schema
-- MySQL / H2 Compatible
-- ================================================

-- Users table (students, teachers, parents, admins)
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL, -- STUDENT, TEACHER, PARENT, ADMIN
    phone VARCHAR(20),
    school VARCHAR(255),
    class_level VARCHAR(5),    -- "8", "9", "10", "11", "12"
    stream VARCHAR(50),        -- PCM, PCB, Commerce, Arts
    profile_image VARCHAR(500),
    xp_points INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Assessments (test submissions)
CREATE TABLE IF NOT EXISTS assessments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    class_level VARCHAR(5) NOT NULL,
    answers TEXT,             -- JSON string of all answers
    is_completed BOOLEAN DEFAULT FALSE,
    is_draft BOOLEAN DEFAULT FALSE,
    time_taken_seconds INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Test Results (AI-analyzed personality & career data)
CREATE TABLE IF NOT EXISTS test_results (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    assessment_id BIGINT NOT NULL,
    holland_code VARCHAR(10),    -- e.g., "RIA"
    mbti_type VARCHAR(4),        -- e.g., "INTJ"
    -- Big Five (0-100)
    openness INT,
    conscientiousness INT,
    extraversion INT,
    agreeableness INT,
    neuroticism INT,
    -- Personality dimensions (0-100)
    analytical INT,
    creative INT,
    social INT,
    technical INT,
    leadership INT,
    investigative INT,
    -- AI scores
    ai_confidence DOUBLE,
    career_matches TEXT,        -- JSON array of career matches
    strengths TEXT,             -- JSON array
    weaknesses TEXT,            -- JSON array
    ai_summary TEXT,
    recommended_stream VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (assessment_id) REFERENCES assessments(id) ON DELETE CASCADE
);

-- Career Recommendations
CREATE TABLE IF NOT EXISTS career_recommendations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    career_title VARCHAR(255) NOT NULL,
    match_percentage DOUBLE,
    overview TEXT,
    salary_range VARCHAR(100),
    demand VARCHAR(50),
    stream VARCHAR(100),
    ai_risk VARCHAR(50),
    growth_rate VARCHAR(50),
    skills TEXT,                -- JSON array
    colleges TEXT,              -- JSON array
    education VARCHAR(255),
    is_saved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Chat Messages (AI Mentor history)
CREATE TABLE IF NOT EXISTS chat_messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    session_id VARCHAR(100),
    sender VARCHAR(10) NOT NULL,  -- USER or AI
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Roadmaps (career roadmap tracking)
CREATE TABLE IF NOT EXISTS roadmaps (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    career_title VARCHAR(255) NOT NULL,
    steps TEXT,                  -- JSON array of roadmap steps
    current_step INT DEFAULT 0,
    total_steps INT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_assessments_user ON assessments(user_id);
CREATE INDEX IF NOT EXISTS idx_results_user ON test_results(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_user ON chat_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_session ON chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_user ON career_recommendations(user_id);
CREATE INDEX IF NOT EXISTS idx_roadmaps_user ON roadmaps(user_id);
