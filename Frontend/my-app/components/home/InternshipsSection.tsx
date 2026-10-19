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
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import WorkIcon from "@mui/icons-material/Work";
import Image from "next/image";
import { motion } from "framer-motion";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

export default function InternshipsSection() {
  const router = useRouter();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const features = [
    {
      icon: <LocalHospitalIcon />,
      text: "Top Hospitals & Clinics",
    },
    {
      icon: <VerifiedUserIcon />,
      text: "Verified Opportunities",
    },
    {
      icon: <WorkIcon />,
      text: "Build Your Career",
    },
  ];

  return (
    <Box
      id="internships"
      sx={{
        py: { xs: 7, md: 10 },
        backgroundColor: "#F0FDFA",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={{ xs: 5, md: 6 }}
          sx={{ alignItems: "center" }}
        >
          {/* Left Content */}
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
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
                — HEALTHCARE INTERNSHIPS
              </Typography>

              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  color: "#15384B",
                  mt: 1,
                  mb: 2,
                  fontSize: { xs: "2rem", md: "2.7rem" },
                  lineHeight: 1.2,
                }}
              >
                Gain Real-World Experience
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "#507283",
                  mb: 4,
                  lineHeight: 1.8,
                }}
              >
                Explore healthcare internship opportunities at hospitals and
                healthcare organizations. Build your skills, expand your
                network, and kick-start your career.
              </Typography>

              <Button
                variant="contained"
                onClick={() => router.push('/internship')}
                sx={{
                  backgroundColor: "#07998F",
                  color: "#fff",
                  borderRadius: "16px",
                  px: 4,
                  py: 1.5,
                  fontWeight: 700,
                  textTransform: "none",
                  boxShadow: "0px 8px 20px rgba(7, 153, 143, 0.3)",
                  "&:hover": {
                    backgroundColor: "#056f67",
                  },
                }}
              >
                Explore Internships →
              </Button>
            </motion.div>
          </Grid>

          {/* Right Image and Feature Badges */}
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Box
                sx={{
                  position: "relative",
                  pb: { xs: 3, sm: 2 },
                  pr: { xs: 0, sm: 2 },
                }}
              >
                {/* Main Image */}
                <Box
                  sx={{
                    width: "100%",
                    height: { xs: 260, sm: 320, md: 360 },
                    borderRadius: "32px",
                    overflow: "hidden",
                    position: "relative",
                    boxShadow: "0px 20px 40px rgba(7, 153, 143, 0.15)",
                  }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800&auto=format&fit=crop"
                    alt="Medical students and healthcare team"
                    fill
                    priority={false}
                    sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 550px"
                    style={{ objectFit: "cover" }}
                  />
                </Box>

                {/* Floating Feature Badges */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: { xs: 0, sm: -10 },
                    right: { xs: 0, sm: 10 },
                    backgroundColor: "#ffffff",
                    p: { xs: 1.5, sm: 2 },
                    borderRadius: "20px",
                    boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                    maxWidth: "100%",
                  }}
                >
                  {features.map((feature) => (
                    <Box
                      key={feature.text}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                      }}
                    >
                      {React.cloneElement(feature.icon, {
                        sx: { color: "#07998F", fontSize: 20 },
                      })}

                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 700,
                          color: "#15384B",
                        }}
                      >
                        {feature.text}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Demo Notification */}
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
            backgroundColor: "#07998F",
            color: "#fff",
            fontWeight: 600,
          }}
        >
          Internship listings are not connected yet. This feature is a demo.
        </Alert>
      </Snackbar>
    </Box>
  );
}
