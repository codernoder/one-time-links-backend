import { Exclude, Expose } from 'class-transformer';
import { Link } from '../interfaces/link.interface'

@Exclude()
export class LinkDto implements Link {
    @Expose()
    key: string;

    @Expose()
    originalUrl: string;

    @Expose()
    generatedUrl: string;
}