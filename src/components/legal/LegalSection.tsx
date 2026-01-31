'use client';

interface LegalSectionProps {
  id: string;
  title: string;
  content: string;
}

export function LegalSection({ id, title, content }: LegalSectionProps) {
  const formatContent = (text: string) => {
    let formatted = text
      // Bold text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900">$1</strong>')
      // Lists
      .replace(/• (.*?)(?=\n|$)/g, '<li class="ml-4">$1</li>')
      // Tables - simple markdown table support
      .replace(/\|(.+)\|/g, (match) => {
        const cells = match.split('|').filter(Boolean).map(cell => cell.trim());
        if (cells.some(cell => cell.match(/^[-]+$/))) {
          return ''; // Skip header separator row
        }
        const isHeader = !match.includes('---');
        const tag = isHeader ? 'th' : 'td';
        const cellClass = isHeader ? 'border px-4 py-2 bg-gray-50 text-left font-medium' : 'border px-4 py-2';
        return `<tr>${cells.map(cell => `<${tag} class="${cellClass}">${cell}</${tag}>`).join('')}</tr>`;
      })
      // Paragraphs
      .split('\n\n')
      .map(paragraph => {
        if (paragraph.includes('<li')) {
          return `<ul class="list-disc space-y-1 my-4 text-gray-600">${paragraph}</ul>`;
        }
        if (paragraph.includes('<tr>')) {
          return `<div class="overflow-x-auto my-4"><table class="w-full text-sm border-collapse">${paragraph}</table></div>`;
        }
        if (paragraph.trim()) {
          return `<p class="mb-4 text-gray-600 leading-relaxed">${paragraph}</p>`;
        }
        return '';
      })
      .join('');

    return formatted;
  };

  return (
    <section id={id} className="mb-10 scroll-mt-24">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
        {title}
      </h2>
      <div
        className="prose prose-gray max-w-none"
        dangerouslySetInnerHTML={{ __html: formatContent(content) }}
      />
    </section>
  );
}
