// ============================================================
// StageLink Kenya — Reviews & Ratings System
// File: src/components/ReviewsRatings.jsx
// ============================================================

import { useState } from "react";

const mockReviews = [
  { id: 1, reviewer: "Alchemist Bar", reviewerInitials: "AB", reviewerType: "Venue", target: "Wahu Kagwi", targetType: "Artist", rating: 5, comment: "Wahu was absolutely incredible. The crowd was electric the whole night. Professional, punctual and an amazing performer. Will definitely book again.", date: "Dec 2, 2024", helpful: 24 },
  { id: 2, reviewer: "Wahu Kagwi", reviewerInitials: "WK", reviewerType: "Artist", target: "Alchemist Bar", targetType: "Venue", rating: 5, comment: "Best venue in Nairobi. The sound system is top-notch, the staff are professional and the crowd is always ready. The setup was perfect from start to finish.", date: "Dec 3, 2024", helpful: 18 },
  { id: 3, reviewer: "B-Club", reviewerInitials: "BC", reviewerType: "Venue", target: "DJ Pinye", targetType: "Artist", rating: 5, comment: "DJ Pinye had the dance floor packed all night. Great reading of the crowd, smooth transitions and a serious understanding of what makes a great club night.", date: "Nov 29, 2024", helpful: 31 },
  { id: 4, reviewer: "DJ Pinye", reviewerInitials: "DP", reviewerType: "Artist", target: "B-Club", targetType: "Venue", rating: 4, comment: "Great venue with excellent equipment. Would have given 5 stars but the DJ booth setup could use some improvement. Overall a solid booking experience.", date: "Nov 30, 2024", helpful: 9 },
  { id: 5, reviewer: "Strathmore University", reviewerInitials: "SU", reviewerType: "Venue", target: "Rabbit King Kaka", targetType: "Artist", rating: 5, comment: "King Kaka brought the house down at our cultural night. Students loved every second. He even did an impromptu freestyle — completely unscripted. Legendary.", date: "Nov 20, 2024", helpful: 47 },
];

function StarDisplay({ rating, size = 14 }) {
  return (
    <span style={{ fontSize: size, color: "#F59E0B", letterSpacing: 1 }}>
      {"★".repeat(rating)}{"☆".repeat(5 - rating)}
    </span>
  );
}

function RatingBar({ stars, count, total }) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
      <span style={{ fontSize: 12, color: "var(--text-muted)", width: 14, textAlign: "right" }}>{stars}</span>
      <span style={{ fontSize: 11, color: "#F59E0B" }}>★</span>
      <div style={{
        flex: 1, height: 6, borderRadius: 3,
        background: "rgba(255,255,255,0.06)",
        overflow: "hidden",
      }}>
        <div style={{
          height: "100%", width: `${pct}%`,
          background: "linear-gradient(90deg, #6C63FF, #F59E0B)",
          borderRadius: 3, transition: "width 0.6s ease",
        }} />
      </div>
      <span style={{ fontSize: 12, color: "var(--text-dim)", width: 20 }}>{count}</span>
    </div>
  );
}

