import internship from '../assets/images/certificates/sertifikat_Rizki Wahyu_magang_page-0001.jpg'
import outreach from '../assets/images/certificates/sertifikat lomba eduturism UMS_page-0001.jpg'
import connectivity from '../assets/images/certificates/25-06-12-08-18-43-sertifikat_page-0001.jpg'
import deepfake from '../assets/images/certificates/Sertifikat - Rizki_page-0001.jpg'
import literacy from '../assets/images/certificates/kominfo2_page-0001.jpg'
import english from '../assets/images/certificates/eli-ueu-20220801019-Rizki Wahyu_page-0001.jpg'
import mentality from '../assets/images/certificates/ESQ_page-0001.jpg'

// Transcribed from the supplied documents. An empty year means no clear issue date.
// The internship document has 2024 in its ID only; it is not used as an issue year.
export const certificates = [
  {
    id: 'winnicode-internship', title: 'Magang Mandiri',
    issuer: 'PT Winnicode Garuda Teknologi', year: '', category: 'Internship',
    image: internship, alt: 'Certificate for participation in the Winnicode independent internship program'
  },
  {
    id: 'ums-outreach',
    title: 'Edutourism Student Development and Outreach: Digital Technologies on Society',
    issuer: 'Faculty of Computing & Informatics, Universiti Malaysia Sabah',
    year: '2025', category: 'International / Outreach', image: outreach,
    alt: 'Certificate of completion for Edutourism Student Development and Outreach: Digital Technologies on Society'
  },
  {
    id: 'smart-connectivity',
    title: 'Smart Connectivity Revolution: Kolaborasi AI, IoT, dan Big Data di Era Teknologi 5.0',
    issuer: 'Prodi S1 Teknik Informatika, Universitas STEKOM',
    year: '2025', category: 'Technology / Webinar', image: connectivity,
    alt: 'Certificate of participation in the Smart Connectivity Revolution national webinar'
  },
  {
    id: 'jakarta-solid', title: 'Jakarta SOLID: Asli atau Buatan: Hasil Deepfake yang Sulit Dibedakan',
    issuer: 'Dinas Komunikasi, Informatika, dan Statistik Provinsi DKI Jakarta',
    year: '2025', category: 'Technology / Webinar', image: deepfake,
    alt: 'Certificate of participation in the Jakarta SOLID webinar about deepfakes'
  },
  {
    id: 'digital-literacy',
    title: 'Gerakan Literasi Pandu Digital Indonesia: Menumbuhkembangkan Budaya Melek Literasi Digital bagi Peserta Didik',
    issuer: 'Direktorat Pemberdayaan Informatika, Kominfo',
    year: '2022', category: 'Digital Literacy', image: literacy,
    alt: 'Certificate of participation in Gerakan Literasi Pandu Digital Indonesia'
  },
  {
    id: 'toefl-prediction', title: 'TOEFL Prediction Certificate',
    issuer: 'English Language Institute GMU Indonesia / Universitas Esa Unggul',
    year: '2023', category: 'English / Test', image: english,
    alt: 'TOEFL Prediction Certificate issued in 2023, with validity ending in February 2025'
  },
  {
    id: 'outstanding-mentality', title: 'Outstanding Mentality 1',
    issuer: 'Ruang Pelatihan by ESQ', year: '', category: 'Training', image: mentality,
    alt: 'Certificate of completion for Outstanding Mentality 1 by Ruang Pelatihan ESQ'
  }
]
