import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity';
import { MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { startOfWeek, endOfWeek } from 'date-fns';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
// Le service EventsService gère la logique métier concernant les événements (création, mise à jour, récupération).
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>, // Injection du dépôt pour gérer l'entité Event
  ) {}

  // Méthode pour récupérer les événements de la semaine courante pour un utilisateur donné
  async getEventsForCurrentWeek(userId: number) {
    const now = new Date();
    const startOfCurrentWeek = startOfWeek(now); // Début de la semaine
    const endOfCurrentWeek = endOfWeek(now); // Fin de la semaine

    // Recherche des événements de la semaine pour l'utilisateur
    return this.eventsRepository.find({
      where: {
        user: { id: userId }, // Filtre par utilisateur
        startTime: MoreThanOrEqual(startOfCurrentWeek), // Événements débutant à partir du début de la semaine
        endTime: LessThanOrEqual(endOfCurrentWeek), // Événements se terminant avant la fin de la semaine
      },
    });
  }

  // Méthode pour créer un nouvel événement
  async createEvent(
    createEventDto: CreateEventDto,
    userId: number,
  ): Promise<Event> {
    // Création d'un nouvel événement avec les informations fournies et l'utilisateur associé
    const event = this.eventsRepository.create({
      ...createEventDto,
      user: { id: userId },
    });

    // Insertion de l'événement dans la base de données
    await this.eventsRepository.insert(event);

    // Optionnel : Retourner l'événement créé
    return this.eventsRepository.findOne({
      where: { title: createEventDto.title, user: { id: userId } },
    });
  }

  // Méthode pour mettre à jour un événement existant
  async updateEvent(
    id: string,
    updateEventDto: CreateEventDto,
  ): Promise<Event> {
    const event = await this.eventsRepository.findOneBy({ id: +id }); // Recherche de l'événement par ID
    if (!event) {
      throw new Error('Event not found'); // Erreur si l'événement n'est pas trouvé
    }

    // Mise à jour des informations de l'événement
    event.title = updateEventDto.title;
    event.startTime = new Date(updateEventDto.startTime);
    event.endTime = new Date(updateEventDto.endTime);

    return this.eventsRepository.save(event); // Sauvegarde des modifications
  }
}
