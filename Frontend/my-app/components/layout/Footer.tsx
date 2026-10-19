"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Demo only: connect a backend or newsletter service for real subscriptions.
    setError("");
    setSubscribed(true);
    setEmail("");
  };

  const quickLinks = [
    "Home",
    "Find a Doctor",
    "Internships",
    "Community",
    "AI Assistant",
    "About",
  ];

  const userLinks = [
    "Patient Support",
    "How It Works",
    "Privacy Policy",
    "Terms & Conditions",
    "Contact Us",
  ];

  const getHref = (label: string) => {
    const hrefs: Record<string, string> = {
      Home: "#home",
      "Find a Doctor": "#doctors",
      Internships: "#internships",
      Community: "#community",
      "AI Assistant": "#ai-assistant",
      About: "/about",
      "Patient Support": "#patient-support",
      "How It Works": "#how-it-works",
      "Privacy Policy": "/privacy",
      "Terms & Conditions": "/terms",
      "Contact Us": "/contact",
    };

    return hrefs[label] ?? "#home";
  };

  const socialLinks = [
    { label: "Facebook", icon: <FacebookIcon /> },
    { label: "Twitter", icon: <TwitterIcon /> },
    { label: "Instagram", icon: <InstagramIcon /> },
    { label: "LinkedIn", icon: <LinkedInIcon /> },
    { label: "YouTube", icon: <YouTubeIcon /> },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#0B2331",
        color: "#FFFFFF",
        pt: { xs: 6, md: 8 },
        pb: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 6 }} sx={{ mb: 6 }}>
          {/* Brand Info */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                mb: 2,
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#07998F",
                  borderRadius: "50%",
                  width: 36,
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF",
                  flexShrink: 0,
                }}
              >
                <FavoriteIcon fontSize="small" />
              </Box>

              <Typography
                variant="h6"
                sx={{ fontWeight: 800, color: "#FFFFFF" }}
              >
                HealthConnect AI
              </Typography>
            </Box>

            <Typography
              variant="body2"
              sx={{
                color: "#94A3B8",
                mb: 3,
                lineHeight: 1.8,
              }}
            >
              Connecting people with healthcare professionals, creating
              opportunities for future healthcare heroes, and building a
              healthier community.
            </Typography>

            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {socialLinks.map((social) => (
                <IconButton
                  key={social.label}
                  aria-label={social.label}
                  sx={{
                    color: "#94A3B8",
                    "&:hover": { color: "#07998F" },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid size={{ xs: 6, md: 2 }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, color: "#FFFFFF", mb: 2 }}
            >
              Quick Links
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {quickLinks.map((link) => (
                <Typography
                  key={link}
                  component="a"
                  href={getHref(link)}
                  sx={{
                    color: "#94A3B8",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    "&:hover": { color: "#07998F" },
                  }}
                >
                  {link}
                </Typography>
              ))}
            </Box>
          </Grid>

          {/* For Users */}
          <Grid size={{ xs: 6, md: 2 }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, color: "#FFFFFF", mb: 2 }}
            >
              For Users
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {userLinks.map((item) => (
                <Typography
                  key={item}
                  component="a"
                  href={getHref(item)}
                  sx={{
                    color: "#94A3B8",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    "&:hover": { color: "#07998F" },
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          </Grid>

          {/* Newsletter */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, color: "#FFFFFF", mb: 2 }}
            >
              Stay Updated
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: "#94A3B8", mb: 2, lineHeight: 1.7 }}
            >
              Get the latest updates, health tips and opportunities directly
              in your inbox.
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubscribe}
              sx={{ display: "flex", gap: 1 }}
            >
              <TextField
                fullWidth
                size="small"
                type="email"
                required
                value={email}
                placeholder="Enter your email"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                error={Boolean(error)}
                helperText={error}
                slotProps={{
                  htmlInput: {
                    "aria-label": "Email address for newsletter",
                  },
                }}
                sx={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  borderRadius: "12px",
                  input: { color: "#FFFFFF" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "rgba(255,255,255,0.2)",
                    },
                    "&:hover fieldset": {
                      borderColor: "#07998F",
                    },
                  },
                  "& .MuiFormHelperText-root": {
                    mx: 0,
                  },
                }}
              />

              <Button
                type="submit"
                aria-label="Subscribe to newsletter"
                variant="contained"
                sx={{
                  backgroundColor: "#07998F",
                  borderRadius: "12px",
                  px: 2,
                  minWidth: 50,
                  alignSelf: "flex-start",
                  "&:hover": { backgroundColor: "#056F67" },
                }}
              >
                <ArrowForwardIcon />
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom Bar */}
        <Box
          sx={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            pt: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: "#94A3B8" }}>
            © 2026 HealthConnect AI. All rights reserved.
          </Typography>

          <Typography variant="body2" sx={{ color: "#94A3B8" }}>
            Better Care, Together. ❤️
          </Typography>
        </Box>
      </Container>

      {/* Newsletter Feedback */}
      <Snackbar
        open={subscribed}
        autoHideDuration={4000}
        onClose={() => setSubscribed(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSubscribed(false)}
          severity="success"
          sx={{
            backgroundColor: "#07998F",
            color: "#FFFFFF",
            fontWeight: 600,
          }}
        >
          Demo subscription successful! Newsletter service is not connected yet.
        </Alert>
      </Snackbar>
    </Box>
  );
}
