/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PatientProfile } from '../types';

export const DEMO_PATIENTS: PatientProfile[] = [
  {
    id: 'paciente-rosa',
    dni: '0802456789',
    fullName: 'Rosa María Estupiñán Quiñónez',
    birthDate: '14/05/1994',
    age: 32,
    gender: 'Femenino',
    bloodType: 'O Rh Positivo (O+)',
    allergies: 'Ninguna conocida (No refiere)',
    parish: 'Rioverde Centro',
    phone: '098 765 4321',
    hcuNumber: 'HCU-0802456789',
    emergencyContact: 'José Estupiñán (Esposo) - 098 112 3344',
    vaccines: [
      {
        id: 'vac-1',
        vaccineName: 'dT Adulto (Toxoide Tetánico y Diftérico)',
        targetDisease: 'Tétanos y Difteria',
        dose: '3ª Dosis (Esquema completo)',
        appliedDate: '12 de Febrero, 2026',
        batchNumber: 'DT-8942-MSP',
        facility: 'Centro de Salud Tipo C Rioverde - Vacunatorio',
        status: 'Aplicada'
      },
      {
        id: 'vac-2',
        vaccineName: 'Influenza Trivalente Estacional',
        targetDisease: 'Gripe Estacional / Influenza',
        dose: 'Dosis Anual Gestante/Puérpera',
        appliedDate: '18 de Junio, 2026',
        batchNumber: 'INF-2026-X11',
        facility: 'Centro de Salud Tipo C Rioverde - Vacunatorio',
        status: 'Aplicada',
        nextDose: 'Junio, 2027'
      },
      {
        id: 'vac-3',
        vaccineName: 'Hepatitis B Adultos',
        targetDisease: 'Hepatitis B',
        dose: '3ª Dosis',
        appliedDate: '05 de Noviembre, 2025',
        batchNumber: 'HB-7721-MSP',
        facility: 'Centro de Salud Tipo C Rioverde',
        status: 'Aplicada'
      },
      {
        id: 'vac-4',
        vaccineName: 'COVID-19 Bivalente',
        targetDisease: 'SARS-CoV-2',
        dose: 'Refuerzo Anual',
        appliedDate: '10 de Marzo, 2026',
        batchNumber: 'CV-9014-MSP',
        facility: 'Centro de Salud Tipo C Rioverde',
        status: 'Aplicada'
      },
      {
        id: 'vac-5',
        vaccineName: 'Fiebre Amarilla (Antiamarílica)',
        targetDisease: 'Fiebre Amarilla',
        dose: 'Dosis Única de por vida',
        appliedDate: '20 de Septiembre, 2018',
        batchNumber: 'FA-3310-MSP',
        facility: 'Centro de Salud Tipo C Rioverde',
        status: 'Aplicada'
      }
    ],
    consultations: [
      {
        id: 'con-1',
        date: '28 de Septiembre, 2026',
        specialty: 'Ginecología y Obstetricia',
        doctorName: 'Dra. Gabriela Ortiz - Esp. Ginecología',
        reason: 'Control postparto puerperal y asesoría en lactancia materna exclusiva.',
        vitalSigns: {
          bloodPressure: '110/70 mmHg',
          heartRate: '72 lpm',
          temperature: '36.5 °C',
          weight: '63 kg',
          height: '1.62 m',
          bmi: '24.0 kg/m² (Normal)'
        },
        diagnosisCie10: 'Z39.2 - Seguimiento postparto de rutina',
        notes: 'Paciente femenina en adecuado estado general, involución uterina normal, sin signos de alarma. Se refuerza técnica de lactancia materna a libre demanda.',
        treatmentPlan: 'Continuar con sulfato ferroso y ácido fólico por 30 días más. Cita de planificación familiar en 4 semanas.'
      },
      {
        id: 'con-2',
        date: '18 de Septiembre, 2026',
        specialty: 'Sala de Parto Humanizado',
        doctorName: 'Dr. Roberto Zambrano & Obst. Carmen Bone',
        reason: 'Atención de parto eutócico en libre posición.',
        vitalSigns: {
          bloodPressure: '115/75 mmHg',
          heartRate: '78 lpm',
          temperature: '36.7 °C',
          weight: '68 kg'
        },
        diagnosisCie10: 'O80.0 - Parto espontáneo en presentación de vértice',
        notes: 'Recién nacido vivo, sexo masculino, peso: 3.350 g, talla: 50 cm, Apgar 9/10. Apego precoz inmediato y contacto piel a piel durante los primeros 60 minutos.',
        treatmentPlan: 'Alojamiento conjunto, vacunación neonatal de BCG y Hepatitis B aplicada al recién nacido en sala.'
      },
      {
        id: 'con-3',
        date: '10 de Agosto, 2026',
        specialty: 'Odontología Preventiva',
        doctorName: 'Dr. Patricio Vera - Odontólogo',
        reason: 'Profilaxis dental y revisión de encías gestacional.',
        vitalSigns: {
          bloodPressure: '110/70 mmHg'
        },
        diagnosisCie10: 'K05.1 - Gingivitis marginal crónica gestacional',
        notes: 'Se realiza destartraje ultrasónico y topicación con flúor neutro. Se brinda educación en técnica de cepillado e hilo dental.',
        treatmentPlan: 'Colutorio de clorhexidina 0.12% por 7 días. Control en 6 meses.'
      }
    ],
    prescriptions: [
      {
        id: 'rx-1',
        medication: 'Sulfato Ferroso + Ácido Fólico (200 mg / 0.4 mg)',
        dosage: '1 tableta vía oral',
        frequency: 'Cada 24 horas en ayunas con jugo de cítricos',
        duration: '30 días',
        prescribedDate: '28 de Septiembre, 2026',
        dispensedStatus: 'Entregado en Farmacia MSP'
      },
      {
        id: 'rx-2',
        medication: 'Carbonato de Calcio + Vitamina D3 (600 mg / 400 UI)',
        dosage: '1 tableta vía oral',
        frequency: 'Cada 24 horas después del almuerzo',
        duration: '30 días',
        prescribedDate: '28 de Septiembre, 2026',
        dispensedStatus: 'Entregado en Farmacia MSP'
      },
      {
        id: 'rx-3',
        medication: 'Paracetamol 500 mg tabletas',
        dosage: '1 tableta vía oral',
        frequency: 'Cada 8 horas solo en caso de dolor moderado',
        duration: '5 días',
        prescribedDate: '18 de Septiembre, 2026',
        dispensedStatus: 'Completado'
      }
    ],
    appointments: [
      {
        id: 'app-1',
        date: '24 de Octubre, 2026',
        timeSlot: '09:30 AM',
        specialty: 'Control de Crecimiento y Desarrollo (Pediatría)',
        doctorName: 'Dra. María Elena Solís - Pediatra',
        room: 'Consultorio 4 (Área Materno Infantil)',
        status: 'Confirmada'
      },
      {
        id: 'app-2',
        date: '05 de Noviembre, 2026',
        timeSlot: '11:00 AM',
        specialty: 'Planificación Familiar y Ginecología',
        doctorName: 'Dra. Gabriela Ortiz',
        room: 'Consultorio 2',
        status: 'Confirmada'
      }
    ]
  },
  {
    id: 'paciente-carlos',
    dni: '0801934521',
    fullName: 'Don Carlos Julio Mina Angulo',
    birthDate: '08/11/1959',
    age: 66,
    gender: 'Masculino',
    bloodType: 'A Rh Positivo (A+)',
    allergies: 'Alérgico a la Penicilina y derivados',
    parish: 'Rocafuerte',
    phone: '099 321 6549',
    hcuNumber: 'HCU-0801934521',
    emergencyContact: 'Teresa Mina (Hija) - 099 876 5432',
    vaccines: [
      {
        id: 'vac-c1',
        vaccineName: 'Neumococo Polisacárida (23-Valente)',
        targetDisease: 'Neumonía por Neumococo',
        dose: 'Dosis Adulto Mayor',
        appliedDate: '14 de Mayo, 2025',
        batchNumber: 'PNE-4421-MSP',
        facility: 'Centro de Salud Tipo C Rioverde',
        status: 'Aplicada',
        nextDose: 'Mayo, 2030 (Refuerzo quinquenal)'
      },
      {
        id: 'vac-c2',
        vaccineName: 'Influenza Estacional Adultos Mayores',
        targetDisease: 'Influenza / Gripe',
        dose: 'Campaña Anual 2026',
        appliedDate: '02 de Abril, 2026',
        batchNumber: 'FLU-6602-MSP',
        facility: 'Centro de Salud Tipo C Rioverde - Brigada Rocafuerte',
        status: 'Aplicada',
        nextDose: 'Abril, 2027'
      },
      {
        id: 'vac-c3',
        vaccineName: 'dT Adulto (Tétanos y Difteria)',
        targetDisease: 'Tétanos',
        dose: 'Refuerzo de 10 años',
        appliedDate: '11 de Octubre, 2021',
        batchNumber: 'TT-1189-MSP',
        facility: 'Centro de Salud Tipo C Rioverde',
        status: 'Aplicada',
        nextDose: 'Octubre, 2031'
      },
      {
        id: 'vac-c4',
        vaccineName: 'COVID-19 Bivalente Dosis Refuerzo',
        targetDisease: 'COVID-19',
        dose: '4ª Dosis (Adulto Mayor)',
        appliedDate: '15 de Diciembre, 2025',
        batchNumber: 'COV-9932-MSP',
        facility: 'Centro de Salud Tipo C Rioverde',
        status: 'Aplicada'
      }
    ],
    consultations: [
      {
        id: 'con-c1',
        date: '02 de Octubre, 2026',
        specialty: 'Medicina Familiar y Club del Adulto Mayor',
        doctorName: 'Dr. Leonardo Caicedo - Especialista Familiar',
        reason: 'Control mensual de Hipertensión Arterial y Diabetes Mellitus Tipo 2.',
        vitalSigns: {
          bloodPressure: '125/80 mmHg (Control óptimo)',
          heartRate: '68 lpm',
          temperature: '36.4 °C',
          weight: '74 kg',
          height: '1.70 m',
          bmi: '25.6 kg/m²'
        },
        diagnosisCie10: 'I10 - Hipertensión Esencial; E11.9 - Diabetes Mellitus no insulinodependiente',
        notes: 'Paciente adherente a la medicación. Glucemia en ayunas controlada (108 mg/dL). Fondo de ojo y pulsos periféricos conservados. Refiere caminatas diarias de 30 minutos.',
        treatmentPlan: 'Mantener esquema farmacológico actual. Se renueva receta para retiro gratuito en farmacia. Continuar en talleres de actividad física del Centro de Salud.'
      },
      {
        id: 'con-c2',
        date: '05 de Agosto, 2026',
        specialty: 'Laboratorio Clínico y Triage',
        doctorName: 'Lic. Andrés Palacios - Bioquímico Clínico',
        reason: 'Perfil metabólico completo (Glucosa, HbA1c, Colesterol, Triglicéridos, Creatinina).',
        vitalSigns: {
          bloodPressure: '130/85 mmHg'
        },
        diagnosisCie10: 'Z01.7 - Examen de laboratorio de control',
        notes: 'Hemoglobina Glicosilada (HbA1c): 6.8%. Perfil lipídico y función renal dentro de rangos meta para paciente adulto mayor hipertenso.',
        treatmentPlan: 'Continuar dieta hiposódica y baja en azúcares refinados.'
      }
    ],
    prescriptions: [
      {
        id: 'rx-c1',
        medication: 'Losartán Potásico 50 mg tabletas',
        dosage: '1 tableta vía oral',
        frequency: 'Cada 12 horas (mañana y noche)',
        duration: '90 días (Receta crónica)',
        prescribedDate: '02 de Octubre, 2026',
        dispensedStatus: 'Entregado en Farmacia MSP'
      },
      {
        id: 'rx-c2',
        medication: 'Metformina Clorhidrato 850 mg tabletas',
        dosage: '1 tableta vía oral',
        frequency: 'Cada 24 horas después del almuerzo',
        duration: '90 días',
        prescribedDate: '02 de Octubre, 2026',
        dispensedStatus: 'Entregado en Farmacia MSP'
      },
      {
        id: 'rx-c3',
        medication: 'Ácido Acetilsalicílico 100 mg (Aspirina)',
        dosage: '1 tableta vía oral',
        frequency: 'Cada 24 horas con el desayuno',
        duration: '90 días',
        prescribedDate: '02 de Octubre, 2026',
        dispensedStatus: 'Entregado en Farmacia MSP'
      },
      {
        id: 'rx-c4',
        medication: 'Atorvastatina 20 mg tabletas',
        dosage: '1 tableta vía oral',
        frequency: 'Cada 24 horas antes de dormir',
        duration: '90 días',
        prescribedDate: '02 de Octubre, 2026',
        dispensedStatus: 'Entregado en Farmacia MSP'
      }
    ],
    appointments: [
      {
        id: 'app-c1',
        date: '04 de Noviembre, 2026',
        timeSlot: '08:30 AM',
        specialty: 'Control Club del Adulto Mayor (Medicina Familiar)',
        doctorName: 'Dr. Leonardo Caicedo',
        room: 'Consultorio 1',
        status: 'Confirmada'
      }
    ]
  },
  {
    id: 'paciente-mateo',
    dni: '0850123984',
    fullName: 'Mateo Sebastián Valencia Bone',
    birthDate: '20/03/2021',
    age: 5,
    gender: 'Masculino',
    bloodType: 'O Rh Positivo (O+)',
    allergies: 'Ninguna alergia conocida',
    parish: 'Montalvo',
    phone: '096 987 6543 (Madre: Elena Valencia)',
    hcuNumber: 'HCU-0850123984',
    emergencyContact: 'Elena Valencia (Madre) - 096 987 6543',
    vaccines: [
      {
        id: 'vac-m1',
        vaccineName: 'BCG (Bacilo Calmette-Guérin)',
        targetDisease: 'Formas graves de Tuberculosis',
        dose: 'Dosis Neonatal Única',
        appliedDate: '21 de Marzo, 2021',
        batchNumber: 'BCG-0021-MSP',
        facility: 'Centro de Salud Tipo C Rioverde',
        status: 'Aplicada'
      },
      {
        id: 'vac-m2',
        vaccineName: 'Rotavirus Monovalente',
        targetDisease: 'Diarrea severa por Rotavirus',
        dose: '2ª Dosis (Esquema completo)',
        appliedDate: '20 de Julio, 2021',
        batchNumber: 'ROT-5510-MSP',
        facility: 'Centro de Salud Tipo C Rioverde',
        status: 'Aplicada'
      },
      {
        id: 'vac-m3',
        vaccineName: 'Pentavalente (DPT + HB + Hib)',
        targetDisease: 'Difteria, Tétanos, Tosferina, Hepatitis B, Haemophilus',
        dose: '3ª Dosis',
        appliedDate: '20 de Septiembre, 2021',
        batchNumber: 'PENT-9912-MSP',
        facility: 'Centro de Salud Tipo C Rioverde',
        status: 'Aplicada'
      },
      {
        id: 'vac-m4',
        vaccineName: 'Neumococo Conjugada Pediátrica',
        targetDisease: 'Neumonía, Meningitis bacteriana',
        dose: '3ª Dosis (Refuerzo al año)',
        appliedDate: '25 de Marzo, 2022',
        batchNumber: 'PCV-3301-MSP',
        facility: 'Centro de Salud Tipo C Rioverde',
        status: 'Aplicada'
      },
      {
        id: 'vac-m5',
        vaccineName: 'SRP (Sarampión, Rubéola, Parotiditis)',
        targetDisease: 'Sarampión, Rubéola, Paperas',
        dose: '2ª Dosis (18 meses)',
        appliedDate: '22 de Septiembre, 2022',
        batchNumber: 'SRP-8120-MSP',
        facility: 'Centro de Salud Tipo C Rioverde',
        status: 'Aplicada'
      },
      {
        id: 'vac-m6',
        vaccineName: 'Varicela',
        targetDisease: 'Varicela',
        dose: 'Dosis Única',
        appliedDate: '25 de Marzo, 2022',
        batchNumber: 'VAR-1190-MSP',
        facility: 'Centro de Salud Tipo C Rioverde',
        status: 'Aplicada'
      },
      {
        id: 'vac-m7',
        vaccineName: 'DPT Pediátrico 2º Refuerzo (5 años)',
        targetDisease: 'Difteria, Tétanos y Tosferina',
        dose: 'Refuerzo ingreso escolar 5 años',
        appliedDate: '22 de Marzo, 2026',
        batchNumber: 'DPT-2026-X4',
        facility: 'Centro de Salud Tipo C Rioverde',
        status: 'Aplicada'
      },
      {
        id: 'vac-m8',
        vaccineName: 'Influenza Pediátrica Anual',
        targetDisease: 'Gripe Estacional Infantil',
        dose: 'Refuerzo Campaña 2026',
        appliedDate: '15 de Mayo, 2026',
        batchNumber: 'FLU-PED-77',
        facility: 'Centro de Salud Tipo C Rioverde',
        status: 'Aplicada',
        nextDose: 'Mayo, 2027'
      }
    ],
    consultations: [
      {
        id: 'con-m1',
        date: '25 de Agosto, 2026',
        specialty: 'Pediatría y Control del Niño Sano',
        doctorName: 'Dra. María Elena Solís - Pediatra',
        reason: 'Control de crecimiento, agudeza visual y desarrollo escolar.',
        vitalSigns: {
          heartRate: '92 lpm',
          temperature: '36.6 °C',
          weight: '19.2 kg',
          height: '1.10 m',
          bmi: '15.9 kg/m² (Eutrófico / Adecuado para la edad)'
        },
        diagnosisCie10: 'Z00.1 - Control de salud infantil de rutina',
        notes: 'Niño activo, comunicativo, neurodesarrollo acorde a la edad. Carnet de vacunas completo al 100%. Sin caries visibles, buena higiene bucal.',
        treatmentPlan: 'Se prescribe desparasitación preventiva con albendazol y suplemento de micronutrientes. Próximo control en 6 meses.'
      }
    ],
    prescriptions: [
      {
        id: 'rx-m1',
        medication: 'Multivitamínico Pediátrico Jarabe con Zinc',
        dosage: '5 ml vía oral',
        frequency: 'Una vez al día en el desayuno',
        duration: '30 días',
        prescribedDate: '25 de Agosto, 2026',
        dispensedStatus: 'Entregado en Farmacia MSP'
      },
      {
        id: 'rx-m2',
        medication: 'Albendazol 400 mg suspensión oral (Dosis única)',
        dosage: 'Frasco de 20 ml vía oral',
        frequency: 'Dosis única profiláctica en ayunas',
        duration: '1 día',
        prescribedDate: '25 de Agosto, 2026',
        dispensedStatus: 'Completado'
      }
    ],
    appointments: [
      {
        id: 'app-m1',
        date: '15 de Octubre, 2026',
        timeSlot: '10:00 AM',
        specialty: 'Odontopediatría y Aplicación de Flúor',
        doctorName: 'Dr. Patricio Vera',
        room: 'Consultorio Odontológico 1',
        status: 'Confirmada'
      }
    ]
  }
];
