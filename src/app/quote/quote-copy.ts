/**
 * ข้อความของหน้านัดหมาย ทั้งภาษาไทยและอังกฤษ
 *
 * หน้าไทยที่ /quote และหน้าอังกฤษที่ /en/quote ใช้คอมโพเนนต์เดียวกัน
 * ต่างกันแค่ชุดข้อความในไฟล์นี้ ดีไซน์และตรรกะของฟอร์มจึงต่างกันไม่ได้
 *
 * type บังคับให้ทั้งสองภาษามีคีย์ครบเท่ากัน ถ้าเพิ่มข้อความให้ภาษาเดียวจะ build ไม่ผ่าน
 */

export type QuoteCopy = {
  htmlLang: string;
  h1: string;
  intro: string;
  step1: string;
  step2: string;
  dateLabel: string;
  datePlaceholder: string;
  timeLabel: string;
  timePlaceholder: string;
  contactTitle: string;
  namePlaceholder: string;
  phonePlaceholder: string;
  notePlaceholder: string;
  submit: string;
  submitting: string;
  /** ข้อความเตือนตอนกรอกไม่ครบ */
  incomplete: string;
  /** ปลายทางล่มหรือปฏิเสธ — ต้องบอกช่องทางสำรองเสมอ ไม่ปล่อยให้ลูกค้าค้าง */
  failed: string;
  networkError: string;
  successTitle: string;
  successBody: string;
  successAgain: string;
};

const th: QuoteCopy = {
  htmlLang: 'th',
  h1: 'นัดหมายปรึกษาผู้เชี่ยวชาญ',
  intro: 'เลือกบริการและเวลาที่คุณสะดวก เพื่อพูดคุยกับทีมงาน IC Accounting & Service',
  step1: 'เลือกประเภทบริการ',
  step2: 'เลือกวันและเวลาที่สะดวก',
  dateLabel: 'เลือกวันที่',
  datePlaceholder: '',
  timeLabel: 'เลือกช่วงเวลา',
  timePlaceholder: 'เลือกเวลา',
  contactTitle: 'ข้อมูลผู้ติดต่อ',
  namePlaceholder: 'ชื่อ-นามสกุล',
  phonePlaceholder: 'เบอร์โทรศัพท์',
  notePlaceholder: 'รายละเอียดเพิ่มเติม (ถ้ามี)',
  submit: 'ยืนยันการนัดหมาย',
  submitting: 'กำลังส่ง...',
  incomplete: 'กรุณากรอกข้อมูลให้ครบถ้วน',
  failed: 'ระบบบันทึกนัดหมายไม่สำเร็จ กรุณาติดต่อเราทาง LINE @icacc โดยตรง ขออภัยในความไม่สะดวกครับ',
  networkError: 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง หรือติดต่อเราทาง LINE @icacc',
  successTitle: 'ยืนยันการนัดหมายเรียบร้อยแล้ว!',
  successBody: 'ทีมงาน IC Accounting จะติดต่อกลับภายใน 24 ชั่วโมง',
  successAgain: 'นัดหมายเพิ่มเติม',
};

const en: QuoteCopy = {
  htmlLang: 'en',
  h1: 'Book a free consultation',
  intro: 'Choose the service and a time that suits you, and the IC Accounting & Service team will call you back.',
  step1: 'Choose a service',
  step2: 'Pick a date and time',
  dateLabel: 'Date',
  datePlaceholder: '',
  timeLabel: 'Time slot',
  timePlaceholder: 'Select a time',
  contactTitle: 'Your details',
  namePlaceholder: 'Full name',
  phonePlaceholder: 'Phone number',
  notePlaceholder: 'Anything else we should know? (optional)',
  submit: 'Confirm booking',
  submitting: 'Sending...',
  incomplete: 'Please fill in every field.',
  failed: 'We could not save your booking. Please message us on LINE @icacc instead — sorry for the trouble.',
  networkError: 'Something went wrong. Please try again, or message us on LINE @icacc.',
  successTitle: 'Your booking is confirmed',
  successBody: 'The IC Accounting team will contact you within 24 hours.',
  successAgain: 'Book another consultation',
};

export const quoteCopy = { th, en } as const;
