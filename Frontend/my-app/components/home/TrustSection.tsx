
"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WorkIcon from "@mui/icons-material/Work";
import BusinessIcon from "@mui/icons-material/Business";
import { motion } from "framer-motion";

const stats = [
  {
    icon: <VerifiedUserIcon sx={{ fontSize: 36, color: "#07998F" }} />,
    value: "10,000+",
    label: "Verified Doctors",
  },
  {
    icon: <FavoriteIcon sx={{ fontSize: 36, color: "#07998F" }} />,
    value: "50,000+",
    label: "Happy Patients",
  },
  {
    icon: <WorkIcon sx={{ fontSize: 36, color: "#07998F" }} />,
    value: "1,000+",
    label: "Internship Opportunities",
  },
  {
    icon: <BusinessIcon sx={{ fontSize: 36, color: "#07998F" }} />,
    value: "500+",
    label: "Healthcare Organizations",
  },
];

export default function TrustSection() {
  return (
    <Box
      sx={{
        py: { xs: 7, md: 10 },
        backgroundColor: "#FFFFFF",
      }}
    >
      <Container maxWidth="lg">
        {/* Section Heading */}
        <Box
          sx={{
            textAlign: "center",
            mb: { xs: 4, md: 6 },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: "#15384B",
              mb: 2,
              fontSize: { xs: "1.8rem", md: "2.2rem" },
            }}
          >
            Trusted by Thousands
          </Typography>

          <Typography
            variant="body1"
            sx={{ color: "#507283" }}
          >
            Join our growing community of patients, doctors, students and
            healthcare organizations.
          </Typography>

          <Typography
            variant="caption"
            sx={{
              display: "block",
              mt: 1,
              color: "text.secondary",
            }}
          >
            (Illustrative demo values until real platform data is available)
          </Typography>
        </Box>

        {/* Statistics Cards */}
        <Grid container spacing={3}>
          {stats.map((stat, index) => (
            <Grid
              key={stat.label}
              size={{ xs: 12, sm: 6, md: 3 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                style={{ height: "100%" }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 3, md: 4 },
                    height: "100%",
                    boxSizing: "border-box",
                    borderRadius: "24px",
                    backgroundColor: "#F8FBFC",
                    border: "1px solid #e2e8f0",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    boxShadow: "0px 8px 24px rgba(0,0,0,0.02)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0px 16px 32px rgba(7,153,143,0.10)",
                      borderColor: "#07998F",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 72,
                      height: 72,
                      borderRadius: "50%",
                      backgroundColor: "#F0FDFA",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2,
                    }}
                  >
                    {stat.icon}
                  </Box>

                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 800,
                      color: "#15384B",
                      mb: 1,
                    }}
                  >
                    {stat.value}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "#507283",
                      fontWeight: 600,
                    }}
                  >
                    {stat.label}
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
