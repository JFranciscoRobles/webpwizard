interface StepCardProps {
  number: number;
  title: string;
  description: string;
}

export function StepCard({ number, title, description }: StepCardProps) {
  return (
    <div className="flex flex-col items-center text-center space-y-3">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground font-bold text-lg shadow-lg shadow-primary/25">
        {number}
      </div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-[200px]">{description}</p>
    </div>
  );
}
