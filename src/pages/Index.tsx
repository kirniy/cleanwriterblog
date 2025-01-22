import { Header } from "@/components/Header";
import { PostCard } from "@/components/PostCard";
import { AboutMe } from "@/components/AboutMe";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const SAMPLE_POSTS = [
  {
    title: "Размышления о современной литературе",
    excerpt: "В этой статье я рассматриваю основные тенденции развития современной литературы и их влияние на общество.",
    date: "15 марта 2024",
    tags: ["Литература", "Анализ"],
    imageUrl: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-4.0.1"
  },
  {
    title: "Искусство письма в цифровую эпоху",
    excerpt: "Как меняется процесс написания текстов в век технологий и социальных сетей?",
    date: "10 марта 2024",
    tags: ["Творчество", "Технологии"],
  },
];

const Index = () => {
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
            {SAMPLE_POSTS.map((post, index) => (
              <PostCard key={index} {...post} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;