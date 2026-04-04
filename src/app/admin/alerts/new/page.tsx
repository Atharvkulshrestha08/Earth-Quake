"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
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
  MapPin,
  Bell,
  Send,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SeverityMeter } from "@/components/ui/misc";
import { cn } from "@/lib/utils";

const disasterTypes = [
  { id: "FLOOD", name: "Flood", icon: Droplets, color: "#3b82f6", description: "River flooding, flash floods, coastal flooding" },
  { id: "EARTHQUAKE", name: "Earthquake", icon: Activity, color: "#ef4444", description: "Seismic activity and tremors" },
  { id: "CYCLONE", name: "Cyclone", icon: Wind, color: "#f59e0b", description: "Tropical cyclones and storms" },
  { id: "FIRE", name: "Fire", icon: Flame, color: "#dc2626", description: "Wildfires and urban fires" },
  { id: "TSUNAMI", name: "Tsunami", icon: Waves, color: "#06b6d4", description: "Ocean waves from seismic activity" },
  { id: "HEATWAVE", name: "Heatwave", icon: ThermometerSun, color: "#f97316", description: "Extreme heat conditions" },
  { id: "COLDWAVE", name: "Coldwave", icon: Snowflake, color: "#0ea5e9", description: "Severe cold and frost" },
  { id: "LANDSLIDE", name: "Landslide", icon: Mountain, color: "#78716c", description: "Landslides and mudflows" },
  { id: "STORM", name: "Storm", icon: CloudLightning, color: "#8b5cf6", description: "Thunderstorms and lightning" },
  { id: "DROUGHT", name: "Drought", icon: Sun, color: "#eab308", description: "Extended dry periods" },
];

const steps = [
  { id: 1, name: "Type", description: "Select disaster type" },
  { id: 2, name: "Details", description: "Alert information" },
  { id: 3, name: "Location", description: "Affected area" },
  { id: 4, name: "Delivery", description: "Channels & recipients" },
  { id: 5, name: "Review", description: "Confirm & broadcast" },
];

const channelOptions = [
  { id: "push", name: "Push Notification", description: "App users", icon: Bell },
  { id: "sms", name: "SMS Alert", description: "All registered phones", icon: Send },
  { id: "voice", name: "Voice Call", description: "Critical alerts only", icon: AlertTriangle },
];

const regionOptions = [
  { id: "mumbai", name: "Mumbai Metropolitan Region", state: "Maharashtra", residents: 450000 },
  { id: "delhi", name: "Delhi NCR", state: "Delhi", residents: 380000 },
  { id: "chennai", name: "Chennai Metropolitan", state: "Tamil Nadu", residents: 290000 },
  { id: "kolkata", name: "Kolkata Metro", state: "West Bengal", residents: 250000 },
  { id: "odisha", name: "Odisha Coast", state: "Odisha", residents: 189000 },
  { id: "rajasthan", name: "Rajasthan (West)", state: "Rajasthan", residents: 156000 },
];

