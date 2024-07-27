import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateAlertDto } from './dto/create-alert.dto';
import { Alert } from '@prisma/client';
import { UpdateAlertDto } from './dto/update-alert.dto';

@Injectable()
export class AlertService {
    constructor(private prisma: PrismaService) {}

    async findAlerts(query?: string, page: number = 1, limit: number = 10): Promise<Alert[]> {
        const skip = (page - 1) * limit;
    
        if (query) {
          return await this.prisma.alert.findMany({
            where: {
              OR: [
                { title: { contains: query, mode: 'insensitive' } },
              ],
            },
            skip: Number(skip),
            take: Number(limit),
          });
        }
    
        return await this.prisma.alert.findMany({
            skip: Number(skip),
            take: Number(limit),
        });
      }

    async findAlertById(id: number): Promise<Alert> {
        const alert = await this.prisma.alert.findUnique({
            where: {
                id: Number(id),
            },
        });

        if (!alert) {
            throw new NotFoundException('alert not found');
        }

        return alert;
    }

    async insertAlert(data: CreateAlertDto): Promise<Alert> {
        return await this.prisma.alert.create({
            data,
        });
    }

    async editAlert(id: number, data: UpdateAlertDto): Promise<Alert> {
        await this.findAlertById(id);

        return await this.prisma.alert.update({
            where: {
                id: Number(id),
            },
            data,
        });
    }

    async deleteAlertById(id: number): Promise<void> {
        await this.findAlertById(id);

        await this.prisma.alert.delete({
            where: {
                id: Number(id),
            },
        });
    }
}
