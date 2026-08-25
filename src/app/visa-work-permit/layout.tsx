/**
 * metadata ของหน้านี้ย้ายไปอยู่ใน page.tsx ที่เดียว
 *
 * เดิมประกาศไว้ทั้งสองไฟล์ด้วยค่าคนละชุด ซึ่ง Next จะให้ page ชนะอยู่แล้ว
 * การเก็บของเก่าไว้ใน layout จึงมีแต่จะทำให้แก้ผิดที่แล้วไม่เห็นผล
 * และสับสนว่าอันไหนคือของจริง
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
