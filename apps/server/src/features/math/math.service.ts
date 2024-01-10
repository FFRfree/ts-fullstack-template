import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class MathService {
  constructor(@Inject('hehe') private shit: any) {}
  add(arr: number[]) {
    return arr.reduce((accu, curr) => accu + curr, 0);
  }
  getToken() {
    return this.shit;
  }
}
