import React from "react";

export type ArtifactProps = {
  className?: string;
  children?: React.ReactNode;
  title?: string;
};

export function Artifact({ className, children, title }: ArtifactProps) {
  return (
    <div className={className} aria-label={title || "Artifact"}>
      {title ? <div className="font-medium mb-2">{title}</div> : null}
      {children}
    </div>
  );
}

export default Artifact;
