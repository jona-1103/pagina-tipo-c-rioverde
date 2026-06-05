/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MedicalService, Benefit, Statistic, BlogItem, MSPManual, DownloadableDocument } from './types';
import doctorResultsImg from './assets/images/lab_results_rioverde_1780685509630.png';

// Let's resolve the actual generated asset paths in code imports inside components, or define them here.
export const HERO_IMAGE = 'https://lh3.googleusercontent.com/d/1l1mScAlU1cV6nLYjQen-98nSaCL8UvkQ';
export const DOCTOR_RESULTS_IMAGE = doctorResultsImg;

export const benefitsList: Benefit[] = [
  {
    id: 'atencion-247',
    title: 'Atención 24/7',
    description: 'Servicio de emergencias y áreas críticas totalmente operativo todos los días del año.',
    iconName: 'Clock',
  },
  {
    id: 'profesionales-calificados',
    title: 'Profesionales de la salud',
    description: 'Médicos especialistas, licenciados y técnicos comprometidos con la excelencia del CSTCR.',
    iconName: 'Award',
  },
  {
    id: 'comprometidos-salud',
    title: 'Comprometidos con tu salud',
    description: 'Brindamos atención humanizada, con calidez y respeto intercultural para la comunidad.',
    iconName: 'HeartPulse',
  }
];

export const servicesList: MedicalService[] = [
  {
    id: 'consulta-externa',
    title: 'Consulta Externa',
    description: 'Atención ambulatoria programada para el diagnóstico y prevención de patologías comunes.',
    iconName: 'Stethoscope',
    details: [
      'Medicina General y Familiar',
      'Ginecología y Obstetricia (Control Prenatal)',
      'Odontología General y Profilaxis',
      'Psicología Clínica y Salud Mental',
      'Nutrición y Asesoramiento Alimentario'
    ]
  },
  {
    id: 'emergencia-observacion',
    title: 'Emergencia y Observación',
    description: 'Unidad de respuesta inmediata para situaciones críticas y estabilización de pacientes.',
    iconName: 'Activity',
    details: [
      'Servicio de Emergencias Médicas 24 Horas',
      'Sala de Reanimación / Trauma Shock',
      'Camas de Observación Adultos y Pediátrica',
      'Sistema de Triaje Manchester (Prioridad de atención)',
      'Medicación de Emergencia Inmediata',
      'Estabilización y Coordinación de Derivaciones'
    ]
  },
  {
    id: 'salud-mental-terapias',
    title: 'Salud Mental y Terapias',
    description: 'Áreas dedicadas a la rehabilitación física, de lenguaje y acompañamiento psicosocial.',
    iconName: 'Users',
    details: [
      'Psicoterapia Individual, Familiar y Grupal',
      'Terapia Física y Rehabilitación Musculoesquelética',
      'Terapia del Lenguaje para Niños y Adultos',
      'Estimulación Temprana para la Infancia',
      'Talleres Comunitarios de Manejo del Estrés',
      'Atención de Violencia de Género y Derechos'
    ]
  },
  {
    id: 'diagnostico-apoyo',
    title: 'Diagnóstico y Apoyo Terapéutico',
    description: 'Laboratorio con equipos tecnológicos para los diagnósticos precisos de forma rápida.',
    iconName: 'FlaskConical',
    details: [
      'Laboratorio Clínico Automatizado (Hemograma, Bioquímica, Hormonales)',
      'Radiología Digital de Baja Radiación',
      'Ecografía Pélvica, General y Obstétrica Avanzada',
      'Espirometrías y Electrocardiogramas de Reposo',
      'Farmacia Institucional (Dispensación Gratuita de receta MSP)',
      'Control de Calidad de Toma de Muestras'
    ]
  },
  {
    id: 'programas-prevencion',
    title: 'Programas de Prevención',
    description: 'Campañas activas de educación y salud pública para resguardar el porvenir comunitario.',
    iconName: 'ShieldPlus',
    details: [
      'Inmunización en todas las edades (Esquema Nacional de Vacunación)',
      'Programa Materno-Infantil (Control del Niño Sano)',
      'Clubes de pacientes con Diabetes e Hipertensión Arterial',
      'Campañas de Desparasitación y Nutrición en Escuelas',
      'Planificación Familiar y Métodos Anticonceptivos sin costo',
      'Prevención de Cáncer Cervicouterino (Pruebas de Papanicolaou)'
    ]
  }
];

