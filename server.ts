import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const app = express();
const PORT = 3000;
const LAB_TARGET = 'https://laboratorio.tipocrioverde.com';

// Initialize Gemini client on server side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Ensure public directory exists and is served statically
const publicDir = path.join(process.cwd(), 'public');
const publicImagesDir = path.join(publicDir, 'images');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}
if (!fs.existsSync(publicImagesDir)) {
  fs.mkdirSync(publicImagesDir, { recursive: true });
}

// Track banner version timestamp for instant cross-browser cache invalidation
let bannerTimestamp = Date.now();

// If public banner does not exist or is corrupted/empty (<1KB), initialize with authentic health center image
const defaultBundledImage = path.join(process.cwd(), 'src', 'assets', 'images', 'fachada_principal_tipo_c_rioverde.png');
const targetBannerPng = path.join(publicImagesDir, 'banner-rioverde.png');
try {
  const needsInit = !fs.existsSync(targetBannerPng) || fs.statSync(targetBannerPng).size < 1024;
  if (needsInit && fs.existsSync(defaultBundledImage)) {
    fs.copyFileSync(defaultBundledImage, targetBannerPng);
    fs.copyFileSync(defaultBundledImage, path.join(publicImagesDir, 'banner-rioverde.jpg'));
    fs.copyFileSync(defaultBundledImage, path.join(publicDir, 'fachada-principal.png'));
    fs.copyFileSync(defaultBundledImage, path.join(publicDir, 'fachada principal tipo c rioverde.png'));
  }
} catch (e) {
  console.warn('Initial banner sync warning:', e);
}

app.use(express.static(publicDir, {
  setHeaders: (res, filePath) => {
    if (filePath.includes('fachada') || filePath.includes('banner')) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
    }
  }
}));

// Endpoint to upload and persist the official banner image
app.post('/api/upload-banner', express.json({ limit: '50mb' }), (req, res) => {
  try {
    const { imageBase64 } = req.body;
    if (!imageBase64 || typeof imageBase64 !== 'string') {
      return res.status(400).json({ error: 'No image data provided' });
    }
    const commaIdx = imageBase64.indexOf(',');
    const base64Data = commaIdx !== -1 ? imageBase64.substring(commaIdx + 1) : imageBase64;
    const buffer = Buffer.from(base64Data, 'base64');

    if (buffer.length < 100) {
      return res.status(400).json({ error: 'Invalid image data (too small)' });
    }

    bannerTimestamp = Date.now();
    
    // Write to public folder
    fs.writeFileSync(path.join(publicImagesDir, 'banner-rioverde.png'), buffer);
    fs.writeFileSync(path.join(publicImagesDir, 'banner-rioverde.jpg'), buffer);
    fs.writeFileSync(path.join(publicDir, 'fachada-principal.png'), buffer);
    fs.writeFileSync(path.join(publicDir, 'fachada principal tipo c rioverde.png'), buffer);
    
    // Also write to dist/images if dist exists so production builds immediately serve it
    const distImagesDir = path.join(process.cwd(), 'dist', 'images');
    if (fs.existsSync(distImagesDir)) {
      fs.writeFileSync(path.join(distImagesDir, 'banner-rioverde.png'), buffer);
      fs.writeFileSync(path.join(distImagesDir, 'banner-rioverde.jpg'), buffer);
    }
    const distDir = path.join(process.cwd(), 'dist');
    if (fs.existsSync(distDir)) {
      fs.writeFileSync(path.join(distDir, 'fachada-principal.png'), buffer);
    }

    try {
      const srcAssetDir = path.join(process.cwd(), 'src', 'assets', 'images');
      if (fs.existsSync(srcAssetDir)) {
        fs.writeFileSync(path.join(srcAssetDir, 'fachada_principal_tipo_c_rioverde.png'), buffer);
        fs.writeFileSync(path.join(srcAssetDir, 'fachada_oficial_rioverde_1790272293009.jpg'), buffer);
        fs.writeFileSync(path.join(srcAssetDir, 'fachada_rioverde_salud_1790262024991.jpg'), buffer);
        fs.writeFileSync(path.join(srcAssetDir, 'hero_health_center_1779982013572.png'), buffer);
      }
    } catch (e) {
      console.warn('Could not write to src/assets:', e);
    }

    res.json({
      success: true,
      url: `/api/banner-image?t=${bannerTimestamp}`,
      version: bannerTimestamp
    });
  } catch (err: any) {
    console.error('Error saving banner:', err);
    res.status(500).json({ error: err.message });
  }
});

