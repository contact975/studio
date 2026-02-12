'use client';

import { useParams } from 'next/navigation';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ChevronLeft, Facebook, Share2, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

const blogPosts = [
  {
    id: 1,
    title: '5 เคล็ดลับการเตรียมเอกสารภาษีสำหรับ SME มือใหม่',
    content: `
      การจัดการภาษีไม่ใช่เรื่องยาก หากคุณมีการเตรียมตัวที่ดีและเป็นระบบ มาดูขั้นตอนง่ายๆ ที่จะช่วยให้คุณประหยัดเวลาและลดความเสี่ยงในการถูกตรวจสอบย้อนหลัง

      1. รวบรวมเอกสารรายได้ให้ครบถ้วน: ไม่ว่าจะเป็นใบกำกับภาษีขาย ใบเสร็จรับเงิน หรือเอกสารการรับโอนเงิน
      2. แยกประเภทค่าใช้จ่าย: แบ่งหมวดหมู่เอกสารค่าใช้จ่ายให้ชัดเจน เช่น ค่าวัตถุดิบ ค่าเช่าสถานที่ และเงินเดือนพนักงาน
      3. ตรวจสอบความถูกต้องของใบกำกับภาษี: ตรวจเช็คชื่อ ที่อยู่ และเลขประจำตัวผู้เสียภาษีทั้งของผู้ซื้อและผู้ขาย
      4. จัดเก็บเอกสารอย่างเป็นระบบ: แนะนำให้จัดเก็บตามเดือนและตามประเภท เพื่อการค้นหาที่รวดเร็ว
      5. ใช้เทคโนโลยีเข้าช่วย: การใช้โปรแกรมบัญชี Cloud จะช่วยให้คุณบันทึกข้อมูลได้แบบ Real-time และลดความผิดพลาดได้มาก

      การเตรียมเอกสารที่ดีคือหัวใจสำคัญของการทำบัญชีที่ถูกต้องและช่วยให้คุณวางแผนภาษีได้อย่างมีประสิทธิภาพสูงสุดค่ะ
    `,
    category: 'ภาษีธุรกิจ',
    date: '15 มี.ค. 2567',
    author: 'ทีมงาน IC ACC',
    image: 'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxEb2N1bWVudHxlbnwwfHx8fDE3NzA4ODg1NTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'tax documents'
  },
  {
    id: 2,
    title: 'จดทะเบียนบริษัท vs ห้างหุ้นส่วน แบบไหนเหมาะกับคุณมากกว่ากัน?',
    content: `
      เริ่มต้นธุรกิจใหม่ หลายคนมักตั้งคำถามว่าควรจดทะเบียนเป็น "บริษัทจำกัด" หรือ "ห้างหุ้นส่วนจำกัด" ดี? บทความนี้จะเปรียบเทียบข้อดีและข้อเสียเพื่อให้คุณตัดสินใจเลือกสิ่งที่คุ้มค่าที่สุดสำหรับธุรกิจของคุณ

      ห้างหุ้นส่วนจำกัด (หจก.):
      - ข้อดี: ขั้นตอนการจัดตั้งง่ายกว่า มีค่าธรรมเนียมต่ำกว่าบริษัท และความรับผิดชอบของหุ้นส่วนจำกัดจะจำกัดเท่ากับจำนวนเงินที่ลงทุน
      - ข้อเสีย: หุ้นส่วนผู้จัดการมีความรับผิดชอบไม่จำกัด และภาพลักษณ์ความน่าเชื่อถืออาจน้อยกว่าบริษัท

      บริษัทจำกัด:
      - ข้อดี: มีภาพลักษณ์ความเป็นมืออาชีพสูง การระดมทุนทำได้ง่ายกว่า และความรับผิดชอบของผู้ถือหุ้นจำกัดเท่ากับจำนวนเงินค่าหุ้นที่ยังส่งใช้ไม่ครบ
      - ข้อเสีย: มีขั้นตอนและเอกสารที่ซับซ้อนกว่า ต้องมีการทำบัญชีและตรวจสอบบัญชีที่เข้มงวด

      สรุปแล้ว หากคุณวางแผนจะขยายธุรกิจให้ใหญ่ขึ้นในอนาคต การจดทะเบียนบริษัทมักเป็นทางเลือกที่ดีกว่าในระยะยาวค่ะ
    `,
    category: 'จดทะเบียนธุรกิจ',
    date: '10 มี.ค. 2567',
    author: 'ผู้เชี่ยวชาญด้านกฎหมาย',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMXx8QnVzaW5lc3N8ZW58MHx8fHwxNzcwODg4NzkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'business discussion'
  },
  {
    id: 3,
    title: '5 ข้อผิดพลาดที่ SME เชียงใหม่มักเจอ เมื่อถึงฤดูกาลปิดงบการเงิน',
    content: `
      เกริ่นนำ: การทำธุรกิจในเชียงใหม่ช่วงต้นปี สิ่งที่เจ้าของกิจการหลายท่านกังวลใจที่สุดคงหนีไม่พ้นการ "ปิดงบการเงิน" จากประสบการณ์ดูแลลูกค้าและปิดงบมาแล้วกว่าหลายร้อยเคส (รวมถึง 41 งบในปีนี้!) IC Accounting & Service สรุปข้อควรระวังมาให้แล้วครับ

      1. เอกสารไม่ครบถ้วนและไม่เป็นระบบ
      ปัญหาคลาสสิกที่ทำให้การปิดงบล่าช้าคือเอกสารรายรับ-รายจ่ายที่กระจัดกระจาย การเริ่มทำบัญชีที่เป็นระบบตั้งแต่วันแรกจะช่วยประหยัดเวลาและลดความเสี่ยงทางภาษีได้มหาศาลครับ

      2. แยกบัญชีส่วนตัวกับบัญชีบริษัทไม่ออก
      เจ้าของธุรกิจ SME มักใช้เงินปนกัน ซึ่งเป็นจุดที่สรรพากรตรวจสอบได้ง่ายที่สุด เราแนะนำให้แยกบัญชีชัดเจนเพื่อให้การบันทึกบัญชีแม่นยำและโปร่งใสครับ

      3. มองข้ามการวางแผนภาษีระหว่างปี
      หลายท่านรอให้ถึงสิ้นปีค่อยคิดเรื่องภาษี ซึ่งอาจจะสายเกินไป การมีที่ปรึกษาบัญชีที่มีประสบการณ์ช่วยวางแผนจะช่วยให้คุณประหยัดภาษีได้อย่างถูกต้องตามกฎหมายครับ

      4. เลือกสำนักงานบัญชีที่ไม่มีตัวตนจริงในพื้นที่
      การเลือก สำนักงานบัญชีเชียงใหม่ ที่มีที่ตั้งชัดเจน ช่วยให้การประสานงานและรับส่งเอกสารทำได้รวดเร็ว และเข้าใจบริบทของธุรกิจในท้องถิ่นมากกว่าครับ

      5. ลืมใช้ประโยชน์จาก "มีเดียคอนเทนต์" ในการโตธุรกิจ
      ในยุคนี้ บัญชีไม่ได้มีหน้าที่แค่เก็บตัวเลข แต่ข้อมูลบัญชีที่แม่นยำจะช่วยบอกเราได้ว่าควรทุ่มงบทำการตลาดหรือผลิตมีเดียคอนเทนต์ตัวไหนเพื่อให้ธุรกิจโตครับ
    `,
    category: 'ภาษีธุรกิจ',
    date: '20 มี.ค. 2567',
    author: 'ทีมงาน IC ACC',
    image: 'https://images.unsplash.com/photo-1737622020870-73d9f15e8a46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxzbWUlMjBjaGlhbmdtYWl8ZW58MHx8fHwxNzcwODg4NDIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'accounting error check'
  },
  {
    id: 4,
    title: 'คัมภีร์ SME เชียงใหม่: บริหารจัดการบัญชีและภาษีอย่างไรให้ธุรกิจโตแบบก้าวกระโดดในปี 2026',
    content: `
      เกริ่นนำ: ในยุคที่เศรษฐกิจเชียงใหม่กลับมาคึกคักอีกครั้ง ไม่ว่าจะเป็นธุรกิจคาเฟ่ ร้านอาหาร หรือที่พักขนาดเล็ก (SME) การบริหารจัดการ "หลังบ้าน" โดยเฉพาะเรื่องตัวเลขและภาษี คือหัวใจสำคัญที่จะตัดสินว่าธุรกิจจะอยู่รอดหรือไปต่อได้ไกลแค่ไหน IC Accounting & Service ในฐานะเพื่อนคู่คิดของ SME ในเชียงใหม่มากว่า 10 ปี เราสรุปแนวทางการบริหารบัญชีที่เจ้าของธุรกิจยุคใหม่ต้องรู้มาให้แล้วครับ

      1. การวางรากฐาน "บัญชีเดียว" เพื่อความยั่งยืน
      ผู้ประกอบการ SME ในเชียงใหม่หลายรายยังติดกับการทำบัญชีหลายเล่มเพื่อประหยัดภาษี แต่ในความเป็นจริง การทำบัญชีชุดเดียวให้ถูกต้องตั้งแต่วันแรกมีข้อดีมากกว่าที่คิด:
      - ขอสินเชื่อได้ง่ายขึ้น: ธนาคารในเชียงใหม่จะพิจารณาปล่อยกู้จากงบการเงินที่สะท้อนความเป็นจริงเท่านั้น
      - วางแผนกำไรได้แม่นยำ: เมื่อตัวเลขตรงไปตรงมา คุณไอซ์และเจ้าของธุรกิจจะรู้ทันทีว่าสินค้าตัวไหนทำกำไร หรือจุดไหนคือรายจ่ายที่ไม่จำเป็น
      - ลดความเสี่ยงโดนเรียกตรวจ: การมีระบบบัญชีที่ดีช่วยให้คุณไม่ต้องกังวลเมื่อสรรพากรเข้ามาตรวจสอบ

      2. ภาษีที่ SME เชียงใหม่ต้องเจอ (และวิธีจัดการ)
      การทำธุรกิจในเชียงใหม่มีภาษีหลักๆ ที่ต้องดูแล ดังนี้:
      - ภาษีเงินได้นิติบุคคล: สำหรับบริษัทที่จดทะเบียน ต้องคำนวณจากกำไรสุทธิ และยื่นแบบปีละ 2 ครั้ง (ภ.ง.ด.51 และ ภ.ง.ด.50)
      - ภาษีมูลค่าเพิ่ม (VAT): เมื่อรายได้แตะ 1.8 ล้านบาทต่อปี ต้องรีบจดทะเบียน VAT ทันทีเพื่อไม่ให้เสียค่าปรับย้อนหลัง
      - ภาษีหัก ณ ที่จ่าย: เมื่อมีการจ้างงานหรือใช้บริการบริษัทอื่น ต้องหักและนำส่งกรมสรรพากรภายในวันที่ 7 ของเดือนถัดไป

      3. จุดเด่นที่ SME ต้องใช้: บัญชี + มีเดียคอนเทนต์
      จุดที่ทำให้ IC Accounting & Service แตกต่างจากสำนักงานบัญชีทั่วไปในเชียงใหม่ คือเราเชื่อว่า "ตัวเลขต้องช่วยส่งเสริมการตลาด":
      - วิเคราะห์งบเพื่อทำมีเดีย: เราช่วยดูว่าช่วงไหนที่ธุรกิจมีกระแสเงินสดดี เพื่อวางแผนผลิตมีเดียคอนเทนต์โปรโมทธุรกิจในช่วงที่เหมาะสมที่สุด
      - สร้างตัวตนออนไลน์: ธุรกิจ SME ในเชียงใหม่ต้องมีตัวตนบนโซเชียล การมีที่ปรึกษาที่เข้าใจทั้งเรื่องภาษีและงานโปรดักชั่นจะช่วยให้คุณประหยัดเวลาและได้งานที่ตรงกลุ่มเป้าหมาย

      4. ทำไมต้องเลือกสำนักงานบัญชีในพื้นที่ (เชียงใหม่)?
      การเลือกใช้บริการ สำนักงานบัญชีเชียงใหม่ อย่างเรา มีข้อได้เปรียบที่ชัดเจน:
      - ความสะดวกในการประสานงาน: ไม่ว่าสำนักงานของคุณจะอยู่แถวสันนาเม็ง หรือนิมมานฯ ทีมงานของเราพร้อมดูแลและรับส่งเอกสารได้อย่างรวดเร็ว
      - ความเข้าใจบริบทท้องถิ่น: เราเข้าใจลักษณะเฉพาะของธุรกิจท่องเที่ยวและบริการในเชียงใหม่ ทำให้คำปรึกษาของเราใช้งานได้จริง
      - ประสบการณ์ที่พิสูจน์ได้: ด้วยจำนวนการปิดงบกว่าหลายร้อยราย ยืนยันถึงความเชี่ยวชาญและความเป็นมืออาชีพของเรา

      บทสรุป: การเติบโตของ SME ในเชียงใหม่ไม่ได้วัดกันที่ยอดขายเพียงอย่างเดียว แต่วัดกันที่การบริหารจัดการหลังบ้านอย่างเป็นระบบ หากท่านกำลังมองหาผู้ช่วยที่ดูแลครบทั้ง "บัญชี ภาษี และมีเดียคอนเทนต์" ให้ IC Accounting & Service เป็นส่วนหนึ่งในความสำเร็จของคุณ
    `,
    category: 'ภาษีธุรกิจ',
    date: '01 มี.ค. 2567',
    author: 'ทีมงาน IC ACC',
    image: 'https://images.unsplash.com/photo-1758115271914-6d5d8bb3d277?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxNHx8Y2hpYW5nbWFpfGVufDB8fHx8MTc3MDg5MDM4MHww&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'e-commerce box'
  },
  {
    id: 5,
    title: 'ภาษีร้านอาหารและคาเฟ่ในเชียงใหม่: บริหารจัดการอย่างไรให้ไม่โดนเรียกตรวจย้อนหลัง',
    content: `
      เกริ่นนำ: เชียงใหม่คือเมืองแห่งคาเฟ่และร้านอาหาร ไม่ว่าคุณจะเปิดร้านย่านนิมมานเหมินท์ หลัง มช. หรือโซนสันทราย สิ่งหนึ่งที่มาคู่กับรสชาติอาหารที่อร่อยคือ "การจัดการบัญชีและภาษี" ที่ถูกต้อง ธุรกิจอาหารมีรายละเอียดหลังบ้านที่ซับซ้อนกว่าที่หลายคนคิด ตั้งแต่การคุมสต็อกไปจนถึงภาษีที่ดิน วันนี้ IC Accounting & Service จะมาแชร์เทคนิคการจัดการภาษีร้านอาหารให้ "เคลียร์" เพื่อให้คุณโฟกัสกับการสร้างสรรค์เมนูใหม่ๆ ได้อย่างไร้กังวลครับ

      1. ความสำคัญของการทำบัญชีคุมสต็อก (Inventory Management)
      หลายร้านตกม้าตายเพราะไม่รู้ "ต้นทุนอาหาร (Food Cost)" ที่แท้จริง:
      - ตรวจสอบการรั่วไหล: การทำบัญชีสต็อกช่วยให้รู้ว่าวัตถุดิบที่ซื้อมาถูกใช้ไปจริงเท่าไหร่ มีของเสีย (Waste) หรือของหายหรือไม่
      - สะท้อนกำไรที่ถูกต้อง: หากสต็อกไม่แม่นยำ กำไรในงบการเงินจะผิดเพี้ยน ซึ่งอาจส่งผลต่อการคำนวณภาษีเงินได้นิติบุคคลตอนปลายปี
      - จุดเด่นของเรา: เราช่วยคุณวางระบบการลงบัญชีสต็อกให้สอดคล้องกับยอดขาย เพื่อให้ตัวเลขหลังบ้านแม่นยำที่สุด

      2. การจัดการภาษีหัก ณ ที่จ่าย (Withholding Tax) สำหรับค่าเช่าที่
      ร้านอาหารในเชียงใหม่ส่วนใหญ่มักเป็นการเช่าสถานที่ โดยเฉพาะย่านท่องเที่ยวชื่อดัง:
      - หน้าที่ของร้าน: เมื่อคุณจ่ายค่าเช่าในนามบริษัท คุณมีหน้าที่ต้องหักภาษี ณ ที่จ่าย 5% และนำส่งกรมสรรพากรภายในวันที่ 7 ของเดือนถัดไป
      - เอกสารต้องครบ: ต้องมีการทำใบรับรองการหักภาษี ณ ที่จ่าย ให้กับเจ้าของที่ดินทุกครั้ง เพื่อใช้เป็นหลักฐานค่าใช้จ่ายของร้านอย่างถูกต้องตามกฎหมาย

      3. เทคนิคการแยกรายได้จาก Food Delivery (Grab, Lineman, ShopeeFood)
      ในยุค 2026 รายได้จากการส่งอาหารถือเป็นส่วนใหญ่ของร้าน แต่การลงบัญชีมักจะสับสน:
      - รายได้สุทธิ vs รายได้รวม: ร้านต้องบันทึกรายได้จากยอดขายเต็มจำนวนก่อนหักค่า GP (Gross Profit) ของแพลตฟอร์ม ไม่ใช่บันทึกแค่ยอดเงินที่โอนเข้าบัญชี
      - ภาษีซื้อจากค่า GP: ค่า GP ที่แพลตฟอร์มหักไปนั้น ร้านสามารถนำใบกำกับภาษีที่ได้จากแพลตฟอร์มมาใช้เป็นภาษีซื้อเพื่อลดหย่อนภาษีมูลค่าเพิ่ม (VAT) ได้ครับ

      4. ภาษีที่ดินและสิ่งปลูกสร้าง (เดิมคือภาษีโรงเรือน)
      สำหรับร้านที่มีหน้าร้านชัดเจน ต้องระวังการประเมินภาษีที่ดินตามประเภทการใช้ประโยชน์:
      - ประเภทพาณิชยกรรม: ร้านอาหารจะถูกจัดอยู่ในกลุ่มนี้ ซึ่งมีอัตราภาษีที่ต่างจากการอยู่อาศัย
      - การเตรียมตัว: ควรตรวจสอบเอกสารสิทธิ์และพื้นที่การใช้งานให้ชัดเจน เพื่อการประเมินที่ถูกต้องและเป็นธรรมครับ

      5. ทำไมต้องให้ IC Accounting & Service ดูแลร้านอาหารของคุณ?
      เราไม่ใช่แค่คนทำบัญชี แต่เราคือ "พาร์ทเนอร์" ที่เข้าใจธุรกิจอาหารในเชียงใหม่:
      - ประสบการณ์ที่หลากหลาย: ทีมงานของเราเคยดูแลร้านอาหารมาแล้วหลายสไตล์ ตั้งแต่ร้านขนาดเล็กไปจนถึงร้านขนาดใหญ่ที่มีหลายสาขา
      - วางระบบให้เหนื่อยน้อยลง: ด้วยทีมงานของเราที่มีความเชี่ยวชาญ และประสบการณ์กว่า 10 ปี เราจะช่วยเซ็ตอัพขั้นตอนการส่งเอกสารให้ง่ายที่สุดสำหรับเจ้าของร้าน
      - บริการสื่อคอนเทนต์: เรายังสามารถช่วยคุณทำสื่อโปรโมทร้านอาหาร (Media Content) เพื่อเพิ่มยอดขายควบคู่ไปกับการคุมบัญชีที่แข็งแกร่งได้อีกด้วย

      บทสรุป: การทำร้านอาหารในเชียงใหม่ให้ยั่งยืน ต้องเริ่มจากการมี "หลังบ้าน" ที่สะอาดและถูกต้อง หากท่านกำลังมองหา สำนักงานบัญชีเชียงใหม่ ที่เข้าใจหัวอกคนทำร้านอาหาร ติดต่อปรึกษา IC Accounting & Service ได้ตั้งแต่วันนี้
    `,
    category: 'ภาษีธุรกิจ',
    date: '25 ก.พ. 2567',
    author: 'ทีมงาน IC ACC',
    image: 'https://images.unsplash.com/photo-1550966841-3962f33f0538?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxyZXN0YXVyYW50fGVufDB8fHx8MTc3MDkwOTg0NHww&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'restaurant cafe interior'
  },
  {
    id: 6,
    title: 'สวัสดิการพนักงานและการจัดการประกันสังคมที่ถูกต้อง',
    content: `
      หน้าที่ of นายจ้างในการดูแลสวัสดิการพนักงานตามกฎหมาย และเทคนิคการบริหารจัดการที่ช่วยลดภาระองค์กร

      1. การขึ้นทะเบียนนายจ้างและลูกจ้างต่อสำนักงานประกันสังคมภายในกำหนดเวลา
      2. การคำนวณและนำส่งเงินสมทบประกันสังคมในแต่ละเดือนอย่างถูกต้อง
      3. ความรู้เรื่องสิทธิประโยชน์ของลูกจ้างตามกฎหมายแรงงาน
      4. การออกแบบสวัสดิการที่ไม่ใช่ตัวเงินเพื่อจูงใจพนักงาน
      5. การเตรียมความพร้อมสำหรับการตรวจสอบจากเจ้าหน้าที่แรงงาน
    `,
    category: 'งานบุคคล',
    date: '20 ก.พ. 2567',
    author: 'ทีมงาน HR',
    image: 'https://picsum.photos/seed/blog6/800/500',
    imageHint: 'happy office workers'
  }
];

