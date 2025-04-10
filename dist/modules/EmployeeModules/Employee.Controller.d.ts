import EmployeeService from './Employee.Service';
import { EmployeePutDto, EmployeeRequestDto, EmployeeResponseDto, CorproateQueryDto } from './Employee.Dto';
export default class EmployeeController {
    private readonly EmployeeService;
    constructor(EmployeeService: EmployeeService);
    index(query: CorproateQueryDto): Promise<{
        data: EmployeeResponseDto[];
        count: number;
    }>;
    save(body: EmployeeRequestDto): Promise<{
        data: EmployeeResponseDto;
    }>;
    update(id: number, body: EmployeePutDto): Promise<{
        data: EmployeeResponseDto;
    }>;
    delete(id: number): Promise<{
        data: any;
    }>;
}
