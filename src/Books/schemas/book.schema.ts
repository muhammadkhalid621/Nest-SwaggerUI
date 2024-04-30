import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema({ timestamps: true, versionKey: false })
export class Book {
  @ApiProperty({
    example: '8104f19c-a2d8-40f7-9a0b-12f4c6a4b80a',
    description: 'The ID of the book',
  })
  @Prop({
    required: true,
    index: { unique: true },
    default: () => randomUUID(),
  })
  bookId: string;

  @ApiProperty({
    example: "Harry Potter and the Philosopher's Stone",
    description: 'The title of the book',
  })
  @Prop({ required: true, trim: true })
  title: string;

  @ApiProperty({
    example: 'J.K. Rowling',
    description: 'The author of the book',
  })
  @Prop({ required: true, trim: true })
  author: string;

  @ApiProperty({
    example: '978-0590353403',
    description: 'The ISBN of the book',
  })
  @Prop({ required: true, trim: true })
  isbn: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
