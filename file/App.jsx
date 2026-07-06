// ============================================================
// StageLink Kenya — React Application
// File: src/App.jsx
// ============================================================

import { useState, useEffect, useRef } from "react";
import "./App.css"; // Use the provided CSS or Tailwind

// ===== DATA =====
export const artists = [
  { id: 1, name: "Wahu Kagwi", genre: "Afropop", location: "Nairobi", followers: "24K", rating: 4.9, bookings: 127, emoji: "🎵", fee: "KSh 80,000", tags: ["Live Band", "Studio"], available: true },
  { id: 2, name: "DJ Pinye", genre: "Electronic/Hip-Hop", location: "Westlands", followers: "18K", rating: 4.8, bookings: 89, emoji: "🎧", fee: "KSh 60,000", tags: ["DJ Set", "Club"], available: true },
  { id: 3, name: "Muthoni Drummer Queen", genre: "Alternative R&B", location: "Kilimani", followers: "32K", rating: 5.0, bookings: 214, emoji: "🥁", fee: "KSh 120,000", tags: ["Festival", "Live"], available: false },
  { id: 4, name: "Kagwe Mungai", genre: "Afrobeats", location: "Langata", followers: "41K", rating: 4.7, bookings: 156, emoji: "🎤", fee: "KSh 95,000", tags: ["Events", "Corporate"], available: true },
  { id: 5, name: "Stella Mwangi", genre: "Pop/Dancehall", location: "Karen", followers: "29K", rating: 4.9, bookings: 98, emoji: "💃", fee: "KSh 75,000", tags: ["Dance", "Theater"], available: true },
  { id: 6, name: "Rabbit King Kaka", genre: "Hip-Hop/Spoken Word", location: "Eastlands", followers: "55K", rating: 4.8, bookings: 203, emoji: "🎙️", fee: "KSh 110,000", tags: ["Rap", "Comedy"], available: true },
];

export const venues = [
  { id: 1, name: "Alchemist Bar", location: "Westlands, Nairobi", capacity: 500, type: "Open Air Bar", emoji: "🍻", tags: ["Live Music", "DJ Nights", "Art Shows"], rating: 4.8 },
  { id: 2, name: "The Rustic", location: "Lavington, Nairobi", capacity: 200, type: "Lounge", emoji: "🎸", tags: ["Acoustic Sets", "Jazz", "Cocktails"], rating: 4.7 },
  { id: 3, name: "Strathmore University", location: "Madaraka, Nairobi", capacity: 2000, type: "Campus Venue", emoji: "🎓", tags: ["Comedy Nights", "Concerts", "Debates"], rating: 4.6 },
  { id: 4, name: "Nairobi Kitchen", location: "Kilimani, Nairobi", capacity: 150, type: "Restaurant", emoji: "🍽️", tags: ["Dinner Jazz", "Acoustic", "Private Events"], rating: 4.9 },
  { id: 5, name: "KICC Amphitheatre", location: "CBD, Nairobi", capacity: 5000, type: "Event Space", emoji: "🏛️", tags: ["Festivals", "Corporate", "Concerts"], rating: 4.5 },
  { id: 6, name: "B-Club", location: "Upper Hill, Nairobi", capacity: 800, type: "Nightclub", emoji: "🕺", tags: ["DJ Nights", "VIP Events", "Dance"], rating: 4.7 },
];

export const testimonials = [
  { quote: "StageLink completely changed how I get bookings. Before, I'd spend weeks cold-calling venues. Now they come to me. I've done 23 gigs in just 3 months!", name: "Amina Waweru", role: "Afropop Artist · Nairobi", initials: "AW", rating: 5 },
  { quote: "Finding quality artists for our Friday night sets used to be a nightmare. StageLink lets me browse portfolios, check availability, and book — all in one place.", name: "James Otieno", role: "Manager · The Alchemist Bar", initials: "JO", rating: 5 },
  { quote: "As a spoken word artist, I struggled to find venues that understood my art. StageLink matched me with three poetry-friendly spaces in my first week. Incredible.", name: "Naliaka Wekesa", role: "Spoken Word Poet · Nairobi", initials: "NW", rating: 5 },
  { quote: "The M-Pesa integration makes payments so easy. No more cash drama at the end of a night — everything is tracked and transparent.", name: "Brian Mwangi", role: "DJ & Producer · Westlands", initials: "BM", rating: 5 },
];


