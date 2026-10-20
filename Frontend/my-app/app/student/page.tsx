
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Drawer,
  IconButton,
  LinearProgress,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

import { motion } from "framer-motion";

type Section =
  | "Overview"
  | "Find Internships"
  | "My Applications"
  | "Saved Internships"
  | "Appointments"
  | "My Profile"
  | "Notifications"
  | "Settings";

const navigation: {
  label: Section;
  icon: React.ReactNode;
}[] = [
  { label: "Overview", icon: <DashboardRoundedIcon /> },
  { label: "Find Internships", icon: <WorkOutlineRoundedIcon /> },
  { label: "My Applications", icon: <AssignmentOutlinedIcon /> },
  { label: "Saved Internships", icon: <BookmarkBorderRoundedIcon /> },
  { label: "Appointments", icon: <CalendarMonthRoundedIcon /> },
  { label: "My Profile", icon: <PersonOutlineRoundedIcon /> },
  { label: "Notifications", icon: <NotificationsNoneRoundedIcon /> },
  { label: "Settings", icon: <SettingsOutlinedIcon /> },
];

const applications = [
  {
    company: "City Medical Centre",
    position: "Clinical Internship",
    category: "Medical",
    status: "Under Review",
    date: "Applied recently",
    color: "#E8F5F3",
  },
  {
    company: "HealthCare Pharmacy",
    position: "Pharmacy Intern",
    category: "Pharmacy",
    status: "Pending",
    date: "Awaiting response",
    color: "#FFF3E5",
  },
  {
    company: "Wellness & Care Hospital",
    position: "Healthcare Intern",
    category: "Healthcare",
    status: "Shortlisted",
    date: "Application update",
    color: "#EAF0FF",
  },
];

const appointments = [
  {
    doctor: "Dr. Ayesha Khan",
    specialty: "Cardiologist",
    date: "16 October 2026",
    time: "10:30 AM",
    status: "Confirmed",
  },
  {
    doctor: "Dr. Ahmed Hassan",
    specialty: "Dermatologist",
    date: "19 October 2026",
    time: "04:00 PM",
    status: "Pending",
  },
];

