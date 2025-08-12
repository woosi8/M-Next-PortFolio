import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Hyuck",
    short_name: "The Hyuck",
    description: "The Hyuck",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/icons/Next.js.svg",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  };
}
