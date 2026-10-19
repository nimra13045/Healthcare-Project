"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import "./finddoctor.css";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  Pagination,
  Paper,
  Rating,
  Select,
  TextField,
  Typography,
  Alert,
} from "@mui/material";

import type { SelectChangeEvent } from "@mui/material/Select";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import WorkIcon from "@mui/icons-material/Work";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import PersonIcon from "@mui/icons-material/Person";
import { useRouter } from "next/navigation";
import { doctors as doctorData } from "@/data/doctor";
import Navbar from "@/components/layout/Navbar";


type Doctor = {
  id: number;
  name: string;
  qualification: string;
  specialty: string;
  rating: number;
  reviews: number;
  experience: number;
  fee: number;
  location: string;
  city: string;
  gender: string;
  image: string;
  online: boolean;
  inClinic: boolean;
};

// Use the shared doctor data instead of maintaining a second hardcoded list.
const doctors: Doctor[] = doctorData.map((doctor) => ({
  id: doctor.id,
  name: doctor.name,
  qualification: doctor.qualifications,
  specialty: doctor.specialty,
  rating: doctor.rating,
  reviews: doctor.reviews,
  experience: doctor.experience,
  fee: doctor.fee,
  location: doctor.address,
  city: doctor.city,
  gender: doctor.gender,
  image: doctor.image,
  online: doctor.consultationTypes.includes("Online"),
  inClinic: doctor.consultationTypes.includes("Physical"),
}));

const specialties = Array.from(
  new Set(doctorData.map((doctor) => doctor.specialty))
);

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "9px",
    backgroundColor: "#fff",
    fontSize: "13px",
    "& fieldset": {
      borderColor: "#dce8ed",
    },
    "&:hover fieldset": {
      borderColor: "#079b91",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#079b91",
    },
  },
};

