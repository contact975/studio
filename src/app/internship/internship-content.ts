/**
 * เนื้อหาหน้านักศึกษาฝึกงาน ทั้งสองภาษา
 *
 * หน้าไทย /internship และหน้าอังกฤษ /en/internship ใช้เทมเพลตเดียวกัน (internship-template.tsx)
 * และฟอร์มเดียวกัน (components/landing/internship-form.tsx) ต่างกันแค่ข้อความในไฟล์นี้
 * type บังคับให้ทั้งสองภาษามีคีย์ครบเท่ากัน ลืมแปลตรงไหนจะ build ไม่ผ่าน
 *
 * ── ข้อมูลรายชื่อนักศึกษาไม่อยู่ในไฟล์นี้ ──
 * ทำเนียบแต่ละรุ่นอยู่ที่ lib/interns.ts ชุดเดียว ทั้งสองภาษาอ่านจากที่เดียวกัน
 * ชื่อ สถาบัน และช่วงเวลาที่กรอกไว้เป็นภาษาไทยจะแสดงตามที่กรอกในทั้งสองหน้า
 *
 * ── ข้อความของฟอร์ม (form) ──
 * ส่งเข้าคอมโพเนนต์ฝั่ง client จึงต้องเป็นข้อความล้วน ห้ามมีฟังก์ชัน
 * ป้ายภาษาอังกฤษใช้แสดงผลเท่านั้น ค่าที่ฟอร์มส่งไป /api/internship ยังเป็นภาษาไทยเสมอ
 * (ดู HEARD_FROM_SELF_VALUE ใน internship-form.tsx)
 */

/** เพดานขนาดไฟล์แนบ ต้องตรงกับ MAX_FILE_BYTES ใน api/internship/route.ts */
export const INTERNSHIP_MAX_FILE_MB = 5;
const MB = INTERNSHIP_MAX_FILE_MB;

export type InternshipFormCopy = {
  name: string;
  university: string;
  major: string;
  level: string;
  levelPlaceholder: string;
  email: string;
  phone: string;
  startDate: string;
  endDate: string;
  fileLabel: string;
  filePick: string;
  fileHint: string;
  heardLegend: string;
  heardSelf: string;
  heardOther: string;
  heardOtherPlaceholder: string;
  reason: string;
  submit: string;
  submitting: string;
  privacy: string;
  errors: {
    /** ตรวจที่ client ก่อนส่ง */
    fileTooLargeClient: string;
    /** รหัส error ที่ api/internship/route.ts ตอบกลับมา */
    file_too_large: string;
    file_type_not_allowed: string;
    missing_fields: string;
    /** ปลายทางล่มหรือปฏิเสธ — ต้องบอกช่องทางสำรอง (LINE) เสมอ */
    failed: string;
    networkError: string;
  };
  success: { title: string; body: string; again: string };
};

export type InternshipContent = {
  htmlLang: string;
  meta: { title: string; description: string; ogDescription: string };
  crumb: { home: string; homeHref: string; current: string };
  hero: { eyebrow: string; h1Line1: string; h1Line2: string; lead: string; chips: string[] };
  learn: {
    eyebrow: string;
    title: string;
    lead: string;
    points: { title: string; desc: string }[];
  };
  directory: {
    eyebrow: string;
    title: string;
    lead: string;
    statInterns: string;
    statCohorts: string;
    statUniversities: string;
    /** {year} = ปีของรุ่น (แปลงจาก พ.ศ. ด้วย yearOffset แล้ว) */
    cohortHeading: string;
    /** บวกกับปี พ.ศ. ใน lib/interns.ts ก่อนแสดง — ไทย 0, อังกฤษ -543 เป็น ค.ศ. */
    yearOffset: number;
    /** {n} = จำนวนคน */
    countOne: string;
    countOther: string;
    /** {name} {year} */
    photoAlt: string;
    emptyTitle: string;
    emptyBody: string;
  };
  apply: {
    eyebrow: string;
    title: string;
    lead: string;
    /** ประกอบเป็น chatBefore + ' ' + <Link>LINE @icacc</Link> + ' ' + chatAfter */
    chatBefore: string;
    chatAfter: string;
  };
  form: InternshipFormCopy;
};

