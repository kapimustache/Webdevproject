// ============================================================
// StageLink Kenya — Admin Dashboard
// File: src/components/AdminDashboard.jsx
// ============================================================

import { useState } from "react";

// ===== MOCK DATA =====
const mockUsers = [
  { id: 1, name: "Wahu Kagwi", email: "wahu@email.com", role: "Artist", status: "active", joined: "Nov 12, 2024", verified: true },
  { id: 2, name: "James Otieno", email: "james@alchemist.ke", role: "Venue", status: "active", joined: "Oct 5, 2024", verified: true },
  { id: 3, name: "Amina Waweru", email: "amina@email.com", role: "Artist", status: "pending", joined: "Dec 1, 2024", verified: false },
  { id: 4, name: "Brian Mwangi", email: "brian@email.com", role: "Artist", status: "active", joined: "Sep 20, 2024", verified: true },
  { id: 5, name: "Nairobi Kitchen", email: "events@nairobikitchen.ke", role: "Venue", status: "pending", joined: "Dec 3, 2024", verified: false },
  { id: 6, name: "Naliaka Wekesa", email: "naliaka@email.com", role: "Artist", status: "suspended", joined: "Aug 14, 2024", verified: false },
];

const mockReports = [
  { id: 1, type: "Fake Profile", from: "DJ Pinye", against: "Unknown Artist", date: "Dec 2, 2024", status: "open" },
  { id: 2, type: "Payment Dispute", from: "Alchemist Bar", against: "Wahu Kagwi", date: "Nov 28, 2024", status: "resolved" },
  { id: 3, type: "Inappropriate Review", from: "The Rustic", against: "Fan Account", date: "Dec 1, 2024", status: "open" },
];

const mockBookingsAdmin = [
  { id: 1, artist: "Wahu Kagwi", venue: "Alchemist Bar", date: "Dec 15, 2024", amount: 80000, status: "accepted" },
  { id: 2, artist: "DJ Pinye", venue: "B-Club", date: "Dec 21, 2024", amount: 60000, status: "pending" },
  { id: 3, artist: "Muthoni Drummer Queen", venue: "KICC", date: "Jan 1, 2025", amount: 120000, status: "completed" },
  { id: 4, artist: "Kagwe Mungai", venue: "Strathmore", date: "Jan 5, 2025", amount: 50000, status: "rejected" },
];

// ===== HELPERS =====
function StatusPill({ status }) {
  const map = {
    active: { bg: "rgba(16,185,129,0.1)", color: "#10B981", border: "rgba(16,185,129,0.3)" },
    pending: { bg: "rgba(245,158,11,0.1)", color: "#F59E0B", border: "rgba(245,158,11,0.3)" },
    suspended: { bg: "rgba(239,68,68,0.1)", color: "#EF4444", border: "rgba(239,68,68,0.3)" },
    resolved: { bg: "rgba(108,99,255,0.1)", color: "#6C63FF", border: "rgba(108,99,255,0.3)" },
    open: { bg: "rgba(245,158,11,0.1)", color: "#F59E0B", border: "rgba(245,158,11,0.3)" },
    accepted: { bg: "rgba(16,185,129,0.1)", color: "#10B981", border: "rgba(16,185,129,0.3)" },
    completed: { bg: "rgba(108,99,255,0.1)", color: "#6C63FF", border: "rgba(108,99,255,0.3)" },
    rejected: { bg: "rgba(239,68,68,0.1)", color: "#EF4444", border: "rgba(239,68,68,0.3)" },
  };
  const s = map[status] || map.pending;
  return (
    <span style={{
      padding: "3px 10px", borderRadius: 100,
      fontSize: 11, fontWeight: 700,
      fontFamily: "'Syne',sans-serif",
      color: s.color, background: s.bg,
      border: `1px solid ${s.border}`,
      textTransform: "capitalize",
    }}>{status}</span>
  );
}

function TableHeader({ cols }) {
  return (
    <thead>
      <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        {cols.map((c) => (
          <th key={c} style={{
            padding: "12px 16px", textAlign: "left",
            fontFamily: "'Syne',sans-serif", fontSize: 11,
            letterSpacing: 1, textTransform: "uppercase",
            color: "var(--text-dim)", whiteSpace: "nowrap",
          }}>{c}</th>
        ))}
      </tr>
    </thead>
  );
}

const tableStyle = {
  background: "rgba(30,41,59,0.4)",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: 14, overflow: "hidden",
  width: "100%",
};

