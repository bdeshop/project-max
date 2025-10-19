import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";


const NoticeControl = () => {
  const { id, setId } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Fetch settings
  const fetchSettings = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/settings");
      if (data) {
        setTitle(data.title || "");
        setFavicon(data.faviconUrl || null);
        if (data._id) setId(data._id);
      }
    } catch (err) {
      console.error("Error fetching settings:", err);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  

  // Upload
  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    if (e.target.favicon.files[0]) {
      formData.append("favicon", e.target.favicon.files[0]);
    }

    try {
      await axios.post("http://localhost:5000/api/settings", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Settings updated!");
      setIsModalOpen(false);
      fetchSettings();
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  // Delete Favicon
  const handleDeleteFavicon = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/settings/favicon/${id}`);
      toast.error("Favicon deleted!");
      fetchSettings();
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="bg-[#e4d9c8]">
     
      {/* Top bar */}
      <div className="bg-black text-white p-2 lg:px-16 flex justify-between items-center">
        <h2 className="font-semibold">Notice Control</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#e3ac08] text-black px-3 py-1 rounded-sm text-sm hover:bg-yellow-700"
        >
          + Edit
        </button>
      </div>

      {/* Preview */}
      <div className="p-5 lg:px-16">
        <h3 className="font-semibold mb-2">Notice Title:</h3>
        <p className="border p-2">{title || "No title set"}</p>

        
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md shadow-lg w-[400px] relative p-6">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded"
            >
              <FaTimes />
            </button>

            <form onSubmit={handleUpload}>
              <label className="block mb-2 font-semibold">Website Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border p-2 mb-4"
              />

              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-gray-700 text-white px-5 py-2 rounded hover:bg-gray-800"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Delete Modal */}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md shadow-lg w-[350px] p-6 relative">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Are you sure you want to delete?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDeleteFavicon}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 hover:cursor-pointer"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 hover:cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoticeControl;
