import React from "react";

export type CodeBlockProps = {
  className?: string;
  language?: string;
  code: string;
};

export function CodeBlock({ className, language, code }: CodeBlockProps) {
  return (
    <pre
      className={className}
      aria-label={language ? `${language} code` : "code"}
    >
      <code>{code}</code>
    </pre>
  );
}

export default CodeBlock;
