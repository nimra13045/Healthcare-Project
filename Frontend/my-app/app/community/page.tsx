"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Stack,
  Chip,
  Avatar,
  TextField,
  InputAdornment,
  IconButton,
  Divider,
  Tab,
  Tabs,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { motion, AnimatePresence } from "framer-motion";

// Icons
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";

// Aapke customized components
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface Post {
  id: string;
  author: string;
  role: string;
  avatar: string;
  verified: boolean;
  time: string;
  category: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
  shares: number;
  liked: boolean;
}

const SAMPLE_POSTS: Post[] = [
  {
    id: "post-1",
    author: "Dr. Sarah Jenkins",
    role: "Cardiologist • Specialist",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=150&q=80",
    verified: true,
    time: "2 hours ago",
    category: "Clinical Case Study",
    title: "Key Takeaways from Recent Preventative Cardiology Trials",
    content: "When evaluating early-stage hypertension in young adults, lifestyle interventions combined with targeted micro-nutrient assessment show a 34% higher compliance rate before initiating pharmacological therapy. What are your clinical observations?",
    likes: 48,
    comments: 12,
    shares: 5,
    liked: false,
  },
  {
    id: "post-2",
    author: "Alex Mercer",
    role: "Medical Student • Year 4",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    verified: false,
    time: "4 hours ago",
    category: "Study Group",
    title: "USMLE Step 2 CS Study Group — Cardiology & Neurology Focus",
    content: "We are organizing a weekly virtual study circle focusing on differential diagnosis case studies. Looking for 3 more medical students or interns to join our interactive sessions on HealthConnect AI!",
    likes: 29,
    comments: 19,
    shares: 3,
    liked: true,
  },
  {
    id: "post-3",
    author: "Dr. Marcus Vance",
    role: "Neurologist • Mentor",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=150&q=80",
    verified: true,
    time: "6 hours ago",
    category: "Career Guidance",
    title: "How to Secure Clinical Residencies & Elective Internships",
    content: "To all upcoming medical trainees: focus on building concise research portfolios and seeking mentorship early. Here are three key strategies to stand out during hospital clinical rotations...",
    likes: 85,
    comments: 31,
    shares: 14,
    liked: false,
  },
];