const actionBtnStyle = (color = "#6C63FF") => ({
  padding: "5px 12px",
  borderRadius: 6,
  border: `1px solid ${color}40`,
  background: `${color}12`,
  color,
  fontFamily: "'Syne',sans-serif",
  fontWeight: 700, fontSize: 11,
  cursor: "pointer", transition: "all 0.2s",
});

// ===== ADMIN SIDEBAR =====
const adminNavItems = [
  { icon: "📊", label: "Analytics", key: "analytics" },
  { icon: "👥", label: "Users", key: "users" },
  { icon: "📋", label: "Bookings", key: "bookings" },
  { icon: "🎪", label: "Venues", key: "venues" },
  { icon: "🎤", label: "Artists", key: "artists" },
  { icon: "⭐", label: "Reviews", key: "reviews" },
  { icon: "🚨", label: "Reports", key: "reports" },
  { icon: "📅", label: "Events", key: "events" },
  { icon: "⚙️", label: "Settings", key: "settings" },
];

function AdminSidebar({ active, onChange }) {
  return (
    <aside style={{
      width: 240, background: "rgba(30,41,59,0.5)",
      borderRight: "1px solid rgba(255,255,255,0.05)",
      padding: "32px 0", flexShrink: 0, minHeight: "100vh",
    }}>
      <div style={{ padding: "0 24px 32px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{
          fontFamily: "'Bebas Neue',sans-serif", fontSize: 20, letterSpacing: 2,
          background: "linear-gradient(135deg, #6C63FF, #FF6B35)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>StageLink Kenya</div>
        <div style={{
          fontSize: 11, color: "#EF4444", marginTop: 4,
          fontFamily: "'Syne',sans-serif", textTransform: "uppercase",
          letterSpacing: 1, fontWeight: 700,
        }}>⚡ Admin Panel</div>
      </div>

      <nav style={{ padding: "24px 12px" }}>
        {adminNavItems.map((item) => (
          <button key={item.key} onClick={() => onChange(item.key)} style={{
            width: "100%", display: "flex", alignItems: "center", gap: 12,
            padding: "12px 14px", borderRadius: 10, border: "none",
            background: active === item.key ? "rgba(239,68,68,0.08)" : "transparent",
            color: active === item.key ? "#EF4444" : "var(--text-muted)",
            fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: 13,
            cursor: "pointer", marginBottom: 4, textAlign: "left",
            transition: "all 0.2s",
            borderLeft: active === item.key ? "2px solid #EF4444" : "2px solid transparent",
          }}>
            <span>{item.icon}</span>{item.label}
            {item.key === "reports" && (
              <span style={{
                marginLeft: "auto", background: "#EF4444",
                color: "#fff", borderRadius: 100, fontSize: 10,
                fontWeight: 700, padding: "1px 6px",
              }}>2</span>
            )}
          </button>
        ))}
      </nav>

      {/* Admin badge */}
      <div style={{ padding: "0 16px" }}>
        <div style={{
          background: "rgba(239,68,68,0.08)",
          border: "1px solid rgba(239,68,68,0.2)",
          borderRadius: 12, padding: 14,
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "linear-gradient(135deg, #EF4444, #F59E0B)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 700, fontSize: 14,
          }}>A</div>
          <div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 13 }}>Admin User</div>
            <div style={{ fontSize: 11, color: "#EF4444", fontWeight: 600 }}>Super Admin</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

// ===== ANALYTICS PANEL =====
function AnalyticsPanel() {
  const kpis = [
    { label: "Total Users", value: "1,847", change: "+124 this month", icon: "👥", color: "#6C63FF" },
    { label: "Monthly Bookings", value: "312", change: "+47 this month", icon: "📋", color: "#10B981" },
    { label: "Revenue (KSh)", value: "4.2M", change: "+18% vs last month", icon: "💰", color: "#F59E0B" },
    { label: "Active Artists", value: "487", change: "+23 pending approval", icon: "🎤", color: "#FF6B35" },
    { label: "Active Venues", value: "118", change: "+5 pending approval", icon: "🎪", color: "#a78bfa" },
    { label: "Avg. Booking Value", value: "KSh 82K", change: "+12% vs last month", icon: "📈", color: "#10B981" },
  ];

  const recentActivity = [
    { icon: "🎤", text: "Amina Waweru registered as Artist", time: "2 min ago", type: "user" },
    { icon: "📋", text: "New booking: DJ Pinye @ B-Club — KSh 60,000", time: "15 min ago", type: "booking" },
    { icon: "⭐", text: "New 5-star review for Alchemist Bar", time: "1h ago", type: "review" },
    { icon: "🚨", text: "Report filed: Fake Profile — needs review", time: "2h ago", type: "report" },
    { icon: "✅", text: "Venue approved: Nairobi Kitchen", time: "3h ago", type: "approval" },
    { icon: "💰", text: "Payment completed: KSh 120,000 via M-Pesa", time: "4h ago", type: "payment" },
  ];

  const typeColors = {
    user: "#6C63FF", booking: "#10B981", review: "#F59E0B",
    report: "#EF4444", approval: "#10B981", payment: "#FF6B35",
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 36, letterSpacing: 1 }}>
          Platform <span style={{ color: "#EF4444" }}>Analytics</span>
        </h2>
        <div style={{ display: "flex", gap: 8 }}>
          {["Today", "7 Days", "30 Days", "All Time"].map((p) => (
            <button key={p} style={{
              padding: "7px 14px", borderRadius: 8,
              border: p === "30 Days" ? "1px solid #EF4444" : "1px solid rgba(255,255,255,0.1)",
              background: p === "30 Days" ? "rgba(239,68,68,0.1)" : "rgba(255,255,255,0.03)",
              color: p === "30 Days" ? "#EF4444" : "var(--text-muted)",
              fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: 12, cursor: "pointer",
            }}>{p}</button>
          ))}
        </div>
      </div>

      {/* KPI Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 28 }}>
        {kpis.map((k) => (
          <div key={k.label} style={{
            background: "rgba(30,41,59,0.5)",
            border: `1px solid ${k.color}20`,
            borderRadius: 14, padding: 20,
            position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: -10, right: -10,
              width: 70, height: 70, borderRadius: "50%",
              background: `${k.color}10`,
            }} />
            <div style={{ fontSize: 24, marginBottom: 8 }}>{k.icon}</div>
            <div style={{
              fontFamily: "'Bebas Neue',sans-serif", fontSize: 32,
              letterSpacing: 1, color: k.color,
            }}>{k.value}</div>
            <div style={{
              fontFamily: "'Syne',sans-serif", fontSize: 12,
              color: "var(--text-muted)", marginTop: 2,
            }}>{k.label}</div>
            <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 6 }}>{k.change}</div>
          </div>
        ))}
      </div>

      {/* Bar Chart + Activity Feed */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20 }}>
        {/* Chart */}
        <div style={{
          background: "rgba(30,41,59,0.4)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 14, padding: 24,
        }}>
          <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, marginBottom: 24, color: "var(--text-muted)", fontSize: 13, letterSpacing: 1, textTransform: "uppercase" }}>
            Monthly Bookings & Revenue
          </h3>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 160 }}>
            {[
              { month: "Jul", bookings: 180, rev: 60 },
              { month: "Aug", bookings: 210, rev: 72 },
              { month: "Sep", bookings: 240, rev: 82 },
              { month: "Oct", bookings: 280, rev: 90 },
              { month: "Nov", bookings: 260, rev: 86 },
              { month: "Dec", bookings: 312, rev: 100 },
            ].map((d) => (
              <div key={d.month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <div style={{ width: "100%", display: "flex", gap: 4, alignItems: "flex-end", height: 130 }}>
                  <div style={{
                    flex: 1,
                    height: `${(d.bookings / 312) * 120}px`,
                    background: d.month === "Dec" ? "#6C63FF" : "rgba(108,99,255,0.25)",
                    borderRadius: "4px 4px 0 0",
                    border: `1px solid rgba(108,99,255,${d.month === "Dec" ? 0.6 : 0.15})`,
                  }} />
                  <div style={{
                    flex: 1,
                    height: `${(d.rev / 100) * 120}px`,
                    background: d.month === "Dec" ? "#FF6B35" : "rgba(255,107,53,0.2)",
                    borderRadius: "4px 4px 0 0",
                    border: `1px solid rgba(255,107,53,${d.month === "Dec" ? 0.6 : 0.15})`,
                  }} />
                </div>
                <span style={{ fontSize: 11, color: "var(--text-dim)", fontFamily: "'Syne',sans-serif" }}>{d.month}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 20, marginTop: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--text-muted)" }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: "#6C63FF" }} /> Bookings
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--text-muted)" }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: "#FF6B35" }} /> Revenue (×10K KSh)
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div style={{
          background: "rgba(30,41,59,0.4)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 14, padding: 20,
        }}>
          <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, marginBottom: 20, fontSize: 14 }}>Live Activity</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {recentActivity.map((a, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "flex-start", gap: 10,
                paddingBottom: 12,
                borderBottom: i < recentActivity.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
              }}>
                <div style={{
                  width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                  background: `${typeColors[a.type]}15`,
                  border: `1px solid ${typeColors[a.type]}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13,
                }}>{a.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, lineHeight: 1.4, color: "var(--text-muted)" }}>{a.text}</div>
                  <div style={{ fontSize: 10, color: "var(--text-dim)", marginTop: 3 }}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== USERS PANEL =====
function UsersPanel() {
  const [roleFilter, setRoleFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = mockUsers.filter((u) =>
    (roleFilter === "All" || u.role === roleFilter) &&
    (u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 36, letterSpacing: 1 }}>
          Manage <span style={{ color: "#EF4444" }}>Users</span>
        </h2>
        <div style={{ display: "flex", gap: 10 }}>
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "9px 14px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 8, color: "var(--text)",
              fontSize: 13, fontFamily: "'DM Sans',sans-serif", outline: "none",
              width: 220,
            }}
          />
          {["All", "Artist", "Venue", "Fan"].map((r) => (
            <button key={r} onClick={() => setRoleFilter(r)} style={{
              padding: "8px 14px", borderRadius: 8,
              border: `1px solid ${roleFilter === r ? "#EF4444" : "rgba(255,255,255,0.1)"}`,
              background: roleFilter === r ? "rgba(239,68,68,0.1)" : "rgba(255,255,255,0.03)",
              color: roleFilter === r ? "#EF4444" : "var(--text-muted)",
              fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: 12, cursor: "pointer",
            }}>{r}</button>
          ))}
        </div>
      </div>

      <div style={tableStyle}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <TableHeader cols={["User", "Email", "Role", "Joined", "Verified", "Status", "Actions"]} />
          <tbody>
            {filtered.map((u, i) => (
              <tr key={u.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: "50%",
                      background: "linear-gradient(135deg, #6C63FF, #FF6B35)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: 700, fontSize: 13, flexShrink: 0,
                    }}>{u.name[0]}</div>
                    <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14 }}>{u.name}</span>
                  </div>
                </td>
                <td style={{ padding: "14px 16px", fontSize: 13, color: "var(--text-muted)" }}>{u.email}</td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{
                    padding: "3px 10px", borderRadius: 100,
                    fontSize: 11, fontFamily: "'Syne',sans-serif", fontWeight: 700,
                    background: u.role === "Artist" ? "rgba(108,99,255,0.1)" : u.role === "Venue" ? "rgba(255,107,53,0.1)" : "rgba(255,255,255,0.06)",
                    color: u.role === "Artist" ? "#6C63FF" : u.role === "Venue" ? "#FF6B35" : "var(--text-muted)",
                    border: `1px solid ${u.role === "Artist" ? "rgba(108,99,255,0.3)" : u.role === "Venue" ? "rgba(255,107,53,0.3)" : "rgba(255,255,255,0.1)"}`,
                  }}>{u.role}</span>
                </td>
                <td style={{ padding: "14px 16px", fontSize: 13, color: "var(--text-muted)" }}>{u.joined}</td>
                <td style={{ padding: "14px 16px" }}>
                  {u.verified
                    ? <span style={{ color: "#10B981", fontSize: 16 }}>✓</span>
                    : <span style={{ color: "var(--text-dim)", fontSize: 16 }}>—</span>}
                </td>
                <td style={{ padding: "14px 16px" }}><StatusPill status={u.status} /></td>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    {!u.verified && (
                      <button style={actionBtnStyle("#10B981")}>Approve</button>
                    )}
                    {u.status !== "suspended" && (
                      <button style={actionBtnStyle("#EF4444")}>Suspend</button>
                    )}
                    <button style={actionBtnStyle("#6C63FF")}>View</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ===== BOOKINGS PANEL (ADMIN) =====
function AdminBookingsPanel() {
  return (
    <div>
      <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 36, letterSpacing: 1, marginBottom: 24 }}>
        All <span style={{ color: "#EF4444" }}>Bookings</span>
      </h2>

      {/* Summary pills */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        {[
          { label: "All", count: 312, color: "var(--text-muted)" },
          { label: "Pending", count: 28, color: "#F59E0B" },
          { label: "Accepted", count: 189, color: "#10B981" },
          { label: "Completed", count: 84, color: "#6C63FF" },
          { label: "Rejected", count: 11, color: "#EF4444" },
        ].map((s) => (
          <div key={s.label} style={{
            padding: "10px 16px", borderRadius: 10,
            background: "rgba(30,41,59,0.5)",
            border: "1px solid rgba(255,255,255,0.06)",
            textAlign: "center",
          }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 22, color: s.color }}>{s.count}</div>
            <div style={{ fontSize: 11, color: "var(--text-dim)", fontFamily: "'Syne',sans-serif" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={tableStyle}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <TableHeader cols={["#", "Artist", "Venue", "Date", "Amount (KSh)", "Status", "Actions"]} />
          <tbody>
            {mockBookingsAdmin.map((b, i) => (
              <tr key={b.id} style={{ borderBottom: i < mockBookingsAdmin.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                <td style={{ padding: "14px 16px", color: "var(--text-dim)", fontSize: 13 }}>#{b.id.toString().padStart(3, "0")}</td>
                <td style={{ padding: "14px 16px", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14 }}>{b.artist}</td>
                <td style={{ padding: "14px 16px", fontSize: 13, color: "var(--text-muted)" }}>{b.venue}</td>
                <td style={{ padding: "14px 16px", fontSize: 13, color: "var(--text-muted)" }}>{b.date}</td>
                <td style={{ padding: "14px 16px", fontFamily: "'Syne',sans-serif", fontWeight: 700, color: "#10B981", fontSize: 14 }}>
                  {b.amount.toLocaleString()}
                </td>
                <td style={{ padding: "14px 16px" }}><StatusPill status={b.status} /></td>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button style={actionBtnStyle("#6C63FF")}>View</button>
                    <button style={actionBtnStyle("#EF4444")}>Cancel</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ===== REPORTS PANEL =====
function ReportsPanel() {
  return (
    <div>
      <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 36, letterSpacing: 1, marginBottom: 24 }}>
        Reports & <span style={{ color: "#EF4444" }}>Moderation</span>
      </h2>

      {/* Open Reports Alert */}
      <div style={{
        background: "rgba(239,68,68,0.08)",
        border: "1px solid rgba(239,68,68,0.2)",
        borderRadius: 12, padding: "14px 20px",
        display: "flex", alignItems: "center", gap: 12,
        marginBottom: 24,
      }}>
        <span style={{ fontSize: 20 }}>🚨</span>
        <div>
          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14, color: "#EF4444" }}>2 Open Reports Require Attention</div>
          <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Please review and take action within 24 hours per platform policy.</div>
        </div>
      </div>

      <div style={tableStyle}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <TableHeader cols={["Type", "Reported By", "Against", "Date", "Status", "Actions"]} />
          <tbody>
            {mockReports.map((r, i) => (
              <tr key={r.id} style={{ borderBottom: i < mockReports.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{
                    padding: "3px 10px", borderRadius: 6,
                    fontSize: 11, fontWeight: 700, fontFamily: "'Syne',sans-serif",
                    background: "rgba(239,68,68,0.1)", color: "#EF4444",
                    border: "1px solid rgba(239,68,68,0.2)",
                  }}>{r.type}</span>
                </td>
                <td style={{ padding: "14px 16px", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14 }}>{r.from}</td>
                <td style={{ padding: "14px 16px", fontSize: 13, color: "var(--text-muted)" }}>{r.against}</td>
                <td style={{ padding: "14px 16px", fontSize: 13, color: "var(--text-muted)" }}>{r.date}</td>
                <td style={{ padding: "14px 16px" }}><StatusPill status={r.status} /></td>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    {r.status === "open" && (
                      <>
                        <button style={actionBtnStyle("#10B981")}>Resolve</button>
                        <button style={actionBtnStyle("#EF4444")}>Escalate</button>
                      </>
                    )}
                    <button style={actionBtnStyle("#6C63FF")}>View</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ===== MAIN ADMIN DASHBOARD =====
export function AdminDashboard() {
  const [activePanel, setActivePanel] = useState("analytics");

  const renderPanel = () => {
    switch (activePanel) {
      case "analytics": return <AnalyticsPanel />;
      case "users": return <UsersPanel />;
      case "bookings": return <AdminBookingsPanel />;
      case "reports": return <ReportsPanel />;
      default: return (
        <div style={{ textAlign: "center", padding: 80, color: "var(--text-muted)" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>⚙️</div>
          <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: 16 }}>
            {activePanel.charAt(0).toUpperCase() + activePanel.slice(1)} panel — coming soon
          </p>
        </div>
      );
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>
      <AdminSidebar active={activePanel} onChange={setActivePanel} />
      <main style={{ flex: 1, padding: 40, overflowY: "auto" }}>
        {renderPanel()}
      </main>
    </div>
  );
}

export default AdminDashboard;
