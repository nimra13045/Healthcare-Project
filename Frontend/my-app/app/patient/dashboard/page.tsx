"use client";

import React from "react";
import Link from "next/link";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  IconButton,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import MedicalServicesRoundedIcon from "@mui/icons-material/MedicalServicesRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import MonitorHeartRoundedIcon from "@mui/icons-material/MonitorHeartRounded";
import MedicationRoundedIcon from "@mui/icons-material/MedicationRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";

const navigation = [
  { label: "Dashboard", icon: <DashboardRoundedIcon />, href: "/patient/dashboard" },
  { label: "My Appointments", icon: <CalendarMonthRoundedIcon />, href: "/patient/appointments" },
  { label: "Find a Doctor", icon: <MedicalServicesRoundedIcon />, href: "/finddoctor" },
  { label: "Favorite Doctors", icon: <FavoriteRoundedIcon />, href: "/patient/favorites" },
  { label: "Medical Records", icon: <DescriptionRoundedIcon />, href: "/patient/records" },
  { label: "Settings", icon: <SettingsRoundedIcon />, href: "/patient/settings" },
];

const appointments = [
  {
    name: "Dr. Sarah Ahmed",
    specialty: "Cardiologist",
    date: "16 October 2026",
    time: "10:30 AM",
    type: "Online Consultation",
    status: "Confirmed",
    initials: "SA",
    color: "#DDF4F0",
  },
  {
    name: "Dr. Hamza Ali",
    specialty: "General Physician",
    date: "19 October 2026",
    time: "04:00 PM",
    type: "Physical Visit",
    status: "Pending",
    initials: "HA",
    color: "#E6EDFF",
  },
];

const healthStats = [
  {
    title: "Heart Rate",
    value: "78",
    unit: "bpm",
    detail: "Normal range",
    icon: <FavoriteBorderRoundedIcon />,
    color: "#E6536B",
    background: "#FFF0F2",
    progress: 65,
  },
  {
    title: "Blood Pressure",
    value: "120/80",
    unit: "mmHg",
    detail: "Last recorded",
    icon: <MonitorHeartRoundedIcon />,
    color: "#3985D8",
    background: "#EAF3FF",
    progress: 75,
  },
  {
    title: "Medications",
    value: "2",
    unit: "active",
    detail: "Current medicines",
    icon: <MedicationRoundedIcon />,
    color: "#9A69D6",
    background: "#F4EDFF",
    progress: 45,
  },
];

