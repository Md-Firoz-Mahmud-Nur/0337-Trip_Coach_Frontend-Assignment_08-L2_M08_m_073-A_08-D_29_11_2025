import Image from "next/image";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-2 font-bold text-xl mb-4">
            <Image
              src="/tripCoach.jpg"
              alt="Trip Coach Logo"
              width={40}
              height={40}
              className="rounded"
            />
            Trip Coach
          </div>
          <p className="text-gray-400">Experience travel like a local</p>
        </div>
        <div>
          <h4 className="font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#" className="hover:text-white">
                Explore
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Guides
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Bookings
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Support</h4>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#" className="hover:text-white">
                Help
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Privacy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Terms
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Follow Us</h4>
          <div className="flex gap-4">
            <FaFacebook
              className="cursor-pointer hover:text-blue-500"
              size={20}
            />
            <FaTwitter
              className="cursor-pointer hover:text-blue-400"
              size={20}
            />
            <FaInstagram
              className="cursor-pointer hover:text-pink-500"
              size={20}
            />
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
        <p>&copy; 2025 Local Guide. All rights reserved.</p>
      </div>
    </footer>
  );
}
