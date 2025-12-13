/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api";
import type { Package } from "@/lib/types";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchPackagesError,
  fetchPackagesStart,
  fetchPackagesSuccess,
} from "@/redux/slices/packagesSlice";
import { Edit2, Loader2, Plus } from "lucide-react";
import { useEffect, useState } from "react";

type PackageFormState = {
  title: string;
  summary: string;
  description: string;
  destination: string;
  costFrom: string;
  currency: string;
  durationDays: string;
  capacity: string;
  startDate: string;
  endDate: string;
  departureLocation: string;
  arrivalLocation: string;
  minAge: string;
  maxAge: string;
  tags: string;
  included: string;
  excluded: string;
  amenities: string;
  itinerary: string;
  packageType: string;
  images: string;
  availableSeats?: number;
  isActive?: boolean;
  meetingPoint?: string;
  guide?: string;
};

type PackageTypeOption = {
  _id: string;
  name: string;
};

const emptyForm: PackageFormState = {
  title: "",
  summary: "",
  description: "",
  destination: "",
  costFrom: "",
  currency: "BDT",
  durationDays: "",
  capacity: "",
  startDate: "",
  endDate: "",
  departureLocation: "",
  arrivalLocation: "",
  minAge: "",
  maxAge: "",
  tags: "",
  included: "",
  excluded: "",
  amenities: "",
  itinerary: "",
  packageType: "",
  images: "",
  availableSeats: 0,
  isActive: true,
  meetingPoint: "",
  guide: "",
};

