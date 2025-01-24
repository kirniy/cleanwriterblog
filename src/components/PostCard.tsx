import { motion } from "framer-motion";
import DOMPurify from "dompurify";

interface PostCardProps {
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  imageUrl?: string;
  content?: string;
}

export const PostCard = ({ title, excerpt, date, tags, imageUrl, content }: PostCardProps) => {
  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="post-card"
    >
      {imageUrl && (
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}
      <div className="space-y-4">
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag) => (
            <a key={tag} href={`/tags/${tag}`} className="tag">
              {tag}
            </a>
          ))}
        </div>
        <h2 className="text-2xl font-semibold tracking-tight">
          <a href="#" className="hover:underline">
            {title}
          </a>
        </h2>
        <div 
          className="prose prose-sm dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ 
            __html: DOMPurify.sanitize(content || excerpt) 
          }}
        />
        <time className="text-sm text-muted-foreground block">{date}</time>
      </div>
    </motion.article>
  );
};