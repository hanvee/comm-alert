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
import { EmergencyContactService } from './emergency-contact.service';
import { CreateEmergencyContactDto } from './dto/create-emergency-contact.dto';
import { EmergencyContact } from '@prisma/client';
import { UpdateEmergencyContactDto } from './dto/update-emergency-contact.dto';

@Controller('emergency-contact')
export class EmergencyContactController {
  constructor(private emergencyContactService: EmergencyContactService) {}

  @Get()
  async getEmergencyContacts() {
    return await this.emergencyContactService.findEmergencyContacts();
  }

  @Get(':id')
  async getEmergencyContactById(
    @Param('id') id: number,
  ): Promise<EmergencyContact> {
    return this.emergencyContactService.findEmergencyContactById(id);
  }

  @Post()
  async createEmergencyContact(
    @Body() data: CreateEmergencyContactDto,
  ): Promise<EmergencyContact> {
    return this.emergencyContactService.insertEmergencyContact(data);
  }

  @Patch(':id')
  async updateEmergencyContact(
    @Param('id') id: number,
    @Body() data: UpdateEmergencyContactDto,
  ): Promise<EmergencyContact> {
    return this.emergencyContactService.editEmergencyContact(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteEmergencyContactById(@Param('id') id: number): Promise<void> {
    return this.emergencyContactService.deleteEmergencyContactById(id);
  }
}
