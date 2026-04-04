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
  Search,
  ChevronRight,
  Bookmark,
  Share2,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Survival Guides",
  description: "Step-by-step survival guides for floods, earthquakes, cyclones, and other natural disasters. Know what to do before, during, and after.",
};

const categories = [
  { id: "all", name: "All Guides", icon: AlertTriangle, color: "text-white", count: 24 },
  { id: "FLOOD", name: "Flood", icon: Droplets, color: "text-blue-500", count: 6 },
  { id: "EARTHQUAKE", name: "Earthquake", icon: Activity, color: "text-red-500", count: 5 },
  { id: "CYCLONE", name: "Cyclone", icon: Wind, color: "text-orange-500", count: 4 },
  { id: "FIRE", name: "Fire", icon: Flame, color: "text-red-600", count: 3 },
  { id: "TSUNAMI", name: "Tsunami", icon: Waves, color: "text-cyan-500", count: 2 },
  { id: "HEATWAVE", name: "Heatwave", icon: ThermometerSun, color: "text-yellow-500", count: 2 },
  { id: "COLDWAVE", name: "Coldwave", icon: Snowflake, color: "text-sky-500", count: 2 },
];

const guides = [
  {
    id: "1",
    category: "FLOOD",
    title: "Flood Safety: Before, During & After",
    description: "Complete guide to protecting yourself and your family during flooding. Includes evacuation routes, emergency kit preparation, and post-flood safety.",
    imageUrl: "https://images.unsplash.com/photo-1547683905-f686c993aae5?w=800&q=80",
    readTime: "8 min",
    isFeatured: true,
    lastUpdated: "2 weeks ago",
  },
  {
    id: "2",
    category: "EARTHQUAKE",
    title: "Earthquake Response: Drop, Cover, Hold",
    description: "Learn the life-saving technique used by experts worldwide. What to do during shaking, how to identify safe spots, and what to do after.",
    imageUrl: "https://images.unsplash.com/photo-1509909756405-be0199881695?w=800&q=80",
    readTime: "6 min",
    isFeatured: true,
    lastUpdated: "1 week ago",
  },
  {
    id: "3",
    category: "CYCLONE",
    title: "Cyclone Preparation Checklist",
    description: "Essential steps to secure your home and family before a cyclone hits. Includes window protection, emergency supplies, and shelter information.",
    imageUrl: "https://images.unsplash.com/photo-1509635022432-0220ac12960b?w=800&q=80",
    readTime: "10 min",
    isFeatured: false,
    lastUpdated: "3 weeks ago",
  },
  {
    id: "4",
    category: "FLOOD",
    title: "Emergency Kit Essentials",
    description: "What to pack in your emergency kit. Water, food, first aid, documents, and more. Be prepared for any disaster.",
    imageUrl: "https://images.unsplash.com/photo-1601242458636-ee27e8bc5b9b?w=800&q=80",
    readTime: "5 min",
    isFeatured: false,
    lastUpdated: "1 month ago",
  },
  {
    id: "5",
    category: "FIRE",
    title: "Wildfire Evacuation: When and How to Leave",
    description: "Know the warning signs, evacuation levels, and safe routes. Don't wait until it's too late to plan your escape.",
    imageUrl: "https://images.unsplash.com/photo-1569952901695-35d674f9c025?w=800&q=80",
    readTime: "7 min",
    isFeatured: false,
    lastUpdated: "2 weeks ago",
  },
  {
    id: "6",
    category: "HEATWAVE",
    title: "Heatwave Safety: Stay Cool, Stay Hydrated",
    description: "Recognize heat illness symptoms, stay cool during extreme heat, and know when to seek medical help.",
    imageUrl: "https://images.unsplash.com/photo-1504370805625-d32c54b16100?w=800&q=80",
    readTime: "4 min",
    isFeatured: false,
    lastUpdated: "1 week ago",
  },
  {
    id: "7",
    category: "TSUNAMI",
    title: "Tsunami Warning Signs and Response",
    description: "Natural warning signs of an approaching tsunami. How to evacuate quickly and where to go.",
    imageUrl: "https://images.unsplash.com/photo-1563718679725-8b6a35c5c0b4?w=800&q=80",
    readTime: "6 min",
    isFeatured: false,
    lastUpdated: "3 weeks ago",
  },
  {
    id: "8",
    category: "EARTHQUAKE",
    title: "First Aid After Disaster",
    description: "Basic first aid techniques for common injuries after earthquakes and other disasters.",
    imageUrl: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=800&q=80",
    readTime: "12 min",
    isFeatured: false,
    lastUpdated: "2 weeks ago",
  },
];

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-neutral-900 pt-20">
      {/* Header */}
      <div className="bg-neutral-800 border-b border-neutral-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-white mb-4">
              Survival Guides
            </h1>
            <p className="text-lg text-neutral-400 mb-6">
              Learn what to do before, during, and after a disaster. These guides could save
              your life or someone else's.
            </p>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <Input
                type="search"
                placeholder="Search guides..."
                className="pl-12 bg-neutral-700 border-neutral-600"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-4">Categories</h3>
              <div className="space-y-1">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors",
                        cat.id === "all"
                          ? "bg-primary-500/20 text-primary-400"
                          : "text-neutral-400 hover:text-white hover:bg-neutral-700"
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <Icon className="w-4 h-4" style={{ color: cat.id === "all" ? undefined : cat.color }} />
                        {cat.name}
                      </span>
                      <span className="text-xs text-neutral-500">{cat.count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-4 mt-4">
              <h3 className="font-semibold text-white mb-3">Quick Tips</h3>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li className="flex items-start gap-2">
                  <span className="text-alert-low">•</span>
                  Bookmark guides for offline access
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-alert-low">•</span>
                  Share with family members
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-alert-low">•</span>
                  Practice evacuation routes
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-alert-low">•</span>
                  Keep printed copies at home
                </li>
              </ul>
            </div>
          </aside>

          {/* Guide Grid */}
          <div className="flex-1">
            {/* Featured Guides */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">Featured Guides</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {guides
                  .filter((g) => g.isFeatured)
                  .map((guide) => {
                    const Icon = categories.find((c) => c.id === guide.category)?.icon || AlertTriangle;
                    const color = categories.find((c) => c.id === guide.category)?.color || "text-white";
                    return (
                      <Card key={guide.id} className="overflow-hidden group">
                        <div className="relative h-48 bg-gradient-to-br from-neutral-700 to-neutral-800">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Icon className="w-20 h-20 opacity-20" style={{ color }} />
                          </div>
                          <div className="absolute top-4 left-4">
                            <Badge variant="outline" className="bg-white/10 backdrop-blur text-white border-white/20">
                              <Icon className="w-3 h-3 mr-1" />
                              {guide.category}
                            </Badge>
                          </div>
                          {guide.isFeatured && (
                            <div className="absolute top-4 right-4">
                              <Badge variant="low">Featured</Badge>
                            </div>
                          )}
                        </div>
                        <CardContent className="p-4">
                          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                            {guide.title}
                          </h3>
                          <p className="text-sm text-neutral-400 mb-4 line-clamp-2">
                            {guide.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-neutral-500 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {guide.readTime} read
                            </span>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                <Bookmark className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                <Share2 className="w-4 h-4" />
                              </Button>
                              <Button size="sm" asChild>
                                <Link href={`/guides/${guide.id}`}>
                                  Read More
                                  <ChevronRight className="w-4 h-4 ml-1" />
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
              </div>
            </div>

            {/* All Guides */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">All Guides</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {guides.map((guide) => {
                  const Icon = categories.find((c) => c.id === guide.category)?.icon || AlertTriangle;
                  const color = categories.find((c) => c.id === guide.category)?.color || "text-white";
                  return (
                    <Card key={guide.id} className="overflow-hidden group">
                      <div className="relative h-32 bg-gradient-to-br from-neutral-700 to-neutral-800">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Icon className="w-12 h-12 opacity-20" style={{ color }} />
                        </div>
                        <div className="absolute top-3 left-3">
                          <Badge variant="outline" className="bg-white/10 backdrop-blur text-white border-white/20 text-xs">
                            {guide.category}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-white mb-1 group-hover:text-primary-400 transition-colors line-clamp-1">
                          {guide.title}
                        </h3>
                        <p className="text-xs text-neutral-500 mb-3 line-clamp-2">
                          {guide.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-neutral-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {guide.readTime}
                          </span>
                          <Button size="sm" variant="ghost" className="h-6 text-xs">
                            Read
                            <ChevronRight className="w-3 h-3 ml-1" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency CTA */}
      <section className="bg-alert-high/10 border-t border-alert-high/20 py-12 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AlertTriangle className="w-12 h-12 text-alert-high mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">
            Need Immediate Help?
          </h2>
          <p className="text-neutral-400 mb-6">
            If you're in immediate danger, call emergency services right away.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="destructive" size="lg" asChild>
              <Link href="tel:112">Call 112</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/alerts">View Active Alerts</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
