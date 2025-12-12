/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";
import { useAppSelector } from "@/redux/hooks";
import {
  AlertCircle,
  CalendarClock,
  CheckCircle,
  FileText,
  Globe2,
  Loader2,
  MapPin,
  User,
} from "lucide-react";
import Image from "next/image";
import type React from "react";
import { useEffect, useState } from "react";

const GuideApplicationPage = () => {
  const { user } = useAppSelector((state) => state.auth);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [languages, setLanguages] = useState("");
  const [experience, setExperience] = useState("");
  const [tourType, setTourType] = useState("");
  const [availability, setAvailability] = useState("");
  const [bio, setBio] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [social, setSocial] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (user) {
      setFullName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError(null);
  //   setSuccessMessage("");

  //   if (!acceptedTerms) {
  //     setError("You must agree to the guide guidelines before submitting.");
  //     return;
  //   }

  //   try {
  //     setIsLoading(true);
  //     await new Promise((resolve) => setTimeout(resolve, 1500));

  //     setSuccessMessage(
  //       "Application submitted successfully! Our team will contact you by email.",
  //     );
  //   } catch (err) {
  //     setError(
  //       "Something went wrong while submitting your application. Please try again.",
  //     );
  //     console.error(err);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");

    if (!acceptedTerms) {
      setError("You must agree to the guide guidelines before submitting.");
      return;
    }

    // basic front-end validation if you want
    if (
      !city ||
      !languages ||
      !experience ||
      !tourType ||
      !availability ||
      !bio
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setIsLoading(true);

      await api.applyGuide({
        city,
        languages: languages
          .split(",")
          .map((l) => l.trim())
          .filter(Boolean),
        experience,
        tourType,
        availability,
        bio,
        portfolio: portfolio || undefined,
        social: social || undefined,
      });

      setSuccessMessage(
        "Application submitted successfully! Our team will contact you by email.",
      );

      // optionally clear form (except name/email)
      setCity("");
      setLanguages("");
      setExperience("");
      setTourType("");
      setAvailability("");
      setBio("");
      setPortfolio("");
      setSocial("");
      setAcceptedTerms(false);
    } catch (err: any) {
      console.error("applyGuide error:", err);
      const msg =
        err?.response?.data?.message ||
        "Something went wrong while submitting your application. Please try again.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-b from-slate-50 to-slate-100 px-4 py-10">
      <div className="w-full max-w-2xl">
        <div className="mb-6 flex items-center justify-center">
          <div className="flex flex-col items-center text-center">
            <Image
              src="/tripCoach.jpg"
              alt="Trip Coach Logo"
              width={80}
              height={80}
              className="size-20"
            />
            <p className="text-sm leading-tight font-semibold text-slate-900">
              Trip <span className="text-blue-600">Coach</span>
            </p>
            <p className="text-xs text-slate-500">
              Apply to become a trusted local guide
            </p>
          </div>
        </div>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="flex justify-center">
              <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                Become a local guide
              </span>
            </CardTitle>
            <CardTitle className="text-2xl font-semibold">
              Become a <span className="text-blue-600">Trip Coach</span> guide
            </CardTitle>
            <CardDescription>
              Share your city with travelers and get paid for leading unique
              experiences.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {error && (
              <div className="mb-4 flex items-start gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-red-700">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {successMessage && (
              <div className="mb-4 flex items-start gap-2 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-green-700">
                <CheckCircle size={16} className="mt-0.5 shrink-0" />
                <span className="text-sm">{successMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Personal info */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-800"
                  >
                    <User size={16} />
                    Name
                  </label>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    readOnly
                    disabled={isLoading}
                    className="cursor-not-allowed bg-blue-50 text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium text-slate-800"
                  >
                    Email address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    readOnly
                    disabled={isLoading}
                    className="cursor-not-allowed bg-blue-50 text-sm"
                  />
                </div>
              </div>

              {/* Location & languages */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="city"
                    className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-800"
                  >
                    <MapPin size={16} />
                    City / region you guide in
                  </label>
                  <Input
                    id="city"
                    type="text"
                    placeholder="e.g. Rome, Italy"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    disabled={isLoading}
                    className="text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="languages"
                    className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-800"
                  >
                    <Globe2 size={16} />
                    Languages you speak
                  </label>
                  <Input
                    id="languages"
                    type="text"
                    placeholder="e.g. English, Spanish, Italian"
                    value={languages}
                    onChange={(e) => setLanguages(e.target.value)}
                    required
                    disabled={isLoading}
                    className="text-sm"
                  />
                </div>
              </div>

              {/* Experience & tour type */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="experience"
                    className="mb-1.5 block text-sm font-medium text-slate-800"
                  >
                    Guiding experience
                  </label>
                  <select
                    id="experience"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    disabled={isLoading}
                    className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    required
                  >
                    <option value="">Select one</option>
                    <option value="none">New to guiding</option>
                    <option value="1-2">1–2 years</option>
                    <option value="3-5">3–5 years</option>
                    <option value="5+">5+ years</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="tourType"
                    className="mb-1.5 block text-sm font-medium text-slate-800"
                  >
                    Type of tours you offer
                  </label>
                  <select
                    id="tourType"
                    value={tourType}
                    onChange={(e) => setTourType(e.target.value)}
                    disabled={isLoading}
                    className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    required
                  >
                    <option value="">Select one</option>
                    <option value="city">City walks & culture</option>
                    <option value="food">Food & nightlife</option>
                    <option value="adventure">Adventure & outdoors</option>
                    <option value="family">Family friendly</option>
                    <option value="custom">Custom / private tours</option>
                  </select>
                </div>
              </div>

              {/* Availability */}
              <div>
                <label
                  htmlFor="availability"
                  className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-800"
                >
                  <CalendarClock size={16} />
                  Availability
                </label>
                <textarea
                  id="availability"
                  rows={2}
                  placeholder="e.g. Weekends only, Mon–Fri evenings, peak season months, etc."
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  disabled={isLoading}
                  className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  required
                />
              </div>

              {/* Bio / motivation */}
              <div>
                <label
                  htmlFor="bio"
                  className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-800"
                >
                  <FileText size={16} />
                  Tell us about yourself & your tours
                </label>
                <textarea
                  id="bio"
                  rows={4}
                  placeholder="Share your story, what makes your tours special, and why travelers love exploring with you."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  disabled={isLoading}
                  className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  required
                />
              </div>

              {/* Optional links */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="portfolio"
                    className="mb-1.5 block text-sm font-medium text-slate-800"
                  >
                    Portfolio / website (optional)
                  </label>
                  <Input
                    id="portfolio"
                    type="url"
                    placeholder="https://"
                    value={portfolio}
                    onChange={(e) => setPortfolio(e.target.value)}
                    disabled={isLoading}
                    className="text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="social"
                    className="mb-1.5 block text-sm font-medium text-slate-800"
                  >
                    Social profile (optional)
                  </label>
                  <Input
                    id="social"
                    type="url"
                    placeholder="Instagram, LinkedIn, or Facebook"
                    value={social}
                    onChange={(e) => setSocial(e.target.value)}
                    disabled={isLoading}
                    className="text-sm"
                  />
                </div>
              </div>

              {/* Terms + submit */}
              <div className="flex flex-col gap-4 pt-1">
                <label className="flex items-start gap-2 text-xs text-slate-600">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    disabled={isLoading}
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>
                    I confirm that the information provided is accurate and I
                    agree to Trip Coach&apos;s guidelines and safety standards
                    for local guides.
                  </span>
                </label>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="mr-2 animate-spin" />
                      Submitting application...
                    </>
                  ) : (
                    "Submit application"
                  )}
                </Button>

                <p className="text-center text-xs text-slate-500">
                  After submitting, our team reviews your profile and reaches
                  out by email with next steps if your application is approved.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GuideApplicationPage;
