import DOMPurify from 'dompurify';
import parse, { Element, domToReact, type HTMLReactParserOptions } from 'html-react-parser';
import { type DOMNode } from 'html-dom-parser';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Helper simple untuk parsing markdown table
const parseMarkdownTable = (text: string): string => {
  // Regex untuk menangkap blok tabel
  // Mencari baris yang dimulai dan diakhiri dengan |
  const tableBlockRegex = /((?:\|.*\|\r?\n?)+)/g;

  return text.replace(tableBlockRegex, (match) => {
    const lines = match.trim().split(/\r?\n/);
    if (lines.length < 2) return match; // Bukan tabel valid jika kurang dari 2 baris

    // Cek separator row (|---|---|)
    const separatorIndex = lines.findIndex(line => /^\|[\s-:|]+\|$/.test(line));
    if (separatorIndex === -1) return match;

    const headers = lines[0].split('|').filter(cell => cell.trim() !== '').map(cell => cell.trim());
    const alignments = lines[separatorIndex].split('|').filter(cell => cell.trim() !== '').map(cell => {
      const c = cell.trim();
      if (c.startsWith(':') && c.endsWith(':')) return 'center';
      if (c.endsWith(':')) return 'right';
      return 'left';
    });

    let tableHtml = '<div class="table-container"><table>';

    // Header
    tableHtml += '<thead><tr>';
    headers.forEach((header, i) => {
      tableHtml += `<th style="text-align: ${alignments[i] || 'left'}">${header}</th>`;
    });
    tableHtml += '</tr></thead>';

    // Body
    tableHtml += '<tbody>';
    for (let i = separatorIndex + 1; i < lines.length; i++) {
      const row = lines[i];
      if (!row.trim()) continue;

      // Fallback split logic if standard split fails standard markdown table usually has leading/trailing |
      // Let's refine: simple split and clean
      const cleanCells = row.split('|').slice(1, -1).map(c => c.trim());

      tableHtml += '<tr>';
      cleanCells.forEach((cell, j) => {
        tableHtml += `<td style="text-align: ${alignments[j] || 'left'}">${cell}</td>`;
      });
      tableHtml += '</tr>';
    }
    tableHtml += '</tbody></table></div>';

    return tableHtml;
  });
};

// Fungsi untuk mengkonversi Markdown ke HTML
export const convertChatMarkdownToHtml = (text: string | null | undefined): string => {
  // Validasi input dan berikan fallback
  if (!text || typeof text !== 'string') {
    console.warn('convertMarkdownToHtml received invalid input:', text);
    return '';
  }

  try {
    let html = text;
    // Parse table dulu sebelum convert newline
    html = parseMarkdownTable(html);

    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/^(\s*)\*\s+(.*?)(?=\n|$)/gm, '$1<li>$2</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

    // Convert newline to br hanya jika bukan di dalam tag html (simple heuristic)
    // Atau replace newline global tapi hati-hati dengan html
    // Kita replace newline biasa dengan <br> tapi tidak di dalam tag table
    // Cara aman: replace newline yang tidak di dalam >...<
    // Simplifikasi: parseMarkdownTable return string tanpa newline di dalam structurnya (sudah jadi satu baris string html)
    // Jadi newline sisa adalah text biasa.
    // Namun kita perlu hati-hati agar tidak replace newline di dalam <table> string yang kita generate?
    // parseMarkdownTable returns HTML string, potentially with newlines if we added them? NO, we constructed strings.
    // Tapi match.trim().split puts text back.
    // Let's ensure parseMarkdownTable output doesn't depend on newlines for structure anymore.

    // Replace newline dengan <br> untuk text biasa
    html = html.replace(/\n/g, '<br />');

    return html;
  } catch (error) {
    console.error('Error in convertMarkdownToHtml:', error);
    return text || '';
  }
};

export const renderChatContent = (html: string | null | undefined) => {
  // Validasi input
  if (!html || typeof html !== 'string') {
    console.warn('renderChatContent received invalid content:', html);
    return <span>Error: Invalid content</span>;
  }

  try {
    const convertedHtml = convertChatMarkdownToHtml(html);
    const sanitized = DOMPurify.sanitize(convertedHtml, {
      ALLOWED_TAGS: [
        'strong', 'em', 'u', 'b', 'i',
        'hr', 'br', 'p', 'div', 'span',
        'ul', 'ol', 'li',
        'table', 'thead', 'tbody', 'tr', 'th', 'td'
      ],
      ALLOWED_ATTR: ['class', 'style']
    });

    const options: HTMLReactParserOptions = {
      replace: (domNode) => {
        if (domNode instanceof Element && domNode.type === 'tag') {
          if (domNode.name === 'table') {
            return (
              <Table className="border rounded-md my-2">
                {domToReact(domNode.children as DOMNode[], options)}
              </Table>
            );
          }
          if (domNode.name === 'thead') {
            return <TableHeader>{domToReact(domNode.children as DOMNode[], options)}</TableHeader>;
          }
          if (domNode.name === 'tbody') {
            return <TableBody>{domToReact(domNode.children as DOMNode[], options)}</TableBody>;
          }
          if (domNode.name === 'tr') {
            return <TableRow>{domToReact(domNode.children as DOMNode[], options)}</TableRow>;
          }
          if (domNode.name === 'th') {
            return <TableHead className="text-left font-bold">{domToReact(domNode.children as DOMNode[], options)}</TableHead>;
          }
          if (domNode.name === 'td') {
            return <TableCell>{domToReact(domNode.children as DOMNode[], options)}</TableCell>;
          }
        }
      }
    };

    return parse(sanitized, options);
  } catch (error) {
    console.error('Error in renderChatContent:', error);
    return <span>Error rendering content</span>;
  }
};
