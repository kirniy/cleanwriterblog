import { Header } from "@/components/Header";
import { PostCard } from "@/components/PostCard";

const Archive = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-12">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Архив записей</h1>
        <div className="grid gap-6">
          {/* Sample archived posts */}
          <PostCard
            title="Старая запись"
            excerpt="Пример архивной записи"
            date="1 января 2024"
            tags={["Архив"]}
          />
        </div>
      </main>
    </div>
  );
};

export default Archive;