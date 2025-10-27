import React, { useState, useEffect } from "react";
import axios from "axios";

const menuOptions = ["Sports", "Live", "Table", "Slot", "Fishing", "Egame"];

export default function AddSubCategory() {
  const [submenus, setSubmenus] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    menuName: "",
    providerId: "",
    image: null,
  });
  const [menuName, setMenuName] = useState("");
  const [image, setImage] = useState(null);
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProviders();
    fetchSubmenus();
  }, []);

  const fetchSubmenus = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/games/get-submenus`
      );
      setSubmenus(response.data.submenus);
    } catch (error) {
      console.error("Error fetching submenus:", error);
    }
  };

  const fetchProviders = async () => {
    try {
      const response = await axios.get(
        "https://apigames.oracleapi.net/api/providers",
        {
          headers: {
            "x-api-key":
              "300cc0adfcfb041c25c4a8234e3c0e312a44c7570677d64bdb983412f045da67",
          },
        }
      );
      setProviders(response.data.data);
    } catch (error) {
      console.error("Error fetching providers:", error);
    }
  };

  const handleEdit = (submenu) => {
    setEditingId(submenu._id);
    setEditFormData({
      menuName: submenu.menuName,
      providerId: submenu.providerId,
      image: null,
    });
  };

  const handleUpdate = async (e, id) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("menuName", editFormData.menuName);
    formData.append("providerId", editFormData.providerId);
    if (editFormData.image) {
      formData.append("image", editFormData.image);
    }

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/games/update-submenu/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Submenu updated successfully!");
      setEditingId(null);
      fetchSubmenus();
    } catch (error) {
      console.error("Error updating submenu:", error);
      alert("Error updating submenu");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this submenu?")) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/games/delete-submenu/${id}`
        );
        alert("Submenu deleted successfully!");
        fetchSubmenus();
      } catch (error) {
        console.error("Error deleting submenu:", error);
        alert("Error deleting submenu");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("menuName", menuName);
    formData.append("providerId", selectedProvider);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/games/add-submenu`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Submenu added successfully!");
      fetchSubmenus(); // Refresh the list
      setMenuName("");
      setSelectedProvider("");
      setImage(null);
    } catch (error) {
      console.error("Error adding submenu:", error);
      alert("Error adding submenu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Add Category</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Menu Name:</label>
          <select
            value={menuName}
            onChange={(e) => setMenuName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Menu Name</option>
            {menuOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2">Upload Image:</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-2 border rounded"
            accept="image/*"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Select Provider:</label>
          <select
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Provider</option>
            {providers.map((provider) => (
              <option key={provider._id} value={provider._id}>
                {provider.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Sub Category"}
        </button>
      </form>

      {/* Submenu List */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Existing Sub Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {submenus.map((submenu) => (
            <div key={submenu._id} className="border rounded-lg p-4 shadow-sm">
              <img
                src={`${import.meta.env.VITE_API_URL}/uploads/${submenu.image}`}
                alt={submenu.menuName}
                className="w-full h-40 object-cover rounded mb-2"
              />
              <h4 className="font-bold">{submenu.menuName}</h4>
              <p className="text-gray-600 mb-2">
                Provider:{" "}
                {providers.find((p) => p._id === submenu.providerId)?.name ||
                  "Unknown"}
              </p>

              {editingId === submenu._id ? (
                <form
                  onSubmit={(e) => handleUpdate(e, submenu._id)}
                  className="space-y-2"
                >
                  <select
                    value={editFormData.menuName}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        menuName: e.target.value,
                      })
                    }
                    className="w-full p-1 border rounded"
                  >
                    {menuOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <select
                    value={editFormData.providerId}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        providerId: e.target.value,
                      })
                    }
                    className="w-full p-1 border rounded"
                  >
                    {providers.map((provider) => (
                      <option key={provider._id} value={provider._id}>
                        {provider.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="file"
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        image: e.target.files[0],
                      })
                    }
                    className="w-full p-1 border rounded"
                  />
                  <div className="flex space-x-2">
                    <button
                      type="submit"
                      className="bg-green-500 text-white px-2 py-1 rounded text-sm"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="bg-gray-500 text-white px-2 py-1 rounded text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={() => handleEdit(submenu)}
                    className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(submenu._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
