
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import {
  Alert,
  Box,
  Button,
  Card,
  Checkbox,
  Chip,
  Container,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { motion } from "framer-motion";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://healthcare-project-production-cace.up.railway.app";

const PatientIcon = () => (
  <svg
    width="27"
    height="27"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21.2l7.7-7.7 1.1-1.1a5.5 5.5 0 0 0 0-7.8Z" />
  </svg>
);

const DoctorIcon = () => (
  <svg
    width="27"
    height="27"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M8 3H5v5a7 7 0 0 0 14 0V3h-3" />
    <path d="M12 15v3a3 3 0 0 0 6 0v-1" />
    <circle cx="18" cy="15" r="2" />
  </svg>
);

const StudentIcon = () => (
  <svg
    width="27"
    height="27"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m2 9 10-5 10 5-10 5L2 9Z" />
    <path d="M6 11v5c3 3 9 3 12 0v-5M22 9v6" />
  </svg>
);

const OrganizationIcon = () => (
  <svg
    width="27"
    height="27"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 21v-5h6v5M8 7h.01M12 7h.01M16 7h.01M8 11h.01M12 11h.01M16 11h.01" />
  </svg>
);

const EyeIcon = ({ off = false }: { off?: boolean }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {off ? (
      <>
        <path d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8" />
        <path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c7 0 10 7 10 7a16 16 0 0 1-3.2 4.3M6.2 6.2C3.4 8 2 12 2 12s3 7 10 7a10 10 0 0 0 3-.5" />
      </>
    ) : (
      <>
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    )}
  </svg>
);

const ROLES = [
  {
    id: "patient",
    title: "Patient",
    badge: "Personal healthcare",
    description: "Find doctors and manage your appointments.",
    icon: <PatientIcon />,
  },
  {
    id: "doctor",
    title: "Doctor",
    badge: "Healthcare professional",
    description: "Offer consultations and connect with patients.",
    icon: <DoctorIcon />,
  },
  {
    id: "student",
    title: "Healthcare Student",
    badge: "Learning & internships",
    description: "Explore clinical learning and internship opportunities.",
    icon: <StudentIcon />,
  },
  {
    id: "organization",
    title: "Hospital / Clinic",
    badge: "Healthcare organization",
    description: "Connect your facility with the healthcare community.",
    icon: <OrganizationIcon />,
  },
];

const SPECIALTY_OPTIONS = [
  "Cardiology",
  "Dermatology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Psychiatry",
  "General Medicine",
  "Other",
];

const DEGREE_OPTIONS = ["MBBS", "DPT", "Pharm-D", "Nursing", "Other"];

const FACILITY_OPTIONS = [
  "Hospital",
  "Clinic",
  "Pharmacy",
  "Diagnostic Lab",
  "Other",
];

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "13px",
    backgroundColor: "#FBFDFE",
    transition: "all 180ms ease",
    "& fieldset": { borderColor: "#DCE8EB" },
    "&:hover fieldset": { borderColor: "#75CFC5" },
    "&.Mui-focused": {
      boxShadow: "0 0 0 4px rgba(13,148,136,0.09)",
    },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "#0D9488" },
};

