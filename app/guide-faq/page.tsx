"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Star, Users } from "lucide-react";
import Link from "next/link";

export default function GuideFaqPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold tracking-wide text-blue-600 uppercase">
            Guide program
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
            Frequently asked questions
          </h1>
          <p className="mt-3 text-sm text-slate-600 md:text-base">
            Learn how Trip Coach guides work, how you get paid, and what is
            required before you apply.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-900">
                <Users size={18} className="text-blue-600" />
                Who can become a guide?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-600">
              <p>
                Anyone with strong local knowledge, good communication skills,
                and a passion for hosting travelers can apply to become a guide.
              </p>
              <p>
                You must meet our safety and quality standards and agree to our
                community guidelines.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-900">
                <Star size={18} className="text-yellow-400" />
                How do earnings work?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-600">
              <p>
                You set your own prices for each experience. Trip Coach charges
                a service fee per booking to cover payment processing and
                support.
              </p>
              <p>
                Payouts are sent after a completed tour using your chosen
                payment method.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-900">
                <ShieldCheck size={18} className="text-green-600" />
                What are the requirements?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-600">
              <p>
                We require accurate profile information, a clear description of
                your tours, and compliance with local regulations.
              </p>
              <p>
                All guides must follow our safety and conduct standards when
                hosting travelers.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-900">
                <ShieldCheck size={18} className="text-blue-600" />
                How does the review system work?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-600">
              <p>
                After each tour, travelers can rate their experience and leave a
                review. These reviews appear on your guide profile.
              </p>
              <p>
                High ratings help you build trust and attract more bookings over
                time.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link href="/be-guide">
            <Button className="bg-blue-600 text-white hover:bg-blue-700">
              Become a Guide
            </Button>
          </Link>
          <Link href="/">
            <Button
              variant="outline"
              className="border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              Go to home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
