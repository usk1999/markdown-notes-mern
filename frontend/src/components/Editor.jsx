import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";

export default function Editor({ note, setNote, saveNote }) {
  // Keyboard shortcut: Ctrl+S or Cmd+S to save
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        saveNote();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [saveNote]);

  return (
    <div className="grid grid-cols-2 gap-8 h-full p-8 overflow-hidden bg-white">
      {/* Editor Panel */}
      <div className="flex flex-col min-h-0">
        <div className="mb-4">
          <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">
            Markdown Input
          </label>
          <p className="text-xs text-gray-500 mt-0.5">Write your content in markdown format</p>
        </div>
        <textarea
          className="flex-1 p-5 border-2 border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 font-mono text-sm resize-none transition-all placeholder-gray-400 min-h-0"
          placeholder="# Start typing...\n\nUse markdown to format your content."
          value={note.content}
          onChange={(e) => setNote({ ...note, content: e.target.value })}
          spellCheck="true"
        />
      </div>

      {/* Preview Panel */}
      <div className="flex flex-col min-h-0">
        <div className="mb-4">
          <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">
            Live Preview
          </label>
          <p className="text-xs text-gray-500 mt-0.5">See how your note will look</p>
        </div>
        <div className="flex-1 p-5 border-2 border-gray-200 rounded-xl overflow-y-auto bg-gradient-to-br from-white to-gray-50 min-h-0 prose prose-sm max-w-none">
          {note.content ? (
            <ReactMarkdown
              components={{
                h1: ({ ...props }) => (
                  <h1 className="text-4xl font-bold text-gray-900 mt-6 mb-4 leading-tight" {...props} />
                ),
                h2: ({ ...props }) => (
                  <h2 className="text-3xl font-bold text-gray-800 mt-5 mb-3 leading-tight" {...props} />
                ),
                h3: ({ ...props }) => (
                  <h3 className="text-2xl font-bold text-gray-700 mt-4 mb-2 leading-tight" {...props} />
                ),
                h4: ({ ...props }) => (
                  <h4 className="text-xl font-semibold text-gray-700 mt-3 mb-2 leading-tight" {...props} />
                ),
                p: ({ ...props }) => (
                  <p className="text-gray-700 mb-4 leading-relaxed" {...props} />
                ),
                ul: ({ ...props }) => (
                  <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700" {...props} />
                ),
                ol: ({ ...props }) => (
                  <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700" {...props} />
                ),
                li: ({ ...props }) => (
                  <li className="text-gray-700" {...props} />
                ),
                code: ({ inline, ...props }) =>
                  inline ? (
                    <code className="bg-gray-800 text-green-400 px-2.5 py-1 rounded-md font-mono text-xs font-semibold" {...props} />
                  ) : (
                    <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto mb-4 font-mono text-sm">
                      <code {...props} />
                    </pre>
                  ),
                a: ({ ...props }) => (
                  <a className="text-blue-600 hover:text-blue-800 underline font-medium" target="_blank" rel="noopener noreferrer" {...props} />
                ),
                blockquote: ({ ...props }) => (
                  <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 mb-4 bg-blue-50 py-3 pr-3 rounded" {...props} />
                ),
                hr: () => (
                  <hr className="my-6 border-t-2 border-gray-300" />
                ),
                table: ({ ...props }) => (
                  <table className="border-collapse border border-gray-400 w-full mb-4" {...props} />
                ),
                th: ({ ...props }) => (
                  <th className="border border-gray-400 p-3 bg-gray-700 text-white text-left font-semibold" {...props} />
                ),
                td: ({ ...props }) => (
                  <td className="border border-gray-400 p-3 text-gray-700" {...props} />
                ),
              }}
            >
              {note.content}
            </ReactMarkdown>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 text-center">
              <div>
                <div className="text-4xl mb-2">✨</div>
                <p className="text-sm">Start typing to see preview...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
