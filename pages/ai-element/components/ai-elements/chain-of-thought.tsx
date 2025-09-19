import React from "react";

export type ChainOfThoughtProps = {
  className?: string;
  children?: React.ReactNode;
  collapsedText?: string;
};

export function ChainOfThought({
  className,
  children,
  collapsedText = "Show reasoning",
}: ChainOfThoughtProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className={className}>
      <button
        className="text-xs text-muted-foreground"
        onClick={() => setOpen(!open)}
      >
        {open ? "Hide reasoning" : collapsedText}
      </button>
      {open ? (
        <div className="mt-2 text-sm whitespace-pre-wrap">{children}</div>
      ) : null}
    </div>
  );
}

export default ChainOfThought;
