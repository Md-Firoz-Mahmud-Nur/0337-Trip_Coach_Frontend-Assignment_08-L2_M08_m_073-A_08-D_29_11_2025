"use client";

import Link from "next/link";
import { FaCamera, FaClock, FaSearch, FaStar, FaUsers } from "react-icons/fa";
// import Header from "@/components/header";
// import Footer from "@/components/footer";

export default function Home() {
  const features = [
    {
      icon: FaUsers,
      title: "Local Experts",
      desc: "Authentic guides sharing real experiences",
    },
    {
      icon: FaCamera,
      title: "Unique Experiences",
      desc: "Discover hidden gems off the beaten path",
    },
    {
      icon: FaStar,
      title: "Verified Reviews",
      desc: "Trusted ratings from real travelers",
    },
    {
      icon: FaClock,
      title: "Flexible Scheduling",
      desc: "Book tours at times that work for you",
    },
  ];

  const guides = [
    {
      name: "Sarah",
      city: "Paris",
      expertise: "Food Tours",
      rating: 4.9,
      reviews: 156,
    },
    {
      name: "Marco",
      city: "Rome",
      expertise: "History Tours",
      rating: 4.8,
      reviews: 203,
    },
    {
      name: "Aisha",
      city: "Marrakech",
      expertise: "Cultural Tours",
      rating: 5.0,
      reviews: 89,
    },
  ];

  return (
    <>
      {/* <Header /> */}
      <main>
        {/* Hero Section */}
        <section className="bg-linear-to-r from-blue-600 to-blue-700 text-white py-20 px-4">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <h1 className="text-5xl font-bold">Experience Like a Local</h1>
            <p className="text-xl opacity-90">
              Connect with passionate guides and discover authentic travel
              experiences
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Link
                href="/explore"
                className="bg-yellow-500 hover:bg-yellow-600 text-dark px-8 py-3 rounded-lg font-semibold">
                Explore Tours
              </Link>
              <Link
                href="/auth/register"
                className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600">
                Become a Guide
              </Link>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="bg-white py-16 px-4 border-b">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Where are you going?"
                className="border rounded-lg px-4 py-3 w-full"
              />
              <input
                type="date"
                className="border rounded-lg px-4 py-3 w-full"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                <FaSearch /> Search
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              Why Choose Trip Coach?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
                  <feature.icon className="text-blue-600 text-3xl mb-4" />
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Guides */}
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              Featured Guides
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {guides.map((guide, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
                  <div className="h-40 bg-linear-to-br from-blue-400 to-blue-600"></div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold">{guide.name}</h3>
                    <p className="text-gray-500 text-sm">{guide.city}</p>
                    <p className="text-sm text-gray-600 my-3">
                      {guide.expertise}
                    </p>
                    <div className="flex items-center gap-2">
                      <FaStar className="text-yellow-500" />
                      <span className="font-semibold">{guide.rating}</span>
                      <span className="text-gray-500 text-sm">
                        ({guide.reviews} reviews)
                      </span>
                    </div>
                    <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold">
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 text-white py-16 px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-4xl font-bold">Ready to Explore?</h2>
            <p className="text-lg opacity-90">
              Join thousands of travelers discovering authentic experiences
            </p>
            <Link
              href="/explore"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-dark px-8 py-3 rounded-lg font-semibold mt-4">
              Start Exploring
            </Link>
          </div>
        </section>
      </main>
      {/* <Footer /> */}
    </>
  );
}
