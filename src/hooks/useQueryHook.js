import { useQuery } from "@tanstack/react-query";

export const useQueryHook = (key, fnCallBack, option) => {
  const query = useQuery({
    queryKey: [...key],
    queryFn: fnCallBack,
    ...option,
  });
  return query;
};
