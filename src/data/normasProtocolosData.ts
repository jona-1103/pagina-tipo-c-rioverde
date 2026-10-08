/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface DriveItem {
  id: string;
  name: string;
  mimeType: 'application/pdf' | 'application/vnd.google-apps.folder' | 'application/vnd.openxmlformats-officedocument.presentationml.presentation' | 'application/msword' | 'application/vnd.ms-powerpoint' | string;
  size?: string;
  date?: string;
  folderCategory: 'Raíz' | 'DERECHOS MSP' | 'NORMA DE VIOLENCIA' | 'PROTOCOLOS DE ATENCION';
  subfolder?: string;
  isFolder: boolean;
  driveUrl: string;
  downloadUrl?: string;
  previewUrl?: string;
  description?: string;
}

export const GOOGLE_DRIVE_FOLDER_ID = '1XCbLyztOEotNqeDW4ssyyzmmtlsxjO1w';
export const GOOGLE_DRIVE_FOLDER_URL = `https://drive.google.com/drive/folders/${GOOGLE_DRIVE_FOLDER_ID}?usp=sharing`;
export const GOOGLE_DRIVE_EMBED_URL = `https://drive.google.com/embeddedfolderview?id=${GOOGLE_DRIVE_FOLDER_ID}#list`;

export const DRIVE_ITEMS: DriveItem[] = [
  // --- CARPETAS PRINCIPALES ---
  {
    id: '1-UGlsVkJ_mu0RitKyQT-Tt2sV77qVKr7',
    name: 'DERECHOS MSP',
    mimeType: 'application/vnd.google-apps.folder',
    folderCategory: 'DERECHOS MSP',
    isFolder: true,
    driveUrl: 'https://drive.google.com/drive/folders/1-UGlsVkJ_mu0RitKyQT-Tt2sV77qVKr7?usp=sharing',
    description: 'Documentación legal, normativas de derechos y amparo del paciente del MSP.'
  },
  {
    id: '1J4jzTMCwQgF1QuN5LRF_AFlZNP_i7MwN',
    name: 'NORMA DE VIOLENCIA',
    mimeType: 'application/vnd.google-apps.folder',
    folderCategory: 'NORMA DE VIOLENCIA',
    isFolder: true,
    driveUrl: 'https://drive.google.com/drive/folders/1J4jzTMCwQgF1QuN5LRF_AFlZNP_i7MwN?usp=sharing',
    description: 'Normas técnicas y lineamientos de atención a víctimas de violencia de género y salud mental.'
  },
  {
    id: '1wAqIqUDSiI-obeIFY_F4IDDIhlAiXkbi',
    name: 'PROTOCOLOS DE ATENCION',
    mimeType: 'application/vnd.google-apps.folder',
    folderCategory: 'PROTOCOLOS DE ATENCION',
    isFolder: true,
    driveUrl: 'https://drive.google.com/drive/folders/1wAqIqUDSiI-obeIFY_F4IDDIhlAiXkbi?usp=sharing',
    description: 'Protocolos clínicos, guías de práctica médica, normas CONE y guías de bolsillo.'
  },

  // --- ARCHIVOS EN CARPETA RAÍZ ---
  {
    id: '1FhU-2kf738ojWQcFeb4y1Li8l2yt92Vz',
    name: 'GuiaTecnicaparalaAtenciondelPartoCulturalmenteAdecuado.pdf',
    mimeType: 'application/pdf',
    size: '3.3 MB',
    date: 'MSP Ecuador',
    folderCategory: 'Raíz',
    isFolder: false,
    driveUrl: 'https://drive.google.com/file/d/1FhU-2kf738ojWQcFeb4y1Li8l2yt92Vz/view?usp=sharing',
    previewUrl: 'https://drive.google.com/file/d/1FhU-2kf738ojWQcFeb4y1Li8l2yt92Vz/preview',
    downloadUrl: 'https://drive.google.com/uc?export=download&id=1FhU-2kf738ojWQcFeb4y1Li8l2yt92Vz',
    description: 'Guía técnica para la atención del parto con pertinencia intercultural y respeto a las raíces ancestrales.'
  },
  {
    id: '1h-2b3UIctghrWNbCRdQMPe-i8md8yJpX',
    name: 'GPC CONTROL PRENATAL 24-06-16.pdf',
    mimeType: 'application/pdf',
    size: '1.8 MB',
    date: 'Oct 2016',
    folderCategory: 'Raíz',
    isFolder: false,
    driveUrl: 'https://drive.google.com/file/d/1h-2b3UIctghrWNbCRdQMPe-i8md8yJpX/view?usp=sharing',
    previewUrl: 'https://drive.google.com/file/d/1h-2b3UIctghrWNbCRdQMPe-i8md8yJpX/preview',
    downloadUrl: 'https://drive.google.com/uc?export=download&id=1h-2b3UIctghrWNbCRdQMPe-i8md8yJpX',
    description: 'Guía de Práctica Clínica oficial para el control prenatal integral y prevención de complicaciones obstétricas.'
  },
  {
    id: '1MUXmhETLJimsxUsuNEzhp3a8OtALv7LZ',
    name: 'gpc_VIH_acuerdo_ministerial05-07-2019.pdf',
    mimeType: 'application/pdf',
    size: '3.1 MB',
    date: 'Ene 2020',
    folderCategory: 'Raíz',
    isFolder: false,
    driveUrl: 'https://drive.google.com/file/d/1MUXmhETLJimsxUsuNEzhp3a8OtALv7LZ/view?usp=sharing',
    previewUrl: 'https://drive.google.com/file/d/1MUXmhETLJimsxUsuNEzhp3a8OtALv7LZ/preview',
    downloadUrl: 'https://drive.google.com/uc?export=download&id=1MUXmhETLJimsxUsuNEzhp3a8OtALv7LZ',
    description: 'Acuerdo Ministerial y Guía de Práctica Clínica para prevención, diagnóstico y tratamiento de VIH.'
  },
  {
    id: '1GjcjCwfsGcc8ARSRcW7ZIKBczddHmXaF',
    name: '2-componentenormativomaterno-121214094419-phpapp01.pdf',
    mimeType: 'application/pdf',
    size: '11.6 MB',
    date: 'Oct 2016',
    folderCategory: 'Raíz',
    isFolder: false,
    driveUrl: 'https://drive.google.com/file/d/1GjcjCwfsGcc8ARSRcW7ZIKBczddHmXaF/view?usp=sharing',
    previewUrl: 'https://drive.google.com/file/d/1GjcjCwfsGcc8ARSRcW7ZIKBczddHmXaF/preview',
    downloadUrl: 'https://drive.google.com/uc?export=download&id=1GjcjCwfsGcc8ARSRcW7ZIKBczddHmXaF',
    description: 'Componente normativo materno para la reducción de mortalidad materna y neonatal.'
  },
  {
    id: '1gikzeWbum50sevCoYX0WaFhu-onC0My8',
    name: 'GPC.pdf',
    mimeType: 'application/pdf',
    size: '1.7 MB',
    date: 'Feb 2017',
    folderCategory: 'Raíz',
    isFolder: false,
    driveUrl: 'https://drive.google.com/file/d/1gikzeWbum50sevCoYX0WaFhu-onC0My8/view?usp=sharing',
    previewUrl: 'https://drive.google.com/file/d/1gikzeWbum50sevCoYX0WaFhu-onC0My8/preview',
    downloadUrl: 'https://drive.google.com/uc?export=download&id=1gikzeWbum50sevCoYX0WaFhu-onC0My8',
    description: 'Compendio institucional de Guías de Práctica Clínica aplicables al primer y segundo nivel de atención.'
  },
  {
    id: '1ssR3jGEFH9d9moIMe-8byDuX9zRJfffX',
    name: 'Guía para el ciudadano Cuidados paliativos.pdf',
    mimeType: 'application/pdf',
    size: '713 KB',
    date: 'Jul 2016',
    folderCategory: 'Raíz',
    isFolder: false,
    driveUrl: 'https://drive.google.com/file/d/1ssR3jGEFH9d9moIMe-8byDuX9zRJfffX/view?usp=sharing',
    previewUrl: 'https://drive.google.com/file/d/1ssR3jGEFH9d9moIMe-8byDuX9zRJfffX/preview',
    downloadUrl: 'https://drive.google.com/uc?export=download&id=1ssR3jGEFH9d9moIMe-8byDuX9zRJfffX',
    description: 'Guía orientativa ciudadana sobre cuidados paliativos y acompañamiento integral a pacientes y familias.'
  },
  {
    id: '1YdmykIpV4x9TomxvJpOglPQ5RxKxdPMl',
    name: 'Guía_de_Supervisión_Salud_de_Adolescentes.pdf',
    mimeType: 'application/pdf',
    size: '1.5 MB',
    date: 'Jul 2016',
    folderCategory: 'Raíz',
    isFolder: false,
    driveUrl: 'https://drive.google.com/file/d/1YdmykIpV4x9TomxvJpOglPQ5RxKxdPMl/view?usp=sharing',
    previewUrl: 'https://drive.google.com/file/d/1YdmykIpV4x9TomxvJpOglPQ5RxKxdPMl/preview',
    downloadUrl: 'https://drive.google.com/uc?export=download&id=1YdmykIpV4x9TomxvJpOglPQ5RxKxdPMl',
    description: 'Herramientas de supervisión y atención en salud integral para adolescentes en establecimientos de salud.'
  },
  {
    id: '1pjhtMQXyHI61U8XAH-196NvuO96RgTzj',
    name: 'Guias-adulto-mayor.pdf',
    mimeType: 'application/pdf',
    size: '2.3 MB',
    date: 'Jul 2016',
    folderCategory: 'Raíz',
    isFolder: false,
    driveUrl: 'https://drive.google.com/file/d/1pjhtMQXyHI61U8XAH-196NvuO96RgTzj/view?usp=sharing',
    previewUrl: 'https://drive.google.com/file/d/1pjhtMQXyHI61U8XAH-196NvuO96RgTzj/preview',
    downloadUrl: 'https://drive.google.com/uc?export=download&id=1pjhtMQXyHI61U8XAH-196NvuO96RgTzj',
    description: 'Guías de atención integral de salud para el adulto mayor y prevención del deterioro cognitivo y funcional.'
  },
  {
    id: '1gcYU7vY8649uWAo7tSGjQAOdtJtXoKKK',
    name: 'Ley de Derechos y Amparo del Paciente.pdf',
    mimeType: 'application/pdf',
    size: '508 KB',
    date: 'Nov 2015',
    folderCategory: 'Raíz',
    isFolder: false,
    driveUrl: 'https://drive.google.com/file/d/1gcYU7vY8649uWAo7tSGjQAOdtJtXoKKK/view?usp=sharing',
    previewUrl: 'https://drive.google.com/file/d/1gcYU7vY8649uWAo7tSGjQAOdtJtXoKKK/preview',
    downloadUrl: 'https://drive.google.com/uc?export=download&id=1gcYU7vY8649uWAo7tSGjQAOdtJtXoKKK',
    description: 'Marco legal oficial de derechos, deberes y garantías de atención para todos los usuarios del sistema de salud.'
  },
  {
    id: '1YZ70K4br8hRSL0DD-rkgXD8O9eLYDZeI',
    name: 'inconformidades.pdf',
    mimeType: 'application/pdf',
    size: '395 KB',
    date: 'Nov 2015',
    folderCategory: 'Raíz',
    isFolder: false,
    driveUrl: 'https://drive.google.com/file/d/1YZ70K4br8hRSL0DD-rkgXD8O9eLYDZeI/view?usp=sharing',
    previewUrl: 'https://drive.google.com/file/d/1YZ70K4br8hRSL0DD-rkgXD8O9eLYDZeI/preview',
    downloadUrl: 'https://drive.google.com/uc?export=download&id=1YZ70K4br8hRSL0DD-rkgXD8O9eLYDZeI',
    description: 'Procedimiento de gestión de sugerencias, quejas e inconformidades ciudadanas en el servicio de salud.'
  },

  // --- ARCHIVOS EN CARPETA: DERECHOS MSP ---
  {
    id: '1ewQ2nHpCPfYo0wbtmCNNi4JgrOjlDz8n',
    name: 'ANEXO-3.-LEY-DE-DERECHOS-Y-AMPARO-DEL-PACIENTE.pdf',
    mimeType: 'application/pdf',
    size: '385 KB',
    date: 'Nov 2015',
    folderCategory: 'DERECHOS MSP',
    subfolder: 'DERECHOS MSP',
    isFolder: false,
    driveUrl: 'https://drive.google.com/file/d/1ewQ2nHpCPfYo0wbtmCNNi4JgrOjlDz8n/view?usp=sharing',
    previewUrl: 'https://drive.google.com/file/d/1ewQ2nHpCPfYo0wbtmCNNi4JgrOjlDz8n/preview',
    downloadUrl: 'https://drive.google.com/uc?export=download&id=1ewQ2nHpCPfYo0wbtmCNNi4JgrOjlDz8n',
    description: 'Anexo formal número 3 correspondiente a la Ley de Derechos y Amparo del Paciente en Ecuador.'
  },
  {
    id: '1_tV6QT4-igWlD2-lCdVa6kFzoZdx-AbR',
    name: 'incorfodidades.pdf (Formato Completo)',
    mimeType: 'application/pdf',
    size: '1.9 MB',
    date: 'Nov 2015',
    folderCategory: 'DERECHOS MSP',
    subfolder: 'DERECHOS MSP',
    isFolder: false,
    driveUrl: 'https://drive.google.com/file/d/1_tV6QT4-igWlD2-lCdVa6kFzoZdx-AbR/view?usp=sharing',
    previewUrl: 'https://drive.google.com/file/d/1_tV6QT4-igWlD2-lCdVa6kFzoZdx-AbR/preview',
    downloadUrl: 'https://drive.google.com/uc?export=download&id=1_tV6QT4-igWlD2-lCdVa6kFzoZdx-AbR',
    description: 'Instructivo ampliado para trámite de inconformidades y buzón ciudadano.'
  },

  // --- ARCHIVOS EN CARPETA: NORMA DE VIOLENCIA / ZONA 1 ---
  {
    id: '112HLuuP5zWsBJrN3ecqgeSDpETpn9QPB',
    name: 'NORMA TECNICA DE VIOLENCIA DE GENERO.pdf',
    mimeType: 'application/pdf',
    size: '8.5 MB',
    date: 'MSP Ecuador',
    folderCategory: 'NORMA DE VIOLENCIA',
    subfolder: 'Zona 1 / Normas',
    isFolder: false,
    driveUrl: 'https://drive.google.com/file/d/112HLuuP5zWsBJrN3ecqgeSDpETpn9QPB/view?usp=sharing',
    previewUrl: 'https://drive.google.com/file/d/112HLuuP5zWsBJrN3ecqgeSDpETpn9QPB/preview',
    downloadUrl: 'https://drive.google.com/uc?export=download&id=112HLuuP5zWsBJrN3ecqgeSDpETpn9QPB',
    description: 'Norma Técnica de atención en salud a víctimas de violencia basada en género y violencia sexual.'
  },
  {
    id: '1ScfkJoYnEWoi2XX7UJi_aFoCxXCxSj98',
    name: 'ACUERDO Nº 5212.pdf',
    mimeType: 'application/pdf',
    size: '7.5 MB',
    date: 'MSP Ecuador',
    folderCategory: 'NORMA DE VIOLENCIA',
    subfolder: 'Zona 1',
    isFolder: false,
    driveUrl: 'https://drive.google.com/file/d/1ScfkJoYnEWoi2XX7UJi_aFoCxXCxSj98/view?usp=sharing',
    previewUrl: 'https://drive.google.com/file/d/1ScfkJoYnEWoi2XX7UJi_aFoCxXCxSj98/preview',
    downloadUrl: 'https://drive.google.com/uc?export=download&id=1ScfkJoYnEWoi2XX7UJi_aFoCxXCxSj98',
    description: 'Acuerdo Ministerial Nº 5212 para la red de atención integral en salud.'
  },
  {
    id: '1py4Hmq61cSq9ahgbH0pOQnM9cO-3Dvgf',
    name: 'Cuadro Basico de Medicamentos 9na.pdf',
    mimeType: 'application/pdf',
    size: '1.6 MB',
    date: 'MSP Ecuador',
    folderCategory: 'NORMA DE VIOLENCIA',
    subfolder: 'Zona 1',
    isFolder: false,
    driveUrl: 'https://drive.google.com/file/d/1py4Hmq61cSq9ahgbH0pOQnM9cO-3Dvgf/view?usp=sharing',
    previewUrl: 'https://drive.google.com/file/d/1py4Hmq61cSq9ahgbH0pOQnM9cO-3Dvgf/preview',
    downloadUrl: 'https://drive.google.com/uc?export=download&id=1py4Hmq61cSq9ahgbH0pOQnM9cO-3Dvgf',
    description: 'Cuadro Nacional de Medicamentos Básicos (9na revisión) para prescripción y dispensación.'
  },
  {
    id: '1SuqrzX-CgbexewNMpxRUw05HJ_CJL1zl',
    name: 'Guía de Intervención mhGAP.pdf',
    mimeType: 'application/pdf',
    size: '1.2 MB',
    date: 'MSP / OMS',
    folderCategory: 'NORMA DE VIOLENCIA',
    subfolder: 'Zona 1',
    isFolder: false,
    driveUrl: 'https://drive.google.com/file/d/1SuqrzX-CgbexewNMpxRUw05HJ_CJL1zl/view?usp=sharing',
    previewUrl: 'https://drive.google.com/file/d/1SuqrzX-CgbexewNMpxRUw05HJ_CJL1zl/preview',
    downloadUrl: 'https://drive.google.com/uc?export=download&id=1SuqrzX-CgbexewNMpxRUw05HJ_CJL1zl',
    description: 'Guía de intervención para los trastornos mentales, neurológicos y por uso de sustancias en el nivel de atención primaria.'
  },
  {
    id: '1oI4z6JfvBTG4FoU689Zzmxwx6TAAUOPP',
    name: 'mhGAP comunitario.pdf',
    mimeType: 'application/pdf',
    size: '4.6 MB',
    date: 'MSP Ecuador',
    folderCategory: 'NORMA DE VIOLENCIA',
    subfolder: 'Zona 1',
    isFolder: false,
    driveUrl: 'https://drive.google.com/file/d/1oI4z6JfvBTG4FoU689Zzmxwx6TAAUOPP/view?usp=sharing',
    previewUrl: 'https://drive.google.com/file/d/1oI4z6JfvBTG4FoU689Zzmxwx6TAAUOPP/preview',
    downloadUrl: 'https://drive.google.com/uc?export=download&id=1oI4z6JfvBTG4FoU689Zzmxwx6TAAUOPP',
    description: 'Herramienta comunitaria de salud mental y apoyo psicosocial.'
  },
  {
    id: '1V4eG8QESBqRn7UpBYVHho4nk6hYO2s2U',
    name: 'Modelo de Salud Mental.pdf',
    mimeType: 'application/pdf',
    size: '1.7 MB',
    date: 'MSP Ecuador',
    folderCategory: 'NORMA DE VIOLENCIA',
    subfolder: 'Zona 1',
    isFolder: false,
    driveUrl: 'https://drive.google.com/file/d/1V4eG8QESBqRn7UpBYVHho4nk6hYO2s2U/view?usp=sharing',
    previewUrl: 'https://drive.google.com/file/d/1V4eG8QESBqRn7UpBYVHho4nk6hYO2s2U/preview',
    downloadUrl: 'https://drive.google.com/uc?export=download&id=1V4eG8QESBqRn7UpBYVHho4nk6hYO2s2U',
    description: 'Modelo de atención integral en salud mental comunitario y ambulatorio.'
  },
  {
    id: '1bQSOBN_UYCpMwpd_LaVnnNW4g2RSIr4B',
    name: 'Guia Adolescentes.pdf',
    mimeType: 'application/pdf',
    size: '2.7 MB',
    date: 'MSP Ecuador',
    folderCategory: 'NORMA DE VIOLENCIA',
    subfolder: 'Zona 1',
    isFolder: false,
    driveUrl: 'https://drive.google.com/file/d/1bQSOBN_UYCpMwpd_LaVnnNW4g2RSIr4B/view?usp=sharing',
    previewUrl: 'https://drive.google.com/file/d/1bQSOBN_UYCpMwpd_LaVnnNW4g2RSIr4B/preview',
    downloadUrl: 'https://drive.google.com/uc?export=download&id=1bQSOBN_UYCpMwpd_LaVnnNW4g2RSIr4B',
    description: 'Guía técnica para el cuidado y atención integral de salud en adolescentes.'
  },

  // --- ARCHIVOS EN CARPETA: PROTOCOLOS DE ATENCION ---
  {
    id: '1zilSfN9Hr5TilKafSpa3-NavEPgTzfnp',
    name: 'Norma Cone digital 27-05-14.pdf',
    mimeType: 'application/pdf',
    size: '2.2 MB',
    date: 'MSP Ecuador',
    folderCategory: 'PROTOCOLOS DE ATENCION',
    subfolder: 'Normas',
    isFolder: false,
    driveUrl: 'https://drive.google.com/file/d/1zilSfN9Hr5TilKafSpa3-NavEPgTzfnp/view?usp=sharing',
    previewUrl: 'https://drive.google.com/file/d/1zilSfN9Hr5TilKafSpa3-NavEPgTzfnp/preview',
    downloadUrl: 'https://drive.google.com/uc?export=download&id=1zilSfN9Hr5TilKafSpa3-NavEPgTzfnp',
    description: 'Norma CONE: Cuidados Obstétricos y Neonatales Esenciales para centros tipo C.'
  },
  {
    id: '17RKRp9qtBBeCOdQSJ-s0GfVRDNjrE1zX',
    name: 'Norma Técnica Subsistema de Referencia y Contrareferencia.pdf',
    mimeType: 'application/pdf',
    size: '6.6 MB',
    date: 'MSP Ecuador',
    folderCategory: 'PROTOCOLOS DE ATENCION',
    subfolder: 'Normas',
    isFolder: false,
    driveUrl: 'https://drive.google.com/file/d/17RKRp9qtBBeCOdQSJ-s0GfVRDNjrE1zX/view?usp=sharing',
    previewUrl: 'https://drive.google.com/file/d/17RKRp9qtBBeCOdQSJ-s0GfVRDNjrE1zX/preview',
    downloadUrl: 'https://drive.google.com/uc?export=download&id=17RKRp9qtBBeCOdQSJ-s0GfVRDNjrE1zX',
    description: 'Norma técnica nacional para el subsistema de referencia, derivación y contrareferencia médica.'
  },
  {
    id: '11xpiy37YFhDwtqN9mAcM3YZZWlq5Yau-',
    name: 'Protocolos Odontológicos.pdf',
    mimeType: 'application/pdf',
    size: '2.0 MB',
    date: 'MSP Ecuador',
    folderCategory: 'PROTOCOLOS DE ATENCION',
    subfolder: 'Normas',
    isFolder: false,
    driveUrl: 'https://drive.google.com/file/d/11xpiy37YFhDwtqN9mAcM3YZZWlq5Yau-/view?usp=sharing',
    previewUrl: 'https://drive.google.com/file/d/11xpiy37YFhDwtqN9mAcM3YZZWlq5Yau-/preview',
    downloadUrl: 'https://drive.google.com/uc?export=download&id=11xpiy37YFhDwtqN9mAcM3YZZWlq5Yau-',
    description: 'Protocolos clínicos de odontología general, prevención y procedimientos dentales.'
  },
  {
    id: '1ov3pYujWLMdOhuepyNAvt5fnWTrhOfH6',
    name: 'Guía de bolsillo hemorragia postparto.pdf',
    mimeType: 'application/pdf',
    size: '1,014 KB',
    date: 'MSP Ecuador',
    folderCategory: 'PROTOCOLOS DE ATENCION',
    subfolder: 'Guia de Bolsillo',
    isFolder: false,
    driveUrl: 'https://drive.google.com/file/d/1ov3pYujWLMdOhuepyNAvt5fnWTrhOfH6/view?usp=sharing',
    previewUrl: 'https://drive.google.com/file/d/1ov3pYujWLMdOhuepyNAvt5fnWTrhOfH6/preview',
    downloadUrl: 'https://drive.google.com/uc?export=download&id=1ov3pYujWLMdOhuepyNAvt5fnWTrhOfH6',
    description: 'Guía rápida de acción clínica inmediata ante código rojo y hemorragia postparto.'
  },
  {
    id: '1HCewNInjr2Og8i8A5UYBqps1XgO1vltF',
    name: 'Guia para el ciudadano de Infeccion Vias Urinarias.pdf',
    mimeType: 'application/pdf',
    size: '7.4 MB',
    date: 'MSP Ecuador',
    folderCategory: 'PROTOCOLOS DE ATENCION',
    subfolder: 'Guia para el Ciudadano',
    isFolder: false,
    driveUrl: 'https://drive.google.com/file/d/1HCewNInjr2Og8i8A5UYBqps1XgO1vltF/view?usp=sharing',
    previewUrl: 'https://drive.google.com/file/d/1HCewNInjr2Og8i8A5UYBqps1XgO1vltF/preview',
    downloadUrl: 'https://drive.google.com/uc?export=download&id=1HCewNInjr2Og8i8A5UYBqps1XgO1vltF',
    description: 'Guía explicativa para pacientes sobre síntomas, tratamiento y prevención de infecciones urinarias.'
  }
];
