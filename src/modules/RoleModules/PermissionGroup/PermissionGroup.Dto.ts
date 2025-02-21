
import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsOptional, IsSemVer, IsString } from "class-validator";
import { PaginationQuery, ResponseDto } from "src/base/Dto.Base";
import Permission from "../Permission/Permission.Entity";
import PermisionGroup from "./PermissionGroup.Entity";

@Exclude()
export class PermissionGroupResponseDto implements ResponseDto<PermisionGroup> {
 @Expose()
 id: number

 @Expose()
 name:string

 @Expose()
 icon:string

 @Expose()
 sort:number

 @Expose()
 permission: Permission[]
 
}

export class PermissionGroupQueryDto extends PaginationQuery{
    @ApiProperty({
        required: false,
        type: 'string',
        name: 'name',
      })
    @IsOptional()
    @IsString()
    name:string
}