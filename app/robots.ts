export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/koszyk", "/zamowienie/"],
      },
    ],
    sitemap: "https://direnber.eu/sitemap.xml",
  }
}
