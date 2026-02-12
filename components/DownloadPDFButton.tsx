"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { Button } from "@/components/Button";
import { FileText, Download } from "lucide-react";
import { QuestionnairePDF } from "./QuestionnairePDF";

// Cast the dynamic component to any to avoid complex generic type issues with strict mode
const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => (
      <Button className="w-full opacity-50 cursor-not-allowed" disabled>
        <Download className="w-4 h-4 mr-2" />
        Loading PDF Generator...
      </Button>
    ),
  }
) as any;

export function DownloadPDFButton() {
  return (
    <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-blue-600" />
            Official PDF Version
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Need a file to email? Download the generated PDF directly.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
                <PDFDownloadLink document={<QuestionnairePDF />} fileName="Nearshore_Navigator_Questionnaire_2026.pdf">
                    {({ loading }: { loading: boolean }) => (
                        <Button className="w-full" disabled={loading}>
                            <Download className="w-4 h-4 mr-2" />
                            {loading ? 'Generating PDF...' : 'Download PDF File'}
                        </Button>
                    )}
                </PDFDownloadLink>
            </div>
            <div className="flex-1">
                <a 
                    href="/documents/Nearshore_Navigator_Questionnaire_2026.docx" 
                    download
                    className="block w-full"
                >
                    <Button variant="secondary" className="w-full">
                        <FileText className="w-4 h-4 mr-2" />
                        Download Word File
                    </Button>
                </a>
            </div>
        </div>
    </div>
  );
}
