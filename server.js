// server.js - Doon Sainik School Chatbot - PRODUCTION VERSION
console.log("🔥 DOON SAINIK SCHOOL SERVER.JS - PRODUCTION VERSION 🔥");

const fetch = require('node-fetch');
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5500;

// Middleware
app.use(cors());
app.use(express.json());

// ==============================================
// API KEYS
// ==============================================
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Initialize Gemini
let genAI = null;
if (GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  console.log('✅ Gemini API initialized');
} else {
  console.log('⚠️ Gemini API key not found - using Knowledge Base only');
}

// ==============================================
// EMAIL CONFIGURATION
// ==============================================
const EMAIL_CONFIG = {
  service: 'gmail',
  auth: {
    user: process.env.ADMIN_EMAIL || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'your-app-password'
  }
};

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@doonsainikschool.com';
const transporter = nodemailer.createTransport(EMAIL_CONFIG);

// ==============================================
// COMPREHENSIVE KNOWLEDGE BASE - DOON SAINIK SCHOOL
// ==============================================
const KNOWLEDGE_BASE = {

  // ==============================================
  // FAQ MENU - COURSES & PROGRAMS
  // ==============================================
  faq_menu: {
    keywords: [
      'faq', 'faqs', 'frequently asked', 'common questions', 'questions', 'help',
      'courses', 'course', 'programs', 'coaching', 'classes', 'batches',
      'what do you offer', 'all courses', 'course list', 'what can i study'
    ],
    answer: "🎖️ Doon Sainik School — Courses & Programs:\n\nWhat would you like to know about?",
    hasOptions: true,
    isFAQMenu: true,
    options: [
      {
        id: 1,
        label: "1️⃣ RIMC Coaching",
        trigger: ['1', 'rimc', 'rashtriya indian military college'],
        response: "🎖️ RIMC Coaching:\n\nWhat would you like to know?",
        subOptions: [
          {
            id: 1,
            label: "📋 What is RIMC?",
            trigger: ['1', 'what is rimc', 'rimc information', 'rimc details'],
            response: "🎖️ RIMC — Rashtriya Indian Military College:\n\nRIMC is India's most prestigious pre-NDA military college located in Dehradun. It prepares boys for entry into the National Defence Academy (NDA) and subsequently into the Indian Armed Forces.\n\n📌 Key Details:\n✅ Location: Dehradun, Uttarakhand\n✅ Conducted by: Indian Army\n✅ Exam Held: Twice a year (June & December)\n✅ Entry Class: Class 8\n✅ Age: 11.5 to 13 years\n✅ For: Boys Only\n\n🏆 Career Path after RIMC:\n• NDA (National Defence Academy)\n• Indian Military Academy (IMA)\n• Commissioned Officer in Indian Army\n\n🔗 More Info: https://doonsainikschool.com/rimc-coaching/"
          },
          {
            id: 2,
            label: "📝 RIMC Exam Pattern & Syllabus",
            trigger: ['2', 'rimc exam', 'rimc pattern', 'rimc syllabus', 'rimc subjects'],
            response: "📝 RIMC Entrance Exam Pattern:\n\n📚 Written Exam:\n✅ Mathematics: 200 Marks\n✅ English: 125 Marks\n✅ General Knowledge: 50 Marks\n✅ Total Written: 375 Marks\n\n🏃 Physical Fitness Test (Qualifying):\n✅ 100 Metre Race\n✅ 1.6 KM Run\n✅ Long Jump\n✅ High Jump\n✅ Chin-ups\n\n🗣️ Viva Voce (Interview): Conducted after written test\n🩺 Medical Examination: Final stage\n\n📅 Exam Schedule: June & December every year\n\n📥 Download RIMC Study Notes:\nhttps://doonsainikschool.com/wp-content/uploads/2025/06/c7895fbe-49b3-4dfd-b527-4272f9bebac5.pdf\n\n📞 For guidance: +91-8586858986"
          },
          {
            id: 3,
            label: "🎯 RIMC Coaching at Doon Sainik",
            trigger: ['3', 'rimc coaching', 'join rimc', 'rimc preparation', 'rimc classes'],
            response: "🎯 Doon Sainik School — RIMC Coaching Program:\n\n✅ Our RIMC Coaching Includes:\n• Expert faculty including retired Army officers\n• Subject-wise comprehensive study material\n• Daily practice tests & weekly mock exams\n• Previous years' question papers\n• Physical training guidance\n• Viva Voce & interview preparation\n• Regular progress assessment\n• Small batch size for personal attention\n\n📋 Eligibility for RIMC Exam:\n• Boys only\n• Age: 11.5 to 13 years\n• Currently studying in Class 7th or 8th\n\n📥 Download Admission Form:\nhttps://doonsainikschool.com/wp-content/uploads/2025/06/04087b63-3b2e-4d9b-94cb-4271c47ee01f.pdf\n\n📞 Call: +91-8586858986 | +91-8006615154\n🔗 Visit: https://doonsainikschool.com/rimc-coaching/"
          },
          {
            id: 4,
            label: "📥 RIMC Study Notes & Mock Tests",
            trigger: ['4', 'rimc notes', 'rimc mock test', 'rimc study material', 'rimc pdf'],
            response: "📥 RIMC Study Materials — Free Download:\n\n📚 Available Resources:\n✅ Important Notes for RIMC English:\nhttps://doonsainikschool.com/wp-content/uploads/2025/06/c7895fbe-49b3-4dfd-b527-4272f9bebac5.pdf\n\n✅ RMS & Sainik School Mock Test:\nhttps://doonsainikschool.com/ (Resources Section)\n\n✅ Biology Notes for Class 8th & 9th:\nhttps://doonsainikschool.com/wp-content/uploads/2025/06/561af9c0-008a-4b50-b5ce-c6d7a4bb0fb7.pdf\n\n✅ English Phrase Notes:\nhttps://doonsainikschool.com/wp-content/uploads/2025/06/b3c369ee-5772-4669-9550-88d0ced4de92.pdf\n\n✅ All Resources Page:\nhttps://doonsainikschool.com/\n\n📞 For complete study kit: +91-8586858986"
          }
        ]
      },
      {
        id: 2,
        label: "2️⃣ Sainik School Coaching (AISSEE)",
        trigger: ['2', 'sainik school', 'aissee', 'sainik coaching', 'sainik entrance'],
        response: "⚔️ Sainik School Coaching — AISSEE:\n\nWhat would you like to know?",
        subOptions: [
          {
            id: 1,
            label: "📋 What is Sainik School?",
            trigger: ['1', 'what is sainik school', 'sainik school info', 'about sainik school'],
            response: "⚔️ Sainik Schools — Overview:\n\nSainik Schools are premier residential schools run by the Ministry of Defence across India. They are designed to prepare students for entry into the National Defence Academy (NDA) and Naval Academy (NA).\n\n📌 Key Details:\n✅ Managed by: Ministry of Defence, India\n✅ Entry: Class 6 & Class 9\n✅ Exam: AISSEE (All India Sainik School Entrance Exam)\n✅ For: Boys & Girls both\n✅ Type: Residential (Boarding) Schools\n✅ Total Sainik Schools: 33+ across India\n\n🏆 Notable Sainik Schools:\n• Sainik School Ghorakhal (Uttarakhand)\n• Sainik School Sujanpur Tira (HP)\n• Sainik School Korukonda (AP)\n• Sainik School Tilaiya (Jharkhand)\n• Sainik School Nalanda (Bihar)\n\n🔗 More Info: https://doonsainikschool.com/sainik-school-coaching/"
          },
          {
            id: 2,
            label: "📝 AISSEE Exam Pattern & Syllabus",
            trigger: ['2', 'aissee exam', 'aissee pattern', 'sainik syllabus', 'sainik subjects', 'sainik exam pattern'],
            response: "📝 AISSEE — All India Sainik School Entrance Exam:\n\n🎯 Class 6 Entry:\n✅ Mathematics: 150 Marks (50 Questions)\n✅ Language (English/Hindi): 150 Marks (50 Questions)\n✅ Intelligence: 100 Marks (25 Questions)\n✅ Total: 400 Marks | Duration: 2.5 Hours\n\n🎯 Class 9 Entry:\n✅ Mathematics: 200 Marks\n✅ English: 100 Marks\n✅ Intelligence: 100 Marks\n✅ Science: 100 Marks\n✅ Social Science: 50 Marks\n✅ Total: 550 Marks | Duration: 2.5 Hours\n\n📅 Exam: January (every year)\n🌐 Official: aissee.nta.ac.in\n\n📥 Download AISSEE Mock Tests:\n• All India Sainik School Mock Test 2025:\nhttps://doonsainikschool.com/wp-content/uploads/2025/06/2b0f4612-b189-45aa-891a-52ea5bc64174.pdf\n• Class 9 Mock Test:\nhttps://doonsainikschool.com/wp-content/uploads/2025/06/020af037-5a9a-413b-9498-696a5f7c33fa.pdf\n• Class 6 Mock Test:\nhttps://doonsainikschool.com/wp-content/uploads/2025/06/fa72763a-cab5-4b61-9532-ccc6736766ca.pdf"
          },
          {
            id: 3,
            label: "🎯 Age Eligibility & Criteria",
            trigger: ['3', 'age eligibility', 'sainik age', 'eligibility criteria', 'who can apply sainik'],
            response: "📋 AISSEE Age Eligibility Criteria:\n\n🎯 Class 6 Entry:\n✅ Age: 10 to 12 years (as on 1st April of admission year)\n✅ Currently studying: Class 4th or 5th\n✅ Must have passed Class 5 for lateral entry\n\n🎯 Class 9 Entry:\n✅ Age: 13 to 15 years (as on 1st April of admission year)\n✅ Currently studying: Class 7th or 8th\n✅ Must have passed Class 8 for lateral entry\n\n⚠️ Important Notes:\n• SC/ST candidates get age relaxation of 2 years\n• Medical fitness is mandatory\n• Domicile certificate may be required for state quota\n• Use our Age Calculator: https://doonsainikschool.com/\n\n📞 For age confirmation: +91-8586858986"
          },
          {
            id: 4,
            label: "📥 Sainik School Study Material",
            trigger: ['4', 'sainik notes', 'sainik mock test', 'sainik study material', 'sainik pdf'],
            response: "📥 Sainik School Study Materials — Free Download:\n\n📚 Mock Tests:\n✅ All India Sainik School Mock Test 2025:\nhttps://doonsainikschool.com/wp-content/uploads/2025/06/2b0f4612-b189-45aa-891a-52ea5bc64174.pdf\n\n✅ Mock Test Class 9 — Sainik School:\nhttps://doonsainikschool.com/wp-content/uploads/2025/06/020af037-5a9a-413b-9498-696a5f7c33fa.pdf\n\n✅ Mock Test Sainik School Entrance Exam Class 9:\nhttps://doonsainikschool.com/wp-content/uploads/2025/06/deb0d9c4-6f56-40db-aa77-0b4882204a50.pdf\n\n✅ Sainik School Class 6 Mock Test:\nhttps://doonsainikschool.com/wp-content/uploads/2025/06/fa72763a-cab5-4b61-9532-ccc6736766ca.pdf\n\n✅ Math Mock Test:\nhttps://doonsainikschool.com/wp-content/uploads/2025/06/d7bd51f6-49a5-4149-bbb1-1f0463ec7b61.pdf\n\n📞 For complete study kit: +91-8586858986"
          }
        ]
      },
      {
        id: 3,
        label: "3️⃣ Military School Coaching (RMS)",
        trigger: ['3', 'military school', 'rms', 'rashtriya military school'],
        response: "🪖 Military School (RMS) Coaching:\n\nWhat would you like to know?",
        subOptions: [
          {
            id: 1,
            label: "📋 What is Rashtriya Military School?",
            trigger: ['1', 'what is rms', 'rashtriya military school info', 'rms details'],
            response: "🪖 Rashtriya Military Schools (RMS) — Overview:\n\nRashtriya Military Schools are 5 premier residential military schools operating under the Indian Army, providing quality education with military discipline.\n\n📌 5 RMS Schools in India:\n✅ RMS Ajmer — Rajasthan\n✅ RMS Bangalore — Karnataka\n✅ RMS Belgaum — Karnataka\n✅ RMS Chail — Himachal Pradesh\n✅ RMS Dholpur — Rajasthan\n\n📋 Eligibility:\n• Age: 10 to 12 years (Class 6 entry)\n• Boys only\n• Indian nationals only\n\n🏆 Career Path after RMS:\n• NDA (National Defence Academy), Khadakwasla\n• Commission in Indian Armed Forces (Army, Navy, Air Force)\n\n🔗 Military School Coaching Brochure:\nhttps://doonsainikschool.com/wp-content/uploads/2025/10/Best-Military-School-School-Coaching-in-Dehradun.pdf-3.pdf"
          },
          {
            id: 2,
            label: "📝 RMS Exam Pattern",
            trigger: ['2', 'rms exam', 'military exam pattern', 'rms syllabus', 'military school exam'],
            response: "📝 RMS Entrance Exam — Pattern:\n\n🎯 Class 6 Entry Exam:\n✅ Mathematics: 200 Marks\n✅ English: 100 Marks\n✅ Intelligence: 50 Marks\n✅ Hindi/Regional Language: 50 Marks\n✅ Total: 400 Marks\n✅ Duration: 3 Hours\n\n📚 Syllabus Highlights:\n• Maths: Arithmetic, Basic Algebra, Geometry\n• English: Grammar, Comprehension, Composition\n• GK & Current Affairs\n• Mental Ability & Logical Reasoning\n\n📅 Exam: December every year\n🏆 Selection Process: Written → Physical → Medical\n\n📥 RMS Mock Test:\nhttps://doonsainikschool.com/wp-content/uploads/2025/06/fa72763a-cab5-4b61-9532-ccc6736766ca.pdf\n\n📞 More info: +91-8006615154"
          },
          {
            id: 3,
            label: "🎯 Military School Coaching Program",
            trigger: ['3', 'military coaching program', 'rms classes', 'military school preparation'],
            response: "🎯 Doon Sainik School — Military School Coaching:\n\n✅ Our Program Includes:\n• Specialized coaching for all 5 RMS schools\n• Expert retired Army faculty\n• Complete subject-wise notes\n• Daily mock tests & practice papers\n• Physical fitness training guidance\n• Previous 10+ years question papers\n• Medical examination guidance\n• SSB/Interview preparation support\n\n📋 Who Should Join:\n• Boys aged 10–12 years\n• Class 5th or 6th students\n• Aspiring to join Indian Military\n\n📥 Download Admission Form:\nhttps://doonsainikschool.com/wp-content/uploads/2025/06/04087b63-3b2e-4d9b-94cb-4271c47ee01f.pdf\n\n📞 Call Now: +91-8586858986\n🔗 Brochure: https://doonsainikschool.com/wp-content/uploads/2025/10/Best-Military-School-School-Coaching-in-Dehradun.pdf-3.pdf"
          }
        ]
      },
      {
        id: 4,
        label: "4️⃣ Navodaya Vidyalaya Coaching (JNV)",
        trigger: ['4', 'navodaya', 'jnv', 'jawahar navodaya', 'navodaya coaching', 'nvs', 'jnvst'],
        response: "🏫 Navodaya Vidyalaya (JNV) Coaching:\n\nWhat would you like to know?",
        subOptions: [
          {
            id: 1,
            label: "📋 What is Jawahar Navodaya Vidyalaya?",
            trigger: ['1', 'what is jnv', 'navodaya info', 'about navodaya', 'jnv details'],
            response: "🏫 Jawahar Navodaya Vidyalaya (JNV) — Overview:\n\nJNVs are free, fully residential schools run by the Government of India under the Navodaya Vidyalaya Samiti (NVS). They provide quality education to talented students primarily from rural areas.\n\n📌 Key Highlights:\n✅ Completely Free Education + Free Accommodation\n✅ Run by: Navodaya Vidyalaya Samiti (NVS)\n✅ Entry: Class 6 (JNVST)\n✅ Lateral Entry: Class 9\n✅ For: Boys & Girls both\n✅ Board: CBSE Affiliated\n✅ Total JNVs: 649+ across India\n\n🌟 Benefits:\n• No tuition fee\n• Free hostel & meals\n• Uniform provided free\n• Free textbooks\n• Quality CBSE education\n\n🔗 Navodaya Prospectus:\nhttps://doonsainikschool.com/wp-content/uploads/2025/06/43c46616-5cb6-4daf-bdec-e0bb0104817d.pdf\n\n🔗 More: https://doonsainikschool.com/navodaya-vidhayalaya-coaching/"
          },
          {
            id: 2,
            label: "📝 JNVST Exam Pattern",
            trigger: ['2', 'jnvst exam', 'navodaya exam pattern', 'jnv syllabus', 'navodaya test'],
            response: "📝 JNVST — Navodaya Entrance Exam Pattern:\n\n🎯 Class 6 Entry (JNVST):\n✅ Mental Ability Test: 50 Marks (40 Questions)\n✅ Arithmetic Test: 25 Marks (20 Questions)\n✅ Language Test: 25 Marks (20 Questions)\n✅ Total: 100 Marks | 80 Questions\n✅ Duration: 2 Hours\n\n📌 Important Rules:\n• Paper available in 2 languages (English & Hindi)\n• No negative marking\n• Multiple Choice Questions (MCQ)\n• Rural quota: 75% seats reserved\n\n📅 Exam Schedule:\n• Phase 1: April/May\n• Phase 2: October/November\n\n📥 Download Navodaya Mock Test:\nhttps://doonsainikschool.com/wp-content/uploads/2025/06/374d6c3e-7213-4945-89f7-4913c3cb5e31.pdf\n\n📥 Navodaya Prospectus 2025:\nhttps://doonsainikschool.com/wp-content/uploads/2025/06/43c46616-5cb6-4daf-bdec-e0bb0104817d.pdf\n\n📞 For coaching info: +91-8586858986"
          },
          {
            id: 3,
            label: "🎯 JNV Coaching Program",
            trigger: ['3', 'jnv coaching program', 'navodaya classes', 'jnv preparation', 'navodaya coaching join'],
            response: "🎯 Doon Sainik School — JNV Coaching Program:\n\n✅ Our Navodaya Coaching Includes:\n• Complete JNVST syllabus coverage\n• Expert teachers with proven results\n• Focus on Mental Ability, Maths & Language\n• Daily practice tests\n• Previous years' papers\n• Bilingual teaching (Hindi & English)\n• Regular mock tests\n• Special attention to weaker areas\n\n📋 Who Can Join:\n• Age: 9 to 13 years\n• Class 4th or 5th studying students\n• Boys & Girls both welcome\n\n📥 Download Admission Form:\nhttps://doonsainikschool.com/wp-content/uploads/2025/06/04087b63-3b2e-4d9b-94cb-4271c47ee01f.pdf\n\n📞 Call: +91-8586858986\n🔗 Visit: https://doonsainikschool.com/navodaya-vidhayalaya-coaching/"
          }
        ]
      },
      {
        id: 5,
        label: "5️⃣ Welham School Coaching",
        trigger: ['5', 'welham', 'welham girls', 'welham boys', 'welham school coaching'],
        response: "🎓 Welham School Coaching:\n\nWhat would you like to know?",
        subOptions: [
          {
            id: 1,
            label: "📋 About Welham Schools",
            trigger: ['1', 'welham info', 'about welham', 'welham details'],
            response: "🎓 Welham Schools — Overview:\n\nWelham Schools are among India's most prestigious boarding schools located in Dehradun, Uttarakhand.\n\n📌 Two Separate Schools:\n✅ Welham Boys School (WBS) — Est. 1937\n✅ Welham Girls School (WGS) — Est. 1957\n\n🌟 Key Highlights:\n• Premier boarding schools of India\n• ICSE/ISC Affiliated\n• Located in Dehradun\n• Known for exceptional alumni\n• Strong tradition of academic & sports excellence\n\n📋 Entry:\n• Boys: Class 5 entry (WBS)\n• Girls: Class 4 or 5 entry (WGS)\n• Competitive entrance examination\n\n🔗 Welham Coaching Info:\nhttps://doonsainikschool.com/?page_id=241\n\n📞 For coaching details: +91-8586858986"
          },
          {
            id: 2,
            label: "🎯 Welham Coaching at Doon Sainik",
            trigger: ['2', 'welham coaching program', 'welham preparation', 'welham entrance coaching'],
            response: "🎯 Doon Sainik School — Welham Coaching:\n\n✅ Our Welham Coaching Includes:\n• Complete entrance exam preparation\n• English Language & Comprehension\n• Mathematics & Reasoning\n• General Knowledge & Current Affairs\n• Interview & personality development\n• Small batch size\n• Expert experienced faculty\n• Mock interview sessions\n\n📋 Eligibility:\n• Age: 9 to 12 years\n• Class 3rd to 5th students\n• Boys & Girls both\n\n📞 Call for Batch Details: +91-8586858986\n🔗 Visit: https://doonsainikschool.com/?page_id=241\n📥 Admission Form: https://doonsainikschool.com/wp-content/uploads/2025/06/04087b63-3b2e-4d9b-94cb-4271c47ee01f.pdf"
          }
        ]
      },
      {
        id: 6,
        label: "6️⃣ NDA Foundation Coaching",
        trigger: ['6', 'nda', 'nda foundation', 'national defence academy', 'nda coaching'],
        response: "🏅 NDA Foundation Coaching:\n\nWhat would you like to know?",
        subOptions: [
          {
            id: 1,
            label: "📋 What is NDA Foundation?",
            trigger: ['1', 'what is nda', 'nda info', 'about nda foundation'],
            response: "🏅 NDA — National Defence Academy:\n\nNDA Foundation coaching helps students from Class 8 onwards build a strong base for the NDA entrance exam conducted by UPSC.\n\n📌 Key Details:\n✅ Conducted by: UPSC (Union Public Service Commission)\n✅ Exam: Twice a year (April & September)\n✅ Entry for: Class 12 pass students\n✅ For: Boys (Indian nationals)\n✅ Joining: Army, Navy, Air Force\n\n🌟 NDA Foundation at Doon Sainik:\n• Early preparation from Class 8 onwards\n• Maths & General Ability focus\n• Physical fitness guidance\n• Regular mock tests\n• SSB interview preparation\n\n📥 NDA Foundation Maths Material:\nhttps://doonsainikschool.com/ (Resources Section)\n\n📞 More Details: +91-8586858986"
          },
          {
            id: 2,
            label: "📝 NDA Exam Pattern",
            trigger: ['2', 'nda exam pattern', 'nda syllabus', 'nda subjects', 'nda marks'],
            response: "📝 NDA Written Exam Pattern:\n\n📚 Paper 1 — Mathematics:\n✅ Total Marks: 300\n✅ Questions: 120 MCQs\n✅ Duration: 2.5 Hours\n✅ Negative Marking: -0.83 per wrong answer\n\n📚 Paper 2 — General Ability Test (GAT):\n✅ Total Marks: 600\n✅ English: 200 Marks (50 Qs)\n✅ General Knowledge: 400 Marks (100 Qs)\n✅ Duration: 2.5 Hours\n✅ Negative Marking: -1.33 per wrong answer\n\n✅ Total: 900 Marks (Written)\n🏆 SSB Interview: 900 Marks\n📊 Grand Total: 1800 Marks\n\n🔗 NDA Resources: https://doonsainikschool.com/\n📞 Call: +91-8006615154"
          }
        ]
      }
    ]
  },

  // ==============================================
  // ADMISSION PROCESS
  // ==============================================
  admission: {
    keywords: [
      'admission', 'admit', 'enroll', 'join', 'apply', 'how to apply',
      'admission process', 'admission procedure', 'enrollment', 'registration',
      'admission form', 'application form', 'how to register',
      'admission 2025', 'admission 2026', 'new admission',
      'how to take admission', 'steps for admission'
    ],
    answer: "📝 Admission Process at Doon Sainik School:\n\nWhat would you like to know?",
    hasOptions: true,
    options: [
      {
        id: 1,
        label: "📋 Step-by-Step Admission Process",
        trigger: ['1', 'steps', 'process', 'how to apply', 'admission steps'],
        response: "📋 Doon Sainik School — Admission Process:\n\nStep 1 — Fill Admission Form:\n📥 Download & Fill Form:\nhttps://doonsainikschool.com/wp-content/uploads/2025/06/04087b63-3b2e-4d9b-94cb-4271c47ee01f.pdf\n\nStep 2 — Contact the School:\n📞 Call: +91-8586858986 or +91-8006615154\n\nStep 3 — Visit the School:\n📍 Doon Sainik School, Dehradun, Uttarakhand\n\nStep 4 — Assessment & Interaction:\n• Brief interaction with the student\n• Assessment of current academic level\n• Course & batch recommendation\n\nStep 5 — Batch Enrollment:\n• Join the appropriate course batch\n• Collect study material\n• Begin coaching!\n\n🔗 Admission Procedure Page:\nhttps://doonsainikschool.com/admission-procedure/"
      },
      {
        id: 2,
        label: "📥 Download Admission Form 2025-26",
        trigger: ['2', 'download form', 'admission form', 'form download', 'application form'],
        response: "📥 Admission Form 2025-26:\n\n✅ Online Admission Form:\nhttps://doonsainikschool.com/wp-content/uploads/2025/06/04087b63-3b2e-4d9b-94cb-4271c47ee01f.pdf\n\n✅ Admission Procedure 2026 PDF:\nhttps://doonsainikschool.com/wp-content/uploads/2025/10/Admission-Procedure-Form-2026.pdf\n\n📌 Instructions:\n• Download and print the form\n• Fill all fields clearly\n• Attach recent passport photo\n• Attach previous academic records\n• Submit at school or call for guidance\n\n📞 Call for assistance: +91-8586858986\n🔗 Admission Page: https://doonsainikschool.com/admission-procedure/"
      },
      {
        id: 3,
        label: "📋 Documents Required",
        trigger: ['3', 'documents', 'required documents', 'what documents', 'papers needed'],
        response: "📋 Documents Required for Admission:\n\n✅ Mandatory Documents:\n• Completed Admission Form\n• Recent Passport Size Photographs (4 copies)\n• Birth Certificate / Age Proof\n• Previous Class Marksheet / Report Card\n• School Transfer Certificate (if applicable)\n• Aadhar Card (Student + Parent)\n• Domicile / Address Proof\n\n📌 For Competitive Exam Coaching:\n• Previous exam admit cards (if any)\n• Relevant entrance exam registration details\n\n⚠️ Note:\nAll documents should be self-attested by parent/guardian.\n\n📞 Confirm documents: +91-8586858986\n🔗 More Details: https://doonsainikschool.com/admission-procedure/"
      },
      {
        id: 4,
        label: "🗓️ Admission Open — Batch Details",
        trigger: ['4', 'batch', 'batch details', 'when admission', 'admission open', 'when classes start'],
        response: "🗓️ Admission Status & Batches:\n\n🟢 Admission Open: 2025-26\n\n📚 Current Batches Available:\n✅ RIMC Coaching Batch\n✅ Sainik School (AISSEE) — Class 6 Batch\n✅ Sainik School (AISSEE) — Class 9 Batch\n✅ Military School (RMS) Batch\n✅ Navodaya Vidyalaya (JNVST) Batch\n✅ Welham Boys/Girls Batch\n✅ NDA Foundation Batch\n\n⚡ Limited Seats — Early Enrollment Recommended!\n\n📞 Enquire Now: +91-8586858986 | +91-8006615154\n🌐 Website: https://doonsainikschool.com/\n📥 Register Now: https://doonsainikschool.com/wp-content/uploads/2025/06/04087b63-3b2e-4d9b-94cb-4271c47ee01f.pdf"
      }
    ]
  },

  // ==============================================
  // FEE STRUCTURE
  // ==============================================
  fee_structure: {
    keywords: [
      'fee', 'fees', 'fee structure', 'cost', 'charges', 'how much',
      'tuition fee', 'coaching fee', 'monthly fee', 'annual fee',
      'fee details', 'fee information', 'pricing', 'total cost',
      'fee for rimc', 'fee for sainik', 'hostel fee', 'coaching charges'
    ],
    answer: "💰 Fee Structure — Doon Sainik School:\n\nWhat would you like to know?",
    hasOptions: true,
    options: [
      {
        id: 1,
        label: "💰 Fee Structure Overview",
        trigger: ['1', 'fee overview', 'general fee', 'fee structure'],
        response: "💰 Fee Structure — Doon Sainik School:\n\nFor the most accurate and updated fee structure, please:\n\n📞 Call Directly:\n• +91-8586858986\n• +91-8006615154\n\n🔗 Visit Fee Structure Page:\nhttps://doonsainikschool.com/fee-structure/\n\n📥 Download Prospectus (includes fee details):\nhttps://doonsainikschool.com/wp-content/uploads/2025/10/1new-2026-Prospects-Doon-sainik-111.pdf-1_compressed.pdf\n\n📌 Fee includes:\n✅ Complete course coaching\n✅ Study material & notes\n✅ Mock test papers\n✅ Practice test series\n✅ Regular assessments\n\n⚠️ Note: Fee may vary based on course, batch timing & duration."
      },
      {
        id: 2,
        label: "📥 Download Fee Prospectus",
        trigger: ['2', 'download fee', 'fee prospectus', 'fee pdf', 'fee brochure'],
        response: "📥 Download Fee Structure & Prospectus:\n\n✅ Doon Sainik School Prospectus 2026:\nhttps://doonsainikschool.com/wp-content/uploads/2025/10/1new-2026-Prospects-Doon-sainik-111.pdf-1_compressed.pdf\n\n✅ RIMC Coaching after NDA — Prospectus:\nhttps://doonsainikschool.com/wp-content/uploads/2025/10/1new-2026-Prospects-Doon-sainik-111111-1_compressed.pdf\n\n✅ Military School Coaching PDF:\nhttps://doonsainikschool.com/wp-content/uploads/2025/10/Best-Military-School-School-Coaching-in-Dehradun.pdf-3.pdf\n\n📞 For custom fee quotation: +91-8586858986\n🔗 Fee Page: https://doonsainikschool.com/fee-structure/"
      },
      {
        id: 3,
        label: "🏦 Scholarship & Concession",
        trigger: ['3', 'scholarship', 'concession', 'discount', 'fee waiver', 'financial help'],
        response: "🏆 Scholarship & Fee Concession:\n\nDoon Sainik School values merit and dedication.\n\n✅ Merit-based concessions available for:\n• Exceptional academic performers\n• Proven competitive exam qualifiers\n• Siblings of current students\n• Early admission registrations\n\n✅ Special consideration for:\n• Ward of defence personnel\n• Economically deserving meritorious students\n\n📞 For scholarship details, contact directly:\n• +91-8586858986\n• +91-8006615154\n\n🔗 Visit: https://doonsainikschool.com/fee-structure/\n\n⚠️ Conditions apply. Seats are limited."
      }
    ]
  },

  // ==============================================
  // STUDY MATERIALS & RESOURCES MENU
  // ==============================================
  study_materials: {
    keywords: [
      'study material', 'notes', 'pdf', 'study notes', 'download notes',
      'mock test', 'mock tests', 'practice test', 'sample paper', 'previous paper',
      'resources', 'study resources', 'free notes', 'entrance exam notes',
      'class 6 notes', 'class 9 notes', 'maths notes', 'english notes',
      'science notes', 'social science notes', 'gk notes', 'current affairs',
      'free material', 'study pdf', 'question paper'
    ],
    answer: "📚 Study Materials & Resources:\n\nWhat subject or course material are you looking for?",
    hasOptions: true,
    options: [
      {
        id: 1,
        label: "1️⃣ Mock Tests & Practice Papers",
        trigger: ['1', 'mock test', 'practice test', 'sample paper', 'previous paper'],
        response: "📝 Mock Tests & Practice Papers — Free Download:\n\n⚔️ Sainik School Mock Tests:\n✅ All India Sainik School Mock Test 2025:\nhttps://doonsainikschool.com/wp-content/uploads/2025/06/2b0f4612-b189-45aa-891a-52ea5bc64174.pdf\n✅ Sainik School Class 9 Mock Test:\nhttps://doonsainikschool.com/wp-content/uploads/2025/06/020af037-5a9a-413b-9498-696a5f7c33fa.pdf\n✅ Sainik School Entrance Exam Class 9:\nhttps://doonsainikschool.com/wp-content/uploads/2025/06/deb0d9c4-6f56-40db-aa77-0b4882204a50.pdf\n✅ Sainik School Class 6 Mock Test:\nhttps://doonsainikschool.com/wp-content/uploads/2025/06/fa72763a-cab5-4b61-9532-ccc6736766ca.pdf\n\n📐 Mathematics Mock Tests:\n✅ Math Mock Test:\nhttps://doonsainikschool.com/wp-content/uploads/2025/06/d7bd51f6-49a5-4149-bbb1-1f0463ec7b61.pdf\n\n🏫 Navodaya Mock Test:\n✅ Class 6 Mock Test:\nhttps://doonsainikschool.com/wp-content/uploads/2025/06/374d6c3e-7213-4945-89f7-4913c3cb5e31.pdf\n\n📞 For complete test series: +91-8586858986"
      },
      {
        id: 2,
        label: "2️⃣ English Study Notes",
        trigger: ['2', 'english notes', 'english material', 'english grammar', 'english study'],
        response: "📖 English Study Materials — Free Download:\n\n✅ English Mock Test 2025:\nhttps://doonsainikschool.com/wp-content/uploads/2025/10/English-JUN-231.pdf-Doon-Sainik-School-3.pdf\n\n✅ English Phrase Notes:\nhttps://doonsainikschool.com/wp-content/uploads/2025/06/b3c369ee-5772-4669-9550-88d0ced4de92.pdf\n\n✅ English Clause Notes:\nhttps://doonsainikschool.com/wp-content/uploads/2025/06/71626d9f-2a2f-49f2-81dc-b29129c40ee1.pdf\n\n✅ Article Writing (English):\nhttps://doonsainikschool.com/wp-content/uploads/2025/06/8f4693f7-e4d4-4b78-8637-1e5a3850484c.pdf\n\n✅ English Adverbs Notes:\nhttps://doonsainikschool.com/wp-content/uploads/2025/06/d66a624f-dfe9-48ad-b869-154d7ad457e9.pdf\n\n✅ English Adjectives Notes:\nhttps://doonsainikschool.com/wp-content/uploads/2025/06/08c11800-2d1b-4aa4-8d2f-8c756f0d6ca1.pdf\n\n✅ Important Notes for RIMC English:\nhttps://doonsainikschool.com/wp-content/uploads/2025/06/c7895fbe-49b3-4dfd-b527-4272f9bebac5.pdf\n\n🔗 More Resources: https://doonsainikschool.com/?page_id=636"
      },
      {
        id: 3,
        label: "3️⃣ Mathematics Study Notes",
        trigger: ['3', 'maths notes', 'mathematics notes', 'maths material', 'math study'],
        response: "📐 Mathematics Study Materials — Free Download:\n\n✅ Math Mock Test:\nhttps://doonsainikschool.com/wp-content/uploads/2025/06/d7bd51f6-49a5-4149-bbb1-1f0463ec7b61.pdf\n\n✅ Maths Resources Page:\nhttps://doonsainikschool.com/?page_id=638\n\n📚 Entrance Exam Maths Papers:\n✅ Maths for NDA Foundation:\n(Available at Resources Section)\n✅ Maths for Class 8th & 9th:\n(Available at Resources Section)\n✅ Maths for Class 4th & 5th:\n(Available at Resources Section)\n✅ Maths for Class 3rd:\n(Available at Resources Section)\n✅ Sample Paper Maths — Class 4th & 5th:\n(Available at Resources Section)\n\n📥 Access All Maths Resources:\nhttps://doonsainikschool.com/\n\n📞 For printed material: +91-8586858986"
      },
      {
        id: 4,
        label: "4️⃣ Science & Biology Notes",
        trigger: ['4', 'science notes', 'biology notes', 'science material', 'science study'],
        response: "🔬 Science & Biology Study Materials — Free Download:\n\n✅ Biology Notes — Sainik & Military School (Class 8th & 9th):\nhttps://doonsainikschool.com/wp-content/uploads/2025/06/561af9c0-008a-4b50-b5ce-c6d7a4bb0fb7.pdf\n\n✅ Biology Reproduction — NEET:\nhttps://doonsainikschool.com/wp-content/uploads/2025/06/3c40fac4-362b-42fa-88c7-f147d03c77f8.pdf\n\n✅ Biology NEET Notes:\nhttps://doonsainikschool.com/wp-content/uploads/2025/06/a8417b3b-f815-4ef4-be7c-21ff45895359-1.pdf\n\n✅ Biology — Microorganisms (Class 8th):\n(Available at Resources Section)\n\n✅ Biology — Tissue Chapter (Class 9th):\n(Available at Resources Section)\n\n✅ Physics — Friction Chapter (Class 8th):\n(Available at Resources Section)\n\n✅ Chemistry — Metals & Non-Metals (Class 8th):\n(Available at Resources Section)\n\n✅ Chemistry — Atomic Structure (Class 9th):\n(Available at Resources Section)\n\n🔗 Science Resources: https://doonsainikschool.com/?page_id=640"
      },
      {
        id: 5,
        label: "5️⃣ Social Science & Civics Notes",
        trigger: ['5', 'social science notes', 'civics notes', 'social study', 'gk notes'],
        response: "🌍 Social Science & Civics Materials — Free Download:\n\n✅ Civics Study Material:\nhttps://doonsainikschool.com/wp-content/uploads/2025/06/9ea57aa2-19e3-476c-9490-5e914870cfb9.pdf\n\n✅ General Study (Social Science Modal):\nhttps://doonsainikschool.com/wp-content/uploads/2025/06/Social-science-modal.pdf\n\n✅ Social Science — Disaster Management (Class 8th):\n(Available at Resources Section)\n\n✅ Social Science Resources Page:\nhttps://doonsainikschool.com/?page_id=642\n\n✅ Class IX Syllabus:\nhttps://doonsainikschool.com/wp-content/uploads/2025/06/de9da26b-fe75-4fe0-bd7a-4f32b3b1bf11.pdf\n\n🔗 All Resources: https://doonsainikschool.com/\n📞 For complete material kit: +91-8586858986"
      }
    ]
  },

  // ==============================================
  // ABOUT SCHOOL
  // ==============================================
  about_school: {
    keywords: [
      'about', 'about school', 'about us', 'doon sainik school', 'school info',
      'school details', 'overview', 'introduction', 'history', 'founded',
      'best sainik school', 'who are you', 'what is doon sainik school',
      'school background', 'school profile', 'about doon sainik'
    ],
    answer: "🏫 About Doon Sainik School:\n\nDoon Sainik School, Dehradun is Uttarakhand's premier coaching institution specializing in preparing students for India's most prestigious military and defence schools — RIMC, Sainik Schools, Rashtriya Military Schools, Navodaya Vidyalaya, Welham Schools, and NDA Foundation.\n\n🌟 Why Doon Sainik School?\n✅ Located in Dehradun — India's Defence Education Hub\n✅ Expert Faculty including retired Army Officers\n✅ Proven Track Record of selections in RIMC, Sainik & Military Schools\n✅ Comprehensive study material & regular mock tests\n✅ Small batches for personalized attention\n✅ Both Residential & Day Scholar batches available\n✅ Admissions Open for 2025-26\n\n📞 Contact: +91-8586858986 | +91-8006615154\n🌐 Website: https://doonsainikschool.com/about-us/\n📘 Facebook: https://www.facebook.com/DOON-Military-School-Dehradun-100558795124194\n▶️ YouTube: https://www.youtube.com/channel/UCWzmioLOyC9xVG0h_8_lWvw/videos"
  },

  // ==============================================
  // FACULTY
  // ==============================================
  faculty: {
    keywords: [
      'faculty', 'teachers', 'staff', 'instructors', 'coaching staff',
      'teaching quality', 'teacher qualification', 'who teaches',
      'expert teachers', 'army teachers', 'faculty details', 'faculty page',
      'experienced teachers', 'retired officers', 'expert faculty'
    ],
    answer: "👨‍🏫 Faculty at Doon Sainik School:\n\n🌟 Our Faculty Includes:\n✅ Retired Indian Army Officers with extensive NDA/RIMC experience\n✅ Highly qualified subject matter experts\n✅ Experienced entrance exam coaches with proven results\n✅ Dedicated teachers for each subject\n✅ Regular faculty training & development\n\n🎯 Our Teaching Approach:\n• Personal attention in small batch sizes\n• Strong focus on concept clarity\n• Regular doubt-clearing sessions\n• Comprehensive test series\n• Motivational guidance for military career\n\n🔗 Meet Our Faculty:\nhttps://doonsainikschool.com/faculty/\n\n📞 For faculty interaction: +91-8586858986"
  },

  // ==============================================
  // RESULTS & ACHIEVEMENTS
  // ==============================================
  results: {
    keywords: [
      'result', 'results', 'selections', 'achievements', 'success rate',
      'past results', 'selected students', 'toppers', 'how many selected',
      'success story', 'our results', 'merit list', 'rank',
      'students selected', 'school results', 'past performance',
      'how good is school', 'track record'
    ],
    answer: "🏆 Results & Achievements — Doon Sainik School:\n\n🎖️ Our proud track record of students selected in:\n✅ RIMC (Rashtriya Indian Military College)\n✅ Sainik Schools across India\n✅ Rashtriya Military Schools (RMS)\n✅ Navodaya Vidyalaya (JNV)\n✅ Welham Boys & Girls School\n✅ NDA (National Defence Academy)\n\n📊 Our results speak for themselves!\n\nView detailed results and selections on our Results Page:\n🔗 https://doonsainikschool.com/result/\n\n🎥 Watch student testimonials:\nhttps://www.youtube.com/channel/UCWzmioLOyC9xVG0h_8_lWvw/videos\n\n📞 For results inquiry: +91-8586858986"
  },

  // ==============================================
  // CONTACT INFORMATION
  // ==============================================
  contact: {
    keywords: [
      'contact', 'phone', 'email', 'address', 'reach', 'call',
      'number', 'how to contact', 'contact number', 'contact details',
      'school address', 'location', 'where', 'map', 'directions',
      'helpline', 'enquiry', 'inquiry', 'reach out', 'get in touch',
      'school phone number', 'call now', 'whatsapp'
    ],
    answer: "📞 Contact — Doon Sainik School:\n\n🏫 Doon Sainik School\n📍 Dehradun, Uttarakhand, India\n\n📞 Phone Numbers:\n• +91-8006615154\n• +91-8586858986\n\n🌐 Website: https://doonsainikschool.com/\n🔗 Contact Page: https://doonsainikschool.com/contact-us/\n\n📘 Facebook:\nhttps://www.facebook.com/DOON-Military-School-Dehradun-100558795124194\n\n▶️ YouTube Channel:\nhttps://www.youtube.com/channel/UCWzmioLOyC9xVG0h_8_lWvw/videos\n\n🗓️ Office Hours:\nMonday to Saturday: 9:00 AM – 6:00 PM\n\n📥 Download Admission Form:\nhttps://doonsainikschool.com/wp-content/uploads/2025/06/04087b63-3b2e-4d9b-94cb-4271c47ee01f.pdf"
  },

  // ==============================================
  // AGE CALCULATOR
  // ==============================================
  age_calculator: {
    keywords: [
      'age calculator', 'check age', 'age eligibility', 'am i eligible',
      'age check', 'how to check age', 'eligible or not', 'age tool',
      'calculate age', 'age for rimc', 'age for sainik', 'age for nda',
      'minimum age', 'maximum age', 'overage', 'underage'
    ],
    answer: "🔢 Age Eligibility Calculator:\n\nCheck if your child is eligible for various entrance exams:\n\n🔗 Use Our Free Age Calculator:\nhttps://doonsainikschool.com/\n\n📋 Quick Age Reference:\n✅ RIMC: 11.5 to 13 years\n✅ Sainik School (Class 6): 10 to 12 years\n✅ Sainik School (Class 9): 13 to 15 years\n✅ RMS (Class 6): 10 to 12 years\n✅ JNV (Class 6): 9 to 13 years\n✅ NDA: 16.5 to 19.5 years (Class 12 pass)\n\n⚠️ Age is calculated as on 1st April of the admission year.\n\n📞 Confirm eligibility: +91-8586858986"
  },

  // ==============================================
  // PROSPECTS & BROCHURES
  // ==============================================
  prospects: {
    keywords: [
      'prospects', 'brochure', 'prospectus', 'school brochure', 'download brochure',
      'school leaflet', 'information pack', 'course brochure', 'school pdf',
      'detailed information', 'complete information pdf', 'school booklet'
    ],
    answer: "📋 School Prospectus & Brochures — Free Download:\n\n✅ Doon Sainik School Prospectus 2026:\nhttps://doonsainikschool.com/wp-content/uploads/2025/10/1new-2026-Prospects-Doon-sainik-111.pdf-1_compressed.pdf\n\n✅ RIMC Coaching & NDA (after 10th) Prospectus:\nhttps://doonsainikschool.com/wp-content/uploads/2025/10/1new-2026-Prospects-Doon-sainik-111111-1_compressed.pdf\n\n✅ Military School Coaching Brochure:\nhttps://doonsainikschool.com/wp-content/uploads/2025/10/Best-Military-School-School-Coaching-in-Dehradun.pdf-3.pdf\n\n✅ Admission Procedure Form 2026:\nhttps://doonsainikschool.com/wp-content/uploads/2025/10/Admission-Procedure-Form-2026.pdf\n\n✅ Admission Form 2025-26:\nhttps://doonsainikschool.com/wp-content/uploads/2025/06/04087b63-3b2e-4d9b-94cb-4271c47ee01f.pdf\n\n🔗 Prospects Page: https://doonsainikschool.com/prospects/\n📞 For hard copy: +91-8586858986"
  },

  // ==============================================
  // GALLERY
  // ==============================================
  gallery: {
    keywords: [
      'gallery', 'photos', 'pictures', 'campus photos', 'school images',
      'classroom photos', 'student photos', 'school gallery', 'images',
      'view photos', 'school pictures', 'facility photos'
    ],
    answer: "🖼️ School Gallery:\n\nExplore Doon Sainik School through our photo gallery!\n\n🔗 View School Gallery:\nhttps://doonsainikschool.com/gallery/\n\n🎥 Watch Our Videos:\nhttps://www.youtube.com/channel/UCWzmioLOyC9xVG0h_8_lWvw/videos\n\n📘 Follow us on Facebook for regular updates:\nhttps://www.facebook.com/DOON-Military-School-Dehradun-100558795124194\n\n📞 For campus visit: +91-8586858986"
  },

  // ==============================================
  // BLOGS
  // ==============================================
  blogs: {
    keywords: [
      'blog', 'blogs', 'articles', 'news', 'updates', 'latest news',
      'read articles', 'school blog', 'educational articles', 'tips',
      'exam tips', 'preparation tips', 'career advice'
    ],
    answer: "📝 Blogs & Articles — Doon Sainik School:\n\nRead expert articles on:\n✅ Sainik School Entrance Exam Preparation Tips\n✅ RIMC Coaching Strategies\n✅ Military School Selection Process\n✅ NDA Foundation Tips\n✅ Study strategies & time management\n✅ Career guidance for defence aspirants\n\n🔗 Read Our Blogs:\nhttps://doonsainikschool.com/blogs/\n\n📞 For career counseling: +91-8586858986"
  },

  // ==============================================
  // THANKS / ACKNOWLEDGEMENT
  // ==============================================
  thanks: {
    keywords: [
      'thank you', 'thanks', 'thnx', 'thankyou', 'ok', 'okay', 'okk',
      'k', 'great', 'good', 'nice', 'alright', 'perfect', 'excellent',
      'awesome', 'helpful', 'got it', 'understood', 'fine', 'sure'
    ],
    answer: "😊 You're Welcome!\n\nIt's our pleasure to assist you in your military school journey.\n\nIf you have any more questions about courses, admissions, study material, or results — feel free to ask anytime!\n\n📞 Direct Contact:\n• +91-8586858986\n• +91-8006615154\n\n🌐 Website: https://doonsainikschool.com/\n\nAll the best for your preparation! 🎖️"
  },

  // ==============================================
  // VISION & MISSION
  // ==============================================
  vision: {
    keywords: [
      'vision', 'mission', 'goal', 'objective', 'purpose', 'school vision',
      'mission statement', 'core values', 'school philosophy', 'aim',
      'what is your aim', 'school motto', 'school goals'
    ],
    answer: "🎯 Vision & Mission — Doon Sainik School:\n\n🌟 Our Vision:\nTo be the most trusted and result-oriented coaching institution in India for defence and military school entrances, nurturing disciplined, confident, and academically excellent future officers of India.\n\n🎖️ Our Mission:\n• Provide world-class coaching for RIMC, Sainik Schools, Military Schools, NDA, and Navodaya Vidyalaya\n• Build strong foundational academics with military values\n• Develop discipline, leadership, and physical fitness\n• Guide every student to achieve their defence career dreams\n• Deliver consistent, proven results year after year\n\n📞 Contact: +91-8586858986\n🔗 About Us: https://doonsainikschool.com/about-us/"
  },

  // ==============================================
  // YOUTUBE CHANNEL
  // ==============================================
  youtube: {
    keywords: [
      'youtube', 'video', 'videos', 'channel', 'youtube channel',
      'watch video', 'online lecture', 'video lecture', 'coaching video',
      'free video', 'educational video', 'online coaching'
    ],
    answer: "▶️ YouTube Channel — Doon Sainik School:\n\nWatch free educational videos, exam tips, and student success stories!\n\n🔗 Subscribe to Our Channel:\nhttps://www.youtube.com/channel/UCWzmioLOyC9xVG0h_8_lWvw/videos\n\n📺 Content Available:\n✅ RIMC Preparation Tips\n✅ Sainik School Entrance Guidance\n✅ Military School Coaching Videos\n✅ Maths & English Lectures\n✅ Student Testimonials & Results\n✅ Study tips & strategies\n\n📞 For live coaching: +91-8586858986"
  },

  // ==============================================
  // SOCIAL MEDIA
  // ==============================================
  social_media: {
    keywords: [
      'facebook', 'social media', 'instagram', 'follow', 'social',
      'facebook page', 'fb page', 'social media link', 'follow us'
    ],
    answer: "📱 Social Media — Doon Sainik School:\n\n📘 Facebook Page:\nhttps://www.facebook.com/DOON-Military-School-Dehradun-100558795124194\n\n▶️ YouTube Channel:\nhttps://www.youtube.com/channel/UCWzmioLOyC9xVG0h_8_lWvw/videos\n\n🌐 Official Website:\nhttps://doonsainikschool.com/\n\nFollow us for:\n✅ Latest exam notifications\n✅ Study tips & free material\n✅ School news & updates\n✅ Student success stories\n✅ Admission announcements\n\n📞 Contact: +91-8586858986"
  },

  // ==============================================
  // ENTRANCE EXAM INFORMATION
  // ==============================================
  entrance_exams: {
    keywords: [
      'entrance exam', 'entrance', 'competitive exam', 'exam info',
      'all exams', 'defence exams', 'military exams', 'exam list',
      'which exam', 'exam schedule', 'exam dates', 'exam calendar',
      'upcoming exams', 'defence entrance', 'exam notification'
    ],
    answer: "📅 Defence School Entrance Exams — Overview:\n\nWhat would you like to know?",
    hasOptions: true,
    options: [
      {
        id: 1,
        label: "📋 All Entrance Exams List",
        trigger: ['1', 'all exams', 'exam list', 'which exams', 'complete list'],
        response: "📋 Defence School Entrance Exams — Complete List:\n\n🎖️ RIMC Entrance Exam:\n• For: Class 8 entry, Boys aged 11.5–13 yrs\n• Conducted by: Indian Army\n• Schedule: June & December\n\n⚔️ AISSEE (Sainik School):\n• For: Class 6 & 9 entry, Boys & Girls\n• Conducted by: NTA (National Testing Agency)\n• Schedule: January every year\n\n🪖 RMS Entrance Exam:\n• For: Class 6 entry, Boys aged 10–12 yrs\n• Conducted by: Rashtriya Military Schools\n• Schedule: December every year\n\n🏫 JNVST (Navodaya Vidyalaya):\n• For: Class 6 entry, Boys & Girls\n• Conducted by: NVS\n• Schedule: April/May & October\n\n🏅 NDA Entrance (UPSC):\n• For: Class 12 pass, Boys aged 16.5–19.5 yrs\n• Conducted by: UPSC\n• Schedule: April & September\n\n📞 For exam guidance: +91-8586858986"
      },
      {
        id: 2,
        label: "📥 Download Exam Mock Tests",
        trigger: ['2', 'download exam papers', 'exam papers', 'previous papers', 'past papers'],
        response: "📥 Entrance Exam Mock Tests — Free Download:\n\n✅ AISSEE 2025 Mock Test:\nhttps://doonsainikschool.com/wp-content/uploads/2025/06/2b0f4612-b189-45aa-891a-52ea5bc64174.pdf\n\n✅ Sainik School Class 9 Mock:\nhttps://doonsainikschool.com/wp-content/uploads/2025/06/020af037-5a9a-413b-9498-696a5f7c33fa.pdf\n\n✅ Sainik School Class 6 Mock:\nhttps://doonsainikschool.com/wp-content/uploads/2025/06/fa72763a-cab5-4b61-9532-ccc6736766ca.pdf\n\n✅ English Mock Test 2025:\nhttps://doonsainikschool.com/wp-content/uploads/2025/10/English-JUN-231.pdf-Doon-Sainik-School-3.pdf\n\n✅ Mathematics Mock Test:\nhttps://doonsainikschool.com/wp-content/uploads/2025/06/d7bd51f6-49a5-4149-bbb1-1f0463ec7b61.pdf\n\n✅ Navodaya Class 6 Mock Test:\nhttps://doonsainikschool.com/wp-content/uploads/2025/06/374d6c3e-7213-4945-89f7-4913c3cb5e31.pdf\n\n📞 For complete test series: +91-8586858986"
      }
    ]
  },

  // ==============================================
  // WHY CHOOSE US
  // ==============================================
  why_choose_us: {
    keywords: [
      'why choose', 'why doon sainik', 'benefits', 'advantages',
      'best school', 'why us', 'why join', 'unique features',
      'what makes you special', 'better than others', 'top coaching',
      'best coaching in dehradun', 'best military coaching'
    ],
    answer: "⭐ Why Choose Doon Sainik School?\n\n🥇 What Sets Us Apart:\n\n🎖️ Expert Faculty:\n✅ Retired Indian Army officers as mentors\n✅ Specialized subject experts with years of experience\n\n📊 Proven Results:\n✅ Consistent selections in RIMC, Sainik, RMS & NDA\n✅ High success rate year after year\n✅ Hundreds of students selected every year\n\n📚 Comprehensive Coaching:\n✅ Complete syllabus coverage\n✅ Daily practice tests & mock exams\n✅ Previous years' question papers\n✅ Regular progress assessment\n\n🏋️ Holistic Development:\n✅ Physical fitness training guidance\n✅ Personality & confidence development\n✅ Viva Voce & Interview preparation\n✅ Discipline & military values inculcation\n\n🌐 Location Advantage:\n✅ Based in Dehradun — India's Defence School Hub\n✅ Near RIMC, IMA, Sainik School Ghorakhal\n\n📞 Contact: +91-8586858986\n🔗 Visit: https://doonsainikschool.com/"
  },

  // ==============================================
  // PRIVACY & SECURITY
  // ==============================================
  privacy: {
    keywords: ['privacy', 'data privacy', 'confidential', 'information security', 'personal data'],
    answer: "🔒 Privacy Policy:\n\nDoon Sainik School values your privacy. This chatbot never shares personal or confidential student information. All collected data is used solely to provide better assistance and follow-up for your coaching enquiry.\n\n🌐 For complete privacy policy: https://doonsainikschool.com/"
  }
};


