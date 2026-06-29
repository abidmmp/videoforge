import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../api/query-keys";
import { renderService } from "../services/render.service";

export function useQueue(pollMs = 5_000) {
  return useQuery({
    queryKey: queryKeys.tasks,
    queryFn: ({ signal }) => renderService.list(signal),
    refetchInterval: pollMs,
    enabled: false,
  });
}
