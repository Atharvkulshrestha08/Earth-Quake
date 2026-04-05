import Link from "next/link";
import { 
  Building2, 
  ShieldCheck, 
  Users, 
  BarChart3, 
  Send, 
  Map as MapIcon, 
  ArrowRight, 
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function GovernmentPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-neutral-900 border-b border-neutral-800">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid-large" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary-500" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid-large)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-500/10 border border-primary-500/30 rounded-full mb-6">
            <ShieldCheck className="w-4 h-4 text-primary-400" />
            <span className="text-xs font-semibold text-primary-400 uppercase tracking-wider">
              Official Partnership Program
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Empowering <span className="gradient-text">Disaster Management</span> <br />
            at Every Level
          </h1>
          
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto mb-10">
            Join the national network of authorities using Earth-Quake to protect citizens, 
            coordinate responders, and build resilient communities with real-time intelligence.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="xl" asChild>
              <Link href="/register?type=government">
                Register as Authority
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" asChild>
              <Link href="/admin">
                <Lock className="mr-2 w-5 h-5" />
                Official Admin Login
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-24 bg-neutral-800/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Integrated Crisis Solutions
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              A comprehensive toolkit designed specifically for government agencies and first responders.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureItem 
              icon={Send} 
              title="Bulk Alerting System" 
              description="Deploy multi-channel alerts (SMS, App, Voice) to specific regions or entire populations in seconds under authorized protocols."
            />
            <FeatureItem 
              icon={MapIcon} 
              title="Geospatial Analysis" 
              description="Visualize threats and impact zones with precision. Identify high-risk areas using our advanced AI-driven mapping tools."
            />
            <FeatureItem 
              icon={Users} 
              title="Resident Coordination" 
              description="Maintain a secure repository of residents. Track safety statuses and evacuation progress during active emergencies."
            />
            <FeatureItem 
              icon={Building2} 
              title="Resource Management" 
              description="Coordinate shelter availability, supply chains, and rescue team deployments from a centralized dashboard."
            />
            <FeatureItem 
              icon={BarChart3} 
              title="Intelligence & Analytics" 
              description="Access detailed post-disaster reports and real-time movement data to optimize future response strategies."
            />
            <FeatureItem 
              icon={ShieldCheck} 
              title="Secure Collaboration" 
              description="Inter-agency workflows allow NDRF, State Authorities, and local councils to share information securely."
            />
          </div>
        </div>
      </section>

      {/* Access Levels */}
      <section className="py-24 border-t border-neutral-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-neutral-900 border border-neutral-700 rounded-2xl overflow-hidden">
            <div className="p-8 md:p-12 text-center border-b border-neutral-800">
              <h2 className="text-2xl font-bold text-white mb-4">Official Admin Portal</h2>
              <p className="text-neutral-400 mb-8">
                Authorized officials can access the secure dashboard to manage alerts and resources.
              </p>
              <Button size="lg" asChild className="px-12">
                <Link href="/admin">
                  Go to Secure Admin Dashboard
                </Link>
              </Button>
            </div>
            <div className="grid md:grid-cols-2 bg-neutral-800/40">
              <div className="p-8 border-b md:border-b-0 md:border-r border-neutral-800">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary-500 rounded-full" />
                  Request Access
                </h3>
                <p className="text-sm text-neutral-400 mb-4">
                  New to Earth-Quake? If you represent a local or state authority, 
                  you can request credentials for your department.
                </p>
                <Link href="#" className="text-sm text-primary-400 hover:text-primary-300 font-medium">
                  Submit access request &rarr;
                </Link>
              </div>
              <div className="p-8">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-alert-medium rounded-full" />
                  Onboarding Support
                </h3>
                <p className="text-sm text-neutral-400 mb-4">
                  Need help integrating your data feeds? Our technical team 
                  provides 24/7 support for official partnerships.
                </p>
                <Link href="#" className="text-sm text-primary-400 hover:text-primary-300 font-medium">
                  Contact partner support &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureItem({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <Card className="bg-neutral-900/50 border-neutral-800 hover:border-primary-500/30 transition-all group">
      <CardHeader>
        <div className="w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-500/10 transition-colors">
          <Icon className="w-6 h-6 text-primary-400" />
        </div>
        <CardTitle className="text-lg font-bold text-white mb-2">{title}</CardTitle>
        <CardDescription className="text-neutral-400">{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
