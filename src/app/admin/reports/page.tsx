import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Bell,
  Users,
  Shield,
  MapPin,
  Clock,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const monthlyData = [
  { month: "Oct", alerts: 45, responses: 42, avgTime: "48s" },
  { month: "Nov", alerts: 62, responses: 58, avgTime: "42s" },
  { month: "Dec", alerts: 38, responses: 37, avgTime: "35s" },
  { month: "Jan", alerts: 71, responses: 68, avgTime: "38s" },
  { month: "Feb", alerts: 55, responses: 53, avgTime: "31s" },
  { month: "Mar", alerts: 89, responses: 86, avgTime: "29s" },
];

const topRegions = [
  { name: "Maharashtra", alerts: 28, residents: 450000, responseRate: "96%" },
  { name: "Tamil Nadu", alerts: 22, residents: 380000, responseRate: "94%" },
  { name: "Gujarat", alerts: 18, residents: 320000, responseRate: "92%" },
  { name: "Odisha", alerts: 15, residents: 189000, responseRate: "97%" },
  { name: "West Bengal", alerts: 12, residents: 250000, responseRate: "91%" },
];

const alertBreakdown = [
  { type: "Flood", count: 34, percentage: 38, color: "bg-blue-500" },
  { type: "Cyclone", count: 22, percentage: 25, color: "bg-orange-500" },
  { type: "Earthquake", count: 15, percentage: 17, color: "bg-red-500" },
  { type: "Heatwave", count: 11, percentage: 12, color: "bg-yellow-500" },
  { type: "Other", count: 7, percentage: 8, color: "bg-neutral-500" },
];

export default function ReportsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-white">Analytics & Reports</h1>
            <p className="text-neutral-400 mt-1">Platform performance and disaster response metrics</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <select className="h-10 px-3 rounded-md border border-neutral-600 bg-neutral-800 text-sm text-white">
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>Last 6 months</option>
            <option>Last year</option>
          </select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Bell className="w-5 h-5 text-alert-high" />
              <Badge variant="low" className="text-xs">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12%
              </Badge>
            </div>
            <div className="text-2xl font-bold text-white">89</div>
            <div className="text-sm text-neutral-400">Alerts This Month</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-5 h-5 text-primary-400" />
              <Badge variant="low" className="text-xs">
                <TrendingUp className="w-3 h-3 mr-1" />
                +8%
              </Badge>
            </div>
            <div className="text-2xl font-bold text-white">2.4M</div>
            <div className="text-sm text-neutral-400">Total Residents</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-5 h-5 text-alert-medium" />
              <Badge variant="low" className="text-xs">
                <TrendingDown className="w-3 h-3 mr-1" />
                -15%
              </Badge>
            </div>
            <div className="text-2xl font-bold text-white">29s</div>
            <div className="text-sm text-neutral-400">Avg Response Time</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Activity className="w-5 h-5 text-alert-low" />
            </div>
            <div className="text-2xl font-bold text-white">96.5%</div>
            <div className="text-sm text-neutral-400">Delivery Rate</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Monthly Trend */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary-400" />
                Monthly Alert Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyData.map((data) => (
                  <div key={data.month} className="flex items-center gap-4">
                    <span className="text-sm text-neutral-400 w-10">{data.month}</span>
                    <div className="flex-1 flex items-center gap-2">
                      <div className="flex-1 h-6 bg-neutral-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full transition-all"
                          style={{ width: `${(data.alerts / 100) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-white font-medium w-8">{data.alerts}</span>
                    </div>
                    <span className="text-xs text-neutral-500 w-16 text-right">
                      Avg: {data.avgTime}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Regions */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary-400" />
                Top Regions by Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-700">
                      <th className="text-left py-2 text-sm text-neutral-400 font-medium">Region</th>
                      <th className="text-right py-2 text-sm text-neutral-400 font-medium">Alerts</th>
                      <th className="text-right py-2 text-sm text-neutral-400 font-medium">Residents</th>
                      <th className="text-right py-2 text-sm text-neutral-400 font-medium">Response Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topRegions.map((region, i) => (
                      <tr key={region.name} className="border-b border-neutral-800">
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-neutral-500 w-4">{i + 1}</span>
                            <span className="text-sm text-white">{region.name}</span>
                          </div>
                        </td>
                        <td className="text-right text-sm text-white">{region.alerts}</td>
                        <td className="text-right text-sm text-neutral-400">{region.residents.toLocaleString()}</td>
                        <td className="text-right">
                          <Badge variant="low" className="text-xs">{region.responseRate}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alert Type Breakdown */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Alert Type Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alertBreakdown.map((item) => (
                  <div key={item.type}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-white">{item.type}</span>
                      <span className="text-neutral-400">{item.count} ({item.percentage}%)</span>
                    </div>
                    <div className="h-2 bg-neutral-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.color}`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Health */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>System Health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-400">SMS Gateway</span>
                <Badge variant="low">Operational</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-400">Push Service</span>
                <Badge variant="low">Operational</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-400">Voice Gateway</span>
                <Badge variant="low">Operational</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-400">Weather API</span>
                <Badge variant="low">Operational</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-400">Seismic Feed</span>
                <Badge variant="medium">Degraded</Badge>
              </div>
              <div className="pt-3 border-t border-neutral-700 text-xs text-neutral-500">
                Last checked: 2 minutes ago
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
