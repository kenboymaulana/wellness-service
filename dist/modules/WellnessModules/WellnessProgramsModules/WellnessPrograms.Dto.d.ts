import { CreateDto, PaginationQuery, PutDto, ResponseDto } from '../../../base/Dto.Base';
import WellnessPrograms from './WellnessPrograms.Entity';
export declare class WellnessProgramsRequestDto implements CreateDto<WellnessPrograms> {
    created_by: string;
    code: string;
    name: string;
    wellness_program_id: number;
    wellness_item_id: [];
}
export declare class WellnessProgramsItemsRequestDto {
    created_by: string;
    id: number;
    wellness_program_id: number;
    wellness_item_id: [];
}
export declare class WellnessProgramsPutDto implements PutDto<WellnessPrograms> {
    updated_by: string;
    code: string;
    name: string;
}
export declare class WellnessProgramsResponseDto implements ResponseDto<WellnessPrograms> {
    id: number;
    code: string;
    name: string;
}
export declare class WellnessProgramsQueryDto extends PaginationQuery {
    id: string;
    src: string;
}
