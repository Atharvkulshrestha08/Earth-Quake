import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Bell,
  Users,
  Shield,
  MapPin,
  TrendingUp,
  AlertTriangle,
  Droplets,
  Activity,
  Wind,
  Clock,
  Plus,
  ArrowRight,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatCard, SeverityMeter } from "@/components/ui/misc";

export const metadata = {
  title: "Admin Dashboard",
};

const stats = [
  { label: "Active Alerts", value: 12, color: "high" as const, icon: Bell },
  { label: "Registered Residents", value: "2.4M", icon: Users },
  { label: "Shelters Available", value: 1847, color: "low" as const, icon: Shield },
  { label: "Alerts Sent Today", value: 45, color: "default" as const, icon: TrendingUp },
];

const recentAlerts = [
  {
    id: "1",
    type: "FLOOD",
    title: "Heavy Rainfall Warning",
    location: "Mumbai, Maharashtra",
    severity: 4,
    time: "15 min ago",
  },
  {
    id: "2",
    type: "CYCLONE",
    title: "Cyclone Alert",
    location: "Odisha Coast",
    severity: 3,
    time: "45 min ago",
  },
  {
    id: "3",
    type: "HEATWAVE",
    title: "Heatwave Conditions",
    location: "Rajasthan",
    severity: 2,
    time: "2 hours ago",
  },
];

const regionStats = [
  { name: "Maharashtra", alerts: 4, residents: 450000, shelters: 312 },
  { name: "Gujarat", alerts: 2, residents: 320000, shelters: 245 },
  { name: "Tamil Nadu", alerts: 3, residents: 380000, shelters: 289 },
  { name: "West Bengal", alerts: 2, residents: 290000, shelters: 198 },
  { name: "Kerala", alerts: 1, residents: 210000, shelters: 167 },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-neutral-400 mt-1">
              Disaster management overview for India
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" asChild>
              <Link href="/admin/reports">
                <BarChart3 className="w-4 h-4 mr-2" />
                View Reports
              </Link>
            </Button>
            <Button asChild>
              <Link href="/admin/alerts/new">
                <Plus className="w-4 h-4 mr-2" />
                Create Alert
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-neutral-400">{stat.label}</span>
                    <Icon className="w-5 h-5 text-neutral-500" />
                  </div>
                  <div className={`text-2xl font-bold ${stat.color === "high" ? "text-alert-high" : stat.color === "low" ? "text-alert-low" : "text-white"}`}>
                    {stat.value}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Alerts */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Alerts</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/admin/alerts">
                    View All
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="flex items-center gap-4 p-3 bg-neutral-700/50 rounded-lg hover:bg-neutral-700 transition-colors"
                    >
                      <div className="w-10 h-10 bg-alert-high/20 rounded-lg flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-alert-high" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-white truncate">
                            {alert.title}
                          </h4>
                          <Badge
                            variant={
                              alert.severity >= 4
                                ? "critical"
                                : alert.severity === 3
                                ? "high"
                                : "medium"
                            }
                          >
                            {alert.severity >= 4
                              ? "Critical"
                              : alert.severity === 3
                              ? "High"
                              : "Moderate"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-neutral-400">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {alert.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {alert.time}
                          </span>
                        </div>
                      </div>
                      <SeverityMeter severity={alert.severity} size="sm" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Region Stats */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Region Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {regionStats.map((region) => (
                    <div key={region.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-white">
                          {region.name}
                        </span>
                        <div className="flex items-center gap-2">
                          {region.alerts > 0 && (
                            <Badge variant={region.alerts >= 3 ? "high" : "medium"}>
                              {region.alerts} alerts
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-neutral-500">
                        <span>{region.residents.toLocaleString()} residents</span>
                        <span>{region.shelters} shelters</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/admin/broadcast">
                    <Bell className="w-4 h-4 mr-2" />
                    Send Bulk Alert
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/admin/residents">
                    <Users className="w-4 h-4 mr-2" />
                    Manage Residents
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/admin/shelters">
                    <Shield className="w-4 h-4 mr-2" />
                    Update Shelters
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
