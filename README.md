# 🛡️ CyberAid – Security Toolkit Dashboard

**CyberAid** is a modern, responsive dashboard that integrates multiple cybersecurity utilities into one place.  
Built with React + Vite and deployed on **Vercel**, it connects to live security microservices hosted on Render.

---

## 🚀 Features

- **Password Analyzer** – Checks strength, security, and breach exposure.
- **Phishing Detector** – Scans URLs for phishing and malicious behavior.
- **Code Vulnerability Scanner** – Detects risky patterns in source code.
- **Encryptor / Decryptor** – Secure text encryption with key management.
- **Dark / Light Mode** toggle with persistent theme.
- **Auto API Warm-up** for faster load times (Render services stay awake).

---

## ⚙️ Tech Stack

- **Frontend:** React + Vite  
- **UI Icons:** Lucide-React  
- **Hosting:** Vercel  
- **Backends:** Flask / Node (Render)  

---

## 🧠 Environment Variables

Create a `.env` file in your project root with:

```bash
VITE_API_PASSWORD=https://password-analyzer-nine.vercel.app
VITE_API_PHISHING=https://phishing-url-detection-using-ml-tbw3.onrender.com
VITE_API_VULNERABILITY=https://code-vulnerability.onrender.com
VITE_API_ENCRYPTOR=https://encryptor-decryptor-yb9w.onrender.com
