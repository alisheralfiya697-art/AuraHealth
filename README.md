# Question 2: Doctor Directory and Appointment Booking

**AuraHealth** is a polished, modern, and accessible React Native application feature for discovering specialized physicians, filtering by specialty and name, viewing detailed provider profiles, and booking verified appointments.

---

## 1. How to Run the Application

### Option A: Web Interactive Simulator (Live Development Mode)
The repository includes a responsive mobile simulator embedded inside Vite + React with full gesture, animation, and device shell support:
```bash
# Install dependencies
npm install

# Launch development preview server
npm run dev
```
Open `http://localhost:3000` in your browser. You can test the application in the iPhone 16 Pro device frame or switch to the fluid responsive layout.

### Option B: Pure React Native / Expo CLI
To run this feature in a standalone Expo / React Native environment:
```bash
# 1. Create a fresh TypeScript Expo app
npx create-expo-app AuraHealthApp --template blank-typescript
cd AuraHealthApp

# 2. Install React Navigation dependencies
npm install @react-navigation/native @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context

# 3. Copy source files from the "Source Code" tab:
# - src/screens/DoctorDirectoryScreen.tsx
# - src/screens/DoctorProfileScreen.tsx
# - src/screens/BookingScreen.tsx
# - src/screens/ConfirmationScreen.tsx
# - src/components/DoctorCard.tsx
# - src/components/AvatarWithFallback.tsx
# - src/components/TimeSlotPicker.tsx
# - src/components/DatePicker.tsx
# - src/data/mockDoctors.ts

# 4. Start Expo
npx expo start
```

---

## 2. Feature & Flow Breakdown

### A. Doctor Directory & `FlatList`
- Doctors are rendered in a performant `FlatList` using modular, reusable `DoctorCard` components.
- Each card shows:
  - Remote physician profile photo
  - Doctor's full name, credential title (MD, FACC, FAAD, etc.)
  - Specialty & subspecialty
  - Live availability badge (`Available Today`, `Available Tomorrow`, `Next Available This Week`, `Fully Booked`)
  - Real-time rating and patient review counts
  - Clinic name, neighborhood, and geographic distance
  - Consultation fee ($USD) and direct "Book" button

### B. Search & Specialty Filters Working Together
- **Name Search**: Real-time filtering matching doctor first and last names (e.g., "Elena", "Vance", "Chen").
- **Specialty Filter**: Segmented selector covering Cardiology, Dermatology, Pediatrics, Neurology, Orthopedics, General Practice, Psychiatry, and Ophthalmology with dynamic count badges.
- **Combined Conjunctive Filtering**: Search and specialty filters operate concurrently (`matchesName && matchesSpecialty`).
- **Empty State**: When no doctors match the combined criteria, a friendly empty state is displayed with a "Reset All Filters" button.
- **Pull-To-Refresh**: Integrated pull-to-refresh control to simulate data roster updates.

### C. Remote Image Loading & Graceful Error Fallbacks
- `AvatarWithFallback` displays an animated skeleton loader while remote images are fetching.
- If a remote image fails to load or encounters a network disruption:
  - The component gracefully falls back to a clean, styled initials avatar (e.g., "ER" for Dr. Elena Rostova).
  - Out of the box, Dr. Julian Sterling uses an intentionally broken remote URL to demonstrate this fallback behavior.
  - A **"Test Fallback"** toggle in the simulator header allows testing image error degradation across all doctor cards on demand.

### D. Doctor Profile Screen
- Tapping a doctor card navigates to `DoctorProfileScreen` using React Navigation parameters (`doctorId`).
- Displays comprehensive provider information:
  - Specialty and subspecialty badges
  - Review metrics, years of clinical experience, consultation fee
  - Clinic address and neighborhood
  - Biography and clinical philosophy
  - Medical education, residencies, and fellowships
  - Board certifications
  - Spoken languages and accepted insurance networks
- Pinned bottom action bar with consultation rate and a prominent "Book Appointment" CTA button.
- Robust error handling for invalid or missing doctor IDs.

### E. Appointment Booking Flow
- Preserves selected doctor, date, and time slot throughout the entire booking flow.
- **14-Day Date Picker**: Horizontal date scroller with live availability indicator dots.
- **Time Slot Selector**: Slots are organized into Morning, Afternoon, and Evening periods.
- **Unavailable Slot Prevention**: Slots that are already booked are strictly disabled, styled with muted strike-through text and unclickable hitboxes, preventing accidental double booking.
- **Visit Type Selector**: Toggle between In-Person Clinic Visit and Telehealth Video Consultation.
- **Patient Information Form**: Patient name, email, phone number, reason for visit, and optional notes.
- Validates required selections before allowing confirmation.

### F. Booking Confirmation Screen
- Displays celebration checkmark badge and unique booking reference code (`#APT-XXXXXX`) with one-click clipboard copy.
- Displays confirmed date, time slot, session period, and doctor information.
- Shows clinic address for in-person appointments or telehealth link instructions.
- Patient contact summary and total consultation fee ($USD).
- **Add to Calendar**: Generates and downloads a standard `.ics` iCalendar file compatible with Apple Calendar, Google Calendar, and Outlook.
- **Return Path**: Prominent primary button to "Return to Doctor Directory" (`popToTop()`) and "View My Appointments".

---

## 3. Deliverable Screenshots

Visual previews and interactive demonstrations are accessible in the **"Deliverable Screenshots"** tab:
1. **Doctor List Screen**: `FlatList` with reusable cards, remote avatars, rating, and availability badges.
2. **Search and Specialty Filters**: Search by doctor name combined with specialty pills, showing matching results and empty state.
3. **Doctor Profile Screen**: Doctor details, credentials, education, certifications, and booking CTA.
4. **Booking Screen**: Date selector, time slots categorized by period with disabled booked slots, and patient form.
5. **Confirmation Screen**: Booking reference code, appointment receipt, calendar `.ics` download, and return button.

---

## 4. Note Regarding Incomplete Requirements

> **There are no incomplete requirements.**

All features specified in the challenge have been completely implemented:
- [x] Doctor directory rendered in a `FlatList` using reusable cards
- [x] Remote profile image, doctor's name, specialty, and availability displayed on each card
- [x] Search field filtering by doctor name
- [x] Specialty filter working conjunctively with search
- [x] Helpful empty state with filter reset action
- [x] Remote image loading skeleton and initials fallback for network errors
- [x] Doctor profile screen opened via navigation parameters
- [x] Full doctor information and clear appointment-booking action
- [x] Date and time slot picker with strict prevention of unavailable slot selection
- [x] Retention of selected doctor, date, and slot throughout the booking flow
- [x] Confirmation screen with booking reference, appointment details, and clear return path
- [x] Simulation using local state and modular mock data
- [x] React Navigation stack with back navigation working across all screens
- [x] All visible controls, tabs, and buttons functional
- [x] Deliverable source code, screenshots gallery, and comprehensive README documentation
