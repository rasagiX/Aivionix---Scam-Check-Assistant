from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import re

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ScamRequest(BaseModel):
    message: str


def analyze_message(text: str):
    text_lower = text.lower()

    score = 0
    reasons = []
    category = []

    # 🏦 Bank / KYC / Account Block Scam
    if any(word in text_lower for word in [
        "kyc", "account blocked", "account suspended", "verify account",
        "pan card blocked", "netbanking blocked, PAN","Aadhaar Card"
    ]):
        score += 0.4
        reasons.append("Threatens account blockage or KYC update")
        category.append("Bank/KYC Scam")

    # 📦 Delivery / Parcel Scam
    if any(word in text_lower for word in [
        "parcel", "delivery failed", "courier", "customs", "package on hold"
    ]):
        score += 0.3
        reasons.append("Fake delivery or parcel issue")
        category.append("Delivery Scam")

    # 🚦 Traffic fine / toll scam
    if any(word in text_lower for word in [
        "toll", "challan", "traffic fine", "penalty unpaid"
    ]):
        score += 0.3
        reasons.append("Fake traffic fine or toll message")
        category.append("Traffic Scam")

    # 🏛️ Government / Police impersonation
    if any(word in text_lower for word in [
        "income tax", "police", "court", "legal action", "arrest"
    ]):
        score += 0.4
        reasons.append("Impersonates government authority")
        category.append("Government Scam")

    # 💰 Lottery / Prize scam
    if any(word in text_lower for word in [
        "won", "lottery", "prize", "gift card", "lucky draw"
    ]):
        score += 0.3
        reasons.append("Unrealistic prize or lottery claim")
        category.append("Lottery Scam")

    # 💼 Job scam
    if any(word in text_lower for word in [
        "earn", "work from home", "no experience", "part-time job","security deposit"
    ]):
        score += 0.3
        reasons.append("Unrealistic job offer")
        category.append("Job Scam")

    # 💸 UPI / QR / emergency money scam
    if any(word in text_lower for word in [
        "upi", "scan qr","otp", "send money", "urgent help", "transfer now"
    ]):
        score += 0.4
        reasons.append("Requests money via UPI/QR or urgent transfer")
        category.append("UPI Scam")

    # 🤝 Impersonation (friend/family)
    if any(word in text_lower for word in [
        "i am your friend", "new number", "help me urgently"
    ]):
        score += 0.3
        reasons.append("Possible impersonation of known person")
        category.append("Impersonation Scam")

    # 🧑‍💻 Tech support scam
    if any(word in text_lower for word in [
        "device infected", "virus detected", "call support", "remote access"
    ]):
        score += 0.3
        reasons.append("Fake tech support alert")
        category.append("Tech Support Scam")

    # 📱 APK / malware scam
    if any(word in text_lower for word in [
        ".apk", "download app", "install app"
    ]):
        score += 0.4
        reasons.append("Suspicious app download request")
        category.append("Malware Scam")

    # 📺 Subscription scam
    if any(word in text_lower for word in [
        "subscription", "netflix", "amazon renewal"
    ]):
        score += 0.2
        reasons.append("Fake subscription renewal alert")
        category.append("Subscription Scam")

    # 🪙 Investment / crypto scam
    if any(word in text_lower for word in [
        "crypto", "bitcoin", "double money", "guaranteed return"
    ]):
        score += 0.3
        reasons.append("Unrealistic investment promise")
        category.append("Investment Scam")

    # 💌 Pig butchering / random message
    if any(word in text_lower for word in [
        "hi", "hello", "how are you"
    ]) and len(text_lower.split()) < 6:
        score += 0.2
        reasons.append("Suspicious unknown greeting (possible scam starter)")
        category.append("Social Engineering Scam")

    # 🔗 Link detection
    if re.search(r"http[s]?://", text_lower):
        score += 0.2
        reasons.append("Contains suspicious link")
        category.append("Phishing")

    probability = min(score, 1.0)

    if probability > 0.7:
        result = "High Risk 🚨"
    elif probability > 0.4:
        result = "Medium Risk ⚠️"
    else:
        result = "Low Risk ✅"

    return probability, result, reasons, list(set(category))


@app.post("/check-scam")
def check_scam(req: ScamRequest):
    probability, result, reasons, category = analyze_message(req.message)

    warning = ""
    if probability > 0.7:
        warning = "If you have clicked on any suspicious link or shared details, immediately contact Cyber Crime Helpline: 1930 or visit cybercrime.gov.in"

    return {
        "message": req.message,
        "scam_probability": probability,
        "result": result,
        "reasons": reasons,
        "category": category,
        "warning": warning
    }