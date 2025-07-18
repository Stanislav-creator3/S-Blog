import { IsNotEmpty, IsUUID } from 'class-validator';

export class VerifyDto {
  @IsUUID()
  @IsNotEmpty()
  token: string;
}
