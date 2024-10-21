// src/auth/jwt.service.ts

import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  private readonly secret: string = 'ganesh@123';
  private readonly expiresIn: string = "1d";

  generateToken(payload: any): string {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
  }

  verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.secret);
    } catch (e) {
      return null;
    }
  }
}
