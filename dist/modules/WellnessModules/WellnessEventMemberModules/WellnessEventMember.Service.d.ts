import { Repository } from 'typeorm';
import WellnessEventMember from './WellnessEventMember.Entity';
import BaseService from 'src/base/Service.Base';
export default class WellnessEventMemberService extends BaseService<WellnessEventMember> {
    private readonly WellnessEventMemberRepository;
    constructor(WellnessEventMemberRepository: Repository<WellnessEventMember>);
}
