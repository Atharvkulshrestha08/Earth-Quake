import * as React from "react";
import Link from "next/link";
import {
  Plus,
  Users,
  Search,
  Phone,
  Mail,
  MapPin,
  Shield,
  Upload,
  Download,
  MoreVertical,
  Edit,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Resident Management",
};

const residents = [
  {
    id: "1",
    name: "Rajesh Kumar",
    phone: "+91 98765 43210",
    email: "rajesh.kumar@email.com",
    location: "Mumbai, Maharashtra",
    registered: "2 weeks ago",
    alertsReceived: 12,
    status: "active",
  },
  {
    id: "2",
    name: "Priya Sharma",
    phone: "+91 87654 32109",
    email: "priya.sharma@email.com",
    location: "Bhubaneswar, Odisha",
    registered: "1 month ago",
    alertsReceived: 8,
    status: "active",
  },
  {
    id: "3",
    name: "Amit Patel",
    phone: "+91 76543 21098",
    email: "amit.patel@email.com",
    location: "Ahmedabad, Gujarat",
    registered: "3 weeks ago",
    alertsReceived: 5,
    status: "active",
  },
  {
    id: "4",
    name: "Sneha Reddy",
    phone: "+91 65432 10987",
    email: null,
    location: "Hyderabad, Telangana",
    registered: "1 week ago",
    alertsReceived: 3,
    status: "pending",
  },
];

export default function ResidentsPage() {
  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Resident Management</h1>
          <p className="text-neutral-400 mt-1">
            Manage registered residents and their alert preferences
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import CSV
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button asChild>
            <Link href="/admin/residents/new">
              <Plus className="w-4 h-4 mr-2" />
              Add Resident
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-white">2.4M</div>
            <div className="text-sm text-neutral-400">Total Registered</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-alert-low">1.8M</div>
            <div className="text-sm text-neutral-400">Active Users</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-alert-medium">600K</div>
            <div className="text-sm text-neutral-400">SMS Alerts Today</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-neutral-400">45K</div>
            <div className="text-sm text-neutral-400">Pending Verification</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <Input
                placeholder="Search by name, phone, or email..."
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select className="h-10 px-3 rounded-md border border-neutral-600 bg-neutral-800 text-sm">
                <option>All Regions</option>
                <option>Maharashtra</option>
                <option>Gujarat</option>
                <option>Odisha</option>
                <option>Tamil Nadu</option>
              </select>
              <select className="h-10 px-3 rounded-md border border-neutral-600 bg-neutral-800 text-sm">
                <option>All Status</option>
                <option>Active</option>
                <option>Pending</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Residents Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-800 border-b border-neutral-700">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-medium text-neutral-400">Resident</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-neutral-400">Contact</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-neutral-400">Location</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-neutral-400">Status</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-neutral-400">Alerts</th>
                  <th className="text-right px-4 py-3 text-sm font-medium text-neutral-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-700">
                {residents.map((resident) => (
                  <tr key={resident.id} className="hover:bg-neutral-800/50 transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-500/20 rounded-full flex items-center justify-center">
                          <span className="text-primary-400 font-medium">
                            {resident.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-white">{resident.name}</div>
                          <div className="text-xs text-neutral-500">Added {resident.registered}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2 text-neutral-300">
                          <Phone className="w-3 h-3 text-neutral-500" />
                          {resident.phone}
                        </div>
                        {resident.email && (
                          <div className="flex items-center gap-2 text-neutral-500">
                            <Mail className="w-3 h-3" />
                            {resident.email}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2 text-sm text-neutral-300">
                        <MapPin className="w-3 h-3 text-neutral-500" />
                        {resident.location}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant={resident.status === "active" ? "low" : "medium"}>
                        {resident.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-white font-medium">{resident.alertsReceived}</span>
                      <span className="text-neutral-500 text-sm ml-1">alerts</span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-alert-high hover:text-alert-high">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-neutral-700">
            <div className="text-sm text-neutral-400">
              Showing 1-10 of 2,400,000
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

