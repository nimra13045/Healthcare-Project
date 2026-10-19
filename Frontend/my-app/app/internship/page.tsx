"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Stack,
  Chip,
  TextField,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  Avatar,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import MedicalInformationOutlinedIcon from "@mui/icons-material/MedicalInformationOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import HealthAndSafetyOutlinedIcon from "@mui/icons-material/HealthAndSafetyOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Navbar from "@/components/layout/Navbar";

interface Internship {
  id: string;
  title: string;
  organization: string;
  field: string;
  badge: string;
  location: string;
  type: string;
  deadline: string;
  eligibility: string;
  organizationType: string;
  bgColor: string;
  iconColor: string;
  icon: React.ReactNode;
}

const SAMPLE_INTERNSHIPS: Internship[] = [
  {
    id: "int-1", title: "Physical Therapy Intern", organization: "LifeCare Rehabilitation Center",
    field: "DPT", badge: "DPT", location: "Lahore, Pakistan", type: "Full-time",
    deadline: "Apr 30, 2026", eligibility: "3rd – 5th Year DPT Students", organizationType: "Hospitals",
    bgColor: "#EFF6FF", iconColor: "#2563EB", icon: <LocalHospitalOutlinedIcon />,
  },
  {
    id: "int-2", title: "Pharmacy Intern", organization: "MedPlus Pharmaceuticals",
    field: "Pharm-D", badge: "Pharm-D", location: "Karachi, Pakistan", type: "Part-time",
    deadline: "May 15, 2026", eligibility: "3rd – 5th Year Pharm-D Students", organizationType: "Pharma",
    bgColor: "#E6FFFA", iconColor: "#0D9488", icon: <MedicalInformationOutlinedIcon />,
  },
  {
    id: "int-3", title: "Mental Health Intern", organization: "MindWell Psychology Center",
    field: "Psychology", badge: "Psychology", location: "Islamabad, Pakistan", type: "Full-time",
    deadline: "May 10, 2026", eligibility: "3rd – 5th Year Psychology Students", organizationType: "Hospitals",
    bgColor: "#F5F3FF", iconColor: "#7C3AED", icon: <PsychologyOutlinedIcon/>,
  },
  {
    id: "int-4", title: "Nursing Student Intern", organization: "City General Hospital",
    field: "Nursing", badge: "Nursing", location: "Multan, Pakistan", type: "Full-time",
    deadline: "Apr 25, 2026", eligibility: "2nd – 4th Year Nursing Students", organizationType: "Hospitals",
    bgColor: "#FFF1F2", iconColor: "#E11D48", icon: <HealthAndSafetyOutlinedIcon />,
  },
  {
    id: "int-5", title: "Lab Technology Intern", organization: "National Diagnostic Center",
    field: "Medical Technology", badge: "Medical Technology", location: "Faisalabad, Pakistan", type: "Part-time",
    deadline: "May 20, 2026", eligibility: "2nd – 4th Year Medical Lab Technology", organizationType: "Diagnostic",
    bgColor: "#F0FDFA", iconColor: "#0F766E", icon: <ScienceOutlinedIcon />,
  },
  {
    id: "int-6", title: "Clinical Support Intern", organization: "Sunrise Health Network",
    field: "General", badge: "General", location: "Rawalpindi, Pakistan", type: "Full-time",
    deadline: "May 5, 2026", eligibility: "2nd – 5th Year Healthcare Students", organizationType: "Hospitals",
    bgColor: "#FAF5FF", iconColor: "#9333EA", icon: <LocalHospitalOutlinedIcon />,
  },
];

const fieldOptions = [
  { value: "All Fields", label: "All Fields" },
  { value: "DPT", label: "Physical Therapy (DPT)" },
  { value: "Pharm-D", label: "Pharmacy (Pharm-D)" },
  { value: "Psychology", label: "Psychology" },
  { value: "Nursing", label: "Nursing" },
  { value: "Medical Technology", label: "Medical Lab Technology" },
  { value: "General", label: "General Healthcare" },
];
const cityOptions = ["All Cities", "Lahore", "Karachi", "Islamabad", "Multan", "Faisalabad", "Rawalpindi"];

