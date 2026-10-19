'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Typography,
  Card,
  Button,
  Grid,
  TextField,
  Stepper,
  Step,
  StepLabel,
  Avatar,
  Checkbox,
  FormControlLabel,
  Paper,
  Divider,
  CircularProgress,
  Chip,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

// AAPKA APNA IMPORTED NAVBAR COMPONENT
import Navbar from '@/components/layout/Navbar';

// MUI Icons
import EventIcon from '@mui/icons-material/Event';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VerifiedIcon from '@mui/icons-material/Verified';
import SecurityIcon from '@mui/icons-material/Security';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const steps = ['Visit Type', 'Date & Time', 'Patient Details', 'Review & Pay', 'Confirmation'];

const inputSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '9px',
    backgroundColor: '#fff',
    fontSize: '13px',
    '& fieldset': { borderColor: '#dce8ed' },
    '&:hover fieldset': { borderColor: '#079b91' },
    '&.Mui-focused fieldset': { borderColor: '#079b91' },
  },
};

// --- SIDE 3D FLOATING CARD (SHOWS CLICKED DOCTOR DATA) ---
function SideVisualSection({ doctor }: { doctor: any }) {
  return (
    <Box sx={{ position: 'sticky', top: 20 }}>
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 3.5,
            borderRadius: '24px',
            background: 'linear-gradient(135deg, #ffffff 0%, #f0f9f8 100%)',
            border: '1px solid #dce8ed',
            boxShadow: '0 20px 40px rgba(7, 155, 145, 0.08)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box
            component={motion.div}
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ repeat: Infinity, duration: 3 }}
            sx={{
              position: 'absolute',
              top: -30,
              right: -30,
              width: 130,
              height: 130,
              borderRadius: '50%',
              bgcolor: 'rgba(7, 155, 145, 0.12)',
            }}
          />

          <Avatar
            src={doctor.image}
            alt={doctor.name}
            sx={{
              width: 96,
              height: 96,
              mx: 'auto',
              mb: 2,
              border: '3px solid #079b91',
              boxShadow: '0 8px 20px rgba(7, 155, 145, 0.2)',
            }}
          />

          <Typography variant="h6" sx={{ fontWeight: 800, color: '#0b2545', lineHeight: 1.2 }}>
            {doctor.name}
          </Typography>
          <Typography variant="body2" sx={{ color: '#079b91', fontWeight: 600, mt: 0.5 }}>
            {doctor.specialty}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1.5 }}>
            {doctor.qualification} • {doctor.location}
          </Typography>

          <Chip
            icon={<VerifiedIcon sx={{ fontSize: '16px !important', color: '#079b91' }} />}
            label="Verified Specialist"
            size="small"
            sx={{ bgcolor: '#e1f5f4', color: '#079b91', fontWeight: 700, mb: 1 }}
          />

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.8, textAlign: 'left' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <SecurityIcon sx={{ color: '#079b91', fontSize: 22 }} />
              <Typography variant="caption" sx={{ color: '#475569', fontWeight: 600 }}>
                100% Verified Slots & Instant Confirmation
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <CalendarMonthIcon sx={{ color: '#079b91', fontSize: 22 }} />
              <Typography variant="caption" sx={{ color: '#475569', fontWeight: 600 }}>
                Flexible Rescheduling Available
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <MedicalServicesOutlinedIcon sx={{ color: '#079b91', fontSize: 22 }} />
              <Typography variant="caption" sx={{ color: '#475569', fontWeight: 600 }}>
                Fee: <b>PKR {doctor.fee.toLocaleString()}</b>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </motion.div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Paper
          elevation={0}
          sx={{
            mt: 2.5,
            p: 2,
            borderRadius: '16px',
            bgcolor: '#0b2545',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Box sx={{ bgcolor: 'rgba(7, 155, 145, 0.2)', p: 1, borderRadius: '10px' }}>
            <AutoAwesomeIcon sx={{ color: '#079b91' }} />
          </Box>
          <Box>
            <Typography variant="caption" sx={{ display: 'block', color: 'rgba(255,255,255,0.7)' }}>
              HealthConnect Guarantee
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700 }}>
              Zero waiting time at clinic
            </Typography>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
}

