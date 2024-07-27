import { Injectable, NotFoundException } from '@nestjs/common';
import { EmergencyContact } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateEmergencyContactDto } from './dto/create-emergency-contact.dto';
import { UpdateEmergencyContactDto } from './dto/update-emergency-contact.dto';

@Injectable()
export class EmergencyContactService {
  constructor(private prisma: PrismaService) {}

  async findEmergencyContacts(query?: string, page: number = 1, limit: number = 10): Promise<EmergencyContact[]> {
    const skip = (page - 1) * limit;

    if (query) {
      return await this.prisma.emergencyContact.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { email: { contains: query, mode: 'insensitive' } },
          ],
        },
        skip: Number(skip),
        take: Number(limit),
      });
    }

    return await this.prisma.emergencyContact.findMany({
        skip: Number(skip),
        take: Number(limit),
    });
  }

  async findEmergencyContactById(id: number): Promise<EmergencyContact> {
    const emergencyContact = await this.prisma.emergencyContact.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!emergencyContact) {
      throw new NotFoundException('emergency contact not found');
    }

    return emergencyContact;
  }

  async insertEmergencyContact(
    data: CreateEmergencyContactDto,
  ): Promise<EmergencyContact> {
    return await this.prisma.emergencyContact.create({
      data,
    });
  }

  async editEmergencyContact(
    id: number,
    data: UpdateEmergencyContactDto,
  ): Promise<EmergencyContact> {
    await this.findEmergencyContactById(id);

    return await this.prisma.emergencyContact.update({
      where: {
        id: Number(id),
      },
      data,
    });
  }

  async deleteEmergencyContactById(id: number): Promise<void> {
    await this.findEmergencyContactById(id);

    await this.prisma.emergencyContact.delete({
      where: {
        id: Number(id),
      },
    });
  }
}
