import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  Star, ArrowRight, Menu, X, Leaf, Waves, Utensils,
  Wifi, Car, Users, MapPin, Mail,
  Instagram, Youtube, Music2, Heart, Building2, Tent,
  MessageCircle, Play, ChevronLeft, ChevronRight,
} from "lucide-react";

type StyleOption = "glassy" | "glassmorphic" | "botanical";

// ─── Images ───────────────────────────────────────────────────────────────────
const IMGS = {
  hero:    "https://images.unsplash.com/photo-1780283574760-e8d7fd944da5?w=1600&h=1000&fit=crop&auto=format",
  heroDark:"https://images.unsplash.com/photo-1761744390714-a8b3d8fccf7a?w=1600&h=1000&fit=crop&auto=format",
  room1:   "https://images.unsplash.com/photo-1760067537740-faa11f7bdf1e?w=800&h=550&fit=crop&auto=format",
  room2:   "https://images.unsplash.com/photo-1778640331184-dc4c3e2608e1?w=800&h=550&fit=crop&auto=format",
  room3:   "https://images.unsplash.com/photo-1760067538299-3f58e7a99fc5?w=800&h=550&fit=crop&auto=format",
  room4:   "https://images.unsplash.com/photo-1774246666298-226a1b475cd3?w=800&h=550&fit=crop&auto=format",
  pool:    "https://images.unsplash.com/photo-1651108066220-f61c22fc281f?w=1400&h=700&fit=crop&auto=format",
  wedding: "https://images.unsplash.com/photo-1779816077360-015f74db32ff?w=800&h=600&fit=crop&auto=format",
  trail:   "https://images.unsplash.com/photo-1777490005159-f5617abb12c6?w=800&h=1000&fit=crop&auto=format",
};

// ─── Gallery data ─────────────────────────────────────────────────────────────
const GALLERY = [
  { src: "https://images.unsplash.com/photo-1780283574760-e8d7fd944da5?w=1200&h=900&fit=crop&auto=format", label: "Kolam Renang", cat: "Fasilitas" },
  { src: "https://images.unsplash.com/photo-1760067537740-faa11f7bdf1e?w=900&h=600&fit=crop&auto=format", label: "Joglo Room", cat: "Kamar" },
  { src: "https://images.unsplash.com/photo-1651108066220-f61c22fc281f?w=900&h=600&fit=crop&auto=format", label: "Outdoor Area", cat: "Fasilitas" },
  { src: "https://images.unsplash.com/photo-1778640331184-dc4c3e2608e1?w=900&h=600&fit=crop&auto=format", label: "Villa Room", cat: "Kamar" },
  { src: "https://images.unsplash.com/photo-1779816077360-015f74db32ff?w=900&h=600&fit=crop&auto=format", label: "Wedding Venue", cat: "Event" },
  { src: "https://images.unsplash.com/photo-1761744390714-a8b3d8fccf7a?w=1600&h=600&fit=crop&auto=format", label: "Resort Panorama", cat: "Area" },
];

// ─── Video data ───────────────────────────────────────────────────────────────
const VIDEOS = [
  { thumb: IMGS.hero,    title: "Resort Promo 2025",  sub: "Oase Green Forest · Parongpong",  dur: "2:34", featured: true  },
  { thumb: IMGS.room1,   title: "Room Tour",           sub: "Joglo & Villa Room",              dur: "1:12", featured: false },
  { thumb: IMGS.wedding, title: "Wedding at Oase",     sub: "Venue, Dekor & Katering",         dur: "4:18", featured: false },
  { thumb: IMGS.trail,   title: "Alam & Aktivitas",   sub: "Outbound & Nature Trail",         dur: "3:05", featured: false },
];

// ─── Content data ─────────────────────────────────────────────────────────────
const ROOMS = [
  { name: "Joglo Room",   desc: "Traditional Javanese teak wood interiors with serene garden views and nature ambiance", price: "Rp 450.000", wknd: "Rp 550.000", img: IMGS.room1, cap: "2–4 Pax", sqm: "32 m²", tag: "Most Popular" },
  { name: "Villa Room",   desc: "Private villa nestled in lush greenery with spacious terrace overlooking Parongpong valley", price: "Rp 750.000", wknd: "Rp 950.000", img: IMGS.room2, cap: "2–6 Pax", sqm: "58 m²", tag: "Best View" },
  { name: "Family Room",  desc: "Generously sized for families with multiple sleeping areas and kids-friendly layout", price: "Rp 1.200.000", wknd: "Rp 1.500.000", img: IMGS.room3, cap: "4–8 Pax", sqm: "80 m²", tag: "Family Choice" },
  { name: "Boat Room",    desc: "Unique boat-themed architecture set among natural scenery — a truly memorable stay", price: "Rp 650.000", wknd: "Rp 800.000", img: IMGS.room4, cap: "2–4 Pax", sqm: "40 m²", tag: "Signature" },
];
const FACILITIES = [
  { Icon: Waves,     name: "Swimming Pool",  desc: "Open daily with forest backdrop"       },
  { Icon: Utensils,  name: "Restaurant",     desc: "Local & international cuisine"          },
  { Icon: Building2, name: "Meeting Room",   desc: "Flexible venue for 10–200 pax"          },
  { Icon: Heart,     name: "Wedding Venue",  desc: "Intimate & garden ceremonies"           },
  { Icon: Tent,      name: "Outbound Area",  desc: "Team-building & nature activities"      },
  { Icon: Wifi,      name: "Free WiFi",      desc: "High-speed throughout the resort"       },
];
const USE_CASES = [
  { Icon: Users,     label: "Staycation Keluarga",        desc: "Quality family time in nature" },
  { Icon: Heart,     label: "Pasangan / Honeymoon",       desc: "Romantic & intimate getaway"   },
  { Icon: Building2, label: "Meeting & Corporate",        desc: "Inspiring workshop & training" },
  { Icon: Tent,      label: "Gathering & Komunitas",      desc: "Reunions & community events"   },
  { Icon: Leaf,      label: "Retreat & Self-Development", desc: "Reflection & wellness programs"},
];
const NOAH_ARK = {
  name: "Noah Ark Communal Room",
  desc: "Our signature communal accommodation built for large groups. Families, corporate teams, school groups, and communities can stay together under one roof while enjoying the refreshing nature of Parongpong.",
  cap: "Up to 20+ Pax · Multiple Units Available",
};
const REVIEWS = [
  { name: "Keluarga Santoso", stars: 5, text: "Tempatnya luar biasa asri! Anak-anak sangat menikmati kolam renang dan suasana alamnya. Staff sangat ramah. Pasti balik lagi!", loc: "Jakarta", type: "Family Staycation" },
  { name: "Reza & Nadia",     stars: 5, text: "Perfect romantic getaway. Suasana tenang, kamarnya cozy, dan pemandangannya hijau banget. Recommended untuk honeymoon!", loc: "Bandung", type: "Honeymoon" },
  { name: "PT Maju Bersama",  stars: 5, text: "Kami gathering 40 orang dan semuanya berjalan sangat lancar. Meeting room lengkap, catering enak, tim Oase sangat profesional.", loc: "Jakarta", type: "Corporate Gathering" },
];
const NAV = ["Tipe Kamar", "Fasilitas", "Galeri", "Gathering & Event", "Lokasi", "Temu Kami"];
const CONTACT = {
  wa: "+62 812-XXXX-XXXX", email: "oaseresortbandung@gmail.com",
  address: "Jl. Melati Ujung, Kampung Panyairan, Cihideung, Kec. Parongpong, Kab. Bandung Barat",
  ig: "@oaseresortbandung", tiktok: "Oase Resort Bandung",
  checkin: "14.00 WIB", checkout: "12.00 WIB",
};

