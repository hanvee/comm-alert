import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateAlertDto } from './dto/create-alert.dto';
import { Alert } from '@prisma/client';
import { UpdateAlertDto } from './dto/update-alert.dto';

@Injectable()
export class AlertService {
    constructor(private prisma: PrismaService) {}

    async findAlerts(): Promise<Alert[]> {
        return await this.prisma.alert.findMany();
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
