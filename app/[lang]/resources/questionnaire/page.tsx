import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: '3PL Operation Questionnaire | Nearshore Navigator',
  description: 'Confidential assessment form for manufacturing and logistics operations in Baja California.',
};

import { DownloadPDFButton } from "@/components/DownloadPDFButton";

export default async function QuestionnairePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  return (
    <div className="bg-white min-h-screen text-gray-900 print:bg-white print:text-black">
      {/* Print Instructions - Hidden when printing */}
      <div className="bg-gray-100 dark:bg-gray-800 p-8 max-w-4xl mx-auto mt-8 rounded-xl print:hidden shadow-sm">
        <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
                <h2 className="text-2xl font-bold mb-4">Operational Questionnaire</h2>
                <p className="mb-4 text-gray-600 dark:text-gray-300">
                    You can either print this page directly or download a generated PDF file.
                </p>
                
                <button 
                  onClick={() => window.print()}
                  className="inline-flex items-center text-primary-600 font-bold hover:underline mb-4"
                >
                  Click here to Print / Save as PDF (Web Version)
                </button>
            </div>
            
            <DownloadPDFButton />
        </div>
      </div>

      <main className="max-w-[210mm] mx-auto p-[10mm] print:p-0">
        
        {/* Header */}
        <header className="flex justify-between items-center border-b-4 border-primary-600 pb-6 mb-8">
            <div className="flex items-center gap-4">
               {/* 
                 NOTE: Using text logo for print reliability, 
                 or ensure Logo image has print:block 
                */}
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Nearshore Navigator</h1>
                    <p className="text-sm text-gray-500 uppercase tracking-widest mt-1">Industrial Logistics • Baja California</p>
                </div>
            </div>
            <div className="text-right">
                <h2 className="text-xl font-bold text-primary-600">3PL Operation Questionnaire</h2>
                <div className="text-xs text-gray-400 font-mono mt-1">CONFIDENTIAL • {new Date().getFullYear()}</div>
            </div>
        </header>

        <p className="italic text-gray-600 mb-8 border-l-4 border-gray-200 pl-4 py-2">
            Please complete this assessment to help us engineer your optimal supply chain solution.
        </p>

        <div className="space-y-8">
            {/* Section 1 */}
            <section className="break-inside-avoid">
                <h3 className="text-lg font-bold text-white bg-gray-900 px-4 py-2 rounded-sm mb-6 print:bg-gray-900 print:text-white print:mb-4">
                    1. Operational Basics
                </h3>
                <div className="grid grid-cols-1 gap-6 px-2">
                    <Field number="01" label="Total square footage required?" />
                    <Field number="02" label="Type of products to be stored/moved?" lines={2} />
                    <Field number="03" label="Product presentation (Pallets, Bulk, Cartons)?" />
                    <div className="grid grid-cols-3 gap-4">
                        <Field number="04" label="Length (in)" />
                        <Field number="05" label="Width (in)" />
                        <Field number="06" label="Height (in)" />
                    </div>
                </div>
            </section>

            {/* Section 2 */}
            <section className="break-inside-avoid">
                <h3 className="text-lg font-bold text-white bg-gray-900 px-4 py-2 rounded-sm mb-6 print:bg-gray-900 print:text-white print:mb-4">
                    2. Inventory & Handling
                </h3>
                <div className="grid grid-cols-2 gap-6 px-2">
                    <Field number="07" label="Tariff fractions/HS Codes?" />
                    <Field number="08" label="Hazmat / Dangerous Goods?" />
                    <Field number="09" label="Max stackability (levels)?" />
                    <Field number="10" label="Daily order volume?" />
                    <Field number="11" label="Avg. pieces per order?" />
                    <Field number="12" label="Virtual Transfer (V1) or Import (A1)?" />
                </div>
                <div className="mt-6 px-2">
                    <Field number="13" label="Describe specific processing requirements (kitting, labeling, sorting):" lines={3} />
                </div>
            </section>

            {/* Section 3 - Page Break for Clean Print */}
            <section className="break-before-page pt-8">
                 <h3 className="text-lg font-bold text-white bg-gray-900 px-4 py-2 rounded-sm mb-6 print:bg-gray-900 print:text-white print:mb-4">
                    3. Systems & Connectivity
                </h3>
                 <div className="px-2 space-y-4">
                    <div className="mb-4">
                        <span className="font-bold text-gray-900 mr-2">14. Order Transmission Method:</span>
                        <div className="flex gap-8 mt-2 ml-6 text-sm">
                            <Checkbox label="EDI" />
                            <Checkbox label="Email" />
                            <Checkbox label="API / Portal" />
                            <Checkbox label="Other" />
                        </div>
                    </div>
                    <Field number="15" label="Current ERP / WMS System?" />
                    <Field number="16" label="Order transmission protocol (AS2, FTP, SFTP)?" />
                </div>
            </section>
            
            {/* Section 4 */}
            <section className="break-inside-avoid">
                <h3 className="text-lg font-bold text-white bg-gray-900 px-4 py-2 rounded-sm mb-6 print:bg-gray-900 print:text-white print:mb-4">
                    4. Volume & Logistics
                </h3>
                <div className="grid grid-cols-2 gap-6 px-2">
                    <Field number="17" label="Est. personnel required?" />
                    <Field number="18" label="Total pallet positions?" />
                    <Field number="19" label="Inbound trailers per week?" />
                    <Field number="20" label="Outbound shipments per day?" />
                    <Field number="21" label="Special equipment needed?" />
                    <Field number="22" label="Main shipping destinations?" />
                </div>
            </section>

             <section className="break-inside-avoid mt-8 border-t-2 border-dashed border-gray-300 pt-6">
                <h4 className="font-bold uppercase tracking-wider text-xs text-gray-500 mb-4">Internal Use Only</h4>
                 <div className="grid grid-cols-2 gap-8">
                     <div className="border-b border-gray-300 h-8"></div>
                     <div className="border-b border-gray-300 h-8"></div>
                 </div>
            </section>
        </div>

        <footer className="mt-12 pt-6 border-t border-gray-200 text-center text-xs text-gray-400 flex justify-between">
            <span>www.nearshorenavigator.com</span>
            <span>Nearshore Navigator • Calz. Tecnológico 1300, Tijuana, B.C.</span>
        </footer>

      </main>

      {/* Global Print Styles */}
      <style>{`
        @media print {
          @page { margin: 10mm; }
          body { 
            background: white !important; 
            color: black !important; 
            -webkit-print-color-adjust: exact !important; 
            print-color-adjust: exact !important;
          }
        }
      `}</style>
    </div>
  );
}

// Subcomponents for consistent layout
function Field({ number, label, lines = 1 }: { number: string, label: string, lines?: number }) {
    return (
        <div className="w-full">
            <div className="flex items-baseline mb-1">
                <span className="text-primary-600 font-bold text-sm mr-2 font-mono">{number}.</span>
                <span className="font-semibold text-gray-800 text-sm leading-tight">{label}</span>
            </div>
            <div 
                className="w-full border-b border-gray-300 bg-gray-50/50 print:bg-transparent"
                style={{ height: `${lines * 2}rem` }} 
            ></div>
        </div>
    );
}

function Checkbox({ label }: { label: string }) {
    return (
        <label className="flex items-center gap-2 cursor-pointer">
            <div className="w-4 h-4 border-2 border-gray-400 rounded-sm"></div>
            <span>{label}</span>
        </label>
    );
}
