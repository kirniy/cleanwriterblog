import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <a href="/" className="mr-6 flex items-center space-x-2">
            <span className="text-xl font-bold">Анатолий Холоденко</span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-6">
            <a href="/archive" className="text-sm font-medium transition-colors hover:text-primary">
              Архив
            </a>
            <a href="/tags" className="text-sm font-medium transition-colors hover:text-primary">
              Теги
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};