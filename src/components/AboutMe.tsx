import { motion } from "framer-motion";

export const AboutMe = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12 p-6 rounded-xl border bg-background"
    >
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <img
          src="/lovable-uploads/43e081cb-adc0-4aa0-a165-8c6c13be19fd.png"
          alt="Анатолий Холоденко"
          className="w-32 h-32 rounded-full object-cover"
        />
        <div className="text-left">
          <h2 className="text-2xl font-semibold mb-2">Анатолий Холоденко</h2>
          <p className="text-muted-foreground mb-4">
            Писатель и публицист. Автор рассказов и статей.
          </p>
          <p className="text-sm">
            Приветствую всех! Здесь я буду делиться своими мыслями, опытом и знаниями в области разработки программного обеспечения.
          </p>
        </div>
      </div>
    </motion.section>
  );
};