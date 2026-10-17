import { Doctor, Specialty, TimeSlot } from '../types';

// Helper to format date strings YYYY-MM-DD
export function getDateString(offsetDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDisplayDate(dateStr: string): string {
  const parts = dateStr.split('-');
  const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

function generateSlots(scenario: 'full' | 'mixed' | 'scarce' | 'empty'): TimeSlot[] {
  if (scenario === 'empty') return [];

  const baseSlots: { time: string; period: 'Morning' | 'Afternoon' | 'Evening'; availProp: number }[] = [
    { time: '08:30 AM', period: 'Morning', availProp: 0.8 },
    { time: '09:15 AM', period: 'Morning', availProp: 0.9 },
    { time: '10:00 AM', period: 'Morning', availProp: 0.5 },
    { time: '11:15 AM', period: 'Morning', availProp: 0.3 },
    { time: '01:30 PM', period: 'Afternoon', availProp: 0.8 },
    { time: '02:15 PM', period: 'Afternoon', availProp: 0.7 },
    { time: '03:00 PM', period: 'Afternoon', availProp: 0.4 },
    { time: '04:15 PM', period: 'Afternoon', availProp: 0.6 },
    { time: '05:30 PM', period: 'Evening', availProp: 0.7 },
    { time: '06:15 PM', period: 'Evening', availProp: 0.5 },
  ];

  return baseSlots.map((slot, index) => {
    let isAvail = true;
    if (scenario === 'scarce') {
      isAvail = index === 1 || index === 5;
    } else if (scenario === 'mixed') {
      isAvail = (index % 2 === 0) || index === 1;
    }
    return {
      id: `slot-${index}-${slot.time.replace(/[:\s]/g, '')}`,
      time: slot.time,
      period: slot.period,
      isAvailable: isAvail,
    };
  });
}

// Generate schedules for 14 days
function buildSchedules(scenario: 'full' | 'mixed' | 'scarce' | 'empty'): Record<string, TimeSlot[]> {
  const schedules: Record<string, TimeSlot[]> = {};
  for (let i = 0; i < 14; i++) {
    const dateKey = getDateString(i);
    if (scenario === 'empty' && i === 0) {
      schedules[dateKey] = [];
    } else {
      // Alternate availability patterns for realistic variation
      const dayScenario = i === 0 ? scenario : (i % 3 === 0 ? 'mixed' : (i % 4 === 0 ? 'scarce' : 'full'));
      schedules[dateKey] = generateSlots(dayScenario);
    }
  }
  return schedules;
}

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Elena Rostova',
    title: 'MD, FACC',
    specialty: 'Cardiology',
    subspecialty: 'Interventional Cardiology & Preventive Health',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600',
    rating: 4.96,
    reviewCount: 142,
    experienceYears: 14,
    availability: {
      status: 'Available Today',
      isAcceptingNewPatients: true,
      nextAvailableSlot: 'Today at 09:15 AM'
    },
    clinic: {
      name: 'Pacific Heart & Vascular Institute',
      address: '742 Evergreen Medical Way, Suite 410',
      neighborhood: 'Downtown Medical Center',
      distance: '1.2 miles away'
    },
    consultationFee: 180,
    telehealthAvailable: true,
    about: 'Dr. Elena Rostova is a board-certified cardiologist specializing in coronary artery management, lipid disorders, and non-invasive cardiovascular imaging. She believes in patient-centered preventive strategies that empower individuals with actionable lifestyle and clinical protocols.',
    education: [
      'Fellowship in Cardiovascular Disease, Johns Hopkins Hospital',
      'Internal Medicine Residency, Stanford University',
      'MD, Harvard Medical School'
    ],
    certifications: [
      'American Board of Internal Medicine: Cardiovascular Disease',
      'National Board of Echocardiography Diplomate',
      'Certified Clinical Lipidologist'
    ],
    languages: ['English', 'Spanish', 'Russian'],
    insurances: ['Blue Cross Blue Shield', 'Aetna', 'UnitedHealthcare', 'Cigna', 'Medicare'],
    schedules: buildSchedules('full')
  },
  {
    id: 'doc-2',
    name: 'Dr. Marcus Vance',
    title: 'MD, FAAD',
    specialty: 'Dermatology',
    subspecialty: 'Medical Dermatology & Skin Cancer Screening',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600',
    rating: 4.88,
    reviewCount: 98,
    experienceYears: 11,
    availability: {
      status: 'Available Today',
      isAcceptingNewPatients: true,
      nextAvailableSlot: 'Today at 10:00 AM'
    },
    clinic: {
      name: 'Vance Dermatologic Wellness',
      address: '1100 Grand Avenue, Level 3',
      neighborhood: 'Financial District',
      distance: '2.4 miles away'
    },
    consultationFee: 160,
    telehealthAvailable: true,
    about: 'Dr. Marcus Vance brings precise clinical diagnosis and compassionate care to conditions including eczema, psoriasis, acne vulgaris, and early melanoma detection. He utilizes state-of-the-art digital dermoscopy and evidence-based topical treatments.',
    education: [
      'Dermatology Residency, Columbia University Irving Medical Center',
      'Internal Medicine Internship, NY Presbyterian Hospital',
      'MD, Yale School of Medicine'
    ],
    certifications: [
      'American Board of Dermatology (Diplomate)',
      'Fellow, American Academy of Dermatology (FAAD)'
    ],
    languages: ['English', 'French'],
    insurances: ['Aetna', 'Blue Cross', 'Kaiser Permanente', 'Oscar Health'],
    schedules: buildSchedules('mixed')
  },
  {
    id: 'doc-3',
    name: 'Dr. Priya Chen-Nair',
    title: 'MD, FAAP',
    specialty: 'Pediatrics',
    subspecialty: 'General Pediatrics & Adolescent Medicine',
    imageUrl: 'https://images.unsplash.com/photo-1594824813512-87034c568ec5?auto=format&fit=crop&q=80&w=600',
    rating: 4.95,
    reviewCount: 215,
    experienceYears: 16,
    availability: {
      status: 'Available Tomorrow',
      isAcceptingNewPatients: true,
      nextAvailableSlot: 'Tomorrow at 08:30 AM'
    },
    clinic: {
      name: 'Sunflower Children’s Health Collective',
      address: '320 Laurel Street, Building B',
      neighborhood: 'Oakridge Family Center',
      distance: '3.1 miles away'
    },
    consultationFee: 140,
    telehealthAvailable: true,
    about: 'Dr. Priya Chen-Nair has devoted her career to partnering with families from newborn well-checks through adolescence. Known for her gentle demeanor and clear communication, she focuses on developmental milestones, childhood nutrition, and asthma management.',
    education: [
      'Pediatrics Residency, Boston Children’s Hospital',
      'MD, University of California, San Francisco (UCSF)'
    ],
    certifications: [
      'American Board of Pediatrics',
      'Pediatric Advanced Life Support (PALS) Instructor'
    ],
    languages: ['English', 'Hindi', 'Mandarin'],
    insurances: ['UnitedHealthcare', 'Blue Shield', 'Aetna', 'Humana', 'Medicaid'],
    schedules: buildSchedules('scarce')
  },
  {
    id: 'doc-4',
    name: 'Dr. Julian Sterling',
    title: 'MD, PhD',
    specialty: 'Neurology',
    subspecialty: 'Cognitive Neurology & Headache Disorders',
    // Note: Intentionally using a broken remote image URL to demonstrate bulletproof error handling!
    imageUrl: 'https://example-broken-domain-9941.com/images/dr-sterling-not-found.jpg',
    rating: 4.91,
    reviewCount: 84,
    experienceYears: 18,
    availability: {
      status: 'Available Today',
      isAcceptingNewPatients: true,
      nextAvailableSlot: 'Today at 01:30 PM'
    },
    clinic: {
      name: 'Northstar Neurological Center',
      address: '500 Pinecrest Boulevard, Suite 702',
      neighborhood: 'Presidio Heights',
      distance: '4.0 miles away'
    },
    consultationFee: 220,
    telehealthAvailable: false,
    about: 'Dr. Julian Sterling combines extensive clinical practice with neurological research into migraine neuropathology and cognitive longevity. He specializes in comprehensive diagnostic workups for complex headaches, tremors, and neuromuscular symptoms.',
    education: [
      'Neurology Residency, Mayo Clinic School of Graduate Medical Education',
      'PhD in Neurobiology, Oxford University',
      'MD, Johns Hopkins University School of Medicine'
    ],
    certifications: [
      'American Board of Psychiatry and Neurology',
      'UCNS Headache Medicine Subspecialty Certification'
    ],
    languages: ['English'],
    insurances: ['Medicare', 'Blue Cross Blue Shield', 'Cigna', 'Aetna'],
    schedules: buildSchedules('mixed')
  },
  {
    id: 'doc-5',
    name: 'Dr. Amara Okafor',
    title: 'MD, FAAOS',
    specialty: 'Orthopedics',
    subspecialty: 'Sports Medicine & Arthroscopic Reconstruction',
    imageUrl: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?auto=format&fit=crop&q=80&w=600',
    rating: 4.93,
    reviewCount: 167,
    experienceYears: 13,
    availability: {
      status: 'Available Today',
      isAcceptingNewPatients: true,
      nextAvailableSlot: 'Today at 02:15 PM'
    },
    clinic: {
      name: 'Apex Orthopedic & Sports Medicine',
      address: '880 Silicon Parkway, Pavillion 1',
      neighborhood: 'Tech Corridor Campus',
      distance: '1.8 miles away'
    },
    consultationFee: 195,
    telehealthAvailable: true,
    about: 'Dr. Amara Okafor is a team physician and orthopedic specialist who works with competitive athletes and active individuals of all ages. Her focus is minimally invasive knee, shoulder, and ankle restorations, as well as regenerative rehabilitation.',
    education: [
      'Orthopedic Sports Fellowship, Hospital for Special Surgery (HSS)',
      'Orthopedic Surgery Residency, Northwestern Memorial Hospital',
      'MD, University of Pennsylvania Perelman School of Medicine'
    ],
    certifications: [
      'American Board of Orthopaedic Surgery (ABOS)',
      'Subspecialty Certificate in Orthopaedic Sports Medicine'
    ],
    languages: ['English', 'Igbo'],
    insurances: ['Blue Cross', 'UnitedHealthcare', 'Aetna', 'Cigna'],
    schedules: buildSchedules('full')
  },
  {
    id: 'doc-6',
    name: 'Dr. Sarah Lin-Alvarez',
    title: 'MD',
    specialty: 'General Practice',
    subspecialty: 'Integrative Family Medicine & Preventative Care',
    imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=600',
    rating: 4.97,
    reviewCount: 310,
    experienceYears: 15,
    availability: {
      status: 'Available Today',
      isAcceptingNewPatients: true,
      nextAvailableSlot: 'Today at 08:30 AM'
    },
    clinic: {
      name: 'Harmony Family Health',
      address: '1540 Mission Creek Lane',
      neighborhood: 'Mission District',
      distance: '0.8 miles away'
    },
    consultationFee: 130,
    telehealthAvailable: true,
    about: 'Dr. Sarah Lin-Alvarez provides thorough primary care spanning annual wellness physicals, hypertension management, diabetes control, and mental health first-line therapies. Her practice emphasizes active listening and coordinated care.',
    education: [
      'Family Medicine Residency, UCSF Valley Medical Center',
      'MD, University of Washington School of Medicine'
    ],
    certifications: [
      'American Board of Family Medicine (Diplomate)',
      'Institute for Functional Medicine Certified Practitioner'
    ],
    languages: ['English', 'Spanish', 'Cantonese'],
    insurances: ['All Major Commercial Plans', 'Medicare', 'Kaiser', 'Blue Shield'],
    schedules: buildSchedules('full')
  },
  {
    id: 'doc-7',
    name: 'Dr. Tariq Al-Mansoor',
    title: 'MD',
    specialty: 'Psychiatry',
    subspecialty: 'Adult Psychiatry & Psychopharmacology',
    imageUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600',
    rating: 4.89,
    reviewCount: 112,
    experienceYears: 12,
    availability: {
      status: 'Available Tomorrow',
      isAcceptingNewPatients: true,
      nextAvailableSlot: 'Tomorrow at 11:15 AM'
    },
    clinic: {
      name: 'Equilibrium Behavioral Health',
      address: '420 Sutter Terrace, Suite 550',
      neighborhood: 'Union Square Health',
      distance: '2.0 miles away'
    },
    consultationFee: 210,
    telehealthAvailable: true,
    about: 'Dr. Tariq Al-Mansoor specializes in compassionate treatment of generalized anxiety, major depressive disorder, ADHD, and adult sleep disruptions. He pairs modern evidence-based medication management with behavioral and mindfulness interventions.',
    education: [
      'Psychiatry Residency, Stanford Hospital & Clinics',
      'MD, Baylor College of Medicine'
    ],
    certifications: [
      'American Board of Psychiatry and Neurology: General Psychiatry',
      'American Society of Clinical Psychopharmacology Member'
    ],
    languages: ['English', 'Arabic'],
    insurances: ['Aetna', 'Cigna', 'UnitedHealthcare', 'Out-of-Network Superbill'],
    schedules: buildSchedules('mixed')
  },
  {
    id: 'doc-8',
    name: 'Dr. Vivienne Zhao',
    title: 'MD, FACS',
    specialty: 'Ophthalmology',
    subspecialty: 'Cornea, Cataract & Refractive Surgery',
    imageUrl: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=600',
    rating: 4.94,
    reviewCount: 175,
    experienceYears: 17,
    availability: {
      status: 'Next Available This Week',
      isAcceptingNewPatients: true,
      nextAvailableSlot: 'Friday at 09:15 AM'
    },
    clinic: {
      name: 'ClearVision Eye Specialty Institute',
      address: '2210 Broadway Avenue, Floor 4',
      neighborhood: 'Pacific Heights',
      distance: '3.6 miles away'
    },
    consultationFee: 175,
    telehealthAvailable: false,
    about: 'Dr. Vivienne Zhao is a fellowship-trained ophthalmologist dedicated to comprehensive ocular health, advanced femtosecond laser cataract procedures, and management of dry eye syndrome and corneal diseases.',
    education: [
      'Cornea & External Disease Fellowship, Wills Eye Hospital',
      'Ophthalmology Residency, University of Michigan Kellogg Eye Center',
      'MD, Johns Hopkins University School of Medicine'
    ],
    certifications: [
      'American Board of Ophthalmology (Diplomate)',
      'Fellow, American College of Surgeons (FACS)'
    ],
    languages: ['English', 'Mandarin'],
    insurances: ['Blue Cross Blue Shield', 'Medicare', 'Aetna', 'UnitedHealthcare'],
    schedules: buildSchedules('scarce')
  },
  {
    id: 'doc-9',
    name: 'Dr. Kenneth Thorne',
    title: 'MD',
    specialty: 'Cardiology',
    subspecialty: 'Electrophysiology & Cardiac Arrhythmia',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
    rating: 4.82,
    reviewCount: 52,
    experienceYears: 22,
    availability: {
      // Intentionally fully booked to test empty slots edge case!
      status: 'Fully Booked',
      isAcceptingNewPatients: false,
      nextAvailableSlot: undefined
    },
    clinic: {
      name: 'Bay Area Rhythm & Arrhythmia Clinic',
      address: '990 Potrero Avenue, Suite 100',
      neighborhood: 'Potrero Hill',
      distance: '4.8 miles away'
    },
    consultationFee: 240,
    telehealthAvailable: false,
    about: 'Dr. Kenneth Thorne is a veteran cardiac electrophysiologist with over two decades of clinical experience in catheter ablation, pacemaker management, and complex atrial fibrillation.',
    education: [
      'Cardiac Electrophysiology Fellowship, Massachusetts General Hospital',
      'MD, Harvard Medical School'
    ],
    certifications: [
      'American Board of Internal Medicine: Clinical Cardiac Electrophysiology'
    ],
    languages: ['English'],
    insurances: ['Medicare', 'Blue Shield', 'Cigna'],
    schedules: buildSchedules('empty')
  }
];

export const SPECIALTIES_LIST: { id: Specialty; label: string; iconName: string }[] = [
  { id: 'All', label: 'All Specialties', iconName: 'Stethoscope' },
  { id: 'Cardiology', label: 'Cardiology', iconName: 'HeartPulse' },
  { id: 'Dermatology', label: 'Dermatology', iconName: 'Sparkles' },
  { id: 'Pediatrics', label: 'Pediatrics', iconName: 'Baby' },
  { id: 'Neurology', label: 'Neurology', iconName: 'Brain' },
  { id: 'Orthopedics', label: 'Orthopedics', iconName: 'Activity' },
  { id: 'General Practice', label: 'General Practice', iconName: 'UserCheck' },
  { id: 'Psychiatry', label: 'Psychiatry', iconName: 'Smile' },
  { id: 'Ophthalmology', label: 'Ophthalmology', iconName: 'Eye' },
];
