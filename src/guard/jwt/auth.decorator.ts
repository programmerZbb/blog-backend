import { SetMetadata } from '@nestjs/common';

export const NEED_AUTH = 'NEED_AUTH';

export const NeedAuth = (need: boolean) => SetMetadata(NEED_AUTH, need);
