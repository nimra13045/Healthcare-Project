"use client";

import React, { useState, type FormEvent } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  TextField,
  MenuItem,
  Card,
  Snackbar,
  Alert,
} from "@mui/material";

import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SecurityIcon from "@mui/icons-material/Security";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const locations = [
  "Lahore, Pakistan",
  "Karachi, Pakistan",
  "Islamabad, Pakistan",
  "Rawalpindi, Pakistan",
  "Faisalabad, Pakistan",
];

const specialties = [
  "All Specializations",
  "General Physician",
  "Dermatologist",
  "Cardiologist",
  "Gynecologist",
  "Pediatrician",
  "Neurologist",
];

const trustItems = [
  { label: "Verified Doctors", icon: VerifiedUserIcon },
  { label: "Secure & Private", icon: SecurityIcon },
  { label: "Easy Appointments", icon: EventAvailableIcon },
  { label: "24/7 AI Assistant", icon: SmartToyIcon },
];

export default function HeroSection() {
 const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("Lahore, Pakistan");
  const [specialization, setSpecialization] = useState(
    "All Specializations"
  );
  const [searchAlert, setSearchAlert] = useState(false);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchAlert(true);
    const docSection = document.getElementById("doctors");
    if (docSection) {
      docSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box
      id="home"
      component="section"
      sx={{
        position: "relative",
        background:
          "linear-gradient(180deg, #f0fdfa 0%, #f8fafc 100%)",
        pt: { xs: 4, sm: 6, md: 8 },
        pb: { xs: 7, md: 12 },
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              backgroundColor: "rgba(7, 153, 143, 0.1)",
              border: "1px solid rgba(7, 153, 143, 0.2)",
              borderRadius: "50px",
              px: 2,
              py: 0.8,
              mb: 3,
              maxWidth: "100%",
            }}
          >
            <VerifiedUserIcon
              sx={{ color: "#07998F", fontSize: 18, flexShrink: 0 }}
            />
            <Typography
              variant="body2"
              sx={{
                color: "#07998F",
                fontWeight: 600,
                fontSize: { xs: "0.72rem", sm: "0.85rem" },
              }}
            >
              Trusted Healthcare • Verified Doctors • Better Tomorrow
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={{ xs: 5, md: 4 }} sx={{ alignItems: "center" }}>
          {/* Left: Hero Content */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <Typography
                component="h1"
                variant="h1"
                sx={{
                  fontSize: {
                    xs: "2.35rem",
                    sm: "3rem",
                    md: "3.5rem",
                    lg: "3.65rem",
                  },
                  fontWeight: 800,
                  color: "#15384B",
                  lineHeight: 1.15,
                  letterSpacing: "-0.04em",
                  mb: 2,
                }}
              >
                Find the Right Doctor for{" "}
                <Box component="span" sx={{ color: "#07998F" }}>
                  Your Health
                </Box>
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "#507283",
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  lineHeight: 1.8,
                  mb: 4,
                  maxWidth: "540px",
                }}
              >
                Connect with healthcare professionals, book appointments,
                get AI-powered health support, and become part of a
                growing healthcare community — all in one place.
              </Typography>
            </motion.div>

            {/* Doctor Search Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <Card
                component="form"
                onSubmit={handleSearch}
                elevation={0}
                sx={{
                  p: { xs: 2, sm: 2 },
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0 20px 40px rgba(21, 56, 75, 0.08)",
                  borderRadius: "20px",
                  border: "1px solid rgba(7, 153, 143, 0.15)",
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: 1.5,
                  alignItems: "stretch",
                }}
              >
                {/* Search Field */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flex: 1.3,
                    minWidth: 0,
                    p: "8px 12px",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    backgroundColor: "#fafafa",
                  }}
                >
                  <SearchOutlinedIcon
                    sx={{ color: "#07998F", mr: 1.5, flexShrink: 0 }}
                  />
                  <TextField
                    fullWidth
                    variant="standard"
                    placeholder="Search doctor, specialty..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    slotProps={{
                      input: {
                        disableUnderline: true,
                        sx: { fontSize: "0.9rem", color: "#15384B" },
                      },
                      htmlInput: {
                        "aria-label": "Search doctors, specialties or conditions",
                      },
                    }}
                  />
                </Box>

                {/* Location Field */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flex: 1,
                    minWidth: 0,
                    p: "8px 12px",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    backgroundColor: "#fafafa",
                  }}
                >
                  <LocationOnOutlinedIcon
                    sx={{ color: "#07998F", mr: 0.5, flexShrink: 0 }}
                  />
                  <TextField
                    select
                    fullWidth
                    variant="standard"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    slotProps={{
                      input: {
                        disableUnderline: true,
                        sx: { fontSize: "0.9rem", color: "#15384B" },
                      },
                      htmlInput: {
                        "aria-label": "Choose city",
                      },
                    }}
                  >
                    {locations.map((loc) => (
                      <MenuItem key={loc} value={loc} sx={{ fontSize: "0.9rem" }}>
                        {loc}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>

                {/* Specialization Field */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flex: 1,
                    minWidth: 0,
                    p: "8px 12px",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    backgroundColor: "#fafafa",
                  }}
                >
                  <MedicalServicesOutlinedIcon
                    sx={{ color: "#07998F", mr: 1.5, flexShrink: 0 }}
                  />
                  <TextField
                    select
                    fullWidth
                    variant="standard"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    slotProps={{
                      input: {
                        disableUnderline: true,
                        sx: { fontSize: "0.9rem", color: "#15384B" },
                      },
                      htmlInput: {
                        "aria-label": "Choose medical specialization",
                      },
                    }}
                  >
                    {specialties.map((spec) => (
                      <MenuItem key={spec} value={spec} sx={{ fontSize: "0.9rem" }}>
                        {spec}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>

                {/* Search Button */}
                <Button
                  type="submit"
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  onClick={()=>router.push('/finddoctor')}
                  sx={{
                    width: { xs: "100%", md: "auto" },
                    backgroundColor: "#07998F",
                    color: "#FFFFFF",
                    py: 1.5,
                    px: 2.5,
                    borderRadius: "12px",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    boxShadow: "0 8px 20px rgba(7, 153, 143, 0.2)",
                    "&:hover": {
                      backgroundColor: "#056c64",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.25s ease",
                  }}
                >
                  Find a Doctor
                </Button>
              </Card>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <Grid container spacing={2} sx={{ mt: 2 }}>
                {trustItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Grid size={{ xs: 6, sm: 3 }} key={item.label}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          height: "100%",
                        }}
                      >
                        <Box
                          sx={{
                            p: 0.8,
                            flexShrink: 0,
                            backgroundColor: "rgba(7, 153, 143, 0.1)",
                            borderRadius: "8px",
                            display: "flex",
                          }}
                        >
                          <Icon sx={{ color: "#07998F", fontSize: 20 }} />
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                            color: "#15384B",
                            fontSize: "0.8rem",
                            lineHeight: 1.4,
                          }}
                        >
                          {item.label}
                        </Typography>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </motion.div>
          </Grid>

    {/* Right: Doctor Image */}

          <Grid size={{ xs: 12, lg: 6 }}>

            <motion.div

              initial={{ opacity: 0, scale: 0.94 }}

              animate={{ opacity: 1, scale: 1 }}

              transition={{ duration: 0.8, delay: 0.3 }}

              style={{

                position: "relative",

                display: "flex",

                justifyContent: "center",

              }}

            >

              <Box

                sx={{

                  position: "relative",

                  width: "100%",

                  maxWidth: "560px",

                  height: { xs: "340px", sm: "450px", md: "500px" },

                  borderRadius: { xs: "20px", md: "28px" },

                  overflow: "hidden",

                  boxShadow: "0 25px 50px -12px rgba(21, 56, 75, 0.15)",

                }}

              >

                <Image

                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=1000"

                  alt="Healthcare professional"

                  fill

                  priority

                  sizes="(max-width: 900px) 100vw, 50vw"

                  style={{

                    objectFit: "cover",

                    objectPosition: "top center",

                  }}

                />

              </Box>



              {/* Floating Badge */}

              <motion.div

                animate={{ y: [0, -10, 0] }}

                transition={{

                  repeat: Infinity,

                  duration: 4,

                  ease: "easeInOut",

                }}

                style={{

                  position: "absolute",

                  top: "30px",

                  right: "12px",

                  zIndex: 2,

                }}

              >

                <Box

                  sx={{

                    backgroundColor: "#FFFFFF",

                    p: { xs: 1.5, sm: 2 },

                    borderRadius: "16px",

                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",

                    border: "1px solid rgba(7, 153, 143, 0.2)",

                    display: "flex",

                    alignItems: "center",

                    gap: 1.5,

                  }}

                >

                  <Box

                    sx={{

                      width: 11,

                      height: 11,

                      borderRadius: "50%",

                      backgroundColor: "#07998F",

                      flexShrink: 0,

                      animation: "heroPulse 2s infinite",

                      "@keyframes heroPulse": {

                        "0%, 100%": {

                          opacity: 1,

                          transform: "scale(1)",

                        },

                        "50%": {

                          opacity: 0.5,

                          transform: "scale(0.8)",

                        },

                      },

                    }}

                  />



                  <Typography

                    variant="body2"

                    sx={{

                      fontWeight: 700,

                      color: "#15384B",

                      fontSize: "0.85rem",

                    }}

                  >

                    Your Health

                    <br />

                    <Box

                      component="span"

                      sx={{ color: "#07998F", fontWeight: 800 }}

                    >

                      Our Priority

                    </Box>

                  </Typography>

                </Box>

              </motion.div>

            </motion.div>

          </Grid>

        </Grid>

      </Container>
      {/* Search Notification */}
      <Snackbar
        open={searchAlert}
        autoHideDuration={3500}
        onClose={() => setSearchAlert(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setSearchAlert(false)}
          sx={{
            backgroundColor: "#07998F",
            color: "#FFFFFF",
            maxWidth: "100%",
          }}
        >
          Searching for &quot;{searchTerm || "All Doctors"}&quot; in{" "}
          {location} ({specialization})...
        </Alert>
      </Snackbar>
    </Box>
  );
}