from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import re
import pickle
import os
import httpx
import base64
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Config ───────────────────────────────────────────────────────
# ⚠️ Set your Groq API key via environment variable: GROQ_API_KEY
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_URL          = "https://api.groq.com/openai/v1/chat/completions"
MODEL_NAME        = "llama-3.1-8b-instant"
VISION_MODEL_NAME = "meta-llama/llama-4-scout-17b-16e-instruct"  # vision model

# ── Load ML model ────────────────────────────────────────────────
MODEL_PATH = os.path.join(os.path.dirname(__file__), "scam_model.pkl")
ml_model = None
try:
    with open(MODEL_PATH, "rb") as f:
        ml_model = pickle.load(f)
    print(f"✅ ML model loaded — Labels: {ml_model['labels']}")
except FileNotFoundError:
    print("⚠️  scam_model.pkl not found — ML disabled")
except Exception as e:
    print(f"⚠️  Model load error: {e}")


# ── Translation for ML accuracy ──────────────────────────────────
def translate_to_english(text: str) -> str:
    """
    Translate non-English text to English for better ML accuracy.
    Uses deep-translator (Google Translate free tier).
    Falls back to original text if translation fails.
    """
    try:
        from deep_translator import GoogleTranslator
        # Only translate if text has non-ASCII characters (Hindi, Tamil etc.)
        # or has Hinglish signals
        needs_translation = (
            bool(re.search(r'[\u0900-\u097F\u0B80-\u0BFF\u0C00-\u0C7F\u0980-\u09FF\u0A80-\u0AFF]', text))
        )
        if needs_translation:
            translated = GoogleTranslator(source='auto', target='en').translate(text[:500])
            return translated if translated else text
        return text
    except Exception:
        return text  # fallback to original if translation fails


# ── Language detection ───────────────────────────────────────────
def detect_language(text: str) -> str:
    text_lower = text.lower()

    if re.search(r'[\u0900-\u097F]', text):
        marathi_words = ['माझ', 'आहे', 'नाही', 'मला', 'तुम्ही', 'काय', 'कसे']
        if any(w in text for w in marathi_words):
            return 'marathi'
        return 'hindi'

    if re.search(r'[\u0B80-\u0BFF]', text):
        return 'tamil'

    if re.search(r'[\u0C00-\u0C7F]', text):
        return 'telugu'

    if re.search(r'[\u0980-\u09FF]', text):
        return 'bengali'

    if re.search(r'[\u0A80-\u0AFF]', text):
        return 'gujarati'

    hinglish_words = [
        'kya', 'hai', 'nahi', 'mera', 'meri', 'mere', 'aapka', 'aapki',
        'tumhara', 'yeh', 'woh', 'kaise', 'kyun', 'kab', 'kahan', 'kaun',
        'haan', 'bhai', 'yaar', 'agar', 'toh', 'aur', 'lekin', 'matlab',
        'paise', 'paisa', 'mujhe', 'humara', 'unka', 'unhone', 'kuch',
        'sab', 'bahut', 'thoda', 'zyada', 'abhi', 'pehle', 'baad',
        'karo', 'kiya', 'tha', 'thi', 'kar', 'hogaya', 'ho gaya',
        'hua', 'huyi', 'liya', 'diya', 'gaya', 'gayi', 'maine', 'galti',
        'se', 'pe', 'par', 'wala', 'wali', 'raha', 'rahi', 'rahe',
    ]
    hinglish_count = sum(1 for w in hinglish_words
                         if f' {w} ' in f' {text_lower} ' or
                         text_lower.startswith(w + ' ') or
                         text_lower.endswith(' ' + w))
    if hinglish_count >= 2:
        return 'hinglish'

    return 'english'


