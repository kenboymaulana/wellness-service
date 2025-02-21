import { Body, Controller, Post } from "@nestjs/common"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"
import { UserInfo } from "src/core/decorators/UserInfo.Decorator"
import { CheckPermissionRequestDto } from "./CheckPermission.Dto"
import CheckPermissionService from "./CheckPermission.Service"

@ApiTags('Check Permission')
@ApiBearerAuth()
@Controller('check-permission')
export default class CheckPermissionController {
  constructor(
    private readonly checkPermissionService: CheckPermissionService,
    ) {}

  @Post()
  async save(@Body() body:CheckPermissionRequestDto,@UserInfo() user){
    const data = await this.checkPermissionService.checkPermission(body.permission,user.user.id)
    return{data: data}
  }
}