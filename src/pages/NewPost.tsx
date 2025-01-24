import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";

const NewPost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'min-h-[300px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
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
                <div className="flex items-center gap-2 mb-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                    className={editor?.isActive('bold') ? 'bg-secondary' : ''}
                  >
                    Жирный
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                    className={editor?.isActive('italic') ? 'bg-secondary' : ''}
                  >
                    Курсив
                  </Button>
                  <div className="flex-1" />
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="max-w-[200px]"
                  />
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