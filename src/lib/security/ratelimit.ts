
import { NextRequest, NextResponse } from "next/server";

// Simple in-memory rate limiter for demo purposes.
// For production, use Upstash Redis or a persistent store.
const trackers = new Map<string, { count: number; lastReset: number }>();

export function rateLimit(req: NextRequest, options: { limit: number; windowMs: number }) {
  const ip = req.ip || "anonymous";
  const now = Date.now();
  const tracker = trackers.get(ip) || { count: 0, lastReset: now };

  if (now - tracker.lastReset > options.windowMs) {
    tracker.count = 0;
    tracker.lastReset = now;
  }

  tracker.count++;
  trackers.set(ip, tracker);

  if (tracker.count > options.limit) {
    return false;
  }

  return true;
}