// --- MAIN APPOINTMENT BOOKING CONTENT ---
function AppointmentBookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // DYNAMICALLY FETCHES WHICHEVER DOCTOR USER CLICKED
  const doctor = {
    id: searchParams.get('id') || '1',
    name: searchParams.get('name') || 'Dr. Selected Specialist',
    qualification: searchParams.get('qualification') || 'MBBS, Specialist',
    specialty: searchParams.get('specialty') || 'General Physician',
    fee: Number(searchParams.get('fee')) || 1500,
    rating: searchParams.get('rating') || '4.8',
    reviews: searchParams.get('reviews') || '100',
    location: searchParams.get('location') || 'Main Clinic, Lahore',
    image: searchParams.get('image') || 'https://i.pravatar.cc/150?img=47',
  };

  const [activeStep, setActiveStep] = useState(0);
  const [visitType, setVisitType] = useState('In-Person Visit');
  const [selectedDate, setSelectedDate] = useState('Tue, Apr 29, 2026');
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    additionalInfo: '',
    agreed: true,
  });

  const [errors, setErrors] = useState({ email: '', phone: '', fullName: '' });

  const handleNext = () => {
    if (activeStep === 2) {
      let nameErr = !formData.fullName ? 'Full name is required.' : '';
      let emailErr = !formData.email.includes('@') ? 'Valid email address is required.' : '';
      let phoneErr = !formData.phone ? 'Phone number is required.' : '';

      if (nameErr || emailErr || phoneErr) {
        setErrors({ fullName: nameErr, email: emailErr, phone: phoneErr });
        return;
      }
      setErrors({ fullName: '', email: '', phone: '' });
    }

    if (activeStep === 3) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setActiveStep((prev) => prev + 1);
      }, 1500);
      return;
    }

    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  return (
    <Box sx={{ bgcolor: '#f4f7f6', minHeight: '100vh', pb: 6 }}>
      {/* AAPKA APNA IMPORTED NAVBAR */}
      <Navbar />

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
          sx={{
            mb: 2,
            color: '#64748b',
            textTransform: 'none',
            fontWeight: 700,
            '&:hover': { bgcolor: 'transparent', color: '#079b91' },
          }}
        >
          Back to Doctors List
        </Button>

        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: '20px',
            bgcolor: '#ffffff',
            border: '1px solid #e2e8f0',
          }}
        >
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Paper>

        <Grid container spacing={4} sx={{ alignItems: 'flex-start' }}>
          {/* LEFT FORM SECTION */}
          <Grid size={{ xs: 12, md: 7, lg: 8 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.25 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 3, sm: 4 },
                    borderRadius: '24px',
                    bgcolor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                  }}
                >
                  {/* STEP 0: VISIT TYPE */}
                  {activeStep === 0 && (
                    <Box>
                      <Typography variant="h5" sx={{ fontWeight: 800, color: '#0b2545', mb: 0.5 }}>
                        Book Appointment with {doctor.name}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
                        Select your preferred mode of consultation below.
                      </Typography>

                      <Grid container spacing={2.5} sx={{ mb: 4 }}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <Card
                            elevation={0}
                            onClick={() => setVisitType('In-Person Visit')}
                            sx={{
                              p: 3,
                              height: '100%',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'space-between',
                              cursor: 'pointer',
                              borderRadius: '16px',
                              border: visitType === 'In-Person Visit' ? '2px solid #079b91' : '1px solid #e2e8f0',
                              bgcolor: visitType === 'In-Person Visit' ? '#f0f9f8' : '#ffffff',
                              transition: 'all 0.2s ease',
                            }}
                          >
                            <Box>
                              <LocalHospitalIcon sx={{ fontSize: 36, color: '#079b91', mb: 1.5 }} />
                              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0b2545' }}>
                                In-Person Visit
                              </Typography>
                              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                                Visit clinic at {doctor.location}
                              </Typography>
                            </Box>
                            <Box sx={{ mt: 2 }}>
                              <Chip label="✔ Recommended" size="small" sx={{ bgcolor: '#e1f5f4', color: '#079b91', fontWeight: 700 }} />
                            </Box>
                          </Card>
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                          <Card
                            elevation={0}
                            onClick={() => setVisitType('Online Consultation')}
                            sx={{
                              p: 3,
                              height: '100%',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'space-between',
                              cursor: 'pointer',
                              borderRadius: '16px',
                              border: visitType === 'Online Consultation' ? '2px solid #079b91' : '1px solid #e2e8f0',
                              bgcolor: visitType === 'Online Consultation' ? '#f0f9f8' : '#ffffff',
                              transition: 'all 0.2s ease',
                            }}
                          >
                            <Box>
                              <EventIcon sx={{ fontSize: 36, color: '#079b91', mb: 1.5 }} />
                              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0b2545' }}>
                                Online Consultation
                              </Typography>
                              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                                HD Video Call with {doctor.name}
                              </Typography>
                            </Box>
                            <Box sx={{ mt: 2 }}>
                              <Chip label="Instant Access" size="small" sx={{ bgcolor: '#f1f5f9', color: '#475569', fontWeight: 600 }} />
                            </Box>
                          </Card>
                        </Grid>
                      </Grid>

                      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                          variant="contained"
                          onClick={handleNext}
                          sx={{ borderRadius: '10px', px: 4, py: 1.2, bgcolor: '#079b91', fontWeight: 700, '&:hover': { bgcolor: '#056f67' } }}
                        >
                          Continue →
                        </Button>
                      </Box>
                    </Box>
                  )}

                  {/* STEP 1: DATE & TIME */}
                  {activeStep === 1 && (
                    <Box>
                      <Typography variant="h5" sx={{ fontWeight: 800, color: '#0b2545', mb: 0.5 }}>
                        Select Date & Time Slot
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
                        Available timing slots for {doctor.name}
                      </Typography>

                      <Grid container spacing={3}>
                        <Grid size={{ xs: 12, sm: 7 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: '#0b2545' }}>
                            Selected Date
                          </Typography>
                          <Paper variant="outlined" sx={{ p: 3, borderRadius: '12px', textAlign: 'center', bgcolor: '#fafcfc' }}>
                            <Typography variant="body2" sx={{ py: 3, color: '#079b91', fontWeight: 700, fontSize: '16px' }}>
                              📅 {selectedDate}
                            </Typography>
                          </Paper>
                        </Grid>

                        <Grid size={{ xs: 12, sm: 5 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: '#0b2545' }}>
                            Available Times
                          </Typography>
                          <Grid container spacing={1}>
                            {['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'].map((time) => (
                              <Grid size={{ xs: 6 }} key={time}>
                                <Button
                                  fullWidth
                                  variant={selectedTime === time ? 'contained' : 'outlined'}
                                  onClick={() => setSelectedTime(time)}
                                  sx={{
                                    borderRadius: '8px',
                                    textTransform: 'none',
                                    fontWeight: 700,
                                    py: 0.8,
                                    bgcolor: selectedTime === time ? '#079b91' : 'transparent',
                                    color: selectedTime === time ? '#fff' : '#079b91',
                                    borderColor: '#079b91',
                                  }}
                                >
                                  {time}
                                </Button>
                              </Grid>
                            ))}
                          </Grid>
                        </Grid>
                      </Grid>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                        <Button variant="outlined" onClick={handleBack} sx={{ borderRadius: '10px', px: 4, borderColor: '#cbd5e1', color: '#64748b' }}>
                          Back
                        </Button>
                        <Button variant="contained" onClick={handleNext} sx={{ borderRadius: '10px', px: 4, bgcolor: '#079b91', fontWeight: 700, '&:hover': { bgcolor: '#056f67' } }}>
                          Continue →
                        </Button>
                      </Box>
                    </Box>
                  )}

                  {/* STEP 2: PATIENT DETAILS */}
                  {activeStep === 2 && (
                    <Box>
                      <Typography variant="h5" sx={{ fontWeight: 800, color: '#0b2545', mb: 0.5 }}>
                        Patient Details
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
                        Enter patient information for appointment records.
                      </Typography>

                      <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <TextField fullWidth label="Full Name *" value={formData.fullName} error={!!errors.fullName} helperText={errors.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} sx={inputSx} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <TextField fullWidth label="Email Address *" value={formData.email} error={!!errors.email} helperText={errors.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} sx={inputSx} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <TextField fullWidth label="Phone Number *" value={formData.phone} error={!!errors.phone} helperText={errors.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} sx={inputSx} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <TextField fullWidth type="date" label="Date of Birth *" slotProps={{ inputLabel: { shrink: true } }} value={formData.dob} onChange={(e) => setFormData({ ...formData, dob: e.target.value })} sx={inputSx} />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                          <TextField fullWidth multiline rows={3} label="Reason for Visit / Symptoms" value={formData.additionalInfo} onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })} sx={inputSx} />
                        </Grid>
                      </Grid>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                        <Button variant="outlined" onClick={handleBack} sx={{ borderRadius: '10px', px: 4, borderColor: '#cbd5e1', color: '#64748b' }}>
                          Back
                        </Button>
                        <Button variant="contained" onClick={handleNext} sx={{ borderRadius: '10px', px: 4, bgcolor: '#079b91', fontWeight: 700, '&:hover': { bgcolor: '#056f67' } }}>
                          Continue →
                        </Button>
                      </Box>
                    </Box>
                  )}

                  {/* STEP 3: REVIEW & CONFIRM */}
                  {activeStep === 3 && (
                    <Box>
                      {loading ? (
                        <Box sx={{ textAlign: 'center', py: 6 }}>
                          <CircularProgress size={50} sx={{ mb: 2, color: '#079b91' }} />
                          <Typography variant="h6" sx={{ fontWeight: 800, color: '#0b2545' }}>
                            Confirming slot with {doctor.name}...
                          </Typography>
                        </Box>
                      ) : (
                        <Box>
                          <Typography variant="h5" sx={{ fontWeight: 800, color: '#0b2545', mb: 2 }}>
                            Review Appointment Details
                          </Typography>

                          <Card variant="outlined" sx={{ p: 2.5, borderRadius: '12px', mb: 3, bgcolor: '#fafcfc', borderColor: '#e2e8f0' }}>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>Doctor</Typography>
                            <Typography variant="body1" sx={{ fontWeight: 700, color: '#0b2545', mb: 1 }}>{doctor.name} ({doctor.specialty})</Typography>

                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>Schedule</Typography>
                            <Typography variant="body1" sx={{ fontWeight: 700, color: '#0b2545', mb: 1 }}>{selectedDate} at {selectedTime} ({visitType})</Typography>

                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>Consultation Fee</Typography>
                            <Typography variant="h6" sx={{ fontWeight: 800, color: '#079b91' }}>PKR {doctor.fee.toLocaleString()}</Typography>
                          </Card>

                          <FormControlLabel
                            control={<Checkbox checked={formData.agreed} onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })} />}
                            label={<Typography variant="body2">I confirm that all details are accurate.</Typography>}
                            sx={{ mb: 3 }}
                          />

                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button variant="outlined" onClick={handleBack} sx={{ borderRadius: '10px', px: 4, borderColor: '#cbd5e1', color: '#64748b' }}>
                              Back
                            </Button>
                            <Button variant="contained" onClick={handleNext} sx={{ borderRadius: '10px', px: 4, bgcolor: '#079b91', fontWeight: 700, '&:hover': { bgcolor: '#056f67' } }}>
                              Confirm & Book
                            </Button>
                          </Box>
                        </Box>
                      )}
                    </Box>
                  )}

                  {/* STEP 4: CONFIRMATION SUCCESS */}
                  {activeStep === 4 && (
                    <Box sx={{ textAlign: 'center', py: 3 }}>
                      <CheckCircleIcon sx={{ fontSize: 70, color: '#079b91', mb: 1 }} />
                      <Typography variant="h4" sx={{ fontWeight: 800, color: '#0b2545', mb: 1 }}>
                        Appointment Confirmed!
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4, maxWidth: '420px', mx: 'auto' }}>
                        Your appointment with <b>{doctor.name}</b> has been successfully booked for <b>{selectedDate} ({selectedTime})</b>.
                      </Typography>

                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                        <Button variant="contained" sx={{ borderRadius: '10px', px: 3, bgcolor: '#079b91', fontWeight: 700, '&:hover': { bgcolor: '#056f67' } }}>
                          View Appointment
                        </Button>
                        <Button variant="outlined" onClick={() => router.push('/')} sx={{ borderRadius: '10px', px: 3, borderColor: '#cbd5e1', color: '#64748b' }}>
                          Back to Dashboard
                        </Button>
                      </Box>
                    </Box>
                  )}
                </Paper>
              </motion.div>
            </AnimatePresence>
          </Grid>

          {/* RIGHT SIDE FLOATING DOCTOR CARD */}
          <Grid size={{ xs: 12, md: 5, lg: 4 }}>
            <SideVisualSection doctor={doctor} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default function BookAppointmentPage() {
  return (
    <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', py: 12 }}><CircularProgress sx={{ color: '#079b91' }} /></Box>}>
      <AppointmentBookingContent />
    </Suspense>
  );
}