// Endpoint to stream the banner image directly with strict no-cache headers
app.get('/api/banner-image', (req, res) => {
  const possiblePaths = [
    path.join(publicImagesDir, 'banner-rioverde.png'),
    path.join(publicImagesDir, 'banner-rioverde.jpg'),
    path.join(publicDir, 'fachada-principal.png'),
    defaultBundledImage,
  ];
  for (const p of possiblePaths) {
    if (fs.existsSync(p) && fs.statSync(p).size > 1024) {
      try {
        const fd = fs.openSync(p, 'r');
        const headBuf = Buffer.alloc(4);
        fs.readSync(fd, headBuf, 0, 4, 0);
        fs.closeSync(fd);
        const isJpeg = headBuf[0] === 0xff && headBuf[1] === 0xd8;
        res.setHeader('Content-Type', isJpeg ? 'image/jpeg' : 'image/png');
      } catch {
        const ext = path.extname(p).toLowerCase();
        res.setHeader('Content-Type', ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : 'image/png');
      }
      res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
      return fs.createReadStream(p).pipe(res);
    }
  }
  res.status(404).send('Banner not found');
});

// Endpoint to check if official banner exists on server
app.get('/api/banner-status', (req, res) => {
  const bannerFile = path.join(publicImagesDir, 'banner-rioverde.png');
  if (fs.existsSync(bannerFile) && fs.statSync(bannerFile).size > 1024) {
    return res.json({
      exists: true,
      url: `/api/banner-image?t=${bannerTimestamp}`,
      version: bannerTimestamp
    });
  }

  // Fallback to bundled asset
  if (fs.existsSync(defaultBundledImage) && fs.statSync(defaultBundledImage).size > 1024) {
    return res.json({
      exists: true,
      url: `/api/banner-image?t=${bannerTimestamp}`,
      version: bannerTimestamp
    });
  }

  res.json({ exists: false, url: null });
});

