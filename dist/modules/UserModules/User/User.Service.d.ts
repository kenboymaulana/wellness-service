import { Repository } from 'typeorm';
import BaseService from '../../../base/Service.Base';
import User from './User.Entity';
export default class UserService extends BaseService<User> {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    checkEmailExist(email: string): Promise<boolean>;
    getOneByEmail(email: string): Promise<User>;
    hashPassword(password: string): Promise<string>;
}
