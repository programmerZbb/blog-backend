import { IsNotEmpty, IsNumberString } from 'class-validator';

export class ManageDeleteDto {
  @IsNotEmpty()
  @IsNumberString()
  id: number;
}
