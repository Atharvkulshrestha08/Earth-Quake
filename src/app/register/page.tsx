"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { registerSchema, type RegisterInput } from "@/lib/validations";

export default function RegisterPage() {
  const [step, setStep] = React.useState<"form" | "otp">("form");
  const [phone, setPhone] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      consent: false,
      language: "en",
    },
  });

  const onSubmit = async (data: RegisterInput) => {
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Registration failed");
      }

      setPhone(data.phone);
      setStep("otp");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const [otp, setOtp] = React.useState(["", "", "", "", "", ""]);
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp: otpValue }),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Verification failed");
      }

      window.location.href = "/dashboard";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    try {
      await fetch("/api/register/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
    } catch {
      // Silently fail
    } finally {
      setIsLoading(false);
    }
  };

  if (step === "otp") {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <CardTitle className="text-2xl">Verify Phone Number</CardTitle>
            <CardDescription>
              We've sent a 6-digit code to +91 {phone}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 p-3 bg-alert-high/10 border border-alert-high/30 rounded-lg text-alert-high text-sm">
                {error}
              </div>
            )}

            <div className="flex justify-center gap-2 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  className="w-12 h-14 text-center text-2xl font-bold bg-neutral-800 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              ))}
            </div>

            <Button
              className="w-full"
              size="lg"
              onClick={handleVerifyOtp}
              disabled={isLoading || otp.join("").length !== 6}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify & Continue"
              )}
            </Button>

            <div className="mt-6 text-center">
              <p className="text-sm text-neutral-400 mb-2">
                Didn't receive the code?
              </p>
              <button
                onClick={handleResendOtp}
                disabled={isLoading}
                className="text-sm text-primary-400 hover:text-primary-300 disabled:opacity-50"
              >
                Resend OTP
              </button>
            </div>

            <div className="mt-4 text-center">
              <button
                onClick={() => setStep("form")}
                className="text-sm text-neutral-400 hover:text-white"
              >
                Change phone number
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center">
            <AlertTriangle className="w-7 h-7 text-white" />
          </div>
          <span className="font-heading font-bold text-2xl text-white">
            Earth<span className="text-primary-400">-</span>Quake
          </span>
        </Link>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Get Emergency Alerts</CardTitle>
            <CardDescription>
              Register your phone number to receive real-time disaster alerts for your area.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {error && (
                <div className="p-3 bg-alert-high/10 border border-alert-high/30 rounded-lg text-alert-high text-sm flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              <Input
                label="Full Name"
                placeholder="Enter your full name"
                {...register("name")}
                error={errors.name?.message}
              />

              <div>
                <label className="block text-sm font-medium text-neutral-200 mb-1.5">
                  Phone Number
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-neutral-600 bg-neutral-800 text-neutral-400 text-sm">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    placeholder="Enter 10-digit phone number"
                    {...register("phone")}
                    className="flex-1 rounded-none rounded-r-md border border-neutral-600 bg-neutral-800 px-3 py-2 text-sm text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-xs text-alert-high">{errors.phone.message}</p>
                )}
              </div>

              <Input
                label="Email (Optional)"
                type="email"
                placeholder="your@email.com"
                {...register("email")}
                error={errors.email?.message}
              />

              <div>
                <label className="block text-sm font-medium text-neutral-200 mb-1.5">
                  Preferred Language
                </label>
                <select
                  {...register("language")}
                  className="w-full h-10 rounded-md border border-neutral-600 bg-neutral-800 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="en">English</option>
                  <option value="hi">हिंदी (Hindi)</option>
                  <option value="ta">தமிழ் (Tamil)</option>
                  <option value="te">తెలుగు (Telugu)</option>
                  <option value="bn">বাংলা (Bengali)</option>
                  <option value="mr">मराठी (Marathi)</option>
                  <option value="gu">ગુજરાતી (Gujarati)</option>
                  <option value="kn">ಕನ್ನಡ (Kannada)</option>
                  <option value="ml">മലയാളം (Malayalam)</option>
                </select>
              </div>

              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  id="consent"
                  {...register("consent")}
                  className="mt-1 h-4 w-4 rounded border-neutral-600 bg-neutral-800 text-primary-500 focus:ring-primary-500"
                />
                <label htmlFor="consent" className="text-sm text-neutral-400">
                  I agree to receive emergency alerts and disaster notifications on my phone.
                  Message and data rates may apply.{" "}
                  <Link href="/privacy" className="text-primary-400 hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {errors.consent && (
                <p className="text-xs text-alert-high -mt-2">{errors.consent.message}</p>
              )}

              <Button type="submit" className="w-full" size="lg" loading={isLoading}>
                Get Started
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-neutral-400">
                Already registered?{" "}
                <Link href="/login" className="text-primary-400 hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Trust Indicators */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-6 text-xs text-neutral-500">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-alert-low" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              100% Free
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-alert-low" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              No Spam
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-alert-low" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              NDMA Partner
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
