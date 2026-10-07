import {
  VISA_TOTAL_FEE,
  VISA_INSTALLMENTS,
  VISA_RENEWAL_FEE,
  VISA_RENEWAL_BREAKDOWN,
  EMPLOYER_REQUIREMENTS,
  baht,
} from '@/lib/visa-pricing';

/**
 * เนื้อหาหน้า Visa & Work Permit ทั้งสองภาษา
 *
 * ── ทำไมเก็บรวมไว้ในไฟล์เดียว ──
 * หน้าไทยกับหน้าอังกฤษใช้เทมเพลตเดียวกัน (visa-page-template.tsx)
 * ดีไซน์ ลำดับหัวข้อ และจำนวนการ์ดจึงเหมือนกันโดยโครงสร้าง ไม่ใช่เพราะคนเขียนจำได้
 * สิ่งเดียวที่ต่างกันคือข้อความในไฟล์นี้
 *
 * TypeScript บังคับให้ทั้งสองภาษามีคีย์ครบเท่ากัน ถ้าเพิ่มหัวข้อใหม่ให้ภาษาเดียว
 * จะ build ไม่ผ่านทันที ไม่ใช่ปล่อยให้หน้าหนึ่งมีอีกหน้าไม่มีแล้วค่อยมาเจอทีหลัง
 *
 * ── ตัวเลข ──
 * ดึงจาก src/lib/visa-pricing.ts ทั้งหมด ห้ามพิมพ์ตัวเลขลงตรงนี้
 * เพราะต้องตรงกันทั้งสองภาษาเสมอ และเป็นเงื่อนไขตามกฎหมายที่ผิดไม่ได้
 */

export type VisaContent = {
  htmlLang: string;
  meta: { title: string; description: string };
  crumb: { home: string; current: string };
  hero: {
    badge: string;
    h1Before: string;
    h1Highlight: string;
    h1After: string;
    lead: string;
    kws: string;
    btnProcess: string;
    btnLine: string;
    btnServices: string;
    stats: { b: string; span: string }[];
  };
  services: {
    eyebrow: string;
    title: string;
    sublead: string;
    cards: { h3: string; p: string; kw: string }[];
  };
  why: { eyebrow: string; h2: string; p: string; rows: { h3: string; p: string }[] };
  process: {
    eyebrow: string;
    title: string;
    sublead: string;
    facts: { b: string; span: string }[];
    factNote: string;
    steps: { h3: string; bullets: string[]; when?: string; pay?: string }[];
    calloutLabel: string;
    calloutText: string;
    timelineCaption: string;
    timelineHead: [string, string, string];
    timelineRows: { stage: string; sub?: string; duration: string; authority: string }[];
    timelineTotal: { label: string; value: string };
  };
  fees: {
    eyebrow: string;
    title: string;
    sublead: string;
    head: [string, string, string];
    rows: { label: string; when: string; amount: string }[];
    totalRow: { label: string; when: string; amount: string };
    renewHead: [string, string];
    renewRows: { label: string; amount: string }[];
    renewTotal: { label: string; amount: string };
    note: string;
  };
  docs: {
    eyebrow: string;
    title: string;
    sublead: string;
    companyTitle: string;
    companyCount: string;
    companyNote: string;
    companyItems: { t: string; d: string }[];
    applicantTitle: string;
    applicantCount: string;
    applicantNote: string;
    applicantItems: { t: string; d: string }[];
    guideBefore: string;
    guideLink: string;
  };
  notes: {
    eyebrow: string;
    title: string;
    sublead: string;
    items: { h3: string; p: string; warn?: boolean }[];
    disclaimer: string;
  };
  whoFor: { eyebrow: string; title: string; sublead: string; rows: { h3: string; p: string }[] };
  faq: {
    eyebrow: string;
    title: string;
    items: { q: string; a: string }[];
    footerBefore: string;
    footerLink: string;
  };
  office: {
    eyebrow: string;
    title: string;
    sublead: string;
    ratingLabel: string;
    reviewsLabel: string;
    imgAlt: string;
    companyName: string;
    address: string;
    mapsText: string;
    contactTitle: string;
    phoneLabel: string;
    lineLabel: string;
    emailLabel: string;
    hoursTitle: string;
    hours: string;
    hoursNote: string;
  };
  cta: { h2: string; p: string; btnLine: string; btnQuote: string };
};

