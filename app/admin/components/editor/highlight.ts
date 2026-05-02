function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Inline tokenizer — walks the string char by char to avoid greedy regex conflicts
function inlineHL(raw: string): string {
  let out = "";
  let i = 0;
  while (i < raw.length) {
    // Bold + italic ***
    if (raw[i] === "*" && raw[i + 1] === "*" && raw[i + 2] === "*") {
      const end = raw.indexOf("***", i + 3);
      if (end !== -1) {
        out += `<span class="mds-p">***</span><span class="mds-bi">${esc(raw.slice(i + 3, end))}</span><span class="mds-p">***</span>`;
        i = end + 3;
        continue;
      }
    }
    // Bold **
    if (raw[i] === "*" && raw[i + 1] === "*") {
      const end = raw.indexOf("**", i + 2);
      if (end !== -1) {
        out += `<span class="mds-p">**</span><span class="mds-b">${esc(raw.slice(i + 2, end))}</span><span class="mds-p">**</span>`;
        i = end + 2;
        continue;
      }
    }
    // Italic *
    if (raw[i] === "*" && raw[i + 1] !== "*") {
      const end = raw.indexOf("*", i + 1);
      if (end !== -1 && raw[end + 1] !== "*") {
        out += `<span class="mds-p">*</span><span class="mds-i">${esc(raw.slice(i + 1, end))}</span><span class="mds-p">*</span>`;
        i = end + 1;
        continue;
      }
    }
    // Inline code `
    if (raw[i] === "`" && raw[i + 1] !== "`") {
      const end = raw.indexOf("`", i + 1);
      if (end !== -1) {
        out += `<span class="mds-p">\`</span><span class="mds-c">${esc(raw.slice(i + 1, end))}</span><span class="mds-p">\`</span>`;
        i = end + 1;
        continue;
      }
    }
    // Link/image [text](url)
    if (raw[i] === "[" || (raw[i] === "!" && raw[i + 1] === "[")) {
      const imgPrefix = raw[i] === "!" ? 1 : 0;
      const textStart = i + imgPrefix;
      const textClose = raw.indexOf("]", textStart + 1);
      if (textClose !== -1 && raw[textClose + 1] === "(") {
        const urlClose = raw.indexOf(")", textClose + 2);
        if (urlClose !== -1) {
          const prefix = imgPrefix ? '<span class="mds-p">!</span>' : "";
          out += `${prefix}<span class="mds-p">[</span><span class="mds-lt">${esc(raw.slice(textStart + 1, textClose))}</span><span class="mds-p">](</span><span class="mds-lu">${esc(raw.slice(textClose + 2, urlClose))}</span><span class="mds-p">)</span>`;
          i = urlClose + 1;
          continue;
        }
      }
    }
    out += esc(raw[i]);
    i++;
  }
  return out;
}

function tokenizeLine(line: string): string {
  // Setext headings (====  / ----)
  // (handled as plain text — too complex without lookahead)

  // ATX headings
  const hm = line.match(/^(#{1,6})( .*)/);
  if (hm) {
    return `<span class="mds-hmark">${esc(hm[1])}</span><span class="mds-heading">${inlineHL(hm[2])}</span>`;
  }

  // Horizontal rule (must come before list check)
  if (/^(\*{3,}|-{3,}|_{3,})$/.test(line.trim())) {
    return `<span class="mds-hr">${esc(line)}</span>`;
  }

  // Blockquote
  if (line.startsWith("> ")) {
    return `<span class="mds-bqmark">&gt; </span><span class="mds-bq">${inlineHL(line.slice(2))}</span>`;
  }
  if (line === ">") {
    return `<span class="mds-bqmark">&gt;</span>`;
  }

  // Unordered list
  const ulm = line.match(/^(\s*)([-*+]) (.*)/);
  if (ulm) {
    return `${esc(ulm[1])}<span class="mds-lmark">${esc(ulm[2])}</span> ${inlineHL(ulm[3])}`;
  }

  // Ordered list
  const olm = line.match(/^(\s*)(\d+\.) (.*)/);
  if (olm) {
    return `${esc(olm[1])}<span class="mds-lmark">${esc(olm[2])}</span> ${inlineHL(olm[3])}`;
  }

  return inlineHL(line);
}

export function highlight(text: string): string {
  const lines = text.split("\n");
  const out: string[] = [];
  let inFence = false;
  let fenceLang = "";

  for (const line of lines) {
    if (line.startsWith("```")) {
      if (inFence) {
        out.push(`<span class="mds-fence">\`\`\`</span>`);
        inFence = false;
        fenceLang = "";
      } else {
        fenceLang = line.slice(3).trim();
        const langSpan = fenceLang
          ? `<span class="mds-lang">${esc(fenceLang)}</span>`
          : "";
        out.push(`<span class="mds-fence">\`\`\`${langSpan}</span>`);
        inFence = true;
      }
      continue;
    }
    if (inFence) {
      out.push(`<span class="mds-code-line">${esc(line)}</span>`);
      continue;
    }
    out.push(tokenizeLine(line));
  }

  // Trailing newline keeps textarea/pre heights in sync
  return `${out.join("\n")}\n`;
}