function ReviewCard({ review }) {
  const [helpful, setHelpful] = useState(review.helpful);
  const [voted, setVoted] = useState(false);

  return (
    <div style={{
      background: "rgba(30,41,59,0.5)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: 14, padding: 24,
      transition: "all 0.3s",
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 44, height: 44, borderRadius: "50%",
            background: "linear-gradient(135deg, #6C63FF, #FF6B35)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 700, fontSize: 16, flexShrink: 0,
          }}>{review.reviewerInitials}</div>
          <div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 15 }}>{review.reviewer}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
              <span style={{
                padding: "2px 8px", borderRadius: 100,
                fontSize: 10, fontWeight: 700, fontFamily: "'Syne',sans-serif",
                background: review.reviewerType === "Artist" ? "rgba(108,99,255,0.12)" : "rgba(255,107,53,0.12)",
                color: review.reviewerType === "Artist" ? "#6C63FF" : "#FF6B35",
                border: `1px solid ${review.reviewerType === "Artist" ? "rgba(108,99,255,0.25)" : "rgba(255,107,53,0.25)"}`,
              }}>{review.reviewerType}</span>
              <span style={{ fontSize: 12, color: "var(--text-dim)" }}>reviewed</span>
              <span style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 600 }}>{review.target}</span>
            </div>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <StarDisplay rating={review.rating} />
          <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 3 }}>{review.date}</div>
        </div>
      </div>

      {/* Comment */}
      <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 16 }}>
        "{review.comment}"
      </p>

      {/* Helpful */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 12, color: "var(--text-dim)" }}>Was this helpful?</span>
        <button
          onClick={() => { if (!voted) { setHelpful(helpful + 1); setVoted(true); } }}
          style={{
            padding: "4px 12px", borderRadius: 100,
            border: `1px solid ${voted ? "rgba(16,185,129,0.3)" : "rgba(255,255,255,0.1)"}`,
            background: voted ? "rgba(16,185,129,0.1)" : "rgba(255,255,255,0.03)",
            color: voted ? "#10B981" : "var(--text-muted)",
            fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: 11,
            cursor: voted ? "default" : "pointer",
            display: "flex", alignItems: "center", gap: 5,
          }}
        >
          👍 {helpful}
        </button>
      </div>
    </div>
  );
}

function WriteReviewModal({ isOpen, onClose, target, targetType }) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.8)",
        zIndex: 9999, display: "flex",
        alignItems: "center", justifyContent: "center",
        padding: 24, backdropFilter: "blur(4px)",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div style={{
        background: "var(--bg-mid)",
        border: "1px solid rgba(108,99,255,0.2)",
        borderRadius: 20, padding: 36,
        width: "100%", maxWidth: 460,
        position: "relative",
      }}>
        <button onClick={onClose} style={{
          position: "absolute", top: 16, right: 16,
          width: 32, height: 32, borderRadius: 8,
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
          color: "var(--text-muted)", cursor: "pointer",
        }}>✕</button>

        {submitted ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>⭐</div>
            <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 28, letterSpacing: 1, marginBottom: 8 }}>
              Review Submitted!
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: 14 }}>
              Thank you for reviewing <strong style={{ color: "var(--text)" }}>{target}</strong>. Your review helps build a trustworthy community.
            </p>
            <button
              onClick={onClose}
              style={{
                marginTop: 24, padding: "12px 32px",
                background: "var(--primary)", border: "none",
                borderRadius: 10, color: "#fff",
                fontFamily: "'Syne',sans-serif", fontWeight: 700,
                cursor: "pointer",
              }}
            >Done</button>
          </div>
        ) : (
          <>
            <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 20, marginBottom: 4 }}>
              Write a Review
            </h3>
            <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 24 }}>
              Reviewing <strong style={{ color: "var(--text)" }}>{target}</strong> ({targetType})
            </p>

            {/* Star Picker */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontFamily: "'Syne',sans-serif", fontSize: 11, fontWeight: 700, color: "var(--text-muted)", letterSpacing: 0.5, textTransform: "uppercase", display: "block", marginBottom: 10 }}>
                Your Rating
              </label>
              <div style={{ display: "flex", gap: 8 }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(0)}
                    style={{
                      fontSize: 32, background: "none", border: "none",
                      cursor: "pointer", transition: "transform 0.15s",
                      transform: (hovered || rating) >= star ? "scale(1.2)" : "scale(1)",
                      filter: (hovered || rating) >= star ? "none" : "grayscale(1) opacity(0.3)",
                    }}
                  >⭐</button>
                ))}
              </div>
              {rating > 0 && (
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 8 }}>
                  {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][rating]}
                </div>
              )}
            </div>

            {/* Comment */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontFamily: "'Syne',sans-serif", fontSize: 11, fontWeight: 700, color: "var(--text-muted)", letterSpacing: 0.5, textTransform: "uppercase", display: "block", marginBottom: 6 }}>
                Your Review
              </label>
              <textarea
                placeholder={`Share your experience with ${target}...`}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                style={{
                  width: "100%", minHeight: 120, resize: "vertical",
                  padding: "12px 14px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 8, color: "var(--text)",
                  fontSize: 14, fontFamily: "'DM Sans',sans-serif",
                  outline: "none", lineHeight: 1.5, boxSizing: "border-box",
                }}
              />
              <div style={{ fontSize: 11, color: "var(--text-dim)", textAlign: "right", marginTop: 4 }}>
                {comment.length}/500
              </div>
            </div>

            <button
              onClick={() => { if (rating && comment.trim()) setSubmitted(true); }}
              disabled={!rating || !comment.trim()}
              style={{
                width: "100%", padding: "14px 0",
                background: rating && comment.trim() ? "var(--primary)" : "rgba(108,99,255,0.3)",
                border: "none", borderRadius: 10, color: "#fff",
                fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 15,
                cursor: rating && comment.trim() ? "pointer" : "not-allowed",
                boxShadow: rating && comment.trim() ? "0 0 30px rgba(108,99,255,0.4)" : "none",
              }}
            >Submit Review ⭐</button>
          </>
        )}
      </div>
    </div>
  );
}

