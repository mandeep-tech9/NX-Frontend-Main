import { useNavigate } from "react-router-dom";

export default function SalesDetails() {
  const navigate = useNavigate();

  const agent = {
    name: "Proposal Generator",
    description:
      "AI-powered proposal generation for client requirements and business documents.",
    version: "v2.1.0",
    status: "active",
    url: "https://nutanix-pso-app.azurewebsites.net",
  };

  return (
    <div className="max-w-5xl mx-auto mt-4 mb-20 px-5">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 text-sm font-bold bg-gray-100 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-200"
      >
        ← Back
      </button>

      {/* Title */}
      <h2 className="text-xl font-extrabold mb-5 text-gray-900">
        Sales • 1 agent
      </h2>

      {/* Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">

        {/* Top Section */}
        <div className="flex flex-wrap justify-between gap-4">

          {/* Left */}
          <div className="flex gap-4">
            {/* Icon */}
            <div className="w-16 h-16 rounded-xl bg-sky-500 flex items-center justify-center text-white font-bold text-lg shadow">
              AI
            </div>

            {/* Content */}
            <div>
              <h2 className="text-lg font-extrabold text-gray-900">
                {agent.name}
              </h2>

              <p className="text-sm text-gray-400 mt-1">Sales</p>

              <p className="text-sm text-gray-500 mt-3 leading-relaxed max-w-md">
                {agent.description}
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col items-end gap-3">

            <div className="flex gap-2 flex-wrap">
              <span className="text-xs px-3 py-1 rounded-lg bg-gray-100 border">
                {agent.version}
              </span>

              {agent.status === "active" && (
                <span className="text-xs px-3 py-1 rounded-lg bg-green-100 text-green-600 border border-green-200 font-semibold">
                  LIVE
                </span>
              )}
            </div>

            <button
              onClick={() => window.open(agent.url, "_blank")}
              className="bg-sky-500 text-white px-4 py-2 rounded-lg font-bold shadow hover:bg-sky-600"
            >
              Open →
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t my-5"></div>

        {/* Bottom */}
        <div className="flex flex-wrap justify-between items-center gap-3">

          <div className="flex items-center gap-3 flex-wrap">
            <span className="w-2.5 h-2.5 bg-green-400 rounded-full"></span>
            <span className="text-sm font-semibold text-gray-600">Live</span>

            <span className="text-xs text-gray-400 ml-2 max-w-md">
              Supports creation of Nutanix PSO proposals, including concise overviews and detailed versions.
            </span>
          </div>

          <span className="text-xs text-gray-400">
            Last updated: 2 days ago
          </span>
        </div>
      </div>
    </div>
  );
}