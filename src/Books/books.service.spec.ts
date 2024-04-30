import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateBookDto } from './dto/create-books.dto';
import { Book } from './schemas/book.schema';
import { BooksService } from './books.service';
import { randomUUID } from 'crypto';

describe('BooksService', () => {
  let service: BooksService;

  const mockBooksRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    create: jest.fn(async (dto) => ({ ...dto, bookId: randomUUID() })),
    deleteOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getModelToken(Book.name),
          useValue: mockBooksRepository,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a book and return it', async () => {
    const dto: CreateBookDto = {
      title: "Harry Potter and the Philosopher's Stone",
      author: 'J.K. Rowling',
      isbn: '978-0590353403',
    };
    const created = await service.create(dto);
    expect(created).toEqual({
      bookId: expect.any(String),
      ...dto,
    });
  });
});
