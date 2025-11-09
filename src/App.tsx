import { useState, useEffect } from "react";
import {
  Moon,
  Sun,
  Shield,
  Lock,
  AlertTriangle,
  Activity,
  Database,
  Bell,
  User,
  Settings,
  Menu,
  X,
  Code2,
  KeyRound,
} from "lucide-react";
import "./App.css";

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  // Apply theme when toggled
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  // --- Warm-up effect to pre-ping backend APIs ---
  useEffect(() => {
    const urls = [
      `${import.meta.env.VITE_API_PASSWORD}/ping`,
      `${import.meta.env.VITE_API_PHISHING}/ping`,
      `${import.meta.env.VITE_API_VULNERABILITY}/ping`,
      `${import.meta.env.VITE_API_ENCRYPTOR}/ping`,
    ];

    urls.forEach(async (url) => {
      try {
        const res = await fetch(url, { method: "GET" });
        if (res.ok) {
          console.log(`✅ Warmed: ${url}`);
        } else {
          console.warn(`⚠️ Warm-up failed for ${url} (${res.status})`);
        }
      } catch (err) {
        if (err instanceof Error) {
          console.warn(`🚫 Error warming ${url}:`, err.message);
        } else {
          console.warn(`🚫 Error warming ${url}:`, String(err));
        }
      }
    });
  }, []);

  // Tool URLs
  const TOOLS = {
    password: "https://password-analyzer-nine.vercel.app/",
    phishing: "https://phishing-url-detection-using-ml-tbw3.onrender.com/",
    vulnerability: "https://code-vulnerability.onrender.com/",
    encryptor: "https://encryptor-decryptor-yb9w.onrender.com/",
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "" : "closed"}`}>
        <div className="logo">
          <div className="logo-icon">
            <Database className="w-6 h-6 text-white" />
          </div>
          {sidebarOpen && (
            <div>
              <h1>CyberAid</h1>
              <p>Security Toolkit</p>
            </div>
          )}
        </div>

        <nav className="nav">
          <button
            className={`nav-btn ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveTab("dashboard")}
          >
            <Activity className="icon" />
            {sidebarOpen && <span>Dashboard</span>}
          </button>

          <button
            className={`nav-btn ${activeTab === "password" ? "active" : ""}`}
            onClick={() => setActiveTab("password")}
          >
            <Lock className="icon" />
            {sidebarOpen && <span>Password Analyzer</span>}
          </button>

          <button
            className={`nav-btn ${activeTab === "phishing" ? "active" : ""}`}
            onClick={() => setActiveTab("phishing")}
          >
            <AlertTriangle className="icon" />
            {sidebarOpen && <span>Phishing Detector</span>}
          </button>

          <button
            className={`nav-btn ${activeTab === "vulnerability" ? "active" : ""}`}
            onClick={() => setActiveTab("vulnerability")}
          >
            <Code2 className="icon" />
            {sidebarOpen && <span>Vulnerability Scanner</span>}
          </button>

          <button
            className={`nav-btn ${activeTab === "encryptor" ? "active" : ""}`}
            onClick={() => setActiveTab("encryptor")}
          >
            <KeyRound className="icon" />
            {sidebarOpen && <span>Encryptor / Decryptor</span>}
          </button>

          <button
            className={`nav-btn ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            <Settings className="icon" />
            {sidebarOpen && <span>Settings</span>}
          </button>
        </nav>

        <div className="sidebar-toggle">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X /> : <Menu />}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="main">
        <header className="header">
          <div className="header-left">
            <button
              className="menu-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X /> : <Menu />}
            </button>
          </div>

          <div className="header-right">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="dark-mode-toggle"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <Sun /> : <Moon />}
            </button>
            <button className="notif">
              <Bell />
              <span className="dot" />
            </button>
            <button>
              <User />
            </button>
          </div>
        </header>

        {/* Content */}
        <section className="content">
          {activeTab === "dashboard" && (
            <div className="tool-page">
              <h1>Security Dashboard</h1>
              <p>Monitor your tools and manage your cyber utilities in one place.</p>

              <div className="metric-section">
                <div className="metric-card">
                  <Shield className="metric-icon" />
                  <h2>Password Analyzer</h2>
                  <p>Analyze password strength, security, and breaches.</p>
                </div>
                <div className="metric-card">
                  <AlertTriangle className="metric-icon" />
                  <h2>Phishing Detector</h2>
                  <p>Scan URLs for potential phishing or malicious intent.</p>
                </div>
                <div className="metric-card">
                  <Code2 className="metric-icon" />
                  <h2>Vulnerability Scanner</h2>
                  <p>Detect and analyze code vulnerabilities in real time.</p>
                </div>
                <div className="metric-card">
                  <KeyRound className="metric-icon" />
                  <h2>Encryptor / Decryptor</h2>
                  <p>Encrypt or decrypt text with secure key management.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "password" && (
            <div className="tool-page">
              <h1>Password Analyzer</h1>
              <iframe
                src={TOOLS.password}
                title="Password Analyzer"
                className="iframe-tool"
              ></iframe>
            </div>
          )}

          {activeTab === "phishing" && (
            <div className="tool-page">
              <h1>Phishing Detector</h1>
              <iframe
                src={TOOLS.phishing}
                title="Phishing Detector"
                className="iframe-tool"
              ></iframe>
            </div>
          )}

          {activeTab === "vulnerability" && (
            <div className="tool-page">
              <h1>Vulnerability Scanner</h1>
              <iframe
                src={TOOLS.vulnerability}
                title="Vulnerability Scanner"
                className="iframe-tool"
              ></iframe>
            </div>
          )}

          {activeTab === "encryptor" && (
            <div className="tool-page">
              <h1>Encryptor / Decryptor</h1>
              <iframe
                src={TOOLS.encryptor}
                title="Encryptor Decryptor"
                className="iframe-tool"
              ></iframe>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="tool-page">
              <h1>Settings</h1>
              <div className="metric-section">
                <div className="metric-card">
                  <Settings className="metric-icon" />
                  <h2>Theme</h2>
                  <p>Current mode: {darkMode ? "Dark" : "Light"}</p>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="toggle-theme-btn"
                  >
                    Toggle Theme
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
