// markdownHelper.ts
import DOMPurify from 'dompurify';
import parse, { type HTMLReactParserOptions, domToReact, Element } from 'html-react-parser';
// Enhanced Markdown to HTML converter with table support
export const markdownToHtml = (text: string | null | undefined): string => {
  if (!text || typeof text !== 'string') {
    console.warn('markdownToHtml received invalid input:', text);
    return '';
  }

  try {
    let html = text;

    // Escape HTML first to prevent XSS, but preserve our markdown
    html = html.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // Convert markdown horizontal rules
    html = html.replace(/^---$/gm, '<hr>');
    html = html.replace(/^\*\*\*$/gm, '<hr>');
    html = html.replace(/^___$/gm, '<hr>');

    // Re-enable <hr> tags that were in the original content
    html = html.replace(/&lt;hr\s*\/?&gt;/gi, '<hr>');

    // Convert headers (h1-h6)
    html = html.replace(/^######\s+(.+)$/gm, '<h6>$1</h6>');
    html = html.replace(/^#####\s+(.+)$/gm, '<h5>$1</h5>');
    html = html.replace(/^####\s+(.+)$/gm, '<h4>$1</h4>');
    html = html.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^#\s+(.+)$/gm, '<h1>$1</h1>');

    // Convert markdown tables
    html = convertTables(html);

    // Convert markdown bold (must come before italic to handle ***)
    html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Convert markdown italic
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Convert markdown code (inline)
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Convert markdown links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

    // Convert lists
    // Bullet points (support various bullet characters)
    html = html.replace(/^[\s]*[•·▪▫◦‣⁃]\s+(.+)$/gm, '<li>$1</li>');
    html = html.replace(/^[\s]*[-*+]\s+(.+)$/gm, '<li>$1</li>');

    // Numbered lists
    html = html.replace(/^[\s]*\d+\.\s+(.+)$/gm, '<li class="numbered">$1</li>');

    // Wrap consecutive <li> elements in <ul> or <ol>
    html = html.replace(/(<li>.*?<\/li>\s*)+/g, (match) => {
      return `<ul>${match}</ul>`;
    });
    html = html.replace(/(<li class="numbered">.*?<\/li>\s*)+/g, (match) => {
      const items = match.replace(/class="numbered"/g, '');
      return `<ol>${items}</ol>`;
    });

    // Convert line breaks
    html = html.replace(/\n/g, '<br>');

    return html;
  } catch (error) {
    console.error('Error in markdownToHtml:', error);
    return text || '';
  }
};

// Table conversion function
export const convertTables = (text: string): string => {
  // Match markdown tables
  const tableRegex = /(\|.*\|[\r\n]+\|[-\s\|:]+\|[\r\n]+((?:\|.*\|[\r\n]*)+))/g;

  return text.replace(tableRegex, (match) => {
    const lines = match.trim().split(/[\r\n]+/);

    if (lines.length < 3) return match; // Not a valid table

    const headerLine = lines[0];
    const dataLines = lines.slice(2);

    // Parse header
    const headers = headerLine
      .split('|')
      .map(cell => cell.trim())
      .filter(cell => cell !== '');

    // Parse data rows
    const rows = dataLines
      .filter(line => line.trim() !== '')
      .map(line => {
        return line
          .split('|')
          .map(cell => cell.trim())
          .filter(cell => cell !== '');
      })
      .filter(row => row.length > 0);

    // Generate HTML table
    let tableHtml = '<table class="insight-table">';

    // Add header
    if (headers.length > 0) {
      tableHtml += '<thead><tr>';
      headers.forEach(header => {
        tableHtml += `<th>${header}</th>`;
      });
      tableHtml += '</tr></thead>';
    }

    // Add body
    if (rows.length > 0) {
      tableHtml += '<tbody>';
      rows.forEach(row => {
        tableHtml += '<tr>';
        row.forEach((cell, index) => {
          if (index < headers.length) {
            tableHtml += `<td>${cell}</td>`;
          }
        });
        for (let i = row.length; i < headers.length; i++) {
          tableHtml += '<td></td>';
        }
        tableHtml += '</tr>';
      });
      tableHtml += '</tbody>';
    }

    tableHtml += '</table>';

    return tableHtml;
  });
};

// Sanitize HTML to prevent XSS (updated to include table elements)
export const sanitizeHtml = (html: string): string => {
  const config = {
    ALLOWED_TAGS: [
      'strong', 'em', 'code', 'a', 'hr', 'br',
      'ul', 'ol', 'li', 'p', 'div', 'span',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'blockquote', 'pre',
      'table', 'thead', 'tbody', 'tr', 'th', 'td'
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
    ALLOW_DATA_ATTR: false,
    KEEP_CONTENT: true,
  };

  let clean = DOMPurify.sanitize(html, config);
  // Ensure all links open safely
  clean = clean.replace(/<a\s+href=/g, '<a target="_blank" rel="noopener noreferrer" href=');
  return clean;
};
export const createParserOptions = (isDarkMode: boolean = false): HTMLReactParserOptions => ({
  replace: (domNode) => {
    if (domNode.type === 'tag' && domNode instanceof Element) {
      const { name, attribs, children } = domNode;

      switch (name) {
        case 'h1':
          return (
            <h1 className="text-2xl font-bold mt-6 mb-3 text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700 pb-2" >
              {domToReact(children as any, createParserOptions(isDarkMode))
              }
            </h1>
          );

        case 'h2':
          return (
            <h2 className="text-xl font-bold mt-5 mb-3 text-slate-800 dark:text-slate-200" >
              {domToReact(children as any, createParserOptions(isDarkMode))}
            </h2>
          );

        case 'h3':
          return (
            <h3 className="text-lg font-semibold mt-4 mb-2 text-slate-700 dark:text-slate-300" >
              {domToReact(children as any, createParserOptions(isDarkMode))}
            </h3>
          );

        case 'strong':
          return (
            <strong className="font-bold text-blue-600 dark:text-blue-400" >
              {domToReact(children as any, createParserOptions(isDarkMode))}
            </strong>
          );

        case 'em':
          return (
            <em className="italic text-slate-600 dark:text-slate-400" >
              {domToReact(children as any, createParserOptions(isDarkMode))}
            </em>
          );

        case 'code':
          return (
            <code className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-blue-700 dark:text-blue-300 rounded text-sm font-mono" >
              {domToReact(children as any, createParserOptions(isDarkMode))}
            </code>
          );

        case 'a':
          return (
            <a
              href={attribs.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 underline decoration-1 underline-offset-2"
            >
              {domToReact(children as any, createParserOptions(isDarkMode))}
            </a>
          );

        case 'hr':
          return <hr className="my-6 border-slate-300 dark:border-slate-600" />;

        case 'ul':
          return (
            <ul className="list-disc list-inside ml-4 my-3 space-y-1 text-slate-700 dark:text-slate-300" >
              {domToReact(children as any, createParserOptions(isDarkMode))}
            </ul>
          );

        case 'ol':
          return (
            <ol className="list-decimal list-inside ml-4 my-3 space-y-1 text-slate-700 dark:text-slate-300" >
              {domToReact(children as any, createParserOptions(isDarkMode))}
            </ol>
          );

        case 'li':
          return (
            <li className="my-1 leading-relaxed" >
              {domToReact(children as any, createParserOptions(isDarkMode))}
            </li>
          );

        case 'blockquote':
          return (
            <blockquote className="border-l-4 border-blue-400 pl-4 my-4 italic text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 py-3 rounded-r" >
              {domToReact(children as any, createParserOptions(isDarkMode))}
            </blockquote>
          );

        // Table elements
        case 'table':
          return (
            <div className="my-6 overflow-x-auto" >
              <table className="min-w-full border-collapse bg-white dark:bg-slate-800 shadow-sm rounded-lg overflow-hidden" >
                {domToReact(children as any, createParserOptions(isDarkMode))}
              </table>
            </div>
          );

        case 'thead':
          return (
            <thead className="bg-slate-50 dark:bg-slate-700" >
              {domToReact(children as any, createParserOptions(isDarkMode))}
            </thead>
          );

        case 'tbody':
          return (
            <tbody className="divide-y divide-slate-200 dark:divide-slate-600" >
              {domToReact(children as any, createParserOptions(isDarkMode))}
            </tbody>
          );

        case 'tr':
          return (
            <tr className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors" >
              {domToReact(children as any, createParserOptions(isDarkMode))}
            </tr>
          );

        case 'th':
          return (
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider border-b border-slate-200 dark:border-slate-600" >
              {domToReact(children as any, createParserOptions(isDarkMode))}
            </th>
          );

        case 'td':
          return (
            <td className="px-4 py-3 text-sm text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-600" >
              {domToReact(children as any, createParserOptions(isDarkMode))}
            </td>
          );

        case 'br':
          return <br />;

        default:
          return undefined;
      }
    }
    return undefined;
  }
});

// ✅ MAIN FUNCTION: Converts Markdown → Safe HTML → React Elements
export const markdownToReact = (text: string | null | undefined, isDarkMode: boolean = false) => {
  const html = markdownToHtml(text);
  const sanitizedHtml = sanitizeHtml(html);
  return parse(sanitizedHtml, createParserOptions(isDarkMode));
};