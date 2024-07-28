import { Exclude, Expose } from 'class-transformer';
import { CreateLink } from '../interfaces/create-link.interface';
import { IsUrl } from 'class-validator';

@Exclude()
export class CreateLinkDto implements CreateLink {
    @Expose()
    @IsUrl()
    originalUrl: string;
}
