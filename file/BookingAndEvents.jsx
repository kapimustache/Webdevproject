// ============================================================
// StageLink Kenya — Booking System + Event Discovery
// File: src/components/BookingSystem.jsx
// ============================================================

import { useState } from "react";

// ===== BOOKING FLOW COMPONENT =====
// A multi-step booking modal that walks through:
// Step 1: Select date & time
// Step 2: Event details
// Step 3: Payment
// Step 4: Confirmation

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 8,
  color: "var(--text)",
  fontSize: 14,
  fontFamily: "'DM Sans',sans-serif",
  outline: "none",
  transition: "border-color 0.2s",
  boxSizing: "border-box",
};

const labelStyle = {
  fontFamily: "'Syne',sans-serif",
  fontSize: 11,
  fontWeight: 700,
  color: "var(--text-muted)",
  letterSpacing: 0.5,
  textTransform: "uppercase",
  display: "block",
  marginBottom: 6,
};

function StepIndicator({ current, total }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 32 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", flex: i < total - 1 ? 1 : "unset" }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 13,
            background: i < current ? "var(--primary)" : i === current ? "var(--primary)" : "rgba(255,255,255,0.06)",
            color: i <= current ? "#fff" : "var(--text-dim)",
            border: `2px solid ${i <= current ? "var(--primary)" : "rgba(255,255,255,0.1)"}`,
            transition: "all 0.3s", flexShrink: 0,
          }}>
            {i < current ? "✓" : i + 1}
          </div>
          {i < total - 1 && (
            <div style={{
              flex: 1, height: 2,
              background: i < current ? "var(--primary)" : "rgba(255,255,255,0.06)",
              transition: "background 0.3s",
            }} />
          )}
        </div>
      ))}
    </div>
  );
}

// Step 1: Date & Time
function StepDateTime({ data, onChange }) {
  const timeSlots = ["6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM"];
  return (
    <div>
      <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 20, marginBottom: 6 }}>Select Date & Time</h3>
      <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 24 }}>Choose when you want the performance.</p>
      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle}>Performance Date</label>
        <input
          type="date"
          style={{ ...inputStyle, colorScheme: "dark" }}
          value={data.date}
          onChange={(e) => onChange({ ...data, date: e.target.value })}
          min={new Date().toISOString().split("T")[0]}
        />
      </div>
      <div>
        <label style={labelStyle}>Start Time</label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
          {timeSlots.map((t) => (
            <button
              key={t}
              onClick={() => onChange({ ...data, time: t })}
              style={{
                padding: "10px 0",
                borderRadius: 8,
                border: `1px solid ${data.time === t ? "var(--primary)" : "rgba(255,255,255,0.08)"}`,
                background: data.time === t ? "rgba(108,99,255,0.12)" : "rgba(255,255,255,0.03)",
                color: data.time === t ? "var(--primary)" : "var(--text-muted)",
                fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: 13,
                cursor: "pointer", transition: "all 0.2s",
              }}
            >{t}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Step 2: Event Details
function StepEventDetails({ data, onChange }) {
  return (
    <div>
      <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 20, marginBottom: 6 }}>Event Details</h3>
      <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 24 }}>Tell the artist about your event.</p>
      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>Event Name</label>
        <input
          type="text"
          style={inputStyle}
          placeholder="e.g. Friday Night Live"
          value={data.eventName}
          onChange={(e) => onChange({ ...data, eventName: e.target.value })}
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>Expected Audience Size</label>
        <select
          style={{ ...inputStyle, cursor: "pointer" }}
          value={data.audienceSize}
          onChange={(e) => onChange({ ...data, audienceSize: e.target.value })}
        >
          <option value="">Select audience size...</option>
          <option>Under 100</option>
          <option>100 – 300</option>
          <option>300 – 500</option>
          <option>500 – 1,000</option>
          <option>Over 1,000</option>
        </select>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>Event Description</label>
        <textarea
          style={{ ...inputStyle, minHeight: 80, resize: "vertical" }}
          placeholder="Describe the event, audience type, vibe, any special requirements..."
          value={data.description}
          onChange={(e) => onChange({ ...data, description: e.target.value })}
        />
      </div>
      <div>
        <label style={labelStyle}>Special Requirements / Notes</label>
        <input
          type="text"
          style={inputStyle}
          placeholder="e.g. Needs sound system, 2 support sets first..."
          value={data.notes}
          onChange={(e) => onChange({ ...data, notes: e.target.value })}
        />
      </div>
    </div>
  );
}

