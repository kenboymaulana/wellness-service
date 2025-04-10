import { CreateDto, PaginationQuery, PutDto, ResponseDto } from '../../../base/Dto.Base';
import WellnessItem from './WellnessItem.Entity';
export declare class WellnessItemRequestDto implements CreateDto<WellnessItem> {
    created_by: string;
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
export declare class WellnessItemPutDto implements PutDto<WellnessItem> {
    updated_by: string;
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
export declare class WellnessItemResponseDto implements ResponseDto<WellnessItem> {
    id: number;
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
export declare class WellnessItemQueryDto extends PaginationQuery {
    id: string;
    src: string;
}
