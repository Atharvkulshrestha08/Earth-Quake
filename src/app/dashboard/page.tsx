import Link from "next/link";
import {
  Bell,
  MapPin,
  Phone,
  Users,
  Shield,
  Settings,
  LogOut,
  AlertTriangle,
  Droplets,
  Activity,
  Wind,
  ChevronRight,
  Clock,
  Bookmark,
  Share2,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SeverityMeter } from "@/components/ui/misc";

export const metadata = {
  title: "My Dashboard",
};

const recentAlerts = [
  {
    id: "1",
    type: "FLOOD",
    title: "Heavy Rainfall Warning",
    location: "Mumbai Metropolitan Region",
    severity: 4,
    time: "15 min ago",
    isRead: false,
  },
  {
    id: "2",
    type: "CYCLONE",
    title: "Cyclone Alert",
    location: "Odisha Coast",
    severity: 3,
    time: "45 min ago",
    isRead: true,
  },
];

const quickActions = [
  { icon: Bell, label: "View All Alerts", href: "/dashboard/alerts", color: "text-alert-high" },
  { icon: MapPin, label: "My Locations", href: "/dashboard/locations", color: "text-primary-400" },
  { icon: Users, label: "Emergency Contacts", href: "/dashboard/contacts", color: "text-blue-400" },
  { icon: Bookmark, label: "Saved Guides", href: "/dashboard/guides", color: "text-alert-medium" },
];

const savedGuides = [
  { id: "1", title: "Flood Safety Guide", readTime: "8 min", category: "FLOOD" },
  { id: "2", title: "Earthquake Response", readTime: "6 min", category: "EARTHQUAKE" },
];

const emergencyContacts = [
  { name: "Family - Mumbai", phone: "+91 98765 43210", type: "family" },
  { name: "Local Police", phone: "100", type: "emergency" },
  { name: "Fire Brigade", phone: "101", type: "emergency" },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-neutral-900">
      {/* Header */}
      <header className="bg-neutral-800 border-b border-neutral-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <span className="font-heading font-bold text-xl text-white">
                Earth<span className="text-primary-400">-</span>Quake
              </span>
            </Link>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/settings">
                  <Settings className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Welcome back</h1>
          <p className="text-neutral-400">Stay safe with real-time disaster alerts</p>
        </div>

        {/* Alert Banner */}
        <Card className="mb-8 bg-alert-high/10 border-alert-high/30">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-alert-high/20 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-alert-high" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white">Active Alert in Your Area</h3>
              <p className="text-sm text-neutral-400">
                Heavy rainfall warning for Mumbai region. Tap for details.
              </p>
            </div>
            <Button size="sm" asChild>
              <Link href="/alerts/1">View</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.label} href={action.href}>
                <Card className="hover:border-primary-500/50 transition-colors cursor-pointer">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <Icon className={`w-8 h-8 mb-2 ${action.color}`} />
                    <span className="text-sm text-white">{action.label}</span>
                  </CardContent>
                </Card>
              </Link>
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
                  <Link href="/alerts">
                    View All
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`flex items-start gap-4 p-4 rounded-lg transition-colors ${
                      !alert.isRead ? "bg-primary-500/10 border border-primary-500/30" : "bg-neutral-700/50"
                    }`}
                  >
                    <div className="w-10 h-10 bg-alert-high/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="w-5 h-5 text-alert-high" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-white truncate">
                          {alert.title}
                        </h4>
                        {!alert.isRead && (
                          <Badge variant="primary" className="text-xs">New</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-neutral-400 mb-2">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {alert.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {alert.time}
                        </span>
                      </div>
                      <SeverityMeter severity={alert.severity} size="sm" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Emergency Contacts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Phone className="w-4 h-4 text-alert-high" />
                  Emergency Contacts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {emergencyContacts.map((contact, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-white">{contact.name}</div>
                      <div className="text-xs text-neutral-500">{contact.phone}</div>
                    </div>
                    <Button size="sm" variant="outline" asChild>
                      <a href={`tel:${contact.phone}`}>Call</a>
                    </Button>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-2" asChild>
                  <Link href="/dashboard/contacts">
                    <Users className="w-4 h-4 mr-2" />
                    Manage Contacts
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Saved Guides */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-alert-medium" />
                  Saved Guides
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {savedGuides.map((guide) => (
                  <Link
                    key={guide.id}
                    href={`/guides/${guide.id}`}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-neutral-700 transition-colors"
                  >
                    <div>
                      <div className="text-sm text-white">{guide.title}</div>
                      <div className="text-xs text-neutral-500">{guide.readTime} read</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-neutral-500" />
                  </Link>
                ))}
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/guides">
                    Browse All Guides
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* SOS Button */}
            <Card className="bg-alert-critical/10 border-alert-critical/30">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-alert-critical/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <AlertTriangle className="w-8 h-8 text-alert-critical" />
                </div>
                <h3 className="font-bold text-white mb-2">SOS Emergency</h3>
                <p className="text-sm text-neutral-400 mb-4">
                  Send your location to emergency services and contacts
                </p>
                <Button variant="destructive" size="lg" className="w-full">
                  <Shield className="w-4 h-4 mr-2" />
                  Send SOS Alert
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
