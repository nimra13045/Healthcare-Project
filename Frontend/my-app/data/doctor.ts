
export type Doctor = {
  id: number;
  name: string;
  specialty: string;
  qualifications: string;
  experience: number;
  fee: number;
  city: string;
  clinic: string;
  address: string;
  gender: string;
  consultationTypes: ("Physical" | "Online")[];
  availability: string;
  languages: string[];
  services: string[];
  about: string;
  image: string;
  rating: number;
  reviews: number;
};

export const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Ayesha Khan",
    specialty: "General Physician",
    qualifications: "MBBS, FCPS Medicine",
    experience: 8,
    fee: 1500,
    city: "Lahore",
    clinic: "HealthCare Medical Centre",
    address: "DHA Phase 6, Lahore",
    gender: "Female",
    consultationTypes: ["Physical", "Online"],
    availability: "Mon–Sat, 10:00 AM – 5:00 PM",
    languages: ["English", "Urdu"],
    services: ["General Checkup", "Fever & Infection", "Blood Pressure"],
    about:
      "A general physician focused on preventive care, routine checkups, and helping patients understand their health needs.",
    image: "",
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    name: "Dr. Hamza Ali",
    specialty: "Cardiologist",
    qualifications: "MBBS, FCPS Cardiology",
    experience: 10,
    fee: 2500,
    city: "Lahore",
    clinic: "Heart Care Clinic",
    address: "Johar Town, Lahore",
    gender: "Male",
    consultationTypes: ["Physical", "Online"],
    availability: "Mon–Fri, 4:00 PM – 8:00 PM",
    languages: ["English", "Urdu"],
    services: ["Heart Checkup", "Blood Pressure", "ECG Consultation"],
    about:
      "Provides consultations for heart health, cardiovascular risk assessment, and follow-up care.",
    image: "",
    rating: 4.9,
    reviews: 98,
  },
  {
    id: 3,
    name: "Dr. Sara Ahmed",
    specialty: "Dermatologist",
    qualifications: "MBBS, FCPS Dermatology",
    experience: 7,
    fee: 2000,
    city: "Lahore",
    clinic: "Skin & Care Centre",
    address: "Gulberg III, Lahore",
    gender: "Female",
    consultationTypes: ["Physical", "Online"],
    availability: "Mon–Sat, 11:00 AM – 6:00 PM",
    languages: ["English", "Urdu"],
    services: ["Acne Consultation", "Skin Conditions", "Skin Care"],
    about:
      "Offers consultations for common skin conditions and personalized skin-care guidance.",
    image: "",
    rating: 4.7,
    reviews: 86,
  },
  {
    id: 4,
    name: "Dr. Usman Tariq",
    specialty: "Orthopedic Surgeon",
    qualifications: "MBBS, FCPS Orthopedics",
    experience: 9,
    fee: 2200,
    city: "Lahore",
    clinic: "City Orthopedic Clinic",
    address: "Model Town, Lahore",
    gender: "Male",
    consultationTypes: ["Physical"],
    availability: "Mon–Fri, 2:00 PM – 7:00 PM",
    languages: ["English", "Urdu"],
    services: ["Joint Pain", "Bone Health", "Injury Consultation"],
    about:
      "Provides assessment and consultation for joint, bone, and musculoskeletal concerns.",
    image: "",
    rating: 4.8,
    reviews: 72,
  },
  {
    id: 5,
    name: "Dr. Hira Malik",
    specialty: "Gynecologist",
    qualifications: "MBBS, FCPS Obstetrics & Gynecology",
    experience: 6,
    fee: 2000,
    city: "Lahore",
    clinic: "Women's Health Clinic",
    address: "Faisal Town, Lahore",
    gender: "Female",
    consultationTypes: ["Physical", "Online"],
    availability: "Mon–Sat, 12:00 PM – 5:00 PM",
    languages: ["English", "Urdu"],
    services: ["Women's Health", "Routine Consultation", "Follow-up"],
    about:
      "Provides women's health consultations and routine reproductive health guidance.",
    image: "",
    rating: 4.8,
    reviews: 91,
  },
  {
    id: 6,
    name: "Dr. Bilal Hassan",
    specialty: "Pediatrician",
    qualifications: "MBBS, FCPS Pediatrics",
    experience: 8,
    fee: 1800,
    city: "Lahore",
    clinic: "Little Steps Clinic",
    address: "Wapda Town, Lahore",
    gender: "Male",
    consultationTypes: ["Physical", "Online"],
    availability: "Mon–Sat, 3:00 PM – 8:00 PM",
    languages: ["English", "Urdu"],
    services: ["Child Checkup", "Growth Monitoring", "Vaccination Guidance"],
    about:
      "Provides consultations focused on children's general health and development.",
    image: "",
    rating: 4.9,
    reviews: 110,
  },
  {
    id: 7,
    name: "Dr. Maryam Noor",
    specialty: "Psychologist",
    qualifications: "MS Clinical Psychology",
    experience: 5,
    fee: 1800,
    city: "Lahore",
    clinic: "Mind Wellness Centre",
    address: "Garden Town, Lahore",
    gender: "Female",
    consultationTypes: ["Physical", "Online"],
    availability: "Mon–Fri, 1:00 PM – 6:00 PM",
    languages: ["English", "Urdu"],
    services: ["Counselling", "Stress Management", "Emotional Wellbeing"],
    about:
      "Offers supportive psychological counselling and wellbeing sessions.",
    image: "",
    rating: 4.7,
    reviews: 64,
  },
  {
    id: 8,
    name: "Dr. Ahmed Raza",
    specialty: "Neurologist",
    qualifications: "MBBS, FCPS Neurology",
    experience: 11,
    fee: 2800,
    city: "Lahore",
    clinic: "Neuro Care Centre",
    address: "Shadman, Lahore",
    gender: "Male",
    consultationTypes: ["Physical", "Online"],
    availability: "Mon–Thu, 4:00 PM – 7:00 PM",
    languages: ["English", "Urdu"],
    services: ["Neurology Consultation", "Headache Assessment", "Follow-up"],
    about:
      "Provides consultations for neurological concerns and ongoing care planning.",
    image: "",
    rating: 4.8,
    reviews: 79,
  },
  {
    id: 9,
    name: "Dr. Fatima Iqbal",
    specialty: "Nutritionist",
    qualifications: "BS Human Nutrition & Dietetics",
    experience: 5,
    fee: 1500,
    city: "Lahore",
    clinic: "Healthy Living Centre",
    address: "Bahria Town, Lahore",
    gender: "Female",
    consultationTypes: ["Physical", "Online"],
    availability: "Mon–Sat, 10:00 AM – 4:00 PM",
    languages: ["English", "Urdu"],
    services: ["Nutrition Assessment", "Meal Planning", "Healthy Weight Goals"],
    about:
      "Provides nutrition consultations and practical meal-planning support based on individual needs.",
    image: "",
    rating: 4.6,
    reviews: 58,
  },
];
