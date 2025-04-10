import { CreateDto, PaginationQuery, PutDto, ResponseDto } from 'src/base/Dto.Base';
import Perusahaan from './Perusahaan.Entity';
export declare class PerusahaanRequestDto implements CreateDto<Perusahaan> {
    created_by: string;
    npwp: string;
    name: string;
    contact: string;
    address: string;
}
export declare class PerusahaanPutDto implements PutDto<Perusahaan> {
    updated_by: string;
    npwp: string;
    name: string;
    contact: string;
    address: string;
}
export declare class PerusahaanResponseDto implements ResponseDto<Perusahaan> {
    id: number;
    npwp: string;
    name: string;
    contact: string;
    address: string;
}
export declare class PerusahaanQueryDto extends PaginationQuery {
    id: string;
    src: string;
}