// Step 3: Payment
function StepPayment({ data, onChange, artistFee }) {
  const platformFee = Math.round(artistFee * 0.05);
  const total = artistFee + platformFee;

  return (
    <div>
      <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 20, marginBottom: 6 }}>Payment Details</h3>
      <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 24 }}>Choose your payment method.</p>

      {/* Fee Breakdown */}
      <div style={{
        background: "rgba(16,185,129,0.06)",
        border: "1px solid rgba(16,185,129,0.15)",
        borderRadius: 12, padding: 16, marginBottom: 20,
      }}>
        {[
          { label: "Artist Performance Fee", value: `KSh ${artistFee.toLocaleString()}` },
          { label: "Platform Fee (5%)", value: `KSh ${platformFee.toLocaleString()}` },
        ].map((item) => (
          <div key={item.label} style={{
            display: "flex", justifyContent: "space-between",
            fontSize: 13, color: "var(--text-muted)",
            marginBottom: 8, paddingBottom: 8,
            borderBottom: "1px solid rgba(255,255,255,0.04)",
          }}>
            <span>{item.label}</span>
            <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 600 }}>{item.value}</span>
          </div>
        ))}
        <div style={{
          display: "flex", justifyContent: "space-between",
          fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 16,
          color: "#10B981",
        }}>
          <span>Total</span>
          <span>KSh {total.toLocaleString()}</span>
        </div>
      </div>

      {/* Payment Method */}
      <label style={labelStyle}>Payment Method</label>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
        {[
          { key: "mpesa", icon: "📱", label: "M-Pesa", sub: "Pay via Safaricom M-Pesa STK Push" },
          { key: "stripe", icon: "💳", label: "Credit / Debit Card", sub: "Visa, Mastercard — powered by Stripe" },
          { key: "bank", icon: "🏦", label: "Bank Transfer", sub: "Direct bank transfer — takes 1–2 days" },
        ].map((m) => (
          <div
            key={m.key}
            onClick={() => onChange({ ...data, method: m.key })}
            style={{
              padding: "14px 16px", borderRadius: 10, cursor: "pointer",
              border: `1px solid ${data.method === m.key ? "var(--primary)" : "rgba(255,255,255,0.08)"}`,
              background: data.method === m.key ? "rgba(108,99,255,0.08)" : "rgba(255,255,255,0.02)",
              display: "flex", alignItems: "center", gap: 12,
              transition: "all 0.2s",
            }}
          >
            <span style={{ fontSize: 22 }}>{m.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14 }}>{m.label}</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{m.sub}</div>
            </div>
            <div style={{
              width: 18, height: 18, borderRadius: "50%",
              border: `2px solid ${data.method === m.key ? "var(--primary)" : "rgba(255,255,255,0.2)"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {data.method === m.key && (
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--primary)" }} />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* M-Pesa number field */}
      {data.method === "mpesa" && (
        <div>
          <label style={labelStyle}>M-Pesa Phone Number</label>
          <input
            type="tel"
            style={inputStyle}
            placeholder="0712 345 678"
            value={data.phone || ""}
            onChange={(e) => onChange({ ...data, phone: e.target.value })}
          />
        </div>
      )}
    </div>
  );
}

// Step 4: Confirmation
function StepConfirmation({ bookingData, artist }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{
        width: 72, height: 72, borderRadius: "50%",
        background: "rgba(16,185,129,0.12)",
        border: "2px solid rgba(16,185,129,0.3)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 30, margin: "0 auto 20px",
        boxShadow: "0 0 40px rgba(16,185,129,0.2)",
      }}>🎉</div>
      <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 32, letterSpacing: 1, marginBottom: 8 }}>
        Booking Request Sent!
      </h3>
      <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 24, lineHeight: 1.6 }}>
        Your booking request has been sent to <strong style={{ color: "var(--text)" }}>{artist?.name}</strong>. You'll get a notification once they accept.
      </p>

      {/* Summary Card */}
      <div style={{
        background: "rgba(30,41,59,0.5)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 12, padding: 20, textAlign: "left",
      }}>
        {[
          { icon: "🎤", label: "Artist", value: artist?.name },
          { icon: "📅", label: "Date", value: bookingData.date },
          { icon: "🕐", label: "Time", value: bookingData.time },
          { icon: "🎭", label: "Event", value: bookingData.eventName },
          { icon: "💰", label: "Amount", value: `KSh ${artist?.feeNum?.toLocaleString()}` },
          { icon: "📱", label: "Payment", value: bookingData.method?.toUpperCase() },
        ].map((row) => (
          <div key={row.label} style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "8px 0",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
          }}>
            <span>{row.icon}</span>
            <span style={{ color: "var(--text-muted)", fontSize: 13, width: 70 }}>{row.label}</span>
            <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: 13 }}>{row.value || "—"}</span>
          </div>
        ))}
      </div>

      <p style={{ fontSize: 12, color: "var(--text-dim)", marginTop: 16 }}>
        Booking ID: <span style={{ fontFamily: "monospace", color: "var(--primary)" }}>SLK-{Math.floor(Math.random() * 90000 + 10000)}</span>
      </p>
    </div>
  );
}

export function BookingModal({ isOpen, onClose, artist }) {
  const [step, setStep] = useState(0);
  const [dateTime, setDateTime] = useState({ date: "", time: "" });
  const [eventDetails, setEventDetails] = useState({ eventName: "", audienceSize: "", description: "", notes: "" });
  const [payment, setPayment] = useState({ method: "mpesa", phone: "" });

  const artistFee = artist?.feeNum || 80000;
  const steps = ["Date & Time", "Event Details", "Payment", "Confirm"];
  const canNext = [
    dateTime.date && dateTime.time,
    eventDetails.eventName && eventDetails.audienceSize,
    payment.method,
    true,
  ][step];

  const handleNext = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else onClose();
  };

  const resetAndClose = () => { setStep(0); onClose(); };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.85)",
        zIndex: 9999,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24,
        backdropFilter: "blur(4px)",
      }}
      onClick={(e) => e.target === e.currentTarget && resetAndClose()}
    >
      <div style={{
        background: "var(--bg-mid)",
        border: "1px solid rgba(108,99,255,0.2)",
        borderRadius: 20, padding: "36px",
        width: "100%", maxWidth: 500,
        maxHeight: "90vh", overflowY: "auto",
        position: "relative",
      }}>
        <button
          onClick={resetAndClose}
          style={{
            position: "absolute", top: 16, right: 16,
            width: 32, height: 32, borderRadius: 8,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "var(--text-muted)", fontSize: 16,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
          }}
        >✕</button>

        {/* Artist Mini Card */}
        {artist && (
          <div style={{
            display: "flex", alignItems: "center", gap: 12,
            background: "rgba(108,99,255,0.06)",
            border: "1px solid rgba(108,99,255,0.12)",
            borderRadius: 10, padding: "10px 14px", marginBottom: 24,
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10, flexShrink: 0,
              background: "linear-gradient(135deg, #6C63FF, #FF6B35)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18,
            }}>{artist.emoji}</div>
            <div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14 }}>{artist.name}</div>
              <div style={{ fontSize: 12, color: "var(--secondary)" }}>{artist.genre}</div>
            </div>
            <div style={{ marginLeft: "auto", fontFamily: "'Syne',sans-serif", fontWeight: 700, color: "#10B981", fontSize: 13 }}>
              {artist.fee}
            </div>
          </div>
        )}

        <StepIndicator current={step} total={steps.length} />

        {step === 0 && <StepDateTime data={dateTime} onChange={setDateTime} />}
        {step === 1 && <StepEventDetails data={eventDetails} onChange={setEventDetails} />}
        {step === 2 && <StepPayment data={payment} onChange={setPayment} artistFee={artistFee} />}
        {step === 3 && <StepConfirmation bookingData={{ ...dateTime, ...eventDetails, ...payment }} artist={artist} />}

        <div style={{ display: "flex", gap: 10, marginTop: 28 }}>
          {step > 0 && step < steps.length - 1 && (
            <button
              onClick={() => setStep(step - 1)}
              style={{
                flex: 1, padding: "12px 0",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 10, color: "var(--text-muted)",
                fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14,
                cursor: "pointer",
              }}
            >← Back</button>
          )}
          <button
            onClick={handleNext}
            disabled={!canNext}
            style={{
              flex: 2, padding: "12px 0",
              background: canNext ? "var(--primary)" : "rgba(108,99,255,0.3)",
              border: "none", borderRadius: 10, color: "#fff",
              fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 15,
              cursor: canNext ? "pointer" : "not-allowed",
              boxShadow: canNext ? "0 0 30px rgba(108,99,255,0.4)" : "none",
              transition: "all 0.2s",
            }}
          >
            {step === steps.length - 2
              ? `Send Request — KSh ${(artistFee * 1.05).toLocaleString()}`
              : step === steps.length - 1 ? "Done ✓" : "Continue →"}
          </button>
        </div>
      </div>
    </div>
  );
}


// ============================================================
// StageLink Kenya — Event Discovery
// File: src/components/EventDiscovery.jsx
// ============================================================

const mockEvents = [
  { id: 1, name: "Friday Night Live", artist: "Wahu Kagwi", venue: "Alchemist Bar", date: "Dec 15, 2024", time: "9:00 PM", genre: "Afropop", price: 500, emoji: "🎵", location: "Westlands", image: "🎸" },
  { id: 2, name: "Deep House Sessions", artist: "DJ Pinye", venue: "B-Club", date: "Dec 21, 2024", time: "10:00 PM", genre: "Electronic", price: 1000, emoji: "🎧", location: "Upper Hill", image: "🎛️" },
  { id: 3, name: "Jazz & Wine Evening", artist: "The Rustic Jazz Quartet", venue: "Nairobi Kitchen", date: "Dec 20, 2024", time: "7:00 PM", genre: "Jazz", price: 1500, emoji: "🎷", location: "Kilimani", image: "🍷" },
  { id: 4, name: "Spoken Word Nairobi", artist: "Naliaka Wekesa", venue: "Strathmore University", date: "Jan 5, 2025", time: "6:00 PM", genre: "Spoken Word", price: 300, emoji: "🎙️", location: "Madaraka", image: "📖" },
  { id: 5, name: "Afrobeats NYE Pre-Party", artist: "Kagwe Mungai", venue: "KICC Amphitheatre", date: "Dec 28, 2024", time: "8:00 PM", genre: "Afrobeats", price: 2000, emoji: "🎉", location: "CBD", image: "🎊" },
  { id: 6, name: "Comedy Night Nairobi", artist: "Rabbit King Kaka", venue: "The Rustic", date: "Jan 10, 2025", time: "7:30 PM", genre: "Comedy", price: 800, emoji: "😂", location: "Lavington", image: "🎭" },
];

function EventCard({ event, onBook }) {
  return (
    <div style={{
      background: "rgba(30,41,59,0.6)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: 16,
      overflow: "hidden",
      transition: "all 0.3s",
      cursor: "pointer",
    }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.borderColor = "rgba(108,99,255,0.3)";
        e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Event Image */}
      <div style={{
        height: 160,
        background: "linear-gradient(135deg, rgba(108,99,255,0.25), rgba(255,107,53,0.15))",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 56, position: "relative",
      }}>
        {event.image}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, transparent 40%, rgba(10,14,26,0.9))",
        }} />
        <div style={{ position: "absolute", top: 12, left: 12 }}>
          <span style={{
            padding: "3px 10px", borderRadius: 100,
            fontSize: 11, fontWeight: 700, fontFamily: "'Syne',sans-serif",
            background: "rgba(108,99,255,0.8)", color: "#fff",
          }}>{event.genre}</span>
        </div>
        <div style={{ position: "absolute", top: 12, right: 12 }}>
          <span style={{
            padding: "3px 10px", borderRadius: 100,
            fontSize: 11, fontWeight: 700, fontFamily: "'Syne',sans-serif",
            background: "rgba(16,185,129,0.8)", color: "#fff",
          }}>KSh {event.price.toLocaleString()}</span>
        </div>
      </div>

      {/* Event Body */}
      <div style={{ padding: 18 }}>
        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 16, marginBottom: 4 }}>{event.name}</div>
        <div style={{ fontSize: 13, color: "var(--secondary)", marginBottom: 6, fontWeight: 600 }}>
          {event.emoji} {event.artist}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 5 }}>
            <span>🏛️</span> {event.venue}
          </div>
          <div style={{ fontSize: 12, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 5 }}>
            <span>📍</span> {event.location}
          </div>
          <div style={{ fontSize: 12, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 5 }}>
            <span>📅</span> {event.date} · {event.time}
          </div>
        </div>
        <button
          onClick={() => onBook(event)}
          style={{
            width: "100%", padding: "10px 0",
            background: "rgba(108,99,255,0.1)",
            border: "1px solid rgba(108,99,255,0.25)",
            borderRadius: 8, color: "var(--primary)",
            fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 13,
            cursor: "pointer", transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--primary)";
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(108,99,255,0.1)";
            e.currentTarget.style.color = "var(--primary)";
          }}
        >
          🎟️ Get Tickets
        </button>
      </div>
    </div>
  );
}

export function EventDiscovery() {
  const [genreFilter, setGenreFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [bookedEvent, setBookedEvent] = useState(null);

  const genres = ["All", "Afropop", "Electronic", "Jazz", "Spoken Word", "Afrobeats", "Comedy", "Gospel"];
  const locations = ["All", "Westlands", "Kilimani", "Upper Hill", "CBD", "Lavington", "Madaraka"];

  const filtered = mockEvents.filter((e) =>
    (genreFilter === "All" || e.genre === genreFilter) &&
    (locationFilter === "All" || e.location === locationFilter) &&
    (e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.artist.toLowerCase().includes(search.toLowerCase()) ||
      e.venue.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", padding: "100px 0 60px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <div style={{
            fontFamily: "'Syne',sans-serif", fontSize: 11, fontWeight: 700,
            letterSpacing: 3, textTransform: "uppercase", color: "var(--primary)",
            marginBottom: 12,
          }}>Discover</div>
          <h1 style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: "clamp(40px,6vw,72px)",
            letterSpacing: 2, lineHeight: 1, marginBottom: 16,
          }}>
            Upcoming <span style={{
              background: "linear-gradient(135deg, #6C63FF, #FF6B35)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Events</span>
          </h1>
          <p style={{ fontSize: 16, color: "var(--text-muted)", maxWidth: 480 }}>
            Browse live events happening across Nairobi. Find your next night out.
          </p>
        </div>

        {/* Search & Filters */}
        <div style={{
          background: "rgba(30,41,59,0.5)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 14, padding: 20, marginBottom: 32,
        }}>
          <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
            <div style={{ flex: 1, position: "relative", minWidth: 200 }}>
              <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: "var(--text-dim)" }}>🔍</span>
              <input
                type="text"
                placeholder="Search events, artists, venues..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ ...inputStyle, paddingLeft: 38 }}
              />
            </div>
            <select
              style={{ ...inputStyle, width: "auto", minWidth: 160, cursor: "pointer" }}
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              {locations.map((l) => <option key={l}>{l}</option>)}
            </select>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {genres.map((g) => (
              <button
                key={g}
                onClick={() => setGenreFilter(g)}
                style={{
                  padding: "7px 16px", borderRadius: 100, cursor: "pointer",
                  border: `1px solid ${genreFilter === g ? "var(--primary)" : "rgba(255,255,255,0.1)"}`,
                  background: genreFilter === g ? "rgba(108,99,255,0.12)" : "rgba(255,255,255,0.03)",
                  color: genreFilter === g ? "var(--primary)" : "var(--text-muted)",
                  fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: 12,
                  transition: "all 0.2s",
                }}
              >{g}</button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div style={{
          fontFamily: "'Syne',sans-serif", fontSize: 13, color: "var(--text-muted)",
          marginBottom: 20,
        }}>
          Showing <strong style={{ color: "var(--text)" }}>{filtered.length}</strong> events
        </div>

        {/* Event Grid */}
        {filtered.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
            {filtered.map((event) => (
              <EventCard key={event.id} event={event} onBook={setBookedEvent} />
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: "center", padding: "80px 0",
            color: "var(--text-muted)",
          }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🎭</div>
            <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: 16 }}>No events found</p>
            <p style={{ fontSize: 14, marginTop: 6 }}>Try adjusting your filters</p>
          </div>
        )}
      </div>

      {/* Ticket Purchase Modal */}
      {bookedEvent && (
        <div
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.8)",
            zIndex: 9999,
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 24, backdropFilter: "blur(4px)",
          }}
          onClick={(e) => e.target === e.currentTarget && setBookedEvent(null)}
        >
          <div style={{
            background: "var(--bg-mid)",
            border: "1px solid rgba(108,99,255,0.2)",
            borderRadius: 20, padding: 36,
            width: "100%", maxWidth: 420,
            position: "relative",
          }}>
            <button
              onClick={() => setBookedEvent(null)}
              style={{
                position: "absolute", top: 16, right: 16,
                width: 32, height: 32, borderRadius: 8,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "var(--text-muted)", cursor: "pointer",
              }}
            >✕</button>

            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>{bookedEvent.image}</div>
              <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 28, letterSpacing: 1 }}>{bookedEvent.name}</h3>
              <p style={{ color: "var(--secondary)", fontSize: 14, fontWeight: 600 }}>{bookedEvent.artist}</p>
            </div>

            {[
              { icon: "🏛️", label: bookedEvent.venue },
              { icon: "📅", label: `${bookedEvent.date} · ${bookedEvent.time}` },
              { icon: "📍", label: bookedEvent.location },
            ].map((r) => (
              <div key={r.label} style={{
                display: "flex", alignItems: "center", gap: 10,
                fontSize: 13, color: "var(--text-muted)",
                padding: "8px 0",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
              }}>
                <span>{r.icon}</span> {r.label}
              </div>
            ))}

            <div style={{
              display: "flex", gap: 10, marginTop: 20, alignItems: "center",
            }}>
              <div>
                <div style={{ fontSize: 11, color: "var(--text-dim)", fontFamily: "'Syne',sans-serif" }}>Ticket Price</div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 28, color: "#10B981" }}>
                  KSh {bookedEvent.price.toLocaleString()}
                </div>
              </div>
              <button
                style={{
                  flex: 1, padding: "14px 0",
                  background: "var(--primary)", border: "none",
                  borderRadius: 10, color: "#fff",
                  fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 15,
                  cursor: "pointer",
                  boxShadow: "0 0 30px rgba(108,99,255,0.4)",
                }}
                onClick={() => {
                  alert("🎟️ Ticket purchase via M-Pesa coming soon! Connect your Daraja API.");
                  setBookedEvent(null);
                }}
              >
                🎟️ Buy via M-Pesa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingModal;