// Knowledge base fallback for Centro de Salud Tipo C Rioverde
function generateKnowledgeFallback(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('horario') || q.includes('hora') || q.includes('abierto') || q.includes('cuando')) {
    return `🕒 **Horarios de Atención del Centro de Salud Tipo C Rioverde:**\n\n• **Emergencias:** 24 horas al día, 7 días a la semana (24/7), los 365 días del año.\n• **Consulta Externa:** Lunes a Viernes de 07:00 a 19:00 (en jornadas matutina y vespertina).\n• **Laboratorio Clínico:** Toma de muestras de 07:00 a 10:00 (emergencias 24/7).\n• **Farmacia:** 24/7 para emergencias; 07:00 a 19:00 para consulta externa.\n• **Vacunación:** Lunes a Viernes de 08:00 a 16:00.\n• **Rehabilitación Física:** Lunes a Viernes de 08:00 a 16:30.`;
  }

  if (q.includes('servicio') || q.includes('especialidad') || q.includes('atienden') || q.includes('que tienen') || q.includes('medicos')) {
    return `🏥 **Servicios Médicos Disponibles (100% Gratuitos):**\n\n1. **Medicina General y Familiar**\n2. **Emergencias Médicas 24 Horas** con sala de choque y observación\n3. **Ginecología, Obstetricia y Parto Humanizado e Intercultural**\n4. **Pediatría y Control de Crecimiento del Niño Sano**\n5. **Odontología General y Prevención Bucal**\n6. **Laboratorio Clínico Automatizado** con consulta de resultados web\n7. **Rayos X y Ecografía General**\n8. **Rehabilitación Física y Fisioterapia**\n9. **Psicología Clínica y Apoyo Emocional**\n10. **Nutrición y Dietética**\n11. **Farmacia Institucional Gratuita MSP**\n12. **Vacunatorio del Esquema Nacional**`;
  }

  if (q.includes('cita') || q.includes('turno') || q.includes('agendar') || q.includes('sacar cita') || q.includes('whatsapp') || q.includes('agendamiento')) {
    return `📅 **¿Cómo agendar una Cita Médica?**\n\n• 🌐 **Agendamiento Tipo C en Línea:** Ingresa directamente a nuestro sistema oficial [https://agendamiento.tipocrioverde.com/](https://agendamiento.tipocrioverde.com/) disponible 24/7.\n• 📱 **Vía WhatsApp Oficial:** Puedes agendar tu turno escribiendo al **+593 96 117 1171** (o 096 117 1171).\n• 🏢 **Presencial en Admisión:** Acude de Lunes a Viernes de 07:00 a 16:00 portando tu cédula de identidad.\n\n⚠️ **Nota Importante:** Las urgencias y emergencias **NO necesitan cita previa**; se atienden de inmediato en el área de Triage 24h.`;
  }

  if (q.includes('costo') || q.includes('precio') || q.includes('gratis') || q.includes('cuanto cuesta') || q.includes('cobran')) {
    return `💚 **¡Todos los servicios son 100% GRATUITOS!**\n\nEn el Centro de Salud Tipo C Rioverde no se cobra por ninguna atención médica, exámenes de sangre/orina, ecografías, radiografías ni medicamentos en farmacia. Todo está financiado y garantizado por el Ministerio de Salud Pública del Ecuador (MSP).`;
  }

  if (q.includes('laboratorio') || q.includes('muestra') || q.includes('resultado') || q.includes('examen') || q.includes('sangre')) {
    return `🧪 **Laboratorio Clínico y Entrega de Resultados:**\n\n• **Toma de Muestras:** Lunes a Viernes de 07:00 a 10:00 (en ayunas). Emergencias procesadas 24/7.\n• **Consulta de Resultados en Línea:** En nuestro sitio web puedes acceder a la sección *«Consulta de Resultados de Laboratorio»*, ingresar tu número de cédula y descargar tus informes médicos firmados electrónicamente.`;
  }

  if (q.includes('ubicacion') || q.includes('donde') || q.includes('direccion') || q.includes('llegar') || q.includes('mapa')) {
    return `📍 **Ubicación del Centro de Salud:**\n\nEstamos ubicados en el **Cantón Rioverde, Carretero Principal Vía a la Costa** (frente a la cancha deportiva del GAD Municipal de Rioverde), Provincia de Esmeraldas, Ecuador. Contamos con estacionamiento, acceso para ambulancias y rampas para personas con movilidad reducida.`;
  }

  if (q.includes('emergencia') || q.includes('urgencia') || q.includes('grave') || q.includes('accidente') || q.includes('dolor fuerte')) {
    return `🚨 **Área de Emergencias 24 Horas:**\n\nNuestra sala de Emergencias opera ininterrumpidamente las 24 horas del día. Si tú o un familiar presentan un dolor agudo, hemorragia, dificultad respiratoria, herida profunda o trabajo de parto, **acude de inmediato a triage**. No se requiere cita ni trámites previos para salvar vidas.`;
  }

  if (q.includes('parto') || q.includes('embaraz') || q.includes('embarazo') || q.includes('matern') || q.includes('obstetr') || q.includes('bebe')) {
    return `👶 **Servicio Materno Infantil y Parto Humanizado:**\n\n• Atención 24/7 para gestantes y partos sin necesidad de viajar a Esmeraldas.\n• Sala de parto humanizado e intercultural con libertad de posición (vertical, cuclillas o cama tradicional).\n• Monitoreo fetal, sala de recién nacidos, alojamiento conjunto y apoyo en lactancia materna exclusiva.`;
  }

  if (q.includes('vacuna') || q.includes('inmuniz') || q.includes('vacunatorio')) {
    return `💉 **Servicio de Vacunación (Inmunizaciones):**\n\n• Horario: Lunes a Viernes de 08:00 a 16:00.\n• Aplicamos gratuitamente todas las vacunas del Esquema Nacional MSP (BCG, Rotavirus, Pentavalente, Neumococo, Fiebre Amarilla, Influenza, COVID-19 y refuerzos para adultos mayores y gestantes).\n• Requisito: Presentar carnet de vacunación y cédula.`;
  }

  return `¡Hola! Soy el **Asistente Virtual con IA del Centro de Salud Tipo C Rioverde** 🌿.\n\nPuedo orientarte con gusto sobre:\n• 🕒 **Horarios de atención** y emergencias 24/7.\n• 🏥 **Servicios y especialidades** médicas disponibles.\n• 📅 **Cómo solicitar citas médicas** o acceder a farmacia gratuita.\n• 🧪 **Consulta de exámenes de laboratorio** en línea.\n• 📍 **Ubicación y requisitos** de ingreso.\n\n¿Qué consulta tienes hoy para nosotros?`;
}

