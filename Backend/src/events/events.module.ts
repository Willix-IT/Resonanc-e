import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { Event } from './event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event])], // Import du module TypeORM avec l'entité Event pour la gestion de la base de données
  controllers: [EventsController], // Déclaration du contrôleur des événements
  providers: [EventsService], // Déclaration du service des événements qui gère la logique métier
})
// Le module EventsModule est responsable de la gestion des événements, incluant leur création, mise à jour et récupération.
export class EventsModule {}
