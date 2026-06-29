import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../api/query-keys";
import { settingsService } from "../services/settings.service";

export function useApiHealth(pollMs = 30_000) {
  return useQuery({
    queryKey: queryKeys.health,
    queryFn: ({ signal }) => settingsService.health(signal),
    refetchInterval: pollMs,
    staleTime: 10_000,
    enabled: false, // Phase 8B will flip this on at the provider level.
  });
}
