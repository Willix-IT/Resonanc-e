import { IsString, IsDate } from 'class-validator';
import { Transform } from 'class-transformer';
export class CreateEventDto {
  @IsString()
  title: string;

  @IsDate()
  @Transform(({ value }) => new Date(value)) // Transforme la chaîne en instance de Date
  startTime: Date;

  @IsDate()
  @Transform(({ value }) => new Date(value)) // Transforme la chaîne en instance de Date
  endTime: Date;
}
