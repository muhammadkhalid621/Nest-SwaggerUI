import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { Model } from 'mongoose';
import { CreateBookDto } from './dto/create-books.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book, BookDocument } from './schemas/book.schema';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<BookDocument>,
  ) {}

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().lean();
  }

  async findById(bookId: string): Promise<Book> {
    const book = await this.bookModel.findOne({ bookId }).lean();
    if (!book) {
      throw new NotFoundException(`No existe el libro con ID ${bookId}`);
    }
    return book;
  }

  async create(book: CreateBookDto): Promise<Book> {
    const bookToCreate: Book = { ...book, bookId: randomUUID() };
    return this.bookModel.create(bookToCreate);
  }

  async updateById(bookId: string, bookUpdates: UpdateBookDto): Promise<Book> {
    return this.bookModel
      .findOneAndUpdate({ bookId }, bookUpdates, {
        new: true,
      })
      .lean();
  }

  async remove(bookId: string): Promise<{ message: string }> {
    const result = await this.bookModel.deleteOne({ bookId });
    if (result.deletedCount === 0) {
      throw new NotFoundException(`No existe el libro con ID ${bookId}`);
    }
    return { message: 'Deleted Successfully' };
  }
}
