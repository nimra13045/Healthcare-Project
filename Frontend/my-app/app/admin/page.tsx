"use client";

import { useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  IconButton,
  LinearProgress,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import MedicalServicesRoundedIcon from "@mui/icons-material/MedicalServicesRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import HealthAndSafetyRoundedIcon from "@mui/icons-material/HealthAndSafetyRounded";
import { useMemo } from "react";

type Doctor = {
  id: number;
  name: string;
  specialty: string;
  email: string;
  status: "Pending" | "Verified" | "Rejected";
};

type Patient = {
  id: number;
  name: string;
  email: string;
  joined: string;
};

type Appointment = {
  id: number;
  patient: string;
  doctor: string;
  date: string;
  type: "Physical" | "Online";
  status: "Confirmed" | "Pending" | "Cancelled";
};

type Internship = {
  id: number;
  title: string;
  organization: string;
  applications: number;
  status: "Published" | "Pending" | "Closed";
};

const initialDoctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Ayesha Malik",
    specialty: "Cardiologist",
    email: "ayesha@example.com",
    status: "Pending",
  },
  {
    id: 2,
    name: "Dr. Ahmed Hassan",
    specialty: "Dermatologist",
    email: "ahmed@example.com",
    status: "Verified",
  },
  {
    id: 3,
    name: "Dr. Sara Khan",
    specialty: "General Physician",
    email: "sara@example.com",
    status: "Pending",
  },
  {
    id: 4,
    name: "Dr. Usman Ali",
    specialty: "Neurologist",
    email: "usman@example.com",
    status: "Verified",
  },
  {
    id: 5,
    name: "Dr. Hira Shah",
    specialty: "Pediatrician",
    email: "hira@example.com",
    status: "Rejected",
  },
];

const initialPatients: Patient[] = [
  {
    id: 1,
    name: "Fatima Noor",
    email: "fatima@example.com",
    joined: "Oct 12, 2026",
  },
  {
    id: 2,
    name: "Ali Raza",
    email: "ali@example.com",
    joined: "Oct 11, 2026",
  },
  {
    id: 3,
    name: "Maryam Iqbal",
    email: "maryam@example.com",
    joined: "Oct 10, 2026",
  },
  {
    id: 4,
    name: "Hamza Tariq",
    email: "hamza@example.com",
    joined: "Oct 09, 2026",
  },
];

const initialAppointments: Appointment[] = [
  {
    id: 1,
    patient: "Fatima Noor",
    doctor: "Dr. Ahmed Hassan",
    date: "Oct 16, 2026 · 10:00 AM",
    type: "Online",
    status: "Confirmed",
  },
  {
    id: 2,
    patient: "Ali Raza",
    doctor: "Dr. Ayesha Malik",
    date: "Oct 16, 2026 · 11:30 AM",
    type: "Physical",
    status: "Pending",
  },
  {
    id: 3,
    patient: "Maryam Iqbal",
    doctor: "Dr. Usman Ali",
    date: "Oct 17, 2026 · 02:00 PM",
    type: "Online",
    status: "Confirmed",
  },
  {
    id: 4,
    patient: "Hamza Tariq",
    doctor: "Dr. Sara Khan",
    date: "Oct 18, 2026 · 09:30 AM",
    type: "Physical",
    status: "Pending",
  },
];

const initialInternships: Internship[] = [
  {
    id: 1,
    title: "Clinical Internship",
    organization: "City Care Hospital",
    applications: 24,
    status: "Published",
  },
  {
    id: 2,
    title: "Pharmacy Intern",
    organization: "HealthPlus Pharmacy",
    applications: 16,
    status: "Pending",
  },
  {
    id: 3,
    title: "DPT Internship",
    organization: "Rehab Medical Center",
    applications: 31,
    status: "Published",
  },
];

const navigation = [
  { label: "Overview", icon: <DashboardRoundedIcon /> },
  { label: "Doctors", icon: <MedicalServicesRoundedIcon /> },
  { label: "Patients", icon: <PeopleAltRoundedIcon /> },
  { label: "Appointments", icon: <CalendarMonthRoundedIcon /> },
  { label: "Internships", icon: <WorkOutlineRoundedIcon /> },
  { label: "Reports", icon: <AssessmentRoundedIcon /> },
];

