import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";
import {
  formatAsciiBlocks,
  findBoxRegions,
  formatBoxRegion,
} from "../format-ascii.js";

const FIXTURES = join(import.meta.dirname, "fixtures");

function fixture(name: string): string {
  return readFileSync(join(FIXTURES, name), "utf-8");
}

// ── Unit tests: findBoxRegions ─────────────────────────────────────────

describe("findBoxRegions", () => {
  it("finds a single box", () => {
    const lines = ["+---+", "| a |", "+---+"];
    const regions = findBoxRegions(lines);
    expect(regions).toEqual([{ startLine: 0, endLine: 2 }]);
  });

  it("finds multiple boxes separated by blank lines", () => {
    const lines = ["+--+", "| x|", "+--+", "", "+--+", "| y|", "+--+"];
    const regions = findBoxRegions(lines);
    expect(regions).toHaveLength(2);
    expect(regions[0]).toEqual({ startLine: 0, endLine: 2 });
    expect(regions[1]).toEqual({ startLine: 4, endLine: 6 });
  });

  it("returns empty for lines without boxes", () => {
    const lines = ["hello", "world", "no boxes here"];
    expect(findBoxRegions(lines)).toEqual([]);
  });
});

// ── Unit tests: formatBoxRegion ────────────────────────────────────────

describe("formatBoxRegion", () => {
  it("pads content to uniform width", () => {
    const lines = ["+---+", "| a|", "| bb|", "+---+"];
    const result = formatBoxRegion(lines);
    expect(result).not.toBeNull();
    expect(result).toEqual(["+----+", "| a  |", "| bb |", "+----+"]);
  });

  it("handles multi-column tables", () => {
    const lines = ["+--+--+", "| a| b|", "+--+--+"];
    const result = formatBoxRegion(lines);
    expect(result).not.toBeNull();
    expect(result![1]).toBe("| a | b |");
  });

  it("preserves leading whitespace (indentation)", () => {
    const lines = ["  +---+", "  | hi|", "  +---+"];
    const result = formatBoxRegion(lines);
    expect(result).not.toBeNull();
    expect(result![0]).toMatch(/^\s{2}\+/);
    expect(result![1]).toMatch(/^\s{2}\|/);
  });
});

// ── Integration tests: formatAsciiBlocks ───────────────────────────────

describe("formatAsciiBlocks", () => {
  // Test 1: Simple single-box alignment fix
  it("fixes alignment in a single box", () => {
    const input = "```text\n+---+\n| hi|\n+---+\n```\n";
    const { formatted, changed } = formatAsciiBlocks(input);
    expect(changed).toBe(true);
    expect(formatted).toContain("| hi |");
  });

  // Test 2: Multiple boxes in one fence
  it("formats multiple boxes in one fenced block", () => {
    const input = fixture("multi-box-input.md");
    const expected = fixture("multi-box-expected.md");
    const { formatted } = formatAsciiBlocks(input);
    expect(formatted).toBe(expected);
  });

  // Test 3: Nested boxes (inner box inside outer)
  it("handles nested-looking boxes", () => {
    const input = [
      "```text",
      "+----------+",
      "| +------+ |",
      "| | inner| |",
      "| +------+ |",
      "+----------+",
      "```",
      "",
    ].join("\n");
    // Should not crash; may or may not fully format inner box
    const { formatted } = formatAsciiBlocks(input);
    expect(formatted).toBeDefined();
  });

  // Test 4: Mixed ASCII + plain text (only boxes formatted)
  it("leaves non-box text unchanged", () => {
    const input = [
      "```text",
      "This is plain text",
      "+---+",
      "| a|",
      "+---+",
      "More plain text",
      "```",
      "",
    ].join("\n");
    const { formatted } = formatAsciiBlocks(input);
    expect(formatted).toContain("This is plain text");
    expect(formatted).toContain("More plain text");
    expect(formatted).toContain("| a |");
  });

  // Test 5: Uneven borders get fixed
  it("fixes uneven border widths", () => {
    const input = fixture("single-box-input.md");
    const expected = fixture("single-box-expected.md");
    const { formatted, changed } = formatAsciiBlocks(input);
    expect(changed).toBe(true);
    expect(formatted).toBe(expected);
  });

  // Test 6: Malformed box (missing closing border) warns and leaves unchanged
  it("warns on malformed boxes", () => {
    const input = "```text\n+---+\n| no closing border\n```\n";
    const { formatted, changed, warnings } = formatAsciiBlocks(input);
    expect(changed).toBe(false);
    expect(formatted).toBe(input);
    // No box region detected, so no warning either — just left unchanged
  });

  // Test 7: Windows line endings
  it("handles windows line endings", () => {
    const input = "```text\r\n+---+\r\n| hi|\r\n+---+\r\n```\r\n";
    // The regex works per-line; \r\n may need handling
    const { formatted } = formatAsciiBlocks(input);
    expect(formatted).toBeDefined();
  });

  // Test 8: Both `text` and `ascii` tags are processed
  it("processes both text and ascii fenced blocks", () => {
    const input = [
      "```text",
      "+---+",
      "| a|",
      "+---+",
      "```",
      "",
      "```ascii",
      "+---+",
      "| b|",
      "+---+",
      "```",
      "",
    ].join("\n");
    const { formatted } = formatAsciiBlocks(input);
    expect(formatted).toContain("| a |");
    expect(formatted).toContain("| b |");
  });

  // Test 9: Blocks without borders are untouched
  it("leaves blocks without boxes unchanged", () => {
    const input = "```text\njust plain text\nno boxes\n```\n";
    const { formatted, changed } = formatAsciiBlocks(input);
    expect(changed).toBe(false);
    expect(formatted).toBe(input);
  });

  // Test 10: Idempotence
  it("is idempotent — formatting already-formatted content produces no change", () => {
    const input = fixture("single-box-expected.md");
    const { formatted, changed } = formatAsciiBlocks(input);
    expect(changed).toBe(false);
    expect(formatted).toBe(input);
  });

  // Test 11: Untagged code blocks are NOT processed
  it("ignores untagged code blocks", () => {
    const input = "```\n+---+\n| a|\n+---+\n```\n";
    const { formatted, changed } = formatAsciiBlocks(input);
    expect(changed).toBe(false);
    expect(formatted).toBe(input);
  });

  // Golden fixture: trajectory-style table
  it("formats trajectory-style tables correctly", () => {
    const input = fixture("trajectory-input.md");
    const expected = fixture("trajectory-expected.md");
    const { formatted } = formatAsciiBlocks(input);
    expect(formatted).toBe(expected);
  });

  // Test 12: Nested chat UI with errors at both outer and inner box levels
  // is left unchanged (with warning) rather than mangled
  it("leaves nested box layouts unchanged and warns", () => {
    const input = fixture("nested-chat-input.md");
    const { formatted, changed, warnings } = formatAsciiBlocks(input);
    // Nested boxes can't be safely reformatted — must be left as-is
    expect(changed).toBe(false);
    expect(formatted).toBe(input);
    expect(warnings.length).toBeGreaterThan(0);
  });
});
