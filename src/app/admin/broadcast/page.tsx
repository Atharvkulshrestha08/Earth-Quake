"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Send,
  Bell,
  Phone,
  MessageSquare,
  Users,
  Check,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const messageTemplates = [
  {
    id: "flood_warning",
    title: "Flood Warning",
    content: "ALERT: Flood warning issued for your area. Move to higher ground immediately. Nearest shelter: {shelter_name}, {distance}km away. Emergency: 112",
    charCount: 147,
  },
  {
    id: "earthquake_alert",
    title: "Earthquake Alert",
    content: "ALERT: Earthquake detected in your region. Drop, Cover, Hold. Stay away from windows and heavy objects. Check for gas leaks. Emergency: 112",
    charCount: 139,
  },
  {
    id: "cyclone_prep",
    title: "Cyclone Preparation",
    content: "ALERT: Cyclone approaching your area. Secure windows, store water. Move to nearest shelter: {shelter_name}. Stay indoors. Emergency: 112",
    charCount: 138,
  },
  {
    id: "evacuation",
    title: "Evacuation Order",
    content: "URGENT: Evacuation order for your area. Leave immediately. Proceed to {shelter_name}. Do not use elevators. Emergency: 112",
    charCount: 120,
  },
];

const recipientGroups = [
  { id: "all", name: "All Registered Residents", count: 2400000, icon: Users },
  { id: "mumbai", name: "Mumbai Region", count: 450000, icon: Users },
  { id: "delhi", name: "Delhi NCR", count: 380000, icon: Users },
  { id: "chennai", name: "Chennai Metro", count: 290000, icon: Users },
  { id: "kolkata", name: "Kolkata Region", count: 250000, icon: Users },
];

export default function BroadcastPage() {
  const [message, setMessage] = React.useState("");
  const [selectedTemplate, setSelectedTemplate] = React.useState("");
  const [selectedGroups, setSelectedGroups] = React.useState<string[]>([]);
  const [channels, setChannels] = React.useState({ sms: true, voice: false, push: true });
  const [isSending, setIsSending] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

  const charCount = message.length;
  const smsSegments = Math.ceil(charCount / 160) || 0;

  const totalRecipients = selectedGroups.includes("all")
    ? 2400000
    : recipientGroups
        .filter((g) => selectedGroups.includes(g.id))
        .reduce((sum, g) => sum + g.count, 0);

  const selectTemplate = (templateId: string) => {
    const template = messageTemplates.find((t) => t.id === templateId);
    if (template) {
      setMessage(template.content);
      setSelectedTemplate(templateId);
    }
  };

  const toggleGroup = (groupId: string) => {
    if (groupId === "all") {
      setSelectedGroups(selectedGroups.includes("all") ? [] : ["all"]);
      return;
    }
    setSelectedGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((g) => g !== groupId)
        : [...prev.filter((g) => g !== "all"), groupId]
    );
  };

  const handleSend = async () => {
    setIsSending(true);
    // Simulate sending
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSending(false);
    setShowConfirm(false);
    // Would redirect or show success
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-white">Bulk Communication</h1>
          <p className="text-neutral-400 text-sm">Send SMS and voice alerts to registered residents</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Message Templates */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Message Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {messageTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => selectTemplate(template.id)}
                    className={cn(
                      "p-3 rounded-lg border text-left transition-all",
                      selectedTemplate === template.id
                        ? "border-primary-500 bg-primary-500/10"
                        : "border-neutral-700 hover:border-neutral-600"
                    )}
                  >
                    <div className="font-medium text-sm text-white">{template.title}</div>
                    <div className="text-xs text-neutral-500 mt-1">{template.charCount} chars</div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Compose Message */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Compose Message</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                placeholder="Type your alert message here..."
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  setSelectedTemplate("");
                }}
                rows={6}
                className="flex w-full rounded-md border border-neutral-600 bg-neutral-800 px-3 py-2 text-sm text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              />
              <div className="flex items-center justify-between mt-2 text-xs">
                <span className={cn("text-neutral-400", charCount > 480 && "text-alert-high")}>
                  {charCount} characters • {smsSegments} SMS segment{smsSegments !== 1 ? "s" : ""}
                </span>
                <span className="text-neutral-500">160 chars per segment</span>
              </div>
            </CardContent>
          </Card>

          {/* Select Recipients */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Select Recipients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {recipientGroups.map((group) => {
                  const isSelected = selectedGroups.includes(group.id) || (group.id !== "all" && selectedGroups.includes("all"));
                  return (
                    <button
                      key={group.id}
                      onClick={() => toggleGroup(group.id)}
                      className={cn(
                        "w-full p-3 rounded-lg border flex items-center justify-between transition-all",
                        isSelected
                          ? "border-primary-500 bg-primary-500/10"
                          : "border-neutral-700 hover:border-neutral-600"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Users className="w-4 h-4 text-neutral-400" />
                        <span className="text-sm text-white">{group.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-neutral-500">{group.count.toLocaleString()}</span>
                        {isSelected && <Check className="w-4 h-4 text-primary-400" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Delivery Channels */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Delivery Channels</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-neutral-400" />
                  <span className="text-sm text-white">SMS</span>
                </div>
                <input
                  type="checkbox"
                  checked={channels.sms}
                  onChange={(e) => setChannels({ ...channels, sms: e.target.checked })}
                  className="rounded border-neutral-600 bg-neutral-800 text-primary-500"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-neutral-400" />
                  <span className="text-sm text-white">Voice Call</span>
                </div>
                <input
                  type="checkbox"
                  checked={channels.voice}
                  onChange={(e) => setChannels({ ...channels, voice: e.target.checked })}
                  className="rounded border-neutral-600 bg-neutral-800 text-primary-500"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-neutral-400" />
                  <span className="text-sm text-white">Push Notification</span>
                </div>
                <input
                  type="checkbox"
                  checked={channels.push}
                  onChange={(e) => setChannels({ ...channels, push: e.target.checked })}
                  className="rounded border-neutral-600 bg-neutral-800 text-primary-500"
                />
              </label>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-400">Recipients</span>
                <span className="text-white font-medium">{totalRecipients.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-400">SMS Segments</span>
                <span className="text-white font-medium">{smsSegments}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-400">Channels</span>
                <span className="text-white font-medium">
                  {[channels.sms && "SMS", channels.voice && "Voice", channels.push && "Push"].filter(Boolean).join(", ") || "None"}
                </span>
              </div>
              <div className="pt-3 border-t border-neutral-700">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-400">Est. Cost</span>
                  <span className="text-white font-medium">₹{((totalRecipients * smsSegments * 0.15) / 100000).toFixed(1)}L</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Send Button */}
          <Button
            className="w-full"
            size="lg"
            variant="destructive"
            disabled={!message || selectedGroups.length === 0 || isSending}
            onClick={() => setShowConfirm(true)}
          >
            <Send className="w-4 h-4 mr-2" />
            Send Alert
          </Button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-alert-high/20 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-alert-high" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Confirm Broadcast</h3>
                  <p className="text-sm text-neutral-400">This action cannot be undone</p>
                </div>
              </div>
              <div className="space-y-2 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Recipients</span>
                  <span className="text-white">{totalRecipients.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Channels</span>
                  <span className="text-white">
                    {[channels.sms && "SMS", channels.voice && "Voice", channels.push && "Push"].filter(Boolean).join(", ")}
                  </span>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setShowConfirm(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" className="flex-1" onClick={handleSend} loading={isSending}>
                  <Send className="w-4 h-4 mr-2" />
                  Confirm Send
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
