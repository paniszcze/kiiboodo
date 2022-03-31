import * as React from "react";

export const highlightMatch = (text: string, query: string): JSX.Element => {
  const dividedWord = text.split(new RegExp(`^(${query})`)).filter(Boolean);
  return (
    <>
      {dividedWord.map((division, i) => (
        <span key={i} style={division === query ? { color: "#00ff00" } : {}}>
          {division}
        </span>
      ))}
    </>
  );
};
