import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { RootStackParamList, Appointment } from '../types';

interface RouteEntry {
  name: keyof RootStackParamList;
  params?: any;
}

interface NavigationContextType {
  currentRoute: keyof RootStackParamList;
  params: any;
  history: RouteEntry[];
  canGoBack: boolean;
  navigate: <T extends keyof RootStackParamList>(name: T, params?: RootStackParamList[T]) => void;
  goBack: () => void;
  popToTop: () => void;
  // Global testing toggles
  forceImageError: boolean;
  setForceImageError: (val: boolean | ((prev: boolean) => boolean)) => void;
  // Appointments state
  bookedAppointments: Appointment[];
  addAppointment: (appointment: Appointment) => void;
  cancelAppointment: (id: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<RouteEntry[]>([
    { name: 'DoctorList', params: undefined }
  ]);
  const [forceImageError, setForceImageError] = useState(false);
  const [bookedAppointments, setBookedAppointments] = useState<Appointment[]>([]);

  const currentEntry = history[history.length - 1];

  const navigate = useCallback(<T extends keyof RootStackParamList>(name: T, params?: RootStackParamList[T]) => {
    setHistory(prev => [...prev, { name, params }]);
  }, []);

  const goBack = useCallback(() => {
    setHistory(prev => (prev.length > 1 ? prev.slice(0, -1) : prev));
  }, []);

  const popToTop = useCallback(() => {
    setHistory([{ name: 'DoctorList', params: undefined }]);
  }, []);

  const addAppointment = useCallback((appointment: Appointment) => {
    setBookedAppointments(prev => [appointment, ...prev]);
  }, []);

  const cancelAppointment = useCallback((id: string) => {
    setBookedAppointments(prev =>
      prev.map(item => item.id === id ? { ...item, status: 'cancelled' as const } : item)
    );
  }, []);

  return (
    <NavigationContext.Provider
      value={{
        currentRoute: currentEntry.name,
        params: currentEntry.params || {},
        history,
        canGoBack: history.length > 1,
        navigate,
        goBack,
        popToTop,
        forceImageError,
        setForceImageError,
        bookedAppointments,
        addAppointment,
        cancelAppointment,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

export const useRoute = <T extends keyof RootStackParamList>() => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useRoute must be used within a NavigationProvider');
  }
  return {
    name: context.currentRoute as T,
    params: context.params as RootStackParamList[T],
  };
};
