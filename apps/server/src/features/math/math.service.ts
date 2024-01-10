import { Injectable } from '@nestjs/common';

@Injectable()
export class MathService {
  add(arr: number[]) {
    return arr.reduce((accu, curr) => accu + curr, 0);
  }
}