function Benefit({
  icon,
  title,
  subtitle,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <Box className="benefit">
      <Box className="benefit-icon">{icon}</Box>
      <Box>
        <Typography className="benefit-title">
          {title}
        </Typography>
        <Typography className="benefit-subtitle">
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
}

function HeroSection({
  search,
  setSearch,
  specialty,
  setSpecialty,
  city,
  setCity,
  onSearch,
}: {
  search: string;
  setSearch: (value: string) => void;
  specialty: string;
  setSpecialty: (value: string) => void;
  city: string;
  setCity: (value: string) => void;
  onSearch: () => void;
}) {
  return (
    <Box className="hero">
      <Container maxWidth={false} className="hero-container">
        <Box className="hero-copy">
          <Chip
            label="Find the Right Doctor for Your Health"
            className="hero-chip"
          />

          <Typography component="h1" className="hero-title">
            Trusted Doctors. Better Health.
          </Typography>

          <Typography className="hero-description">
            Search from our healthcare professionals and find
            appointments for in-person visits or online consultations.
          </Typography>

          <Paper
            elevation={0}
            className="search-panel"
            id="doctor-search"
          >
            <TextField
              fullWidth
              placeholder="Search by doctor name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onSearch();
              }}
              sx={inputSx}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon className="teal-icon" />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <FormControl fullWidth size="small">
              <Select
                displayEmpty
                value={specialty}
                onChange={(e: SelectChangeEvent) =>
                  setSpecialty(e.target.value)
                }
                sx={inputSx}
              >
                <MenuItem value="">
                  All Specializations
                </MenuItem>
                {specialties.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth size="small">
              <Select
                displayEmpty
                value={city}
                onChange={(e: SelectChangeEvent) =>
                  setCity(e.target.value)
                }
                sx={inputSx}
              >
                <MenuItem value="">All Cities</MenuItem>
                {Array.from(new Set(doctorData.map((doctor) => doctor.city))).map(
                  (item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>

            <Button
              className="search-btn"
              onClick={onSearch}
              endIcon={<ArrowForwardIcon />}
            >
              Search Doctors
            </Button>
          </Paper>
        </Box>

        <Box className="hero-doctor">
          <Typography className="hero-handwriting">
            Your Health,
            <br />
            Our Priority
            <br />
            <span>♡</span>
          </Typography>

          <Box
            component="img"
            className="hero-doctor-image"
            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=700&q=85"
            alt="Healthcare professional"
          />
        </Box>

        <Box className="hero-benefits">
          <Benefit
            icon={<VerifiedOutlinedIcon />}
            title="Verified Doctors"
            subtitle="Background Checked"
          />
          <Benefit
            icon={<FavoriteBorderIcon />}
            title="Transparent Fees"
            subtitle="No Hidden Charges"
          />
          <Benefit
            icon={<AccessTimeOutlinedIcon />}
            title="Flexible Appointments"
            subtitle="Online & In-clinic"
          />
        </Box>
      </Container>
    </Box>
  );
}

function FilterSection({
  selectedSpecialties,
  setSelectedSpecialties,
  city,
  setCity,
  gender,
  setGender,
  consultation,
  setConsultation,
  fee,
  setFee,
  onReset,
}: {
  selectedSpecialties: string[];
  setSelectedSpecialties: (value: string[]) => void;
  city: string;
  setCity: (value: string) => void;
  gender: string;
  setGender: (value: string) => void;
  consultation: string[];
  setConsultation: (value: string[]) => void;
  fee: string;
  setFee: (value: string) => void;
  onReset: () => void;
}) {
  const [specialtySearch, setSpecialtySearch] = useState("");
  const [showMore, setShowMore] = useState(false);

  const visibleSpecialties = specialties
    .filter((item) =>
      item.toLowerCase().includes(specialtySearch.toLowerCase())
    )
    .slice(0, showMore ? specialties.length : 5);

  const toggleSpecialty = (item: string) => {
    setSelectedSpecialties(
      selectedSpecialties.includes(item)
        ? selectedSpecialties.filter((s) => s !== item)
        : [...selectedSpecialties, item]
    );
  };

  const toggleConsultation = (item: string) => {
    setConsultation(
      consultation.includes(item)
        ? consultation.filter((s) => s !== item)
        : [...consultation, item]
    );
  };

  return (
    <Paper elevation={0} className="filter-panel">
      <Box className="filter-heading">
        <Typography className="filter-title">
          <FilterAltOutlinedIcon /> Filters
        </Typography>
        <Button className="clear-btn" onClick={onReset}>
          Clear All
        </Button>
      </Box>

      <Typography className="filter-label">
        <MedicalServicesOutlinedIcon /> Specialization
      </Typography>

      <TextField
        fullWidth
        size="small"
        placeholder="Search specialization..."
        value={specialtySearch}
        onChange={(e) => setSpecialtySearch(e.target.value)}
        sx={inputSx}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          },
        }}
      />

      <Box className="checkbox-list">
        {visibleSpecialties.map((item) => (
          <Box className="checkbox-row" key={item}>
            <Checkbox
              size="small"
              checked={selectedSpecialties.includes(item)}
              onChange={() => toggleSpecialty(item)}
            />
            <Typography>{item}</Typography>
          </Box>
        ))}
      </Box>

      <Button
        className="show-more"
        onClick={() => setShowMore((previous) => !previous)}
      >
        {showMore ? "− Show less" : "+ Show more"}
      </Button>

      <Typography className="filter-label section-gap">
        City
      </Typography>

      <TextField
        select
        fullWidth
        size="small"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        sx={inputSx}
      >
        <MenuItem value="">All Cities</MenuItem>
        {Array.from(new Set(doctorData.map((doctor) => doctor.city))).map(
          (item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          )
        )}
      </TextField>

      <Typography className="filter-label section-gap">
        Gender Preference
      </Typography>

      <Box className="gender-buttons">
        {["Any", "Male", "Female"].map((item) => (
          <Button
            key={item}
            className={`gender-btn ${
              gender === item ? "selected" : ""
            }`}
            onClick={() => setGender(item)}
          >
            {item}
          </Button>
        ))}
      </Box>

      <Typography className="filter-label section-gap">
        Consultation Type
      </Typography>

      {[
        ["Online", "Online Consultation"],
        ["In-Clinic", "In-Person (Clinic Visit)"],
      ].map(([value, label]) => (
        <Box className="checkbox-row consultation-row" key={value}>
          <Checkbox
            size="small"
            checked={consultation.includes(value)}
            onChange={() => toggleConsultation(value)}
          />
          <Typography>{label}</Typography>
        </Box>
      ))}

      <Typography className="filter-label section-gap">
        Fee Range (PKR)
      </Typography>

      <TextField
        select
        fullWidth
        size="small"
        value={fee}
        onChange={(e) => setFee(e.target.value)}
        sx={inputSx}
      >
        <MenuItem value="">Any Fee</MenuItem>
        <MenuItem value="0-1499">Under PKR 1,500</MenuItem>
        <MenuItem value="1500-2500">PKR 1,500–2,500</MenuItem>
        <MenuItem value="2501-10000">Above PKR 2,500</MenuItem>
      </TextField>

      <Button
        fullWidth
        className="reset-btn"
        onClick={onReset}
        startIcon={<RestartAltIcon />}
      >
        Reset Filters
      </Button>
    </Paper>
  );
}