# ── Language-specific system prompts ─────────────────────────────
def get_system_prompt(language: str) -> str:
    base_rules = """You are Avionix, an expert Indian cyber scam awareness assistant.
Your ONLY role is to help users with cyber scams, phishing, fraud, and digital safety in India.
Never talk about unrelated topics. Never use ** or markdown formatting. Keep replies under 5 lines.
Always mention cybercrime.gov.in or 1930 helpline when the situation is serious.
India scams to know: UPI fraud, KYC scam, OTP theft, phishing, fake job, lottery scam,
Aadhaar/PAN scam, fake police call, SIM swap, investment fraud, courier scam, AnyDesk scam."""

    prompts = {
        'english': base_rules + """
Reply in simple, clear English. Be friendly and actionable. Max 4-5 lines only.""",

        'hinglish': base_rules + """
CRITICAL: User is writing in Hinglish (Hindi + English mixed roman script).
You MUST reply in Hinglish only — never switch to full English or full Hindi.
Mix Hindi and English naturally the way Indians talk daily.
Example reply style:
"Yeh ek scam hai bhai! Koi bhi bank kabhi SMS pe KYC nahi maangta.
Is link pe bilkul click mat karo. Apna bank turant call karo aur
1930 pe complaint karo ya cybercrime.gov.in pe jaao."
Always be warm, direct and helpful like a close friend giving advice.
Always mention cybercrime.gov.in ya 1930 pe call karo when situation is serious.""",

        'hindi': base_rules + """
IMPORTANT: User is writing in Hindi (Devanagari script).
Reply completely in Hindi using Devanagari script only. No English words.
Example style: "यह एक धोखाधड़ी का संदेश है। कभी भी OTP किसी के साथ साझा न करें।
तुरंत 1930 पर कॉल करें या cybercrime.gov.in पर शिकायत दर्ज करें।"
Be clear, simple and helpful in pure Hindi.""",

        'tamil': base_rules + """
IMPORTANT: User is writing in Tamil script.
Reply in Tamil only. Be clear and helpful.
Always mention: 1930 (Cyber Crime Helpline) மற்றும் cybercrime.gov.in""",

        'telugu': base_rules + """
IMPORTANT: User is writing in Telugu script.
Reply in Telugu only. Be clear and helpful.
Always mention: 1930 (Cyber Crime Helpline) మరియు cybercrime.gov.in""",

        'marathi': base_rules + """
IMPORTANT: User is writing in Marathi (Devanagari script).
Reply in Marathi only. Be clear and helpful.
Always mention: 1930 (Cyber Crime Helpline) आणि cybercrime.gov.in""",

        'bengali': base_rules + """
IMPORTANT: User is writing in Bengali script.
Reply in Bengali only. Be clear and helpful.
Always mention: 1930 (Cyber Crime Helpline) এবং cybercrime.gov.in""",

        'gujarati': base_rules + """
IMPORTANT: User is writing in Gujarati script.
Reply in Gujarati only. Be clear and helpful.
Always mention: 1930 (Cyber Crime Helpline) અને cybercrime.gov.in""",
    }

    return prompts.get(language, prompts['english'])


# ── Request models ────────────────────────────────────────────────
class ScamRequest(BaseModel):
    message: str
    language: Optional[str] = "auto"

class ChatRequest(BaseModel):
    message: str
    conversation_history: Optional[list] = []
    language: Optional[str] = "auto"