const sectionTitleSx = { fontWeight: 800, color: "#102A43" };
const linkSx = { color: "inherit", textDecoration: "none", cursor: "pointer" };

export default function InternshipPortalPage() {
  const [selectedField, setSelectedField] = useState("All Fields");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedOrg, setSelectedOrg] = useState("Any Organization");

  const filteredInternships = useMemo(() => {
    return SAMPLE_INTERNSHIPS.filter((item) => {
      if (selectedField !== "All Fields" && item.field !== selectedField) return false;
      if (selectedCity !== "All Cities" && !item.location.includes(selectedCity)) return false;
      if (selectedType !== "All Types" && item.type !== selectedType) return false;
      if (selectedOrg !== "Any Organization" && item.organizationType !== selectedOrg) return false;
      return true;
    });
  }, [selectedField, selectedCity, selectedType, selectedOrg]);

  const selectSx = { borderRadius: "12px", bgcolor: "#F8FAFC" };
  const filterLabelSx = { fontWeight: 700, color: "#526579", mb: 0.5, display: "block" };

  return (
    <Box sx={{ bgcolor: "#F8FAFC", minHeight: "100vh", color: "#102A43" }}>
      {/* NAVBAR */}
      <Navbar/>

      {/* HERO */}
      <Box sx={{ bgcolor: "#F0FDFA", background: "radial-gradient(circle at 80% 20%, #CCFBF1 0%, #F0FDFA 60%, #FFFFFF 100%)", py: { xs: 6, md: 8 }, position: "relative", overflow: "hidden" }}>
        <Container maxWidth="xl">
          <Grid container spacing={4} sx={{alignItems:"center"}}>
            <Grid size={{ xs: 12, md: 7 }}>
              <Chip icon={<SchoolOutlinedIcon sx={{ color: "#0F766E !important" }} />} label="For Healthcare Students" sx={{ mb: 2.5, bgcolor: "#CCFBF1", color: "#0F766E", fontWeight: 700, borderRadius: "10px" }} />
              <Typography component="h1" sx={{ fontWeight: 900, fontSize: { xs: "2.3rem", sm: "3.2rem", md: "3.8rem" }, lineHeight: 1.15, letterSpacing: "-1px", color: "#102A43" }}>
                Find Your Next <br />Healthcare <Box component="span" sx={{ color: "#0D9488" }}>Internship</Box>
              </Typography>
              <Typography sx={{ mt: 2, color: "#526579", fontSize: { xs: "1rem", md: "1.1rem" }, maxWidth: 580, lineHeight: 1.7 }}>Gain real-world experience, build your skills and take the next step in your healthcare career.</Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 4, flexWrap: "wrap" }}>
                {[
                  { icon: <BusinessOutlinedIcon sx={{ color: "#0D9488", fontSize: 20 }} />, label: "Trusted Organizations" },
                  { icon: <WorkOutlineOutlinedIcon sx={{ color: "#0D9488", fontSize: 20 }} />, label: "Multiple Specialties" },
                  { icon: <AutoAwesomeOutlinedIcon sx={{ color: "#0D9488", fontSize: 20 }} />, label: "AI-Powered Recommendations" },
                ].map((item) => <Paper key={item.label} elevation={0} sx={{ px: 2, py: 1.2, borderRadius: "12px", bgcolor: "#FFFFFF", border: "1px solid #E2E8F0", display: "flex", alignItems: "center", gap: 1.5 }}>{item.icon}<Typography variant="body2" sx={{ fontWeight: 700, color: "#102A43" }}>{item.label}</Typography></Paper>)}
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <Box sx={{ position: "relative", display: "flex", justifyContent: "center", px: { xs: 1, sm: 2 } }}>
                <Box sx={{ position: "relative", width: "100%", maxWidth: 360, height: 380, borderRadius: "32px", overflow: "hidden", bgcolor: "#CCFBF1", boxShadow: "0 20px 40px rgba(13, 148, 136, 0.15)" }}>
                  <Image src="/images/doc5.png" alt="Healthcare student intern" fill sizes="(max-width: 600px) 90vw, 360px" style={{ objectFit: "cover", objectPosition: "center" }} />
                </Box>
                <Stack spacing={1.5} sx={{ position: "absolute", right: { xs: 0, md: -10 }, top: 40, display: { xs: "none", sm: "flex" } }}>
                  {[{ icon: <WorkOutlineOutlinedIcon fontSize="small" />, count: "500+", label: "Active Opportunities", bg: "#E6FFFA", color: "#0D9488" }, { icon: <BusinessOutlinedIcon fontSize="small" />, count: "200+", label: "Partner Organizations", bg: "#EFF6FF", color: "#2563EB" }].map((item) => <Paper key={item.label} elevation={0} sx={{ p: 1.8, borderRadius: "16px", bgcolor: "#FFFFFF", boxShadow: "0 10px 25px rgba(16, 42, 67, 0.08)", display: "flex", alignItems: "center", gap: 1.5, minWidth: 170 }}><Box sx={{ width: 38, height: 38, borderRadius: "10px", bgcolor: item.bg, color: item.color, display: "grid", placeItems: "center" }}>{item.icon}</Box><Box><Typography sx={{ fontWeight: 900, fontSize: "1.1rem", lineHeight: 1 }}>{item.count}</Typography><Typography variant="caption" sx={{ color: "#64748B" }}>{item.label}</Typography></Box></Paper>)}
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* FILTER BAR */}
      <Container maxWidth="xl" sx={{ mt: { xs: 3, md: -4 }, position: "relative", zIndex: 10 }}>
        <Paper elevation={0} sx={{ p: 2.5, borderRadius: "22px", bgcolor: "#FFFFFF", boxShadow: "0 15px 35px rgba(16, 42, 67, 0.08)", border: "1px solid #E2E8F0" }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#102A43", mb: 2 }}>Search Internships</Typography>
          <Grid container spacing={2} sx={{alignItems:"center"}}>
            <Grid size={{ xs: 12, sm: 6, md: 2.4 }}><Typography variant="caption" sx={filterLabelSx}>Field of Study</Typography><FormControl fullWidth size="small"><Select value={selectedField} onChange={(e) => setSelectedField(e.target.value)} sx={selectSx}>{fieldOptions.map((option) => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)}</Select></FormControl></Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2.4 }}><Typography variant="caption" sx={filterLabelSx}>City</Typography><FormControl fullWidth size="small"><Select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} sx={selectSx}>{cityOptions.map((city) => <MenuItem key={city} value={city}>{city}</MenuItem>)}</Select></FormControl></Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2.2 }}><Typography variant="caption" sx={filterLabelSx}>Internship Type</Typography><FormControl fullWidth size="small"><Select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} sx={selectSx}><MenuItem value="All Types">All Types</MenuItem><MenuItem value="Full-time">Full-time</MenuItem><MenuItem value="Part-time">Part-time</MenuItem></Select></FormControl></Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2.5 }}><Typography variant="caption" sx={filterLabelSx}>Organization</Typography><FormControl fullWidth size="small"><Select value={selectedOrg} onChange={(e) => setSelectedOrg(e.target.value)} sx={selectSx}><MenuItem value="Any Organization">Any Organization</MenuItem><MenuItem value="Hospitals">Hospitals & Clinics</MenuItem><MenuItem value="Pharma">Pharmaceuticals</MenuItem><MenuItem value="Diagnostic">Diagnostic Labs</MenuItem></Select></FormControl></Grid>
            <Grid size={{ xs: 12, md: 2.5 }}><Button variant="contained" fullWidth startIcon={<SearchRoundedIcon />} onClick={() => document.getElementById("internship-results")?.scrollIntoView({ behavior: "smooth" })} sx={{ mt: { xs: 0, md: 2.2 }, py: 1.2, borderRadius: "12px", bgcolor: "#102A43", color: "#FFFFFF", fontWeight: 700, textTransform: "none", "&:hover": { bgcolor: "#0D9488" } }}>Search</Button></Grid>
          </Grid>
        </Paper>
      </Container>

      {/* OPPORTUNITIES */}
      <Container id="internship-results" maxWidth="xl" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 8.5 }}>
            <Box sx={{ mb: 3 }}><Typography variant="h5" sx={sectionTitleSx}>Featured Internship Opportunities</Typography><Typography variant="body2" sx={{ color: "#64748B", mt: 0.5 }}>Explore the latest internships in healthcare and kickstart your career.</Typography></Box>
            {filteredInternships.length === 0 ? <Paper elevation={0} sx={{ p: 4, borderRadius: "22px", border: "1px solid #E2E8F0", textAlign: "center" }}><Typography sx={{ fontWeight: 700 }}>No internships found</Typography><Typography variant="body2" sx={{ color: "#64748B", mt: 1 }}>Try changing your filters or search term.</Typography><Button onClick={() => { setSelectedField("All Fields"); setSelectedCity("All Cities"); setSelectedType("All Types"); setSelectedOrg("Any Organization"); }} sx={{ mt: 2, textTransform: "none" }}>Clear filters</Button></Paper> : <Grid container spacing={3}>{filteredInternships.map((item) => <Grid size={{ xs: 12, sm: 6 }} key={item.id}>
              <Paper elevation={0} sx={{ p: 3, borderRadius: "22px", border: "1px solid #E2E8F0", bgcolor: "#FFFFFF", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", transition: "all 0.3s ease", "&:hover": { transform: "translateY(-4px)", boxShadow: "0 15px 30px rgba(16, 42, 67, 0.08)", borderColor: "#99F6E4" } }}>
                <Box><Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}><Box sx={{ width: 48, height: 48, borderRadius: "14px", bgcolor: item.bgColor, color: item.iconColor, display: "grid", placeItems: "center" }}>{item.icon}</Box><Chip label={item.badge} size="small" sx={{ bgcolor: item.bgColor, color: item.iconColor, fontWeight: 700, borderRadius: "8px", fontSize: "0.75rem" }} /></Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#102A43", lineHeight: 1.3 }}>{item.title}</Typography><Typography variant="body2" sx={{ color: "#64748B", fontWeight: 600, mt: 0.5, mb: 2 }}>{item.organization}</Typography>
                  <Stack spacing={1} sx={{ mb: 2 }}><Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "#526579", flexWrap: "wrap" }}><LocationOnOutlinedIcon sx={{ fontSize: 18 }} /><Typography variant="body2" sx={{ fontSize: "0.85rem" }}>{item.location}</Typography><Typography variant="body2" sx={{ mx: 0.5 }}>•</Typography><WorkOutlineOutlinedIcon sx={{ fontSize: 18 }} /><Typography variant="body2" sx={{ fontSize: "0.85rem" }}>{item.type}</Typography></Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "#526579" }}><CalendarTodayOutlinedIcon sx={{ fontSize: 18 }} /><Typography variant="body2" sx={{ fontSize: "0.85rem" }}>Deadline: {item.deadline}</Typography></Box>
                    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1, color: "#526579" }}><PersonOutlineOutlinedIcon sx={{ fontSize: 18, mt: 0.2 }} /><Typography variant="body2" sx={{ fontSize: "0.85rem" }}>Eligibility: {item.eligibility}</Typography></Box>
                  </Stack></Box>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1, pt: 2, borderTop: "1px solid #F1F5F9" }}><Button variant="contained" endIcon={<ArrowForwardRoundedIcon />} onClick={() => alert(`Details for ${item.title} will be available here.`)} sx={{ borderRadius: "10px", bgcolor: "#102A43", color: "#FFFFFF", fontWeight: 700, textTransform: "none", fontSize: "0.85rem", py: 0.8, px: 2, "&:hover": { bgcolor: "#0D9488" } }}>View Details</Button><Chip label={item.badge} size="small" variant="outlined" sx={{ borderColor: "#E2E8F0", color: "#64748B", fontWeight: 600 }} /></Box>
              </Paper>
            </Grid>)}</Grid>}
          </Grid>
          <Grid size={{ xs: 12, md: 3.5 }}><Stack spacing={3}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: "22px", bgcolor: "#FFFFFF", border: "1px solid #E2E8F0" }}><Typography variant="h6" sx={{ fontWeight: 800, color: "#102A43", mb: 2.5 }}>Why Choose HealthConnect AI for Internships?</Typography><Stack spacing={2.5}>
              {[
                { icon: <FavoriteBorderOutlinedIcon fontSize="small" />, title: "Wide Range of Opportunities", body: "From top hospitals, clinics and healthcare organizations.", bg: "#CCFBF1", color: "#0F766E" },
                { icon: <AutoAwesomeOutlinedIcon fontSize="small" />, title: "AI-Powered Matching", body: "Get personalized recommendations based on your field and interests.", bg: "#EFF6FF", color: "#2563EB" },
                { icon: <GroupsOutlinedIcon fontSize="small" />, title: "Build Your Network", body: "Connect with professionals and industry experts.", bg: "#F5F3FF", color: "#7C3AED" },
                { icon: <TrendingUpOutlinedIcon fontSize="small" />, title: "Career Growth", body: "Gain hands-on experience and boost your resume.", bg: "#E6FFFA", color: "#0D9488" },
              ].map((item) => <Stack key={item.title} direction="row" spacing={2}  sx={{alignItems:"flex-start"}}><Box sx={{ width: 38, height: 38, borderRadius: "10px", bgcolor: item.bg, color: item.color, display: "grid", placeItems: "center", flexShrink: 0 }}>{item.icon}</Box><Box><Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#102A43" }}>{item.title}</Typography><Typography variant="body2" sx={{ color: "#64748B", fontSize: "0.82rem", mt: 0.3 }}>{item.body}</Typography></Box></Stack>)}
            </Stack></Paper>
            <Paper elevation={0} sx={{ p: 3, borderRadius: "22px", bgcolor: "#E6FFFA", border: "1px solid #CCFBF1", textAlign: "center" }}><Box sx={{ width: 50, height: 50, borderRadius: "16px", bgcolor: "#0D9488", color: "#FFFFFF", display: "grid", placeItems: "center", mx: "auto", mb: 2 }}><LockOutlinedIcon /></Box><Typography variant="h6" sx={{ fontWeight: 800, color: "#102A43" }}>Apply to Internships</Typography><Typography variant="body2" sx={{ color: "#526579", mt: 1, mb: 3, fontSize: "0.88rem" }}>To apply for an internship, please log in to your account or create a new one.</Typography><Button component="a" href="/login" variant="contained" fullWidth endIcon={<ArrowForwardRoundedIcon />} sx={{ borderRadius: "12px", bgcolor: "#102A43", color: "#FFFFFF", fontWeight: 800, py: 1.2, textTransform: "none", "&:hover": { bgcolor: "#0D9488" } }}>Login / Register</Button></Paper>
          </Stack></Grid>
        </Grid>
      </Container>

      {/* IMPACT BANNER */}
      <Container maxWidth="xl" sx={{ pb: 8 }}><Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: "32px", bgcolor: "#F0FDFA", border: "1px solid #CCFBF1", overflow: "hidden" }}><Grid container spacing={4} sx={{alignItems:"center"}}>
        <Grid size={{ xs: 12, md: 5 }}><Box sx={{ position: "relative", width: "100%", height: 240, borderRadius: "24px", overflow: "hidden" }}><Image src="/images/image1.png" alt="Medical team" fill sizes="(max-width: 600px) 90vw, 500px" style={{ objectFit: "cover" }} /></Box></Grid>
        <Grid size={{ xs: 12, md: 7 }}><Typography variant="h4" sx={{ fontWeight: 900, color: "#102A43" }}>Your Skills. Real Impact.</Typography><Typography sx={{ color: "#526579", mt: 1.5, mb: 4, lineHeight: 1.7 }}>Internships don't just build your resume — they help you make a difference. Gain practical experience, learn from experts and shape your future in healthcare.</Typography><Grid container spacing={2}>{[
          { icon: <SchoolOutlinedIcon fontSize="small" />, label: "Learn from Experts", bg: "#CCFBF1", color: "#0F766E" },
          { icon: <TrendingUpOutlinedIcon fontSize="small" />, label: "Gain Practical Experience", bg: "#EFF6FF", color: "#2563EB" },
          { icon: <GroupsOutlinedIcon fontSize="small" />, label: "Build Your Network", bg: "#F5F3FF", color: "#7C3AED" },
        ].map((item) => <Grid key={item.label} size={{ xs: 12, sm: 4 }}><Stack direction="row" spacing={1.5} sx={{alignItems:"center"}}><Box sx={{ width: 36, height: 36, borderRadius: "10px", bgcolor: item.bg, color: item.color, display: "grid", placeItems: "center", flexShrink: 0 }}>{item.icon}</Box><Typography variant="body2" sx={{ fontWeight: 700, color: "#102A43" }}>{item.label}</Typography></Stack></Grid>)}</Grid></Grid>
      </Grid></Paper></Container>

      {/* ANIMATED SECTION: AI RESUME ENHANCER & SMART MATCHER */}
      <Container maxWidth="xl" sx={{ pb: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Paper 
            elevation={0} 
            sx={{ 
              p: { xs: 3, md: 6 }, 
              borderRadius: "32px", 
              bgcolor: "#FFFFFF", 
              border: "1px solid #E2E8F0",
              boxShadow: "0 20px 40px rgba(16, 42, 67, 0.05)",
              transition: "box-shadow 0.3s ease-in-out",
              "&:hover": {
                boxShadow: "0 25px 50px rgba(13, 148, 136, 0.12)"
              }
            }}
          >
            <Grid container spacing={4} sx={{ alignItems: "center" }}>
              <Grid size={{ xs: 12, md: 7 }}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Chip 
                    icon={<AutoAwesomeOutlinedIcon sx={{ color: "#0D9488 !important" }} />} 
                    label="AI Career Assistant" 
                    sx={{ mb: 2, bgcolor: "#E6FFFA", color: "#0D9488", fontWeight: 700, borderRadius: "10px" }} 
                  />
                  <Typography variant="h4" sx={{ fontWeight: 900, color: "#102A43", mb: 2 }}>
                    AI Resume Enhancer & Smart Matcher
                  </Typography>
                  <Typography sx={{ color: "#526579", mb: 3, lineHeight: 1.8 }}>
                    Upload your CV or academic profile, and our AI will automatically optimize your descriptions with high-impact medical keywords, format it professionally, and match you with the best-suited internships tailored to your skills.
                  </Typography>
                  <Stack spacing={2} sx={{ mb: 4 }}>
                    {[
                      { title: "Smart CV Enhancement", desc: "Instantly highlights your clinical skills, lab experience, and academic standing." },
                      { title: "Automated Internship Matching", desc: "Recommends open roles at top hospitals and healthcare centers based on your CV score." },
                    ].map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.3 + idx * 0.15 }}
                      >
                        <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                          <Box sx={{ width: 28, height: 28, borderRadius: "8px", bgcolor: "#CCFBF1", color: "#0F766E", display: "grid", placeItems: "center", fontWeight: 800, mt: 0.5, flexShrink: 0 }}>
                            {idx + 1}
                          </Box>
                          <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#102A43" }}>{feature.title}</Typography>
                            <Typography variant="body2" sx={{ color: "#64748B", mt: 0.3 }}>{feature.desc}</Typography>
                          </Box>
                        </Box>
                      </motion.div>
                    ))}
                  </Stack>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      variant="contained" 
                      size="large"
                      startIcon={<AutoAwesomeOutlinedIcon />}
                      onClick={() => alert("AI Resume Enhancer tool will open here!")}
                      sx={{ 
                        borderRadius: "14px", 
                        bgcolor: "#0D9488", 
                        color: "#FFFFFF", 
                        fontWeight: 800, 
                        py: 1.5, 
                        px: 4,
                        textTransform: "none", 
                        "&:hover": { bgcolor: "#102A43" } 
                      }}
                    >
                      Enhance My CV & Find Matches
                    </Button>
                  </motion.div>
                </motion.div>
              </Grid>
              
              <Grid size={{ xs: 12, md: 5 }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  whileHover={{ y: -5 }}
                >
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      p: 4, 
                      borderRadius: "24px", 
                      bgcolor: "#F8FAFC", 
                      border: "2px dashed #CBD5E1", 
                      textAlign: "center",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        borderColor: "#0D9488",
                        bgcolor: "#F0FDFA"
                      }
                    }}
                  >
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Box sx={{ width: 60, height: 60, borderRadius: "20px", bgcolor: "#CCFBF1", color: "#0D9488", display: "grid", placeItems: "center", mx: "auto", mb: 2 }}>
                        <DescriptionOutlinedIcon fontSize="large" />
                      </Box>
                    </motion.div>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: "#102A43", mb: 1 }}>
                      Drop your CV here
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#64748B", mb: 3 }}>
                      Support for PDF, DOCX or TXT files. Let AI analyze your qualifications.
                    </Typography>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button 
                        variant="outlined" 
                        component="label"
                        sx={{ 
                          borderRadius: "10px", 
                          borderColor: "#0D9488", 
                          color: "#0D9488", 
                          fontWeight: 700, 
                          textTransform: "none",
                          "&:hover": { borderColor: "#102A43", bgcolor: "rgba(13, 148, 136, 0.04)" }
                        }}
                      >
                        Browse File
                        <input type="file" hidden accept=".pdf,.docx,.txt" />
                      </Button>
                    </motion.div>
                  </Paper>
                </motion.div>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>
      </Container>

      {/* FOOTER */}
      <Box sx={{ bgcolor: "#0F172A", color: "#FFFFFF", pt: 8, pb: 4 }}><Container maxWidth="xl"><Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid size={{ xs: 12, md: 3 }}><Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}><Box sx={{ width: 36, height: 36, borderRadius: "10px", bgcolor: "#0D9488", display: "grid", placeItems: "center", color: "#FFFFFF", fontWeight: 800 }}>H</Box><Typography variant="h6" sx={{ fontWeight: 800 }}>HealthConnect <Box component="span" sx={{ color: "#5EEAD4" }}>AI</Box></Typography></Box><Typography variant="body2" sx={{ color: "#94A3B8", mb: 2.5, lineHeight: 1.6 }}>Better Care. Together. Uniting healthcare professionals, patients, and students onto a single AI platform.</Typography><Stack direction="row" spacing={1.5}>{[<FacebookIcon key="fb" fontSize="small" />, <LinkedInIcon key="in" fontSize="small" />, <InstagramIcon key="ig" fontSize="small" />, <XIcon key="x" fontSize="small" />, <YouTubeIcon key="yt" fontSize="small" />].map((icon, i) => <IconButton key={i} size="small" aria-label={`Social link ${i + 1}`} sx={{ color: "#94A3B8" }}>{icon}</IconButton>)}</Stack></Grid>
        {[
          { title: "For Students", links: ["Find Internships", "Career Resources", "Student Support"] },
          { title: "For Organizations", links: ["Post Opportunities", "Manage Listings", "Partnerships"] },
          { title: "About Us", links: ["Our Mission", "Privacy Policy", "Contact Us"] },
        ].map((column) => <Grid key={column.title} size={{ xs: 6, md: 2 }}><Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 2, color: "#F8FAFC" }}>{column.title}</Typography><Stack spacing={1} sx={{ color: "#94A3B8", fontSize: "0.88rem" }}>{column.links.map((link) => <Typography key={link} component="a" href="#" sx={linkSx}>{link}</Typography>)}</Stack></Grid>)}
        <Grid size={{ xs: 12, md: 3 }}><Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1, color: "#F8FAFC" }}>Stay Updated</Typography><Typography variant="body2" sx={{ color: "#94A3B8", mb: 2, fontSize: "0.82rem" }}>Get the latest opportunities and news.</Typography><Stack direction={{ xs: "column", sm: "row" }} spacing={1}><TextField placeholder="Enter your email" size="small" type="email" sx={{ flex: 1, minWidth: 0, bgcolor: "#1E293B", borderRadius: "8px", input: { color: "#FFF", fontSize: "0.85rem" }, "& .MuiOutlinedInput-notchedOutline": { borderColor: "#334155" } }} /><Button variant="contained" sx={{ bgcolor: "#0D9488", textTransform: "none", borderRadius: "8px", fontWeight: 700 }}>Subscribe</Button></Stack></Grid>
      </Grid><Divider sx={{ borderColor: "#1E293B", mb: 3 }} /><Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: "center", gap: 2, color: "#64748B", fontSize: "0.82rem" }}><Typography variant="caption">© 2026 HealthConnect AI. All rights reserved.</Typography><Stack direction="row" spacing={3} sx={{flexWrap:"wrap", justifyContent:"center"}} ><Typography component="a" href="#" sx={linkSx}>Terms of Service</Typography><Typography component="a" href="#" sx={linkSx}>Privacy Policy</Typography><Typography component="a" href="#" sx={linkSx}>Help & Support</Typography></Stack></Box></Container></Box>
    </Box>
  );
}