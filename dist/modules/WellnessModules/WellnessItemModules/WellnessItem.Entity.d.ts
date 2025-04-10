import { BaseEntityUuid } from '../../../base/Entity.Base';
export default class WellnessItem extends BaseEntityUuid {
    main_id: string;
    parent_id: string;
    level: number;
    sort: number;
    header: number;
    code: string;
    name: string;
    name_eng: string;
    desc: string;
}