# ── Rule-based engine (English + Hinglish keywords) ──────────────
def analyze_with_rules(text: str):
    text_lower = text.lower()
    score = 0
    reasons = []
    category = []

    if any(w in text_lower for w in [
        "kyc", "account blocked", "account suspended", "verify account",
        "pan card blocked", "netbanking blocked", "aadhaar card",
        "kyc update karo", "account band", "verify karo", "band ho jayega",
        "khata band", "kyc nahi hua", "kyc expire", "pancard",
        "netbanking", "update your pan", "update pancard",
    ]):
        score += 0.4
        reasons.append("Threatens account blockage or KYC update")
        category.append("Bank/KYC Scam")

    if any(w in text_lower for w in [
        "parcel", "delivery failed", "courier", "customs", "package on hold",
        "parcel aaya", "delivery nahi hui", "parcel rok",
    ]):
        score += 0.3
        reasons.append("Fake delivery or parcel issue")
        category.append("Delivery Scam")

    if any(w in text_lower for w in [
        "toll", "challan", "traffic fine", "penalty unpaid",
        "challan kata", "fine bharo", "challan aaya",
    ]):
        score += 0.3
        reasons.append("Fake traffic fine or toll message")
        category.append("Traffic Scam")

    if any(w in text_lower for w in [
        "income tax", "police", "court", "legal action", "arrest",
        "police aayegi", "giraftaar", "court notice", "income tax notice",
        "cbi", "ed notice", "warrant",
    ]):
        score += 0.4
        reasons.append("Impersonates government authority")
        category.append("Government Scam")

    if any(w in text_lower for w in [
        "won", "lottery", "prize", "gift card", "lucky draw",
        "jeet gaye", "inaam", "lucky winner", "prize jita",
        "congratulations aapne", "aap jeet gaye",
    ]):
        score += 0.3
        reasons.append("Unrealistic prize or lottery claim")
        category.append("Lottery Scam")

    if any(w in text_lower for w in [
        "earn", "work from home", "no experience", "part-time job",
        "security deposit", "ghar se kaam", "daily earning", "paise kamao",
        "youtube like karo", "registration fee", "registration bharo",
        "ghar baithe", "daily income",
    ]):
        score += 0.3
        reasons.append("Unrealistic job offer")
        category.append("Job Scam")

    if any(w in text_lower for w in [
        "upi", "scan qr", "otp", "send money", "urgent help", "transfer now",
        "otp share karo", "paise bhejo", "qr scan karo", "transfer karo",
        "otp batao", "otp dedo", "otp mat batana", "otp aaya",
    ]):
        score += 0.4
        reasons.append("Requests money via UPI/QR or urgent transfer")
        category.append("UPI Scam")

    if any(w in text_lower for w in [
        "i am your friend", "new number", "help me urgently",
        "mera naya number", "main tumhara dost", "emergency hai",
        "bhai help karo", "yaar paise chahiye", "naya number hai mera",
    ]):
        score += 0.3
        reasons.append("Possible impersonation of known person")
        category.append("Impersonation Scam")

    if any(w in text_lower for w in [
        "device infected", "virus detected", "call support", "remote access",
        "anydesk", "teamviewer", "phone hack", "virus hai",
        "phone mein virus", "support call karo", "screen share karo",
    ]):
        score += 0.3
        reasons.append("Fake tech support alert")
        category.append("Tech Support Scam")

    if any(w in text_lower for w in [
        ".apk", "download app", "install app",
        "app install karo", "yeh app download karo", "apk bheja",
    ]):
        score += 0.4
        reasons.append("Suspicious app download request")
        category.append("Malware Scam")

    if any(w in text_lower for w in [
        "subscription", "netflix", "amazon renewal",
        "subscription khatam", "renew karo", "subscription expire",
    ]):
        score += 0.2
        reasons.append("Fake subscription renewal alert")
        category.append("Subscription Scam")

    if any(w in text_lower for w in [
        "crypto", "bitcoin", "double money", "guaranteed return",
        "double karenge", "guaranteed profit", "investment karo",
        "paisa double", "return guaranteed", "trading profit",
    ]):
        score += 0.3
        reasons.append("Unrealistic investment promise")
        category.append("Investment Scam")

    if any(w in text_lower for w in [
        "hi", "hello", "how are you", "kya haal", "kaise ho", "namaste",
    ]) and len(text_lower.split()) < 6:
        score += 0.2
        reasons.append("Suspicious unknown greeting (possible scam starter)")
        category.append("Social Engineering Scam")

    if re.search(r"http[s]?://", text_lower):
        score += 0.2
        reasons.append("Contains suspicious link")
        category.append("Phishing")

    return min(score, 1.0), reasons, list(set(category))


# ── ML engine ────────────────────────────────────────────────────
def analyze_with_ml(text: str):
    if ml_model is None:
        return None, None
    try:
        prob  = ml_model["binary_model"].predict_proba([text])[0][1]
        label = ml_model["multi_model"].predict([text])[0]
        return round(float(prob), 4), label
    except Exception as e:
        print(f"ML error: {e}")
        return None, None


