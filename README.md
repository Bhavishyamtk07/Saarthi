<p align="center">
  <h1 align="center">🎯 Saarthi AI</h1>
  <p align="center">
    <strong>AI-Powered Career Counselling Platform for Indian School Students</strong>
  </p>
  <p align="center">
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#architecture">Architecture</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#api-documentation">API Docs</a> •
    <a href="#deployment">Deployment</a>
  </p>
</p>

---

## 📌 Overview

**Saarthi AI** is a full-stack AI-powered career counselling platform designed specifically for **Indian school students (Class 8-12)**. It combines psychometric assessments with AI-driven analysis to provide personalized career recommendations, dynamic roadmaps, and real-time mentorship through an intelligent chatbot.

The platform uses **Holland Code (RIASEC)**, **MBTI**, and **Big Five personality** models to evaluate students and match them with ideal career paths — complete with salary estimates, demand forecasts, and step-by-step roadmaps.

---

## ✨ Features

### 🧠 AI Career Assessment
- **Adaptive questionnaires** based on class level (8th, 9th, 10th, 11th, 12th)
- **Holland Code (RIASEC)** personality analysis
- **MBTI-type** personality profiling
- **Big Five** personality trait scoring
- AI confidence scoring with detailed personality breakdown

### 🎯 Career Matching Engine
- 11+ career paths with detailed data (salary, demand, growth, AI risk)
- Trait-based matching algorithm with Holland Code integration
- Stream recommendations (Science PCM/PCB, Commerce, Arts)
- Top Indian college recommendations per career

### 🗺️ Dynamic Career Roadmaps
- Step-by-step career roadmaps with timelines
- Curated learning resources (free & paid)
- Specialized roadmaps for AI/ML, Data Science, Medicine, and more

### 🤖 AI Career Mentor (Chatbot)
- Powered by **OpenAI GPT** with intelligent fallback responses
- Career counselling, exam tips, college guidance
- Scholarship information and emotional support
- Indian context-aware (₹ salary, Indian exams, local colleges)

### 📊 Student Dashboard
- Assessment history and results tracking
- Personality trait visualization
- Career match analytics

### 🔐 Authentication
- JWT-based secure authentication
- User registration and login
- Role-based access control

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 18** | UI Framework |
| **Vite 5** | Build Tool & Dev Server |
| **Tailwind CSS 3** | Styling |
| **Framer Motion** | Animations |
| **Recharts** | Data Visualization |
| **React Router v6** | Client-side Routing |
| **React Icons** | Icon Library |
| **React Hot Toast** | Notifications |

### Backend
| Technology | Purpose |
|---|---|
| **Spring Boot 2.7** | Java REST API Framework |
| **Spring Security** | Authentication & Authorization |
| **Spring Data JPA** | Database ORM |
| **H2 Database** | Development Database |
| **MySQL** | Production Database (optional) |
| **JWT (JSON Web Tokens)** | Stateless Authentication |
| **Maven** | Dependency Management |

### AI Microservice
| Technology | Purpose |
|---|---|
| **Python 3.13+** | Runtime |
| **FastAPI** | Async REST API Framework |
| **scikit-learn** | Machine Learning |
| **NumPy / SciPy** | Numerical Computing |
| **LangChain** | LLM Integration |
| **OpenAI API** | AI Chatbot Responses |
| **Uvicorn** | ASGI Server |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    SAARTHI AI PLATFORM                   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Frontend    │  │   Backend    │  │  AI Service   │  │
│  │  React+Vite   │  │ Spring Boot  │  │   FastAPI     │  │
│  │  Port: 5173   │──│  Port: 8080  │──│  Port: 8000   │  │
│  │              │  │              │  │              │  │
│  │  • Pages     │  │  • REST APIs │  │  • RIASEC    │  │
│  │  • Components│  │  • JWT Auth  │  │  • MBTI      │  │
│  │  • Services  │  │  • JPA/H2    │  │  • Big Five   │  │
│  │  • Routing   │  │  • Security  │  │  • Chatbot    │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Project Structure

```
SaarthiWebsite/
├── src/                          # Frontend (React)
│   ├── components/
│   │   ├── Navbar.jsx            # Navigation bar
│   │   ├── Footer.jsx            # Footer component
│   │   ├── ParticleBackground.jsx# Animated background
│   │   └── FloatingChatButton.jsx# Chat widget trigger
│   ├── pages/
│   │   ├── Home.jsx              # Landing page
│   │   ├── CareerTest.jsx        # AI assessment quiz
│   │   ├── Results.jsx           # Assessment results
│   │   ├── Dashboard.jsx         # Student dashboard
│   │   ├── ExploreCareer.jsx     # Career explorer
│   │   ├── Roadmap.jsx           # Career roadmap viewer
│   │   ├── AIMentor.jsx          # AI chatbot page
│   │   ├── Login.jsx             # Login page
│   │   ├── Register.jsx          # Registration page
│   │   ├── About.jsx             # About page
│   │   └── Contact.jsx           # Contact page
│   ├── services/                 # API service layer
│   ├── App.jsx                   # Root component & routes
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Global styles
│
├── backend/                      # Backend (Spring Boot)
│   └── src/main/java/com/saarthi/
│       ├── SaarthiApplication.java
│       ├── config/               # Security, JWT, CORS config
│       ├── controller/
│       │   ├── AuthController.java
│       │   ├── AssessmentController.java
│       │   ├── CareerController.java
│       │   ├── ChatController.java
│       │   └── DashboardController.java
│       ├── model/
│       │   ├── User.java
│       │   ├── Assessment.java
│       │   ├── TestResult.java
│       │   ├── ChatMessage.java
│       │   ├── CareerRecommendation.java
│       │   └── Roadmap.java
│       ├── dto/                  # Data Transfer Objects
│       ├── repository/           # JPA Repositories
│       ├── service/              # Business Logic
│       └── util/                 # Utility classes
│
├── ai-service/                   # AI Microservice (Python)
│   ├── main.py                   # FastAPI app & endpoints
│   ├── career_engine.py          # RIASEC/MBTI/Big Five engine
│   ├── chatbot.py                # AI chatbot with fallbacks
│   ├── requirements.txt          # Python dependencies
│   └── .env                      # API keys (not committed)
│
├── package.json                  # Frontend dependencies
├── vite.config.js                # Vite configuration
├── tailwind.config.js            # Tailwind CSS config
└── index.html                    # HTML entry point
```

