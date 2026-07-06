// ============================================================
// StageLink Kenya — Dashboard Components
// File: src/components/ArtistDashboard.jsx
// ============================================================

import { useState } from "react";

// ===== BOOKING DATA =====
const mockBookings = [
  { id: 1, venue: "Alchemist Bar", date: "Dec 15, 2024", time: "9:00 PM", amount: "KSh 80,000", status: "pending", event: "Friday Night Live" },
  { id: 2, venue: "The Rustic Lounge", date: "Dec 20, 2024", time: "7:00 PM", amount: "KSh 60,000", status: "accepted", event: "Jazz Evening" },
  { id: 3, venue: "B-Club", date: "Dec 28, 2024", time: "10:00 PM", amount: "KSh 95,000", status: "completed", event: "New Year Eve Pre-Party" },
  { id: 4, venue: "Strathmore University", date: "Jan 5, 2025", time: "6:00 PM", amount: "KSh 50,000", status: "rejected", event: "Cultural Night" },
];

const mockMessages = [
  { id: 1, from: "Alchemist Bar Manager", avatar: "AB", time: "2h ago", preview: "Hi! We loved your demo. Are you available on Dec 15?", unread: true },
  { id: 2, from: "The Rustic", avatar: "TR", time: "1d ago", preview: "Booking confirmed for Jazz Evening. See you then!", unread: false },
  { id: 3, from: "Nairobi Kitchen", avatar: "NK", time: "3d ago", preview: "We're looking for an acoustic performer for our...", unread: false },
];

// ===== STATUS BADGE COLORS =====
const statusConfig = {
  pending: { color: "#F59E0B", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.3)", label: "Pending" },
  accepted: { color: "#10B981", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.3)", label: "Accepted" },
  rejected: { color: "#EF4444", bg: "rgba(239,68,68,0.1)", border: "rgba(239,68,68,0.3)", label: "Rejected" },
  completed: { color: "#6C63FF", bg: "rgba(108,99,255,0.1)", border: "rgba(108,99,255,0.3)", label: "Completed" },
};

function StatusBadge({ status }) {
  const cfg = statusConfig[status];
  return (
    <span style={{
      padding: "3px 10px",
      borderRadius: 100,
      fontSize: 11,
      fontWeight: 700,
      fontFamily: "'Syne',sans-serif",
      color: cfg.color,
      background: cfg.bg,
      border: `1px solid ${cfg.border}`,
    }}>
      {cfg.label}
    </span>
  );
}

// ===== SIDEBAR =====
const sidebarItems = [
  { icon: "📊", label: "Overview", key: "overview" },
  { icon: "📋", label: "Bookings", key: "bookings" },
  { icon: "💬", label: "Messages", key: "messages" },
  { icon: "📅", label: "Calendar", key: "calendar" },
  { icon: "💰", label: "Earnings", key: "earnings" },
  { icon: "⭐", label: "Reviews", key: "reviews" },
  { icon: "👤", label: "Edit Profile", key: "profile" },
  { icon: "🔔", label: "Notifications", key: "notifications" },
];

function Sidebar({ active, onChange, role }) {
  return (
    <aside style={{
      width: 240,
      background: "rgba(30,41,59,0.5)",
      borderRight: "1px solid rgba(255,255,255,0.05)",
      padding: "32px 0",
      flexShrink: 0,
      minHeight: "100vh",
    }}>
      {/* Brand */}
      <div style={{ padding: "0 24px 32px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{
          fontFamily: "'Bebas Neue',sans-serif",
          fontSize: 20,
          letterSpacing: 2,
          background: "linear-gradient(135deg, #6C63FF, #FF6B35)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>StageLink Kenya</div>
        <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 4, fontFamily: "'Syne',sans-serif", textTransform: "uppercase", letterSpacing: 1 }}>
          {role === "artist" ? "Artist Dashboard" : "Venue Dashboard"}
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding: "24px 12px" }}>
        {sidebarItems.map((item) => (
          <button
            key={item.key}
            onClick={() => onChange(item.key)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 14px",
              borderRadius: 10,
              border: "none",
              background: active === item.key ? "rgba(108,99,255,0.12)" : "transparent",
              color: active === item.key ? "var(--primary)" : "var(--text-muted)",
              fontFamily: "'Syne',sans-serif",
              fontWeight: 600,
              fontSize: 13,
              cursor: "pointer",
              marginBottom: 4,
              textAlign: "left",
              transition: "all 0.2s",
              borderLeft: active === item.key ? "2px solid var(--primary)" : "2px solid transparent",
            }}
          >
            <span>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* Profile snippet */}
      <div style={{ padding: "0 16px", marginTop: "auto" }}>
        <div style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 12,
          padding: "14px",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}>
          <div style={{
            width: 36, height: 36,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #6C63FF, #FF6B35)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 700, fontSize: 14,
          }}>W</div>
          <div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 13 }}>Wahu Kagwi</div>
            <div style={{ fontSize: 11, color: "var(--text-dim)" }}>Afropop · Nairobi</div>
          </div>
        </div>
      </div>
    </aside>
  );
}