# ── Hybrid score ─────────────────────────────────────────────────
def combine_scores(rule_score: float, ml_score):
    if ml_score is None:
        return rule_score
    return round(0.6 * ml_score + 0.4 * rule_score, 4)


# ── Detect scam message vs conversation ──────────────────────────
def is_scam_message(text: str) -> bool:
    text_lower = text.lower().strip()

    chat_starters = [
        "what", "how", "why", "when", "where", "who", "can you", "tell me",
        "explain", "i got", "i received", "i was", "someone", "my friend",
        "is it", "is this", "help me", "what should", "what to do",
        "precaution", "safe", "protect", "avoid", "i think", "i clicked",
        "i shared", "i gave", "i sent", "i lost", "please help",
        "kya hai", "kaise", "kyun", "bhai", "yaar", "mujhe", "hamara",
        "kya karu", "kya karna", "batao", "samjhao", "mera", "meri",
        "kya hua", "kya hoga", "maine", "humne", "galti se",
    ]
    for starter in chat_starters:
        if text_lower.startswith(starter):
            return False

    scam_signals = [
        "kyc", "otp", "account blocked", "verify", "click here", "http",
        "won", "lottery", "prize", "upi", "bank", "suspended", "urgent",
        "dear customer", "dear user", "congratulations", "claim", "reward",
        "rs.", "rs ", "₹", "income tax", "police", "arrest", "challan",
        "delivery", "parcel", "package", "customs", "courier",
        "otp share", "paise bhejo", "account band", "jeet gaye",
        "registration fee", "kyc karo", "netbanking", "pancard",
        "notice", "blocked today", "kindly update", "visit below",
    ]
    if sum(1 for s in scam_signals if s in text_lower) >= 2:
        return True

    if len(text.split()) > 15:
        return True

    return False


# ── Call Groq API ────────────────────────────────────────────────
async def call_groq(user_message: str, history: list, language: str = "english") -> str:
    system_prompt = get_system_prompt(language)
    messages = [{"role": "system", "content": system_prompt}]

    for turn in history[-10:]:
        if turn.get("role") in ["user", "assistant"]:
            messages.append({"role": turn["role"], "content": turn["content"]})

    messages.append({"role": "user", "content": user_message})

    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type":  "application/json",
    }
    payload = {
        "model":       MODEL_NAME,
        "messages":    messages,
        "max_tokens":  400,
        "temperature": 0.3,
    }

    try:
        async with httpx.AsyncClient(timeout=30) as client:
            resp = await client.post(GROQ_URL, headers=headers, json=payload)
            data = resp.json()

        if "choices" in data and data["choices"]:
            return data["choices"][0]["message"]["content"]
        elif "error" in data:
            return f"Error: {data['error'].get('message', 'Unknown error')}"
        return "Sorry, I could not process that right now."

    except Exception as e:
        return f"Connection error: {str(e)}"


# ── Endpoint 1: Scam checker ──────────────────────────────────────
@app.post("/check-scam")
def check_scam(req: ScamRequest):
    text = req.message.strip()
    rule_score, reasons, category = analyze_with_rules(text)

    # Translate for better ML accuracy
    text_for_ml = translate_to_english(text)
    ml_score, ml_label = analyze_with_ml(text_for_ml)
    final_score = combine_scores(rule_score, ml_score)

    result = ("High Risk 🚨" if final_score > 0.7
              else "Medium Risk ⚠️" if final_score > 0.4
              else "Low Risk ✅")

    if ml_label and ml_label != "ham":
        mapped = {"spam": "Spam", "phishing": "Phishing",
                  "smishing": "Smishing", "fraud": "Fraud"}.get(ml_label)
        if mapped and mapped not in category:
            category.append(f"{mapped} (ML)")

    if ml_score is not None and ml_score > 0.4:
        reasons.append(f"ML model flagged as {ml_label} ({ml_score:.0%} confidence)")

    warning = ("If you have clicked any suspicious link or shared details, "
               "immediately contact Cyber Crime Helpline: 1930 or visit cybercrime.gov.in"
               if final_score > 0.7 else "")

    return {
        "message": text, "scam_probability": final_score,
        "result": result, "reasons": reasons,
        "category": list(set(category)), "warning": warning,
        "ml_score": ml_score, "ml_label": ml_label,
        "rule_score": round(rule_score, 4),
        "model_active": ml_model is not None, "mode": "analyze",
    }


