"use client";

import type { Package } from "@/lib/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

interface PackagesState {
  items: Package[];
  selectedPackage: Package | null;
  isLoading: boolean;
  error: string | null;
  meta: PaginationMeta | null;
}

const initialState: PackagesState = {
  items: [],
  selectedPackage: null,
  isLoading: false,
  error: null,
  meta: null,
};

const packagesSlice = createSlice({
  name: "packages",
  initialState,
  reducers: {
    fetchPackagesStart(state) {
      state.isLoading = true;
      state.error = null;
    },

    fetchPackagesSuccess(
      state,
      action: PayloadAction<{ data: Package[]; meta: PaginationMeta }>,
    ) {
      state.isLoading = false;
      state.items = action.payload.data;
      state.meta = action.payload.meta;
    },

    fetchPackagesError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    fetchPackageDetailStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchPackageDetailSuccess(state, action: PayloadAction<Package>) {
      state.isLoading = false;
      state.selectedPackage = action.payload;
    },
    fetchPackageDetailError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const {
  fetchPackagesStart,
  fetchPackagesSuccess,
  fetchPackagesError,
  fetchPackageDetailStart,
  fetchPackageDetailSuccess,
  fetchPackageDetailError,
  clearError,
} = packagesSlice.actions;

export default packagesSlice.reducer;
