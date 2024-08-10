import { toast } from "@/components/ui/use-toast";

export const catchApiError = async <Resp>(
  fn: () => Promise<Resp>,
  opts?: {
    onSuccess?: (resp: Resp) => void;
    onError?: (error: unknown) => void;
  }
) => {
  try {
    const resp = await fn();
    opts?.onSuccess?.(resp);
    return true;
  } catch (error: any) {
    opts?.onError?.(error);
    if (error?.shape?.message) {
      toast({
        variant: "destructive",
        description: error?.shape?.message,
      });
    }
    return false;
  }
};
