'use client';

import * as React from 'react';

import { EditorContent, useEditor, type Editor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { Image } from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableCell } from '@tiptap/extension-table-cell';

import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';

interface RichTextEditorProps {
  /** Initial HTML content. */
  value: string;
  /** Called with the editor's HTML on every change. */
  onChange: (html: string) => void;
  placeholder?: string;
  className?: string;
}

/**
 * Reusable rich text editor (Tiptap) for long-form content — destination
 * descriptions, experiences, articles, accommodations, etc. Emits HTML so it
 * slots straight into the existing `{ html }` content storage. The toolbar is
 * full-featured: undo/redo, headings (H1–H3), bold/italic/underline/strike,
 * inline + block code, lists, blockquote, paragraph, links, images, tables,
 * and horizontal rules, plus a live word count.
 */
export function RichTextEditor({ value, onChange, placeholder, className }: RichTextEditorProps) {
  const editor = useEditor({
    // Avoid SSR hydration mismatches in the App Router.
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        link: { openOnClick: false, autolink: true }
      }),
      Image,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell
    ],
    content: value || '',
    editorProps: {
      attributes: {
        class: cn(
          'min-h-[200px] w-full px-3 py-2 text-sm outline-none',
          // Basic typographic styling since the typography plugin is not in use.
          '[&_h1]:mt-3 [&_h1]:text-2xl [&_h1]:font-semibold',
          '[&_h2]:mt-3 [&_h2]:text-xl [&_h2]:font-semibold',
          '[&_h3]:mt-3 [&_h3]:text-lg [&_h3]:font-semibold',
          '[&_p]:my-2 [&_a]:text-[#3c5142] [&_a]:underline',
          '[&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5',
          '[&_blockquote]:border-l-2 [&_blockquote]:border-[#E5E7EB] [&_blockquote]:pl-3 [&_blockquote]:text-muted-foreground',
          '[&_code]:rounded-[3px] [&_code]:bg-[#f3f4f6] [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em]',
          '[&_pre]:my-2 [&_pre]:rounded-[3px] [&_pre]:bg-[#f3f4f6] [&_pre]:p-3 [&_pre]:font-mono [&_pre]:text-xs',
          '[&_pre_code]:bg-transparent [&_pre_code]:p-0',
          '[&_hr]:my-4 [&_hr]:border-t [&_hr]:border-[#E5E7EB]',
          '[&_img]:my-2 [&_img]:max-w-full [&_img]:rounded-[3px]',
          '[&_table]:my-2 [&_table]:w-full [&_table]:border-collapse',
          '[&_th]:border [&_th]:border-[#E5E7EB] [&_th]:bg-[#f3f4f6] [&_th]:p-2 [&_th]:text-left [&_th]:font-semibold',
          '[&_td]:border [&_td]:border-[#E5E7EB] [&_td]:p-2'
        ),
        'data-placeholder': placeholder ?? ''
      }
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML())
  });

  // Sync external value changes (e.g. async-loaded edit data) without clobbering
  // the caret while the editor is being typed in.
  React.useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if (value !== current && !editor.isFocused) {
      editor.commands.setContent(value || '', { emitUpdate: false });
    }
  }, [editor, value]);

  if (!editor) {
    return <div className={cn('h-[244px] rounded-[3px] border border-input', className)} />;
  }

  return (
    <div
      className={cn(
        'rounded-[3px] border border-input bg-transparent focus-within:border-ring',
        className
      )}
    >
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  function setLink() {
    const previous = editor.getAttributes('link').href as string | undefined;
    const url = window.prompt('Link URL', previous ?? 'https://');
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }

  function addImage() {
    const url = window.prompt('Image URL', 'https://');
    if (url === null || url === '') return;
    editor.chain().focus().setImage({ src: url }).run();
  }

  function insertTable() {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  }

  return (
    <div className='flex flex-wrap items-center gap-0.5 border-b border-[#E5E7EB] p-1'>
      <ToolbarButton label='Undo' onClick={() => editor.chain().focus().undo().run()}>
        <Icons.undo className='size-4' />
      </ToolbarButton>
      <ToolbarButton label='Redo' onClick={() => editor.chain().focus().redo().run()}>
        <Icons.redo className='size-4' />
      </ToolbarButton>
      <Divider />
      <ToolbarButton
        label='Heading 1'
        active={editor.isActive('heading', { level: 1 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        <Icons.h1 className='size-4' />
      </ToolbarButton>
      <ToolbarButton
        label='Heading 2'
        active={editor.isActive('heading', { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Icons.h2 className='size-4' />
      </ToolbarButton>
      <ToolbarButton
        label='Heading 3'
        active={editor.isActive('heading', { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <Icons.h3 className='size-4' />
      </ToolbarButton>
      <Divider />
      <ToolbarButton
        label='Bold'
        active={editor.isActive('bold')}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Icons.bold className='size-4' />
      </ToolbarButton>
      <ToolbarButton
        label='Italic'
        active={editor.isActive('italic')}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Icons.italic className='size-4' />
      </ToolbarButton>
      <ToolbarButton
        label='Underline'
        active={editor.isActive('underline')}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <Icons.underline className='size-4' />
      </ToolbarButton>
      <ToolbarButton
        label='Strikethrough'
        active={editor.isActive('strike')}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <Icons.strikethrough className='size-4' />
      </ToolbarButton>
      <Divider />
      <ToolbarButton
        label='Inline code'
        active={editor.isActive('code')}
        onClick={() => editor.chain().focus().toggleCode().run()}
      >
        <Icons.code className='size-4' />
      </ToolbarButton>
      <ToolbarButton
        label='Code block'
        active={editor.isActive('codeBlock')}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      >
        <Icons.codeBlock className='size-4' />
      </ToolbarButton>
      <Divider />
      <ToolbarButton
        label='Bullet list'
        active={editor.isActive('bulletList')}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <Icons.listBullet className='size-4' />
      </ToolbarButton>
      <ToolbarButton
        label='Numbered list'
        active={editor.isActive('orderedList')}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <Icons.listNumber className='size-4' />
      </ToolbarButton>
      <ToolbarButton
        label='Quote'
        active={editor.isActive('blockquote')}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Icons.quote className='size-4' />
      </ToolbarButton>
      <ToolbarButton
        label='Paragraph'
        active={editor.isActive('paragraph')}
        onClick={() => editor.chain().focus().setParagraph().run()}
      >
        <Icons.paragraph className='size-4' />
      </ToolbarButton>
      <Divider />
      <ToolbarButton label='Link' active={editor.isActive('link')} onClick={setLink}>
        <Icons.link className='size-4' />
      </ToolbarButton>
      <ToolbarButton
        label='Unlink'
        onClick={() => editor.chain().focus().extendMarkRange('link').unsetLink().run()}
      >
        <Icons.unlink className='size-4' />
      </ToolbarButton>
      <ToolbarButton label='Image' onClick={addImage}>
        <Icons.image className='size-4' />
      </ToolbarButton>
      <ToolbarButton label='Table' onClick={insertTable}>
        <Icons.table className='size-4' />
      </ToolbarButton>
      <ToolbarButton
        label='Horizontal rule'
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <Icons.horizontalRule className='size-4' />
      </ToolbarButton>
      <div className='ml-auto pr-1.5 text-xs text-muted-foreground'>
        <WordCount editor={editor} />
      </div>
    </div>
  );
}

function WordCount({ editor }: { editor: Editor }) {
  const text = editor.getText();
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  return <span>{words === 1 ? '1 word' : `${words} words`}</span>;
}

function ToolbarButton({
  label,
  active,
  onClick,
  children
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type='button'
      onClick={onClick}
      title={label}
      aria-label={label}
      aria-pressed={active}
      className={cn(
        'flex size-8 items-center justify-center rounded-[3px] transition-colors',
        active ? 'bg-[#3c5142] text-white' : 'text-neutral-700 hover:bg-[#f3f4f6]'
      )}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <span className='mx-0.5 h-5 w-px bg-[#E5E7EB]' aria-hidden />;
}

/** Strips HTML tags to plain text — handy for SEO word counts and previews. */
export function htmlToText(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}