// ─── Parallax hook ─────────────────────────────────────────────────────────────
function useParallax(speed = 0.28) {
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fn = () => { el.style.transform = `translateY(${window.scrollY * speed}px)`; };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [speed]);
  return ref;
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ items, index, onClose, onPrev, onNext, variant }: {
  items: typeof GALLERY; index: number; onClose: () => void;
  onPrev: () => void; onNext: () => void; variant: StyleOption;
}) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", fn);
    return () => { window.removeEventListener("keydown", fn); document.body.style.overflow = ""; };
  }, [onClose, onPrev, onNext]);

  const isBotanical = variant === "botanical";
  const isGlass = variant === "glassmorphic";
  const overlayBg = isBotanical ? "rgba(10,18,10,0.96)" : isGlass ? "rgba(0,0,0,0.88)" : "rgba(240,247,240,0.94)";
  const textColor = isBotanical || isGlass ? "white" : "#1c3320";
  const accent = isBotanical ? "#c8a040" : isGlass ? "rgba(150,230,150,0.9)" : "#8B6914";

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, background: overlayBg, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <button onClick={onClose} style={{ position: "absolute", top: "20px", right: "20px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "50%", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: textColor }}>
        <X size={18} />
      </button>
      <button onClick={onPrev} style={{ position: "absolute", left: "16px", background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: "50%", width: "44px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: textColor }}>
        <ChevronLeft size={20} />
      </button>
      <div style={{ maxWidth: "900px", width: "100%", textAlign: "center" }}>
        <img src={items[index].src} alt={items[index].label} style={{ width: "100%", maxHeight: "70vh", objectFit: "contain", borderRadius: "12px" }} />
        <div style={{ marginTop: "16px", display: "flex", gap: "8px", justifyContent: "center", alignItems: "center" }}>
          <span style={{ fontSize: "0.62rem", fontWeight: 700, color: accent, letterSpacing: "0.12em", textTransform: "uppercase", background: "rgba(255,255,255,0.16)", border: `1px solid ${accent}33`, padding: "3px 10px", borderRadius: "100px" }}>{items[index].cat}</span>
          <span style={{ fontSize: "0.9rem", fontWeight: 700, color: textColor }}>{items[index].label}</span>
        </div>
        <div style={{ display: "flex", gap: "6px", justifyContent: "center", marginTop: "12px" }}>
          {items.map((_, i) => (
            <div key={i} style={{ width: i === index ? "20px" : "6px", height: "6px", borderRadius: "3px", background: i === index ? accent : "rgba(255,255,255,0.25)", transition: "all 0.3s ease" }} />
          ))}
        </div>
      </div>
      <button onClick={onNext} style={{ position: "absolute", right: "16px", background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: "50%", width: "44px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: textColor }}>
        <ChevronRight size={20} />
      </button>
    </div>
  );
}

// ─── Gallery Section ──────────────────────────────────────────────────────────
function GallerySection({ variant, font, serif }: { variant: StyleOption; font: string; serif: string }) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const isBotanical = variant === "botanical";
  const isGlass = variant === "glassmorphic";
  const isLight = variant === "glassy";
  const accent = isBotanical ? "#c8a040" : isGlass ? "rgba(150,230,150,0.88)" : "#8B6914";
  const title = isBotanical || isGlass ? "white" : "#1c3320";
  const eyebrowColor = accent;

  // No backdropFilter — solid backgrounds ensure full visibility in Figma exports
  const cardStyle = (_idx: number): React.CSSProperties => {
    if (isLight) return { background: "rgba(255,255,255,0.72)", border: "1.5px solid rgba(255,255,255,0.92)" };
    if (isGlass) return { background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.22)" };
    return { background: "#162419", border: "1px solid rgba(200,160,64,0.18)" };
  };

  const bentoClasses = [
    "col-span-1 row-span-1 sm:col-span-2 lg:col-span-3 lg:row-span-2",
    "col-span-1 lg:col-span-2",
    "col-span-1 lg:col-span-1",
    "col-span-1 lg:col-span-1",
    "col-span-1 lg:col-span-2",
    "hidden lg:block lg:col-span-6",
  ];

  return (
    <section style={{ fontFamily: font }} className="py-14 md:py-20 px-5 md:px-10 max-w-7xl mx-auto">
      {/* Header — Figma: Section Header / Auto Layout Vertical */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-8 gap-3">
        <div>
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.38em", fontWeight: 700, color: eyebrowColor, textTransform: "uppercase", marginBottom: "6px" }}>Galeri Foto</p>
          <h2 style={{ fontFamily: isBotanical ? serif : font, fontSize: "clamp(1.5rem,4vw,2.5rem)", fontWeight: isBotanical ? 700 : 800, fontStyle: isBotanical ? "italic" : "normal", color: title, lineHeight: 1.15 }}>Suasana &amp; Fasilitas</h2>
        </div>
        <button onClick={() => setLightboxIdx(0)} style={{ fontSize: "0.72rem", fontWeight: 700, color: accent, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", letterSpacing: "0.05em", textTransform: "uppercase", padding: 0 }}>
          Lihat Semua <ArrowRight size={13} />
        </button>
      </div>

      {/* Bento Grid — Figma: Gallery Grid / CSS Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-2 md:gap-3" style={{ gridAutoRows: "210px" }}>
        {GALLERY.map((img, i) => (
          <div key={i} className={`${bentoClasses[i]} relative overflow-hidden cursor-pointer group`}
            style={{ ...cardStyle(i), borderRadius: isBotanical ? "6px" : "14px" }}
            onClick={() => setLightboxIdx(i)}>
            <img src={img.src} alt={img.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            {/* Hover overlay */}
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0)", transition: "background 0.35s ease" }}
              className="group-hover:!bg-black/40" />
            {/* Label chip */}
            <div style={{ position: "absolute", bottom: "12px", left: "12px", display: "flex", gap: "6px", alignItems: "center", opacity: 0, transition: "opacity 0.3s ease" }}
              className="group-hover:!opacity-100">
              <span style={{ fontSize: "0.58rem", fontWeight: 700, color: "white", letterSpacing: "0.1em", textTransform: "uppercase", background: isLight ? "rgba(139,105,20,0.82)" : isBotanical ? "rgba(200,160,64,0.8)" : "rgba(120,200,120,0.7)", padding: "3px 10px", borderRadius: "100px" }}>{img.cat}</span>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "white", textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}>{img.label}</span>
            </div>
            {/* Zoom icon */}
            <div style={{ position: "absolute", top: "12px", right: "12px", background: "rgba(0,0,0,0.45)", borderRadius: "50%", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity 0.3s ease" }}
              className="group-hover:!opacity-100">
              <ArrowRight size={14} color="white" />
            </div>
          </div>
        ))}
      </div>

      {lightboxIdx !== null && (
        <Lightbox items={GALLERY} index={lightboxIdx} variant={variant}
          onClose={() => setLightboxIdx(null)}
          onPrev={() => setLightboxIdx((lightboxIdx - 1 + GALLERY.length) % GALLERY.length)}
          onNext={() => setLightboxIdx((lightboxIdx + 1) % GALLERY.length)}
        />
      )}
    </section>
  );
}

// ─── Video Showcase ───────────────────────────────────────────────────────────
function VideoShowcase({ variant, font, serif }: { variant: StyleOption; font: string; serif: string }) {
  const [playing, setPlaying] = useState<number | null>(null);
  const isBotanical = variant === "botanical";
  const isGlass = variant === "glassmorphic";
  const isLight = variant === "glassy";
  const accent = isBotanical ? "#c8a040" : isGlass ? "rgba(150,230,150,0.88)" : "#8B6914";
  const title = isBotanical || isGlass ? "white" : "#1c3320";
  const muted = isBotanical ? "rgba(232,216,184,0.48)" : isGlass ? "rgba(255,255,255,0.48)" : "#5a7060";
  const card = isBotanical ? { background: "#162419", border: "1px solid rgba(200,160,64,0.15)", borderRadius: "6px" }
    : isGlass ? { background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.22)", borderRadius: "18px" }
    : { background: "rgba(255,255,255,0.72)", border: "1.5px solid rgba(255,255,255,0.9)", borderRadius: "16px" };

  const featVid = VIDEOS[0];
  const sideVids = VIDEOS.slice(1);

  return (
    <section style={{ fontFamily: font }} className="py-14 md:py-20 px-5 md:px-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.38em", fontWeight: 700, color: accent, textTransform: "uppercase", marginBottom: "6px" }}>Video Showcase</p>
        <h2 style={{ fontFamily: isBotanical ? serif : font, fontSize: "clamp(1.5rem,4vw,2.5rem)", fontWeight: isBotanical ? 700 : 800, fontStyle: isBotanical ? "italic" : "normal", color: title, lineHeight: 1.15 }}>
          Rasakan Suasana Oase
        </h2>
      </div>

      {/* Video grid — Figma: Video Grid / 2-col flex */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Featured video — 2/3 width on desktop */}
        <div style={{ ...card, overflow: "hidden", flex: "0 0 auto" }} className="w-full lg:w-2/3 relative group cursor-pointer"
          onClick={() => setPlaying(playing === 0 ? null : 0)}>
          <div style={{ position: "relative", height: "380px", overflow: "hidden" }}>
            <img src={featVid.thumb} alt={featVid.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div style={{ position: "absolute", inset: 0, background: playing === 0 ? "rgba(0,0,0,0.7)" : "linear-gradient(to top,rgba(0,0,0,0.65) 0%,rgba(0,0,0,0.1) 50%,transparent 100%)", transition: "background 0.4s ease" }} />
            {/* Play button */}
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
              <div style={{ width: "68px", height: "68px", background: playing === 0 ? "rgba(255,255,255,0.2)" : isLight ? "rgba(139,105,20,0.88)" : isBotanical ? "rgba(200,160,64,0.9)" : "rgba(120,200,120,0.2)", border: playing === 0 ? "2px solid rgba(255,255,255,0.5)" : `2px solid ${accent}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.35s ease", boxShadow: `0 0 0 12px ${accent}18` }}>
                {playing === 0 ? <X size={22} color="white" /> : <Play size={22} color="white" fill="white" style={{ marginLeft: "3px" }} />}
              </div>
              {/* Pulse ring */}
              {playing !== 0 && (
                <div style={{ position: "absolute", inset: "-8px", border: `2px solid ${accent}44`, borderRadius: "50%", animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite" }} />
              )}
            </div>
            {/* Now playing overlay */}
            {playing === 0 && (
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "8px" }}>
                <p style={{ fontSize: "0.68rem", letterSpacing: "0.3em", color: "rgba(255,255,255,0.6)", textTransform: "uppercase" }}>Video promosi akan segera hadir</p>
                <p style={{ fontSize: "1rem", fontWeight: 700, color: "white" }}>{featVid.title}</p>
              </div>
            )}
          </div>
          <div style={{ padding: "18px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ fontSize: "1rem", fontWeight: 800, color: title, marginBottom: "3px" }}>{featVid.title}</p>
                <p style={{ fontSize: "0.74rem", color: muted }}>{featVid.sub}</p>
              </div>
              <span style={{ fontSize: "0.68rem", fontWeight: 700, color: accent, background: isLight ? "rgba(139,105,20,0.14)" : "rgba(255,255,255,0.16)", border: `1px solid ${accent}33`, padding: "4px 10px", borderRadius: "100px" }}>{featVid.dur}</span>
            </div>
          </div>
        </div>

        {/* Side videos — 1/3 width on desktop, stacked */}
        <div className="flex flex-col gap-3 lg:flex-1">
          {sideVids.map((v, i) => (
            <div key={i} style={{ ...card, overflow: "hidden", display: "flex", gap: "14px", padding: "0 0 0 0", cursor: "pointer" }}
              className="group hover:-translate-y-0.5 transition-all"
              onClick={() => setPlaying(playing === i + 1 ? null : i + 1)}>
              <div style={{ width: "100px", height: "80px", flexShrink: 0, position: "relative", overflow: "hidden" }}>
                <img src={v.thumb} alt={v.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: "28px", height: "28px", background: "rgba(255,255,255,0.22)", border: "1.5px solid rgba(255,255,255,0.4)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Play size={11} color="white" fill="white" style={{ marginLeft: "2px" }} />
                  </div>
                </div>
              </div>
              <div style={{ flex: 1, padding: "12px 14px 12px 0", display: "flex", flexDirection: "column", justifyContent: "center", gap: "3px" }}>
                <p style={{ fontSize: "0.84rem", fontWeight: 700, color: title, lineHeight: 1.2 }}>{v.title}</p>
                <p style={{ fontSize: "0.68rem", color: muted }}>{v.sub}</p>
                <span style={{ fontSize: "0.62rem", fontWeight: 600, color: accent }}>{v.dur}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`@keyframes ping { 0%{transform:scale(1);opacity:.8} 100%{transform:scale(1.7);opacity:0} }`}</style>
    </section>
  );
}

// ─── Shared utils ─────────────────────────────────────────────────────────────
function StarRow({ count, color }: { count: number; color: string }) {
  return (
    <div style={{ display: "flex", gap: "3px", marginBottom: "10px" }}>
      {Array.from({ length: count }).map((_, i) => <Star key={i} size={13} fill={color} color={color} />)}
    </div>
  );
}
function WAButton({ bg, fg, border, full }: { bg: string; fg: string; border?: string; full?: boolean }) {
  return (
    <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: bg, color: fg, padding: "12px 24px", borderRadius: "100px", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.05em", textDecoration: "none", border: border || "none", width: full ? "100%" : "auto", justifyContent: full ? "center" : "flex-start" }}
      className="hover:opacity-90 transition-opacity">
      <MessageCircle size={15} /> Booking via WhatsApp
    </a>
  );
}

// ─── OPTION 1: GLASSY ────────────────────────────────────────────────────────
function GlassyHome() {
  const [menu, setMenu] = useState(false);
  const heroRef = useParallax(0.28);
  const font = "'Montserrat', sans-serif";
  const forest = "#1c3320", gold = "#8B6914", sage = "#5a7060";
  // Solid semi-transparent background — no backdropFilter so Figma export is complete.
  // The blur was purely decorative; the rgba background provides the glass look.
  const glassCard: React.CSSProperties = { background: "rgba(255,255,255,0.72)", border: "1.5px solid rgba(255,255,255,0.92)" };

  return (
    <div style={{ fontFamily: font, background: "linear-gradient(150deg,#ecf6ec 0%,#deeede 45%,#e8f2e8 100%)", minHeight: "100vh", color: forest }}>

      {/* ── Navbar ── Figma: Nav / Auto Layout Horizontal / Sticky */}
      <nav style={{ ...glassCard, background: "rgba(255,255,255,0.78)", borderTop: "none", borderLeft: "none", borderRight: "none", boxShadow: "0 2px 20px rgba(0,0,0,0.05)", position: "sticky", top: "44px", zIndex: 40 }}
        className="px-5 md:px-10 py-3.5 flex items-center justify-between">
        {/* Logo */}
        <div style={{ flexShrink: 0 }}>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: "1.35rem", fontWeight: 700, color: forest, letterSpacing: "0.22em" }}>OASE</div>
          <div style={{ fontSize: "0.37rem", letterSpacing: "0.42em", fontWeight: 700, color: gold, textTransform: "uppercase", marginTop: "-2px" }}>Green Forest Resort</div>
        </div>
        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-7">
          {NAV.map(l => <a key={l} href="#" style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.07em", color: forest, textDecoration: "none", textTransform: "uppercase" }} className="hover:text-[#8B6914] transition-colors">{l}</a>)}
          <WAButton bg={gold} fg="white" />
        </div>
        <button className="lg:hidden p-1" onClick={() => setMenu(!menu)}>{menu ? <X size={22} color={forest} /> : <Menu size={22} color={forest} />}</button>
      </nav>
      {menu && (
        <div style={{ ...glassCard, background: "rgba(255,255,255,0.96)", position: "fixed", top: "108px", left: 0, right: 0, zIndex: 39, borderTop: "none", borderLeft: "none", borderRight: "none" }}
          className="py-5 px-8 flex flex-col gap-4">
          {NAV.map(l => <a key={l} href="#" style={{ fontSize: "0.86rem", fontWeight: 600, letterSpacing: "0.06em", color: forest, textTransform: "uppercase", textDecoration: "none" }}>{l}</a>)}
          <WAButton bg={gold} fg="white" full />
        </div>
      )}

      {/* ── Hero ── Figma: Hero Section / Parallax bg image */}
      <section className="relative overflow-hidden" style={{ height: "94vh", minHeight: "560px" }}>
        <img ref={heroRef} src={IMGS.hero} alt="Oase Green Forest Resort Parongpong" className="absolute w-full object-cover" style={{ height: "130%", top: "-15%", left: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(0,0,0,0.04) 0%,rgba(0,0,0,0.18) 50%,rgba(20,44,22,0.64) 100%)" }} />
        {/* Hero text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-5" style={{ paddingTop: "0", paddingBottom: "200px" }}>
          <p style={{ fontSize: "0.62rem", letterSpacing: "0.52em", fontWeight: 700, textTransform: "uppercase", color: "rgba(255,220,130,0.95)", marginBottom: "12px" }}>Parongpong · Cihideung · Bandung Barat</p>
          <h1 style={{ fontSize: "clamp(1.9rem,5.5vw,4.2rem)", fontWeight: 900, lineHeight: 1.04, marginBottom: "14px", textShadow: "0 2px 24px rgba(0,0,0,0.22)", maxWidth: "700px" }}>Alam yang Menyejukkan,<br />Kenangan yang Abadi</h1>
          <p style={{ fontSize: "clamp(0.83rem,1.6vw,1rem)", color: "rgba(255,255,255,0.8)", maxWidth: "460px", lineHeight: 1.82 }}>A tranquil nature-inspired retreat — a perfect blend of comfort, relaxation, and natural beauty in the highlands of Bandung.</p>
        </div>
        {/* Booking widget */}
        <div style={{ ...glassCard, position: "absolute", bottom: "24px", left: "50%", transform: "translateX(-50%)", width: "min(94%, 940px)", borderRadius: "20px", padding: "18px 22px", boxShadow: "0 12px 48px rgba(0,0,0,0.14)" }}>
          <p style={{ fontSize: "0.58rem", letterSpacing: "0.28em", fontWeight: 700, color: gold, textTransform: "uppercase", marginBottom: "11px" }}>Cek Ketersediaan</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
            {[["Check In","14.00 WIB"],["Check Out","12.00 WIB"],["Jumlah Tamu","2 Tamu"],["Tipe Kamar","Semua Tipe"]].map(([l,v]) => (
              <div key={l} style={{ background: "rgba(255,255,255,0.68)", border: "1px solid rgba(255,255,255,0.9)", borderRadius: "10px", padding: "10px 13px" }}>
                <p style={{ fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: gold, marginBottom: "2px" }}>{l}</p>
                <p style={{ fontSize: "0.82rem", fontWeight: 600, color: forest }}>{v}</p>
              </div>
            ))}
          </div>
          <button style={{ width: "100%", padding: "11px", background: `linear-gradient(135deg,#6b4d10 0%,#b87d18 100%)`, color: "white", border: "none", borderRadius: "10px", fontSize: "0.76rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }} className="hover:opacity-90 transition-opacity">Cek Ketersediaan</button>
        </div>
      </section>

      {/* ── Use Cases ── Figma: Need Selection / 5-col grid */}
      <section className="py-12 md:py-16 px-5 md:px-10 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <p style={{ fontSize: "0.62rem", letterSpacing: "0.35em", fontWeight: 700, color: gold, textTransform: "uppercase", marginBottom: "5px" }}>Pilih Kebutuhan Anda</p>
          <h2 style={{ fontSize: "clamp(1.3rem,3.5vw,2rem)", fontWeight: 800, color: forest }}>Kami Siap Melayani</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {USE_CASES.map(({ Icon, label, desc }) => (
            <div key={label} style={{ ...glassCard, borderRadius: "16px", padding: "18px 13px", textAlign: "center" }} className="hover:shadow-lg hover:-translate-y-0.5 transition-all">
              <div style={{ width: "42px", height: "42px", background: "rgba(139,105,20,0.1)", borderRadius: "11px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 9px" }}><Icon size={19} color={gold} /></div>
              <p style={{ fontSize: "0.74rem", fontWeight: 800, color: forest, marginBottom: "3px", lineHeight: 1.3 }}>{label}</p>
              <p style={{ fontSize: "0.62rem", color: sage, lineHeight: 1.45 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Rooms ── Figma: Rooms Section / 4-col grid */}
      <section className="py-8 px-5 md:px-10 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <p style={{ fontSize: "0.62rem", letterSpacing: "0.35em", fontWeight: 700, color: gold, textTransform: "uppercase", marginBottom: "5px" }}>Kamar & Akomodasi</p>
            <h2 style={{ fontSize: "clamp(1.3rem,3.5vw,2.2rem)", fontWeight: 800, color: forest }}>Tipe Kamar Unggulan</h2>
          </div>
          <a href="#" style={{ fontSize: "0.7rem", fontWeight: 700, color: gold, textDecoration: "none", display: "flex", alignItems: "center", gap: "4px", textTransform: "uppercase" }}>Lihat Semua <ArrowRight size={13} /></a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ROOMS.map(room => (
            <div key={room.name} style={{ ...glassCard, borderRadius: "16px", overflow: "hidden" }} className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="relative overflow-hidden" style={{ height: "182px", background: "#c8e0c8" }}>
                <img src={room.img} alt={room.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div style={{ position: "absolute", top: "10px", left: "10px", background: "rgba(255,255,255,0.75)", borderRadius: "6px", padding: "3px 9px", fontSize: "0.58rem", fontWeight: 800, color: gold }}>{room.tag}</div>
                <div style={{ position: "absolute", top: "10px", right: "10px", background: "rgba(255,255,255,0.75)", borderRadius: "8px", padding: "4px 10px" }}>
                  <span style={{ fontSize: "0.68rem", fontWeight: 800, color: forest }}>ab {room.price}</span><span style={{ fontSize: "0.55rem", color: sage }}>/mlm</span>
                </div>
              </div>
              <div style={{ padding: "14px" }}>
                <h3 style={{ fontSize: "0.9rem", fontWeight: 800, color: forest, marginBottom: "4px" }}>{room.name}</h3>
                <p style={{ fontSize: "0.7rem", color: sage, lineHeight: 1.55, marginBottom: "10px" }}>{room.desc}</p>
                <div style={{ display: "flex", gap: "5px", marginBottom: "11px" }}>
                  {[room.cap, room.sqm].map(t => <span key={t} style={{ fontSize: "0.59rem", background: "rgba(139,105,20,0.15)", color: gold, padding: "3px 8px", borderRadius: "100px", fontWeight: 700, border: "1px solid rgba(139,105,20,0.18)" }}>{t}</span>)}
                </div>
                <button style={{ width: "100%", padding: "9px", background: "rgba(139,105,20,0.14)", border: "1.5px solid rgba(139,105,20,0.32)", borderRadius: "8px", fontSize: "0.68rem", fontWeight: 700, color: gold, cursor: "pointer", letterSpacing: "0.06em", textTransform: "uppercase" }} className="hover:bg-[#8B6914] hover:text-white transition-all">Pesan Kamar</button>
              </div>
            </div>
          ))}
        </div>
        {/* Noah Ark */}
        <div style={{ ...glassCard, borderRadius: "18px", padding: "20px 24px", marginTop: "16px", display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ width: "48px", height: "48px", background: "rgba(139,105,20,0.1)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Users size={22} color={gold} /></div>
          <div style={{ flex: 1, minWidth: "200px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
              <h3 style={{ fontSize: "0.92rem", fontWeight: 800, color: forest }}>{NOAH_ARK.name}</h3>
              <span style={{ fontSize: "0.56rem", background: gold, color: "white", padding: "2px 8px", borderRadius: "100px", fontWeight: 700 }}>Eksklusif</span>
            </div>
            <p style={{ fontSize: "0.72rem", color: sage, lineHeight: 1.6 }}>{NOAH_ARK.desc}</p>
            <p style={{ fontSize: "0.65rem", fontWeight: 700, color: gold, marginTop: "5px" }}>{NOAH_ARK.cap}</p>
          </div>
          <WAButton bg={gold} fg="white" />
        </div>
      </section>

      {/* ── Gallery ── shared component */}
      <GallerySection variant="glassy" font={font} serif={font} />

      {/* ── Video ── shared component */}
      <VideoShowcase variant="glassy" font={font} serif={font} />

      {/* ── Facilities ── */}
      <section className="py-12 px-5 md:px-10 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <p style={{ fontSize: "0.62rem", letterSpacing: "0.35em", fontWeight: 700, color: gold, textTransform: "uppercase", marginBottom: "5px" }}>Fasilitas Resort</p>
          <h2 style={{ fontSize: "clamp(1.3rem,3.5vw,2rem)", fontWeight: 800, color: forest }}>Fasilitas Unggulan</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {FACILITIES.map(({ Icon, name, desc }) => (
            <div key={name} style={{ ...glassCard, borderRadius: "14px", padding: "16px 12px", textAlign: "center" }} className="hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div style={{ width: "40px", height: "40px", background: "rgba(139,105,20,0.1)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}><Icon size={18} color={gold} /></div>
              <p style={{ fontSize: "0.74rem", fontWeight: 700, color: forest, marginBottom: "3px" }}>{name}</p>
              <p style={{ fontSize: "0.61rem", color: sage, lineHeight: 1.45 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ margin: "0 20px 40px", maxWidth: "1300px" }} className="md:mx-10 xl:mx-auto relative overflow-hidden rounded-3xl">
        <img src={IMGS.pool} alt="kolam renang" className="absolute inset-0 w-full h-full object-cover" />
        <div style={{ background: "rgba(20,44,23,0.78)" }} className="relative px-8 py-14 md:py-20 text-center text-white">
          <p style={{ fontSize: "0.62rem", letterSpacing: "0.45em", color: "rgba(255,220,130,0.9)", textTransform: "uppercase", marginBottom: "9px" }}>Booking Langsung Lebih Mudah</p>
          <h2 style={{ fontSize: "clamp(1.5rem,4vw,2.6rem)", fontWeight: 800, marginBottom: "12px" }}>Harga Terbaik Dijamin</h2>
          <p style={{ fontSize: "0.86rem", color: "rgba(255,255,255,0.73)", maxWidth: "440px", margin: "0 auto 22px", lineHeight: 1.82 }}>Booking langsung via WhatsApp untuk harga spesial, sarapan gratis, dan berbagai keuntungan eksklusif tamu Oase.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <WAButton bg="rgba(255,255,255,0.18)" fg="white" border="1.5px solid rgba(255,255,255,0.4)" />
            <a href="#" style={{ background: "rgba(139,105,20,0.75)", color: "white", padding: "12px 24px", borderRadius: "100px", fontSize: "0.78rem", fontWeight: 700, textDecoration: "none" }} className="hover:opacity-90 transition-opacity">Lihat Paket</a>
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="py-12 px-5 md:px-10 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <p style={{ fontSize: "0.62rem", letterSpacing: "0.35em", fontWeight: 700, color: gold, textTransform: "uppercase", marginBottom: "5px" }}>Ulasan Tamu</p>
          <h2 style={{ fontSize: "clamp(1.3rem,3.5vw,2rem)", fontWeight: 800, color: forest }}>Apa Kata Tamu Kami?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {REVIEWS.map(r => (
            <div key={r.name} style={{ ...glassCard, borderRadius: "18px", padding: "20px" }}>
              <div style={{ fontSize: "0.57rem", background: "rgba(139,105,20,0.1)", color: gold, padding: "3px 9px", borderRadius: "100px", display: "inline-block", marginBottom: "9px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>{r.type}</div>
              <StarRow count={r.stars} color={gold} />
              <p style={{ fontSize: "0.82rem", lineHeight: 1.78, color: sage, marginBottom: "14px" }}>"{r.text}"</p>
              <div style={{ borderTop: "1px solid rgba(139,105,20,0.16)", paddingTop: "11px" }}>
                <p style={{ fontSize: "0.8rem", fontWeight: 800, color: forest }}>{r.name}</p>
                <p style={{ fontSize: "0.66rem", color: gold, fontWeight: 500 }}>{r.loc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: "rgba(20,44,23,0.97)", color: "rgba(255,255,255,0.72)", marginTop: "8px" }} className="py-12 px-5 md:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="sm:col-span-2 md:col-span-2">
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: "1.5rem", fontWeight: 700, color: "white", letterSpacing: "0.22em", marginBottom: "3px" }}>OASE</div>
            <p style={{ fontSize: "0.52rem", letterSpacing: "0.32em", color: "rgba(255,222,130,0.58)", textTransform: "uppercase", marginBottom: "12px" }}>Green Forest Resort · Parongpong, Bandung Barat</p>
            <p style={{ fontSize: "0.77rem", lineHeight: 1.8, color: "rgba(255,255,255,0.48)", maxWidth: "300px" }}>A tranquil nature-inspired retreat in the highlands of Bandung. Bagian dari BIG Group.</p>
            <div style={{ marginTop: "14px", display: "flex", gap: "6px" }}>
              {[["Check In", CONTACT.checkin], ["Check Out", CONTACT.checkout]].map(([l, v]) => (
                <div key={l} style={{ background: "rgba(255,255,255,0.16)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "7px 11px" }}>
                  <p style={{ fontSize: "0.52rem", letterSpacing: "0.12em", color: "rgba(255,222,130,0.5)", textTransform: "uppercase", marginBottom: "2px" }}>{l}</p>
                  <p style={{ fontSize: "0.76rem", fontWeight: 700, color: "white" }}>{v}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.22em", fontWeight: 700, color: "rgba(255,222,130,0.6)", textTransform: "uppercase", marginBottom: "11px" }}>Navigasi</p>
            {["Tipe Kamar", "Fasilitas", "Galeri", "Gathering & Event", "Lokasi", "Temu Kami"].map(l => (
              <a key={l} href="#" style={{ display: "block", fontSize: "0.76rem", color: "rgba(255,255,255,0.45)", textDecoration: "none", marginBottom: "7px" }} className="hover:text-white transition-colors">{l}</a>
            ))}
          </div>
          <div>
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.22em", fontWeight: 700, color: "rgba(255,222,130,0.6)", textTransform: "uppercase", marginBottom: "11px" }}>Kontak</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {[
                [MapPin, CONTACT.address],
                [MessageCircle, CONTACT.wa],
                [Mail, CONTACT.email],
                [Instagram, CONTACT.ig],
                [Music2, CONTACT.tiktok],
              ].map(([Icon, val], i) => (
                <div key={i} style={{ display: "flex", alignItems: i === 0 ? "flex-start" : "center", gap: "7px" }}>
                  <div style={{ flexShrink: 0, marginTop: i === 0 ? "2px" : 0 }}><Icon size={12} color="rgba(255,222,130,0.5)" /></div>
                  <span style={{ fontSize: "0.71rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.55 }}>{val as string}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.18)", paddingTop: "16px", textAlign: "center", fontSize: "0.64rem", color: "rgba(255,255,255,0.22)" }}>
          © 2025 Oase Green Forest Resort · Parongpong, Kab. Bandung Barat · Bagian dari BIG Group
        </div>
      </footer>
    </div>
  );
}

// ─── OPTION 2: GLASSMORPHIC ───────────────────────────────────────────────────
function GlassmorphicHome() {
  const [menu, setMenu] = useState(false);
  const heroRef = useParallax(0.28);
  const font = "'Montserrat', sans-serif";
  const mint = "rgba(150,230,150,0.88)";
  // backdrop-filter is a progressive visual enhancement — panels are readable
  // without it via their solid background color (important for Figma export).
  // Fixed bg replaced with background-image on root so HTML-to-Figma captures it.
  const panel: React.CSSProperties = { background: "rgba(255,255,255,0.13)", border: "1px solid rgba(255,255,255,0.18)" };

  return (
    <div style={{ fontFamily: font, minHeight: "100vh", color: "white", position: "relative", backgroundImage: `linear-gradient(rgba(8,22,10,0.65), rgba(8,22,10,0.65)), url(${IMGS.hero})`, backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}>

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Nav */}
        <nav style={{ ...panel, background: "rgba(0,0,0,0.2)", borderTop: "none", borderLeft: "none", borderRight: "none", borderBottom: "1px solid rgba(255,255,255,0.1)", position: "sticky", top: "44px", zIndex: 40 }}
          className="px-5 md:px-10 py-3.5 flex items-center justify-between">
          <div style={{ flexShrink: 0 }}>
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: "1.35rem", fontWeight: 700, color: "white", letterSpacing: "0.22em" }}>OASE</div>
            <div style={{ fontSize: "0.37rem", letterSpacing: "0.42em", fontWeight: 700, color: mint, textTransform: "uppercase", marginTop: "-2px" }}>Green Forest Resort</div>
          </div>
          <div className="hidden lg:flex items-center gap-5 xl:gap-7">
            {NAV.map(l => <a key={l} href="#" style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.07em", color: "rgba(255,255,255,0.7)", textDecoration: "none", textTransform: "uppercase" }} className="hover:text-white transition-colors">{l}</a>)}
            <a href="#" style={{ ...panel, display: "inline-flex", alignItems: "center", gap: "6px", padding: "8px 18px", borderRadius: "100px", fontSize: "0.7rem", fontWeight: 700, color: "white", textDecoration: "none" }} className="hover:bg-white/14 transition-all"><MessageCircle size={14} /> Booking</a>
          </div>
          <button className="lg:hidden p-1" onClick={() => setMenu(!menu)}>{menu ? <X size={22} color="white" /> : <Menu size={22} color="white" />}</button>
        </nav>
        {menu && (
          <div style={{ ...panel, background: "rgba(0,0,0,0.58)", position: "fixed", top: "108px", left: 0, right: 0, zIndex: 39, borderLeft: "none", borderRight: "none" }}
            className="py-5 px-8 flex flex-col gap-4">
            {NAV.map(l => <a key={l} href="#" style={{ fontSize: "0.86rem", fontWeight: 600, color: "rgba(255,255,255,0.82)", textTransform: "uppercase", textDecoration: "none" }}>{l}</a>)}
          </div>
        )}

        {/* Hero */}
        <section className="relative overflow-hidden" style={{ height: "100vh", minHeight: "600px" }}>
          <img ref={heroRef} src={IMGS.hero} alt="Oase Green Forest" className="absolute w-full object-cover" style={{ height: "130%", top: "-15%", left: 0 }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(8,22,10,0.55)" }} />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5" style={{ paddingBottom: "240px" }}>
            <p style={{ fontSize: "0.62rem", letterSpacing: "0.52em", fontWeight: 700, textTransform: "uppercase", color: mint, marginBottom: "14px" }}>Parongpong · Cihideung · Bandung Barat</p>
            <h1 style={{ fontSize: "clamp(2rem,7vw,5.2rem)", fontWeight: 900, lineHeight: 1.04, marginBottom: "14px", textShadow: "0 4px 40px rgba(0,0,0,0.4)", maxWidth: "750px" }}>Alam yang Menyejukkan,<br />Kenangan yang Abadi</h1>
            <p style={{ fontSize: "clamp(0.83rem,1.6vw,1rem)", color: "rgba(255,255,255,0.7)", maxWidth: "430px", lineHeight: 1.82 }}>A tranquil nature-inspired retreat in the highlands of Bandung.</p>
          </div>
          {/* Booking widget */}
          <div style={{ ...panel, position: "absolute", bottom: "24px", left: "50%", transform: "translateX(-50%)", width: "min(94%, 940px)", borderRadius: "24px", padding: "22px 24px", boxShadow: "0 32px 80px rgba(0,0,0,0.28)" }}>
            <p style={{ fontSize: "0.58rem", letterSpacing: "0.28em", fontWeight: 700, color: mint, textTransform: "uppercase", marginBottom: "13px" }}>Cek Ketersediaan</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
              {[["Check In","14.00 WIB"],["Check Out","12.00 WIB"],["Jumlah Tamu","2 Tamu"],["Tipe Kamar","Semua Tipe"]].map(([l,v]) => (
                <div key={l} style={{ background: "rgba(255,255,255,0.16)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "12px", padding: "10px 12px" }}>
                  <p style={{ fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: mint, marginBottom: "2px" }}>{l}</p>
                  <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "rgba(255,255,255,0.88)" }}>{v}</p>
                </div>
              ))}
            </div>
            <button style={{ width: "100%", padding: "11px", background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.28)", borderRadius: "12px", color: "white", fontSize: "0.76rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }} className="hover:bg-white/22 transition-all">Cek Ketersediaan</button>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-12 md:py-16 px-5 md:px-10 max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <p style={{ fontSize: "0.62rem", letterSpacing: "0.38em", fontWeight: 700, color: mint, textTransform: "uppercase", marginBottom: "5px" }}>Pilih Kebutuhan Anda</p>
            <h2 style={{ fontSize: "clamp(1.3rem,3.5vw,2rem)", fontWeight: 800 }}>Kami Siap Melayani</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {USE_CASES.map(({ Icon, label, desc }) => (
              <div key={label} style={{ ...panel, borderRadius: "18px", padding: "18px 13px", textAlign: "center" }} className="hover:bg-white/10 transition-all">
                <div style={{ width: "40px", height: "40px", background: "rgba(120,210,120,0.20)", border: "1px solid rgba(120,210,120,0.2)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 9px" }}><Icon size={18} color={mint} /></div>
                <p style={{ fontSize: "0.72rem", fontWeight: 800, marginBottom: "3px", lineHeight: 1.3 }}>{label}</p>
                <p style={{ fontSize: "0.61rem", color: "rgba(255,255,255,0.48)", lineHeight: 1.45 }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Rooms */}
        <section className="py-8 px-5 md:px-10 max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <p style={{ fontSize: "0.62rem", letterSpacing: "0.38em", fontWeight: 700, color: mint, textTransform: "uppercase", marginBottom: "5px" }}>Kamar & Akomodasi</p>
              <h2 style={{ fontSize: "clamp(1.3rem,3.5vw,2.2rem)", fontWeight: 800 }}>Tipe Kamar Unggulan</h2>
            </div>
            <a href="#" style={{ fontSize: "0.7rem", fontWeight: 700, color: mint, textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}>Lihat Semua <ArrowRight size={13} /></a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ROOMS.map(room => (
              <div key={room.name} style={{ ...panel, borderRadius: "20px", overflow: "hidden" }} className="group hover:bg-white/10 hover:-translate-y-1 transition-all duration-300">
                <div className="relative overflow-hidden" style={{ height: "180px", background: "#0d1e10" }}>
                  <img src={room.img} alt={room.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85" />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.55) 0%,transparent 55%)" }} />
                  <div style={{ position: "absolute", top: "10px", left: "10px", background: "rgba(0,0,0,0.38)", borderRadius: "6px", padding: "3px 9px", fontSize: "0.58rem", fontWeight: 800, color: mint }}>{room.tag}</div>
                  <div style={{ position: "absolute", top: "10px", right: "10px", background: "rgba(0,0,0,0.38)", borderRadius: "8px", padding: "4px 10px" }}>
                    <span style={{ fontSize: "0.68rem", fontWeight: 800, color: mint }}>ab {room.price}</span><span style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.45)" }}>/mlm</span>
                  </div>
                </div>
                <div style={{ padding: "14px" }}>
                  <h3 style={{ fontSize: "0.9rem", fontWeight: 800, color: "rgba(255,255,255,0.92)", marginBottom: "4px" }}>{room.name}</h3>
                  <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.47)", lineHeight: 1.55, marginBottom: "10px" }}>{room.desc}</p>
                  <div style={{ display: "flex", gap: "5px", marginBottom: "11px" }}>
                    {[room.cap, room.sqm].map(t => <span key={t} style={{ fontSize: "0.58rem", background: "rgba(120,210,120,0.18)", color: mint, padding: "3px 8px", borderRadius: "100px", fontWeight: 700, border: "1px solid rgba(120,210,120,0.18)" }}>{t}</span>)}
                  </div>
                  <button style={{ width: "100%", padding: "9px", background: "rgba(255,255,255,0.16)", border: "1px solid rgba(255,255,255,0.17)", borderRadius: "10px", fontSize: "0.68rem", fontWeight: 700, color: "rgba(255,255,255,0.82)", cursor: "pointer" }} className="hover:bg-white/14 transition-all">Pesan Kamar</button>
                </div>
              </div>
            ))}
          </div>
          {/* Noah Ark */}
          <div style={{ ...panel, borderRadius: "20px", padding: "20px 22px", marginTop: "14px", display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ width: "46px", height: "46px", background: "rgba(120,210,120,0.18)", border: "1px solid rgba(120,210,120,0.18)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Users size={21} color={mint} /></div>
            <div style={{ flex: 1, minWidth: "200px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
                <h3 style={{ fontSize: "0.9rem", fontWeight: 800 }}>{NOAH_ARK.name}</h3>
                <span style={{ fontSize: "0.55rem", background: "rgba(120,210,120,0.18)", color: mint, padding: "2px 8px", borderRadius: "100px", fontWeight: 700, border: "1px solid rgba(120,210,120,0.22)" }}>Eksklusif</span>
              </div>
              <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{NOAH_ARK.desc}</p>
              <p style={{ fontSize: "0.63rem", fontWeight: 700, color: mint, marginTop: "5px" }}>{NOAH_ARK.cap}</p>
            </div>
            <a href="#" style={{ ...panel, display: "inline-flex", alignItems: "center", gap: "6px", padding: "11px 20px", borderRadius: "100px", fontSize: "0.72rem", fontWeight: 700, color: "white", textDecoration: "none" }} className="hover:bg-white/14 transition-all"><MessageCircle size={14} /> Tanya via WA</a>
          </div>
        </section>

        <GallerySection variant="glassmorphic" font={font} serif={font} />
        <VideoShowcase variant="glassmorphic" font={font} serif={font} />

        {/* Facilities */}
        <section className="py-12 px-5 md:px-10 max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <p style={{ fontSize: "0.62rem", letterSpacing: "0.38em", fontWeight: 700, color: mint, textTransform: "uppercase", marginBottom: "5px" }}>Fasilitas Resort</p>
            <h2 style={{ fontSize: "clamp(1.3rem,3.5vw,2rem)", fontWeight: 800 }}>Fasilitas Unggulan</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {FACILITIES.map(({ Icon, name, desc }) => (
              <div key={name} style={{ ...panel, borderRadius: "16px", padding: "16px 12px", textAlign: "center" }} className="hover:bg-white/10 transition-all">
                <div style={{ width: "38px", height: "38px", background: "rgba(120,210,120,0.18)", border: "1px solid rgba(120,210,120,0.16)", borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}><Icon size={17} color={mint} /></div>
                <p style={{ fontSize: "0.73rem", fontWeight: 700, color: "rgba(255,255,255,0.88)", marginBottom: "3px" }}>{name}</p>
                <p style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.45 }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 px-5 md:px-10">
          <div style={{ ...panel, borderRadius: "26px", padding: "44px 28px", textAlign: "center", maxWidth: "760px", margin: "0 auto" }}>
            <p style={{ fontSize: "0.62rem", letterSpacing: "0.45em", color: mint, textTransform: "uppercase", marginBottom: "9px", fontWeight: 700 }}>Booking Langsung Lebih Mudah</p>
            <h2 style={{ fontSize: "clamp(1.5rem,4vw,2.6rem)", fontWeight: 900, marginBottom: "10px" }}>Harga Terbaik Dijamin</h2>
            <p style={{ fontSize: "0.84rem", color: "rgba(255,255,255,0.58)", maxWidth: "400px", margin: "0 auto 24px", lineHeight: 1.82 }}>Booking langsung via WhatsApp untuk harga spesial, sarapan gratis, dan keuntungan eksklusif tamu Oase.</p>
            <div className="flex gap-3 justify-center flex-wrap">
              <a href="#" style={{ ...panel, display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 24px", borderRadius: "100px", fontSize: "0.76rem", fontWeight: 700, color: "white", textDecoration: "none" }} className="hover:bg-white/14 transition-all"><MessageCircle size={14} /> Booking via WhatsApp</a>
              <a href="#" style={{ background: "rgba(120,210,120,0.14)", border: "1px solid rgba(150,230,150,0.26)", color: mint, padding: "12px 24px", borderRadius: "100px", fontSize: "0.76rem", fontWeight: 700, textDecoration: "none" }} className="hover:bg-green-400/20 transition-all">Lihat Paket</a>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="py-12 px-5 md:px-10 max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <p style={{ fontSize: "0.62rem", letterSpacing: "0.38em", fontWeight: 700, color: mint, textTransform: "uppercase", marginBottom: "5px" }}>Ulasan Tamu</p>
            <h2 style={{ fontSize: "clamp(1.3rem,3.5vw,2rem)", fontWeight: 800 }}>Apa Kata Tamu Kami?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {REVIEWS.map(r => (
              <div key={r.name} style={{ ...panel, borderRadius: "18px", padding: "20px" }}>
                <div style={{ fontSize: "0.56rem", background: "rgba(120,210,120,0.18)", color: mint, padding: "3px 9px", borderRadius: "100px", display: "inline-block", marginBottom: "9px", fontWeight: 700, border: "1px solid rgba(120,210,120,0.16)" }}>{r.type}</div>
                <StarRow count={r.stars} color={mint} />
                <p style={{ fontSize: "0.81rem", lineHeight: 1.78, color: "rgba(255,255,255,0.58)", marginBottom: "13px" }}>"{r.text}"</p>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "11px" }}>
                  <p style={{ fontSize: "0.8rem", fontWeight: 800 }}>{r.name}</p>
                  <p style={{ fontSize: "0.65rem", color: mint, fontWeight: 600 }}>{r.loc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer style={{ background: "rgba(10,24,12,0.92)", borderTop: "1px solid rgba(255,255,255,0.18)", marginTop: "16px" }} className="py-12 px-5 md:px-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="sm:col-span-2">
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: "1.5rem", fontWeight: 700, letterSpacing: "0.22em", marginBottom: "3px" }}>OASE</div>
              <p style={{ fontSize: "0.52rem", letterSpacing: "0.32em", color: "rgba(150,230,150,0.48)", textTransform: "uppercase", marginBottom: "12px" }}>Green Forest Resort · Parongpong, Bandung Barat</p>
              <p style={{ fontSize: "0.76rem", lineHeight: 1.8, color: "rgba(255,255,255,0.38)", maxWidth: "290px" }}>A tranquil nature-inspired retreat. Bagian dari BIG Group.</p>
            </div>
            <div>
              <p style={{ fontSize: "0.59rem", letterSpacing: "0.22em", fontWeight: 700, color: "rgba(150,230,150,0.52)", textTransform: "uppercase", marginBottom: "11px" }}>Navigasi</p>
              {["Tipe Kamar","Fasilitas","Galeri","Gathering & Event","Lokasi","Temu Kami"].map(l => <a key={l} href="#" style={{ display: "block", fontSize: "0.74rem", color: "rgba(255,255,255,0.38)", textDecoration: "none", marginBottom: "7px" }} className="hover:text-white transition-colors">{l}</a>)}
            </div>
            <div>
              <p style={{ fontSize: "0.59rem", letterSpacing: "0.22em", fontWeight: 700, color: "rgba(150,230,150,0.52)", textTransform: "uppercase", marginBottom: "11px" }}>Kontak</p>
              {[[MessageCircle,CONTACT.wa],[Mail,CONTACT.email],[Instagram,CONTACT.ig],[Music2,CONTACT.tiktok]].map(([Icon,val],i)=>(
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "8px" }}>
                  <Icon size={12} color="rgba(150,230,150,0.42)" /><span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.38)" }}>{val as string}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.16)", paddingTop: "16px", textAlign: "center", fontSize: "0.62rem", color: "rgba(255,255,255,0.2)" }}>
            © 2025 Oase Green Forest Resort · Parongpong, Kab. Bandung Barat · Bagian dari BIG Group
          </div>
        </footer>
      </div>
    </div>
  );
}

// ─── OPTION 3: DARK BOTANICAL ────────────────────────────────────────────────
function BotanicalHome() {
  const [menu, setMenu] = useState(false);
  const heroRef = useParallax(0.28);
  const font = "'Montserrat', sans-serif";
  const serif = "'Playfair Display', serif";
  const D = "#0d1a0e", C = "#162419", G = "#c8a040", CR = "#e8d8b8", DIM = "rgba(232,216,184,0.46)";

  return (
    <div style={{ fontFamily: font, background: D, color: CR, minHeight: "100vh" }}>
      {/* Nav */}
      <nav style={{ background: "rgba(13,26,14,0.94)", borderBottom: `1px solid rgba(200,160,64,0.12)`, position: "sticky", top: "44px", zIndex: 40 }}
        className="px-5 md:px-10 py-3.5 flex items-center justify-between">
        <div style={{ flexShrink: 0 }}>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: "1.35rem", fontWeight: 700, color: CR, letterSpacing: "0.22em" }}>OASE</div>
          <div style={{ fontSize: "0.37rem", letterSpacing: "0.42em", fontWeight: 700, color: G, textTransform: "uppercase", marginTop: "-2px", opacity: 0.7 }}>Green Forest Resort</div>
        </div>
        <div className="hidden lg:flex items-center gap-5 xl:gap-7">
          {NAV.map(l => <a key={l} href="#" style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.08em", color: DIM, textDecoration: "none", textTransform: "uppercase" }} className="hover:text-[#c8a040] transition-colors">{l}</a>)}
          <a href="#" style={{ background: G, color: D, padding: "8px 18px", borderRadius: "3px", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.08em", textDecoration: "none", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "6px" }} className="hover:opacity-90 transition-opacity"><MessageCircle size={13} /> Booking</a>
        </div>
        <button className="lg:hidden p-1" onClick={() => setMenu(!menu)}>{menu ? <X size={22} color={CR} /> : <Menu size={22} color={CR} />}</button>
      </nav>
      {menu && (
        <div style={{ background: D, borderBottom: `1px solid rgba(200,160,64,0.15)`, position: "fixed", top: "108px", left: 0, right: 0, zIndex: 39 }}
          className="py-5 px-8 flex flex-col gap-4">
          {NAV.map(l => <a key={l} href="#" style={{ fontSize: "0.86rem", fontWeight: 600, color: CR, textTransform: "uppercase", textDecoration: "none" }}>{l}</a>)}
        </div>
      )}

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ height: "96vh", minHeight: "580px" }}>
        <img ref={heroRef} src={IMGS.heroDark} alt="Oase Green Forest Resort" className="absolute w-full object-cover" style={{ height: "130%", top: "-15%", left: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom,rgba(13,26,14,0.26) 0%,rgba(13,26,14,0.14) 35%,rgba(13,26,14,0.85) 78%,${D} 100%)` }} />
        <div className="absolute bottom-0 left-0 right-0 px-8 md:px-16 pb-12">
          <p style={{ fontSize: "0.6rem", letterSpacing: "0.55em", fontWeight: 700, color: G, textTransform: "uppercase", marginBottom: "13px", opacity: 0.8 }}>Parongpong · Cihideung · Bandung Barat</p>
          <h1 style={{ fontFamily: serif, fontSize: "clamp(2.2rem,7.5vw,5.8rem)", fontWeight: 700, fontStyle: "italic", color: CR, lineHeight: 1.02, marginBottom: "16px", maxWidth: "700px" }}>Alam yang Menyejukkan,<br />Kenangan yang Abadi</h1>
          <p style={{ fontSize: "clamp(0.83rem,1.5vw,0.98rem)", color: DIM, maxWidth: "400px", lineHeight: 1.88, marginBottom: "26px" }}>A tranquil nature-inspired retreat — comfort, relaxation, and natural beauty in the highlands of Bandung.</p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a href="#" style={{ background: G, color: D, padding: "13px 28px", borderRadius: "3px", fontSize: "0.74rem", fontWeight: 700, letterSpacing: "0.1em", textDecoration: "none", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "7px" }} className="hover:opacity-90 transition-opacity"><MessageCircle size={14} /> Booking via WhatsApp</a>
            <a href="#" style={{ border: `1px solid rgba(200,160,64,0.36)`, color: G, padding: "13px 28px", borderRadius: "3px", fontSize: "0.74rem", fontWeight: 600, letterSpacing: "0.1em", textDecoration: "none", textTransform: "uppercase" }} className="hover:bg-[#c8a040]/12 transition-all">Jelajahi Fasilitas</a>
          </div>
        </div>
        <div style={{ position: "absolute", right: "20px", top: "50%", transform: "translateY(-50%) rotate(90deg)", fontSize: "0.54rem", letterSpacing: "0.44em", color: "rgba(200,160,64,0.28)", textTransform: "uppercase", fontWeight: 600 }}>Bagian dari BIG Group · Est. 2024</div>
      </section>

      {/* Booking strip */}
      <div style={{ background: C, borderTop: `1px solid rgba(200,160,64,0.11)`, borderBottom: `1px solid rgba(200,160,64,0.11)` }} className="px-5 md:px-10 py-5">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-4 items-end">
          {[["Check In","14.00 WIB"],["Check Out","12.00 WIB"],["Jumlah Tamu","2 Tamu"],["Tipe Kamar","Semua Tipe"]].map(([l,v]) => (
            <div key={l} style={{ borderBottom: `1px solid rgba(200,160,64,0.24)`, paddingBottom: "7px" }}>
              <p style={{ fontSize: "0.54rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: G, marginBottom: "4px", opacity: 0.65 }}>{l}</p>
              <p style={{ fontSize: "0.84rem", fontWeight: 600, color: CR }}>{v}</p>
            </div>
          ))}
          <button style={{ background: G, color: D, padding: "11px 18px", borderRadius: "3px", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", border: "none", cursor: "pointer" }} className="hover:opacity-90 transition-opacity">Cek Ketersediaan</button>
        </div>
      </div>

      {/* Use Cases */}
      <section className="py-14 md:py-18 px-5 md:px-10 max-w-7xl mx-auto" style={{ paddingTop: "64px", paddingBottom: "48px" }}>
        <div className="text-center mb-10">
          <p style={{ fontSize: "0.6rem", letterSpacing: "0.45em", fontWeight: 700, color: G, textTransform: "uppercase", marginBottom: "7px", opacity: 0.74 }}>Pilih Kebutuhan Anda</p>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(1.3rem,3.5vw,2.2rem)", fontWeight: 700, fontStyle: "italic", color: CR }}>Kami Siap Melayani</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {USE_CASES.map(({ Icon, label, desc }) => (
            <div key={label} style={{ borderTop: `1px solid rgba(200,160,64,0.18)`, paddingTop: "16px", textAlign: "center" }}>
              <div style={{ width: "38px", height: "38px", background: "rgba(200,160,64,0.13)", border: `1px solid rgba(200,160,64,0.15)`, borderRadius: "5px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 9px" }}><Icon size={16} color={G} /></div>
              <p style={{ fontSize: "0.72rem", fontWeight: 800, color: CR, marginBottom: "3px", lineHeight: 1.3 }}>{label}</p>
              <p style={{ fontSize: "0.6rem", color: DIM, lineHeight: 1.45 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Rooms */}
      <section className="py-8 px-5 md:px-10 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-9">
          <div>
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.45em", fontWeight: 700, color: G, textTransform: "uppercase", marginBottom: "7px", opacity: 0.74 }}>Kamar & Akomodasi</p>
            <h2 style={{ fontFamily: serif, fontSize: "clamp(1.3rem,3.5vw,2.5rem)", fontWeight: 700, fontStyle: "italic", color: CR }}>Tipe Kamar Unggulan</h2>
          </div>
          <a href="#" style={{ fontSize: "0.68rem", fontWeight: 700, color: G, textDecoration: "none", display: "flex", alignItems: "center", gap: "4px", opacity: 0.72, textTransform: "uppercase" }}>Lihat Semua <ArrowRight size={12} /></a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ROOMS.map(room => (
            <div key={room.name} style={{ background: C, border: `1px solid rgba(200,160,64,0.13)`, borderRadius: "6px", overflow: "hidden" }} className="group hover:border-[#c8a040]/32 hover:-translate-y-0.5 transition-all duration-300">
              <div className="relative overflow-hidden" style={{ height: "185px", background: D }}>
                <img src={room.img} alt={room.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-85" />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(13,26,14,0.72) 0%,transparent 50%)" }} />
                <div style={{ position: "absolute", top: "10px", left: "10px", background: "rgba(200,160,64,0.18)", border: `1px solid rgba(200,160,64,0.3)`, borderRadius: "3px", padding: "3px 9px", fontSize: "0.58rem", fontWeight: 800, color: G }}>{room.tag}</div>
                <div style={{ position: "absolute", bottom: "11px", left: "13px", fontFamily: serif, fontSize: "1.02rem", fontStyle: "italic", fontWeight: 700, color: CR }}>{room.name}</div>
              </div>
              <div style={{ padding: "14px" }}>
                <p style={{ fontSize: "0.7rem", color: DIM, lineHeight: 1.58, marginBottom: "11px" }}>{room.desc}</p>
                <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
                  <span style={{ fontSize: "0.6rem", color: "rgba(200,160,64,0.6)", fontWeight: 600 }}>{room.cap}</span>
                  <span style={{ fontSize: "0.6rem", color: "rgba(200,160,64,0.6)", fontWeight: 600 }}>{room.sqm}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p style={{ fontSize: "0.54rem", color: "rgba(200,160,64,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1px" }}>Mulai dari</p>
                    <p style={{ fontSize: "0.94rem", fontWeight: 800, color: G }}>{room.price}<span style={{ fontSize: "0.56rem", color: "rgba(200,160,64,0.4)", fontWeight: 400 }}>/mlm</span></p>
                  </div>
                  <button style={{ padding: "8px 15px", border: `1px solid rgba(200,160,64,0.25)`, borderRadius: "3px", fontSize: "0.64rem", fontWeight: 700, color: G, cursor: "pointer", background: "transparent", letterSpacing: "0.07em", textTransform: "uppercase" }} className="hover:bg-[#c8a040] hover:text-[#0d1a0e] transition-all">Pesan</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Noah Ark */}
        <div style={{ background: C, border: `1px solid rgba(200,160,64,0.17)`, borderRadius: "6px", padding: "20px 22px", marginTop: "16px", display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ width: "46px", height: "46px", background: "rgba(200,160,64,0.13)", border: `1px solid rgba(200,160,64,0.18)`, borderRadius: "5px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Users size={20} color={G} /></div>
          <div style={{ flex: 1, minWidth: "200px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "9px", marginBottom: "4px" }}>
              <h3 style={{ fontFamily: serif, fontSize: "0.96rem", fontStyle: "italic", fontWeight: 700, color: CR }}>{NOAH_ARK.name}</h3>
              <span style={{ fontSize: "0.54rem", background: "rgba(200,160,64,0.14)", color: G, padding: "2px 8px", borderRadius: "3px", fontWeight: 700, border: `1px solid rgba(200,160,64,0.2)` }}>Eksklusif</span>
            </div>
            <p style={{ fontSize: "0.7rem", color: DIM, lineHeight: 1.65 }}>{NOAH_ARK.desc}</p>
            <p style={{ fontSize: "0.63rem", fontWeight: 700, color: G, marginTop: "5px", opacity: 0.78 }}>{NOAH_ARK.cap}</p>
          </div>
          <a href="#" style={{ background: G, color: D, padding: "11px 20px", borderRadius: "3px", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textDecoration: "none", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }} className="hover:opacity-90 transition-opacity"><MessageCircle size={13} /> Hubungi Kami</a>
        </div>
      </section>

      <GallerySection variant="botanical" font={font} serif={serif} />
      <VideoShowcase variant="botanical" font={font} serif={serif} />

      {/* Facilities */}
      <section className="px-5 md:px-10 max-w-7xl mx-auto" style={{ paddingTop: "56px", paddingBottom: "56px" }}>
        <div className="text-center mb-10">
          <p style={{ fontSize: "0.6rem", letterSpacing: "0.45em", fontWeight: 700, color: G, textTransform: "uppercase", marginBottom: "7px", opacity: 0.74 }}>Fasilitas Resort</p>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(1.3rem,3.5vw,2.2rem)", fontWeight: 700, fontStyle: "italic", color: CR }}>Fasilitas Unggulan</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {FACILITIES.map(({ Icon, name, desc }) => (
            <div key={name} style={{ borderTop: `1px solid rgba(200,160,64,0.17)`, paddingTop: "15px", textAlign: "center" }}>
              <div style={{ width: "38px", height: "38px", background: "rgba(200,160,64,0.13)", border: `1px solid rgba(200,160,64,0.14)`, borderRadius: "5px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 9px" }}><Icon size={16} color={G} /></div>
              <p style={{ fontSize: "0.73rem", fontWeight: 700, color: CR, marginBottom: "3px" }}>{name}</p>
              <p style={{ fontSize: "0.6rem", color: DIM, lineHeight: 1.45 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-22 px-5 md:px-10 overflow-hidden my-8" style={{ paddingTop: "88px", paddingBottom: "88px" }}>
        <img src={IMGS.pool} alt="kolam renang oase" className="absolute inset-0 w-full h-full object-cover brightness-45" />
        <div style={{ position: "absolute", inset: 0, background: "rgba(13,26,14,0.66)" }} />
        <div className="relative max-w-2xl mx-auto text-center">
          <p style={{ fontSize: "0.58rem", letterSpacing: "0.55em", color: G, textTransform: "uppercase", marginBottom: "12px", opacity: 0.78 }}>Booking Langsung Lebih Mudah</p>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(1.7rem,5vw,3.4rem)", fontWeight: 700, fontStyle: "italic", color: CR, marginBottom: "14px", lineHeight: 1.12 }}>Harga Terbaik Dijamin</h2>
          <p style={{ fontSize: "0.85rem", color: DIM, marginBottom: "26px", lineHeight: 1.88, maxWidth: "420px", margin: "0 auto 26px" }}>Booking langsung via WhatsApp untuk harga spesial, sarapan gratis, dan keuntungan eksklusif tamu Oase Green Forest.</p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#" style={{ background: G, color: D, padding: "13px 28px", borderRadius: "3px", fontSize: "0.74rem", fontWeight: 700, letterSpacing: "0.1em", textDecoration: "none", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "7px" }} className="hover:opacity-90 transition-opacity"><MessageCircle size={14} /> Booking via WhatsApp</a>
            <a href="#" style={{ border: `1px solid rgba(200,160,64,0.34)`, color: G, padding: "13px 28px", borderRadius: "3px", fontSize: "0.74rem", fontWeight: 600, letterSpacing: "0.1em", textDecoration: "none", textTransform: "uppercase" }} className="hover:bg-[#c8a040]/13 transition-all">Lihat Paket</a>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-14 px-5 md:px-10 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p style={{ fontSize: "0.6rem", letterSpacing: "0.45em", fontWeight: 700, color: G, textTransform: "uppercase", marginBottom: "7px", opacity: 0.74 }}>Ulasan Tamu</p>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(1.3rem,3.5vw,2.2rem)", fontWeight: 700, fontStyle: "italic", color: CR }}>Apa Kata Tamu Kami?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {REVIEWS.map(r => (
            <div key={r.name} style={{ background: C, border: `1px solid rgba(200,160,64,0.1)`, borderRadius: "6px", padding: "20px" }}>
              <div style={{ fontSize: "0.54rem", background: "rgba(200,160,64,0.15)", color: G, padding: "3px 9px", borderRadius: "3px", display: "inline-block", marginBottom: "9px", fontWeight: 700, border: `1px solid rgba(200,160,64,0.16)` }}>{r.type}</div>
              <StarRow count={r.stars} color={G} />
              <p style={{ fontFamily: serif, fontSize: "0.86rem", lineHeight: 1.82, color: DIM, marginBottom: "16px", fontStyle: "italic" }}>"{r.text}"</p>
              <div style={{ borderTop: `1px solid rgba(200,160,64,0.1)`, paddingTop: "12px" }}>
                <p style={{ fontSize: "0.8rem", fontWeight: 800, color: CR }}>{r.name}</p>
                <p style={{ fontSize: "0.64rem", color: G, opacity: 0.65 }}>{r.loc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#0a1409", borderTop: `1px solid rgba(200,160,64,0.14)`, marginTop: "16px" }} className="py-12 px-5 md:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-9">
          <div className="sm:col-span-2">
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: "1.75rem", fontWeight: 700, color: CR, letterSpacing: "0.22em", marginBottom: "3px" }}>OASE</div>
            <p style={{ fontSize: "0.5rem", letterSpacing: "0.32em", color: G, textTransform: "uppercase", marginBottom: "14px", opacity: 0.5 }}>Green Forest Resort · Parongpong, Bandung Barat</p>
            <p style={{ fontSize: "0.76rem", lineHeight: 1.85, color: "rgba(232,216,184,0.34)", maxWidth: "280px" }}>A tranquil nature-inspired retreat in the highlands of Bandung. Bagian dari BIG Group.</p>
            <div style={{ marginTop: "14px", display: "flex", gap: "6px" }}>
              {[["Check In", CONTACT.checkin], ["Check Out", CONTACT.checkout]].map(([l, v]) => (
                <div key={l} style={{ background: "rgba(200,160,64,0.12)", border: `1px solid rgba(200,160,64,0.12)`, borderRadius: "3px", padding: "7px 10px" }}>
                  <p style={{ fontSize: "0.5rem", letterSpacing: "0.12em", color: "rgba(200,160,64,0.44)", textTransform: "uppercase", marginBottom: "2px" }}>{l}</p>
                  <p style={{ fontSize: "0.74rem", fontWeight: 700, color: CR }}>{v}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontSize: "0.58rem", letterSpacing: "0.24em", fontWeight: 700, color: G, textTransform: "uppercase", marginBottom: "13px", opacity: 0.58 }}>Navigasi</p>
            {["Tipe Kamar","Fasilitas","Galeri","Gathering & Event","Lokasi","Temu Kami"].map(l => <a key={l} href="#" style={{ display: "block", fontSize: "0.74rem", color: "rgba(232,216,184,0.34)", textDecoration: "none", marginBottom: "8px" }} className="hover:text-[#c8a040] transition-colors">{l}</a>)}
          </div>
          <div>
            <p style={{ fontSize: "0.58rem", letterSpacing: "0.24em", fontWeight: 700, color: G, textTransform: "uppercase", marginBottom: "13px", opacity: 0.58 }}>Kontak</p>
            {[[MessageCircle,CONTACT.wa],[Mail,CONTACT.email],[Instagram,CONTACT.ig],[Music2,CONTACT.tiktok]].map(([Icon,val],i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "9px" }}>
                <Icon size={12} color="rgba(200,160,64,0.4)" /><span style={{ fontSize: "0.7rem", color: "rgba(232,216,184,0.33)" }}>{val as string}</span>
              </div>
            ))}
            <div style={{ display: "flex", gap: "8px", marginTop: "14px" }}>
              {[Instagram, Youtube, Music2].map((Icon, i) => (
                <a key={i} href="#" style={{ width: "32px", height: "32px", border: `1px solid rgba(200,160,64,0.15)`, borderRadius: "3px", display: "flex", alignItems: "center", justifyContent: "center" }} className="hover:border-[#c8a040]/38 hover:bg-[#c8a040]/09 transition-all"><Icon size={12} color="rgba(200,160,64,0.45)" /></a>
              ))}
            </div>
          </div>
        </div>
        <div style={{ borderTop: `1px solid rgba(200,160,64,0.13)`, paddingTop: "16px", textAlign: "center", fontSize: "0.62rem", color: "rgba(232,216,184,0.16)", letterSpacing: "0.04em" }}>
          © 2025 Oase Green Forest Resort · Parongpong, Kab. Bandung Barat · Bagian dari BIG Group
        </div>
      </footer>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState<StyleOption>("glassy");
  const opts: { id: StyleOption; label: string }[] = [
    { id: "glassy",       label: "① Glassy"        },
    { id: "glassmorphic", label: "② Glassmorphic"  },
    { id: "botanical",    label: "③ Dark Botanical" },
  ];
  // Switcher is portalled directly into <body> — completely outside the page
  // DOM tree so it won't be included when selecting/copying the page to Figma.
  const switcher = createPortal(
    <div
      id="style-switcher"
      style={{ position: "fixed", top: "10px", left: "50%", transform: "translateX(-50%)", zIndex: 100, display: "flex", gap: "3px", background: "rgba(0,0,0,0.42)", borderRadius: "100px", padding: "5px", border: "1px solid rgba(255,255,255,0.13)", boxShadow: "0 4px 28px rgba(0,0,0,0.35)", whiteSpace: "nowrap" }}
    >
      {opts.map(({ id, label }) => (
        <button key={id} onClick={() => setActive(id)}
          style={{ padding: "6px 15px", borderRadius: "100px", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.04em", border: "none", cursor: "pointer", fontFamily: "'Montserrat', sans-serif", transition: "all 0.22s ease", background: active === id ? "white" : "transparent", color: active === id ? "#1a2e1a" : "rgba(255,255,255,0.65)", boxShadow: active === id ? "0 2px 10px rgba(0,0,0,0.2)" : "none" }}>
          {label}
        </button>
      ))}
    </div>,
    document.body
  );

  return (
    <>
      {switcher}
      {/* id="oase-page" is the clean selectable root for Figma copy-paste */}
      <div id="oase-page">
        {active === "glassy"       && <GlassyHome />}
        {active === "glassmorphic" && <GlassmorphicHome />}
        {active === "botanical"    && <BotanicalHome />}
      </div>
    </>
  );
}
