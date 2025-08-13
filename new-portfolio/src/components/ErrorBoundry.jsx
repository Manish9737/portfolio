import React from "react";
import { Ghost } from "lucide-react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white p-6">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-10 max-w-md w-full text-center shadow-xl">
            <div className="mb-4 flex justify-center">
              <Ghost size={60} className="text-white opacity-80" />
            </div>
            <h1 className="text-3xl font-bold text-red-400 mb-4">
              Something went wrong.
            </h1>
            <p className="text-white/80 text-sm mb-2">
              🐞 Oops! An error just crashed the vibe. Try refreshing the page.
            </p>

            <p className="text-sm text-red-300 italic">
              <strong>Error Code:</strong> {this.state.error?.message || "Unknown Error"}
            </p>

            <button
              onClick={() => window.location.reload()}
              className="mt-6 bg-red-500 hover:bg-red-600 px-5 py-2 rounded-md shadow text-white transition"
            >
              🔄 Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
