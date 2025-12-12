/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/lib/api";
import { AlertCircle, CheckCircle, Loader2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface GuideProfile {
  city: string;
  languages: string[];
  experience: string;
  tourType: string;
  availability: string;
  bio: string;
  portfolio?: string;
  social?: string;
}

type PendingGuide = {
  _id: string;
  name: string;
  email: string;
  guideProfile: GuideProfile;
};

export default function AdminGuideApplications() {
  const [guides, setGuides] = useState<PendingGuide[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchPendingGuides = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await api.getPendingGuides();
      const data = res.data.data || res.data;
      setGuides(data);
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to fetch pending guides.";
      setError(msg);
      console.error("getPendingGuides error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingGuides();
  }, []);

  const handleApprove = async (userId: string) => {
    try {
      setActionLoadingId(userId);
      setError(null);
      await api.approveGuide(userId);
      setGuides((prev) => prev.filter((g) => g._id !== userId));
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to approve guide.";
      setError(msg);
      console.error("approveGuide error:", err);
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleReject = async (userId: string) => {
    try {
      setActionLoadingId(userId);
      setError(null);
      await api.rejectGuide(userId);
      setGuides((prev) => prev.filter((g) => g._id !== userId));
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to reject guide.";
      setError(msg);
      console.error("rejectGuide error:", err);
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Guide Applications</h1>
        <p className="text-muted-foreground">
          Review and approve or reject pending guide applications
        </p>
      </div>

      {error && (
        <div className="border-destructive/20 bg-destructive/10 text-destructive flex items-start gap-2 rounded-lg border p-4">
          <AlertCircle size={20} className="mt-0.5 shrink-0" />
          <div>
            <p className="font-medium">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Pending guides</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="animate-spin" size={32} />
            </div>
          ) : guides.length === 0 ? (
            <p className="text-muted-foreground py-8 text-center">
              No pending guide applications
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Languages</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Tour type</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {guides.map((g) => (
                    <TableRow key={g._id}>
                      <TableCell className="font-medium">{g.name}</TableCell>
                      <TableCell>{g.email}</TableCell>
                      <TableCell>{g.guideProfile.city}</TableCell>
                      <TableCell>
                        {g.guideProfile.languages?.length
                          ? g.guideProfile.languages.join(", ")
                          : "N/A"}
                      </TableCell>
                      <TableCell>{g.guideProfile.experience}</TableCell>
                      <TableCell>{g.guideProfile.tourType}</TableCell>
                      <TableCell className="space-x-2 text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1 text-green-600 hover:text-green-700"
                          disabled={actionLoadingId === g._id}
                          onClick={() => handleApprove(g._id)}
                        >
                          {actionLoadingId === g._id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <CheckCircle size={14} />
                          )}
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="gap-1"
                          disabled={actionLoadingId === g._id}
                          onClick={() => handleReject(g._id)}
                        >
                          {actionLoadingId === g._id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <XCircle size={14} />
                          )}
                          Reject
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
