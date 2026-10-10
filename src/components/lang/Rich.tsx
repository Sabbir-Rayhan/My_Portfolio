import { Fragment } from "react";

/** Renders `**bold**` markers as <strong>. Keeps translated sentences in one piece (word order differs in Bangla). */
export default function Rich({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : <Fragment key={i}>{part}</Fragment>))}
    </>
  );
}
