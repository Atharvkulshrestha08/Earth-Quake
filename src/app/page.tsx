import Link from "next/link";
import {
  ArrowRight,
  Bell,
  Shield,
  Smartphone,
  MapPin,
  Zap,
  Users,
  Droplets,
  Wind,
  Activity,
  Flame,
  Waves,
  ThermometerSun,
  Phone,
  Mail,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SeverityMeter, StatCard, AlertBanner } from "@/components/ui/misc";
import { formatDateTime, getSeverityLabel, getAlertTypeColor, timeAgo } from "@/lib/utils";

const features = [
  {
    icon: Zap,
    title: "Real-Time Alerts",
    description:
      "Get instant notifications about disasters in your area. Our AI analyzes data from multiple sources to provide early warnings.",
    color: "text-alert-high",
  },
  {
    icon: Smartphone,
    title: "Works Everywhere",
    description:
      "Receive alerts on smartphones, feature phones, and even landlines. SMS and voice calls ensure no one is left behind.",
    color: "text-primary-400",
  },
  {
    icon: MapPin,
    title: "Location-Based",
    description:
      "Get alerts specific to your location. No more irrelevant notifications - only what matters for where you are.",
    color: "text-alert-medium",
  },
  {
    icon: Shield,
    title: "Government Integration",
    description:
      "Direct connection with disaster management authorities for coordinated response and verified information.",
    color: "text-alert-low",
  },
  {
    icon: Users,
    title: "Community Safety",
    description:
      "Share your status with family and friends. Let them know you're safe with one tap during emergencies.",
    color: "text-blue-400",
  },
  {
    icon: Clock,
    title: "24/7 Monitoring",
    description:
      "Round-the-clock surveillance of weather patterns, seismic activity, and disaster indicators across India.",
    color: "text-purple-400",
  },
];

const disasterTypes = [
  { icon: Droplets, name: "Flood", color: "#3b82f6" },
  { icon: Activity, name: "Earthquake", color: "#ef4444" },
  { icon: Wind, name: "Cyclone", color: "#f59e0b" },
  { icon: Flame, name: "Fire", color: "#dc2626" },
  { icon: Waves, name: "Tsunami", color: "#06b6d4" },
  { icon: ThermometerSun, name: "Heatwave", color: "#f97316" },
];

const stats = [
  { value: "28", label: "States Covered", suffix: "+" },
  { value: "1.4", label: "Billion People", suffix: "B+", isDecimal: true },
  { value: "<", label: "Response Time", suffix: "60s" },
  { value: "99.9", label: "Uptime", suffix: "%" },
];

