import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { EmergencyContactModule } from './emergency-contact/emergency-contact.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }), 
    AuthModule, EmergencyContactModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
