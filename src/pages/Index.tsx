import { Header } from "@/components/Header";
import { PostCard } from "@/components/PostCard";
import { AboutMe } from "@/components/AboutMe";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  return (
    <div className="min-h-screen flex flex-col dark:bg-background-dark dark:text-foreground-dark">
      <Header />
      <main className="flex-1 container py-12">
        <AboutMe />
        <section className="space-y-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
              Последние записи
            </h1>
            <Button asChild>
              <Link to="/posts/new">
                <Plus className="mr-2 h-4 w-4" />
                Новая запись
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
            {isLoading ? (
              <p>Загрузка...</p>
            ) : posts && posts.length > 0 ? (
              posts.map((post) => (
                <PostCard
                  key={post.id}
                  title={post.title}
                  excerpt={post.excerpt || post.content.substring(0, 150) + '...'}
                  date={new Date(post.created_at).toLocaleDateString('ru-RU')}
                  tags={post.tags || []}
                  imageUrl={post.cover_image}
                />
              ))
            ) : (
              <p className="text-muted-foreground">Пока нет записей</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;