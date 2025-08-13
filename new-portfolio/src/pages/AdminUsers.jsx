import { useEffect, useState } from "react";
import { getVisitCount } from "../api/apis";

const parseUserAgent = (ua) => {
  if (!ua) return { device: "Unknown", browser: "Unknown" };

  // Device detection
  let device = "Desktop";
  if (/mobile/i.test(ua)) device = "Mobile";
  if (/tablet|ipad/i.test(ua)) device = "Tablet";

  // OS detection
  if (/windows nt 10/i.test(ua)) device += " (Windows 10)";
  else if (/windows nt 6.3/i.test(ua)) device += " (Windows 8.1)";
  else if (/macintosh/i.test(ua)) device += " (MacOS)";
  else if (/android/i.test(ua)) device += " (Android)";
  else if (/iphone/i.test(ua)) device += " (iPhone)";

  // Browser detection
  let browser = "Unknown";
  if (/chrome/i.test(ua) && !/edg/i.test(ua)) browser = "Chrome";
  else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = "Safari";
  else if (/firefox/i.test(ua)) browser = "Firefox";
  else if (/edg/i.test(ua)) browser = "Edge";
  else if (/msie|trident/i.test(ua)) browser = "Internet Explorer";

  return { device, browser };
};

const AdminUsers = () => {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const res = await getVisitCount();
        setVisits(res.data || []);
      } catch (err) {
        console.error("Error fetching visits:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVisits();
  }, []);

  const totalVisits = visits.length;
  const uniqueIPs = new Set(visits.map((v) => v.ip)).size;

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-sky-500 to-sky-700 p-5 rounded-xl shadow-lg">
          <p className="text-sm opacity-80">Total Visits</p>
          <p className="text-3xl font-bold">{totalVisits}</p>
        </div>
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 p-5 rounded-xl shadow-lg">
          <p className="text-sm opacity-80">Unique Visitors</p>
          <p className="text-3xl font-bold">{uniqueIPs}</p>
        </div>
        <div className="bg-gradient-to-br from-pink-500 to-pink-700 p-5 rounded-xl shadow-lg">
          <p className="text-sm opacity-80">Latest Visit</p>
          <p className="text-lg font-semibold">
            {visits[0]?.date
              ? new Date(visits[0].date).toLocaleString()
              : "No Data"}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <p className="text-gray-400">Loading visits...</p>
        ) : visits.length === 0 ? (
          <p className="text-gray-400">No visits recorded.</p>
        ) : (
          <table className="w-full border border-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-slate-800">
              <tr>
                <th className="p-3 text-left">IP Address</th>
                <th className="p-3 text-left">Device</th>
                <th className="p-3 text-left">Browser</th>
                <th className="p-3 text-left">Referrer</th>
                <th className="p-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {visits.map((visit, idx) => {
                const { device, browser } = parseUserAgent(visit.userAgent);
                return (
                  <tr
                    key={idx}
                    className="border-t border-gray-700 hover:bg-white/5 transition"
                  >
                    <td className="p-3">{visit.ip || "N/A"}</td>
                    <td className="p-3">{device}</td>
                    <td className="p-3">{browser}</td>
                    <td className="p-3">{visit.referrer || "Direct"}</td>
                    <td className="p-3">
                      {visit.date
                        ? new Date(visit.date).toLocaleString()
                        : "N/A"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
