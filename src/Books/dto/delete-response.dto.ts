import { ApiProperty } from '@nestjs/swagger';

export class DeleteBookResponse {
  @ApiProperty({
    example: 1,
    description: 'Number of removed books',
  })
  deletedCount: number;
}
