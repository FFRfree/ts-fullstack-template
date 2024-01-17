import { TRPC_ROUTER } from '@server/common/constant/trpc.constant';

export const TRPCRouter = (namePath: string): ClassDecorator => {
  return (target) => {
    Reflect.defineMetadata(TRPC_ROUTER, namePath, target);
  };
};

export const Procedure = () => {
  return (target: any, key: ) => {
    // 在这里可以添加一些逻辑，例如附加元数据等
    Reflect.defineMetadata('trpc.procedure', true, descriptor.value);
  };
};