export default function StudentDashboard() {
  const router = useRouter();

  const [activeSection, setActiveSection] =
    useState<Section>("Overview");

  const [mobileOpen, setMobileOpen] = useState(false);

  const [notice, setNotice] = useState("");

  const [profile, setProfile] = useState({
    name: "Nimra Nazir",
    email: "",
    institute: "Royal Institute of Health Sciences",
    degree: "BS Computer Science",
    semester: "7th Semester",
  });

  const [savedItems, setSavedItems] = useState<string[]>([
    "Clinical Internship",
  ]);

  const navigateTo = (section: Section) => {
    setMobileOpen(false);
    setNotice("");

    if (section === "Find Internships") {
      router.push("/internships");
      return;
    }

    if (section === "My Applications") {
      setActiveSection("My Applications");
      return;
    }

    setActiveSection(section);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("remember_me");
    router.push("/login");
  };

  const toggleSaved = (item: string) => {
    setSavedItems((current) =>
      current.includes(item)
        ? current.filter((saved) => saved !== item)
        : [...current, item],
    );

    setNotice(
      savedItems.includes(item)
        ? "Internship removed from saved items."
        : "Internship saved successfully.",
    );
  };

  const statusColor = (status: string) => {
    if (status === "Shortlisted" || status === "Confirmed") {
      return {
        bgcolor: "#E4F6ED",
        color: "#168052",
      };
    }

    if (status === "Under Review") {
      return {
        bgcolor: "#E8F0FF",
        color: "#315CCB",
      };
    }

    return {
      bgcolor: "#FFF2DF",
      color: "#A76512",
    };
  };

  const SidebarContent = () => (
    <Stack
      sx={{
        height: "100%",
        p: 2.5,
        bgcolor: "#FFFFFF",
      }}
    >
      <Stack
        direction="row"
        spacing={1.5}
        sx={{
          alignItems: "center",
          mb: 4,
          px: 1,
        }}
      >
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: "14px",
            bgcolor: "#07998F",
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SchoolRoundedIcon />
        </Box>

        <Box>
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: 18,
              color: "#15384B",
            }}
          >
            HealthConnect
          </Typography>

          <Typography
            sx={{
              fontSize: 11,
              color: "#07998F",
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            STUDENT PORTAL
          </Typography>
        </Box>
      </Stack>

      <Typography
        sx={{
          px: 1.5,
          mb: 1.5,
          fontSize: 11,
          fontWeight: 800,
          color: "#8A9BA5",
          letterSpacing: 1.2,
        }}
      >
        WORKSPACE
      </Typography>

      <List
        disablePadding
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
        }}
      >
        {navigation.map((item) => (
          <ListItemButton
            key={item.label}
            onClick={() => navigateTo(item.label)}
            selected={activeSection === item.label}
            sx={{
              borderRadius: "12px",
              py: 1.2,
              px: 1.5,
              color:
                activeSection === item.label
                  ? "#07998F"
                  : "#637987",
              "&.Mui-selected": {
                bgcolor: "#E7F7F5",
                color: "#07998F",
              },
              "&.Mui-selected:hover": {
                bgcolor: "#DDF2EF",
              },
              "&:hover": {
                bgcolor: "#F4F9FA",
              },
              transition: "all 0.2s ease",
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 38,
                color: "inherit",
              }}
            >
              {item.icon}
            </ListItemIcon>

           <ListItemText
  primary={item.label}
  slotProps={{
    primary: {
      sx: {
        fontSize: 13,
        fontWeight:
          activeSection === item.label ? 700 : 500,
      },
    },
  }}
/>
          </ListItemButton>
        ))}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <Card
        elevation={0}
        sx={{
          mb: 2,
          borderRadius: "16px",
          bgcolor: "#EAF7F5",
          border: "1px solid #D7EFEB",
        }}
      >
        <CardContent sx={{ p: 2 }}>
          <AutoAwesomeRoundedIcon
            sx={{
              color: "#07998F",
              mb: 1,
            }}
          />

          <Typography
            sx={{
              fontWeight: 800,
              fontSize: 13,
              color: "#15384B",
              mb: 0.5,
            }}
          >
            Build your future
          </Typography>

          <Typography
            sx={{
              fontSize: 11,
              color: "#507283",
              mb: 1.5,
              lineHeight: 1.6,
            }}
          >
            Explore opportunities and grow your healthcare career.
          </Typography>

          <Button
            fullWidth
            size="small"
            variant="contained"
            onClick={() => navigateTo("Find Internships")}
            endIcon={<ArrowForwardRoundedIcon />}
            sx={{
              textTransform: "none",
              bgcolor: "#07998F",
              borderRadius: "9px",
              boxShadow: "none",
              "&:hover": {
                bgcolor: "#067D75",
                boxShadow: "none",
              },
            }}
          >
            Explore
          </Button>
        </CardContent>
      </Card>

      <Divider sx={{ mb: 1.5 }} />

      <ListItemButton
        onClick={handleLogout}
        sx={{
          borderRadius: "12px",
          color: "#D14C4C",
          py: 1.2,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 38,
            color: "inherit",
          }}
        >
          <LogoutRoundedIcon />
        </ListItemIcon>

        <ListItemText
  primary="Logout"
  slotProps={{
    primary: {
      sx: {
        fontSize: 13,
        fontWeight: 600,
      },
    },
  }}
