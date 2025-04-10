import { CreateDto, PaginationQuery, PutDto, ResponseDto } from '../../../base/Dto.Base';
import WellnessProgramItem from './WellnessProgramItem.Entity';
import WellnessItem from '../WellnessItemModules/WellnessItem.Entity';
export declare class WellnessProgramItemRequestDto implements CreateDto<WellnessProgramItem> {
    created_by: string;
    wellness_program_id: number;
    wellness_item_id: number;
}
export declare class WellnessProgramItemPutDto implements PutDto<WellnessProgramItem> {
    updated_by: string;
    wellness_program_id: number;
    wellness_item_id: number;
}
export declare class WellnessProgramItemResponseDto implements ResponseDto<WellnessProgramItem> {
    id: number;
    wellness_program_id: number;
    wellness_item_id: number;
    wellnessItem: WellnessItem;
}
export declare class WellnessProgramItemQueryDto extends PaginationQuery {
    id: string;
    wellness_program_id: string;
    src: string;
}
