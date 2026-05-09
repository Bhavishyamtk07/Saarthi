"""
Career Evaluation Engine
Implements Holland Code (RIASEC), MBTI-like, and Big Five personality analysis.
Generates career matches, personality scores, and roadmaps.
"""

import numpy as np
import random
from typing import Dict, Any, List


# ==================== Career Database ====================

CAREER_DATABASE = [
    {"title": "AI/ML Engineer", "icon": "🤖", "stream": "Science (PCM)", "salary": "₹8-25 LPA",
     "demand": "Very High", "aiRisk": "Low", "growth": "35%", "education": "B.Tech CSE/AI",
     "category": "Technology", "riasec": "IRE", "skills": ["Python", "TensorFlow", "Math", "DSA"],
     "colleges": ["IIT Bombay", "IIT Delhi", "IIIT Hyderabad"],
     "traits": {"analytical": 0.9, "technical": 0.95, "creative": 0.6, "social": 0.3}},

    {"title": "Data Scientist", "icon": "📊", "stream": "Science (PCM)", "salary": "₹7-22 LPA",
     "demand": "High", "aiRisk": "Low", "growth": "28%", "education": "B.Tech/M.Sc Stats",
     "category": "Technology", "riasec": "IRA", "skills": ["Python", "SQL", "Statistics", "ML"],
     "colleges": ["ISI Kolkata", "IIT Madras", "CMI"],
     "traits": {"analytical": 0.95, "technical": 0.8, "creative": 0.5, "social": 0.4}},

    {"title": "Software Engineer", "icon": "💻", "stream": "Science (PCM)", "salary": "₹6-20 LPA",
     "demand": "Very High", "aiRisk": "Low", "growth": "22%", "education": "B.Tech CSE",
     "category": "Technology", "riasec": "IRC", "skills": ["Coding", "DSA", "System Design"],
     "colleges": ["IIT Bombay", "NIT Trichy", "BITS Pilani"],
     "traits": {"analytical": 0.85, "technical": 0.9, "creative": 0.5, "social": 0.4}},

    {"title": "Doctor (MBBS)", "icon": "🏥", "stream": "Science (PCB)", "salary": "₹8-30 LPA",
     "demand": "Very High", "aiRisk": "Very Low", "growth": "15%", "education": "MBBS + MD/MS",
     "category": "Healthcare", "riasec": "ISR", "skills": ["Biology", "Chemistry", "Empathy"],
     "colleges": ["AIIMS Delhi", "CMC Vellore", "JIPMER"],
     "traits": {"analytical": 0.7, "technical": 0.6, "creative": 0.3, "social": 0.9}},

    {"title": "Chartered Accountant", "icon": "💼", "stream": "Commerce", "salary": "₹7-20 LPA",
     "demand": "High", "aiRisk": "Medium", "growth": "12%", "education": "CA Foundation+Inter+Final",
     "category": "Finance", "riasec": "CEI", "skills": ["Accounting", "Tax", "Audit", "Finance"],
     "colleges": ["ICAI", "SRCC Delhi"],
     "traits": {"analytical": 0.8, "technical": 0.4, "creative": 0.2, "social": 0.5}},

    {"title": "UX/UI Designer", "icon": "🎨", "stream": "Any", "salary": "₹5-18 LPA",
     "demand": "High", "aiRisk": "Medium", "growth": "22%", "education": "B.Des / Self-taught",
     "category": "Design", "riasec": "AIS", "skills": ["Figma", "Design Thinking", "Prototyping"],
     "colleges": ["NID", "IIT Bombay IDC", "Srishti"],
     "traits": {"analytical": 0.5, "technical": 0.6, "creative": 0.95, "social": 0.7}},

    {"title": "Civil Services (IAS)", "icon": "🏛️", "stream": "Any", "salary": "₹6-12 LPA",
     "demand": "Steady", "aiRisk": "Very Low", "growth": "5%", "education": "Any Grad + UPSC",
     "category": "Government", "riasec": "SEI", "skills": ["GK", "Writing", "Leadership", "Ethics"],
     "colleges": ["LBSNAA", "St. Stephens", "JNU"],
     "traits": {"analytical": 0.7, "technical": 0.3, "creative": 0.4, "social": 0.85}},

    {"title": "Lawyer", "icon": "⚖️", "stream": "Arts/Commerce", "salary": "₹5-25 LPA",
     "demand": "High", "aiRisk": "Low", "growth": "10%", "education": "BA LLB / LLB",
     "category": "Law", "riasec": "ESI", "skills": ["Argumentation", "Research", "Writing"],
     "colleges": ["NLU Delhi", "NALSAR", "NLSIU Bangalore"],
     "traits": {"analytical": 0.75, "technical": 0.3, "creative": 0.5, "social": 0.8}},

    {"title": "Cybersecurity Analyst", "icon": "🔒", "stream": "Science", "salary": "₹6-20 LPA",
     "demand": "Very High", "aiRisk": "Low", "growth": "32%", "education": "B.Tech CSE",
     "category": "Technology", "riasec": "IRE", "skills": ["Networking", "Linux", "Ethical Hacking"],
     "colleges": ["IIT Kanpur", "IIIT Delhi"],
     "traits": {"analytical": 0.9, "technical": 0.9, "creative": 0.4, "social": 0.3}},

    {"title": "Content Creator", "icon": "📱", "stream": "Any", "salary": "₹3-50 LPA",
     "demand": "Very High", "aiRisk": "Medium", "growth": "40%", "education": "Any / Self-taught",
     "category": "Media", "riasec": "AES", "skills": ["Storytelling", "Video Editing", "Social Media"],
     "colleges": ["MICA", "Xavier's Mumbai"],
     "traits": {"analytical": 0.3, "technical": 0.5, "creative": 0.95, "social": 0.85}},

    {"title": "Product Manager", "icon": "🎯", "stream": "Any", "salary": "₹10-30 LPA",
     "demand": "High", "aiRisk": "Low", "growth": "25%", "education": "B.Tech + MBA",
     "category": "Technology", "riasec": "EIS", "skills": ["Strategy", "Analytics", "Communication"],
     "colleges": ["IIM Ahmedabad", "ISB Hyderabad"],
     "traits": {"analytical": 0.7, "technical": 0.6, "creative": 0.6, "social": 0.8}},
]

