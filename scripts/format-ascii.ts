import { glob } from "glob";
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

// ── Types ──────────────────────────────────────────────────────────────

interface BoxRegion {
  startLine: number;
  endLine: number;
}

interface FormatResult {
  formatted: string;
  changed: boolean;
  warnings: string[];
}

// ── Border detection helpers ───────────────────────────────────────────

const PLUS_DASH_BORDER = /^\s*\+[-=+]+\+\s*$/;
const UNICODE_TOP = /^\s*┌[─┬┐]+┐\s*$|^\s*╔[═╦╗]+╗\s*$/;
const UNICODE_BOTTOM = /^\s*└[─┴┘]+┘\s*$|^\s*╚[═╩╝]+╝\s*$/;
const UNICODE_MID = /^\s*├[─┼┤]+┤\s*$|^\s*╠[═╬╣]+╣\s*$/;
const PIPE_LINE = /^\s*\|.*\|\s*$/;
const UNICODE_PIPE_LINE = /^\s*│.*│\s*$|^\s*║.*║\s*$/;

function isHorizontalBorder(line: string): boolean {
  return (
    PLUS_DASH_BORDER.test(line) ||
    UNICODE_TOP.test(line) ||
    UNICODE_BOTTOM.test(line) ||
    UNICODE_MID.test(line)
  );
}

function isBoxLine(line: string): boolean {
  return (
    isHorizontalBorder(line) || PIPE_LINE.test(line) || UNICODE_PIPE_LINE.test(line)
  );
}

// ── Box region detection ───────────────────────────────────────────────

/**
 * Find contiguous regions of lines that form ASCII boxes.
 * A box must start and end with a horizontal border.
 */
export function findBoxRegions(lines: string[]): BoxRegion[] {
  const regions: BoxRegion[] = [];
  let i = 0;

  while (i < lines.length) {
    if (isHorizontalBorder(lines[i])) {
      const start = i;
      i++;
      // Consume lines that are part of a box
      while (i < lines.length && (isBoxLine(lines[i]) || isHorizontalBorder(lines[i]))) {
        if (isHorizontalBorder(lines[i])) {
          // Check if this could be the end of a box
          // A valid box needs at least: border, content/border, border
          const region = lines.slice(start, i + 1);
          const hasPipeLines = region.some(
            (l) => PIPE_LINE.test(l) || UNICODE_PIPE_LINE.test(l)
          );
          if (hasPipeLines || region.length >= 2) {
            // Continue scanning — there may be more rows
          }
        }
        i++;
      }
      // Walk back to the last horizontal border
      let end = i - 1;
      while (end > start && !isHorizontalBorder(lines[end])) {
        end--;
      }
      if (end > start) {
        regions.push({ startLine: start, endLine: end });
        i = end + 1;
      } else {
        i = start + 1;
      }
    } else {
      i++;
    }
  }

  return regions;
}

// ── Formatting logic ───────────────────────────────────────────────────

interface BorderStyle {
  corner: string; // e.g. "+"
  horizontal: string; // e.g. "-"
  vertical: string; // e.g. "|"
  topLeft?: string;
  topRight?: string;
  bottomLeft?: string;
  bottomRight?: string;
  midLeft?: string;
  midRight?: string;
  midCross?: string;
  midHorizontal?: string;
}

function detectBorderStyle(lines: string[]): BorderStyle | null {
  const firstBorder = lines[0];

  if (PLUS_DASH_BORDER.test(firstBorder)) {
    const h = firstBorder.includes("=") ? "=" : "-";
    return { corner: "+", horizontal: h, vertical: "|" };
  }

  if (/^\s*┌/.test(firstBorder)) {
    return {
      corner: "+",
      horizontal: "─",
      vertical: "│",
      topLeft: "┌",
      topRight: "┐",
      bottomLeft: "└",
      bottomRight: "┘",
      midLeft: "├",
      midRight: "┤",
      midCross: "┼",
      midHorizontal: "─",
    };
  }

  if (/^\s*╔/.test(firstBorder)) {
    return {
      corner: "+",
      horizontal: "═",
      vertical: "║",
      topLeft: "╔",
      topRight: "╗",
      bottomLeft: "╚",
      bottomRight: "╝",
      midLeft: "╠",
      midRight: "╣",
      midCross: "╬",
      midHorizontal: "═",
    };
  }

  return null;
}

