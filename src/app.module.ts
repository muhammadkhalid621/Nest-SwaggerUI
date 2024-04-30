import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksModule } from './Books/books.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'), BooksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