// ===== OVERVIEW PANEL =====
function OverviewPanel() {
  const metrics = [
    { label: "Total Earnings", value: "KSh 840K", change: "+18%", icon: "💰", positive: true },
    { label: "This Month", value: "KSh 95K", change: "+12%", icon: "📈", positive: true },
    { label: "Bookings", value: "47", change: "+5", icon: "📋", positive: true },
    { label: "Avg. Rating", value: "4.9", change: "★★★★★", icon: "⭐", positive: true },
  ];

  return (
    <div>
      <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 36, letterSpacing: 1, marginBottom: 28 }}>
        Good evening, <span style={{ color: "var(--primary)" }}>Wahu</span> 👋
      </h2>

      {/* Metric Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 32 }}>
        {metrics.map((m) => (
          <div key={m.label} style={{
            background: "rgba(30,41,59,0.6)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 14,
            padding: "20px",
            backdropFilter: "blur(10px)",
          }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>{m.icon}</div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 28, letterSpacing: 1, color: "var(--primary)" }}>{m.value}</div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{m.label}</div>
            <div style={{ fontSize: 11, color: m.positive ? "var(--accent-green)" : "#EF4444", marginTop: 6, fontWeight: 600 }}>{m.change}</div>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, marginBottom: 16 }}>Recent Bookings</h3>
      <div style={{ background: "rgba(30,41,59,0.4)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              {["Venue", "Event", "Date", "Amount", "Status"].map((h) => (
                <th key={h} style={{ padding: "14px 16px", textAlign: "left", fontFamily: "'Syne',sans-serif", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: "var(--text-dim)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockBookings.slice(0, 3).map((b, i) => (
              <tr key={b.id} style={{ borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                <td style={{ padding: "14px 16px", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14 }}>{b.venue}</td>
                <td style={{ padding: "14px 16px", fontSize: 13, color: "var(--text-muted)" }}>{b.event}</td>
                <td style={{ padding: "14px 16px", fontSize: 13, color: "var(--text-muted)" }}>{b.date}</td>
                <td style={{ padding: "14px 16px", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 13, color: "var(--accent-green)" }}>{b.amount}</td>
                <td style={{ padding: "14px 16px" }}><StatusBadge status={b.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


// ===== BOOKINGS PANEL =====
function BookingsPanel() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? mockBookings : mockBookings.filter((b) => b.status === filter);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 36, letterSpacing: 1 }}>Booking Requests</h2>
        <div style={{ display: "flex", gap: 8 }}>
          {["all", "pending", "accepted", "completed", "rejected"].map((s) => (
            <button key={s} onClick={() => setFilter(s)} style={{
              padding: "7px 14px",
              borderRadius: 100,
              border: `1px solid ${filter === s ? "var(--primary)" : "rgba(255,255,255,0.1)"}`,
              background: filter === s ? "rgba(108,99,255,0.12)" : "rgba(255,255,255,0.03)",
              color: filter === s ? "var(--primary)" : "var(--text-muted)",
              fontFamily: "'Syne',sans-serif",
              fontWeight: 600,
              fontSize: 12,
              cursor: "pointer",
              textTransform: "capitalize",
              transition: "all 0.2s",
            }}>{s}</button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {filtered.map((b) => (
          <div key={b.id} style={{
            background: "rgba(30,41,59,0.5)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 14,
            padding: 20,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}>
            <div style={{
              width: 48, height: 48,
              borderRadius: 12,
              background: "linear-gradient(135deg, rgba(108,99,255,0.2), rgba(255,107,53,0.1))",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 20, flexShrink: 0,
            }}>🎪</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 15 }}>{b.venue}</div>
              <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 2 }}>{b.event} · {b.date} at {b.time}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 15, color: "var(--accent-green)" }}>{b.amount}</div>
              <StatusBadge status={b.status} />
            </div>
            {b.status === "pending" && (
              <div style={{ display: "flex", gap: 8 }}>
                <button style={{
                  padding: "8px 16px",
                  background: "rgba(16,185,129,0.12)",
                  border: "1px solid rgba(16,185,129,0.3)",
                  borderRadius: 8, color: "var(--accent-green)",
                  fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 12,
                  cursor: "pointer",
                }}>Accept</button>
                <button style={{
                  padding: "8px 16px",
                  background: "rgba(239,68,68,0.08)",
                  border: "1px solid rgba(239,68,68,0.2)",
                  borderRadius: 8, color: "#EF4444",
                  fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 12,
                  cursor: "pointer",
                }}>Decline</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


// ===== MESSAGES PANEL =====
function MessagesPanel() {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 36, letterSpacing: 1, marginBottom: 24 }}>Messages</h2>
      <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 0, border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, overflow: "hidden", height: 480 }}>
        {/* Thread List */}
        <div style={{ background: "rgba(30,41,59,0.5)", borderRight: "1px solid rgba(255,255,255,0.06)", overflowY: "auto" }}>
          {mockMessages.map((m) => (
            <div key={m.id} onClick={() => setSelected(m)} style={{
              padding: "16px",
              borderBottom: "1px solid rgba(255,255,255,0.04)",
              cursor: "pointer",
              background: selected?.id === m.id ? "rgba(108,99,255,0.08)" : "transparent",
              display: "flex", gap: 12, alignItems: "center",
              transition: "background 0.2s",
            }}>
              <div style={{
                width: 40, height: 40,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #6C63FF, #FF6B35)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, fontSize: 14, flexShrink: 0,
              }}>{m.avatar}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 13 }}>{m.from}</span>
                  <span style={{ fontSize: 11, color: "var(--text-dim)" }}>{m.time}</span>
                </div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginTop: 3 }}>{m.preview}</div>
              </div>
              {m.unread && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--primary)", flexShrink: 0 }} />}
            </div>
          ))}
        </div>

        {/* Chat Area */}
        <div style={{ background: "rgba(15,23,42,0.8)", display: "flex", flexDirection: "column" }}>
          {selected ? (
            <>
              <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", fontFamily: "'Syne',sans-serif", fontWeight: 700 }}>
                {selected.from}
              </div>
              <div style={{ flex: 1, padding: 20, overflowY: "auto" }}>
                <div style={{
                  background: "rgba(108,99,255,0.1)",
                  border: "1px solid rgba(108,99,255,0.15)",
                  borderRadius: "14px 14px 14px 0",
                  padding: "12px 16px",
                  maxWidth: "75%",
                  fontSize: 14,
                  lineHeight: 1.5,
                }}>{selected.preview}</div>
              </div>
              <div style={{ padding: 16, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: 10 }}>
                <input
                  type="text"
                  placeholder="Type a message..."
                  style={{
                    flex: 1,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 10,
                    padding: "10px 14px",
                    color: "var(--text)",
                    fontSize: 14,
                    fontFamily: "'DM Sans',sans-serif",
                    outline: "none",
                  }}
                />
                <button style={{
                  padding: "10px 20px",
                  background: "var(--primary)",
                  border: "none",
                  borderRadius: 10,
                  color: "#fff",
                  fontFamily: "'Syne',sans-serif",
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: "pointer",
                }}>Send</button>
              </div>
            </>
          ) : (
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-dim)", flexDirection: "column", gap: 8 }}>
              <span style={{ fontSize: 40 }}>💬</span>
              <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 600 }}>Select a conversation</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


