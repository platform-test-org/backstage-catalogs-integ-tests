import { NextFunction, Request, Response, RequestHandler } from 'express';
import { PluginEnvironment } from '../types';
import * as JWT from 'jose';

function setTokenCookie(
  res: Response,
  options: { token: string; secure: boolean; cookieDomain: string },
) {
  try {
      const payload = JWT.decodeJwt(options.token) as object & {
          exp: number;
      };
      res.cookie(`token`, options.token, {
          expires: new Date(payload?.exp ? payload?.exp * 1000 : 0),
          secure: options.secure,
          sameSite: 'lax',
          domain: options.cookieDomain,
          path: '/',
          httpOnly: true,
      });
  } catch (_err) {
      // Ignore
  }
}

export const createAuthMiddleware = async (
  appEnv: PluginEnvironment,
) => {
  const authMiddleware: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { token } = await appEnv.tokenManager.getToken()
      const baseUrl = appEnv.config.getString('backend.baseUrl');
      const secure = baseUrl.startsWith('https://');
      const cookieDomain = new URL(baseUrl).hostname;

      if (!req.headers.authorization) {
        req.headers.authorization = `Bearer ${token}`;
      }

      if (token !== req.cookies['token']) {
        setTokenCookie(res, {
            token,
            secure,
            cookieDomain,
        });
    }
      
      await appEnv.tokenManager.authenticate(token);

      next();
    } catch (error) {
      res.status(401).send('Unauthorized');
    }
  };
  return authMiddleware;
};