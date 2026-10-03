import { useQuery } from "@tanstack/react-query";
import { getPageWithSectionsBySlug } from "@/lib/cms/service";

export const usePublishedPage = (slug: string) =>
  useQuery({
    queryKey: ["cms", "published-page", slug],
    queryFn: () => getPageWithSectionsBySlug(slug),
  });
