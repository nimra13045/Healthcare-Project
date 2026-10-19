"use client";

import { useMemo, useState } from "react";
import {
  Alert, Avatar, Box, Button, Card, CardContent, Chip, Container,
  Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton,
  Rating, Typography,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VerifiedIcon from "@mui/icons-material/Verified";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { doctors as doctorData } from "@/data/doctor";

export default function FeaturedDoctors() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});
  const [selectedDoctor, setSelectedDoctor] =
    useState<(typeof doctorData)[number] | null>(null);
  const [loginError, setLoginError] = useState("");

  // Highest-rated doctors appear first; reviews break rating ties.
  const featuredDoctors = useMemo(
    () =>
      [...doctorData]
        .sort(
          (a, b) =>
            b.rating - a.rating ||
            b.reviews - a.reviews ||
            b.experience - a.experience
        )
        .slice(0, 4),
    []
  );

  const toggleFavorite = (id: number) => {
    setFavorites((previous) => ({ ...previous, [id]: !previous[id] }));
  };

  const closeLoginDialog = () => {
    setSelectedDoctor(null);
    setLoginError("");
  };

  const handleBookClick = (doctor: (typeof doctorData)[number]) => {
    const isLoggedIn =
      typeof window !== "undefined" &&
      localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      setSelectedDoctor(doctor);
      setLoginError(
        "You must be logged in to book an appointment. Please sign in first."
      );
      return;
    }

    // This matches the existing app/book-appoinment route name.
    const type = doctor.consultationTypes.includes("Online")
      ? "Online"
      : "Physical";
    router.push(`/book-appoinment?doctorId=${doctor.id}&type=${type}`);
  };

  return (
    <Box id="doctors" component="section" sx={{ py: { xs: 6, md: 10 }, bgcolor: "#FFFFFF" }}>
      <Container maxWidth="lg">
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
            <Typography variant="overline" sx={{ color: "#07998F", fontWeight: 700, letterSpacing: 1.5 }}>
              — FEATURED DOCTORS
            </Typography>
            <Typography
              component="h2"
              variant="h3"
              sx={{ mt: 1, fontWeight: 800, color: "#15384B", fontSize: { xs: "1.8rem", md: "2.5rem" } }}
            >
              Top Rated Healthcare Professionals
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, color: "#507283", lineHeight: 1.8 }}>
              Explore our highest-rated healthcare professionals and request an appointment.
            </Typography>
          </Box>
          <Button
            component={Link}
            href="/finddoctor"
            sx={{ color: "#07998F", fontWeight: 700, textTransform: "none", fontSize: "1rem" }}
          >
            View All Doctors →
          </Button>
        </Box>

        <Grid container spacing={3}>
          {featuredDoctors.map((doctor, index) => {
            const initials = doctor.name
              .replace(/^Dr\.?\s*/i, "")
              .split(/\s+/)
              .map((part) => part[0])
              .slice(0, 2)
              .join("")
              .toUpperCase();

            return (
              <Grid key={doctor.id} size={{ xs: 12, sm: 6, md: 3 }} sx={{ display: "flex" }}>
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
                      width: "100%", display: "flex", flexDirection: "column",
                      borderRadius: "24px", border: "1px solid #e2e8f0",
                      bgcolor: "#F8FBFC", overflow: "hidden", transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0px 16px 32px rgba(7, 153, 143, 0.12)",
                        borderColor: "#07998F",
                      },
                    }}
                  >
                    <Box sx={{ position: "relative", height: 220, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "#E8F5F4" }}>
                      {doctor.image ? (
                        <Box component="img" src={doctor.image} alt={doctor.name} sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <Avatar sx={{ width: 112, height: 112, bgcolor: "#07998F", color: "#FFFFFF", fontSize: 34, fontWeight: 800 }}>
                          {initials}
                        </Avatar>
                      )}
                      <IconButton
                        aria-label={favorites[doctor.id] ? `Remove ${doctor.name} from favorites` : `Add ${doctor.name} to favorites`}
                        onClick={() => toggleFavorite(doctor.id)}
                        size="small"
                        sx={{ position: "absolute", top: 12, right: 12, bgcolor: "rgba(255,255,255,0.9)", color: favorites[doctor.id] ? "#e53e3e" : "#15384B", "&:hover": { bgcolor: "#FFFFFF" } }}
                      >
                        {favorites[doctor.id] ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
                      </IconButton>
                      <Chip
                        icon={<VerifiedIcon />}
                        label="Featured"
                        size="small"
                        sx={{ position: "absolute", bottom: 12, left: 12, bgcolor: "#07998F", color: "#FFFFFF", fontWeight: 600, "& .MuiChip-icon": { color: "#FFFFFF" } }}
                      />
                    </Box>

                    <CardContent sx={{ p: 2.5, display: "flex", flexDirection: "column", flexGrow: 1 }}>
                      <Typography component="h3" variant="h6" sx={{ fontWeight: 700, color: "#15384B" }}>
                        {doctor.name}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 0.5, mb: 1.5, color: "#07998F", fontWeight: 600 }}>
                        {doctor.specialty}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 0.75, mb: 1.5 }}>
                        <Rating value={doctor.rating} precision={0.1} readOnly size="small" />
                        <Typography variant="body2" sx={{ fontWeight: 700, color: "#15384B" }}>{doctor.rating.toFixed(1)}</Typography>
                        <Typography variant="caption" sx={{ color: "#507283" }}>({doctor.reviews} reviews)</Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1, color: "#507283" }}>
                        <WorkHistoryIcon fontSize="small" sx={{ color: "#07998F", flexShrink: 0 }} />
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>{doctor.experience}+ years experience</Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1, mb: 2.5, color: "#507283" }}>
                        <LocationOnIcon fontSize="small" sx={{ color: "#07998F", flexShrink: 0 }} />
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>{doctor.address || doctor.city}</Typography>
                      </Box>

                      <Box sx={{ mt: "auto", display: "flex", flexDirection: "column", gap: 1.5 }}>
                        <Button
                          component={Link}
                          href={`/doctors/${doctor.id}`}
                          variant="outlined"
                          fullWidth
                          sx={{ borderColor: "#07998F", color: "#07998F", borderRadius: "14px", py: 1, fontWeight: 700, textTransform: "none", "&:hover": { borderColor: "#056f67", bgcolor: "rgba(7, 153, 143, 0.04)" } }}
                        >
                          View Profile
                        </Button>
                        <Button
                          variant="contained"
                          fullWidth
                          onClick={() => handleBookClick(doctor)}
                          sx={{ bgcolor: "#07998F", color: "#FFFFFF", borderRadius: "14px", py: 1, fontWeight: 700, textTransform: "none", boxShadow: "none", "&:hover": { bgcolor: "#056f67", boxShadow: "0px 6px 16px rgba(7, 153, 143, 0.25)" } }}
                        >
                          Book Appointment
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>

        <Dialog
          open={Boolean(selectedDoctor && loginError)}
          onClose={closeLoginDialog}
          maxWidth="sm"
          fullWidth
          slotProps={{ paper: { sx: { borderRadius: "24px", p: { xs: 1, sm: 2 } } } }}
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
                <Alert severity="error" sx={{ my: 2 }}>{loginError}</Alert>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => router.push("/login")}
                  sx={{ bgcolor: "#07998F", fontWeight: 700, borderRadius: "12px", py: 1.2, "&:hover": { bgcolor: "#056f67" } }}
                >
                  Go to Login / Register
                </Button>
              </DialogContent>
              <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={closeLoginDialog} sx={{ color: "#507283", fontWeight: 600 }}>Cancel</Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Container>
    </Box>
  );
}
