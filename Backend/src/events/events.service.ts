import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity';
import { MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { startOfWeek, endOfWeek } from 'date-fns';

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
}