const th: InternshipContent = {
  htmlLang: 'th',
  meta: {
    title: 'รับนักศึกษาฝึกงานบัญชี เชียงใหม่ | IC Accounting',
    description:
      'IC Accounting & Service รับนักศึกษาฝึกงานสาขาบัญชีในเชียงใหม่ ได้ทำงานกับเอกสารลูกค้าจริง ใช้โปรแกรมบัญชีออนไลน์ และมีพี่เลี้ยงดูแลตลอดการฝึก พร้อมทำเนียบนักศึกษาฝึกงานแต่ละรุ่น',
    ogDescription:
      'ฝึกงานบัญชีกับสำนักงานบัญชีเชียงใหม่ที่ดูแลธุรกิจกว่า 100 ราย ได้ทำงานจริง มีพี่เลี้ยง และใช้โปรแกรมบัญชีออนไลน์',
  },
  crumb: { home: 'หน้าแรก', homeHref: '/', current: 'นักศึกษาฝึกงาน' },
  hero: {
    eyebrow: 'Internship Program',
    h1Line1: 'รับนักศึกษาฝึกงานบัญชี',
    h1Line2: 'ที่ได้ลงมือทำงานจริง',
    lead:
      'เราเปิดรับนักศึกษาสาขาบัญชีเข้าฝึกประสบการณ์วิชาชีพทุกปี โดยให้ทำงานกับเอกสารของลูกค้าจริง มีพี่เลี้ยงดูแล และได้เห็นงานบัญชีครบทั้งวงจร ไม่ใช่แค่ถ่ายเอกสารหรือนั่งดูคนอื่นทำ',
    chips: ['ทำงานกับลูกค้าจริง', 'มีพี่เลี้ยงประจำ', 'ใช้โปรแกรมบัญชีออนไลน์', 'ออฟฟิศดอยสะเก็ด'],
  },
  learn: {
    eyebrow: 'What You Will Learn',
    title: 'ฝึกงานที่นี่ได้ทำอะไรบ้าง',
    lead:
      'เราออกแบบการฝึกงานจากงานที่สำนักงานทำจริงทุกวัน เพื่อให้สิ่งที่นักศึกษาได้กลับไปใช้ต่อได้จริงในการทำงาน',
    // เขียนจากงานที่สำนักงานทำจริง ไม่ใช่คำกว้างๆ แบบ "ได้ประสบการณ์"
    points: [
      {
        title: 'ทำงานกับเอกสารของลูกค้าจริง',
        desc: 'จัดเรียงและตรวจสอบเอกสารรายรับ-รายจ่าย ใบกำกับภาษี และเอกสารประกอบการลงบัญชีของธุรกิจจริง ไม่ใช่โจทย์สมมติ',
      },
      {
        title: 'ใช้โปรแกรมบัญชีออนไลน์',
        desc: 'ได้ลงมือใช้โปรแกรมบัญชีบนระบบ Cloud ที่สำนักงานใช้กับลูกค้า พร้อมการอบรมการใช้งานตั้งแต่เริ่มต้น',
      },
      {
        title: 'เห็นงานภาษีรายเดือนครบวงจร',
        desc: 'เรียนรู้การจัดทำและยื่น ภ.พ.30 ภ.ง.ด.1 3 53 และการนำส่งเงินสมทบประกันสังคม ตามรอบเวลาจริงของแต่ละเดือน',
      },
      {
        title: 'มีพี่เลี้ยงดูแลตลอดการฝึก',
        desc: 'มีผู้ทำบัญชีประจำเป็นพี่เลี้ยง คอยตอบคำถามและตรวจงาน เพื่อให้เข้าใจเหตุผลเบื้องหลังทุกขั้นตอน ไม่ใช่แค่ทำตาม',
      },
      {
        title: 'ได้เห็นธุรกิจหลายประเภท',
        desc: 'ลูกค้าของเรามีทั้งร้านอาหาร ที่พัก โรงงาน และธุรกิจบริการ จึงได้เห็นความต่างของงานบัญชีในแต่ละอุตสาหกรรม',
      },
      {
        title: 'ได้รู้จักงานนอกตำรา',
        desc: 'งานจดทะเบียนธุรกิจ งานวีซ่าและใบอนุญาตทำงาน และการวางระบบบัญชีให้ลูกค้า ซึ่งเป็นงานที่ไม่ได้เรียนในห้องเรียน',
      },
    ],
  },
  directory: {
    eyebrow: 'Hall of Interns',
    title: 'ทำเนียบนักศึกษาฝึกงาน',
    lead:
      'ขอบคุณนักศึกษาทุกคนที่เลือกมาฝึกประสบการณ์กับเรา และขอบคุณสถาบันที่ไว้วางใจส่งนักศึกษามาให้เราดูแล',
    statInterns: 'นักศึกษาที่ฝึกงานกับเรา',
    statCohorts: 'รุ่นที่ผ่านมา',
    statUniversities: 'สถาบันที่ร่วมงาน',
    cohortHeading: 'รุ่นปี {year}',
    yearOffset: 0,
    countOne: '{n} คน',
    countOther: '{n} คน',
    photoAlt: '{name} นักศึกษาฝึกงาน IC Accounting & Service รุ่นปี {year}',
    emptyTitle: 'กำลังรวบรวมข้อมูลนักศึกษาแต่ละรุ่น',
    emptyBody:
      'เรากำลังจัดทำทำเนียบนักศึกษาที่เคยฝึกประสบการณ์กับเรา หากคุณเป็นนักศึกษาที่สนใจเข้าฝึกงานกับ IC สามารถทักมาคุยกันได้เลย',
  },
  apply: {
    eyebrow: 'Apply Now',
    title: 'สมัครฝึกงานกับเรา',
    lead:
      'กรอกข้อมูลและแนบ Portfolio หรือ Resume ได้เลย ทีมงานจะตรวจสอบและติดต่อกลับทางอีเมลหรือเบอร์โทรที่ให้ไว้ ทั้งนักศึกษาที่สมัครเองและอาจารย์นิเทศที่สมัครแทน',
    chatBefore: 'สะดวกคุยทางแชทมากกว่า? ทักมาที่',
    chatAfter: 'ได้เลย · สำนักงานอยู่ที่ 80/142 ต.สันปู่เลย อ.ดอยสะเก็ด เชียงใหม่ · จันทร์ – เสาร์ 09:00 – 18:00 น.',
  },
  form: {
    name: 'ชื่อ - นามสกุล',
    university: 'ชื่อสถาบันการศึกษา',
    major: 'คณะ / สาขา',
    level: 'ระดับการศึกษา',
    levelPlaceholder: 'เช่น ปริญญาตรี ชั้นปีที่ 3',
    email: 'อีเมล',
    phone: 'เบอร์โทรศัพท์',
    startDate: 'ระยะเวลาฝึกงานเริ่มต้น',
    endDate: 'ระยะเวลาฝึกงานสิ้นสุด',
    fileLabel: 'แนบ Portfolio หรือ Resume',
    filePick: 'เลือกไฟล์ที่ต้องการแนบ',
    fileHint: `รองรับไฟล์ PDF, Word หรือรูปภาพ ขนาดไม่เกิน ${MB}MB`,
    heardLegend: 'ทราบข้อมูลของบริษัทนี้จากแหล่งใด',
    heardSelf: 'ทราบข้อมูลด้วยตัวเอง',
    heardOther: 'ทราบข้อมูลจาก',
    heardOtherPlaceholder: 'เช่น อาจารย์แนะนำ รุ่นพี่ที่เคยฝึกงาน หรือค้นเจอใน Google',
    reason: 'เหตุผลที่ต้องการฝึกงานกับบริษัทเรา',
    submit: 'ส่งใบสมัครฝึกงาน',
    submitting: 'กำลังส่ง...',
    privacy:
      'ข้อมูลที่กรอกจะถูกใช้เพื่อพิจารณารับนักศึกษาฝึกงานเท่านั้น และจะไม่ถูกเผยแพร่หรือส่งต่อให้บุคคลภายนอก',
    errors: {
      fileTooLargeClient: `ไฟล์ใหญ่เกิน ${MB}MB กรุณาบีบอัดหรือส่งไฟล์ที่เล็กลง`,
      file_too_large: `ไฟล์ใหญ่เกิน ${MB}MB`,
      file_type_not_allowed: 'รองรับเฉพาะไฟล์ PDF, Word และรูปภาพ',
      missing_fields: 'กรุณากรอกชื่อและอีเมล',
      failed: 'ส่งใบสมัครไม่สำเร็จ กรุณาลองใหม่ หรือติดต่อเราทาง LINE @icacc',
      networkError: 'เชื่อมต่อไม่สำเร็จ กรุณาลองใหม่ หรือติดต่อเราทาง LINE @icacc',
    },
    success: {
      title: 'ได้รับใบสมัครแล้ว',
      body: 'ขอบคุณที่สนใจฝึกงานกับ IC Accounting & Service ทีมงานจะตรวจสอบข้อมูลและติดต่อกลับทางอีเมลหรือเบอร์โทรที่ให้ไว้',
      again: 'ส่งใบสมัครอีกครั้ง',
    },
  },
};

