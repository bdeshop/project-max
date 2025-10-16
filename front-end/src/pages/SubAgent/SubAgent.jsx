import { useState } from "react";
import {
  FaSearch,
  FaCog,
  FaUser,
  FaLock,
  FaExchangeAlt,
  FaClock,
} from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { LuArrowUpDown } from "react-icons/lu";
import { TfiReload } from "react-icons/tfi";

const SubAgent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const timeZones = [
    "Asia/Dhaka",
    "Asia/Kolkata",
    "America/New_York",
    "Europe/London",
    "Australia/Sydney",
  ];

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    timeZone: "Asia/Dhaka",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("✅ Form submitted successfully!");
  };

  const users = [
    {
      id: 1,
      name: "lotusad",
      role: "AD",
      credit: "3,96,509.00",
      balance: "15,775.16",
      exposure: "-495.45",
      availBal: "48,107.96",
      totalBal: "63,883.12",
      playerBal: "8,752.25",
      refPL: "-3,32,130.43",
      status: "Active",
    },
    {
      id: 2,
      name: "ADenjoy247",
      role: "AD",
      credit: "6.43",
      balance: "5.90",
      exposure: "-0.00",
      availBal: "0.00",
      totalBal: "5.90",
      playerBal: "5.90",
      refPL: "-0.53",
      status: "Active",
    },
  ];

  const menuItems = [
    { icon: <FaExchangeAlt />, label: "Betting Profit & Loss" },
    { icon: <FaClock />, label: "Betting History" },
    { icon: <FaUser />, label: "Profile" },
    { icon: <FaCog />, label: "Change Status" },
    { icon: <FaLock />, label: "Block Market" },
  ];

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Find more member"
            className="border border-gray-300 rounded px-2 py-1 w-64"
          />
          <FaSearch className="text-gray-600" />
          <select className="border border-gray-300 rounded px-2 py-1 text-sm">
            <option>ALL</option>
            <option>ACTIVE</option>
            <option>SUSPEND</option>
            <option>LOCKED</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <button
            className="bg-yellow-50 border border-gray-200 cursor-pointer hover:bg-yellow-100 text-black px-3 py-1 rounded flex items-center space-x-1"
            onClick={() => setIsModalOpen(true)}
          >
            <IoMdAdd />
            <span>Add Sub Agent</span>
          </button>
          <button className="py-2 px-4 rounded bg-yellow-50 border border-gray-200 cursor-pointer hover:bg-yellow-100">
            <TfiReload size={20} />
          </button>
        </div>
      </div>

      {/* Summary Section */}
      <div className="flex bg-[#f5f6f8] border-b mb-5 overflow-hidden">
        {/* Total Balance */}
        <div className="flex-1  px-4 py-3">
          <div className="border-r">
            <p className="text-gray-600 text-sm">Total Balance</p>
            <h2 className="font-extrabold text-lg text-black">
              PBU 3,96,500.00
            </h2>
          </div>
        </div>

        {/* Net Exposure */}
        <div className="flex-1 px-4 py-3">
          <div className="border-r">
            <p className="text-gray-600 text-sm">Net Exposure</p>
            <h2 className="font-extrabold text-lg text-red-600">
              PBU (610.17)
            </h2>
          </div>
        </div>

        {/* Balance */}
        <div className="flex-1  px-4 py-3">
          <div className="border-r">
            <p className="text-gray-600 text-sm">Balance</p>
            <h2 className="font-extrabold text-lg text-black">PBU 0.00</h2>
          </div>
        </div>

        {/* Balance in Downline */}
        <div className="flex-1  px-4 py-3">
          <div className="border-r">
            <p className="text-gray-600 text-sm">Balance in Downline</p>
            <h2 className="font-extrabold text-lg text-black">PBU 63,825.13</h2>
          </div>
        </div>

        {/* Transferable P/L with Upline */}
        <div className="flex-1 px-4 py-3">
          <p className="text-gray-600 text-sm">Transferable P/L with Upline</p>
          <h2 className="font-extrabold text-lg text-red-600">
            PBU (3,32,080.13)
          </h2>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-[#1f3349] text-white">
            <tr className="">
              <th className="p-2 text-left">Account</th>
              <th className="p-2 text-right">Credit Ref.</th>
              <th className="p-2 text-right  ">
                <span className="flex items-center justify-center">
                  Balance
                  <LuArrowUpDown />
                </span>
              </th>
              <th className="p-2 text-right  ">
                <span className="flex items-center justify-center">
                  Exposure
                  <LuArrowUpDown />
                </span>
              </th>
              <th className="p-2 text-right  ">
                <span className="flex items-center justify-center">
                  Avail. bal.
                  <LuArrowUpDown />
                </span>
              </th>
              <th className="p-2 text-right  ">
                <span className="flex items-center justify-center">
                  TotalBalance
                  <LuArrowUpDown />
                </span>
              </th>
              <th className="p-2 text-right  ">
                <span className="flex items-center justify-center">
                  Player Balance
                  <LuArrowUpDown />
                </span>
              </th>
              <th className="p-2 text-right  ">
                <span className="flex items-center justify-center">
                  Ref. P/L
                  <LuArrowUpDown />
                </span>
              </th>
              <th className="p-2 text-center ">
                <span className="flex items-center justify-center">
                  Status
                  <LuArrowUpDown />
                </span>
              </th>
              <th className="p-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr
                key={u.id}
                className={`border-b text-sm ${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="p-2 flex items-center space-x-1">
                  <span className="bg-pink-200 text-pink-800 text-xs px-2 py-1 rounded-[4px]">
                    {u.role}
                  </span>
                  <span className="text-blue-600 underline cursor-pointer hover:no-underline ">
                    {u.name}
                  </span>
                </td>
                <td className="p-2 text-right">{u.credit}</td>
                <td className="p-2 text-right">{u.balance}</td>
                <td className="p-2 text-right text-red-600">{u.exposure}</td>
                <td className="p-2 text-right">{u.availBal}</td>
                <td className="p-2 text-right">{u.totalBal}</td>
                <td className="p-2 text-right">{u.playerBal}</td>
                <td className="p-2 text-right text-red-600">{u.refPL}</td>
                <td className="p-2 text-center">
                  <span className="text-green-700 bg-green-100 px-2 py-0.5 rounded text-xs">
                    ● {u.status}
                  </span>
                </td>
                <td className="p-2 text-center">
                  <div className="flex justify-center space-x-2">
                    <button className="p-2 border rounded bg-yellow-50 hover:cursor-pointer">
                      <FaCog size={16} />
                    </button>
                    <button className="p-2 border rounded bg-yellow-50 hover:cursor-pointer">
                      <FaUser size={16} />
                    </button>
                    <button className="p-2 border rounded bg-yellow-50 hover:cursor-pointer">
                      <FaLock size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            <tr className="bg-[#FFEDD5] border-t">
              <td className="p-2">Total</td>
              <td className="p-2 text-right">3,96,515.43</td>
              <td className="p-2 text-right">15,781.06</td>
              <td className="p-2 text-right text-red-600">(495.45)</td>
              <td className="p-2 text-right">48,107.96</td>
              <td className="p-2 text-right">63,889.02</td>
              <td className="p-2 text-right">8,758.15</td>
              <td className="p-2 text-right text-red-600">(3,32,130.96)</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-center p-3 border-t border-b border-dashed text-sm mt-4">
          <button className="border border-gray-200 px-2 py-1 rounded hover:bg-[#DBEAFE] cursor-pointer">
            Prev
          </button>
          <span className="px-3  rounded text-black py-1 bg-[#DBEAFE]">1</span>
          <button className="border border-gray-200 px-2 py-1 rounded hover:bg-[#DBEAFE] cursor-pointer ">
            Next
          </button>
          <input
            type="number"
            value="1"
            className="border px-2 py-1 w-16 rounded ml-4 border-gray-200"
          />
          <button className="bg-red-500 text-white px-3 py-1 rounded ml-2">
            GO
          </button>
        </div>
        <div className="flex flex-wrap justify-end mr-8 items-center gap-3 py-2 bg-white border-t border-gray-300">
          {menuItems.map((item, index) => (
            <>
              <div
                key={index}
                className="flex items-center gap-2 bg-[#fff8e1] hover:bg-[#fef3c7] transition-colors border border-gray-200 px-3 py-2 rounded-md cursor-pointer"
              >
                <span className="text-black">{item.icon}</span>
              </div>

              <span className="text-sm text-gray-800 whitespace-nowrap">
                {item.label}
              </span>
            </>
          ))}
        </div>
      </div>
      {/* Add Admin Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 rounded-xl">
          <div className="bg-white shadow-lg w-1/2  rounded-2xl">
            <div className="bg-red-600 text-white p-2 flex justify-between items-center rounded-tl-xl rounded-tr-xl">
              <h3 className="text-lg font-bold">Add admin</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white cursor-pointer hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            <div className="bg-black text-white p-2 flex justify-end items-center">
              <h3 className="text-lg font-bold text-right">Step 1</h3>
            </div>
            <div className="p-4">
              <h4 className="text-lg font-bold mb-2">Personal Information</h4>

              <form
                className="max-w-4xl mx-auto bg-white p-8 rounded-lg"
                onSubmit={handleSubmit}
              >
                {/* Form Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-4 border-b border-gray-300 mb-36">
                  {/* Left Column */}
                  <div>
                    <div className="mb-4 flex justify-center items-center gap-4 text-nowrap">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Username
                      </label>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter username"
                        className="w-full  ml-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-red-200"
                        required
                      />{" "}
                      <span className="text-red-600">*</span>
                    </div>

                    <div className="mb-4 flex justify-center items-center gap-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        className="w-full ml-2 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-red-200"
                        required
                      />{" "}
                      <span className="text-red-600">*</span>
                    </div>

                    <div className="mb-4 flex justify-center items-center gap-4 text-nowrap">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter first name"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-red-200"
                        required
                      />{" "}
                      <span className="text-red-600">*</span>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div>
                    <div className="mb-4 flex justify-center items-center gap-4 text-nowrap">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter last name"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-red-200"
                        required
                      />{" "}
                      <span className="text-red-600">*</span>
                    </div>

                    <div className="mb-4 flex justify-center items-center gap-4 text-nowrap">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        className="w-full ml-[26px] border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-red-200"
                        required
                      />{" "}
                      <span className="text-red-600">*</span>
                    </div>

                    <div className="mb-4 mb-4 flex justify-center items-center gap-4 text-nowrap">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        TimeZone
                      </label>
                      <select
                        name="timeZone"
                        value={formData.timeZone}
                        onChange={handleChange}
                        className="w-full ml-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-red-200"
                        required
                      >
                        {timeZones.map((zone) => (
                          <option key={zone} value={zone}>
                            {zone}
                          </option>
                        ))}
                      </select>{" "}
                      <span className="text-red-600">*</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Divider */}
                <div className="border-b border-dashed mb-6"></div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-red-600 cursor-pointer text-white px-6 py-2 rounded hover:bg-red-700 transition"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubAgent;
