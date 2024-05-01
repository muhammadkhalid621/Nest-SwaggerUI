import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, IsISBN } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({
    required: true,
    example: "Harry Potter and the Philosopher's Stone",
    description: 'The title of the book',
  })
  // @IsNotEmpty({ message: 'Title should not be empty' })
  @IsString({ message: 'Title should be a string' })
  title: string;

  @ApiProperty({
    required: true,
    example: 'J.K. Rowling',
    description: 'The author of the book',
  })
  // @IsNotEmpty({ message: 'Author should not be empty' })
  @IsString({ message: 'Author should be a string' })
  author: string;

  @ApiProperty({
    required: true,
    example: '978-0590353403',
    description: 'The ISBN of the book',
  })
  // @IsNotEmpty({ message: 'ISBN should not be empty' })
  @IsString({ message: 'ISBN should be a string' })
  @IsISBN()
  isbn: string;

  @ApiProperty({
    example: ['Fantasy', 'Adventure'],
    description: 'Genres of the book',
    required: false,
  })
  @IsOptional()
  @IsArray({ message: 'Genres should be an array' })
  @IsString({ each: true, message: 'Each genre should be a string' })
  genres?: string[];
}