// ==============================================
// EMAIL — NEW USER REGISTRATION NOTIFICATION
// ==============================================
async function sendAdminEmail(userDetails) {
  try {
    const mailOptions = {
      from: EMAIL_CONFIG.auth.user,
      to: ADMIN_EMAIL,
      subject: '🎖️ New User — Doon Sainik School Chatbot',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Segoe UI', Arial, sans-serif; background: #f0f4f8; }
            .wrapper { max-width: 580px; margin: 30px auto; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.12); }
            .header { background: linear-gradient(135deg, #1a2a4a 0%, #0d1a2e 100%); padding: 40px 30px; text-align: center; position: relative; }
            .header::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 5px; background: linear-gradient(90deg, #c8a84b, #e8c84b, #c8a84b); }
            .logo-circle { width: 90px; height: 90px; border-radius: 50%; overflow: hidden; margin: 0 auto 18px auto; border: 3px solid rgba(200,168,75,0.6); box-shadow: 0 0 0 6px rgba(200,168,75,0.15); background: white; display:flex; align-items:center; justify-content:center; font-size:36px; }
            .header h1 { color: #ffffff; font-size: 22px; font-weight: 700; letter-spacing: 1px; margin-bottom: 6px; }
            .header p { color: rgba(255,255,255,0.6); font-size: 12px; }
            .new-badge { display: inline-block; background: linear-gradient(135deg, #c8a84b, #a8882b); color: white; padding: 6px 18px; border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-top: 14px; }
            .body { background: #ffffff; padding: 35px 30px; }
            .section-label { font-size: 11px; font-weight: 700; color: #a0aec0; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid #c8a84b; display: inline-block; }
            .user-header { display: flex; align-items: center; gap: 16px; background: linear-gradient(135deg, #f7fafc, #edf2f7); border-radius: 12px; padding: 20px; margin-bottom: 20px; border-left: 4px solid #1a2a4a; }
            .avatar { width: 55px; height: 55px; background: linear-gradient(135deg, #1a2a4a, #2d4a7a); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0; }
            .uname { font-size: 20px; font-weight: 700; color: #1a202c; }
            .utag { font-size: 12px; color: #718096; margin-top: 3px; }
            .info-list { display: grid; gap: 10px; }
            .info-item { background: #f7fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px 18px; display: flex; align-items: center; gap: 14px; }
            .iicon { width: 38px; height: 38px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0; background: #f0f5ff; border: 1px solid rgba(200,168,75,0.3); }
            .ilabel { font-size: 10px; color: #a0aec0; text-transform: uppercase; letter-spacing: 1px; }
            .ivalue { font-size: 14px; color: #2d3748; font-weight: 600; margin-top: 2px; }
            .note-box { background: #fffbf0; border: 1px solid rgba(200,168,75,0.3); border-radius: 10px; padding: 16px 18px; margin-top: 20px; display: flex; gap: 12px; align-items: flex-start; }
            .note-box p { color: #744210; font-size: 13px; line-height: 1.6; }
            .footer { background: #1a2a4a; padding: 25px 30px; text-align: center; }
            .footer .school { color: rgba(255,255,255,0.9); font-size: 13px; font-weight: 600; margin-bottom: 6px; }
            .divider { width: 40px; height: 2px; background: #c8a84b; margin: 8px auto 10px; border-radius: 2px; }
            .footer p { color: rgba(255,255,255,0.45); font-size: 11px; line-height: 1.8; }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="header">
              <div class="logo-circle">🎖️</div>
              <h1>New User Started Chat</h1>
              <p>A visitor has registered on the Doon Sainik School Chatbot</p>
              <span class="new-badge">✨ New Registration</span>
            </div>
            <div class="body">
              <div class="section-label">User Details</div>
              <div class="user-header">
                <div class="avatar">👤</div>
                <div>
                  <div class="uname">${userDetails.name}</div>
                  <div class="utag">New Chatbot User — Defence Aspirant</div>
                </div>
              </div>
              <div class="info-list">
                <div class="info-item">
                  <div class="iicon">📧</div>
                  <div>
                    <div class="ilabel">Email Address</div>
                    <div class="ivalue">${userDetails.email}</div>
                  </div>
                </div>
                <div class="info-item">
                  <div class="iicon">📱</div>
                  <div>
                    <div class="ilabel">Phone Number</div>
                    <div class="ivalue">${userDetails.phone}</div>
                  </div>
                </div>
                <div class="info-item">
                  <div class="iicon">⏰</div>
                  <div>
                    <div class="ilabel">Registration Time</div>
                    <div class="ivalue">${new Date().toLocaleString('en-IN', {
                      timeZone: 'Asia/Kolkata',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })} IST</div>
                  </div>
                </div>
              </div>
              <div class="note-box">
                <div style="font-size:20px;flex-shrink:0;margin-top:2px;">💡</div>
                <p>This user has registered on the Doon Sainik School chatbot and may have a coaching or admission enquiry. Consider following up within 24 hours.</p>
              </div>
            </div>
            <div class="footer">
              <div class="school">Doon Sainik School — Dehradun</div>
              <div class="divider"></div>
              <p>Automated notification from Doon Sainik School Chatbot System</p>
              <p>© ${new Date().getFullYear()} Doon Sainik School · Dehradun, Uttarakhand</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
    await transporter.sendMail(mailOptions);
    console.log('✅ Admin email sent!');
    return true;
  } catch (error) {
    console.error('❌ Email failed:', error.message);
    return false;
  }
}


// ==============================================
// EMAIL — CALLBACK REQUEST
// ==============================================
async function sendCallbackEmail(userDetails, query, callbackNumber) {
  try {
    const mailOptions = {
      from: EMAIL_CONFIG.auth.user,
      to: ADMIN_EMAIL,
      subject: '📞 Callback Request — Doon Sainik School Chatbot',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Segoe UI', Arial, sans-serif; background: #f0f4f8; }
            .wrapper { max-width: 620px; margin: 30px auto; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.15); }
            .header { background: linear-gradient(135deg, #1a2a4a 0%, #0d1a2e 100%); padding: 40px 30px; text-align: center; position: relative; }
            .header::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 5px; background: linear-gradient(90deg, #c8a84b, #e8c84b, #c8a84b); }
            .logo-circle { width: 90px; height: 90px; border-radius: 50%; overflow: hidden; margin: 0 auto 18px auto; border: 3px solid rgba(200,168,75,0.6); box-shadow: 0 0 0 6px rgba(200,168,75,0.15); display:flex; align-items:center; justify-content:center; font-size:36px; background:white; }
            .header h1 { color: #ffffff; font-size: 22px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 5px; }
            .header p { color: rgba(255,255,255,0.6); font-size: 12px; letter-spacing: 1px; }
            .alert-banner { background: linear-gradient(90deg, #c8a84b, #a8882b); padding: 14px 30px; text-align: center; }
            .alert-banner span { color: white; font-weight: 700; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; }
            .body { background: #ffffff; padding: 35px 30px; }
            .phone-box { background: linear-gradient(135deg, #1a2a4a 0%, #0d1a2e 100%); border-radius: 14px; padding: 28px; text-align: center; margin-bottom: 28px; box-shadow: 0 8px 25px rgba(26,42,74,0.3); border: 2px solid rgba(200,168,75,0.4); }
            .phone-box .plabel { color: rgba(255,255,255,0.6); font-size: 10px; letter-spacing: 4px; text-transform: uppercase; margin-bottom: 10px; }
            .phone-box .pnumber { color: #ffffff; font-size: 34px; font-weight: 800; letter-spacing: 4px; }
            .phone-box .pnumber span { color: #c8a84b; }
            .section-label { font-size: 11px; font-weight: 700; color: #a0aec0; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 14px; padding-bottom: 8px; border-bottom: 2px solid #c8a84b; display: inline-block; }
            .info-grid { display: grid; gap: 12px; margin-bottom: 24px; }
            .info-card { background: #f7fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px 18px; display: flex; align-items: center; gap: 14px; border-left: 4px solid #1a2a4a; }
            .icon-box { width: 42px; height: 42px; background: linear-gradient(135deg, #1a2a4a, #2d4a7a); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
            .ilabel { font-size: 10px; color: #a0aec0; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 3px; }
            .ivalue { font-size: 15px; color: #2d3748; font-weight: 600; }
            .query-box { background: #fffbf0; border: 1px solid rgba(200,168,75,0.3); border-left: 4px solid #c8a84b; border-radius: 10px; padding: 20px; margin-top: 5px; }
            .qlabel { color: #c8a84b; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; font-weight: 700; margin-bottom: 10px; }
            .qtext { color: #4a5568; font-size: 15px; line-height: 1.7; }
            .time-bar { background: #f7fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 18px; margin-top: 20px; display: flex; align-items: center; gap: 8px; }
            .time-bar span { color: #718096; font-size: 13px; }
            .footer { background: #1a2a4a; padding: 25px 30px; text-align: center; }
            .footer p { color: rgba(255,255,255,0.5); font-size: 12px; line-height: 1.8; }
            .footer .school { color: rgba(255,255,255,0.8); font-size: 13px; font-weight: 600; margin-bottom: 5px; }
            .divider { width: 40px; height: 2px; background: #c8a84b; margin: 10px auto; border-radius: 2px; }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="header">
              <div class="logo-circle">🎖️</div>
              <h1>Callback Request</h1>
              <p>Doon Sainik School · Dehradun</p>
            </div>
            <div class="alert-banner">
              <span>⚡ Action Required — Please Call Back</span>
            </div>
            <div class="body">
              <div class="phone-box">
                <div class="plabel">Callback Number</div>
                <div class="pnumber"><span>📱</span> ${callbackNumber}</div>
              </div>
              <div class="section-label">User Information</div>
              <div class="info-grid">
                <div class="info-card">
                  <div class="icon-box">👤</div>
                  <div>
                    <div class="ilabel">Full Name</div>
                    <div class="ivalue">${userDetails.name}</div>
                  </div>
                </div>
                <div class="info-card">
                  <div class="icon-box">📧</div>
                  <div>
                    <div class="ilabel">Email Address</div>
                    <div class="ivalue">${userDetails.email}</div>
                  </div>
                </div>
                <div class="info-card">
                  <div class="icon-box">📱</div>
                  <div>
                    <div class="ilabel">Registered Phone</div>
                    <div class="ivalue">${userDetails.phone}</div>
                  </div>
                </div>
              </div>
              <div class="section-label">Query Details</div>
              <div class="query-box">
                <div class="qlabel">❓ User's Question</div>
                <div class="qtext">${query}</div>
              </div>
              <div class="time-bar">
                <span>⏰</span>
                <span>Received: ${new Date().toLocaleString('en-IN', {
                  timeZone: 'Asia/Kolkata',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })} IST</span>
              </div>
            </div>
            <div class="footer">
              <p class="school">Doon Sainik School — Dehradun</p>
              <div class="divider"></div>
              <p>Automated message from Doon Sainik School Chatbot System</p>
              <p>Please call back at your earliest convenience</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
    await transporter.sendMail(mailOptions);
    console.log('✅ Callback email sent!');
    return true;
  } catch (error) {
    console.error('❌ Email failed:', error.message);
    return false;
  }
}


// ==============================================
// SMART KEYWORD MATCHING
// ==============================================
function findBestMatch(userMessage, lastTopic = null, lastOptionLevel = null, lastSelectedOption = null) {
  const msg = userMessage.toLowerCase().trim();

  // PRIORITY 1: Handle nested navigation
  if (lastTopic && KNOWLEDGE_BASE[lastTopic]) {
    const topicData = KNOWLEDGE_BASE[lastTopic];

    if (topicData.hasOptions) {
      if (lastOptionLevel === 'sub' && lastSelectedOption !== null && lastSelectedOption !== undefined) {
        const mainOption = topicData.options[lastSelectedOption];
        if (mainOption && mainOption.subOptions) {
          for (const subOption of mainOption.subOptions) {
            for (const trigger of subOption.trigger) {
              if (msg === trigger.toLowerCase()) {
                return {
                  answer: subOption.response,
                  topic: lastTopic,
                  hasOptions: false,
                  selectedOption: null,
                  optionLevel: null,
                  isFAQMenu: topicData.isFAQMenu || false,
                  isEmotionalMenu: false
                };
              }
            }
          }
          for (const subOption of mainOption.subOptions) {
            for (const trigger of subOption.trigger) {
              if (trigger.toLowerCase().length > 1 && msg.includes(trigger.toLowerCase())) {
                return {
                  answer: subOption.response,
                  topic: lastTopic,
                  hasOptions: false,
                  selectedOption: null,
                  optionLevel: null,
                  isFAQMenu: topicData.isFAQMenu || false,
                  isEmotionalMenu: false
                };
              }
            }
          }
        }
      }

      if (lastOptionLevel === 'main' || !lastOptionLevel) {
        for (let i = 0; i < topicData.options.length; i++) {
          const option = topicData.options[i];
          for (const trigger of option.trigger) {
            if (msg === trigger.toLowerCase()) {
              if (option.subOptions) {
                return {
                  answer: option.response,
                  topic: lastTopic,
                  hasOptions: true,
                  options: option.subOptions,
                  selectedOption: i,
                  optionLevel: 'sub',
                  isFAQMenu: topicData.isFAQMenu || false,
                  isEmotionalMenu: false
                };
              }
              return {
                answer: option.response,
                topic: lastTopic,
                hasOptions: false,
                selectedOption: null,
                optionLevel: null,
                isFAQMenu: topicData.isFAQMenu || false,
                isEmotionalMenu: false
              };
            }
          }
        }
        for (let i = 0; i < topicData.options.length; i++) {
          const option = topicData.options[i];
          for (const trigger of option.trigger) {
            if (trigger.toLowerCase().length > 1 && msg.includes(trigger.toLowerCase())) {
              if (option.subOptions) {
                return {
                  answer: option.response,
                  topic: lastTopic,
                  hasOptions: true,
                  options: option.subOptions,
                  selectedOption: i,
                  optionLevel: 'sub',
                  isFAQMenu: topicData.isFAQMenu || false,
                  isEmotionalMenu: false
                };
              }
              return {
                answer: option.response,
                topic: lastTopic,
                hasOptions: false,
                selectedOption: null,
                optionLevel: null,
                isFAQMenu: topicData.isFAQMenu || false,
                isEmotionalMenu: false
              };
            }
          }
        }
      }
    }
  }

  // PRIORITY 2: Global keyword search
  let bestMatch = null;
  let highestScore = 0;

  for (const [topic, data] of Object.entries(KNOWLEDGE_BASE)) {
    let score = 0;
    let matchedKeywords = [];

    for (const keyword of data.keywords) {
      const keywordLower = keyword.toLowerCase();
      if (msg === keywordLower) {
        score += 100;
        matchedKeywords.push(keyword);
      } else if (new RegExp(`\\b${keywordLower}\\b`, 'i').test(msg)) {
        score += 50;
        matchedKeywords.push(keyword);
      } else if (msg.includes(keywordLower)) {
        score += 10;
        matchedKeywords.push(keyword);
      }
    }

    if (score > highestScore && score > 0) {
      highestScore = score;
      bestMatch = {
        answer: data.answer,
        topic: topic,
        score: score,
        matchedKeywords: matchedKeywords,
        hasOptions: data.hasOptions || false,
        options: data.options || null,
        isFAQMenu: data.isFAQMenu || false,
        isEmotionalMenu: false,
        selectedOption: null,
        optionLevel: data.hasOptions ? 'main' : null
      };
    }
  }

  if (bestMatch && bestMatch.score >= 10) {
    console.log(`✅ Best Match: ${bestMatch.topic} (Score: ${bestMatch.score})`);
    return bestMatch;
  }

  return null;
}


// ==============================================
// GEMINI API FALLBACK
// ==============================================
async function callGemini(prompt) {
  if (!genAI) {
    throw new Error('Gemini API not initialized - API key missing');
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const systemContext = `You are a friendly and professional assistant for Doon Sainik School, Dehradun — a premier coaching institution for defence and military school entrances.

School Information:
- Name: Doon Sainik School
- Location: Dehradun, Uttarakhand
- Phone: +91-8006615154, +91-8586858986
- Website: https://doonsainikschool.com

Courses Offered:
- RIMC (Rashtriya Indian Military College) Coaching
- Sainik School Coaching (AISSEE — Class 6 & 9)
- Military School Coaching (RMS)
- Navodaya Vidyalaya Coaching (JNVST)
- Welham Boys/Girls School Coaching
- NDA Foundation Coaching

Guidelines:
- Answer ONLY questions related to Doon Sainik School, its courses, admissions, and defence school exams
- Keep responses friendly, professional, and concise
- For unrelated questions, politely redirect to school-related topics
- Use emojis appropriately
- If you don't know specific details, suggest contacting the school at +91-8586858986

User question: ${prompt}`;

    const result = await model.generateContent(systemContext);
    const response = await result.response;
    const text = response.text();

    if (!text) throw new Error('No response from Gemini');

    console.log('✅ Gemini API responded successfully');
    return text;
  } catch (error) {
    console.error('❌ Gemini Error:', error.message);
    throw error;
  }
}


// ==============================================
// ENDPOINTS
// ==============================================
app.get('/', (req, res) => {
  res.json({
    status: '✅ Server Running',
    message: 'Doon Sainik School Chatbot API - Production Ready',
    model: 'Google Gemini Pro + Comprehensive Knowledge Base',
    knowledgeBaseTopics: Object.keys(KNOWLEDGE_BASE).length,
    geminiConfigured: !!GEMINI_API_KEY,
    emailConfigured: !!EMAIL_CONFIG.auth.user && EMAIL_CONFIG.auth.user !== 'your-email@gmail.com',
    endpoints: {
      health: '/api/health',
      chat: '/api/chat (POST)',
      register: '/api/register (POST)',
      callback: '/api/callback-request (POST)',
      test: '/api/test'
    }
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    geminiConfigured: !!GEMINI_API_KEY,
    emailConfigured: !!EMAIL_CONFIG.auth.user && EMAIL_CONFIG.auth.user !== 'your-email@gmail.com'
  });
});

app.post('/api/register', async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ success: false, error: 'All fields (name, email, phone) are required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, error: 'Invalid email format' });
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone.replace(/\D/g, '').slice(-10))) {
      return res.status(400).json({ success: false, error: 'Invalid phone number' });
    }

    console.log('📝 New user registration:', { name, email, phone });

    const emailSent = await sendAdminEmail({ name, email, phone });

    res.json({ success: true, message: 'Registration successful! You can now start chatting.', emailSent });
  } catch (error) {
    console.error('❌ Registration error:', error);
    res.status(500).json({ success: false, error: 'Registration failed. Please try again.' });
  }
});

app.post('/api/callback-request', async (req, res) => {
  try {
    const { name, email, phone, query, callback_number } = req.body;

    if (!name || !email || !phone || !query || !callback_number) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    const cleanedNumber = callback_number.replace(/\D/g, '');
    if (!phoneRegex.test(cleanedNumber)) {
      return res.status(400).json({ success: false, error: 'Invalid callback number' });
    }

    console.log('📞 New callback request:', { name, callback_number, query });

    const emailSent = await sendCallbackEmail({ name, email, phone }, query, cleanedNumber);

    if (emailSent) {
      res.json({ success: true, message: 'Callback request received successfully' });
    } else {
      res.json({ success: false, message: 'Failed to send email notification' });
    }
  } catch (error) {
    console.error('❌ Callback request error:', error);
    res.status(500).json({ success: false, error: 'Failed to process callback request' });
  }
});

app.get('/api/test', async (req, res) => {
  try {
    if (!GEMINI_API_KEY) {
      return res.json({
        success: true,
        message: '✅ Server is working!',
        geminiStatus: 'Not configured (using Knowledge Base only)',
        emailStatus: EMAIL_CONFIG.auth.user && EMAIL_CONFIG.auth.user !== 'your-email@gmail.com' ? 'Configured ✅' : 'Not configured',
        knowledgeBaseTopics: Object.keys(KNOWLEDGE_BASE).length,
        mode: 'Knowledge Base Mode'
      });
    }

    const reply = await callGemini('Say "Hello! The Gemini API is working!" in one sentence.');
    res.json({
      success: true,
      message: '✅ Gemini API is WORKING!',
      testReply: reply,
      emailStatus: EMAIL_CONFIG.auth.user && EMAIL_CONFIG.auth.user !== 'your-email@gmail.com' ? 'Configured ✅' : 'Not configured',
      knowledgeBaseTopics: Object.keys(KNOWLEDGE_BASE).length,
      model: 'Google Gemini Pro'
    });
  } catch (error) {
    res.json({
      success: true,
      message: '✅ Server is working!',
      geminiStatus: 'Unavailable (' + error.message + ')',
      emailStatus: EMAIL_CONFIG.auth.user && EMAIL_CONFIG.auth.user !== 'your-email@gmail.com' ? 'Configured ✅' : 'Not configured',
      fallbackMode: 'Using comprehensive Knowledge Base',
      knowledgeBaseTopics: Object.keys(KNOWLEDGE_BASE).length
    });
  }
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message, lastTopic, lastOptionLevel, lastSelectedOption } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, error: 'Message is required' });
    }

    console.log(`📩 User: ${message}`);
    if (lastTopic) {
      console.log(`📌 Context — Topic: ${lastTopic}, Level: ${lastOptionLevel || 'main'}, Selected: ${lastSelectedOption}`);
    }

    const GREETINGS = [
      "Hello! 👋 Welcome to Doon Sainik School, Dehradun. How can I assist you today?\n\nI can help you with RIMC, Sainik School, Military School, Navodaya, NDA, admissions, study material, and much more! 🎖️",
      "Hi there! I'm the Doon Sainik School assistant. I'm here to guide you on RIMC coaching, Sainik School admissions, study materials, and all defence school queries! 🏅\n\nHow can I help you today?"
    ];

    if (/^(hi|hello|hey|good morning|good afternoon|good evening|namaste)/i.test(message.trim())) {
      const greeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
      return res.json({ success: true, reply: greeting, mode: 'greeting' });
    }

    const knowledgeMatch = findBestMatch(message, lastTopic, lastOptionLevel, lastSelectedOption);

    if (knowledgeMatch) {
      console.log(`✅ Knowledge Base Match — Topic: ${knowledgeMatch.topic}`);

      let reply = knowledgeMatch.answer;
      if (knowledgeMatch.hasOptions && knowledgeMatch.options) {
        reply += "\n\n";
        knowledgeMatch.options.forEach(opt => {
          reply += `${opt.label}\n`;
        });
      }

      return res.json({
        success: true,
        reply: reply,
        mode: 'knowledge-base',
        hasOptions: knowledgeMatch.hasOptions,
        options: knowledgeMatch.options || null,
        currentTopic: knowledgeMatch.topic,
        optionLevel: knowledgeMatch.optionLevel || null,
        selectedOption: knowledgeMatch.selectedOption,
        isFAQMenu: knowledgeMatch.isFAQMenu || false,
        isEmotionalMenu: false
      });
    }

    if (GEMINI_API_KEY) {
      try {
        const reply = await callGemini(message);
        return res.json({
          success: true,
          reply: reply.trim() + "\n\n🤖 *Powered by Google Gemini*",
          mode: 'ai-powered'
        });
      } catch (geminiError) {
        console.log('⚠️ Gemini unavailable, triggering callback');
      }
    }

    console.log('🔄 No match found — triggering callback collection');
    return res.json({
      success: true,
      reply: "I apologize, but I don't have specific information about that right now. 😊\n\nWould you like me to have someone from our team call you back to answer your question?\n\nIf yes, please provide your contact number below:",
      mode: 'callback-request',
      requiresCallback: true,
      userQuery: message
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
    res.json({
      success: true,
      reply: `I can help you with Doon Sainik School information! 😊\n\nFor detailed assistance:\n📞 Call: +91-8586858986\n📞 Call: +91-8006615154\n🌐 Website: https://doonsainikschool.com/`,
      mode: 'emergency-fallback'
    });
  }
});


// ==============================================
// SERVER START
// ==============================================
app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════════════╗');
  console.log('║  🎖️  DOON SAINIK SCHOOL CHATBOT — PRODUCTION  ║');
  console.log('╚══════════════════════════════════════════════╝');
  console.log(`🌐 Server: http://localhost:${PORT}`);
  console.log(`🧪 Test API: http://localhost:${PORT}/api/test`);
  console.log(`🤖 AI Model: ${GEMINI_API_KEY ? 'Google Gemini Pro ✅' : 'Not Configured ⚠️'}`);
  console.log(`📚 Knowledge Base: ${Object.keys(KNOWLEDGE_BASE).length} topics ✅`);
  console.log(`📧 Email: ${EMAIL_CONFIG.auth.user !== 'your-email@gmail.com' ? 'Configured ✅' : 'Not Configured ❌'}`);
  console.log(`✅ FAQ Navigation: Working`);
  console.log(`🎖️  RIMC Coaching: Covered`);
  console.log(`⚔️  Sainik School: Covered`);
  console.log(`🪖 Military School (RMS): Covered`);
  console.log(`🏫 Navodaya Vidyalaya: Covered`);
  console.log(`🎓 Welham School: Covered`);
  console.log(`🏅 NDA Foundation: Covered`);
  console.log(`📥 Study Materials & Mock Tests: Covered`);
  console.log(`⬅️  Back to Menu: Enabled`);
  console.log(`📞 Callback System: Active ✅`);
  console.log(`🔧 Production Ready! 🚀`);
  console.log('╚══════════════════════════════════════════════\n');

  if (!GEMINI_API_KEY) {
    console.log('⚠️  NOTE: Gemini API key not configured.');
    console.log('   Chatbot will use Knowledge Base + Callback system.\n');
  }

  if (EMAIL_CONFIG.auth.user === 'your-email@gmail.com') {
    console.log('⚠️  IMPORTANT: Update email credentials in .env file!');
    console.log('   Set ADMIN_EMAIL and EMAIL_PASSWORD in your .env\n');
  }
});