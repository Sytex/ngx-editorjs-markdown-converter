import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.ts"],
  noExternal: [
    "@editorjs/checklist",
    "@editorjs/delimiter",
    "@editorjs/header",
    "@editorjs/list",
    "turndown",
  ],
});
