"use client";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Link as LinkIcon,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Highlighter,
  Palette,
  Quote,
  Code,
  Undo,
  Redo,
} from "lucide-react";
import { Button } from "./button";

interface TipTapEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const TipTapEditor: React.FC<TipTapEditorProps> = ({
  value,
  onChange,
  placeholder = "Start writing your content...",
  className = "",
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-cyan-400 underline",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Underline,
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  if (!editor) {
    return null;
  }

  const addLink = () => {
    const url = window.prompt("Enter URL");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const addImage = () => {
    const url = window.prompt("Enter image URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setColor = (color: string) => {
    editor.chain().focus().setColor(color).run();
  };

  const setHighlight = (color: string) => {
    editor.chain().focus().toggleHighlight({ color }).run();
  };

  const MenuBar = () => {
    return (
      <div className="border-b border-white/20 p-2 flex flex-wrap gap-1 bg-white/5 rounded-t-lg">
        {/* Text Formatting */}
        <div className="flex items-center gap-1 border-r border-white/20 pr-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`h-8 w-8 p-0 ${
              editor.isActive("bold")
                ? "bg-cyan-500/20 text-cyan-300"
                : "text-white/70 hover:text-white"
            }`}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`h-8 w-8 p-0 ${
              editor.isActive("italic")
                ? "bg-cyan-500/20 text-cyan-300"
                : "text-white/70 hover:text-white"
            }`}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`h-8 w-8 p-0 ${
              editor.isActive("underline")
                ? "bg-cyan-500/20 text-cyan-300"
                : "text-white/70 hover:text-white"
            }`}
          >
            <UnderlineIcon className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`h-8 w-8 p-0 ${
              editor.isActive("strike")
                ? "bg-cyan-500/20 text-cyan-300"
                : "text-white/70 hover:text-white"
            }`}
          >
            <Strikethrough className="h-4 w-4" />
          </Button>
        </div>

        {/* Headings */}
        <div className="flex items-center gap-1 border-r border-white/20 pr-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={`h-8 w-8 p-0 ${
              editor.isActive("heading", { level: 1 })
                ? "bg-cyan-500/20 text-cyan-300"
                : "text-white/70 hover:text-white"
            }`}
          >
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={`h-8 w-8 p-0 ${
              editor.isActive("heading", { level: 2 })
                ? "bg-cyan-500/20 text-cyan-300"
                : "text-white/70 hover:text-white"
            }`}
          >
            <Heading2 className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={`h-8 w-8 p-0 ${
              editor.isActive("heading", { level: 3 })
                ? "bg-cyan-500/20 text-cyan-300"
                : "text-white/70 hover:text-white"
            }`}
          >
            <Heading3 className="h-4 w-4" />
          </Button>
        </div>

        {/* Lists */}
        <div className="flex items-center gap-1 border-r border-white/20 pr-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`h-8 w-8 p-0 ${
              editor.isActive("bulletList")
                ? "bg-cyan-500/20 text-cyan-300"
                : "text-white/70 hover:text-white"
            }`}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`h-8 w-8 p-0 ${
              editor.isActive("orderedList")
                ? "bg-cyan-500/20 text-cyan-300"
                : "text-white/70 hover:text-white"
            }`}
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
        </div>

        {/* Alignment */}
        <div className="flex items-center gap-1 border-r border-white/20 pr-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={`h-8 w-8 p-0 ${
              editor.isActive({ textAlign: "left" })
                ? "bg-cyan-500/20 text-cyan-300"
                : "text-white/70 hover:text-white"
            }`}
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={`h-8 w-8 p-0 ${
              editor.isActive({ textAlign: "center" })
                ? "bg-cyan-500/20 text-cyan-300"
                : "text-white/70 hover:text-white"
            }`}
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={`h-8 w-8 p-0 ${
              editor.isActive({ textAlign: "right" })
                ? "bg-cyan-500/20 text-cyan-300"
                : "text-white/70 hover:text-white"
            }`}
          >
            <AlignRight className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            className={`h-8 w-8 p-0 ${
              editor.isActive({ textAlign: "justify" })
                ? "bg-cyan-500/20 text-cyan-300"
                : "text-white/70 hover:text-white"
            }`}
          >
            <AlignJustify className="h-4 w-4" />
          </Button>
        </div>

        {/* Special Elements */}
        <div className="flex items-center gap-1 border-r border-white/20 pr-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`h-8 w-8 p-0 ${
              editor.isActive("blockquote")
                ? "bg-cyan-500/20 text-cyan-300"
                : "text-white/70 hover:text-white"
            }`}
          >
            <Quote className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`h-8 w-8 p-0 ${
              editor.isActive("codeBlock")
                ? "bg-cyan-500/20 text-cyan-300"
                : "text-white/70 hover:text-white"
            }`}
          >
            <Code className="h-4 w-4" />
          </Button>
        </div>

        {/* Links and Images */}
        <div className="flex items-center gap-1 border-r border-white/20 pr-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={addLink}
            className="h-8 w-8 p-0 text-white/70 hover:text-white"
          >
            <LinkIcon className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={addImage}
            className="h-8 w-8 p-0 text-white/70 hover:text-white"
          >
            <ImageIcon className="h-4 w-4" />
          </Button>
        </div>

        {/* Colors */}
        <div className="flex items-center gap-1 border-r border-white/20 pr-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setColor("#ef4444")}
            className="h-8 w-6 p-0 bg-red-500 hover:bg-red-600"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setColor("#3b82f6")}
            className="h-8 w-6 p-0 bg-blue-500 hover:bg-blue-600"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setColor("#10b981")}
            className="h-8 w-6 p-0 bg-green-500 hover:bg-green-600"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setColor("#f59e0b")}
            className="h-8 w-6 p-0 bg-yellow-500 hover:bg-yellow-600"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setColor("#8b5cf6")}
            className="h-8 w-6 p-0 bg-purple-500 hover:bg-purple-600"
          />
        </div>

        {/* Highlight */}
        <div className="flex items-center gap-1 border-r border-white/20 pr-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setHighlight("#fef3c7")}
            className="h-8 w-8 p-0 text-white/70 hover:text-white"
          >
            <Highlighter className="h-4 w-4" />
          </Button>
        </div>

        {/* Undo/Redo */}
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="h-8 w-8 p-0 text-white/70 hover:text-white disabled:opacity-50"
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="h-8 w-8 p-0 text-white/70 hover:text-white disabled:opacity-50"
          >
            <Redo className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`border border-white/20 rounded-lg overflow-hidden ${className}`}
    >
      <MenuBar />
      <EditorContent
        editor={editor}
        className="prose prose-invert max-w-none p-4 min-h-[300px] bg-white/5 focus:outline-none"
        style={
          {
            "--tw-prose-body": "rgb(209 213 219)",
            "--tw-prose-headings": "rgb(255 255 255)",
            "--tw-prose-links": "rgb(34 211 238)",
            "--tw-prose-bold": "rgb(255 255 255)",
            "--tw-prose-counters": "rgb(156 163 175)",
            "--tw-prose-bullets": "rgb(156 163 175)",
            "--tw-prose-hr": "rgb(75 85 99)",
            "--tw-prose-quotes": "rgb(209 213 219)",
            "--tw-prose-quote-borders": "rgb(75 85 99)",
            "--tw-prose-captions": "rgb(156 163 175)",
            "--tw-prose-code": "rgb(255 255 255)",
            "--tw-prose-pre-code": "rgb(209 213 219)",
            "--tw-prose-pre-bg": "rgb(17 24 39)",
            "--tw-prose-th-borders": "rgb(75 85 99)",
            "--tw-prose-td-borders": "rgb(55 65 81)",
          } as React.CSSProperties
        }
      />
    </div>
  );
};

export default TipTapEditor;
