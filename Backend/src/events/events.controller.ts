import { Controller, Get, Post, Put, Param, Body, Query, UseGuards, Req } from '@nestjs/common';
import { EventsService } from './events.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('events')
@UseGuards(JwtAuthGuard)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async getEvents(@Query('week') week: string, @Req() req: any) {
    const userId = req.user.id;
    if (week === 'current') {
      return this.eventsService.getEventsForCurrentWeek(userId);
    }
  }

  @Post()
  async createEvent(@Body() createEventDto: CreateEventDto, @Req() req: any) {
    const userId = req.user.id;
    return this.eventsService.createEvent(createEventDto, userId);
  }

  @Put(':id')
  async updateEvent(@Param('id') id: string, @Body() updateEventDto: CreateEventDto) {
    return this.eventsService.updateEvent(id, updateEventDto);
  }
}

