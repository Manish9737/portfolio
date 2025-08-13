import { useEffect, useRef, useState } from "react";
import { deleteContact, getContactRequests, sendEmail } from "../api/apis";
import { Trash2, Mail } from "lucide-react";

const ContactRequests = () => {
  const modalRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      setIsLoading(true);
      try {
        const response = await getContactRequests();
        setContacts(response.data);
      } catch (error) {
        console.error("Failed to fetch contact requests:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const openSendEmailModal = (contact) => {
    setSelectedContact(contact);
    setSubject("");
    setMessage("");
    setShowModal(true);
  };

  const handleSendEmail = async () => {
    if (!subject.trim() || !message.trim()) {
      alert("Please enter subject and message.");
      return;
    }

    setEmailLoading(true);
    try {
      const data = {
        to: selectedContact.email,
        sub: subject,
        name: selectedContact.name,
        message: message,
      };
      await sendEmail(data);
      alert("Email sent successfully!");
      setShowModal(false);
    } catch (error) {
      console.log("Error in sending email:", error.message);
      alert("Failed to send email.");
    } finally {
      setEmailLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact request?")) return;
    try {
      await deleteContact(id);
      setContacts(contacts.filter((contact) => contact._id !== id));
    } catch (error) {
      console.error("Failed to delete contact request:", error);
    }
  };

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowModal(false)
    }
  };


  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Contact Requests</h1>

      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-8 h-8 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
          </div>
        ) : contacts.length === 0 ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-gray-400">No contact requests found.</p>
          </div>
        ) : (
          <table className="w-full border border-white/10 text-left">
            <thead className="bg-white/10">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Message</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c, index) => (
                <tr key={index} className="border-t border-white/10">
                  <td className="p-3">{c.name}</td>
                  <td className="p-3">{c.email}</td>
                  <td className="p-3">{c.message}</td>
                  <td className="p-3 flex justify-center gap-3">
                    <button
                      onClick={() => openSendEmailModal(c)}
                      className="text-blue-400 hover:text-blue-600 transition"
                    >
                      <Mail size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(c._id)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Email Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50" onClick={handleOverlayClick}>
          <div className="bg-white text-black rounded-lg shadow-lg w-full max-w-md p-6" ref={modalRef} onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">Send Email</h2>
            <p className="mb-4 text-sm text-gray-700">
              To: <span className="font-semibold">{selectedContact.email} * {selectedContact.name}</span>
            </p>


            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
              name="subject"
              className="w-full p-2 border border-gray-300 rounded mb-3 outline-none"
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message"
              name="message"
              rows="4"
              className="w-full p-2 border border-gray-300 rounded mb-4 outline-none"
            ></textarea>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                disabled={emailLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleSendEmail}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
                disabled={emailLoading}
              >
                {emailLoading && (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                )}
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactRequests;
