"use client";

import * as React from "react";
import {
  Settings,
  Bell,
  Shield,
  Globe,
  Mail,
  Phone,
  Lock,
  Database,
  Save,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "general", name: "General", icon: Settings },
  { id: "notifications", name: "Notifications", icon: Bell },
  { id: "security", name: "Security", icon: Shield },
  { id: "integrations", name: "Integrations", icon: Globe },
];

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = React.useState("general");
  const [isSaving, setIsSaving] = React.useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsSaving(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-neutral-400 mt-1">Configure platform settings and integrations</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Tabs */}
        <nav className="md:w-56 flex-shrink-0">
          <div className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    activeTab === tab.id
                      ? "bg-primary-500/20 text-primary-400"
                      : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {tab.name}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Content */}
        <div className="flex-1 space-y-6">
          {activeTab === "general" && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Organization</CardTitle>
                  <CardDescription>Basic organization settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input label="Organization Name" defaultValue="National Disaster Management Authority" />
                  <Input label="Contact Email" type="email" defaultValue="admin@ndma.gov.in" />
                  <Input label="Contact Phone" type="tel" defaultValue="+91 11 2643 2133" />
                  <div>
                    <label className="block text-sm font-medium text-neutral-200 mb-1.5">Default Language</label>
                    <select className="w-full h-10 rounded-md border border-neutral-600 bg-neutral-800 px-3 text-sm text-white">
                      <option>English</option>
                      <option>Hindi</option>
                      <option>Multi-language</option>
                    </select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Alert Defaults</CardTitle>
                  <CardDescription>Default settings for new alerts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input label="Default Alert Radius (km)" type="number" defaultValue="50" />
                  <Input label="Alert Auto-Expire (hours)" type="number" defaultValue="24" />
                  <div>
                    <label className="block text-sm font-medium text-neutral-200 mb-1.5">Default Severity</label>
                    <select className="w-full h-10 rounded-md border border-neutral-600 bg-neutral-800 px-3 text-sm text-white">
                      <option value="2">Moderate (2)</option>
                      <option value="3">High (3)</option>
                      <option value="4">Critical (4)</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === "notifications" && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Notification Channels</CardTitle>
                  <CardDescription>Configure how alerts are delivered</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "Push Notifications", desc: "Send via app push notifications", icon: Bell, enabled: true },
                    { name: "SMS Alerts", desc: "Send via SMS gateway (Twilio)", icon: Phone, enabled: true },
                    { name: "Voice Calls", desc: "Automated voice calls for critical alerts", icon: Phone, enabled: false },
                    { name: "Email Notifications", desc: "Send email summaries", icon: Mail, enabled: true },
                  ].map((ch) => (
                    <div key={ch.name} className="flex items-center justify-between p-3 bg-neutral-800 rounded-lg">
                      <div className="flex items-center gap-3">
                        <ch.icon className="w-5 h-5 text-neutral-400" />
                        <div>
                          <div className="text-sm font-medium text-white">{ch.name}</div>
                          <div className="text-xs text-neutral-500">{ch.desc}</div>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={ch.enabled} className="sr-only peer" />
                        <div className="w-11 h-6 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500" />
                      </label>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === "security" && (
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Access control and authentication</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-neutral-800 rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-white">Two-Factor Authentication</div>
                    <div className="text-xs text-neutral-500">Require 2FA for admin accounts</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-neutral-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500" />
                  </label>
                </div>
                <div className="flex items-center justify-between p-3 bg-neutral-800 rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-white">IP Whitelisting</div>
                    <div className="text-xs text-neutral-500">Restrict admin access to approved IPs</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-neutral-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500" />
                  </label>
                </div>
                <Input label="Session Timeout (minutes)" type="number" defaultValue="30" />
                <Input label="Max Login Attempts" type="number" defaultValue="5" />
              </CardContent>
            </Card>
          )}

          {activeTab === "integrations" && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>API Integrations</CardTitle>
                  <CardDescription>External service connections</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "Twilio SMS", status: "Connected", statusColor: "text-alert-low" },
                    { name: "Mapbox Maps", status: "Connected", statusColor: "text-alert-low" },
                    { name: "IMD Weather API", status: "Connected", statusColor: "text-alert-low" },
                    { name: "NCS Seismic Feed", status: "Degraded", statusColor: "text-alert-medium" },
                    { name: "Resend Email", status: "Not configured", statusColor: "text-neutral-500" },
                  ].map((svc) => (
                    <div key={svc.name} className="flex items-center justify-between p-3 bg-neutral-800 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Database className="w-5 h-5 text-neutral-400" />
                        <div>
                          <div className="text-sm font-medium text-white">{svc.name}</div>
                          <div className={cn("text-xs", svc.statusColor)}>{svc.status}</div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>API Keys</CardTitle>
                  <CardDescription>Manage API access tokens</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input label="Twilio Account SID" type="password" defaultValue="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" />
                  <Input label="Mapbox Token" type="password" defaultValue="pk.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" />
                  <Input label="Weather API Key" type="password" defaultValue="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" />
                </CardContent>
              </Card>
            </>
          )}

          {/* Save Button */}
          <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800">
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button onClick={handleSave} loading={isSaving}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