export const statisticsList: Statistic[] = [
  {
    id: 'pacientes',
    value: '+25,000',
    label: 'Pacientes atendidos anualmente',
    iconName: 'Smile',
  },
  {
    id: 'profesionales',
    value: '+60',
    label: 'Profesionales de la salud',
    iconName: 'ShieldCheck',
  },
  {
    id: 'atencion',
    value: '24/7',
    label: 'Disponibilidad para emergencias',
    iconName: 'CalendarRange',
  },
  {
    id: 'cobertura',
    value: '100%',
    label: 'Cobertura en todas las parroquias',
    iconName: 'MapPin',
  }
];

export const blogList: BlogItem[] = [
  {
    id: 'prevencion-dengue',
    title: 'Prevención del Dengue: Campaña en Parroquias de Rioverde',
    description: 'Descubre las medidas clave para erradicar criaderos de mosquitos en el hogar ante la llegada de la temporada invernal.',
    content: 'El Centro de Salud Tipo C Rioverde hace un llamado a toda la población del cantón a intensificar las labores mecánicas de limpieza en sus predios. Tras las constantes lluvias registradas en el norte de Esmeraldas, el mosquito Aedes aegypti encuentra condiciones óptimas de reproducción en recipientes de agua estancada.\n\nNuestras brigadas de Vigilancia Epidemiológica se encuentran recorriendo las parroquias de Rocafuerte, Lagarto, Montalvo y Chontaduro, realizando fumigación intradomiciliaria y entregando abate. Recuerda poner en práctica la regla de oro: Lava, tapa, voltea y bota. Si presentas fiebre alta, dolor ocular o sarpullido, acude a nuestro centro de salud y no te automediques.',
    date: '28 Mayo 2026',
    category: 'Salud Pública',
    readTime: '4 min read',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'control-prenatal',
    title: 'Control Prenatal: Cuidado e importancia durante el embarazo',
    description: 'El área de Ginecología y Obstetricia de nuestro centro resalta la importancia de valoraciones oportunas para la salud materna.',
    content: 'El control prenatal sistemático y continuo es de suma importancia para prevenir complicaciones y evaluar el correcto desarrollo del bebé. En el Centro de Salud Tipo C Rioverde, contamos con profesionales de primer nivel en gineco-obstetricia que asisten a la gestante en cada fase de su embarazo.\n\nNuestras obstetras aconsejan asistir a un mínimo de cinco controles prenatales estructurados, efectuarse ecografías de rutina y recibir suplementos de hierro y ácido fólico de manera gratuita en la farmacia del centro.',
    date: '15 Mayo 2026',
    category: 'Ginecología',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'control-salud-cardio',
    title: 'Hipertensión: El "enemigo silencioso" que debes monitorear',
    description: '¿Por qué medir tu presión arterial de forma rutinaria puede salvar tu vida? Conoce nuestro Club de Hipertensos.',
    content: 'La hipertensión arterial afecta a cerca del 20% de la población adulta en nuestra provincia. Generalmente no produce síntomas evidentes hasta que ocurren complicaciones graves como infartos cerebrales o cardíacos. Por ello, el Centro de Salud Tipo C Rioverde ofrece tomas de presión arterial gratuitas y sin cita en el área de Triaje.\n\nAdemás, invitamos a los pacientes diagnosticados a sumarse a nuestro Club de Hipertensos, que se reúne los miércoles a las 09:00 AM para realizar actividades físicas supervisadas, degustaciones de cocina hiposódica y entrega de medicamentos de mantenimiento.',
    date: '02 Mayo 2026',
    category: 'Medicina Preventiva',
    readTime: '3 min read',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'importancia-salud-mental',
    title: 'Salud Mental y bienestar emocional en tiempos modernos',
    description: 'El departamento de psicología comparte técnicas para afrontar la ansiedad crónica y el estrés laboral.',
    content: 'Reconocer que nuestra salud mental es tan importante como nuestra salud física es el primer paso para una vida plena. En el último año, las consultas por trastornos de ansiedad y depresión moderada han crecido. El estrés constante altera nuestro metabolismo, debilita el sistema inmune y desgasta las relaciones afectivas.\n\nNuestra área de Psicología brinda atención integral confidencial con terapias de afrontamiento cognitivo-conductual. Adicionalmente, recomendamos establecer pausas activas, dormir mínimo 7 horas diarias, realizar ejercicio moderado y buscar ayuda profesional si sientes que las situaciones diarias superan tus capacidades de resolución.',
    date: '20 Abril 2026',
    category: 'Salud Mental',
    readTime: '6 min read',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80'
  }
];

