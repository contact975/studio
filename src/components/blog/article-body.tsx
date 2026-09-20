import * as React from 'react';
import { AlertTriangle, Info } from 'lucide-react';
import type { BlogBlock, BlogFaq } from '@/lib/blog-posts';

/**
 * แปลง block ของบทความเป็น HTML ที่มีโครงสร้างจริง (h2/h3/ul/ol/table)
 * รองรับตัวหนาแบบ **ข้อความ** ในย่อหน้า ลิสต์ และช่องตาราง
 */

function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={i} className="font-semibold text-slate-900">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </>
  );
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case 'h2':
      return (
        <h2 className="text-2xl md:text-3xl font-bold font-headline text-slate-900 mt-12 mb-4 scroll-mt-24">
          {block.text}
        </h2>
      );
    case 'h3':
      return (
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 mt-8 mb-3">
          {block.text}
        </h3>
      );
    case 'p':
      return (
        <p className="text-lg leading-relaxed text-slate-700 mb-5">
          <Inline text={block.text} />
        </p>
      );
    case 'ul':
      return (
        <ul className="list-disc pl-6 mb-6 space-y-2 text-lg leading-relaxed text-slate-700 marker:text-primary">
          {block.items.map((item, i) => (
            <li key={i}>
              <Inline text={item} />
            </li>
          ))}
        </ul>
      );
    case 'ol':
      return (
        <ol className="list-decimal pl-6 mb-6 space-y-2 text-lg leading-relaxed text-slate-700 marker:font-bold marker:text-primary">
          {block.items.map((item, i) => (
            <li key={i}>
              <Inline text={item} />
            </li>
          ))}
        </ol>
      );
    case 'table':
      return (
        <div className="my-8 -mx-4 md:mx-0 overflow-x-auto">
          <table className="min-w-full text-base border-collapse">
            <thead>
              <tr className="bg-[#163674] text-white">
                {block.head.map((h, i) => (
                  <th key={i} className="text-left font-semibold px-4 py-3 whitespace-nowrap first:rounded-tl-xl last:rounded-tr-xl">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r} className="border-b border-slate-200 odd:bg-white even:bg-slate-50 align-top">
                  {row.map((cell, c) => (
                    <td key={c} className="px-4 py-3 text-slate-700 leading-relaxed">
                      <Inline text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'callout': {
      const warn = block.tone === 'warn';
      const Icon = warn ? AlertTriangle : Info;
      return (
        <aside
          className={`my-8 rounded-2xl border p-5 md:p-6 flex gap-4 ${
            warn ? 'border-amber-300 bg-amber-50' : 'border-primary/20 bg-primary/5'
          }`}
        >
          <Icon className={`h-6 w-6 shrink-0 mt-0.5 ${warn ? 'text-amber-600' : 'text-primary'}`} />
          <div>
            {block.title && (
              <p className={`font-bold mb-1 ${warn ? 'text-amber-900' : 'text-slate-900'}`}>{block.title}</p>
            )}
            <p className={`leading-relaxed ${warn ? 'text-amber-900/90' : 'text-slate-700'}`}>
              <Inline text={block.text} />
            </p>
          </div>
        </aside>
      );
    }
    default:
      return null;
  }
}

export function ArticleBody({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="max-w-none">
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </div>
  );
}

export function ArticleFaq({ faq }: { faq: BlogFaq[] }) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl md:text-3xl font-bold font-headline text-slate-900 mb-6">คำถามที่พบบ่อย</h2>
      <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
        {faq.map((item, i) => (
          <details key={i} className="group p-5 md:p-6" open={i === 0}>
            <summary className="cursor-pointer list-none font-semibold text-slate-900 text-lg flex items-start justify-between gap-4">
              <span>{item.q}</span>
              <span className="text-primary transition-transform group-open:rotate-45 text-2xl leading-none shrink-0">+</span>
            </summary>
            <p className="mt-3 text-slate-700 leading-relaxed">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
