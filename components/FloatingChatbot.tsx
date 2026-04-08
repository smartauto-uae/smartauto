"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Send, Phone, ChevronRight, Zap } from "lucide-react";

// ── CONSTANTS ──────────────────────────────────────────────────────────────

const gold     = "#C9A84C";
const goldGrad = "linear-gradient(135deg,#C9A84C,#E8C96A)";
const WA_NUM   = "971524403677";
const PHONE    = "+971 52 440 3677";
const waLink   = (msg: string) =>
  `https://wa.me/${WA_NUM}?text=${encodeURIComponent(msg)}`;

// ── TYPES ──────────────────────────────────────────────────────────────────

type Role    = "bot" | "user";
type MsgType = "text" | "options" | "booking";

type Option = {
  label: string;
  value: string;
};

type Message = {
  id: number;
  role: Role;
  type: MsgType;
  text: string;
  options?: Option[];
};

// ── CONVERSATION DATA ──────────────────────────────────────────────────────

const SERVICES: Option[] = [
  { label: "Car Window Tinting",        value: "Car Window Tinting" },
  { label: "Paint Protection Film",     value: "Paint Protection Film" },
  { label: "Colour PPF",                value: "Colour PPF" },
  { label: "Nano Ceramic Coating",      value: "Nano Ceramic Coating" },
  { label: "Car Detailing & Polishing", value: "Car Detailing & Polishing" },
  { label: "Car Wrapping",              value: "Car Wrapping" },
  { label: "Commercial Tinting",        value: "Commercial Tinting" },
  { label: "Marine Window Tinting",     value: "Marine Window Tinting" },
  { label: "Residential Tinting",       value: "Residential Tinting" },
  { label: "Surface Protection Film",   value: "Surface Protection Film" },
];

const BRANCHES: Option[] = [
  { label: "MotorCity, Dubai",       value: "MotorCity Dubai" },
  { label: "Al Quoz, Dubai",         value: "Al Quoz Dubai" },
  { label: "Mirdif · Uptown Mall",   value: "Mirdif Dubai" },
  { label: "Central Mall, Sharjah",  value: "Central Mall Sharjah" },
];

const SERVICE_INFO: Record<string, string> = {
  "Car Window Tinting":
    "We install 3M, TotalGard & Global USA window films for cars. Blocks up to 90% solar heat, 99% UV & 95% glare. All 4 branches. Prices from AED 200.",
  "Paint Protection Film":
    "PPF shields your paint from rock chips, scratches & swirls. Invisible self-healing film from 3M & TotalGard. Partial packages from AED 800, full car from AED 8,000.",
  "Colour PPF":
    "Change your car's look AND protect the paint — available in matte, satin, gloss & colour-shift finishes. Thicker than vinyl wraps with self-healing properties.",
  "Nano Ceramic Coating":
    "Professional 9H nano ceramic coating for long-lasting gloss, hydrophobic protection & UV resistance. Multi-year manufacturer warranty available.",
  "Car Detailing & Polishing":
    "Full interior & exterior detailing, machine polishing & paint correction at all 4 branches. Restore your car to showroom condition.",
  "Car Wrapping":
    "Full & partial car wraps in any colour or finish — matte, gloss, chrome, satin & brushed metal. Premium cast vinyl brands only.",
  "Commercial Tinting":
    "Solar control, privacy & safety films for offices, retail units & commercial buildings across Dubai and Sharjah. On-site installation available.",
  "Marine Window Tinting":
    "Marine-grade films engineered for salt air, high humidity & intense sun reflection off water. On-site installation at your marina berth.",
  "Residential Tinting":
    "Heat-rejection & privacy window films for villas & apartments. Reduce AC bills by up to 30%, block 99% UV & improve privacy. Free site survey.",
  "Surface Protection Film":
    "Ultra-thin clear protection film for marble, granite, countertops, floors & glass surfaces. Invisible, removable & residue-free.",
};

