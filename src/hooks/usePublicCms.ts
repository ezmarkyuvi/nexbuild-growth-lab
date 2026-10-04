import { useQuery } from "@tanstack/react-query";
import { getMenu, getSiteSettings } from "@/lib/cms/service";
import { defaultFooterMenu, defaultHeaderMenu, defaultSiteSettings } from "@/lib/cms/fallbackContent";

export const usePublicCms = () => {
  const { data: headerMenu = defaultHeaderMenu } = useQuery({
    queryKey: ["cms", "menu", "header"],
    queryFn: () => getMenu("header"),
  });

  const { data: footerMenu = defaultFooterMenu } = useQuery({
    queryKey: ["cms", "menu", "footer"],
    queryFn: () => getMenu("footer"),
  });

  const { data: settings = defaultSiteSettings } = useQuery({
    queryKey: ["cms", "site-settings"],
    queryFn: getSiteSettings,
  });

  return {
    headerMenu,
    footerMenu,
    settings,
  };
};
