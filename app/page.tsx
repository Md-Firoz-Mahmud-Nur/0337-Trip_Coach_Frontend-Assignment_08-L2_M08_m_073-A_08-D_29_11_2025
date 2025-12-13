"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchPackagesError,
  fetchPackagesStart,
  fetchPackagesSuccess,
} from "@/redux/slices/packagesSlice";
import {
  Compass,
  Globe2,
  HelpCircle,
  MapPin,
  Search,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useAppDispatch();

  const { items } = useAppSelector((state) => state.packages);

  useEffect(() => {
    const fetchPackages = async () => {
      dispatch(fetchPackagesStart());
      try {
        const response = await api.getPackages();
        dispatch(fetchPackagesSuccess(response.data.data));
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch packages";
        dispatch(fetchPackagesError(errorMessage));
      }
    };

    if (items.length === 0) {
      fetchPackages();
    }
  }, [dispatch, items.length]);

  return (
    <div className="min-h-screen">
      {/* 1. Hero */}
      <section className="bg-white py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              Your personal travel planner
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-balance text-slate-900 md:text-6xl">
              Explore the world with{" "}
              <span className="text-blue-600">Trip Coach</span>
            </h1>

            <p className="mt-4 text-base text-balance text-slate-600 md:mt-6 md:text-xl">
              Explore custom travel options that fit your preferences and price
              range. From seaside getaways to thrilling mountain journeys,
              discover your perfect vacation in no time.
            </p>

            {/* HERO SEARCH BAR – ADDED */}
            <div className="mt-6 flex flex-col items-center">
              <div className="flex w-full max-w-xl items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
                <Search className="text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="flex-1 border-none bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:ring-0 focus:outline-none md:text-base"
                />
                <Link href="/package">
                  <Button
                    size="sm"
                    className="rounded-full bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Search
                  </Button>
                </Link>
              </div>
              <p className="mt-2 text-xs text-slate-400">
                Try “Bangkok city tour”, “Bali beach getaway”, or “I want a food
                trip”.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/package">
                <Button
                  size="lg"
                  className="gap-2 bg-blue-600 text-white shadow-md transition-shadow hover:bg-blue-700 hover:shadow-lg"
                >
                  <Compass size={20} />
                  Explore packages
                </Button>
              </Link>

              <div>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-blue-200 text-blue-700 hover:bg-blue-50"
                >
                  Learn more
                </Button>
              </div>
            </div>

            <p className="mt-4 text-sm text-slate-400">
              No hidden fees. Flexible dates. Expert support.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Why choose Trip Coach */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold text-slate-900 md:text-4xl">
            Why choose <span className="text-blue-600">Trip Coach?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600">
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
                className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <feature.icon size={24} />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600">{feature.description}</p>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-blue-500/0 via-blue-500/40 to-blue-500/0 opacity-0 transition group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Popular trips / packages */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              Handpicked trips for every traveler
            </h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              Browse a selection of our most-loved getaways, from weekend city
              breaks to once-in-a-lifetime adventures.
            </p>
          </div>

          {/* FEATURED CITIES – ADDED */}
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs md:text-sm">
            {["Bangkok", "Bali", "Paris", "Tokyo", "Dubai", "Singapore"].map(
              (city) => (
                <button
                  key={city}
                  className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-slate-700 transition hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700"
                >
                  <MapPin size={14} />
                  {city}
                </button>
              ),
            )}
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {items.slice(0, 3).map((pkg) => (
              <div
                key={pkg._id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/60 p-6 shadow-sm"
              >
                <div>
                  <div className="mb-2 flex items-center gap-2 text-xs font-medium tracking-wide text-blue-600 uppercase">
                    <Globe2 size={14} />
                    {pkg.destination}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {pkg.title}
                  </h3>
                  <p className="mt-3 text-sm text-slate-600">
                    {pkg.durationDays} days • From {pkg.costFrom} {pkg.currency}
                  </p>
                </div>
                <div className="mt-6">
                  <Link href={`/package/${pkg._id}`}>
                    <Button
                      size="sm"
                      className="w-full bg-blue-600 text-white hover:bg-blue-700"
                    >
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
      <section className="bg-slate-900 py-16 md:py-20">
        <div className="container mx-auto px-4 text-white">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
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
                className="rounded-2xl border border-slate-700 bg-slate-800/60 p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-sm font-semibold">
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
      <section className="bg-slate-50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
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
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-3 flex items-center gap-2 text-yellow-500">
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

      {/* 5.5 Become a Guide */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 md:flex-row">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
                Share your city. Earn as a guide.
              </h2>
              <p className="mt-3 text-slate-600">
                Turn your local knowledge into unforgettable experiences for
                travelers. Create custom tours, set your own schedule, and get
                paid doing what you love.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <Users size={16} className="text-blue-600" />
                  Host private or group tours on your own terms.
                </li>
                <li className="flex items-center gap-2">
                  <Star size={16} className="text-blue-600" />
                  Build your reputation with verified reviews.
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-blue-600" />
                  Secure payments and dedicated support.
                </li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/be-guide">
                  <Button className="bg-blue-600 text-white hover:bg-blue-700">
                    Become a Guide
                  </Button>
                </Link>
                <Link href="/guide-faq">
                  <Button
                    variant="outline"
                    className="border-blue-200 text-blue-700 hover:bg-blue-50"
                  >
                    Learn more
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex-1">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold tracking-wide text-blue-600 uppercase">
                  Featured local guides
                </p>
                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-900">
                      Maya • Bangkok street food
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      <Star size={12} className="text-yellow-400" />
                      4.9
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-900">
                      Diego • Barcelona highlights
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      <Star size={12} className="text-yellow-400" />
                      4.8
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-900">
                      Aiko • Hidden Tokyo neighborhoods
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      <Star size={12} className="text-yellow-400" />
                      5.0
                    </span>
                  </div>
                </div>
                <p className="mt-4 text-xs text-slate-500">
                  Join hundreds of trusted guides already hosting experiences
                  with Trip Coach.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-3xl font-bold text-slate-900 md:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mt-3 text-center text-slate-600">
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
                  className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 md:p-5"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1 text-blue-600">
                      <HelpCircle size={18} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900 md:text-base">
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
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-blue-600 via-blue-500 to-indigo-500 px-6 py-10 text-center text-white md:px-10 md:py-12">
            <div className="mx-auto max-w-2xl">
              <p className="text-sm font-medium tracking-wide text-blue-100 uppercase">
                Ready when you are
              </p>

              <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
                Ready to start your next adventure?
              </h2>

              <p className="mt-4 text-blue-100">
                Browse our hand-picked travel packages and find the perfect
                destination for your next escape.
              </p>

              <div className="mt-6 flex flex-col items-center gap-3">
                <Link href="/package">
                  <Button
                    size="lg"
                    className="bg-white font-semibold text-blue-600 shadow-md hover:bg-blue-50 hover:shadow-lg"
                  >
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

            <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full border border-white/20" />
            <div className="pointer-events-none absolute -bottom-16 -left-20 h-52 w-52 rounded-full border border-white/10" />
          </div>
        </div>
      </section>
    </div>
  );
}