---

## 🚀 Getting Started

### Prerequisites

| Tool | Version | Download |
|---|---|---|
| **Node.js** | 18+ | [nodejs.org](https://nodejs.org) |
| **Java JDK** | 8+ | [adoptium.net](https://adoptium.net) |
| **Python** | 3.13+ | [python.org](https://python.org/downloads) |
| **Maven** | 3.8+ | [maven.apache.org](https://maven.apache.org) |
| **Git** | Latest | [git-scm.com](https://git-scm.com) |

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/SaarthiAI.git
cd SaarthiAI
```

#### 2. Frontend Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```
Frontend runs at: **http://localhost:5173**

#### 3. Backend Setup

```bash
cd backend

# Build and run
mvn spring-boot:run
```
Backend runs at: **http://localhost:8080**

#### 4. AI Service Setup

```bash
cd ai-service

# Install Python dependencies
pip install -r requirements.txt

# Configure environment variables
# Copy .env.example to .env and add your API keys
cp .env.example .env

# Start the AI service
python main.py
```
AI Service runs at: **http://localhost:8000**

### Environment Variables

Create a `.env` file in the `ai-service/` directory:

```env
# AI API Keys (get one or both)
OPENAI_API_KEY=your_openai_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here

# Model Configuration
AI_MODEL=gpt-3.5-turbo

# Server Port
PORT=8000
```

**Getting API Keys:**
- **Gemini (Free):** [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
- **OpenAI (Paid):** [platform.openai.com/api-keys](https://platform.openai.com/api-keys)

> ⚠️ **Never commit your `.env` file to Git.** Add it to `.gitignore`.

---

## 📡 API Documentation

### Backend API (Port 8080)

#### Authentication
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login and get JWT token |

#### Assessments
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/assessments/submit` | Submit career assessment |
| `GET` | `/api/assessments/history` | Get assessment history |

#### Careers
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/careers` | Get all career data |
| `GET` | `/api/careers/{id}` | Get career details |

#### Chat
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/chat/send` | Send message to AI mentor |

#### Dashboard
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/dashboard` | Get dashboard data |

---

### AI Microservice API (Port 8000)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Service status |
| `GET` | `/health` | Health check |
| `POST` | `/evaluate` | Evaluate career assessment |
| `POST` | `/chat` | AI chatbot response |
| `POST` | `/roadmap` | Generate career roadmap |
| `GET` | `/careers` | Get all career data |

#### Example: Evaluate Assessment

```bash
curl -X POST http://localhost:8000/evaluate \
  -H "Content-Type: application/json" \
  -d '{
    "classLevel": "12",
    "answers": {
      "q1": "I love solving math puzzles",
      "q2": "Technology excites me",
      "q3": "I enjoy coding"
    }
  }'
```

#### Example Response

```json
{
  "hollandCode": "IRE",
  "mbtiType": "INTJ",
  "mbtiDescription": "The Architect — strategic, analytical...",
  "analytical": 85,
  "creative": 62,
  "social": 48,
  "technical": 90,
  "leadership": 55,
  "careerMatches": [
    {
      "title": "AI/ML Engineer",
      "match": 94,
      "salary": "₹8-25 LPA",
      "demand": "Very High"
    }
  ],
  "aiSummary": "You exhibit a strong Technical personality..."
}
```

---

## 🌐 Deployment

### Recommended Setup

| Component | Platform | URL |
|---|---|---|
| Frontend (React) | **Vercel** | `saarthi-ai.vercel.app` |
| Backend (Spring Boot) | **Render** | `saarthi-api.onrender.com` |
| AI Service (Python) | **Render** | `saarthi-ai-service.onrender.com` |

### Deploy Frontend to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy Backend to Render

1. Push code to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your repository
4. Set build command: `cd backend && mvn clean package -DskipTests`
5. Set start command: `java -jar backend/target/*.jar`

### Deploy AI Service to Render

1. Create a new Web Service on Render
2. Set root directory: `ai-service`
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables (API keys)

---

## 🧪 Running All Services

Open **3 separate terminal windows** and run:

```bash
# Terminal 1 — AI Service (Python)
cd ai-service && python main.py

# Terminal 2 — Backend (Spring Boot)
cd backend && mvn spring-boot:run

# Terminal 3 — Frontend (React)
npm run dev
```

Then open **http://localhost:5173** in your browser! 🎉

---

## 📸 Screenshots

> Coming soon — screenshots of the platform UI.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author
