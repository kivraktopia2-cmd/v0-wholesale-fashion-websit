export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/koszyk", "/zamowienie/"],
      },
    ],
    sitemap: "https://www.direnber.eu/sitemap.xml", // Updated to use www subdomain
  }
}
