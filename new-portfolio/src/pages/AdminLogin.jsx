import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../api/apis";
import { Loader2, TerminalSquare } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [greeting, setGreeting] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning, Developer ☀️");
    else if (hour < 18) setGreeting("Good Afternoon, Developer 🌤️");
    else setGreeting("Good Evening, Developer 🌙");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const response = await loginAdmin({ email, password });
      if (response.status === 200) {
        localStorage.setItem("adminToken", response.data.token);
        localStorage.setItem("userId", response.data.user._id);
        navigate("/admin/dashboard");
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response?.status === 404) {
        alert("Invalid email or password. Please try again.");
      } else if (error.response?.status === 401) {
        alert("Unauthorized access. Please check your credentials.");
      } else if (error.response?.status === 500) {
        alert("An error occurred while logging in. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 overflow-hidden px-4">
      <div className="absolute inset-0">
        <div className="absolute w-full h-full opacity-10 bg-[linear-gradient(90deg,transparent_24%,rgba(255,255,255,.05)_25%,rgba(255,255,255,.05)_26%,transparent_27%,transparent_74%,rgba(255,255,255,.05)_75%,rgba(255,255,255,.05)_76%,transparent_77%,transparent),linear-gradient(transparent_24%,rgba(255,255,255,.05)_25%,rgba(255,255,255,.05)_26%,transparent_27%,transparent_74%,rgba(255,255,255,.05)_75%,rgba(255,255,255,.05)_76%,transparent_77%,transparent)] bg-[length:50px_50px] animate-[pulse_10s_infinite]" />
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-8 animate-fadeIn">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <TerminalSquare size={40} className="text-sky-400" />
        </div>

        {/* Greeting */}
        <h2 className="text-center text-lg font-medium text-gray-300 mb-2 animate-slideDown">
          {greeting}
        </h2>
        <h1 className="text-center text-2xl font-bold text-white mb-6">
          Admin Panel Access
        </h1>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-400 text-sm mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="w-full px-4 py-3 rounded-lg bg-gray-800/50 text-white placeholder-gray-500 border border-gray-700 focus:border-sky-500 focus:ring-2 focus:ring-sky-500 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg bg-gray-800/50 text-white placeholder-gray-500 border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500 outline-none transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-sky-600 to-pink-500 hover:from-sky-500 hover:to-pink-400 text-white font-semibold py-3 rounded-lg shadow-lg transform hover:scale-[1.02] transition-all disabled:opacity-50"
          >
            {loading && <Loader2 className="animate-spin" size={20} />}
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
