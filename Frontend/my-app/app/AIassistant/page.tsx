"use client";

import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import HealthAndSafetyRoundedIcon from "@mui/icons-material/HealthAndSafetyRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import Navbar from "@/components/layout/Navbar";

interface ChatMessage {
  id: number;
  role: "assistant" | "user";
  text: string;
}

const quickPrompts = [
  {
    title: "Find a doctor",
    description: "Explore doctors by specialty and location",
    prompt: "Help me find the right doctor.",
    icon: <SearchRoundedIcon />,
    color: "#0D9488",
    bg: "#CCFBF1",
  },
  {
    title: "Appointments",
    description: "Understand booking and consultation options",
    prompt: "How can I book a doctor appointment?",
    icon: <CalendarMonthRoundedIcon />,
    color: "#2563EB",
    bg: "#DBEAFE",
  },
  {
    title: "Health information",
    description: "Get general, easy-to-understand health information",
    prompt: "Give me general tips for a healthier routine.",
    icon: <FavoriteBorderRoundedIcon />,
    color: "#DB2777",
    bg: "#FCE7F3",
  },
  {
    title: "Internships",
    description: "Explore healthcare learning opportunities",
    prompt: "How do I find healthcare internships?",
    icon: <WorkOutlineRoundedIcon />,
    color: "#7C3AED",
    bg: "#EDE9FE",
  },
];

function getAssistantReply(message: string): string {
  const text = message.toLowerCase();
  if (text.includes("doctor") || text.includes("specialist")) {
    return "I can help you work out which type of doctor to look for. You can browse verified provider profiles on the Find Doctors page and compare specialties, consultation types, location, and fees. If you share your general concern and city, I can suggest what type of specialist may be appropriate—but I can’t diagnose a condition.";
  }
  if (text.includes("appointment") || text.includes("book") || text.includes("consultation")) {
    return "To arrange a consultation, open Find Doctors, choose a provider, review their profile and available consultation options, then follow the booking steps. Availability and booking will depend on the provider’s listed schedule.";
  }
  if (text.includes("internship") || text.includes("job") || text.includes("career")) {
    return "For healthcare internships, start with the Internships page. Filter opportunities by field, city, and internship type, then check the eligibility requirements and deadline before applying. Keep your CV and relevant academic documents ready.";
  }
  if (text.includes("healthy") || text.includes("routine") || text.includes("health tips")) {
    return "A helpful starting point is a consistent sleep schedule, regular movement, balanced meals, enough water, and routine preventive care. Choose small changes you can maintain. For advice tailored to symptoms or a medical condition, speak with a qualified healthcare professional.";
  }
  return "Thanks for your question. I can help you navigate HealthConnect AI, find the right kind of healthcare professional, understand appointment steps, explore internships, or share general health information. Tell me a little more about what you need.";
}

