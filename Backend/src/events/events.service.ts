import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity';
import { MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { startOfWeek, endOfWeek } from 'date-fns';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
  ) {}

  async getEventsForCurrentWeek(userId: number) {
    const now = new Date();
    const startOfCurrentWeek = startOfWeek(now);
    const endOfCurrentWeek = endOfWeek(now);

    return this.eventsRepository.find({
      where: {
        user: { id: userId },
        startTime: MoreThanOrEqual(startOfCurrentWeek),
        endTime: LessThanOrEqual(endOfCurrentWeek),
      },
    });
  }

  async createEvent(
    createEventDto: CreateEventDto,
    userId: number,
  ): Promise<Event> {
    const event = this.eventsRepository.create({
      ...createEventDto,
      user: { id: userId },
    });
    // Utilise `insert` au lieu de `save` pour forcer l'insertion
    await this.eventsRepository.insert(event);

    // Optionnel : Utiliser `findOne` pour retourner l'événement créé
    return this.eventsRepository.findOne({
      where: { title: createEventDto.title, user: { id: userId } },
    });
  }
}
