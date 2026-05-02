export type FormatCmd =
  | "bold"
  | "italic"
  | "code"
  | "link"
  | "h1"
  | "h2"
  | "h3"
  | "quote"
  | "ul"
  | "ol"
  | "codeblock"
  | "hr";

interface Result {
  value: string;
  selStart: number;
  selEnd: number;
}

function wrapInline(
  value: string,
  ss: number,
  se: number,
  before: string,
  after: string,
  placeholder: string,
): Result {
  const selected = value.slice(ss, se) || placeholder;
  const toggled =
    selected.startsWith(before) && selected.endsWith(after)
      ? selected.slice(before.length, selected.length - after.length)
      : before + selected + after;
  const newValue = value.slice(0, ss) + toggled + value.slice(se);
  return {
    value: newValue,
    selStart: ss + (toggled === selected ? 0 : before.length),
    selEnd: ss + toggled.length - (toggled === selected ? 0 : after.length),
  };
}

function lineStart(value: string, pos: number): number {
  return value.lastIndexOf("\n", pos - 1) + 1;
}

// Returns the range [start, end) covering all lines touched by [ss, se]
function affectedLines(
  value: string,
  ss: number,
  se: number,
): [number, number] {
  const start = lineStart(value, ss);
  const rawEnd = se === ss ? se : se - 1;
  const end = value.indexOf("\n", rawEnd);
  return [start, end === -1 ? value.length : end];
}

function toggleLinePrefix(
  value: string,
  ss: number,
  se: number,
  prefix: string,
): Result {
  const [lStart, lEnd] = affectedLines(value, ss, se);
  const block = value.slice(lStart, lEnd);
  const lines = block.split("\n");

  // If all lines already have prefix, remove it; otherwise add
  const allHave = lines.every((l) => l.startsWith(prefix));
  const newLines = allHave
    ? lines.map((l) => l.slice(prefix.length))
    : lines.map((l) => prefix + l);

  const newBlock = newLines.join("\n");
  const delta = newBlock.length - block.length;

  return {
    value: value.slice(0, lStart) + newBlock + value.slice(lEnd),
    selStart:
      ss + (allHave ? -Math.min(prefix.length, ss - lStart) : prefix.length),
    selEnd: se + delta,
  };
}

export function applyFormat(
  value: string,
  ss: number,
  se: number,
  cmd: FormatCmd,
): Result {
  switch (cmd) {
    case "bold":
      return wrapInline(value, ss, se, "**", "**", "bold text");
    case "italic":
      return wrapInline(value, ss, se, "*", "*", "italic text");
    case "code":
      return wrapInline(value, ss, se, "`", "`", "code");
    case "link": {
      const text = value.slice(ss, se) || "link text";
      const insertion = `[${text}](url)`;
      const newValue = value.slice(0, ss) + insertion + value.slice(se);
      const urlPos = ss + 1 + text.length + 2;
      return { value: newValue, selStart: urlPos, selEnd: urlPos + 3 };
    }
    case "h1":
      return toggleLinePrefix(value, ss, se, "# ");
    case "h2":
      return toggleLinePrefix(value, ss, se, "## ");
    case "h3":
      return toggleLinePrefix(value, ss, se, "### ");
    case "quote":
      return toggleLinePrefix(value, ss, se, "> ");
    case "ul":
      return toggleLinePrefix(value, ss, se, "- ");
    case "ol":
      return toggleLinePrefix(value, ss, se, "1. ");
    case "codeblock": {
      const inner = value.slice(ss, se) || "code here";
      const insertion = `\`\`\`tsx\n${inner}\n\`\`\``;
      const newValue = value.slice(0, ss) + insertion + value.slice(se);
      return {
        value: newValue,
        selStart: ss + 7,
        selEnd: ss + 7 + inner.length,
      };
    }
    case "hr": {
      const before = value.slice(0, ss);
      const nlBefore = before.endsWith("\n") ? "" : "\n";
      const insertion = `${nlBefore}---\n`;
      const newValue = before + insertion + value.slice(se);
      return {
        value: newValue,
        selStart: ss + insertion.length,
        selEnd: ss + insertion.length,
      };
    }
  }
}

// Smart Enter - continues list items; called from onKeyDown
export function smartEnter(value: string, ss: number): Result | null {
  const lStart = lineStart(value, ss);
  const currentLine = value.slice(lStart, ss);

  // Ordered list: continue with incremented number
  const olm = currentLine.match(/^(\s*)(\d+)\. /);
  if (olm) {
    if (currentLine.trim() === `${olm[2]}.`) {
      // Empty item - exit list
      const newValue = `${value.slice(0, lStart)}\n${value.slice(ss)}`;
      return { value: newValue, selStart: lStart + 1, selEnd: lStart + 1 };
    }
    const next = `\n${olm[1]}${Number(olm[2]) + 1}. `;
    const newValue = value.slice(0, ss) + next + value.slice(ss);
    return {
      value: newValue,
      selStart: ss + next.length,
      selEnd: ss + next.length,
    };
  }

  // Unordered list
  const ulm = currentLine.match(/^(\s*)([-*+]) /);
  if (ulm) {
    if (currentLine.trim() === ulm[2]) {
      // Empty item - exit list
      const newValue = `${value.slice(0, lStart)}\n${value.slice(ss)}`;
      return { value: newValue, selStart: lStart + 1, selEnd: lStart + 1 };
    }
    const next = `\n${ulm[1]}${ulm[2]} `;
    const newValue = value.slice(0, ss) + next + value.slice(ss);
    return {
      value: newValue,
      selStart: ss + next.length,
      selEnd: ss + next.length,
    };
  }

  return null;
}
