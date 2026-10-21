import { loadEnv } from 'vite';
import onboardBusiness from './api/onboard-business.js';

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];

    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

function createVercelResponse(res) {
  return {
    status(code) {
      res.statusCode = code;
      return this;
    },
    json(payload) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(payload));
      return this;
    },
  };
}

export function apiDevPlugin() {
  return {
    name: 'privacy-policies-api-dev',
    configureServer(server) {
      const mode = server.config.mode;
      const env = loadEnv(mode, process.cwd(), '');
      Object.assign(process.env, env);
      process.env.ONBOARD_WRITE_LOCAL = 'true';

      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0];

        if (url !== '/api/onboard-business') {
          next();
          return;
        }

        try {
          if (req.method === 'POST') {
            const rawBody = await readRequestBody(req);
            req.body = rawBody ? JSON.parse(rawBody) : {};
          }

          await onboardBusiness(req, createVercelResponse(res));
        } catch (error) {
          console.error('[api/onboard-business]', error);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({
            error: error.message || 'Internal server error.',
          }));
        }
      });
    },
  };
}
