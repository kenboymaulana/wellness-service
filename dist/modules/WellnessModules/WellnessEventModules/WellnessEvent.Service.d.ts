import { Repository } from 'typeorm';
import Employee from './WellnessEvent.Entity';
import BaseService from 'src/base/Service.Base';
export default class EmployeeService extends BaseService<Employee> {
    private readonly EmployeeRepository;
    constructor(EmployeeRepository: Repository<Employee>);
}
