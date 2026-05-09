"""
Saarthi AI Career Mentor Chatbot
Provides career counselling, stream guidance, exam tips, emotional support,
college recommendations, and scholarship information.
Falls back to local responses when OpenAI/Gemini API is unavailable.
"""

import os
from typing import Optional

try:
    from openai import OpenAI
    HAS_OPENAI = True
except ImportError:
    HAS_OPENAI = False


SYSTEM_PROMPT = """You are Saarthi, an AI career mentor for Indian school students (Class 8-12).
You help students with:
- Career counselling and guidance
- Stream selection (Science PCM/PCB, Commerce, Arts)
- Exam preparation (JEE, NEET, UPSC, CA, CLAT, etc.)
- College recommendations across India
- Scholarship information
- Emotional support and motivation
- Skill development advice

Guidelines:
- Be warm, encouraging, and supportive
- Use Indian context (₹ for salary, Indian colleges, Indian exams)
- Provide specific, actionable advice
- Include emojis for friendliness
- Keep responses concise but helpful
- Encourage students to take the AI Career Assessment for personalized guidance
- If unsure, recommend speaking to a school counsellor
"""


FALLBACK_RESPONSES = {
    "career": (
        "Here are some excellent career paths trending in India:\n\n"
        "🤖 **AI/ML Engineer** — ₹8-25 LPA, Very High Demand\n"
        "📊 **Data Scientist** — ₹7-22 LPA, High Demand\n"
        "💻 **Software Developer** — ₹6-20 LPA, Very High Demand\n"
        "🏥 **Doctor (MBBS)** — ₹8-30 LPA, Always in Demand\n"
        "💼 **Chartered Accountant** — ₹7-20 LPA, High Demand\n"
        "⚖️ **Lawyer** — ₹5-25 LPA, High Demand\n\n"
        "Take our AI Career Assessment for personalized recommendations!"
    ),
    "stream": (
        "Choosing the right stream after 10th is crucial:\n\n"
        "📐 **Science (PCM)** — Engineering, Technology, Research\n"
        "🔬 **Science (PCB)** — Medicine, Pharmacy, Biotech\n"
        "📈 **Commerce** — Business, CA, Banking, Finance\n"
        "🎨 **Arts/Humanities** — Law, Design, Media, Civil Services\n\n"
        "Choose based on your genuine interests! What subjects excite you?"
    ),
    "exam": (
        "Exam preparation tips:\n\n"
        "📚 **NCERT First** — Master the fundamentals\n"
        "🎯 **Daily Practice** — Consistency beats intensity\n"
        "📝 **PYQs** — Solve previous year papers\n"
        "⏰ **Time Management** — Create and follow a schedule\n"
        "🧘 **Mental Health** — Take regular breaks\n\n"
        "Which exam are you preparing for? I can give specific advice!"
    ),
    "college": (
        "Top colleges by field:\n\n"
        "🏆 **Engineering**: IITs, NITs, IIITs, BITS\n"
        "🏥 **Medical**: AIIMS, CMC Vellore, JIPMER\n"
        "💼 **Commerce**: SRCC, Hindu College, Narsee Monjee\n"
        "⚖️ **Law**: NLUs (Delhi, Bangalore, Hyderabad)\n"
        "🎨 **Design**: NID, NIFT, IIT IDC\n\n"
        "What field interests you?"
    ),
    "scholarship": (
        "Major scholarships for Indian students:\n\n"
        "🏅 **KVPY** — For science students\n"
        "📝 **NTSE** — National Talent Search\n"
        "💰 **INSPIRE** — ₹80,000/year for science\n"
        "🎓 **PM Scholarship** — Defense/paramilitary wards\n"
        "📚 **State Scholarships** — Check your state portal\n"
        "🌐 **Sitaram Jindal Foundation** — Merit-based\n\n"
        "Want help with a specific scholarship application?"
    ),
    "motivation": (
        "Remember these powerful truths:\n\n"
        "💪 **Your potential is unlimited** — believe in yourself\n"
        "🎯 **Every expert was once a beginner** — keep learning\n"
        "🌟 **Failure is feedback** — learn and grow from setbacks\n"
        "⏰ **It's never too late** — start where you are\n"
        "🤝 **Ask for help** — teachers, parents, and mentors care\n\n"
        "You're already on the right path by seeking guidance! 🚀"
    ),
    "default": (
        "That's a great question! 🤔\n\n"
        "I can help you with:\n"
        "• Career options and salary info\n"
        "• Stream selection (after 10th/12th)\n"
        "• Exam preparation tips\n"
        "• College recommendations\n"
        "• Scholarship opportunities\n"
        "• Motivation and emotional support\n\n"
        "Take our **AI Career Assessment** for personalized guidance!"
    ),
}


class CareerChatbot:

    def __init__(self):
        self.client = None
        if HAS_OPENAI:
            api_key = os.getenv("OPENAI_API_KEY", "")
            if api_key and api_key != "your_openai_api_key_here":
                self.client = OpenAI(api_key=api_key)

    def get_response(self, message: str, user_id: Optional[int] = None) -> str:
        """Get AI response — tries OpenAI first, falls back to local."""
        if self.client:
            try:
                return self._call_openai(message)
            except Exception:
                pass
        return self._local_response(message)

    def _call_openai(self, message: str) -> str:
        """Call OpenAI API for response."""
        model = os.getenv("AI_MODEL", "gpt-3.5-turbo")
        response = self.client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": message},
            ],
            max_tokens=500,
            temperature=0.7,
        )
        return response.choices[0].message.content

    def _local_response(self, message: str) -> str:
        """Generate response using keyword matching."""
        lower = message.lower()

        if any(w in lower for w in ["career", "job", "salary", "profession", "field"]):
            return FALLBACK_RESPONSES["career"]
        if any(w in lower for w in ["stream", "10th", "choose", "pcm", "pcb", "commerce", "arts"]):
            return FALLBACK_RESPONSES["stream"]
        if any(w in lower for w in ["exam", "jee", "neet", "prepare", "study", "upsc"]):
            return FALLBACK_RESPONSES["exam"]
        if any(w in lower for w in ["college", "university", "admission", "iit", "aiims"]):
            return FALLBACK_RESPONSES["college"]
        if any(w in lower for w in ["scholarship", "financial", "fee", "money"]):
            return FALLBACK_RESPONSES["scholarship"]
        if any(w in lower for w in ["motivat", "stress", "anxious", "scared", "confused", "sad", "depress"]):
            return FALLBACK_RESPONSES["motivation"]

        return FALLBACK_RESPONSES["default"]