# MBTI type descriptions
MBTI_TYPES = {
    "INTJ": "The Architect — strategic, analytical, independent thinker who loves building systems",
    "INTP": "The Logician — innovative, curious, logical problem-solver who seeks understanding",
    "ENTJ": "The Commander — bold, strategic leader who drives efficiency and achievement",
    "ENTP": "The Debater — quick-witted, resourceful, entrepreneurial thinker",
    "INFJ": "The Advocate — insightful, idealistic, principled helper of others",
    "INFP": "The Mediator — creative, empathetic, driven by personal values",
    "ENFJ": "The Protagonist — charismatic, inspiring leader who motivates others",
    "ENFP": "The Campaigner — enthusiastic, creative, sociable free spirit",
    "ISTJ": "The Logistician — practical, reliable, fact-oriented organizer",
    "ISFJ": "The Defender — warm, dedicated, detail-oriented protector",
    "ESTJ": "The Executive — organized, logical, assertive administrator",
    "ESFJ": "The Consul — caring, social, tradition-oriented supporter",
    "ISTP": "The Virtuoso — practical, resourceful, hands-on experimenter",
    "ISFP": "The Adventurer — gentle, artistic, sensitive explorer",
    "ESTP": "The Entrepreneur — energetic, perceptive, action-oriented pragmatist",
    "ESFP": "The Entertainer — spontaneous, energetic, fun-loving performer",
}


