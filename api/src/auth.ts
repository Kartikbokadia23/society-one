import jwt from 'jsonwebtoken';
import type { Role } from '@societyone/shared';

export interface TokenPayload {
  sub: string;
  societyId: string;
  role: Role;
}

export const signToken = (p: TokenPayload, secret: string, expiresIn: jwt.SignOptions['expiresIn'] = '7d') =>
  jwt.sign(p, secret, { expiresIn });

export const verifyToken = (token: string, secret: string): TokenPayload =>
  jwt.verify(token, secret) as TokenPayload & jwt.JwtPayload;
