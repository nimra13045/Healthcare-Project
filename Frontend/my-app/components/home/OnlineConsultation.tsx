"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
export default function OnlineConsultation() {
  const router =useRouter();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 10 },
        backgroundColor: "#FFFFFF",
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={{ xs: 4, md: 6 }}
          sx={{ alignItems: "center" }}
        >
          {/* Left Consultation Image */}
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ width: "100%" }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: { xs: 260, sm: 340, md: 380 },
                  borderRadius: "32px",
                  overflow: "hidden",
                  boxShadow:
                    "0px 20px 40px rgba(7, 153, 143, 0.15)",
                }}
              >
                <Image
                  src="/images/image.png"
                  alt="Online doctor consultation"
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              </Box>
            </motion.div>
          </Grid>

          {/* Right Text Content */}
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Typography
                variant="overline"
                sx={{
                  color: "#07998F",
                  fontWeight: 700,
                  letterSpacing: 1.5,
                }}
              >
                — ONLINE CONSULTATION
              </Typography>

              <Typography
                component="h2"
                variant="h3"
                sx={{
                  mt: 1,
                  mb: 2,
                  fontWeight: 800,
                  color: "#15384B",
                  fontSize: { xs: "1.8rem", md: "2.5rem" },
                  lineHeight: 1.25,
                }}
              >
                Healthcare at Your Fingertips
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  mb: 3,
                  color: "#507283",
                  lineHeight: 1.8,
                }}
              >
                Get expert medical advice from the comfort of your
                home. Our healthcare professionals are just a click away.
              </Typography>

              {/* Feature List */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  mb: 4,
                }}
              >
                {[
                  "Video & audio consultations",
                  "Secure & private sessions",
                  "Prescription & follow-up support",
                ].map((feature) => (
                  <Box
                    key={feature}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                    }}
                  >
                    <CheckCircleIcon
                      sx={{ color: "#07998F", flexShrink: 0 }}
                    />
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 600,
                        color: "#15384B",
                      }}
                    >
                      {feature}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Button
                variant="contained"
                onClick={() => router.push('/online')}
                sx={{
                  backgroundColor: "#07998F",
                  color: "#FFFFFF",
                  borderRadius: "16px",
                  px: 4,
                  py: 1.5,
                  fontWeight: 700,
                  textTransform: "none",
                  boxShadow:
                    "0px 8px 20px rgba(7, 153, 143, 0.3)",
                  "&:hover": {
                    backgroundColor: "#056f67",
                  },
                }}
              >
                Start Online Consultation →
              </Button>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Feedback Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="info"
          sx={{
            backgroundColor: "#E6F7F5",
            color: "#15384B",
            fontWeight: 600,
            width: "100%",
          }}
        >
          Online consultation is a demo feature and is not connected
          to a live consultation room yet.
        </Alert>
      </Snackbar>
    </Box>
  );
}
