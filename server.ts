import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;
const LAB_TARGET = 'https://laboratorio.tipocrioverde.com';

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
