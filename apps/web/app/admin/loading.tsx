import { Loader2 } from "lucide-react";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className=" h-full flex justify-center items-center">
      <Loader2 size={30} className=" animate-spin"></Loader2>
    </div>
  );
}