function getLeadingWhitespace(line: string): string {
  const match = line.match(/^(\s*)/);
  return match ? match[1] : "";
}

/**
 * Count occurrences of a substring in a string.
 */
function countOccurrences(s: string, sub: string): number {
  let count = 0;
  let pos = 0;
  while ((pos = s.indexOf(sub, pos)) !== -1) {
    count++;
    pos += sub.length;
  }
  return count;
}

/**
 * Detect whether a box region contains nested boxes by checking if
 * content lines have inconsistent vertical-bar counts.
 * A flat table has the same number of `|` on every content line;
 * nested boxes do not.
 */
function hasNestedBoxes(lines: string[], vertical: string): boolean {
  const pipeCounts: number[] = [];
  for (const line of lines) {
    if (!isHorizontalBorder(line)) {
      pipeCounts.push(countOccurrences(line.trim(), vertical));
    }
  }
  if (pipeCounts.length === 0) return false;
  return pipeCounts.some((c) => c !== pipeCounts[0]);
}

/**
 * Extract content from a pipe-delimited line, returning the cells.
 * e.g. "| foo | bar |" → ["foo", "bar"]
 */
function extractCells(line: string, vertical: string): string[] {
  const trimmed = line.trim();
  // Remove leading/trailing border chars
  const inner = trimmed.slice(vertical.length, trimmed.length - vertical.length);
  // Split by the vertical char
  return inner.split(vertical).map((cell) => cell.trim());
}

/**
 * Format a single box region, returning the formatted lines.
 * Returns null if the box can't be safely parsed (e.g. nested boxes).
 */
export function formatBoxRegion(lines: string[]): string[] | null {
  const style = detectBorderStyle(lines);
  if (!style) return null;

  // Bail out on nested boxes — inconsistent pipe counts mean the
  // content itself contains box-drawing characters that would be mangled.
  if (hasNestedBoxes(lines, style.vertical)) {
    return null;
  }

  const indent = getLeadingWhitespace(lines[0]);

  // Separate horizontal borders from content lines
  // Identify column structure from the first content line
  const contentLines: { index: number; cells: string[] }[] = [];
  const borderIndices: number[] = [];

  for (let i = 0; i < lines.length; i++) {
    if (isHorizontalBorder(lines[i])) {
      borderIndices.push(i);
    } else {
      const cells = extractCells(lines[i], style.vertical);
      contentLines.push({ index: i, cells });
    }
  }

  if (contentLines.length === 0) {
    // All borders, no content — leave as-is
    return lines;
  }

  // Determine number of columns from the maximum cell count
  const numCols = Math.max(...contentLines.map((cl) => cl.cells.length));

  // Compute max width for each column
  const colWidths: number[] = new Array(numCols).fill(0);
  for (const cl of contentLines) {
    for (let c = 0; c < numCols; c++) {
      const cellText = cl.cells[c] ?? "";
      colWidths[c] = Math.max(colWidths[c], cellText.length);
    }
  }

  // Ensure minimum column width of 1
  for (let c = 0; c < numCols; c++) {
    colWidths[c] = Math.max(colWidths[c], 1);
  }

  // Build formatted lines
  const result: string[] = [];

  const v = style.vertical;
  const h = style.horizontal;

  function makeBorderLine(
    left: string,
    mid: string,
    right: string,
    hChar: string
  ): string {
    const segments = colWidths.map((w) => hChar.repeat(w + 2));
    return indent + left + segments.join(mid) + right;
  }

  function makeContentLine(cells: string[]): string {
    const paddedCells = colWidths.map((w, c) => {
      const text = cells[c] ?? "";
      return " " + text.padEnd(w) + " ";
    });
    return indent + v + paddedCells.join(v) + v;
  }

  for (let i = 0; i < lines.length; i++) {
    if (isHorizontalBorder(lines[i])) {
      // Determine which kind of border this is
      if (style.topLeft && style.bottomLeft && style.midLeft) {
        if (i === 0) {
          result.push(makeBorderLine(style.topLeft, style.midCross ? "┬" : "+", style.topRight!, h));
        } else if (i === lines.length - 1) {
          result.push(makeBorderLine(style.bottomLeft, style.midCross ? "┴" : "+", style.bottomRight!, h));
        } else {
          result.push(makeBorderLine(style.midLeft, style.midCross!, style.midRight!, h));
        }
      } else {
        result.push(makeBorderLine(style.corner, style.corner, style.corner, h));
      }
    } else {
      const cl = contentLines.find((c) => c.index === i);
      if (cl) {
        result.push(makeContentLine(cl.cells));
      } else {
        result.push(lines[i]);
      }
    }
  }

  return result;
}