export default function AIAssistantPage() {
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "assistant",
      text: "Hi there! 👋 I’m your HealthConnect AI assistant. I can help you explore healthcare services, understand appointment steps, discover internships, and find general health information. What can I help you with today?",
    },
  ]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isThinking) return;
    const userMessage: ChatMessage = { id: Date.now(), role: "user", text: trimmed };
    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsThinking(true);
    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        { id: Date.now() + 1, role: "assistant", text: getAssistantReply(trimmed) },
      ]);
      setIsThinking(false);
    }, 900);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F7FAFC",
        color: "#102A43",
        backgroundImage:
          "radial-gradient(circle at 8% 4%, rgba(204,251,241,0.7) 0, transparent 25%), radial-gradient(circle at 95% 30%, rgba(219,234,254,0.55) 0, transparent 24%)",
        "@keyframes float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-7px)" },
        },
        "@keyframes pulseGlow": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(13,148,136,0.16)" },
          "50%": { boxShadow: "0 0 0 12px rgba(13,148,136,0)" },
        },
      }}
    >
      {/* Navbar */}
      <Navbar />

      <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
        {/* Hero */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            mb: 4,
            overflow: "hidden",
            position: "relative",
            borderRadius: { xs: "24px", md: "32px" },
            color: "white",
            background: "linear-gradient(120deg, #102A43 0%, #164E63 52%, #0D9488 100%)",
          }}
        >
          <Box sx={{ position: "absolute", width: 280, height: 280, borderRadius: "50%", bgcolor: "rgba(255,255,255,0.06)", right: { xs: -100, md: 100 }, top: -130 }} />
          <Box sx={{ position: "absolute", width: 170, height: 170, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.16)", right: { xs: -50, md: 280 }, bottom: -100 }} />
          
          <Grid container spacing={3} sx={{ alignItems: "center", position: "relative" }}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Chip
                icon={<AutoAwesomeRoundedIcon />}
                label="YOUR PERSONAL HEALTHCARE GUIDE"
                sx={{
                  mb: 2.5,
                  bgcolor: "rgba(204,251,241,0.14)",
                  color: "#99F6E4",
                  fontWeight: 800,
                  letterSpacing: ".04em",
                  "& .MuiChip-icon": { color: "#99F6E4" },
                  border: "1px solid rgba(153,246,228,0.24)",
                }}
              />
              <Typography component="h1" sx={{ fontSize: { xs: "2.25rem", sm: "3rem", md: "3.65rem" }, lineHeight: 1.08, fontWeight: 900, letterSpacing: "-.045em", maxWidth: 760 }}>
                Meet your smarter <Box component="span" sx={{ color: "#99F6E4" }}>healthcare</Box> assistant.
              </Typography>
              <Typography sx={{ mt: 2, maxWidth: 660, color: "rgba(255,255,255,0.78)", lineHeight: 1.8, fontSize: { xs: ".98rem", md: "1.08rem" } }}>
                Ask questions, explore care options, and find your next step—all in one friendly place.
              </Typography>
              <Stack direction="row" spacing={1.2} useFlexGap sx={{ mt: 3,flexWrap:"wrap"  }}>
                <Chip icon={<SmartToyRoundedIcon />} label="Friendly guidance" sx={{ bgcolor: "rgba(255,255,255,0.1)", color: "white", "& .MuiChip-icon": { color: "#99F6E4" } }} />
                <Chip icon={<HealthAndSafetyRoundedIcon />} label="Privacy-minded" sx={{ bgcolor: "rgba(255,255,255,0.1)", color: "white", "& .MuiChip-icon": { color: "#99F6E4" } }} />
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ display: "flex", justifyContent: { xs: "flex-start", md: "center" }, mt: { xs: 1, md: 0 } }}>
                <Box sx={{ width: 180, height: 180, borderRadius: "50%", bgcolor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", display: "grid", placeItems: "center", animation: "float 4s ease-in-out infinite", position: "relative" }}>
                  <Box sx={{ width: 124, height: 124, borderRadius: "38px", bgcolor: "#CCFBF1", color: "#0D9488", display: "grid", placeItems: "center", transform: "rotate(-7deg)", boxShadow: "0 18px 40px rgba(0,0,0,0.18)", animation: "pulseGlow 3s ease-in-out infinite" }}>
                    <AutoAwesomeRoundedIcon sx={{ fontSize: 66, transform: "rotate(7deg)" }} />
                  </Box>
                  <Box sx={{ position: "absolute", top: 12, right: 0, width: 18, height: 18, borderRadius: "50%", bgcolor: "#FDE68A", border: "4px solid #164E63" }} />
                  <Box sx={{ position: "absolute", bottom: 18, left: 2, width: 12, height: 12, borderRadius: "50%", bgcolor: "#99F6E4" }} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        <Grid container spacing={3}>
          {/* Chat panel */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Paper elevation={0} sx={{ border: "1px solid #E2E8F0", borderRadius: "26px", overflow: "hidden", bgcolor: "white", boxShadow: "0 14px 40px rgba(16,42,67,0.05)" }}>
              <Box sx={{ px: { xs: 2, md: 3 }, py: 2, borderBottom: "1px solid #EAF0F5", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
                <Stack direction="row" spacing={1.5}  sx={{alignItems:"center"}}>
                  <Box sx={{ position: "relative" }}>
                    <Avatar sx={{ bgcolor: "#CCFBF1", color: "#0D9488", width: 46, height: 46 }}><AutoAwesomeRoundedIcon /></Avatar>
                    <Box sx={{ position: "absolute", width: 11, height: 11, borderRadius: "50%", bgcolor: "#22C55E", border: "2px solid white", right: 0, bottom: 0 }} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 850, color: "#102A43" }}>HealthConnect Assistant</Typography>
                    <Typography sx={{ fontSize: ".78rem", color: "#0D9488" }}>Here to help you navigate care</Typography>
                  </Box>
                </Stack>
                <Button startIcon={<AddRoundedIcon />} onClick={() => { setMessages([{ id: Date.now(), role: "assistant", text: "New chat started! What would you like help with today?" }]); setInput(""); }} sx={{ textTransform: "none", color: "#526579", fontWeight: 750, display: { xs: "none", sm: "inline-flex" } }}>New chat</Button>
              </Box>

              <Box sx={{ minHeight: 370, maxHeight: 510, overflowY: "auto", px: { xs: 2, md: 3 }, py: 3, bgcolor: "#FBFDFE" }}>
                <Typography sx={{ textAlign: "center", color: "#94A3B8", fontSize: ".72rem", fontWeight: 750, letterSpacing: ".12em", mb: 3 }}>TODAY · YOUR CONVERSATION</Typography>
                <Stack spacing={2.5}>
                  {messages.map((message) => (
                    <Box key={message.id} sx={{ display: "flex", justifyContent: message.role === "user" ? "flex-end" : "flex-start", gap: 1.2, alignItems: "flex-start" }}>
                      {message.role === "assistant" && <Avatar sx={{ width: 32, height: 32, bgcolor: "#CCFBF1", color: "#0D9488" }}><SmartToyRoundedIcon sx={{ fontSize: 18 }} /></Avatar>}
                      <Paper elevation={0} sx={{ maxWidth: { xs: "88%", sm: "78%" }, p: 2, borderRadius: message.role === "user" ? "18px 18px 4px 18px" : "4px 18px 18px 18px", bgcolor: message.role === "user" ? "#102A43" : "white", color: message.role === "user" ? "white" : "#334155", border: message.role === "assistant" ? "1px solid #E2E8F0" : "none", boxShadow: message.role === "user" ? "0 8px 20px rgba(16,42,67,0.12)" : "none" }}>
                        <Typography sx={{ whiteSpace: "pre-wrap", fontSize: ".92rem", lineHeight: 1.75 }}>{message.text}</Typography>
                      </Paper>
                      {message.role === "user" && <Avatar sx={{ width: 32, height: 32, bgcolor: "#DBEAFE", color: "#1D4ED8" }}><PersonRoundedIcon sx={{ fontSize: 18 }} /></Avatar>}
                    </Box>
                  ))}
                  {isThinking && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: "#CCFBF1", color: "#0D9488" }}><SmartToyRoundedIcon sx={{ fontSize: 18 }} /></Avatar>
                      <Paper elevation={0} sx={{ px: 2, py: 1.7, border: "1px solid #E2E8F0", borderRadius: "4px 18px 18px 18px", display: "flex", gap: .65, alignItems: "center" }}>
                        {[0, 1, 2].map((dot) => (
                          <Box key={dot} sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: "#0D9488", animation: "float 0.8s ease-in-out infinite" }} />
                        ))}
                        <Typography sx={{ ml: .5, fontSize: ".8rem", color: "#64748B" }}>Thinking</Typography>
                      </Paper>
                    </Box>
                  )}
                </Stack>
              </Box>

              <Box sx={{ p: { xs: 2, md: 3 }, borderTop: "1px solid #EAF0F5", bgcolor: "white" }}>
                <Box component="form" onSubmit={(event: React.FormEvent<HTMLFormElement>) => { event.preventDefault(); sendMessage(input); }} sx={{ display: "flex", gap: 1.2, alignItems: "flex-end" }}>
                <TextField
  fullWidth
  multiline
  maxRows={4}
  value={input}
  onChange={(event) => setInput(event.target.value)}
  placeholder="Ask me anything about healthcare..."
  slotProps={{
    htmlInput: {
      "aria-label": "Write your message",
    },
  }}
  sx={{
    "& .MuiOutlinedInput-root": {
      borderRadius: "16px",
      bgcolor: "#F8FAFC",
      fontSize: ".93rem",
      "& fieldset": { borderColor: "#E2E8F0" },
      "&:hover fieldset": { borderColor: "#99F6E4" },
      "&.Mui-focused fieldset": { borderColor: "#0D9488" },
    },
  }}