// ===== HOOKS =====

// Intersection Observer hook for fade animations
function useFadeIn(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// Counter animation hook
function useCounter(target, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let current = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      setCount(current);
      if (current >= target) clearInterval(timer);
    }, 25);
    return () => clearInterval(timer);
  }, [target, start]);
  return count;
}


// ===== COMPONENTS =====

// ----- Navbar -----
export function Navbar({ onAuthOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navLinks = [
    { label: "How It Works", href: "#how" },
    { label: "Artists", href: "#artists" },
    { label: "Venues", href: "#venues" },
    { label: "Events", href: "#events" },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="container">
          <div className="nav-inner">
            <a href="#" className="nav-logo">StageLink Kenya</a>
            <ul className="nav-links">
              {navLinks.map((l) => (
                <li key={l.href}><a href={l.href}>{l.label}</a></li>
              ))}
            </ul>
            <div className="nav-actions">
              <button className="btn btn-outline" onClick={() => onAuthOpen("login")}>Log In</button>
              <button className="btn btn-primary" onClick={() => onAuthOpen("signup")}>Get Started</button>
            </div>
            <button className="hamburger" onClick={() => setMobileOpen(true)} aria-label="Menu">
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="mobile-menu open">
          <button onClick={() => setMobileOpen(false)} style={{ position: "absolute", top: 24, right: 24, background: "none", border: "none", color: "var(--text)", fontSize: 24, cursor: "pointer" }}>✕</button>
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}>{l.label}</a>
          ))}
          <button className="btn btn-primary" onClick={() => { onAuthOpen("signup"); setMobileOpen(false); }}>Get Started</button>
        </div>
      )}
    </>
  );
}


