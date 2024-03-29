import { Query,UseInterceptors,Controller,UsePipes,ValidationPipe,Body,Post,HttpCode, UploadedFile, ParseFilePipe, FileTypeValidator, Delete, Param, SetMetadata, UseGuards } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { workerDto } from './worker.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Get, Put } from '@nestjs/common/decorators/http';
import { PoiskDto } from './posik.dto';
import { AdminJwtGuard } from 'src/auth/guards/admin.guard';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('worker')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @Get('oldAddWorkers')
  Lol() {
    return this.workerService.addOld()
}  

  // @UseGuards(AdminJwtGuard)
  @UsePipes(new ValidationPipe())
  @HttpCode(201)
  @Post('create')
  @UseInterceptors(FileInterceptor('photo'))
  async createWorker(
    @Body() body: workerDto,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    return this.workerService.create(body, photo)
  }

  // @UseGuards(AdminJwtGuard)
  @Delete(':id')
  @HttpCode(200)
  async del(@Param('id') id: number) {
    return this.workerService.del(id)
  }

  // @UseGuards(AdminJwtGuard)
  @Put(':id')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('photo'))
  async update(@Body() body: workerDto,
  @UploadedFile() photo: Express.Multer.File,
  @Param('id') id: number
  ) {
    return this.workerService.update(id ,body, photo)
  }
  
  // @UseGuards(JwtGuard)
  @Post('all')
  @HttpCode(200)
  async getAllWorkers(@Body() body:PoiskDto) {
    return this.workerService.poiskAll(body)
  }
  
  // @UseGuards(JwtGuard)
  @Get(':id')
  @HttpCode(200)
  async obzorRaba(@Param('id') id:number) {
    return this.workerService.obzorRaba(id)
  }
}