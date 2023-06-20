import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class JoinRequestDto {
  @IsEmail()
  @ApiProperty({
    example: '1111@gmail.com',
    description: '이메일',
  })
  public email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'password(decrypted)',
  })
  public password: string;

  
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'first_name',
  })
  public first_name: string;

  
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'last_name',
  })
  public last_name: string;
}


export class SendAuthEmailRequestDto {
  @IsEmail()
  @ApiProperty({
    example: '1111@gmail.com',
    description: '이메일',
  })
  public email: string;

}

export class ConformAuthEmailRequestDto {
  @IsEmail()
  @ApiProperty({
    example: '1111@gmail.com',
    description: '이메일',
  })
  public email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'validCode',
  })
  public code: string;

}