# ── Endpoint 2: Conversational chat ──────────────────────────────
@app.post("/chat")
async def chat(req: ChatRequest):
    text = req.message.strip()

    language = req.language if req.language and req.language != "auto" \
               else detect_language(text)

    if is_scam_message(text):
        rule_score, reasons, category = analyze_with_rules(text)

        # Translate to English for better ML accuracy on non-English messages
        text_for_ml = translate_to_english(text)
        ml_score, ml_label = analyze_with_ml(text_for_ml)
        final_score = combine_scores(rule_score, ml_score)

        risk_level = ("HIGH RISK" if final_score > 0.7
                      else "MEDIUM RISK" if final_score > 0.4
                      else "LOW RISK")

        prompt = f"""Scam message received: "{text}"
System detection: {risk_level} | ML type: {ml_label} | Flags: {', '.join(reasons[:2]) if reasons else 'none'}

Reply in plain text only, no markdown, max 4 short lines:
Line 1: Is it a scam and what type
Line 2: Main red flags in one sentence
Line 3: What the user should do right now
Line 4: Always end with: cybercrime.gov.in pe complaint karo ya 1930 pe call karo (in the detected language)"""

        reply = await call_groq(prompt, req.conversation_history, language)
        return {
            "reply": reply, "mode": "analyze+chat",
            "scam_probability": final_score, "ml_label": ml_label,
            "ml_score": ml_score, "rule_score": round(rule_score, 4),
            "model_active": ml_model is not None,
            "detected_language": language,
        }

    else:
        reply = await call_groq(text, req.conversation_history, language)
        return {
            "reply": reply, "mode": "chat",
            "scam_probability": None, "ml_label": None,
            "ml_score": None, "rule_score": None,
            "model_active": ml_model is not None,
            "detected_language": language,
        }


