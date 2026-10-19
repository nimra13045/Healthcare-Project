"use client";

import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Stack,
  Chip,
  Avatar,
  Grid,
} from "@mui/material";
import { motion } from "framer-motion";

import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import HealthAndSafetyRoundedIcon from "@mui/icons-material/HealthAndSafetyRounded";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const stats = [
  { label: "Verified Specialists", value: "1,200+", icon: <LocalHospitalRoundedIcon /> },
  { label: "Active Patients", value: "25,000+", icon: <GroupsRoundedIcon /> },
  { label: "Healthcare Students", value: "4,500+", icon: <SchoolRoundedIcon /> },
  { label: "Partner Clinics", value: "150+", icon: <HealthAndSafetyRoundedIcon /> },
];

const pillars = [
  {
    title: "Patient-Centric Discovery",
    description: "Finding the right doctor shouldn't feel like guesswork. We provide granular filters for specialization, location, fees, and real-time availability.",
    icon: <FavoriteRoundedIcon />,
    color: "#0D9488",
    bg: "#E6FFFA",
  },
  {
    title: "AI-Powered Assistance",
    description: "Our intelligent matching assistant helps patients locate appropriate care pathways and connects medical students with verified internships instantly.",
    icon: <AutoAwesomeRoundedIcon />,
    color: "#2563EB",
    bg: "#EFF6FF",
  },
  {
    title: "Community & Growth",
    description: "Bridging the gap between seasoned professionals, hospitals, and the next generation of healthcare students through mentorship and opportunities.",
    icon: <SchoolRoundedIcon />,
    color: "#7C3AED",
    bg: "#F5F3FF",
  },
];

const teamQuote = {
  quote: "We built HealthConnect AI to transform fragmented healthcare experiences into a seamless, unified digital ecosystem for everyone.",
  role: "Engineering & Product Team",
};

