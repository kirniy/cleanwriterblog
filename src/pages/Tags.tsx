import { Header } from "@/components/Header";

const Tags = () => {
  const sampleTags = ["Литература", "Анализ", "Творчество", "Технологии"];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-12">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Теги</h1>
        <div className="flex flex-wrap gap-3">
          {sampleTags.map((tag) => (
            <a key={tag} href="#" className="tag">
              {tag}
            </a>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Tags;