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
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchUsersError,
  fetchUsersStart,
  fetchUsersSuccess,
  updateUserStatusSuccess,
  updateUserSuccess,
} from "@/redux/slices/usersSlice";
import { AlertCircle, Loader2, Lock, LockOpen } from "lucide-react";
import { useEffect, useState } from "react";

type UserStatus = "ACTIVE" | "INACTIVE" | "BLOCKED" | "DELETED";

export default function AdminUsers() {
  const dispatch = useAppDispatch();
  const { users, isLoading, error } = useAppSelector((state) => state.users);
  const [selectedUser, setSelectedUser] = useState<(typeof users)[0] | null>(
    null,
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newRole, setNewRole] = useState<"TOURIST" | "GUIDE" | "ADMIN">(
    "TOURIST",
  );

  useEffect(() => {
    const fetchUsers = async () => {
      dispatch(fetchUsersStart());
      try {
        const response = await api.getUsers();
        dispatch(fetchUsersSuccess(response.data.data || response.data));
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || err.message || "Failed to fetch users";
        dispatch(fetchUsersError(errorMessage));
        console.error("Error fetching users:", errorMessage);
      }
    };

    if (users.length === 0) {
      fetchUsers();
    }
  }, [dispatch, users.length]);

  const handleUpdateRole = async () => {
    if (!selectedUser) return;
    try {
      const response = await api.updateUserRole(selectedUser._id, newRole);
      const updatedUser = { ...selectedUser, role: newRole };
      dispatch(updateUserSuccess(updatedUser));
      setIsDialogOpen(false);
      console.log("User role updated:", selectedUser._id);
    } catch (err) {
      console.error("Failed to update user:", err);
    }
  };

  const handleUpdateStatus = async (userId: string, newStatus: UserStatus) => {
    try {
      const response = await api.updateUserStatus(userId, newStatus);
      const updatedUser = response.data.data || response.data;
      dispatch(updateUserStatusSuccess(updatedUser));
      console.log("User status updated:", userId, "->", newStatus);
    } catch (err) {
      console.error("Failed to update user status:", err);
    }
  };

  const handleUpdateVerify = async (userId: string, isVerified: boolean) => {
    try {
      const response = await api.updateUserVerify(userId, isVerified);
      const updatedUser = response.data.data || response.data;
      dispatch(updateUserStatusSuccess(updatedUser));
      console.log("User status updated:", userId, "->");
    } catch (err) {
      console.error("Failed to update user status:", err);
    }
  };

  const getStatusBadgeClass = (status: UserStatus) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800";
      case "INACTIVE":
        return "bg-gray-100 text-gray-800";
      case "BLOCKED":
        return "bg-red-100 text-red-800";
      case "DELETED":
        return "bg-slate-100 text-slate-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getVerifiedBadgeClass = (isVerified: boolean) => {
    switch (isVerified) {
      case true:
        return "bg-green-100 text-green-800";
      default:
        return "bg-red-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Users Management</h1>
        <p className="text-muted-foreground">
          Manage user roles, permissions, and account status
        </p>
      </div>

      {error && (
        <div className="bg-destructive/10 border-destructive/20 text-destructive flex items-start gap-2 rounded-lg border p-4">
          <AlertCircle size={20} className="mt-0.5 shrink-0" />
          <div>
            <p className="font-medium">Error loading users</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="animate-spin" size={32} />
            </div>
          ) : users.length === 0 ? (
            <p className="text-muted-foreground py-8 text-center">
              No users found
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Verify</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.filter((user) => user.role !== "ADMIN").map((user) => (
                    <TableRow key={user._id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <span
                          className={`rounded px-2 py-1 text-sm font-medium ${
                            user.role === "ADMIN"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {user.role}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`rounded px-2 py-1 text-sm font-medium ${getStatusBadgeClass(
                            user.status,
                          )}`}
                        >
                          {user.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`rounded px-2 py-1 text-sm font-medium ${getVerifiedBadgeClass(
                            user.isVerified,
                          )}`}
                        >
                          {user.isVerified ? "True" : "False"}
                        </span>
                      </TableCell>
                      <TableCell className="space-x-2 text-right">
                        {!user.isVerified ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleUpdateVerify(user._id, !user.isVerified)
                            }
                            className="gap-1 text-green-600 hover:text-green-700"
                          >
                            <LockOpen size={14} />
                            Verify
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleUpdateVerify(user._id, !user.isVerified)
                            }
                            className="gap-1 text-red-600 hover:text-red-700"
                          >
                            <LockOpen size={14} />
                            Disprove
                          </Button>
                        )}
                        {user.status === "BLOCKED" ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleUpdateStatus(user._id, "ACTIVE")
                            }
                            className="gap-1 text-green-600 hover:text-green-700"
                          >
                            <LockOpen size={14} />
                            Unblock
                          </Button>
                        ) : (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() =>
                              handleUpdateStatus(user._id, "BLOCKED")
                            }
                            className="gap-1"
                          >
                            <Lock size={14} />
                            Block
                          </Button>
                        )}
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
