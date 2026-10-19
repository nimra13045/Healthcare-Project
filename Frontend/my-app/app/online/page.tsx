"use client";

import React, { useState, Suspense } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  Avatar,
  CircularProgress,
  Alert,
  Chip,
  Divider,
} from "@mui/material";

import VideoCallIcon from "@mui/icons-material/VideoCall";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";

import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";

function ConsultationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL Query Parameters se Doctor ki complete details dynamic extract kar rahe hain
  const doctorName = searchParams.get("name") || "Dr. Ayesha Khan";
  const qualification = searchParams.get("qualification") || "MBBS, FCPS (Medicine)";
  const specialty = searchParams.get("specialty") || "General Physician";
  const fee = searchParams.get("fee") || "1500";
  const location = searchParams.get("location") || "DHA Phase 6, Lahore";
  const doctorImage = searchParams.get("image") || "https://i.pravatar.cc/150?img=47";

  const [loading, setLoading] = useState(false);
  const [meetLink, setMeetLink] = useState("");

  // Google Meet Link Generate Karne Ka Handler
  const handleCreateMeetSession = async () => {
    setLoading(true);

    try {
      // Future API Call: const res = await fetch("/api/create-google-meet", { method: "POST" });
      setTimeout(() => {
        const generatedMeetUrl = "https://meet.google.com/abc-defg-hij";
        setMeetLink(generatedMeetUrl);
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Error creating Google Meet link:", error);
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 6, flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          p: { xs: 3, md: 5 },
          borderRadius: "24px",
          background: "linear-gradient(145deg, #ffffff, #f0fdfa)",
          border: "1px solid #dce8ed",
          boxShadow: "0 10px 30px rgba(7, 155, 145, 0.08)",
          textAlign: "center",
        }}
      >
        {/* Back Button */}
        <Box sx={{ textAlign: "left", mb: 2 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => router.back()}
            sx={{ color: "#507283", textTransform: "none", fontWeight: 600 }}
          >
            Back to Doctors
          </Button>
        </Box>

        {/* Selected Doctor Profile Card */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 3,
            p: 3,
            borderRadius: "18px",
            bgcolor: "#ffffff",
            border: "1px solid #e2e8f0",
          }}
        >
          <Box sx={{ position: "relative", mb: 1.5 }}>
            <Avatar
              src={doctorImage}
              alt={doctorName}
              sx={{ width: 100, height: 100, border: "3px solid #079b91" }}
            />
            <Chip
              icon={<VerifiedOutlinedIcon sx={{ fontSize: "14px !important", color: "#079b91 !important" }} />}
              label="Verified"
              size="small"
              sx={{
                position: "absolute",
                bottom: -8,
                left: "50%",
                transform: "translateX(-50%)",
                bgcolor: "#e6f4f3",
                color: "#079b91",
                fontWeight: 700,
                fontSize: "11px",
                height: "22px",
              }}
            />
          </Box>

          <Typography variant="h5" sx={{ fontWeight: 800, color: "#15384B", mt: 1 }}>
            {doctorName}
          </Typography>

          <Typography variant="body2" sx={{ color: "#64748b", mb: 1 }}>
            {qualification}
          </Typography>

          <Typography variant="subtitle2" sx={{ color: "#079b91", fontWeight: 700, display: "flex", alignItems: "center", gap: 0.5, mb: 2 }}>
            <MedicalServicesOutlinedIcon sx={{ fontSize: 18 }} />
            {specialty}
          </Typography>

          <Divider sx={{ width: "100%", my: 1.5 }} />

          {/* Location & Fee Row */}
          <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 3, color: "#475569", fontSize: "13px" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <LocationOnOutlinedIcon sx={{ color: "#079b91", fontSize: 18 }} />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{location}</Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <LocalAtmOutlinedIcon sx={{ color: "#079b91", fontSize: 18 }} />
              <Typography variant="body2" sx={{ fontWeight: 700, color: "#079b91" }}>
                PKR {Number(fee).toLocaleString()} Fee
              </Typography>
            </Box>
          </Box>
        </Box>

        <Typography variant="h6" sx={{ fontWeight: 700, color: "#15384B", mb: 1 }}>
          Online Video Consultation via Google Meet
        </Typography>
        <Typography variant="body2" sx={{ color: "#507283", mb: 4, maxWidth: 500, mx: "auto" }}>
          Click below to generate and join your secure video consultation room with <b>{doctorName}</b>.
        </Typography>

        {/* Action Button Section */}
        {!meetLink ? (
          <Button
            variant="contained"
            disabled={loading}
            onClick={handleCreateMeetSession}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <VideoCallIcon />}
            sx={{
              bgcolor: "#079b91",
              color: "#fff",
              py: 1.5,
              px: 4,
              borderRadius: "14px",
              fontWeight: 700,
              fontSize: "16px",
              textTransform: "none",
              boxShadow: "0 8px 20px rgba(7, 155, 145, 0.25)",
              "&:hover": { bgcolor: "#056f67" },
            }}
          >
            {loading ? "Creating Video Room..." : `Start Video Call with ${doctorName.split(" ")[0]} ${doctorName.split(" ")[1] || ""}`}
          </Button>
        ) : (
          <Box sx={{ my: 3 }}>
            <Alert
              severity="success"
              icon={<CheckCircleOutlinedIcon fontSize="inherit" />}
              sx={{ mb: 3, borderRadius: "12px", justifyContent: "center" }}
            >
              Meeting Room Created Successfully!
            </Alert>
            <Button
              component="a"
              href={meetLink}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              startIcon={<VideoCallIcon />}
              sx={{
                bgcolor: "#1a73e8",
                color: "#fff",
                py: 1.5,
                px: 4,
                borderRadius: "14px",
                fontWeight: 700,
                fontSize: "16px",
                textTransform: "none",
                boxShadow: "0 8px 20px rgba(26, 115, 232, 0.3)",
                "&:hover": { bgcolor: "#1557b0" },
              }}
            >
              Join Google Meet Room Now
            </Button>
          </Box>
        )}

        {/* Security Banner */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mt: 4, color: "#64748b" }}>
          <ShieldOutlinedIcon sx={{ color: "#079b91", fontSize: 20 }} />
          <Typography variant="caption" sx={{ fontWeight: 600 }}>
            End-to-End Encrypted Session via Google Meet & HealthConnect AI
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default function OnlineConsultationPage() {
  return (
    <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <Suspense fallback={
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
          <CircularProgress sx={{ color: "#079b91" }} />
        </Box>
      }>
        <ConsultationContent />
      </Suspense>
    </Box>
  );
}