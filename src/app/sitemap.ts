import type { MetadataRoute } from "next";
import { TEAM_CATEGORIES } from "@/lib/team-categories";

const siteUrl = "https://www.ieeecssuperioruniversity.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const publicPages = [
    "",
    "/about",
    "/events",
    "/team",
    "/contact",
    "/verify",
  ];

  return [
    ...publicPages.map((path) => ({
      url: `${siteUrl}${path}`,
      changeFrequency: "weekly" as const,
    })),
    ...TEAM_CATEGORIES.map((category) => ({
      url: `${siteUrl}/team/${category.slug}`,
      changeFrequency: "monthly" as const,
    })),
    ...(["upcoming", "latest", "previous"] as const).map((status) => ({
      url: `${siteUrl}/events/category/${status}`,
      changeFrequency: "weekly" as const,
    })),
  ];
}
