import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  IsISBN,
} from 'class-validator';

export class CreateBookDto {
  @ApiProperty({
    example: "Harry Potter and the Philosopher's Stone",
    description: 'The title of the book',
  })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({
    example: 'J.K. Rowling',
    description: 'The author of the book',
  })
  @IsNotEmpty()
  @IsString()
  readonly author: string;

  @ApiProperty({
    example: '978-0590353403',
    description: 'The ISBN of the book',
  })
  @IsNotEmpty()
  @IsString()
  @IsISBN()
  isbn: string;

  @ApiProperty({
    example: ['Fantasy', 'Adventure'],
    description: 'Genres of the book',
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  genres?: string[];
}
