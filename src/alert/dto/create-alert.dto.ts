import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Status } from "../enum/status.enum";

export class CreateAlertDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    detail: string

    @IsNotEmpty()
    @IsString()
    latitude: string

    @IsNotEmpty()
    @IsString()
    longitude: string

    @IsOptional()
    @IsString()
    address: string

    @IsEnum(Status, {
        message: "Status must be report or completed"
    })
    @IsOptional()
    status: Status
}