export default function CreateAlertPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = React.useState(1);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [formData, setFormData] = React.useState({
    type: "",
    severity: 3,
    title: "",
    description: "",
    lat: 20.5937,
    lng: 78.9629,
    radius: 50,
    eta: "",
    expiresAt: "",
    channels: ["push", "sms"] as string[],
    regions: [] as string[],
  });

  const updateField = (field: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleChannel = (channelId: string) => {
    setFormData((prev) => ({
      ...prev,
      channels: prev.channels.includes(channelId)
        ? prev.channels.filter((c) => c !== channelId)
        : [...prev.channels, channelId],
    }));
  };

  const toggleRegion = (regionId: string) => {
    setFormData((prev) => ({
      ...prev,
      regions: prev.regions.includes(regionId)
        ? prev.regions.filter((r) => r !== regionId)
        : [...prev.regions, regionId],
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        router.push("/admin/alerts");
      }
    } catch {
      // handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return !!formData.type;
      case 2: return formData.title.length >= 5 && formData.description.length >= 10;
      case 3: return formData.regions.length > 0;
      case 4: return formData.channels.length > 0;
      case 5: return true;
      default: return false;
    }
  };

  const selectedType = disasterTypes.find((t) => t.id === formData.type);
  const totalRecipients = regionOptions
    .filter((r) => formData.regions.includes(r.id))
    .reduce((sum, r) => sum + r.residents, 0);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/alerts">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-white">Create New Alert</h1>
          <p className="text-neutral-400 text-sm">Step {currentStep} of {steps.length}</p>
        </div>
      </div>

      {/* Step Progress */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
        {steps.map((step, i) => (
          <React.Fragment key={step.id}>
            <div
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-colors",
                currentStep === step.id
                  ? "bg-primary-500/20 text-primary-400"
                  : currentStep > step.id
                  ? "bg-alert-low/10 text-alert-low"
                  : "text-neutral-500"
              )}
            >
              <div
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                  currentStep === step.id
                    ? "bg-primary-500 text-white"
                    : currentStep > step.id
                    ? "bg-alert-low text-white"
                    : "bg-neutral-700 text-neutral-400"
                )}
              >
                {currentStep > step.id ? <Check className="w-3 h-3" /> : step.id}
              </div>
              <span className="hidden sm:inline">{step.name}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={cn("w-8 h-px", currentStep > step.id ? "bg-alert-low" : "bg-neutral-700")} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step Content */}
      <div className="min-h-[400px]">
        {/* Step 1: Disaster Type */}
        {currentStep === 1 && (
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">Select Disaster Type</h2>
            <p className="text-neutral-400 mb-6">Choose the type of disaster for this alert</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {disasterTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = formData.type === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => updateField("type", type.id)}
                    className={cn(
                      "p-4 rounded-lg border-2 text-center transition-all",
                      isSelected
                        ? "border-primary-500 bg-primary-500/10"
                        : "border-neutral-700 bg-neutral-800 hover:border-neutral-600"
                    )}
                  >
                    <Icon className="w-8 h-8 mx-auto mb-2" style={{ color: type.color }} />
                    <div className="font-medium text-white text-sm">{type.name}</div>
                    <div className="text-xs text-neutral-500 mt-1 line-clamp-2">{type.description}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Alert Details */}
        {currentStep === 2 && (
          <div className="max-w-2xl">
            <h2 className="text-xl font-semibold text-white mb-2">Alert Details</h2>
            <p className="text-neutral-400 mb-6">Provide information about this alert</p>
            <div className="space-y-6">
              <Input
                label="Alert Title"
                placeholder="e.g., Heavy Rainfall Warning - Mumbai"
                value={formData.title}
                onChange={(e) => updateField("title", e.target.value)}
              />
              <div>
                <label className="block text-sm font-medium text-neutral-200 mb-1.5">
                  Description
                </label>
                <textarea
                  placeholder="Provide detailed information about the threat, expected impact, and recommended actions..."
                  value={formData.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  rows={5}
                  className="flex w-full rounded-md border border-neutral-600 bg-neutral-800 px-3 py-2 text-sm text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-200 mb-3">
                  Severity Level: {formData.severity}/5
                </label>
                <div className="flex gap-2 mb-2">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <button
                      key={level}
                      onClick={() => updateField("severity", level)}
                      className={cn(
                        "flex-1 h-12 rounded-lg font-bold text-white transition-all",
                        formData.severity >= level ? (
                          level <= 1 ? "bg-alert-low" :
                          level === 2 ? "bg-alert-medium" :
                          level === 3 ? "bg-orange-500" :
                          level === 4 ? "bg-alert-high" :
                          "bg-alert-critical"
                        ) : "bg-neutral-700"
                      )}
                    >
                      {level}
                    </button>
                  ))}
                </div>
                <SeverityMeter severity={formData.severity} size="lg" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="ETA (Expected Time of Impact)"
                  type="datetime-local"
                  value={formData.eta}
                  onChange={(e) => updateField("eta", e.target.value)}
                />
                <Input
                  label="Alert Expires At"
                  type="datetime-local"
                  value={formData.expiresAt}
                  onChange={(e) => updateField("expiresAt", e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Location/Region */}
        {currentStep === 3 && (
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">Affected Regions</h2>
            <p className="text-neutral-400 mb-6">Select the regions that will receive this alert</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {regionOptions.map((region) => {
                const isSelected = formData.regions.includes(region.id);
                return (
                  <button
                    key={region.id}
                    onClick={() => toggleRegion(region.id)}
                    className={cn(
                      "p-4 rounded-lg border-2 text-left transition-all",
                      isSelected
                        ? "border-primary-500 bg-primary-500/10"
                        : "border-neutral-700 bg-neutral-800 hover:border-neutral-600"
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-white">{region.name}</h3>
                      {isSelected && <Check className="w-5 h-5 text-primary-400" />}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-neutral-400">
                      <span>{region.state}</span>
                      <span>•</span>
                      <span>{region.residents.toLocaleString()} residents</span>
                    </div>
                  </button>
                );
              })}
            </div>
            {formData.regions.length > 0 && (
              <div className="mt-4 p-3 bg-primary-500/10 border border-primary-500/30 rounded-lg">
                <span className="text-sm text-primary-400">
                  {formData.regions.length} region(s) selected • {totalRecipients.toLocaleString()} potential recipients
                </span>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Delivery Channels */}
        {currentStep === 4 && (
          <div className="max-w-2xl">
            <h2 className="text-xl font-semibold text-white mb-2">Delivery Channels</h2>
            <p className="text-neutral-400 mb-6">Choose how this alert will be delivered</p>
            <div className="space-y-3">
              {channelOptions.map((channel) => {
                const Icon = channel.icon;
                const isSelected = formData.channels.includes(channel.id);
                return (
                  <button
                    key={channel.id}
                    onClick={() => toggleChannel(channel.id)}
                    className={cn(
                      "w-full p-4 rounded-lg border-2 flex items-center gap-4 transition-all text-left",
                      isSelected
                        ? "border-primary-500 bg-primary-500/10"
                        : "border-neutral-700 bg-neutral-800 hover:border-neutral-600"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center",
                      isSelected ? "bg-primary-500" : "bg-neutral-700"
                    )}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-white">{channel.name}</div>
                      <div className="text-sm text-neutral-400">{channel.description}</div>
                    </div>
                    {isSelected && <Check className="w-5 h-5 text-primary-400" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 5: Review */}
        {currentStep === 5 && (
          <div className="max-w-2xl">
            <h2 className="text-xl font-semibold text-white mb-2">Review & Broadcast</h2>
            <p className="text-neutral-400 mb-6">Verify all details before sending the alert</p>
            <Card className="mb-6">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  {selectedType && (
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${selectedType.color}20` }}>
                      <selectedType.icon className="w-6 h-6" style={{ color: selectedType.color }} />
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-bold text-white">{formData.title}</h3>
                    <Badge variant={formData.severity >= 4 ? "critical" : formData.severity >= 3 ? "high" : "medium"}>
                      Severity: {formData.severity}/5
                    </Badge>
                  </div>
                </div>
                <p className="text-neutral-300">{formData.description}</p>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-700">
                  <div>
                    <div className="text-xs text-neutral-500 mb-1">Regions</div>
                    <div className="text-sm text-white">{formData.regions.length} region(s)</div>
                  </div>
                  <div>
                    <div className="text-xs text-neutral-500 mb-1">Recipients</div>
                    <div className="text-sm text-white">{totalRecipients.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-xs text-neutral-500 mb-1">Channels</div>
                    <div className="text-sm text-white">{formData.channels.join(", ")}</div>
                  </div>
                  <div>
                    <div className="text-xs text-neutral-500 mb-1">Type</div>
                    <div className="text-sm text-white">{formData.type}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="p-4 bg-alert-high/10 border border-alert-high/30 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-alert-high flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white text-sm">This action cannot be undone</p>
                  <p className="text-sm text-neutral-400 mt-1">
                    Broadcasting this alert will immediately notify {totalRecipients.toLocaleString()} people via the selected channels.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-neutral-800">
        <Button
          variant="outline"
          onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        {currentStep < 5 ? (
          <Button
            onClick={() => setCurrentStep((prev) => Math.min(5, prev + 1))}
            disabled={!canProceed()}
          >
            Next Step
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            variant="destructive"
            onClick={handleSubmit}
            loading={isSubmitting}
            disabled={!canProceed()}
          >
            <Send className="w-4 h-4 mr-2" />
            Broadcast Alert
          </Button>
        )}
      </div>
    </div>
  );
}
