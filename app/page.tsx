"use client";

import { Button } from "@/components/ui/button";
import {
  Compass,
  Globe2,
  HelpCircle,
  MapPin,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* 1. Hero */}
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

      {/* 2. Why choose Trip Coach */}
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

      {/* 3. Popular trips / packages */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Handpicked trips for every traveler
            </h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              Browse a selection of our most-loved getaways, from weekend city
              breaks to once-in-a-lifetime adventures.
            </p>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Tropical Beach Escape",
                location: "Bali, Indonesia",
                duration: "7 days",
                price: "From $899",
              },
              {
                title: "European Capitals Tour",
                location: "Paris • Rome • Barcelona",
                duration: "10 days",
                price: "From $1,499",
              },
              {
                title: "Mountain Adventure Retreat",
                location: "Swiss Alps",
                duration: "5 days",
                price: "From $1,099",
              },
            ].map((trip, index) => (
              <div
                key={index}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/60 p-6 shadow-sm">
                <div>
                  <div className="flex items-center gap-2 text-xs font-medium text-blue-600 uppercase tracking-wide mb-2">
                    <Globe2 size={14} />
                    {trip.location}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {trip.title}
                  </h3>
                  <p className="mt-3 text-sm text-slate-600">
                    {trip.duration} • {trip.price}
                  </p>
                </div>
                <div className="mt-6">
                  <Link href="/packages">
                    <Button
                      size="sm"
                      className="w-full bg-blue-600 text-white hover:bg-blue-700">
                      View details
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. How it works */}
      <section className="py-16 md:py-20 bg-slate-900">
        <div className="container mx-auto px-4 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold">
              Plan your trip in 3 simple steps
            </h2>
            <p className="mt-3 text-slate-300">
              No complex forms or endless searching. Share your preferences and
              Trip Coach does the heavy lifting.
            </p>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Tell us your vibe",
                description:
                  "Pick dates, budget, and travel style so we can understand what you are looking for.",
              },
              {
                step: "2",
                title: "Get tailored options",
                description:
                  "Receive curated itineraries and packages that match your preferences.",
              },
              {
                step: "3",
                title: "Book with confidence",
                description:
                  "Lock in your trip with transparent pricing and support at every step.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-2xl bg-slate-800/60 p-6 border border-slate-700">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-500 text-sm font-semibold">
                  {item.step}
                </div>
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Testimonials */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Loved by modern travelers
            </h2>
            <p className="mt-3 text-slate-600">
              Real stories from people who planned their trips with Trip Coach.
            </p>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              {
                name: "Amelia",
                role: "Solo traveler",
                quote:
                  "Trip Coach helped me plan my first solo trip to Europe without stress.",
              },
              {
                name: "Rahul & Priya",
                role: "Couple getaway",
                quote:
                  "Every detail was handled for us. We just showed up and enjoyed.",
              },
              {
                name: "Lee Family",
                role: "Family vacation",
                quote:
                  "The kids loved it and the schedule worked perfectly for everyone.",
              },
            ].map((t, index) => (
              <div
                key={index}
                className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
                <div className="flex items-center gap-2 text-yellow-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill="#facc15"
                      className="text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-sm text-slate-700">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-4">
                  <p className="text-sm font-semibold text-slate-900">
                    {t.name}
                  </p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center">
              Frequently asked questions
            </h2>
            <p className="mt-3 text-slate-600 text-center">
              Quick answers to common questions about planning with Trip Coach.
            </p>

            <div className="mt-8 space-y-6">
              {[
                {
                  q: "Do you charge any hidden fees?",
                  a: "No. All prices are clearly shown before you confirm your booking, including taxes and mandatory charges.",
                },
                {
                  q: "Can I customize the suggested packages?",
                  a: "Yes. You can tweak dates, activities, and accommodations to better match your preferences.",
                },
                {
                  q: "What if my plans change?",
                  a: "Many trips offer flexible change or cancellation policies. Specific terms are shown with each package.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 md:p-5">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 text-blue-600">
                      <HelpCircle size={18} />
                    </div>
                    <div>
                      <h3 className="text-sm md:text-base font-semibold text-slate-900">
                        {item.q}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600">{item.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Final CTA / trust */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-blue-600 via-blue-500 to-indigo-500 px-6 py-10 md:px-10 md:py-12 text-center text-white">
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

              <div className="mt-6 flex flex-col items-center gap-3">
                <Link href="/packages">
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-blue-50 font-semibold shadow-md hover:shadow-lg">
                    View all packages
                  </Button>
                </Link>
                <div className="flex items-center gap-2 text-xs text-blue-100/80">
                  <ShieldCheck size={14} />
                  <span>
                    Secure payments • Trusted partners • Dedicated support
                  </span>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full border border-white/20" />
            <div className="pointer-events-none absolute -left-20 -bottom-16 h-52 w-52 rounded-full border border-white/10" />
          </div>
        </div>
      </section>
    </div>
  );
}