export default function PatientDashboard() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        backgroundColor: "#F5F9FA",
        color: "#15384B",
      }}
    >
      {/* Sidebar */}
      <Box
        component="aside"
        sx={{
          width: { xs: "100%", md: 250 },
          minWidth: { md: 250 },
          backgroundColor: "#FFFFFF",
          borderRight: { xs: "none", md: "1px solid #E7EEF0" },
          borderBottom: { xs: "1px solid #E7EEF0", md: "none" },
          px: 2.5,
          py: 3,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Box
          component={Link}
          href="/"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.2,
            textDecoration: "none",
            color: "#15384B",
            px: 1,
          }}
        >
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: 2.5,
              backgroundColor: "#07998F",
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MedicalServicesRoundedIcon sx={{ fontSize: 27 }} />
          </Box>

          <Box>
            <Typography sx={{ fontSize: 19, fontWeight: 800, lineHeight: 1.2 }}>
              HealthConnect
            </Typography>
            <Typography sx={{ fontSize: 11, color: "#07998F", fontWeight: 700 }}>
              AI HEALTHCARE PLATFORM
            </Typography>
          </Box>
        </Box>

        <Box sx={{ px: 1, pt: 1 }}>
          <Typography
            sx={{
              fontSize: 11,
              color: "#8A9BA5",
              fontWeight: 800,
              letterSpacing: 1.3,
              mb: 1.5,
            }}
          >
            PATIENT MENU
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.8 }}>
            {navigation.map((item, index) => (
              <Button
                key={item.label}
                component={Link}
                href={item.href}
                startIcon={item.icon}
                fullWidth
                sx={{
                  justifyContent: "flex-start",
                  textTransform: "none",
                  fontSize: 13,
                  fontWeight: index === 0 ? 700 : 500,
                  borderRadius: 2.5,
                  px: 1.5,
                  py: 1.35,
                  color: index === 0 ? "#07998F" : "#617986",
                  backgroundColor: index === 0 ? "#E8F7F5" : "transparent",
                  "& .MuiButton-startIcon": { mr: 1.5 },
                  "&:hover": {
                    backgroundColor: "#E8F7F5",
                    color: "#07998F",
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Box>

        <Paper
          elevation={0}
          sx={{
            mt: { xs: 0, md: "auto" },
            p: 2.2,
            borderRadius: 3,
            background: "linear-gradient(145deg, #E9F8F6, #F2FAFC)",
            border: "1px solid #D9EFEC",
          }}
        >
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: 2,
              backgroundColor: "#FFFFFF",
              color: "#07998F",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 1.5,
            }}
          >
            <PsychologyRoundedIcon sx={{ fontSize: 25 }} />
          </Box>

          <Typography sx={{ fontSize: 14, fontWeight: 800, mb: 0.8 }}>
            Need health guidance?
          </Typography>

          <Typography sx={{ fontSize: 12, lineHeight: 1.7, color: "#617986", mb: 1.8 }}>
            Get general health information from your AI assistant.
          </Typography>

          <Button
            component={Link}
            href="/AIassistant"
            fullWidth
            endIcon={<ArrowForwardRoundedIcon />}
            sx={{
              backgroundColor: "#07998F",
              color: "#FFFFFF",
              borderRadius: 2,
              py: 1,
              textTransform: "none",
              fontSize: 12,
              fontWeight: 700,
              "&:hover": { backgroundColor: "#056F67" },
            }}
          >
            Open AI Assistant
          </Button>
        </Paper>

        <Button
          component={Link}
          href="/"
          startIcon={<LogoutRoundedIcon />}
          sx={{
            justifyContent: "flex-start",
            textTransform: "none",
            color: "#8799A3",
            fontSize: 13,
            px: 1.5,
            "&:hover": { color: "#D9534F", backgroundColor: "#FFF2F1" },
          }}
        >
          Back to Website
        </Button>
      </Box>

      {/* Main dashboard */}
      <Box
        component="main"
        sx={{
          flex: 1,
          minWidth: 0,
          px: { xs: 2, sm: 3, lg: 4 },
          py: 3,
          overflow: "hidden",
        }}
      >
        <Container maxWidth="xl" disableGutters>
          {/* Top bar */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "stretch", sm: "center" },
              justifyContent: "space-between",
              gap: 2,
              mb: 4,
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: { xs: 23, md: 28 },
                  fontWeight: 800,
                  color: "#15384B",
                  mb: 0.5,
                }}
              >
                Patient Dashboard
              </Typography>
              <Typography sx={{ fontSize: 13, color: "#718793" }}>
                Manage your healthcare, appointments, and wellness.
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <IconButton
                aria-label="Notifications"
                sx={{
                  width: 42,
                  height: 42,
                  border: "1px solid #E5ECEF",
                  borderRadius: 2.5,
                  backgroundColor: "#FFFFFF",
                  color: "#52717E",
                }}
              >
                <NotificationsNoneRoundedIcon />
              </IconButton>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.2,
                  pl: 1,
                }}
              >
                <Avatar
                  sx={{
                    width: 43,
                    height: 43,
                    backgroundColor: "#D8F0EC",
                    color: "#087D75",
                    fontWeight: 800,
                  }}
                >
                  NN
                </Avatar>

                <Box>
                  <Typography sx={{ fontSize: 13, fontWeight: 800 }}>
                    Nimra Nazir
                  </Typography>
                  <Typography sx={{ fontSize: 11, color: "#80929B" }}>
                    Patient Account
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Welcome banner */}
          <Paper
            elevation={0}
            sx={{
              position: "relative",
              overflow: "hidden",
              p: { xs: 2.5, md: 4 },
              mb: 3,
              borderRadius: 4,
              color: "#FFFFFF",
              background: "linear-gradient(110deg, #087F78 0%, #07998F 58%, #35B8AA 100%)",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                width: 230,
                height: 230,
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.07)",
                right: -45,
                top: -100,
              }}
            />

            <Box
              sx={{
                position: "absolute",
                width: 150,
                height: 150,
                borderRadius: "50%",
                border: "25px solid rgba(255,255,255,0.07)",
                right: 115,
                bottom: -105,
              }}
            />

            <Box
              sx={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "flex-start", sm: "center" },
                justifyContent: "space-between",
                gap: 3,
              }}
            >
              <Box sx={{ maxWidth: 550 }}>
                <Chip
                  label="YOUR HEALTH, OUR PRIORITY"
                  size="small"
                  sx={{
                    mb: 1.5,
                    color: "#FFFFFF",
                    backgroundColor: "rgba(255,255,255,0.16)",
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: 0.8,
                  }}
                />

                <Typography
                  sx={{
                    fontSize: { xs: 25, md: 32 },
                    lineHeight: 1.25,
                    fontWeight: 800,
                    mb: 1.2,
                  }}
                >
                  Welcome back, Nimra!
                </Typography>

                <Typography
                  sx={{
                    fontSize: 13,
                    lineHeight: 1.9,
                    color: "rgba(255,255,255,0.88)",
                    maxWidth: 460,
                    mb: 2.5,
                  }}
                >
                  Take control of your health journey. Find trusted doctors,
                  manage appointments, and keep your health information in one place.
                </Typography>

                <Button
                  component={Link}
                  href="/finddoctor"
                  variant="contained"
                  endIcon={<ArrowForwardRoundedIcon />}
                  sx={{
                    backgroundColor: "#FFFFFF",
                    color: "#087F78",
                    px: 2.5,
                    py: 1.2,
                    borderRadius: 2.5,
                    textTransform: "none",
                    fontWeight: 800,
                    fontSize: 13,
                    boxShadow: "none",
                    "&:hover": {
                      backgroundColor: "#EAF8F6",
                      boxShadow: "none",
                    },
                  }}
                >
                  Find a Doctor
                </Button>
              </Box>

              <Box
                sx={{
                  display: { xs: "none", sm: "flex" },
                  width: 125,
                  height: 125,
                  flexShrink: 0,
                  borderRadius: "50%",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(255,255,255,0.13)",
                  border: "1px solid rgba(255,255,255,0.25)",
                }}
              >
                <MedicalServicesRoundedIcon sx={{ fontSize: 68 }} />
              </Box>
            </Box>
          </Paper>

          {/* Quick statistics */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
                lg: "repeat(3, minmax(0, 1fr))",
              },
              gap: 2,
              mb: 3.5,
            }}
          >
            {[
              {
                title: "Upcoming Appointments",
                value: "02",
                detail: "Your next visit is coming up",
                icon: <EventAvailableRoundedIcon />,
                color: "#07998F",
                background: "#E6F7F4",
              },
              {
                title: "Favorite Doctors",
                value: "04",
                detail: "Doctors saved to your list",
                icon: <FavoriteRoundedIcon />,
                color: "#E35D78",
                background: "#FFF0F3",
              },
              {
                title: "Medical Records",
                value: "06",
                detail: "Records in your health profile",
                icon: <DescriptionRoundedIcon />,
                color: "#5684DB",
                background: "#EDF3FF",
              },
            ].map((stat) => (
              <Card
                key={stat.title}
                elevation={0}
                sx={{
                  borderRadius: 3.5,
                  border: "1px solid #E8EFF1",
                  backgroundColor: "#FFFFFF",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 12px 28px rgba(21,56,75,0.06)",
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: 2.5,
                    "&:last-child": { pb: 2.5 },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: 1.5,
                    }}
                  >
                    <Box>
                      <Typography sx={{ fontSize: 12, color: "#748994", mb: 1 }}>
                        {stat.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 30,
                          fontWeight: 800,
                          color: "#15384B",
                          lineHeight: 1.2,
                          mb: 1,
                        }}
                      >
                        {stat.value}
                      </Typography>
                      <Typography sx={{ fontSize: 11, color: "#91A0A8" }}>
                        {stat.detail}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        width: 47,
                        height: 47,
                        borderRadius: 2.5,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: stat.background,
                        color: stat.color,
                      }}
                    >
                      {stat.icon}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>

          {/* Appointments and health information */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1.55fr) minmax(290px, 1fr)" },
              gap: 3,
              mb: 3.5,
            }}
          >
            {/* Appointments */}
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, sm: 2.8 },
                borderRadius: 3.5,
                border: "1px solid #E8EFF1",
                backgroundColor: "#FFFFFF",
                minWidth: 0,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 1,
                  mb: 2.5,
                }}
              >
                <Box>
                  <Typography sx={{ fontSize: 17, fontWeight: 800, mb: 0.5 }}>
                    Upcoming Appointments
                  </Typography>
                  <Typography sx={{ fontSize: 12, color: "#84959E" }}>
                    Keep track of your scheduled visits.
                  </Typography>
                </Box>

                <Button
                  component={Link}
                  href="/patient/appointments"
                  endIcon={<ArrowForwardRoundedIcon />}
                  sx={{
                    textTransform: "none",
                    color: "#07998F",
                    fontSize: 12,
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                  }}
                >
                  View all
                </Button>
              </Box>

              <Divider sx={{ mb: 1 }} />

              {appointments.map((appointment, index) => (
                <React.Fragment key={appointment.name}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      alignItems: { xs: "flex-start", sm: "center" },
                      justifyContent: "space-between",
                      gap: 2,
                      py: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        minWidth: 0,
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 52,
                          height: 52,
                          backgroundColor: appointment.color,
                          color: "#15384B",
                          fontSize: 15,
                          fontWeight: 800,
                        }}
                      >
                        {appointment.initials}
                      </Avatar>

                      <Box sx={{ minWidth: 0 }}>
                        <Typography
                          sx={{
                            fontSize: 13,
                            fontWeight: 800,
                            color: "#15384B",
                            mb: 0.4,
                          }}
                        >
                          {appointment.name}
                        </Typography>

                        <Typography sx={{ fontSize: 11, color: "#7E919B", mb: 1 }}>
                          {appointment.specialty}
                        </Typography>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: 1,
                          }}
                        >
                          <Chip
                            size="small"
                            icon={
                              appointment.type === "Online Consultation" ? (
                                <VideocamRoundedIcon />
                              ) : (
                                <LocationOnRoundedIcon />
                              )
                            }
                            label={appointment.type}
                            sx={{
                              height: 24,
                              fontSize: 10,
                              backgroundColor: "#F0F7F7",
                              color: "#52717E",
                              "& .MuiChip-icon": {
                                color: "#07998F",
                                fontSize: 15,
                              },
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: { xs: "flex-start", sm: "flex-end" },
                        gap: 0.8,
                        pl: { xs: 8.5, sm: 0 },
                      }}
                    >
                      <Chip
                        label={appointment.status}
                        size="small"
                        sx={{
                          height: 23,
                          fontSize: 10,
                          fontWeight: 700,
                          color: appointment.status === "Confirmed" ? "#16846D" : "#A87519",
                          backgroundColor:
                            appointment.status === "Confirmed" ? "#E7F7F1" : "#FFF5E1",
                        }}
                      />

                      <Typography
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          fontSize: 11,
                          color: "#607985",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <CalendarMonthRoundedIcon sx={{ fontSize: 14 }} />
                        {appointment.date}
                      </Typography>

                      <Typography
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          fontSize: 11,
                          color: "#607985",
                        }}
                      >
                        <AccessTimeRoundedIcon sx={{ fontSize: 14 }} />
                        {appointment.time}
                      </Typography>
                    </Box>
                  </Box>

                  {index < appointments.length - 1 && <Divider />}
                </React.Fragment>
              ))}

              <Button
                component={Link}
                href="/finddoctor"
                startIcon={<AddRoundedIcon />}
                fullWidth
                sx={{
                  mt: 1,
                  py: 1.25,
                  borderRadius: 2.5,
                  border: "1px dashed #B9DCD8",
                  color: "#07998F",
                  textTransform: "none",
                  fontSize: 12,
                  fontWeight: 700,
                  "&:hover": {
                    backgroundColor: "#F0FAF8",
                    borderColor: "#07998F",
                  },
                }}
              >
                Book a New Appointment
              </Button>
            </Paper>

            {/* Health summary */}
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, sm: 2.8 },
                borderRadius: 3.5,
                border: "1px solid #E8EFF1",
                backgroundColor: "#FFFFFF",
                minWidth: 0,
              }}
            >
              <Box sx={{ mb: 2.5 }}>
                <Typography sx={{ fontSize: 17, fontWeight: 800, mb: 0.5 }}>
                  Health Overview
                </Typography>
                <Typography sx={{ fontSize: 12, color: "#84959E" }}>
                  Your latest health information.
                </Typography>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                {healthStats.map((item) => (
                  <Box key={item.title}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 1,
                        mb: 1.2,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1.2,
                          minWidth: 0,
                        }}
                      >
                        <Box
                          sx={{
                            width: 38,
                            height: 38,
                            flexShrink: 0,
                            borderRadius: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: item.background,
                            color: item.color,
                          }}
                        >
                          {item.icon}
                        </Box>

                        <Box>
                          <Typography sx={{ fontSize: 12, fontWeight: 700 }}>
                            {item.title}
                          </Typography>
                          <Typography sx={{ fontSize: 10, color: "#91A0A8" }}>
                            {item.detail}
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ textAlign: "right", flexShrink: 0 }}>
                        <Typography sx={{ fontSize: 15, fontWeight: 800 }}>
                          {item.value}
                        </Typography>
                        <Typography sx={{ fontSize: 10, color: "#8798A1" }}>
                          {item.unit}
                        </Typography>
                      </Box>
                    </Box>

                    <LinearProgress
                      variant="determinate"
                      value={item.progress}
                      sx={{
                        height: 5,
                        borderRadius: 5,
                        backgroundColor: item.background,
                        "& .MuiLinearProgress-bar": {
                          borderRadius: 5,
                          backgroundColor: item.color,
                        },
                      }}
                    />
                  </Box>
                ))}
              </Box>

              <Divider sx={{ my: 2.5 }} />

              <Button
                component={Link}
                href="/patient/records"
                fullWidth
                endIcon={<ArrowForwardRoundedIcon />}
                sx={{
                  py: 1.2,
                  borderRadius: 2.5,
                  backgroundColor: "#E8F7F5",
                  color: "#07877F",
                  textTransform: "none",
                  fontSize: 12,
                  fontWeight: 700,
                  "&:hover": { backgroundColor: "#D8F0EC" },
                }}
              >
                View Medical Records
              </Button>

              <Typography
                sx={{
                  mt: 1.5,
                  fontSize: 10,
                  lineHeight: 1.7,
                  color: "#9AA8AE",
                }}
              >
                Demo values only. Health measurements should be updated using
                verified patient records.
              </Typography>
            </Paper>
          </Box>

          {/* Quick actions */}
          <Box sx={{ mb: 3.5 }}>
            <Box sx={{ mb: 2 }}>
              <Typography sx={{ fontSize: 18, fontWeight: 800, mb: 0.5 }}>
                Quick Actions
              </Typography>
              <Typography sx={{ fontSize: 12, color: "#84959E" }}>
                Access your most-used healthcare services.
              </Typography>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, minmax(0, 1fr))",
                  lg: "repeat(4, minmax(0, 1fr))",
                },
                gap: 2,
              }}
            >
              {[
                {
                  title: "Find a Doctor",
                  description: "Discover doctors by specialty and location.",
                  icon: <SearchRoundedIcon />,
                  href: "/finddoctor",
                  color: "#07998F",
                  background: "#E7F7F4",
                },
                {
                  title: "Book Appointment",
                  description: "Schedule an in-person or online visit.",
                  icon: <CalendarMonthRoundedIcon />,
                  href: "/finddoctor",
                  color: "#4B7DDB",
                  background: "#EDF3FF",
                },
                {
                  title: "Medical Records",
                  description: "Access your health documents in one place.",
                  icon: <DescriptionRoundedIcon />,
                  href: "/patient/records",
                  color: "#9667C9",
                  background: "#F4EDFF",
                },
                {
                  title: "AI Health Assistant",
                  description: "Explore general health information.",
                  icon: <PsychologyRoundedIcon />,
                  href: "/AIassistant",
                  color: "#D58A35",
                  background: "#FFF4E6",
                },
              ].map((action) => (
                <Card
                  key={action.title}
                  component={Link}
                  href={action.href}
                  elevation={0}
                  sx={{
                    display: "block",
                    textDecoration: "none",
                    color: "inherit",
                    borderRadius: 3.5,
                    border: "1px solid #E8EFF1",
                    backgroundColor: "#FFFFFF",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      borderColor: "#B9DCD8",
                      boxShadow: "0 12px 28px rgba(21,56,75,0.06)",
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      p: 2.3,
                      "&:last-child": { pb: 2.3 },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 1,
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: 45,
                          height: 45,
                          borderRadius: 2.5,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: action.color,
                          backgroundColor: action.background,
                        }}
                      >
                        {action.icon}
                      </Box>

                      <ArrowForwardRoundedIcon
                        sx={{ fontSize: 18, color: "#A4B2B8" }}
                      />
                    </Box>

                    <Typography
                      sx={{ fontSize: 14, fontWeight: 800, mb: 0.8 }}
                    >
                      {action.title}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 11,
                        lineHeight: 1.8,
                        color: "#84959E",
                      }}
                    >
                      {action.description}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>

          {/* Internship section */}
          <Paper
            elevation={0}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "flex-start", md: "center" },
              justifyContent: "space-between",
              gap: 2.5,
              p: { xs: 2.5, md: 3 },
              mb: 3,
              borderRadius: 3.5,
              background: "linear-gradient(110deg, #EFF5FF, #F8FAFF)",
              border: "1px solid #E0E9FA",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 2.5,
                  backgroundColor: "#DDE8FF",
                  color: "#4B72C6",
                }}
              >
                <MedicalServicesRoundedIcon sx={{ fontSize: 26 }} />
              </Box>

              <Box>
                <Typography sx={{ fontSize: 16, fontWeight: 800, mb: 0.8 }}>
                  Looking for a healthcare internship?
                </Typography>
                <Typography
                  sx={{
                    fontSize: 12,
                    lineHeight: 1.8,
                    color: "#74879B",
                    maxWidth: 550,
                  }}
                >
                  Explore opportunities from healthcare organizations and
                  take the next step in your professional journey.
                </Typography>
              </Box>
            </Box>

            <Button
              component={Link}
              href="/internship"
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{
                flexShrink: 0,
                px: 2.5,
                py: 1.25,
                borderRadius: 2.5,
                backgroundColor: "#315FAF",
                color: "#FFFFFF",
                textTransform: "none",
                fontSize: 12,
                fontWeight: 700,
                "&:hover": { backgroundColor: "#254B91" },
              }}
            >
              Explore Internships
            </Button>
          </Paper>

          {/* Footer */}
          <Box
            component="footer"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "flex-start", sm: "center" },
              justifyContent: "space-between",
              gap: 1.5,
              py: 2,
              borderTop: "1px solid #E7EEF0",
            }}
          >
            <Typography sx={{ fontSize: 11, color: "#91A0A8" }}>
              © 2026 HealthConnect AI. All rights reserved.
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Typography
                component={Link}
                href="/privacy"
                sx={{
                  fontSize: 11,
                  color: "#82959F",
                  textDecoration: "none",
                  "&:hover": { color: "#07998F" },
                }}
              >
                Privacy Policy
              </Typography>

              <Typography
                component={Link}
                href="/contact"
                sx={{
                  fontSize: 11,
                  color: "#82959F",
                  textDecoration: "none",
                  "&:hover": { color: "#07998F" },
                }}
              >
                Contact Support
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}