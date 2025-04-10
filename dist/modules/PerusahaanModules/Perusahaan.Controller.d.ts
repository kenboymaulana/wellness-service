import PerusahaanService from './Perusahaan.Service';
import { PerusahaanPutDto, PerusahaanRequestDto, PerusahaanResponseDto, PerusahaanQueryDto } from './Perusahaan.Dto';
export default class PerusahaanController {
    private readonly PerusahaanService;
    constructor(PerusahaanService: PerusahaanService);
    index(query: PerusahaanQueryDto): Promise<{
        data: PerusahaanResponseDto[];
        count: number;
    }>;
    save(body: PerusahaanRequestDto): Promise<{
        data: PerusahaanResponseDto;
    }>;
    update(id: number, body: PerusahaanPutDto): Promise<{
        data: PerusahaanResponseDto;
    }>;
    delete(id: number): Promise<{
        data: any;
    }>;
}
