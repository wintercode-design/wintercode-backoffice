import React from "react";

const statusMap: Record<string, string> = {
  loading: "Loading...",
  failed: "Failed to load data.",
};

export default function Loading({ status }: { status?: string }) {
  return (
    <div className="w-full flex justify-center items-center py-12 text-gray-400 text-lg">
      {statusMap[status || ""] || ""}
    </div>
  );
}
