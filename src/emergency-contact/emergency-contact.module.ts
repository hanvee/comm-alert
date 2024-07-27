import { Module } from '@nestjs/common';
import { EmergencyContactController } from './emergency-contact.controller';
import { EmergencyContactService } from './emergency-contact.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [EmergencyContactController],
  providers: [EmergencyContactService, PrismaService]
})
export class EmergencyContactModule {}
