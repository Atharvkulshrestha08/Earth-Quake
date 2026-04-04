import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .length(10, "Phone number must be 10 digits")
    .regex(/^[0-9]+$/, "Phone number must contain only digits"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  language: z.enum(["en", "hi", "ta", "te", "bn", "mr", "gu", "kn", "ml"]).default("en"),
  location: z.object({
    lat: z.number(),
    lng: z.number(),
    address: z.string().optional(),
  }).optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must consent to receive emergency alerts",
  }),
});

export const otpVerifySchema = z.object({
  phone: z.string().length(10),
  otp: z.string().length(6),
});

export const alertCreateSchema = z.object({
  type: z.enum([
    "FLOOD",
    "EARTHQUAKE",
    "CYCLONE",
    "DROUGHT",
    "FIRE",
    "TSUNAMI",
    "LANDSLIDE",
    "HEATWAVE",
    "COLDWAVE",
    "STORM",
  ]),
  severity: z.number().min(1).max(5),
  title: z.string().min(5).max(200),
  description: z.string().min(10).max(2000),
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  radius: z.number().min(1).max(500).default(50),
  eta: z.string().datetime().optional(),
  expiresAt: z.string().datetime().optional(),
  regionId: z.string().optional(),
});

export const shelterCreateSchema = z.object({
  name: z.string().min(2).max(200),
  address: z.string().min(5).max(500),
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  capacity: z.number().min(1).max(100000),
  amenities: z.array(z.string()).default([]),
  regionId: z.string(),
  organizationId: z.string().optional(),
});

export const residentImportSchema = z.object({
  residents: z.array(
    z.object({
      name: z.string().min(1),
      phone: z.string().length(10),
      email: z.string().email().optional(),
      location: z.object({
        lat: z.number(),
        lng: z.number(),
        address: z.string().optional(),
      }).optional(),
    })
  ),
  regionId: z.string(),
  organizationId: z.string().optional(),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type OtpVerifyInput = z.infer<typeof otpVerifySchema>;
export type AlertCreateInput = z.infer<typeof alertCreateSchema>;
export type ShelterCreateInput = z.infer<typeof shelterCreateSchema>;
export type ResidentImportInput = z.infer<typeof residentImportSchema>;
