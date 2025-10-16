import React from "react";

const AccountStatement = () => {
  const data = [
    {
      datetime: "2025-09-22 02:56:39",
      depositUpline: "-",
      depositDownline: "50,000.00",
      withdrawUpline: "-",
      withdrawDownline: "-",
      balance: "0.00",
      remark: "Fund Transfer",
      fromto: "MPenjoy247 ➜ lotusad",
      ip: "91.73.145.39",
    },
    {
      datetime: "2025-09-22 02:40:43",
      depositUpline: "50,000.00",
      depositDownline: "-",
      withdrawUpline: "-",
      withdrawDownline: "-",
      balance: "50,000.00",
      remark: "johnny.shiva",
      fromto: "Upline ➜ MPenjoy247",
      ip: "--",
    },
    {
      datetime: "2025-09-20 07:28:23",
      depositUpline: "-",
      depositDownline: "50,000.00",
      withdrawUpline: "-",
      withdrawDownline: "-",
      balance: "0.00",
      remark: "Fund Transfer",
      fromto: "MPenjoy247 ➜ lotusad",
      ip: "2001:8f8:1f24:1aa9:5071:57ff:fe4fb3c5",
    },
  ];

  return (
    <div className="bg-white border rounded-md shadow p-4 m-4">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className="flex gap-2 px-2 py-1 border rounded-lg border-gray-400 items-center">
            <span className="bg-black text-white font-bold px-2 py-1 rounded text-sm">
            WL
          </span>
          <h2 className="font-semibold text-sm">MPenjoy247</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Last:</span>
            <select className="border rounded px-2 py-1 text-sm">
              <option>10 Txn</option>
              <option>25 Txn</option>
              <option>50 Txn</option>
            </select>
          </div>
        </div>
        <span className="text-gray-700 font-medium">Total Count: 33</span>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 mb-4">
        <button className="bg-yellow-100 cursor-pointer hover:bg-yellow-200 border border-gray-300 px-3 py-1 rounded text-sm">
          Just For Today
        </button>
        <button className="bg-yellow-100 cursor-pointer hover:bg-yellow-200 border border-gray-300 px-3 py-1 rounded text-sm">
          From Yesterday
        </button>
        <button className="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-4 py-1 rounded text-sm">
          Get P & L
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border text-sm text-left">
          <thead className="bg-gray-700 text-white border-b">
            <tr>
              <th className="p-2 border">Date/Time</th>
              <th className="p-2 border">Deposit by Upline</th>
              <th className="p-2 border">Deposit to Downline</th>
              <th className="p-2 border">Withdraw by Upline</th>
              <th className="p-2 border">Withdraw from Downline</th>
              <th className="p-2 border">Balance</th>
              <th className="p-2 border">Remark</th>
              <th className="p-2 border">From/To</th>
              <th className="p-2 border">IPAddress</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={i} className="border-b text-sm hover:bg-gray-50">
                <td className="p-2 border">{item.datetime}</td>
                <td className="p-2 border text-right">{item.depositUpline}</td>
                <td className="p-2 border text-right">{item.depositDownline}</td>
                <td className="p-2 border text-right">{item.withdrawUpline}</td>
                <td className="p-2 border text-right">
                  {item.withdrawDownline}
                </td>
                <td className="p-2 border text-right">{item.balance}</td>
                <td className="p-2 border">{item.remark}</td>
                <td className="p-2 border">{item.fromto}</td>
                <td className="p-2 border">{item.ip}</td>
              </tr>
            ))}
          </tbody>
          {/* Total Row */}
          <tfoot>
            <tr className="bg-[#FFEDD5] font-semibold">
              <td className="p-2 border">Total</td>
              <td className="p-2 border text-right">1,50,000.00</td>
              <td className="p-2 border text-right">2,00,100.00</td>
              <td className="p-2 border text-right">0.00</td>
              <td className="p-2 border text-right">100.00</td>
              <td className="p-2 border"></td>
              <td className="p-2 border"></td>
              <td className="p-2 border"></td>
              <td className="p-2 border"></td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-3">
        <button className="border px-3 py-1 rounded hover:bg-gray-100">
          Prev
        </button>
        <button className="border px-3 py-1 rounded bg-blue-100">1</button>
        <button className="border px-3 py-1 rounded hover:bg-gray-100">2</button>
        <button className="border px-3 py-1 rounded hover:bg-gray-100">3</button>
        <button className="border px-3 py-1 rounded hover:bg-gray-100">
          Next
        </button>
      </div>
    </div>
  );
};

export default AccountStatement;
