import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";


const AdminImageControl = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loginImage, setLoginImage] = useState(null);
  const [id, setId] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Fetch Login Image
  const fetchLoginImage = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/admin-login-image");
      if (data && data.loginImageUrl) {
        setLoginImage(data.loginImageUrl);
        setId(data._id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLoginImage();
  }, []);

  // File Change
  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  // Upload
  const handleUpload = async () => {
    if (!file) return toast.error("Please select an image");

    const formData = new FormData();
    formData.append("loginImage", file);

    try {
      await axios.post("http://localhost:5000/api/admin-login-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Login Image Uploaded!");
      fetchLoginImage();
      setIsModalOpen(false);
      setFile(null);
      setPreview(null);
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    }
  };

  // Delete
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/admin-login-image/${id}`);
      toast.error("Login Image Deleted!");
      setIsDeleteModalOpen(false);
      setLoginImage(null);
      setId(null);
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  return (
    <div className="bg-[#e4d9c8]">
     

      {/* Upload Section */}
      <div className="bg-black text-white p-2 lg:px-16 flex justify-between items-center">
        <h2 className="font-semibold">Upload Mother Admin Image</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#e3ac08] text-black px-3 py-1 rounded-sm text-sm hover:bg-yellow-700"
        >
          +Add
        </button>
      </div>

      {/* Uploaded Image Preview */}
      {loginImage ? (
        <div className="relative p-5 lg:px-16">
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="absolute top-2 right-2 lg:right-14 bg-red-600 text-white p-1 rounded-full"
          >
            <FaTimes />
          </button>

          <img
            src={loginImage}
            alt="Login"
            className="w-full max-h-40 object-contain border p-3"
          />
        </div>
      ) : (
        <p className="text-black p-5 border rounded">
          No login image, please upload one.
        </p>
      )}

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md shadow-lg w-[400px] relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded"
            >
              <FaTimes />
            </button>

            <div className="m-4 border-2 border-dashed rounded-md p-6 text-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1091/1091000.png"
                alt="upload icon"
                className="mx-auto w-12 mb-3"
              />

              <p className="text-gray-700">
                Select an image to upload <br />
                <span className="text-sm text-gray-500">
                  or drag and drop it here
                </span>
              </p>

              <div className="flex justify-center mt-4">
                <label className="bg-gray-300 text-black px-4 py-2 rounded cursor-pointer">
                  + Choose File
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                  />
                </label>
              </div>

              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mx-auto mt-4 w-32 h-32 object-cover border"
                />
              )}
            </div>

            <div className="flex justify-center mb-4">
              <button
                onClick={handleUpload}
                className="bg-gray-700 text-white px-5 py-2 rounded"
              >
                + Upload
              </button>
            </div>
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
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded"
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

export default AdminImageControl;
