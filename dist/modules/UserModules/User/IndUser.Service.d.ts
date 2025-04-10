import { Repository } from 'typeorm';
import BaseService from '../../../base/Service.Base';
import User from './User.Entity';
export default class IndUserSerivce extends BaseService<User> {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
}