const en: InternshipContent = {
  htmlLang: 'en',
  meta: {
    title: 'Accounting Internships in Chiang Mai | IC Accounting',
    description:
      'IC Accounting & Service takes accounting students as interns in Chiang Mai. Interns work with real client documents, use online accounting software and have a mentor throughout the placement. See our directory of interns by cohort.',
    ogDescription:
      'An accounting internship with a Chiang Mai accounting firm that looks after more than 100 businesses: real work, a mentor, and online accounting software.',
  },
  crumb: { home: 'Home', homeHref: '/en', current: 'Internships' },
  hero: {
    eyebrow: 'Internship Program',
    h1Line1: 'Accounting internships',
    h1Line2: 'where you do real work',
    lead:
      'Every year we take accounting students for their professional work placement. Interns work with real client documents, have a mentor looking after them, and see the full accounting cycle — not just photocopying or watching other people work.',
    chips: ['Work with real clients', 'A dedicated mentor', 'Online accounting software', 'Office in Doi Saket'],
  },
  learn: {
    eyebrow: 'What You Will Learn',
    title: 'What you will do here',
    lead:
      'We built the internship around the work our office does every day, so that what students take away is something they can really use in their working life.',
    points: [
      {
        title: 'Work with real client documents',
        desc: 'Sort and check income and expense records, tax invoices and other supporting documents for the books of real businesses — not made-up exercises.',
      },
      {
        title: 'Use online accounting software',
        desc: 'Get hands-on with the cloud accounting software the office uses for its clients, with training from the very start.',
      },
      {
        title: 'See the full monthly tax cycle',
        desc: 'Learn how to prepare and file the VAT return (PP.30) and withholding tax returns (PND.1, 3, 53), and how social security contributions are paid, on each month’s real deadlines.',
      },
      {
        title: 'A mentor for your whole internship',
        desc: 'One of our staff accountants acts as your mentor, answering questions and checking your work so you understand the reason behind every step, rather than just following instructions.',
      },
      {
        title: 'See many kinds of business',
        desc: 'Our clients include restaurants, accommodation, factories and service businesses, so you see how accounting work differs from one industry to another.',
      },
      {
        title: 'Learn what the textbooks leave out',
        desc: 'Business registration, visas and work permits, and setting up accounting systems for clients — work that is not taught in the classroom.',
      },
    ],
  },
  directory: {
    eyebrow: 'Hall of Interns',
    title: 'Our interns',
    lead:
      'Thank you to every student who chose to gain experience with us, and to the institutions that trusted us to look after their students.',
    statInterns: 'Students who have interned with us',
    statCohorts: 'Past cohorts',
    statUniversities: 'Partner institutions',
    cohortHeading: 'Class of {year}',
    yearOffset: -543,
    countOne: '{n} intern',
    countOther: '{n} interns',
    photoAlt: '{name}, IC Accounting & Service intern, class of {year}',
    emptyTitle: 'We are putting together our intern directory',
    emptyBody:
      'We are compiling a directory of the students who have trained with us. If you are a student interested in an internship at IC, feel free to get in touch.',
  },
  apply: {
    eyebrow: 'Apply Now',
    title: 'Apply for an internship',
    lead:
      'Fill in your details and attach your portfolio or resume. Our team will review your application and get back to you by the email or phone number you provide. Students can apply themselves, or a supervising lecturer can apply on their behalf.',
    chatBefore: 'Prefer to chat? Message us on',
    chatAfter: '· Our office: 80/142 Tambon San Pu Loei, Doi Saket, Chiang Mai · Monday – Saturday, 09:00 – 18:00',
  },
  form: {
    name: 'Full name',
    university: 'School or university',
    major: 'Faculty / major',
    level: 'Level of study',
    levelPlaceholder: 'e.g. Bachelor’s degree, 3rd year',
    email: 'Email',
    phone: 'Phone number',
    startDate: 'Internship start date',
    endDate: 'Internship end date',
    fileLabel: 'Attach your portfolio or resume',
    filePick: 'Choose a file to attach',
    fileHint: `PDF, Word or image files, up to ${MB}MB`,
    heardLegend: 'How did you hear about us?',
    heardSelf: 'I found you myself',
    heardOther: 'I heard about you from',
    heardOtherPlaceholder: 'e.g. a lecturer, a former intern, or a Google search',
    reason: 'Why do you want to intern with us?',
    submit: 'Send application',
    submitting: 'Sending...',
    privacy:
      'The information you provide is used only to consider your internship application. It will not be published or passed on to anyone outside the company.',
    errors: {
      fileTooLargeClient: `The file is larger than ${MB}MB. Please compress it or send a smaller file.`,
      file_too_large: `The file is larger than ${MB}MB.`,
      file_type_not_allowed: 'Only PDF, Word and image files are accepted.',
      missing_fields: 'Please enter your name and email.',
      failed: 'We could not send your application. Please try again, or contact us on LINE @icacc.',
      networkError: 'Could not connect. Please try again, or contact us on LINE @icacc.',
    },
    success: {
      title: 'Application received',
      body: 'Thank you for your interest in an internship with IC Accounting & Service. Our team will review your details and contact you by the email or phone number you provided.',
      again: 'Send another application',
    },
  },
};

export const internshipContent = { th, en } as const;