// ── Fenced block extraction ────────────────────────────────────────────

const FENCE_REGEX = /^(?<indent>\s*)```(?<lang>text|ascii)\s*\n(?<body>[\s\S]*?)^\k<indent>```\s*$/gm;

/**
 * Format all ASCII blocks in a markdown string.
 */
export function formatAsciiBlocks(content: string): FormatResult {
  const warnings: string[] = [];
  let changed = false;

  const formatted = content.replace(FENCE_REGEX, (match, _indent, _lang, body) => {
    const originalLines = body.split("\n");
    // Remove trailing empty string from split
    if (originalLines.length > 0 && originalLines[originalLines.length - 1] === "") {
      originalLines.pop();
    }

    const regions = findBoxRegions(originalLines);

    if (regions.length === 0) {
      return match; // No boxes detected, leave unchanged
    }

    const newLines = [...originalLines];
    let offset = 0;

    for (const region of regions) {
      const start = region.startLine + offset;
      const end = region.endLine + offset;
      const boxLines = newLines.slice(start, end + 1);

      const formatted = formatBoxRegion(boxLines);
      if (formatted === null) {
        warnings.push(
          `Could not parse box at lines ${region.startLine + 1}-${region.endLine + 1}`
        );
        continue;
      }

      const lengthDiff = formatted.length - boxLines.length;
      newLines.splice(start, boxLines.length, ...formatted);
      offset += lengthDiff;
    }

    const newBody = newLines.join("\n") + "\n";
    if (newBody !== body) {
      changed = true;
    }

    return match.replace(body, newBody);
  });

  return { formatted, changed, warnings };
}

// ── CLI ────────────────────────────────────────────────────────────────

const DEFAULT_GLOBS = [
  "website/docs/**/*.md",
  "docs/**/*.md",
  "prompts/**/*.md",
  "community/**/*.md",
  "adr/**/*.md",
  "exercises/**/*.md",
];

async function main() {
  const args = process.argv.slice(2);
  const checkMode = args.includes("--check");
  const writeMode = args.includes("--write");

  if (!checkMode && !writeMode) {
    console.error("Usage: format-ascii.ts [--check | --write] [files...]");
    process.exit(1);
  }

  // Collect file paths
  const fileArgs = args.filter((a) => !a.startsWith("--"));
  let files: string[];

  if (fileArgs.length > 0) {
    files = fileArgs.map((f) => resolve(f));
  } else {
    files = await glob(DEFAULT_GLOBS, { absolute: true });
  }

  let hasChanges = false;
  let totalWarnings = 0;

  for (const file of files) {
    let content: string;
    try {
      content = readFileSync(file, "utf-8");
    } catch {
      console.error(`Could not read: ${file}`);
      continue;
    }

    const result = formatAsciiBlocks(content);

    for (const w of result.warnings) {
      console.warn(`⚠ ${file}: ${w}`);
      totalWarnings++;
    }

    if (result.changed) {
      hasChanges = true;
      if (checkMode) {
        console.log(`Would format: ${file}`);
      } else if (writeMode) {
        writeFileSync(file, result.formatted, "utf-8");
        console.log(`Formatted: ${file}`);
      }
    }
  }

  if (totalWarnings > 0) {
    console.warn(`\n${totalWarnings} warning(s)`);
  }

  if (checkMode && hasChanges) {
    console.error("\nFormatting drift detected. Run `npm run format:ascii` to fix.");
    process.exit(1);
  }

  if (!hasChanges) {
    console.log("All files are formatted.");
  }
}

// Only run CLI when executed directly (not imported)
const isDirectRun =
  typeof process !== "undefined" &&
  process.argv[1] &&
  (process.argv[1].endsWith("format-ascii.ts") ||
    process.argv[1].includes("format-ascii"));

if (isDirectRun) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
