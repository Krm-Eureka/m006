import React, { useState, useEffect } from "react";

const UserForm = ({ user, onSubmit, mode }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    status: "",
  });

  // Populate form with user data in edit mode
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "",
        status: user.status || "",
      });
    }
  }, [user]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Call the onSubmit prop with form data
  };

  return (
    <div className="form-container bg-gray-200 p-4 rounded-md w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">{mode === "edit" ? "Edit User" : "New User"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
            <option value="Manager">Manager</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          {mode === "edit" ? "Update User" : "Create User"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