const en: VisaContent = {
  htmlLang: 'en',
  meta: {
    title: 'Work Permit & Non-B Visa Chiang Mai — Cost & Process | IC',
    description: `Chiang Mai work permit and Non-B visa handled end to end for THB ${baht(VISA_TOTAL_FEE)} including government fees, paid in three stages. English-speaking accountants, 3–5 months start to finish.`,
  },
  crumb: { home: 'Home', current: 'IC Visa / Work Permit' },
  hero: {
    badge: 'A sub-brand of IC Accounting & Service · Chiang Mai, Thailand',
    h1Before: 'Work permit and visa services in ',
    h1Highlight: 'Chiang Mai',
    h1After: '.',
    lead: 'Non-B business visas, work permits and company registration — handled end to end by an English-speaking accounting team in Chiang Mai that also keeps your Thai books and tax filings in order.',
    kws: 'For foreigners working, hiring or starting a business in Chiang Mai — whether you already have a Thai company or need one set up first.',
    btnProcess: 'See the full process & fees',
    btnLine: 'Talk to us on LINE',
    btnServices: 'Explore services',
    stats: [
      { b: '10+ yrs', span: 'Serving Chiang Mai' },
      { b: 'English', span: 'Speaking team' },
      { b: 'All-in-one', span: 'Visa + accounting + tax' },
    ],
  },
  services: {
    eyebrow: 'Our Services',
    title: 'Everything a foreigner needs in Chiang Mai',
    sublead:
      'From your first Thai visa to a fully compliant company — work permit, business visa (Non-B), company registration and tax, all in Chiang Mai.',
    cards: [
      { h3: 'Thai Visa', p: 'Non-B, tourist-to-work conversion, retirement, LTR and SMART visa — applications and renewals.', kw: 'Non-B · Retirement · LTR · SMART' },
      { h3: 'Work Permit', p: 'New permits, renewals, employer changes and 90-day reporting handled end to end.', kw: 'New · Renewal · 90-day reports' },
      { h3: 'Company Registration', p: 'Register a Thai Limited Company, VAT, social security and shareholder structuring for foreigners.', kw: 'Thai Limited · VAT · Social security' },
      { h3: 'Thai Tax', p: 'Personal and corporate tax filing, bookkeeping and monthly compliance for foreign-owned businesses.', kw: 'Bookkeeping · Monthly filing · Year-end' },
      { h3: 'BOI', p: 'Board of Investment promotion — eligibility, application and the visa and work-permit privileges it unlocks.', kw: 'Eligibility · Application · Visa privileges' },
      { h3: 'Foreign Business', p: 'Foreign Business License, US Amity Treaty, and structures for majority foreign ownership.', kw: 'FBL · US Amity Treaty · Ownership' },
      { h3: 'Living in Chiang Mai', p: 'Practical settling-in help — bank accounts, driving licence, TM.30 and everyday admin.', kw: 'Bank account · Driving licence · TM.30' },
    ],
  },
  why: {
    eyebrow: 'Why work with IC',
    h2: 'More than a visa agent — your local partner.',
    p: 'Most agencies stop at the paperwork. We run your accounting and tax too, so every visa renewal, work permit and audit lines up perfectly, year after year.',
    rows: [
      { h3: 'We speak your language', p: 'A fluent English-speaking team liaises with Thai officials for you — no misunderstandings.' },
      { h3: 'Visa + accounting in one', p: 'Your permit depends on company financials. We handle both, so renewals stay smooth.' },
      { h3: 'Chiang Mai experts', p: 'First-hand knowledge of the local immigration and labour offices — faster, predictable results.' },
      { h3: '100% compliant', p: 'Documents checked in detail to minimise rejections and keep you fully within Thai law.' },
    ],
  },
  process: {
    eyebrow: 'The process',
    title: 'How a Chiang Mai work permit actually works',
    sublead:
      'Six steps, in order, from document preparation to collection — around three to five months end to end. We run every stage for you.',
    facts: [
      { b: `${baht(EMPLOYER_REQUIREMENTS.paidUpCapitalPerForeigner)}฿`, span: 'paid-up registered capital required per foreign employee' },
      { b: `${EMPLOYER_REQUIREMENTS.thaiEmployeesPerForeigner} : 1`, span: 'Thai employees registered with Social Security per foreigner' },
      { b: `${baht(EMPLOYER_REQUIREMENTS.minimumSalary.min)}–${baht(EMPLOYER_REQUIREMENTS.minimumSalary.max)}฿`, span: 'minimum monthly salary, varies by nationality (Immigration Bureau criteria)' },
    ],
    factNote:
      'These are your employer’s eligibility requirements. We check them before anything else — and they must stay in place for as long as the permit is valid.',
    steps: [
      {
        h3: 'Prepare all required documents',
        bullets: [
          'Two sets: company documents and applicant documents — the full checklist is below.',
          'We verify the registered capital and the Thai-employee ratio before anything is filed.',
        ],
        when: '1–2 weeks',
      },
      {
        h3: 'Obtain WP.3 pre-approval, then apply for the Non-B visa',
        bullets: [
          'As your employer’s representative we file the WP.3 (Tor.Tor.3) at the Provincial Employment Office to obtain the pre-approval letter.',
          'You then apply for the Non-B visa at a Royal Thai Embassy or Consulate abroad, or through the Thai e-Visa system.',
        ],
        when: '2–4 weeks',
        pay: `Installment 1 — ${baht(VISA_INSTALLMENTS.onSubmission)}฿`,
      },
      {
        h3: 'Enter Thailand — you receive a 90-day permission to stay',
        bullets: [
          'Complete the Thailand Digital Arrival Card (TDAC) before every entry.',
          'Your landlord or house owner must file the TM.30 within 24 hours of you taking up residence.',
        ],
      },
      {
        h3: 'Apply for the work permit within 90 days of entry',
        bullets: [
          'Filed at the Chiang Mai Provincial Employment Office with the original company and applicant documents.',
          'A medical certificate issued by a Thai hospital is required at this stage.',
          'Permits are now issued through the e-Work Permit (digital) system.',
        ],
        when: '7–15 working days',
        pay: `Installment 2 — ${baht(VISA_INSTALLMENTS.onPermitCollection)}฿`,
      },
      {
        h3: 'Extend your permission to stay to 12 months',
        bullets: [
          'Filed at Chiang Mai Immigration before your 90-day stay expires — we recommend starting 30 to 45 days ahead.',
          'The work permit from step 4 is the key supporting document, together with your tax and Social Security evidence.',
        ],
        when: '1–30 days',
        pay: `Installment 3 — ${baht(VISA_INSTALLMENTS.onExtension)}฿`,
      },
      {
        h3: 'Process complete — your annual obligations begin',
        bullets: [
          '90-day address reporting, annual visa and work permit renewal, and personal income tax filing.',
          'We keep all three on schedule alongside your company’s accounts.',
        ],
      },
    ],
    calloutLabel: 'Important:',
    calloutText:
      'the Non-B visa alone does not authorise work. You may only start working once the work permit has been issued — otherwise fines and deportation apply.',
    timelineCaption: 'Estimated timeline for a Chiang Mai work permit',
    timelineHead: ['Stage', 'Duration', 'Authority'],
    timelineRows: [
      { stage: 'Document preparation', duration: '1–2 weeks', authority: 'Employer + IC Accounting' },
      { stage: 'WP.3 pre-approval', sub: 'Tor.Tor.3', duration: '7–15 working days', authority: 'Provincial Employment Office' },
      { stage: 'Non-B visa issuance', duration: '5–10 working days', authority: 'Royal Thai Embassy / Consulate' },
      { stage: 'Work permit', duration: '7–15 working days', authority: 'Department of Employment' },
      { stage: '12-month extension of stay', duration: '1–30 days', authority: 'Immigration Bureau' },
    ],
    timelineTotal: { label: 'Total end to end', value: 'Approximately 3–5 months' },
  },
  fees: {
    eyebrow: 'Service fees',
    title: 'What it costs, paid in three stages',
    sublead:
      'Our service fee includes the government fees at each stage. You pay as the process moves forward — never everything up front.',
    head: ['Installment', 'When it is due', 'Amount'],
    rows: [
      { label: 'Installment 1', when: 'On submission of the Non-B visa application', amount: `${baht(VISA_INSTALLMENTS.onSubmission)}฿` },
      { label: 'Installment 2', when: 'On the day the work permit is collected', amount: `${baht(VISA_INSTALLMENTS.onPermitCollection)}฿` },
      { label: 'Installment 3', when: 'On the 12-month extension of stay', amount: `${baht(VISA_INSTALLMENTS.onExtension)}฿` },
    ],
    totalRow: { label: 'Total', when: 'Service fee including government fees', amount: `${baht(VISA_TOTAL_FEE)}฿` },
    renewHead: ['Annual renewal', 'Per year'],
    renewRows: [
      { label: 'Extension of stay — 12 months', amount: `${baht(VISA_RENEWAL_BREAKDOWN.extensionOfStay)}฿` },
      { label: 'Work permit renewal', amount: `${baht(VISA_RENEWAL_BREAKDOWN.workPermit)}฿` },
    ],
    renewTotal: { label: 'Total per year', amount: `${baht(VISA_RENEWAL_FEE)}฿` },
    note:
      'Re-entry permits are paid separately and in cash by the applicant at Immigration or the airport — 1,000฿ single entry, 3,800฿ multiple (around 1,200฿ at the airport).',
  },
  docs: {
    eyebrow: 'What to prepare',
    title: 'Your work permit document checklist',
    sublead:
      'Two sets of documents. Most of the company side comes straight out of your accounts and tax filings — which is exactly the half we already look after.',
    companyTitle: 'Part 1 · Company documents',
    companyCount: '12 items',
    companyNote: 'From the sponsoring Thai company',
    companyItems: [
      { t: 'Company Affidavit / Certificate of Registration', d: 'Issued within the last 6 months' },
      { t: 'Memorandum of Association', d: 'Plus all amendment records' },
      { t: 'List of Shareholders', d: 'Bor.Or.Jor.5' },
      { t: 'Latest audited financial statements', d: 'Certified by a licensed auditor' },
      { t: 'PND.50 / PND.51', d: 'Annual and half-year corporate income tax returns' },
      { t: 'PND.1 and PP.30, last 3 months', d: 'Withholding tax and VAT returns' },
      { t: 'SorPorSor.1-10', d: 'Monthly Social Security contribution filings' },
      { t: 'VAT registration certificate', d: 'Por.Por.20 and Por.Por.01' },
      { t: 'Office map and photographs', d: 'Signage, interior and exterior' },
      { t: 'Authorised director’s ID', d: 'ID card and house registration' },
      { t: 'Letter of Employment / Appointment', d: 'Including the job description' },
      { t: 'Employment Contract', d: 'Stating position, salary and workplace' },
    ],
    applicantTitle: 'Part 2 · Applicant documents',
    applicantCount: '8 items',
    applicantNote: 'From you, the foreign applicant',
    applicantItems: [
      { t: 'Original passport', d: 'At least 6 months validity, plus copies of every stamped page' },
      { t: 'Six photos, 3×4 cm', d: 'White background, taken within the last 6 months' },
      { t: 'Educational proof', d: 'Degree certificate or transcript' },
      { t: 'Proof of work experience', d: 'CV or résumé' },
      { t: 'Reference letters', d: 'From previous employers, if any' },
      { t: 'Medical certificate', d: 'From a Thai hospital, for the work permit stage' },
      { t: 'TM.6 form and proof of residence', d: 'Lease agreement or TM.30' },
      { t: 'Certified translations', d: 'All foreign-language documents must be translated and certified as required' },
    ],
    guideBefore: 'Want every detail? Read our full guide ',
    guideLink: 'Work Permit เชียงใหม่ (in Thai)',
  },
  notes: {
    eyebrow: 'Important notes',
    title: 'Obligations that continue after the permit',
    sublead:
      'A work permit is not a one-off. These are the rules that decide whether next year’s renewal goes through — we track every one of them for you.',
    items: [
      { h3: 'Re-entry permit before every departure', p: 'Without one, your permission to stay is cancelled the moment you leave. Official fee 1,000฿ single or 3,800฿ multiple (around 1,200฿ at the airport), cash, paid in person at Immigration or the airport.', warn: true },
      { h3: '90-day reporting', p: 'You must report your address to Immigration every 90 days — online, by post or in person. Free of charge when filed on time.' },
      { h3: 'TM.30 after every move and re-entry', p: 'Your house owner or landlord must notify Immigration of your residence within 24 hours, every time you move or return to Thailand.' },
      { h3: 'The permit is tied to one employer and role', p: 'It covers a specific employer, position and workplace. Any change requires an amendment or an entirely new permit.', warn: true },
      { h3: 'Personal income tax', p: 'Work permit holders must file an annual PND.91 return. Proof of tax paid is essential evidence for the following year’s visa renewal.' },
      { h3: 'Start renewals early', p: 'Begin the work permit renewal 60 days ahead, and the visa extension 30 to 45 days before expiry.' },
      { h3: 'Your employer must stay eligible', p: `${baht(EMPLOYER_REQUIREMENTS.paidUpCapitalPerForeigner)}฿ registered capital and ${EMPLOYER_REQUIREMENTS.thaiEmployeesPerForeigner} Thai Social Security-registered employees per foreigner must hold throughout the permit’s validity, or renewal may be refused.`, warn: true },
      { h3: 'Some occupations are reserved for Thai nationals', p: 'Certain jobs are restricted by law. Confirm the intended position with us before starting the process.', warn: true },
    ],
    disclaimer:
      'This page is for general guidance only. Government fees, processing times and requirements are subject to change by the relevant authorities — please confirm current details with our team before proceeding. Last updated: July 2026.',
  },
  whoFor: {
    eyebrow: 'Who we work with',
    title: 'Is this you?',
    sublead: 'Every situation below is one we handle week in, week out in Chiang Mai.',
    rows: [
      { h3: 'Employees hired by a Thai company', p: 'You have a job offer in Chiang Mai and need a Non-B visa plus a work permit before you can legally start.' },
      { h3: 'Owners setting up a Thai company', p: 'You are registering a Thai Limited Company and need the structure, VAT and social security done right from day one.' },
      { h3: 'Teachers and school staff', p: 'Schools and language centres in Chiang Mai sponsor your permit — the paperwork still has to match the school’s filings.' },
      { h3: 'Retirees and long-stay residents', p: 'Retirement, LTR and SMART visa applications and renewals, kept on schedule year after year.' },
      { h3: 'Foreign-owned businesses', p: 'Bookkeeping, monthly filings and year-end accounts that keep your permit renewals straightforward.' },
      { h3: 'People who just arrived', p: 'Bank account, driving licence and TM.30 — the everyday admin nobody explains to you.' },
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Common questions from expats',
    items: [
      { q: 'Can I convert my tourist visa to a work visa in Chiang Mai?', a: 'Yes — in most cases we convert a tourist or visa-exempt entry to a Non-B business visa inside Thailand, then process your work permit. We handle the paperwork and appointments.' },
      { q: 'How long does a work permit in Chiang Mai take?', a: 'The Department of Employment takes 7 to 15 working days to issue the permit once your documents are in order. End to end — document preparation, WP.3 pre-approval, the Non-B visa, the permit itself and the 12-month extension of stay — allow roughly three to five months.' },
      { q: 'How much does a Non-B visa and work permit cost?', a: `Our service fee is ${baht(VISA_TOTAL_FEE)} THB including government fees, paid in three installments: ${baht(VISA_INSTALLMENTS.onSubmission)} on submission of the Non-B visa application, ${baht(VISA_INSTALLMENTS.onPermitCollection)} on the day the work permit is collected, and ${baht(VISA_INSTALLMENTS.onExtension)} at the 12-month extension of stay. Renewal from the second year is ${baht(VISA_RENEWAL_FEE)} THB per year.` },
      { q: 'What does my employer need to qualify to sponsor me?', a: `${baht(EMPLOYER_REQUIREMENTS.paidUpCapitalPerForeigner)} THB of paid-up registered capital per foreign employee, ${EMPLOYER_REQUIREMENTS.thaiEmployeesPerForeigner} Thai employees registered with Social Security per foreigner, and a minimum monthly salary of ${baht(EMPLOYER_REQUIREMENTS.minimumSalary.min)} to ${baht(EMPLOYER_REQUIREMENTS.minimumSalary.max)} THB depending on your nationality. These conditions must be maintained for as long as the permit is valid.` },
      { q: 'Do I need a Thai company to get a work permit?', a: 'Usually yes — you need a sponsoring employer. We can register your Thai company and sponsor the work permit in one package.' },
      { q: 'Can foreigners own 100% of a Thai business?', a: 'In specific cases — via BOI promotion, a US Amity Treaty company, or a Foreign Business License. We advise the best route for you.' },
    ],
    footerBefore: 'Don’t have a Thai company yet? ',
    footerLink: 'We can register one for you first',
  },
  office: {
    eyebrow: 'Visit us',
    title: 'Our office in Chiang Mai',
    sublead:
      'We are a licensed Thai accounting firm, not a visa broker — the same team that files your work permit also keeps your company’s books and tax filings in order.',
    ratingLabel: 'on Google',
    reviewsLabel: 'reviews',
    imgAlt: 'The IC Accounting & Service team at work in our Doi Saket office, Chiang Mai',
    companyName: 'IC Accounting & Service Co., Ltd.',
    address: '80/142 Tambon San Pu Loei, Doi Saket District, Chiang Mai 50220, Thailand',
    mapsText: 'Open in Google Maps',
    contactTitle: 'Talk to us',
    phoneLabel: 'Phone',
    lineLabel: 'LINE',
    emailLabel: 'Email',
    hoursTitle: 'Office hours',
    hours: 'Monday to Saturday, 09:00–18:00',
    hoursNote: 'Appointments outside these hours can be arranged on LINE.',
  },
  cta: {
    h2: 'Ready to sort out your Chiang Mai work permit?',
    p: 'Free, no-obligation consultation in English. Tell us your situation and we will map the right visa and business path for you.',
    btnLine: 'Chat with us on LINE',
    btnQuote: 'Book a free consultation',
  },
};

const th: VisaContent = {
  htmlLang: 'th',
  meta: {
    title: 'Work Permit และวีซ่า Non-B เชียงใหม่ — ค่าบริการและขั้นตอน | IC',
    description: `รับทำใบอนุญาตทำงานและวีซ่า Non-B ที่เชียงใหม่ ครบวงจร ค่าบริการ ${baht(VISA_TOTAL_FEE)} บาท รวมค่าธรรมเนียมราชการ แบ่งจ่าย 3 งวด ดำเนินการโดยสำนักงานบัญชี ใช้เวลา 3–5 เดือน`,
  },
  crumb: { home: 'หน้าแรก', current: 'IC Visa / Work Permit' },
  hero: {
    badge: 'บริการในเครือ IC Accounting & Service · เชียงใหม่',
    h1Before: 'รับทำใบอนุญาตทำงานและวีซ่า ที่',
    h1Highlight: 'เชียงใหม่',
    h1After: '',
    lead: 'วีซ่าธุรกิจ Non-B ใบอนุญาตทำงาน และจดทะเบียนบริษัท ดูแลครบตั้งแต่ต้นจนจบ โดยทีมสำนักงานบัญชีที่ดูแลบัญชีและภาษีของบริษัทคุณอยู่แล้ว',
    kws: 'สำหรับนายจ้างที่ต้องการจ้างชาวต่างชาติ และชาวต่างชาติที่ทำงานหรือตั้งธุรกิจในเชียงใหม่ ไม่ว่าจะมีบริษัทไทยอยู่แล้วหรือต้องจดใหม่',
    btnProcess: 'ดูขั้นตอนและค่าบริการทั้งหมด',
    btnLine: 'ปรึกษาทาง LINE',
    btnServices: 'ดูบริการทั้งหมด',
    stats: [
      { b: 'กว่า 10 ปี', span: 'ประสบการณ์ในเชียงใหม่' },
      { b: 'สองภาษา', span: 'ทีมงานสื่อสารอังกฤษได้' },
      { b: 'ครบในที่เดียว', span: 'วีซ่า + บัญชี + ภาษี' },
    ],
  },
  services: {
    eyebrow: 'บริการของเรา',
    title: 'ครบทุกเรื่องที่ชาวต่างชาติต้องใช้ในเชียงใหม่',
    sublead:
      'ตั้งแต่วีซ่าใบแรกจนถึงบริษัทที่ถูกต้องตามกฎหมายทุกข้อ ทั้งใบอนุญาตทำงาน วีซ่าธุรกิจ Non-B จดทะเบียนบริษัท และภาษี ดูแลครบที่เชียงใหม่',
    cards: [
      { h3: 'วีซ่าไทย', p: 'Non-B เปลี่ยนจากวีซ่าท่องเที่ยวเป็นวีซ่าทำงาน วีซ่าเกษียณ LTR และ SMART Visa ทั้งขอใหม่และต่ออายุ', kw: 'Non-B · เกษียณ · LTR · SMART' },
      { h3: 'ใบอนุญาตทำงาน', p: 'ขอใหม่ ต่ออายุ เปลี่ยนนายจ้าง และรายงานตัว 90 วัน ดูแลให้ตั้งแต่ต้นจนจบ', kw: 'ขอใหม่ · ต่ออายุ · รายงาน 90 วัน' },
      { h3: 'จดทะเบียนบริษัท', p: 'จดบริษัทจำกัด จดภาษีมูลค่าเพิ่ม ขึ้นทะเบียนประกันสังคม และวางโครงสร้างผู้ถือหุ้นสำหรับชาวต่างชาติ', kw: 'บริษัทจำกัด · VAT · ประกันสังคม' },
      { h3: 'ภาษีไทย', p: 'ยื่นภาษีบุคคลธรรมดาและนิติบุคคล ทำบัญชี และดูแลงานรายเดือนให้ธุรกิจที่ชาวต่างชาติถือหุ้น', kw: 'ทำบัญชี · ยื่นรายเดือน · ปิดงบ' },
      { h3: 'BOI', p: 'การส่งเสริมการลงทุนจากคณะกรรมการส่งเสริมการลงทุน ตั้งแต่ตรวจคุณสมบัติ ยื่นคำขอ จนถึงสิทธิด้านวีซ่าและใบอนุญาตทำงานที่ได้รับ', kw: 'ตรวจคุณสมบัติ · ยื่นคำขอ · สิทธิวีซ่า' },
      { h3: 'ธุรกิจต่างด้าว', p: 'ใบอนุญาตประกอบธุรกิจของคนต่างด้าว สนธิสัญญาไมตรีไทย-สหรัฐ และโครงสร้างสำหรับการถือหุ้นข้างมากโดยชาวต่างชาติ', kw: 'FBL · US Amity Treaty · โครงสร้างหุ้น' },
      { h3: 'ใช้ชีวิตในเชียงใหม่', p: 'เรื่องจุกจิกที่ต้องใช้จริง ทั้งเปิดบัญชีธนาคาร ทำใบขับขี่ แจ้ง TM.30 และงานเอกสารประจำวัน', kw: 'บัญชีธนาคาร · ใบขับขี่ · TM.30' },
    ],
  },
  why: {
    eyebrow: 'ทำไมต้องเป็น IC',
    h2: 'มากกว่าตัวแทนทำวีซ่า — เราเป็นพาร์ทเนอร์ในพื้นที่',
    p: 'ตัวแทนส่วนใหญ่จบงานที่เอกสาร แต่เราดูแลบัญชีและภาษีให้ด้วย ทุกครั้งที่ต่อวีซ่า ต่อใบอนุญาตทำงาน หรือถูกตรวจสอบ เอกสารจึงตรงกันหมดทุกปี',
    rows: [
      { h3: 'คุยกับราชการแทนคุณได้', p: 'ทีมงานสื่อสารได้ทั้งไทยและอังกฤษ ติดต่อเจ้าหน้าที่ให้โดยไม่มีความเข้าใจคลาดเคลื่อน' },
      { h3: 'วีซ่าและบัญชีอยู่ทีมเดียวกัน', p: 'ใบอนุญาตทำงานขึ้นอยู่กับงบการเงินของบริษัท เมื่อเราดูแลทั้งสองอย่าง การต่ออายุจึงไม่มีสะดุด' },
      { h3: 'รู้จักหน่วยงานในเชียงใหม่จริง', p: 'คุ้นเคยกับสำนักงานตรวจคนเข้าเมืองและจัดหางานในพื้นที่ ทำให้คาดการณ์เวลาได้แม่นและเร็วกว่า' },
      { h3: 'ถูกต้องตามกฎหมายทุกข้อ', p: 'ตรวจเอกสารละเอียดก่อนยื่นทุกครั้ง เพื่อลดโอกาสถูกปฏิเสธและให้อยู่ในกรอบกฎหมายไทยเต็มร้อย' },
    ],
  },
  process: {
    eyebrow: 'ขั้นตอน',
    title: 'ขอใบอนุญาตทำงานที่เชียงใหม่ ทำอย่างไรบ้าง',
    sublead:
      'หกขั้นตอนเรียงตามลำดับ ตั้งแต่เตรียมเอกสารจนถึงวันรับใบอนุญาต ใช้เวลาประมาณสามถึงห้าเดือน เราดำเนินการให้ทุกขั้นตอน',
    facts: [
      { b: `${baht(EMPLOYER_REQUIREMENTS.paidUpCapitalPerForeigner)}฿`, span: 'ทุนจดทะเบียนชำระแล้ว ต่อชาวต่างชาติหนึ่งคน' },
      { b: `${EMPLOYER_REQUIREMENTS.thaiEmployeesPerForeigner} : 1`, span: 'พนักงานไทยที่ขึ้นประกันสังคม ต่อชาวต่างชาติหนึ่งคน' },
      { b: `${baht(EMPLOYER_REQUIREMENTS.minimumSalary.min)}–${baht(EMPLOYER_REQUIREMENTS.minimumSalary.max)}฿`, span: 'เงินเดือนขั้นต่ำ แตกต่างตามสัญชาติ (เกณฑ์สำนักงานตรวจคนเข้าเมือง)' },
    ],
    factNote:
      'นี่คือคุณสมบัติของนายจ้าง ไม่ใช่เงื่อนไขของเรา เราตรวจให้ก่อนเป็นอันดับแรก และต้องรักษาไว้ตลอดอายุใบอนุญาต',
    steps: [
      {
        h3: 'เตรียมเอกสารให้ครบทั้งสองชุด',
        bullets: [
          'สองชุดคือเอกสารบริษัทและเอกสารผู้ยื่น รายการเต็มอยู่ด้านล่าง',
          'เราตรวจทุนจดทะเบียนและอัตราส่วนพนักงานไทยให้ก่อนยื่นทุกครั้ง',
        ],
        when: '1–2 สัปดาห์',
      },
      {
        h3: 'ขอหนังสือรับรอง WP.3 แล้วจึงยื่นขอวีซ่า Non-B',
        bullets: [
          'เราในฐานะผู้แทนนายจ้างยื่น WP.3 (ตท.3) ที่สำนักงานจัดหางานจังหวัด เพื่อขอหนังสือรับรองการจ้าง',
          'จากนั้นผู้ยื่นขอวีซ่า Non-B ที่สถานเอกอัครราชทูตหรือสถานกงสุลไทยในต่างประเทศ หรือผ่านระบบ e-Visa',
        ],
        when: '2–4 สัปดาห์',
        pay: `งวดที่ 1 — ${baht(VISA_INSTALLMENTS.onSubmission)}฿`,
      },
      {
        h3: 'เดินทางเข้าประเทศไทย ได้รับอนุญาตให้อยู่ 90 วัน',
        bullets: [
          'กรอกบัตรขาเข้าดิจิทัล (TDAC) ก่อนเข้าประเทศทุกครั้ง',
          'เจ้าบ้านหรือผู้ให้เช่าต้องแจ้ง TM.30 ภายใน 24 ชั่วโมงนับจากวันที่เข้าพัก',
        ],
      },
      {
        h3: 'ยื่นขอใบอนุญาตทำงานภายใน 90 วันนับจากวันเข้าประเทศ',
        bullets: [
          'ยื่นที่สำนักงานจัดหางานจังหวัดเชียงใหม่ พร้อมเอกสารบริษัทและเอกสารผู้ยื่นฉบับจริง',
          'ขั้นตอนนี้ต้องมีใบรับรองแพทย์จากโรงพยาบาลในประเทศไทย',
          'ปัจจุบันออกใบอนุญาตผ่านระบบ e-Work Permit แบบดิจิทัล',
        ],
        when: '7–15 วันทำการ',
        pay: `งวดที่ 2 — ${baht(VISA_INSTALLMENTS.onPermitCollection)}฿`,
      },
      {
        h3: 'ขออยู่ต่อให้ครบ 12 เดือน',
        bullets: [
          'ยื่นที่สำนักงานตรวจคนเข้าเมืองเชียงใหม่ก่อนครบกำหนด 90 วัน แนะนำให้เริ่มล่วงหน้า 30–45 วัน',
          'ใบอนุญาตทำงานจากขั้นที่ 4 คือเอกสารหลัก พร้อมหลักฐานการเสียภาษีและประกันสังคม',
        ],
        when: '1–30 วัน',
        pay: `งวดที่ 3 — ${baht(VISA_INSTALLMENTS.onExtension)}฿`,
      },
      {
        h3: 'เสร็จกระบวนการ แล้วเริ่มหน้าที่รายปี',
        bullets: [
          'รายงานที่อยู่ทุก 90 วัน ต่ออายุวีซ่าและใบอนุญาตทำงานรายปี และยื่นภาษีเงินได้บุคคลธรรมดา',
          'เราดูแลทั้งสามอย่างให้ตรงกำหนด ควบคู่ไปกับบัญชีของบริษัท',
        ],
      },
    ],
    calloutLabel: 'ข้อควรรู้:',
    calloutText:
      'วีซ่า Non-B เพียงอย่างเดียวยังทำงานไม่ได้ ต้องรอให้ใบอนุญาตทำงานออกก่อนจึงเริ่มทำงานได้ ไม่เช่นนั้นมีโทษปรับและถูกส่งกลับ',
    timelineCaption: 'ระยะเวลาโดยประมาณของการขอใบอนุญาตทำงานที่เชียงใหม่',
    timelineHead: ['ขั้นตอน', 'ระยะเวลา', 'หน่วยงาน'],
    timelineRows: [
      { stage: 'เตรียมเอกสาร', duration: '1–2 สัปดาห์', authority: 'นายจ้าง + IC Accounting' },
      { stage: 'ขอหนังสือรับรอง WP.3', sub: 'ตท.3', duration: '7–15 วันทำการ', authority: 'สำนักงานจัดหางานจังหวัด' },
      { stage: 'ออกวีซ่า Non-B', duration: '5–10 วันทำการ', authority: 'สถานทูต / สถานกงสุลไทย' },
      { stage: 'ใบอนุญาตทำงาน', duration: '7–15 วันทำการ', authority: 'กรมการจัดหางาน' },
      { stage: 'ขออยู่ต่อ 12 เดือน', duration: '1–30 วัน', authority: 'สำนักงานตรวจคนเข้าเมือง' },
    ],
    timelineTotal: { label: 'รวมตั้งแต่ต้นจนจบ', value: 'ประมาณ 3–5 เดือน' },
  },
  fees: {
    eyebrow: 'ค่าบริการ',
    title: 'ค่าใช้จ่ายเท่าไหร่ แบ่งจ่าย 3 งวด',
    sublead:
      'ค่าบริการของเรารวมค่าธรรมเนียมราชการในแต่ละขั้นตอนแล้ว ชำระตามความคืบหน้าจริง ไม่ต้องจ่ายทั้งหมดตั้งแต่แรก',
    head: ['งวด', 'ชำระเมื่อ', 'จำนวน'],
    rows: [
      { label: 'งวดที่ 1', when: 'ตอนยื่นขอวีซ่า Non-B', amount: `${baht(VISA_INSTALLMENTS.onSubmission)}฿` },
      { label: 'งวดที่ 2', when: 'วันรับใบอนุญาตทำงาน', amount: `${baht(VISA_INSTALLMENTS.onPermitCollection)}฿` },
      { label: 'งวดที่ 3', when: 'ตอนขออยู่ต่อ 12 เดือน', amount: `${baht(VISA_INSTALLMENTS.onExtension)}฿` },
    ],
    totalRow: { label: 'รวมทั้งหมด', when: 'ค่าบริการรวมค่าธรรมเนียมราชการแล้ว', amount: `${baht(VISA_TOTAL_FEE)}฿` },
    renewHead: ['ต่ออายุรายปี', 'ต่อปี'],
    renewRows: [
      { label: 'ขออยู่ต่อ 12 เดือน', amount: `${baht(VISA_RENEWAL_BREAKDOWN.extensionOfStay)}฿` },
      { label: 'ต่ออายุใบอนุญาตทำงาน', amount: `${baht(VISA_RENEWAL_BREAKDOWN.workPermit)}฿` },
    ],
    renewTotal: { label: 'รวมต่อปี', amount: `${baht(VISA_RENEWAL_FEE)}฿` },
    note:
      'ค่า Re-entry Permit แยกต่างหาก ผู้ยื่นชำระเป็นเงินสดเองที่สำนักงานตรวจคนเข้าเมืองหรือสนามบิน 1,000฿ สำหรับเข้าออกครั้งเดียว และ 3,800฿ สำหรับหลายครั้ง (ที่สนามบินประมาณ 1,200฿)',
  },
  docs: {
    eyebrow: 'สิ่งที่ต้องเตรียม',
    title: 'รายการเอกสารขอใบอนุญาตทำงาน',
    sublead:
      'เอกสารสองชุด ฝั่งบริษัทส่วนใหญ่มาจากบัญชีและแบบยื่นภาษีโดยตรง ซึ่งเป็นครึ่งหนึ่งที่เราดูแลให้อยู่แล้ว',
    companyTitle: 'ชุดที่ 1 · เอกสารบริษัท',
    companyCount: '12 รายการ',
    companyNote: 'จากบริษัทไทยที่เป็นผู้ว่าจ้าง',
    companyItems: [
      { t: 'หนังสือรับรองบริษัท', d: 'อายุไม่เกิน 6 เดือน' },
      { t: 'หนังสือบริคณห์สนธิ', d: 'พร้อมบันทึกการแก้ไขทั้งหมด' },
      { t: 'บัญชีรายชื่อผู้ถือหุ้น', d: 'แบบ บอจ.5' },
      { t: 'งบการเงินฉบับล่าสุด', d: 'ผ่านการตรวจสอบโดยผู้สอบบัญชีรับอนุญาต' },
      { t: 'ภ.ง.ด.50 / ภ.ง.ด.51', d: 'แบบแสดงรายการภาษีเงินได้นิติบุคคลรายปีและครึ่งปี' },
      { t: 'ภ.ง.ด.1 และ ภ.พ.30 ย้อนหลัง 3 เดือน', d: 'ภาษีหัก ณ ที่จ่าย และภาษีมูลค่าเพิ่ม' },
      { t: 'สปส.1-10', d: 'แบบนำส่งเงินสมทบประกันสังคมรายเดือน' },
      { t: 'ใบทะเบียนภาษีมูลค่าเพิ่ม', d: 'ภ.พ.20 และ ภ.พ.01' },
      { t: 'แผนที่และภาพถ่ายสำนักงาน', d: 'ป้ายชื่อ ภายใน และภายนอกอาคาร' },
      { t: 'บัตรประชาชนกรรมการผู้มีอำนาจ', d: 'พร้อมทะเบียนบ้าน' },
      { t: 'หนังสือจ้างงาน / หนังสือแต่งตั้ง', d: 'ระบุลักษณะงานที่จ้าง' },
      { t: 'สัญญาจ้างงาน', d: 'ระบุตำแหน่ง เงินเดือน และสถานที่ทำงาน' },
    ],
    applicantTitle: 'ชุดที่ 2 · เอกสารผู้ยื่น',
    applicantCount: '8 รายการ',
    applicantNote: 'จากชาวต่างชาติผู้ยื่นคำขอ',
    applicantItems: [
      { t: 'หนังสือเดินทางฉบับจริง', d: 'อายุเหลือไม่น้อยกว่า 6 เดือน พร้อมสำเนาทุกหน้าที่มีตราประทับ' },
      { t: 'รูปถ่าย 6 รูป ขนาด 3×4 ซม.', d: 'พื้นหลังสีขาว ถ่ายไม่เกิน 6 เดือน' },
      { t: 'หลักฐานการศึกษา', d: 'ปริญญาบัตรหรือใบแสดงผลการเรียน' },
      { t: 'หลักฐานประสบการณ์ทำงาน', d: 'ประวัติย่อหรือ CV' },
      { t: 'หนังสือรับรองการทำงาน', d: 'จากนายจ้างเดิม ถ้ามี' },
      { t: 'ใบรับรองแพทย์', d: 'จากโรงพยาบาลในประเทศไทย ใช้ในขั้นตอนขอใบอนุญาตทำงาน' },
      { t: 'แบบ ตม.6 และหลักฐานที่พัก', d: 'สัญญาเช่าหรือ TM.30' },
      { t: 'คำแปลที่รับรองแล้ว', d: 'เอกสารภาษาต่างประเทศทุกฉบับต้องแปลและรับรองตามที่กำหนด' },
    ],
    guideBefore: 'อยากอ่านรายละเอียดทั้งหมด ดูคู่มือฉบับเต็มของเราได้ที่ ',
    guideLink: 'Work Permit เชียงใหม่',
  },
  notes: {
    eyebrow: 'ข้อควรทราบ',
    title: 'หน้าที่ที่ยังต้องทำต่อ หลังได้ใบอนุญาตแล้ว',
    sublead:
      'ใบอนุญาตทำงานไม่ใช่เรื่องที่ทำครั้งเดียวจบ ข้อกำหนดเหล่านี้คือสิ่งที่ตัดสินว่าปีหน้าจะต่ออายุผ่านหรือไม่ เราติดตามให้ทุกข้อ',
    items: [
      { h3: 'ทำ Re-entry Permit ก่อนออกนอกประเทศทุกครั้ง', p: 'ถ้าไม่ทำ สิทธิการอยู่ต่อจะถูกยกเลิกทันทีที่เดินทางออก ค่าธรรมเนียม 1,000฿ สำหรับครั้งเดียว หรือ 3,800฿ แบบหลายครั้ง (ที่สนามบินประมาณ 1,200฿) ชำระเป็นเงินสดด้วยตนเองที่ ตม. หรือสนามบิน', warn: true },
      { h3: 'รายงานตัวทุก 90 วัน', p: 'ต้องแจ้งที่อยู่ต่อสำนักงานตรวจคนเข้าเมืองทุก 90 วัน ทำได้ทั้งออนไลน์ ทางไปรษณีย์ หรือไปด้วยตนเอง ไม่มีค่าใช้จ่ายหากยื่นตรงเวลา' },
      { h3: 'แจ้ง TM.30 ทุกครั้งที่ย้ายที่พักหรือกลับเข้าประเทศ', p: 'เจ้าบ้านหรือผู้ให้เช่าต้องแจ้งที่พักต่อสำนักงานตรวจคนเข้าเมืองภายใน 24 ชั่วโมง ทุกครั้งที่ย้ายหรือเดินทางกลับเข้าไทย' },
      { h3: 'ใบอนุญาตผูกกับนายจ้างและตำแหน่งเดียว', p: 'ครอบคลุมเฉพาะนายจ้าง ตำแหน่ง และสถานที่ทำงานที่ระบุไว้ หากมีการเปลี่ยนแปลงต้องแก้ไขหรือขอใบอนุญาตใหม่ทั้งฉบับ', warn: true },
      { h3: 'ภาษีเงินได้บุคคลธรรมดา', p: 'ผู้ถือใบอนุญาตทำงานต้องยื่นแบบ ภ.ง.ด.91 ทุกปี หลักฐานการเสียภาษีเป็นเอกสารสำคัญสำหรับการต่อวีซ่าปีถัดไป' },
      { h3: 'เริ่มต่ออายุแต่เนิ่นๆ', p: 'เริ่มต่อใบอนุญาตทำงานล่วงหน้า 60 วัน และต่อวีซ่าล่วงหน้า 30–45 วันก่อนหมดอายุ' },
      { h3: 'นายจ้างต้องรักษาคุณสมบัติไว้ตลอด', p: `ทุนจดทะเบียน ${baht(EMPLOYER_REQUIREMENTS.paidUpCapitalPerForeigner)}฿ และพนักงานไทยที่ขึ้นประกันสังคม ${EMPLOYER_REQUIREMENTS.thaiEmployeesPerForeigner} คนต่อชาวต่างชาติหนึ่งคน ต้องคงอยู่ตลอดอายุใบอนุญาต มิฉะนั้นอาจถูกปฏิเสธการต่ออายุ`, warn: true },
      { h3: 'บางอาชีพสงวนไว้สำหรับคนไทย', p: 'มีอาชีพที่กฎหมายห้ามชาวต่างชาติทำ ควรตรวจสอบตำแหน่งที่จะจ้างกับเราก่อนเริ่มดำเนินการ', warn: true },
    ],
    disclaimer:
      'หน้านี้เป็นข้อมูลเบื้องต้นเท่านั้น ค่าธรรมเนียมราชการ ระยะเวลา และเงื่อนไขอาจเปลี่ยนแปลงตามประกาศของหน่วยงานที่เกี่ยวข้อง กรุณาตรวจสอบข้อมูลล่าสุดกับทีมงานก่อนดำเนินการ ปรับปรุงล่าสุด กรกฎาคม 2569',
  },
  whoFor: {
    eyebrow: 'เหมาะกับใคร',
    title: 'ใช่สถานการณ์ของคุณหรือเปล่า',
    sublead: 'ทุกกรณีด้านล่างคือสิ่งที่เราดูแลอยู่ทุกสัปดาห์ในเชียงใหม่',
    rows: [
      { h3: 'พนักงานที่บริษัทไทยจ้าง', p: 'ได้งานในเชียงใหม่แล้ว ต้องมีวีซ่า Non-B และใบอนุญาตทำงานก่อนจึงจะเริ่มงานได้ตามกฎหมาย' },
      { h3: 'เจ้าของกิจการที่กำลังตั้งบริษัทไทย', p: 'กำลังจดทะเบียนบริษัทจำกัด ต้องการวางโครงสร้าง จด VAT และประกันสังคมให้ถูกต้องตั้งแต่วันแรก' },
      { h3: 'ครูและบุคลากรในสถานศึกษา', p: 'โรงเรียนและสถาบันสอนภาษาในเชียงใหม่เป็นผู้รับรอง แต่เอกสารยังต้องตรงกับที่สถานศึกษายื่นไว้' },
      { h3: 'ผู้เกษียณและผู้พำนักระยะยาว', p: 'ขอและต่ออายุวีซ่าเกษียณ LTR และ SMART Visa ให้ตรงกำหนดทุกปี' },
      { h3: 'ธุรกิจที่ชาวต่างชาติถือหุ้น', p: 'ทำบัญชี ยื่นแบบรายเดือน และปิดงบประจำปี เพื่อให้การต่อใบอนุญาตราบรื่น' },
      { h3: 'คนที่เพิ่งย้ายมาถึง', p: 'เปิดบัญชีธนาคาร ทำใบขับขี่ และแจ้ง TM.30 เรื่องประจำวันที่ไม่มีใครอธิบายให้ฟัง' },
    ],
  },
  faq: {
    eyebrow: 'คำถามที่พบบ่อย',
    title: 'คำถามที่ถูกถามบ่อยที่สุด',
    items: [
      { q: 'เปลี่ยนจากวีซ่าท่องเที่ยวเป็นวีซ่าทำงานที่เชียงใหม่ได้ไหม', a: 'ได้ โดยส่วนใหญ่เราเปลี่ยนจากวีซ่าท่องเที่ยวหรือผู้ได้รับยกเว้นวีซ่าเป็นวีซ่าธุรกิจ Non-B ภายในประเทศไทย แล้วจึงดำเนินการขอใบอนุญาตทำงานต่อ เราจัดการเอกสารและนัดหมายให้ทั้งหมด' },
      { q: 'ขอใบอนุญาตทำงานที่เชียงใหม่ใช้เวลานานแค่ไหน', a: 'กรมการจัดหางานใช้เวลา 7 ถึง 15 วันทำการในการออกใบอนุญาต เมื่อเอกสารครบถ้วนแล้ว ส่วนทั้งกระบวนการตั้งแต่เตรียมเอกสาร ขอ WP.3 ขอวีซ่า Non-B ออกใบอนุญาต จนถึงขออยู่ต่อ 12 เดือน ใช้เวลาประมาณสามถึงห้าเดือน' },
      { q: 'ค่าบริการวีซ่า Non-B และใบอนุญาตทำงานเท่าไหร่', a: `ค่าบริการ ${baht(VISA_TOTAL_FEE)} บาท รวมค่าธรรมเนียมราชการแล้ว แบ่งชำระ 3 งวด คือ ${baht(VISA_INSTALLMENTS.onSubmission)} บาทตอนยื่นขอวีซ่า Non-B, ${baht(VISA_INSTALLMENTS.onPermitCollection)} บาทวันรับใบอนุญาตทำงาน และ ${baht(VISA_INSTALLMENTS.onExtension)} บาทตอนขออยู่ต่อ 12 เดือน ปีถัดไปค่าต่ออายุปีละ ${baht(VISA_RENEWAL_FEE)} บาท` },
      { q: 'นายจ้างต้องมีคุณสมบัติอะไรบ้าง', a: `ทุนจดทะเบียนชำระแล้ว ${baht(EMPLOYER_REQUIREMENTS.paidUpCapitalPerForeigner)} บาทต่อชาวต่างชาติหนึ่งคน พนักงานไทยที่ขึ้นทะเบียนประกันสังคม ${EMPLOYER_REQUIREMENTS.thaiEmployeesPerForeigner} คนต่อชาวต่างชาติหนึ่งคน และเงินเดือนขั้นต่ำ ${baht(EMPLOYER_REQUIREMENTS.minimumSalary.min)} ถึง ${baht(EMPLOYER_REQUIREMENTS.minimumSalary.max)} บาทขึ้นอยู่กับสัญชาติ เงื่อนไขเหล่านี้ต้องคงอยู่ตลอดอายุใบอนุญาต` },
      { q: 'ต้องมีบริษัทไทยก่อนถึงจะขอใบอนุญาตทำงานได้ไหม', a: 'โดยทั่วไปใช่ ต้องมีนายจ้างเป็นผู้รับรอง เรารับจดทะเบียนบริษัทไทยและดำเนินการขอใบอนุญาตทำงานให้ในแพ็กเกจเดียวได้' },
      { q: 'ชาวต่างชาติถือหุ้นบริษัทไทยได้ 100% ไหม', a: 'ได้ในบางกรณี เช่น ผ่านการส่งเสริมการลงทุนจาก BOI บริษัทภายใต้สนธิสัญญาไมตรีไทย-สหรัฐ หรือใบอนุญาตประกอบธุรกิจของคนต่างด้าว เราให้คำแนะนำว่าเส้นทางไหนเหมาะกับคุณที่สุด' },
    ],
    footerBefore: 'ยังไม่มีบริษัทไทยใช่ไหม ',
    footerLink: 'เราจดทะเบียนให้ก่อนได้',
  },
  office: {
    eyebrow: 'มาพบเรา',
    title: 'สำนักงานของเราในเชียงใหม่',
    sublead:
      'เราเป็นสำนักงานบัญชีที่จดทะเบียนถูกต้อง ไม่ใช่นายหน้าวีซ่า ทีมเดียวกับที่ยื่นใบอนุญาตทำงานให้คุณ คือทีมที่ดูแลบัญชีและภาษีของบริษัทคุณด้วย',
    ratingLabel: 'บน Google',
    reviewsLabel: 'รีวิว',
    imgAlt: 'ทีมงาน IC Accounting & Service กำลังทำงานที่สำนักงานดอยสะเก็ด เชียงใหม่',
    companyName: 'บริษัท ไอซี แอคเค้าท์ติ้ง แอนด์ เซอร์วิส จำกัด',
    address: '80/142 ตำบลสันปูเลย อำเภอดอยสะเก็ด จังหวัดเชียงใหม่ 50220',
    mapsText: 'เปิดใน Google Maps',
    contactTitle: 'ติดต่อเรา',
    phoneLabel: 'โทร',
    lineLabel: 'LINE',
    emailLabel: 'อีเมล',
    hoursTitle: 'เวลาทำการ',
    hours: 'จันทร์ถึงเสาร์ 09:00–18:00 น.',
    hoursNote: 'นัดหมายนอกเวลาทำการได้ ติดต่อทาง LINE',
  },
  cta: {
    h2: 'พร้อมเริ่มเรื่องใบอนุญาตทำงานที่เชียงใหม่แล้วหรือยัง',
    p: 'ปรึกษาฟรี ไม่มีข้อผูกมัด เล่าสถานการณ์ของคุณมา แล้วเราจะวางเส้นทางวีซ่าและธุรกิจที่เหมาะที่สุดให้',
    btnLine: 'ปรึกษาทาง LINE',
    btnQuote: 'นัดหมายปรึกษาฟรี',
  },
};

export const visaContent = { th, en } as const;
export type VisaLocale = keyof typeof visaContent;
