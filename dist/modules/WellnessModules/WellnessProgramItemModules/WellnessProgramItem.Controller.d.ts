import WellnessProgramItemService from './WellnessProgramItem.Service';
import { WellnessProgramItemPutDto, WellnessProgramItemRequestDto, WellnessProgramItemResponseDto, WellnessProgramItemQueryDto } from './WellnessProgramItem.Dto';
export default class WellnessProgramItemController {
    private readonly WellnessProgramItemService;
    constructor(WellnessProgramItemService: WellnessProgramItemService);
    index(query: WellnessProgramItemQueryDto): Promise<{
        data: WellnessProgramItemResponseDto[];
        count: number;
    }>;
    getItemTree(query: WellnessProgramItemQueryDto): Promise<{
        data: any[];
    }>;
    save(body: WellnessProgramItemRequestDto): Promise<{
        data: WellnessProgramItemResponseDto;
    }>;
    update(id: number, body: WellnessProgramItemPutDto): Promise<{
        data: WellnessProgramItemResponseDto;
    }>;
    delete(id: number): Promise<{
        data: any;
    }>;
}
