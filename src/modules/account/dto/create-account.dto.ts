import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateAccountDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  accountName?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUUID()
  updatedBy?: string;
}
