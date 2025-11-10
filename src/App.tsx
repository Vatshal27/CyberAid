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
<aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
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
    <h1>CyberAid Intelligence Center</h1>
    <p className="subtitle">
      Real-time system overview — monitor security tools, threat analytics, and performance indicators.
    </p>

    {/* === ACTIVE TOOLS SECTION === */}
    <div className="active-tools-section">
      <h2 className="section-title">Active Tools</h2>

      <div className="tool-grid">
        {[
          {
            name: "Password Analyzer",
            desc: "Monitors password strength and detects weak or reused credentials.",
            icon: <Lock />,
          },
          {
            name: "Phishing Detector",
            desc: "Analyzes URLs and domains for malicious or fraudulent intent.",
            icon: <AlertTriangle />,
          },
          {
            name: "Vulnerability Scanner",
            desc: "Identifies risky code patterns and potential software exploits.",
            icon: <Code2 />,
          },
          {
            name: "Encryptor / Decryptor",
            desc: "Handles secure text encryption and decryption with unique keys.",
            icon: <KeyRound />,
          },
        ].map((tool, i) => (
          <div key={i} className="status-card glass large">
            <div className="status-card-header">
              <div className="status-icon">{tool.icon}</div>
              <h3>{tool.name}</h3>
            </div>
            <p className="status-desc">{tool.desc}</p>
            <p className="online">Active</p>
          </div>
        ))}
      </div>
    </div>

    {/* === ANALYTICS SECTION === */}
    <div className="analytics-section">
      <h2 className="section-title">System Analytics</h2>

      <div className="analytics-grid">
        <div className="metric-card glass large">
          <Activity className="metric-icon" />
          <h2>Threat Activity</h2>
          <ThreatChart />
          <p className="metric-footer">
            Last updated: {new Date().toLocaleTimeString()}
          </p>
        </div>

        <div className="metric-card glass large">
          <Shield className="metric-icon" />
          <h2>Threat Level</h2>
          <div className="threat-meter">
            <div className="meter-bar">
              <div className="meter-fill" style={{ width: "62%" }}></div>
            </div>
            <p>
              Current Risk: <strong>Moderate</strong>
            </p>
          </div>
          <p className="metric-footer">AI assessment: Stable</p>
        </div>

        <div className="metric-card glass large">
          <Database className="metric-icon" />
          <h2>System Metrics</h2>
          <AnimatedCounter label="Total Scans" value={1246} />
          <AnimatedCounter label="Threats Blocked" value={83} />
          <AnimatedCounter label="Files Encrypted" value={562} />
          <p className="metric-footer">Performance: 98.4% efficiency</p>
        </div>

        <div className="metric-card glass large">
          <User className="metric-icon" />
          <h2>System Status</h2>
          <p>Active Users: 312</p>
          <p>Uptime: 99.98%</p>
          <p>Last Sync: {new Date().toLocaleString()}</p>
          <p className="metric-footer">Network latency: 42ms</p>
        </div>
      </div>
    </div>

    {/* Footer Ticker */}
    <div className="ticker glass">
      🔔 System update completed • 🧠 Threat model synced • 🔒 12 new security signatures deployed • ☁️ Cloud backup stable
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
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const ThreatChart = () => {
  const data = [
    { day: "Mon", threats: 2 },
    { day: "Tue", threats: 5 },
    { day: "Wed", threats: 3 },
    { day: "Thu", threats: 8 },
    { day: "Fri", threats: 4 },
    { day: "Sat", threats: 6 },
    { day: "Sun", threats: 5 },
  ];

  return (
    <div style={{ width: "100%", height: 150 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="day" stroke="#888" />
          <YAxis hide />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="threats"
            stroke="#4fc3f7"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
const AnimatedCounter = ({ label, value }: { label: string; value: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;
    const totalDuration = 1500;
    const incrementTime = 10;
    const step = (end - start) / (totalDuration / incrementTime);

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(Math.floor(start));
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="counter">
      <h3>{label}</h3>
      <p>{count.toLocaleString()}</p>
    </div>
  );
};
