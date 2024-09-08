import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { JwtAuthGuard } from '@src/auth/jwt-auth.guard';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @UseGuards(JwtAuthGuard) // Vérifie que l'utilisateur est connecté
  @Get()
  async getEvents(@Query('week') week: string, @Req() req: any) {
    const userId = req.user.id; // Récupère l'ID de l'utilisateur connecté
    if (week === 'current') {
      return this.eventsService.getEventsForCurrentWeek(userId);
    }
    // Gestion d'autres cas éventuels
  }
}
