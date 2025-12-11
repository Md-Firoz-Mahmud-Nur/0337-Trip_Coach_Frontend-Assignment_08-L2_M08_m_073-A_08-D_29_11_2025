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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api";
import { useAppDispatch } from "@/redux/hooks";
import { Edit2, Loader2, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

type PackageFormState = {
  name: string;
  description: string;
};

type PackageType = {
  _id: string;
  name: string;
  description: string;
};

const emptyForm: PackageFormState = {
  name: "",
  description: "",
};

export default function PackageTypeAdmin() {
  const dispatch = useAppDispatch();

  const [packageTypes, setPackageTypes] = useState<PackageType[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<PackageFormState>(emptyForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        setLoading(true);
        const [packageTypes] = await Promise.all([api.getPackageTypes()]);

        console.log({ packageTypes });

        const types = Array.isArray(packageTypes.data)
          ? packageTypes.data
          : packageTypes.data.data || [];
        setPackageTypes(types);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTypes();
  }, []);

  const handleSave = async () => {
    try {
      const payload = {
        name: formData.name,
        description: formData.description,
      };

      if (editingId) {
        await api.updatePackageType(editingId, payload);
      } else {
        await api.createPackageType(payload);
      }

      const res = await api.getPackageTypes();
      const types = Array.isArray(res.data) ? res.data : res.data.data || [];

      setPackageTypes(types);

      setFormData(emptyForm);
      setEditingId(null);
      setIsDialogOpen(false);
    } catch (err) {
      console.error("Failed to save package type:", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deletePackageType(id);

      const res = await api.getPackageTypes();
      const types = Array.isArray(res.data) ? res.data : res.data.data || [];

      setPackageTypes(types);
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };

  const handleEdit = (type: PackageType) => {
    setEditingId(type._id);
    setFormData({
      name: type.name,
      description: type.description || "",
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Package Types</h1>
          <p className="text-sm text-slate-500">Manage travel type</p>
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
              Add Type
            </Button>
          </DialogTrigger>

          <DialogContent className="max-h-[80vh] overflow-y-auto border border-blue-100 bg-white/95">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold text-slate-900">
                {editingId ? "Edit Package Type" : "Create Package Type"}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label className="text-slate-700">Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
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

      {/* {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )} */}

      {/* List Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Package Types</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-6">
              <Loader2 className="animate-spin" />
            </div>
          ) : packageTypes.length === 0 ? (
            <p className="py-6 text-center text-slate-500">
              No package types found.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {packageTypes.map((t) => (
                  <TableRow key={t._id}>
                    <TableCell>{t.name}</TableCell>
                    <TableCell>{t.description}</TableCell>
                    <TableCell className="space-x-2 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(t)}
                      >
                        <Edit2 size={14} /> Edit
                      </Button>

                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(t._id)}
                      >
                        <Trash2 size={14} /> Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
