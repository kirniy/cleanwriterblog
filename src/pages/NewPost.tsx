import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";
import { 
  Bold, 
  Italic, 
  Link as LinkIcon, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  List, 
  ListOrdered,
  Image as ImageIcon,
  Heading1,
  Heading2
} from "lucide-react";

const NewPost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full mx-auto my-4',
        },
        allowBase64: true,
        draggable: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg dark:prose-invert focus:outline-none min-h-[300px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      },
    },
  });

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const { data, error } = await supabase.storage
          .from('blog-images')
          .upload(`${Date.now()}-${file.name}`, file);

        if (error) throw error;

        const { data: { publicUrl } } = supabase.storage
          .from('blog-images')
          .getPublicUrl(data.path);

        editor?.chain().focus().setImage({ src: publicUrl }).run();
        toast.success('Изображение успешно загружено');
      } catch (error) {
        console.error('Error uploading image:', error);
        toast.error('Ошибка при загрузке изображения');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editor?.getText()) {
      toast.error('Добавьте содержание поста');
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('posts').insert({
        title,
        content: editor.getHTML(),
        tags: tags.split(',').map(tag => tag.trim()),
        created_at: new Date().toISOString(),
      });

      if (error) throw error;

      toast.success('Пост успешно опубликован');
      navigate('/');
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Ошибка при создании поста');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addLink = () => {
    const url = window.prompt('URL:');
    if (url) {
      editor?.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tight mb-8">Новая запись</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Заголовок
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Введите заголовок"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Содержание
              </label>
              <div className="border rounded-md p-4">
                <div className="flex flex-wrap items-center gap-2 mb-4 border-b pb-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                    className={editor?.isActive('bold') ? 'bg-secondary' : ''}
                  >
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                    className={editor?.isActive('italic') ? 'bg-secondary' : ''}
                  >
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={editor?.isActive('heading', { level: 1 }) ? 'bg-secondary' : ''}
                  >
                    <Heading1 className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editor?.isActive('heading', { level: 2 }) ? 'bg-secondary' : ''}
                  >
                    <Heading2 className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addLink}
                    className={editor?.isActive('link') ? 'bg-secondary' : ''}
                  >
                    <LinkIcon className="h-4 w-4" />
                  </Button>
                  <div className="h-6 w-px bg-border mx-2" />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => editor?.chain().focus().setTextAlign('left').run()}
                    className={editor?.isActive({ textAlign: 'left' }) ? 'bg-secondary' : ''}
                  >
                    <AlignLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => editor?.chain().focus().setTextAlign('center').run()}
                    className={editor?.isActive({ textAlign: 'center' }) ? 'bg-secondary' : ''}
                  >
                    <AlignCenter className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => editor?.chain().focus().setTextAlign('right').run()}
                    className={editor?.isActive({ textAlign: 'right' }) ? 'bg-secondary' : ''}
                  >
                    <AlignRight className="h-4 w-4" />
                  </Button>
                  <div className="h-6 w-px bg-border mx-2" />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => editor?.chain().focus().toggleBulletList().run()}
                    className={editor?.isActive('bulletList') ? 'bg-secondary' : ''}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                    className={editor?.isActive('orderedList') ? 'bg-secondary' : ''}
                  >
                    <ListOrdered className="h-4 w-4" />
                  </Button>
                  <div className="flex-1" />
                  <div className="relative">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="relative"
                    >
                      <ImageIcon className="h-4 w-4" />
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </Button>
                  </div>
                </div>
                <EditorContent editor={editor} />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="tags" className="text-sm font-medium">
                Теги
              </label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Введите теги через запятую"
              />
            </div>
            <div className="flex justify-end gap-4">
              <Button 
                variant="outline" 
                onClick={() => navigate("/")}
                type="button"
              >
                Отмена
              </Button>
              <Button 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Публикация...' : 'Опубликовать'}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default NewPost;