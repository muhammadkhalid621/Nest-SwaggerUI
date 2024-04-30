import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { CreateBookDto } from './dto/create-books.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './schemas/book.schema';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

describe('BooksController', () => {
  let controller: BooksController;

  const mockBookService = {
    create: jest.fn((dto: CreateBookDto) => ({
      ...dto,
      bookId: randomUUID(),
    })),

    update: jest.fn().mockImplementation((bookId, dto) => ({
      bookId,
      ...dto,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService],
    })
      .overrideProvider(BooksService)
      .useValue(mockBookService)
      .compile();

    controller = module.get<BooksController>(BooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a book', async () => {
    const dto: CreateBookDto = {
      title: "Harry Potter and the Philosopher's Stone",
      author: 'J.K. Rowling',
      isbn: '978-0590353403',
    };
    const created: Book = await controller.create(dto);
    expect(created).toEqual({
      bookId: expect.any(String),
      ...dto,
    });

    expect(mockBookService.create).toHaveBeenCalled();
    expect(mockBookService.create).toHaveBeenCalledWith(dto);
  });

  it('should update a book', async () => {
    const dto: UpdateBookDto = {
      title: 'Harry Potter and the Chamber of Secrets',
    };
    const bookId = 'abc';
    const updated: Book = await controller.update({ bookId }, dto);
    expect(updated).toEqual({
      bookId,
      ...dto,
    });

    expect(mockBookService.update).toHaveBeenCalled();
  });
});
