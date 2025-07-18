import { IsOptional, IsString, MaxLength } from 'class-validator';

export class ChangeInfoDto {
  @IsString()
  @IsOptional()
  username: string;

  @IsString()
  @IsOptional()
  displayName: string;

  @IsString()
  @IsOptional()
  @MaxLength(300)
  bio: string;
}
