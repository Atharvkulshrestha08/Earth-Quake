"use client";

import * as React from "react";
import Link from "next/link";
import {
  Plus,
  Shield,
  MapPin,
  Users,
  Wifi,
  Zap,
  Heart,
  MoreVertical,
  Edit,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export const metadata = {
  title: "Shelter Management",
};

const shelters = [
  {
    id: "1",
    name: "Government School, Dharavi",
    address: "Dharavi Road, Sion, Mumbai - 400017",
    location: "Mumbai, Maharashtra",
    lat: 19.0467,
    lng: 72.8547,
    capacity: 500,
    occupied: 312,
    status: "OPEN",
    amenities: ["wifi", "power", "medical", "water"],
  },
  {
    id: "2",
    name: "Community Hall, Andheri",
    address: "Andheri West, Mumbai - 400058",
    location: "Mumbai, Maharashtra",
    lat: 19.1136,
    lng: 72.8697,
    capacity: 300,
    occupied: 245,
    status: "OPEN",
    amenities: ["wifi", "power", "water"],
  },
  {
    id: "3",
    name: "Sports Complex, Borivali",
    address: "Borivali East, Mumbai - 400066",
    location: "Mumbai, Maharashtra",
    lat: 19.2288,
    lng: 72.8582,
    capacity: 1000,
    occupied: 980,
    status: "FULL",
    amenities: ["wifi", "power", "medical", "water", "food"],
  },
  {
    id: "4",
    name: "Municipal School, Thane",
    address: "Thane West, Thane - 400601",
    location: "Thane, Maharashtra",
    lat: 19.2183,
    lng: 72.9780,
    capacity: 400,
    occupied: 156,
    status: "OPEN",
    amenities: ["power", "water"],
  },
];

const amenityIcons: Record<string, typeof Wifi> = {
  wifi: Wifi,
  power: Zap,
  medical: Heart,
  water: Users,
};

const statusColors: Record<string, { bg: string; text: string }> = {
  OPEN: { bg: "bg-alert-low/20", text: "text-alert-low" },
  FULL: { bg: "bg-alert-medium/20", text: "text-alert-medium" },
  CLOSED: { bg: "bg-neutral-600/20", text: "text-neutral-400" },
  EVACUATING: { bg: "bg-alert-high/20", text: "text-alert-high" },
};

export default function SheltersPage() {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredShelters = shelters.filter(
    (shelter) =>
      shelter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shelter.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shelter.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Shelter Management</h1>
          <p className="text-neutral-400 mt-1">
            Manage emergency shelters and track occupancy
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/shelters/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Shelter
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-white">1,847</div>
            <div className="text-sm text-neutral-400">Total Shelters</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-alert-low">1,523</div>
            <div className="text-sm text-neutral-400">Open</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-alert-medium">198</div>
            <div className="text-sm text-neutral-400">Nearly Full</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-neutral-400">126</div>
            <div className="text-sm text-neutral-400">Full / Closed</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <Input
            placeholder="Search shelters by name, address, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Shelters Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredShelters.map((shelter) => {
          const occupancyPercent = Math.round((shelter.occupied / shelter.capacity) * 100);
          const status = statusColors[shelter.status];

          return (
            <Card key={shelter.id} className="hover:border-neutral-600 transition-colors">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-primary-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white line-clamp-1">
                        {shelter.name}
                      </h3>
                      <Badge className={`${status.bg} ${status.text} border-0 mt-1`}>
                        {shelter.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-sm text-neutral-400 mb-4">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{shelter.address}</span>
                </div>

                {/* Occupancy Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-neutral-400">Occupancy</span>
                    <span className="text-white font-medium">
                      {shelter.occupied} / {shelter.capacity}
                    </span>
                  </div>
                  <div className="h-2 bg-neutral-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        occupancyPercent >= 90
                          ? "bg-alert-high"
                          : occupancyPercent >= 70
                          ? "bg-alert-medium"
                          : "bg-alert-low"
                      }`}
                      style={{ width: `${occupancyPercent}%` }}
                    />
                  </div>
                  <div className="text-xs text-neutral-500 mt-1">
                    {occupancyPercent}% full
                  </div>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {shelter.amenities.map((amenity) => {
                    const Icon = amenityIcons[amenity] || Wifi;
                    return (
                      <div
                        key={amenity}
                        className="flex items-center gap-1 px-2 py-1 bg-neutral-700 rounded text-xs text-neutral-300"
                      >
                        <Icon className="w-3 h-3" />
                        {amenity}
                      </div>
                    );
                  })}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-3 border-t border-neutral-700">
                  <Button size="sm" variant="outline" className="flex-1">
                    View on Map
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-alert-high hover:text-alert-high">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
