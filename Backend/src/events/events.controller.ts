import { Controller, Get, Post, Put, Param, Body, Query, UseGuards, Req } from '@nestjs/common';
import { EventsService } from './events.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('events')
// Utilisation du guard JWT pour protéger toutes les routes de ce contrôleur
@UseGuards(JwtAuthGuard)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  // Route GET pour récupérer les événements de l'utilisateur
  @Get()
  async getEvents(@Query('week') week: string, @Req() req: any) {
    const userId = req.user.id;  // Récupère l'ID de l'utilisateur connecté depuis le token JWT
    if (week === 'current') {
      // Si la requête spécifie "current", on récupère les événements de la semaine en cours
      return this.eventsService.getEventsForCurrentWeek(userId);
    }
  }

  // Route POST pour créer un nouvel événement
  @Post()
  async createEvent(@Body() createEventDto: CreateEventDto, @Req() req: any) {
    const userId = req.user.id;  // Récupère l'ID de l'utilisateur connecté
    return this.eventsService.createEvent(createEventDto, userId);  // Appelle le service pour créer l'événement
  }

  // Route PUT pour mettre à jour un événement existant
  @Put(':id')
  async updateEvent(@Param('id') id: string, @Body() updateEventDto: CreateEventDto) {
    return this.eventsService.updateEvent(id, updateEventDto);  // Appelle le service pour mettre à jour l'événement
  }
}
