// "use client";

// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { loadUserFromCookie } from "@/redux/slices/authSlice";
// import { usePathname, useRouter } from "next/navigation";
// import { useEffect } from "react";

// type Role = "ADMIN" | "GUIDE" | "TOURIST";

// interface RoleGuardOptions {
//   allowedRoles?: Role[];
//   redirectTo?: string;
// }

// export const useRoleGuard = (options?: RoleGuardOptions) => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const dispatch = useAppDispatch();

//   const { user, isAuthenticated, isLoading } = useAppSelector(
//     (state) => state.auth,
//   );

//   // Load user if not already loaded
//   useEffect(() => {
//     if (!isAuthenticated && !isLoading) {
//       dispatch(loadUserFromCookie());
//     }
//   }, [dispatch, isAuthenticated, isLoading]);

//   // Guard logic
//   useEffect(() => {
//     if (isLoading) return;

//     // Not logged in
//     if (!user && !isAuthenticated) {
//       router.replace(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
//       return;
//     }

//     // Role restriction
//     if (
//       options?.allowedRoles &&
//       user &&
//       !options.allowedRoles.includes(user.role as Role)
//     ) {
//       router.replace(options.redirectTo || "/");
//     }
//   }, [user, isAuthenticated, isLoading, options, router, pathname]);

//   return {
//     user,
//     role: user?.role as Role | undefined,
//     isAuthenticated,
//     isLoading,
//   };
// };

"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { loadUserFromCookie } from "@/redux/slices/authSlice";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

type Role = "ADMIN" | "GUIDE" | "TOURIST";

interface RoleGuardOptions {
  allowedRoles?: Role[];
  redirectTo?: string; // <-- optional redirect URL
}

export const useRoleGuard = (options?: RoleGuardOptions) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const { user, isAuthenticated, isLoading } = useAppSelector(
    (state) => state.auth,
  );

  // Load user from cookie if not already loaded
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      dispatch(loadUserFromCookie());
    }
  }, [dispatch, isAuthenticated, isLoading]);

  // Guard logic
  useEffect(() => {
    if (isLoading) return;

    // Not logged in
    if (!user && !isAuthenticated) {
      router.replace(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    // Role restriction
    if (
      options?.allowedRoles &&
      user &&
      !options.allowedRoles.includes(user.role as Role)
    ) {
      router.replace(options.redirectTo || "/"); // <-- default redirect to home
    }
  }, [user, isAuthenticated, isLoading, options, router, pathname]);

  return {
    user,
    role: user?.role as Role | undefined,
    isAuthenticated,
    isLoading,
  };
};
