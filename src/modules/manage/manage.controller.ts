import {
  Controller,
  Post,
  Inject,
  Body,
  InternalServerErrorException,
} from '@nestjs/common';

import { ManageService } from './manage.service';
import { ManageDeleteDto } from './manage.dto';

@Controller('manage')
export class ManageController {
  @Inject(ManageService)
  private manageService: ManageService;

  @Post('delete')
  public async delete(@Body() body: ManageDeleteDto) {
    try {
      await this.manageService.delete(body.id);
    } catch (err) {
      throw new InternalServerErrorException('删除失败');
    }
  }
}
