import WellnessProgramsService from './WellnessPrograms.Service';
import WellnessProgramItemService from '../WellnessProgramItemModules/WellnessProgramItem.Service';
import { WellnessProgramsPutDto, WellnessProgramsRequestDto, WellnessProgramsResponseDto, WellnessProgramsQueryDto, WellnessProgramsItemsRequestDto } from './WellnessPrograms.Dto';
export default class WellnessProgramsController {
    private readonly WellnessProgramsService;
    private readonly wellnessProgramItemService;
    constructor(WellnessProgramsService: WellnessProgramsService, wellnessProgramItemService: WellnessProgramItemService);
    index(query: WellnessProgramsQueryDto): Promise<{
        data: WellnessProgramsResponseDto[];
        count: number;
    }>;
    save(body: WellnessProgramsRequestDto): Promise<{
        data: WellnessProgramsResponseDto;
    }>;
    update(id: number, body: WellnessProgramsPutDto): Promise<{
        data: WellnessProgramsResponseDto;
    }>;
    delete(id: number): Promise<{
        data: any;
    }>;
    saveWnProgramItems(body: WellnessProgramsItemsRequestDto): Promise<{
        data: WellnessProgramsResponseDto;
    }>;
}
