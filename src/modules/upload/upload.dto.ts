import {
  IsString,
  IsNotEmpty,
  Length,
  IsNumber,
  ArrayMinSize,
  IsOptional,
  MaxLength,
} from 'class-validator';

export class UploadDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  filename: string;

  @IsOptional()
  // 加上这个就表示数组 each: true
  @IsNumber({ allowNaN: false, allowInfinity: false }, { each: true })
  // 如上表示数组，这个要求必须有一个元素
  @ArrayMinSize(0)
  tags?: Array<string>;
}