export function ReviewsPage() {
  const [filter, setFilter] = useState("All");
  const [writeModalOpen, setWriteModalOpen] = useState(false);
  const [writeTarget, setWriteTarget] = useState({ name: "", type: "" });
  const [sortBy, setSortBy] = useState("recent");

  const ratingDist = [47, 35, 12, 4, 2]; // 5★ to 1★ percentages
  const totalReviews = ratingDist.reduce((a, b) => a + b, 0);
  const avgRating = (ratingDist.reduce((sum, count, i) => sum + count * (5 - i), 0) / totalReviews).toFixed(1);

  const filtered = mockReviews.filter((r) =>
    filter === "All" ||
    (filter === "Artist Reviews" && r.targetType === "Artist") ||
    (filter === "Venue Reviews" && r.targetType === "Venue")
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "helpful") return b.helpful - a.helpful;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", padding: "100px 0 80px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 40, flexWrap: "wrap", gap: 20 }}>
          <div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--primary)", marginBottom: 12 }}>Community Trust</div>
            <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(36px,5vw,60px)", letterSpacing: 2 }}>
              Reviews & <span style={{ background: "linear-gradient(135deg, #6C63FF, #FF6B35)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Ratings</span>
            </h1>
          </div>
          <button
            onClick={() => { setWriteTarget({ name: "an Artist or Venue", type: "Artist" }); setWriteModalOpen(true); }}
            style={{
              padding: "12px 24px",
              background: "var(--primary)", border: "none",
              borderRadius: 10, color: "#fff",
              fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14,
              cursor: "pointer", boxShadow: "0 0 30px rgba(108,99,255,0.4)",
              display: "flex", alignItems: "center", gap: 8,
            }}
          >✍️ Write a Review</button>
        </div>

        {/* Rating Summary */}
        <div style={{
          background: "rgba(30,41,59,0.5)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 16, padding: 28, marginBottom: 32,
          display: "grid", gridTemplateColumns: "auto 1fr", gap: 40, alignItems: "center",
        }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 72, letterSpacing: 2, lineHeight: 1, background: "linear-gradient(135deg, #6C63FF, #F59E0B)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {avgRating}
            </div>
            <StarDisplay rating={Math.round(Number(avgRating))} size={20} />
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 6 }}>{totalReviews} reviews</div>
          </div>
          <div>
            {[5, 4, 3, 2, 1].map((s, i) => (
              <RatingBar key={s} stars={s} count={ratingDist[i]} total={totalReviews} />
            ))}
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", gap: 8 }}>
            {["All", "Artist Reviews", "Venue Reviews"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: "8px 16px", borderRadius: 100, cursor: "pointer",
                  border: `1px solid ${filter === f ? "var(--primary)" : "rgba(255,255,255,0.1)"}`,
                  background: filter === f ? "rgba(108,99,255,0.12)" : "rgba(255,255,255,0.03)",
                  color: filter === f ? "var(--primary)" : "var(--text-muted)",
                  fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: 12,
                  transition: "all 0.2s",
                }}
              >{f}</button>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 12, color: "var(--text-dim)" }}>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: "7px 12px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 8, color: "var(--text)",
                fontSize: 12, fontFamily: "'Syne',sans-serif",
                cursor: "pointer", outline: "none",
              }}
            >
              <option value="recent">Most Recent</option>
              <option value="helpful">Most Helpful</option>
              <option value="rating">Highest Rating</option>
            </select>
          </div>
        </div>

        {/* Reviews List */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {sorted.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>

      <WriteReviewModal
        isOpen={writeModalOpen}
        onClose={() => setWriteModalOpen(false)}
        target={writeTarget.name}
        targetType={writeTarget.type}
      />
    </div>
  );
}

