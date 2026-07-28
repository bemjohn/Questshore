import { siteSettingsFallback, type SiteSettingsContent } from "./siteSettings.fallback";

export function mergeSiteSettingsContent(sanity: any): SiteSettingsContent {
  return {
    exchangeRate:
      sanity?.exchangeRate ?? siteSettingsFallback.exchangeRate,
  };
}
