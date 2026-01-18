import DOMPurify from 'dompurify';
import parse from 'html-react-parser';

// Fungsi untuk mengkonversi Markdown ke HTML
export const convertChatMarkdownToHtml = (text: string | null | undefined): string => {
  // Validasi input dan berikan fallback
  if (!text || typeof text !== 'string') {
    console.warn('convertMarkdownToHtml received invalid input:', text);
    return '';
  }

  try {
    let html = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/^(\s*)\*\s+(.*?)(?=\n|$)/gm, '$1<li>$2</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
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
        'ul', 'ol', 'li'
      ],
      ALLOWED_ATTR: ['class', 'style']
    });
    return parse(sanitized);
  } catch (error) {
    console.error('Error in renderChatContent:', error);
    return <span>Error rendering content</span>;
  }
};
