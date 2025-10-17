import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const AccountSummary = () => {

  const {motherAdmin,balance} = useContext(AuthContext)

  return (
    <div className="border border-gray-100 p-5  bg-white mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-2 mb-4">
        <div className="bg-black text-white text-xs font-bold px-2 py-1 rounded">WL</div>
        <h1 className="text-lg font-semibold">{motherAdmin.username}</h1>
      </div>

      {/* Balance Section */}
      <div className="border rounded-md overflow-hidden">
        <div className="bg-[#2d4858] text-white text-sm font-semibold p-2">
          Your Balances
        </div>
        <div className="bg-white text-black font-semibold p-3">
         {balance} PBU
        </div>
      </div>
    </div>
  );
};

export default AccountSummary;
