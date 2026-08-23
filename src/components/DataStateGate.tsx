import type { ReactNode } from "react";
import type { Slice } from "../lib/types";
import { useSliceData } from "../lib/DataContext";
import { RowSkeleton } from "./RowSkeleton";
import { DataErrorState } from "./DataErrorState";

interface ReadyData {
  slices: Slice[];
  by: Record<string, Slice>;
  asOf: string | null;
}

interface DataStateGateProps {
  // Render-prop, not plain children: deferring construction of the
  // data-dependent JSX until data actually exists avoids dereferencing
  // (e.g. the cheapest slice's name) while still loading or errored.
  children: (data: ReadyData) => ReactNode;
  skeletonRows?: number;
}

export function DataStateGate({ children, skeletonRows = 6 }: DataStateGateProps) {
  const { status, slices, by, asOf } = useSliceData();
  if (status === "loading") return <RowSkeleton count={skeletonRows} />;
  if (status === "error") return <DataErrorState />;
  return <>{children({ slices, by, asOf })}</>;
}
