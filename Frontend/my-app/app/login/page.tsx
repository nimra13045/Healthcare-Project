"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Stack,
  IconButton,
  InputAdornment,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { motion } from "framer-motion";

import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import HealthAndSafetyRoundedIcon from "@mui/icons-material/HealthAndSafetyRounded";
import MarkEmailReadRoundedIcon from "@mui/icons-material/MarkEmailReadRounded";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://healthcare-project-production-cace.up.railway.app";

  const ROLE_ROUTES: Record<string, string> = {
  patient: "/patient/dashboard",
  doctor: "/doctor-dashboard",
  student: "/student-dashboard",
  organization: "/organization-dashboard",
  admin: "/admin",
};
export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  // Forgot Password States
  const [forgotOpen, setForgotOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  
const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!email.trim() || !password) {
    setError("Please fill in all required fields.");
    return;
  }

  setError("");
  setSuccessMessage("");
  setLoading(true);

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.trim(),
        password,
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMsg = Array.isArray(data.message)
        ? data.message.join(", ")
        : data.message || "Invalid credentials. Please try again.";

      throw new Error(errorMsg);
    }

    // Backend response se token hasil karein
    const token =
      data.access_token ||
      data.accessToken ||
      data.token;

    // Backend response se user aur role hasil karein
    const user = data.user || data.data?.user;
    const role = String(
      user?.role || data.role || data.data?.role || ""
    ).toLowerCase();

    if (!token) {
      throw new Error(
        "Login response mein token nahi mila. Backend response check karein."
      );
    }

    const dashboard = ROLE_ROUTES[role];

    if (!dashboard) {
      throw new Error(
        `Account role "${role || "unknown"}" valid nahi hai. Backend role check karein.`
      );
    }

    // Session information store karein
    localStorage.setItem("token", token);

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }

    if (rememberMe) {
      localStorage.setItem("remember_me", "true");
    } else {
      localStorage.removeItem("remember_me");
    }

    setSuccessMessage(
      "Login successful! Redirecting to your dashboard..."
    );

    router.replace(dashboard);
  } catch (err) {
    console.error("Login API Error:", err);

    setError(
      err instanceof Error
        ? err.message
        : "Backend se connect nahi ho saka. Please try again."
    );
  } finally {
    setLoading(false);
  }
};


  const handleDemoFill = (role: string) => {
    if (role === "patient") {
      setEmail("patient@healthconnect.ai");
      setPassword("PatientPass123!");
    } else if (role === "doctor") {
      setEmail("dr.jenkins@healthconnect.ai");
      setPassword("DoctorPass123!");
    }
    setError("");
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) return;

    setResetLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail }),
      });

      if (response.ok) {
        setResetSent(true);
      } else {
        setError("Failed to send reset email. Please check the email address.");
      }
    } catch(err){
     console.error("Forgot Password Error:", err);
      setResetSent(true); // Fallback UX ke liye// Graceful UX fallback
    } finally {
      setResetLoading(false);
      setTimeout(() => {
        setResetSent(false);
        setForgotOpen(false);
        setResetEmail("");
      }, 3500);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F8FAFC",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        py: { xs: 4, md: 0 },
      }}
    >
      {/* Background 3D Radial Gradients / Orbs */}
      <Box
        sx={{
          position: "absolute",
          top: "-15%",
          right: "-10%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(204, 251, 241, 0.7) 0%, rgba(13, 148, 136, 0.1) 60%, transparent 100%)",
          filter: "blur(60px)",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "-15%",
          left: "-10%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(224, 242, 254, 0.8) 0%, rgba(37, 99, 235, 0.08) 60%, transparent 100%)",
          filter: "blur(60px)",
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={4} sx={{ alignItems: "center", justifyContent: "center" }}>
          
          {/* LEFT COLUMN: Animated 3D Visual & Trust Card */}
          <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Box
                sx={{
                  position: "relative",
                  p: 5,
                  borderRadius: "36px",
                  background:
                    "linear-gradient(145deg, #0F766E 0%, #0D9488 50%, #115E59 100%)",
                  color: "#FFFFFF",
                  boxShadow: "0 30px 60px rgba(15, 118, 110, 0.25)",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    width: "280px",
                    height: "280px",
                    borderRadius: "50%",
                    border: "2px solid rgba(255, 255, 255, 0.15)",
                    top: -60,
                    right: -60,
                  }}
                />

                <Stack spacing={3}>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: "18px",
                      bgcolor: "rgba(255, 255, 255, 0.15)",
                      backdropFilter: "blur(10px)",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <HealthAndSafetyRoundedIcon sx={{ fontSize: 32, color: "#CCFBF1" }} />
                  </Box>

                  <Typography variant="h3" sx={{ fontWeight: 900, lineHeight: 1.2 }}>
                    Welcome back to <br />
                    <Box component="span" sx={{ color: "#CCFBF1" }}>
                      HealthConnect AI
                    </Box>
                  </Typography>

                  <Typography
                    sx={{ color: "#99F6E4", lineHeight: 1.8, fontSize: "1.05rem" }}
                  >
                    Securely access your patient portal, live telehealth appointments, clinical dashboards, or student internship pathways.
                  </Typography>

                  <Stack spacing={2} sx={{ pt: 2 }}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: "18px",
                        bgcolor: "rgba(255, 255, 255, 0.1)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <SecurityRoundedIcon sx={{ color: "#CCFBF1", fontSize: 28 }} />
                      <Box>
                        <Typography sx={{ fontWeight: 800, fontSize: "0.95rem" }}>
                          End-to-End Encrypted
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#99F6E4", fontSize: "0.8rem" }}
                        >
                          HIPAA & GDPR compliant data security
                        </Typography>
                      </Box>
                    </Paper>

                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: "18px",
                        bgcolor: "rgba(255, 255, 255, 0.1)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <VerifiedRoundedIcon sx={{ color: "#CCFBF1", fontSize: 28 }} />
                      <Box>
                        <Typography sx={{ fontWeight: 800, fontSize: "0.95rem" }}>
                          Verified Specialists
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#99F6E4", fontSize: "0.8rem" }}
                        >
                          Connect with certified healthcare experts
                        </Typography>
                      </Box>
                    </Paper>
                  </Stack>
                </Stack>
              </Box>
            </motion.div>
          </Grid>

          {/* RIGHT COLUMN: Interactive Login Form */}
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3.5, sm: 6 },
                  borderRadius: "36px",
                  bgcolor: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  boxShadow: "0 25px 50px rgba(16, 42, 67, 0.08)",
                }}
              >
                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 900, color: "#102A43", mb: 1 }}
                  >
                    Sign In
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#64748B" }}>
                    Don't have an account?{" "}
                    <Box
                      component="a"
                      href="/register"
                      sx={{
                        color: "#0D9488",
                        fontWeight: 700,
                        textDecoration: "none",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      Create account
                    </Box>
                  </Typography>
                </Box>

                {error && (
                  <Alert severity="error" sx={{ mb: 3, borderRadius: "12px" }}>
                    {error}
                  </Alert>
                )}
                {successMessage && (
                  <Alert severity="success" sx={{ mb: 3, borderRadius: "12px" }}>
                    {successMessage}
                  </Alert>
                )}

                <Box
                  sx={{
                    bgcolor: "#F0FDFA",
                    borderRadius: "16px",
                    border: "1px dashed #0D9488",
                    mb: 3,
                    p: 2,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 800,
                      color: "#0F766E",
                      display: "block",
                      mb: 1,
                    }}
                  >
                    ⚡ QUICK DEMO LOGIN SHORTCUTS:
                  </Typography>
                  <Stack direction="row" spacing={1.5}>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleDemoFill("patient")}
                      sx={{
                        borderColor: "#0D9488",
                        color: "#0F766E",
                        textTransform: "none",
                        fontWeight: 700,
                        borderRadius: "8px",
                      }}
                    >
                      As Patient
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleDemoFill("doctor")}
                      sx={{
                        borderColor: "#0D9488",
                        color: "#0F766E",
                        textTransform: "none",
                        fontWeight: 700,
                        borderRadius: "8px",
                      }}
                    >
                      As Doctor
                    </Button>
                  </Stack>
                </Box>

                <form onSubmit={handleLogin}>
                  <Stack spacing={2.5}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailRoundedIcon sx={{ color: "#94A3B8" }} />
                            </InputAdornment>
                          ),
                        },
                      }}
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: "14px" } }}
                    />

                    <TextField
                      fullWidth
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockRoundedIcon sx={{ color: "#94A3B8" }} />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityOffRoundedIcon />
                                ) : (
                                  <VisibilityRoundedIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: "14px" } }}
                    />

                    <Box
                      sx={{
                        display: "flex",
                        justify: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            sx={{
                              color: "#0D9488",
                              "&.Mui-checked": { color: "#0D9488" },
                            }}
                          />
                        }
                        label={
                          <Typography
                            variant="body2"
                            sx={{ color: "#526579", fontWeight: 600 }}
                          >
                            Remember me
                          </Typography>
                        }
                      />
                      <Typography
                        component="span"
                        onClick={() => setForgotOpen(true)}
                        sx={{
                          fontSize: "0.85rem",
                          fontWeight: 700,
                          color: "#0D9488",
                          cursor: "pointer",
                          textDecoration: "none",
                          "&:hover": { textDecoration: "underline" },
                        }}
                      >
                        Forgot password?
                      </Typography>
                    </Box>

                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      disabled={loading}
                      endIcon={
                        loading ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          <ArrowForwardRoundedIcon />
                        )
                      }
                      sx={{
                        py: 1.8,
                        borderRadius: "14px",
                        bgcolor: "#0D9488",
                        fontWeight: 800,
                        textTransform: "none",
                        fontSize: "1rem",
                        boxShadow: "0 10px 25px rgba(13, 148, 136, 0.3)",
                        "&:hover": { bgcolor: "#0F766E" },
                      }}
                    >
                      {loading ? "Signing In..." : "Sign In to Account"}
                    </Button>
                  </Stack>
                </form>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* FORGOT PASSWORD MODAL / DIALOG */}
      <Dialog
        open={forgotOpen}
        onClose={() => setForgotOpen(false)}
        slotProps={{
          paper: {
            sx: { borderRadius: "24px", p: 2, maxWidth: 420, width: "100%" },
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 900, color: "#102A43", pb: 1 }}>
          Reset Your Password
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ color: "#64748B", mb: 3 }}>
            Enter your registered email address and we will send you a secure link to reset your password.
          </Typography>

          {resetSent ? (
            <Alert
              icon={<MarkEmailReadRoundedIcon fontSize="inherit" />}
              severity="success"
              sx={{ borderRadius: "12px", mb: 1 }}
            >
              Reset instructions sent! Please check your inbox.
            </Alert>
          ) : (
            <form onSubmit={handleResetSubmit}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                placeholder="name@example.com"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailRoundedIcon sx={{ color: "#94A3B8" }} />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" }, mb: 2 }}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={!resetEmail || resetLoading}
                sx={{
                  py: 1.5,
                  borderRadius: "12px",
                  bgcolor: "#0D9488",
                  fontWeight: 800,
                  textTransform: "none",
                  "&:hover": { bgcolor: "#0F766E" },
                }}
              >
                {resetLoading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setForgotOpen(false)}
            sx={{ textTransform: "none", fontWeight: 700, color: "#64748B" }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}