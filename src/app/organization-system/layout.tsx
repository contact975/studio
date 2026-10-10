/**
 * metadata ของหน้านี้ย้ายไปอยู่ใน page.tsx ที่เดียว
 *
 * เดิมประกาศไว้ทั้งสองไฟล์ ซึ่ง Next จะให้ page ชนะอยู่แล้ว
 * การเก็บของเก่าไว้ใน layout จึงมีแต่จะทำให้แก้ผิดที่แล้วไม่เห็นผล
 * และ layout ไม่มี hreflang ถ้าวันหนึ่ง page เลิกประกาศ metadata หน้านี้จะเสียคู่ภาษาไปเงียบๆ
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
