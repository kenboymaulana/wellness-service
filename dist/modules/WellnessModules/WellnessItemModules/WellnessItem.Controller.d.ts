import WellnessItemService from './WellnessItem.Service';
import { WellnessItemPutDto, WellnessItemRequestDto, WellnessItemResponseDto, WellnessItemQueryDto } from './WellnessItem.Dto';
export default class WellnessItemController {
    private readonly WellnessItemService;
    constructor(WellnessItemService: WellnessItemService);
    index(query: WellnessItemQueryDto): Promise<{
        data: WellnessItemResponseDto[];
        count: number;
    }>;
    getItemTree(query: WellnessItemQueryDto): Promise<{
        data: any[];
    }>;
    save(body: WellnessItemRequestDto): Promise<{
        data: WellnessItemResponseDto;
    }>;
    update(id: number, body: WellnessItemPutDto): Promise<{
        data: WellnessItemResponseDto;
    }>;
    delete(id: number): Promise<{
        data: any;
    }>;
}
