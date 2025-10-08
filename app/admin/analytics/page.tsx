import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card } from "@/components/ui/card"
import { BarChart3, Users, Globe, Monitor, Smartphone, Tablet } from "lucide-react"

export default async function AdminAnalyticsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  const { data: adminUser } = await supabase
    .from("admin_users")
    .select("*")
    .eq("id", user.id)
    .eq("is_active", true)
    .single()

  if (!adminUser) {
    redirect("/admin/login")
  }

  // Get analytics data
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const last7Days = new Date(today)
  last7Days.setDate(last7Days.getDate() - 7)
  const last30Days = new Date(today)
  last30Days.setDate(last30Days.getDate() - 30)

  // Total views today
  const { count: todayViews } = await supabase
    .from("page_views")
    .select("*", { count: "exact", head: true })
    .gte("created_at", today.toISOString())

  // Total views last 7 days
  const { count: last7DaysViews } = await supabase
    .from("page_views")
    .select("*", { count: "exact", head: true })
    .gte("created_at", last7Days.toISOString())

  // Total views last 30 days
  const { count: last30DaysViews } = await supabase
    .from("page_views")
    .select("*", { count: "exact", head: true })
    .gte("created_at", last30Days.toISOString())

  // Unique visitors (by IP) last 7 days
  const { data: uniqueVisitors } = await supabase
    .from("page_views")
    .select("ip_address")
    .gte("created_at", last7Days.toISOString())

  const uniqueIPs = new Set(uniqueVisitors?.map((v) => v.ip_address) || []).size

  // Top pages last 7 days
  const { data: topPages } = await supabase
    .from("page_views")
    .select("page_path, page_title")
    .gte("created_at", last7Days.toISOString())
    .order("created_at", { ascending: false })
    .limit(1000)

  const pageCount: Record<string, { count: number; title: string }> = {}
  topPages?.forEach((page) => {
    if (!pageCount[page.page_path]) {
      pageCount[page.page_path] = { count: 0, title: page.page_title || page.page_path }
    }
    pageCount[page.page_path].count++
  })

  const topPagesList = Object.entries(pageCount)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 10)

  // Device breakdown last 7 days
  const { data: devices } = await supabase
    .from("page_views")
    .select("device_type")
    .gte("created_at", last7Days.toISOString())

  const deviceCount: Record<string, number> = {}
  devices?.forEach((d) => {
    deviceCount[d.device_type] = (deviceCount[d.device_type] || 0) + 1
  })

  // Browser breakdown last 7 days
  const { data: browsers } = await supabase
    .from("page_views")
    .select("browser")
    .gte("created_at", last7Days.toISOString())

  const browserCount: Record<string, number> = {}
  browsers?.forEach((b) => {
    browserCount[b.browser] = (browserCount[b.browser] || 0) + 1
  })

  // Country breakdown last 7 days
  const { data: countries } = await supabase
    .from("page_views")
    .select("country")
    .gte("created_at", last7Days.toISOString())
    .not("country", "is", null)

  const countryCount: Record<string, number> = {}
  countries?.forEach((c) => {
    if (c.country) {
      countryCount[c.country] = (countryCount[c.country] || 0) + 1
    }
  })

  const topCountries = Object.entries(countryCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)

  // Recent visitors
  const { data: recentVisitors } = await supabase
    .from("page_views")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(20)

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader user={adminUser} />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Analityka Ziyaretçileri</h1>
          <p className="text-gray-600 mt-2">Ziyaretçi istatistikleri ve site analizi</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Bugün</p>
                <p className="text-3xl font-bold text-gray-900">{todayViews || 0}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-500" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Son 7 Gün</p>
                <p className="text-3xl font-bold text-gray-900">{last7DaysViews || 0}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-green-500" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Son 30 Gün</p>
                <p className="text-3xl font-bold text-gray-900">{last30DaysViews || 0}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-500" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Benzersiz Ziyaretçi</p>
                <p className="text-3xl font-bold text-gray-900">{uniqueIPs}</p>
              </div>
              <Users className="h-8 w-8 text-orange-500" />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Pages */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">En Çok Ziyaret Edilen Sayfalar</h2>
            <div className="space-y-3">
              {topPagesList.map(([path, data]) => (
                <div key={path} className="flex items-center justify-between border-b pb-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{data.title}</p>
                    <p className="text-xs text-gray-500 truncate">{path}</p>
                  </div>
                  <span className="ml-4 text-sm font-semibold text-gray-900">{data.count}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Device Breakdown */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Cihaz Türleri</h2>
            <div className="space-y-4">
              {Object.entries(deviceCount).map(([device, count]) => {
                const total = Object.values(deviceCount).reduce((a, b) => a + b, 0)
                const percentage = ((count / total) * 100).toFixed(1)
                const Icon = device === "mobile" ? Smartphone : device === "tablet" ? Tablet : Monitor

                return (
                  <div key={device} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-900 capitalize">{device}</span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {count} ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${percentage}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>

          {/* Browser Breakdown */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Tarayıcılar</h2>
            <div className="space-y-3">
              {Object.entries(browserCount)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(([browser, count]) => {
                  const total = Object.values(browserCount).reduce((a, b) => a + b, 0)
                  const percentage = ((count / total) * 100).toFixed(1)

                  return (
                    <div key={browser} className="flex items-center justify-between border-b pb-2">
                      <span className="text-sm font-medium text-gray-900">{browser}</span>
                      <span className="text-sm text-gray-600">
                        {count} ({percentage}%)
                      </span>
                    </div>
                  )
                })}
            </div>
          </Card>

          {/* Country Breakdown */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Ülkeler
            </h2>
            <div className="space-y-3">
              {topCountries.length > 0 ? (
                topCountries.map(([country, count]) => (
                  <div key={country} className="flex items-center justify-between border-b pb-2">
                    <span className="text-sm font-medium text-gray-900">{country}</span>
                    <span className="text-sm text-gray-600">{count}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">Cloudflare aktif olduğunda ülke bilgisi görünecek</p>
              )}
            </div>
          </Card>
        </div>

        {/* Recent Visitors */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Son Ziyaretçiler</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-900">Tarih</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-900">Sayfa</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-900">Cihaz</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-900">Tarayıcı</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-900">Ülke</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-900">IP</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recentVisitors?.map((visitor) => (
                  <tr key={visitor.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-600">{new Date(visitor.created_at).toLocaleString("tr-TR")}</td>
                    <td className="px-4 py-3 text-gray-900 max-w-xs truncate">
                      {visitor.page_title || visitor.page_path}
                    </td>
                    <td className="px-4 py-3 text-gray-600 capitalize">{visitor.device_type}</td>
                    <td className="px-4 py-3 text-gray-600">{visitor.browser}</td>
                    <td className="px-4 py-3 text-gray-600">{visitor.country || "-"}</td>
                    <td className="px-4 py-3 text-gray-600 font-mono text-xs">{visitor.ip_address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  )
}
