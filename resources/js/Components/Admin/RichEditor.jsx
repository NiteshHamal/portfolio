import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { useEffect, useCallback } from 'react';

function ToolBtn({ onClick, active, title, icon }) {
    return (
        <button type="button" onMouseDown={e => { e.preventDefault(); onClick(); }} title={title}
            className={`w-7 h-7 rounded flex items-center justify-center text-sm transition-colors duration-150
                ${active
                    ? 'bg-accent/25 text-accent'
                    : 'text-white/50 hover:bg-white/10 hover:text-white/80'
                }`}>
            <i className={`bi ${icon}`} />
        </button>
    );
}

export default function RichEditor({ value = '', onChange, placeholder = 'Write something…', minRows = 3 }) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({ openOnClick: false, autolink: true }),
            Placeholder.configure({ placeholder }),
        ],
        content: value,
        onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
        editorProps: {
            attributes: { class: 'rich-editor-content' },
        },
    });

    // Sync external value resets (e.g. tab reset via key prop — editor remounts, but just in case)
    useEffect(() => {
        if (!editor || editor.getHTML() === value) return;
        editor.commands.setContent(value || '', false);
    }, [value]);

    const addLink = useCallback(() => {
        if (!editor) return;
        const prev = editor.getAttributes('link').href ?? '';
        const url  = window.prompt('Enter URL', prev);
        if (url === null) return;
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
        } else {
            editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
        }
    }, [editor]);

    if (!editor) return null;

    const isLink = editor.isActive('link');

    return (
        <div className="rich-editor rounded-lg border border-white/10
                        hover:border-white/20 focus-within:border-accent
                        transition-colors duration-200 overflow-hidden">

            {/* Toolbar */}
            <div className="flex items-center gap-0.5 px-2 py-1.5
                            border-b border-white/[0.07] bg-white/[0.02]">
                <ToolBtn icon="bi-type-bold"   title="Bold"   active={editor.isActive('bold')}
                    onClick={() => editor.chain().focus().toggleBold().run()} />
                <ToolBtn icon="bi-type-italic" title="Italic" active={editor.isActive('italic')}
                    onClick={() => editor.chain().focus().toggleItalic().run()} />

                <div className="w-px h-4 bg-white/10 mx-1" />

                <ToolBtn icon="bi-link-45deg" title={isLink ? 'Edit link' : 'Add link'} active={isLink}
                    onClick={addLink} />
                {isLink && (
                    <ToolBtn icon="bi-link-break" title="Remove link" active={false}
                        onClick={() => editor.chain().focus().extendMarkRange('link').unsetLink().run()} />
                )}

                <div className="w-px h-4 bg-white/10 mx-1" />

                <ToolBtn icon="bi-arrow-counterclockwise" title="Undo"
                    active={false}
                    onClick={() => editor.chain().focus().undo().run()} />
                <ToolBtn icon="bi-arrow-clockwise" title="Redo"
                    active={false}
                    onClick={() => editor.chain().focus().redo().run()} />
            </div>

            {/* Editor body */}
            <EditorContent editor={editor} style={{ minHeight: `${minRows * 1.6}rem` }} />
        </div>
    );
}
