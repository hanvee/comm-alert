import { Injectable } from '@nestjs/common';
import { EmergencyContact } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateEmergencyContactDto } from './dto/create-emergency-contact.dto';
import { UpdateEmergencyContactDto } from './dto/update-emergency-contact.dto';

@Injectable()
export class EmergencyContactService {
    constructor(private prisma: PrismaService) {}

    async findEmergencyContacts() {
        return await this.prisma.emergencyContact.findMany();
    }

    async findEmergencyContactById(id: number): Promise<EmergencyContact> {
        return await this.prisma.emergencyContact.findUnique({
            where: {
                id: Number(id)
            },
        });
    }

    async insertEmergencyContact(data: CreateEmergencyContactDto): Promise<EmergencyContact> {
        return await this.prisma.emergencyContact.create({
            data,
        });
    }

    async editEmergencyContact(id: number, data: UpdateEmergencyContactDto): Promise<EmergencyContact> {
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
                id: Number(id)
            },
        });
    }
}