const steps = [
  {
    number: "01",
    title: "Register Your Location",
    description:
      "Sign up with your phone number and tell us where you live. We'll send alerts specific to your area.",
  },
  {
    number: "02",
    title: "Receive Early Warnings",
    description:
      "Get notified before disaster strikes. Our AI processes data from multiple sources to give you precious minutes.",
  },
  {
    number: "03",
    title: "Follow Safety Instructions",
    description:
      "Clear, actionable guidance for each disaster type. Know exactly what to do and where to go.",
  },
  {
    number: "04",
    title: "Stay Connected",
    description:
      "Share your safety status with loved ones. Coordinate with rescue teams if needed.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-900 to-primary-900/20" />
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-neutral-700" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-alert-high/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* Alert Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-alert-medium/10 border border-alert-medium/30 rounded-full mb-8">
              <span className="w-2 h-2 bg-alert-medium rounded-full animate-pulse" />
              <span className="text-sm text-alert-medium font-medium">
                Monsoon Season Alert Active for Coastal Regions
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="text-white">Predict Early.</span>
              <br />
              <span className="text-white">Alert Everyone.</span>
              <br />
              <span className="gradient-text">Save Lives.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-neutral-300 max-w-2xl mx-auto mb-10">
              Real-time disaster intelligence platform that delivers life-saving alerts
              to every phone, everywhere in India. Because every second counts.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button size="xl" asChild className="w-full sm:w-auto">
                <Link href="/register">
                  Get Alerts Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="xl" variant="outline" asChild className="w-full sm:w-auto">
                <Link href="/alerts">
                  View Live Alerts
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-neutral-800/50 backdrop-blur border border-neutral-700 rounded-lg p-4">
                  <div className="text-2xl sm:text-3xl font-bold text-white">
                    {stat.value}
                    <span className="text-primary-400">{stat.suffix}</span>
                  </div>
                  <div className="text-sm text-neutral-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-neutral-500">
          <span className="text-xs mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-neutral-600 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-neutral-500 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Live Alert Section */}
      <section className="py-16 bg-neutral-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Live Disaster Monitoring
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              Real-time alerts from across India, updated every minute
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sample Alert Cards */}
            <Card variant="alert" severity={4}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Badge variant="high">High Alert</Badge>
                  <span className="text-xs text-neutral-500">12 min ago</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Droplets className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Heavy Rainfall Warning</CardTitle>
                    <p className="text-sm text-neutral-400">Mumbai Metropolitan Region</p>
                  </div>
                </div>
                <p className="text-sm text-neutral-300 mb-3">
                  Red alert issued for Mumbai and surrounding areas. Expected rainfall of 200-250mm in next 24 hours.
                </p>
                <SeverityMeter severity={4} />
              </CardContent>
            </Card>

            <Card variant="alert" severity={3}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Badge variant="medium">Moderate</Badge>
                  <span className="text-xs text-neutral-500">45 min ago</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <Wind className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Cyclone Alert</CardTitle>
                    <p className="text-sm text-neutral-400">Odisha Coast</p>
                  </div>
                </div>
                <p className="text-sm text-neutral-300 mb-3">
                  Deep depression likely to intensify into cyclonic storm. Fishermen advised not to venture into sea.
                </p>
                <SeverityMeter severity={3} />
              </CardContent>
            </Card>

            <Card variant="alert" severity={2}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Badge variant="low">Low</Badge>
                  <span className="text-xs text-neutral-500">2 hours ago</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                    <ThermometerSun className="w-5 h-5 text-yellow-500" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Heatwave Warning</CardTitle>
                    <p className="text-sm text-neutral-400">Rajasthan Region</p>
                  </div>
                </div>
                <p className="text-sm text-neutral-300 mb-3">
                  Heatwave conditions likely in Jodhpur, Bikaner divisions. Maximum temperatures may reach 46°C.
                </p>
                <SeverityMeter severity={2} />
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link href="/alerts">
                View All Active Alerts
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              How Earth-Quake Works
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              From detection to delivery in under 60 seconds
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="relative">
                <div className="text-6xl font-bold text-primary-500/20 mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-neutral-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-neutral-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Built to Save Lives
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              Every feature designed with one goal: get critical information to people
              when it matters most
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="hover:border-primary-500/50 transition-colors">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-neutral-700 rounded-lg flex items-center justify-center mb-4">
                      <Icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-neutral-400">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Disaster Types */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              We Monitor All Disasters
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              Comprehensive coverage across all natural disasters affecting India
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {disasterTypes.map((type) => {
              const Icon = type.icon;
              return (
                <div
                  key={type.name}
                  className="flex items-center gap-3 px-6 py-3 bg-neutral-800 border border-neutral-700 rounded-full hover:border-primary-500/50 transition-colors"
                >
                  <Icon className="w-5 h-5" style={{ color: type.color }} />
                  <span className="font-medium text-white">{type.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary-600 to-primary-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Don't Wait for Disaster to Strike
          </h2>
          <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
            Register now and receive life-saving alerts directly on your phone.
            It's free, it's fast, and it could save your life.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="xl" variant="secondary" asChild className="w-full sm:w-auto">
              <Link href="/register">
                <Phone className="mr-2 w-5 h-5" />
                Register with Phone Number
              </Link>
            </Button>
            <Button size="xl" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-800 w-full sm:w-auto" asChild>
              <Link href="/admin">
                <Shield className="mr-2 w-5 h-5" />
                For Government Officials
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-400 mb-2">100%</div>
              <p className="text-neutral-400">Free for Citizens</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-400 mb-2">NDMA</div>
              <p className="text-neutral-400">Partner Organization</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-400 mb-2">Open</div>
              <p className="text-neutral-400">Source Data Integration</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
