// components/admin/RichEditor.tsx
'use client'

import { useEditor, EditorContent, Extension } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TiptapLink from '@tiptap/extension-link'
import TiptapImage from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { useEffect, useCallback, useRef, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  Heading1, Heading2, Heading3,
  List, ListOrdered, Quote, Code, Minus,
  AlignLeft, AlignCenter, AlignRight,
  Link as LinkIcon, ImagePlus, Table as TableIcon,
  Undo, Redo, Loader2, X,
} from 'lucide-react'

const GOLD        = '#b8860b'
const GOLD_BG     = '#fdf8ee'
const GOLD_BORDER = '#e8d48a'
const BUCKET      = 'blog-images'
const FOLDER      = 'content'

async function uploadImageToSupabase(file: File): Promise<string> {
  const supabase = createClient()
  const ext  = file.name.split('.').pop() ?? 'jpg'
  const path = `${FOLDER}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { upsert: false, contentType: file.type })
  if (error) throw new Error(error.message)
  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl
}

function createImageUploadPlugin(onUpload: (file: File) => Promise<void>) {
  return new Plugin({
    key: new PluginKey('imageUpload'),
    props: {
      handleDrop(_, event) {
        const files = Array.from(event.dataTransfer?.files ?? []).filter(f => f.type.startsWith('image/'))
        if (!files.length) return false
        event.preventDefault()
        files.forEach(f => onUpload(f))
        return true
      },
      handlePaste(_, event) {
        const files = Array.from(event.clipboardData?.files ?? []).filter(f => f.type.startsWith('image/'))
        if (!files.length) return false
        event.preventDefault()
        files.forEach(f => onUpload(f))
        return true
      },
    },
  })
}

function TBtn({
  onClick, active, title, disabled, children,
}: {
  onClick: () => void; active?: boolean; title: string
  disabled?: boolean; children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      disabled={disabled}
      style={{
        padding: '0.3rem 0.45rem',
        borderRadius: '0.375rem',
        fontSize: '0.75rem',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        border: active ? `1px solid ${GOLD_BORDER}` : '1px solid transparent',
        background: active ? GOLD_BG : 'transparent',
        color: active ? GOLD : '#7a7264',
        transition: 'all 150ms',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </button>
  )
}

function Sep() {
  return <div style={{ width: 1, height: 18, background: '#e8e3d8', margin: '0 3px', flexShrink: 0 }} />
}

interface RichEditorProps {
  value: string
  onChange: (html: string) => void
}

export default function RichEditor({ value, onChange }: RichEditorProps) {
  const [uploading,    setUploading]    = useState(false)
  const [uploadError,  setUploadError]  = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const editorRef    = useRef<ReturnType<typeof useEditor>>(null)

  const insertImageFromFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) { setUploadError('Only image files are allowed.'); return }
    if (file.size > 5 * 1024 * 1024)    { setUploadError('Image must be under 5 MB.'); return }
    setUploading(true); setUploadError('')
    try {
      const url = await uploadImageToSupabase(file)
      editorRef.current?.chain().focus().setImage({ src: url }).run()
    } catch (e: unknown) {
      setUploadError(e instanceof Error ? e.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }, [])

  const imageUploadPlugin = useCallback(
    () => createImageUploadPlugin(insertImageFromFile),
    [insertImageFromFile]
  )

  const DropPasteExtension = Extension.create({
    name: 'imageDropPaste',
    addProseMirrorPlugins() { return [imageUploadPlugin()] },
  })

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        bulletList: { keepMarks: true },
        orderedList: { keepMarks: true },
      }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TiptapLink.configure({ openOnClick: false, autolink: true }),
      TiptapImage.configure({ inline: false, allowBase64: false }),
      Table.configure({ resizable: true }),
      TableRow, TableHeader, TableCell,
      Placeholder.configure({ placeholder: 'Start writing your post…' }),
      DropPasteExtension,
    ],
    content: value || '',
    editorProps: {
      attributes: { class: 'prose prose-neutral max-w-none focus:outline-none min-h-[500px] px-5 py-5 text-sm leading-relaxed' },
    },
    onUpdate({ editor }) { onChange(editor.getHTML()) },
  })

  useEffect(() => { (editorRef as any).current = editor }, [editor])

  // Sync external clear
  useEffect(() => {
    if (editor && value === '') editor.commands.clearContent()
  }, [value, editor])

  const setLink = useCallback(() => {
    if (!editor) return
    const prev = editor.getAttributes('link').href
    const url  = window.prompt('Enter URL:', prev || 'https://')
    if (url === null) return
    if (url === '') { editor.chain().focus().extendMarkRange('link').unsetLink().run(); return }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  const insertTable = useCallback(() => {
    editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
  }, [editor])

  const wordCount = editor
    ? editor.getText().trim().split(/\s+/).filter(Boolean).length
    : 0

  if (!editor) return null

  return (
    <div style={{ border: `1px solid ${GOLD_BORDER}`, borderRadius: '0.75rem', overflow: 'hidden', background: '#fff' }}>

      {/* Toolbar */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2,
        padding: '0.5rem 0.75rem',
        borderBottom: '1px solid #e8e3d8',
        background: '#fafaf9',
      }}>
        <TBtn onClick={() => editor.chain().focus().undo().run()} title="Undo"><Undo size={14} /></TBtn>
        <TBtn onClick={() => editor.chain().focus().redo().run()} title="Redo"><Redo size={14} /></TBtn>
        <Sep />

        <TBtn onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })} title="H1"><Heading1 size={14} /></TBtn>
        <TBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="H2"><Heading2 size={14} /></TBtn>
        <TBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="H3"><Heading3 size={14} /></TBtn>
        <Sep />

        <TBtn onClick={() => editor.chain().focus().toggleBold().run()}      active={editor.isActive('bold')}      title="Bold"><Bold size={14} /></TBtn>
        <TBtn onClick={() => editor.chain().focus().toggleItalic().run()}    active={editor.isActive('italic')}    title="Italic"><Italic size={14} /></TBtn>
        <TBtn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Underline"><UnderlineIcon size={14} /></TBtn>
        <TBtn onClick={() => editor.chain().focus().toggleStrike().run()}    active={editor.isActive('strike')}    title="Strikethrough"><Strikethrough size={14} /></TBtn>
        <TBtn onClick={() => editor.chain().focus().toggleCode().run()}      active={editor.isActive('code')}      title="Inline Code"><Code size={14} /></TBtn>
        <Sep />

        <TBtn onClick={() => editor.chain().focus().setTextAlign('left').run()}   active={editor.isActive({ textAlign: 'left' })}   title="Align Left"><AlignLeft size={14} /></TBtn>
        <TBtn onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} title="Align Center"><AlignCenter size={14} /></TBtn>
        <TBtn onClick={() => editor.chain().focus().setTextAlign('right').run()}  active={editor.isActive({ textAlign: 'right' })}  title="Align Right"><AlignRight size={14} /></TBtn>
        <Sep />

        <TBtn onClick={() => editor.chain().focus().toggleBulletList().run()}  active={editor.isActive('bulletList')}  title="Bullet List"><List size={14} /></TBtn>
        <TBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Numbered List"><ListOrdered size={14} /></TBtn>
        <TBtn onClick={() => editor.chain().focus().toggleBlockquote().run()}  active={editor.isActive('blockquote')}  title="Blockquote"><Quote size={14} /></TBtn>
        <TBtn onClick={() => editor.chain().focus().toggleCodeBlock().run()}   active={editor.isActive('codeBlock')}   title="Code Block"><Code size={14} /></TBtn>
        <Sep />

        <TBtn onClick={setLink} active={editor.isActive('link')} title="Insert Link"><LinkIcon size={14} /></TBtn>
        <TBtn onClick={() => { setUploadError(''); fileInputRef.current?.click() }} title="Upload Image" disabled={uploading}>
          {uploading ? <Loader2 size={14} className="animate-spin" /> : <ImagePlus size={14} />}
        </TBtn>
        <TBtn onClick={insertTable} title="Insert Table"><TableIcon size={14} /></TBtn>
        <TBtn onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Horizontal Rule"><Minus size={14} /></TBtn>
      </div>

      {/* Upload error */}
      {uploadError && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '0.4rem 1rem', background: '#fef2f2',
          borderBottom: '1px solid #fca5a5',
          color: '#dc2626', fontSize: '0.75rem',
        }}>
          ⚠ {uploadError}
          <button onClick={() => setUploadError('')} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer' }}>
            <X size={12} />
          </button>
        </div>
      )}

      {/* Editor area */}
      <div style={{ position: 'relative' }}>
        <EditorContent editor={editor} />
        {uploading && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(255,255,255,0.85)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            <Loader2 size={22} className="animate-spin" style={{ color: GOLD }} />
            <p style={{ fontSize: '0.75rem', color: '#7a7264' }}>Uploading to Supabase…</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        padding: '0.4rem 1.25rem',
        borderTop: '1px solid #f0ece4',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{ fontSize: '0.65rem', color: '#b8b0a0' }}>
          Drop or paste an image to upload it
        </span>
        <span style={{ fontSize: '0.65rem', color: '#b8b0a0', fontVariantNumeric: 'tabular-nums' }}>
          {wordCount} words
        </span>
      </div>

      <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }}
        onChange={async e => {
          const file = e.target.files?.[0]
          if (file) await insertImageFromFile(file)
          e.target.value = ''
        }}
      />
    </div>
  )
}