// AI Assistant Chat endpoint (Gemini API server-side integration)
app.post('/api/chat', express.json(), async (req, res) => {
  try {
    const { messages, message } = req.body;
    const userPrompt = message || (Array.isArray(messages) && messages.length > 0 ? messages[messages.length - 1].content : '');

    if (!userPrompt || typeof userPrompt !== 'string') {
      return res.status(400).json({ error: 'Mensaje requerido' });
    }

    // Try Gemini API call if GEMINI_API_KEY is available in the environment
    if (process.env.GEMINI_API_KEY) {
      try {
        const systemInstruction = `Eres "SaludBot Rioverde", el asistente virtual oficial con inteligencia artificial del Centro de Salud Tipo C Rioverde (CSTCR), ubicado en el Cantón Rioverde, Provincia de Esmeraldas, Ecuador.
Tu misión es orientar con amabilidad, calidez, respeto y claridad a los pacientes y familias de Rioverde, Rocafuerte, Montalvo, Lagarto, Chontaduro, Chumundé y comunidades de la costa sobre los servicios de salud y horarios de atención.

INFORMACIÓN OFICIAL DEL CENTRO DE SALUD TIPO C RIOVERDE:
1. Gratuidad Total: Todos los servicios médicos, medicamentos de farmacia, partos y exámenes de laboratorio son 100% GRATUITOS bajo el sistema de salud pública del Ecuador (MSP).
2. Horarios de Atención:
   - Emergencias: Atención médica continua 24 horas al día, los 7 días de la semana (24/7). Triage y sala de choque siempre activos.
   - Consulta Externa: Lunes a Viernes de 07:00 a 19:00 en dos jornadas (matutina y vespertina).
   - Laboratorio Clínico: Toma de muestras de Lunes a Viernes de 07:00 a 10:00 (emergencias procesadas 24/7). Los resultados se pueden consultar y descargar en línea en el portal de laboratorio web.
   - Farmacia Institucional: 24/7 para pacientes de emergencia; Lunes a Viernes de 07:00 a 19:00 para consulta externa.
   - Rehabilitación Física: Lunes a Viernes de 08:00 a 16:30.
   - Vacunación (Inmunización): Lunes a Viernes de 08:00 a 16:00 (esquema nacional infantil, gestantes y adultos).
3. Servicios Disponibles:
   - Medicina Familiar y Medicina General.
   - Sala de Parto Humanizado e Intercultural y Área Materno Infantil.
   - Pediatría y Control del Niño Sano.
   - Odontología General y Prevención Oral.
   - Rayos X y Ecografía / Imagenología.
   - Laboratorio Clínico automatizado.
   - Rehabilitación Física y Terapia de Movilidad.
   - Psicología Clínica y Salud Mental.
   - Nutrición y Dietética.
   - Clubes de Adultos Mayores y Pacientes con Enfermedades Crónicas (Hipertensión, Diabetes).
4. Citas Médicas:
   - Se agendan a través de WhatsApp oficial: +593 96 117 1171 (096 117 1171) o en ventanilla de Admisión de Lunes a Viernes de 07:00 a 16:00.
   - Las emergencias NO requieren cita previa, se atienden de inmediato por orden de triage.
5. Requisitos: Presentar cédula de identidad ecuatoriana o partida de nacimiento / pasaporte. En emergencias vitales la atención es inmediata sin ningún condicionamiento previo.
6. Ubicación: Cantón Rioverde, Carretero Principal Vía a la Costa (frente a la cancha deportiva del GAD Rioverde), Esmeraldas.

REGLAS DE RESPUESTA:
- Responde siempre en español con tono cálido, empático, claro y respetuoso.
- Sé conciso y directo, utilizando viñetas o párrafos breves fáciles de leer desde un teléfono móvil.
- Si el usuario presenta una urgencia médica grave (dolor en el pecho severo, dificultad respiratoria extrema, sangrado abundante o pérdida de conciencia), recomiéndale enfáticamente acudir de inmediato a la sala de Emergencias 24h.
- Aclara que eres un asistente orientador informativo y no reemplazas el diagnóstico de un médico presencial.`;

        const formattedContents = [];
        if (Array.isArray(messages)) {
          for (const m of messages.slice(-6)) {
            const role = m.sender === 'user' || m.role === 'user' ? 'user' : 'model';
            const textContent = m.text || m.content || '';
            if (textContent.trim()) {
              formattedContents.push({
                role,
                parts: [{ text: textContent }],
              });
            }
          }
        }

        if (formattedContents.length === 0 || formattedContents[formattedContents.length - 1].role !== 'user') {
          formattedContents.push({
            role: 'user',
            parts: [{ text: userPrompt }],
          });
        }

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: formattedContents,
          config: {
            systemInstruction,
            temperature: 0.4,
            maxOutputTokens: 600,
          },
        });

        const reply = response.text || '';
        if (reply.trim()) {
          return res.json({ reply, model: 'gemini-3.8-flash' });
        }
      } catch (geminiError: any) {
        console.warn('Gemini API call failed, using knowledge fallback:', geminiError?.message || geminiError);
      }
    }

    // Knowledge-based fallback if API key is not present or transient error
    const fallbackReply = generateKnowledgeFallback(userPrompt);
    return res.json({ reply: fallbackReply, model: 'knowledge-base' });
  } catch (err: any) {
    console.error('Error in /api/chat:', err);
    res.status(500).json({ error: 'Error procesando tu consulta' });
  }
});

