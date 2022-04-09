import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';

export class CreateCatDto {
  eae: string;
}
@Controller('test')
export class TestController {
  constructor(private prisma: PrismaService) {}

  @Get('/ok')
  @UseGuards(AuthorizationGuard)
  hello() {
    return this.prisma.customer.findMany();
  }

  @Post('/ok')
  @UseGuards(AuthorizationGuard)
  hello2(@Body() eae: CreateCatDto) {
    console.log(eae);
    return 'Ok';
  }
}