const TOPICS = [
  { label: "All Discussions", icon: <ForumRoundedIcon /> },
  { label: "Clinical Cases", icon: <LocalHospitalRoundedIcon /> },
  { label: "Student Hub", icon: <SchoolRoundedIcon /> },
  { label: "AI Insights", icon: <AutoAwesomeRoundedIcon /> },
];

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [posts, setPosts] = useState<Post[]>(SAMPLE_POSTS);
  const [newPostText, setNewPostText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  };

  const handleCreatePost = () => {
    if (!newPostText.trim()) return;
    const newEntry: Post = {
      id: `post-${Date.now()}`,
      author: "Nimra Nazir",
      role: "Platform Member",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      verified: true,
      time: "Just now",
      category: "General Discussion",
      title: newPostText.slice(0, 45) + "...",
      content: newPostText,
      likes: 0,
      comments: 0,
      shares: 0,
      liked: false,
    };
    setPosts([newEntry, ...posts]);
    setNewPostText("");
  };

  return (
    <Box sx={{ bgcolor: "#F8FAFC", minHeight: "100vh", color: "#3179bd", display: "flex", flexDirection: "column" }}>
      {/* Custom Navbar */}
      <Navbar />

      <Box sx={{ flex: 1, py: { xs: 4, md: 6 } }}>
        <Container maxWidth="xl">
          
          {/* HERO / COMMUNITY HEADER */}
          <Box sx={{ mb: 5 }}>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3.5, md: 5 },
                  borderRadius: "32px",
                  background: "radial-gradient(circle at 85% 15%, #8aa19c 0%, #3f9180 40%, #193d3a 100%)",
                  color: "#FFFFFF",
                  boxShadow: "0 25px 50px -12px rgba(15, 118, 110, 0.22)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Grid container spacing={3} sx={{ alignItems: "center" }}>
                  <Grid size={{ xs: 12, md: 8 }}>
                    <Chip
                      icon={<GroupsRoundedIcon sx={{ color: "#CCFBF1 !important" }} />}
                      label="HEALTHCONNECT AI COMMUNITY"
                      sx={{
                        mb: 2,
                        px: 1,
                        bgcolor: "rgba(255, 255, 255, 0.18)",
                        backdropFilter: "blur(10px)",
                        color: "#FFFFFF",
                        fontWeight: 800,
                        borderRadius: "10px",
                      }}
                    />
                    <Typography variant="h3" sx={{ fontWeight: 900, lineHeight: 1.15, fontSize: { xs: "2rem", md: "2.8rem" } }}>
                      Connect, Learn & Collaborate with Healthcare Leaders
                    </Typography>
                    <Typography sx={{ mt: 1.5, opacity: 0.9, maxWidth: 620, fontSize: "1.05rem" }}>
                      Join live discussions, share clinical insights, find study mentors, and engage with verified medical professionals.
                    </Typography>
                  </Grid>

                  <Grid size={{ xs: 12, md: 4 }} sx={{ display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" } }}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2.5,
                        borderRadius: "20px",
                        bgcolor: "rgba(255, 255, 255, 0.15)",
                        backdropFilter: "blur(16px)",
                        border: "1px solid rgba(255, 255, 255, 0.3)",
                        textAlign: "center",
                        minWidth: 200,
                      }}
                    >
                      <Typography variant="h4" sx={{ fontWeight: 900 }}>12,800+</Typography>
                      <Typography variant="body2" sx={{ opacity: 0.85, fontWeight: 600 }}>Active Members</Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Paper>
            </motion.div>
          </Box>

          {/* MAIN LAYOUT GRID */}
          <Grid container spacing={4}>
            
            {/* LEFT SIDEBAR: Navigation & Topics */}
            <Grid size={{ xs: 12, md: 3 }}>
              <Stack spacing={3}>
                <Paper elevation={0} sx={{ p: 2.5, borderRadius: "24px", border: "1px solid #E2E8F0", bgcolor: "#FFFFFF" }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#102A43", mb: 2 }}>
                    Community Topics
                  </Typography>
                  <Tabs
                    orientation="vertical"
                    value={activeTab}
                    onChange={(_, val) => setActiveTab(val)}
                    sx={{
                      "& .MuiTab-root": {
                        justifyContent: "flex-start",
                        borderRadius: "14px",
                        py: 1.5,
                        px: 2,
                        mb: 1,
                        fontWeight: 700,
                        textTransform: "none",
                        color: "#526579",
                        "&.Mui-selected": {
                          bgcolor: "#F0FDFA",
                          color: "#0D9488",
                        },
                      },
                      "& .MuiTabs-indicator": { display: "none" },
                    }}
                  >
                    {TOPICS.map((topic) => (
                      <Tab key={topic.label} icon={topic.icon} iconPosition="start" label={topic.label} />
                    ))}
                  </Tabs>
                </Paper>

                {/* Trending Tags Widget */}
                <Paper elevation={0} sx={{ p: 2.5, borderRadius: "24px", border: "1px solid #E2E8F0", bgcolor: "#FFFFFF" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                    <TrendingUpRoundedIcon sx={{ color: "#0D9488" }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#102A43" }}>
                      Trending Topics
                    </Typography>
                  </Box>
                  <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
                    {["#Cardiography", "#USMLEStep2", "#Telehealth2026", "#Pharmacology", "#Internships", "#AI_Diagnostics"].map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        onClick={() => {}}
                        sx={{
                          bgcolor: "#F1F5F9",
                          color: "#334155",
                          fontWeight: 700,
                          borderRadius: "8px",
                          "&:hover": { bgcolor: "#CCFBF1", color: "#0F766E" },
                        }}
                      />
                    ))}
                  </Stack>
                </Paper>
              </Stack>
            </Grid>

            {/* CENTER FEED: Posts & Creator Input */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={3}>
                
                {/* CREATE POST BOX */}
                <Paper elevation={0} sx={{ p: 3, borderRadius: "24px", border: "1px solid #E2E8F0", bgcolor: "#FFFFFF" }}>
                  <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                    <Avatar src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80" sx={{ width: 44, height: 44 }} />
                    <TextField
                      fullWidth
                      multiline
                      rows={2}
                      placeholder="Share a medical insight, ask a question, or post a study opportunity..."
                      value={newPostText}
                      onChange={(e) => setNewPostText(e.target.value)}
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: "16px", bgcolor: "#F8FAFC" } }}
                    />
                  </Stack>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pt: 1 }}>
                    <Chip
                      icon={<AddCircleOutlineRoundedIcon />}
                      label="Add Topic Tag"
                      size="small"
                      variant="outlined"
                      sx={{ borderRadius: "8px", fontWeight: 700, color: "#64748B" }}
                    />
                    <Button
                      variant="contained"
                      endIcon={<SendRoundedIcon />}
                      onClick={handleCreatePost}
                      disabled={!newPostText.trim()}
                      sx={{
                        borderRadius: "12px",
                        bgcolor: "#0D9488",
                        fontWeight: 800,
                        textTransform: "none",
                        px: 3,
                        "&:hover": { bgcolor: "#0F766E" },
                      }}
                    >
                      Post
                    </Button>
                  </Box>
                </Paper>

                {/* SEARCH FILTER BAR */}
                <TextField
                  fullWidth
                  placeholder="Search community posts, topics, or specialists..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchRoundedIcon sx={{ color: "#94A3B8" }} />
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "16px", bgcolor: "#FFFFFF" } }}
                />

                {/* POSTS LIST WITH ANIMATION */}
                <AnimatePresence>
                  {posts
                    .filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.content.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((post) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Paper
                          elevation={0}
                          sx={{
                            p: 3,
                            borderRadius: "24px",
                            border: "1px solid #E2E8F0",
                            bgcolor: "#FFFFFF",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              boxShadow: "0 15px 35px rgba(16, 42, 67, 0.06)",
                              borderColor: "#99F6E4",
                            },
                          }}
                        >
                          {/* Author Info */}
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                            <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                              <Avatar src={post.avatar} sx={{ width: 44, height: 44 }} />
                              <Box>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                  <Typography sx={{ fontWeight: 800, fontSize: "0.95rem", color: "#102A43" }}>
                                    {post.author}
                                  </Typography>
                                  {post.verified && <VerifiedRoundedIcon sx={{ color: "#0D9488", fontSize: 16 }} />}
                                </Box>
                                <Typography variant="caption" sx={{ color: "#64748B", fontWeight: 600 }}>
                                  {post.role} • {post.time}
                                </Typography>
                              </Box>
                            </Stack>
                            <Chip label={post.category} size="small" sx={{ bgcolor: "#F0FDFA", color: "#0D9488", fontWeight: 800, borderRadius: "8px" }} />
                          </Box>

                          {/* Content */}
                          <Typography variant="h6" sx={{ fontWeight: 800, fontSize: "1.1rem", color: "#102A43", mb: 1 }}>
                            {post.title}
                          </Typography>
                          <Typography sx={{ color: "#526579", lineHeight: 1.7, fontSize: "0.95rem", mb: 2.5 }}>
                            {post.content}
                          </Typography>

                          <Divider sx={{ mb: 2, borderColor: "#F1F5F9" }} />

                          {/* Interaction Actions */}
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Stack direction="row" spacing={2}>
                              <Button
                                size="small"
                                onClick={() => handleLike(post.id)}
                                startIcon={post.liked ? <FavoriteRoundedIcon sx={{ color: "#EF4444" }} /> : <FavoriteBorderRoundedIcon />}
                                sx={{ color: post.liked ? "#EF4444" : "#64748B", fontWeight: 700, textTransform: "none" }}
                              >
                                {post.likes}
                              </Button>
                              <Button
                                size="small"
                                startIcon={<ChatBubbleOutlineRoundedIcon />}
                                sx={{ color: "#64748B", fontWeight: 700, textTransform: "none" }}
                              >
                                {post.comments} Comments
                              </Button>
                            </Stack>

                            <Stack direction="row" spacing={1}>
                              <IconButton size="small"><ShareRoundedIcon sx={{ fontSize: 18, color: "#64748B" }} /></IconButton>
                              <IconButton size="small"><BookmarkBorderRoundedIcon sx={{ fontSize: 18, color: "#64748B" }} /></IconButton>
                            </Stack>
                          </Box>
                        </Paper>
                      </motion.div>
                    ))}
                </AnimatePresence>
              </Stack>
            </Grid>

            {/* RIGHT SIDEBAR: Upcoming Events & Recommended Members */}
            <Grid size={{ xs: 12, md: 3 }}>
              <Stack spacing={3}>
                
                {/* Upcoming Webinars / Live Q&As */}
                <Paper elevation={0} sx={{ p: 2.5, borderRadius: "24px", border: "1px solid #E2E8F0", bgcolor: "#FFFFFF" }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#102A43", mb: 2 }}>
                    Upcoming Live Q&As
                  </Typography>
                  <Stack spacing={2}>
                    <Box sx={{ p: 2, borderRadius: "16px", bgcolor: "#F8FAFC", border: "1px solid #E2E8F0" }}>
                      <Chip label="Tomorrow at 5 PM" size="small" sx={{ bgcolor: "#CCFBF1", color: "#0F766E", fontWeight: 800, mb: 1 }} />
                      <Typography sx={{ fontWeight: 800, fontSize: "0.9rem", color: "#102A43" }}>
                        AI in Modern Diagnostics
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#64748B", display: "block", mt: 0.5 }}>
                        Hosted by Dr. Aris Thorne
                      </Typography>
                    </Box>
                  </Stack>
                </Paper>

                {/* Recommended Peers to Follow */}
                <Paper elevation={0} sx={{ p: 2.5, borderRadius: "24px", border: "1px solid #E2E8F0", bgcolor: "#FFFFFF" }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#102A43", mb: 2 }}>
                    Specialists to Connect
                  </Typography>
                  <Stack spacing={2}>
                    {[
                      { name: "Dr. Elena Rostova", role: "Pediatrician", avatar: "https://images.unsplash.com/photo-1594824813566-88855ce78961?auto=format&fit=crop&w=150&q=80" },
                      { name: "Dr. David Chen", role: "Orthopedic Surgeon", avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=150&q=80" },
                    ].map((user) => (
                      <Box key={user.name} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                          <Avatar src={user.avatar} sx={{ width: 36, height: 36 }} />
                          <Box>
                            <Typography sx={{ fontWeight: 800, fontSize: "0.85rem", color: "#102A43" }}>{user.name}</Typography>
                            <Typography variant="caption" sx={{ color: "#64748B" }}>{user.role}</Typography>
                          </Box>
                        </Stack>
                        <Button size="small" variant="outlined" sx={{ borderRadius: "8px", textTransform: "none", fontWeight: 700, borderColor: "#0D9488", color: "#0D9488" }}>
                          Connect
                        </Button>
                      </Box>
                    ))}
                  </Stack>
                </Paper>

              </Stack>
            </Grid>

          </Grid>
        </Container>
      </Box>

      {/* Custom Footer */}
      <Footer />
    </Box>
  );
}