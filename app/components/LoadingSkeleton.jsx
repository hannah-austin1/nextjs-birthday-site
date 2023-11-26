import React from "react";

export default function LoadingSkeleton() {
  return (
    <div className="flex flex-row bg-transparent  shadow-lg items-center gap-2 h-full w-full">
      <div className="flex flex-col m-0 items-center gap-3 w-full h-full">
        <>
          <span className="w-11/12 my-4 bg-gray-300 h-3/4 rounded-lg animate-pulse"></span>
          <span className="w-11/12 bg-gray-300 h-3 rounded-full animate-pulse"></span>
          <span className="w-9/12 bg-gray-300 h-3 rounded-full animate-pulse"></span>
          <span className="w-9/12 bg-gray-300 h-3 rounded-full animate-pulse"></span>
        </>
      </div>
    </div>
  );
}