export const mspManualsList: MSPManual[] = [
  {
    id: 'mais-fci',
    title: 'Manual del Modelo de Atención Integral de Salud (MAIS-FCI)',
    category: 'Normas Técnicas',
    year: '2012 (V2)',
    code: 'MSP-MAIS-FCI-2012',
    size: '14.2 MB',
    description: 'Define la estructura y el modelo de atención médica familiar, comunitaria e intercultural del Sistema Nacional de Salud en Ecuador.'
  },
  {
    id: 'gpc-diabetes-2',
    title: 'Guía de Práctica Clínica: Diabetes Mellitus Tipo 2',
    category: 'Guías de Práctica Clínica',
    year: '2019',
    code: 'MSP-GPC-DM2-2019',
    size: '3.8 MB',
    description: 'Recomendaciones oficiales del MSP sobre el diagnóstico, tratamiento farmacológico, dosificación de insulina y control del pie diabético.'
  },
  {
    id: 'gpc-hta',
    title: 'Guía de Práctica Clínica: Hipertensión Arterial (HTA)',
    category: 'Guías de Práctica Clínica',
    year: '2020',
    code: 'MSP-GPC-HTA-2020',
    size: '4.5 MB',
    description: 'Algoritmos diagnósticos actuales, selección de antihipertensivos y control de factores de riesgo cardiovascular para el primer nivel de atención.'
  },
  {
    id: 'codigo-rojo-obstetrico',
    title: 'Protocolo de Emergencias Obstétricas: Alerta Código Rojo',
    category: 'Protocolos de Emergencia',
    year: '2023',
    code: 'MSP-PRO-CRO-2023',
    size: '2.1 MB',
    description: 'Manual de acción médica multidisciplinaria para el manejo inmediato del shock hemorrágico obstétrico en centros Tipo C y hospitales.'
  },
  {
    id: 'esquema-vacunacion-ecuador',
    title: 'Norma Técnica de Esquema Nacional de Inmunización',
    category: 'Manuales de Vacunación',
    year: '2024',
    code: 'MSP-NT-ENI-2024',
    size: '5.9 MB',
    description: 'Cronograma, dosis, vías de administración e indicaciones especiales del portafolio completo de vacunas del Ministerio de Salud Pública de Ecuador.'
  }
];

export const downloadableDocumentsList: DownloadableDocument[] = [
  {
    id: 'solicitud-historia-clinica',
    title: 'Formulario de Solicitud de Copia de Historia Clínica',
    format: 'PDF',
    size: '420 KB',
    category: 'Gestión Pacientes',
    description: 'Imprescindible para solicitar un duplicado físico o digital certificado de su expediente de salud o epicrisis.'
  },
  {
    id: 'registro-primer-vez',
    title: 'Ficha de Registro y Actualización de Datos de Paciente',
    format: 'PDF',
    size: '310 KB',
    category: 'Admisión',
    description: 'Llene este formulario para agilizar su ingreso en el sistema de admisión si es primera vez que se atiende en el centro.'
  },
  {
    id: 'autorizacion-menores',
    title: 'Carta de Consentimiento y Autorización para Menores de Edad',
    format: 'PDF',
    size: '250 KB',
    category: 'Admisión',
    description: 'Autorización que debe completar el representante legal en caso de que el menor asista acompañado de un tercero.'
  },
  {
    id: 'plantilla-carnet-vacunacion',
    title: 'Requisito para Duplicado de Carnet de Vacunación Infantil',
    format: 'PDF',
    size: '580 KB',
    category: 'Inmunización',
    description: 'Formulario indicativo para tramitar la reposición de pérdida del carnet físico de desarrollo y vacunas del lactante.'
  },
  {
    id: 'formulario-quejas-sugerencias',
    title: 'Formulario de Derechos del Paciente, Peticiones o Sugerencias',
    format: 'PDF',
    size: '180 KB',
    category: 'Participación Social',
    description: 'Formulario oficial de atención al usuario (Participación Social) de acuerdo a las reglamentaciones del MSP.'
  }
];

// List of available specialties
export const specialtiesList = [
  { id: 'general', name: 'Medicina General y Familiar' },
  { id: 'ginecologia', name: 'Ginecología y Obstetricia' },
  { id: 'odontologia', name: 'Odontología' },
  { id: 'psicologia', name: 'Psicología Clínica' },
  { id: 'nutricion', name: 'Nutrición y Dietética' }
];

// Predefined available time slots
export const timeSlotsList = [
  '08:00 AM - 08:30 AM',
  '08:30 AM - 09:00 AM',
  '09:00 AM - 09:30 AM',
  '09:30 AM - 10:00 AM',
  '10:30 AM - 11:00 AM',
  '11:00 AM - 11:30 AM',
  '11:30 AM - 12:00 PM',
  '02:00 PM - 02:30 PM',
  '02:30 PM - 03:00 PM',
  '03:00 PM - 03:30 PM',
  '03:30 PM - 04:00 PM'
];
