import React, { useEffect, useState } from "react";
import Modal from "react-modal";

function EditProfileModal({ isOpen, onClose, userInfo, onSave }) {
  // console.log(userInfo,"edit uderInfo")
  console.log("editModal",userInfo)
  const [name, setName] = useState(userInfo.name || "");
  const [phone, setPhone] = useState(userInfo.phone || "");
  const [dob, setDob] = useState(userInfo.dob || "");
  const [bio, setBio] = useState(userInfo.bio || "");
  const [profileImage, setProfileImage] = useState(userInfo.profileImage || "");
  // console.log(userInfo,"edit uderInfo",dob,bio,phone,name)

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Set the preview image
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    if (!name.trim()) {
      alert("Name is required.");
      return false;
    }
   
    if (!phone.match(/^\d{10}$/)) {
      alert("Phone number must be 10 digits.");
      return false;
    }
    const today = new Date();
    const dobDate = new Date(dob);
    if (dobDate > today) {
      alert("Date of Birth cannot be a future date.");
      return false;
    }
    if (bio.length > 200) {
      alert("Bio cannot exceed 200 characters.");
      return false;
    }
    return true; // All validations passed
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({ name, phone, dob, bio, profileImage }); // Pass updated info back
      onClose(); // Close the modal after saving
    }
  };
 

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      className="fixed inset-0 flex items-center justify-center p-4"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-3">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center mb-4">
            <div className="w-24 h-24 rounded-lg bg-gray-200 overflow-hidden mr-4">
              <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">Upload Image:</label>
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
         
          <div className="flex">
            <div className="w-2/3">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone:</label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="ml-2 w-1/3">
  <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth:</label>
  <input
    id="dob"
    type="date"
    value={dob ? new Date(dob).toISOString().split('T')[0] : ""}
    onChange={(e) => setDob(e.target.value)}
    className="block w-full p-2 border border-gray-300 rounded-md"
    required
  />
</div>

          </div>
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio:</label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md"
              rows="2"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500">Save</button>
            <button type="button" onClick={onClose} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500">Cancel</button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default EditProfileModal;
