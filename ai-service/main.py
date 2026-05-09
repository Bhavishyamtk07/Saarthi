"""
Saarthi AI - Career Assessment Evaluation Engine
Uses Holland Code (RIASEC), MBTI-like analysis, and Big Five personality traits
to evaluate student career assessments and generate recommendations.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any, List, Optional
import numpy as np
from dotenv import load_dotenv
import os
import json

from career_engine import CareerEvaluationEngine
from chatbot import CareerChatbot

load_dotenv()

app = FastAPI(
    title="Saarthi AI Microservice",
    description="AI-powered career counselling evaluation engine",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

engine = CareerEvaluationEngine()
chatbot = CareerChatbot()


# ==================== Request/Response Models ====================

class AssessmentSubmission(BaseModel):
    classLevel: str
    answers: Dict[str, Any]
    timeTakenSeconds: Optional[int] = None

class ChatRequest(BaseModel):
    message: str
    userId: Optional[int] = None
    context: Optional[str] = None

class RoadmapRequest(BaseModel):
    careerTitle: str
    classLevel: Optional[str] = "12"
    currentSkills: Optional[List[str]] = []


# ==================== Endpoints ====================

@app.get("/")
def root():
    return {"service": "Saarthi AI Microservice", "status": "running", "version": "1.0.0"}


@app.get("/health")
def health():
    return {"status": "healthy"}


@app.post("/evaluate")
def evaluate_assessment(submission: AssessmentSubmission):
    """Evaluate a career assessment and return AI-generated personality analysis & career matches."""
    try:
        result = engine.evaluate(submission.classLevel, submission.answers)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/chat")
def chat(request: ChatRequest):
    """AI career mentor chatbot endpoint."""
    try:
        response = chatbot.get_response(request.message, request.userId)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/roadmap")
def generate_roadmap(request: RoadmapRequest):
    """Generate a dynamic career roadmap."""
    try:
        roadmap = engine.generate_roadmap(request.careerTitle, request.classLevel)
        return roadmap
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/careers")
def get_career_data():
    """Return all career data with demand forecasts."""
    return engine.get_all_careers()


if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