function DoctorCard({
  doctor,
  favorite,
  onFavorite,
  onBookClick,
}: {
  doctor: Doctor;
  favorite: boolean;
  onFavorite: (id: number) => void;
  onBookClick: (doctor: Doctor) => void;
}) {
  return (
    <Paper elevation={0} className="doctor-card">
      <Box className="doctor-photo-column">
        <Avatar
          src={doctor.image || undefined}
          alt={doctor.name}
          className="doctor-avatar"
        >
          {doctor.name
            .replace(/^Dr\\.?\\s*/i, "")
            .split(" ")
            .map((part) => part[0])
            .slice(0, 2)
            .join("")
            .toUpperCase()}
        </Avatar>
        <Chip
          icon={<VerifiedOutlinedIcon />}
          label="Verified"
          className="verified-chip"
          size="small"
        />
      </Box>

      <Box className="doctor-details">
        <Box className="doctor-card-top">
          <Box>
            <Typography className="doctor-name">
              {doctor.name}
            </Typography>
            <Typography className="doctor-qualification">
              {doctor.qualification}
            </Typography>
          </Box>

          <IconButton
            size="small"
            aria-label={
              favorite ? "Remove from favorites" : "Add to favorites"
            }
            onClick={() => onFavorite(doctor.id)}
            className="favorite-btn"
          >
            {favorite ? (
              <FavoriteIcon color="error" fontSize="small" />
            ) : (
              <FavoriteBorderIcon fontSize="small" />
            )}
          </IconButton>
        </Box>

        <Typography className="doctor-specialty">
          <MedicalServicesOutlinedIcon />
          {doctor.specialty}
        </Typography>

        <Typography className="doctor-meta">
          <StarRoundedIcon className="rating-star" />
          <b>{doctor.rating.toFixed(1)}</b>
          <span>({doctor.reviews} reviews)</span>
        </Typography>

        <Typography className="doctor-meta">
          <WorkIcon />
          {doctor.experience}+ years experience
        </Typography>

        <Typography className="doctor-meta">
          <LocationOnOutlinedIcon />
          PKR {doctor.fee.toLocaleString()} consultation fee
        </Typography>

        <Typography className="doctor-meta">
          <LocationOnOutlinedIcon />
          {doctor.location}
        </Typography>

        <Box className="consultation-options">
          {doctor.online && (
            <Typography>
              <VideoCallOutlinedIcon /> Online
            </Typography>
          )}

          {doctor.inClinic && (
            <Typography>
              <LocalHospitalOutlinedIcon /> In-Clinic
            </Typography>
          )}
        </Box>

        {/* TWO BUTTONS: View Profile & Book Appointment */}
        <Box sx={{ mt: "auto", display: "flex", flexDirection: "column", gap: 1, pt: 1 }}>
          <Button
            fullWidth
            variant="outlined"
            href={`/doctors/${doctor.id}`}
            sx={{
              borderColor: "#079b91",
              color: "#079b91",
              borderRadius: "9px",
              textTransform: "none",
              fontWeight: 700,
              fontSize: "13px",
              py: 0.8,
              "&:hover": {
                borderColor: "#056f67",
                bgcolor: "rgba(7, 155, 145, 0.04)",
              },
            }}
          >
            View Profile
          </Button>

          <Button
            fullWidth
            variant="contained"
            onClick={() => onBookClick(doctor)}
            // onClick={()=> router.push('/')}
            sx={{
              bgcolor: "#079b91",
              color: "#FFFFFF",
              borderRadius: "9px",
              textTransform: "none",
              fontWeight: 700,
              fontSize: "13px",
              py: 0.8,
              boxShadow: "none",
              "&:hover": {
                bgcolor: "#056f67",
                boxShadow: "0px 4px 12px rgba(7, 155, 145, 0.2)",
              },
            }}
          >
            Book Appointment
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

function TrustSection() {
  return (
    <Box className="trust-section" id="about">
      <Container maxWidth={false} className="trust-container">
        <Box className="trust-item">
          <Box className="trust-icon">
            <PersonIcon />
          </Box>
          <Box>
            <Typography>Trusted by Patients</Typography>
            <span>Care you can rely on</span>
          </Box>
        </Box>

        <Box className="trust-item">
          <Box className="trust-icon">
            <MedicalServicesOutlinedIcon />
          </Box>
          <Box>
            <Typography>Healthcare Professionals</Typography>
            <span>Verification is important</span>
          </Box>
        </Box>

        <Box className="trust-item">
          <Box className="trust-icon">
            <SupportAgentOutlinedIcon />
          </Box>
          <Box>
            <Typography>AI Support</Typography>
            <span>Healthcare information assistance</span>
          </Box>
        </Box>

        <Typography className="trust-handwriting">
          Better Care.
          <br />
          Together. ♡
        </Typography>
      </Container>
    </Box>
  );
}

export default function FindDoctorPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [heroSpecialty, setHeroSpecialty] = useState("");
  const [heroCity, setHeroCity] = useState("");

  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(
    []
  );
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("Any");
  const [consultation, setConsultation] = useState<string[]>([
    "Online",
    "In-Clinic",
  ]);
  const [fee, setFee] = useState("");
  const [sort, setSort] = useState("relevant");
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [mobileDrawerMode, setMobileDrawerMode] = useState<"filter" | "sort">("filter");

  // Booking & Login Check States
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [loginError, setLoginError] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [patientName, setPatientName] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [visitReason, setVisitReason] = useState("");

  const resetFilters = () => {
    setSearch("");
    setHeroSpecialty("");
    setHeroCity("");
    setSelectedSpecialties([]);
    setCity("");
    setGender("Any");
    setConsultation(["Online", "In-Clinic"]);
    setFee("");
    setSort("relevant");
    setPage(1);
  };

  const handleBookClick = (doctor: Doctor) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      setLoginError("You must be logged in to book an appointment. Please sign in first.");
      setSelectedDoctor(doctor);
      return;
    }

    setLoginError("");
    setSelectedDoctor(doctor);
  };

  const closeBookingDialog = () => {
    setSelectedDoctor(null);
    setBookingSuccess(false);
    setLoginError("");
    setPatientName("");
    setAppointmentDate("");
    setVisitReason("");
  };

  const handleBookSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBookingSuccess(true);
  };

  const filteredDoctors = useMemo(() => {
    let result = doctors.filter((doctor) => {
      const query = search.trim().toLowerCase();

      const searchMatch =
        !query ||
        doctor.name.toLowerCase().includes(query) ||
        doctor.specialty.toLowerCase().includes(query);

      const specialtyMatch =
        selectedSpecialties.length === 0 ||
        selectedSpecialties.includes(doctor.specialty);

      const cityMatch = !city || doctor.city === city;

      const genderMatch =
        gender === "Any" || doctor.gender === gender;

      const feeMatch = (() => {
        if (!fee) return true;

        const [min, max] = fee.split("-").map(Number);
        return doctor.fee >= min && doctor.fee <= max;
      })();

      const consultationMatch =
        consultation.length === 0 ||
        (consultation.includes("Online") && doctor.online) ||
        (consultation.includes("In-Clinic") && doctor.inClinic);

      return (
        searchMatch &&
        specialtyMatch &&
        cityMatch &&
        genderMatch &&
        feeMatch &&
        consultationMatch
      );
    });

    if (sort === "rating") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    } else if (sort === "fee-low") {
      result = [...result].sort((a, b) => a.fee - b.fee);
    } else if (sort === "experience") {
      result = [...result].sort(
        (a, b) => b.experience - a.experience
      );
    }

    return result;
  }, [search, selectedSpecialties, city, gender, fee, consultation, sort]);

  const handleSearch = () => {
    setSearch((previous) => previous.trim());
    setSelectedSpecialties(heroSpecialty ? [heroSpecialty] : []);
    setCity(heroCity);
    setPage(1);
  };

  const pageSize = 9;
  const totalPages = Math.max(
    1,
    Math.ceil(filteredDoctors.length / pageSize)
  );

  const visibleDoctors = filteredDoctors.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const toggleFavorite = (id: number) => {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  return (
    <Box className="health-page">
      <Navbar />

      <HeroSection
        search={search}
        setSearch={setSearch}
        specialty={heroSpecialty}
        setSpecialty={setHeroSpecialty}
        city={heroCity}
        setCity={setHeroCity}
        onSearch={handleSearch}
      />

      <Container
        maxWidth={false}
        className="directory-container"
        id="doctors"
      >
        <Box className="directory-layout">
          {/* Desktop-only sidebar. Mobile users access these filters through the drawer below. */}
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <FilterSection
              selectedSpecialties={selectedSpecialties}
              setSelectedSpecialties={(value) => {
                setSelectedSpecialties(value);
                setPage(1);
              }}
              city={city}
              setCity={(value) => {
                setCity(value);
                setPage(1);
              }}
              gender={gender}
              setGender={(value) => {
                setGender(value);
                setPage(1);
              }}
              consultation={consultation}
              setConsultation={(value) => {
                setConsultation(value);
                setPage(1);
              }}
              fee={fee}
              setFee={(value) => {
                setFee(value);
                setPage(1);
              }}
              onReset={resetFilters}
            />
          </Box>

          <Box className="results-area">
            <Box className="results-toolbar">
              <Typography className="results-count">
                Showing{" "}
                {filteredDoctors.length > 0
                  ? (page - 1) * pageSize + 1
                  : 0}
                –
                {Math.min(page * pageSize, filteredDoctors.length)} of{" "}
                {filteredDoctors.length} doctors
              </Typography>

              <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1, width: { xs: "100%", sm: "auto" } }}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<FilterAltOutlinedIcon />}
                  onClick={() => {
                    setMobileDrawerMode("filter");
                    setMobileDrawerOpen(true);
                  }}
                  sx={{ borderColor: "#079b91", color: "#079b91", textTransform: "none", borderRadius: "9px" }}
                >
                  Filters
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<RestartAltIcon />}
                  onClick={() => {
                    setMobileDrawerMode("sort");
                    setMobileDrawerOpen(true);
                  }}
                  sx={{ borderColor: "#079b91", color: "#079b91", textTransform: "none", borderRadius: "9px" }}
                >
                  Sort By
                </Button>
              </Box>

              <Box className="sort-control" sx={{ display: { xs: "none", md: "flex" } }}>
                <Typography>Sort by:</Typography>
                <FormControl size="small">
                  <Select
                    value={sort}
                    onChange={(e: SelectChangeEvent) => {
                      setSort(e.target.value);
                      setPage(1);
                    }}
                    sx={{ minWidth: 145, fontSize: 12 }}
                  >
                    <MenuItem value="relevant">Most Relevant</MenuItem>
                    <MenuItem value="rating">Highest Rated</MenuItem>
                    <MenuItem value="fee-low">Lowest Fee</MenuItem>
                    <MenuItem value="experience">Most Experienced</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            {visibleDoctors.length > 0 ? (
              <Box className="doctor-grid">
                {visibleDoctors.map((doctor) => (
                  <DoctorCard
                    key={doctor.id}
                    doctor={doctor}
                    favorite={favorites.includes(doctor.id)}
                    onFavorite={toggleFavorite}
                    onBookClick={handleBookClick}
                  />
                ))}
              </Box>
            ) : (
              <Paper className="empty-state" elevation={0}>
                <SearchIcon sx={{ fontSize: 42, color: "#079b91" }} />
                <Typography variant="h6">No doctors found</Typography>
                <Typography>
                  Try changing your search or filters.
                </Typography>
                <Button
                  className="search-btn"
                  onClick={resetFilters}
                >
                  Reset Filters
                </Button>
              </Paper>
            )}

            {filteredDoctors.length > pageSize && (
              <Box className="pagination-container">
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(_, value) => {
                    setPage(value);
                    document
                      .getElementById("doctors")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  shape="rounded"
                  color="primary"
                />
              </Box>
            )}
          </Box>
        </Box>
      </Container>

      {/* Mobile off-canvas filters and sorting */}
      <Drawer
        anchor="right"
        open={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: { xs: "min(88vw, 390px)", sm: 390 },
              p: 2,
              overflowY: "auto",
              bgcolor: "#f8fbfc",
            },
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
          <Typography sx={{ fontSize: 20, fontWeight: 800, color: "#15384B" }}>
            {mobileDrawerMode === "filter" ? "Filter Doctors" : "Sort Doctors"}
          </Typography>
          <Button onClick={() => setMobileDrawerOpen(false)} sx={{ color: "#507283", minWidth: "auto" }}>
            Close
          </Button>
        </Box>

        {mobileDrawerMode === "filter" ? (
          <FilterSection
            selectedSpecialties={selectedSpecialties}
            setSelectedSpecialties={(value) => {
              setSelectedSpecialties(value);
              setPage(1);
            }}
            city={city}
            setCity={(value) => {
              setCity(value);
              setPage(1);
            }}
            gender={gender}
            setGender={(value) => {
              setGender(value);
              setPage(1);
            }}
            consultation={consultation}
            setConsultation={(value) => {
              setConsultation(value);
              setPage(1);
            }}
            fee={fee}
            setFee={(value) => {
              setFee(value);
              setPage(1);
            }}
            onReset={() => {
              resetFilters();
              setMobileDrawerOpen(false);
            }}
          />
        ) : (
          <Paper elevation={0} sx={{ p: 2, border: "1px solid #dce8ed", borderRadius: 2 }}>
            <Typography sx={{ mb: 1.5, color: "#507283", fontSize: 13 }}>
              Choose how you want to sort the doctor list.
            </Typography>
            {[
              { value: "relevant", label: "Most Relevant" },
              { value: "rating", label: "Highest Rated" },
              { value: "fee-low", label: "Lowest Fee" },
              { value: "experience", label: "Most Experienced" },
            ].map((option) => (
              <Button
                key={option.value}
                fullWidth
                variant={sort === option.value ? "contained" : "outlined"}
                onClick={() => {
                  setSort(option.value);
                  setPage(1);
                  setMobileDrawerOpen(false);
                }}
                sx={{
                  justifyContent: "flex-start",
                  mb: 1,
                  py: 1.2,
                  borderRadius: "10px",
                  borderColor: "#079b91",
                  color: sort === option.value ? "#fff" : "#15384B",
                  bgcolor: sort === option.value ? "#079b91" : "transparent",
                  textTransform: "none",
                  "&:hover": { bgcolor: sort === option.value ? "#056f67" : "rgba(7,155,145,0.06)" },
                }}
              >
                {option.label}{sort === option.value ? "  ✓" : ""}
              </Button>
            ))}
          </Paper>
        )}
      </Drawer>

      {/* Appointment Booking Dialog with Login Check */}
      <Dialog
        open={Boolean(selectedDoctor)}
        onClose={closeBookingDialog}
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              borderRadius: "24px",
              p: { xs: 1, sm: 2 },
            },
          },
        }}
      >
        {selectedDoctor && (
          <>
         <DialogTitle component="div">
  <Typography
    variant="h5"
    sx={{ fontWeight: 800, color: "#15384B" }}
  >
    Book Appointment with {selectedDoctor.name}
  </Typography>

  <Typography
    variant="body2"
    sx={{ color: "#079b91", fontWeight: 600, mt: 0.5 }}
  >
    {selectedDoctor.specialty} • {selectedDoctor.location}
  </Typography>
</DialogTitle>

            <DialogContent>
              {loginError ? (
                <Box sx={{ my: 2 }}>
                  <Alert severity="error" sx={{ mb: 3 }}>
                    {loginError}
                  </Alert>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => router.push("/login")}
                    sx={{
                      bgcolor: "#079b91",
                      fontWeight: 700,
                      borderRadius: "12px",
                      py: 1.2,
                      "&:hover": { bgcolor: "#056f67" },
                    }}
                  >
                    Go to Login / Register
                  </Button>
                </Box>
              ) : bookingSuccess ? (
                <Alert severity="success" sx={{ my: 2 }}>
                  Demo request submitted for {selectedDoctor.name}. No
                  appointment has been saved to a database yet.
                </Alert>
              ) : (
                <Box
                  component="form"
                  onSubmit={handleBookSubmit}
                  sx={{
                    mt: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2.5,
                  }}
                >
                  <TextField
                    label="Patient Full Name"
                    fullWidth
                    required
                    value={patientName}
                    onChange={(event) => setPatientName(event.target.value)}
                  />

                  <TextField
                    label="Preferred Appointment Date & Time"
                    type="datetime-local"
                    fullWidth
                    required
                    slotProps={{ inputLabel: { shrink: true } }}
                    value={appointmentDate}
                    onChange={(event) =>
                      setAppointmentDate(event.target.value)
                    }
                  />

                  <TextField
                    label="Reason for Visit / Symptoms"
                    multiline
                    rows={3}
                    fullWidth
                    value={visitReason}
                    onChange={(event) => setVisitReason(event.target.value)}
                    placeholder="Briefly describe your reason for visiting..."
                  />

                  <DialogActions sx={{ px: 0, pt: 1 }}>
                    <Button
                      onClick={closeBookingDialog}
                      sx={{ color: "#507283", fontWeight: 600 }}
                    >
                      Cancel
                    </Button>

                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        bgcolor: "#079b91",
                        fontWeight: 700,
                        borderRadius: "12px",
                        px: 3,
                        py: 1,
                        "&:hover": { bgcolor: "#056f67" },
                      }}
                    >
                      Submit Request
                    </Button>
                  </DialogActions>
                </Box>
              )}

              {bookingSuccess && (
                <Button
                  fullWidth
                  variant="contained"
                  onClick={closeBookingDialog}
                  sx={{
                    mt: 2,
                    bgcolor: "#079b91",
                    "&:hover": { bgcolor: "#056f67" },
                  }}
                >
                  Done
                </Button>
              )}
            </DialogContent>
          </>
        )}
      </Dialog>

      <TrustSection />
    </Box>
  );
}