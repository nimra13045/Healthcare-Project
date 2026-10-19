
"use client";

import { useParams, useRouter } from "next/navigation";
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import { doctors } from "@/data/doctor";

export default function DoctorProfilePage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const doctorId = Number(params.id);
  const doctor = doctors.find((item) => item.id === doctorId);

  if (!doctor) {
    return (
      <Container maxWidth="md" sx={{ py: 10, textAlign: "center" }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 800, color: "#15384B", mb: 2 }}
        >
          Doctor Not Found
        </Typography>

        <Typography sx={{ color: "#64748B", mb: 3 }}>
          This doctor profile does not exist in the current demo data.
        </Typography>

        <Button
          variant="contained"
          onClick={() => router.push("/finddoctor")}
          sx={{
            bgcolor: "#07998F",
            textTransform: "none",
            "&:hover": { bgcolor: "#067D75" },
          }}
        >
          Back to Find Doctors
        </Button>
      </Container>
    );
  }

  const initials = doctor.name
    .replace(/^Dr\.\s*/i, "")
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const bookAppointment = (type: "physical" | "online") => {
    router.push(
      `/book-appoinment?doctorId=${doctor.id}&type=${type}`
    );
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#F7FAFC", py: 4 }}>
      <Container maxWidth="lg">
        <Button
          startIcon={<ArrowBackRoundedIcon />}
          onClick={() => router.push("/finddoctor")}
          sx={{
            mb: 3,
            color: "#15384B",
            fontWeight: 700,
            textTransform: "none",
          }}
        >
          Back to Doctors
        </Button>

        <Card
          elevation={0}
          sx={{
            p: { xs: 2.5, md: 4 },
            borderRadius: 4,
            border: "1px solid #E3ECEF",
            mb: 3,
          }}
        >
          <Stack
            sx={{
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "center", md: "flex-start" },
              gap: 3,
            }}
          >
            <Avatar
              src={doctor.image || undefined}
              alt={doctor.name}
              sx={{
                width: 125,
                height: 125,
                bgcolor: "#DDF3EF",
                color: "#087D75",
                fontSize: 32,
                fontWeight: 800,
              }}
            >
              {initials}
            </Avatar>

            <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}>
              <Typography
                variant="h4"
                sx={{
                  color: "#15384B",
                  fontWeight: 800,
                  mb: 1,
                  fontSize: { xs: 26, md: 34 },
                }}
              >
                {doctor.name}
              </Typography>

              <Typography
                sx={{ color: "#07998F", fontWeight: 700, fontSize: 18 }}
              >
                {doctor.specialty}
              </Typography>

              <Typography sx={{ color: "#64748B", mt: 1 }}>
                {doctor.qualifications}
              </Typography>

              <Stack
                sx={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: { xs: "center", md: "flex-start" },
                  gap: 1,
                  mt: 2,
                }}
              >
                <Chip
                  icon={<StarRoundedIcon />}
                  label={`${doctor.rating} (${doctor.reviews} reviews)`}
                  sx={{
                    bgcolor: "#FFF6DE",
                    color: "#8A6414",
                    fontWeight: 700,
                  }}
                />
                <Chip
                  label={`${doctor.experience} years experience`}
                  sx={{ bgcolor: "#EAF7F5", color: "#087D75" }}
                />
                <Chip
                  label={doctor.gender}
                  sx={{ bgcolor: "#F0F2F5", color: "#475569" }}
                />
              </Stack>
            </Box>

            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                width: { xs: "100%", md: 210 },
                bgcolor: "#F0FAF8",
                borderRadius: 3,
                textAlign: "center",
              }}
            >
              <Typography sx={{ color: "#64748B", fontSize: 13 }}>
                Consultation Fee
              </Typography>

              <Typography
                variant="h4"
                sx={{ color: "#15384B", fontWeight: 800, my: 1 }}
              >
                Rs. {doctor.fee.toLocaleString("en-PK")}
              </Typography>

              <Button
                fullWidth
                variant="contained"
                onClick={() => bookAppointment("physical")}
                sx={{
                  bgcolor: "#07998F",
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 700,
                  "&:hover": { bgcolor: "#067D75" },
                }}
              >
                Book Appointment
              </Button>
            </Paper>
          </Stack>
        </Card>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.5fr 1fr" },
            gap: 3,
            alignItems: "start",
          }}
        >
          <Stack sx={{ gap: 3 }}>
            <Paper
              elevation={0}
              sx={{ p: 3, border: "1px solid #E3ECEF", borderRadius: 3 }}
            >
              <Typography
                variant="h6"
                sx={{ color: "#15384B", fontWeight: 800, mb: 1.5 }}
              >
                About the Doctor
              </Typography>

              <Typography sx={{ color: "#64748B", lineHeight: 1.9 }}>
                {doctor.about}
              </Typography>

              <Divider sx={{ my: 2.5 }} />

              <Typography sx={{ color: "#64748B", fontSize: 13 }}>
                Qualifications
              </Typography>
              <Typography sx={{ color: "#15384B", fontWeight: 700, mb: 2 }}>
                {doctor.qualifications}
              </Typography>

              <Typography sx={{ color: "#64748B", fontSize: 13 }}>
                Languages
              </Typography>
              <Stack
                sx={{ flexDirection: "row", flexWrap: "wrap", gap: 1, mt: 1 }}
              >
                {doctor.languages.map((language) => (
                  <Chip key={language} label={language} variant="outlined" />
                ))}
              </Stack>
            </Paper>

            <Paper
              elevation={0}
              sx={{ p: 3, border: "1px solid #E3ECEF", borderRadius: 3 }}
            >
              <Typography
                variant="h6"
                sx={{ color: "#15384B", fontWeight: 800, mb: 2 }}
              >
                Services
              </Typography>

              <Stack
                sx={{ flexDirection: "row", flexWrap: "wrap", gap: 1 }}
              >
                {doctor.services.map((service) => (
                  <Chip
                    key={service}
                    label={service}
                    sx={{ bgcolor: "#EAF7F5", color: "#24635E" }}
                  />
                ))}
              </Stack>
            </Paper>
          </Stack>

          <Stack sx={{ gap: 3 }}>
            <Paper
              elevation={0}
              sx={{ p: 3, border: "1px solid #E3ECEF", borderRadius: 3 }}
            >
              <Typography
                variant="h6"
                sx={{ color: "#15384B", fontWeight: 800, mb: 2 }}
              >
                Clinic Information
              </Typography>

              <Typography sx={{ color: "#15384B", fontWeight: 700 }}>
                {doctor.clinic}
              </Typography>

              <Typography
                sx={{ color: "#64748B", mt: 0.5, lineHeight: 1.8 }}
              >
                <LocationOnRoundedIcon
                  sx={{ fontSize: 18, verticalAlign: "middle", mr: 0.5 }}
                />
                {doctor.address}, {doctor.city}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography sx={{ color: "#15384B", fontWeight: 700, mb: 1 }}>
                <AccessTimeRoundedIcon
                  sx={{ fontSize: 18, verticalAlign: "middle", mr: 1 }}
                />
                Availability
              </Typography>

              <Typography sx={{ color: "#64748B", fontSize: 14 }}>
                {doctor.availability}
              </Typography>
            </Paper>

            <Paper
              elevation={0}
              sx={{ p: 3, border: "1px solid #E3ECEF", borderRadius: 3 }}
            >
              <Typography
                variant="h6"
                sx={{ color: "#15384B", fontWeight: 800, mb: 2 }}
              >
                Consultation Options
              </Typography>

              {doctor.consultationTypes.includes("Physical") && (
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => bookAppointment("physical")}
                  sx={{
                    mb: 1.5,
                    py: 1.2,
                    borderColor: "#07998F",
                    color: "#07998F",
                    textTransform: "none",
                    fontWeight: 700,
                  }}
                >
                  <CalendarMonthRoundedIcon sx={{ mr: 1 }} />
                  Book Physical Visit
                </Button>
              )}

              {doctor.consultationTypes.includes("Online") && (
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => bookAppointment("online")}
                  sx={{
                    py: 1.2,
                    borderColor: "#315DA8",
                    color: "#315DA8",
                    textTransform: "none",
                    fontWeight: 700,
                  }}
                >
                  <VideocamRoundedIcon sx={{ mr: 1 }} />
                  Book Online Consultation
                </Button>
              )}
            </Paper>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
