import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { TfiReload } from "react-icons/tfi";
import { toast } from "react-toastify";

const CreatedAdminList = () => {
  const { creatorId } = useParams();
  const [createdAdmins, setCreatedAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCreatedAdmins = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admins/created/${creatorId}`
      );
      setCreatedAdmins(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching created admins:", error);
      toast.error("❌ Failed to fetch created admins");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCreatedAdmins();
  }, [creatorId]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          👥 Created Admins List
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md cursor-pointer"
          >
            ← Back
          </button>
          <button
            onClick={fetchCreatedAdmins}
            className="bg-yellow-50 border border-gray-200 px-4 py-2 rounded hover:bg-yellow-100 cursor-pointer"
          >
            <TfiReload size={18} />
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow border">
        {loading ? (
          <div className="text-center py-10 text-gray-600">Loading...</div>
        ) : createdAdmins.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No sub-admins created yet.
          </div>
        ) : (
          <table className="w-full border-collapse">
            <thead className="bg-[#1f3349] text-white">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Username</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Timezone</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Created At</th>
              </tr>
            </thead>
            <tbody>
              {createdAdmins.map((admin, i) => (
                <tr
                  key={admin._id}
                  className={`border-b ${
                    i % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="p-3">
                    {admin.firstName} {admin.lastName}
                  </td>
                  <td className="p-3">{admin.username}</td>
                  <td className="p-3">{admin.phone}</td>
                  <td className="p-3">{admin.timeZone}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        admin.status === "Activated"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {admin.status}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-gray-500">
                    {new Date(admin.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CreatedAdminList;