export default function AdminPackages() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const {
    items: packages,
    isLoading,
    error,
  } = useAppSelector((state) => state.packages);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<PackageFormState>(emptyForm);
  const [packageTypeError, setPackageTypeError] = useState<string | null>(null);
  const [packageTypes, setPackageTypes] = useState<PackageTypeOption[]>([]);
  const [filterType, setFilterType] = useState<string>("all");

  useEffect(() => {
    if (!user) {
      return;
    }
    const fetchData = async () => {
      dispatch(fetchPackagesStart());
      try {
        const [packagesRes, typesRes] = await Promise.all([
          api.getGuidePackages(user._id),
          api.getPackageTypes(),
        ]);

        const pkgs = Array.isArray(packagesRes.data)
          ? packagesRes.data
          : packagesRes.data.data || [];
        dispatch(fetchPackagesSuccess(pkgs));

        const types = Array.isArray(typesRes.data)
          ? typesRes.data
          : typesRes.data.data || [];
        setPackageTypes(types);
      } catch (err) {
        dispatch(
          fetchPackagesError(
            err instanceof Error ? err.message : "Failed to fetch packages",
          ),
        );
      }
    };

    if (packages.length === 0 || packageTypes.length === 0) {
      fetchData();
    }
  }, [dispatch, packages.length, packageTypes.length, user]);

  const parseCommaList = (value: string) =>
    value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

  const buildPayload = () => ({
    title: formData.title,
    summary: formData.summary,
    description: formData.description,
    destination: formData.destination,
    costFrom: formData.costFrom ? Number(formData.costFrom) : undefined,
    currency: formData.currency,
    durationDays: formData.durationDays
      ? Number(formData.durationDays)
      : undefined,
    capacity: formData.capacity ? Number(formData.capacity) : undefined,
    startDate: formData.startDate || undefined,
    endDate: formData.endDate || undefined,
    departureLocation: formData.departureLocation,
    arrivalLocation: formData.arrivalLocation,
    minAge: formData.minAge ? Number(formData.minAge) : undefined,
    maxAge: formData.maxAge ? Number(formData.maxAge) : undefined,
    tags: parseCommaList(formData.tags),
    included: parseCommaList(formData.included),
    excluded: parseCommaList(formData.excluded),
    amenities: parseCommaList(formData.amenities),
    itinerary: parseCommaList(formData.itinerary),
    images: parseCommaList(formData.images),
    packageType: formData.packageType,
    meetingPoint: formData.meetingPoint,
    guide: user?._id,
  });

  const handleSave = async () => {
    try {
      if (!formData.packageType) {
        setPackageTypeError("Package type is required.");
        return;
      }
      setPackageTypeError(null);

      if (editingId) {
        const payload = buildPayload();

        await api.updatePackage(editingId, payload);
      } else {
        const payload = {
          ...buildPayload(),
        };
        await api.createPackage(payload);
      }

      const response = await api.getPackages();
      const pkgs = Array.isArray(response.data)
        ? response.data
        : response.data.data || [];
      dispatch(fetchPackagesSuccess(pkgs));

      setFormData(emptyForm);
      setEditingId(null);
      setIsDialogOpen(false);
    } catch (err) {
      console.error("Failed to save package:", err);
    }
  };

  const handleEdit = (pkg: Package) => {
    setEditingId(pkg._id);
    setFormData({
      title: pkg.title || "",
      summary: pkg.summary || "",
      description: pkg.description || "",
      destination: pkg.destination || "",
      costFrom: pkg.costFrom?.toString() ?? "",
      currency: pkg.currency || "BDT",
      durationDays: pkg.durationDays?.toString() ?? "",
      capacity: pkg.capacity?.toString() ?? "",
      startDate: pkg.startDate ? pkg.startDate.slice(0, 10) : "",
      endDate: pkg.endDate ? pkg.endDate.slice(0, 10) : "",
      departureLocation: pkg.departureLocation || "",
      arrivalLocation: pkg.arrivalLocation || "",
      minAge: pkg.minAge?.toString() ?? "",
      maxAge: pkg.maxAge?.toString() ?? "",
      packageType: (pkg as any).packageType?.toString() || "",
      tags: Array.isArray(pkg.tags) ? pkg.tags.join(", ") : "",
      included: Array.isArray(pkg.included) ? pkg.included.join(", ") : "",
      excluded: Array.isArray(pkg.excluded) ? pkg.excluded.join(", ") : "",
      amenities: Array.isArray(pkg.amenities) ? pkg.amenities.join(", ") : "",
      itinerary: Array.isArray(pkg.itinerary) ? pkg.itinerary.join(", ") : "",
      images: Array.isArray((pkg as any).images)
        ? (pkg as any).images.join(", ")
        : "",
      meetingPoint: pkg.meetingPoint || "",
      guide: pkg.guide || user?._id,
      availableSeats: pkg.availableSeats || 0,
      isActive: true,
    });
    setIsDialogOpen(true);
  };

  const shownPackages =
    filterType === "all"
      ? packages
      : packages.filter(
          (pkg) => (pkg as any).packageType?.toString() === filterType,
        );

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Packages Management
          </h1>
          <p className="text-sm text-slate-500">
            Manage travel packages and details
          </p>
        </div>

        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) {
              setEditingId(null);
              setFormData(emptyForm);
            }
          }}
        >
          <DialogTrigger asChild>
            <Button className="gap-2 bg-blue-600 text-white shadow-sm hover:bg-blue-700">
              <Plus size={18} />
              Add Package
            </Button>
          </DialogTrigger>

          <DialogContent className="max-h-[80vh] overflow-y-auto border border-blue-100 bg-white">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold text-slate-900">
                {editingId ? "Edit Package" : "Create Package"}
                {` - By ${user?.name}`}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label className="text-slate-700">Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-slate-700">Summary</Label>
                <Input
                  value={formData.summary}
                  onChange={(e) =>
                    setFormData({ ...formData, summary: e.target.value })
                  }
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-slate-700">Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-slate-700">Destination</Label>
                <Input
                  value={formData.destination}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      destination: e.target.value,
                    })
                  }
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-slate-700">Meeting Point</Label>
                <Input
                  value={formData.meetingPoint}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      meetingPoint: e.target.value,
                    })
                  }
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-700">Cost From</Label>
                  <Input
                    type="number"
                    value={formData.costFrom}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        costFrom: e.target.value,
                      })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-slate-700">Currency</Label>
                  <Input
                    value={formData.currency}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        currency: e.target.value,
                      })
                    }
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-700">Duration (Days)</Label>
                  <Input
                    type="number"
                    value={formData.durationDays}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        durationDays: e.target.value,
                      })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-slate-700">Capacity</Label>
                  <Input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        capacity: e.target.value,
                      })
                    }
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-700">Start Date</Label>
                  <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        startDate: e.target.value,
                      })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-slate-700">End Date</Label>
                  <Input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        endDate: e.target.value,
                      })
                    }
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-700">Departure Location</Label>
                  <Input
                    value={formData.departureLocation}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        departureLocation: e.target.value,
                      })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-slate-700">Arrival Location</Label>
                  <Input
                    value={formData.arrivalLocation}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        arrivalLocation: e.target.value,
                      })
                    }
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-700">Min Age</Label>
                  <Input
                    type="number"
                    value={formData.minAge}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        minAge: e.target.value,
                      })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-slate-700">Max Age</Label>
                  <Input
                    type="number"
                    value={formData.maxAge}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        maxAge: e.target.value,
                      })
                    }
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label className="text-slate-700">Tags (comma separated)</Label>
                <Input
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tags: e.target.value,
                    })
                  }
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-slate-700">
                  Included (comma separated)
                </Label>
                <Input
                  value={formData.included}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      included: e.target.value,
                    })
                  }
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-slate-700">
                  Excluded (comma separated)
                </Label>
                <Input
                  value={formData.excluded}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      excluded: e.target.value,
                    })
                  }
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-slate-700">
                  Amenities (comma separated)
                </Label>
                <Input
                  value={formData.amenities}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      amenities: e.target.value,
                    })
                  }
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-slate-700">
                  Itinerary (comma separated)
                </Label>
                <Input
                  value={formData.itinerary}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      itinerary: e.target.value,
                    })
                  }
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-slate-700">Image URL</Label>
                <Input
                  value={formData.images}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      images: e.target.value,
                    })
                  }
                  placeholder="https://..."
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-slate-700">
                  Package Type <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.packageType}
                  onValueChange={(value) => {
                    setFormData({
                      ...formData,
                      packageType: value,
                    });
                    setPackageTypeError(null);
                  }}
                >
                  <SelectTrigger
                    className={`mt-1 ${
                      packageTypeError
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }`}
                  >
                    <SelectValue placeholder="Select package type" />
                  </SelectTrigger>
                  <SelectContent>
                    {packageTypes.map((t) => (
                      <SelectItem key={t._id} value={t._id}>
                        {t.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {packageTypeError && (
                  <p className="mt-1 text-xs text-red-600">
                    {packageTypeError}
                  </p>
                )}
              </div>

              <Button
                onClick={handleSave}
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
              >
                {editingId ? "Update" : "Create"} Package
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <Card className="border border-blue-100 bg-white/90 shadow-sm">
        <CardHeader className="flex items-center justify-between gap-4 border-b border-slate-100">
          <CardTitle className="text-lg font-semibold text-slate-900">
            All Packages
          </CardTitle>

          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500">Filter by type</span>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px] border-blue-100 focus-visible:ring-blue-500">
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                {packageTypes.map((t) => (
                  <SelectItem key={t._id} value={t._id}>
                    {t.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="animate-spin text-blue-500" size={32} />
            </div>
          ) : shownPackages.length === 0 ? (
            <p className="py-8 text-center text-slate-500">No packages found</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-sky-50/60">
                    <TableHead className="text-slate-600">Title</TableHead>
                    <TableHead className="text-slate-600">
                      Destination
                    </TableHead>
                    <TableHead className="text-slate-600">
                      Price (From)
                    </TableHead>
                    <TableHead className="text-slate-600">Duration</TableHead>
                    <TableHead className="text-right text-slate-600">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shownPackages.map((pkg) => (
                    <TableRow key={pkg._id} className="hover:bg-sky-50/70">
                      <TableCell className="font-medium text-slate-900">
                        {pkg.title}
                      </TableCell>
                      <TableCell className="text-slate-700">
                        {pkg.destination}
                      </TableCell>
                      <TableCell className="text-slate-700">
                        {pkg.costFrom} {pkg.currency}
                      </TableCell>
                      <TableCell className="text-slate-700">
                        {pkg.durationDays} days
                      </TableCell>
                      <TableCell className="space-x-2 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(pkg)}
                          className="gap-1 border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800"
                        >
                          <Edit2 size={14} />
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
