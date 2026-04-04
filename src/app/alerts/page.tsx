import Link from "next/link";
import {
  Droplets,
  Activity,
  Wind,
  Flame,
  Waves,
  ThermometerSun,
  Snowflake,
  Mountain,
  CloudLightning,
  Sun,
  Filter,
  MapPin,
  Clock,
  Shield,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SeverityMeter, StatCard } from "@/components/ui/misc";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Live Alerts",
  description: "Real-time disaster alerts across India. Stay informed about floods, earthquakes, cyclones, and more.",
};

const alertTypes = [
  { id: "all", name: "All Alerts", icon: Shield, color: "text-white" },
  { id: "FLOOD", name: "Flood", icon: Droplets, color: "text-blue-500" },
  { id: "EARTHQUAKE", name: "Earthquake", icon: Activity, color: "text-red-500" },
  { id: "CYCLONE", name: "Cyclone", icon: Wind, color: "text-orange-500" },
  { id: "FIRE", name: "Fire", icon: Flame, color: "text-red-600" },
  { id: "TSUNAMI", name: "Tsunami", icon: Waves, color: "text-cyan-500" },
  { id: "HEATWAVE", name: "Heatwave", icon: ThermometerSun, color: "text-yellow-500" },
  { id: "COLDWAVE", name: "Coldwave", icon: Snowflake, color: "text-sky-500" },
];

const sampleAlerts = [
  {
    id: "1",
    type: "FLOOD",
    title: "Heavy Rainfall Warning - Mumbai",
    description: "IMD has issued a red alert for Mumbai Metropolitan Region. Heavy to very heavy rainfall expected (200-250mm) over next 24 hours. Low-lying areas may experience flooding.",
    location: "Mumbai, Maharashtra",
    lat: 19.076,
    lng: 72.877,
    severity: 4,
    time: "15 minutes ago",
    eta: "2 hours",
    source: "India Meteorological Department",
    isVerified: true,
  },
  {
    id: "2",
    type: "CYCLONE",
    title: "Cyclone Alert - Odisha Coast",
    description: "Deep depression over Bay of Bengal likely to intensify into cyclonic storm 'FENGAL' in next 24 hours. Fishermen advised not to venture into sea.",
    location: "Bhubaneswar, Odisha",
    lat: 20.296,
    lng: 85.825,
    severity: 3,
    time: "45 minutes ago",
    eta: "18 hours",
    source: "IMD Cyclone Warning Division",
    isVerified: true,
  },
  {
    id: "3",
    type: "HEATWAVE",
    title: "Heatwave Conditions - Rajasthan",
    description: "Heatwave conditions likely to prevail over Jodhpur, Bikaner divisions for next 3 days. Maximum temperatures may reach 46°C. Stay indoors during peak hours.",
    location: "Jaipur, Rajasthan",
    lat: 26.912,
    lng: 75.787,
    severity: 2,
    time: "2 hours ago",
    eta: "Ongoing",
    source: "IMD Regional Office",
    isVerified: true,
  },
  {
    id: "4",
    type: "FLOOD",
    title: "River Water Level Rising - Assam",
    description: "Brahmaputra river water level rising due to upstream rainfall. Alert issued for low-lying areas in Jorhat and Dibrugarh districts.",
    location: "Guwahati, Assam",
    lat: 26.145,
    lng: 91.691,
    severity: 3,
    time: "3 hours ago",
    eta: "6 hours",
    source: "CWC Northeast",
    isVerified: true,
  },
  {
    id: "5",
    type: "EARTHQUAKE",
    title: "Moderate Earthquake - Nepal Border",
    description: "Magnitude 5.2 earthquake recorded at Nepal-India border. Tremors felt in parts of Bihar and Uttar Pradesh. No major damage reported.",
    location: "Patna, Bihar",
    lat: 25.594,
    lng: 85.138,
    severity: 2,
    time: "4 hours ago",
    eta: "N/A",
    source: "National Center for Seismology",
    isVerified: true,
  },
  {
    id: "6",
    type: "COLDWAVE",
    title: "Coldwave Alert - Delhi NCR",
    description: "Coldwave conditions expected in Delhi and NCR region. Minimum temperature likely to drop to 3°C. Dense fog forecast for morning hours.",
    location: "New Delhi",
    lat: 28.613,
    lng: 77.209,
    severity: 2,
    time: "5 hours ago",
    eta: "12 hours",
    source: "IMD Delhi",
    isVerified: true,
  },
];

