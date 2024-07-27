import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Alert } from '@prisma/client';
import { AlertService } from './alert.service';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';

@Controller('alert')
export class AlertController {
  constructor(private alertService: AlertService) {}

  @Get()
  async getAlerts(): Promise<Alert[]> {
    return this.alertService.findAlerts();
  }

  @Get(':id')
  async getAlertById(@Param('id') id: number): Promise<Alert> {
    return this.alertService.findAlertById(id);
  }

  @Post()
  async createAlert(@Body() data: CreateAlertDto): Promise<Alert> {
    return this.alertService.insertAlert(data);
  }

  @Patch(':id')
  async updateAlert(
    @Param('id') id: number,
    @Body() data: UpdateAlertDto,
  ): Promise<Alert> {
    return this.alertService.editAlert(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlertById(@Param('id') id: number): Promise<void> {
    return this.alertService.deleteAlertById(id);
  }
}
