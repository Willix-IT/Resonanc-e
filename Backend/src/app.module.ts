import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { User } from './users/user.entity';
import { Event } from './events/event.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Le module de configuration est accessible globalement à toute l'application
    }),

    // Configuration asynchrone de TypeORM avec PostgreSQL, basée sur les variables d'environnement
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Import du module de configuration pour accéder aux variables
      inject: [ConfigService], // Injection du service de configuration
      useFactory: (configService: ConfigService) => ({
        type: 'postgres', // Utilisation de la base de données PostgreSQL
        host: configService.get<string>('DB_HOST'), // Récupère l'hôte de la base de données depuis les variables d'environnement
        port: configService.get<number>('DB_PORT'), // Récupère le port de la base de données
        username: configService.get<string>('DB_USERNAME'), // Récupère le nom d'utilisateur
        password: configService.get<string>('DB_PASSWORD'), // Récupère le mot de passe
        database: configService.get<string>('DB_NAME'), // Récupère le nom de la base de données
        entities: [User, Event], // Entités utilisées dans la base de données (User et Event)
        synchronize: true, // Synchronisation automatique des schémas de base de données (ne pas utiliser en production)
      }),
    }),
    AuthModule, // Module d'authentification
    EventsModule, // Module de gestion des événements
  ],
  controllers: [AppController], // Déclaration du contrôleur principal
  providers: [AppService], // Déclaration du service principal
})
// AppModule est le module racine de l'application, qui configure l'accès à la base de données, l'authentification, et les événements.
export class AppModule {}
