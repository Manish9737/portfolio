import { useState, useEffect } from "react";
import { X, Plus, Trash2 } from "lucide-react";

const EditProfileModal = ({ user, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        fullName: "",
        username: "",
        email: "",
        phone: "",
        bio: "",
        designation: "",
        study: "",
        experience: "",
        skills: [],
        socialLinks: { linkedin: "", github: "", facebook: "", instagram: "", twitter: "" },
        addresses: [{ type: "home", line1: "", line2: "", city: "", state: "", postalCode: "", country: "" }],
        resume: null,
    });

    const [showAddressModal, setShowAddressModal] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData((prev) => ({
                ...prev,
                ...user,
                skills: user.skills || [],
                socialLinks: user.socialLinks || {},
                addresses: user.addresses || prev.addresses
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSocialChange = (name, value) => {
        setFormData((prev) => ({
            ...prev,
            socialLinks: { ...prev.socialLinks, [name]: value }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    const handleAddressChange = (index, field, value) => {
        const updated = [...formData.addresses];
        updated[index][field] = value;
        setFormData((prev) => ({ ...prev, addresses: updated }));
    };

    const addNewAddress = () => {
        setFormData((prev) => ({
            ...prev,
            addresses: [...prev.addresses, { type: "", line1: "", line2: "", city: "", state: "", postalCode: "", country: "" }]
        }));
    };

    const removeAddress = (index) => {
        setFormData((prev) => ({
            ...prev,
            addresses: prev.addresses.filter((_, i) => i !== index)
        }));
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 overflow-y-auto">
            <div className="bg-white text-gray-900 rounded-lg p-6 w-full max-w-6xl shadow-lg relative">
                {/* Close */}
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
                    <X size={24} />
                </button>

                <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Column 1 - Personal Info */}
                    <div className="space-y-4">
                        <div>
                            <label className="block mb-1 font-medium">Full Name</label>
                            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Username</label>
                            <input type="text" name="username" value={formData.username} onChange={handleChange} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Phone</label>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Bio</label>
                            <textarea name="bio" value={formData.bio} onChange={handleChange} className="w-full p-2 border rounded" />
                        </div>
                    </div>

                    {/* Column 2 - Professional Info */}
                    <div className="space-y-4">
                        <div>
                            <label className="block mb-1 font-medium">Designation</label>
                            <input type="text" name="designation" value={formData.designation} onChange={handleChange} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Study</label>
                            <input type="text" name="study" value={formData.study} onChange={handleChange} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Experience</label>
                            <input type="text" name="experience" value={formData.experience} onChange={handleChange} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Skills (comma separated)</label>
                            <input type="text" name="skills" value={formData.skills.join(", ")} onChange={(e) => setFormData((prev) => ({ ...prev, skills: e.target.value.split(",").map(s => s.trim()) }))} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Resume (PDF)</label>
                            <input type="file" accept=".pdf" onChange={(e) => setFormData((prev) => ({ ...prev, resume: e.target.files[0] }))} className="w-full" />
                        </div>
                    </div>

                    {/* Column 3 - Social Links */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Social Links</h3>
                        {Object.keys(formData.socialLinks).map((key) => (
                            <div key={key}>
                                <label className="block mb-1 capitalize">{key} URL</label>
                                <input type="text" value={formData.socialLinks[key]} onChange={(e) => handleSocialChange(key, e.target.value)} className="w-full p-2 border rounded" />
                            </div>
                        ))}
                    </div>

                    {/* Buttons */}
                    <div className="md:col-span-3 flex justify-end gap-3 mt-6">
                        <button type="button" onClick={onClose} className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded shadow">
                            Cancel
                        </button>
                        <button type="button" onClick={() => setShowAddressModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow flex items-center gap-1">
                            <Plus size={16} /> Edit Address
                        </button>
                        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>

            {/* Nested Address Modal */}
            {showAddressModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-60 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl relative text-black">
                        {/* Close Button */}
                        <button
                            onClick={() => setShowAddressModal(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                        >
                            <X size={24} />
                        </button>

                        {/* Header */}
                        <div className="p-6 border-b">
                            <h2 className="text-2xl font-bold">Manage Addresses</h2>
                            <p className="text-gray-500 text-sm">Add, edit, or remove your addresses here.</p>
                        </div>

                        {/* Body - Scrollable */}
                        <div className="max-h-[65vh] overflow-y-auto p-6 space-y-6">
                            {formData.addresses.map((addr, i) => (
                                <div
                                    key={i}
                                    className="relative bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm"
                                >
                                    {/* Remove button */}
                                    <button
                                        type="button"
                                        onClick={() => removeAddress(i)}
                                        className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                                    >
                                        <Trash2 size={18} />
                                    </button>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Type</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. Home, Office"
                                                value={addr.type}
                                                onChange={(e) => handleAddressChange(i, "type", e.target.value)}
                                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Line 1</label>
                                            <input
                                                type="text"
                                                placeholder="Street Address"
                                                value={addr.line1}
                                                onChange={(e) => handleAddressChange(i, "line1", e.target.value)}
                                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Line 2</label>
                                            <input
                                                type="text"
                                                placeholder="Apt, Suite, etc."
                                                value={addr.line2}
                                                onChange={(e) => handleAddressChange(i, "line2", e.target.value)}
                                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">City</label>
                                            <input
                                                type="text"
                                                placeholder="City"
                                                value={addr.city}
                                                onChange={(e) => handleAddressChange(i, "city", e.target.value)}
                                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">State</label>
                                            <input
                                                type="text"
                                                placeholder="State"
                                                value={addr.state}
                                                onChange={(e) => handleAddressChange(i, "state", e.target.value)}
                                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Postal Code</label>
                                            <input
                                                type="text"
                                                placeholder="ZIP / Postal Code"
                                                value={addr.postalCode}
                                                onChange={(e) => handleAddressChange(i, "postalCode", e.target.value)}
                                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Country</label>
                                            <input
                                                type="text"
                                                placeholder="Country"
                                                value={addr.country}
                                                onChange={(e) => handleAddressChange(i, "country", e.target.value)}
                                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t flex justify-between items-center">
                            <button
                                type="button"
                                onClick={addNewAddress}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-1"
                            >
                                <Plus size={16} /> Add Address
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowAddressModal(false)}
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default EditProfileModal;
