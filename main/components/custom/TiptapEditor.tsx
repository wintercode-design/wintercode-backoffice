"use client";

import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import TextAlign from "@tiptap/extension-text-align";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { createLowlight, common } from "lowlight";
import "highlight.js/styles/github.css";

const lowlight = createLowlight(common);

interface TiptapEditorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function TiptapEditor({
  value,
  onChange,
  error,
}: TiptapEditorProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5, 6] },
      }),
      Underline,
      Link.configure({ openOnClick: true }),
      Image,
      TaskList,
      TaskItem.configure({ nested: true }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!mounted || !editor) return null;

  const addLink = () => {
    const url = prompt("Enter URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const addImage = () => {
    const url = prompt("Enter Image URL:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 mb-3 border-b pb-2">
        {/* Text Formatting */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 rounded ${
            editor.isActive("bold") ? "bg-blue-500" : "bg-gray-400"
          }`}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 rounded ${
            editor.isActive("italic") ? "bg-blue-500" : "bg-gray-400"
          }`}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`px-3 py-1 rounded ${
            editor.isActive("underline") ? "bg-blue-500" : "bg-gray-400"
          }`}
        >
          Underline
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-3 py-1 rounded ${
            editor.isActive("strike") ? "bg-blue-500" : "bg-gray-400"
          }`}
        >
          Strike
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`px-3 py-1 rounded ${
            editor.isActive("code") ? "bg-blue-500" : "bg-gray-400"
          }`}
        >
          Code
        </button>

        {/* Headings */}
        {[1, 2, 3].map((level) => (
          <button
            key={level}
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 })
                .run()
            }
            className={`px-3 py-1 rounded ${
              editor.isActive("heading", { level })
                ? "bg-blue-500"
                : "bg-gray-400"
            }`}
          >
            H{level}
          </button>
        ))}

        {/* Lists */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1 rounded ${
            editor.isActive("bulletList") ? "bg-blue-500" : "bg-gray-400"
          }`}
        >
          • List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-3 py-1 rounded ${
            editor.isActive("orderedList") ? "bg-blue-500" : "bg-gray-400"
          }`}
        >
          1. List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          className={`px-3 py-1 rounded ${
            editor.isActive("taskList") ? "bg-blue-500" : "bg-gray-400"
          }`}
        >
          ✅ Task List
        </button>

        {/* Blockquote & Code */}
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`px-3 py-1 rounded ${
            editor.isActive("blockquote") ? "bg-blue-500" : "bg-gray-400"
          }`}
        >
          Quote
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`px-3 py-1 rounded ${
            editor.isActive("codeBlock") ? "bg-blue-500" : "bg-gray-400"
          }`}
        >
          Code Block
        </button>

        {/* Links & Images */}
        <button onClick={addLink} className="px-3 py-1 rounded bg-gray-400">
          Add Link
        </button>
        <button onClick={addImage} className="px-3 py-1 rounded bg-gray-400">
          Add Image
        </button>

        {/* Alignment */}
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`px-3 py-1 rounded ${
            editor.isActive({ textAlign: "left" })
              ? "bg-blue-500"
              : "bg-gray-400"
          }`}
        >
          Left
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`px-3 py-1 rounded ${
            editor.isActive({ textAlign: "center" })
              ? "bg-blue-500"
              : "bg-gray-400"
          }`}
        >
          Center
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`px-3 py-1 rounded ${
            editor.isActive({ textAlign: "right" })
              ? "bg-blue-500"
              : "bg-gray-400"
          }`}
        >
          Right
        </button>

        {/* Undo / Redo */}
        <button
          onClick={() => editor.chain().focus().undo().run()}
          className="px-3 py-1 rounded bg-gray-400"
        >
          Undo
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          className="px-3 py-1 rounded bg-gray-400"
        >
          Redo
        </button>

        {/* Clear Formatting */}
        <button
          onClick={() =>
            editor.chain().focus().unsetAllMarks().clearNodes().run()
          }
          className="px-3 py-1 rounded bg-red-400"
        >
          Clear
        </button>
      </div>

      {/* Editor */}
      <div
        className={`border rounded-lg p-3 min-h-[300px] max-h-[500px] overflow-y-auto ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        <EditorContent editor={editor} />
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
