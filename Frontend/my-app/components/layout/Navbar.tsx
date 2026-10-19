'use client';

import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
  Snackbar,
  Alert,
  Divider,
} from '@mui/material';
import { useRouter } from "next/navigation";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Find a Doctor', href: '/finddoctor' },
  { label: 'Internships', href: '/internship' },
  { label: 'Community', href: '/community' },
  { label: 'AI Assistant', href: '/AIassistant' },
  { label: 'About', href: '/about' },
];

export default function Navbar() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={scrolled ? 3 : 0}
        sx={{
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : '#ffffff',
          backdropFilter: 'blur(10px)',
          color: '#15384B',
          transition: 'all 0.3s ease-in-out',
          borderBottom: '1px solid rgba(7, 153, 143, 0.1)',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', py: 1.5 }}>
            {/* Logo */}
            <Box
              component="a"
              href="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <Box
                sx={{
                  backgroundColor: '#07998F',
                  color: '#fff',
                  width: 42,
                  height: 42,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(7, 153, 143, 0.3)',
                }}
              >
                <FavoriteIcon sx={{ fontSize: 24 }} />
              </Box>
              <Box>
                <Box sx={{ fontWeight: 800, fontSize: '1.25rem', lineHeight: 1.1, color: '#15384B' }}>
                  HealthConnect AI
                </Box>
                <Box sx={{ fontSize: '0.75rem', color: '#07998F', fontWeight: 600, letterSpacing: '0.5px' }}>
                  Better Care, Together.
                </Box>
              </Box>
            </Box>

            {/* Desktop Navigation Links */}
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                {navItems.map((item) => (
                  <Box
                    component="a"
                    key={item.label}
                    href={item.href}
                    sx={{
                      color: '#15384B',
                      fontWeight: 500,
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      transition: 'color 0.2s',
                      '&:hover': { color: '#07998F' },
                    }}
                  >
                    {item.label}
                  </Box>
                ))}
              </Box>
            )}

            {/* Right Actions: Search icon & Auth buttons */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              {!isMobile && (
                <>
                  <IconButton
                    aria-label="search"
                    onClick={() => {
                      const el = document.getElementById('doctors');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    sx={{ color: '#15384B', backgroundColor: 'rgba(7,153,143,0.05)', '&:hover': { backgroundColor: 'rgba(7,153,143,0.1)' } }}
                  >
                    <SearchIcon />
                  </IconButton>
                  <Button
                    variant="outlined"
                    onClick={() => router.push("/login")}
                    sx={{
                      borderColor: '#07998F',
                      color: '#07998F',
                      px: 2.5,
                      py: 0.8,
                      '&:hover': { borderColor: '#056c64', backgroundColor: 'rgba(7,153,143,0.04)' },
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => router.push("/register")}
                    sx={{
                      backgroundColor: "#07998F",
                      color: "#ffffff",
                      px: 2.5,
                      py: 0.8,
                      "&:hover": {
                        backgroundColor: "#056c64",
                      },
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              )}

              {/* Mobile Hamburger Button */}
              {isMobile && (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{
                    color: '#15384B',
                    backgroundColor: 'rgba(7,153,143,0.05)',
                    p: 1,
                    borderRadius: '10px',
                    '&:hover': { backgroundColor: 'rgba(7,153,143,0.1)' },
                  }}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Navigation Drawer with Header Menu */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': { width: 300, backgroundColor: '#ffffff', boxSizing: 'border-box' },
        }}
      >
        <Box sx={{ p: 2.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F8FAFC' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 32, height: 32, borderRadius: '8px', bgcolor: '#07998F', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: '0.9rem' }}>
              H
            </Box>
            <Box sx={{ fontWeight: 800, color: '#15384B', fontSize: '1.05rem' }}>Menu</Box>
          </Box>
          <IconButton onClick={handleDrawerToggle} sx={{ color: '#15384B' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />

        <List sx={{ px: 2, py: 2 }}>
          {navItems.map((item) => (
            <ListItem key={item.label} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component="a"
                href={item.href}
                onClick={handleDrawerToggle}
                sx={{ borderRadius: 2, py: 1.2, '&:hover': { backgroundColor: 'rgba(7,153,143,0.08)', color: '#07998F' } }}
              >
                <ListItemText
                  primary={item.label}
                  slotProps={{
                    primary: {
                      sx: {
                        fontWeight: 600,
                        color: "#15384B",
                        fontSize: '0.95rem',
                      },
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          
          <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => {
                handleDrawerToggle();
                router.push("/login");
              }}
              sx={{ borderColor: '#07998F', color: '#07998F', py: 1.2, fontWeight: 700, borderRadius: '10px', textTransform: 'none' }}
            >
              Login
            </Button>
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                handleDrawerToggle();
                router.push("/register");
              }}
              sx={{ backgroundColor: '#07998F', color: '#fff', py: 1.2, fontWeight: 700, borderRadius: '10px', textTransform: 'none', '&:hover': { backgroundColor: '#056c64' } }}
            >
              Sign Up
            </Button>
          </Box>
        </List>
      </Drawer>

      <Snackbar
        open={Boolean(snackbarMessage)}
        autoHideDuration={4000}
        onClose={() => setSnackbarMessage('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setSnackbarMessage('')} sx={{ width: '100%', backgroundColor: '#07998F', color: '#fff' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}