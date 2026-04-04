import Link from "next/link";
import {
  Plus,
  Bell,
  Droplets,
  Activity,
  Wind,
  Flame,
  MapPin,
  Clock,
  Shield,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SeverityMeter } from "@/components/ui/misc";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Alert Management",
};

const alerts = [
  {
    id: "1",
    type: "FLOOD",
    title: "Heavy Rainfall Warning - Mumbai",
    description: "IMD has issued a red alert for Mumbai Metropolitan Region. Heavy to very heavy rainfall expected.",
    location: "Mumbai, Maharashtra",
    severity: 4,
    status: "active",
    time: "15 minutes ago",
    recipients: 245000,
  },
  {
    id: "2",
    type: "CYCLONE",
    title: "Cyclone Alert - Odisha Coast",
    description: "Deep depression over Bay of Bengal likely to intensify into cyclonic storm.",
    location: "Bhubaneswar, Odisha",
    severity: 3,
    status: "active",
    time: "45 minutes ago",
    recipients: 189000,
  },
  {
    id: "3",
    type: "HEATWAVE",
    title: "Heatwave Conditions - Rajasthan",
    description: "Heatwave conditions likely to prevail over Jodhpur, Bikaner divisions.",
    location: "Jaipur, Rajasthan",
    severity: 2,
    status: "active",
    time: "2 hours ago",
    recipients: 98000,
  },
  {
    id: "4",
    type: "EARTHQUAKE",
    title: "Moderate Earthquake - Nepal Border",
    description: "Magnitude 5.2 earthquake recorded at Nepal-India border.",
    location: "Patna, Bihar",
    severity: 2,
    status: "resolved",
    time: "4 hours ago",
    recipients: 156000,
  },
];

const alertTypeIcons: Record<string, typeof Droplets> = {
  FLOOD: Droplets,
  EARTHQUAKE: Activity,
  CYCLONE: Wind,
  FIRE: Flame,
};

const alertTypeColors: Record<string, string> = {
  FLOOD: "text-blue-500",
  EARTHQUAKE: "text-red-500",
  CYCLONE: "text-orange-500",
  FIRE: "text-red-600",
  HEATWAVE: "text-yellow-500",
};

export default function AlertsPage() {
  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Alert Management</h1>
          <p className="text-neutral-400 mt-1">
            Create and manage disaster alerts across regions
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/alerts/new">
            <Plus className="w-4 h-4 mr-2" />
            Create New Alert
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Button variant="default" size="sm">All</Button>
        <Button variant="outline" size="sm">Active</Button>
        <Button variant="outline" size="sm">Resolved</Button>
        <Button variant="outline" size="sm">Draft</Button>
        <Button variant="outline" size="sm">Scheduled</Button>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {alerts.map((alert) => {
          const Icon = alertTypeIcons[alert.type] || Bell;
          const color = alertTypeColors[alert.type] || "text-neutral-500";

          return (
            <Card key={alert.id} className="hover:border-neutral-600 transition-colors">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  {/* Icon */}
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center bg-neutral-700", `text-${alert.type.toLowerCase()}`)}>
                    <Icon className={cn("w-6 h-6", color)} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold text-white">
                            {alert.title}
                          </h3>
                          <Badge variant={alert.status === "active" ? "high" : "low"}>
                            {alert.status}
                          </Badge>
                          {alert.severity >= 4 && (
                            <Badge variant="critical">Critical</Badge>
                          )}
                        </div>
                        <p className="text-sm text-neutral-400 line-clamp-2">
                          {alert.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-500 mb-4">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {alert.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {alert.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Bell className="w-3 h-3" />
                        {alert.recipients.toLocaleString()} recipients
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex-1 max-w-xs">
                        <div className="text-xs text-neutral-500 mb-1">Severity</div>
                        <SeverityMeter severity={alert.severity} size="md" />
                      </div>

                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" asChild>
                          <Link href={`/admin/alerts/${alert.id}`}>
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Link>
                        </Button>
                        <Button size="sm" variant="ghost" asChild>
                          <Link href={`/admin/alerts/${alert.id}/edit`}>
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Link>
                        </Button>
                        <Button size="sm" variant="ghost" className="text-alert-high hover:text-alert-high">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