export default ReviewsPage;


// ============================================================
// StageLink Kenya — Express.js Backend API
// File: server/index.js
// ============================================================

/*
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));
app.use(express.json());

// ===== AUTH MIDDLEWARE =====
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// ===== HEALTH CHECK =====
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'StageLink Kenya API is running 🎵' });
});

// ===== AUTH ROUTES =====
// POST /api/auth/register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ error: 'Email already in use' });

    const hashed = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { email, password: hashed, role: role.toUpperCase() },
    });
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed', details: err.message });
  }
});

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
});

// ===== ARTIST ROUTES =====
// GET /api/artists — with optional filters: genre, location, minRating
app.get('/api/artists', async (req, res) => {
  try {
    const { genre, location, minRating } = req.query;
    const where = {};
    if (genre) where.genre = { contains: genre, mode: 'insensitive' };
    if (location) where.location = { contains: location, mode: 'insensitive' };
    if (minRating) where.rating = { gte: parseFloat(minRating) };

    const artists = await prisma.artist.findMany({
      where,
      include: { user: { select: { email: true } } },
      orderBy: { rating: 'desc' },
    });
    res.json(artists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/artists/:id
app.get('/api/artists/:id', async (req, res) => {
  try {
    const artist = await prisma.artist.findUnique({
      where: { id: req.params.id },
      include: {
        user: { select: { email: true } },
        bookings: { take: 5, orderBy: { createdAt: 'desc' } },
        reviews: { take: 10, orderBy: { createdAt: 'desc' } },
      },
    });
    if (!artist) return res.status(404).json({ error: 'Artist not found' });
    res.json(artist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/artists — create profile (requires auth)
app.post('/api/artists', authMiddleware, async (req, res) => {
  try {
    const { stageName, realName, bio, genre, location, fee } = req.body;
    const artist = await prisma.artist.create({
      data: { userId: req.user.id, stageName, realName, bio, genre, location, fee: parseInt(fee) },
    });
    res.status(201).json(artist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/artists/:id
app.put('/api/artists/:id', authMiddleware, async (req, res) => {
  try {
    const artist = await prisma.artist.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(artist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== VENUE ROUTES =====
// GET /api/venues
app.get('/api/venues', async (req, res) => {
  try {
    const { location, eventType, minCapacity } = req.query;
    const where = {};
    if (location) where.location = { contains: location, mode: 'insensitive' };
    if (eventType) where.eventType = { contains: eventType, mode: 'insensitive' };
    if (minCapacity) where.capacity = { gte: parseInt(minCapacity) };
    const venues = await prisma.venue.findMany({ where, orderBy: { rating: 'desc' } });
    res.json(venues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/venues
app.post('/api/venues', authMiddleware, async (req, res) => {
  try {
    const { name, location, capacity, eventType } = req.body;
    const venue = await prisma.venue.create({
      data: { userId: req.user.id, name, location, capacity: parseInt(capacity), eventType },
    });
    res.status(201).json(venue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== BOOKING ROUTES =====
// POST /api/bookings
app.post('/api/bookings', authMiddleware, async (req, res) => {
  try {
    const { artistId, venueId, date, amount, eventName, notes } = req.body;
    const booking = await prisma.booking.create({
      data: {
        artistId, venueId,
        date: new Date(date),
        amount: parseInt(amount),
        eventName, notes,
        status: 'PENDING',
      },
      include: { artist: true, venue: true },
    });
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/bookings/:id/accept
app.patch('/api/bookings/:id/accept', authMiddleware, async (req, res) => {
  try {
    const booking = await prisma.booking.update({
      where: { id: req.params.id },
      data: { status: 'ACCEPTED' },
    });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/bookings/:id/reject
app.patch('/api/bookings/:id/reject', authMiddleware, async (req, res) => {
  try {
    const booking = await prisma.booking.update({
      where: { id: req.params.id },
      data: { status: 'REJECTED' },
    });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/bookings/artist/:artistId
app.get('/api/bookings/artist/:artistId', authMiddleware, async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: { artistId: req.params.artistId },
      include: { venue: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/bookings/venue/:venueId
app.get('/api/bookings/venue/:venueId', authMiddleware, async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: { venueId: req.params.venueId },
      include: { artist: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== REVIEWS ROUTES =====
// POST /api/reviews
app.post('/api/reviews', authMiddleware, async (req, res) => {
  try {
    const { artistId, venueId, rating, comment } = req.body;
    const review = await prisma.review.create({
      data: { artistId, venueId, rating: parseInt(rating), comment },
    });

    // Recalculate average rating
    if (artistId) {
      const avg = await prisma.review.aggregate({
        where: { artistId },
        _avg: { rating: true },
      });
      await prisma.artist.update({
        where: { id: artistId },
        data: { rating: avg._avg.rating || 0 },
      });
    }
    if (venueId) {
      const avg = await prisma.review.aggregate({
        where: { venueId },
        _avg: { rating: true },
      });
      await prisma.venue.update({
        where: { id: venueId },
        data: { rating: avg._avg.rating || 0 },
      });
    }

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== M-PESA DARAJA API =====
// POST /api/payments/mpesa/stk-push
app.post('/api/payments/mpesa/stk-push', authMiddleware, async (req, res) => {
  try {
    const { phone, amount, bookingId } = req.body;

    // Get access token
    const auth = Buffer.from(`${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`).toString('base64');
    const tokenRes = await fetch('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
      headers: { Authorization: `Basic ${auth}` },
    });
    const { access_token } = await tokenRes.json();

    // Generate password
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
    const password = Buffer.from(`${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`).toString('base64');

    // STK Push
    const stkRes = await fetch('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${access_token}` },
      body: JSON.stringify({
        BusinessShortCode: process.env.MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: phone.replace(/^0/, '254'),
        PartyB: process.env.MPESA_SHORTCODE,
        PhoneNumber: phone.replace(/^0/, '254'),
        CallBackURL: `${process.env.API_URL}/api/payments/mpesa/callback`,
        AccountReference: `SLK-${bookingId}`,
        TransactionDesc: 'StageLink Kenya Booking Payment',
      }),
    });
    const stkData = await stkRes.json();
    res.json(stkData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/payments/mpesa/callback
app.post('/api/payments/mpesa/callback', async (req, res) => {
  const callbackData = req.body.Body?.stkCallback;
  if (callbackData?.ResultCode === 0) {
    console.log('M-Pesa payment successful:', callbackData);
    // Update booking status to ACCEPTED here
  }
  res.json({ ResultCode: 0, ResultDesc: 'Accepted' });
});

// ===== ADMIN ROUTES =====
const adminMiddleware = (req, res, next) => {
  if (req.user?.role !== 'ADMIN') return res.status(403).json({ error: 'Admin access required' });
  next();
};

// GET /api/admin/stats
app.get('/api/admin/stats', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const [totalUsers, totalArtists, totalVenues, totalBookings, monthlyRevenue] = await Promise.all([
      prisma.user.count(),
      prisma.artist.count(),
      prisma.venue.count(),
      prisma.booking.count(),
      prisma.booking.aggregate({
        where: { status: 'COMPLETED', createdAt: { gte: new Date(new Date().setDate(1)) } },
        _sum: { amount: true },
      }),
    ]);
    res.json({ totalUsers, totalArtists, totalVenues, totalBookings, monthlyRevenue: monthlyRevenue._sum.amount || 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/admin/users
app.get('/api/admin/users', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: { artist: true, venue: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🎵 StageLink Kenya API running on port ${PORT}`));
*/
