import React from "react";

export type BranchProps = {
  className?: string;
  label?: string;
  children?: React.ReactNode;
};

export function Branch({ className, label, children }: BranchProps) {
  return (
    <div className={className}>
      {label ? (
        <div className="text-sm text-muted-foreground">{label}</div>
      ) : null}
      <div>{children}</div>
    </div>
  );
}

export default Branch;
