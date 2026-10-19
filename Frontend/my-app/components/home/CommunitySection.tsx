"use client";

import React, { useState } from "react";
import { Box, Container, Typography, Button, Snackbar, Alert } from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
export default function CommunitySection() {
   const router = useRouter();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  return (
    <Box id="community" sx={{ py: 10, backgroundColor: "#F8FBFC", textAlign: "center" }}>
      <Container maxWidth="md">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <Typography variant="overline" sx ={{ color:"#07998F" ,fontWeight:700, letterSpacing :1.5}}>
            — HEALTHCARE COMMUNITY
          </Typography>
          <Typography variant="h3" sx= {{fontWeight:800 ,color:"#15384B", mt:1, mb:2}} >
            Better Health, Together
          </Typography>
          <Typography variant="body1" sx={{color:"#507283", mb:4 ,lineHeight:1.6}} >
            Patients, doctors, healthcare students and professionals can connect, share discussions, access educational resources, and find mutual community support.
          </Typography>
          <Button
            variant="contained"
            onClick={() => router.push("/community")}
            sx={{
              backgroundColor: "#07998F",
              color: "#fff",
              borderRadius: "16px",
              px: 5,
              py: 1.8,
              fontWeight: 700,
              textTransform: "none",
              boxShadow: "0px 8px 24px rgba(7, 153, 143, 0.3)",
              "&:hover": { backgroundColor: "#056f67" },
            }}
          >
            Explore Community →
          </Button>
        </motion.div>
      </Container>

      <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={() => setSnackbarOpen(false)} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert severity="success" sx={{ backgroundColor: "#07998F", color: "#fff", fontWeight: 600 }}>
          Welcome to HealthConnect AI Community Forums!
        </Alert>
      </Snackbar>
    </Box>
  );
}