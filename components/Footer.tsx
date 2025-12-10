// import Link from "next/link";

// export default function Footer() {
//   return (
//     <footer className="border-t border-border bg-muted/50 py-12">
//       <div className="container mx-auto px-4">
//         <div className="grid md:grid-cols-3 gap-8 mb-8">
//           <div>
//             <h3 className="font-bold text-lg mb-2">Trip Coach</h3>
//             <p className="text-sm text-muted-foreground">
//               Discover amazing travel packages and create unforgettable
//               memories.
//             </p>
//           </div>
//           <div>
//             <h4 className="font-semibold mb-4">Quick Links</h4>
//             <ul className="space-y-2 text-sm text-muted-foreground">
//               <li>
//                 <Link href="/" className="hover:text-foreground">
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <a href="/packages" className="hover:text-foreground">
//                   Packages
//                 </a>
//               </li>
//             </ul>
//           </div>
//           <div>
//             <h4 className="font-semibold mb-4">Contact</h4>
//             <p className="text-sm text-muted-foreground">
//               support@tripcoach.com
//             </p>
//           </div>
//         </div>
//         <div className="border-t border-border pt-8 flex justify-between items-center text-sm text-muted-foreground">
//           <p>&copy; 2025 Trip Coach. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// }


import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50/60">
      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-bold text-slate-900">Trip Coach</h3>
            <p className="mt-2 text-sm text-slate-600 max-w-sm">
              Discover curated travel packages, plan with confidence, and create
              unforgettable memories around the world.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 tracking-wide uppercase">
              Quick links
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/" className="transition hover:text-blue-600">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/packages"
                  className="transition hover:text-blue-600">
                  Packages
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 tracking-wide uppercase">
              Contact
            </h4>
            <p className="mt-3 text-sm text-slate-600">
              Have questions about a trip or a custom itinerary?
            </p>
            <a
              href="mailto:support@tripcoach.com"
              className="mt-2 inline-block text-sm font-medium text-blue-600 hover:text-blue-700">
              support@tripcoach.com
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-xs text-slate-500">
          <p>&copy; 2025 Trip Coach. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-blue-600">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-blue-600">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
