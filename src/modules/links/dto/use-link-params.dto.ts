import { Exclude, Expose } from 'class-transformer';
import { UseLinkParams } from '../interfaces/use-link-params.interface';
import { IsUUID } from 'class-validator';
import { LinksConstants } from 'src/common/modules/constants/links.constants';

@Exclude()
export class UseLinkParamsDto implements UseLinkParams {
    @Expose()
    // Сообщение по UUID намеренно заменено на более абстрактное
    @IsUUID(4, { message: LinksConstants.INCORRECT_ERROR_MESSAGE })
    key: string;
}