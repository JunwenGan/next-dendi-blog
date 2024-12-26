"use client";

interface TOCProps {
  headings: { value: string; id: string; depth: number }[];
}

export const TableOfContents: React.FC<TOCProps> = ({ headings }) => {
  if (!headings?.length) return null;

  const renderNodes = (nodes: TOCProps["headings"], parentDepth: number = 2) => (
    <ul>
      {nodes
        .filter((node) => node.depth === parentDepth)
        .map((node) => (
          <li key={node.id}>
            <a href={`#${node.id}`}>{node.value}</a>
            {renderNodes(nodes, parentDepth + 1)}
          </li>
        ))}
    </ul>
  );

  return (
    <nav>
      <h3>Table of Contents</h3>
      {renderNodes(headings)}
    </nav>
  );
};
