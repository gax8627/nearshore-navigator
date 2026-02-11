import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  
  const titles: Record<string, string> = {
    en: "Section 321 Guide 2026: Navigating the De Minimis Suspension",
    es: "Guía Sección 321 2026: Navegando la Suspensión de De Minimis",
    ko: "2026 섹션 321 가이드: 2025년 면세 한도 중단 대응 전략",
    zh: "2026 Section 321 指南：应对最低限额豁免暂停",
    ja: "2026年セクション321ガイド：免税（デ・ミニミス）停止への対応"
  };

  const desc: Record<string, string> = {
    en: "The definitive 2026 guide to Section 321 fulfillment in Mexico following the August 2025 suspension. Learn about IMMEX and Bonded warehouse alternatives.",
    es: "La guía definitiva 2026 para el cumplimiento de la Sección 321 en México tras la suspensión de agosto de 2025. Conozca las alternativas de IMMEX y depósitos aduaneros.",
    ko: "2025년 8월 중단 조치 이후 멕시코 섹션 321 풀필먼트에 관한 2026년 최종 가이드입니다. IMMEX 및 보세 창고 대체 방안에 대해 알아보세요.",
    zh: "2025 年 8 月暂停后，墨西哥 Section 321 履约的 2026 年权威指南。了解 IMMEX 和保税仓库替代方案。",
    ja: "2026年セクション321ガイド：2025年8月の停止措置を受けた、メキシコにおける決定版ガイド。IMMEXや保税倉庫の代替案について学びましょう。"
  };

  const title = titles[lang] || titles.en;
  const description = desc[lang] || desc.en;

  return {
    title,
    description,
    keywords: ["Section 321 suspension", "2025 de minimis", "Mexico fulfillment 2026", "IMMEX Section 321", "Tijuana bonded warehouse"],
    openGraph: {
      title,
      description,
      images: ['https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=1200']
    }
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
