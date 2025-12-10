"use client";

import { Button } from "@/components/ui/button";
import { Compass, MapPin, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="bg-white py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              Your personal travel planner
            </span>

            <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight text-slate-900 text-balance">
              Explore the world with{" "}
              <span className="text-blue-600">Trip Coach</span>
            </h1>

            <p className="mt-4 md:mt-6 text-base md:text-xl text-slate-600 text-balance">
              Explore custom travel options that fit your preferences and price
              range. From seaside getaways to thrilling mountain journeys,
              discover your perfect vacation in no time.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/package">
                <Button
                  size="lg"
                  className="gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-shadow">
                  <Compass size={20} />
                  Explore packages
                </Button>
              </Link>

              <Link href="/how-it-works">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-blue-200 text-blue-700 hover:bg-blue-50">
                  Learn more
                </Button>
              </Link>
            </div>

            <p className="mt-4 text-sm text-slate-400">
              No hidden fees. Flexible dates. Expert support.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900">
            Why choose <span className="text-blue-600">Trip Coach?</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-center text-slate-600">
            Thoughtfully crafted experiences, expert support, and stress-free
            planning for every kind of traveler.
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                icon: MapPin,
                title: "Top Destinations",
                description:
                  "Discover carefully selected locations crafted to fit your unique travel vibe.",
              },
              {
                icon: Users,
                title: "Group Adventures",
                description:
                  "Ideal for friends, families, or solo travelers looking to join small curated groups.",
              },
              {
                icon: Compass,
                title: "Expert Travel Guides",
                description:
                  "Local professionals who turn your journey into an unforgettable and meaningful experience.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600">{feature.description}</p>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/40 to-blue-500/0 opacity-0 transition group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 px-6 py-10 md:px-10 md:py-12 text-center text-white">
            <div className="mx-auto max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-wide text-blue-100">
                Ready when you are
              </p>

              <h2 className="mt-3 text-3xl md:text-4xl font-semibold">
                Ready to start your next adventure?
              </h2>

              <p className="mt-4 text-blue-100">
                Browse our hand-picked travel packages and find the perfect
                destination for your next escape.
              </p>

              <div className="mt-6 flex justify-center">
                <Link href="/packages">
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-blue-50 font-semibold shadow-md hover:shadow-lg">
                    View all packages
                  </Button>
                </Link>
              </div>

              <p className="mt-3 text-xs text-blue-100/80">
                Flexible dates. Transparent pricing. Trusted by modern
                travelers.
              </p>
            </div>

            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full border border-white/20" />
            <div className="pointer-events-none absolute -left-20 -bottom-16 h-52 w-52 rounded-full border border-white/10" />
          </div>
        </div>
      </section>
    </div>
  );
}
