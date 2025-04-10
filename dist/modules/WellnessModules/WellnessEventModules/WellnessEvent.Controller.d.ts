import WellnessEventService from './WellnessEvent.Service';
import { WellnessEventPutDto, WellnessEventRequestDto, WellnessEventResponseDto, WellnessEventQueryDto } from './WellnessEvent.Dto';
export default class WellnessEventController {
    private readonly WellnessEventService;
    constructor(WellnessEventService: WellnessEventService);
    index(users: any, query: WellnessEventQueryDto): Promise<{
        data: WellnessEventResponseDto[];
        count: number;
    }>;
    save(body: WellnessEventRequestDto): Promise<{
        data: WellnessEventResponseDto;
    }>;
    update(id: number, body: WellnessEventPutDto): Promise<{
        data: WellnessEventResponseDto;
    }>;
    delete(id: number): Promise<{
        data: any;
    }>;
}
