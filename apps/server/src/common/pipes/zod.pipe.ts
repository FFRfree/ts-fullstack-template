import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { Schema } from 'zod';
@Injectable()
export class ZodPipe implements PipeTransform {
  constructor(private schema: Schema) {}
  transform(value: any, metadata: ArgumentMetadata) {
    this.schema.parse(value);
    return value;
  }
}
