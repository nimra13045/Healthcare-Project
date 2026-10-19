
"use client";

import { useMemo, useState, type ReactNode } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import MedicalServicesRoundedIcon from "@mui/icons-material/MedicalServicesRounded";

const teal = "#079b91";
const ink = "#1a2b3c";
const muted = "#758395";
const border = "#e8edf2";

type Doctor = {
  id: number;
  name: string;
  specialty: string;
  email: string;
  status: "Active" | "Pending";
};

type Appointment = {
  id: number;
  patient: string;
  doctor: string;
  date: string;
  time: string;
  type: "Online" | "In-Clinic";
  status: "Confirmed" | "Pending" | "Completed" | "Cancelled";
};

type Internship = {
  id: number;
  title: string;
  department: string;
  duration: string;
  seats: number;
  status: "Published" | "Draft";
};

type Application = {
  id: number;
  student: string;
  internship: string;
  education: string;
  status: "Pending" | "Accepted" | "Rejected";
};

const initialDoctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Ayesha Khan",
    specialty: "General Physician",
    email: "ayesha@example.com",
    status: "Active",
  },
  {
    id: 2,
    name: "Dr. Hamza Ali",
    specialty: "Cardiologist",
    email: "hamza@example.com",
    status: "Active",
  },
  {
    id: 3,
    name: "Dr. Sara Ahmed",
    specialty: "Dermatologist",
    email: "sara@example.com",
    status: "Pending",
  },
  {
    id: 4,
    name: "Dr. Usman Tariq",
    specialty: "Orthopedic Surgeon",
    email: "usman@example.com",
    status: "Active",
  },
];

const initialAppointments: Appointment[] = [
  {
    id: 1,
    patient: "Ahmed Raza",
    doctor: "Dr. Ayesha Khan",
    date: "2026-10-16",
    time: "09:30 AM",
    type: "In-Clinic",
    status: "Confirmed",
  },
  {
    id: 2,
    patient: "Fatima Noor",
    doctor: "Dr. Hamza Ali",
    date: "2026-10-16",
    time: "10:30 AM",
    type: "Online",
    status: "Pending",
  },
  {
    id: 3,
    patient: "Hassan Ali",
    doctor: "Dr. Sara Ahmed",
    date: "2026-10-17",
    time: "11:15 AM",
    type: "In-Clinic",
    status: "Confirmed",
  },
  {
    id: 4,
    patient: "Ayesha Malik",
    doctor: "Dr. Ayesha Khan",
    date: "2026-10-18",
    time: "12:00 PM",
    type: "Online",
    status: "Completed",
  },
];

const initialInternships: Internship[] = [
  {
    id: 1,
    title: "Clinical Internship",
    department: "General Medicine",
    duration: "8 weeks",
    seats: 5,
    status: "Published",
  },
  {
    id: 2,
    title: "Pharmacy Internship",
    department: "Pharmacy",
    duration: "6 weeks",
    seats: 3,
    status: "Published",
  },
  {
    id: 3,
    title: "Medical Lab Internship",
    department: "Laboratory",
    duration: "4 weeks",
    seats: 4,
    status: "Draft",
  },
];

const initialApplications: Application[] = [
  {
    id: 1,
    student: "Ali Hassan",
    internship: "Clinical Internship",
    education: "BS Allied Health Sciences",
    status: "Pending",
  },
  {
    id: 2,
    student: "Maryam Iqbal",
    internship: "Pharmacy Internship",
    education: "Pharm-D Student",
    status: "Pending",
  },
  {
    id: 3,
    student: "Usman Khalid",
    internship: "Clinical Internship",
    education: "DPT Student",
    status: "Accepted",
  },
];

const navigation = [
  { label: "Overview", icon: <DashboardRoundedIcon /> },
  { label: "Doctors", icon: <PeopleAltRoundedIcon /> },
  { label: "Appointments", icon: <CalendarMonthRoundedIcon /> },
  { label: "Internships", icon: <WorkOutlineRoundedIcon /> },
  { label: "Applications", icon: <DescriptionRoundedIcon /> },
  { label: "Organization Profile", icon: <BusinessRoundedIcon /> },
  { label: "Settings", icon: <SettingsRoundedIcon /> },
];

function MetricCard({
  title,
  value,
  subtitle,
  icon,
  color,
}: {
  title: string;
  value: string | number;
  subtitle: string;
  icon: ReactNode;
  color: string;
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        border: `1px solid ${border}`,
        borderRadius: 3,
        height: "100%",
        transition: "0.2s",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 10px 25px rgba(26,43,60,0.06)",
        },
      }}
    >
      <Stack direction="row" sx={{justifyContent:"space-between"}}>
        <Box
          sx={{
            width: 46,
            height: 46,
            borderRadius: 2.5,
            bgcolor: `${color}18`,
            color,
            display: "grid",
            placeItems: "center",
          }}
        >
          {icon}
        </Box>
        <TrendingUpRoundedIcon sx={{ color: "#a4afb9", fontSize: 19 }} />
      </Stack>

      <Typography sx={{ color: muted, fontSize: 13, mt: 2 }}>
        {title}
      </Typography>

      <Typography
        sx={{ color: ink, fontSize: 29, fontWeight: 800, mt: 0.5 }}
      >
        {value}
      </Typography>

      <Typography sx={{ color: muted, fontSize: 12, mt: 0.7 }}>
        {subtitle}
      </Typography>
    </Paper>
  );
}

function StatusChip({ status }: { status: string }) {
  const styles: Record<string, { bg: string; color: string }> = {
    Active: { bg: "#e4f6ed", color: "#21845b" },
    Confirmed: { bg: "#e4f6ed", color: "#21845b" },
    Accepted: { bg: "#e4f6ed", color: "#21845b" },
    Published: { bg: "#e4f6ed", color: "#21845b" },
    Pending: { bg: "#fff3db", color: "#a66c0a" },
    Draft: { bg: "#eef1f5", color: "#657386" },
    Completed: { bg: "#e8efff", color: "#4266bd" },
    Rejected: { bg: "#fee9e7", color: "#c34840" },
    Cancelled: { bg: "#fee9e7", color: "#c34840" },
  };

  const style = styles[status] || {
    bg: "#eef1f5",
    color: "#657386",
  };

  return (
    <Chip
      size="small"
      label={status}
      sx={{
        bgcolor: style.bg,
        color: style.color,
        fontWeight: 700,
        fontSize: 11,
      }}
    />
  );
}