export default function BlogDetailPage() {
  const params = useParams();
  const [post, setPost] = useState<any>(null);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    const now = new Date();
    setCurrentDate(now.toLocaleDateString('th-TH', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }));

    if (params?.id) {
      const postId = Number(params.id);
      const foundPost = blogPosts.find(p => p.id === postId) || blogPosts[0];
      setPost(foundPost);
    }
  }, [params]);

  if (!post) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-dvh bg-white text-foreground font-body">
      <Header />
      <main className="flex-1">
        <section className="py-6 border-b bg-slate-50">
          <div className="container mx-auto px-4 md:px-6">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Link href="/" className="hover:text-primary transition-colors">หน้าแรก</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-primary transition-colors">บทความน่ารู้</Link>
              <span>/</span>
              <span className="text-foreground truncate max-w-[200px] md:max-w-none">{post.title}</span>
            </nav>
            <Link href="/blog" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline group">
              <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> กลับไปหน้ารวมบทความ
            </Link>
          </div>
        </section>

        <article className="py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div data-aos="fade-up" className="mb-8">
                <Badge className="bg-primary hover:bg-primary/90 text-white mb-4">
                  {post.category}
                </Badge>
                <h1 className="text-3xl md:text-5xl font-bold font-headline leading-tight mb-6">
                  {post.title}
                </h1>
                <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>เผยแพร่เมื่อ: {currentDate || post.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>เขียนโดย: {post.author}</span>
                  </div>
                </div>
              </div>

              <div data-aos="fade-up" className="relative aspect-video rounded-2xl overflow-hidden shadow-xl mb-12">
                <Image 
                  src={post.image} 
                  alt={post.title} 
                  fill 
                  className="object-cover"
                  data-ai-hint={post.imageHint}
                />
              </div>

              <div data-aos="fade-up" className="prose prose-lg max-w-none prose-slate">
                <div className="whitespace-pre-line text-lg leading-relaxed text-slate-700">
                  {post.content}
                </div>
              </div>

              <Separator className="my-12" />

              <div data-aos="fade-up" className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-slate-50 p-6 rounded-2xl">
                <div className="font-semibold text-slate-900 flex items-center gap-2">
                  <Share2 className="h-5 w-5 text-primary" /> แบ่งปันบทความนี้
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" size="sm" className="rounded-full gap-2 hover:bg-blue-600 hover:text-white transition-all">
                    <Facebook className="h-4 w-4" /> Facebook
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full gap-2 hover:bg-green-500 hover:text-white transition-all">
                    <MessageCircle className="h-4 w-4" /> Line
                  </Button>
                </div>
              </div>

              <div data-aos="fade-up" className="mt-16 flex items-start gap-6 p-8 border rounded-2xl bg-white shadow-sm">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <User className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">{post.author}</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    ทีมงานผู้เชี่ยวชาญด้านบัญชีและภาษีของ IC Accounting & Service พร้อมให้คำปรึกษาและแบ่งปันความรู้เพื่อสนับสนุนการเติบโตของธุรกิจคุณอย่างมั่นคง
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>

        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold font-headline mb-10 text-center">บทความที่คุณอาจสนใจ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.filter(p => p.id !== (params?.id ? Number(params.id) : 0)).slice(0, 3).map((post) => (
                <Link href={`/blog/${post.id}`} key={post.id} className="group">
                  <Card className="h-full border-none shadow-sm hover:shadow-md transition-all overflow-hidden">
                    <div className="relative aspect-video">
                      <Image src={post.image} alt={post.title} fill className="object-cover transition-transform group-hover:scale-105" />
                    </div>
                    <CardHeader className="p-6">
                      <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-headline">มีข้อสงสัยเกี่ยวกับเรื่องบัญชีและภาษี?</h2>
            <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
              ให้ทีมงาน IC Accounting & Service ดูแลคุณ เราพร้อมให้คำปรึกษาเบื้องต้นฟรี เพื่อให้ธุรกิจของคุณเดินหน้าได้อย่างถูกต้อง
            </p>
            <Button asChild size="lg" variant="secondary" className="rounded-full px-12 h-14 text-lg font-bold">
              <Link href="https://line.me/R/ti/p/@374jshvh" target="_blank">พูดคุยกับเราทาง Line</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
