import { HomeIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import React from "react";

const Success = () => {
  return (
    <div className="flex flex-col items-center justify-center text-6xl font-bold text-green-950 h-screen">
      Successfully Placed your order!!!
      <Link href="/">
        <div className="flex items-center justify-center py-1 border border-gray-400 p-2 rounded-lg m-2">
          <HomeIcon className="w-5 h-5" />
          <h1 className="text-xl ml-1">Home</h1>
        </div>
      </Link>
    </div>
  );
};

export default Success;
