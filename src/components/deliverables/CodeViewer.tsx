import React, { useState } from 'react';
import { Copy, Check, FileCode, Download } from 'lucide-react';

interface CodeSnippet {
  id: string;
  filename: string;
  description: string;
  language: string;
  code: string;
}

export const CodeViewer: React.FC = () => {
  const [activeFileId, setActiveFileId] = useState<string>('doctor-list-screen');
  const [copied, setCopied] = useState<boolean>(false);

  const files: CodeSnippet[] = [
    {
      id: 'doctor-list-screen',
      filename: 'src/screens/DoctorDirectoryScreen.tsx',
      description: 'React Native Doctor Directory screen implementing FlatList, search by name, specialty filtering, and image fallback',
      language: 'typescript',
      code: `import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Doctor, Specialty } from '../types';
import { DoctorCard } from '../components/DoctorCard';
import { SpecialtyFilter } from '../components/SpecialtyFilter';
import { MOCK_DOCTORS } from '../data/mockDoctors';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'DoctorDirectory'>;

export const DoctorDirectoryScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty>('All');
  const [refreshing, setRefreshing] = useState(false);

  // Combined search and specialty filtering
  const filteredDoctors = useMemo(() => {
    return MOCK_DOCTORS.filter((doctor) => {
      const matchesSearch = doctor.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase().trim());
      const matchesSpecialty =
        selectedSpecialty === 'All' || doctor.specialty === selectedSpecialty;
      return matchesSearch && matchesSpecialty;
    });
  }, [searchQuery, selectedSpecialty]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate re-fetching doctor list
    setTimeout(() => {
      setRefreshing(false);
    }, 800);
  }, []);

  const handleDoctorPress = useCallback((doctor: Doctor) => {
    navigation.navigate('DoctorProfile', { doctorId: doctor.id });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Search Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Physician Directory</Text>
        <Text style={styles.headerSubtitle}>Discover specialists & schedule care</Text>
        
        {/* Name Search Input */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by doctor name..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
            clearButtonMode="while-editing"
            autoCorrect={false}
          />
        </View>

        {/* Specialty Filter Horizontal Strip */}
        <SpecialtyFilter
          selectedSpecialty={selectedSpecialty}
          onSelectSpecialty={setSelectedSpecialty}
        />
      </View>

      {/* FlatList of Reusable Doctor Cards */}
      <FlatList<Doctor>
        data={filteredDoctors}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DoctorCard doctor={item} onPress={() => handleDoctorPress(item)} />
        )}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#0F766E" />
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No Physicians Found</Text>
            <Text style={styles.emptyText}>
              No doctors match "{searchQuery}" in {selectedSpecialty}.
            </Text>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={() => {
                setSearchQuery('');
                setSelectedSpecialty('All');
              }}
            >
              <Text style={styles.resetButtonText}>Reset Filters</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { backgroundColor: '#FFFFFF', paddingHorizontal: 16, paddingTop: 12, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#0F172A' },
  headerSubtitle: { fontSize: 12, color: '#64748B', marginTop: 2, marginBottom: 12 },
  searchContainer: { marginBottom: 12 },
  searchInput: { height: 44, backgroundColor: '#F1F5F9', borderRadius: 12, paddingHorizontal: 14, fontSize: 14, color: '#0F172A', borderWidth: 1, borderColor: '#E2E8F0' },
  listContent: { padding: 16, flexGrow: 1 },
  separator: { height: 12 },
  emptyContainer: { alignItems: 'center', justifyContent: 'center', paddingVertical: 48, paddingHorizontal: 24 },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: '#0F172A' },
  emptyText: { fontSize: 13, color: '#64748B', textAlign: 'center', marginTop: 6, marginBottom: 16 },
  resetButton: { backgroundColor: '#0F766E', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10 },
  resetButtonText: { color: '#FFFFFF', fontSize: 13, fontWeight: '600' }
});`
    },
    {
      id: 'doctor-profile-screen',
      filename: 'src/screens/DoctorProfileScreen.tsx',
      description: 'Doctor Profile screen displaying doctor details, credentials, address, and booking button with navigation parameters',
      language: 'typescript',
      code: `import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { MOCK_DOCTORS } from '../data/mockDoctors';
import { AvatarWithFallback } from '../components/AvatarWithFallback';

type ProfileRouteProp = RouteProp<RootStackParamList, 'DoctorProfile'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'DoctorProfile'>;

export const DoctorProfileScreen: React.FC = () => {
  const route = useRoute<ProfileRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { doctorId } = route.params;

  const doctor = MOCK_DOCTORS.find((d) => d.id === doctorId);

  if (!doctor) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>Doctor details not found.</Text>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backBtnText}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const handleBookPress = () => {
    navigation.navigate('Booking', { doctorId: doctor.id });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Doctor Header */}
        <View style={styles.heroCard}>
          <AvatarWithFallback
            uri={doctor.imageUrl}
            name={doctor.name}
            size={80}
          />
          <View style={styles.heroMeta}>
            <Text style={styles.badgeText}>{doctor.specialty.toUpperCase()}</Text>
            <Text style={styles.nameText}>{doctor.name}</Text>
            <Text style={styles.titleText}>{doctor.title}</Text>
            <Text style={styles.ratingText}>★ {doctor.rating.toFixed(2)} ({doctor.reviewCount} reviews)</Text>
          </View>
        </View>

        {/* Clinic & Location */}
        <View style={styles.card}>
          <Text style={styles.sectionHeader}>Practice Location</Text>
          <Text style={styles.clinicName}>{doctor.clinic.name}</Text>
          <Text style={styles.clinicAddress}>{doctor.clinic.address}</Text>
          <Text style={styles.clinicDistance}>{doctor.clinic.distance}</Text>
        </View>

        {/* About */}
        <View style={styles.card}>
          <Text style={styles.sectionHeader}>About Physician</Text>
          <Text style={styles.bodyText}>{doctor.about}</Text>
        </View>

        {/* Education & Certifications */}
        <View style={styles.card}>
          <Text style={styles.sectionHeader}>Education & Certifications</Text>
          {doctor.education.map((edu, idx) => (
            <Text key={idx} style={styles.bulletText}>• {edu}</Text>
          ))}
        </View>
      </ScrollView>

      {/* Sticky Bottom Booking Action */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.feeLabel}>Consultation</Text>
          <Text style={styles.feeAmount}>{"$"}{doctor.consultationFee}</Text>
        </View>
        <TouchableOpacity
          style={[styles.bookButton, doctor.availability.status === 'Fully Booked' && styles.disabledButton]}
          disabled={doctor.availability.status === 'Fully Booked'}
          onPress={handleBookPress}
        >
          <Text style={styles.bookButtonText}>
            {doctor.availability.status === 'Fully Booked' ? 'Fully Booked' : 'Book Appointment'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { padding: 16, paddingBottom: 100 },
  heroCard: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 16, flexDirection: 'row', gap: 16, alignItems: 'center', marginBottom: 16 },
  heroMeta: { flex: 1 },
  badgeText: { fontSize: 10, fontWeight: '700', color: '#0F766E', letterSpacing: 0.5 },
  nameText: { fontSize: 18, fontWeight: '700', color: '#0F172A', marginTop: 2 },
  titleText: { fontSize: 13, color: '#64748B' },
  ratingText: { fontSize: 12, color: '#B45309', fontWeight: '600', marginTop: 4 },
  card: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 16, marginBottom: 16 },
  sectionHeader: { fontSize: 14, fontWeight: '700', color: '#0F172A', marginBottom: 8 },
  clinicName: { fontSize: 14, fontWeight: '600', color: '#1E293B' },
  clinicAddress: { fontSize: 12, color: '#64748B', marginTop: 2 },
  clinicDistance: { fontSize: 12, color: '#0F766E', fontWeight: '500', marginTop: 4 },
  bodyText: { fontSize: 13, color: '#475569', lineHeight: 20 },
  bulletText: { fontSize: 12, color: '#475569', lineHeight: 18, marginBottom: 4 },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#FFFFFF', paddingHorizontal: 16, paddingVertical: 14, borderTopWidth: 1, borderTopColor: '#E2E8F0', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  feeLabel: { fontSize: 11, color: '#94A3B8' },
  feeAmount: { fontSize: 18, fontWeight: '700', color: '#0F172A' },
  bookButton: { backgroundColor: '#0F766E', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12 },
  disabledButton: { backgroundColor: '#CBD5E1' },
  bookButtonText: { color: '#FFFFFF', fontWeight: '600', fontSize: 14 },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: 16, color: '#64748B' },
  backBtn: { marginTop: 16, backgroundColor: '#0F766E', padding: 10, borderRadius: 8 },
  backBtnText: { color: '#FFFFFF' }
});`
    },
    {
      id: 'booking-screen',
      filename: 'src/screens/BookingScreen.tsx',
      description: 'Appointment booking flow screen with date selector, unavailable slot validation, and patient details',
      language: 'typescript',
      code: `import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Alert
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, TimeSlot } from '../types';
import { MOCK_DOCTORS, getDateString } from '../data/mockDoctors';
import { DatePicker } from '../components/DatePicker';
import { TimeSlotPicker } from '../components/TimeSlotPicker';

type BookingRouteProp = RouteProp<RootStackParamList, 'Booking'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Booking'>;

export const BookingScreen: React.FC = () => {
  const route = useRoute<BookingRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { doctorId } = route.params;

  const doctor = MOCK_DOCTORS.find((d) => d.id === doctorId);

  const [selectedDate, setSelectedDate] = useState<string>(getDateString(0));
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [patientName, setPatientName] = useState('Alex Mercer');
  const [patientEmail, setPatientEmail] = useState('alex.mercer@example.com');
  const [patientPhone, setPatientPhone] = useState('(555) 234-5678');
  const [visitType, setVisitType] = useState<'in-person' | 'telehealth'>('in-person');

  if (!doctor) return null;

  const currentSlots = doctor.schedules[selectedDate] || [];

  const handleConfirm = () => {
    if (!selectedSlot) {
      Alert.alert('Selection Required', 'Please select an available time slot.');
      return;
    }
    if (!patientName.trim()) {
      Alert.alert('Information Required', 'Please provide the patient name.');
      return;
    }

    const bookingRef = \`APT-\${Math.floor(100000 + Math.random() * 900000)}\`;

    const appointment = {
      id: String(Date.now()),
      bookingReference: bookingRef,
      doctor,
      date: selectedDate,
      displayDate: selectedDate,
      timeSlot: selectedSlot,
      visitType,
      patientName,
      patientEmail,
      patientPhone,
      reasonForVisit: 'General Consultation',
      createdAt: new Date().toISOString(),
      status: 'confirmed' as const,
      totalFee: doctor.consultationFee
    };

    // Transition to Confirmation Screen
    navigation.navigate('Confirmation', { appointment });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Date Selection */}
        <DatePicker
          selectedDate={selectedDate}
          onSelectDate={(d) => {
            setSelectedDate(d);
            setSelectedSlot(null);
          }}
          doctor={doctor}
        />

        {/* Time Slot Picker with Disabled Slots */}
        <TimeSlotPicker
          slots={currentSlots}
          selectedSlotId={selectedSlot?.id || null}
          onSelectSlot={(slot) => {
            // Prevent selection of unavailable slots
            if (slot.isAvailable) {
              setSelectedSlot(slot);
            }
          }}
        />

        {/* Patient Details */}
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Patient Details</Text>
          <TextInput
            style={styles.input}
            placeholder="Full Name *"
            value={patientName}
            onChangeText={setPatientName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email *"
            keyboardType="email-address"
            value={patientEmail}
            onChangeText={setPatientEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={patientPhone}
            onChangeText={setPatientPhone}
          />
        </View>
      </ScrollView>

      {/* Confirm Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.confirmBtn, !selectedSlot && styles.disabledBtn]}
          disabled={!selectedSlot}
          onPress={handleConfirm}
        >
          <Text style={styles.confirmBtnText}>
            {selectedSlot ? 'Confirm & Book Appointment' : 'Select Time Slot to Continue'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { padding: 16, paddingBottom: 90 },
  formCard: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 16, marginTop: 16 },
  formTitle: { fontSize: 14, fontWeight: '700', color: '#0F172A', marginBottom: 12 },
  input: { height: 42, borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 10, paddingHorizontal: 12, marginBottom: 10, fontSize: 13, backgroundColor: '#F8FAFC' },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#FFFFFF', padding: 16, borderTopWidth: 1, borderTopColor: '#E2E8F0' },
  confirmBtn: { backgroundColor: '#0F766E', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  disabledBtn: { backgroundColor: '#CBD5E1' },
  confirmBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 14 }
});`
    },
    {
      id: 'doctor-card-component',
      filename: 'src/components/DoctorCard.tsx',
      description: 'Reusable doctor card component with remote image fallback, specialty, and availability badge',
      language: 'typescript',
      code: `import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Doctor } from '../types';
import { AvatarWithFallback } from './AvatarWithFallback';

interface Props {
  doctor: Doctor;
  onPress: () => void;
}

export const DoctorCard: React.FC<Props> = ({ doctor, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.row}>
        {/* Remote Profile Image with Initials Fallback */}
        <AvatarWithFallback
          uri={doctor.imageUrl}
          name={doctor.name}
          size={56}
        />

        <View style={styles.info}>
          <View style={styles.titleRow}>
            <Text style={styles.name}>{doctor.name}</Text>
            <Text style={styles.fee}>{"$"}{doctor.consultationFee}</Text>
          </View>
          <Text style={styles.specialty}>{doctor.specialty} · {doctor.title}</Text>
          <Text style={styles.clinic}>{doctor.clinic.neighborhood} · {doctor.clinic.distance}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.bottomRow}>
        <View style={[styles.badge, doctor.availability.status === 'Fully Booked' ? styles.badgeBooked : styles.badgeAvail]}>
          <Text style={[styles.badgeText, doctor.availability.status === 'Fully Booked' ? styles.badgeTextBooked : styles.badgeTextAvail]}>
            {doctor.availability.status}
          </Text>
        </View>
        <Text style={styles.nextSlotText}>
          {doctor.availability.nextAvailableSlot || 'Contact Clinic'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 14, borderWidth: 1, borderColor: '#E2E8F0' },
  row: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  info: { flex: 1 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 15, fontWeight: '700', color: '#0F172A' },
  fee: { fontSize: 14, fontWeight: '700', color: '#0F766E' },
  specialty: { fontSize: 12, color: '#64748B', marginTop: 2 },
  clinic: { fontSize: 11, color: '#94A3B8', marginTop: 2 },
  divider: { height: 1, backgroundColor: '#F1F5F9', marginVertical: 10 },
  bottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  badgeAvail: { backgroundColor: '#ECFDF5' },
  badgeBooked: { backgroundColor: '#F1F5F9' },
  badgeText: { fontSize: 11, fontWeight: '600' },
  badgeTextAvail: { color: '#047857' },
  badgeTextBooked: { color: '#64748B' },
  nextSlotText: { fontSize: 11, color: '#64748B' }
});`
    },
    {
      id: 'avatar-component',
      filename: 'src/components/AvatarWithFallback.tsx',
      description: 'Handles remote image loading state, network errors, and initials fallback',
      language: 'typescript',
      code: `import React, { useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';

interface Props {
  uri: string;
  name: string;
  size?: number;
}

export const AvatarWithFallback: React.FC<Props> = ({ uri, name, size = 56 }) => {
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const getInitials = (fullName: string) => {
    const cleaned = fullName.replace(/^(Dr\.|Doctor|MD)\s*/i, '').trim();
    const parts = cleaned.split(' ');
    return parts.length >= 2
      ? \`\${parts[0][0]}\${parts[parts.length - 1][0]}\`.toUpperCase()
      : cleaned.slice(0, 2).toUpperCase();
  };

  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size / 3 }]}>
      {loading && !hasError && (
        <View style={StyleSheet.absoluteFill}>
          <ActivityIndicator size="small" color="#0F766E" style={styles.loader} />
        </View>
      )}

      {!hasError ? (
        <Image
          source={{ uri }}
          style={[styles.image, { width: size, height: size, borderRadius: size / 3 }]}
          onLoadEnd={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setHasError(true);
          }}
        />
      ) : (
        <View style={[styles.fallback, { width: size, height: size, borderRadius: size / 3 }]}>
          <Text style={styles.initialsText}>{getInitials(name)}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#E2E8F0', overflow: 'hidden', justifyContent: 'center', alignItems: 'center' },
  image: { resizeMode: 'cover' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  fallback: { backgroundColor: '#0F766E', justifyContent: 'center', alignItems: 'center' },
  initialsText: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 }
});`
    }
  ];

  const currentFile = files.find(f => f.id === activeFileId) || files[0];

  const handleCopy = () => {
    navigator.clipboard?.writeText(currentFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Overview Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold tracking-wider uppercase text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md">
              Clean React Native Architecture
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-2">
              Deliverable Source Code
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Production-ready TypeScript components and screens built with React Native primitives (FlatList, Navigation, SafeAreas, Stylesheet).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied File' : 'Copy Source'}</span>
            </button>
          </div>
        </div>

        {/* File Tabs */}
        <div className="flex items-center gap-2 mt-5 pt-4 border-t border-slate-100 overflow-x-auto no-scrollbar">
          {files.map((file) => (
            <button
              key={file.id}
              onClick={() => setActiveFileId(file.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                activeFileId === file.id
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>{file.filename.split('/').pop()}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Code Display Frame */}
      <div className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-md">
        <div className="flex items-center justify-between px-5 py-3 bg-slate-950 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <span className="text-xs font-mono text-slate-400 ml-2 font-medium">{currentFile.filename}</span>
          </div>
          <span className="text-[11px] font-mono text-teal-400 font-semibold">{currentFile.language}</span>
        </div>

        <div className="p-4 bg-slate-950/40 border-b border-slate-800 text-xs text-slate-400">
          {currentFile.description}
        </div>

        <pre className="p-5 overflow-x-auto text-xs font-mono leading-relaxed text-slate-200 select-text max-h-[560px] no-scrollbar">
          <code>{currentFile.code}</code>
        </pre>
      </div>
    </div>
  );
};
