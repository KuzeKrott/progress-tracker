import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getNotes, addNote, Note } from "@/services/api";

export const useNotes = () => {
  return useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
  });
};

export const useAddNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (note: Note) => addNote(note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
};
