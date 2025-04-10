import { Repository } from 'typeorm';
import MedicalStaff from './MedicalStaff.Entity';
import BaseService from 'src/base/Service.Base';
export default class MedicalStaffService extends BaseService<MedicalStaff> {
    private readonly MedicalStaffRepository;
    constructor(MedicalStaffRepository: Repository<MedicalStaff>);
}