// ===== EARNINGS PANEL =====
function EarningsPanel() {
  const months = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const earnings = [45000, 62000, 58000, 80000, 72000, 95000];
  const maxVal = Math.max(...earnings);

  return (
    <div>
      <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 36, letterSpacing: 1, marginBottom: 24 }}>Earnings Tracker</h2>

      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 28 }}>
        {[
          { label: "Total Earnings", value: "KSh 840,000", icon: "💰" },
          { label: "This Month", value: "KSh 95,000", icon: "📈" },
          { label: "Pending Payout", value: "KSh 175,000", icon: "⏳" },
        ].map((s) => (
          <div key={s.label} style={{
            background: "rgba(30,41,59,0.5)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 14,
            padding: 20,
          }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 26, color: "var(--primary)" }}>{s.value}</div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4, fontFamily: "'Syne',sans-serif" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div style={{
        background: "rgba(30,41,59,0.5)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 14,
        padding: 24,
      }}>
        <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, marginBottom: 24, fontSize: 14, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: 1 }}>Last 6 Months</h3>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 160 }}>
          {months.map((m, i) => (
            <div key={m} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <div style={{
                width: "100%",
                height: `${(earnings[i] / maxVal) * 130}px`,
                background: i === months.length - 1
                  ? "linear-gradient(to top, var(--primary), #a78bfa)"
                  : "rgba(108,99,255,0.2)",
                borderRadius: "6px 6px 0 0",
                transition: "all 0.3s",
                cursor: "pointer",
                border: `1px solid ${i === months.length - 1 ? "rgba(108,99,255,0.5)" : "rgba(108,99,255,0.1)"}`,
              }} />
              <span style={{ fontSize: 11, color: "var(--text-dim)", fontFamily: "'Syne',sans-serif" }}>{m}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


// ===== MAIN DASHBOARD =====
export function ArtistDashboard() {
  const [activePanel, setActivePanel] = useState("overview");

  const renderPanel = () => {
    switch (activePanel) {
      case "overview": return <OverviewPanel />;
      case "bookings": return <BookingsPanel />;
      case "messages": return <MessagesPanel />;
      case "earnings": return <EarningsPanel />;
      default: return (
        <div style={{ textAlign: "center", padding: 60, color: "var(--text-muted)" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🚧</div>
          <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 600 }}>Coming soon</p>
        </div>
      );
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>
      <Sidebar active={activePanel} onChange={setActivePanel} role="artist" />
      <main style={{ flex: 1, padding: 40, overflowY: "auto" }}>
        {renderPanel()}
      </main>
    </div>
  );
}

// ===== VENUE DASHBOARD (similar structure) =====
export function VenueDashboard() {
  const [activePanel, setActivePanel] = useState("overview");

  const venueSidebarItems = [
    { icon: "📊", label: "Overview", key: "overview" },
    { icon: "🔍", label: "Find Artists", key: "search" },
    { icon: "📋", label: "Bookings", key: "bookings" },
    { icon: "📅", label: "Event Calendar", key: "calendar" },
    { icon: "💬", label: "Messages", key: "messages" },
    { icon: "⭐", label: "Reviews", key: "reviews" },
    { icon: "📊", label: "Analytics", key: "analytics" },
    { icon: "🏛️", label: "Venue Profile", key: "profile" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>
      {/* Simplified sidebar for venue */}
      <aside style={{
        width: 240,
        background: "rgba(30,41,59,0.5)",
        borderRight: "1px solid rgba(255,255,255,0.05)",
        padding: "32px 0",
        flexShrink: 0,
      }}>
        <div style={{ padding: "0 24px 32px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{
            fontFamily: "'Bebas Neue',sans-serif", fontSize: 20, letterSpacing: 2,
            background: "linear-gradient(135deg, #6C63FF, #FF6B35)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>StageLink Kenya</div>
          <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 4, fontFamily: "'Syne',sans-serif", textTransform: "uppercase", letterSpacing: 1 }}>Venue Dashboard</div>
        </div>
        <nav style={{ padding: "24px 12px" }}>
          {venueSidebarItems.map((item) => (
            <button key={item.key} onClick={() => setActivePanel(item.key)} style={{
              width: "100%", display: "flex", alignItems: "center", gap: 12,
              padding: "12px 14px", borderRadius: 10, border: "none",
              background: activePanel === item.key ? "rgba(255,107,53,0.1)" : "transparent",
              color: activePanel === item.key ? "var(--secondary)" : "var(--text-muted)",
              fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: 13,
              cursor: "pointer", marginBottom: 4, textAlign: "left", transition: "all 0.2s",
              borderLeft: activePanel === item.key ? "2px solid var(--secondary)" : "2px solid transparent",
            }}>
              <span>{item.icon}</span>{item.label}
            </button>
          ))}
        </nav>
      </aside>

      <main style={{ flex: 1, padding: 40 }}>
        <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 36, letterSpacing: 1, marginBottom: 28 }}>
          Welcome back, <span style={{ color: "var(--secondary)" }}>Alchemist Bar</span> 🎪
        </h2>

        {/* Venue Metrics */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 32 }}>
          {[
            { label: "Total Events", value: "89", icon: "🎭" },
            { label: "Artists Booked", value: "34", icon: "🎤" },
            { label: "Avg. Attendance", value: "420", icon: "👥" },
            { label: "Avg. Rating", value: "4.8 ★", icon: "⭐" },
          ].map((m) => (
            <div key={m.label} style={{
              background: "rgba(30,41,59,0.6)",
              border: "1px solid rgba(255,107,53,0.1)",
              borderRadius: 14, padding: 20,
            }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{m.icon}</div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 28, letterSpacing: 1, color: "var(--secondary)" }}>{m.value}</div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{m.label}</div>
            </div>
          ))}
        </div>

        {activePanel === "search" ? (
          <div>
            <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, marginBottom: 16 }}>Find Artists for Your Venue</h3>
            <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
              {["All Genres", "Afropop", "Hip-Hop", "Jazz", "Electronic", "Gospel"].map((f) => (
                <button key={f} style={{
                  padding: "7px 16px", borderRadius: 100,
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.03)",
                  color: "var(--text-muted)",
                  fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: 12, cursor: "pointer",
                }}>{f}</button>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
              {[
                { name: "Wahu Kagwi", genre: "Afropop", emoji: "🎵", fee: "KSh 80K", rating: 4.9, available: true },
                { name: "DJ Pinye", genre: "Electronic", emoji: "🎧", fee: "KSh 60K", rating: 4.8, available: true },
                { name: "Kagwe Mungai", genre: "Afrobeats", emoji: "🎤", fee: "KSh 95K", rating: 4.7, available: false },
              ].map((a) => (
                <div key={a.name} style={{
                  background: "rgba(30,41,59,0.5)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 14, padding: 20,
                }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>{a.emoji}</div>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 16 }}>{a.name}</div>
                  <div style={{ fontSize: 13, color: "var(--secondary)", marginBottom: 8 }}>{a.genre}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: "var(--accent-green)", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 13 }}>{a.fee}</span>
                    <span style={{ color: "var(--accent-yellow)", fontSize: 12 }}>★ {a.rating}</span>
                  </div>
                  <button style={{
                    width: "100%", marginTop: 12, padding: "9px 0",
                    background: a.available ? "rgba(255,107,53,0.1)" : "rgba(255,255,255,0.04)",
                    border: `1px solid ${a.available ? "rgba(255,107,53,0.3)" : "rgba(255,255,255,0.08)"}`,
                    borderRadius: 8, color: a.available ? "var(--secondary)" : "var(--text-dim)",
                    fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 13, cursor: a.available ? "pointer" : "default",
                  }}>
                    {a.available ? "Send Booking Request" : "Unavailable"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-muted)" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🎪</div>
            <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: 16 }}>
              {activePanel === "overview" ? "Select a section from the sidebar to get started." : `${activePanel} panel coming soon.`}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default ArtistDashboard;
