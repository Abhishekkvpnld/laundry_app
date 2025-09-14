import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[100vh] bg-gray-100">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 border-solid"></div>
      <h2 className="mt-4 text-2xl font-semibold text-gray-700">
        Loading, please wait...
      </h2>
      <p className="mt-2 text-gray-500">
        Your data is being prepared. Hang tight!
      </p>
    </div>
  );
};

export default Loading;
