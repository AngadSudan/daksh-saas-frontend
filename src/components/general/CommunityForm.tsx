import React, { useState } from "react";
import { X, Save, Loader } from "lucide-react";

const CommunityEditForm = ({ communityData, onSubmit, onClose }) => {
  // Initial state from the provided community data
  const [formData, setFormData] = useState({
    name: communityData.name || "",
    description: communityData.description || "",
    websiteUrl: communityData.websiteUrl || "",
  });

  // Add loading state
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission with loading state
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="bg-[#1A0330] rounded-lg shadow-xl w-full max-w-md mx-4 p-6"
        style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#480179] tracking-tight">
            {communityData.id ? "Edit Community" : "Create Community"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isLoading}
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Community Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isLoading}
              className="w-full px-3 py-2 bg-[#480179] text-white 
                         border border-gray-700 rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-[#1A0330]
                         disabled:opacity-70 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              disabled={isLoading}
              rows={4}
              className="w-full px-3 py-2 bg-[#480179] text-white 
                         border border-gray-700 rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-[#1A0330]
                         disabled:opacity-70 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label
              htmlFor="websiteUrl"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Website URL
            </label>
            <input
              type="url"
              id="websiteUrl"
              name="websiteUrl"
              value={formData.websiteUrl}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full px-3 py-2 bg-[#480179] text-white 
                         border border-gray-700 rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-[#1A0330]
                         disabled:opacity-70 disabled:cursor-not-allowed"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 bg-gray-700 text-white rounded-md 
                         hover:bg-gray-600 transition-colors
                         disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-[#1A0330] text-white rounded-md 
                         hover:bg-opacity-90 transition-colors 
                         flex items-center gap-2
                         disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader size={18} className="animate-spin" />
                  {communityData.id ? "Saving..." : "Creating..."}
                </>
              ) : (
                <>
                  <Save size={18} />
                  {communityData.id ? "Save Changes" : "Create Community"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommunityEditForm;
