import { IsEnum, IsOptional, IsString } from "class-validator";
import { Status } from "../enum/status.enum";

export class UpdateAlertDto {
    @IsOptional()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    detail: string

    @IsOptional()
    @IsString()
    latitude: string

    @IsOptional()
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