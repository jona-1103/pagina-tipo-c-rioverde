/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MedicalService {
  id: string;
  title: string;
  description: string;
  iconName: string;
  details: string[];
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Statistic {
  id: string;
  value: string;
  label: string;
  iconName: string;
}

export interface BlogItem {
  id: string;
  title: string;
  description: string;
  content: string;
  date: string;
  category: string;
  readTime: string;
  imageUrl: string;
}

export interface MSPManual {
  id: string;
  title: string;
  category: string;
  year: string;
  code: string;
  size: string;
  description: string;
}

export interface DownloadableDocument {
  id: string;
  title: string;
  format: string;
  size: string;
  category: string;
  description: string;
}

export interface AppointmentInput {
  fullName: string;
  dni: string; // Cédula
  email: string;
  phone: string;
  specialty: string;
  date: string;
  timeSlot: string;
  notes?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  isAnonymous: boolean;
  avatarUrl?: string;
  text: string;
  rating: number;
  location?: string;
  service?: string;
  date: string;
}

// Patient Portal Types
export interface VaccineRecord {
  id: string;
  vaccineName: string;
  targetDisease: string;
  dose: string;
  appliedDate: string;
  batchNumber: string;
  facility: string;
  status: 'Aplicada' | 'Próxima' | 'Refuerzo Pendiente';
  nextDose?: string;
}

export interface MedicalConsultation {
  id: string;
  date: string;
  specialty: string;
  doctorName: string;
  reason: string;
  vitalSigns: {
    bloodPressure?: string;
    heartRate?: string;
    temperature?: string;
    weight?: string;
    height?: string;
    bmi?: string;
  };
  diagnosisCie10: string;
  notes: string;
  treatmentPlan: string;
}

export interface PatientPrescription {
  id: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  prescribedDate: string;
  dispensedStatus: 'Entregado en Farmacia MSP' | 'Por retirar' | 'Completado';
}

export interface PatientAppointment {
  id: string;
  date: string;
  timeSlot: string;
  specialty: string;
  doctorName: string;
  room: string;
  status: 'Confirmada' | 'Realizada' | 'Reprogramada';
}

export interface PatientProfile {
  id: string;
  dni: string;
  fullName: string;
  birthDate: string;
  age: number;
  gender: string;
  bloodType: string;
  allergies: string;
  parish: string;
  phone: string;
  hcuNumber: string;
  emergencyContact: string;
  vaccines: VaccineRecord[];
  consultations: MedicalConsultation[];
  prescriptions: PatientPrescription[];
  appointments: PatientAppointment[];
}

