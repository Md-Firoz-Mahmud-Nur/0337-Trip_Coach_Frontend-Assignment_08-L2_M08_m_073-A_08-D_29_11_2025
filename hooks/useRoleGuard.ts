"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { loadUserFromCookie } from "@/redux/slices/authSlice";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

type Role = "ADMIN" | "GUIDE" | "TOURIST";

const roleDashboard: Record<Role, string> = {
  ADMIN: "/admin/dashboard",
  GUIDE: "/guide/dashboard",
  TOURIST: "/tourist/dashboard",
};

export const useRoleGuard = (options?: { allowedRoles?: Role[] }) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const hasLoadedRef = useRef(false);

  const { user, isAuthenticated, isLoading } = useAppSelector((s) => s.auth);

  useEffect(() => {
    if (!hasLoadedRef.current) {
      hasLoadedRef.current = true;
      dispatch(loadUserFromCookie());
    }
  }, [dispatch]);

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated || !user) {
      router.replace(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    if (
      options?.allowedRoles &&
      !options.allowedRoles.includes(user.role as Role)
    ) {
      router.replace(roleDashboard[user.role as Role]);
    }
  }, [isLoading, isAuthenticated, user, options, router, pathname]);

  return {
    user,
    isAuthenticated,
    isLoading,
  };
};