export default function AboutPage() {
  return (

    <Box sx={{ bgcolor: "#FFFFFF", overflow: "hidden", color: "#102A43" }}>
       {/* <Navbar/> */}
      {/* HERO SECTION */}
      <Box
        sx={{
          position: "relative",
          background: "radial-gradient(circle at 90% 15%, #CCFBF1 0, transparent 35%), linear-gradient(135deg, #F0FDFA 0%, #FFFFFF 65%, #EFF6FF 100%)",
          py: { xs: 8, md: 14 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} sx={{alignItems:"center"}} >
            <Grid size={{xs:12 ,md:7}} >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Chip
                  icon={<VerifiedRoundedIcon />}
                  label="THE HEALTHCONNECT AI STORY"
                  sx={{
                    mb: 3,
                    px: 1.5,
                    py: 0.5,
                    bgcolor: "#CCFBF1",
                    color: "#0F766E",
                    fontWeight: 800,
                    borderRadius: "12px",
                    letterSpacing: "0.5px",
                  }}
                />

                <Typography
                  component="h1"
                  sx={{
                    fontWeight: 900,
                    fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.2rem" },
                    lineHeight: 1.15,
                    letterSpacing: "-1.5px",
                    color: "#102A43",
                  }}
                >
                  Reimagining how the world connects with{" "}
                  <Box component="span" sx={{ color: "#0D9488" }}>
                    healthcare.
                  </Box>
                </Typography>

                <Typography
                  sx={{
                    mt: 3,
                    color: "#526579",
                    fontSize: { xs: "1.05rem", md: "1.2rem" },
                    lineHeight: 1.8,
                    maxWidth: 620,
                  }}
                >
                  HealthConnect AI is a next-generation ecosystem uniting patients, doctors, clinics, and medical students onto a single trustworthy platform powered by thoughtful AI.
                </Typography>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 5 }}>
                  <Button
                    href="/finddoctor"
                    variant="contained"
                    endIcon={<ArrowForwardRoundedIcon />}
                    sx={{
                      py: 1.6,
                      px: 3.5,
                      borderRadius: "14px",
                      fontWeight: 700,
                      textTransform: "none",
                      bgcolor: "#0D9488",
                      boxShadow: "0 12px 30px #0D948830",
                      "&:hover": { bgcolor: "#0F766E" },
                    }}
                  >
                    Explore Platform
                  </Button>
                  <Button
                    href="/register"
                    variant="outlined"
                    sx={{
                      py: 1.6,
                      px: 3.5,
                      borderRadius: "14px",
                      fontWeight: 700,
                      textTransform: "none",
                      borderColor: "#CBD5E1",
                      color: "#102A43",
                      "&:hover": { borderColor: "#0D9488", bgcolor: "#F0FDFA" },
                    }}
                  >
                    Join Community
                  </Button>
                </Stack>
              </motion.div>
            </Grid>

            {/* HERO VISUAL CARD */}
            <Grid size={{xs:12, md:5}}>
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 3.5, sm: 5 },
                    borderRadius: "32px",
                    background: "linear-gradient(145deg, #0F766E, #0D9488)",
                    color: "#FFFFFF",
                    boxShadow: "0 25px 60px #0F766E25",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      width: 200,
                      height: 200,
                      borderRadius: "50%",
                      border: "1px solid #FFFFFF30",
                      top: -60,
                      right: -60,
                    }}
                  />
                  <Typography variant="overline" sx={{ color: "#CCFBF1", fontWeight: 800, letterSpacing: 2 }}>
                    MISSION STATEMENT
                  </Typography>
                  <Typography
                    component="blockquote"
                    sx={{
                      mt: 2,
                      fontSize: { xs: "1.15rem", md: "1.35rem" },
                      fontWeight: 600,
                      lineHeight: 1.6,
                    }}
                  >
                    "{teamQuote.quote}"
                  </Typography>

                  <Box sx={{ mt: 4, pt: 3, borderTop: "1px solid #FFFFFF30", display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar sx={{ bgcolor: "#CCFBF1", color: "#0F766E", fontWeight: 800 }}>HA</Avatar>
                    <Box>
                      <Typography sx={{ fontWeight: 800, fontSize: "0.95rem" }}>HealthConnect AI Team</Typography>
                      <Typography variant="body2" sx={{ color: "#99F6E4" }}>{teamQuote.role}</Typography>
                    </Box>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* STATS STRIP */}
      <Box sx={{ bgcolor: "#F8FAFC", py: 6, borderY: "1px solid #E2E8F0" }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {stats.map((st, i) => (
              <Grid size={{xs:6 ,md:3}}  key={st.label}>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  {/* <Stack direction="row" spacing={2} alignItems="center"> */}
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 4 }}>
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: "14px",
                        bgcolor: "#CCFBF1",
                        color: "#0F766E",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      {st.icon}
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 900, fontSize: { xs: "1.5rem", md: "1.8rem" }, color: "#102A43" }}>
                        {st.value}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#64748B", fontWeight: 600 }}>
                        {st.label}
                      </Typography>
                    </Box>
                  </Stack>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CORE PILLARS SECTION */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Box sx={{ textAlign: "center", maxWidth: 700, mx: "auto", mb: 8 }}>
          <Typography sx={{ color: "#0D9488", fontWeight: 800, letterSpacing: 2, fontSize: ".85rem" }}>
            WHAT DRIVES US
          </Typography>
          <Typography component="h2" sx={{ fontWeight: 900, fontSize: { xs: "2rem", md: "2.8rem" }, mt: 1.5, color: "#102A43" }}>
            Built on trust, technology, and community
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {pillars.map((pillar, idx) => (
            <Grid size={{xs:12 ,md:4}}  key={pillar.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                style={{ height: "100%" }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: "100%",
                    borderRadius: "24px",
                    border: "1px solid #E2E8F0",
                    bgcolor: "#FFFFFF",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 20px 40px #102A430D",
                      borderColor: "#99F6E4",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "18px",
                      bgcolor: pillar.bg,
                      color: pillar.color,
                      display: "grid",
                      placeItems: "center",
                      mb: 3,
                      "& svg": { fontSize: 30 },
                    }}
                  >
                    {pillar.icon}
                  </Box>
                  <Typography component="h3" sx={{ fontWeight: 800, fontSize: "1.25rem", color: "#102A43", mb: 1.5 }}>
                    {pillar.title}
                  </Typography>
                  <Typography sx={{ color: "#64748B", lineHeight: 1.8, fontSize: "0.98rem" }}>
                    {pillar.description}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CALL TO ACTION BANNER */}
      <Container maxWidth="lg" sx={{ pb: { xs: 8, md: 12 } }}>
        <Box
          sx={{
            p: { xs: 4, sm: 6, md: 8 },
            borderRadius: "32px",
            background: "linear-gradient(135deg, #102A43 0%, #0F172A 100%)",
            color: "#FFFFFF",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 20px 50px #102A4330",
          }}
        >
          <Typography component="h2" sx={{ fontWeight: 900, fontSize: { xs: "2rem", md: "2.6rem" }, mb: 2 }}>
            Ready to experience better healthcare navigation?
          </Typography>
          <Typography sx={{ color: "#94A3B8", maxWidth: 600, mx: "auto", mb: 4, lineHeight: 1.8 }}>
            Whether you are seeking a consultation, looking to list your clinic, or a student searching for an internship—HealthConnect AI is your gateway.
          </Typography>
          <Button
            href="/finddoctor"
            variant="contained"
            endIcon={<ArrowForwardRoundedIcon />}
            sx={{
              py: 1.6,
              px: 4,
              borderRadius: "14px",
              fontWeight: 700,
              textTransform: "none",
              bgcolor: "#0D9488",
              "&:hover": { bgcolor: "#0F766E" },
            }}
          >
            Get Started Now
          </Button>
        </Box>
      </Container>
      {/* <Footer/> */}
    </Box>
  );
}