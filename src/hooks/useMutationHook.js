import { useMutation } from "@tanstack/react-query";
export const useMutationHook = (fnCallBack, fnSuccess, fnError, fnSettled) => {
  const mutaion = useMutation({
    mutationFn: fnCallBack,
    onSuccess: fnSuccess,
    onError: fnError,
    onSettled: fnSettled,
  });
  return mutaion;
};
