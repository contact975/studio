/**
 * แปะ JSON-LD ลงหน้าเว็บ
 * รับได้ทั้ง object เดียวหรือหลาย schema พร้อมกัน
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