export default function OrganizationDashboard() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("");
  const [noticeType, setNoticeType] = useState<"success" | "info" | "error">(
    "success"
  );

  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [appointments, setAppointments] =
    useState<Appointment[]>(initialAppointments);
  const [internships, setInternships] =
    useState<Internship[]>(initialInternships);
  const [applications, setApplications] =
    useState<Application[]>(initialApplications);

  const [doctorDialog, setDoctorDialog] = useState(false);
  const [internshipDialog, setInternshipDialog] = useState(false);
  const [editingDoctorId, setEditingDoctorId] = useState<number | null>(null);
  const [editingInternshipId, setEditingInternshipId] = useState<number | null>(
    null
  );

  const [doctorForm, setDoctorForm] = useState({
    name: "",
    specialty: "",
    email: "",
  });

  const [internshipForm, setInternshipForm] = useState({
    title: "",
    department: "",
    duration: "8 weeks",
    seats: "5",
  });

  const [organization, setOrganization] = useState({
    name: "HealthConnect Medical Centre",
    email: "admin@healthconnect.example",
    phone: "+92 300 1234567",
    city: "Lahore",
    address: "DHA Phase 6, Lahore, Pakistan",
    description:
      "A healthcare organization providing patient care, specialist consultations, and clinical training opportunities.",
  });

  const [settings, setSettings] = useState({
    appointmentNotifications: true,
    applicationNotifications: true,
    publicProfile: true,
    acceptApplications: true,
  });

  const [appointmentFilter, setAppointmentFilter] = useState("All");
  const [applicationFilter, setApplicationFilter] = useState("All");

  const activeDoctors = doctors.filter((doctor) => doctor.status === "Active");
  const pendingAppointments = appointments.filter(
    (appointment) => appointment.status === "Pending"
  );
  const publishedInternships = internships.filter(
    (internship) => internship.status === "Published"
  );
  const pendingApplications = applications.filter(
    (application) => application.status === "Pending"
  );

  const filteredDoctors = useMemo(
    () =>
      doctors.filter((doctor) =>
        `${doctor.name} ${doctor.specialty} ${doctor.email}`
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [doctors, search]
  );

  const filteredAppointments = useMemo(
    () =>
      appointments.filter((appointment) => {
        const matchesSearch =
          `${appointment.patient} ${appointment.doctor} ${appointment.type}`
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesFilter =
          appointmentFilter === "All" ||
          appointment.status === appointmentFilter;

        return matchesSearch && matchesFilter;
      }),
    [appointments, search, appointmentFilter]
  );

  const filteredInternships = useMemo(
    () =>
      internships.filter((internship) =>
        `${internship.title} ${internship.department}`
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [internships, search]
  );

  const filteredApplications = useMemo(
    () =>
      applications.filter((application) => {
        const matchesSearch =
          `${application.student} ${application.internship} ${application.education}`
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesFilter =
          applicationFilter === "All" ||
          application.status === applicationFilter;

        return matchesSearch && matchesFilter;
      }),
    [applications, search, applicationFilter]
  );

  function showNotice(
    message: string,
    type: "success" | "info" | "error" = "success"
  ) {
    setNotice(message);
    setNoticeType(type);
  }

  function navigate(label: string) {
    setActiveTab(label);
    setSearch("");
    setNotice("");
    setMobileMenu(false);
  }

  function openAddDoctor() {
    setDoctorForm({ name: "", specialty: "", email: "" });
    setEditingDoctorId(null);
    setDoctorDialog(true);
  }

  function openEditDoctor(doctor: Doctor) {
    setDoctorForm({
      name: doctor.name,
      specialty: doctor.specialty,
      email: doctor.email,
    });
    setEditingDoctorId(doctor.id);
    setDoctorDialog(true);
  }

  function saveDoctor() {
    if (
      !doctorForm.name.trim() ||
      !doctorForm.specialty.trim() ||
      !doctorForm.email.trim()
    ) {
      showNotice("Please fill in all doctor fields.", "error");
      return;
    }

    if (editingDoctorId !== null) {
      setDoctors((current) =>
        current.map((doctor) =>
          doctor.id === editingDoctorId
            ? { ...doctor, ...doctorForm }
            : doctor
        )
      );
      showNotice("Doctor information updated.");
    } else {
      setDoctors((current) => [
        ...current,
        {
          id: Date.now(),
          ...doctorForm,
          status: "Pending",
        },
      ]);
      showNotice("Doctor added. Their status is Pending verification.", "info");
    }

    setDoctorDialog(false);
  }

  function deleteDoctor(id: number) {
    setDoctors((current) => current.filter((doctor) => doctor.id !== id));
    showNotice("Doctor removed from this demo dashboard.");
  }

  function updateDoctorStatus(id: number, status: Doctor["status"]) {
    setDoctors((current) =>
      current.map((doctor) =>
        doctor.id === id ? { ...doctor, status } : doctor
      )
    );
    showNotice(`Doctor status updated to ${status}.`);
  }

  function openAddInternship() {
    setInternshipForm({
      title: "",
      department: "",
      duration: "8 weeks",
      seats: "5",
    });
    setEditingInternshipId(null);
    setInternshipDialog(true);
  }

  function openEditInternship(internship: Internship) {
    setInternshipForm({
      title: internship.title,
      department: internship.department,
      duration: internship.duration,
      seats: String(internship.seats),
    });
    setEditingInternshipId(internship.id);
    setInternshipDialog(true);
  }

  function saveInternship() {
    if (
      !internshipForm.title.trim() ||
      !internshipForm.department.trim() ||
      !internshipForm.duration.trim() ||
      Number(internshipForm.seats) < 1
    ) {
      showNotice("Enter a title, department, duration, and valid seat count.", "error");
      return;
    }

    const values = {
      title: internshipForm.title.trim(),
      department: internshipForm.department.trim(),
      duration: internshipForm.duration.trim(),
      seats: Number(internshipForm.seats),
    };

    if (editingInternshipId !== null) {
      setInternships((current) =>
        current.map((internship) =>
          internship.id === editingInternshipId
            ? { ...internship, ...values }
            : internship
        )
      );
      showNotice("Internship listing updated.");
    } else {
      setInternships((current) => [
        ...current,
        {
          id: Date.now(),
          ...values,
          status: "Draft",
        },
      ]);
      showNotice("Internship created as a draft. Publish it when ready.", "info");
    }

    setInternshipDialog(false);
  }

  function updateInternshipStatus(
    id: number,
    status: Internship["status"]
  ) {
    setInternships((current) =>
      current.map((internship) =>
        internship.id === id ? { ...internship, status } : internship
      )
    );
    showNotice(`Internship ${status.toLowerCase()}.`);
  }

  function deleteInternship(id: number) {
    setInternships((current) =>
      current.filter((internship) => internship.id !== id)
    );
    showNotice("Internship removed.");
  }

  function updateApplication(id: number, status: Application["status"]) {
    setApplications((current) =>
      current.map((application) =>
        application.id === id ? { ...application, status } : application
      )
    );
    showNotice(`Application marked ${status.toLowerCase()}.`);
  }

  function updateAppointment(
    id: number,
    status: Appointment["status"]
  ) {
    setAppointments((current) =>
      current.map((appointment) =>
        appointment.id === id ? { ...appointment, status } : appointment
      )
    );
    showNotice(`Appointment marked ${status.toLowerCase()}.`);
  }

  function saveOrganization() {
    if (!organization.name.trim() || !organization.email.trim()) {
      showNotice("Organization name and email are required.", "error");
      return;
    }
    showNotice("Organization profile saved in this demo session.");
  }

  const sidebar = (
    <Box
      sx={{
        height: "100%",
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        p: 2.5,
        bgcolor: "#fff",
      }}
    >
      <Stack direction="row" spacing={1.2}  sx={{ mb: 4,alignItems:"center" }}>
        <Box
          sx={{
            width: 43,
            height: 43,
            bgcolor: teal,
            color: "#fff",
            borderRadius: 2.5,
            display: "grid",
            placeItems: "center",
          }}
        >
          <MedicalServicesRoundedIcon />
        </Box>
        <Box>
          <Typography sx={{ color: ink, fontWeight: 800, fontSize: 17 }}>
            HealthConnect
          </Typography>
          <Typography
            sx={{
              color: muted,
              fontSize: 9.5,
              letterSpacing: 1.2,
              fontWeight: 700,
            }}
          >
            ORGANIZATION PORTAL
          </Typography>
        </Box>
      </Stack>

      <Typography
        sx={{
          color: "#a0aab5",
          fontWeight: 700,
          fontSize: 10,
          letterSpacing: 1.3,
          px: 1.5,
          mb: 1.5,
        }}
      >
        MANAGEMENT
      </Typography>

      <Stack spacing={0.6}>
        {navigation.map((item) => {
          const active = activeTab === item.label;

          return (
            <Box
              key={item.label}
              onClick={() => navigate(item.label)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                px: 1.5,
                py: 1.35,
                borderRadius: 2.5,
                cursor: "pointer",
                color: active ? teal : "#738092",
                bgcolor: active ? "#e8f7f5" : "transparent",
                transition: "0.2s",
                "&:hover": {
                  bgcolor: "#f0f8f7",
                  color: teal,
                },
                "& .MuiSvgIcon-root": { fontSize: 21 },
              }}
            >
              {item.icon}
              <Typography
                sx={{
                  flex: 1,
                  fontSize: 12.8,
                  fontWeight: active ? 700 : 500,
                }}
              >
                {item.label}
              </Typography>

              {item.label === "Applications" &&
                pendingApplications.length > 0 && (
                  <Chip
                    size="small"
                    label={pendingApplications.length}
                    sx={{
                      height: 21,
                      bgcolor: "#fff0d7",
                      color: "#a66c0a",
                      fontSize: 10,
                    }}
                  />
                )}
            </Box>
          );
        })}
      </Stack>

      <Box sx={{ mt: "auto", pt: 4 }}>
        <Paper
          elevation={0}
          sx={{ p: 2, bgcolor: "#edf9f7", borderRadius: 3, mb: 2.5 }}
        >
          <MedicalServicesRoundedIcon sx={{ color: teal, mb: 1 }} />
          <Typography sx={{ color: ink, fontWeight: 700, fontSize: 12.5 }}>
            Healthcare network
          </Typography>
          <Typography
            sx={{ color: muted, fontSize: 11, mt: 0.7, lineHeight: 1.7 }}
          >
            Manage healthcare professionals and create student opportunities.
          </Typography>
          <Button
            fullWidth
            onClick={() => navigate("Internships")}
            sx={{
              mt: 1.5,
              bgcolor: teal,
              color: "#fff",
              textTransform: "none",
              borderRadius: 2,
              fontSize: 12,
              "&:hover": { bgcolor: "#067f77" },
            }}
          >
            Manage internships
          </Button>
        </Paper>

        <Divider sx={{ borderColor: border, mb: 2 }} />

        <Stack direction="row" spacing={1.2} sx={{alignItems:"center"}}>
          <Avatar sx={{ bgcolor: "#d9f0ed", color: teal }}>
            <BusinessRoundedIcon />
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{ color: ink, fontSize: 12, fontWeight: 700 }}
              noWrap
            >
              Organization Admin
            </Typography>
            <Typography sx={{ color: muted, fontSize: 10.5 }}>
              Administrator
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );

  function pageHeading(
    title: string,
    description: string,
    action?: ReactNode
  ) {
    return (
      <Stack
        direction={{ xs: "column", sm: "row" }}
        
        spacing={2}
        sx={{ mb: 3,alignItems:{ xs: "stretch", sm: "center" },
        justifyContent:"space-between" }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: { xs: 23, md: 27 },
              fontWeight: 800,
              color: ink,
            }}
          >
            {title}
          </Typography>
          <Typography sx={{ color: muted, fontSize: 13, mt: 0.6 }}>
            {description}
          </Typography>
        </Box>
        {action}
      </Stack>
    );
  }

  function searchField(placeholder: string) {
    return (
      <TextField
        size="small"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder={placeholder}
        sx={{
          minWidth: { xs: "100%", sm: 245 },
          "& .MuiOutlinedInput-root": {
            borderRadius: 2.5,
            bgcolor: "#fff",
            fontSize: 12.5,
          },
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon sx={{ color: muted, fontSize: 20 }} />
              </InputAdornment>
            ),
          },
        }}
      />
    );
  }

  function renderOverview() {
    return (
      <>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, md: 3.5 },
            borderRadius: 4,
            color: "#fff",
            background:
              "linear-gradient(115deg, #087f78 0%, #079b91 60%, #40bbae 100%)",
            position: "relative",
            overflow: "hidden",
            mb: 3,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              right: -35,
              top: -90,
              width: 220,
              height: 220,
              borderRadius: "50%",
              border: "35px solid rgba(255,255,255,0.09)",
            }}
          />
          <Box sx={{ position: "relative" }}>
            <Chip
              label="ORGANIZATION WORKSPACE"
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
              }}
            >
              Welcome to your organization portal
            </Typography>
            <Typography
              sx={{
                maxWidth: 650,
                fontSize: 13,
                lineHeight: 1.8,
                mt: 1,
                color: "rgba(255,255,255,0.86)",
              }}
            >
              Manage your doctors, monitor patient appointments, and connect
              healthcare students with internship opportunities from one place.
            </Typography>
            <Stack direction="row" spacing={1.5} sx={{ mt: 2.5, flexWrap: "wrap" }}>
              <Button
                startIcon={<AddRoundedIcon />}
                onClick={openAddDoctor}
                sx={{
                  bgcolor: "#fff",
                  color: teal,
                  textTransform: "none",
                  fontWeight: 700,
                  borderRadius: 2.5,
                  "&:hover": { bgcolor: "#eaf8f6" },
                }}
              >
                Add doctor
              </Button>
              <Button
                startIcon={<WorkOutlineRoundedIcon />}
                onClick={openAddInternship}
                sx={{
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.55)",
                  textTransform: "none",
                  borderRadius: 2.5,
                  "&:hover": { bgcolor: "rgba(255,255,255,0.12)" },
                }}
              >
                Create internship
              </Button>
            </Stack>
          </Box>
        </Paper>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              xl: "repeat(4, 1fr)",
            },
            gap: 2,
            mb: 3,
          }}
        >
          <MetricCard
            title="Registered Doctors"
            value={doctors.length}
            subtitle={`${activeDoctors.length} active doctors`}
            icon={<PeopleAltRoundedIcon />}
            color="#079b91"
          />
          <MetricCard
            title="Appointments"
            value={appointments.length}
            subtitle={`${pendingAppointments.length} awaiting action`}
            icon={<CalendarMonthRoundedIcon />}
            color="#5087e7"
          />
          <MetricCard
            title="Internship Listings"
            value={internships.length}
            subtitle={`${publishedInternships.length} currently published`}
            icon={<WorkOutlineRoundedIcon />}
            color="#8c70d6"
          />
          <MetricCard
            title="Student Applications"
            value={applications.length}
            subtitle={`${pendingApplications.length} awaiting review`}
            icon={<DescriptionRoundedIcon />}
            color="#e8a23c"
          />
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", xl: "1.15fr 0.85fr" },
            gap: 3,
          }}
        >
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
             
              sx={{ mb: 2 , justifyContent:"space-between",
              alignItems:"center"}}
            >
              <Box>
                <Typography sx={{ color: ink, fontWeight: 800, fontSize: 16 }}>
                  Recent appointments
                </Typography>
                <Typography sx={{ color: muted, fontSize: 12, mt: 0.5 }}>
                  Latest patient bookings
                </Typography>
              </Box>
              <Button
                onClick={() => navigate("Appointments")}
                sx={{ color: teal, textTransform: "none", fontWeight: 700 }}
              >
                View all
              </Button>
            </Stack>

            {appointments.slice(0, 4).map((appointment) => (
              <Box key={appointment.id}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={1}
                  
                  sx={{ py: 1.7 ,alignItems:{ xs: "flex-start", sm: "center" }}}
                >
                  <Avatar
                    sx={{
                      width: 38,
                      height: 38,
                      bgcolor: "#e6f5f3",
                      color: teal,
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    {appointment.patient
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontSize: 12.5, fontWeight: 700 }}>
                      {appointment.patient}
                    </Typography>
                    <Typography sx={{ fontSize: 11, color: muted, mt: 0.4 }}>
                      {appointment.doctor} · {appointment.type}
                    </Typography>
                  </Box>
                  <Stack
                    direction="row"
                    
                    spacing={1}
                  sx={{flexWrap:"wrap",alignItems:"center"}}  
                  >
                    <Typography sx={{ fontSize: 11, color: muted }}>
                      {appointment.date}
                    </Typography>
                    <StatusChip status={appointment.status} />
                  </Stack>
                </Stack>
                <Divider sx={{ borderColor: "#f0f2f5" }} />
              </Box>
            ))}
          </Paper>

          <Paper
            elevation={0}
            sx={{
              border: `1px solid ${border}`,
              borderRadius: 3.5,
              p: 2.5,
            }}
          >
            <Typography sx={{ color: ink, fontWeight: 800, fontSize: 16 }}>
              Quick actions
            </Typography>
            <Typography sx={{ color: muted, fontSize: 12, mt: 0.5, mb: 2 }}>
              Common organization tasks
            </Typography>

            {[
              {
                title: "Manage doctors",
                detail: "Add, edit, or review doctors",
                icon: <PeopleAltRoundedIcon />,
                action: () => navigate("Doctors"),
              },
              {
                title: "Review appointments",
                detail: "Confirm or update bookings",
                icon: <CalendarMonthRoundedIcon />,
                action: () => navigate("Appointments"),
              },
              {
                title: "Post an internship",
                detail: "Create student opportunities",
                icon: <WorkOutlineRoundedIcon />,
                action: openAddInternship,
              },
              {
                title: "Review applications",
                detail: "Process student applications",
                icon: <DescriptionRoundedIcon />,
                action: () => navigate("Applications"),
              },
            ].map((item) => (
              <Paper
                key={item.title}
                elevation={0}
                onClick={item.action}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  p: 1.5,
                  mb: 1.2,
                  border: `1px solid ${border}`,
                  borderRadius: 2.5,
                  cursor: "pointer",
                  "&:hover": {
                    borderColor: teal,
                    bgcolor: "#f6fbfa",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: 2,
                    bgcolor: "#e8f7f5",
                    color: teal,
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  {item.icon}
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontSize: 12.5, fontWeight: 700 }}>
                    {item.title}
                  </Typography>
                  <Typography sx={{ color: muted, fontSize: 11, mt: 0.4 }}>
                    {item.detail}
                  </Typography>
                </Box>
                <VisibilityOutlinedIcon
                  sx={{ color: "#a0aab5", fontSize: 18 }}
                />
              </Paper>
            ))}
          </Paper>
        </Box>
      </>
    );
  }

  function renderDoctors() {
    return (
      <>
        {pageHeading(
          "Doctor Management",
          "Add doctors, edit their information, and manage their status.",
          <Button
            startIcon={<AddRoundedIcon />}
            onClick={openAddDoctor}
            variant="contained"
            sx={{
              bgcolor: teal,
              textTransform: "none",
              borderRadius: 2.5,
              px: 2.5,
              py: 1.1,
              "&:hover": { bgcolor: "#067f77" },
            }}
          >
            Add doctor
          </Button>
        )}

        <Paper
          elevation={0}
          sx={{
            border: `1px solid ${border}`,
            borderRadius: 3.5,
            overflow: "hidden",
          }}
        >
          <Box sx={{ p: 2.5 }}>{searchField("Search doctors...")}</Box>
          <Divider sx={{ borderColor: border }} />

          {filteredDoctors.length === 0 ? (
            <Typography sx={{ p: 4, color: muted, textAlign: "center" }}>
              No doctors found.
            </Typography>
          ) : (
            filteredDoctors.map((doctor) => (
              <Box key={doctor.id}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={1.5}
                  
                  sx={{ p: 2.5 ,alignItems:{ xs: "flex-start", sm: "center" }}}
                >
                  <Avatar
                    sx={{
                      width: 46,
                      height: 46,
                      bgcolor: "#e2f4f1",
                      color: teal,
                      fontWeight: 700,
                    }}
                  >
                    {doctor.name
                      .replace("Dr. ", "")
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </Avatar>

                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ color: ink, fontWeight: 700, fontSize: 13.5 }}>
                      {doctor.name}
                    </Typography>
                    <Typography sx={{ color: muted, fontSize: 12, mt: 0.5 }}>
                      {doctor.specialty}
                    </Typography>
                    <Typography sx={{ color: muted, fontSize: 11, mt: 0.4 }}>
                      {doctor.email}
                    </Typography>
                  </Box>

                  <StatusChip status={doctor.status} />

                  <Stack direction="row" spacing={0.5}>
                    {doctor.status === "Pending" && (
                      <Button
                        size="small"
                        onClick={() => updateDoctorStatus(doctor.id, "Active")}
                        sx={{ color: teal, textTransform: "none" }}
                      >
                        Approve
                      </Button>
                    )}
                    <IconButton
                      aria-label="Edit doctor"
                      onClick={() => openEditDoctor(doctor)}
                      sx={{ color: teal }}
                    >
                      <EditRoundedIcon />
                    </IconButton>
                    <IconButton
                      aria-label="Delete doctor"
                      onClick={() => deleteDoctor(doctor.id)}
                      sx={{ color: "#d45c55" }}
                    >
                      <DeleteOutlineRoundedIcon />
                    </IconButton>
                  </Stack>
                </Stack>
                <Divider sx={{ borderColor: "#f0f2f5" }} />
              </Box>
            ))
          )}
        </Paper>
      </>
    );
  }

  function renderAppointments() {
    return (
      <>
        {pageHeading(
          "Appointment Management",
          "Monitor patient bookings across your organization."
        )}

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          sx={{ mb: 2.5 }}
        >
          {searchField("Search patient or doctor...")}
          <TextField
            select
            size="small"
            label="Status"
            value={appointmentFilter}
            onChange={(event) => setAppointmentFilter(event.target.value)}
            sx={{
              minWidth: 160,
              "& .MuiOutlinedInput-root": { borderRadius: 2.5, bgcolor: "#fff" },
            }}
          >
            {["All", "Pending", "Confirmed", "Completed", "Cancelled"].map(
              (status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              )
            )}
          </TextField>
        </Stack>

        <Paper
          elevation={0}
          sx={{ border: `1px solid ${border}`, borderRadius: 3.5, overflow: "hidden" }}
        >
          {filteredAppointments.length === 0 ? (
            <Typography sx={{ p: 4, color: muted, textAlign: "center" }}>
              No appointments match your search.
            </Typography>
          ) : (
            filteredAppointments.map((appointment) => (
              <Box key={appointment.id}>
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  spacing={1.5}
                  
                  sx={{ p: 2.5 ,alignItems:{ xs: "flex-start", md: "center" }}}
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontSize: 13.5, fontWeight: 700 }}>
                      {appointment.patient}
                    </Typography>
                    <Typography sx={{ color: muted, fontSize: 12, mt: 0.5 }}>
                      Doctor: {appointment.doctor}
                    </Typography>
                    <Typography sx={{ color: muted, fontSize: 11, mt: 0.5 }}>
                      {appointment.date} · {appointment.time} · {appointment.type}
                    </Typography>
                  </Box>

                  <StatusChip status={appointment.status} />

                  {appointment.status === "Pending" && (
                    <Stack direction="row" spacing={1}>
                      <Button
                        size="small"
                        onClick={() =>
                          updateAppointment(appointment.id, "Confirmed")
                        }
                        sx={{ color: teal, textTransform: "none" }}
                      >
                        Confirm
                      </Button>
                      <Button
                        size="small"
                        onClick={() =>
                          updateAppointment(appointment.id, "Cancelled")
                        }
                        sx={{ color: "#c34840", textTransform: "none" }}
                      >
                        Cancel
                      </Button>
                    </Stack>
                  )}

                  {appointment.status === "Confirmed" && (
                    <Button
                      size="small"
                      onClick={() =>
                        updateAppointment(appointment.id, "Completed")
                      }
                      sx={{ color: teal, textTransform: "none" }}
                    >
                      Mark complete
                    </Button>
                  )}
                </Stack>
                <Divider sx={{ borderColor: "#f0f2f5" }} />
              </Box>
            ))
          )}
        </Paper>
      </>
    );
  }

  function renderInternships() {
    return (
      <>
        {pageHeading(
          "Internship Management",
          "Create healthcare training opportunities for students.",
          <Button
            startIcon={<AddRoundedIcon />}
            onClick={openAddInternship}
            variant="contained"
            sx={{
              bgcolor: teal,
              textTransform: "none",
              borderRadius: 2.5,
              px: 2.5,
              py: 1.1,
              "&:hover": { bgcolor: "#067f77" },
            }}
          >
            Create internship
          </Button>
        )}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
            gap: 2,
            mb: 3,
          }}
        >
          <MetricCard
            title="Total Listings"
            value={internships.length}
            subtitle="All internship records"
            icon={<WorkOutlineRoundedIcon />}
            color="#079b91"
          />
          <MetricCard
            title="Published"
            value={publishedInternships.length}
            subtitle="Visible to students in this demo"
            icon={<CheckCircleRoundedIcon />}
            color="#5087e7"
          />
          <MetricCard
            title="Applications"
            value={applications.length}
            subtitle="Across internship listings"
            icon={<DescriptionRoundedIcon />}
            color="#8c70d6"
          />
        </Box>

        <Box sx={{ mb: 2.5 }}>{searchField("Search internships...")}</Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
            gap: 2,
          }}
        >
          {filteredInternships.map((internship) => (
            <Paper
              key={internship.id}
              elevation={0}
              sx={{
                border: `1px solid ${border}`,
                borderRadius: 3.5,
                p: 2.5,
              }}
            >
              <Stack direction="row"  sx={{justifyContent:"space-between"}} spacing={1}>
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: 2.5,
                    bgcolor: "#e8f7f5",
                    color: teal,
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <WorkOutlineRoundedIcon />
                </Box>
                <StatusChip status={internship.status} />
              </Stack>

              <Typography sx={{ fontSize: 16, fontWeight: 800, mt: 2 }}>
                {internship.title}
              </Typography>
              <Typography sx={{ color: muted, fontSize: 12, mt: 0.6 }}>
                {internship.department}
              </Typography>

              <Divider sx={{ my: 2, borderColor: border }} />

              <Stack direction="row" spacing={3}>
                <Box>
                  <Typography sx={{ color: muted, fontSize: 11 }}>
                    Duration
                  </Typography>
                  <Typography sx={{ fontWeight: 700, fontSize: 13, mt: 0.5 }}>
                    {internship.duration}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ color: muted, fontSize: 11 }}>
                    Available seats
                  </Typography>
                  <Typography sx={{ fontWeight: 700, fontSize: 13, mt: 0.5 }}>
                    {internship.seats}
                  </Typography>
                </Box>
              </Stack>

              <Stack
                direction="row"
                spacing={1}
                sx={{ mt: 2.5, flexWrap: "wrap", gap: 0.5 }}
              >
                <Button
                  startIcon={<EditRoundedIcon />}
                  size="small"
                  onClick={() => openEditInternship(internship)}
                  sx={{ color: teal, textTransform: "none" }}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  onClick={() =>
                    updateInternshipStatus(
                      internship.id,
                      internship.status === "Published" ? "Draft" : "Published"
                    )
                  }
                  sx={{ color: ink, textTransform: "none" }}
                >
                  {internship.status === "Published" ? "Unpublish" : "Publish"}
                </Button>
                <IconButton
                  size="small"
                  aria-label="Delete internship"
                  onClick={() => deleteInternship(internship.id)}
                  sx={{ color: "#c34840" }}
                >
                  <DeleteOutlineRoundedIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Paper>
          ))}

          {filteredInternships.length === 0 && (
            <Paper
              elevation={0}
              sx={{
                gridColumn: "1 / -1",
                p: 4,
                border: `1px solid ${border}`,
                borderRadius: 3,
                textAlign: "center",
              }}
            >
              <Typography sx={{ color: muted }}>
                No internship listings found.
              </Typography>
            </Paper>
          )}
        </Box>
      </>
    );
  }

  function renderApplications() {
    return (
      <>
        {pageHeading(
          "Student Applications",
          "Review internship applications and update their status."
        )}

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          sx={{ mb: 2.5 }}
        >
          {searchField("Search students or internships...")}
          <TextField
            select
            size="small"
            label="Application status"
            value={applicationFilter}
            onChange={(event) => setApplicationFilter(event.target.value)}
            sx={{
              minWidth: 180,
              "& .MuiOutlinedInput-root": { borderRadius: 2.5, bgcolor: "#fff" },
            }}
          >
            {["All", "Pending", "Accepted", "Rejected"].map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>
        </Stack>

        <Paper
          elevation={0}
          sx={{ border: `1px solid ${border}`, borderRadius: 3.5, overflow: "hidden" }}
        >
          {filteredApplications.length === 0 ? (
            <Typography sx={{ p: 4, textAlign: "center", color: muted }}>
              No applications match your search.
            </Typography>
          ) : (
            filteredApplications.map((application) => (
              <Box key={application.id}>
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  spacing={1.5}
                  
                  sx={{ p: 2.5 ,alignItems:{ xs: "flex-start", md: "center" }}}
                >
                  <Avatar sx={{ bgcolor: "#e8f7f5", color: teal }}>
                    {application.student
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </Avatar>

                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontSize: 13.5, fontWeight: 700 }}>
                      {application.student}
                    </Typography>
                    <Typography sx={{ color: muted, fontSize: 12, mt: 0.5 }}>
                      {application.education}
                    </Typography>
                    <Typography sx={{ color: teal, fontSize: 11.5, mt: 0.5 }}>
                      Applied for: {application.internship}
                    </Typography>
                  </Box>

                  <StatusChip status={application.status} />

                  {application.status === "Pending" && (
                    <Stack direction="row" spacing={0.5}>
                      <Button
                        size="small"
                        onClick={() => updateApplication(application.id, "Accepted")}
                        sx={{ color: teal, textTransform: "none" }}
                      >
                        Accept
                      </Button>
                      <Button
                        size="small"
                        onClick={() => updateApplication(application.id, "Rejected")}
                        sx={{ color: "#c34840", textTransform: "none" }}
                      >
                        Reject
                      </Button>
                    </Stack>
                  )}
                </Stack>
                <Divider sx={{ borderColor: "#f0f2f5" }} />
              </Box>
            ))
          )}
        </Paper>
      </>
    );
  }

  function renderProfile() {
    return (
      <>
        {pageHeading(
          "Organization Profile",
          "Update the information displayed for your healthcare organization."
        )}

        <Paper
          elevation={0}
          sx={{
            border: `1px solid ${border}`,
            borderRadius: 3.5,
            p: { xs: 2.5, md: 3.5 },
            maxWidth: 900,
          }}
        >
          <Stack direction="row" spacing={2}  sx={{ mb: 3,alignItems:"center" }}>
            <Avatar
              sx={{
                width: 66,
                height: 66,
                bgcolor: "#e1f4f1",
                color: teal,
              }}
            >
              <BusinessRoundedIcon sx={{ fontSize: 33 }} />
            </Avatar>
            <Box>
              <Typography sx={{ fontWeight: 800, fontSize: 17 }}>
                Organization details
              </Typography>
              <Typography sx={{ color: muted, fontSize: 12, mt: 0.5 }}>
                This profile uses demo data until connected to a backend.
              </Typography>
            </Box>
          </Stack>

          <Box
            component="form"
            onSubmit={(event) => {
              event.preventDefault();
              saveOrganization();
            }}
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
              gap: 2.5,
            }}
          >
            <TextField
              label="Organization name"
              value={organization.name}
              onChange={(event) =>
                setOrganization({ ...organization, name: event.target.value })
              }
              required
              fullWidth
            />
            <TextField
              label="Contact email"
              type="email"
              value={organization.email}
              onChange={(event) =>
                setOrganization({ ...organization, email: event.target.value })
              }
              required
              fullWidth
            />
            <TextField
              label="Phone number"
              value={organization.phone}
              onChange={(event) =>
                setOrganization({ ...organization, phone: event.target.value })
              }
              fullWidth
            />
            <TextField
              label="City"
              value={organization.city}
              onChange={(event) =>
                setOrganization({ ...organization, city: event.target.value })
              }
              fullWidth
            />
            <TextField
              label="Organization address"
              value={organization.address}
              onChange={(event) =>
                setOrganization({ ...organization, address: event.target.value })
              }
              fullWidth
              sx={{ gridColumn: { sm: "1 / -1" } }}
            />
            <TextField
              label="About organization"
              value={organization.description}
              onChange={(event) =>
                setOrganization({
                  ...organization,
                  description: event.target.value,
                })
              }
              multiline
              minRows={4}
              fullWidth
              sx={{ gridColumn: { sm: "1 / -1" } }}
            />

            <Box sx={{ gridColumn: { sm: "1 / -1" } }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: teal,
                  textTransform: "none",
                  borderRadius: 2.5,
                  px: 3,
                  "&:hover": { bgcolor: "#067f77" },
                }}
              >
                Save profile
              </Button>
            </Box>
          </Box>
        </Paper>
      </>
    );
  }

  function renderSettings() {
    const options = [
      {
        key: "appointmentNotifications" as const,
        title: "Appointment notifications",
        description: "Receive alerts when patients book appointments.",
      },
      {
        key: "applicationNotifications" as const,
        title: "Application notifications",
        description: "Receive alerts for new internship applications.",
      },
      {
        key: "publicProfile" as const,
        title: "Public organization profile",
        description: "Allow your organization profile to be shown publicly.",
      },
      {
        key: "acceptApplications" as const,
        title: "Accept internship applications",
        description: "Allow students to apply to published opportunities.",
      },
    ];

    return (
      <>
        {pageHeading(
          "Organization Settings",
          "Manage notification preferences and organization visibility."
        )}

        <Paper
          elevation={0}
          sx={{
            maxWidth: 850,
            border: `1px solid ${border}`,
            borderRadius: 3.5,
            p: { xs: 2, md: 3 },
          }}
        >
          {options.map((option, index) => (
            <Box key={option.key}>
              <Stack
                direction="row"
                
                spacing={2}
                sx={{ py: 2 ,alignItems:"center",
                justifyContent:"space-between"}}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: 13.5 }}>
                    {option.title}
                  </Typography>
                  <Typography
                    sx={{ color: muted, fontSize: 12, mt: 0.6, lineHeight: 1.6 }}
                  >
                    {option.description}
                  </Typography>
                </Box>
                <Switch
                  checked={settings[option.key]}
                  onChange={(event) =>
                    setSettings({
                      ...settings,
                      [option.key]: event.target.checked,
                    })
                  }
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": { color: teal },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      bgcolor: teal,
                    },
                  }}
                />
              </Stack>
              {index !== options.length - 1 && (
                <Divider sx={{ borderColor: border }} />
              )}
            </Box>
          ))}

          <Button
            variant="contained"
            onClick={() => showNotice("Settings saved for this demo session.")}
            sx={{
              mt: 2,
              bgcolor: teal,
              textTransform: "none",
              borderRadius: 2.5,
              "&:hover": { bgcolor: "#067f77" },
            }}
          >
            Save settings
          </Button>
        </Paper>
      </>
    );
  }

  function renderActivePage() {
    switch (activeTab) {
      case "Doctors":
        return renderDoctors();
      case "Appointments":
        return renderAppointments();
      case "Internships":
        return renderInternships();
      case "Applications":
        return renderApplications();
      case "Organization Profile":
        return renderProfile();
      case "Settings":
        return renderSettings();
      default:
        return renderOverview();
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        bgcolor: "#f7f9fb",
        color: ink,
      }}
    >
      <Box
        sx={{
          width: 255,
          flexShrink: 0,
          borderRight: `1px solid ${border}`,
          display: { xs: "none", lg: "block" },
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
            zIndex: 1300,
            bgcolor: "rgba(20,35,50,0.4)",
            display: { xs: "block", lg: "none" },
          }}
        >
          <Box
            onClick={(event) => event.stopPropagation()}
            sx={{ width: 275, height: "100%", overflowY: "auto" }}
          >
            {sidebar}
          </Box>
        </Box>
      )}

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box
          sx={{
            minHeight: 76,
            px: { xs: 2, md: 4 },
            py: 1.5,
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
              aria-label="Open menu"
              onClick={() => setMobileMenu(true)}
              sx={{ display: { xs: "inline-flex", lg: "none" } }}
            >
              <MenuRoundedIcon />
            </IconButton>
            <Box>
              <Typography sx={{ color: muted, fontSize: 11.5 }}>
                Organization portal / {activeTab}
              </Typography>
              <Typography sx={{ color: ink, fontWeight: 800, fontSize: 18, mt: 0.3 }}>
                {activeTab}
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={1.5} sx={{alignItems:"center"}} >
            <IconButton
              aria-label="Notifications"
              onClick={() =>
                showNotice(
                  `${pendingAppointments.length} pending appointments and ${pendingApplications.length} pending applications.`,
                  "info"
                )
              }
              sx={{ bgcolor: "#f4f7f9", borderRadius: 2.5 }}
            >
              <NotificationsNoneRoundedIcon sx={{ color: muted }} />
            </IconButton>
            <Avatar
              sx={{
                bgcolor: "#d9f0ed",
                color: teal,
                fontWeight: 800,
                width: 39,
                height: 39,
              }}
            >
              HC
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
          {notice && (
            <Alert
              severity={noticeType}
              onClose={() => setNotice("")}
              sx={{ mb: 3, borderRadius: 2.5 }}
            >
              {notice}
            </Alert>
          )}

          {renderActivePage()}

          <Typography
            sx={{
              textAlign: "center",
              color: "#9aa5b1",
              fontSize: 11,
              mt: 4,
              pb: 1,
            }}
          >
            © 2026 HealthConnect AI · Organization Portal · Demo dashboard
          </Typography>
        </Box>
      </Box>

      {/* Add / edit doctor dialog */}
      <Dialog
        open={doctorDialog}
        onClose={() => setDoctorDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ fontWeight: 800, color: ink }}>
          {editingDoctorId !== null ? "Edit doctor" : "Add new doctor"}
          <IconButton
            aria-label="Close"
            onClick={() => setDoctorDialog(false)}
            sx={{ position: "absolute", right: 12, top: 12 }}
          >
            <CloseRoundedIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2.5} sx={{ pt: 1 }}>
            <TextField
              label="Doctor full name"
              value={doctorForm.name}
              onChange={(event) =>
                setDoctorForm({ ...doctorForm, name: event.target.value })
              }
              fullWidth
              required
            />
            <TextField
              label="Specialization"
              value={doctorForm.specialty}
              onChange={(event) =>
                setDoctorForm({ ...doctorForm, specialty: event.target.value })
              }
              fullWidth
              required
            />
            <TextField
              label="Email address"
              type="email"
              value={doctorForm.email}
              onChange={(event) =>
                setDoctorForm({ ...doctorForm, email: event.target.value })
              }
              fullWidth
              required
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={() => setDoctorDialog(false)}
            sx={{ color: muted, textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={saveDoctor}
            sx={{
              bgcolor: teal,
              textTransform: "none",
              "&:hover": { bgcolor: "#067f77" },
            }}
          >
            {editingDoctorId !== null ? "Save changes" : "Add doctor"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add / edit internship dialog */}
      <Dialog
        open={internshipDialog}
        onClose={() => setInternshipDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ fontWeight: 800, color: ink }}>
          {editingInternshipId !== null
            ? "Edit internship"
            : "Create internship"}
          <IconButton
            aria-label="Close"
            onClick={() => setInternshipDialog(false)}
            sx={{ position: "absolute", right: 12, top: 12 }}
          >
            <CloseRoundedIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2.5} sx={{ pt: 1 }}>
            <TextField
              label="Internship title"
              placeholder="e.g. Clinical Internship"
              value={internshipForm.title}
              onChange={(event) =>
                setInternshipForm({
                  ...internshipForm,
                  title: event.target.value,
                })
              }
              fullWidth
              required
            />
            <TextField
              label="Department"
              placeholder="e.g. General Medicine"
              value={internshipForm.department}
              onChange={(event) =>
                setInternshipForm({
                  ...internshipForm,
                  department: event.target.value,
                })
              }
              fullWidth
              required
            />
            <TextField
              label="Duration"
              placeholder="e.g. 8 weeks"
              value={internshipForm.duration}
              onChange={(event) =>
                setInternshipForm({
                  ...internshipForm,
                  duration: event.target.value,
                })
              }
              fullWidth
              required
            />
            <TextField
              label="Available seats"
              type="number"
              value={internshipForm.seats}
              onChange={(event) =>
                setInternshipForm({
                  ...internshipForm,
                  seats: event.target.value,
                })
              }
              slotProps={{ htmlInput: { min: 1 } }}
              fullWidth
              required
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={() => setInternshipDialog(false)}
            sx={{ color: muted, textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={saveInternship}
            sx={{
              bgcolor: teal,
              textTransform: "none",
              "&:hover": { bgcolor: "#067f77" },
            }}
          >
            {editingInternshipId !== null ? "Save changes" : "Create listing"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
