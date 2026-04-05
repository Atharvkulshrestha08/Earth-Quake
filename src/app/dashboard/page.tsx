"use client";

import * as React from "react";
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
  TrendingDown,
  Target,
  History,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SeverityMeter } from "@/components/ui/misc";
import { IndiaMap } from "@/components/dashboard/IndiaMap";
import { getCityRiskProfile, getAlertIcon, DisasterProfile } from "@/lib/intelligence";
import { EarlyWarningSystem } from "@/components/alerts/EarlyWarningSystem";

export default function DashboardPage() {
  const [city, setCity] = React.useState("Delhi");
  const [profile, setProfile] = React.useState<DisasterProfile | null>(null);
  const [isEWSTriggered, setIsEWSTriggered] = React.useState(false);

  React.useEffect(() => {
    // Simulate geolocation detection
    setProfile(getCityRiskProfile(city));

    // Simulate an EWS trigger after 10 seconds for demo
    const timer = setTimeout(() => {
      // setIsEWSTriggered(true); // Uncomment to trigger siren on page load
    }, 10000);

    return () => clearTimeout(timer);
  }, [city]);

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-neutral-900 pb-12">
      <header className="bg-neutral-800 border-b border-neutral-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(var(--primary-500-rgb),0.3)]">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <span className="font-heading font-bold text-xl text-white">
                Earth<span className="text-primary-400">-</span>Quake
              </span>
            </Link>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild className="text-neutral-400 hover:text-white">
                <Link href="/dashboard/settings">
                  <Settings className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="text-neutral-400 hover:text-white">
                <Link href="/">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Welcome & Geo-Context */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-white tracking-tight">Intelligence Dashboard</h1>
              <Badge variant="secondary" className="bg-primary-500/10 text-primary-400 border-primary-500/20 px-3">Live Monitor</Badge>
            </div>
            <p className="text-neutral-400 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-alert-high" />
              Monitoring active for <span className="text-white font-semibold underline decoration-primary-500 decoration-2 underline-offset-4">{profile.city}, India</span>
            </p>
          </div>

          <div className="flex gap-3">
             <Button 
                variant="outline" 
                size="sm" 
                className={`border-alert-critical/50 text-alert-critical hover:bg-alert-critical/10 ${isEWSTriggered ? 'animate-bounce' : ''}`}
                onClick={() => setIsEWSTriggered(!isEWSTriggered)}
             >
                {isEWSTriggered ? "Deactivate SOS" : "Simulate SOS Test"}
             </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8 mb-10">
           {/* Early Warning System */}
           <div className="lg:col-span-1">
             <EarlyWarningSystem isTriggered={isEWSTriggered} />
           </div>

           {/* Predictive Intelligence Card */}
           <Card className="lg:col-span-3 border-neutral-700 bg-neutral-800/40 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                 <Target className="w-32 h-32" />
              </div>
              <CardHeader className="border-b border-neutral-700/50 pb-4">
                 <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingDown className="w-5 h-5 text-primary-400" />
                    Predictive Disaster Probability
                 </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                 <div className="grid md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                       <div>
                          <p className="text-xs text-neutral-500 uppercase tracking-widest font-bold mb-2">Probable Next Event Window</p>
                          <div className="text-3xl font-bold text-alert-high tracking-tighter">
                             {profile.prediction.nextProbableDate}
                          </div>
                          <p className="text-xs text-neutral-400 mt-1 italic italic">Literal date based on 3-year recurrence cycles</p>
                       </div>

                       <div className="flex items-center gap-10">
                          <div>
                             <p className="text-xs text-neutral-500 uppercase tracking-widest font-bold mb-1">Risk Level</p>
                             <Badge className={`${profile.prediction.riskLevel === 'HIGH' ? 'bg-alert-high' : 'bg-alert-critical'} px-4 py-1 text-xs`}>
                                {profile.prediction.riskLevel} ALERT
                             </Badge>
                          </div>
                          <div>
                             <p className="text-xs text-neutral-500 uppercase tracking-widest font-bold mb-1">Model Confidence</p>
                             <div className="text-xl font-bold text-white">{profile.prediction.confidence}%</div>
                          </div>
                       </div>
                    </div>

                    <div className="bg-neutral-900/50 p-5 rounded-xl border border-neutral-700/50 h-full">
                       <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                          <Shield className="w-4 h-4 text-primary-400" />
                          Recommended Safety Measures
                       </h4>
                       <ul className="space-y-2.5">
                          {profile.prediction.safetyMeasures.map((measure, i) => (
                             <li key={i} className="text-xs text-neutral-300 flex items-start gap-2">
                                <div className="w-1 h-1 bg-primary-500 rounded-full mt-1.5 flex-shrink-0" />
                                {measure}
                             </li>
                          ))}
                       </ul>
                    </div>
                 </div>
              </CardContent>
           </Card>
        </div>

        {/* Live Map Visualization */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold font-heading text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary-400" />
              Geospatial Visual Monitor
            </h2>
            <Badge variant="outline" className="text-xs text-neutral-500 border-neutral-700 font-mono">STATION_ID: {city.toUpperCase()}_01</Badge>
          </div>
          <IndiaMap />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Historical Data Tracker */}
          <div className="lg:col-span-2">
            <Card className="border-neutral-700 bg-neutral-800/40">
              <CardHeader className="flex flex-row items-center justify-between border-b border-neutral-700/50 pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                   <History className="w-5 h-5 text-primary-400" />
                   Recent Area Disasters (3-Year History)
                </CardTitle>
                <Button variant="ghost" size="sm" asChild className="text-neutral-400 hover:text-white">
                  <Link href="/alerts">
                    View Region Reports
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                {profile.historicalEvents.map((event, index) => {
                  const Icon = getAlertIcon(event.type);
                  return (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-xl transition-all hover:bg-neutral-700/20 border border-neutral-700/50 bg-neutral-800/20 group"
                    >
                      <div className="w-12 h-12 bg-neutral-800 rounded-xl flex items-center justify-center flex-shrink-0 border border-neutral-700 group-hover:border-primary-500/50 transition-colors">
                        <Icon className="w-6 h-6 text-primary-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-white text-lg">
                            {event.type}
                          </h4>
                          {event.magnitude && (
                             <Badge variant="outline" className="text-[10px] border-alert-medium text-alert-medium h-5 px-2">MAG: {event.magnitude}</Badge>
                          )}
                        </div>
                        <p className="text-sm text-neutral-300 font-medium mb-1">{event.impact}</p>
                        <div className="flex items-center gap-4 text-xs text-neutral-500">
                          <span className="flex items-center gap-1.5 font-mono">
                            <Clock className="w-3.5 h-3.5" />
                            {event.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-neutral-700 bg-neutral-800/40">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Phone className="w-4 h-4 text-alert-high" />
                  India Emergency Helpline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "National Emergency", phone: "112" },
                  { name: "NDRF Helpline", phone: "011-24363260" },
                  { name: "Delhi Disaster Relief", phone: "1077" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-neutral-700/30 hover:bg-neutral-700/30 transition-colors">
                    <div>
                      <div className="text-sm text-white font-medium">{item.name}</div>
                      <div className="text-xs text-neutral-500 font-mono">{item.phone}</div>
                    </div>
                    <Button size="sm" variant="outline" className="h-8 border-neutral-700 hover:border-primary-500/50" asChild>
                      <a href={`tel:${item.phone}`}>Call</a>
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-alert-critical/10 border-alert-critical/30 relative overflow-hidden group">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--alert-critical-rgb),0.1),transparent_70%)]" />
              <CardContent className="p-6 text-center relative z-10">
                <div className={`w-16 h-16 bg-alert-critical/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-alert-critical/30 ${isEWSTriggered ? 'animate-ping' : ''}`}>
                  <AlertTriangle className="w-8 h-8 text-alert-critical" />
                </div>
                <h3 className="font-bold text-white mb-2">SOS Broadcast</h3>
                <p className="text-xs text-neutral-400 mb-4">
                  Broadcasting coordinates to NDRF and secondary contacts
                </p>
                <Button 
                   variant="destructive" 
                   size="lg" 
                   className="w-full shadow-lg shadow-alert-critical/20 font-bold tracking-widest"
                   onClick={() => setIsEWSTriggered(true)}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  INITIATE SOS
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
