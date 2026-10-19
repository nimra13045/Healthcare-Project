
"use client";

import { useState, type FormEvent } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  TextField,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Snackbar,
  Alert,
  Chip,
  Stack,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { motion } from "framer-motion";

import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";

const contactMethods = [
  {
    icon: <EmailRoundedIcon />,
    title: "Email Us",
    description: "For general questions and support",
    detail: "support@healthconnect.example",
    color: "#0D9488",
    bg: "#E6FFFA",
  },
  {
    icon: <PhoneRoundedIcon />,
    title: "Call Us",
    description: "For assistance with the platform",
    detail: "+92 XXX XXXXXXX",
    color: "#2563EB",
    bg: "#EFF6FF",
  },
  {
    icon: <LocationOnRoundedIcon />,
    title: "Our Location",
    description: "Our planned service area",
    detail: "Lahore, Pakistan",
    color: "#7C3AED",
    bg: "#F5F3FF",
  },
];

const faqs = [
  {
    question: "How can I find a doctor?",
    answer:
      "Open the Find a Doctor page, choose your preferred specialty or location, and review the available professional profiles.",
  },
  {
    question: "Can I book physical and online consultations?",
    answer:
      "The platform is designed to support clinic appointments and online consultations. Availability depends on the features currently implemented.",
  },
  {
    question: "How can healthcare professionals join?",
    answer:
      "Healthcare professionals can contact the platform team to learn about registration and the planned verification process.",
  },
  {
    question: "How can students find internships?",
    answer:
      "Students will be able to explore healthcare internship opportunities when listings are available.",
  },
];

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    bgcolor: "#FAFCFD",
    "&.Mui-focused fieldset": {
      borderColor: "#0D9488",
    },
  },
};

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Demo only: a backend is needed to deliver messages.
    setSnackbarOpen(true);

    setForm({
      name: "",
      email: "",
      subject: "General Inquiry",
      message: "",
    });
  };

  return (
    <Box sx={{ bgcolor: "#FFFFFF", overflow: "hidden" }}>
      {/* HERO */}
      <Box
        sx={{
          py: { xs: 7, md: 10 },
          background:
            "radial-gradient(circle at 85% 10%, #CCFBF1 0, transparent 28%), linear-gradient(135deg, #F0FDFA, #FFFFFF 65%, #EFF6FF)",
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: 760, mx: "auto", textAlign: "center" }}>
            <Chip
              icon={<FavoriteRoundedIcon />}
              label="WE'RE HERE FOR YOU"
              sx={{
                mb: 3,
                px: 1,
                bgcolor: "#CCFBF1",
                color: "#0F766E",
                fontWeight: 800,
                borderRadius: "10px",
              }}
            />

            <Typography
              component="h1"
              sx={{
                fontSize: { xs: "2.5rem", sm: "3.4rem", md: "4.2rem" },
                fontWeight: 800,
                letterSpacing: "-2px",
                lineHeight: 1.1,
                color: "#102A43",
              }}
            >
              Let's start a{" "}
              <Box component="span" sx={{ color: "#0D9488" }}>
                conversation.
              </Box>
            </Typography>

            <Typography
              sx={{
                mt: 3,
                mx: "auto",
                maxWidth: 620,
                color: "#64748B",
                lineHeight: 1.9,
                fontSize: { xs: "1rem", md: "1.1rem" },
              }}
            >
              Have a question, suggestion, or partnership idea? We'd love to
              hear from you. Send us a message and let us know how we can help.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* CONTACT CARDS */}
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 7 } }}>
        <Grid container spacing={3}>
          {contactMethods.map((item, index) => (
            <Grid
              key={item.title}
              size={{ xs: 12, sm: 6, md: 4 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                style={{ height: "100%" }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    height: "100%",
                    boxSizing: "border-box",
                    borderRadius: "22px",
                    border: "1px solid #E6EEF2",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 2,
                    transition: "all .25s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 16px 35px #102A4310",
                      borderColor: "#B8E6DE",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      flexShrink: 0,
                      borderRadius: "15px",
                      bgcolor: item.bg,
                      color: item.color,
                      display: "grid",
                      placeItems: "center",
                      "& svg": { fontSize: 27 },
                    }}
                  >
                    {item.icon}
                  </Box>

                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      sx={{
                        fontWeight: 800,
                        color: "#102A43",
                        fontSize: "1.1rem",
                      }}
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      sx={{
                        color: "#64748B",
                        fontSize: ".88rem",
                        mt: 0.5,
                        lineHeight: 1.7,
                      }}
                    >
                      {item.description}
                    </Typography>

                    <Typography
                      sx={{
                        mt: 1.5,
                        color: item.color,
                        fontWeight: 700,
                        fontSize: ".92rem",
                        overflowWrap: "anywhere",
                      }}
                    >
                      {item.detail}
                    </Typography>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CONTACT FORM + SIDE PANEL */}
      <Container maxWidth="lg" sx={{ pb: { xs: 8, md: 11 } }}>
        <Grid
          container
          spacing={{ xs: 4, md: 6 }}
         sx= {{alignItems:"stretch"}} 
        >
          <Grid size={{ xs: 12, md: 7 }} sx={{ minWidth: 0 }}>
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ height: "100%" }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2.5, sm: 4, md: 5 },
                  height: "100%",
                  boxSizing: "border-box",
                  border: "1px solid #E6EEF2",
                  borderRadius: { xs: "22px", md: "28px" },
                }}
              >
                <Typography
                  component="h2"
                  sx={{
                    fontSize: { xs: "1.7rem", md: "2.1rem" },
                    fontWeight: 800,
                    color: "#102A43",
                  }}
                >
                  Send us a message
                </Typography>

                <Typography
                  sx={{ mt: 1, mb: 4, color: "#64748B", lineHeight: 1.8 }}
                >
                  Fill in the details below and tell us what you need help with.
                </Typography>

                <Box component="form" onSubmit={handleSubmit}>
                  <Grid container spacing={2.5}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography
                        component="label"
                        htmlFor="contact-name"
                        sx={{
                          display: "block",
                          mb: 1,
                          fontWeight: 700,
                          color: "#334155",
                        }}
                      >
                        Your name
                      </Typography>

                      <TextField
                        id="contact-name"
                        name="name"
                        fullWidth
                        required
                        placeholder="Enter your full name"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        slotProps={{
                          htmlInput: {
                            maxLength: 100,
                            autoComplete: "name",
                          },
                        }}
                        sx={fieldSx}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography
                        component="label"
                        htmlFor="contact-email"
                        sx={{
                          display: "block",
                          mb: 1,
                          fontWeight: 700,
                          color: "#334155",
                        }}
                      >
                        Email address
                      </Typography>

                      <TextField
                        id="contact-email"
                        name="email"
                        fullWidth
                        required
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        slotProps={{
                          htmlInput: {
                            autoComplete: "email",
                            maxLength: 254,
                          },
                        }}
                        sx={fieldSx}
                      />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                      <Typography
                        component="label"
                        htmlFor="contact-subject"
                        sx={{
                          display: "block",
                          mb: 1,
                          fontWeight: 700,
                          color: "#334155",
                        }}
                      >
                        Subject
                      </Typography>

                      <TextField
                        id="contact-subject"
                        name="subject"
                        fullWidth
                        select
                        value={form.subject}
                        onChange={(e) =>
                          setForm({ ...form, subject: e.target.value })
                        }
                        sx={fieldSx}
                      >
                        <MenuItem value="General Inquiry">
                          General Inquiry
                        </MenuItem>
                        <MenuItem value="Technical Support">
                          Technical Support
                        </MenuItem>
                        <MenuItem value="Doctor Registration">
                          Doctor Registration
                        </MenuItem>
                        <MenuItem value="Internship Opportunities">
                          Internship Opportunities
                        </MenuItem>
                        <MenuItem value="Partnership">Partnership</MenuItem>
                      </TextField>
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                      <Typography
                        component="label"
                        htmlFor="contact-message"
                        sx={{
                          display: "block",
                          mb: 1,
                          fontWeight: 700,
                          color: "#334155",
                        }}
                      >
                        Your message
                      </Typography>

                      <TextField
                        id="contact-message"
                        name="message"
                        fullWidth
                        required
                        multiline
                        minRows={5}
                        placeholder="How can we help you?"
                        value={form.message}
                        onChange={(e) =>
                          setForm({ ...form, message: e.target.value })
                        }
                        slotProps={{
                          htmlInput: { maxLength: 2000 },
                        }}
                        sx={fieldSx}
                      />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        endIcon={<SendRoundedIcon />}
                        sx={{
                          mt: 1,
                          py: 1.7,
                          borderRadius: "12px",
                          textTransform: "none",
                          fontWeight: 800,
                          fontSize: "1rem",
                          bgcolor: "#0D9488",
                          boxShadow: "0 10px 24px #0D948825",
                          "&:hover": { bgcolor: "#0F766E" },
                        }}
                      >
                        Send Message
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </motion.div>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }} sx={{ minWidth: 0 }}>
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ height: "100%" }}
            >
              <Box
                sx={{
                  height: "100%",
                  minHeight: { xs: 360, md: 500 },
                  boxSizing: "border-box",
                  p: { xs: 3, md: 4 },
                  borderRadius: { xs: "22px", md: "28px" },
                  background:
                    "radial-gradient(circle at 100% 0%, #5EEAD450 0, transparent 35%), linear-gradient(145deg, #102A43, #164E63)",
                  color: "#FFFFFF",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Box
                  aria-hidden="true"
                  sx={{
                    position: "absolute",
                    width: 220,
                    height: 220,
                    border: "1px solid #FFFFFF20",
                    borderRadius: "50%",
                    right: -100,
                    bottom: 100,
                    pointerEvents: "none",
                  }}
                />

                <Box sx={{ position: "relative", zIndex: 1 }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      display: "grid",
                      placeItems: "center",
                      borderRadius: "18px",
                      bgcolor: "#FFFFFF18",
                      color: "#5EEAD4",
                    }}
                  >
                    <FavoriteRoundedIcon sx={{ fontSize: 32 }} />
                  </Box>

                  <Typography
                    component="h2"
                    sx={{
                      mt: 3,
                      fontWeight: 800,
                      fontSize: { xs: "1.8rem", md: "2.3rem" },
                      lineHeight: 1.2,
                    }}
                  >
                    Your voice matters to us.
                  </Typography>

                  <Typography
                    sx={{ mt: 2, color: "#D5E6ED", lineHeight: 1.9 }}
                  >
                    Whether you're looking for a healthcare professional,
                    exploring an internship, or interested in collaborating,
                    we're glad you're here.
                  </Typography>
                </Box>

                <Box sx={{ position: "relative", zIndex: 1, mt: 5 }}>
                  <Typography sx={{ fontWeight: 800, fontSize: "1.1rem" }}>
                    A quick reminder
                  </Typography>

                  <Typography
                    sx={{ mt: 1, color: "#D5E6ED", lineHeight: 1.8 }}
                  >
                    This form is for general inquiries. For urgent medical
                    needs, contact local emergency services. Please don't
                    submit private medical records or sensitive health
                    information here.
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* FAQ */}
      <Box sx={{ bgcolor: "#F7FAFC", py: { xs: 7, md: 9 } }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography
              sx={{
                color: "#0D9488",
                fontWeight: 800,
                fontSize: ".8rem",
                letterSpacing: 1.5,
              }}
            >
              FAQ
            </Typography>

            <Typography
              component="h2"
              sx={{
                mt: 1.5,
                color: "#102A43",
                fontSize: { xs: "2rem", md: "2.6rem" },
                fontWeight: 800,
              }}
            >
              Frequently asked questions
            </Typography>

            <Typography sx={{ mt: 1.5, color: "#64748B", lineHeight: 1.8 }}>
              A few helpful answers to get you started.
            </Typography>
          </Box>

          <Stack spacing={1.5}>
            {faqs.map((faq) => (
              <Accordion
                key={faq.question}
                elevation={0}
                disableGutters
                sx={{
                  border: "1px solid #E6EEF2",
                  borderRadius: "14px !important",
                  overflow: "hidden",
                  "&:before": { display: "none" },
                  "&.Mui-expanded": { m: 0 },
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreRoundedIcon sx={{ color: "#0D9488" }} />
                  }
                  sx={{ px: { xs: 2, sm: 3 }, py: 1 }}
                >
                  <Typography
                    sx={{ fontWeight: 700, color: "#102A43", pr: 1 }}
                  >
                    {faq.question}
                  </Typography>
                </AccordionSummary>

                <AccordionDetails
                  sx={{ px: { xs: 2, sm: 3 }, pb: 3 }}
                >
                  <Typography sx={{ color: "#64748B", lineHeight: 1.9 }}>
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* FORM FEEDBACK */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4500}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="info"
          variant="filled"
          onClose={() => setSnackbarOpen(false)}
          sx={{ borderRadius: "12px" }}
        >
          Demo only: connect a backend to deliver your message.
        </Alert>
      </Snackbar>
    </Box>
  );
}
