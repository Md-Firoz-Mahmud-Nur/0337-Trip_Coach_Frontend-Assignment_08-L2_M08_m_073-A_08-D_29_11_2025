// "use client"

// import Link from "next/link"
// import type { Package as PackageType } from "@/lib/types"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { MapPin, DollarSign } from "lucide-react"

// interface PackageCardProps {
//   package: PackageType
// }

// export default function PackageCard({ package: pkg }: PackageCardProps) {

// console.log("🚨Rendering PackageCard for package:", pkg)

//   return (
//     <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
//       {pkg.images && (
//         <div className="aspect-video bg-muted overflow-hidden">
//           <img
//             src={pkg.images[0] || "/pexels-dreamlensproduction-2450296.jpg"}
//             alt={pkg.title}
//             className="w-full h-full object-cover hover:scale-105 transition-transform"
//           />
//         </div>
//       )}
//       <CardHeader>
//         <CardTitle className="line-clamp-2">{pkg.title}</CardTitle>
//         <CardDescription className="line-clamp-2">{pkg.description}</CardDescription>
//       </CardHeader>
//       <CardContent className="flex-1 flex flex-col justify-between">
//         <div className="space-y-2 mb-4">
//           {pkg.durationDays && (
//             <div className="flex items-center gap-2 text-sm text-muted-foreground">
//               <MapPin size={16} />
//               {pkg.durationDays}
//             </div>
//           )}
//           <div className="flex items-center gap-2 text-lg font-bold text-primary">
//             <DollarSign size={16} />
//             {pkg.costFrom} {pkg.currency}
//           </div>
//         </div>
//         <Link href={`/packages/${pkg._id}`} className="mt-auto">
//           <Button className="w-full">View Details</Button>
//         </Link>
//       </CardContent>
//     </Card>
//   )
// }

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Package as PackageType } from "@/lib/types";
import { Clock, DollarSign, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PackageCardProps {
  package: PackageType;
}

export default function PackageCard({ package: pkg }: PackageCardProps) {
  const image =
    pkg.images && pkg.images.length > 0
      ? pkg.images[0]
      : "/pexels-dreamlensproduction-2450296.jpg";

  return (
    <Card className="group h-full flex flex-col overflow-hidden border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-video overflow-hidden bg-slate-100">
        <Image
          src={image}
          alt={pkg.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="100vw"
        />
        <div className="absolute inset-x-3 top-3 flex items-center justify-between text-xs font-medium text-white">
          <span className="rounded-full bg-black/40 px-3 py-1 backdrop-blur">
            {pkg.destination}
          </span>
          {pkg.durationDays && (
            <span className="flex items-center gap-1 rounded-full bg-black/40 px-3 py-1 backdrop-blur">
              <Clock size={14} />
              {pkg.durationDays} days
            </span>
          )}
        </div>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-2 text-lg">{pkg.title}</CardTitle>
        <CardDescription className="line-clamp-2 text-sm">
          {pkg.summary || pkg.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="mt-auto flex flex-col gap-4 pb-4 pt-0">
        <div className="flex items-center justify-between text-sm text-slate-600">
          <div className="flex items-center gap-1">
            <MapPin size={16} className="text-blue-500" />
            <span>{pkg.departureLocation}</span>
          </div>
          {pkg.availableSeats !== undefined && (
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs">
              {pkg.availableSeats} seats left
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <DollarSign size={16} />
            </span>
            <div>
              <div className="text-lg font-semibold text-slate-900">
                {pkg.costFrom.toLocaleString()} {pkg.currency}
              </div>
              <p className="text-xs text-slate-500">Price per person from</p>
            </div>
          </div>
          <Link href={`/package/${pkg._id}`} className="ml-auto">
            <Button
              size="sm"
              className="rounded-full bg-blue-600 px-4 text-xs font-medium hover:bg-blue-700">
              View details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
