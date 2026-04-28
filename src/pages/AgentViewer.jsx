import { useSearchParams, useNavigate } from "react-router-dom";
import { ExternalLink, ArrowLeft, RefreshCw, AlertTriangle } from "lucide-react";
import { useState } from "react";

export default function AgentViewer() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const url = params.get("url");
  const title = params.get("title") || "Agent";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  if (!url) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400 gap-3">
        <AlertTriangle size={28} className="text-amber-400" />
        <p className="text-sm">No agent URL provided.</p>
        <button
          onClick={() => navigate(-1)}
          className="text-xs text-blue-600 hover:underline"
        >
          ← Go back
        </button>
      </div>
    );
  }

  const handleReload = () => {
    setLoading(true);
    setError(false);
    setReloadKey((k) => k + 1);
  };

  return (
    <div
      className="flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
      style={{ height: "calc(100vh - 88px)" }}
    >
      {/* ── Topbar ── */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100 bg-white flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
            title="Back to Sales"
          >
            <ArrowLeft size={15} />
          </button>
          <div className="w-px h-4 bg-gray-200" />
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-teal-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-semibold">PG</span>
            </div>
            <span className="text-sm font-medium text-gray-800">{title}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Loading indicator */}
          {loading && (
            <span className="text-xs text-gray-400 flex items-center gap-1.5">
              <span className="w-3 h-3 border-2 border-gray-200 border-t-teal-500 rounded-full animate-spin inline-block" />
              Loading…
            </span>
          )}

          {/* Reload */}
          <button
            onClick={handleReload}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
            title="Reload"
          >
            <RefreshCw size={14} />
          </button>

          {/* Open in new tab fallback */}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 px-2.5 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            title="Open in new tab"
          >
            <ExternalLink size={13} />
            Open in tab
          </a>
        </div>
      </div>

      {/* ── iframe area ── */}
      <div className="relative flex-1 min-h-0">
        {/* Error state — shown when iframe fails to load */}
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gray-50 z-10">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center">
              <AlertTriangle size={22} className="text-amber-500" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-800 mb-1">
                This page can't be embedded
              </p>
              <p className="text-xs text-gray-400 max-w-xs leading-relaxed">
                The site has blocked embedding via{" "}
                <code className="bg-gray-100 px-1 rounded">X-Frame-Options</code>.
                Open it directly instead.
              </p>
            </div>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
            >
              <ExternalLink size={14} />
              Open in new tab
            </a>
          </div>
        )}

        <iframe
          key={reloadKey}
          src={url}
          title={title}
          className="w-full h-full border-0"
          onLoad={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
          allow="clipboard-write; clipboard-read"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
        />
      </div>
    </div>
  );
}