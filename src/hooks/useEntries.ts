import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getEntries, addEntry, DailyEntry } from "@/services/api";

export const useEntries = () => {
  return useQuery({
    queryKey: ["entries"],
    queryFn: getEntries,
  });
};

export const useAddEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DailyEntry) => addEntry(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["entries"] });
    },
  });
};