function getAlertIcon(type: string) {
  const icons: Record<string, typeof Droplets> = {
    FLOOD: Droplets,
    EARTHQUAKE: Activity,
    CYCLONE: Wind,
    FIRE: Flame,
    TSUNAMI: Waves,
    HEATWAVE: ThermometerSun,
    COLDWAVE: Snowflake,
    LANDSLIDE: Mountain,
    STORM: CloudLightning,
    DROUGHT: Sun,
  };
  return icons[type] || Shield;
}

function getAlertColor(type: string): string {
  const colors: Record<string, string> = {
    FLOOD: "#3b82f6",
    EARTHQUAKE: "#ef4444",
    CYCLONE: "#f59e0b",
    FIRE: "#dc2626",
    TSUNAMI: "#06b6d4",
    HEATWAVE: "#f97316",
    COLDWAVE: "#0ea5e9",
    LANDSLIDE: "#78716c",
    STORM: "#8b5cf6",
    DROUGHT: "#eab308",
  };
  return colors[type] || "#6b7280";
}

function getSeverityBadge(severity: number) {
  if (severity >= 4) return { variant: "critical" as const, label: "Critical" };
  if (severity === 3) return { variant: "high" as const, label: "High" };
  if (severity === 2) return { variant: "medium" as const, label: "Moderate" };
  return { variant: "low" as const, label: "Low" };
}

export default function AlertsPage() {
  return (
    <div className="min-h-screen bg-neutral-900 pt-20">
      {/* Header */}
      <div className="bg-neutral-800 border-b border-neutral-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">Live Alerts</h1>
              <p className="text-neutral-400 mt-1">
                Real-time disaster monitoring across India. Updated every minute.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <MapPin className="w-4 h-4 mr-2" />
                My Location
              </Button>
              <Button size="sm" asChild>
                <Link href="/register">Get Notified</Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <StatCard
              label="Active Alerts"
              value={sampleAlerts.length}
              color="high"
            />
            <StatCard
              label="Critical"
              value={sampleAlerts.filter((a) => a.severity >= 4).length}
              color="critical"
            />
            <StatCard
              label="States Affected"
              value="12"
              color="medium"
            />
            <StatCard
              label="Last Updated"
              value="1m ago"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">Filter by Type</h3>
                <Filter className="w-4 h-4 text-neutral-400" />
              </div>
              <div className="space-y-1">
                {alertTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                        type.id === "all"
                          ? "bg-primary-500/20 text-primary-400"
                          : "text-neutral-400 hover:text-white hover:bg-neutral-700"
                      )}
                    >
                      <Icon className={cn("w-4 h-4", type.color)} />
                      {type.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Alert List */}
          <div className="flex-1 space-y-4">
            {sampleAlerts.map((alert) => {
              const Icon = getAlertIcon(alert.type);
              const badge = getSeverityBadge(alert.severity);

              return (
                <Card key={alert.id} variant="alert" severity={alert.severity}>
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                      {/* Icon */}
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${getAlertColor(alert.type)}20` }}
                      >
                        <Icon
                          className="w-7 h-7"
                          style={{ color: getAlertColor(alert.type) }}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-lg font-semibold text-white">
                                {alert.title}
                              </h3>
                              {alert.isVerified && (
                                <Badge variant="low" className="text-xs">
                                  <Shield className="w-3 h-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-400">
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
                          <Badge variant={badge.variant}>{badge.label}</Badge>
                        </div>

                        <p className="text-neutral-300 text-sm mb-4">
                          {alert.description}
                        </p>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                          <div className="flex-1">
                            <div className="text-xs text-neutral-500 mb-1">
                              Severity Level
                            </div>
                            <SeverityMeter severity={alert.severity} size="lg" />
                          </div>

                          <div className="flex items-center gap-2">
                            {alert.eta !== "N/A" && (
                              <span className="text-xs text-neutral-500 bg-neutral-700 px-2 py-1 rounded">
                                ETA: {alert.eta}
                              </span>
                            )}
                            <Button size="sm" variant="ghost" asChild>
                              <Link href={`/guides?type=${alert.type}`}>
                                Safety Guide
                                <ChevronRight className="w-4 h-4 ml-1" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {/* Load More */}
            <div className="text-center pt-4">
              <Button variant="outline">Load More Alerts</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
