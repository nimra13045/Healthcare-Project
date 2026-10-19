"use client";

import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Rating,
  TextField,
  Typography,
} from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VerifiedIcon from "@mui/icons-material/Verified";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  experience: string;
  location: string;
  image: string;
}

const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Ahmed Raza",
    specialty: "General Physician",
    rating: 4.8,
    reviews: 124,
    experience: "12+ years experience",
    location: "Lahore, Pakistan",
    image: "/images/doc1.png",
  },
  {
    id: 2,
    name: "Dr. Ayesha Khan",
    specialty: "Dermatologist",
    rating: 4.9,
    reviews: 99,
    experience: "10+ years experience",
    location: "Karachi, Pakistan",
    image: "/images/doc2.png",
  },
  {
    id: 3,
    name: "Dr. Aqsa kamal",
    specialty: "Cardiologist",
    rating: 4.7,
    reviews: 76,
    experience: "15+ years experience",
    location: "Islamabad, Pakistan",
    image: "/images/doc5.png",
  },
  {
    id: 4,
    name: "Dr. Usman Tariq",
    specialty: "Gynecologist",
    rating: 4.8,
    reviews: 112,
    experience: "11+ years experience",
    location: "Lahore, Pakistan",
    image: "/images/doc6.png",
  },
];

export default function FeaturedDoctors() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [patientName, setPatientName] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [visitReason, setVisitReason] = useState("");

  const toggleFavorite = (id: number) => {
    setFavorites((previous) => ({
      ...previous,
      [id]: !previous[id],
    }));
  };

  const closeBookingDialog = () => {
    setSelectedDoctor(null);
    setBookingSuccess(false);
    setLoginError("");
    setPatientName("");
    setAppointmentDate("");
    setVisitReason("");
  };

  const handleBookClick = (doctor: Doctor) => {
    // Check if user is logged in via localStorage
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      setLoginError("You must be logged in to book an appointment. Please sign in first.");
      setSelectedDoctor(doctor); // Open dialog to show login error
      return;
    }

    // If logged in, directly navigate to book-appointment page passing doctor details via query params
    router.push(
      `/book-appointment?id=${doctor.id}&name=${encodeURIComponent(
        doctor.name
      )}&specialty=${encodeURIComponent(
        doctor.specialty
      )}&location=${encodeURIComponent(
        doctor.location
      )}&image=${encodeURIComponent(doctor.image)}`
    );
  };

  const handleBookSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBookingSuccess(true);
  };

  return (
    <Box
      id="doctors"
      component="section"
      sx={{ py: { xs: 6, md: 10 }, bgcolor: "#FFFFFF" }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "flex-end" },
            mb: 6,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box sx={{ maxWidth: 720 }}>
            <Typography
              variant="overline"
              sx={{
                color: "#07998F",
                fontWeight: 700,
                letterSpacing: 1.5,
              }}
            >
              — FEATURED DOCTORS
            </Typography>

            <Typography
              component="h2"
              variant="h3"
              sx={{
                mt: 1,
                fontWeight: 800,
                color: "#15384B",
                fontSize: { xs: "1.8rem", md: "2.5rem" },
              }}
            >
              Top Rated Healthcare Professionals
            </Typography>

            <Typography
              variant="body1"
              sx={{ mt: 1, color: "#507283", lineHeight: 1.8 }}
            >
              Explore healthcare professionals across multiple specialties
              and request an appointment.
            </Typography>
          </Box>

          <Button
            href="/finddoctor"
            sx={{
              color: "#07998F",
              fontWeight: 700,
              textTransform: "none",
              fontSize: "1rem",
            }}
          >
            View All Doctors →
          </Button>
        </Box>

        {/* Doctor Cards */}
        <Grid container spacing={3}>
          {doctors.map((doctor, index) => (
            <Grid
              key={doctor.id}
              size={{ xs: 12, sm: 6, md: 3 }}
              sx={{ display: "flex" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                style={{ width: "100%", display: "flex" }}
              >
                <Card
                  elevation={0}
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "24px",
                    border: "1px solid #e2e8f0",
                    bgcolor: "#F8FBFC",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0px 16px 32px rgba(7, 153, 143, 0.12)",
                      borderColor: "#07998F",
                    },
                  }}
                >
                  {/* Doctor Image */}
                  <Box
                    sx={{
                      position: "relative",
                      height: 220,
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      fill
                      sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 25vw"
                      style={{ objectFit: "cover" }}
                    />

                    <IconButton
                      aria-label={
                        favorites[doctor.id]
                          ? `Remove ${doctor.name} from favorites`
                          : `Add ${doctor.name} to favorites`
                      }
                      onClick={() => toggleFavorite(doctor.id)}
                      sx={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        bgcolor: "rgba(255,255,255,0.9)",
                        color: favorites[doctor.id] ? "#e53e3e" : "#15384B",
                        "&:hover": { bgcolor: "#FFFFFF" },
                      }}
                      size="small"
                    >
                      {favorites[doctor.id] ? (
                        <FavoriteIcon fontSize="small" />
                      ) : (
                        <FavoriteBorderIcon fontSize="small" />
                      )}
                    </IconButton>

                    <Chip
                      icon={<VerifiedIcon />}
                      label="Verified"
                      size="small"
                      sx={{
                        position: "absolute",
                        bottom: 12,
                        left: 12,
                        bgcolor: "#07998F",
                        color: "#FFFFFF",
                        fontWeight: 600,
                        "& .MuiChip-icon": { color: "#FFFFFF" },
                      }}
                    />
                  </Box>

                  {/* Doctor Details */}
                  <CardContent
                    sx={{
                      p: 2.5,
                      display: "flex",
                      flexDirection: "column",
                      flexGrow: 1,
                    }}
                  >
                    <Typography
                      component="h3"
                      variant="h6"
                      sx={{ fontWeight: 700, color: "#15384B" }}
                    >
                      {doctor.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        mt: 0.5,
                        mb: 1.5,
                        color: "#07998F",
                        fontWeight: 600,
                      }}
                    >
                      {doctor.specialty}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 0.75,
                        mb: 1.5,
                      }}
                    >
                      <Rating
                        value={doctor.rating}
                        precision={0.1}
                        readOnly
                        size="small"
                      />
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 700, color: "#15384B" }}
                      >
                        {doctor.rating}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#507283" }}>
                        ({doctor.reviews} reviews)
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 1,
                        color: "#507283",
                      }}
                    >
                      <WorkHistoryIcon
                        fontSize="small"
                        sx={{ color: "#07998F", flexShrink: 0 }}
                      />
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>
                        {doctor.experience}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 2.5,
                        color: "#507283",
                      }}
                    >
                      <LocationOnIcon
                        fontSize="small"
                        sx={{ color: "#07998F", flexShrink: 0 }}
                      />
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>
                        {doctor.location}
                      </Typography>
                    </Box>

                    {/* TWO BUTTONS: View Profile & Book Appointment */}
                    <Box sx={{ mt: "auto", display: "flex", flexDirection: "column", gap: 1.5 }}>
                      <Button
                        variant="outlined"
                        fullWidth
                        href={`/finddoctor`}
                        sx={{
                          borderColor: "#07998F",
                          color: "#07998F",
                          borderRadius: "14px",
                          py: 1,
                          fontWeight: 700,
                          textTransform: "none",
                          "&:hover": {
                            borderColor: "#056f67",
                            bgcolor: "rgba(7, 153, 143, 0.04)",
                          },
                        }}
                      >
                        View Profile
                      </Button>

                      <Button
                        variant="contained"
                        fullWidth
                        onClick={() => handleBookClick(doctor)}
                        sx={{
                          bgcolor: "#07998F",
                          color: "#FFFFFF",
                          borderRadius: "14px",
                          py: 1,
                          fontWeight: 700,
                          textTransform: "none",
                          boxShadow: "none",
                          "&:hover": {
                            bgcolor: "#056f67",
                            boxShadow: "0px 6px 16px rgba(7, 153, 143, 0.25)",
                          },
                        }}
                      >
                        Book Appointment
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Appointment Booking Dialog (Only shows if login fails) */}
        <Dialog
          open={Boolean(selectedDoctor && loginError)}
          onClose={closeBookingDialog}
          maxWidth="sm"
          fullWidth
          slotProps={{
            paper: {
              sx: {
                borderRadius: "24px",
                p: { xs: 1, sm: 2 },
              },
            },
          }}
        >
          {selectedDoctor && (
            <>
              <DialogTitle>
                <Typography
                  component="h2"
                  variant="h5"
                  sx={{ fontWeight: 800, color: "#15384B" }}
                >
                  Login Required
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#507283", mt: 0.5 }}
                >
                  To book an appointment with {selectedDoctor.name}, you need to sign in first.
                </Typography>
              </DialogTitle>

              <DialogContent>
                <Box sx={{ my: 2 }}>
                  <Alert severity="error" sx={{ mb: 3 }}>
                    {loginError}
                  </Alert>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => router.push("/login")}
                    sx={{
                      bgcolor: "#07998F",
                      fontWeight: 700,
                      borderRadius: "12px",
                      py: 1.2,
                      "&:hover": { bgcolor: "#056f67" },
                    }}
                  >
                    Go to Login / Register
                  </Button>
                </Box>
              </DialogContent>
              <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={closeBookingDialog} sx={{ color: "#507283", fontWeight: 600 }}>
                  Cancel
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Container>
    </Box>
  );
}