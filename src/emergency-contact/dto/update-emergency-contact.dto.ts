import { IsOptional, IsString } from "class-validator";

export class UpdateEmergencyContactDto {  
    @IsOptional()
    @IsString()
    name: string

    @IsOptional()
    @IsString()
    phone: string

    @IsOptional()
    @IsString()
    email: string

    @IsOptional()
    @IsString()
    address: string
}