# ── Endpoint 3: Image/screenshot analyzer ────────────────────────
@app.post("/analyze-image")
async def analyze_image(file: UploadFile = File(...), language: str = "auto"):
    # ── Read and encode image ─────────────────────────────────────
    image_bytes = await file.read()
    image_b64   = base64.b64encode(image_bytes).decode("utf-8")

    filename = file.filename.lower() if file.filename else ""
    if filename.endswith(".png"):
        mime_type = "image/png"
    elif filename.endswith(".jpg") or filename.endswith(".jpeg"):
        mime_type = "image/jpeg"
    elif filename.endswith(".webp"):
        mime_type = "image/webp"
    else:
        mime_type = "image/jpeg"

    # ── Step 1: Extract text using Groq vision ────────────────────
    extract_prompt = """Look at this screenshot carefully. It may be a WhatsApp message, SMS, email, or any chat screenshot.

Extract ALL visible text from this image exactly as it appears.
Then on a new line write: ---
Then in one sentence say what type of message this appears to be (SMS/WhatsApp/Email/other).

Only output the extracted text and the one sentence description. Nothing else."""

    vision_messages = [
        {
            "role": "user",
            "content": [
                {
                    "type": "image_url",
                    "image_url": {"url": f"data:{mime_type};base64,{image_b64}"}
                },
                {
                    "type": "text",
                    "text": extract_prompt
                }
            ]
        }
    ]

    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type":  "application/json",
    }
    vision_payload = {
        "model":       VISION_MODEL_NAME,
        "messages":    vision_messages,
        "max_tokens":  1000,
        "temperature": 0.1,
    }

    extracted_text  = ""
    image_type_desc = ""

    try:
        async with httpx.AsyncClient(timeout=60) as client:
            resp = await client.post(GROQ_URL, headers=headers, json=vision_payload)
            data = resp.json()

        print(f"Vision API response status: {resp.status_code}")

        if "choices" in data and data["choices"]:
            full_output = data["choices"][0]["message"]["content"]
            parts = full_output.split("---")
            extracted_text  = parts[0].strip()
            image_type_desc = parts[1].strip() if len(parts) > 1 else ""
            print(f"Extracted text: {extracted_text[:100]}")

        elif "error" in data:
            err_msg = data['error'].get('message', 'Unknown error')
            print(f"Vision API error: {err_msg}")
            # Fallback: let Groq describe what it sees without extraction
            return {
                "reply": f"Screenshot mein text extract nahi ho saka ({err_msg}). Please type the message manually.",
                "extracted_text": "", "mode": "image_error",
                "scam_probability": None, "ml_label": None,
                "ml_score": None, "rule_score": None,
                "model_active": ml_model is not None,
                "detected_language": "english",
            }

    except Exception as e:
        print(f"Vision exception: {str(e)}")
        return {
            "reply": f"Image processing error: {str(e)}",
            "extracted_text": "", "mode": "image_error",
            "scam_probability": None, "ml_label": None,
            "ml_score": None, "rule_score": None,
            "model_active": ml_model is not None,
            "detected_language": "english",
        }

    # ── Step 2: Rules on original extracted text ──────────────────
    rule_score, reasons, category = analyze_with_rules(extracted_text)

    # ── Step 3: ML on translated text (better accuracy) ──────────
    text_for_ml = translate_to_english(extracted_text)
    ml_score, ml_label = analyze_with_ml(text_for_ml)
    final_score = combine_scores(rule_score, ml_score)

    risk_level = ("HIGH RISK" if final_score > 0.7
                  else "MEDIUM RISK" if final_score > 0.4
                  else "LOW RISK")

    # ── Step 4: Detect language ───────────────────────────────────
    detected_lang = language if language != "auto" else detect_language(extracted_text)

    # ── Step 5: Groq explains the result ─────────────────────────
    explain_prompt = f"""A user uploaded a screenshot of a suspicious message. Here is the text extracted from it:

"{extracted_text}"

Our system detected:
- Risk level: {risk_level} ({final_score:.0%} probability)
- ML detected type: {ml_label}
- Red flags found: {', '.join(reasons[:3]) if reasons else 'none detected'}
- Image type: {image_type_desc}

Reply in plain text only, no markdown, max 5 short lines:
Line 1: What type of message is in this screenshot (WhatsApp/SMS/email?)
Line 2: Is it a scam? What type?
Line 3: Main red flags visible
Line 4: What the user should do right now
Line 5: cybercrime.gov.in pe complaint karo ya 1930 pe call karo (say in the user's language)"""

    reply = await call_groq(explain_prompt, [], detected_lang)

    if ml_label and ml_label != "ham":
        mapped = {"spam": "Spam", "phishing": "Phishing",
                  "smishing": "Smishing", "fraud": "Fraud"}.get(ml_label)
        if mapped and mapped not in category:
            category.append(f"{mapped} (ML)")

    return {
        "reply":            reply,
        "extracted_text":   extracted_text,
        "mode":             "image+analyze",
        "scam_probability": final_score,
        "ml_label":         ml_label,
        "ml_score":         ml_score,
        "rule_score":       round(rule_score, 4),
        "category":         list(set(category)),
        "reasons":          reasons,
        "model_active":     ml_model is not None,
        "detected_language": detected_lang,
    }


# ── Health check ─────────────────────────────────────────────────
@app.get("/health")
def health():
    return {
        "status":       "ok",
        "model_loaded": ml_model is not None,
        "model_labels": ml_model["labels"] if ml_model else [],
        "chat_enabled": GROQ_API_KEY != "your-groq-api-key-here",
        "supported_languages": ["english", "hinglish", "hindi", "tamil",
                                "telugu", "marathi", "bengali", "gujarati"],
    }