"use client";

import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

interface QuillEditorProps {
  value?: string;
  onChange?: (content: string) => void;
}

function QuillEditorComponent({ onChange, value }: QuillEditorProps) {
  const t = useTranslations("Profile");
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<any>(null);

  useEffect(() => {
    if (!editorRef.current || quillRef.current) return;

    const initQuill = async () => {
      const Quill = (await import("quill")).default;
      await import("quill/dist/quill.snow.css");

      if (!editorRef.current) return;

      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: t("quillPlaceholder"),
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ color: [] }, { background: [] }],
            ["link", "blockquote", "code-block"],
            ["clean"],
          ],
        },
      });

      if (value) {
        quillRef.current.root.innerHTML = value;
      }

      quillRef.current.on("text-change", () => {
        const html = quillRef.current?.root.innerHTML || "";
        onChange?.(html);
      });
    };

    initQuill();

    return () => {
      if (quillRef.current) {
        quillRef.current = null;
      }
    };
  }, []);

  return (
    <div className="quill-wrapper">
      <div ref={editorRef} style={{ height: "250px" }} />

      <style jsx global>{`
        .quill-wrapper {
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(168, 85, 247, 0.25);
          background: rgba(51, 65, 85, 0.2);
        }

        .ql-toolbar.ql-snow {
          background: rgba(51, 65, 85, 0.3);
          border: none;
          border-bottom: 1px solid rgba(168, 85, 247, 0.25);
          padding: 12px;
        }

        .ql-toolbar.ql-snow .ql-stroke {
          stroke: rgba(209, 213, 219, 0.8) !important;
        }

        .ql-toolbar.ql-snow .ql-fill {
          fill: rgba(209, 213, 219, 0.8) !important;
        }

        .ql-toolbar.ql-snow .ql-picker-label {
          color: rgba(209, 213, 219, 0.8) !important;
        }

        .ql-toolbar.ql-snow button:hover,
        .ql-toolbar.ql-snow button:focus,
        .ql-toolbar.ql-snow .ql-picker-label:hover,
        .ql-toolbar.ql-snow .ql-picker-item:hover {
          color: rgb(216, 180, 254) !important;
        }

        .ql-toolbar.ql-snow button:hover .ql-stroke,
        .ql-toolbar.ql-snow button:focus .ql-stroke {
          stroke: rgb(216, 180, 254) !important;
        }

        .ql-toolbar.ql-snow button:hover .ql-fill,
        .ql-toolbar.ql-snow button:focus .ql-fill {
          fill: rgb(216, 180, 254) !important;
        }

        .ql-toolbar.ql-snow button.ql-active,
        .ql-toolbar.ql-snow .ql-picker-label.ql-active {
          color: rgb(167, 139, 250) !important;
        }

        .ql-toolbar.ql-snow button.ql-active .ql-stroke {
          stroke: rgb(167, 139, 250) !important;
        }

        .ql-toolbar.ql-snow button.ql-active .ql-fill {
          fill: rgb(167, 139, 250) !important;
        }

        .ql-container.ql-snow {
          background: rgba(51, 65, 85, 0.2);
          border: none;
          font-family: inherit;
        }

        .ql-editor {
          color: rgb(229, 231, 235) !important;
          font-size: 15px;
          line-height: 1.6;
          padding: 16px;
        }

        .ql-editor.ql-blank::before {
          color: rgba(156, 163, 175, 0.6) !important;
          font-style: normal;
        }

        .ql-editor h1 {
          color: rgb(243, 244, 246);
          font-size: 2em;
          font-weight: 700;
          margin-bottom: 0.5em;
        }

        .ql-editor h2 {
          color: rgb(243, 244, 246);
          font-size: 1.5em;
          font-weight: 600;
          margin-bottom: 0.5em;
        }

        .ql-editor h3 {
          color: rgb(243, 244, 246);
          font-size: 1.25em;
          font-weight: 600;
          margin-bottom: 0.5em;
        }

        .ql-editor a {
          color: rgb(167, 139, 250);
          text-decoration: underline;
        }

        .ql-editor a:hover {
          color: rgb(196, 181, 253);
        }

        .ql-editor ul,
        .ql-editor ol {
          padding-left: 1.5em;
          color: rgb(229, 231, 235);
        }

        .ql-editor blockquote {
          border-left: 4px solid rgba(167, 139, 250, 0.5);
          padding-left: 16px;
          margin-left: 0;
          color: rgb(209, 213, 219);
          font-style: italic;
        }

        .ql-editor pre.ql-syntax {
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(168, 85, 247, 0.2);
          border-radius: 8px;
          color: rgb(209, 213, 219);
          padding: 12px;
          overflow-x: auto;
        }

        .ql-editor code {
          background: rgba(15, 23, 42, 0.4);
          border: 1px solid rgba(168, 85, 247, 0.2);
          border-radius: 4px;
          color: rgb(244, 114, 182);
          padding: 2px 6px;
        }

        .ql-snow .ql-picker-options {
          background: rgb(30, 41, 59);
          border: 1px solid rgba(168, 85, 247, 0.3);
          border-radius: 8px;
          padding: 4px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }

        .ql-snow .ql-picker-item {
          color: rgb(209, 213, 219);
        }

        .ql-snow .ql-picker-item:hover {
          background: rgba(167, 139, 250, 0.2);
          color: rgb(216, 180, 254);
        }

        .ql-snow .ql-picker-item.ql-selected {
          color: rgb(167, 139, 250);
        }

        .ql-snow .ql-color-picker .ql-picker-options {
          padding: 8px;
        }

        .ql-snow .ql-tooltip {
          background: rgb(30, 41, 59) !important;
          border: 1px solid rgba(168, 85, 247, 0.3) !important;
          border-radius: 8px !important;
          color: rgb(229, 231, 235) !important;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3) !important;
          padding: 8px 12px !important;
        }

        .ql-toolbar.ql-snow:first-child {
          display: none !important;
        }

        .ql-snow .ql-tooltip::before {
          color: rgb(209, 213, 219) !important;
        }

        .ql-snow .ql-tooltip input[type="text"] {
          background: rgba(51, 65, 85, 0.5) !important;
          border: 1px solid rgba(168, 85, 247, 0.3) !important;
          color: rgb(229, 231, 235) !important;
          border-radius: 6px !important;
          padding: 6px 10px !important;
        }

        .ql-snow .ql-tooltip input[type="text"]:focus {
          border-color: rgb(167, 139, 250) !important;
          outline: none !important;
        }

        .ql-snow .ql-tooltip a {
          color: rgb(167, 139, 250) !important;
        }

        .ql-snow .ql-tooltip a:hover {
          color: rgb(196, 181, 253) !important;
        }

        .ql-snow .ql-tooltip .ql-action::after,
        .ql-snow .ql-tooltip .ql-remove::before {
          color: rgb(167, 139, 250) !important;
        }

        .ql-editor ::selection {
          background: rgba(167, 139, 250, 0.3);
        }

        .ql-container.ql-disabled .ql-editor {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .ql-toolbar.ql-snow.ql-disabled {
          opacity: 0.6;
          pointer-events: none;
        }

        .ql-editor::-webkit-scrollbar {
          width: 8px;
        }

        .ql-editor::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
          border-radius: 4px;
        }

        .ql-editor::-webkit-scrollbar-thumb {
          background: rgba(168, 85, 247, 0.4);
          border-radius: 4px;
        }

        .ql-editor::-webkit-scrollbar-thumb:hover {
          background: rgba(168, 85, 247, 0.6);
        }

        + .quill-wrapper:focus-within {
          border-color: rgba(167, 139, 250, 0.5);
          box-shadow: 0 0 0 3px rgba(167, 139, 250, 0.1);
        }
      `}</style>
    </div>
  );
}

const QuillEditor = dynamic(() => Promise.resolve(QuillEditorComponent), {
  ssr: false,
  loading: () => (
    <div className="quill-wrapper" style={{ height: "250px" }}>
      <div className="flex items-center justify-center h-full text-gray-400">
        Loading editor...
      </div>
    </div>
  ),
});

export default QuillEditor;
