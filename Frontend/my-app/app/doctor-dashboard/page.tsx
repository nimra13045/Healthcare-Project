
"use client";

import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";

type Appointment = {
  id: number;
  patient: string;
  age: number;
  gender: string;
  date: string;
  time: string;
  type: "Online" | "In-Clinic";
  status: "Confirmed" | "Pending" | "Completed" | "Cancelled";
  initials: string;
  color: string;
};

const initialAppointments: Appointment[] = [
  {
    id: 1,
    patient: "Ahmed Raza",
    age: 28,
    gender: "Male",
    date: "Today",
    time: "09:30 AM",
    type: "In-Clinic",
    status: "Confirmed",
    initials: "AR",
    color: "#dbeafe",
  },
  {
    id: 2,
    patient: "Fatima Noor",
    age: 32,
    gender: "Female",
    date: "Today",
    time: "10:30 AM",
    type: "Online",
    status: "Pending",
    initials: "FN",
    color: "#fce7f3",
  },
  {
    id: 3,
    patient: "Hassan Ali",
    age: 45,
    gender: "Male",
    date: "Today",
    time: "11:15 AM",
    type: "In-Clinic",
    status: "Confirmed",
    initials: "HA",
    color: "#dcfce7",
  },
  {
    id: 4,
    patient: "Ayesha Malik",
    age: 26,
    gender: "Female",
    date: "Tomorrow",
    time: "09:00 AM",
    type: "Online",
    status: "Pending",
    initials: "AM",
    color: "#fef3c7",
  },
];

const patients = [
  {
    name: "Ahmed Raza",
    detail: "General checkup",
    date: "Today, 09:30 AM",
    initials: "AR",
    color: "#dbeafe",
  },
  {
    name: "Fatima Noor",
    detail: "Follow-up consultation",
    date: "Today, 10:30 AM",
    initials: "FN",
    color: "#fce7f3",
  },
  {
    name: "Hassan Ali",
    detail: "Blood pressure review",
    date: "Today, 11:15 AM",
    initials: "HA",
    color: "#dcfce7",
  },
];

const teal = "#079b91";
const ink = "#1a2b3c";
const muted = "#748395";
const border = "#e8edf2";

const navigation = [
  { label: "Dashboard", icon: <DashboardRoundedIcon />, active: true },
  { label: "Appointments", icon: <CalendarMonthRoundedIcon /> },
  { label: "Patients", icon: <PeopleAltRoundedIcon /> },
  { label: "My Schedule", icon: <AccessTimeRoundedIcon /> },
  { label: "My Profile", icon: <PersonOutlineRoundedIcon /> },
  { label: "Settings", icon: <SettingsRoundedIcon /> },
];

function MetricCard({
  title,
  value,
  subtitle,
  icon,
  color,
  progress,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  progress?: number;
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        border: `1px solid ${border}`,
        borderRadius: 3,
        height: "100%",
        transition: "0.25s",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 10px 30px rgba(26,43,60,0.06)",
        },
      }}
    >
      <Stack direction="row"  sx={{justifyContent:"space-between", alignItems:"center"}}>
        <Box
          sx={{
            width: 46,
            height: 46,
            borderRadius: 2.5,
            display: "grid",
            placeItems: "center",
            bgcolor: `${color}16`,
            color,
          }}
        >
          {icon}
        </Box>
        <IconButton size="small" aria-label={`More options for ${title}`}>
          <MoreHorizRoundedIcon sx={{ color: muted }} />
        </IconButton>
      </Stack>

      <Typography sx={{ color: muted, fontSize: 13.5, mt: 2 }}>
        {title}
      </Typography>

      <Typography
        sx={{
          color: ink,
          fontWeight: 800,
          fontSize: { xs: 25, md: 29 },
          mt: 0.5,
        }}
      >
        {value}
      </Typography>

      <Typography sx={{ color: muted, fontSize: 12.5, mt: 1 }}>
        {subtitle}
      </Typography>

      {progress !== undefined && (
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            mt: 1.5,
            height: 5,
            borderRadius: 5,
            bgcolor: "#e7f5f3",
            "& .MuiLinearProgress-bar": {
              bgcolor: teal,
              borderRadius: 5,
            },
          }}
        />
      )}
    </Paper>
  );
}

