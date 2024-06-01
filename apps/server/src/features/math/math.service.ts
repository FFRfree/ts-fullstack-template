import { Inject, Injectable } from '@nestjs/common';
// import { findUp } from 'find-up';
import { findSourceMap } from 'module';
import path from 'path';
import { cwd } from 'process';
// import { add } from '@server/_shared';
import { findUp } from 'find-up';

// const findUp = await import('find-up');

@Injectable()
export class MathService {
  constructor(@Inject('hehe') private shit: any) {}
  add(arr: number[]) {
    // return add(arr[0], arr[1]);
    return arr.reduce((accu, curr) => accu + curr, 0);
  }
  getToken() {
    return this.shit;
  }

  async test() {
    const filePath = await findUp('package.json');

    return filePath;
  }
}