/>
                  <IconButton type="submit" aria-label="Send message" disabled={!input.trim() || isThinking} sx={{ width: 52, height: 52, flexShrink: 0, borderRadius: "15px", bgcolor: "#0D9488", color: "white", "&:hover": { bgcolor: "#0F766E", transform: "translateY(-2px)" }, "&.Mui-disabled": { bgcolor: "#CBD5E1", color: "white" }, transition: "all .2s" }}><SendRoundedIcon /></IconButton>
                </Box>
                <Typography sx={{ color: "#94A3B8", fontSize: ".72rem", mt: 1.3, textAlign: "center" }}>AI can make mistakes. Please avoid sharing sensitive personal or medical information.</Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Quick prompts sidebar */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Paper elevation={0} sx={{ p: 3, border: "1px solid #E2E8F0", borderRadius: "26px", bgcolor: "white", height: "100%" }}>
              <Stack direction="row" spacing={1}  sx={{ mb: .7,alignItems:"center" }}>
                <AutoAwesomeRoundedIcon sx={{ color: "#0D9488" }} />
                <Typography variant="h6" sx={{ fontWeight: 900, color: "#102A43" }}>How can I help?</Typography>
              </Stack>
              <Typography sx={{ color: "#64748B", fontSize: ".88rem", lineHeight: 1.7, mb: 2.5 }}>Choose a topic to get started, or write your own question in the chat.</Typography>
              <Stack spacing={1.5}>
                {quickPrompts.map((item) => (
                  <Paper key={item.title} elevation={0} onClick={() => sendMessage(item.prompt)} sx={{ p: 1.7, borderRadius: "17px", border: "1px solid #E8EEF3", cursor: "pointer", transition: "all .22s ease", "&:hover": { borderColor: "#99F6E4", bgcolor: "#F8FFFD", transform: "translateY(-2px)", boxShadow: "0 8px 22px rgba(16,42,67,0.05)" } }}>
                    <Stack direction="row" spacing={1.5} sx={{ alignItems:"center"}}>
                      <Box sx={{ width: 43, height: 43, borderRadius: "13px", bgcolor: item.bg, color: item.color, display: "grid", placeItems: "center", flexShrink: 0 }}>{item.icon}</Box>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography sx={{ fontWeight: 850, color: "#102A43", fontSize: ".92rem" }}>{item.title}</Typography>
                        <Typography sx={{ mt: .35, color: "#64748B", fontSize: ".77rem", lineHeight: 1.5 }}>{item.description}</Typography>
                      </Box>
                      <ArrowForwardRoundedIcon sx={{ color: "#94A3B8", fontSize: 19 }} />
                    </Stack>
                  </Paper>
                ))}
              </Stack>
              <Divider sx={{ my: 2.5, borderColor: "#EAF0F5" }} />
              <Box sx={{ p: 2, borderRadius: "17px", bgcolor: "#F0FDFA", border: "1px solid #CCFBF1" }}>
                <Stack direction="row" spacing={1.2} sx={{alignItems:"flex-start"}}>
                  <HealthAndSafetyRoundedIcon sx={{ color: "#0D9488", mt: .2 }} />
                  <Box>
                    <Typography sx={{ fontWeight: 850, color: "#115E59", fontSize: ".87rem" }}>A gentle reminder</Typography>
                    <Typography sx={{ color: "#42736F", fontSize: ".78rem", lineHeight: 1.65, mt: .4 }}>This assistant offers general information, not a diagnosis. For urgent or severe symptoms, contact local emergency services or seek immediate medical care.</Typography>
                  </Box>
                </Stack>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={1}  sx={{ mt: 4, color: "#94A3B8",alignItems:"center" ,justifyContent:"center" }}>
          <Typography sx={{ fontSize: ".76rem" }}>Designed to make healthcare easier to navigate</Typography>
          <Typography sx={{ display: { xs: "none", sm: "block" }, fontSize: ".76rem" }}>•</Typography>
          <Typography sx={{ fontSize: ".76rem" }}>HealthConnect AI © 2026</Typography>
        </Stack>
      </Container>
    </Box>
  );
}