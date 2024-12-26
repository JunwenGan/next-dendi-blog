import { toString } from "mdast-util-to-string";
import { visit } from "unist-util-visit";

export function headingTree() {
  return (tree: any, file: any) => {
    const headings: any[] = [];
    visit(tree, "heading", (node: any) => {
      const text = toString(node);
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      node.data = {
        hProperties: {
          id,
        },
      };
      headings.push({ value: text, id, depth: node.depth });
    });
    file.data.headings = headings;
  };
}
