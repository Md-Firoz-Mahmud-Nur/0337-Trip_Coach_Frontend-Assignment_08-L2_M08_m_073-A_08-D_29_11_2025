/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { api } from "@/lib/api";
import { useAppSelector } from "@/redux/hooks";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function UserProfile() {
  const { user } = useAppSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
  });

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

  const handleSave = async () => {
    if (!user) return;

    try {
      setSaveError(null);
      setSaveSuccess(null);
      setSaveLoading(true);

      await api.updateUserProfile(user._id, {
        name: formData.name,
      });

      setIsEditing(false);
      setSaveSuccess("Profile updated successfully.");
    } catch (err: any) {
      console.error("updateUserProfile error:", err);
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to update profile.";
      setSaveError(msg);
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground">Manage your account information</p>
      </div>

      <div className="grid max-w-2xl gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                disabled={!isEditing}
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                disabled={!isEditing}
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="mt-1"
              />
            </div>
            {saveLoading && (
              <p className="text-xs text-slate-500">Saving changes...</p>
            )}
            {saveError && <p className="text-xs text-red-600">{saveError}</p>}
            {saveSuccess && (
              <p className="text-xs text-emerald-600">{saveSuccess}</p>
            )}
            <div className="flex gap-2">
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
              ) : (
                <>
                  <Button onClick={handleSave} disabled={saveLoading}>
                    {saveLoading ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Account info card */}
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">
                Member Since
              </span>
              <span className="font-medium">
                {user ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
              </span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">
                Account Status
              </span>
              <span className="font-medium text-green-600">Active</span>
            </div>
          </CardContent>
        </Card>

        {/* Security card with eye toggle */}
        <Card className="border border-red-200 bg-red-50/70">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700">
              Security
              <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase">
                Caution
              </span>
            </CardTitle>
            <CardDescription className="text-red-600">
              Update your password. Make sure you do not share it with anyone.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Current password */}
            <div>
              <Label htmlFor="currentPassword" className="text-red-800">
                Current password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="currentPassword"
                  type={showCurrent ? "text" : "password"}
                  className="border-red-200 bg-white/90 pr-10 focus-visible:ring-red-400"
                  value={passwordForm.currentPassword}
                  onChange={(e) =>
                    setPasswordForm((prev) => ({
                      ...prev,
                      currentPassword: e.target.value,
                    }))
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent((v) => !v)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-red-500 hover:text-red-700"
                >
                  {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* New password */}
            <div>
              <Label htmlFor="newPassword" className="text-red-800">
                New password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="newPassword"
                  type={showNew ? "text" : "password"}
                  className="border-red-200 bg-white/90 pr-10 focus-visible:ring-red-400"
                  value={passwordForm.newPassword}
                  onChange={(e) =>
                    setPasswordForm((prev) => ({
                      ...prev,
                      newPassword: e.target.value,
                    }))
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowNew((v) => !v)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-red-500 hover:text-red-700"
                >
                  {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm password */}
            <div>
              <Label htmlFor="confirmPassword" className="text-red-800">
                Confirm password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  className="border-red-200 bg-white/90 pr-10 focus-visible:ring-red-400"
                  value={passwordForm.confirmPassword}
                  onChange={(e) =>
                    setPasswordForm((prev) => ({
                      ...prev,
                      confirmPassword: e.target.value,
                    }))
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-red-500 hover:text-red-700"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {passwordError && (
              <p className="text-sm text-red-700">{passwordError}</p>
            )}
            {passwordSuccess && (
              <p className="text-sm text-green-700">{passwordSuccess}</p>
            )}

            <Button
              className="bg-red-600 text-white hover:bg-red-700"
              disabled={passwordLoading}
              onClick={async () => {
                setPasswordError(null);
                setPasswordSuccess(null);

                if (
                  !passwordForm.currentPassword ||
                  !passwordForm.newPassword
                ) {
                  setPasswordError("Please fill in all required fields.");
                  return;
                }
                if (passwordForm.newPassword !== passwordForm.confirmPassword) {
                  setPasswordError(
                    "New password and confirmation do not match.",
                  );
                  return;
                }

                try {
                  setPasswordLoading(true);
                  await api.resetPassword({
                    password: passwordForm.currentPassword,
                    updatePassword: passwordForm.newPassword,
                  });
                  setPasswordSuccess("Password updated successfully.");
                  setPasswordForm({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  });
                } catch (err: any) {
                  const msg =
                    err?.response?.data?.message ||
                    err?.message ||
                    "Failed to update password.";
                  setPasswordError(msg);
                } finally {
                  setPasswordLoading(false);
                }
              }}
            >
              {passwordLoading ? "Updating..." : "Update password"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