// ----- Hero -----
export function Hero({ onAuthOpen, onSearchOpen }) {
  // Generate wave bars
  const waveBars = Array.from({ length: 12 }, (_, i) => (
    <div key={i} className="wave-bar" style={{ animationDelay: `${i * 0.1}s` }} />
  ));

  return (
    <section className="hero" id="home">
      <div className="hero-bg-orb orb-1" />
      <div className="hero-bg-orb orb-2" />
      <div className="hero-bg-orb orb-3" />
      <div className="stage-lights">
        <div className="light-beam" /><div className="light-beam" />
        <div className="light-beam" /><div className="light-beam" />
      </div>

      <div className="container">
        <div className="hero-layout" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          {/* Left: Copy */}
          <div className="hero-content">
            <div className="hero-eyebrow">
              <div className="hero-eyebrow-line" />
              <span className="hero-eyebrow-text">Kenya's #1 Artist Platform</span>
            </div>
            <h1 className="hero-headline">
              Connect.<br />
              <span className="line-2">Perform.</span><br />
              Grow.
            </h1>
            <p className="hero-sub">
              The platform where Kenyan artists and venues discover each other, book performances, and build thriving entertainment communities.
            </p>
            <div className="hero-cta">
              <button className="btn btn-primary" onClick={() => onSearchOpen("venues")}>
                🎪 Find Venues
              </button>
              <button className="btn btn-secondary" onClick={() => onSearchOpen("artists")}>
                🎤 Hire Artists
              </button>
            </div>
            <div className="hero-trust">
              <div className="trust-avatars">
                {["A", "K", "M", "J"].map((l) => (
                  <div key={l} className="trust-avatar">{l}</div>
                ))}
              </div>
              <p className="trust-text"><strong>500+ Artists</strong> already on the platform</p>
            </div>
          </div>

          {/* Right: Stage Card */}
          <div className="hero-visual">
            <div className="hero-stage-card" style={{ position: "relative" }}>
              <div className="stage-card-header">
                <span className="stage-card-title">🔥 Trending Now</span>
                <span className="live-badge"><span className="live-dot" />LIVE</span>
              </div>
              <div className="performer-showcase">
                <div className="performer-avatar">🎵</div>
                <div className="performer-info">
                  <div className="performer-name">Wahu Kagwi</div>
                  <div className="performer-genre">Afropop · Nairobi</div>
                  <div className="performer-rating">★★★★★ <span style={{ color: "var(--text-muted)", marginLeft: 4 }}>4.9 (128 reviews)</span></div>
                </div>
                <div className="waveform">{waveBars}</div>
              </div>
              <div className="booking-stats">
                {[
                  { val: "47", label: "Bookings this month" },
                  { val: "KSh 85K", label: "Avg. performance fee" },
                  { val: "12", label: "Active venues" },
                  { val: "98%", label: "Acceptance rate" },
                ].map((s) => (
                  <div key={s.label} className="stat-mini">
                    <div className="stat-mini-value">{s.val}</div>
                    <div className="stat-mini-label">{s.label}</div>
                  </div>
                ))}
              </div>
              <button className="card-action-btn" onClick={() => onAuthOpen("signup")}>Book This Artist →</button>
              <div className="hero-notif">
                <div className="notif-icon">🎉</div>
                <div>
                  <div className="notif-title">New Booking Request!</div>
                  <div className="notif-sub">Alchemist Bar · Tomorrow, 9 PM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


// ----- Stats -----
function StatItem({ value, label, delay }) {
  const [ref, visible] = useFadeIn();
  const count = useCounter(value, visible);
  return (
    <div ref={ref} className={`stat-item fade-up ${visible ? "visible" : ""}`} style={{ transitionDelay: `${delay}s` }}>
      <span className="stat-number">{count.toLocaleString()}+</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

export function Stats() {
  const stats = [
    { value: 500, label: "Artists" },
    { value: 120, label: "Venues" },
    { value: 2000, label: "Event Attendees" },
    { value: 350, label: "Successful Bookings" },
  ];
  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {stats.map((s, i) => <StatItem key={s.label} value={s.value} label={s.label} delay={i * 0.1} />)}
        </div>
      </div>
    </section>
  );
}


// ----- How It Works -----
export function HowItWorks() {
  const steps = [
    { num: "01", icon: "👤", title: "Create Profile", desc: "Artists showcase their talent, genre, and availability. Venues list their capacity, location, and event types." },
    { num: "02", icon: "🔍", title: "Discover Matches", desc: "Smart filters help venues find the perfect artist for their audience, and artists find the right stage for their sound." },
    { num: "03", icon: "📋", title: "Send Booking Requests", desc: "Seamlessly send, negotiate, and confirm bookings through our built-in messaging and contract system." },
    { num: "04", icon: "🚀", title: "Perform & Grow", desc: "Build your reputation with reviews, track earnings, grow your fanbase, and get paid via M-Pesa or Stripe." },
  ];
  return (
    <section className="section how-section" id="how">
      <div className="container">
        <div className="section-label">Process</div>
        <h2 className="section-title">How <span className="gradient-text">StageLink</span> Works</h2>
        <div className="steps-grid">
          {steps.map((s, i) => {
            const [ref, visible] = useFadeIn();
            return (
              <div key={s.num} ref={ref} className={`step-card glass-card fade-up ${visible ? "visible" : ""}`} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="step-number">{s.num}</div>
                <div className="step-icon">{s.icon}</div>
                <h3 className="step-title">{s.title}</h3>
                <p className="step-desc">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


// ----- Artist Card -----
export function ArtistCard({ artist, onBook, delay = 0 }) {
  const [ref, visible] = useFadeIn();
  const stars = "★".repeat(Math.floor(artist.rating)) + "☆".repeat(5 - Math.floor(artist.rating));
  return (
    <div ref={ref} className={`glass-card artist-card fade-up ${visible ? "visible" : ""}`} style={{ transitionDelay: `${delay}s` }}>
      <div className="artist-card-top">
        <div className="artist-avatar-wrap">
          <div className="artist-avatar">{artist.emoji}</div>
          {artist.available && <div className="artist-status-dot" />}
        </div>
        <div className="artist-verified" title="Verified">✓</div>
      </div>
      <div className="artist-name">{artist.name}</div>
      <div className="artist-genre">{artist.genre}</div>
      <div className="artist-location">📍 {artist.location}</div>
      <div className="artist-stats">
        <div className="artist-stat">
          <div className="artist-stat-val">{artist.followers}</div>
          <div className="artist-stat-key">Followers</div>
        </div>
        <div className="artist-stat">
          <div className="artist-stat-val">{artist.bookings}</div>
          <div className="artist-stat-key">Bookings</div>
        </div>
        <div className="artist-stat">
          <div className="artist-stat-val">{artist.fee.split(" ")[1]}</div>
          <div className="artist-stat-key">Fee/Show</div>
        </div>
      </div>
      <div className="rating-row">
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span className="stars">{stars}</span>
          <span className="rating-val">{artist.rating}</span>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {artist.tags.slice(0, 2).map((t) => (
            <span key={t} className="badge badge-purple">{t}</span>
          ))}
        </div>
      </div>
      <button className="card-action-btn" onClick={() => onBook(artist)}>
        Book {artist.name.split(" ")[0]} →
      </button>
    </div>
  );
}


// ----- Venue Card -----
export function VenueCard({ venue, onBook, delay = 0 }) {
  const [ref, visible] = useFadeIn();
  return (
    <div ref={ref} className={`glass-card venue-card fade-up ${visible ? "visible" : ""}`} style={{ transitionDelay: `${delay}s` }}>
      <div className="venue-img">
        <span style={{ position: "relative", zIndex: 1, fontSize: 52 }}>{venue.emoji}</span>
        <div className="venue-img-overlay" />
        <div className="venue-img-badge">
          <span className="badge badge-orange">{venue.type}</span>
        </div>
      </div>
      <div className="venue-body">
        <div className="venue-name">{venue.name}</div>
        <div className="venue-location">📍 {venue.location}</div>
        <div className="venue-chips">
          {venue.tags.map((t) => <span key={t} className="venue-chip">{t}</span>)}
        </div>
        <div className="venue-footer">
          <div className="venue-capacity">Capacity: <strong>{venue.capacity.toLocaleString()}</strong></div>
          <span style={{ color: "var(--accent-yellow)", fontFamily: "'Syne',sans-serif", fontWeight: 700 }}>★ {venue.rating}</span>
        </div>
        <button className="card-action-btn" onClick={() => onBook(venue)} style={{ marginTop: 12 }}>
          Book This Venue →
        </button>
      </div>
    </div>
  );
}


// ----- Featured Artists Section -----
export function FeaturedArtists({ onAuthOpen }) {
  return (
    <section className="section artists-section" id="artists">
      <div className="container">
        <div className="section-header">
          <div>
            <div className="section-label">Talent</div>
            <h2 className="section-title">Featured <span className="gradient-text">Artists</span></h2>
          </div>
          <button className="btn btn-ghost">View All Artists →</button>
        </div>
        <div className="cards-grid">
          {artists.map((a, i) => (
            <ArtistCard key={a.id} artist={a} onBook={() => onAuthOpen("signup")} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}


// ----- Featured Venues Section -----
export function FeaturedVenues({ onAuthOpen }) {
  return (
    <section className="section" id="venues">
      <div className="container">
        <div className="section-header">
          <div>
            <div className="section-label">Spaces</div>
            <h2 className="section-title">Featured <span className="gradient-text">Venues</span></h2>
          </div>
          <button className="btn btn-ghost">View All Venues →</button>
        </div>
        <div className="cards-grid">
          {venues.map((v, i) => (
            <VenueCard key={v.id} venue={v} onBook={() => onAuthOpen("signup")} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}


// ----- Testimonials -----
export function Testimonials() {
  return (
    <section className="section testimonials-section">
      <div className="container">
        <div className="section-label">Community</div>
        <h2 className="section-title">Loved by <span className="gradient-text">Artists & Venues</span></h2>
        <div className="testimonials-track">
          {testimonials.map((t, i) => {
            const [ref, visible] = useFadeIn();
            return (
              <div key={t.name} ref={ref} className={`glass-card testimonial-card fade-up ${visible ? "visible" : ""}`} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="testimonial-quote">{t.quote}</div>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.initials}</div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">{t.role}</div>
                  </div>
                  <div style={{ marginLeft: "auto", color: "var(--accent-yellow)", fontSize: 13 }}>
                    {"★".repeat(t.rating)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


// ----- Auth Modal -----
export function AuthModal({ isOpen, onClose, initialTab = "login" }) {
  const [tab, setTab] = useState(initialTab);
  const [role, setRole] = useState("artist");

  useEffect(() => { setTab(initialTab); }, [initialTab]);
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isOpen ? "open" : ""}`} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-logo gradient-text">StageLink Kenya</div>

        <div className="modal-tabs">
          <button className={`modal-tab ${tab === "login" ? "active" : ""}`} onClick={() => setTab("login")}>Log In</button>
          <button className={`modal-tab ${tab === "signup" ? "active" : ""}`} onClick={() => setTab("signup")}>Sign Up</button>
        </div>

        {tab === "login" ? (
          <div>
            <h2 className="modal-title">Welcome back</h2>
            <p className="modal-sub">Sign in to your StageLink account.</p>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input type="email" className="form-input" placeholder="your@email.com" />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input type="password" className="form-input" placeholder="••••••••" />
            </div>
            <button className="form-submit">Sign In →</button>
            <p style={{ textAlign: "center", marginTop: 12, fontSize: 12, color: "var(--primary)", cursor: "pointer" }}>Forgot password?</p>
          </div>
        ) : (
          <div>
            <h2 className="modal-title">Join StageLink</h2>
            <p className="modal-sub">Create your free account today.</p>
            <div className="modal-role-tabs">
              {[{ key: "artist", icon: "🎤", label: "Artist" }, { key: "venue", icon: "🎪", label: "Venue" }, { key: "fan", icon: "🎵", label: "Fan" }].map((r) => (
                <div key={r.key} className={`role-tab ${role === r.key ? "active" : ""}`} onClick={() => setRole(r.key)}>
                  <span className="role-icon">{r.icon}</span>{r.label}
                </div>
              ))}
            </div>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input type="text" className="form-input" placeholder="Jane Wanjiku" />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input type="email" className="form-input" placeholder="your@email.com" />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input type="password" className="form-input" placeholder="Create a strong password" />
            </div>
            <button className="form-submit">Create Account →</button>
          </div>
        )}

        <div className="divider">
          <div className="divider-line" />
          <span className="divider-text">OR</span>
          <div className="divider-line" />
        </div>
        <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "center", padding: 12 }}>
          📱 Continue with M-Pesa Number
        </button>
      </div>
    </div>
  );
}


// ----- Search Page -----
export function SearchPage({ isOpen, onClose, initialMode = "artists", onAuthOpen }) {
  const [mode, setMode] = useState(initialMode);
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const genreFilters = ["All", "Afropop", "Hip-Hop", "Jazz", "Electronic", "R&B", "Gospel", "Comedy"];
  const venueFilters = ["All", "Club", "Lounge", "Restaurant", "Hotel", "Campus", "Open Air"];

  useEffect(() => {
    setMode(initialMode);
    setQuery("");
    setActiveFilter("All");
  }, [initialMode, isOpen]);

  const filteredArtists = artists.filter((a) =>
    (activeFilter === "All" || a.genre.toLowerCase().includes(activeFilter.toLowerCase())) &&
    (a.name.toLowerCase().includes(query.toLowerCase()) || a.genre.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredVenues = venues.filter((v) =>
    (activeFilter === "All" || v.type.toLowerCase().includes(activeFilter.toLowerCase())) &&
    (v.name.toLowerCase().includes(query.toLowerCase()) || v.location.toLowerCase().includes(query.toLowerCase()))
  );

  const filters = mode === "artists" ? genreFilters : venueFilters;

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className={`search-page ${isOpen ? "open" : ""}`}>
      <div className="search-header">
        <div className="container">
          <div className="search-header-inner">
            <button className="search-back" onClick={onClose}>←</button>
            <div style={{ display: "flex", gap: 8, marginRight: 8 }}>
              <button className={`filter-chip ${mode === "artists" ? "active" : ""}`} onClick={() => { setMode("artists"); setActiveFilter("All"); }}>Artists</button>
              <button className={`filter-chip ${mode === "venues" ? "active" : ""}`} onClick={() => { setMode("venues"); setActiveFilter("All"); }}>Venues</button>
            </div>
            <div className="search-input-wrap">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                className="search-input-main"
                placeholder={mode === "artists" ? "Search artists, genres..." : "Search venues, locations..."}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="search-filters">
          {filters.map((f) => (
            <button
              key={f}
              className={`filter-chip ${activeFilter === f ? "active" : ""}`}
              onClick={() => setActiveFilter(f)}
            >{f}</button>
          ))}
        </div>

        <div className="search-results-grid">
          {mode === "artists"
            ? filteredArtists.map((a, i) => (
                <ArtistCard key={a.id} artist={a} onBook={() => onAuthOpen("signup")} delay={i * 0.04} />
              ))
            : filteredVenues.map((v, i) => (
                <VenueCard key={v.id} venue={v} onBook={() => onAuthOpen("signup")} delay={i * 0.04} />
              ))
          }
          {(mode === "artists" ? filteredArtists : filteredVenues).length === 0 && (
            <p style={{ color: "var(--text-muted)", padding: "40px 0", textAlign: "center", gridColumn: "1/-1" }}>
              No results found. Try a different search.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}


// ----- CTA Section -----
export function CTA({ onAuthOpen }) {
  const [ref, visible] = useFadeIn();
  return (
    <section className="cta-section" id="events">
      <div className="cta-bg" />
      <div className="cta-orb" />
      <div className="container">
        <div ref={ref} className={`cta-inner fade-up ${visible ? "visible" : ""}`}>
          <div className="section-label" style={{ textAlign: "center" }}>Join the Movement</div>
          <h2 className="cta-title">Ready to <span className="gradient-text">Take the Stage?</span></h2>
          <p className="cta-sub">Join hundreds of artists and venues already building Kenya's most vibrant entertainment network.</p>
          <div className="cta-btns">
            <button className="btn btn-primary" onClick={() => onAuthOpen("signup")} style={{ padding: "16px 36px", fontSize: 16 }}>
              🎤 Join as Artist
            </button>
            <button className="btn btn-secondary" onClick={() => onAuthOpen("signup")} style={{ padding: "16px 36px", fontSize: 16 }}>
              🎪 List Your Venue
            </button>
          </div>
          <p style={{ marginTop: 24, fontSize: 13, color: "var(--text-dim)" }}>Free to join · No credit card required · Start in minutes</p>
        </div>
      </div>
    </section>
  );
}


// ----- Footer -----
export function Footer() {
  const cols = [
    { title: "Platform", links: ["For Artists", "For Venues", "For Fans", "Pricing", "M-Pesa Payments"] },
    { title: "Discover", links: ["Browse Artists", "Browse Venues", "Upcoming Events", "Blog", "Success Stories"] },
    { title: "Company", links: ["About Us", "Careers", "Press", "Privacy Policy", "Terms of Service"] },
  ];
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand-name">StageLink Kenya</div>
            <p className="footer-brand-desc">Connecting Kenya's most talented artists with the best venues. Building the future of live entertainment, one performance at a time.</p>
            <div className="footer-social">
              {["📸", "🐦", "🎵", "▶️", "💬"].map((s, i) => (
                <a key={i} className="social-btn" href="#">{s}</a>
              ))}
            </div>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <div className="footer-col-title">{col.title}</div>
              <ul className="footer-links">
                {col.links.map((l) => <li key={l}><a href="#">{l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <p className="footer-bottom-text">© 2024 StageLink Kenya. All rights reserved. Made with ❤️ in Nairobi.</p>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 16 }}>🇰🇪</span>
            <span className="footer-bottom-text">Nairobi, Kenya</span>
          </div>
        </div>
      </div>
    </footer>
  );
}


// ===== MAIN APP =====
export default function App() {
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState("login");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchMode, setSearchMode] = useState("artists");

  const handleAuthOpen = (tab) => { setAuthTab(tab); setAuthOpen(true); };
  const handleSearchOpen = (mode) => { setSearchMode(mode); setSearchOpen(true); };

  return (
    <>
      <Navbar onAuthOpen={handleAuthOpen} />
      <Hero onAuthOpen={handleAuthOpen} onSearchOpen={handleSearchOpen} />
      <Stats />
      <HowItWorks />
      <FeaturedArtists onAuthOpen={handleAuthOpen} />
      <FeaturedVenues onAuthOpen={handleAuthOpen} />
      <Testimonials />
      <CTA onAuthOpen={handleAuthOpen} />
      <Footer />

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} initialTab={authTab} />
      <SearchPage isOpen={searchOpen} onClose={() => setSearchOpen(false)} initialMode={searchMode} onAuthOpen={handleAuthOpen} />
    </>
  );
}
