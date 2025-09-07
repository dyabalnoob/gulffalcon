import { useScrollProgress } from "@/hooks/use-scroll-progress";

export default function ScrollProgress() {
  const scrollProgress = useScrollProgress();

  return (
    <div
      className="scroll-progress"
      style={{ transform: `scaleX(${scrollProgress})` }}
    />
  );
}