export default function RegisterPage() {
  const router = useRouter();

  const [selectedRole, setSelectedRole] = useState("patient");
  const [showPassword, setShowPassword] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    dob: "",
    emergencyContact: "",
    licenseNumber: "",
    specialty: "General Medicine",
    universityName: "",
    degreeProgram: "MBBS",
    orgName: "",
    facilityType: "Hospital",
  });

  const handleInputChange = (
    field: string,
    value: string | boolean
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setValidationErrors((previous) => ({
      ...previous,
      [field]: "",
    }));

    setApiError("");
    setFormSubmitted(false);
  };

  const handleRoleChange = (roleId: string) => {
    setSelectedRole(roleId);
    setValidationErrors({});
    setApiError("");
    setFormSubmitted(false);
  };

  const handleRegisterSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (isSubmitting) return;

    const errors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errors.fullName = "Please enter your full name.";
    }

    if (!formData.email.trim()) {
      errors.email = "Please enter your email address.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      errors.email = "Please enter a valid email address.";
    }

    if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    if (!formData.agreeTerms) {
      errors.agreeTerms = "Please accept the terms to continue.";
    }

    if (
      selectedRole === "doctor" &&
      !formData.licenseNumber.trim()
    ) {
      errors.licenseNumber = "Please enter your medical license number.";
    }

    if (
      selectedRole === "student" &&
      !formData.universityName.trim()
    ) {
      errors.universityName = "Please enter your institute name.";
    }

    if (
      selectedRole === "organization" &&
      !formData.orgName.trim()
    ) {
      errors.orgName = "Please enter your hospital or facility name.";
    }

    setValidationErrors(errors);
    setApiError("");
    setFormSubmitted(false);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.fullName.trim(),
          email: formData.email.trim(),
          password: formData.password,
          role: selectedRole,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const message = Array.isArray(data.message)
          ? data.message.join(", ")
          : data.message;

        throw new Error(
          message || `Registration failed (${response.status}).`
        );
      }

      setFormSubmitted(true);
      router.push("/login");
    } catch (error) {
      console.error("Registration error:", error);

      setApiError(
        error instanceof Error
          ? error.message
          : "Unable to connect to the backend. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedRoleTitle =
    ROLES.find((role) => role.id === selectedRole)?.title ?? "Account";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        overflow: "hidden",
        color: "#123047",
        background:
          "radial-gradient(ellipse at 12% 12%, rgba(153,246,228,0.38), transparent 32%), radial-gradient(ellipse at 90% 25%, rgba(191,219,254,0.35), transparent 30%), linear-gradient(180deg, #F7FCFC 0%, #FFFFFF 100%)",
      }}
    >
      <Navbar />

      <Box
        component="main"
        sx={{
          position: "relative",
          py: { xs: 5, md: 8 },
          "&::before": {
            content: '""',
            position: "absolute",
            width: { xs: 180, md: 290 },
            height: { xs: 180, md: 290 },
            borderRadius: "50%",
            background: "rgba(94,234,212,0.20)",
            filter: "blur(2px)",
            top: 80,
            left: { xs: -100, md: -110 },
            pointerEvents: "none",
          },
          "&::after": {
            content: '""',
            position: "absolute",
            width: { xs: 170, md: 250 },
            height: { xs: 170, md: 250 },
            borderRadius: "50%",
            background: "rgba(147,197,253,0.20)",
            bottom: 40,
            right: { xs: -100, md: -70 },
            pointerEvents: "none",
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Grid
            container
            spacing={{ xs: 4, md: 7 }}
            sx={{ alignItems: "center" }}
          >
            <Grid size={{ xs: 12, md: 5 }}>
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.65, ease: "easeOut" }}
              >
                <Chip
                  label="YOUR HEALTH, CONNECTED"
                  sx={{
                    mb: 2.5,
                    px: 0.5,
                    fontWeight: 800,
                    letterSpacing: "1.1px",
                    fontSize: "0.68rem",
                    color: "#087F75",
                    background: "rgba(204,251,241,0.78)",
                    border: "1px solid rgba(13,148,136,0.15)",
                  }}
                />

                <Typography
                  component="h1"
                  sx={{
                    fontSize: { xs: "2.55rem", sm: "3.2rem", md: "3.55rem" },
                    lineHeight: 1.08,
                    letterSpacing: "-1.8px",
                    fontWeight: 900,
                    color: "#102A43",
                    maxWidth: 500,
                  }}
                >
                  Better care starts with{" "}
                  <Box
                    component="span"
                    sx={{
                      color: "#0D9488",
                      background:
                        "linear-gradient(100deg, #0D9488 10%, #38BDF8 95%)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    connection.
                  </Box>
                </Typography>

                <Typography
                  sx={{
                    mt: 2.5,
                    maxWidth: 460,
                    fontSize: { xs: "1rem", md: "1.05rem" },
                    lineHeight: 1.85,
                    color: "#617587",
                  }}
                >
                  Join a smarter healthcare community built to bring patients,
                  doctors, students, and healthcare organizations together.
                </Typography>

                <Box
                  sx={{
                    mt: 3.5,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1.2,
                  }}
                >
                  {[
                    "Doctor discovery",
                    "Online consultations",
                    "Student opportunities",
                  ].map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.25 + index * 0.12,
                        duration: 0.4,
                      }}
                    >
                      <Chip
                        label={`✓  ${item}`}
                        variant="outlined"
                        sx={{
                          borderRadius: "10px",
                          borderColor: "#D8E9E8",
                          color: "#486777",
                          background: "rgba(255,255,255,0.68)",
                          fontWeight: 600,
                        }}
                      />
                    </motion.div>
                  ))}
                </Box>

                <motion.div
                  animate={{ y: [0, -8, 0], rotate: [0, 1.2, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Box
                    sx={{
                      mt: 5,
                      position: "relative",
                      maxWidth: 440,
                      minHeight: { xs: 210, md: 260 },
                      borderRadius: "30px",
                      overflow: "hidden",
                      background:
                        "linear-gradient(135deg, #D9F7F1 0%, #E6F2FF 100%)",
                      border: "1px solid rgba(255,255,255,0.9)",
                      boxShadow:
                        "0 28px 65px rgba(16,74,91,0.13), inset 0 1px 0 rgba(255,255,255,0.95)",
                      transform:
                        "perspective(1000px) rotateY(-5deg) rotateX(2deg)",
                    }}
                  >
                    <Box
                      component="img"
                      src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=85"
                      alt="Healthcare professional"
                      sx={{
                        position: "absolute",
                        right: { xs: -8, md: 8 },
                        bottom: 0,
                        width: "68%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center top",
                        maskImage:
                          "linear-gradient(to right, transparent 0%, black 24%)",
                        WebkitMaskImage:
                          "linear-gradient(to right, transparent 0%, black 24%)",
                      }}
                    />

                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(90deg, rgba(225,250,245,0.98) 0%, rgba(225,250,245,0.78) 38%, transparent 72%)",
                      }}
                    />

                    <Box
                      sx={{
                        position: "relative",
                        zIndex: 1,
                        p: { xs: 2.5, md: 3.5 },
                        maxWidth: 235,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "0.76rem",
                          fontWeight: 800,
                          color: "#0D9488",
                          letterSpacing: 1,
                        }}
                      >
                        CARE THAT CONNECTS
                      </Typography>

                      <Typography
                        sx={{
                          mt: 1,
                          fontSize: { xs: "1.35rem", md: "1.65rem" },
                          lineHeight: 1.2,
                          fontWeight: 900,
                          color: "#123047",
                        }}
                      >
                        Your health journey, all in one place.
                      </Typography>

                      <Box
                        sx={{
                          mt: 2,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 1,
                          px: 1.4,
                          py: 1,
                          borderRadius: "12px",
                          color: "#0F766E",
                          background: "rgba(255,255,255,0.78)",
                          boxShadow: "0 8px 20px rgba(15,118,110,0.10)",
                          fontSize: "0.78rem",
                          fontWeight: 800,
                        }}
                      >
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            bgcolor: "#14B8A6",
                          }}
                        />
                        Connected care, simplified
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        position: "absolute",
                        top: 18,
                        right: 18,
                        width: 42,
                        height: 42,
                        display: "grid",
                        placeItems: "center",
                        borderRadius: "15px",
                        color: "#0D9488",
                        background: "rgba(255,255,255,0.78)",
                        boxShadow: "0 10px 25px rgba(16,74,91,0.12)",
                        fontSize: 22,
                        fontWeight: 900,
                      }}
                    >
                      +
                    </Box>
                  </Box>
                </motion.div>
              </motion.div>
            </Grid>

            <Grid size={{ xs: 12, md: 7 }}>
              <motion.div
                initial={{ opacity: 0, y: 24, rotateX: 2 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.65,
                  delay: 0.1,
                  ease: "easeOut",
                }}
                style={{ perspective: 1200 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 2.2, sm: 3.5, md: 4 },
                    borderRadius: { xs: "24px", md: "30px" },
                    border: "1px solid rgba(255,255,255,0.95)",
                    background: "rgba(255,255,255,0.83)",
                    backdropFilter: "blur(22px)",
                    boxShadow:
                      "0 30px 80px rgba(21,72,91,0.11), 0 4px 18px rgba(21,72,91,0.04), inset 0 1px 0 #fff",
                  }}
                >
                  <Box sx={{ mb: 3 }}>
                    <Typography
                      sx={{
                        color: "#0D9488",
                        fontWeight: 800,
                        fontSize: "0.72rem",
                        letterSpacing: "1.2px",
                      }}
                    >
                      CREATE YOUR ACCOUNT
                    </Typography>

                    <Typography
                      component="h2"
                      sx={{
                        mt: 0.7,
                        color: "#102A43",
                        fontWeight: 900,
                        fontSize: { xs: "1.65rem", md: "2rem" },
                        letterSpacing: "-0.7px",
                      }}
                    >
                      Welcome to HealthConnect AI
                    </Typography>

                    <Typography
                      sx={{
                        mt: 0.8,
                        color: "#718494",
                        fontSize: "0.92rem",
                      }}
                    >
                      First, tell us how you’ll use the platform.
                    </Typography>
                  </Box>

                  {apiError && (
                    <Alert
                      severity="error"
                      sx={{ mb: 2.5, borderRadius: "13px" }}
                    >
                      {apiError}
                    </Alert>
                  )}

                  {formSubmitted && (
                    <Alert
                      severity="success"
                      sx={{ mb: 2.5, borderRadius: "13px" }}
                    >
                      Account created successfully! Redirecting to login...
                    </Alert>
                  )}

                  <Typography
                    sx={{
                      mb: 1.4,
                      color: "#304D60",
                      fontSize: "0.84rem",
                      fontWeight: 800,
                    }}
                  >
                    I am joining as a
                  </Typography>

                  <Grid container spacing={1.3} sx={{ mb: 3.2 }}>
                    {ROLES.map((role) => {
                      const isSelected = selectedRole === role.id;

                      return (
                        <Grid size={{ xs: 6 }} key={role.id}>
                          <motion.div
                            whileHover={{ y: -4, scale: 1.015 }}
                            whileTap={{ scale: 0.985 }}
                            transition={{
                              type: "spring",
                              stiffness: 320,
                              damping: 22,
                            }}
                          >
                            <Card
                              component="button"
                              type="button"
                              onClick={() => handleRoleChange(role.id)}
                              aria-pressed={isSelected}
                              elevation={0}
                              sx={{
                                position: "relative",
                                width: "100%",
                                minHeight: { xs: 138, sm: 145 },
                                p: { xs: 1.3, sm: 1.7 },
                                textAlign: "left",
                                cursor: "pointer",
                                borderRadius: "17px",
                                border: isSelected
                                  ? "1.5px solid #0D9488"
                                  : "1px solid #E2EBEE",
                                background: isSelected
                                  ? "linear-gradient(145deg, #E7FBF7 0%, #F7FFFD 100%)"
                                  : "rgba(255,255,255,0.75)",
                                boxShadow: isSelected
                                  ? "0 10px 25px rgba(13,148,136,0.12), inset 0 1px 0 #fff"
                                  : "0 5px 15px rgba(16,42,67,0.025)",
                                transition:
                                  "border 180ms ease, background 180ms ease, box-shadow 180ms ease",
                                color: isSelected ? "#0D9488" : "#617587",
                              }}
                            >
                              <Box
                                sx={{
                                  width: 43,
                                  height: 43,
                                  display: "grid",
                                  placeItems: "center",
                                  borderRadius: "13px",
                                  mb: 1.2,
                                  background: isSelected
                                    ? "#C8F5EC"
                                    : "#F0F5F7",
                                  color: isSelected
                                    ? "#0D9488"
                                    : "#718494",
                                }}
                              >
                                {role.icon}
                              </Box>

                              <Typography
                                sx={{
                                  fontSize: {
                                    xs: "0.84rem",
                                    sm: "0.92rem",
                                  },
                                  fontWeight: 850,
                                  color: "#17384D",
                                  lineHeight: 1.3,
                                }}
                              >
                                {role.title}
                              </Typography>

                              <Typography
                                sx={{
                                  mt: 0.5,
                                  fontSize: "0.72rem",
                                  lineHeight: 1.4,
                                  color: "#7A8D9B",
                                }}
                              >
                                {role.badge}
                              </Typography>

                              {isSelected && (
                                <Box
                                  sx={{
                                    position: "absolute",
                                    top: 10,
                                    right: 10,
                                    width: 19,
                                    height: 19,
                                    borderRadius: "50%",
                                    bgcolor: "#0D9488",
                                    color: "#fff",
                                    display: "grid",
                                    placeItems: "center",
                                    fontSize: 12,
                                    fontWeight: 900,
                                  }}
                                >
                                  ✓
                                </Box>
                              )}
                            </Card>
                          </motion.div>
                        </Grid>
                      );
                    })}
                  </Grid>

                  <Box
                    sx={{
                      mb: 2.5,
                      p: 1.5,
                      borderRadius: "13px",
                      bgcolor: "#F4FAFA",
                      border: "1px solid #E4F0EF",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#496576",
                        fontSize: "0.82rem",
                        lineHeight: 1.55,
                      }}
                    >
                      {
                        ROLES.find((role) => role.id === selectedRole)
                          ?.description
                      }
                    </Typography>
                  </Box>

                  <form onSubmit={handleRegisterSubmit} noValidate>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="Full name"
                          placeholder="Enter your full name"
                          autoComplete="name"
                          value={formData.fullName}
                          onChange={(event) =>
                            handleInputChange("fullName", event.target.value)
                          }
                          error={!!validationErrors.fullName}
                          helperText={validationErrors.fullName}
                          sx={fieldSx}
                        />
                      </Grid>

                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="Email address"
                          type="email"
                          placeholder="you@example.com"
                          autoComplete="email"
                          value={formData.email}
                          onChange={(event) =>
                            handleInputChange("email", event.target.value)
                          }
                          error={!!validationErrors.email}
                          helperText={validationErrors.email}
                          sx={fieldSx}
                        />
                      </Grid>

                      {selectedRole === "patient" && (
                        <>
                          <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                              fullWidth
                              label="Date of birth"
                              type="date"
                              slotProps={{
                                inputLabel: { shrink: true },
                              }}
                              value={formData.dob}
                              onChange={(event) =>
                                handleInputChange("dob", event.target.value)
                              }
                              sx={fieldSx}
                            />
                          </Grid>

                          <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                              fullWidth
                              label="Emergency contact (optional)"
                              placeholder="Phone number"
                              value={formData.emergencyContact}
                              onChange={(event) =>
                                handleInputChange(
                                  "emergencyContact",
                                  event.target.value
                                )
                              }
                              sx={fieldSx}
                            />
                          </Grid>
                        </>
                      )}

                      {selectedRole === "doctor" && (
                        <>
                          <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                              fullWidth
                              label="Medical license number"
                              placeholder="Enter license ID"
                              value={formData.licenseNumber}
                              onChange={(event) =>
                                handleInputChange(
                                  "licenseNumber",
                                  event.target.value
                                )
                              }
                              error={!!validationErrors.licenseNumber}
                              helperText={validationErrors.licenseNumber}
                              sx={fieldSx}
                            />
                          </Grid>

                          <Grid size={{ xs: 12, sm: 6 }}>
                            <FormControl fullWidth sx={fieldSx}>
                              <Select
                                value={formData.specialty}
                                onChange={(event) =>
                                  handleInputChange(
                                    "specialty",
                                    event.target.value
                                  )
                                }
                                inputProps={{
                                  "aria-label": "Medical specialty",
                                }}
                              >
                                {SPECIALTY_OPTIONS.map((specialty) => (
                                  <MenuItem
                                    key={specialty}
                                    value={specialty}
                                  >
                                    {specialty}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                        </>
                      )}

                      {selectedRole === "student" && (
                        <>
                          <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                              fullWidth
                              label="College / university"
                              placeholder="Your institute name"
                              value={formData.universityName}
                              onChange={(event) =>
                                handleInputChange(
                                  "universityName",
                                  event.target.value
                                )
                              }
                              error={!!validationErrors.universityName}
                              helperText={validationErrors.universityName}
                              sx={fieldSx}
                            />
                          </Grid>

                          <Grid size={{ xs: 12, sm: 6 }}>
                            <FormControl fullWidth sx={fieldSx}>
                              <Select
                                value={formData.degreeProgram}
                                onChange={(event) =>
                                  handleInputChange(
                                    "degreeProgram",
                                    event.target.value
                                  )
                                }
                                inputProps={{
                                  "aria-label": "Degree program",
                                }}
                              >
                                {DEGREE_OPTIONS.map((degree) => (
                                  <MenuItem key={degree} value={degree}>
                                    {degree}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                        </>
                      )}

                      {selectedRole === "organization" && (
                        <>
                          <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                              fullWidth
                              label="Hospital / organization name"
                              placeholder="Enter facility name"
                              value={formData.orgName}
                              onChange={(event) =>
                                handleInputChange(
                                  "orgName",
                                  event.target.value
                                )
                              }
                              error={!!validationErrors.orgName}
                              helperText={validationErrors.orgName}
                              sx={fieldSx}
                            />
                          </Grid>

                          <Grid size={{ xs: 12, sm: 6 }}>
                            <FormControl fullWidth sx={fieldSx}>
                              <Select
                                value={formData.facilityType}
                                onChange={(event) =>
                                  handleInputChange(
                                    "facilityType",
                                    event.target.value
                                  )
                                }
                                inputProps={{
                                  "aria-label": "Facility type",
                                }}
                              >
                                {FACILITY_OPTIONS.map((facility) => (
                                  <MenuItem
                                    key={facility}
                                    value={facility}
                                  >
                                    {facility}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                        </>
                      )}

                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="Password"
                          type={showPassword ? "text" : "password"}
                          placeholder="At least 8 characters"
                          autoComplete="new-password"
                          value={formData.password}
                          onChange={(event) =>
                            handleInputChange("password", event.target.value)
                          }
                          error={!!validationErrors.password}
                          helperText={validationErrors.password}
                          slotProps={{
                            input: {
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    type="button"
                                    aria-label={
                                      showPassword
                                        ? "Hide password"
                                        : "Show password"
                                    }
                                    onClick={() =>
                                      setShowPassword((previous) => !previous)
                                    }
                                    edge="end"
                                  >
                                    <EyeIcon off={showPassword} />
                                  </IconButton>
                                </InputAdornment>
                              ),
                            },
                          }}
                          sx={fieldSx}
                        />
                      </Grid>

                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="Confirm password"
                          type="password"
                          placeholder="Enter password again"
                          autoComplete="new-password"
                          value={formData.confirmPassword}
                          onChange={(event) =>
                            handleInputChange(
                              "confirmPassword",
                              event.target.value
                            )
                          }
                          error={!!validationErrors.confirmPassword}
                          helperText={validationErrors.confirmPassword}
                          sx={fieldSx}
                        />
                      </Grid>

                      <Grid size={12}>
                        <FormControlLabel
                          sx={{
                            alignItems: "flex-start",
                            ml: 0,
                            mr: 0,
                          }}
                          control={
                            <Checkbox
                              checked={formData.agreeTerms}
                              onChange={(event) =>
                                handleInputChange(
                                  "agreeTerms",
                                  event.target.checked
                                )
                              }
                              sx={{
                                pt: 0.2,
                                color: "#0D9488",
                                "&.Mui-checked": {
                                  color: "#0D9488",
                                },
                              }}
                            />
                          }
                          label={
                            <Typography
                              sx={{
                                color: "#718494",
                                fontSize: "0.8rem",
                                lineHeight: 1.6,
                                pt: 0.4,
                              }}
                            >
                              I agree to the Terms of Service and Privacy
                              Policy.
                            </Typography>
                          }
                        />

                        {validationErrors.agreeTerms && (
                          <Typography
                            sx={{
                              mt: 0.3,
                              ml: 4,
                              color: "#D32F2F",
                              fontSize: "0.75rem",
                            }}
                          >
                            {validationErrors.agreeTerms}
                          </Typography>
                        )}
                      </Grid>

                      <Grid size={12}>
                        <motion.div
                          whileHover={
                            isSubmitting ? undefined : { scale: 1.012 }
                          }
                          whileTap={
                            isSubmitting ? undefined : { scale: 0.99 }
                          }
                        >
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            disabled={isSubmitting}
                            sx={{
                              mt: 0.4,
                              py: 1.65,
                              borderRadius: "14px",
                              textTransform: "none",
                              fontSize: "1rem",
                              fontWeight: 850,
                              letterSpacing: "0.1px",
                              color: "#fff",
                              background:
                                "linear-gradient(100deg, #0D9488 0%, #0F766E 100%)",
                              boxShadow:
                                "0 12px 25px rgba(13,148,136,0.24)",
                              "&:hover": {
                                background:
                                  "linear-gradient(100deg, #0F766E 0%, #115E59 100%)",
                                boxShadow:
                                  "0 16px 30px rgba(13,148,136,0.3)",
                              },
                              "&.Mui-disabled": {
                                color: "#fff",
                                background: "#80BDB7",
                              },
                            }}
                          >
                            {isSubmitting
                              ? "Creating Account..."
                              : `Create ${selectedRoleTitle} Account`}

                            {!isSubmitting && (
                              <Box
                                component="span"
                                sx={{ ml: 1.2, fontSize: "1.2rem" }}
                              >
                                →
                              </Box>
                            )}
                          </Button>
                        </motion.div>
                      </Grid>
                    </Grid>
                  </form>

                  <Typography
                    sx={{
                      mt: 2.4,
                      textAlign: "center",
                      color: "#8293A0",
                      fontSize: "0.76rem",
                      lineHeight: 1.6,
                    }}
                  >
                    Your information should be handled securely. Doctor and
                    organization accounts should be verified before receiving
                    platform privileges.
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box
        component="footer"
        sx={{
          py: 2.5,
          px: 2,
          textAlign: "center",
          borderTop: "1px solid rgba(211,228,231,0.7)",
          color: "#8495A1",
          fontSize: "0.78rem",
        }}
      >
        © {new Date().getFullYear()} HealthConnect AI · Connecting care with
        confidence
      </Box>
    </Box>
  );
}
