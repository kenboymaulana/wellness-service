import { CheckPermissionRequestDto } from "./CheckPermission.Dto";
import CheckPermissionService from "./CheckPermission.Service";
export default class CheckPermissionController {
    private readonly checkPermissionService;
    constructor(checkPermissionService: CheckPermissionService);
    save(body: CheckPermissionRequestDto, user: any): Promise<{
        data: boolean;
    }>;
}