const primary = "#079B91";
const ink = "#1A2B3C";
const muted = "#718096";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [doctorFilter, setDoctorFilter] = useState("All");
  const [doctors, setDoctors] = useState(initialDoctors);
  const [patients] = useState(initialPatients);
  const [appointments, setAppointments] = useState(initialAppointments);
  const [internships, setInternships] = useState(initialInternships);
  const [notice, setNotice] = useState("");

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const matchesSearch =
        `${doctor.name} ${doctor.specialty} ${doctor.email}`
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        doctorFilter === "All" || doctor.status === doctorFilter;

      return matchesSearch && matchesStatus;
    });
  }, [doctors, search, doctorFilter]);

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) =>
      `${patient.name} ${patient.email}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [patients, search]);

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) =>
      `${appointment.patient} ${appointment.doctor} ${appointment.type}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [appointments, search]);

  const filteredInternships = useMemo(() => {
    return internships.filter((internship) =>
      `${internship.title} ${internship.organization}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [internships, search]);

  const verifiedDoctors = doctors.filter(
    (doctor) => doctor.status === "Verified",
  ).length;

  const pendingDoctors = doctors.filter(
    (doctor) => doctor.status === "Pending",
  ).length;

  const updateDoctorStatus = (
    id: number,
    status: Doctor["status"],
  ) => {
    setDoctors((previous) =>
      previous.map((doctor) =>
        doctor.id === id ? { ...doctor, status } : doctor,
      ),
    );

    const doctor = doctors.find((item) => item.id === id);
    setNotice(
      `${doctor?.name ?? "Doctor"} ${status.toLowerCase()} successfully.`,
    );
  };

  const updateAppointmentStatus = (
    id: number,
    status: Appointment["status"],
  ) => {
    setAppointments((previous) =>
      previous.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status }
          : appointment,
      ),
    );

    setNotice(`Appointment marked as ${status.toLowerCase()}.`);
  };

  const updateInternshipStatus = (
    id: number,
    status: Internship["status"],
  ) => {
    setInternships((previous) =>
      previous.map((internship) =>
        internship.id === id ? { ...internship, status } : internship,
      ),
    );

    setNotice(`Internship marked as ${status.toLowerCase()}.`);
  };

  const stats = [
    {
      title: "Total Patients",
      value: patients.length.toLocaleString(),
      change: "Registered users",
      icon: <PeopleAltRoundedIcon />,
      color: "#3478F6",
      bg: "#EAF1FF",
    },
    {
      title: "Verified Doctors",
      value: verifiedDoctors.toString(),
      change: `${pendingDoctors} awaiting review`,
      icon: <VerifiedUserRoundedIcon />,
      color: primary,
      bg: "#E4F7F4",
    },
    {
      title: "Appointments",
      value: appointments.length.toString(),
      change: `${appointments.filter((a) => a.status === "Pending").length} pending`,
      icon: <CalendarMonthRoundedIcon />,
      color: "#8854D0",
      bg: "#F1EAFE",
    },
    {
      title: "Internships",
      value: internships.length.toString(),
      change: `${internships.filter((i) => i.status === "Published").length} published`,
      icon: <WorkOutlineRoundedIcon />,
      color: "#E58B26",
      bg: "#FFF2DF",
    },
  ];

  const pageTitle =
    navigation.find((item) => item.label === activeTab)?.label ?? "Overview";

  const renderStatus = (status: string) => {
    const color =
      status === "Verified" ||
      status === "Confirmed" ||
      status === "Published"
        ? "success"
        : status === "Rejected" ||
            status === "Cancelled" ||
            status === "Closed"
          ? "error"
          : "warning";

    return (
      <Chip
        label={status}
        size="small"
        color={color}
        sx={{ fontWeight: 700, borderRadius: 2 }}
      />
    );
  };

  const panelSx = {
    border: "1px solid #E9EEF2",
    borderRadius: 3,
    boxShadow: "0 4px 24px rgba(26,43,60,0.035)",
    bgcolor: "#FFFFFF",
  };

  const headingSx = {
    fontSize: { xs: 17, sm: 19 },
    fontWeight: 800,
    color: ink,
  };

  const cellSx = {
    py: 1.8,
    borderColor: "#EDF1F4",
    color: "#435266",
    fontSize: 13,
    whiteSpace: "nowrap" as const,
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F6F8FB",
        display: "flex",
        color: ink,
      }}
    >
      {mobileMenu && (
        <Box
          onClick={() => setMobileMenu(false)}
          sx={{
            display: { xs: "block", md: "none" },
            position: "fixed",
            inset: 0,
            zIndex: 19,
            bgcolor: "rgba(15,23,42,0.4)",
          }}
        />
      )}

      <Box
        component="aside"
        sx={{
          width: 255,
          flexShrink: 0,
          bgcolor: "#FFFFFF",
          borderRight: "1px solid #E8EDF1",
          position: { xs: "fixed", md: "sticky" },
          top: 0,
          left: 0,
          height: "100vh",
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          transform: {
            xs: mobileMenu ? "translateX(0)" : "translateX(-100%)",
            md: "translateX(0)",
          },
          transition: "transform 0.25s ease",
        }}
      >
        <Stack
          direction="row"
          spacing={1.5}
          sx={{ alignItems: "center", px: 3, py: 3 }}
        >
          <Box
            sx={{
              width: 43,
              height: 43,
              borderRadius: 2.5,
              bgcolor: primary,
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <HealthAndSafetyRoundedIcon sx={{ fontSize: 28 }} />
          </Box>

          <Box>
            <Typography sx={{ fontSize: 19, fontWeight: 900, color: ink }}>
              HealthConnect
            </Typography>
            <Typography sx={{ fontSize: 11, color: muted }}>
              ADMIN CONSOLE
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ borderColor: "#EDF1F4" }} />

        <Typography
          sx={{
            px: 3,
            pt: 3,
            pb: 1.5,
            fontSize: 10,
            letterSpacing: 1.4,
            fontWeight: 800,
            color: "#9AA6B2",
          }}
        >
          MAIN MENU
        </Typography>

        <Stack spacing={0.7} sx={{ px: 1.5 }}>
          {navigation.map((item) => {
            const selected = activeTab === item.label;

            return (
              <Button
                key={item.label}
                onClick={() => {
                  setActiveTab(item.label);
                  setSearch("");
                  setMobileMenu(false);
                  setNotice("");
                }}
                startIcon={item.icon}
                sx={{
                  justifyContent: "flex-start",
                  textTransform: "none",
                  borderRadius: 2,
                  py: 1.3,
                  px: 2,
                  fontWeight: selected ? 800 : 600,
                  fontSize: 13,
                  color: selected ? primary : "#718096",
                  bgcolor: selected ? "#E6F7F5" : "transparent",
                  "& .MuiButton-startIcon": { mr: 1.5 },
                  "&:hover": {
                    bgcolor: selected ? "#E6F7F5" : "#F5F8FA",
                  },
                }}
              >
                {item.label}
                {item.label === "Doctors" && pendingDoctors > 0 && (
                  <Box
                    sx={{
                      ml: "auto",
                      minWidth: 22,
                      height: 22,
                      px: 0.7,
                      borderRadius: 2,
                      bgcolor: selected ? primary : "#FFF0DC",
                      color: selected ? "#FFFFFF" : "#C47A1B",
                      fontSize: 11,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {pendingDoctors}
                  </Box>
                )}
              </Button>
            );
          })}
        </Stack>

        <Box sx={{ flexGrow: 1 }} />

        <Box
          sx={{
            m: 2,
            p: 2,
            borderRadius: 3,
            bgcolor: "#F0FAF8",
            border: "1px solid #DDF1ED",
          }}
        >
          <Avatar
            sx={{
              bgcolor: "#D3F1E9",
              color: primary,
              width: 38,
              height: 38,
              mb: 1.5,
            }}
          >
            <VerifiedUserRoundedIcon />
          </Avatar>
          <Typography sx={{ fontSize: 13, fontWeight: 800, color: ink }}>
            Admin workspace
          </Typography>
          <Typography
            sx={{ fontSize: 11, color: muted, mt: 0.5, lineHeight: 1.6 }}
          >
            Manage your healthcare community in one place.
          </Typography>
        </Box>
      </Box>

      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Box
          component="header"
          sx={{
            height: 78,
            px: { xs: 2, sm: 3, lg: 4 },
            bgcolor: "#FFFFFF",
            borderBottom: "1px solid #E8EDF1",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <Stack
            direction="row"
            spacing={1.5}
            sx={{ alignItems: "center", minWidth: 0 }}
          >
            <IconButton
              onClick={() => setMobileMenu(true)}
              sx={{ display: { xs: "inline-flex", md: "none" } }}
              aria-label="Open navigation"
            >
              <MenuRoundedIcon />
            </IconButton>

            <Box>
              <Typography
                sx={{
                  fontSize: { xs: 18, sm: 22 },
                  fontWeight: 900,
                  color: ink,
                }}
              >
                {pageTitle}
              </Typography>
              <Typography
                sx={{
                  display: { xs: "none", sm: "block" },
                  color: muted,
                  fontSize: 12,
                }}
              >
                Welcome back, Admin. Here&apos;s your platform overview.
              </Typography>
            </Box>
          </Stack>

          <Stack
            direction="row"
            spacing={1.5}
            sx={{ alignItems: "center", flexShrink: 0 }}
          >
            <IconButton
              aria-label="Notifications"
              sx={{
                bgcolor: "#F5F8FA",
                border: "1px solid #E9EEF2",
                borderRadius: 2.5,
              }}
            >
              <NotificationsNoneRoundedIcon sx={{ fontSize: 21 }} />
            </IconButton>

            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: ink,
                fontSize: 14,
                fontWeight: 800,
              }}
            >
              AD
            </Avatar>

            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Typography sx={{ fontSize: 13, fontWeight: 800 }}>
                Admin User
              </Typography>
              <Typography sx={{ fontSize: 11, color: muted }}>
                Super Administrator
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Container
          maxWidth={false}
          sx={{
            py: { xs: 2.5, md: 4 },
            px: { xs: 2, sm: 3, lg: 4 },
            maxWidth: 1600,
          }}
        >
          {notice && (
            <Alert
              severity="success"
              onClose={() => setNotice("")}
              sx={{ mb: 2.5, borderRadius: 2 }}
            >
              {notice}
            </Alert>
          )}

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{
              alignItems: { xs: "stretch", sm: "center" },
              justifyContent: "space-between",
              mb: 3,
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: { xs: 22, sm: 27 },
                  fontWeight: 900,
                  letterSpacing: -0.7,
                }}
              >
                {activeTab === "Overview"
                  ? "Platform overview"
                  : `Manage ${activeTab.toLowerCase()}`}
              </Typography>
              <Typography sx={{ color: muted, fontSize: 13, mt: 0.7 }}>
                Monitor activity and manage your healthcare platform.
              </Typography>
            </Box>

            <Chip
              icon={<CheckCircleRoundedIcon />}
              label="System operational"
              color="success"
              variant="outlined"
              sx={{ alignSelf: { xs: "flex-start", sm: "center" }, fontWeight: 700 }}
            />
          </Stack>

          {activeTab === "Overview" && (
            <>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, minmax(0, 1fr))",
                    xl: "repeat(4, minmax(0, 1fr))",
                  },
                  gap: 2,
                  mb: 3,
                }}
              >
                {stats.map((stat) => (
                  <Paper
                    key={stat.title}
                    elevation={0}
                    sx={{
                      ...panelSx,
                      p: 2.5,
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                      "&:hover": {
                        transform: "translateY(-3px)",
                        boxShadow: "0 10px 28px rgba(26,43,60,0.08)",
                      },
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={1.5}
                      sx={{ alignItems: "center", justifyContent: "space-between" }}
                    >
                      <Typography sx={{ color: muted, fontSize: 13, fontWeight: 700 }}>
                        {stat.title}
                      </Typography>
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: 2.5,
                          bgcolor: stat.bg,
                          color: stat.color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {stat.icon}
                      </Box>
                    </Stack>

                    <Typography
                      sx={{
                        fontSize: 30,
                        fontWeight: 900,
                        mt: 2,
                        letterSpacing: -1,
                      }}
                    >
                      {stat.value}
                    </Typography>

                    <Stack
                      direction="row"
                      spacing={0.7}
                      sx={{ alignItems: "center", mt: 1 }}
                    >
                      <TrendingUpRoundedIcon
                        sx={{ fontSize: 16, color: primary }}
                      />
                      <Typography sx={{ fontSize: 11, color: muted }}>
                        {stat.change}
                      </Typography>
                    </Stack>
                  </Paper>
                ))}
              </Box>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    lg: "minmax(0, 1.6fr) minmax(280px, 1fr)",
                  },
                  gap: 2.5,
                }}
              >
                <Paper elevation={0} sx={{ ...panelSx, p: { xs: 2, sm: 3 } }}>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ alignItems: "center", justifyContent: "space-between", mb: 2.5 }}
                  >
                    <Typography sx={headingSx}>Doctor verification</Typography>
                    <Button
                      onClick={() => {
                        setActiveTab("Doctors");
                        setSearch("");
                      }}
                      size="small"
                      sx={{ color: primary, textTransform: "none", fontWeight: 800 }}
                    >
                      View all
                    </Button>
                  </Stack>

                  {doctors
                    .filter((doctor) => doctor.status === "Pending")
                    .map((doctor) => (
                      <Box key={doctor.id}>
                        <Stack
                          direction="row"
                          spacing={1.5}
                          sx={{ alignItems: "center", py: 1.7 }}
                        >
                          <Avatar
                            sx={{
                              bgcolor: "#E4F7F4",
                              color: primary,
                              fontWeight: 800,
                            }}
                          >
                            {doctor.name.replace("Dr. ", "").charAt(0)}
                          </Avatar>

                          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                            <Typography sx={{ fontSize: 13, fontWeight: 800 }}>
                              {doctor.name}
                            </Typography>
                            <Typography sx={{ fontSize: 11, color: muted }}>
                              {doctor.specialty}
                            </Typography>
                          </Box>

                          <Stack
                            direction="row"
                            spacing={0.7}
                            sx={{ alignItems: "center" }}
                          >
                            <IconButton
                              size="small"
                              aria-label={`Verify ${doctor.name}`}
                              onClick={() => updateDoctorStatus(doctor.id, "Verified")}
                              sx={{ color: primary, bgcolor: "#E5F7F3" }}
                            >
                              <CheckCircleRoundedIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              aria-label={`Reject ${doctor.name}`}
                              onClick={() => updateDoctorStatus(doctor.id, "Rejected")}
                              sx={{ color: "#D34A4A", bgcolor: "#FFF0F0" }}
                            >
                              <CancelRoundedIcon fontSize="small" />
                            </IconButton>
                          </Stack>
                        </Stack>
                        <Divider sx={{ borderColor: "#EDF1F4" }} />
                      </Box>
                    ))}

                  {pendingDoctors === 0 && (
                    <Alert severity="success">All doctors have been reviewed.</Alert>
                  )}
                </Paper>

                <Paper elevation={0} sx={{ ...panelSx, p: { xs: 2, sm: 3 } }}>
                  <Typography sx={{ ...headingSx, mb: 2.5 }}>
                    Platform health
                  </Typography>

                  {[
                    { label: "Doctor verification", value: doctors.length ? Math.round((verifiedDoctors / doctors.length) * 100) : 0, color: primary },
                    { label: "Published internships", value: internships.length ? Math.round((internships.filter((i) => i.status === "Published").length / internships.length) * 100) : 0, color: "#8854D0" },
                    { label: "Confirmed appointments", value: appointments.length ? Math.round((appointments.filter((a) => a.status === "Confirmed").length / appointments.length) * 100) : 0, color: "#3478F6" },
                  ].map((item) => (
                    <Box key={item.label} sx={{ mb: 3 }}>
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ alignItems: "center", justifyContent: "space-between", mb: 1 }}
                      >
                        <Typography sx={{ fontSize: 12, fontWeight: 700 }}>
                          {item.label}
                        </Typography>
                        <Typography sx={{ fontSize: 12, fontWeight: 900 }}>
                          {item.value}%
                        </Typography>
                      </Stack>
                      <LinearProgress
                        variant="determinate"
                        value={item.value}
                        sx={{
                          height: 8,
                          borderRadius: 5,
                          bgcolor: "#EDF1F4",
                          "& .MuiLinearProgress-bar": {
                            borderRadius: 5,
                            bgcolor: item.color,
                          },
                        }}
                      />
                    </Box>
                  ))}

                  <Box
                    sx={{
                      mt: 3,
                      p: 2,
                      borderRadius: 2.5,
                      bgcolor: "#F0FAF8",
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={1.2}
                      sx={{ alignItems: "center" }}
                    >
                      <VerifiedUserRoundedIcon sx={{ color: primary }} />
                      <Box>
                        <Typography sx={{ fontSize: 12, fontWeight: 800 }}>
                          Keep patient data safe
                        </Typography>
                        <Typography sx={{ fontSize: 11, color: muted, mt: 0.4 }}>
                          Review provider credentials before verification.
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                </Paper>
              </Box>

              <Paper
                elevation={0}
                sx={{ ...panelSx, p: { xs: 2, sm: 3 }, mt: 2.5 }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ alignItems: "center", justifyContent: "space-between", mb: 2 }}
                >
                  <Typography sx={headingSx}>Recent appointments</Typography>
                  <Button
                    size="small"
                    onClick={() => {
                      setActiveTab("Appointments");
                      setSearch("");
                    }}
                    sx={{ color: primary, textTransform: "none", fontWeight: 800 }}
                  >
                    View all
                  </Button>
                </Stack>

                <TableContainer sx={{ overflowX: "auto" }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ bgcolor: "#F8FAFC" }}>
                        {["Patient", "Doctor", "Date & time", "Type", "Status"].map((heading) => (
                          <TableCell key={heading} sx={{ ...cellSx, fontWeight: 800 }}>
                            {heading}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {appointments.slice(0, 4).map((appointment) => (
                        <TableRow key={appointment.id} hover>
                          <TableCell sx={cellSx}>{appointment.patient}</TableCell>
                          <TableCell sx={cellSx}>{appointment.doctor}</TableCell>
                          <TableCell sx={cellSx}>{appointment.date}</TableCell>
                          <TableCell sx={cellSx}>{appointment.type}</TableCell>
                          <TableCell sx={cellSx}>{renderStatus(appointment.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </>
          )}

          {activeTab === "Doctors" && (
            <Paper elevation={0} sx={{ ...panelSx, p: { xs: 2, sm: 3 } }}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ alignItems: { xs: "stretch", sm: "center" }, justifyContent: "space-between", mb: 3 }}
              >
                <Box>
                  <Typography sx={headingSx}>Doctor management</Typography>
                  <Typography sx={{ color: muted, fontSize: 12, mt: 0.6 }}>
                    Review provider details and manage verification.
                  </Typography>
                </Box>
                <TextField
                  select
                  size="small"
                  label="Verification status"
                  value={doctorFilter}
                  onChange={(event) => setDoctorFilter(event.target.value)}
                  sx={{ minWidth: 180 }}
                >
                  {["All", "Pending", "Verified", "Rejected"].map((status) => (
                    <MenuItem key={status} value={status}>{status}</MenuItem>
                  ))}
                </TextField>
              </Stack>

              <TextField
  fullWidth
  size="small"
  placeholder="Search doctors by name, specialty or email..."
  value={search}
  onChange={(event) => setSearch(event.target.value)}
  slotProps={{
    input: {
      startAdornment: (
        <SearchRoundedIcon
          sx={{ color: muted, mr: 1 }}
        />
      ),
    },
  }}
  sx={{ mb: 2.5 }}
/>

              <TableContainer sx={{ overflowX: "auto" }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: "#F8FAFC" }}>
                      {["Doctor", "Specialty", "Email", "Status", "Actions"].map((heading) => (
                        <TableCell key={heading} sx={{ ...cellSx, fontWeight: 800 }}>
                          {heading}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredDoctors.map((doctor) => (
                      <TableRow key={doctor.id} hover>
                        <TableCell sx={cellSx}>
                          <Stack direction="row" spacing={1.2} sx={{ alignItems: "center" }}>
                            <Avatar sx={{ bgcolor: "#E4F7F4", color: primary, width: 36, height: 36 }}>
                              {doctor.name.replace("Dr. ", "").charAt(0)}
                            </Avatar>
                            <Typography sx={{ fontSize: 12, fontWeight: 800 }}>
                              {doctor.name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell sx={cellSx}>{doctor.specialty}</TableCell>
                        <TableCell sx={cellSx}>{doctor.email}</TableCell>
                        <TableCell sx={cellSx}>{renderStatus(doctor.status)}</TableCell>
                        <TableCell sx={cellSx}>
                          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                            {doctor.status !== "Verified" && (
                              <Button
                                size="small"
                                variant="contained"
                                onClick={() => updateDoctorStatus(doctor.id, "Verified")}
                                sx={{ bgcolor: primary, textTransform: "none", boxShadow: "none", "&:hover": { bgcolor: "#067E76", boxShadow: "none" } }}
                              >
                                Verify
                              </Button>
                            )}
                            {doctor.status !== "Rejected" && (
                              <Button
                                size="small"
                                color="error"
                                variant="outlined"
                                onClick={() => updateDoctorStatus(doctor.id, "Rejected")}
                                sx={{ textTransform: "none" }}
                              >
                                Reject
                              </Button>
                            )}
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredDoctors.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} align="center" sx={{ py: 5, color: muted }}>
                          No doctors found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          )}

          {activeTab === "Patients" && (
            <Paper elevation={0} sx={{ ...panelSx, p: { xs: 2, sm: 3 } }}>
              <Typography sx={headingSx}>Registered patients</Typography>
              <Typography sx={{ color: muted, fontSize: 12, mt: 0.6, mb: 2.5 }}>
                View patient accounts registered on the platform.
              </Typography>

              <TextField
                fullWidth
                size="small"
                placeholder="Search patients by name or email..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                sx={{ mb: 2.5 }}
              />

              <TableContainer sx={{ overflowX: "auto" }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: "#F8FAFC" }}>
                      {["Patient", "Email", "Joined", "Account status"].map((heading) => (
                        <TableCell key={heading} sx={{ ...cellSx, fontWeight: 800 }}>
                          {heading}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredPatients.map((patient) => (
                      <TableRow key={patient.id} hover>
                        <TableCell sx={cellSx}>
                          <Stack direction="row" spacing={1.2} sx={{ alignItems: "center" }}>
                            <Avatar sx={{ bgcolor: "#EAF1FF", color: "#3478F6" }}>
                              {patient.name.charAt(0)}
                            </Avatar>
                            <Typography sx={{ fontWeight: 800, fontSize: 13 }}>
                              {patient.name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell sx={cellSx}>{patient.email}</TableCell>
                        <TableCell sx={cellSx}>{patient.joined}</TableCell>
                        <TableCell sx={cellSx}>
                          <Chip label="Active" size="small" color="success" />
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredPatients.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} align="center" sx={{ py: 5, color: muted }}>
                          No patients found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          )}

          {activeTab === "Appointments" && (
            <Paper elevation={0} sx={{ ...panelSx, p: { xs: 2, sm: 3 } }}>
              <Typography sx={headingSx}>Appointment management</Typography>
              <Typography sx={{ color: muted, fontSize: 12, mt: 0.6, mb: 2.5 }}>
                Review appointment bookings and update their status.
              </Typography>

              <TextField
                fullWidth
                size="small"
                placeholder="Search patient, doctor or consultation type..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                sx={{ mb: 2.5 }}
              />

              <TableContainer sx={{ overflowX: "auto" }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: "#F8FAFC" }}>
                      {["Patient", "Doctor", "Date & time", "Type", "Status", "Actions"].map((heading) => (
                        <TableCell key={heading} sx={{ ...cellSx, fontWeight: 800 }}>
                          {heading}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredAppointments.map((appointment) => (
                      <TableRow key={appointment.id} hover>
                        <TableCell sx={cellSx}>{appointment.patient}</TableCell>
                        <TableCell sx={cellSx}>{appointment.doctor}</TableCell>
                        <TableCell sx={cellSx}>{appointment.date}</TableCell>
                        <TableCell sx={cellSx}>{appointment.type}</TableCell>
                        <TableCell sx={cellSx}>{renderStatus(appointment.status)}</TableCell>
                        <TableCell sx={cellSx}>
                          <TextField
                            select
                            size="small"
                            value={appointment.status}
                            onChange={(event) =>
                              updateAppointmentStatus(
                                appointment.id,
                                event.target.value as Appointment["status"],
                              )
                            }
                            sx={{ minWidth: 135 }}
                          >
                            {["Pending", "Confirmed", "Cancelled"].map((status) => (
                              <MenuItem key={status} value={status}>{status}</MenuItem>
                            ))}
                          </TextField>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredAppointments.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} align="center" sx={{ py: 5, color: muted }}>
                          No appointments found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          )}

          {activeTab === "Internships" && (
            <Paper elevation={0} sx={{ ...panelSx, p: { xs: 2, sm: 3 } }}>
              <Typography sx={headingSx}>Internship management</Typography>
              <Typography sx={{ color: muted, fontSize: 12, mt: 0.6, mb: 2.5 }}>
                Review healthcare internship listings and manage publication.
              </Typography>

              <TextField
                fullWidth
                size="small"
                placeholder="Search internships or organizations..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                sx={{ mb: 2.5 }}
              />

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
                  gap: 2,
                }}
              >
                {filteredInternships.map((internship) => (
                  <Paper
                    key={internship.id}
                    elevation={0}
                    sx={{
                      p: 2.5,
                      border: "1px solid #E9EEF2",
                      borderRadius: 3,
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={1.5}
                      sx={{ alignItems: "flex-start", justifyContent: "space-between" }}
                    >
                      <Avatar sx={{ bgcolor: "#FFF2DF", color: "#E58B26", borderRadius: 2 }}>
                        <WorkOutlineRoundedIcon />
                      </Avatar>
                      {renderStatus(internship.status)}
                    </Stack>

                    <Typography sx={{ fontSize: 16, fontWeight: 900, mt: 2 }}>
                      {internship.title}
                    </Typography>
                    <Typography sx={{ color: muted, fontSize: 12, mt: 0.7 }}>
                      {internship.organization}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ alignItems: "center", justifyContent: "space-between" }}
                    >
                      <Typography sx={{ fontSize: 12, color: muted }}>
                        {internship.applications} applications
                      </Typography>
                      <TextField
                        select
                        size="small"
                        label="Status"
                        value={internship.status}
                        onChange={(event) =>
                          updateInternshipStatus(
                            internship.id,
                            event.target.value as Internship["status"],
                          )
                        }
                        sx={{ minWidth: 130 }}
                      >
                        {["Pending", "Published", "Closed"].map((status) => (
                          <MenuItem key={status} value={status}>{status}</MenuItem>
                        ))}
                      </TextField>
                    </Stack>
                  </Paper>
                ))}

                {filteredInternships.length === 0 && (
                  <Typography sx={{ color: muted, py: 4 }}>
                    No internships found.
                  </Typography>
                )}
              </Box>
            </Paper>
          )}

          {activeTab === "Reports" && (
            <>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "repeat(3, minmax(0, 1fr))" },
                  gap: 2,
                  mb: 3,
                }}
              >
                {[
                  { label: "Patient accounts", value: patients.length, icon: <PeopleAltRoundedIcon />, color: "#3478F6" },
                  { label: "Verified providers", value: verifiedDoctors, icon: <MedicalServicesRoundedIcon />, color: primary },
                  { label: "Total appointments", value: appointments.length, icon: <CalendarMonthRoundedIcon />, color: "#8854D0" },
                ].map((item) => (
                  <Paper key={item.label} elevation={0} sx={{ ...panelSx, p: 3 }}>
                    <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                      <Avatar sx={{ bgcolor: "#EAF1FF", color: item.color }}>
                        {item.icon}
                      </Avatar>
                      <Box>
                        <Typography sx={{ color: muted, fontSize: 12 }}>
                          {item.label}
                        </Typography>
                        <Typography sx={{ fontSize: 26, fontWeight: 900 }}>
                          {item.value}
                        </Typography>
                      </Box>
                    </Stack>
                  </Paper>
                ))}
              </Box>

              <Paper elevation={0} sx={{ ...panelSx, p: { xs: 2, sm: 3 } }}>
                <Typography sx={headingSx}>Platform summary</Typography>
                <Typography sx={{ color: muted, fontSize: 12, mt: 0.7, mb: 3 }}>
                  Current statistics based on the dashboard demo data.
                </Typography>

                {[
                  { label: "Verified doctors", count: verifiedDoctors, total: doctors.length },
                  { label: "Patients registered", count: patients.length, total: patients.length },
                  { label: "Confirmed appointments", count: appointments.filter((a) => a.status === "Confirmed").length, total: appointments.length },
                  { label: "Published internships", count: internships.filter((i) => i.status === "Published").length, total: internships.length },
                ].map((report) => (
                  <Box key={report.label} sx={{ mb: 3 }}>
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ alignItems: "center", justifyContent: "space-between", mb: 1 }}
                    >
                      <Typography sx={{ fontSize: 13, fontWeight: 700 }}>
                        {report.label}
                      </Typography>
                      <Typography sx={{ fontSize: 12, color: muted }}>
                        {report.count} / {report.total}
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={report.total ? (report.count / report.total) * 100 : 0}
                      sx={{
                        height: 9,
                        borderRadius: 5,
                        bgcolor: "#EDF1F4",
                        "& .MuiLinearProgress-bar": {
                          bgcolor: primary,
                          borderRadius: 5,
                        },
                      }}
                    />
                  </Box>
                ))}
              </Paper>
            </>
          )}

          <Typography
            sx={{
              mt: 4,
              textAlign: "center",
              fontSize: 11,
              color: "#98A4B2",
            }}
          >
            © 2026 HealthConnect AI · Admin Dashboard · Frontend demo
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}