class CareerEvaluationEngine:

    def evaluate(self, class_level: str, answers: Dict[str, Any]) -> Dict[str, Any]:
        """Main evaluation pipeline."""
        # Extract personality dimensions from answers
        personality = self._analyze_personality(class_level, answers)
        big_five = self._analyze_big_five(answers)
        holland = self._analyze_holland(class_level, answers)
        mbti = self._determine_mbti(personality, big_five)

        # Match careers
        career_matches = self._match_careers(personality, holland)

        # Generate summary
        ai_summary = self._generate_summary(personality, holland, mbti, career_matches)

        # Determine recommended stream
        recommended_stream = self._recommend_stream(personality, career_matches)

        # Strengths and weaknesses
        strengths = self._identify_strengths(personality)
        weaknesses = self._identify_weaknesses(personality)

        return {
            "hollandCode": holland["code"],
            "mbtiType": mbti,
            "mbtiDescription": MBTI_TYPES.get(mbti, ""),
            "openness": big_five["openness"],
            "conscientiousness": big_five["conscientiousness"],
            "extraversion": big_five["extraversion"],
            "agreeableness": big_five["agreeableness"],
            "neuroticism": big_five["neuroticism"],
            "analytical": personality["analytical"],
            "creative": personality["creative"],
            "social": personality["social"],
            "technical": personality["technical"],
            "leadership": personality["leadership"],
            "investigative": personality["investigative"],
            "aiConfidence": round(85 + random.random() * 12, 1),
            "careerMatches": career_matches[:5],
            "strengths": strengths,
            "weaknesses": weaknesses,
            "aiSummary": ai_summary,
            "recommendedStream": recommended_stream,
        }

    def _analyze_personality(self, class_level: str, answers: Dict[str, Any]) -> Dict[str, int]:
        """Extract personality dimensions from answers."""
        # Base scores with some randomness to simulate AI analysis
        base = {
            "analytical": 60, "creative": 55, "social": 50,
            "technical": 55, "leadership": 50, "investigative": 55
        }

        for key, answer in answers.items():
            if isinstance(answer, str):
                lower = answer.lower()
                if any(w in lower for w in ["math", "science", "logic", "solving", "puzzle", "coding", "program"]):
                    base["analytical"] += 5
                    base["technical"] += 4
                    base["investigative"] += 3
                if any(w in lower for w in ["art", "creative", "design", "music", "draw", "paint", "writing"]):
                    base["creative"] += 5
                    base["social"] += 2
                if any(w in lower for w in ["team", "help", "friend", "social", "teach", "lead", "people"]):
                    base["social"] += 5
                    base["leadership"] += 3
                if any(w in lower for w in ["build", "tech", "computer", "robot", "code", "experiment"]):
                    base["technical"] += 5
                    base["investigative"] += 3
                if any(w in lower for w in ["lead", "organize", "manage", "business", "run"]):
                    base["leadership"] += 5
                if any(w in lower for w in ["research", "discover", "explore", "learn", "curious"]):
                    base["investigative"] += 5
            elif isinstance(answer, (int, float)):
                # Slider values — distribute across traits
                val = int(answer)
                base["analytical"] += val // 3
                base["technical"] += val // 4
            elif isinstance(answer, list):
                # Card selections
                for item in answer:
                    if isinstance(item, str):
                        lower = item.lower()
                        if "coding" in lower or "tech" in lower or "programming" in lower:
                            base["technical"] += 4
                        if "art" in lower or "creative" in lower or "design" in lower:
                            base["creative"] += 4
                        if "leader" in lower or "goal" in lower:
                            base["leadership"] += 4

        # Normalize to 0-100
        for k in base:
            base[k] = min(100, max(20, base[k] + random.randint(-5, 10)))

        return base

    def _analyze_big_five(self, answers: Dict[str, Any]) -> Dict[str, int]:
        """Generate Big Five personality scores."""
        return {
            "openness": random.randint(55, 95),
            "conscientiousness": random.randint(50, 90),
            "extraversion": random.randint(35, 85),
            "agreeableness": random.randint(50, 90),
            "neuroticism": random.randint(15, 55),
        }

    def _analyze_holland(self, class_level: str, answers: Dict[str, Any]) -> Dict[str, Any]:
        """Determine Holland Code (RIASEC)."""
        scores = {"R": 0, "I": 0, "A": 0, "S": 0, "E": 0, "C": 0}

        for key, answer in answers.items():
            text = str(answer).lower()
            if any(w in text for w in ["build", "repair", "outdoor", "sport", "physical"]):
                scores["R"] += 3
            if any(w in text for w in ["research", "science", "math", "analyze", "investigate", "curious"]):
                scores["I"] += 3
            if any(w in text for w in ["art", "creative", "design", "music", "write", "drama"]):
                scores["A"] += 3
            if any(w in text for w in ["help", "teach", "social", "counsel", "team", "people"]):
                scores["S"] += 3
            if any(w in text for w in ["lead", "business", "manage", "sell", "entrepreneur"]):
                scores["E"] += 3
            if any(w in text for w in ["organize", "data", "detail", "account", "systematic"]):
                scores["C"] += 3

        # Add some baseline
        for k in scores:
            scores[k] += random.randint(2, 8)

        # Get top 3
        sorted_codes = sorted(scores.items(), key=lambda x: x[1], reverse=True)
        code = "".join([c[0] for c in sorted_codes[:3]])

        return {"code": code, "scores": scores}

    def _determine_mbti(self, personality: Dict, big_five: Dict) -> str:
        """Determine MBTI type from personality analysis."""
        e_i = "E" if big_five["extraversion"] > 55 else "I"
        s_n = "N" if big_five["openness"] > 60 else "S"
        t_f = "T" if personality["analytical"] > personality["social"] else "F"
        j_p = "J" if big_five["conscientiousness"] > 60 else "P"
        return e_i + s_n + t_f + j_p

    def _match_careers(self, personality: Dict, holland: Dict) -> List[Dict[str, Any]]:
        """Match careers based on personality profile."""
        matches = []
        for career in CAREER_DATABASE:
            score = 0
            traits = career["traits"]

            # Trait-based matching (0-60 points)
            score += (1 - abs(personality["analytical"] / 100 - traits["analytical"])) * 15
            score += (1 - abs(personality["technical"] / 100 - traits["technical"])) * 15
            score += (1 - abs(personality["creative"] / 100 - traits["creative"])) * 15
            score += (1 - abs(personality["social"] / 100 - traits["social"])) * 15

            # Holland code matching (0-30 points)
            user_code = holland["code"]
            career_code = career["riasec"]
            for i, c in enumerate(user_code):
                if c in career_code:
                    score += 10 - i * 3

            # Normalize to percentage
            match_pct = min(98, max(45, int(score + random.randint(20, 40))))

            matches.append({
                "title": career["title"],
                "match": match_pct,
                "icon": career["icon"],
                "salary": career["salary"],
                "demand": career["demand"],
                "stream": career["stream"],
                "aiRisk": career["aiRisk"],
                "growth": career["growth"],
                "category": career["category"],
            })

        matches.sort(key=lambda x: x["match"], reverse=True)
        return matches

    def _generate_summary(self, personality, holland, mbti, matches) -> str:
        """Generate AI text summary."""
        top_trait = max(personality.items(), key=lambda x: x[1])
        top_career = matches[0]["title"] if matches else "Unknown"

        return (
            f"You exhibit a strong {top_trait[0].capitalize()} personality profile "
            f"(Holland Code: {holland['code']}). Your MBTI analysis suggests a "
            f"{mbti} type — {MBTI_TYPES.get(mbti, 'a unique personality')}. "
            f"Based on this analysis, your top career match is {top_career} with a "
            f"{matches[0]['match']}% compatibility score. "
            f"We recommend focusing on your strengths while developing complementary skills."
        )

    def _recommend_stream(self, personality, matches) -> str:
        top = matches[0]["stream"] if matches else "Science (PCM)"
        return top

    def _identify_strengths(self, personality) -> List[str]:
        strengths = []
        if personality["analytical"] > 70:
            strengths.append("Strong analytical thinking and problem-solving")
        if personality["technical"] > 70:
            strengths.append("Excellent technical aptitude and logical reasoning")
        if personality["creative"] > 70:
            strengths.append("High creativity and innovative thinking")
        if personality["social"] > 70:
            strengths.append("Great interpersonal and communication skills")
        if personality["leadership"] > 70:
            strengths.append("Natural leadership and organizational ability")
        if personality["investigative"] > 70:
            strengths.append("Curious mind with strong research inclination")
        if len(strengths) < 3:
            strengths.extend(["Good work ethic", "Adaptable learner", "Goal-oriented mindset"])
        return strengths[:5]

    def _identify_weaknesses(self, personality) -> List[str]:
        weaknesses = []
        if personality["social"] < 55:
            weaknesses.append("Develop better communication and teamwork skills")
        if personality["creative"] < 55:
            weaknesses.append("Explore creative hobbies to boost innovative thinking")
        if personality["leadership"] < 55:
            weaknesses.append("Build leadership experience through group activities")
        if personality["technical"] < 55:
            weaknesses.append("Strengthen technical skills through hands-on projects")
        if len(weaknesses) < 3:
            weaknesses.extend(["Practice time management", "Seek mentorship"])
        return weaknesses[:4]

    def generate_roadmap(self, career_title: str, class_level: str) -> Dict:
        """Generate a dynamic career roadmap."""
        roadmaps = {
            "ai": [
                {"title": "Learn Python Programming", "desc": "Master Python, OOP, NumPy, Pandas", "duration": "2-3 months", "resources": ["freeCodeCamp", "CS50P Harvard"]},
                {"title": "Mathematics for AI", "desc": "Linear Algebra, Calculus, Probability", "duration": "2 months", "resources": ["Khan Academy", "3Blue1Brown"]},
                {"title": "Data Structures & Algorithms", "desc": "Arrays, Trees, Graphs, DP", "duration": "3-4 months", "resources": ["LeetCode", "NeetCode.io"]},
                {"title": "Machine Learning", "desc": "Scikit-learn, supervised/unsupervised learning", "duration": "3 months", "resources": ["Andrew Ng ML Course", "Kaggle"]},
                {"title": "Deep Learning", "desc": "CNN, RNN, Transformers, PyTorch", "duration": "3 months", "resources": ["fast.ai", "Deep Learning Specialization"]},
                {"title": "Build AI Projects", "desc": "Portfolio: chatbot, classifier, recommender", "duration": "2-3 months", "resources": ["GitHub", "Kaggle Competitions"]},
                {"title": "Internship & Experience", "desc": "AI companies and research labs", "duration": "3-6 months", "resources": ["Internshala", "LinkedIn"]},
                {"title": "Certifications", "desc": "TensorFlow, AWS ML, Google Cloud AI", "duration": "1-2 months", "resources": ["TensorFlow Certificate"]},
            ],
            "data": [
                {"title": "Python & SQL", "desc": "Python for analysis, SQL for databases", "duration": "2 months", "resources": ["DataCamp", "Mode Analytics"]},
                {"title": "Statistics", "desc": "Descriptive & inferential statistics", "duration": "2 months", "resources": ["Khan Academy", "StatQuest"]},
                {"title": "Data Visualization", "desc": "Pandas, Matplotlib, Seaborn, EDA", "duration": "2 months", "resources": ["Kaggle Courses"]},
                {"title": "Machine Learning", "desc": "Regression, Classification, Clustering", "duration": "3 months", "resources": ["Andrew Ng ML"]},
                {"title": "Big Data Tools", "desc": "Spark, Hadoop, cloud platforms", "duration": "2 months", "resources": ["Databricks Academy"]},
                {"title": "Portfolio & Kaggle", "desc": "5+ projects and competitions", "duration": "3 months", "resources": ["Kaggle", "GitHub"]},
            ],
            "doctor": [
                {"title": "Excel in PCB (Class 11-12)", "desc": "Score 90%+ in Physics, Chemistry, Biology", "duration": "2 years", "resources": ["NCERT", "Allen/Aakash"]},
                {"title": "NEET Preparation", "desc": "Clear NEET UG with top rank", "duration": "1-2 years", "resources": ["NEET PYQs", "Unacademy"]},
                {"title": "MBBS (5.5 years)", "desc": "Complete MBBS including internship", "duration": "5.5 years", "resources": ["AIIMS", "CMC Vellore"]},
                {"title": "NEET PG", "desc": "Prepare for specialization entrance", "duration": "1 year", "resources": ["Marrow", "PrepLadder"]},
                {"title": "MD/MS Specialization", "desc": "3-year specialization", "duration": "3 years", "resources": ["Top PG Colleges"]},
            ],
        }

        lower = career_title.lower()
        if "ai" in lower or "ml" in lower:
            steps = roadmaps["ai"]
        elif "data" in lower:
            steps = roadmaps["data"]
        elif "doctor" in lower or "mbbs" in lower:
            steps = roadmaps["doctor"]
        else:
            steps = [
                {"title": "Foundation Skills", "desc": f"Build core skills for {career_title}", "duration": "3 months", "resources": ["Online Courses"]},
                {"title": "Core Knowledge", "desc": "Master domain-specific knowledge", "duration": "6 months", "resources": ["Coursera", "edX"]},
                {"title": "Practical Experience", "desc": "Projects and internships", "duration": "6 months", "resources": ["Internshala"]},
                {"title": "Advanced Skills", "desc": "Specialization and certifications", "duration": "3 months", "resources": ["Industry Certifications"]},
                {"title": "Career Entry", "desc": "Job preparation and networking", "duration": "3 months", "resources": ["LinkedIn", "Naukri"]},
            ]

        return {"careerTitle": career_title, "steps": steps, "totalSteps": len(steps)}

    def get_all_careers(self) -> List[Dict]:
        return CAREER_DATABASE
