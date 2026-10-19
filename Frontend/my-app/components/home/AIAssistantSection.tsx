"use client";

import { useState, type FormEvent } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import SmartToyIcon from "@mui/icons-material/SmartToy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SendIcon from "@mui/icons-material/Send";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
const prompts = [
  "Explain my symptoms",
  "Health tips & wellness",
  "Medicine information",
  "General health questions",
];

type ChatMessage = {
  sender: "ai" | "user";
  text: string;
};

const initialMessage: ChatMessage = {
  sender: "ai",
  text: "Hello! I am your HealthConnect AI Assistant. How can I help you today?",
};

export default function AIAssistantSection() {
  const router = useRouter();
  const [chatOpen, setChatOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [chatLog, setChatLog] = useState<ChatMessage[]>([
    initialMessage,
  ]);

  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userText = inputMessage.trim();

    if (!userText) return;

    setChatLog((previous) => [
      ...previous,
      { sender: "user", text: userText },
    ]);

    setInputMessage("");

    // Demo response only. Connect a real AI API later.
    window.setTimeout(() => {
      setChatLog((previous) => [
        ...previous,
        {
          sender: "ai",
          text:
            "Thank you for your question. I can provide general health information, but I cannot diagnose medical conditions. Please consult a qualified healthcare professional for personalized medical advice.",
        },
      ]);
    }, 700);
  };

  const handlePromptClick = (prompt: string) => {
    setInputMessage(prompt);
    setChatOpen(true);
  };

  return (
    <Box
      id="ai-assistant"
      component="section"
      sx={{
        py: { xs: 7, md: 10 },
        background:
          "linear-gradient(135deg, #F0FDFA 0%, #FFFFFF 55%, #F0FDFA 100%)",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        {/* Responsive two-column layout */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "minmax(0, 1fr)",
              md: "repeat(2, minmax(0, 1fr))",
            },
            gap: { xs: 5, md: 7 },
            alignItems: "center",
          }}
        >
          {/* Left: AI Preview */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, sm: 3.5 },
                borderRadius: { xs: "24px", md: "32px" },
                bgcolor: "#F0FDFA",
                border: "1px solid rgba(7, 153, 143, 0.2)",
                boxShadow: "0 20px 40px rgba(7, 153, 143, 0.10)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  mb: 3,
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    flexShrink: 0,
                    borderRadius: "50%",
                    bgcolor: "#07998F",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FFFFFF",
                  }}
                >
                  <SmartToyIcon />
                </Box>

                <Box>
                  <Typography
                    variant="subtitle1"
                    sx ={{ fontWeight:700,
                    color:"#15384B"}}
                   
                  >
                    HealthConnect AI Bot
                  </Typography>

                  <Typography
                    variant="caption"
                    sx={{fontWeight:600,
                    color:"#07998F"}}
                    
                  >
                    Online • Ready to assist
                  </Typography>
                </Box>
              </Box>

              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  mb: 3,
                  borderRadius: "16px",
                  bgcolor: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                }}
              >
                <Typography
                  variant="body2"
                  sx = {{color:"#507283",
                  fontStyle:"italic"}}
                  
                >
                  &quot;How can I help you today?&quot;
                </Typography>
              </Paper>

              <Typography
                variant="caption"
                sx ={{
                fontWeight:700,
                color:"#15384B",
                display:"block",
                mb:1.5}}
            
              >
                Suggested Prompts
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                {prompts.map((prompt) => (
                  <Chip
                    key={prompt}
                    label={prompt}
                    clickable
                    onClick={() => handlePromptClick(prompt)}
                    sx={{
                      maxWidth: "100%",
                      height: "auto",
                      py: 0.5,
                      bgcolor: "#FFFFFF",
                      color: "#07998F",
                      border: "1px solid #07998F",
                      fontWeight: 600,
                      "& .MuiChip-label": {
                        whiteSpace: "normal",
                        py: 0.5,
                      },
                      "&:hover": {
                        bgcolor: "#07998F",
                        color: "#FFFFFF",
                      },
                    }}
                  />
                ))}
              </Box>
            </Paper>
          </motion.div>

          {/* Right: AI Features */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="overline"
              sx={{ color:"#07998F",
              fontWeight:700
              ,letterSpacing:1.5}}
            >
              — AI ASSISTANT
            </Typography>

            <Typography
              component="h2"
              sx={{
                fontSize: { xs: "1.9rem", sm: "2.3rem", md: "2.5rem" },
                lineHeight: 1.2,
                fontWeight: 800,
                color: "#15384B",
                mt: 1,
                mb: 2,
              }}
            >
              Your Personal Health AI Assistant
            </Typography>

            <Typography
              variant="body1"
              color="#507283"
              sx={{ mb: 3, lineHeight: 1.8 }}
            >
              Get helpful information for your health and wellness
              questions. Find guidance in simple language, whenever
              you need it.
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}>
              {[
                "24/7 availability",
                "General health information",
                "Easy and simple language",
              ].map((feature) => (
                <Box
                  key={feature}
                  sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                >
                  <CheckCircleIcon sx={{ color: "#07998F" }} />

                  <Typography sx={{fontWeight:600, color:"#15384B"}} >
                    {feature}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={() => router.push('/AIassistant')}
              sx={{
                width: { xs: "100%", sm: "auto" },
                bgcolor: "#07998F",
                color: "#FFFFFF",
                borderRadius: "14px",
                px: 3.5,
                py: 1.5,
                fontWeight: 700,
                textTransform: "none",
                boxShadow: "0 8px 20px rgba(7, 153, 143, 0.25)",
                "&:hover": { bgcolor: "#056F67" },
              }}
            >
              Chat with AI Assistant
            </Button>
          </motion.div>
        </Box>
      </Container>

      {/* Chat Dialog */}
      <Dialog
  open={chatOpen}
  onClose={() => setChatOpen(false)}
  fullWidth
  maxWidth="sm"
  fullScreen={false}
  slotProps={{
    paper: {
      sx: {
        borderRadius: { xs: "16px", sm: "24px" },
        height: { xs: "min(650px, 85dvh)", sm: "600px" },
        maxHeight: "90dvh",
        display: "flex",
        flexDirection: "column",
        m: { xs: 1, sm: 2 },
        width: { xs: "calc(100% - 16px)", sm: "auto" },
      },
    },
  }}
>
        <DialogTitle
          sx={{
            bgcolor: "#07998F",
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <SmartToyIcon />

          <Box>
            <Typography sx= {{fontWeight:700 }} variant="subtitle1">
              HealthConnect AI Assistant
            </Typography>

            <Typography variant="caption">
              General health and wellness information
            </Typography>
          </Box>
        </DialogTitle>

        <DialogContent
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            bgcolor: "#F8FBFC",
            overflowY: "auto",
            flex: 1,
          }}
        >
          <Alert severity="info">
            AI responses are for general information and do not
            replace professional medical advice.
          </Alert>

          {chatLog.map((msg, index) => {
            const isUser = msg.sender === "user";

            return (
              <Box
                key={`${index}-${msg.sender}`}
                sx={{
                  alignSelf: isUser ? "flex-end" : "flex-start",
                  bgcolor: isUser ? "#07998F" : "#FFFFFF",
                  color: isUser ? "#FFFFFF" : "#15384B",
                  p: 2,
                  borderRadius: "16px",
                  maxWidth: "85%",
                  overflowWrap: "anywhere",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  border: isUser ? "none" : "1px solid #E2E8F0",
                }}
              >
                <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
                  {msg.text}
                </Typography>
              </Box>
            );
          })}
        </DialogContent>

        <DialogActions
          sx={{
            p: { xs: 1.5, sm: 2 },
            bgcolor: "#FFFFFF",
            borderTop: "1px solid #E2E8F0",
          }}
        >
          <Box
            component="form"
            onSubmit={handleSendMessage}
            sx={{ display: "flex", width: "100%", gap: 1 }}
          >
           <TextField
  fullWidth
  size="small"
  placeholder="Type your health question..."
  value={inputMessage}
  onChange={(e) => setInputMessage(e.target.value)}
  slotProps={{
    htmlInput: {
      "aria-label": "Health question",
    },
  }}
  sx={{
    "& .MuiOutlinedInput-root": {
      borderRadius: "16px",
      bgcolor: "#FFFFFF",
    },
  }}
/>

            <Button
              type="submit"
              variant="contained"
              aria-label="Send message"
              disabled={!inputMessage.trim()}
              sx={{
                minWidth: 48,
                borderRadius: "16px",
                bgcolor: "#07998F",
                "&:hover": { bgcolor: "#056F67" },
              }}
            >
              <SendIcon fontSize="small" />
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