/>
      </ListItemButton>
    </Stack>
  );

  const StatCard = ({
    title,
    value,
    subtitle,
    icon,
    color,
  }: {
    title: string;
    value: string;
    subtitle: string;
    icon: React.ReactNode;
    color: string;
  }) => (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        borderRadius: "18px",
        border: "1px solid #E7EEF1",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 30px rgba(21,56,75,0.08)",
        },
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Typography
            sx={{
              color: "#6E8490",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            {title}
          </Typography>

          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: "13px",
              bgcolor: color,
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </Box>
        </Stack>

        <Typography
          sx={{
            fontSize: 30,
            fontWeight: 800,
            color: "#15384B",
            lineHeight: 1.2,
          }}
        >
          {value}
        </Typography>

        <Typography
          sx={{
            mt: 1,
            color: "#81939C",
            fontSize: 11,
          }}
        >
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );

  const SectionHeading = ({
    title,
    subtitle,
  }: {
    title: string;
    subtitle: string;
  }) => (
    <Box sx={{ mb: 3 }}>
      <Typography
        sx={{
          fontSize: { xs: 22, md: 27 },
          fontWeight: 800,
          color: "#15384B",
          mb: 0.5,
        }}
      >
        {title}
      </Typography>

      <Typography
        sx={{
          fontSize: 13,
          color: "#718692",
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );

  const renderApplications = () => (
    <Card
      elevation={0}
      sx={{
        border: "1px solid #E7EEF1",
        borderRadius: "18px",
      }}
    >
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2.5,
            gap: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: 17,
              fontWeight: 800,
              color: "#15384B",
            }}
          >
            My Applications
          </Typography>

          <Chip
            label={`${applications.length} applications`}
            size="small"
            sx={{
              bgcolor: "#E7F7F5",
              color: "#07877F",
              fontWeight: 700,
            }}
          />
        </Stack>

        <Stack spacing={1.5}>
          {applications.map((application) => (
            <Box
              key={application.company}
              sx={{
                p: 2,
                border: "1px solid #EDF1F3",
                borderRadius: "14px",
              }}
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                sx={{
                  alignItems: { xs: "flex-start", sm: "center" },
                  justifyContent: "space-between",
                  gap: 1.5,
                }}
              >
                <Stack
                  direction="row"
                  spacing={1.5}
                  sx={{
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    variant="rounded"
                    sx={{
                      bgcolor: application.color,
                      color: "#15384B",
                      width: 46,
                      height: 46,
                      borderRadius: "13px",
                    }}
                  >
                    <WorkOutlineRoundedIcon />
                  </Avatar>

                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: 14,
                        color: "#15384B",
                      }}
                    >
                      {application.position}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 12,
                        color: "#718692",
                        mt: 0.3,
                      }}
                    >
                      {application.company}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 11,
                        color: "#9AA8AF",
                        mt: 0.5,
                      }}
                    >
                      {application.date}
                    </Typography>
                  </Box>
                </Stack>

                <Chip
                  label={application.status}
                  size="small"
                  sx={{
                    ...statusColor(application.status),
                    fontWeight: 700,
                    fontSize: 11,
                  }}
                />
              </Stack>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );

  const renderAppointments = () => (
    <Card
      elevation={0}
      sx={{
        border: "1px solid #E7EEF1",
        borderRadius: "18px",
      }}
    >
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: 800,
            color: "#15384B",
            mb: 2.5,
          }}
        >
          My Appointments
        </Typography>

        <Stack spacing={2}>
          {appointments.map((appointment) => (
            <Box
              key={appointment.doctor}
              sx={{
                p: 2,
                borderRadius: "14px",
                bgcolor: "#F8FBFC",
                border: "1px solid #EDF1F3",
              }}
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                sx={{
                  alignItems: { xs: "flex-start", sm: "center" },
                  justifyContent: "space-between",
                  gap: 1.5,
                }}
              >
                <Stack
                  direction="row"
                  spacing={1.5}
                  sx={{
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    sx={{
                      width: 46,
                      height: 46,
                      bgcolor: "#DDF3EF",
                      color: "#07877F",
                    }}
                  >
                    <EventAvailableRoundedIcon />
                  </Avatar>

                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        color: "#15384B",
                      }}
                    >
                      {appointment.doctor}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 12,
                        color: "#718692",
                      }}
                    >
                      {appointment.specialty}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 12,
                        mt: 0.5,
                        color: "#507283",
                      }}
                    >
                      {appointment.date} · {appointment.time}
                    </Typography>
                  </Box>
                </Stack>

                <Chip
                  label={appointment.status}
                  size="small"
                  sx={{
                    ...statusColor(appointment.status),
                    fontWeight: 700,
                  }}
                />
              </Stack>
            </Box>
          ))}
        </Stack>

        <Button
          component={Link}
          href="/finddoctor"
          variant="outlined"
          endIcon={<ArrowForwardRoundedIcon />}
          sx={{
            mt: 2.5,
            borderRadius: "10px",
            textTransform: "none",
            color: "#07998F",
            borderColor: "#07998F",
          }}
        >
          Find a Doctor
        </Button>
      </CardContent>
    </Card>
  );

  const renderProfile = () => (
    <Card
      elevation={0}
      sx={{
        border: "1px solid #E7EEF1",
        borderRadius: "18px",
        maxWidth: 720,
      }}
    >
      <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: "center",
            mb: 3,
          }}
        >
          <Avatar
            sx={{
              width: 68,
              height: 68,
              bgcolor: "#07998F",
              fontSize: 25,
              fontWeight: 700,
            }}
          >
            {profile.name.charAt(0)}
          </Avatar>

          <Box>
            <Typography
              sx={{
                fontSize: 20,
                fontWeight: 800,
                color: "#15384B",
              }}
            >
              {profile.name}
            </Typography>

            <Typography
              sx={{
                fontSize: 13,
                color: "#718692",
              }}
            >
              Student Account
            </Typography>
          </Box>
        </Stack>

        <Stack spacing={2}>
          {(
            [
              ["name", "Full name"],
              ["email", "Email address"],
              ["institute", "Institute"],
              ["degree", "Degree"],
              ["semester", "Semester"],
            ] as const
          ).map(([key, label]) => (
            <Box key={key}>
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#507283",
                  mb: 0.7,
                }}
              >
                {label}
              </Typography>

              <Box
                component="input"
                value={profile[key]}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setProfile((current) => ({
                    ...current,
                    [key]: event.target.value,
                  }))
                }
                placeholder={`Enter ${label.toLowerCase()}`}
                sx={{
                  boxSizing: "border-box",
                  width: "100%",
                  p: 1.5,
                  border: "1px solid #DFE8EC",
                  borderRadius: "10px",
                  fontSize: 14,
                  color: "#15384B",
                  outline: "none",
                  fontFamily: "inherit",
                  "&:focus": {
                    borderColor: "#07998F",
                  },
                }}
              />
            </Box>
          ))}
        </Stack>

        <Button
          variant="contained"
          onClick={() => {
            localStorage.setItem(
              "student_profile",
              JSON.stringify(profile),
            );
            setNotice("Profile saved in this browser.");
          }}
          sx={{
            mt: 3,
            bgcolor: "#07998F",
            borderRadius: "10px",
            px: 3,
            textTransform: "none",
            boxShadow: "none",
            "&:hover": {
              bgcolor: "#067D75",
              boxShadow: "none",
            },
          }}
        >
          Save Profile
        </Button>
      </CardContent>
    </Card>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "Overview":
        return (
          <>
            <Box
              sx={{
                mb: 3,
                p: { xs: 2.5, md: 4 },
                borderRadius: "22px",
                background:
                  "linear-gradient(120deg, #0B9C91 0%, #08756F 100%)",
                color: "#FFFFFF",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  right: -35,
                  top: -55,
                  width: 190,
                  height: 190,
                  borderRadius: "50%",
                  bgcolor: "rgba(255,255,255,0.08)",
                }}
              />

              <Stack
                direction={{ xs: "column", sm: "row" }}
                sx={{
                  alignItems: { xs: "flex-start", sm: "center" },
                  justifyContent: "space-between",
                  gap: 2,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize: 12,
                      opacity: 0.85,
                      mb: 1,
                      fontWeight: 600,
                    }}
                  >
                    STUDENT DASHBOARD
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: { xs: 24, md: 31 },
                      fontWeight: 800,
                      mb: 1,
                    }}
                  >
                    Welcome back, {profile.name.split(" ")[0]}!
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 13,
                      maxWidth: 460,
                      lineHeight: 1.8,
                      opacity: 0.9,
                    }}
                  >
                    Track your applications, manage appointments,
                    and discover your next healthcare opportunity.
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  onClick={() => navigateTo("Find Internships")}
                  endIcon={<ArrowForwardRoundedIcon />}
                  sx={{
                    bgcolor: "#FFFFFF",
                    color: "#087D75",
                    borderRadius: "11px",
                    px: 2.5,
                    py: 1.2,
                    fontWeight: 700,
                    textTransform: "none",
                    whiteSpace: "nowrap",
                    "&:hover": {
                      bgcolor: "#F0FAF8",
                    },
                  }}
                >
                  Explore Internships
                </Button>
              </Stack>
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
                mb: 3,
              }}
            >
              <StatCard
                title="Applications"
                value="03"
                subtitle="Internships applied for"
                icon={<AssignmentOutlinedIcon />}
                color="#07998F"
              />

              <StatCard
                title="Saved Internships"
                value={String(savedItems.length).padStart(2, "0")}
                subtitle="Opportunities bookmarked"
                icon={<BookmarkBorderRoundedIcon />}
                color="#4777D9"
              />

              <StatCard
                title="Appointments"
                value="02"
                subtitle="Upcoming appointments"
                icon={<CalendarMonthRoundedIcon />}
                color="#E6A23C"
              />

              <StatCard
                title="Profile Completion"
                value="80%"
                subtitle="Keep your profile updated"
                icon={<TrendingUpRoundedIcon />}
                color="#845AD8"
              />
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  lg: "minmax(0, 1.35fr) minmax(0, 1fr)",
                },
                gap: 2.5,
              }}
            >
              <Box>{renderApplications()}</Box>

              <Card
                elevation={0}
                sx={{
                  border: "1px solid #E7EEF1",
                  borderRadius: "18px",
                  height: "fit-content",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    sx={{
                      fontSize: 17,
                      fontWeight: 800,
                      color: "#15384B",
                      mb: 1,
                    }}
                  >
                    Complete your profile
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 12,
                      color: "#718692",
                      mb: 2.5,
                      lineHeight: 1.8,
                    }}
                  >
                    A complete profile helps organizations understand
                    your education and experience.
                  </Typography>

                  <Stack
                    direction="row"
                    sx={{
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: "#15384B",
                      }}
                    >
                      Profile strength
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 12,
                        fontWeight: 800,
                        color: "#07998F",
                      }}
                    >
                      80%
                    </Typography>
                  </Stack>

                  <LinearProgress
                    variant="determinate"
                    value={80}
                    sx={{
                      height: 8,
                      borderRadius: 5,
                      bgcolor: "#E8F0F2",
                      "& .MuiLinearProgress-bar": {
                        borderRadius: 5,
                        bgcolor: "#07998F",
                      },
                    }}
                  />

                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => navigateTo("My Profile")}
                    sx={{
                      mt: 2.5,
                      borderRadius: "10px",
                      borderColor: "#07998F",
                      color: "#07998F",
                      textTransform: "none",
                    }}
                  >
                    Update Profile
                  </Button>
                </CardContent>
              </Card>
            </Box>
          </>
        );

      case "My Applications":
        return (
          <>
            <SectionHeading
              title="My Applications"
              subtitle="Keep track of your internship applications and their status."
            />
            {renderApplications()}
          </>
        );

      case "Saved Internships":
        return (
          <>
            <SectionHeading
              title="Saved Internships"
              subtitle="Your bookmarked opportunities."
            />

            <Card
              elevation={0}
              sx={{
                border: "1px solid #E7EEF1",
                borderRadius: "18px",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                {savedItems.length === 0 ? (
                  <Stack
                    sx={{
                      alignItems: "center",
                      py: 5,
                      textAlign: "center",
                    }}
                    spacing={1.5}
                  >
                    <BookmarkBorderRoundedIcon
                      sx={{
                        fontSize: 45,
                        color: "#9AADB5",
                      }}
                    />

                    <Typography
                      sx={{
                        fontWeight: 700,
                        color: "#15384B",
                      }}
                    >
                      No saved internships yet
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 13,
                        color: "#718692",
                      }}
                    >
                      Explore the internship portal to find opportunities.
                    </Typography>

                    <Button
                      onClick={() => navigateTo("Find Internships")}
                      sx={{
                        color: "#07998F",
                        textTransform: "none",
                      }}
                    >
                      Explore Internships
                    </Button>
                  </Stack>
                ) : (
                  <Stack spacing={1.5}>
                    {savedItems.map((item) => (
                      <Stack
                        key={item}
                        direction={{ xs: "column", sm: "row" }}
                        sx={{
                          alignItems: { xs: "flex-start", sm: "center" },
                          justifyContent: "space-between",
                          gap: 1.5,
                          p: 2,
                          border: "1px solid #EDF1F3",
                          borderRadius: "14px",
                        }}
                      >
                        <Stack
                          direction="row"
                          spacing={1.5}
                          sx={{
                            alignItems: "center",
                          }}
                        >
                          <Avatar
                            variant="rounded"
                            sx={{
                              bgcolor: "#E7F7F5",
                              color: "#07998F",
                              borderRadius: "12px",
                            }}
                          >
                            <WorkOutlineRoundedIcon />
                          </Avatar>

                          <Box>
                            <Typography
                              sx={{
                                fontWeight: 700,
                                color: "#15384B",
                              }}
                            >
                              {item}
                            </Typography>

                            <Typography
                              sx={{
                                fontSize: 12,
                                color: "#718692",
                              }}
                            >
                              Saved opportunity
                            </Typography>
                          </Box>
                        </Stack>

                        <Button
                          onClick={() => toggleSaved(item)}
                          sx={{
                            color: "#D14C4C",
                            textTransform: "none",
                          }}
                        >
                          Remove
                        </Button>
                      </Stack>
                    ))}
                  </Stack>
                )}
              </CardContent>
            </Card>
          </>
        );

      case "Appointments":
        return (
          <>
            <SectionHeading
              title="Appointments"
              subtitle="View your upcoming doctor appointments."
            />
            {renderAppointments()}
          </>
        );

      case "My Profile":
        return (
          <>
            <SectionHeading
              title="My Profile"
              subtitle="Manage your student and education details."
            />
            {renderProfile()}
          </>
        );

      case "Notifications":
        return (
          <>
            <SectionHeading
              title="Notifications"
              subtitle="Updates related to your HealthConnect account."
            />

            <Card
              elevation={0}
              sx={{
                border: "1px solid #E7EEF1",
                borderRadius: "18px",
              }}
            >
              <CardContent sx={{ p: 2 }}>
                {[
                  {
                    title: "Welcome to HealthConnect AI",
                    message:
                      "Explore healthcare opportunities and manage your student profile.",
                    time: "Welcome",
                  },
                  {
                    title: "Keep your profile updated",
                    message:
                      "Add accurate education details before applying for internships.",
                    time: "Profile reminder",
                  },
                  {
                    title: "Explore internship opportunities",
                    message:
                      "Visit the internship portal to discover relevant openings.",
                    time: "Career",
                  },
                ].map((item) => (
                  <Stack
                    key={item.title}
                    direction="row"
                    spacing={2}
                    sx={{
                      p: 2,
                      alignItems: "flex-start",
                      borderBottom: "1px solid #EDF1F3",
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "#E7F7F5",
                        color: "#07998F",
                        width: 42,
                        height: 42,
                      }}
                    >
                      <NotificationsNoneRoundedIcon />
                    </Avatar>

                    <Box sx={{ flex: 1 }}>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: 14,
                          color: "#15384B",
                        }}
                      >
                        {item.title}
                      </Typography>

                      <Typography
                        sx={{
                          mt: 0.5,
                          fontSize: 12,
                          color: "#718692",
                          lineHeight: 1.7,
                        }}
                      >
                        {item.message}
                      </Typography>

                      <Typography
                        sx={{
                          mt: 1,
                          fontSize: 11,
                          color: "#07998F",
                          fontWeight: 700,
                        }}
                      >
                        {item.time}
                      </Typography>
                    </Box>
                  </Stack>
                ))}
              </CardContent>
            </Card>
          </>
        );

      case "Settings":
        return (
          <>
            <SectionHeading
              title="Settings"
              subtitle="Manage your account preferences."
            />

            <Card
              elevation={0}
              sx={{
                border: "1px solid #E7EEF1",
                borderRadius: "18px",
                maxWidth: 720,
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography
                  sx={{
                    fontWeight: 800,
                    color: "#15384B",
                    mb: 1,
                  }}
                >
                  Account Settings
                </Typography>

                <Typography
                  sx={{
                    color: "#718692",
                    fontSize: 13,
                    lineHeight: 1.8,
                    mb: 2.5,
                  }}
                >
                  Update your profile information or sign out of your
                  student account.
                </Typography>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  sx={{
                    gap: 1.5,
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={() => navigateTo("My Profile")}
                    sx={{
                      borderColor: "#07998F",
                      color: "#07998F",
                      borderRadius: "10px",
                      textTransform: "none",
                    }}
                  >
                    Edit Profile
                  </Button>

                  <Button
                    variant="contained"
                    onClick={handleLogout}
                    startIcon={<LogoutRoundedIcon />}
                    sx={{
                      bgcolor: "#D14C4C",
                      borderRadius: "10px",
                      textTransform: "none",
                      boxShadow: "none",
                      "&:hover": {
                        bgcolor: "#B63A3A",
                        boxShadow: "none",
                      },
                    }}
                  >
                    Logout
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </>
        );

      case "Find Internships":
        router.push("/internships");
        return null;

      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F5F9FA",
        display: "flex",
      }}
    >
      <Box
        component="aside"
        sx={{
          display: { xs: "none", md: "block" },
          width: 265,
          flexShrink: 0,
          borderRight: "1px solid #E7EEF1",
          bgcolor: "#FFFFFF",
        }}
      >
        <Box
          sx={{
            position: "sticky",
            top: 0,
            height: "100vh",
          }}
        >
          <SidebarContent />
        </Box>
      </Box>

      <Drawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: 280,
            boxSizing: "border-box",
          },
        }}
      >
        <SidebarContent />
      </Drawer>

      <Box
        component="main"
        sx={{
          flex: 1,
          minWidth: 0,
        }}
      >
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            bgcolor: "rgba(255,255,255,0.94)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid #E7EEF1",
          }}
        >
          <Container
            maxWidth={false}
            sx={{
              px: { xs: 2, sm: 3, lg: 4 },
            }}
          >
            <Stack
              direction="row"
              sx={{
                minHeight: 76,
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <Stack
                direction="row"
                spacing={1.5}
                sx={{
                  alignItems: "center",
                }}
              >
                <IconButton
                  onClick={() => setMobileOpen(true)}
                  sx={{
                    display: { xs: "inline-flex", md: "none" },
                    color: "#15384B",
                  }}
                >
                  <MenuRoundedIcon />
                </IconButton>

                <Box>
                  <Typography
                    sx={{
                      fontSize: { xs: 17, md: 20 },
                      fontWeight: 800,
                      color: "#15384B",
                    }}
                  >
                    {activeSection}
                  </Typography>

                  <Typography
                    sx={{
                      display: { xs: "none", sm: "block" },
                      fontSize: 11,
                      color: "#81939C",
                    }}
                  >
                    HealthConnect AI / Student Portal
                  </Typography>
                </Box>
              </Stack>

              <Stack
                direction="row"
                spacing={1.5}
                sx={{
                  alignItems: "center",
                }}
              >
                <IconButton
                  aria-label="Notifications"
                  onClick={() => navigateTo("Notifications")}
                  sx={{
                    width: 42,
                    height: 42,
                    border: "1px solid #E7EEF1",
                    borderRadius: "12px",
                    color: "#507283",
                  }}
                >
                  <NotificationsNoneRoundedIcon />
                </IconButton>

                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      bgcolor: "#07998F",
                      fontSize: 14,
                      fontWeight: 700,
                    }}
                  >
                    {profile.name.charAt(0)}
                  </Avatar>

                  <Box
                    sx={{
                      display: { xs: "none", sm: "block" },
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 12,
                        fontWeight: 800,
                        color: "#15384B",
                      }}
                    >
                      {profile.name}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 10,
                        color: "#81939C",
                      }}
                    >
                      Student
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </Stack>
          </Container>
        </Box>

        <Container
          maxWidth={false}
          sx={{
            py: { xs: 2.5, md: 3.5 },
            px: { xs: 2, sm: 3, lg: 4 },
            maxWidth: 1600,
          }}
        >
          {notice && (
            <Alert
              severity="success"
              onClose={() => setNotice("")}
              sx={{
                mb: 2.5,
                borderRadius: "12px",
              }}
            >
              {notice}
            </Alert>
          )}

          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28 }}
          >
            {renderContent()}
          </motion.div>

          <Box
            sx={{
              mt: 4,
              pt: 2.5,
              borderTop: "1px solid #E7EEF1",
            }}
          >
            <Typography
              sx={{
                fontSize: 11,
                color: "#91A1A9",
                textAlign: "center",
              }}
            >
              © 2026 HealthConnect AI · Student Portal
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
