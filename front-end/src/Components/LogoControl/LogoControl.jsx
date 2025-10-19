import React, { useContext, useState } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

const LogoControl = () => {
  const { fetchLogo, logo, id, setId } = useContext(AuthContext);
  const [preview, setPreview] = useState(null); // uploaded image show
  const [file, setFile] = useState(null);
  const [logos, setLogos] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedLogoId, setSelectedLogoId] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false); // modal toggle
  const [dragActive, setDragActive] = useState(false);

  // file select
  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  // drag & drop
  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setPreview(URL.createObjectURL(droppedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select an image");

    const formData = new FormData();
    formData.append("logo", file);

    try {
      await axios.post("http://localhost:5000/api/logo", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      fetchLogo();
      toast.success("Logo Upload Successfully!");
      setIsModalOpen(false); // modal close
    } catch (err) {
      console.error(err);
    }
  };

  const fetchDeleteLogo = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/logo"); // ধরে নিচ্ছি আপনার GET API আছে
      setLogos(res.data);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/logo/${selectedLogoId}`);
      fetchDeleteLogo(); // Refresh list
      setIsDeleteModalOpen(false);
      toast.error("Logo deleted successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-[#e4d9c8]">
      {/* Upload Section */}
      <div className="bg-black text-white p-2 lg:px-16 flex justify-between items-center ">
        <h2 className="font-semibold">Upload Logo</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#e3ac08] text-black px-3 py-1 rounded-sm text-sm hover:bg-yellow-700 hover:cursor-pointer"
        >
          +Add Logo
        </button>
      </div>

      {/* Uploaded Logo Preview */}

      {/* Uploaded Logo Preview */}
      {logo && logo.length > 0 ? (
        <div className="relative p-5 lg:px-16 ">
          {/* Delete Cross Button */}
          <button
            onClick={() => {
              setSelectedLogoId(id); // যেটা delete করবেন সেটার id set হবে
              setIsDeleteModalOpen(true); // modal ওপেন হবে
            }}
            className="absolute top-2 right-2 lg:right-14 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 hover:cursor-pointer"
          >
            <FaTimes />
          </button>

          <img
            src={logo}
            alt="Uploaded Logo"
            className="w-full max-h-40 object-contain border p-3"
          />
        </div>
      ) : (
        <p className="text-black p-5 border rounded">
          No logo selected, please upload the logo
        </p>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md shadow-lg w-[400px] relative">
            {/* Close Button */}
            <button
              onClick={() => {
                setIsModalOpen(false);
                setPreview(null); // or যেটা দরকার সেটা set করবেন
              }}
              className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded hover:cursor-pointer"
            >
              <FaTimes />
            </button>

            {/* Upload Box */}
            <div
              className={`m-4 border-2 border-dashed rounded-md p-6 text-center ${
                dragActive ? "border-blue-500" : "border-gray-300"
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
            >
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

              {/* Input centered */}
              <div className="flex justify-center mt-4">
                <label className="bg-gray-300 text-black px-4 py-2 rounded cursor-pointer hover:cursor-pointer">
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

            {/* Upload Button */}
            <div className="flex justify-center mb-4">
              <button
                onClick={handleUpload}
                className="bg-gray-700 text-white px-5 py-2 rounded hover:bg-gray-800 hover:cursor-pointer"
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

export default LogoControl;
