'use client';

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, ChevronDown, Check, LayoutTemplate, Map, 
  Handshake, Users, CalendarClock, FileText, Edit3, Eye, Briefcase
} from 'lucide-react';
import Link from 'next/link';
import AdsterraBanner from '@/components/AdsterraBanner'; 

export default function MOUPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Legal Editor...</div>}>
      <MOUBuilder />
    </Suspense>
  );
}

function MOUBuilder() {
  // --- STATE ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);

  // DATA DEFAULT (MOU)
  const [data, setData] = useState({
    day: 'Senin',
    date: '',
    city: 'Jakarta',
    // Pihak 1
    p1Name: 'PT. TEKNOLOGI MAJU', 
    p1Rep: 'Budi Santoso', // Penanggung Jawab
    p1Title: 'Direktur Utama', 
    p1Address: 'Gedung Cyber Lt. 5, Jl. Kuningan Barat, Jakarta Selatan',
    // Pihak 2
    p2Name: 'CV. KREATIF DIGITAL', 
    p2Rep: 'Siti Aminah', 
    p2Title: 'General Manager', 
    p2Address: 'Ruko Grand Depok City No. 12, Depok',
    // Isi Kerjasama
    cooperationTitle: 'PENGEMBANGAN PEMASARAN DIGITAL & BRANDING',
    scope: 'Pihak Pertama menunjuk Pihak Kedua sebagai mitra pelaksana untuk mengelola media sosial, pembuatan konten digital, dan strategi periklanan online produk Pihak Pertama.',
    period: '1 (Satu) Tahun',
    rightsObligations: 'Pihak Pertama berkewajiban menyediakan materi produk. Pihak Kedua berkewajiban membuat timeline konten bulanan dan laporan performa.',
    financing: 'Sistem bagi hasil (Revenue Sharing) sebesar 10% dari omzet penjualan online, dibayarkan setiap tanggal 5 bulan berikutnya.',
    witness1: 'Manager Marketing', 
    witness2: 'Head of Legal',
    additionalClause: '' 
  });

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const TEMPLATES = [
    { id: 1, name: "MOU Bisnis Formal", desc: "Pasal lengkap, layout korporat" },
    { id: 2, name: "MOU Kemitraan Simpel", desc: "Langsung ke poin kerjasama" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN KERTAS ---
  const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`
      bg-white shadow-2xl print:shadow-none mx-auto
      p-[20mm] 
      text-slate-900 font-serif leading-relaxed text-[11pt]
      relative box-border mb-8 print:mb-0 print:m-0
      w-[210mm] min-h-[296mm] h-auto
      ${className}
    `}>
      {children}
    </div>
  );

  // --- ISI DOKUMEN ---
  const DocumentContent = () => (
    <div className="flex flex-col gap-8 print:gap-0">
      {/* TEMPLATE 1: FORMAL */}
      {templateId === 1 && (
        <>
          <Kertas>
              <div className="text-center mb-8 pb-4 border-b-2 border-black">
                <h1 className="font-black text-xl uppercase tracking-widest underline">NOTA KESEPAHAMAN</h1>
                <h2 className="font-bold text-sm mt-1 uppercase">(MEMORANDUM OF UNDERSTANDING)</h2>
                <div className="mt-2 text-xs font-bold uppercase tracking-wide text-slate-600">TENTANG {data.cooperationTitle}</div>
              </div>

              <p className="mb-4 text-justify">Pada hari ini <strong>{data.day}</strong> tanggal <strong>{isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'}) : '...'}</strong>, bertempat di <strong>{data.city}</strong>, kami yang bertanda tangan di bawah ini:</p>

              {/* PIHAK 1 */}
              <div className="ml-4 mb-4 text-sm">
                <table className="w-full leading-snug">
                    <tbody>
                      <tr><td className="w-32 font-bold">Nama Instansi</td><td className="w-3">:</td><td className="font-bold uppercase">{data.p1Name}</td></tr>
                      <tr><td>Diwakili Oleh</td><td>:</td><td>{data.p1Rep}</td></tr>
                      <tr><td>Jabatan</td><td>:</td><td>{data.p1Title}</td></tr>
                      <tr><td className="align-top">Alamat</td><td className="align-top">:</td><td className="align-top">{data.p1Address}</td></tr>
                    </tbody>
                </table>
                <div className="mt-1 italic">Bertindak untuk dan atas nama <strong>{data.p1Name}</strong>, selanjutnya disebut <strong>PIHAK PERTAMA</strong>.</div>
              </div>

              {/* PIHAK 2 */}
              <div className="ml-4 mb-6 text-sm">
                <table className="w-full leading-snug">
                    <tbody>
                      <tr><td className="w-32 font-bold">Nama Instansi</td><td className="w-3">:</td><td className="font-bold uppercase">{data.p2Name}</td></tr>
                      <tr><td>Diwakili Oleh</td><td>:</td><td>{data.p2Rep}</td></tr>
                      <tr><td>Jabatan</td><td>:</td><td>{data.p2Title}</td></tr>
                      <tr><td className="align-top">Alamat</td><td className="align-top">:</td><td className="align-top">{data.p2Address}</td></tr>
                    </tbody>
                </table>
                <div className="mt-1 italic">Bertindak untuk dan atas nama <strong>{data.p2Name}</strong>, selanjutnya disebut <strong>PIHAK KEDUA</strong>.</div>
              </div>

              <p className="mb-4 text-justify">PIHAK PERTAMA dan PIHAK KEDUA (selanjutnya disebut "PARA PIHAK") sepakat untuk mengadakan kerjasama dengan ketentuan sebagai berikut:</p>

              {/* PASAL-PASAL */}
              <div className="space-y-4">
                <div>
                  <div className="text-center font-bold uppercase mb-1">PASAL 1<br/>MAKSUD DAN TUJUAN</div>
                  <p className="text-justify text-sm">Kerjasama ini bertujuan untuk mensinergikan potensi PARA PIHAK dalam rangka {data.cooperationTitle.toLowerCase()}.</p>
                </div>

                <div>
                  <div className="text-center font-bold uppercase mb-1">PASAL 2<br/>RUANG LINGKUP KERJASAMA</div>
                  <p className="text-justify text-sm">{data.scope}</p>
                </div>

                <div>
                  <div className="text-center font-bold uppercase mb-1">PASAL 3<br/>JANGKA WAKTU</div>
                  <p className="text-justify text-sm">Perjanjian ini berlaku selama <strong>{data.period}</strong> terhitung sejak ditandatanganinya surat ini dan dapat diperpanjang berdasarkan kesepakatan PARA PIHAK.</p>
                </div>
              </div>

              <div className="absolute bottom-10 right-10 text-[10px] text-slate-400 italic">Halaman 1 dari 2</div>
          </Kertas>

          <Kertas>
              <div className="space-y-6 text-justify pt-4">
                <div>
                    <div className="text-center font-bold uppercase mb-1">PASAL 4<br/>HAK DAN KEWAJIBAN</div>
                    <p className="text-justify text-sm">{data.rightsObligations}</p>
                </div>

                <div>
                    <div className="text-center font-bold uppercase mb-1">PASAL 5<br/>PEMBIAYAAN & KOMPENSASI</div>
                    <p className="text-justify text-sm">{data.financing}</p>
                </div>

                <div>
                    <div className="text-center font-bold uppercase mb-1">PASAL 6<br/>PENYELESAIAN PERSELISIHAN</div>
                    <p className="text-sm">Segala perselisihan yang timbul dari perjanjian ini akan diselesaikan secara musyawarah untuk mufakat. Apabila tidak tercapai kata mufakat, maka akan diselesaikan melalui jalur hukum yang berlaku.</p>
                </div>

                {data.additionalClause && (
                  <div>
                    <div className="text-center font-bold uppercase mb-1">PASAL TAMBAHAN</div>
                    <p className="text-sm whitespace-pre-wrap">{data.additionalClause}</p>
                  </div>
                )}
              </div>

              <p className="mt-8 mb-8 text-sm">Demikian Nota Kesepahaman ini dibuat rangkap 2 (dua) bermaterai cukup dan memiliki kekuatan hukum yang sama.</p>

              {/* TANDA TANGAN */}
              <div className="grid grid-cols-2 gap-8 text-center text-sm mb-12">
                <div>
                    <p className="mb-2 font-bold">PIHAK PERTAMA</p>
                    <p className="text-xs mb-16">{data.p1Name}</p>
                    <div className="border border-slate-300 w-24 h-16 mx-auto mb-[-4rem] mt-[-3rem] flex items-center justify-center text-[10px] text-slate-400 italic opacity-50 relative z-0">MATERAI</div>
                    <p className="font-bold underline uppercase relative z-10">{data.p1Rep}</p>
                    <p className="text-xs">{data.p1Title}</p>
                </div>
                <div>
                    <p className="mb-2 font-bold">PIHAK KEDUA</p>
                    <p className="text-xs mb-16">{data.p2Name}</p>
                    <p className="font-bold underline uppercase">{data.p2Rep}</p>
                    <p className="text-xs">{data.p2Title}</p>
                </div>
              </div>

              <div className="text-center text-xs">
                <p className="mb-4 font-bold">SAKSI-SAKSI</p>
                <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                    <div>
                        <p className="mb-12 border-b border-black w-3/4 mx-auto"></p>
                        <p>( {data.witness1} )</p>
                    </div>
                    <div>
                        <p className="mb-12 border-b border-black w-3/4 mx-auto"></p>
                        <p>( {data.witness2} )</p>
                    </div>
                </div>
              </div>

              <div className="absolute bottom-10 right-10 text-[10px] text-slate-400 italic">Halaman 2 dari 2</div>
          </Kertas>
        </>
      )}

      {/* TEMPLATE 2: COMPACT */}
      {templateId === 2 && (
        <Kertas>
            <div className="text-center mb-6 border-b-2 border-black pb-2">
              <h1 className="font-bold text-xl uppercase underline">SURAT PERJANJIAN KERJASAMA</h1>
              <div className="text-xs font-bold uppercase mt-1">{data.cooperationTitle}</div>
            </div>
            
            <p className="mb-4 text-justify text-sm">Pada {data.day}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {dateStyle:'full'}) : '...'}, bertempat di {data.city}, yang bertanda tangan di bawah ini:</p>

            <div className="grid grid-cols-1 gap-4 mb-4 text-sm">
              <div className="bg-slate-50 p-3 border rounded">
                <div className="font-bold uppercase underline mb-1">PIHAK PERTAMA</div>
                <div className="grid grid-cols-[80px_1fr]">
                   <div>Instansi</div><div className="font-bold">: {data.p1Name}</div>
                   <div>Nama</div><div>: {data.p1Rep} ({data.p1Title})</div>
                   <div>Alamat</div><div>: {data.p1Address}</div>
                </div>
              </div>
              
              <div className="bg-slate-50 p-3 border rounded">
                <div className="font-bold uppercase underline mb-1">PIHAK KEDUA</div>
                <div className="grid grid-cols-[80px_1fr]">
                   <div>Instansi</div><div className="font-bold">: {data.p2Name}</div>
                   <div>Nama</div><div>: {data.p2Rep} ({data.p2Title})</div>
                   <div>Alamat</div><div>: {data.p2Address}</div>
                </div>
              </div>
            </div>

            <div className="mb-4 text-sm space-y-3">
              <div className="border border-black p-3">
                 <span className="font-bold block mb-1">LINGKUP KERJASAMA:</span>
                 {data.scope}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                 <div className="border border-black p-3">
                    <span className="font-bold block mb-1">DURASI:</span>
                    {data.period}
                 </div>
                 <div className="border border-black p-3">
                    <span className="font-bold block mb-1">NILAI / SISTEM:</span>
                    {data.financing}
                 </div>
              </div>

              <div className="border border-black p-3">
                 <span className="font-bold block mb-1">HAK & KEWAJIBAN UTAMA:</span>
                 {data.rightsObligations}
              </div>
            </div>

            <p className="mb-8 text-justify text-sm">
              Perjanjian ini dibuat rangkap dua dan ditandatangani di atas materai yang cukup. Hal-hal yang belum tercantum akan diputuskan secara musyawarah.
              {data.additionalClause && <span className="block mt-1 italic font-bold">Note: {data.additionalClause}</span>}
            </p>

            <div className="flex justify-between text-center mt-auto mb-8 text-sm">
              <div className="w-48">
                  <p className="mb-1 font-bold">PIHAK PERTAMA</p>
                  <p className="text-[10px] mb-12 opacity-70">{data.p1Name}</p>
                  <div className="border border-slate-300 w-16 h-10 mx-auto mb-[-2.5rem] mt-[-2rem] flex items-center justify-center text-[8px] text-slate-300 italic">MATERAI</div>
                  <p className="font-bold underline uppercase">{data.p1Rep}</p>
              </div>
              <div className="w-48">
                  <p className="mb-1 font-bold">PIHAK KEDUA</p>
                  <p className="text-[10px] mb-12 opacity-70">{data.p2Name}</p>
                  <p className="font-bold underline uppercase">{data.p2Rep}</p>
              </div>
            </div>

            <div className="text-center text-xs text-slate-500">
               Mengetahui Saksi: {data.witness1} & {data.witness2}
            </div>
        </Kertas>
      )}
    </div>
  );

  if (!isClient) return <div className="flex h-screen items-center justify-center font-sans text-slate-400">Memuat...</div>;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 print:bg-white print:m-0">
      
      {/* GLOBAL CSS PRINT */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; } 
          body { background: white; margin: 0; padding: 0; }
          .no-print { display: none !important; }
          #print-only-root { 
            display: block !important; 
            position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; 
          }
        }
      `}</style>

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 font-sans">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
               <ArrowLeft size={18} /> Dashboard
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300">
               <Handshake size={16} className="text-blue-500" /> <span>MOU BUILDER</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium min-w-[160px] justify-between transition-all">
                <div className="flex items-center gap-2 font-bold uppercase tracking-wide"><LayoutTemplate size={14} className="text-blue-400" /><span>{activeTemplateName}</span></div>
                <ChevronDown size={12} className={showTemplateMenu ? 'rotate-180 transition-all' : 'transition-all'} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden z-50 text-slate-900">
                  <div className="bg-slate-50 px-3 py-2 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pilih Template</div>
                  {TEMPLATES.map((t) => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-blue-50 transition-colors ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700'}`}>
                      <div><div className="font-bold">{t.name}</div><div className="text-[10px] text-slate-400 mt-0.5">{t.desc}</div></div>
                      {templateId === t.id && <Check size={14} className="text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-blue-600 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-blue-500 transition-all shadow-lg active:scale-95">
              <Printer size={16} /> <span className="hidden md:inline">Print</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full lg:w-[450px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute lg:relative shadow-xl lg:shadow-none ${mobileView === 'preview' ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}`}>
           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar">
             
             <div className="md:hidden flex justify-center pb-4 border-b border-dashed border-slate-200"><AdsterraBanner adKey="8fd377728513d5d23b9caf7a2bba1a73" width={320} height={50} /></div>

             {/* 1. WAKTU & TEMPAT */}
             <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <div className="flex items-center gap-2 border-b pb-2">
                    <CalendarClock size={14} className="text-slate-600"/>
                    <h3 className="text-xs font-bold uppercase">Waktu & Tempat</h3>
                 </div>
                 <div className="space-y-3">
                    <div>
                        <label className="text-[10px] text-slate-500 font-bold block mb-1">Kota Penandatanganan</label>
                        <input className="w-full p-2 border rounded text-xs font-bold text-blue-700" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Jakarta" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                       <div>
                          <label className="text-[10px] text-slate-500 font-bold block mb-1">Hari</label>
                          <input className="w-full p-2 border rounded text-xs" value={data.day} onChange={e => handleDataChange('day', e.target.value)} placeholder="Senin" />
                       </div>
                       <div>
                          <label className="text-[10px] text-slate-500 font-bold block mb-1">Tanggal</label>
                          <input type="date" className="w-full p-2 border rounded text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                       </div>
                    </div>
                 </div>
             </div>

             {/* 2. IDENTITAS PARA PIHAK */}
             <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-6">
                {/* PIHAK 1 */}
                <div className="border-l-4 border-blue-500 pl-3">
                   <h4 className="text-xs font-bold text-blue-600 mb-2 uppercase">Pihak Pertama</h4>
                   <div className="space-y-2">
                      <input className="w-full p-2 border rounded text-xs font-bold" placeholder="Nama Instansi / PT" value={data.p1Name} onChange={e => handleDataChange('p1Name', e.target.value)} />
                      <div className="grid grid-cols-2 gap-2">
                         <input className="w-full p-2 border rounded text-xs" placeholder="Nama Wakil" value={data.p1Rep} onChange={e => handleDataChange('p1Rep', e.target.value)} />
                         <input className="w-full p-2 border rounded text-xs" placeholder="Jabatan" value={data.p1Title} onChange={e => handleDataChange('p1Title', e.target.value)} />
                      </div>
                      <textarea className="w-full p-2 border rounded text-xs h-12" placeholder="Alamat Pihak 1" value={data.p1Address} onChange={e => handleDataChange('p1Address', e.target.value)} />
                   </div>
                </div>
                {/* PIHAK 2 */}
                <div className="border-l-4 border-emerald-500 pl-3">
                   <h4 className="text-xs font-bold text-emerald-600 mb-2 uppercase">Pihak Kedua</h4>
                   <div className="space-y-2">
                      <input className="w-full p-2 border rounded text-xs font-bold" placeholder="Nama Instansi / PT" value={data.p2Name} onChange={e => handleDataChange('p2Name', e.target.value)} />
                      <div className="grid grid-cols-2 gap-2">
                         <input className="w-full p-2 border rounded text-xs" placeholder="Nama Wakil" value={data.p2Rep} onChange={e => handleDataChange('p2Rep', e.target.value)} />
                         <input className="w-full p-2 border rounded text-xs" placeholder="Jabatan" value={data.p2Title} onChange={e => handleDataChange('p2Title', e.target.value)} />
                      </div>
                      <textarea className="w-full p-2 border rounded text-xs h-12" placeholder="Alamat Pihak 2" value={data.p2Address} onChange={e => handleDataChange('p2Address', e.target.value)} />
                   </div>
                </div>
             </div>

             {/* 3. DETAIL KERJASAMA */}
             <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <div className="flex items-center gap-2 border-b pb-2"><Briefcase size={14}/><h3 className="text-xs font-bold uppercase">Detail Kerjasama</h3></div>
                 
                 <div className="space-y-3">
                     <div>
                        <label className="text-[10px] text-slate-500 font-bold block mb-1">Judul Kerjasama</label>
                        <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.cooperationTitle} onChange={e => handleDataChange('cooperationTitle', e.target.value)} placeholder="Contoh: PENGADAAN BARANG" />
                     </div>

                     <div>
                        <label className="text-[10px] text-slate-500 font-bold block mb-1">Ruang Lingkup (Pasal 1-2)</label>
                        <textarea className="w-full p-2 border rounded text-xs h-20" value={data.scope} onChange={e => handleDataChange('scope', e.target.value)} placeholder="Jelaskan detail apa yang dikerjakan..." />
                     </div>

                     <div className="grid grid-cols-1 gap-3">
                        <div>
                           <label className="text-[10px] text-slate-500 font-bold block mb-1">Jangka Waktu</label>
                           <input className="w-full p-2 border rounded text-xs" value={data.period} onChange={e => handleDataChange('period', e.target.value)} placeholder="Contoh: 1 Tahun" />
                        </div>
                        <div>
                           <label className="text-[10px] text-slate-500 font-bold block mb-1">Pembiayaan / Sistem Bagi Hasil</label>
                           <textarea className="w-full p-2 border rounded text-xs h-16" value={data.financing} onChange={e => handleDataChange('financing', e.target.value)} placeholder="Jelaskan sistem pembayaran..." />
                        </div>
                     </div>
                 </div>
             </div>

             {/* 4. HAK & KEWAJIBAN + LAINNYA */}
             <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <div className="flex items-center gap-2 border-b pb-2"><FileText size={14}/><h3 className="text-xs font-bold uppercase">Ketentuan Lain</h3></div>
                 
                 <div className="space-y-3">
                    <div>
                        <label className="text-[10px] text-slate-500 font-bold block mb-1">Hak & Kewajiban Utama</label>
                        <textarea className="w-full p-2 border rounded text-xs h-20" value={data.rightsObligations} onChange={e => handleDataChange('rightsObligations', e.target.value)} placeholder="Ringkasan hak dan kewajiban..." />
                     </div>

                     <div className="grid grid-cols-2 gap-3">
                        <div>
                           <label className="text-[10px] text-slate-500 font-bold block mb-1">Saksi 1</label>
                           <input className="w-full p-2 border rounded text-xs" value={data.witness1} onChange={e => handleDataChange('witness1', e.target.value)} />
                        </div>
                        <div>
                           <label className="text-[10px] text-slate-500 font-bold block mb-1">Saksi 2</label>
                           <input className="w-full p-2 border rounded text-xs" value={data.witness2} onChange={e => handleDataChange('witness2', e.target.value)} />
                        </div>
                     </div>

                     <div>
                        <label className="text-[10px] text-slate-500 font-bold block mb-1">Pasal Tambahan (Opsional)</label>
                        <textarea className="w-full p-2 border rounded text-xs h-16" value={data.additionalClause} onChange={e => handleDataChange('additionalClause', e.target.value)} placeholder="Klausul tambahan jika ada..." />
                     </div>
                 </div>
             </div>

             <div className="h-20 md:hidden"></div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
            <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar">
               <div className="origin-top transition-transform duration-300 transform scale-[0.55] md:scale-[0.85] lg:scale-100 mb-[-130mm] md:mb-[-20mm] lg:mb-0 shadow-2xl flex flex-col items-center">
                 <div style={{ width: '210mm' }}>
                    <DocumentContent />
                 </div>
               </div>
            </div>
        </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5 font-sans">
         <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'preview' ? 'bg-blue-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}><Eye size={16}/> Preview</button>
      </div>

      {/* PRINT AREA */}
      <div id="print-only-root" className="hidden">
         <div className="flex flex-col">
            <DocumentContent />
         </div>
      </div>

    </div>
  );
}