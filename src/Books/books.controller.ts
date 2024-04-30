import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateBookDto } from './dto/create-books.dto';
import { DeleteBookResponse } from './dto/delete-response.dto';
import { FindOneParams } from './dto/find-one-params.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './schemas/book.schema';
import { BooksService } from './books.service';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiOperation({ description: 'Get all books' })
  @ApiOkResponse({
    description: 'The books were successfully obtained.',
    type: [Book],
  })
  async getAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Get(':bookId')
  @ApiOperation({
    description: 'Get a book by bookId.',
  })
  @ApiOkResponse({
    description: 'The book was successfully obtained.',
    type: Book,
  })
  async getById(@Param() { bookId }: FindOneParams): Promise<Book> {
    return this.booksService.findById(bookId);
  }

  @Post()
  @ApiOperation({ description: 'Create a book.' })
  @ApiCreatedResponse({
    description: 'The book has been successfully created.',
    type: Book,
  })
  async create(@Body() book: CreateBookDto): Promise<Book> {
    return this.booksService.create(book);
  }

  @Patch(':bookId')
  @ApiOperation({
    description: 'Update a book by bookId.',
  })
  @ApiOkResponse({
    description: 'The book was successfully updated.',
    type: Book,
  })
  async update(
    @Param() { bookId }: FindOneParams,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    return this.booksService.updateById(bookId, updateBookDto);
  }

  @Delete(':bookId')
  @ApiOperation({
    description: 'Delete a book by bookId.',
  })
  @ApiOkResponse({
    description: 'The book was successfully deleted.',
    type: DeleteBookResponse,
  })
  async deleteById(
    @Param() { bookId }: FindOneParams,
  ): Promise<{ message: string }> {
    return this.booksService.remove(bookId);
  }
}
