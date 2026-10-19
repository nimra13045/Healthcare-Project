"use client";

import React from "react";
import { Box, Container, Typography, Grid, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { motion } from "framer-motion";

const steps = [
  {
    number: "1",
    icon: <SearchIcon sx={{ fontSize: 32, color: "#07998F" }} />,
    title: "Search & Filter",
    description: "Find the right doctor by location, specialty or condition.",
  },
  {
    number: "2",
    icon: <CalendarMonthIcon sx={{ fontSize: 32, color: "#07998F" }} />,
    title: "Book Appointment",
    description: "Choose your preferred time and confirm your booking.",
  },
  {
    number: "3",
    icon: <VideoCallIcon sx={{ fontSize: 32, color: "#07998F" }} />,
    title: "Consult",
    description: "Visit in person or get online consultation.",
  },
  {
    number: "4",
    icon: <FavoriteIcon sx={{ fontSize: 32, color: "#07998F" }} />,
    title: "Stay Healthy",
    description: "Get follow-ups, reminders and AI health support.",
  },
];

export default function HowItWorks() {
  return (
    <Box sx={{ py: 10, backgroundColor: "#F8FBFC" }}>
      <Container maxWidth="lg">
        <Box  sx ={{textAlign:"center" ,mb :8}}>
          <Typography variant="overline" sx= {{color:"#07998F" ,fontWeight:700 ,letterSpacing:1.5}}>
            — SIMPLE & EASY
          </Typography>
          <Typography variant="h3"  sx={{fontWeight :800, color:"#15384B" ,mt:1}}>
            How HealthConnect AI Works
          </Typography>
          <Typography variant="body1" sx ={{color:"#507283",mt:1}} >
            Get quality healthcare in just a few simple steps.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {steps.map((step, index) => (
            <Grid size = {{xs :12 , sm :12 , md :3}} key={step.number}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    borderRadius: "24px",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #e2e8f0",
                    textAlign: "center",
                    position: "relative",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    boxShadow: "0px 8px 24px rgba(0,0,0,0.03)",
                  }}
                >
                  {/* Step Number Badge */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 16,
                      left: 16,
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      backgroundColor: "#07998F",
                      color: "#fff",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {step.number}
                  </Box>

                  {/* Icon Container */}
                  <Box
                    sx={{
                      width: 72,
                      height: 72,
                      borderRadius: "50%",
                      backgroundColor: "#f0fdfa",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      my: 2,
                    }}
                  >
                    {step.icon}
                  </Box>

                  <Typography variant="h6" sx = {{fontWeight :700, color :"#15384B", mb:1.5}} >
                    {step.title}
                  </Typography>
                  <Typography variant="body2" sx = {{ color:"#507283" ,lineHeight :1.6}}>
                    {step.description}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}