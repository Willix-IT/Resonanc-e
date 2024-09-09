import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Import du module TypeORM pour l'entité User
    PassportModule, // Utilisation du module Passport pour l'authentification
    JwtModule.registerAsync({
      imports: [ConfigModule], // Import du module de configuration pour accéder aux variables d'environnement
      inject: [ConfigService], // Injection du service de configuration pour accéder aux variables
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Récupère la clé secrète JWT depuis les variables d'environnement
        signOptions: { expiresIn: '60m' }, // Durée de validité des tokens JWT : 60 minutes
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy], // Fournit le service d'authentification et la stratégie JWT
  controllers: [AuthController], // Déclare le contrôleur d'authentification pour gérer les routes
})
// Le module AuthModule gère toute la logique d'authentification, incluant JWT et Passport.
export class AuthModule {}
