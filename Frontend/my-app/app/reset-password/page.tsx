"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Box, Container, Typography, TextField, Button, Paper, Alert, Stack } from "@mui/material";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://healthcare-project-production-cace.up.railway.app";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setError("Invalid or missing reset token.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Password reset successful! Redirecting to login...");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setError(data.message || "Failed to reset password.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center", bgcolor: "#F8FAFC" }}>
      <Container maxWidth="xs">
        <Paper sx={{ p: 4, borderRadius: "24px" }}>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, color: "#102A43" }}>
            Set New Password
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{ bgcolor: "#0D9488", py: 1.5, fontWeight: 800 }}
              >
                {loading ? "Updating..." : "Update Password"}
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}