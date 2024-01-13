import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
  
  @Injectable()
  export class AdminJwtGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
  
      if (!token) throw new UnauthorizedException();
  
      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: process.env.jwtSecretKey,
        });
       if (payload.role !== 'ADMIN') {
        throw new UnauthorizedException('Нужны админские права');
      }
  
      request.user = payload;
      } catch {
        throw new UnauthorizedException('Нужны админские права');
      }
  
      return true;
    }
  
    private extractTokenFromHeader(request: Request) {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }
  