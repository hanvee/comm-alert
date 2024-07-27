import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateEmergencyContactDto {  
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    phone: string

    @IsOptional()
    @IsString()
    email: string

    @IsOptional()
    @IsString()
    address: string
}