const BRANCH_HOURS: Record<string, string> = {
  "MotorCity Dubai":       "11AM – 9PM daily",
  "Al Quoz Dubai":         "11AM – 9:30PM daily",
  "Mirdif Dubai":          "11AM – 10PM daily",
  "Central Mall Sharjah":  "10AM – 10PM daily",
};

// ── HELPERS ────────────────────────────────────────────────────────────────

let msgId = 0;
const newId = () => ++msgId;

const botMsg = (text: string, type: MsgType = "text", options?: Option[]): Message => ({
  id: newId(), role: "bot", type, text, options,
});

const userMsg = (text: string): Message => ({
  id: newId(), role: "user", type: "text", text,
});

// ── GREETING ───────────────────────────────────────────────────────────────

const GREETING: Message[] = [
  botMsg("Hi! I'm the Smart Auto UAE assistant."),
  botMsg("How can I help you today?", "options", [
    { label: "Find a Service",      value: "find_service" },
    { label: "Book an Appointment", value: "book" },
    { label: "Find a Branch",       value: "branch" },
    { label: "Talk to our team",    value: "human" },
  ]),
];

// ── COMPONENT ──────────────────────────────────────────────────────────────

export default function FloatingChatbot() {
  const [open,            setOpen]            = useState(false);
  const [visible,         setVisible]         = useState(false);
  const [msgs,            setMsgs]            = useState<Message[]>(GREETING);
  const [input,           setInput]           = useState("");
  const [typing,          setTyping]          = useState(false);
  const [dismissed,       setDismissed]       = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [pendingWaMsg,    setPendingWaMsg]    = useState<string>("");
  const bottomRef = useRef<HTMLDivElement>(null);

  // Show bubble after 5 s
  useEffect(() => {
    const t = setTimeout(() => { if (!dismissed) setVisible(true); }, 5000);
    return () => clearTimeout(t);
  }, [dismissed]);

  // Auto-hide bubble after 5 s if chat not opened
  useEffect(() => {
    if (!visible || open) return;
    const t = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(t);
  }, [visible, open]);

  // Scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing]);

  const dismiss = () => { setVisible(false); setOpen(false); setDismissed(true); };

  const addBot = (text: string, type: MsgType = "text", options?: Option[]) =>
    setMsgs((prev) => [...prev, botMsg(text, type, options)]);

  const botReply = (text: string, type: MsgType = "text", options?: Option[], delay = 700) => {
    setTyping(true);
    setTimeout(() => { setTyping(false); addBot(text, type, options); }, delay);
  };

  const chainReply = (
    first: { text: string; type?: MsgType; options?: Option[] },
    second: { text: string; type?: MsgType; options?: Option[] },
  ) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      addBot(first.text, first.type ?? "text", first.options);
      setTimeout(() => {
        setTyping(true);
        setTimeout(() => {
          setTyping(false);
          addBot(second.text, second.type ?? "text", second.options);
        }, 700);
      }, 600);
    }, 700);
  };

  const handleOption = (value: string, label: string) => {
    setMsgs((prev) => [...prev, userMsg(label)]);

    // Main menu
    if (value === "find_service") {
      botReply("Which service are you interested in?", "options", SERVICES);
      return;
    }
    if (value === "branch") {
      botReply("We have 4 branches — all open every day. Which area suits you?", "options", BRANCHES);
      return;
    }
    if (value === "human") {
      botReply("Our team is available every day. Reach us directly:", "booking");
      return;
    }
    if (value === "book") {
      if (selectedService) {
        botReply(
          `Let's book your ${selectedService}. Which branch is closest to you?`,
          "options", BRANCHES,
        );
      } else {
        botReply("Which service would you like to book?", "options", SERVICES);
      }
      return;
    }

    // Service selected
    if (SERVICE_INFO[value]) {
      setSelectedService(value);
      chainReply(
        { text: SERVICE_INFO[value] },
        {
          text: "What would you like to do next?",
          type: "options",
          options: [
            { label: "Book this service",   value: "book" },
            { label: "Find nearest branch", value: "branch" },
            { label: "Get a quote",         value: "quote" },
            { label: "Ask something else",  value: "restart" },
          ],
        },
      );
      return;
    }

    // Branch selected
    if (Object.keys(BRANCH_HOURS).includes(value)) {
      const hours = BRANCH_HOURS[value];
      const waMsg = selectedService
        ? `Hi, I'd like to book a ${selectedService} appointment at your ${value} branch.`
        : `Hi, I'd like to visit your ${value} branch. Can you help me?`;
      setPendingWaMsg(waMsg);
      chainReply(
        { text: `Our ${value} branch is open ${hours}.` },
        { text: waMsg, type: "booking" },
      );
      return;
    }

    // Quote
    if (value === "quote") {
      const waMsg = selectedService
        ? `Hi, I'd like a quote for ${selectedService} at Smart Auto UAE.`
        : "Hi, I'd like to get a quote for your services.";
      setPendingWaMsg(waMsg);
      botReply("Send us your vehicle details on WhatsApp and we'll quote you within minutes:", "booking");
      return;
    }

    // Call
    if (value === "call") {
      botReply("Our team is available every day. Call us anytime:", "booking");
      return;
    }

    // Restart
    if (value === "restart") {
      botReply("How can I help you?", "options", [
        { label: "Find a Service",      value: "find_service" },
        { label: "Book an Appointment", value: "book" },
        { label: "Find a Branch",       value: "branch" },
        { label: "Talk to our team",    value: "human" },
      ]);
      return;
    }
  };

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setMsgs((prev) => [...prev, userMsg(trimmed)]);
    setInput("");
    const lower = trimmed.toLowerCase();

    if (lower.includes("tint") || lower.includes("window")) {
      botReply("We offer window tinting for cars, villas, commercial & marine. Which interests you?", "options", [
        { label: "Car Window Tinting",  value: "Car Window Tinting" },
        { label: "Residential Tinting", value: "Residential Tinting" },
        { label: "Commercial Tinting",  value: "Commercial Tinting" },
        { label: "Marine Tinting",      value: "Marine Window Tinting" },
      ]);
    } else if (lower.includes("ppf") || lower.includes("paint") || lower.includes("protection")) {
      chainReply(
        { text: SERVICE_INFO["Paint Protection Film"] },
        { text: "Would you like to proceed?", type: "options", options: [
          { label: "Book PPF",        value: "book" },
          { label: "Find a Branch",   value: "branch" },
          { label: "Get a Quote",     value: "quote" },
        ]},
      );
    } else if (lower.includes("ceramic")) {
      chainReply(
        { text: SERVICE_INFO["Nano Ceramic Coating"] },
        { text: "What would you like to do?", type: "options", options: [
          { label: "Book Ceramic Coating", value: "book" },
          { label: "Find a Branch",        value: "branch" },
        ]},
      );
    } else if (lower.includes("price") || lower.includes("cost") || lower.includes("how much") || lower.includes("aed")) {
      botReply("Prices vary by service and vehicle. WhatsApp us with your car details and we'll quote you within minutes:", "booking");
    } else if (lower.includes("branch") || lower.includes("location") || lower.includes("where") || lower.includes("address")) {
      botReply("We have 4 branches across Dubai & Sharjah:", "options", BRANCHES);
    } else if (lower.includes("book") || lower.includes("appointment") || lower.includes("schedule")) {
      botReply("Which service would you like to book?", "options", SERVICES);
    } else if (lower.includes("marine") || lower.includes("boat") || lower.includes("yacht")) {
      chainReply(
        { text: SERVICE_INFO["Marine Window Tinting"] },
        { text: "Want to book a site visit?", type: "options", options: [
          { label: "Book Marine Tinting", value: "book" },
          { label: "Talk to our team",    value: "human" },
        ]},
      );
    } else if (lower.includes("villa") || lower.includes("home") || lower.includes("apartment") || lower.includes("residential")) {
      chainReply(
        { text: SERVICE_INFO["Residential Tinting"] },
        { text: "Would you like a free site survey?", type: "options", options: [
          { label: "Book Free Survey", value: "book" },
          { label: "Talk to our team", value: "human" },
        ]},
      );
    } else if (lower.includes("wrap") || lower.includes("colour change")) {
      chainReply(
        { text: SERVICE_INFO["Car Wrapping"] },
        { text: "Next steps:", type: "options", options: [
          { label: "Book Car Wrapping", value: "book" },
          { label: "Find a Branch",     value: "branch" },
        ]},
      );
    } else if (["hi", "hello", "hey", "salam", "salaam"].some((w) => lower.includes(w))) {
      botReply("Hey! How can I help you today?", "options", [
        { label: "Find a Service",      value: "find_service" },
        { label: "Book an Appointment", value: "book" },
        { label: "Find a Branch",       value: "branch" },
      ]);
    } else {
      botReply("I'm not sure about that — but our team can answer anything!", "booking");
    }
  };

  // Resolve WA message for booking cards
  const resolveWaMsg = (msgText: string) => {
    if (msgText.startsWith("Hi,")) return msgText;
    if (pendingWaMsg) return pendingWaMsg;
    if (selectedService) return `Hi, I'd like to book ${selectedService} at Smart Auto UAE.`;
    return "Hi, I'd like to find out more about Smart Auto UAE services.";
  };

  return (
    <>
      {/* ── FLOATING BUTTON (bubble prompt) ── */}
      <AnimatePresence>
        {!open && visible && (
          <motion.div
            className="fixed bottom-6 right-6 z-[200] flex flex-col items-end gap-2"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            {/* Dismiss */}
            <button
              onClick={dismiss}
              aria-label="Dismiss chat"
              style={{
                width: 24, height: 24, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(20,20,20,0.9)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.5)",
                cursor: "pointer",
              }}
            >
              <X size={11} />
            </button>

            {/* Prompt bubble */}
            <motion.div
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "10px 16px",
                borderRadius: "16px 16px 4px 16px",
                background: "rgba(10,10,10,0.97)",
                border: "1px solid rgba(201,168,76,0.25)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                cursor: "pointer",
              }}
              onClick={() => setOpen(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", flexShrink: 0, animation: "pulse 2s infinite" }} />
              <span style={{ fontSize: 13, fontWeight: 500, color: "#fff", whiteSpace: "nowrap" }}>
                Need help finding a service?
              </span>
            </motion.div>

            {/* Gold chat button */}
            <motion.button
              onClick={() => setOpen(true)}
              aria-label="Open chat"
              style={{
                width: 56, height: 56, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: goldGrad,
                boxShadow: "0 4px 24px rgba(201,168,76,0.5)",
                cursor: "pointer", border: "none",
              }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
            >
              <MessageCircle size={24} style={{ color: "#000" }} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── RE-OPEN (idle, not dismissed) ── */}
      <AnimatePresence>
        {!open && !visible && !dismissed && (
          <motion.button
            aria-label="Open chat"
            style={{
              position: "fixed", bottom: 24, right: 24, zIndex: 200,
              width: 56, height: 56, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: goldGrad,
              boxShadow: "0 4px 24px rgba(201,168,76,0.45)",
              border: "none", cursor: "pointer",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            onClick={() => { setVisible(true); setOpen(true); }}
          >
            <MessageCircle size={24} style={{ color: "#000" }} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── RE-OPEN (dismissed) ── */}
      <AnimatePresence>
        {!open && dismissed && (
          <motion.button
            aria-label="Open chat"
            style={{
              position: "fixed", bottom: 24, right: 24, zIndex: 200,
              width: 48, height: 48, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(10,10,10,0.9)",
              border: "1px solid rgba(201,168,76,0.3)",
              color: gold,
              boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
              cursor: "pointer",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            onClick={() => { setDismissed(false); setVisible(true); setOpen(true); }}
          >
            <MessageCircle size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── CHAT WINDOW ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            style={{
              position: "fixed", bottom: 24, right: 24, zIndex: 200,
              width: 360, height: 580,
              display: "flex", flexDirection: "column",
              borderRadius: 24, overflow: "hidden",
              background: "#0A0A0A",
              border: "1px solid rgba(201,168,76,0.2)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.75)",
            }}
            initial={{ opacity: 0, scale: 0.85, y: 20, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
          >

            {/* ── HEADER ── */}
            <div
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "14px 20px",
                background: "linear-gradient(135deg,rgba(201,168,76,0.12),rgba(201,168,76,0.04))",
                borderBottom: "1px solid rgba(201,168,76,0.12)",
                flexShrink: 0,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 36, height: 36, borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: goldGrad, flexShrink: 0,
                  }}
                >
                  <Zap size={16} style={{ color: "#000" }} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#fff", lineHeight: 1.2 }}>
                    Smart Auto UAE
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80" }} />
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.45)" }}>
                      Online · Replies instantly
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                style={{
                  width: 32, height: 32, borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.6)",
                  cursor: "pointer",
                }}
              >
                <X size={15} />
              </button>
            </div>

            {/* ── MESSAGES ── */}
            <div
              style={{
                flex: 1, overflowY: "auto",
                padding: "16px",
                display: "flex", flexDirection: "column", gap: 12,
                scrollbarWidth: "none",
              }}
            >
              {msgs.map((msg) => (
                <div key={msg.id}>

                  {/* Text message */}
                  {msg.role === "bot" && msg.type === "text" && (
                    <motion.div
                      style={{ display: "flex", alignItems: "flex-end", gap: 8 }}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div style={{ width: 24, height: 24, borderRadius: "50%", background: goldGrad, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginBottom: 2 }}>
                        <Zap size={10} style={{ color: "#000" }} />
                      </div>
                      <div style={{ padding: "10px 14px", borderRadius: "16px 16px 16px 4px", fontSize: 13, lineHeight: 1.65, maxWidth: "80%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.85)" }}>
                        {msg.text}
                      </div>
                    </motion.div>
                  )}

                  {/* Options */}
                  {msg.role === "bot" && msg.type === "options" && (
                    <motion.div
                      style={{ display: "flex", flexDirection: "column", gap: 8 }}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
                        <div style={{ width: 24, height: 24, borderRadius: "50%", background: goldGrad, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginBottom: 2 }}>
                          <Zap size={10} style={{ color: "#000" }} />
                        </div>
                        <div style={{ padding: "10px 14px", borderRadius: "16px 16px 16px 4px", fontSize: 13, lineHeight: 1.65, maxWidth: "80%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.85)" }}>
                          {msg.text}
                        </div>
                      </div>
                      <div style={{ paddingLeft: 32, display: "flex", flexDirection: "column", gap: 6 }}>
                        {msg.options?.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => handleOption(opt.value, opt.label)}
                            style={{
                              display: "flex", alignItems: "center", justifyContent: "space-between",
                              padding: "10px 14px",
                              borderRadius: 12, fontSize: 12.5, fontWeight: 500,
                              background: "rgba(201,168,76,0.06)",
                              border: "1px solid rgba(201,168,76,0.2)",
                              color: "rgba(255,255,255,0.75)",
                              cursor: "pointer", textAlign: "left",
                              transition: "all 180ms ease",
                            }}
                            onMouseEnter={(e) => {
                              const el = e.currentTarget as HTMLElement
                              el.style.background = "rgba(201,168,76,0.12)"
                              el.style.borderColor = "rgba(201,168,76,0.35)"
                              el.style.color = "#fff"
                              el.style.transform = "translateY(-1px)"
                            }}
                            onMouseLeave={(e) => {
                              const el = e.currentTarget as HTMLElement
                              el.style.background = "rgba(201,168,76,0.06)"
                              el.style.borderColor = "rgba(201,168,76,0.2)"
                              el.style.color = "rgba(255,255,255,0.75)"
                              el.style.transform = "translateY(0)"
                            }}
                          >
                            {opt.label}
                            <ChevronRight size={13} style={{ color: gold, flexShrink: 0 }} />
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Booking CTA card */}
                  {msg.role === "bot" && msg.type === "booking" && (
                    <motion.div
                      style={{ display: "flex", flexDirection: "column", gap: 8 }}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
                        <div style={{ width: 24, height: 24, borderRadius: "50%", background: goldGrad, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginBottom: 2 }}>
                          <Zap size={10} style={{ color: "#000" }} />
                        </div>
                        <div style={{ padding: "10px 14px", borderRadius: "16px 16px 16px 4px", fontSize: 13, lineHeight: 1.65, maxWidth: "80%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.85)" }}>
                          {msg.text.startsWith("Hi,") ? "Tap below to confirm your booking" : msg.text}
                        </div>
                      </div>
                      <div style={{ paddingLeft: 32, display: "flex", flexDirection: "column", gap: 8 }}>
                        {/* WhatsApp CTA */}
                        <a
                          href={waLink(resolveWaMsg(msg.text))}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                            padding: "11px 16px", borderRadius: 12,
                            fontSize: 13, fontWeight: 700,
                            background: "#25D366", color: "#fff",
                            textDecoration: "none",
                            boxShadow: "0 4px 16px rgba(37,211,102,0.3)",
                            transition: "transform 150ms ease, box-shadow 150ms ease",
                          }}
                          onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-1px)"; el.style.boxShadow = "0 6px 20px rgba(37,211,102,0.4)" }}
                          onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0)"; el.style.boxShadow = "0 4px 16px rgba(37,211,102,0.3)" }}
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                          Book via WhatsApp
                        </a>
                        {/* Call */}
                        <a
                          href="tel:+971524403677"
                          style={{
                            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                            padding: "10px 16px", borderRadius: 12,
                            fontSize: 12.5, fontWeight: 600,
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "rgba(255,255,255,0.7)",
                            textDecoration: "none",
                            transition: "all 150ms ease",
                          }}
                          onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = "#fff"; el.style.borderColor = "rgba(255,255,255,0.2)" }}
                          onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = "rgba(255,255,255,0.7)"; el.style.borderColor = "rgba(255,255,255,0.1)" }}
                        >
                          <Phone size={13} aria-hidden="true" /> Call {PHONE}
                        </a>
                      </div>
                    </motion.div>
                  )}

                  {/* User message */}
                  {msg.role === "user" && (
                    <motion.div
                      style={{ display: "flex", justifyContent: "flex-end" }}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div style={{ padding: "10px 14px", borderRadius: "16px 16px 4px 16px", fontSize: 13, lineHeight: 1.65, maxWidth: "75%", background: goldGrad, color: "#000", fontWeight: 500 }}>
                        {msg.text}
                      </div>
                    </motion.div>
                  )}

                </div>
              ))}

              {/* Typing indicator */}
              <AnimatePresence>
                {typing && (
                  <motion.div
                    style={{ display: "flex", alignItems: "flex-end", gap: 8 }}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: goldGrad, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Zap size={10} style={{ color: "#000" }} />
                    </div>
                    <div style={{ padding: "12px 16px", borderRadius: "16px 16px 16px 4px", display: "flex", alignItems: "center", gap: 5, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}>
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.4)" }}
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={bottomRef} />
            </div>

            {/* ── INPUT ── */}
            <div
              style={{
                padding: "12px 16px", flexShrink: 0,
                display: "flex", alignItems: "center", gap: 8,
                borderTop: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                style={{
                  flex: 1, padding: "10px 14px",
                  borderRadius: 12, fontSize: 13,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#fff", outline: "none",
                  caretColor: gold,
                }}
              />
              <button
                onClick={handleSend}
                aria-label="Send message"
                style={{
                  width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: input.trim() ? goldGrad : "rgba(255,255,255,0.05)",
                  border: input.trim() ? "none" : "1px solid rgba(255,255,255,0.08)",
                  color: input.trim() ? "#000" : "rgba(255,255,255,0.3)",
                  cursor: input.trim() ? "pointer" : "default",
                  transition: "all 180ms ease",
                }}
              >
                <Send size={15} />
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}