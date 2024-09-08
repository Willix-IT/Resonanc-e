import { IsString, IsDate } from 'class-validator';

export class CreateEventDto {
  @IsString()
  title: string;

  @IsDate()
  startTime: Date;

  @IsDate()
  endTime: Date;
}