export default function DoctorDashboard() {
  const [appointments, setAppointments] =
    useState<Appointment[]>(initialAppointments);
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [filter, setFilter] = useState<
    "All" | "Pending" | "Confirmed" | "Completed"
  >("All");
  const [notice, setNotice] = useState("");

  const todayAppointments = appointments.filter(
    (appointment) =>
      appointment.date === "Today" &&
      appointment.status !== "Cancelled"
  ).length;

  const pendingAppointments = appointments.filter(
    (appointment) => appointment.status === "Pending"
  ).length;

  const completedAppointments = appointments.filter(
    (appointment) => appointment.status === "Completed"
  ).length;

  const visibleAppointments = appointments.filter((appointment) => {
    if (filter === "All") return true;
    return appointment.status === filter;
  });

  function updateAppointment(
    id: number,
    status: Appointment["status"]
  ) {
    setAppointments((current) =>
      current.map((appointment) =>
        appointment.id === id ? { ...appointment, status } : appointment
      )
    );

    const selected = appointments.find((appointment) => appointment.id === id);
    setNotice(
      selected
        ? `${selected.patient}'s appointment marked ${status.toLowerCase()}.`
        : "Appointment updated."
    );
  }

  function handleNavigation(label: string) {
    setActiveNav(label);
    setMobileMenu(false);

    if (label !== "Dashboard") {
      setNotice(
        `${label} section selected. Connect this section to its page when ready.`
      );
    } else {
      setNotice("");
    }
  }

  const sidebar = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#fff",
        p: 2.5,
      }}
    >
      <Stack direction="row"  spacing={1.2} sx={{ mb: 4,alignItems:"center" }}>
        <Box
          sx={{
            width: 43,
            height: 43,
            borderRadius: 2.5,
            bgcolor: teal,
            color: "#fff",
            display: "grid",
            placeItems: "center",
          }}
        >
          <FavoriteBorderRoundedIcon />
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 800, fontSize: 19, color: ink }}>
            HealthConnect
          </Typography>
          <Typography sx={{ fontSize: 11, color: muted }}>
            DOCTOR PORTAL
          </Typography>
        </Box>
      </Stack>

      <Typography
        sx={{
          color: "#9aa5b1",
          fontWeight: 700,
          fontSize: 10.5,
          letterSpacing: 1.3,
          mb: 1.5,
          px: 1.5,
        }}
      >
        WORKSPACE
      </Typography>

      <Stack spacing={0.6}>
        {navigation.map((item) => (
          <Box
            key={item.label}
            onClick={() => handleNavigation(item.label)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              px: 1.5,
              py: 1.4,
              borderRadius: 2.5,
              cursor: "pointer",
              color: activeNav === item.label ? teal : "#738092",
              bgcolor: activeNav === item.label ? "#e8f7f5" : "transparent",
              fontWeight: activeNav === item.label ? 700 : 500,
              transition: "0.2s",
              "&:hover": { bgcolor: "#f0f8f7", color: teal },
              "& .MuiSvgIcon-root": { fontSize: 21 },
            }}
          >
            {item.icon}
            <Typography
              sx={{
                fontSize: 13.5,
                fontWeight: activeNav === item.label ? 700 : 500,
              }}
            >
              {item.label}
            </Typography>
            {item.label === "Appointments" && pendingAppointments > 0 && (
              <Box
                sx={{
                  ml: "auto",
                  bgcolor: "#fff0d7",
                  color: "#b7791f",
                  borderRadius: 5,
                  px: 1,
                  py: 0.2,
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                {pendingAppointments}
              </Box>
            )}
          </Box>
        ))}
      </Stack>

      <Box sx={{ mt: "auto" }}>
        <Paper
          elevation={0}
          sx={{
            p: 2,
            borderRadius: 3,
            bgcolor: "#edf9f7",
            mb: 2.5,
          }}
        >
          <Box
            sx={{
              width: 35,
              height: 35,
              borderRadius: 2,
              bgcolor: "#d4f0ec",
              color: teal,
              display: "grid",
              placeItems: "center",
              mb: 1.5,
            }}
          >
            <VideocamRoundedIcon />
          </Box>
          <Typography sx={{ color: ink, fontWeight: 700, fontSize: 13 }}>
            Online consultations
          </Typography>
          <Typography
            sx={{ color: muted, fontSize: 11.5, lineHeight: 1.6, mt: 0.7 }}
          >
            Manage virtual visits and connect with your patients.
          </Typography>
          <Button
            fullWidth
            size="small"
            onClick={() => handleNavigation("Appointments")}
            sx={{
              mt: 1.5,
              bgcolor: teal,
              color: "#fff",
              textTransform: "none",
              borderRadius: 2,
              "&:hover": { bgcolor: "#067f77" },
            }}
          >
            View appointments
          </Button>
        </Paper>

        <Divider sx={{ borderColor: border, mb: 2 }} />

        <Stack direction="row" sx={{alignItems:"center"}} spacing={1.2}>
          <Avatar sx={{ bgcolor: "#d6f0ed", color: teal, fontWeight: 700 }}>
            DA
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              sx={{ color: ink, fontWeight: 700, fontSize: 12.5 }}
              noWrap
            >
              Dr. Ayesha Khan
            </Typography>
            <Typography sx={{ color: muted, fontSize: 11 }} noWrap>
              General Physician
            </Typography>
          </Box>
          <IconButton
            size="small"
            aria-label="Logout"
            onClick={() => setNotice("Logout requires authentication setup.")}
          >
            <LogoutRoundedIcon sx={{ fontSize: 18, color: muted }} />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f7f9fb",
        display: "flex",
        color: ink,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <Box
        sx={{
          width: 255,
          flexShrink: 0,
          borderRight: `1px solid ${border}`,
          display: { xs: "none", lg: "block" },
          minHeight: "100vh",
          bgcolor: "#fff",
        }}
      >
        {sidebar}
      </Box>

      {mobileMenu && (
        <Box
          onClick={() => setMobileMenu(false)}
          sx={{
            position: "fixed",
            inset: 0,
            bgcolor: "rgba(20,35,50,0.4)",
            zIndex: 1200,
            display: { xs: "block", lg: "none" },
          }}
        >
          <Box
            onClick={(event) => event.stopPropagation()}
            sx={{
              width: 270,
              height: "100%",
              boxShadow: 8,
            }}
          >
            {sidebar}
          </Box>
        </Box>
      )}

      <Box sx={{ flex: 1, minWidth: 0 }}>
        {/* Top bar */}
        <Box
          sx={{
            px: { xs: 2, md: 4 },
            py: 2,
            bgcolor: "#fff",
            borderBottom: `1px solid ${border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Stack direction="row" sx={{alignItems:"center"}} spacing={1.5}>
            <IconButton
              onClick={() => setMobileMenu(true)}
              sx={{ display: { xs: "inline-flex", lg: "none" } }}
              aria-label="Open navigation"
            >
              <MenuRoundedIcon />
            </IconButton>
            <Box>
              <Typography sx={{ fontSize: 12, color: muted }}>
                Workspace / {activeNav}
              </Typography>
              <Typography
                sx={{
                  color: ink,
                  fontWeight: 800,
                  fontSize: { xs: 18, md: 21 },
                  mt: 0.3,
                }}
              >
                {activeNav}
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" sx={{alignItems:"center"}} spacing={1.5}>
            <IconButton
              aria-label="Search"
              onClick={() => setNotice("Search feature can be connected later.")}
              sx={{
                bgcolor: "#f5f7f9",
                borderRadius: 2.5,
                display: { xs: "none", sm: "inline-flex" },
              }}
            >
              <SearchRoundedIcon sx={{ color: muted }} />
            </IconButton>

            <IconButton
              aria-label="Notifications"
              onClick={() => setNotice("You have no new demo notifications.")}
              sx={{
                bgcolor: "#f5f7f9",
                borderRadius: 2.5,
                position: "relative",
              }}
            >
              <NotificationsNoneRoundedIcon sx={{ color: muted }} />
              <Box
                sx={{
                  position: "absolute",
                  top: 7,
                  right: 7,
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  bgcolor: "#f59e0b",
                  border: "1px solid #fff",
                }}
              />
            </IconButton>

            <Avatar
              sx={{
                width: 39,
                height: 39,
                bgcolor: "#d6f0ed",
                color: teal,
                fontWeight: 800,
              }}
            >
              AK
            </Avatar>
          </Stack>
        </Box>

        <Box
          sx={{
            maxWidth: 1600,
            mx: "auto",
            p: { xs: 2, sm: 3, md: 4 },
          }}
        >
          {/* Welcome banner */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, md: 3.5 },
              borderRadius: 4,
              background:
                "linear-gradient(115deg, #087f78 0%, #079b91 55%, #39b8aa 100%)",
              color: "#fff",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                width: 210,
                height: 210,
                borderRadius: "50%",
                border: "35px solid rgba(255,255,255,0.08)",
                right: -40,
                top: -85,
              }}
            />
            <Box
              sx={{
                position: "absolute",
                width: 130,
                height: 130,
                borderRadius: "50%",
                bgcolor: "rgba(255,255,255,0.06)",
                right: 105,
                bottom: -85,
              }}
            />

            <Box sx={{ position: "relative", zIndex: 1 }}>
              <Chip
                label="DOCTOR WORKSPACE"
                size="small"
                sx={{
                  bgcolor: "rgba(255,255,255,0.17)",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 10,
                  letterSpacing: 1,
                  mb: 2,
                }}
              />
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: 23, md: 30 },
                  lineHeight: 1.3,
                }}
              >
                Good morning, Dr. Ayesha!
              </Typography>
              <Typography
                sx={{
                  mt: 1,
                  maxWidth: 550,
                  fontSize: 13.5,
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                Here&apos;s your practice overview. Review appointments,
                manage your schedule, and stay connected with your patients.
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                sx={{ mt: 2.5, alignItems: { xs: "stretch", sm: "center" } }}
              >
                <Button
                  variant="contained"
                  startIcon={<CalendarMonthRoundedIcon />}
                  onClick={() => handleNavigation("Appointments")}
                  sx={{
                    bgcolor: "#fff",
                    color: teal,
                    textTransform: "none",
                    fontWeight: 700,
                    px: 2,
                    py: 1,
                    borderRadius: 2.5,
                    "&:hover": { bgcolor: "#eaf8f6" },
                  }}
                >
                  Manage appointments
                </Button>
                <Stack direction="row" spacing={0.8} sx={{alignItems:"center"}} >
                  <LocationOnOutlinedIcon sx={{ fontSize: 17 }} />
                  <Typography sx={{ fontSize: 12.5 }}>
                    Lahore, Pakistan
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Paper>

          {/* Stats */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                xl: "repeat(4, 1fr)",
              },
              gap: 2,
              mt: 3,
            }}
          >
            <MetricCard
              title="Today's Appointments"
              value={String(todayAppointments)}
              subtitle="Scheduled for today"
              icon={<CalendarMonthRoundedIcon />}
              color="#079b91"
              progress={Math.min(todayAppointments * 20, 100)}
            />
            <MetricCard
              title="Total Patients"
              value="128"
              subtitle="Demo patient records"
              icon={<PeopleAltRoundedIcon />}
              color="#5087e7"
            />
            <MetricCard
              title="Pending Requests"
              value={String(pendingAppointments)}
              subtitle="Need your attention"
              icon={<AccessTimeRoundedIcon />}
              color="#e8a23c"
            />
            <MetricCard
              title="Completed Visits"
              value={String(completedAppointments + 246)}
              subtitle="Includes demo history"
              icon={<CheckCircleOutlineRoundedIcon />}
              color="#8c70d6"
            />
          </Box>

          {/* Main content */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", xl: "minmax(0, 1.65fr) minmax(300px, 1fr)" },
              gap: 3,
              mt: 3,
              alignItems: "start",
            }}
          >
            {/* Appointments table */}
            <Paper
              elevation={0}
              sx={{
                border: `1px solid ${border}`,
                borderRadius: 3.5,
                overflow: "hidden",
                minWidth: 0,
              }}
            >
              <Box
                sx={{
                  p: 2.5,
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 1.5,
                }}
              >
                <Box>
                  <Typography sx={{ fontWeight: 800, fontSize: 17 }}>
                    Appointment management
                  </Typography>
                  <Typography sx={{ color: muted, fontSize: 12.5, mt: 0.5 }}>
                    Review and manage your patient visits
                  </Typography>
                </Box>
                <Button
                  onClick={() => handleNavigation("Appointments")}
                  sx={{
                    color: teal,
                    fontWeight: 700,
                    textTransform: "none",
                    fontSize: 12.5,
                  }}
                >
                  View all
                </Button>
              </Box>

              <Divider sx={{ borderColor: border }} />

              <Stack
                direction="row"
                spacing={1}
                sx={{ px: 2.5, py: 1.5, overflowX: "auto" }}
              >
                {(["All", "Pending", "Confirmed", "Completed"] as const).map(
                  (item) => (
                    <Chip
                      key={item}
                      label={item}
                      clickable
                      onClick={() => setFilter(item)}
                      sx={{
                        fontSize: 12,
                        fontWeight: 600,
                        bgcolor: filter === item ? "#e4f6f3" : "#f5f7f9",
                        color: filter === item ? teal : muted,
                        border:
                          filter === item
                            ? `1px solid ${teal}`
                            : "1px solid transparent",
                      }}
                    />
                  )
                )}
              </Stack>

              <Box sx={{ overflowX: "auto" }}>
                <Box sx={{ minWidth: 570 }}>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1.5fr 1fr 0.9fr",
                      px: 2.5,
                      py: 1.5,
                      bgcolor: "#fafbfd",
                      borderTop: `1px solid ${border}`,
                      borderBottom: `1px solid ${border}`,
                    }}
                  >
                    <Typography sx={{ fontSize: 11, color: muted, fontWeight: 700 }}>
                      PATIENT
                    </Typography>
                    <Typography sx={{ fontSize: 11, color: muted, fontWeight: 700 }}>
                      DATE & TIME
                    </Typography>
                    <Typography sx={{ fontSize: 11, color: muted, fontWeight: 700 }}>
                      STATUS
                    </Typography>
                  </Box>

                  {visibleAppointments.length === 0 ? (
                    <Box sx={{ p: 4, textAlign: "center" }}>
                      <Typography sx={{ color: muted, fontSize: 13 }}>
                        No appointments in this category.
                      </Typography>
                    </Box>
                  ) : (
                    visibleAppointments.map((appointment) => (
                      <Box key={appointment.id}>
                        <Box
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "1.5fr 1fr 0.9fr",
                            alignItems: "center",
                            px: 2.5,
                            py: 2,
                            gap: 1,
                          }}
                        >
                          <Stack direction="row" sx={{alignItems:"center"}} spacing={1.2}>
                            <Avatar
                              sx={{
                                bgcolor: appointment.color,
                                color: ink,
                                width: 39,
                                height: 39,
                                fontSize: 12,
                                fontWeight: 700,
                              }}
                            >
                              {appointment.initials}
                            </Avatar>
                            <Box>
                              <Typography
                                sx={{ fontWeight: 700, fontSize: 12.5 }}
                              >
                                {appointment.patient}
                              </Typography>
                              <Typography
                                sx={{ fontSize: 10.5, color: muted, mt: 0.3 }}
                              >
                                {appointment.age} yrs · {appointment.gender}
                              </Typography>
                              <Stack
                                direction="row"
                                spacing={0.5}
                                sx={{ mt: 0.5,alignItems:"center" }}
                              >
                                {appointment.type === "Online" && (
                                  <VideocamRoundedIcon
                                    sx={{ fontSize: 13, color: teal }}
                                  />
                                )}
                                <Typography
                                  sx={{ fontSize: 10.5, color: muted }}
                                >
                                  {appointment.type}
                                </Typography>
                              </Stack>
                            </Box>
                          </Stack>

                          <Box>
                            <Typography
                              sx={{ fontWeight: 600, fontSize: 12 }}
                            >
                              {appointment.date}
                            </Typography>
                            <Typography
                              sx={{ color: muted, fontSize: 11.5, mt: 0.5 }}
                            >
                              {appointment.time}
                            </Typography>
                          </Box>

                          <Box>
                            <Chip
                              size="small"
                              label={appointment.status}
                              sx={{
                                height: 24,
                                fontSize: 10,
                                fontWeight: 700,
                                bgcolor:
                                  appointment.status === "Confirmed"
                                    ? "#e4f6ed"
                                    : appointment.status === "Pending"
                                      ? "#fff3db"
                                      : appointment.status === "Completed"
                                        ? "#e8efff"
                                        : "#fee9e7",
                                color:
                                  appointment.status === "Confirmed"
                                    ? "#21845b"
                                    : appointment.status === "Pending"
                                      ? "#a66c0a"
                                      : appointment.status === "Completed"
                                        ? "#4266bd"
                                        : "#c34840",
                              }}
                            />
                            {appointment.status === "Pending" && (
                              <Stack
                                direction="row"
                                spacing={0.5}
                                sx={{ mt: 1, flexWrap: "wrap" }}
                              >
                                <Button
                                  size="small"
                                  onClick={() =>
                                    updateAppointment(
                                      appointment.id,
                                      "Confirmed"
                                    )
                                  }
                                  sx={{
                                    minWidth: 0,
                                    px: 1,
                                    fontSize: 10,
                                    textTransform: "none",
                                    color: teal,
                                    bgcolor: "#e8f7f5",
                                  }}
                                >
                                  Accept
                                </Button>
                                <Button
                                  size="small"
                                  onClick={() =>
                                    updateAppointment(
                                      appointment.id,
                                      "Cancelled"
                                    )
                                  }
                                  sx={{
                                    minWidth: 0,
                                    px: 0.5,
                                    fontSize: 10,
                                    textTransform: "none",
                                    color: "#c34840",
                                  }}
                                >
                                  Decline
                                </Button>
                              </Stack>
                            )}
                            {appointment.status === "Confirmed" && (
                              <Button
                                size="small"
                                onClick={() =>
                                  updateAppointment(
                                    appointment.id,
                                    "Completed"
                                  )
                                }
                                sx={{
                                  mt: 0.7,
                                  px: 0,
                                  minWidth: 0,
                                  fontSize: 10,
                                  textTransform: "none",
                                  color: teal,
                                }}
                              >
                                Mark complete
                              </Button>
                            )}
                          </Box>
                        </Box>
                        <Divider sx={{ borderColor: "#f0f2f5" }} />
                      </Box>
                    ))
                  )}
                </Box>
              </Box>

              <Box
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 1,
                }}
              >
                <Typography sx={{ color: muted, fontSize: 11.5 }}>
                  {visibleAppointments.length} appointments shown
                </Typography>
                <Button
                  size="small"
                  onClick={() => setFilter("All")}
                  sx={{
                    color: teal,
                    textTransform: "none",
                    fontWeight: 700,
                  }}
                >
                  Reset filter
                </Button>
              </Box>
            </Paper>

            {/* Right column */}
            <Stack spacing={3}>
              {/* Today's schedule */}
              <Paper
                elevation={0}
                sx={{
                  border: `1px solid ${border}`,
                  borderRadius: 3.5,
                  p: 2.5,
                }}
              >
                <Stack
                  direction="row"
                 sx={{ justifyContent:"space-between",
                  alignItems:"center"}}
                >
                  <Box>
                    <Typography sx={{ fontWeight: 800, fontSize: 16 }}>
                      Today&apos;s schedule
                    </Typography>
                    <Typography sx={{ color: muted, fontSize: 12, mt: 0.5 }}>
                      Your consultation timeline
                    </Typography>
                  </Box>
                  <CalendarMonthRoundedIcon sx={{ color: teal }} />
                </Stack>

                <Stack spacing={0} sx={{ mt: 2.5 }}>
                  {[
                    { time: "09:30 AM", title: "Ahmed Raza", type: "In-Clinic", done: true },
                    { time: "10:30 AM", title: "Fatima Noor", type: "Online", done: false },
                    { time: "11:15 AM", title: "Hassan Ali", type: "In-Clinic", done: false },
                    { time: "12:00 PM", title: "Lunch break", type: "Break", done: false },
                  ].map((slot, index) => (
                    <Box
                      key={slot.time}
                      sx={{
                        display: "flex",
                        gap: 1.5,
                        minHeight: 68,
                      }}
                    >
                      <Box sx={{ width: 67, flexShrink: 0 }}>
                        <Typography
                          sx={{
                            color: muted,
                            fontSize: 10.5,
                            fontWeight: 600,
                          }}
                        >
                          {slot.time}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          width: 13,
                          flexShrink: 0,
                          position: "relative",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Box
                          sx={{
                            width: 9,
                            height: 9,
                            mt: 0.4,
                            borderRadius: "50%",
                            bgcolor: slot.done ? teal : "#cbd5df",
                            zIndex: 1,
                          }}
                        />
                        {index !== 3 && (
                          <Box
                            sx={{
                              position: "absolute",
                              top: 12,
                              bottom: 0,
                              width: 1,
                              bgcolor: "#e5eaef",
                            }}
                          />
                        )}
                      </Box>
                      <Box
                        sx={{
                          flex: 1,
                          pb: 1.8,
                          minWidth: 0,
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 12.5,
                            fontWeight: 700,
                            color: slot.type === "Break" ? muted : ink,
                          }}
                        >
                          {slot.title}
                        </Typography>
                        <Typography
                          sx={{ color: muted, fontSize: 10.5, mt: 0.4 }}
                        >
                          {slot.type === "Online"
                            ? "Video consultation"
                            : slot.type === "Break"
                              ? "Reserved time"
                              : "Clinic appointment"}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Stack>

                <Button
                  fullWidth
                  onClick={() => handleNavigation("My Schedule")}
                  sx={{
                    mt: 0.5,
                    border: `1px solid ${border}`,
                    color: ink,
                    textTransform: "none",
                    fontWeight: 700,
                    borderRadius: 2.5,
                    py: 1,
                    "&:hover": {
                      bgcolor: "#f2faf9",
                      borderColor: teal,
                    },
                  }}
                >
                  Manage availability
                </Button>
              </Paper>

              {/* Recent patients */}
              <Paper
                elevation={0}
                sx={{
                  border: `1px solid ${border}`,
                  borderRadius: 3.5,
                  p: 2.5,
                }}
              >
                <Stack
                  direction="row"
                  sx={{alignItems:"center",
                  justifyContent:"space-between"}}
                >
                  <Box>
                    <Typography sx={{ fontWeight: 800, fontSize: 16 }}>
                      Recent patients
                    </Typography>
                    <Typography sx={{ color: muted, fontSize: 12, mt: 0.5 }}>
                      Your latest patient visits
                    </Typography>
                  </Box>
                  <IconButton
                    size="small"
                    onClick={() => handleNavigation("Patients")}
                    aria-label="View patient section"
                  >
                    <MoreHorizRoundedIcon sx={{ color: muted }} />
                  </IconButton>
                </Stack>

                <Stack spacing={2.2} sx={{ mt: 2.5 }}>
                  {patients.map((patient) => (
                    <Stack
                      key={patient.name}
                      direction="row"
                      sx={{alignItems:"center"}}
                      
                      spacing={1.3}
                    >
                      <Avatar
                        sx={{
                          bgcolor: patient.color,
                          color: ink,
                          width: 40,
                          height: 40,
                          fontSize: 12,
                          fontWeight: 700,
                        }}
                      >
                        {patient.initials}
                      </Avatar>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                          sx={{ color: ink, fontWeight: 700, fontSize: 12.5 }}
                        >
                          {patient.name}
                        </Typography>
                        <Typography
                          sx={{ color: muted, fontSize: 11, mt: 0.3 }}
                        >
                          {patient.detail}
                        </Typography>
                        <Typography
                          sx={{ color: "#9aa5b1", fontSize: 10, mt: 0.3 }}
                        >
                          {patient.date}
                        </Typography>
                      </Box>
                      <IconButton
                        size="small"
                        aria-label={`View ${patient.name}`}
                        onClick={() =>
                          setNotice(
                            `Patient profile for ${patient.name} is demo data.`
                          )
                        }
                      >
                        <MoreHorizRoundedIcon
                          sx={{ color: muted, fontSize: 20 }}
                        />
                      </IconButton>
                    </Stack>
                  ))}
                </Stack>

                <Button
                  fullWidth
                  onClick={() => handleNavigation("Patients")}
                  sx={{
                    mt: 2.5,
                    bgcolor: "#e8f7f5",
                    color: teal,
                    textTransform: "none",
                    fontWeight: 700,
                    borderRadius: 2.5,
                    py: 1,
                    "&:hover": { bgcolor: "#d9f0ed" },
                  }}
                >
                  View all patients
                </Button>
              </Paper>

              {/* Performance card */}
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: 3.5,
                  bgcolor: "#fff",
                  border: `1px solid ${border}`,
                }}
              >
                <Stack direction="row" spacing={1.2} sx={{alignItems:"center"}}>
                  <Box
                    sx={{
                      width: 42,
                      height: 42,
                      borderRadius: 2.5,
                      display: "grid",
                      placeItems: "center",
                      bgcolor: "#e8f7f5",
                      color: teal,
                    }}
                  >
                    <TrendingUpRoundedIcon />
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 800, fontSize: 14 }}>
                      Practice overview
                    </Typography>
                    <Typography sx={{ color: muted, fontSize: 11 }}>
                      Sample performance metrics
                    </Typography>
                  </Box>
                </Stack>

                <Stack
                  direction="row"
                  
                  sx={{ mt: 2.5 ,justifyContent:"space-between",
                  alignItems:"center"}}
                >
                  <Typography sx={{ color: muted, fontSize: 12 }}>
                    Appointment completion
                  </Typography>
                  <Typography
                    sx={{ color: teal, fontSize: 13, fontWeight: 800 }}
                  >
                    86%
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={86}
                  sx={{
                    mt: 1,
                    height: 7,
                    borderRadius: 5,
                    bgcolor: "#e8f2f1",
                    "& .MuiLinearProgress-bar": {
                      bgcolor: teal,
                      borderRadius: 5,
                    },
                  }}
                />

                <Stack
                  direction="row"
                 
                  sx={{ mt: 2, justifyContent:"space-between",
                  alignItems:"center" }}
                >
                  <Typography sx={{ color: muted, fontSize: 12 }}>
                    Patient satisfaction
                  </Typography>
                  <Typography sx={{ color: ink, fontSize: 13, fontWeight: 800 }}>
                    4.8 / 5
                  </Typography>
                </Stack>
              </Paper>
            </Stack>
          </Box>

          {/* Notice area */}
          {notice && (
            <Paper
              elevation={0}
              sx={{
                mt: 3,
                p: 2,
                border: `1px solid #cbece7`,
                bgcolor: "#edf9f7",
                borderRadius: 2.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <Typography sx={{ color: "#087f78", fontSize: 13 }}>
                {notice}
              </Typography>
              <Button
                size="small"
                onClick={() => setNotice("")}
                sx={{ color: teal, textTransform: "none" }}
              >
                Dismiss
              </Button>
            </Paper>
          )}

          <Typography
            sx={{
              textAlign: "center",
              color: "#9aa5b1",
              fontSize: 11,
              mt: 4,
              pb: 1,
            }}
          >
            © 2026 HealthConnect AI · Doctor Portal · Demo dashboard
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
