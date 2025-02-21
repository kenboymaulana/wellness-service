import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CheckPermissionRequestDto {
    @ApiProperty({
        required: true,
        type: 'string',
        name: 'permission',
      })
    @IsString()
    permission: string
}