import { Repository } from 'typeorm';
import Employee from './Employee.Entity';
import BaseService from 'src/base/Service.Base';
export default class EmployeeService extends BaseService<Employee> {
    private readonly EmployeeRepository;
    constructor(EmployeeRepository: Repository<Employee>);
}
