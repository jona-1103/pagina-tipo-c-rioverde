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
  date: string;
}