// Handle lab proxy requests
app.all(['/portal-laboratorio', '/portal-laboratorio/*'], async (req, res) => {
  try {
    const subpath = req.url.replace(/^\/portal-laboratorio/, '') || '/';
    const targetUrl = new URL(subpath, LAB_TARGET).toString();

    // Prepare headers to forward
    const forwardHeaders: Record<string, string> = {
      'User-Agent': req.headers['user-agent'] || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      'Accept': req.headers['accept'] || '*/*',
      'Accept-Language': (req.headers['accept-language'] as string) || 'es-ES,es;q=0.9,en;q=0.8',
    };

    if (req.headers['content-type']) {
      forwardHeaders['Content-Type'] = req.headers['content-type'] as string;
    }
    if (req.headers['cookie']) {
      forwardHeaders['Cookie'] = req.headers['cookie'] as string;
    }
    if (req.headers['referer']) {
      forwardHeaders['Referer'] = LAB_TARGET + '/';
    }

    // Capture body for POST / PUT / PATCH
    let bodyBuffer: Buffer | undefined = undefined;
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
      const chunks: Buffer[] = [];
      for await (const chunk of req) {
        chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
      }
      if (chunks.length > 0) {
        bodyBuffer = Buffer.concat(chunks);
      }
    }

    const upstreamResponse = await fetch(targetUrl, {
      method: req.method,
      headers: forwardHeaders,
      body: bodyBuffer,
      redirect: 'manual', // handle redirects explicitly
    });

    const status = upstreamResponse.status;

    // Handle redirects (e.g. login redirect to dashboard)
    if (status >= 300 && status < 400) {
      const location = upstreamResponse.headers.get('location');
      if (location) {
        let rewrittenLocation = location;
        if (location.startsWith(LAB_TARGET)) {
          rewrittenLocation = location.replace(LAB_TARGET, '/portal-laboratorio');
        } else if (location.startsWith('/')) {
          rewrittenLocation = '/portal-laboratorio' + location;
        }
        res.setHeader('Location', rewrittenLocation);
      }
    }

    // Forward Set-Cookie headers with modified path and attributes
    const setCookies = upstreamResponse.headers.getSetCookie ? upstreamResponse.headers.getSetCookie() : [];
    if (setCookies.length > 0) {
      const rewrittenCookies = setCookies.map(cookie => {
        return cookie
          .replace(/Domain=[^;]+;?/gi, '')
          .replace(/Path=[^;]+/gi, 'Path=/')
          .replace(/SameSite=[^;]+/gi, 'SameSite=Lax');
      });
      res.setHeader('Set-Cookie', rewrittenCookies);
    } else {
      const singleSetCookie = upstreamResponse.headers.get('set-cookie');
      if (singleSetCookie) {
        const rewritten = singleSetCookie
          .replace(/Domain=[^;]+;?/gi, '')
          .replace(/Path=[^;]+/gi, 'Path=/')
          .replace(/SameSite=[^;]+/gi, 'SameSite=Lax');
        res.setHeader('Set-Cookie', rewritten);
      }
    }

    // Set content type
    const contentType = upstreamResponse.headers.get('content-type') || 'text/html';
    res.setHeader('Content-Type', contentType);

    // Explicitly delete/omit x-frame-options and strict CSP so iframe renders cleanly
    res.removeHeader('X-Frame-Options');
    res.removeHeader('Content-Security-Policy');

    // If HTML, inject base tag and rewrite links
    if (contentType.includes('text/html')) {
      let html = await upstreamResponse.text();
      
      // Inject base href tag if not present
      if (html.includes('<head>')) {
        html = html.replace(
          '<head>',
          '<head><base href="/portal-laboratorio/"><script>window.__IS_EMBEDDED_VIEWER__=true;</script>'
        );
      } else if (html.includes('<head ')) {
        html = html.replace(
          /<head([^>]*)>/,
          '<head$1><base href="/portal-laboratorio/"><script>window.__IS_EMBEDDED_VIEWER__=true;</script>'
        );
      }

      // Rewrite absolute form actions pointing to LAB_TARGET
      html = html.replaceAll(LAB_TARGET, '/portal-laboratorio');

      res.status(status).send(html);
    } else {
      // Binary or raw assets (images, css, js, fonts, pdfs)
      const arrayBuffer = await upstreamResponse.arrayBuffer();
      res.status(status).send(Buffer.from(arrayBuffer));
    }
  } catch (error) {
    console.error('Error proxying lab portal:', error);
    res.status(502).send(`
      <!DOCTYPE html>
      <html>
        <head><meta charset="utf-8"><title>Error de conexión</title></head>
        <body style="font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #f8fafc;">
          <div style="text-align: center; max-width: 400px; padding: 24px; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            <h3 style="color: #065f46; margin-bottom: 8px;">Conectando con el Portal de Laboratorio</h3>
            <p style="color: #4b5563; font-size: 14px; margin-bottom: 16px;">No se pudo establecer conexión inmediata con el servidor de laboratorio.</p>
            <a href="https://laboratorio.tipocrioverde.com/" target="_blank" rel="noopener" style="display: inline-block; padding: 10px 18px; background: #047857; color: white; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 13px;">Abrir directamente</a>
          </div>
        </body>
      </html>
    `);
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

start();
