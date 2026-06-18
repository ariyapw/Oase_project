import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  Star, ArrowRight, Menu, X, Leaf, Waves, Utensils,
  Wifi, Car, Users, MapPin, Mail,
  Instagram, Youtube, Music2, Heart, Building2, Tent,
  MessageCircle, Play, ChevronLeft, ChevronRight,
} from "lucide-react";

type StyleOption = "glassy" | "glassmorphic" | "botanical" | "organic";

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

// ─── useIsMobile ─────────────────────────────────────────────────────────────
function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return mobile;
}

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

// ─── Mouse parallax hook ─────────────────────────────────────────────────────
function useMouseParallax() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fn = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      el.querySelectorAll<HTMLElement>("[data-depth]").forEach(child => {
        const d = parseFloat(child.dataset.depth || "20");
        child.style.transform = `translate(${x * d}px, ${y * d * 0.65}px)`;
      });
    };
    window.addEventListener("mousemove", fn, { passive: true });
    return () => window.removeEventListener("mousemove", fn);
  }, []);
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

// ─── OPTION 1: GLASSY — ANGULAR CRYSTAL ────────────────────────────────────
function GlassyHome() {
  const [menu, setMenu] = useState(false);
  const heroParallax = useMouseParallax();
  const isMobile = useIsMobile();
  const font = "'Montserrat', sans-serif";
  const serif = "'Playfair Display', serif";
  const BG = "linear-gradient(150deg,#ecf6ec 0%,#e0f0e0 40%,#e8f2e8 100%)";
  const FOREST = "#1c3320", GREEN = "#3a6634", GOLD = "#8B6914", SAGE = "#5a7060";
  const gc: React.CSSProperties = { background:"rgba(255,255,255,0.78)", border:"1.5px solid rgba(255,255,255,0.95)" };
  const PARA_R = "polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)";
  const PARA_L = "polygon(0% 0%, 92% 0%, 100% 100%, 8% 100%)";
  const CHEVRON = "polygon(0% 0%, 88% 0%, 100% 50%, 88% 100%, 0% 100%)";

  return (
    <div style={{ fontFamily:font, background:BG, color:FOREST, minHeight:"100vh", overflowX:"hidden" }}>
      <style>{`@keyframes shimmerLine{0%,100%{opacity:0.25}50%{opacity:0.8}}
        @keyframes badgeSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        .shl{animation:shimmerLine 4s ease-in-out infinite}.bsp{animation:badgeSpin 25s linear infinite}`}</style>

      <nav style={{ position:"sticky",top:"44px",zIndex:40,background:"rgba(255,255,255,0.9)",borderBottom:"1px solid rgba(255,255,255,0.96)",padding:isMobile?"14px 20px":"16px 60px",display:"flex",alignItems:"center",justifyContent:"space-between",boxShadow:"0 2px 20px rgba(28,51,32,0.05)" }}>
        <div><div style={{ fontFamily:"'Cinzel',serif",fontSize:"1.35rem",fontWeight:700,color:FOREST,letterSpacing:"0.22em" }}>OASE</div><div style={{ fontSize:"0.37rem",letterSpacing:"0.42em",fontWeight:700,color:GOLD,textTransform:"uppercase",marginTop:"-2px" }}>Green Forest Resort</div></div>
        <div className="hidden lg:flex items-center gap-6">
          {NAV.slice(0,5).map(l=><a key={l} href="#" style={{ fontSize:"0.68rem",fontWeight:600,letterSpacing:"0.07em",color:SAGE,textDecoration:"none",textTransform:"uppercase" }} className="hover:text-[#1c3320] transition-colors">{l}</a>)}
          <a href="#" style={{ background:GOLD,color:"white",padding:"10px 22px",borderRadius:"2px",fontSize:"0.7rem",fontWeight:700,textDecoration:"none",display:"flex",alignItems:"center",gap:"6px" }} className="hover:opacity-90 transition-opacity"><MessageCircle size={13}/> Booking</a>
        </div>
        <button className="lg:hidden" onClick={()=>setMenu(!menu)}>{menu?<X size={22} color={FOREST}/>:<Menu size={22} color={FOREST}/>}</button>
      </nav>
      {menu&&<div style={{ background:"rgba(255,255,255,0.97)",borderBottom:"1px solid rgba(255,255,255,0.96)",position:"fixed",top:"108px",left:0,right:0,zIndex:39,padding:"20px 24px",display:"flex",flexDirection:"column",gap:"16px" }}>{NAV.map(l=><a key={l} href="#" style={{ fontSize:"0.88rem",fontWeight:600,color:FOREST,textDecoration:"none",textTransform:"uppercase" }}>{l}</a>)}</div>}

      {/* Hero — Angular split */}
      <section ref={heroParallax} style={{ minHeight:"94vh",display:"grid",gridTemplateColumns:isMobile?"1fr":"45fr 55fr",position:"relative",overflow:"hidden" }}>
        {!isMobile&&<>
          <div data-depth="18" className="shl" style={{ position:"absolute",width:"2px",height:"140%",background:`linear-gradient(to bottom,transparent,${GOLD},transparent)`,top:"-20%",left:"46.5%",transform:"rotate(-1.5deg)",pointerEvents:"none",zIndex:2 }}/>
          <div data-depth="12" className="shl" style={{ position:"absolute",width:"1px",height:"120%",background:`linear-gradient(to bottom,transparent,rgba(139,105,20,0.28),transparent)`,top:"-10%",left:"48%",transform:"rotate(-1.5deg)",pointerEvents:"none",zIndex:2,animationDelay:"2s" }}/>
        </>}
        <div style={{ padding:isMobile?"80px 24px 40px":"80px 40px 80px 60px",position:"relative",zIndex:1,display:"flex",flexDirection:"column",justifyContent:"center",order:isMobile?2:1 }}>
          <div data-depth="8" style={{ display:"inline-flex",alignItems:"center",gap:"10px",marginBottom:"28px",width:"fit-content" }}>
            <div style={{ width:"28px",height:"2px",background:GOLD }}/>
            <span style={{ fontSize:"0.62rem",fontWeight:700,color:GOLD,letterSpacing:"0.18em",textTransform:"uppercase" }}>Parongpong · Bandung Barat</span>
            <div style={{ width:"28px",height:"2px",background:GOLD }}/>
          </div>
          <div data-depth="6" style={{ marginBottom:"24px" }}>
            <div style={{ fontFamily:"'Cinzel',serif",fontSize:"clamp(3.5rem,9vw,8rem)",fontWeight:700,color:FOREST,letterSpacing:"0.04em",lineHeight:0.88 }}>OASE</div>
            <div style={{ fontFamily:serif,fontSize:"clamp(1.3rem,3vw,2.6rem)",fontWeight:400,fontStyle:"italic",color:GOLD,lineHeight:1.25,marginTop:"10px" }}>Green Forest Resort</div>
          </div>
          <p data-depth="4" style={{ fontSize:"clamp(0.82rem,1.3vw,0.96rem)",color:SAGE,lineHeight:1.9,maxWidth:"360px",marginBottom:"40px" }}>A tranquil nature-inspired retreat — a perfect blend of comfort, relaxation, and natural beauty in the highlands of Bandung.</p>
          <div data-depth="12" style={{ display:"flex",gap:"12px",flexWrap:"wrap",marginBottom:"40px" }}>
            <a href="#" style={{ background:GOLD,color:"white",padding:"14px 32px",borderRadius:"2px",fontSize:"0.78rem",fontWeight:700,textDecoration:"none",display:"flex",alignItems:"center",gap:"7px" }} className="hover:opacity-90 transition-opacity"><MessageCircle size={14}/> Reserve a Stay</a>
            <a href="#" style={{ border:`1.5px solid ${GOLD}`,color:GOLD,padding:"14px 28px",borderRadius:"2px",fontSize:"0.78rem",fontWeight:600,textDecoration:"none" }} className="hover:bg-[#8B6914]/10 transition-all">Explore Resort</a>
          </div>
          <div data-depth="16" style={{ display:"inline-flex",gap:"24px",...gc,borderRadius:"2px",padding:"16px 24px",width:"fit-content",borderLeft:`3px solid ${GOLD}` }}>
            {[["Check In","14.00"],["Check Out","12.00"]].map(([l,v])=>(
              <div key={l}><p style={{ fontSize:"0.52rem",color:SAGE,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:"3px" }}>{l}</p><p style={{ fontSize:"1.2rem",fontWeight:900,color:FOREST,lineHeight:1 }}>{v}<span style={{ fontSize:"0.6rem",color:SAGE,fontWeight:400 }}> WIB</span></p></div>
            ))}
          </div>
          {!isMobile&&<div data-depth="22" className="bsp" style={{ width:"80px",height:"80px",position:"relative",marginTop:"32px" }}>
            <svg viewBox="0 0 80 80" style={{ width:"100%",height:"100%" }}><path id="gc2" d="M40,40 m-30,0 a30,30 0 1,1 60,0 a30,30 0 1,1 -60,0" fill="none"/><text fontSize="7.5" fontFamily="Montserrat,sans-serif" fontWeight="700" fill={GOLD} letterSpacing="2.4"><textPath href="#gc2">BIG GROUP · SINCE 2024 · PARONGPONG ·</textPath></text></svg>
            <div style={{ position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center" }}><Leaf size={18} color={GOLD}/></div>
          </div>}
        </div>
        <div style={{ position:"relative",overflow:"hidden",order:isMobile?1:2,minHeight:isMobile?"55vw":"auto" }}>
          <div data-depth="-10" style={{ width:isMobile?"100%":"108%",height:"100%",clipPath:isMobile?"none":PARA_R,overflow:"hidden" }}>
            <img src={IMGS.hero} alt="Oase" style={{ width:"100%",height:"100%",objectFit:"cover" }}/>
            <div style={{ position:"absolute",inset:0,background:"linear-gradient(to right,rgba(236,246,236,0.22) 0%,transparent 30%)" }}/>
          </div>
          {!isMobile&&<div data-depth="-5" style={{ position:"absolute",bottom:"60px",left:"64px",...gc,borderRadius:"2px",padding:"14px 20px",boxShadow:"8px 8px 28px rgba(28,51,32,0.1)",borderLeft:`3px solid ${GOLD}` }}>
            <p style={{ fontSize:"0.52rem",color:SAGE,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:"3px" }}>Resort Rating</p>
            <p style={{ fontSize:"1.3rem",fontWeight:900,color:FOREST,lineHeight:1 }}>4.9<span style={{ fontSize:"0.7rem",color:GOLD,fontWeight:700 }}>/5.0</span></p>
            <p style={{ fontSize:"0.52rem",color:SAGE,marginTop:"2px" }}>400+ reviews</p>
          </div>}
        </div>
      </section>

      {/* Use Cases — angular vertical list on dark band */}
      <section style={{ background:FOREST,padding:isMobile?"80px 24px":"80px 60px",clipPath:"polygon(0 6%,100% 0,100% 94%,0 100%)" }}>
        <div style={{ display:"flex",flexDirection:isMobile?"column":"row",gap:isMobile?"32px":"0",alignItems:isMobile?"flex-start":"center",justifyContent:"space-between",maxWidth:"1100px",margin:"0 auto" }}>
          <div style={{ flexShrink:0 }}>
            <p style={{ fontSize:"0.62rem",letterSpacing:"0.45em",color:"rgba(255,220,130,0.7)",textTransform:"uppercase",fontWeight:700,marginBottom:"9px" }}>Pilih Kebutuhan Anda</p>
            <h2 style={{ fontFamily:serif,fontSize:"clamp(1.5rem,3.5vw,2.6rem)",fontWeight:700,fontStyle:"italic",color:"white",maxWidth:"240px" }}>Kami Siap Melayani</h2>
          </div>
          <div style={{ display:"flex",flexDirection:"column",gap:"8px",flex:1,paddingLeft:isMobile?"0":"60px" }}>
            {USE_CASES.map(({Icon,label,desc},i)=>(
              <div key={label} style={{ display:"flex",alignItems:"center",gap:"16px",padding:"14px 20px",background:"rgba(255,255,255,0.06)",borderRadius:"2px",borderLeft:`3px solid ${i===0?GOLD:"rgba(255,255,255,0.15)"}`,cursor:"pointer" }} className="hover:bg-white/10 transition-all">
                <Icon size={16} color={i===0?"rgba(255,220,130,0.88)":"rgba(255,255,255,0.6)"}/>
                <div style={{ flex:1 }}><p style={{ fontSize:"0.78rem",fontWeight:800,color:"white",lineHeight:1.2 }}>{label}</p><p style={{ fontSize:"0.62rem",color:"rgba(255,255,255,0.45)",marginTop:"1px" }}>{desc}</p></div>
                <div style={{ width:"20px",height:"1px",background:i===0?GOLD:"rgba(255,255,255,0.2)" }}/>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rooms — full-width parallelogram bands */}
      <section style={{ marginTop:"-40px" }}>
        <div style={{ padding:isMobile?"60px 24px 24px":"80px 60px 24px" }}>
          <p style={{ fontSize:"0.62rem",letterSpacing:"0.45em",color:GOLD,textTransform:"uppercase",fontWeight:700,marginBottom:"9px" }}>Kamar & Akomodasi</p>
          <h2 style={{ fontFamily:serif,fontSize:"clamp(2rem,5vw,4.2rem)",fontWeight:700,fontStyle:"italic",color:FOREST,lineHeight:1.05 }}>Tipe Kamar Unggulan</h2>
        </div>
        <div>
          {ROOMS.map((room,i)=>(
            <div key={room.name} style={{ display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",minHeight:isMobile?"auto":"320px" }}>
              <div style={{ overflow:"hidden",position:"relative",order:isMobile?1:(i%2===0?1:2),minHeight:isMobile?"220px":"auto" }} className="group">
                <div style={{ width:"100%",height:"100%",clipPath:isMobile?"none":(i%2===0?PARA_R:PARA_L),overflow:"hidden",minHeight:"inherit" }}>
                  <img src={room.img} alt={room.name} style={{ width:"100%",height:"100%",objectFit:"cover",minHeight:"220px" }} className="group-hover:scale-105 transition-transform duration-700"/>
                </div>
                <div style={{ position:"absolute",top:"16px",left:"16px",background:GOLD,color:"white",borderRadius:"1px",padding:"4px 12px",fontSize:"0.58rem",fontWeight:800 }}>{room.tag}</div>
              </div>
              <div style={{ padding:isMobile?"28px 24px":(i%2===0?"40px 60px 40px 28px":"40px 32px 40px 60px"),...gc,background:"rgba(255,255,255,0.72)",display:"flex",flexDirection:"column",justifyContent:"center",order:isMobile?2:(i%2===0?2:1) }}>
                <div style={{ width:"40px",height:"2px",background:GOLD,marginBottom:"18px" }}/>
                <h3 style={{ fontFamily:serif,fontSize:"clamp(1.3rem,2.5vw,2rem)",fontWeight:700,fontStyle:"italic",color:FOREST,marginBottom:"12px" }}>{room.name}</h3>
                <p style={{ fontSize:"0.82rem",color:SAGE,lineHeight:1.82,marginBottom:"18px" }}>{room.desc}</p>
                <div style={{ display:"flex",gap:"8px",marginBottom:"22px" }}>
                  {[room.cap,room.sqm].map(t=><span key={t} style={{ fontSize:"0.63rem",background:"rgba(139,105,20,0.1)",color:GOLD,padding:"4px 12px",fontWeight:700,border:"1px solid rgba(139,105,20,0.2)",borderRadius:"1px" }}>{t}</span>)}
                </div>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                  <div><p style={{ fontSize:"0.52rem",color:SAGE,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"2px" }}>Mulai dari</p><p style={{ fontSize:"1.5rem",fontWeight:900,color:FOREST,lineHeight:1 }}>{room.price}<span style={{ fontSize:"0.6rem",fontWeight:400,color:SAGE }}>/malam</span></p></div>
                  <a href="#" style={{ background:FOREST,color:"white",padding:"12px 26px",borderRadius:"2px",fontSize:"0.72rem",fontWeight:700,textDecoration:"none",display:"flex",alignItems:"center",gap:"6px" }} className="hover:opacity-80 transition-opacity">Pesan <ArrowRight size={13}/></a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ ...gc,background:"rgba(255,255,255,0.72)",borderLeft:`4px solid ${GOLD}`,padding:isMobile?"24px":"32px 60px",display:"flex",gap:"20px",alignItems:"center",flexWrap:"wrap" }}>
          <div style={{ width:"50px",height:"50px",background:"rgba(139,105,20,0.12)",border:`2px solid ${GOLD}`,borderRadius:"2px",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}><Users size={22} color={GOLD}/></div>
          <div style={{ flex:1,minWidth:"200px" }}>
            <div style={{ display:"flex",alignItems:"center",gap:"10px",marginBottom:"4px" }}>
              <h3 style={{ fontFamily:serif,fontSize:"1.1rem",fontStyle:"italic",fontWeight:700,color:FOREST }}>{NOAH_ARK.name}</h3>
              <span style={{ fontSize:"0.55rem",background:GOLD,color:"white",padding:"3px 10px",fontWeight:700,borderRadius:"1px" }}>Eksklusif</span>
            </div>
            <p style={{ fontSize:"0.76rem",color:SAGE,lineHeight:1.7 }}>{NOAH_ARK.desc}</p>
            <p style={{ fontSize:"0.65rem",fontWeight:700,color:GOLD,marginTop:"6px" }}>{NOAH_ARK.cap}</p>
          </div>
          <a href="#" style={{ background:GOLD,color:"white",padding:"13px 26px",borderRadius:"2px",fontSize:"0.74rem",fontWeight:700,textDecoration:"none",display:"flex",alignItems:"center",gap:"7px",flexShrink:0 }} className="hover:opacity-90 transition-opacity"><MessageCircle size={14}/> Tanya via WA</a>
        </div>
      </section>

      {/* Gallery — stacked diagonal strips + parallelogram grid */}
      <section style={{ padding:isMobile?"60px 24px":"80px 60px",background:"rgba(255,255,255,0.3)",clipPath:"polygon(0 3%,100% 0,100% 97%,0 100%)" }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:"40px" }}>
          <div><p style={{ fontSize:"0.62rem",letterSpacing:"0.45em",color:GOLD,textTransform:"uppercase",fontWeight:700,marginBottom:"8px" }}>Galeri Foto</p><h2 style={{ fontFamily:serif,fontSize:"clamp(1.7rem,4vw,3rem)",fontWeight:700,fontStyle:"italic",color:FOREST }}>Suasana &amp; Fasilitas</h2></div>
          <button style={{ color:GOLD,background:"none",border:"none",cursor:"pointer",fontSize:"0.72rem",fontWeight:700,display:"flex",alignItems:"center",gap:"4px" }}>Lihat Semua <ArrowRight size={13}/></button>
        </div>
        <div style={{ display:"flex",flexDirection:"column",gap:isMobile?"8px":"0" }}>
          {GALLERY.slice(0,3).map((img,i)=>(
            <div key={i} style={{ height:isMobile?"160px":"230px",position:"relative",overflow:"hidden",marginTop:(!isMobile&&i>0)?"-20px":0,clipPath:isMobile?"none":(i===0?"polygon(0 0,100% 0,100% 88%,0 100%)":i===1?"polygon(0 10%,100% 0,100% 90%,0 100%)":"polygon(0 10%,100% 0,100% 100%,0 100%)") }} className="group cursor-pointer">
              <img src={img.src} alt={img.label} style={{ width:"100%",height:"100%",objectFit:"cover" }} className="group-hover:scale-105 transition-transform duration-700"/>
              <div style={{ position:"absolute",inset:0,background:"rgba(28,51,32,0.28)",transition:"background 0.3s ease" }} className="group-hover:!bg-[#1c3320]/10"/>
              <div style={{ position:"absolute",bottom:"26px",left:"40px",color:"white" }}>
                <span style={{ fontSize:"0.58rem",background:GOLD,padding:"3px 10px",borderRadius:"1px",fontWeight:700,marginBottom:"6px",display:"inline-block" }}>{img.cat}</span>
                <p style={{ fontSize:"1.1rem",fontWeight:800,marginTop:"6px",textShadow:"0 2px 8px rgba(0,0,0,0.35)" }}>{img.label}</p>
              </div>
            </div>
          ))}
          {!isMobile&&<div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"3px",marginTop:"3px" }}>
            {GALLERY.slice(3).map((img,i)=>(
              <div key={i} style={{ height:"196px",overflow:"hidden",clipPath:PARA_R,position:"relative" }} className="group cursor-pointer">
                <img src={img.src} alt={img.label} style={{ width:"110%",height:"100%",objectFit:"cover",marginLeft:"-5%" }} className="group-hover:scale-105 transition-transform duration-700"/>
                <div style={{ position:"absolute",inset:0,background:"rgba(28,51,32,0.22)" }}/>
                <p style={{ position:"absolute",bottom:"14px",left:"22px",color:"white",fontSize:"0.72rem",fontWeight:700,textShadow:"0 1px 4px rgba(0,0,0,0.45)" }}>{img.label}</p>
              </div>
            ))}
          </div>}
        </div>
      </section>

      {/* Facilities — angular bordered cards */}
      <section style={{ padding:isMobile?"80px 24px":"100px 60px",marginTop:"-30px" }}>
        <div style={{ textAlign:"center",marginBottom:"56px" }}>
          <p style={{ fontSize:"0.62rem",letterSpacing:"0.45em",color:GOLD,textTransform:"uppercase",fontWeight:700,marginBottom:"8px" }}>Fasilitas Resort</p>
          <h2 style={{ fontFamily:serif,fontSize:"clamp(1.7rem,4vw,3rem)",fontWeight:700,fontStyle:"italic",color:FOREST }}>Fasilitas Unggulan</h2>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:isMobile?"repeat(2,1fr)":"repeat(3,1fr)",gap:"14px",maxWidth:"900px",margin:"0 auto" }}>
          {FACILITIES.map(({Icon,name,desc},i)=>(
            <div key={name} style={{ ...gc,borderRadius:"2px",borderLeft:`3px solid ${i%2===0?GOLD:GREEN}`,padding:"20px 22px",display:"flex",gap:"14px",alignItems:"flex-start" }} className="group hover:shadow-md transition-shadow">
              <div style={{ width:"42px",height:"42px",background:`rgba(${i%2===0?"139,105,20":"58,102,52"},0.1)`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,borderRadius:"2px" }}><Icon size={20} color={i%2===0?GOLD:GREEN}/></div>
              <div><p style={{ fontSize:"0.84rem",fontWeight:800,color:FOREST,marginBottom:"4px" }}>{name}</p><p style={{ fontSize:"0.68rem",color:SAGE,lineHeight:1.55 }}>{desc}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* Video — chevron + parallelogram panels */}
      <section style={{ padding:isMobile?"60px 24px":"80px 60px",background:FOREST,clipPath:"polygon(0 5%,100% 0,100% 95%,0 100%)" }}>
        <div style={{ marginBottom:"44px" }}>
          <p style={{ fontSize:"0.62rem",letterSpacing:"0.45em",color:"rgba(255,220,130,0.72)",textTransform:"uppercase",fontWeight:700,marginBottom:"9px" }}>Video Showcase</p>
          <h2 style={{ fontFamily:serif,fontSize:"clamp(1.7rem,4vw,3rem)",fontWeight:700,fontStyle:"italic",color:"white" }}>Rasakan Suasana Oase</h2>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:isMobile?"1fr":"2fr 1fr",gap:"4px",maxWidth:"1100px" }}>
          <div style={{ clipPath:isMobile?"none":CHEVRON,overflow:"hidden",position:"relative",aspectRatio:isMobile?"16/9":"4/3",cursor:"pointer" }} className="group">
            <img src={VIDEOS[0].thumb} alt={VIDEOS[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
            <div style={{ position:"absolute",inset:0,background:"linear-gradient(to top,rgba(15,30,15,0.75) 0%,rgba(0,0,0,0.08) 60%)" }}/>
            <div style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)" }}>
              <div style={{ width:"72px",height:"72px",background:"rgba(255,255,255,0.82)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 0 16px rgba(255,255,255,0.14)",transition:"transform 0.3s ease" }} className="group-hover:scale-110"><Play size={24} color={FOREST} fill={FOREST} style={{ marginLeft:"3px" }}/></div>
            </div>
            <div style={{ position:"absolute",bottom:"20px",left:"24px" }}>
              <p style={{ fontSize:"1rem",fontWeight:800,color:"white",marginBottom:"2px" }}>{VIDEOS[0].title}</p>
              <p style={{ fontSize:"0.7rem",color:"rgba(255,255,255,0.62)" }}>{VIDEOS[0].sub} · {VIDEOS[0].dur}</p>
            </div>
          </div>
          <div style={{ display:"flex",flexDirection:"column",gap:"4px" }}>
            {VIDEOS.slice(1).map((v,i)=>(
              <div key={i} style={{ flex:1,overflow:"hidden",position:"relative",cursor:"pointer",minHeight:"80px",clipPath:isMobile?"none":"polygon(10% 0,100% 0,100% 100%,0 100%)" }} className="group">
                <img src={v.thumb} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" style={{ minHeight:"80px" }}/>
                <div style={{ position:"absolute",inset:0,background:"rgba(15,30,15,0.55)",display:"flex",alignItems:"center",gap:"12px",padding:"12px 22px" }}>
                  <div style={{ width:"30px",height:"30px",background:"rgba(255,255,255,0.82)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,borderRadius:"1px" }}><Play size={11} color={FOREST} fill={FOREST} style={{ marginLeft:"2px" }}/></div>
                  <div><p style={{ fontSize:"0.76rem",fontWeight:700,color:"white" }}>{v.title}</p><p style={{ fontSize:"0.6rem",color:"rgba(255,255,255,0.52)" }}>{v.dur}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ position:"relative",padding:isMobile?"100px 24px":"130px 60px",overflow:"hidden",clipPath:"polygon(0 0,100% 5%,100% 100%,0 95%)",marginTop:"-40px" }}>
        <img src={IMGS.heroDark} alt="" style={{ position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover" }}/>
        <div style={{ position:"absolute",inset:0,background:"rgba(20,44,23,0.8)" }}/>
        <div style={{ position:"absolute",width:"280px",height:"2px",background:"rgba(139,105,20,0.35)",top:"28%",left:"-50px",transform:"rotate(-18deg)",pointerEvents:"none" }}/>
        <div style={{ position:"absolute",width:"200px",height:"1px",background:"rgba(139,105,20,0.22)",bottom:"28%",right:"-20px",transform:"rotate(-18deg)",pointerEvents:"none" }}/>
        <div style={{ position:"relative",textAlign:"center",color:"white" }}>
          <p style={{ fontSize:"0.62rem",letterSpacing:"0.55em",color:"rgba(255,220,130,0.88)",textTransform:"uppercase",fontWeight:700,marginBottom:"14px" }}>Booking Langsung Lebih Mudah</p>
          <h2 style={{ fontFamily:serif,fontSize:"clamp(2rem,5.5vw,4.5rem)",fontWeight:700,fontStyle:"italic",lineHeight:1.08,marginBottom:"18px" }}>Harga Terbaik Dijamin</h2>
          <p style={{ fontSize:"0.9rem",color:"rgba(255,255,255,0.68)",maxWidth:"420px",margin:"0 auto 32px",lineHeight:1.9 }}>Booking langsung via WhatsApp untuk harga spesial, sarapan gratis, dan keuntungan eksklusif tamu Oase Green Forest.</p>
          <div style={{ display:"flex",gap:"14px",justifyContent:"center",flexWrap:"wrap" }}>
            <a href="#" style={{ background:GOLD,color:"white",padding:"15px 34px",borderRadius:"2px",fontSize:"0.8rem",fontWeight:700,textDecoration:"none",display:"flex",alignItems:"center",gap:"8px" }} className="hover:opacity-90 transition-opacity"><MessageCircle size={15}/> Booking via WhatsApp</a>
            <a href="#" style={{ border:"1.5px solid rgba(255,255,255,0.4)",color:"white",padding:"15px 34px",borderRadius:"2px",fontSize:"0.8rem",fontWeight:600,textDecoration:"none" }} className="hover:bg-white/10 transition-all">Lihat Paket</a>
          </div>
        </div>
      </section>

      {/* Reviews — angular top-border cards */}
      <section style={{ padding:isMobile?"80px 24px":"100px 60px" }}>
        <div style={{ textAlign:"center",marginBottom:"56px" }}>
          <p style={{ fontSize:"0.62rem",letterSpacing:"0.45em",color:GOLD,textTransform:"uppercase",fontWeight:700,marginBottom:"8px" }}>Ulasan Tamu</p>
          <h2 style={{ fontFamily:serif,fontSize:"clamp(1.7rem,4vw,3rem)",fontWeight:700,fontStyle:"italic",color:FOREST }}>Apa Kata Tamu Kami?</h2>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:isMobile?"1fr":"repeat(3,1fr)",gap:"20px" }}>
          {REVIEWS.map((r,i)=>(
            <div key={r.name} style={{ ...gc,borderRadius:"2px",borderTop:`3px solid ${i===1?GOLD:GREEN}`,padding:"28px 24px",boxShadow:"8px 8px 32px rgba(28,51,32,0.06)" }}>
              <div style={{ fontSize:"0.56rem",background:"rgba(139,105,20,0.1)",color:GOLD,padding:"3px 10px",borderRadius:"1px",display:"inline-block",marginBottom:"12px",fontWeight:700 }}>{r.type}</div>
              <StarRow count={r.stars} color={GOLD}/>
              <p style={{ fontFamily:serif,fontSize:"0.9rem",lineHeight:1.85,color:SAGE,marginBottom:"18px",fontStyle:"italic" }}>"{r.text}"</p>
              <div style={{ borderTop:"1px solid rgba(28,51,32,0.1)",paddingTop:"14px",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                <div><p style={{ fontSize:"0.82rem",fontWeight:800,color:FOREST }}>{r.name}</p><p style={{ fontSize:"0.66rem",color:GOLD }}>{r.loc}</p></div>
                <div style={{ width:"24px",height:"1px",background:GOLD }}/>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ background:FOREST,color:"rgba(255,255,255,0.68)",padding:isMobile?"80px 24px 40px":"80px 60px 40px",clipPath:"polygon(0 6%,100% 0,100% 100%,0 100%)" }}>
        <div style={{ display:"grid",gridTemplateColumns:isMobile?"1fr":"2fr 1fr 1fr 1fr",gap:"40px",marginBottom:"48px" }}>
          <div><div style={{ fontFamily:"'Cinzel',serif",fontSize:"1.8rem",fontWeight:700,color:"white",letterSpacing:"0.22em",marginBottom:"4px" }}>OASE</div><p style={{ fontSize:"0.5rem",letterSpacing:"0.32em",color:"rgba(255,220,130,0.6)",textTransform:"uppercase",marginBottom:"14px" }}>Green Forest Resort · Parongpong</p><p style={{ fontSize:"0.76rem",lineHeight:1.85,color:"rgba(255,255,255,0.4)",maxWidth:"260px" }}>A tranquil nature-inspired retreat. Bagian dari BIG Group.</p></div>
          <div><p style={{ fontSize:"0.58rem",letterSpacing:"0.22em",fontWeight:700,color:"rgba(255,220,130,0.6)",textTransform:"uppercase",marginBottom:"14px" }}>Navigasi</p>{["Tipe Kamar","Fasilitas","Galeri","Event","Lokasi","Kontak"].map(l=><a key={l} href="#" style={{ display:"block",fontSize:"0.74rem",color:"rgba(255,255,255,0.42)",textDecoration:"none",marginBottom:"8px" }} className="hover:text-white transition-colors">{l}</a>)}</div>
          <div><p style={{ fontSize:"0.58rem",letterSpacing:"0.22em",fontWeight:700,color:"rgba(255,220,130,0.6)",textTransform:"uppercase",marginBottom:"14px" }}>Kontak</p>{[[MessageCircle,CONTACT.wa],[Mail,CONTACT.email],[Instagram,CONTACT.ig]].map(([Icon,val],i)=>(<div key={i} style={{ display:"flex",alignItems:"center",gap:"8px",marginBottom:"10px" }}><Icon size={13} color="rgba(255,220,130,0.5)"/><span style={{ fontSize:"0.72rem",color:"rgba(255,255,255,0.42)" }}>{val as string}</span></div>))}</div>
          <div><p style={{ fontSize:"0.58rem",letterSpacing:"0.22em",fontWeight:700,color:"rgba(255,220,130,0.6)",textTransform:"uppercase",marginBottom:"14px" }}>Lokasi</p><p style={{ fontSize:"0.74rem",color:"rgba(255,255,255,0.42)",lineHeight:1.65 }}>{CONTACT.address}</p></div>
        </div>
        <div style={{ borderTop:"1px solid rgba(255,255,255,0.08)",paddingTop:"20px",textAlign:"center",fontSize:"0.62rem",color:"rgba(255,255,255,0.2)" }}>© 2025 Oase Green Forest Resort · Parongpong, Kab. Bandung Barat · Bagian dari BIG Group</div>
      </footer>
    </div>
  );
}

// ─── OPTION 2: GLASSMORPHIC — CIRCULAR PORTHOLE ─────────────────────────────
function GlassmorphicHome() {
  const [menu, setMenu] = useState(false);
  const heroParallax = useMouseParallax();
  const isMobile = useIsMobile();
  const font = "'Montserrat', sans-serif";
  const serif = "'Playfair Display', serif";
  const MINT = "rgba(150,230,150,0.9)";
  const MINT_DIM = "rgba(150,230,150,0.5)";
  const frost: React.CSSProperties = { background:"rgba(255,255,255,0.13)", border:"1px solid rgba(255,255,255,0.2)" };

  return (
    <div style={{ fontFamily:font,color:"white",minHeight:"100vh",backgroundImage:`linear-gradient(rgba(8,22,10,0.63),rgba(8,22,10,0.63)),url(${IMGS.hero})`,backgroundSize:"cover",backgroundPosition:"center",backgroundAttachment:"fixed" }}>
      <style>{`@keyframes ringOut{0%{transform:scale(1);opacity:0.5}100%{transform:scale(1.85);opacity:0}}
        @keyframes cf1{0%,100%{transform:translateY(0px)}50%{transform:translateY(-16px)}}
        @keyframes cf2{0%,100%{transform:translateY(0px)}50%{transform:translateY(-10px)}}
        @keyframes bspF{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        .ro{animation:ringOut 3s ease-out infinite}.rod{animation:ringOut 3s ease-out infinite;animation-delay:1s}.rod2{animation:ringOut 3s ease-out infinite;animation-delay:2s}
        .cf1{animation:cf1 6s ease-in-out infinite}.cf2{animation:cf2 8s ease-in-out infinite}.bspF{animation:bspF 22s linear infinite}`}</style>

      <nav style={{ position:"sticky",top:"44px",zIndex:40,background:"rgba(8,22,10,0.72)",borderBottom:"1px solid rgba(255,255,255,0.1)",padding:isMobile?"14px 20px":"14px 60px",display:"flex",alignItems:"center",justifyContent:"space-between" }}>
        <div><div style={{ fontFamily:"'Cinzel',serif",fontSize:"1.35rem",fontWeight:700,color:"white",letterSpacing:"0.22em" }}>OASE</div><div style={{ fontSize:"0.37rem",letterSpacing:"0.42em",fontWeight:700,color:MINT,textTransform:"uppercase",marginTop:"-2px" }}>Green Forest Resort</div></div>
        <div className="hidden lg:flex items-center gap-6">
          {NAV.slice(0,5).map(l=><a key={l} href="#" style={{ fontSize:"0.68rem",fontWeight:600,letterSpacing:"0.07em",color:"rgba(255,255,255,0.65)",textDecoration:"none",textTransform:"uppercase" }} className="hover:text-white transition-colors">{l}</a>)}
          <a href="#" style={{ ...frost,display:"inline-flex",alignItems:"center",gap:"6px",padding:"10px 22px",borderRadius:"100px",fontSize:"0.7rem",fontWeight:700,color:"white",textDecoration:"none" }} className="hover:bg-white/18 transition-all"><MessageCircle size={13}/> Booking</a>
        </div>
        <button className="lg:hidden" onClick={()=>setMenu(!menu)}>{menu?<X size={22} color="white"/>:<Menu size={22} color="white"/>}</button>
      </nav>
      {menu&&<div style={{ background:"rgba(8,22,10,0.9)",borderBottom:"1px solid rgba(255,255,255,0.1)",position:"fixed",top:"108px",left:0,right:0,zIndex:39,padding:"20px 24px",display:"flex",flexDirection:"column",gap:"16px" }}>{NAV.map(l=><a key={l} href="#" style={{ fontSize:"0.88rem",fontWeight:600,color:"rgba(255,255,255,0.82)",textDecoration:"none",textTransform:"uppercase" }}>{l}</a>)}</div>}

      {/* Hero — porthole circle */}
      <section ref={heroParallax} style={{ minHeight:"94vh",display:"grid",gridTemplateColumns:isMobile?"1fr":"42fr 58fr",alignItems:"center",position:"relative",overflow:"hidden" }}>
        <div data-depth="15" className="cf2" style={{ position:"absolute",width:"110px",height:"110px",borderRadius:"50%",border:"1px solid rgba(150,230,150,0.1)",top:"12%",left:"36%",pointerEvents:"none" }}/>
        <div data-depth="25" className="cf1" style={{ position:"absolute",width:"56px",height:"56px",borderRadius:"50%",background:"rgba(120,200,120,0.05)",border:"1px solid rgba(150,230,150,0.12)",bottom:"20%",left:"4%",pointerEvents:"none" }}/>

        <div style={{ padding:isMobile?"80px 24px 40px":"80px 40px 80px 60px",position:"relative",zIndex:1,order:isMobile?2:1 }}>
          <div data-depth="10" style={{ display:"inline-flex",alignItems:"center",gap:"8px",...frost,borderRadius:"100px",padding:"7px 16px",marginBottom:"28px" }}>
            <div style={{ width:"7px",height:"7px",borderRadius:"50%",background:MINT }}/>
            <span style={{ fontSize:"0.62rem",fontWeight:700,color:MINT,letterSpacing:"0.14em",textTransform:"uppercase" }}>Parongpong · Bandung Barat</span>
          </div>
          <div data-depth="8" style={{ marginBottom:"22px" }}>
            <div style={{ fontFamily:"'Cinzel',serif",fontSize:"clamp(3.5rem,9vw,8rem)",fontWeight:700,color:"white",letterSpacing:"0.04em",lineHeight:0.88 }}>OASE</div>
            <div style={{ fontFamily:serif,fontSize:"clamp(1.3rem,3vw,2.6rem)",fontWeight:400,fontStyle:"italic",color:MINT,lineHeight:1.25,marginTop:"10px" }}>Green Forest Resort</div>
          </div>
          <p data-depth="5" style={{ fontSize:"clamp(0.82rem,1.3vw,0.96rem)",color:"rgba(255,255,255,0.65)",lineHeight:1.9,maxWidth:"360px",marginBottom:"36px" }}>A tranquil nature-inspired retreat — a perfect blend of comfort, relaxation, and natural beauty in the highlands of Bandung.</p>
          <div data-depth="14" style={{ display:"flex",gap:"12px",flexWrap:"wrap",marginBottom:"40px" }}>
            <a href="#" style={{ background:"rgba(120,200,120,0.22)",border:"1.5px solid rgba(150,230,150,0.45)",color:"white",padding:"14px 32px",borderRadius:"100px",fontSize:"0.78rem",fontWeight:700,textDecoration:"none",display:"flex",alignItems:"center",gap:"7px" }} className="hover:bg-green-400/28 transition-all"><MessageCircle size={14}/> Reserve a Stay</a>
            <a href="#" style={{ ...frost,padding:"14px 28px",borderRadius:"100px",fontSize:"0.78rem",fontWeight:600,textDecoration:"none",color:"white" }} className="hover:bg-white/18 transition-all">Explore Resort</a>
          </div>
          {!isMobile&&<div data-depth="22" className="bspF" style={{ width:"88px",height:"88px",position:"relative" }}>
            <svg viewBox="0 0 88 88" style={{ width:"100%",height:"100%" }}><path id="fpc" d="M44,44 m-34,0 a34,34 0 1,1 68,0 a34,34 0 1,1 -68,0" fill="none"/><text fontSize="8.5" fontFamily="Montserrat,sans-serif" fontWeight="700" fill="rgba(150,230,150,0.72)" letterSpacing="2.8"><textPath href="#fpc">BIG GROUP · SINCE 2024 · PARONGPONG ·</textPath></text></svg>
            <div style={{ position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center" }}><Leaf size={20} color={MINT}/></div>
          </div>}
        </div>

        <div style={{ position:"relative",display:"flex",alignItems:"center",justifyContent:"center",padding:isMobile?"40px 24px 60px":"60px",order:isMobile?1:2,minHeight:isMobile?"60vw":"auto" }}>
          <div data-depth="-12" style={{ position:"relative" }}>
            {!isMobile&&<>
              <div className="ro"  style={{ position:"absolute",inset:"-80px",borderRadius:"50%",border:"1px solid rgba(150,230,150,0.18)",pointerEvents:"none" }}/>
              <div className="rod" style={{ position:"absolute",inset:"-80px",borderRadius:"50%",border:"1px solid rgba(150,230,150,0.12)",pointerEvents:"none" }}/>
              <div className="rod2"style={{ position:"absolute",inset:"-80px",borderRadius:"50%",border:"1px solid rgba(150,230,150,0.08)",pointerEvents:"none" }}/>
            </>}
            <div style={{ position:"absolute",inset:isMobile?"-14px":"-22px",borderRadius:"50%",border:"1px solid rgba(255,255,255,0.1)",pointerEvents:"none" }}/>
            <div style={{ width:isMobile?"min(68vw,300px)":"460px",height:isMobile?"min(68vw,300px)":"460px",borderRadius:"50%",overflow:"hidden",border:"4px solid rgba(255,255,255,0.2)",boxShadow:"0 0 60px rgba(120,200,120,0.15),0 40px 80px rgba(0,0,0,0.4)" }} className="cf1">
              <img src={IMGS.hero} alt="Oase" style={{ width:"100%",height:"100%",objectFit:"cover" }}/>
            </div>
            {!isMobile&&<>
              <div data-depth="20" className="cf2" style={{ position:"absolute",bottom:"-22px",right:"-48px",width:"128px",height:"128px",borderRadius:"50%",overflow:"hidden",border:"3px solid rgba(255,255,255,0.2)" }}>
                <img src={IMGS.pool} alt="Kolam" style={{ width:"100%",height:"100%",objectFit:"cover" }}/>
              </div>
              <div data-depth="-8" style={{ position:"absolute",top:"-18px",left:"-48px",width:"108px",height:"108px",borderRadius:"50%",...frost,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center" }}>
                <p style={{ fontSize:"0.46rem",color:MINT_DIM,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"2px" }}>Check In</p>
                <p style={{ fontSize:"1.2rem",fontWeight:900,color:"white",lineHeight:1 }}>14:00</p>
                <p style={{ fontSize:"0.46rem",color:MINT_DIM }}>WIB</p>
              </div>
            </>}
          </div>
        </div>
      </section>

      {/* Use Cases — circular icons */}
      <section style={{ background:"rgba(8,22,10,0.7)",padding:isMobile?"80px 24px":"96px 60px",clipPath:"polygon(0 5%,100% 0,100% 95%,0 100%)",marginTop:"-40px" }}>
        <div style={{ textAlign:"center",marginBottom:"52px" }}>
          <p style={{ fontSize:"0.62rem",letterSpacing:"0.45em",color:MINT_DIM,textTransform:"uppercase",fontWeight:700,marginBottom:"9px" }}>Pilih Kebutuhan Anda</p>
          <h2 style={{ fontFamily:serif,fontSize:"clamp(1.7rem,4vw,3rem)",fontWeight:700,fontStyle:"italic",color:"white" }}>Kami Siap Melayani</h2>
        </div>
        <div style={{ display:"flex",gap:"28px",flexWrap:"wrap",justifyContent:"center",maxWidth:"900px",margin:"0 auto" }}>
          {USE_CASES.map(({Icon,label,desc},i)=>(
            <div key={label} style={{ display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",gap:"10px",width:"140px",cursor:"pointer" }} className="group">
              <div style={{ width:i===2?"80px":"68px",height:i===2?"80px":"68px",borderRadius:"50%",background:i===2?"rgba(120,200,120,0.22)":"rgba(255,255,255,0.07)",border:`2px solid ${i===2?"rgba(150,230,150,0.45)":"rgba(255,255,255,0.13)"}`,display:"flex",alignItems:"center",justifyContent:"center",transition:"transform 0.3s ease",boxShadow:i===2?"0 0 24px rgba(120,200,120,0.2)":"none" }} className="group-hover:scale-110">
                <Icon size={i===2?28:22} color={i===2?MINT:"rgba(255,255,255,0.7)"}/>
              </div>
              <p style={{ fontSize:"0.74rem",fontWeight:800,color:"white",lineHeight:1.3 }}>{label}</p>
              <p style={{ fontSize:"0.6rem",color:"rgba(255,255,255,0.45)",lineHeight:1.4 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Rooms — circles alternating */}
      <section style={{ padding:isMobile?"80px 24px":"100px 60px",marginTop:"-40px" }}>
        <div style={{ marginBottom:"64px" }}>
          <p style={{ fontSize:"0.62rem",letterSpacing:"0.45em",color:MINT,textTransform:"uppercase",fontWeight:700,marginBottom:"9px" }}>Kamar & Akomodasi</p>
          <h2 style={{ fontFamily:serif,fontSize:"clamp(2rem,5vw,4.2rem)",fontWeight:700,fontStyle:"italic",color:"white",lineHeight:1.05 }}>Tipe Kamar Unggulan</h2>
        </div>
        <div style={{ display:"flex",flexDirection:"column",gap:isMobile?"60px":"80px" }}>
          {ROOMS.map((room,i)=>{
            const isEven=i%2===0;
            const sz=[400,340,380,360][i];
            return(
              <div key={room.name} style={{ display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:isMobile?"28px":"60px",alignItems:"center",direction:(!isMobile&&!isEven)?"rtl":"ltr" }}>
                <div style={{ display:"flex",justifyContent:isMobile?"center":isEven?"flex-end":"flex-start",position:"relative",direction:"ltr" }}>
                  <div style={{ position:"relative" }}>
                    <div style={{ position:"absolute",inset:"-18px",borderRadius:"50%",border:"1px solid rgba(150,230,150,0.14)",pointerEvents:"none" }}/>
                    <div style={{ width:isMobile?"min(280px,80vw)":`${sz}px`,height:isMobile?"min(280px,80vw)":`${sz}px`,borderRadius:"50%",overflow:"hidden",border:"3px solid rgba(255,255,255,0.18)",boxShadow:"0 0 40px rgba(120,200,120,0.1),0 30px 60px rgba(0,0,0,0.3)" }} className="cf2">
                      <img src={room.img} alt={room.name} style={{ width:"100%",height:"100%",objectFit:"cover" }}/>
                    </div>
                    <div style={{ position:"absolute",top:"12px",right:"12px",background:"rgba(120,200,120,0.22)",border:"1px solid rgba(150,230,150,0.35)",borderRadius:"100px",padding:"5px 12px",fontSize:"0.58rem",fontWeight:800,color:MINT }}>{room.tag}</div>
                  </div>
                </div>
                <div style={{ direction:"ltr" }}>
                  <div style={{ width:"40px",height:"2px",background:"rgba(150,230,150,0.6)",borderRadius:"1px",marginBottom:"22px" }}/>
                  <h3 style={{ fontFamily:serif,fontSize:"clamp(1.4rem,2.8vw,2.2rem)",fontWeight:700,fontStyle:"italic",color:"white",marginBottom:"14px" }}>{room.name}</h3>
                  <p style={{ fontSize:"0.84rem",color:"rgba(255,255,255,0.58)",lineHeight:1.85,marginBottom:"20px" }}>{room.desc}</p>
                  <div style={{ display:"flex",gap:"8px",marginBottom:"24px" }}>
                    {[room.cap,room.sqm].map(t=><span key={t} style={{ fontSize:"0.64rem",background:"rgba(120,200,120,0.14)",color:MINT,padding:"5px 14px",borderRadius:"100px",fontWeight:700,border:"1px solid rgba(150,230,150,0.22)" }}>{t}</span>)}
                  </div>
                  <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                    <div><p style={{ fontSize:"0.54rem",color:MINT_DIM,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"2px" }}>Mulai dari</p><p style={{ fontSize:"1.5rem",fontWeight:900,color:MINT,lineHeight:1 }}>{room.price}<span style={{ fontSize:"0.62rem",fontWeight:400,color:"rgba(255,255,255,0.45)" }}>/malam</span></p></div>
                    <a href="#" style={{ ...frost,padding:"12px 26px",borderRadius:"100px",fontSize:"0.72rem",fontWeight:700,textDecoration:"none",color:"white",display:"flex",alignItems:"center",gap:"6px" }} className="hover:bg-white/18 transition-all">Pesan <ArrowRight size={13}/></a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop:"80px",display:"grid",gridTemplateColumns:isMobile?"1fr":"auto 1fr auto",gap:"20px",alignItems:"center",...frost,borderRadius:"100px",padding:"24px 36px" }}>
          <div style={{ width:"54px",height:"54px",borderRadius:"50%",background:"rgba(120,200,120,0.14)",border:"2px solid rgba(150,230,150,0.28)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}><Users size={24} color={MINT}/></div>
          <div>
            <div style={{ display:"flex",alignItems:"center",gap:"10px",marginBottom:"4px" }}>
              <h3 style={{ fontFamily:serif,fontSize:"1.05rem",fontStyle:"italic",fontWeight:700,color:"white" }}>{NOAH_ARK.name}</h3>
              <span style={{ fontSize:"0.55rem",background:"rgba(120,200,120,0.2)",color:MINT,padding:"3px 10px",borderRadius:"100px",fontWeight:700,border:"1px solid rgba(150,230,150,0.28)" }}>Eksklusif</span>
            </div>
            <p style={{ fontSize:"0.74rem",color:"rgba(255,255,255,0.52)",lineHeight:1.6 }}>{NOAH_ARK.desc}</p>
            <p style={{ fontSize:"0.63rem",fontWeight:700,color:MINT,marginTop:"5px",opacity:0.8 }}>{NOAH_ARK.cap}</p>
          </div>
          <a href="#" style={{ ...frost,background:"rgba(120,200,120,0.18)",border:"1px solid rgba(150,230,150,0.32)",padding:"13px 26px",borderRadius:"100px",fontSize:"0.74rem",fontWeight:700,textDecoration:"none",color:"white",display:"flex",alignItems:"center",gap:"7px",flexShrink:0 }} className="hover:bg-green-400/24 transition-all"><MessageCircle size={14}/> Tanya via WA</a>
        </div>
      </section>

      {/* Gallery — bubble circles */}
      <section style={{ padding:isMobile?"60px 24px":"80px 60px",background:"rgba(8,22,10,0.45)",clipPath:"polygon(0 3%,100% 0,100% 97%,0 100%)" }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:"44px" }}>
          <div><p style={{ fontSize:"0.62rem",letterSpacing:"0.45em",color:MINT,textTransform:"uppercase",fontWeight:700,marginBottom:"8px" }}>Galeri Foto</p><h2 style={{ fontFamily:serif,fontSize:"clamp(1.7rem,4vw,3rem)",fontWeight:700,fontStyle:"italic",color:"white" }}>Suasana &amp; Fasilitas</h2></div>
          <button style={{ color:MINT,background:"none",border:"none",cursor:"pointer",fontSize:"0.72rem",fontWeight:700,display:"flex",alignItems:"center",gap:"4px" }}>Lihat Semua <ArrowRight size={13}/></button>
        </div>
        {isMobile?(
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px" }}>
            {GALLERY.slice(0,4).map((img,i)=>(
              <div key={i} style={{ aspectRatio:"1",borderRadius:"50%",overflow:"hidden",border:"3px solid rgba(255,255,255,0.18)" }}>
                <img src={img.src} alt={img.label} style={{ width:"100%",height:"100%",objectFit:"cover" }}/>
              </div>
            ))}
          </div>
        ):(
          <div style={{ display:"grid",gridTemplateColumns:"repeat(8,1fr)",gridAutoRows:"130px",gap:"10px" }}>
            <div style={{ gridColumn:"1/4",gridRow:"1/4",borderRadius:"50%",overflow:"hidden",border:"4px solid rgba(255,255,255,0.18)",boxShadow:"0 0 40px rgba(120,200,120,0.1)" }} className="group cursor-pointer"><img src={GALLERY[0].src} alt={GALLERY[0].label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/></div>
            <div style={{ gridColumn:"4/6",gridRow:"1/3",borderRadius:"50%",overflow:"hidden",border:"3px solid rgba(255,255,255,0.16)" }} className="group cursor-pointer"><img src={GALLERY[1].src} alt={GALLERY[1].label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/></div>
            <div style={{ gridColumn:"6/8",gridRow:"1/2",borderRadius:"50%",overflow:"hidden",border:"3px solid rgba(255,255,255,0.14)" }} className="group cursor-pointer"><img src={GALLERY[2].src} alt={GALLERY[2].label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/></div>
            <div style={{ gridColumn:"8/9",gridRow:"1/2",borderRadius:"50%",overflow:"hidden",border:"2px solid rgba(255,255,255,0.12)" }} className="group cursor-pointer"><img src={GALLERY[3].src} alt={GALLERY[3].label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/></div>
            <div style={{ gridColumn:"6/7",gridRow:"2/4",borderRadius:"50%",overflow:"hidden",border:"3px solid rgba(255,255,255,0.14)" }} className="group cursor-pointer"><img src={GALLERY[4].src} alt={GALLERY[4].label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/></div>
            <div style={{ gridColumn:"7/9",gridRow:"2/4",borderRadius:"50%",overflow:"hidden",border:"3px solid rgba(255,255,255,0.16)" }} className="group cursor-pointer"><img src={GALLERY[5].src} alt={GALLERY[5].label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/></div>
            <div style={{ gridColumn:"4/6",gridRow:"3/4",borderRadius:"50%",overflow:"hidden",border:"2px solid rgba(255,255,255,0.12)" }} className="group cursor-pointer"><img src={IMGS.pool} alt="Kolam renang" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/></div>
          </div>
        )}
      </section>

      {/* Facilities — circular */}
      <section style={{ padding:isMobile?"80px 24px":"100px 60px",marginTop:"-30px" }}>
        <div style={{ textAlign:"center",marginBottom:"60px" }}>
          <p style={{ fontSize:"0.62rem",letterSpacing:"0.45em",color:MINT,textTransform:"uppercase",fontWeight:700,marginBottom:"8px" }}>Fasilitas Resort</p>
          <h2 style={{ fontFamily:serif,fontSize:"clamp(1.7rem,4vw,3rem)",fontWeight:700,fontStyle:"italic",color:"white" }}>Fasilitas Unggulan</h2>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:isMobile?"repeat(2,1fr)":"repeat(3,1fr)",gap:"40px",maxWidth:"820px",margin:"0 auto" }}>
          {FACILITIES.map(({Icon,name,desc},i)=>(
            <div key={name} style={{ textAlign:"center" }} className="group">
              <div style={{ position:"relative",width:"80px",height:"80px",margin:"0 auto 14px" }}>
                <div style={{ position:"absolute",inset:"-10px",borderRadius:"50%",border:"1px solid rgba(150,230,150,0.14)",transition:"opacity 0.3s ease" }} className="group-hover:opacity-100 opacity-0"/>
                <div style={{ width:"80px",height:"80px",borderRadius:"50%",...frost,display:"flex",alignItems:"center",justifyContent:"center",transition:"transform 0.35s ease" }} className="group-hover:scale-110"><Icon size={28} color={i%2===0?MINT:"rgba(255,255,255,0.85)"}/></div>
              </div>
              <p style={{ fontSize:"0.86rem",fontWeight:800,color:"white",marginBottom:"5px" }}>{name}</p>
              <p style={{ fontSize:"0.68rem",color:"rgba(255,255,255,0.5)",lineHeight:1.55 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Video — circle main + small circles */}
      <section style={{ padding:isMobile?"60px 24px":"80px 60px",background:"rgba(8,22,10,0.5)",clipPath:"polygon(0 5%,100% 0,100% 95%,0 100%)" }}>
        <div style={{ textAlign:"center",marginBottom:"48px" }}>
          <p style={{ fontSize:"0.62rem",letterSpacing:"0.45em",color:MINT_DIM,textTransform:"uppercase",fontWeight:700,marginBottom:"9px" }}>Video Showcase</p>
          <h2 style={{ fontFamily:serif,fontSize:"clamp(1.7rem,4vw,3rem)",fontWeight:700,fontStyle:"italic",color:"white" }}>Rasakan Suasana Oase</h2>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:isMobile?"1fr":"3fr 2fr",gap:"32px",maxWidth:"1000px",margin:"0 auto",alignItems:"center" }}>
          <div style={{ display:"flex",justifyContent:"center" }} className="group cursor-pointer">
            <div style={{ position:"relative" }}>
              <div className="ro"  style={{ position:"absolute",inset:"-40px",borderRadius:"50%",border:"1px solid rgba(150,230,150,0.18)",pointerEvents:"none" }}/>
              <div className="rod" style={{ position:"absolute",inset:"-40px",borderRadius:"50%",border:"1px solid rgba(150,230,150,0.1)",pointerEvents:"none" }}/>
              <div style={{ width:isMobile?"min(78vw,300px)":"360px",height:isMobile?"min(78vw,300px)":"360px",borderRadius:"50%",overflow:"hidden",border:"4px solid rgba(255,255,255,0.18)",boxShadow:"0 0 50px rgba(120,200,120,0.15)",position:"relative" }}>
                <img src={VIDEOS[0].thumb} alt={VIDEOS[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
                <div style={{ position:"absolute",inset:0,background:"rgba(8,22,10,0.32)",display:"flex",alignItems:"center",justifyContent:"center" }}>
                  <div style={{ width:"68px",height:"68px",borderRadius:"50%",background:"rgba(120,200,120,0.22)",border:"2px solid rgba(150,230,150,0.45)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 0 14px rgba(120,200,120,0.1)" }}>
                    <Play size={24} color="white" fill="white" style={{ marginLeft:"3px" }}/>
                  </div>
                </div>
              </div>
              <div style={{ textAlign:"center",marginTop:"16px" }}>
                <p style={{ fontSize:"0.88rem",fontWeight:800,color:"white" }}>{VIDEOS[0].title}</p>
                <p style={{ fontSize:"0.68rem",color:MINT_DIM }}>{VIDEOS[0].dur}</p>
              </div>
            </div>
          </div>
          <div style={{ display:"flex",flexDirection:"column",gap:"22px" }}>
            {VIDEOS.slice(1).map((v,i)=>(
              <div key={i} style={{ display:"flex",alignItems:"center",gap:"16px",cursor:"pointer" }} className="group">
                <div style={{ width:`${[90,70,80][i]}px`,height:`${[90,70,80][i]}px`,borderRadius:"50%",overflow:"hidden",border:"2px solid rgba(255,255,255,0.18)",flexShrink:0,position:"relative" }}>
                  <img src={v.thumb} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                  <div style={{ position:"absolute",inset:0,background:"rgba(8,22,10,0.3)",display:"flex",alignItems:"center",justifyContent:"center" }}><Play size={13} color="white" fill="white" style={{ marginLeft:"2px" }}/></div>
                </div>
                <div><p style={{ fontSize:"0.78rem",fontWeight:700,color:"white" }}>{v.title}</p><p style={{ fontSize:"0.62rem",color:"rgba(255,255,255,0.5)" }}>{v.sub}</p><p style={{ fontSize:"0.6rem",color:MINT,fontWeight:600 }}>{v.dur}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ position:"relative",padding:isMobile?"100px 24px":"130px 60px",overflow:"hidden",clipPath:"polygon(0 0,100% 5%,100% 100%,0 95%)",marginTop:"-40px" }}>
        <img src={IMGS.heroDark} alt="" style={{ position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover" }}/>
        <div style={{ position:"absolute",inset:0,background:"rgba(8,22,10,0.78)" }}/>
        <div style={{ position:"absolute",width:"480px",height:"480px",borderRadius:"50%",border:"1px solid rgba(150,230,150,0.06)",top:"-180px",right:"-140px",pointerEvents:"none" }}/>
        <div style={{ position:"absolute",width:"300px",height:"300px",borderRadius:"50%",border:"1px solid rgba(255,255,255,0.04)",bottom:"-100px",left:"-80px",pointerEvents:"none" }}/>
        <div style={{ position:"relative",textAlign:"center" }}>
          <p style={{ fontSize:"0.62rem",letterSpacing:"0.55em",color:MINT_DIM,textTransform:"uppercase",fontWeight:700,marginBottom:"14px" }}>Booking Langsung Lebih Mudah</p>
          <h2 style={{ fontFamily:serif,fontSize:"clamp(2rem,5.5vw,4.5rem)",fontWeight:700,fontStyle:"italic",lineHeight:1.08,marginBottom:"18px" }}>Harga Terbaik Dijamin</h2>
          <p style={{ fontSize:"0.9rem",color:"rgba(255,255,255,0.62)",maxWidth:"420px",margin:"0 auto 32px",lineHeight:1.9 }}>Booking langsung via WhatsApp untuk harga spesial, sarapan gratis, dan keuntungan eksklusif tamu Oase Green Forest.</p>
          <div style={{ display:"flex",gap:"14px",justifyContent:"center",flexWrap:"wrap" }}>
            <a href="#" style={{ background:"rgba(120,200,120,0.22)",border:"1.5px solid rgba(150,230,150,0.4)",color:"white",padding:"15px 34px",borderRadius:"100px",fontSize:"0.8rem",fontWeight:700,textDecoration:"none",display:"flex",alignItems:"center",gap:"8px" }} className="hover:bg-green-400/28 transition-all"><MessageCircle size={15}/> Booking via WhatsApp</a>
            <a href="#" style={{ ...frost,padding:"15px 34px",borderRadius:"100px",fontSize:"0.8rem",fontWeight:600,textDecoration:"none",color:"white" }} className="hover:bg-white/18 transition-all">Lihat Paket</a>
          </div>
        </div>
      </section>

      {/* Reviews — pill cards */}
      <section style={{ padding:isMobile?"80px 24px":"100px 60px" }}>
        <div style={{ textAlign:"center",marginBottom:"56px" }}>
          <p style={{ fontSize:"0.62rem",letterSpacing:"0.45em",color:MINT,textTransform:"uppercase",fontWeight:700,marginBottom:"8px" }}>Ulasan Tamu</p>
          <h2 style={{ fontFamily:serif,fontSize:"clamp(1.7rem,4vw,3rem)",fontWeight:700,fontStyle:"italic",color:"white" }}>Apa Kata Tamu Kami?</h2>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:isMobile?"1fr":"repeat(3,1fr)",gap:"24px" }}>
          {REVIEWS.map((r,i)=>(
            <div key={r.name} style={{ ...frost,borderRadius:i===1?"60px":"40px",padding:"32px 28px" }}>
              <div style={{ fontSize:"0.56rem",background:"rgba(120,200,120,0.14)",color:MINT,padding:"4px 11px",borderRadius:"100px",display:"inline-block",marginBottom:"12px",fontWeight:700,border:"1px solid rgba(150,230,150,0.22)" }}>{r.type}</div>
              <StarRow count={r.stars} color={MINT}/>
              <p style={{ fontFamily:serif,fontSize:"0.88rem",lineHeight:1.85,color:"rgba(255,255,255,0.6)",marginBottom:"18px",fontStyle:"italic" }}>"{r.text}"</p>
              <div style={{ borderTop:"1px solid rgba(255,255,255,0.1)",paddingTop:"14px" }}>
                <p style={{ fontSize:"0.82rem",fontWeight:800,color:"white" }}>{r.name}</p>
                <p style={{ fontSize:"0.66rem",color:MINT }}>{r.loc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ background:"rgba(8,22,10,0.9)",color:"rgba(255,255,255,0.65)",padding:isMobile?"80px 24px 40px":"80px 60px 40px",clipPath:"polygon(0 6%,100% 0,100% 100%,0 100%)" }}>
        <div style={{ display:"grid",gridTemplateColumns:isMobile?"1fr":"2fr 1fr 1fr 1fr",gap:"40px",marginBottom:"48px" }}>
          <div><div style={{ fontFamily:"'Cinzel',serif",fontSize:"1.8rem",fontWeight:700,color:"white",letterSpacing:"0.22em",marginBottom:"4px" }}>OASE</div><p style={{ fontSize:"0.5rem",letterSpacing:"0.32em",color:MINT_DIM,textTransform:"uppercase",marginBottom:"14px" }}>Green Forest Resort · Parongpong</p><p style={{ fontSize:"0.76rem",lineHeight:1.85,color:"rgba(255,255,255,0.38)",maxWidth:"260px" }}>A tranquil nature-inspired retreat. Bagian dari BIG Group.</p></div>
          <div><p style={{ fontSize:"0.58rem",letterSpacing:"0.22em",fontWeight:700,color:MINT_DIM,textTransform:"uppercase",marginBottom:"14px" }}>Navigasi</p>{["Tipe Kamar","Fasilitas","Galeri","Event","Lokasi","Kontak"].map(l=><a key={l} href="#" style={{ display:"block",fontSize:"0.74rem",color:"rgba(255,255,255,0.4)",textDecoration:"none",marginBottom:"8px" }} className="hover:text-white transition-colors">{l}</a>)}</div>
          <div><p style={{ fontSize:"0.58rem",letterSpacing:"0.22em",fontWeight:700,color:MINT_DIM,textTransform:"uppercase",marginBottom:"14px" }}>Kontak</p>{[[MessageCircle,CONTACT.wa],[Mail,CONTACT.email],[Instagram,CONTACT.ig]].map(([Icon,val],i)=>(<div key={i} style={{ display:"flex",alignItems:"center",gap:"8px",marginBottom:"10px" }}><Icon size={13} color={MINT_DIM}/><span style={{ fontSize:"0.72rem",color:"rgba(255,255,255,0.4)" }}>{val as string}</span></div>))}</div>
          <div><p style={{ fontSize:"0.58rem",letterSpacing:"0.22em",fontWeight:700,color:MINT_DIM,textTransform:"uppercase",marginBottom:"14px" }}>Lokasi</p><p style={{ fontSize:"0.74rem",color:"rgba(255,255,255,0.4)",lineHeight:1.65 }}>{CONTACT.address}</p></div>
        </div>
        <div style={{ borderTop:"1px solid rgba(255,255,255,0.07)",paddingTop:"20px",textAlign:"center",fontSize:"0.62rem",color:"rgba(255,255,255,0.18)" }}>© 2025 Oase Green Forest Resort · Parongpong, Kab. Bandung Barat · Bagian dari BIG Group</div>
      </footer>
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

// ─── OPTION 4: ORGANIC LUXURY ────────────────────────────────────────────────
function OrganicHome() {
  const [menu, setMenu] = useState(false);
  const heroParallax = useMouseParallax();
  const scrollRef = useParallax(0.2);
  const isMobile = useIsMobile();
  const font = "'Montserrat', sans-serif";
  const serif = "'Playfair Display', serif";
  const BG = "#f4f0e8", FOREST = "#1a2a15", GREEN = "#3d6e35";
  const TERRA = "#c8541e", MUTED = "#6b7c65";
  const BLOB1 = "62% 38% 46% 54% / 60% 44% 56% 40%";
  const BLOB2 = "40% 60% 70% 30% / 50% 70% 30% 50%";
  const BLOB3 = "70% 30% 50% 50% / 30% 50% 70% 50%";

  return (
    <div style={{ fontFamily: font, background: BG, color: FOREST, minHeight: "100vh" }}>
      <style>{`
        @keyframes orgFloat  { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-20px) rotate(3deg)} }
        @keyframes orgFloat2 { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-13px) rotate(-3deg)} }
        @keyframes spinSlow  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes blobPulse { 0%,100%{border-radius:62% 38% 46% 54% / 60% 44% 56% 40%} 50%{border-radius:40% 60% 54% 46% / 44% 60% 40% 56%} }
        .org-float  { animation: orgFloat  7s ease-in-out infinite; }
        .org-float2 { animation: orgFloat2 9s ease-in-out infinite; }
        .spin-slow  { animation: spinSlow 22s linear infinite; }
        .blob-pulse { animation: blobPulse 8s ease-in-out infinite; }
      `}</style>

      {/* ── Nav ── */}
      <nav style={{ position: "sticky", top: "44px", zIndex: 40, background: BG, borderBottom: `1px solid rgba(26,42,21,0.09)`, padding: isMobile ? "14px 20px" : "14px 60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: "1.35rem", fontWeight: 700, color: FOREST, letterSpacing: "0.22em" }}>OASE</div>
          <div style={{ fontSize: "0.37rem", letterSpacing: "0.42em", fontWeight: 700, color: GREEN, textTransform: "uppercase", marginTop: "-2px" }}>Green Forest Resort</div>
        </div>
        <div className="hidden lg:flex items-center gap-6">
          {NAV.slice(0,5).map(l => <a key={l} href="#" style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.07em", color: MUTED, textDecoration: "none", textTransform: "uppercase" }} className="hover:text-[#1a2a15] transition-colors">{l}</a>)}
          <a href="#" style={{ background: TERRA, color: "white", padding: "10px 22px", borderRadius: "100px", fontSize: "0.7rem", fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }} className="hover:opacity-90 transition-opacity"><MessageCircle size={13} /> Booking</a>
        </div>
        <button className="lg:hidden" onClick={() => setMenu(!menu)}>{menu ? <X size={22} color={FOREST} /> : <Menu size={22} color={FOREST} />}</button>
      </nav>
      {menu && (
        <div style={{ background: BG, borderBottom: `1px solid rgba(26,42,21,0.09)`, position: "fixed", top: "108px", left: 0, right: 0, zIndex: 39, padding: "20px 24px", display: "flex", flexDirection: "column", gap: "16px" }}>
          {NAV.map(l => <a key={l} href="#" style={{ fontSize: "0.88rem", fontWeight: 600, color: FOREST, textDecoration: "none", textTransform: "uppercase" }}>{l}</a>)}
        </div>
      )}

      {/* ── Hero ── */}
      <section ref={heroParallax} style={{ minHeight: "94vh", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "45fr 55fr", position: "relative", overflow: "hidden", alignItems: "center" }}>

        {/* Floating decorative blobs */}
        <div data-depth="30" className="org-float" style={{ position: "absolute", width: "320px", height: "320px", borderRadius: "50%", background: "rgba(61,110,53,0.06)", top: "5%", right: "8%", pointerEvents: "none", zIndex: 0 }} />
        <div data-depth="18" className="org-float2" style={{ position: "absolute", width: "180px", height: "180px", borderRadius: "50%", background: "rgba(200,84,30,0.07)", bottom: "12%", left: "1%", pointerEvents: "none", zIndex: 0 }} />
        <div data-depth="40" style={{ position: "absolute", width: "70px", height: "70px", borderRadius: "50%", border: "2px solid rgba(61,110,53,0.22)", top: "35%", left: isMobile ? "70%" : "42%", pointerEvents: "none", zIndex: 0 }} className="org-float" />

        {/* Left: text */}
        <div style={{ padding: isMobile ? "60px 24px 32px" : "60px 40px 60px 60px", position: "relative", zIndex: 1, order: isMobile ? 2 : 1 }}>
          {/* Location pill */}
          <div data-depth="10" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(61,110,53,0.1)", border: "1px solid rgba(61,110,53,0.22)", borderRadius: "100px", padding: "7px 16px", marginBottom: "28px" }}>
            <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: GREEN }} />
            <span style={{ fontSize: "0.62rem", fontWeight: 700, color: GREEN, letterSpacing: "0.14em", textTransform: "uppercase" }}>Parongpong · Bandung Barat</span>
          </div>

          {/* Giant headline */}
          <div data-depth="8" style={{ marginBottom: "22px" }}>
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(3.5rem,9vw,8rem)", fontWeight: 700, color: FOREST, letterSpacing: "0.04em", lineHeight: 0.88 }}>OASE</div>
            <div style={{ fontFamily: serif, fontSize: "clamp(1.3rem,3vw,2.6rem)", fontWeight: 400, fontStyle: "italic", color: GREEN, lineHeight: 1.25, marginTop: "10px" }}>Green Forest Resort</div>
          </div>

          <p data-depth="5" style={{ fontSize: "clamp(0.82rem,1.3vw,0.96rem)", color: MUTED, lineHeight: 1.9, maxWidth: "360px", marginBottom: "36px" }}>
            A tranquil nature-inspired retreat — a perfect blend of comfort, relaxation, and natural beauty in the highlands of Bandung.
          </p>

          <div data-depth="14" style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "48px" }}>
            <a href="#" style={{ background: TERRA, color: "white", padding: "14px 32px", borderRadius: "100px", fontSize: "0.78rem", fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center", gap: "7px" }} className="hover:opacity-90 transition-opacity"><MessageCircle size={14} /> Reserve a Stay</a>
            <a href="#" style={{ border: `1.5px solid rgba(26,42,21,0.28)`, color: FOREST, padding: "14px 28px", borderRadius: "100px", fontSize: "0.78rem", fontWeight: 600, textDecoration: "none" }} className="hover:border-[#1a2a15] transition-all">Explore Resort</a>
          </div>

          {/* Rotating circular badge */}
          {!isMobile && (
            <div data-depth="22" className="spin-slow" style={{ width: "88px", height: "88px", position: "relative" }}>
              <svg viewBox="0 0 88 88" style={{ width: "100%", height: "100%" }}>
                <path id="badge-circle" d="M44,44 m-34,0 a34,34 0 1,1 68,0 a34,34 0 1,1 -68,0" fill="none" />
                <text fontSize="8.5" fontFamily="Montserrat,sans-serif" fontWeight="700" fill={GREEN} letterSpacing="2.8">
                  <textPath href="#badge-circle">BIG GROUP · SINCE 2024 · PARONGPONG ·</textPath>
                </text>
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Leaf size={20} color={GREEN} />
              </div>
            </div>
          )}
        </div>

        {/* Right: organic blob image stack */}
        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", padding: isMobile ? "0 24px 60px" : "60px 60px 60px 20px", order: isMobile ? 1 : 2, minHeight: isMobile ? "50vh" : "auto" }}>
          {/* Main blob image */}
          <div data-depth="-14" style={{ position: "relative", width: isMobile ? "80%" : "82%", maxWidth: "500px" }}>
            <div className="blob-pulse" style={{ width: "100%", aspectRatio: "0.82", overflow: "hidden", boxShadow: "40px 50px 90px rgba(26,42,21,0.22)", transition: "transform 0.7s ease", transform: "rotate(-4deg)" }}
              onMouseEnter={e => (e.currentTarget.style.transform = "rotate(0deg)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "rotate(-4deg)")}>
              <img ref={scrollRef} src={IMGS.hero} alt="Oase Green Forest Resort" style={{ width: "100%", height: "130%", objectFit: "cover", top: "-15%", position: "relative" }} />
            </div>

            {/* Small circle: secondary image */}
            <div data-depth="24" className="org-float2" style={{ position: "absolute", bottom: "-28px", left: "-28px", width: "150px", height: "150px", borderRadius: "50%", overflow: "hidden", border: `5px solid ${BG}`, boxShadow: "20px 20px 50px rgba(26,42,21,0.15)" }}>
              <img src={IMGS.pool} alt="Kolam renang" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>

            {/* Floating stat card */}
            <div data-depth="-10" style={{ position: "absolute", top: "-18px", right: "-18px", background: "white", borderRadius: "18px", padding: "16px 20px", boxShadow: "20px 20px 50px rgba(26,42,21,0.1)", minWidth: "120px" }}>
              <p style={{ fontSize: "0.52rem", letterSpacing: "0.14em", color: MUTED, textTransform: "uppercase", marginBottom: "4px" }}>Check In</p>
              <p style={{ fontSize: "1.4rem", fontWeight: 900, color: FOREST, lineHeight: 1 }}>14:00</p>
              <p style={{ fontSize: "0.52rem", color: MUTED, marginTop: "2px" }}>WIB · Daily</p>
            </div>

            {/* Small terracotta blob accent */}
            <div data-depth="32" className="org-float" style={{ position: "absolute", top: "30%", right: "-40px", width: "70px", height: "70px", borderRadius: BLOB2, background: `rgba(200,84,30,0.15)`, border: `2px solid rgba(200,84,30,0.25)` }} />
          </div>
        </div>
      </section>

      {/* ── Use Cases ── diagonal dark band */}
      <section style={{ background: FOREST, padding: isMobile ? "80px 24px" : "96px 60px", clipPath: "polygon(0 5%, 100% 0, 100% 95%, 0 100%)", marginTop: "-40px" }}>
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <p style={{ fontSize: "0.62rem", letterSpacing: "0.45em", color: "rgba(200,84,30,0.8)", textTransform: "uppercase", fontWeight: 700, marginBottom: "9px" }}>Pilih Kebutuhan Anda</p>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(1.7rem,4vw,3rem)", fontWeight: 700, fontStyle: "italic", color: "white" }}>Kami Siap Melayani</h2>
        </div>
        <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", justifyContent: "center", maxWidth: "1000px", margin: "0 auto" }}>
          {USE_CASES.map(({ Icon, label, desc }, i) => (
            <div key={label} style={{ background: i === 1 ? TERRA : "rgba(255,255,255,0.07)", borderRadius: "100px", padding: "18px 28px", display: "flex", gap: "14px", alignItems: "center", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", transition: "all 0.3s", flexShrink: 0 }}
              className="hover:bg-white/12 transition-all">
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: i === 1 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon size={15} color="rgba(255,255,255,0.85)" />
              </div>
              <div>
                <p style={{ fontSize: "0.76rem", fontWeight: 800, color: "white", lineHeight: 1.2 }}>{label}</p>
                <p style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.48)", marginTop: "2px" }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Rooms ── alternating organic layout */}
      <section style={{ padding: isMobile ? "80px 24px" : "100px 60px", marginTop: "-40px" }}>
        <div style={{ marginBottom: "64px" }}>
          <p style={{ fontSize: "0.62rem", letterSpacing: "0.45em", color: TERRA, textTransform: "uppercase", fontWeight: 700, marginBottom: "9px" }}>Kamar & Akomodasi</p>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(2rem,5vw,4.2rem)", fontWeight: 700, fontStyle: "italic", color: FOREST, lineHeight: 1.05 }}>Tipe Kamar Unggulan</h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? "60px" : "90px" }}>
          {ROOMS.map((room, i) => {
            const shapes = [BLOB1, BLOB2, BLOB3, "50%"] as const;
            const rotations = ["-4deg","3deg","-3deg","0deg"];
            const isEven = i % 2 === 0;
            return (
              <div key={room.name} style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "32px" : "70px", alignItems: "center", direction: (!isMobile && !isEven) ? "rtl" : "ltr" }}>
                {/* Organic image */}
                <div style={{ position: "relative", direction: "ltr" }}>
                  <div style={{ width: "100%", aspectRatio: "1", borderRadius: shapes[i], overflow: "hidden", boxShadow: "32px 38px 72px rgba(26,42,21,0.16)", transform: `rotate(${rotations[i]})`, transition: "transform 0.5s ease" }}
                    onMouseEnter={e => (e.currentTarget.style.transform = "rotate(0deg)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = `rotate(${rotations[i]})`)}>
                    <img src={room.img} alt={room.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s ease" }}
                      onMouseEnter={e => ((e.target as HTMLImageElement).style.transform = "scale(1.06)")}
                      onMouseLeave={e => ((e.target as HTMLImageElement).style.transform = "scale(1)")} />
                  </div>
                  {/* Tag badge */}
                  <div style={{ position: "absolute", top: "12px", left: "12px", background: TERRA, color: "white", borderRadius: "100px", padding: "5px 14px", fontSize: "0.58rem", fontWeight: 800 }}>{room.tag}</div>
                  {/* Small decorative blob */}
                  <div className="org-float2" style={{ position: "absolute", bottom: "-20px", right: isEven ? "-20px" : "auto", left: isEven ? "auto" : "-20px", width: "64px", height: "64px", borderRadius: i % 2 === 0 ? BLOB1 : "50%", background: `rgba(61,110,53,0.14)`, border: "2px solid rgba(61,110,53,0.2)" }} />
                </div>
                {/* Text */}
                <div style={{ direction: "ltr" }}>
                  <div style={{ width: "44px", height: "3px", background: TERRA, borderRadius: "2px", marginBottom: "22px" }} />
                  <h3 style={{ fontFamily: serif, fontSize: "clamp(1.4rem,2.8vw,2.2rem)", fontWeight: 700, fontStyle: "italic", color: FOREST, marginBottom: "14px", lineHeight: 1.2 }}>{room.name}</h3>
                  <p style={{ fontSize: "0.84rem", color: MUTED, lineHeight: 1.85, marginBottom: "20px" }}>{room.desc}</p>
                  <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
                    {[room.cap, room.sqm].map(t => <span key={t} style={{ fontSize: "0.64rem", background: "rgba(61,110,53,0.1)", color: GREEN, padding: "5px 14px", borderRadius: "100px", fontWeight: 700, border: "1px solid rgba(61,110,53,0.2)" }}>{t}</span>)}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <p style={{ fontSize: "0.54rem", color: MUTED, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "2px" }}>Mulai dari</p>
                      <p style={{ fontSize: "1.5rem", fontWeight: 900, color: TERRA, lineHeight: 1 }}>{room.price}<span style={{ fontSize: "0.62rem", fontWeight: 400, color: MUTED }}>/malam</span></p>
                    </div>
                    <a href="#" style={{ background: FOREST, color: "white", padding: "12px 26px", borderRadius: "100px", fontSize: "0.72rem", fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }} className="hover:opacity-80 transition-opacity">Pesan <ArrowRight size={13} /></a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Noah Ark callout */}
        <div style={{ marginTop: "80px", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "auto 1fr auto", gap: "20px", alignItems: "center", background: FOREST, borderRadius: BLOB1, padding: "32px 40px", color: "white" }}>
          <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "rgba(200,84,30,0.2)", border: "2px solid rgba(200,84,30,0.35)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Users size={24} color={TERRA} /></div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "5px" }}>
              <h3 style={{ fontFamily: serif, fontSize: "1.1rem", fontStyle: "italic", fontWeight: 700, color: "white" }}>{NOAH_ARK.name}</h3>
              <span style={{ fontSize: "0.55rem", background: TERRA, color: "white", padding: "3px 10px", borderRadius: "100px", fontWeight: 700 }}>Eksklusif</span>
            </div>
            <p style={{ fontSize: "0.76rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>{NOAH_ARK.desc}</p>
            <p style={{ fontSize: "0.65rem", fontWeight: 700, color: "rgba(200,84,30,0.85)", marginTop: "6px" }}>{NOAH_ARK.cap}</p>
          </div>
          <a href="#" style={{ background: TERRA, color: "white", padding: "13px 26px", borderRadius: "100px", fontSize: "0.74rem", fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center", gap: "7px", flexShrink: 0 }} className="hover:opacity-90 transition-opacity"><MessageCircle size={14} /> Tanya via WA</a>
        </div>
      </section>

      {/* ── Gallery ── organic scattered shapes */}
      <section style={{ padding: isMobile ? "60px 24px" : "80px 60px", background: "rgba(61,110,53,0.04)", clipPath: "polygon(0 3%, 100% 0, 100% 97%, 0 100%)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "48px" }}>
          <div>
            <p style={{ fontSize: "0.62rem", letterSpacing: "0.45em", color: TERRA, textTransform: "uppercase", fontWeight: 700, marginBottom: "8px" }}>Galeri Foto</p>
            <h2 style={{ fontFamily: serif, fontSize: "clamp(1.7rem,4vw,3rem)", fontWeight: 700, fontStyle: "italic", color: FOREST }}>Suasana &amp; Fasilitas</h2>
          </div>
          <button onClick={() => {}} style={{ color: GREEN, background: "none", border: "none", cursor: "pointer", fontSize: "0.72rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px" }}>Lihat Semua <ArrowRight size={13} /></button>
        </div>

        {isMobile ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {GALLERY.slice(0,4).map((img, i) => (
              <div key={i} style={{ aspectRatio: "1", borderRadius: [BLOB1,"50%",BLOB3,"20px 60px 20px 60px"][i], overflow: "hidden", boxShadow: "12px 12px 30px rgba(26,42,21,0.1)" }}>
                <img src={img.src} alt={img.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gridAutoRows: "200px", gap: "14px" }}>
            <div style={{ gridColumn: "1/5", gridRow: "1/3", borderRadius: BLOB1, overflow: "hidden", boxShadow: "20px 24px 48px rgba(26,42,21,0.12)", transform: "rotate(-2.5deg)", transition: "transform 0.5s ease" }} className="group cursor-pointer hover:!rotate-0">
              <img src={GALLERY[0].src} alt={GALLERY[0].label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div style={{ gridColumn: "5/8", gridRow: "1/2", borderRadius: "50%", overflow: "hidden", boxShadow: "16px 16px 40px rgba(26,42,21,0.1)" }} className="group cursor-pointer">
              <img src={GALLERY[1].src} alt={GALLERY[1].label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div style={{ gridColumn: "8/13", gridRow: "1/3", borderRadius: "40% 60% 50% 50% / 30% 30% 70% 70%", overflow: "hidden", boxShadow: "20px 24px 48px rgba(26,42,21,0.12)", transform: "rotate(2deg)" }} className="group cursor-pointer hover:!rotate-0 transition-transform duration-500">
              <img src={GALLERY[5].src} alt={GALLERY[5].label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div style={{ gridColumn: "5/8", gridRow: "2/3", borderRadius: BLOB3, overflow: "hidden", boxShadow: "16px 16px 40px rgba(26,42,21,0.1)" }} className="group cursor-pointer">
              <img src={GALLERY[2].src} alt={GALLERY[2].label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div style={{ gridColumn: "1/5", gridRow: "3/4", borderRadius: BLOB2, overflow: "hidden", boxShadow: "16px 16px 40px rgba(26,42,21,0.1)", transform: "rotate(1.5deg)" }} className="group cursor-pointer hover:!rotate-0 transition-transform duration-500">
              <img src={GALLERY[3].src} alt={GALLERY[3].label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div style={{ gridColumn: "5/9", gridRow: "3/4", borderRadius: "20px 60px 20px 60px", overflow: "hidden", boxShadow: "16px 16px 40px rgba(26,42,21,0.1)" }} className="group cursor-pointer">
              <img src={GALLERY[4].src} alt={GALLERY[4].label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div style={{ gridColumn: "9/13", gridRow: "3/4", borderRadius: "50%", overflow: "hidden", boxShadow: "16px 16px 40px rgba(26,42,21,0.1)", transform: "rotate(-1deg)" }} className="group cursor-pointer hover:!rotate-0 transition-transform duration-500">
              <img src={IMGS.pool} alt="Kolam renang" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        )}
      </section>

      {/* ── Facilities ── circular grid */}
      <section style={{ padding: isMobile ? "80px 24px" : "100px 60px", marginTop: "-30px" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <p style={{ fontSize: "0.62rem", letterSpacing: "0.45em", color: TERRA, textTransform: "uppercase", fontWeight: 700, marginBottom: "8px" }}>Fasilitas Resort</p>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(1.7rem,4vw,3rem)", fontWeight: 700, fontStyle: "italic", color: FOREST }}>Fasilitas Unggulan</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(3,1fr)", gap: "40px", maxWidth: "820px", margin: "0 auto" }}>
          {FACILITIES.map(({ Icon, name, desc }, i) => (
            <div key={name} style={{ textAlign: "center" }} className="group">
              <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: i % 2 === 0 ? "rgba(61,110,53,0.1)" : "rgba(200,84,30,0.08)", border: `2px solid ${i % 2 === 0 ? "rgba(61,110,53,0.22)" : "rgba(200,84,30,0.18)"}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", transition: "transform 0.35s ease" }}
                className="group-hover:scale-110">
                <Icon size={28} color={i % 2 === 0 ? GREEN : TERRA} />
              </div>
              <p style={{ fontSize: "0.86rem", fontWeight: 800, color: FOREST, marginBottom: "5px" }}>{name}</p>
              <p style={{ fontSize: "0.68rem", color: MUTED, lineHeight: 1.55 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Video Showcase ── */}
      <section style={{ padding: isMobile ? "60px 24px" : "80px 60px", background: FOREST, clipPath: "polygon(0 5%, 100% 0, 100% 95%, 0 100%)" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p style={{ fontSize: "0.62rem", letterSpacing: "0.45em", color: "rgba(200,84,30,0.8)", textTransform: "uppercase", fontWeight: 700, marginBottom: "9px" }}>Video Showcase</p>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(1.7rem,4vw,3rem)", fontWeight: 700, fontStyle: "italic", color: "white" }}>Rasakan Suasana Oase</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr", gap: "16px", maxWidth: "1100px", margin: "0 auto" }}>
          {/* Featured */}
          <div style={{ borderRadius: BLOB1, overflow: "hidden", position: "relative", aspectRatio: isMobile ? "16/9" : "4/3", cursor: "pointer" }} className="group">
            <img src={VIDEOS[0].thumb} alt={VIDEOS[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,25,10,0.75) 0%, rgba(0,0,0,0.1) 60%)" }} />
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
              <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "rgba(200,84,30,0.88)", border: "2px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 16px rgba(200,84,30,0.18)", transition: "transform 0.3s ease" }} className="group-hover:scale-110">
                <Play size={24} color="white" fill="white" style={{ marginLeft: "3px" }} />
              </div>
            </div>
            <div style={{ position: "absolute", bottom: "20px", left: "24px" }}>
              <p style={{ fontSize: "1rem", fontWeight: 800, color: "white", marginBottom: "2px" }}>{VIDEOS[0].title}</p>
              <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.65)" }}>{VIDEOS[0].sub} · {VIDEOS[0].dur}</p>
            </div>
          </div>
          {/* Side videos */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {VIDEOS.slice(1).map((v, i) => (
              <div key={i} style={{ borderRadius: i === 0 ? BLOB2 : i === 1 ? "50px 16px 50px 16px" : BLOB3, overflow: "hidden", position: "relative", flex: 1, cursor: "pointer", minHeight: "100px" }} className="group">
                <img src={v.thumb} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" style={{ minHeight: "100px" }} />
                <div style={{ position: "absolute", inset: 0, background: "rgba(15,25,10,0.52)", display: "flex", alignItems: "center", gap: "12px", padding: "14px 18px" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(200,84,30,0.8)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Play size={12} color="white" fill="white" style={{ marginLeft: "2px" }} />
                  </div>
                  <div>
                    <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "white" }}>{v.title}</p>
                    <p style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.55)" }}>{v.dur}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── full-bleed with organic shapes */}
      <section style={{ position: "relative", padding: isMobile ? "100px 24px" : "130px 60px", overflow: "hidden", clipPath: "polygon(0 0, 100% 5%, 100% 100%, 0 95%)", marginTop: "-40px" }}>
        <img src={IMGS.heroDark} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(12,22,10,0.78)" }} />
        {/* Decorative organic accents */}
        <div style={{ position: "absolute", width: "450px", height: "450px", borderRadius: BLOB2, background: "rgba(200,84,30,0.12)", top: "-150px", right: "-100px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: "300px", height: "300px", borderRadius: "50%", background: "rgba(61,110,53,0.1)", bottom: "-100px", left: "-80px", pointerEvents: "none" }} />
        <div style={{ position: "relative", textAlign: "center", color: "white" }}>
          <p style={{ fontSize: "0.62rem", letterSpacing: "0.55em", color: "rgba(200,84,30,0.88)", textTransform: "uppercase", fontWeight: 700, marginBottom: "14px" }}>Booking Langsung Lebih Mudah</p>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(2rem,5.5vw,4.5rem)", fontWeight: 700, fontStyle: "italic", lineHeight: 1.08, marginBottom: "18px" }}>Harga Terbaik Dijamin</h2>
          <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.68)", maxWidth: "420px", margin: "0 auto 32px", lineHeight: 1.9 }}>Booking langsung via WhatsApp untuk harga spesial, sarapan gratis, dan keuntungan eksklusif tamu Oase Green Forest.</p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#" style={{ background: TERRA, color: "white", padding: "15px 34px", borderRadius: "100px", fontSize: "0.8rem", fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }} className="hover:opacity-90 transition-opacity"><MessageCircle size={15} /> Booking via WhatsApp</a>
            <a href="#" style={{ border: "1.5px solid rgba(255,255,255,0.35)", color: "white", padding: "15px 34px", borderRadius: "100px", fontSize: "0.8rem", fontWeight: 600, textDecoration: "none" }} className="hover:bg-white/10 transition-all">Lihat Paket</a>
          </div>
        </div>
      </section>

      {/* ── Reviews ── rotated cards */}
      <section style={{ padding: isMobile ? "80px 24px" : "100px 60px" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <p style={{ fontSize: "0.62rem", letterSpacing: "0.45em", color: TERRA, textTransform: "uppercase", fontWeight: 700, marginBottom: "8px" }}>Ulasan Tamu</p>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(1.7rem,4vw,3rem)", fontWeight: 700, fontStyle: "italic", color: FOREST }}>Apa Kata Tamu Kami?</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: "28px" }}>
          {REVIEWS.map((r, i) => (
            <div key={r.name} style={{ background: "white", borderRadius: i === 1 ? BLOB1 : "24px", padding: "32px 28px", boxShadow: "20px 24px 56px rgba(26,42,21,0.07)", transform: `rotate(${[-1.2,0,1.2][i]}deg)`, transition: "transform 0.4s ease" }}
              onMouseEnter={e => (e.currentTarget.style.transform = "rotate(0deg)")}
              onMouseLeave={e => (e.currentTarget.style.transform = `rotate(${[-1.2,0,1.2][i]}deg)`)}>
              <div style={{ fontSize: "0.56rem", background: i % 2 === 0 ? "rgba(200,84,30,0.1)" : "rgba(61,110,53,0.1)", color: i % 2 === 0 ? TERRA : GREEN, padding: "4px 11px", borderRadius: "100px", display: "inline-block", marginBottom: "12px", fontWeight: 700 }}>{r.type}</div>
              <StarRow count={r.stars} color={TERRA} />
              <p style={{ fontFamily: serif, fontSize: "0.9rem", lineHeight: 1.85, color: MUTED, marginBottom: "20px", fontStyle: "italic" }}>"{r.text}"</p>
              <div style={{ borderTop: "1px solid rgba(26,42,21,0.08)", paddingTop: "14px" }}>
                <p style={{ fontSize: "0.82rem", fontWeight: 800, color: FOREST }}>{r.name}</p>
                <p style={{ fontSize: "0.66rem", color: MUTED }}>{r.loc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: FOREST, color: "rgba(255,255,255,0.68)", padding: isMobile ? "80px 24px 40px" : "80px 60px 40px", clipPath: "polygon(0 6%, 100% 0, 100% 100%, 0 100%)" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 1fr 1fr", gap: "40px", marginBottom: "48px" }}>
          <div>
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: "1.8rem", fontWeight: 700, color: "white", letterSpacing: "0.22em", marginBottom: "4px" }}>OASE</div>
            <p style={{ fontSize: "0.5rem", letterSpacing: "0.32em", color: "rgba(200,84,30,0.65)", textTransform: "uppercase", marginBottom: "14px" }}>Green Forest Resort · Parongpong, Bandung</p>
            <p style={{ fontSize: "0.76rem", lineHeight: 1.85, color: "rgba(255,255,255,0.4)", maxWidth: "260px" }}>A tranquil nature-inspired retreat in the highlands of Bandung. Bagian dari BIG Group.</p>
          </div>
          {[["Navigasi",["Tipe Kamar","Fasilitas","Galeri","Event","Lokasi","Kontak"]], ["Kontak",[CONTACT.wa, CONTACT.email, CONTACT.ig]]].map(([title, items]) => (
            <div key={title as string}>
              <p style={{ fontSize: "0.58rem", letterSpacing: "0.22em", fontWeight: 700, color: "rgba(200,84,30,0.65)", textTransform: "uppercase", marginBottom: "14px" }}>{title as string}</p>
              {(items as string[]).map(item => <a key={item} href="#" style={{ display: "block", fontSize: "0.74rem", color: "rgba(255,255,255,0.42)", textDecoration: "none", marginBottom: "8px" }} className="hover:text-white transition-colors">{item}</a>)}
            </div>
          ))}
          <div>
            <p style={{ fontSize: "0.58rem", letterSpacing: "0.22em", fontWeight: 700, color: "rgba(200,84,30,0.65)", textTransform: "uppercase", marginBottom: "14px" }}>Lokasi</p>
            <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>{CONTACT.address}</p>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "20px", textAlign: "center", fontSize: "0.62rem", color: "rgba(255,255,255,0.2)" }}>
          © 2025 Oase Green Forest Resort · Parongpong, Kab. Bandung Barat · Bagian dari BIG Group
        </div>
      </footer>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState<StyleOption>("glassy");
  const [copied, setCopied] = useState(false);

  const opts: { id: StyleOption; label: string }[] = [
    { id: "glassy",       label: "① Glassy"          },
    { id: "glassmorphic", label: "② Glassmorphic"    },
    { id: "botanical",    label: "③ Dark Botanical"  },
    { id: "organic",      label: "④ Organic Luxury"  },
  ];

  function handleCopyDesign() {
    const el = document.getElementById("oase-page");
    if (!el) return;
    const styles = Array.from(document.styleSheets)
      .flatMap(s => { try { return Array.from(s.cssRules).map(r => r.cssText); } catch { return []; } })
      .join("\n");
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${styles}</style></head><body>${el.outerHTML}</body></html>`;
    navigator.clipboard.writeText(html).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

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
      <div style={{ width: "1px", background: "rgba(255,255,255,0.15)", margin: "4px 2px" }} />
      <button onClick={handleCopyDesign}
        style={{ padding: "6px 15px", borderRadius: "100px", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.04em", border: "none", cursor: "pointer", fontFamily: "'Montserrat', sans-serif", transition: "all 0.22s ease", background: copied ? "rgba(120,220,120,0.85)" : "rgba(255,255,255,0.12)", color: copied ? "#0a1e0a" : "rgba(255,255,255,0.75)" }}>
        {copied ? "✓ Copied!" : "Copy Design"}
      </button>
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
        {active === "organic"      && <OrganicHome />}
      </div>
    </>
  );
}
