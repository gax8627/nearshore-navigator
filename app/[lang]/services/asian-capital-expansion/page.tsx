import { Metadata } from 'next';
import Link from 'next/link';
import { BASE_URL, INDEXABLE_LOCALES } from '@/app/constants/seo-config';

type PageParams = Promise<{ lang: string }>;

export async function generateStaticParams() {
  return INDEXABLE_LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata(props: { params: PageParams }): Promise<Metadata> {
  const { lang } = await props.params;

  const metadataDict: Record<string, { title: string; description: string; ogTitle: string; ogDesc: string }> = {
    ko: {
      title: 'USMCA 75% RVC 규정 및 멕시코 IMMEX 셸터 진출 가이드 | 아시아 기업 멕시코 확장 자문',
      description: '한국 및 아시아 제조기업을 위한 멕시코 USMCA 75% RVC 무관세 충족, 미국 301조 관세 회피, IMMEX 셸터 90일 가동 및 부가가치세 0% 면제 전략 지침서.',
      ogTitle: 'USMCA 75% RVC 규정 & 아시아 기업 멕시코 진출 종합 솔루션',
      ogDesc: '한국 자동차 부품, 배터리, 전자 및 공작기계 기업을 위한 멕시코 니어쇼어링, IMMEX 셸터 및 북미 무관세 통관 전략.'
    },
    zh: {
      title: 'USMCA 75% 区域价值含量规程与墨西哥 IMMEX 庇护入驻指南 | 亚洲企业赴墨投资咨询',
      description: '为中国及亚洲制造企业提供赴墨投资全流程咨询：满足 USMCA 75% RVC 区域价值比率、规避美国 301 关税、30-90天快速启动 IMMEX 庇护项目并享 0% 增值税。',
      ogTitle: 'USMCA 75% RVC 合规与亚洲企业赴墨投资落地全景指南',
      ogDesc: '针对中国电子、新能源汽车零部件、光伏及机械制造企业的墨西哥近岸外包、IMMEX 庇护模式及美墨加零关税清关方案。'
    },
    en: {
      title: 'Asian Capital Expansion to Mexico | USMCA 75% RVC Rules & IMMEX Shelter Advisory',
      description: 'Strategic advisory for Korean and Chinese manufacturers expanding to Mexico under USMCA 75% RVC rules. Avoid Section 301 tariffs, launch under IMMEX shelter in 30-90 days, and access North America duty-free.',
      ogTitle: 'Asian Capital Expansion to Mexico & USMCA 75% RVC Advisory',
      ogDesc: 'Turnkey IMMEX shelter setup and USMCA RVC compliance for Korean and Chinese automotive, EV battery, electronics, and industrial manufacturers.'
    },
    es: {
      title: 'Expansión de Capital Asiático a México | Reglas USMCA 75% RVC y Asesoría IMMEX',
      description: 'Asesoría estratégica para fabricantes asiáticos que se expanden a México bajo reglas USMCA 75% RVC. Mitigue aranceles Sección 301 y opere bajo IMMEX.',
      ogTitle: 'Expansión de Capital Asiático en México y Cumplimiento USMCA 75% RVC',
      ogDesc: 'Solución integral para empresas coreanas y chinas: cumplimiento de reglas de origen USMCA 75% RVC y modelo de albergue IMMEX en México.'
    },
    de: {
      title: 'Asiatische Kapitalexpansion nach Mexiko | USMCA 75% RVC Regeln & IMMEX Shelter',
      description: 'Strategische Beratung für asiatische Hersteller zur Expansion nach Mexiko unter USMCA 75% RVC-Regeln. Vermeiden Sie Section 301 Zölle.',
      ogTitle: 'Asiatische Kapitalexpansion nach Mexiko & USMCA 75% RVC-Konformität',
      ogDesc: 'Beratung für chinesische und koreanische Zulieferer zur Ansiedlung in Mexiko unter dem IMMEX-Shelter-Framework.'
    },
    ja: {
      title: 'アジア企業のメキシコ進出・USMCA 75% 原産地規則 & IMMEX シェルター諮問',
      description: '韓国・中国等アジア製造企業向けメキシコ進出支援。USMCA 75% RVC規則適合、Section 301関税回避、IMMEX 90日立ち上げ諮問。',
      ogTitle: 'アジア資本のメキシコ進出と USMCA 75% RVC 原産地適合戦略',
      ogDesc: 'アジア自動車部品・電子・電池メーカー向けメキシコ進出・USMCA 75%原産地規則適合・IMMEXシェルター統合支援。'
    }
  };

  const currentMeta = metadataDict[lang] || metadataDict.en;
  const canonicalUrl = `${BASE_URL}/${lang}/services/asian-capital-expansion`;

  return {
    title: currentMeta.title,
    description: currentMeta.description,
    alternates: {
      canonical: canonicalUrl,
      languages: Object.fromEntries([
        ...INDEXABLE_LOCALES.map((l) => [l, `${BASE_URL}/${l}/services/asian-capital-expansion`]),
        ['x-default', `${BASE_URL}/en/services/asian-capital-expansion`]
      ])
    },
    openGraph: {
      title: currentMeta.ogTitle,
      description: currentMeta.ogDesc,
      url: canonicalUrl,
      type: 'website',
      siteName: 'Nearshore Navigator',
      images: [
        {
          url: `${BASE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: 'Asian Capital Expansion & USMCA 75% RVC Advisory Mexico'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: currentMeta.ogTitle,
      description: currentMeta.ogDesc,
      images: [`${BASE_URL}/og-image.png`]
    }
  };
}

export default async function AsianCapitalExpansionPage(props: { params: PageParams }) {
  const { lang } = await props.params;

  const dictionary: Record<
    string,
    {
      badge: string;
      heroTitle: string;
      heroSubtitle: string;
      speakableText: string;
      metrics: { title: string; subtitle: string; value: string }[];
      rvcTitle: string;
      rvcDesc: string;
      formulaTitle: string;
      formulaEq: string;
      formulaExplanation: string[];
      pillarsTitle: string;
      pillars: { title: string; desc: string }[];
      comparisonTitle: string;
      comparisonHeaders: [string, string, string, string];
      comparisonRows: [string, string, string, string][];
      industriesTitle: string;
      industries: { title: string; desc: string }[];
      faqTitle: string;
      faqs: { q: string; a: string }[];
      ctaTitle: string;
      ctaDesc: string;
      ctaPrimary: string;
      ctaSecondary: string;
    }
  > = {
    ko: {
      badge: 'USMCA 75% RVC 규정 및 아시아 자본 멕시코 진출 자문',
      heroTitle: '아시아 제조기업 멕시코 진출: USMCA 75% RVC 무관세 및 IMMEX 셸터 전략',
      heroSubtitle: '한국 및 중국 제조기업을 위한 대미 301조 관세 완벽 회피, 75% 역내가치포함비율(RVC) 충족, 30~90일 내 IMMEX 셸터 가동 및 부가가치세 0% 면제 통관 지침서.',
      speakableText: '한국 및 중국 등 아시아 제조기업은 미국 301조 관세(최대 25% 이상)를 회피하고 북미 무관세 혜택을 누리기 위해 멕시코로 생산 기반을 이전하고 있습니다. USMCA Article 5 규정의 75% 역내가치포함비율(RVC)을 충족하고, IMMEX 셸터 가공 모델을 활용하면 법인 설립 리스크 없이 30~90일 내 가동할 수 있으며, 시간당 $7.84의 노동 비용과 부가가치세(IVA) 0% 면제 혜택을 확보할 수 있습니다.',
      metrics: [
        { title: 'USMCA RVC 무관세 기준', subtitle: '자동차 및 핵심 부품 역내가치 비율', value: '75%' },
        { title: '미국 301조 관세 절감', subtitle: '중국산 부품 우회 생산 시 면제', value: '0%' },
        { title: 'IMMEX 셸터 가동 기간', subtitle: '법인 설립 및 허가 절차 단축', value: '30-90일' },
        { title: '총 부담 인건비 (2026)', subtitle: '국경 지대 CONASAMI 기준 시간당', value: '$7.84/hr' }
      ],
      rvcTitle: 'USMCA Article 5: 75% 역내가치포함비율(RVC) 규정 및 원산지 판정 원리',
      rvcDesc: 'USMCA(T-MEC) 협정 하에서 승용차, 화물차 및 핵심 부품(엔진, 변속기, 차체, 샤시, EV 배터리)이 북미 무관세 혜택을 받기 위해서는 역내가치포함비율(RVC)이 기존 NAFTA 62.5%에서 75%로 대폭 상향 조정되었습니다. 아시아 원자재 부품 공급업체는 멕시코에서의 실질적 변형(Substantial Transformation) 및 현지 조립을 통해 75% RVC 기준을 충족해야 합니다.',
      formulaTitle: 'USMCA 순원가법(Net Cost Method) 계산 공식',
      formulaEq: 'RVC = ((NC - VNM) / NC) * 100 >= 75%',
      formulaExplanation: [
        'NC (Net Cost): 해당 물품의 제조 및 출하에 들어간 총 순원가.',
        'VNM (Value of Non-Originating Materials): 아시아(한국, 중국 등)에서 수입한 비원산지 재료의 총 가액.',
        '철강 및 알루미늄 조달 요건: 북미 지역에서 용해 및 주조(Melt & Pour)된 철강 및 알루미늄을 70% 이상 사용해야 합니다.',
        '노동가치포함비율(LVC): 차량 가치의 40~45%는 시간당 $16 이상의 임금을 받는 고임금 노동자에 의해 생산되어야 합니다.'
      ],
      pillarsTitle: '아시아 기업 멕시코 진출의 4대 핵심 전략 축',
      pillars: [
        { title: '1. USMCA 원산지 실질 변형 & 관세 절과 통관 규정', desc: 'Annex 24/30 디지털 재고 관리 시스템과 가상 임가목(V1/V5)을 활용하여 아시아산 원자재의 관세 분류 변경(CTC) 및 75% RVC 판정증명서를 정식 발급합니다.' },
        { title: '2. IMMEX 셸터 우산(Umbrella) 및 법인세 Safe Harbor 면제', desc: '독립 법인(S.A. de C.V.) 설립 없이 셸터 제공업체의 IMMEX 승인을 활용하여 30~90일 내 가동하며, 고정사업장(PE) 과세 위험을 완벽히 차단합니다.' },
        { title: '3. 전략적 입지 선정 (티후아나, 멕시칼리, 몬테레이, 케레타로)', desc: '샌디에이고 접경 지역(티후아나 Otay Mesa, Mexicali PIMSA) 및 텍사스 접경 인프라(Monterrey Santa Catarina)에 위치한 Class A 산업단지 임차 계약을 지원합니다.' },
        { title: '4. 공급망 현지화 & Tier-1/Tier-2 부품망 통합', desc: '아시아에서 수입되는 비원산지 소재 비율을 25% 이하로 하향 조절할 수 있도록 북미 현지 수급망(미국산 강재, 멕시코 사출품)과의 매칭을 주도합니다.' }
      ],
      comparisonTitle: '아시아 제조기업 진출 모델 3사 비교 분석',
      comparisonHeaders: ['평가 항목', '동아시아 직접 수출 (한국/중국)', '멕시코 독자 법인 설립 (S.A. de C.V.)', 'IMMEX 셸터 서비스 (추천)'],
      comparisonRows: [
        ['미국 관세 및 301조 부과 위험', '높음 (최대 25%+ 301조 관세 부과)', '무관세 (USMCA 75% RVC 달성 시)', '무관세 (USMCA 75% RVC 달성 시)'],
        ['초기 가동 타임라인', '해상 운송 30-45일소요', '6 - 12개월 (SAT 허가 대기)', '30 - 90일 (즉시 가동)'],
        ['멕시코 부가가치세(IVA 16%)', '해당 없음 (수입 관세 발생)', 'Direct IMMEX/Annex 30 감사 필요', '즉시 0% 면제 (셸터 인가 활용)'],
        ['고정사업장(PE) 법인세 리스크', '없음 (수입 법인 부담)', '높음 (멕시코 법인세 30% 적용)', '제거됨 (Safe Harbor 규정 준수)'],
        ['미국 국경 물류 수송 시간', '30-45일 (해상 컨테이너)', '2-4시간 (티후아나-샌디에이고 트럭ING)', '2-4시간 (티후아나-샌디에이고 트럭ING)'],
        ['시간당 총 노동 비용 (2026)', '국가별 상이 ($4.5-$6.5 + 물류비)', '$7.84/hr + 직접 관리비', '$7.84/hr (HR/노무 셸터 대행)']
      ],
      industriesTitle: '아시아 자본 투자의 4대 주요 기술 산업군',
      industries: [
        { title: '전기차(EV) & 자동차 핵심 부품', desc: '배터리 팩 케이싱, 와이어링 하네스, 전동 드라이브트레인, 알루미늄 다이캐스팅 및 자동차 의장품 제조.' },
        { title: '첨단 전자 & 하드웨어 조립', desc: 'SMT 표면실장 라인, 통신 장비 섀시, 의료용 센서, 디스플레이 모듈 및 PCB 어셈블리.' },
        { title: '정밀 공작기계 & 금형 산업', desc: 'CNC 정밀 가공, 플라스틱 사출 성형 금형, 프레스 금형 및 공장 자동화 로봇 통합.' },
        { title: '신재생 에너지 & 태양광 설비', desc: '태양광 인버터, 알루미늄 프레임 구조물, ESS 수배전반 및 전력 변환 장치 제조.' }
      ],
      faqTitle: '아시아 제조기업 FAQ: USMCA 75% RVC 및 멕시코 진출',
      faqs: [
        { q: '한국 및 중국 기업이 멕시코 생산을 통해 USMCA 75% RVC 기준을 충족하려면 어떻게 해야 하나요?', a: '아시아에서 수입된 비원산지 원자재(VNM) 가치가 전체 순원가(NC)의 25%를 초과하지 않도록 멕시코 공장에서 조립, 사출, 정밀가공 등 실질적 변형(Substantial Transformation)을 거치고, 현지 노동력 및 조달을 결합해야 합니다.' },
        { q: '멕시코 셸터 서비스를 이용하면 미국 301조 관세를 확실히 면제받을 수 있나요?', a: '네. 멕시코에서 제조되어 USMCA 원산지 규정(HS Code 관세분류변경 및 75% RVC)을 충족하면 미국 수입 시 301조 관세 대상에서 제외되고 0% Preferential Duty Rate가 적용됩니다.' },
        { q: 'IMMEX 셸터 모델과 독자 법인 설립의 가장 큰 차이점은 무엇인가요?', a: '독자 법인(S.A. de C.V.)은 IMMEX 승인 및 VAT 인증에 6~12개월이 소요되며 멕시코 법인세 및 노무 리스크를 직접 집니다. 반면 셸터 모델은 셸터 파트너의 인가 밑에서 30~90일 내에 가동하며 HR, 노무, 세무를 셸터가 전담합니다.' },
        { q: '티후아나 및 멕시칼리 지역의 2026년 기준 인건비와 물류상 이점은 무엇인가요?', a: '2026년 북무자유지대 기준 총 부담 인건비는 시간당 $7.84 수준입니다. 티후아나의 경우 샌디에이고 Otay Mesa 상업 국경까지 트럭으로 20~40분 거리이므로 당일 배송 및 미국 재고 관리가 가능합니다.' },
        { q: '아시아 본사에서 멕시코 공장으로 원자재나 장비를 반입할 때 부가가치세(IVA)가 부과되나요?', a: 'IMMEX Annex 30 부가가치세 인증을 보유한 셸터 우산 하에 원자재 및 제조 장비를 수립하면 수입 시 16% IVA가 100% 면제(0% 실질 적용) 처리됩니다.' }
      ],
      ctaTitle: '아시아 기업 멕시코 진출 & USMCA 타당성 검토 요청',
      ctaDesc: '한국 및 중국 기업 전문 니어쇼어링 컨설턴트가 75% RVC 충족 여부, 입지 선정, IMMEX 셸터 견적 및 총 상륙 비용(TCO)을 보안 유지 하에 분석해 드립니다.',
      ctaPrimary: 'Landed Cost 계산기 실행',
      ctaSecondary: '티후아나 산업 마스터 가이드 보기'
    },
    zh: {
      badge: 'USMCA 75% RVC 规程与亚洲资本赴墨投资咨询',
      heroTitle: '亚洲制造企业赴墨拓展：USMCA 75% RVC 零关税与 IMMEX 庇护落地方案',
      heroSubtitle: '为中国及韩国制造企业提供规避美国 301 关税、满足 75% 区域价值含量 (RVC) 规程、30-90 天内通过 IMMEX 庇护模式启动生产并享 0% 增值税通关的全流程指南。',
      speakableText: '面对美国 Section 301 关税加征及供应链区域化转型，中韩等亚洲制造企业正加速在墨西哥建立生产基地。通过满足 USMCA 协定下 75% 的区域价值含量 (RVC) 规则，企业产自墨西哥的产品可享受零关税进入美国市场。利用 IMMEX 庇护 (Shelter) 模式，企业无需承担墨西哥独立法人税务风险，可在 30 至 90 天内快速投产，享受设备与原材料 0% 增值税 (VAT) 暂进通关及全包每小时 $7.84 美元的劳工成本优势。',
      metrics: [
        { title: 'USMCA RVC 零关税门槛', subtitle: '汽车零部件及工业品区域价值比', value: '75%' },
        { title: '美国 301 关税规避率', subtitle: '墨西哥制造合规后进口关税', value: '0%' },
        { title: 'IMMEX 庇护启动周期', subtitle: '免去繁琐法人审批投产时间', value: '30-90天' },
        { title: '综合全包人工成本 (2026)', subtitle: '北部边境自由区 CONASAMI 标准', value: '$7.84/小时' }
      ],
      rvcTitle: 'USMCA 第 5 条：75% 区域价值含量 (RVC) 规则与原产地认定解析',
      rvcDesc: '在美墨加协定 (USMCA/T-MEC) 框架下，乘用车、卡车及核心零部件（发动机、变速箱、车身、底盘、电动车电池）享受零关税待遇的 RVC 原产地标准由原 NAFTA 的 62.5% 提高至 75%。亚洲零部件供应商必须在墨西哥进行实质性改变 (Substantial Transformation) 与本土化加工，以确保满足 75% RVC 比率。',
      formulaTitle: 'USMCA 净成本法 (Net Cost Method) 计算公式',
      formulaEq: 'RVC = ((NC - VNM) / NC) * 100 >= 75%',
      formulaExplanation: [
        'NC (Net Cost)：产品的制造与出厂净成本。',
        'VNM (Value of Non-Originating Materials)：自亚洲（中国、韩国等）进口的非原产材料与零部件总价值。',
        '钢铁与铝材采购要求：整车与核心件所用钢铁与铝材中，至少 70% 必须在北美地区熔炼与浇铸 (Melt & Pour)。',
        '劳动价值含量 (LVC)：车辆价值的 40-45% 必须由时薪不低于 16 美元的北美高薪工人生产。'
      ],
      pillarsTitle: '亚洲企业赴墨投资落地四大核心战略支柱',
      pillars: [
        { title: '1. USMCA 原产地转换与关税合规控制', desc: '依靠 Annex 24/30 数字库存监管系统与虚拟海关凭证 (V1/V5)，确保亚洲进口原材料完成税则归类改变 (CTC)，依法签发 USMCA 原产地证书。' },
        { title: '2. IMMEX 庇护伞 (Shelter) 模式与免税 Safe Harbor 架构', desc: '无需注册墨西哥独立子公司 (S.A. de C.V.)，直接挂靠庇护商的 IMMEX 资质，30-90 天内开工，彻底消除常设机构 (PE) 企业所得税风险。' },
        { title: '3. 战略选址与园区基础设施规划 (蒂华纳、墨西卡利、蒙特雷、克雷塔罗)', desc: '深度匹配美墨边境优质 Class A 工业园区（蒂华纳 Otay Mesa、墨西卡利 PIMSA、蒙特雷 Santa Catarina），提供厂房租赁与电力扩容谈判。' },
        { title: '4. 供应链本土化与 Tier-1/Tier-2 配套对接', desc: '协助搭建北美本地化采购网络（美国钢材、墨西哥注塑件与包装材料），将非原产零部件价值 (VNM) 压低至 25% 门槛以内。' }
      ],
      comparisonTitle: '亚洲制造企业赴美/赴墨三大落地模式对比',
      comparisonHeaders: ['对比维度', '东亚直接出口 (中国/韩国)', '墨西哥独立建厂 (S.A. de C.V.)', 'IMMEX 庇护模式 (推荐)'],
      comparisonRows: [
        ['美国关税及 301 条款风险', '高 (最高 25%+ 301 关税)', '0% 零关税 (达标 75% RVC)', '0% 零关税 (达标 75% RVC)'],
        ['项目启动周期', '海程运输 30-45 天', '6 - 12 个月 (等待 SAT 审批)', '30 - 90 天 (快速挂靠投产)'],
        ['墨西哥 16% 增值税 (VAT)', '不适用 (产生美国进口关税)', '需单独申请 IMMEX/Annex 30 认证', '即刻享受 0% 暂进免税 (挂靠庇护)'],
        ['常设机构 (PE) 税务风险', '无 (由美国进口商纳税)', '高 (需按墨西哥标准缴纳 30% 所得税)', '已消除 (符合 Safe Harbor 避风港)'],
        ['美墨边境物流运输时间', '30-45 天 (海运集装箱)', '2-4 小时 (蒂华纳至圣迭戈卡车直达)', '2-4 小时 (蒂华纳至圣迭戈卡车直达)'],
        ['综合全包时薪成本 (2026)', '因国而异 ($4.5-$6.5 + 海运费)', '$7.84/小时 + 独立行政团队', '$7.84/小时 (HR与法规由庇护商统包)']
      ],
      industriesTitle: '亚洲资本重点投资四大工业集群',
      industries: [
        { title: '新能源汽车 (EV) 及核心零部件', desc: '电池包壳体、线束总成、电动驱动电机、压铸铝合金件及汽车内饰件制造。' },
        { title: '消费电子与高端硬件组装', desc: 'SMT 表面贴装、通信设备外壳、医疗电子传感器、显示模块及 PCB 组装。' },
        { title: '精密机械与模具制造', desc: 'CNC 精密加工、塑料注塑模具、冲压模具及工业自动化机器人集成。' },
        { title: '光伏与新能源设备', desc: '逆变器、铝合金支架结构件、储能系统配电柜及电力转换设备生产。' }
      ],
      faqTitle: '亚洲企业常见问题：USMCA 75% RVC 与墨西哥投资落地',
      faqs: [
        { q: '中国和韩国企业如何通过墨西哥工厂满足 USMCA 75% RVC 规则？', a: '企业须在墨西哥工厂完成加工、组装、精加工等实质性改变 (Substantial Transformation)，使自亚洲进口的非原产零部件价值 (VNM) 不超过产品总净成本 (NC) 的 25%，从而满足 75% RVC 要求。' },
        { q: '在墨西哥采用庇护模式生产能否完全规避美国 Section 301 关税？', a: '是的。只要产品在墨西哥加工并符合 USMCA 原产地规则（税则归类改变及 75% RVC），出口至美国时即视为墨西哥原产，适用 0% 优惠关税，不适用 Section 301 追加关税。' },
        { q: 'IMMEX 庇护模式 (Shelter) 与独立设立墨西哥公司有何核心区别？', a: '独立设立公司需耗时 6-12 个月申请 IMMEX 许可证及增值税认证，且需承担直接税务审计；庇护模式挂靠成熟庇护商的资质，30-90 天即可开工，人力、海关与税务均由庇护商全权代办。' },
        { q: '蒂华纳 (Tijuana) 和墨西卡利 (Mexicali) 2026 年的人工成本与物流优势如何？', a: '2026 年北部边境自由区全包工人时薪约 $7.84 美元。蒂华纳距离圣迭戈 Otay Mesa 商业口岸仅 20-40 分钟车程，支持当日送达与 JIT 零库存物流。' },
        { q: '从亚洲总部运往墨西哥工厂的设备与原材料是否需要缴纳墨西哥 16% 增值税 (VAT)？', a: '通过挂靠拥有 Annex 30 增值税认证的 IMMEX 庇护商，所有暂进进口的原材料和生产设备均享受 100% 增值税豁免（实际税率为 0%）。' }
      ],
      ctaTitle: '获取亚洲企业赴墨投资与 USMCA RVC 可行性评估',
      ctaDesc: '我们的近岸外包专家将为您量身定制 75% RVC 测算、厂房选址、IMMEX 庇护报价及总到岸成本 (TCO) 报告，全流程保密。',
      ctaPrimary: '启动到岸成本计算器',
      ctaSecondary: '查看蒂华纳工业指南'
    },
    en: {
      badge: 'USMCA 75% RVC Compliance & Asian Nearshoring Framework',
      heroTitle: 'Asian Capital Expansion to Mexico: USMCA 75% RVC Rules & IMMEX Shelter Strategy',
      heroSubtitle: 'Comprehensive advisory for Korean and Chinese manufacturers expanding into Mexico. Eliminate US Section 301 tariffs, satisfy 75% Regional Value Content (RVC) thresholds, and achieve 30-90 day IMMEX launch with 0% VAT.',
      speakableText: 'Asian manufacturers, particularly from South Korea and China, are expanding production into Mexico to satisfy USMCA 75% Regional Value Content (RVC) requirements and bypass US Section 301 tariffs of up to 25%+. Utilizing Mexico’s pre-approved IMMEX Shelter framework allows foreign companies to commence manufacturing within 30 to 90 days, achieve immediate 0% VAT exemptions on temporary raw material imports, eliminate corporate permanent establishment (PE) risks, and leverage a $7.84/hr fully burdened direct labor rate near the US border.',
      metrics: [
        { title: 'USMCA RVC Duty-Free Rule', subtitle: 'Automotive & Core Industrial Parts', value: '75%' },
        { title: 'US Section 301 Tariff Duty Rate', subtitle: 'Upon USMCA Origin Transformation', value: '0%' },
        { title: 'IMMEX Shelter Setup Window', subtitle: 'Bypassing Standalone Entity Audits', value: '30-90 Days' },
        { title: 'Fully Burdened Labor Rate (2026)', subtitle: 'CONASAMI Northern Border Free Zone', value: '$7.84/hr' }
      ],
      rvcTitle: 'USMCA Article 5: 75% Regional Value Content (RVC) Rules & Origin Determination',
      rvcDesc: 'Under USMCA (T-MEC), rules of origin for passenger vehicles, trucks, and core automotive/industrial components (engines, transmissions, chassis, body, EV batteries) require a 75% Regional Value Content threshold—up from NAFTA’s 62.5%. Asian suppliers relocating to Mexico must perform substantial transformation to meet the 75% RVC requirement to qualify for duty-free US entry.',
      formulaTitle: 'USMCA Net Cost Method (NC) Formula',
      formulaEq: 'RVC = ((NC - VNM) / NC) * 100 >= 75%',
      formulaExplanation: [
        'NC (Net Cost): Total net cost of manufacturing and delivering the good.',
        'VNM (Value of Non-Originating Materials): Value of components imported from non-USMCA countries (e.g. East Asia).',
        'Steel & Aluminum Melt & Pour: At least 70% of steel and aluminum must originate and be poured in North America.',
        'Labor Value Content (LVC): 40-45% of vehicle value must be produced by facility workers earning at least $16 USD/hour.'
      ],
      pillarsTitle: '4 Core Pillars of Asian Expansion in Mexico',
      pillars: [
        { title: '1. USMCA Origin Transformation & Customs Compliance', desc: 'Utilizing Annex 24/30 automated inventory controls and virtual pedimentos (V1/V5) to verify Change in Tariff Classification (CTC) and issue legitimate USMCA Certificates of Origin.' },
        { title: '2. IMMEX Shelter Platform & Corporate PE Risk Immunity', desc: 'Operate under a pre-approved shelter umbrella to launch in 30 to 90 days. Avoid forming a direct S.A. de C.V. subsidiary and eliminate Mexican Permanent Establishment tax liabilities.' },
        { title: '3. Industrial Site Selection (Tijuana, Mexicali, Monterrey, Querétaro)', desc: 'Lease representation in Class A industrial parks near border crossings (Otay Mesa, PIMSA, Santa Catarina) with power, water, and build-to-suit capability.' },
        { title: '4. Supply Chain Localization & Tier-1 Integration', desc: 'Mapping local North American suppliers (US steel, Mexican injection molding, local packaging) to keep non-originating material costs under the 25% limit.' }
      ],
      comparisonTitle: '3-Way Structural Comparison for Asian Manufacturers',
      comparisonHeaders: ['Metric / Feature', 'Direct Export from East Asia', 'Standalone Mexican Entity (S.A. de C.V.)', 'IMMEX Shelter Service (Recommended)'],
      comparisonRows: [
        ['US Tariff Exposure (Section 301)', 'High (Up to 25%+ Duty)', '0% Duty (With 75% USMCA RVC)', '0% Duty (With 75% USMCA RVC)'],
        ['Time-to-Production Launch', '30-45 Days Sea Transit', '6 - 12 Months (SAT Audit Wait)', '30 - 90 Days (Pre-Approved Permit)'],
        ['Mexican VAT (16% Import Tax)', 'N/A (US Customs Duty Paid)', 'Requires Direct Annex 30 Audit', 'Immediate 0% VAT (Shelter Umbrella)'],
        ['Permanent Establishment (PE) Tax', 'None', 'Full Mexican Corporate Tax (30%)', 'Eliminated (Safe Harbor Protection)'],
        ['Transit Lead Time to US Border', '30-45 Days Ocean Freight', '2-4 Hours (Tijuana / Otay Mesa Trucking)', '2-4 Hours (Tijuana / Otay Mesa Trucking)'],
        ['Fully Burdened Labor Cost (2026)', 'Varies ($4.50-$6.50 + Freight)', '$7.84/hr + In-House HR Overhead', '$7.84/hr (Shelter Handles HR & Legal)']
      ],
      industriesTitle: 'Key Industry Sectors for Asian Investment',
      industries: [
        { title: 'EV & Automotive Components', desc: 'Battery enclosures, wiring harnesses, electric drivetrains, aluminum die-cast parts, and interior modules.' },
        { title: 'Consumer Electronics & Hardware Assembly', desc: 'SMT surface-mount assembly, telecommunication enclosures, medical sensors, display modules, and PCB assembly.' },
        { title: 'Industrial Machinery & Tooling', desc: 'Precision CNC machining, plastic injection mold tooling, stamping dies, and factory automation integration.' },
        { title: 'Solar & Renewable Energy Equipment', desc: 'Inverters, structural aluminum racking, solar module frames, and power distribution cabinets.' }
      ],
      faqTitle: 'Frequently Asked Questions: Asian Expansion & USMCA 75% RVC',
      faqs: [
        { q: 'How do Korean and Chinese manufacturers meet the USMCA 75% RVC requirement in Mexico?', a: 'By performing substantial transformation in Mexico—such as assembly, machining, and surface treatment—and sourcing local materials so that non-originating components (VNM) from Asia do not exceed 25% of the total net cost.' },
        { q: 'Does manufacturing in Mexico under shelter eliminate US Section 301 tariffs on Chinese components?', a: 'Yes. Once components undergo substantial transformation and fulfill USMCA origin criteria in Mexico, the finished goods enter the US under Mexican origin with 0% preferential tariffs, avoiding Section 301 duties.' },
        { q: 'What is the advantage of an IMMEX Shelter program over a standalone Mexican entity?', a: 'A standalone entity takes 6-12 months to obtain direct IMMEX and VAT certification and exposes the parent company to Mexican tax audit risks. An IMMEX Shelter allows operation in 30-90 days under the provider’s pre-approved permits.' },
        { q: 'What are the 2026 labor rates and logistics times in Tijuana and Mexicali?', a: 'Fully burdened direct labor in Tijuana and Mexicali averages $7.84 per hour under the Northern Border Free Zone minimum wage rules. Tijuana is 20-40 minutes from San Diego border ports, enabling same-day US shipping.' },
        { q: 'Are temporary equipment and raw material imports from Asia subject to 16% Mexican VAT?', a: 'No. Operating under a shelter provider with IMMEX Annex 30 VAT certification grants a 100% credit (0% effective rate) on temporary raw material and machinery imports.' }
      ],
      ctaTitle: 'Schedule an Asian Capital Expansion & USMCA Consultation',
      ctaDesc: 'Our bilingual cross-border team will model your USMCA 75% RVC compliance, evaluate site selection options, and provide a turnkey IMMEX shelter quote.',
      ctaPrimary: 'Launch Landed Cost Calculator',
      ctaSecondary: 'Explore Tijuana Master Guide'
    },
    es: {
      badge: 'Cumplimiento USMCA 75% RVC y Marco de Relocalización Asiática',
      heroTitle: 'Expansión de Capital Asiático a México: Reglas USMCA 75% RVC y Estrategia IMMEX Shelter',
      heroSubtitle: 'Asesoría integral para fabricantes de Corea del Sur y China que se expanden a México. Elimine los aranceles Sección 301 de EE. UU., cumpla con el 75% de Contenido de Valor Regional y opere en 30-90 días bajo IMMEX.',
      speakableText: 'Los fabricantes de Corea del Sur y China están trasladando su producción a México para cumplir con la regla del 75% de Contenido de Valor Regional (RVC) del USMCA/T-MEC y mitigar los aranceles de la Sección 301 de EE.UU. Mediante el esquema IMMEX Shelter, las empresas asiáticas inician operaciones en 30 a 90 días con exención del 0% de IVA en importaciones temporales y un costo laboral totalmente cargado de $7.84/hr.',
      metrics: [
        { title: 'Regla Libre de Arancel RVC', subtitle: 'Autopartes y Bienes Industriales', value: '75%' },
        { title: 'Tasa Arancelaria Sección 301', subtitle: 'Con Transformación de Origen', value: '0%' },
        { title: 'Tiempo de Inicio IMMEX Shelter', subtitle: 'Evitando Trámites Subsidiarios', value: '30-90 Días' },
        { title: 'Costo Laboral Total (2026)', subtitle: 'Zona Libre de la Frontera Norte', value: '$7.84/hr' }
      ],
      rvcTitle: 'Artículo 5 del USMCA: Regla del 75% de Contenido de Valor Regional (RVC)',
      rvcDesc: 'Bajo el USMCA (T-MEC), el porcentaje de Contenido de Valor Regional para vehículos y autopartes esenciales aumentó del 62.5% al 75%. Los proveedores asiáticos que se trasladan a México deben realizar una transformación sustancial para cumplir este requisito y calificar para el libre arancel hacia EE. UU.',
      formulaTitle: 'Fórmula del Método de Costo Neto (NC)',
      formulaEq: 'RVC = ((NC - VNM) / NC) * 100 >= 75%',
      formulaExplanation: [
        'NC (Costo Neto): Costo total de fabricación y entrega del producto.',
        'VNM (Valor de Materiales No Originarios): Valor de insumos importados de países fuera del USMCA (ej. Asia).',
        'Acero y Aluminio: El 70% del acero y aluminio debe ser fundido y vaciado en Norteamérica.',
        'Contenido de Valor Laboral (LVC): 40-45% del valor del vehículo debe ser producido por trabajadores que ganen al menos $16 USD/hora.'
      ],
      pillarsTitle: '4 Pilares de la Expansión Asiática en México',
      pillars: [
        { title: '1. Transformación de Origen USMCA y Control Aduanero', desc: 'Uso de Anexo 24/30 y pedimentos virtuales (V1/V5) para certificar el Cambio de Clasificación Arancelaria (CTC) y emitir Certificados de Origen.' },
        { title: '2. Plataforma IMMEX Shelter e Inmunidad Fiscal PE', desc: 'Opere bajo la sombrilla de un shelter preautorizado en 30 a 90 días, evitando el riesgo de Establecimiento Permanente (PE) en México.' },
        { title: '3. Selección de Sitios Industriales (Tijuana, Mexicali, Monterrey, Querétaro)', desc: 'Representación en parques industriales Clase A cerca de cruces fronterizos con capacidad Build-to-Suit.' },
        { title: '4. Localización de la Cadena de Suministro y Tier-1', desc: 'Mapeo de proveedores norteamericanos para mantener insumos no originarios por debajo del límite del 25%.' }
      ],
      comparisonTitle: 'Comparativa de Modelos de Expansión',
      comparisonHeaders: ['Métrica / Característica', 'Exportación Directa desde Asia', 'Entidad Mexicana Independiente', 'Modelo IMMEX Shelter (Recomendado)'],
      comparisonRows: [
        ['Aranceles EE. UU. (Sección 301)', 'Alto (Hasta 25%+ Arancel)', '0% Arancel (Con 75% RVC)', '0% Arancel (Con 75% RVC)'],
        ['Tiempo de Inicio de Operaciones', '30-45 Días Flete Marítimo', '6 - 12 Meses (Trámite SAT)', '30 - 90 Días (Permiso Preaprobado)'],
        ['IVA Mexicano (16% Importación)', 'N/A', 'Requiere Auditoría Anexo 30', '0% IVA Inmediato (Vía Shelter)'],
        ['Riesgo de Establecimiento Permanente', 'Ninguno', 'Alto (30% ISR Corporativo)', 'Eliminado (Bajo Safe Harbor)'],
        ['Tiempo de Tránsito a Frontera EE.UU.', '30-45 Días Vía Marítima', '2-4 Horas (Tijuana-San Diego)', '2-4 Horas (Tijuana-San Diego)'],
        ['Costo Laboral Cargado (2026)', 'Variable ($4.50-$6.50 + Flete)', '$7.84/hr + Gastos de HR', '$7.84/hr (HR y Legal Incluido)']
      ],
      industriesTitle: 'Sectores Clave para Inversión Asiática',
      industries: [
        { title: 'Componentes de EV y Automotriz', desc: 'Módulos de batería, arneses eléctricos, trenes motrices y piezas fundidas de aluminio.' },
        { title: 'Electrónica de Consumo y Hardware', desc: 'Ensamblaje SMT, gabinetes de telecomunicaciones, sensores y módulos PCB.' },
        { title: 'Maquinaria Industrial y Moldes', desc: 'Maquinado CNC de precisión, moldes de inyección de plástico y automatización.' },
        { title: 'Energía Solar y Renovable', desc: 'Inversores, estructuras de aluminio y gabinetes de distribución eléctrica.' }
      ],
      faqTitle: 'Preguntas Frecuentes: Expansión Asiática y USMCA 75% RVC',
      faqs: [
        { q: '¿Cómo cumplen los fabricantes asiáticos la regla del 75% RVC en México?', a: 'Realizando una transformación sustancial en México para que los insumos de Asia (VNM) no excedan el 25% del costo neto total.' },
        { q: '¿Fabricar en México elimina los aranceles de la Sección 301 de EE. UU.?', a: 'Sí. Al obtener origen mexicano bajo el USMCA, los productos entran a EE. UU. con tasa arancelaria del 0%, evitando la Sección 301.' },
        { q: '¿Cuál es la ventaja del modelo IMMEX Shelter frente a una entidad independiente?', a: 'Una entidad propia toma de 6 a 12 meses para obtener permisos IMMEX/IVA. El Shelter permite operar en 30 a 90 días bajo permisos preaprobados.' },
        { q: '¿Cuáles son las tarifas laborales y tiempos logísticos en Tijuana y Mexicali?', a: 'El costo laboral totalmente cargado promedia $7.84/hr. Tijuana se encuentra a 20-40 minutos de la frontera con San Diego.' },
        { q: '¿Las importaciones temporales de equipos e insumos pagan el 16% de IVA?', a: 'No. Operar bajo un shelter con certificación Anexo 30 otorga un crédito del 100% (tasa efectiva del 0%) en el IVA de importación.' }
      ],
      ctaTitle: 'Solicite una Consultoría de Expansión y Cumplimiento USMCA',
      ctaDesc: 'Nuestro equipo evaluará el cumplimiento del 75% RVC, seleccionará sitios industriales y presentará una propuesta integral de IMMEX Shelter.',
      ctaPrimary: 'Calculadora de Costo Landed',
      ctaSecondary: 'Guía Maestra de Tijuana'
    },
    de: {
      badge: 'USMCA 75% RVC Konformität & Asiatisches Nearshoring Framework',
      heroTitle: 'Asiatische Kapitalexpansion nach Mexiko: USMCA 75% RVC & IMMEX Shelter Strategie',
      heroSubtitle: 'Strategische Beratung für koreanische und chinesische Hersteller zur Expansion nach Mexiko. Umgehen Sie US Section 301 Zölle und erreichen Sie 75% RVC Konformität.',
      speakableText: 'Asiatische Hersteller verlagern Produktionskapazitäten nach Mexiko, um die USMCA 75% RVC-Vorschriften zu erfüllen und US Section 301 Zölle zu vermeiden. Über das IMMEX-Shelter-Modell starten Unternehmen den Betrieb innerhalb von 30 bis 90 Tagen bei 0% MwSt. auf temporäre Importe und voll belasteten Arbeitskosten von 7,84 $/Std.',
      metrics: [
        { title: 'USMCA RVC Zollfrei-Schwelle', subtitle: 'Automobil & Industrie-Kernkomponenten', value: '75%' },
        { title: 'US Section 301 Zollsatz', subtitle: 'Bei USMCA Ursprungstransformation', value: '0%' },
        { title: 'IMMEX Shelter Startzeitfenster', subtitle: 'Ohne langwierige Tochtergesellschaft', value: '30-90 Tage' },
        { title: 'Voll Belasteter Stundensatz (2026)', subtitle: 'CONASAMI Nördliche Grenzfreizone', value: '$7.84/Std' }
      ],
      rvcTitle: 'USMCA Artikel 5: 75% Regionaler Wertschöpfungsanteil (RVC)',
      rvcDesc: 'Unter dem USMCA (T-MEC) stieg die RVC-Schwelle für Kraftfahrzeuge und Kernkomponenten von 62.5% auf 75%. Asiatische Zulieferer müssen in Mexiko eine wesentliche Be- oder Verarbeitung durchführen.',
      formulaTitle: 'USMCA Netto-Kosten-Formel (Net Cost Method)',
      formulaEq: 'RVC = ((NC - VNM) / NC) * 100 >= 75%',
      formulaExplanation: [
        'NC (Net Cost): Gesamte Nettokosten der Herstellung und Lieferung.',
        'VNM (Value of Non-Originating Materials): Wert von Vormaterialien aus Nicht-USMCA-Ländern (z.B. Asien).',
        'Stahl & Aluminium: Mindestens 70% des Stahls und Aluminiums müssen in Nordamerika geschmolzen und gegossen werden.',
        'Labor Value Content (LVC): 40-45% des Fahrzeugwerts müssen von Arbeitern produziert werden, die mind. 16 USD/Std. verdienen.'
      ],
      pillarsTitle: '4 Säulen der asiatischen Expansion in Mexiko',
      pillars: [
        { title: '1. USMCA Ursprungstransformation & Zollkonformität', desc: 'Verwendung von Annex 24/30 Systemen zur Ausstellung offizieller USMCA Ursprungszeugnisse.' },
        { title: '2. IMMEX Shelter Plattform & Safe Harbor Immunität', desc: 'Betrieb unter einem vorgeprüften Shelter-Schirm innerhalb von 30 bis 90 Tagen ohne steuerliches Betriebsstättenrisiko (PE).' },
        { title: '3. Industrielle Standortwahl (Tijuana, Mexicali, Monterrey, Querétaro)', desc: 'Vertretung bei Mietverträgen in Klasse-A-Industrieparks in Grenznähe.' },
        { title: '4. Lieferketten-Lokalisierung & Tier-1 Integration', desc: 'Einbindung nordamerikanischer Lieferanten zur Einhaltung der 25% VNM-Grenze.' }
      ],
      comparisonTitle: 'Strukturvergleich der Expansionsmodelle',
      comparisonHeaders: ['Kriterium', 'Direktexport aus Ostasien', 'Eigenständige mexikanische Eigenschaft', 'IMMEX Shelter Modell (Empfohlen)'],
      comparisonRows: [
        ['US Zollrisiko (Section 301)', 'Hoch (Bis zu 25%+ Zoll)', '0% Zoll (Mit 75% USMCA RVC)', '0% Zoll (Mit 75% USMCA RVC)'],
        ['Produktionsstart', '30-45 Tage Seefracht', '6 - 12 Monate (SAT Genehmigung)', '30 - 90 Tage (Sofortiger Start)'],
        ['Mexikanische MwSt. (16% Import)', 'Entfällt', 'Benötigt Annex 30 Audit', 'Sofort 0% MwSt. (Über Shelter)'],
        ['Betriebsstätten-Steuerrisiko (PE)', 'Keines', 'Hoch (30% Körperschaftsteuer)', 'Eliminiert (Safe Harbor Regelung)'],
        ['Transportzeit zur US-Grenze', '30-45 Tage Seefracht', '2-4 Stunden (Tijuana-San Diego Trucking)', '2-4 Stunden (Tijuana-San Diego Trucking)'],
        ['Arbeitskosten inkl. Nebenkosten (2026)', 'Variabel ($4.50-$6.50 + Fracht)', '$7.84/Std + Eigene HR-Kosten', '$7.84/Std (HR & Recht inklusive)']
      ],
      industriesTitle: 'Schlüsselbranchen für asiatische Investitionen',
      industries: [
        { title: 'EV & Automobil-Komponenten', desc: 'Batteriegehäuse, Kabelbäume, elektrische Antriebsstränge und Aluminium-Druckguss.' },
        { title: 'Unterhaltungselektronik & Hardware', desc: 'SMT-Bestückung, Telekommunikationsgehäuse, Sensoren und PCB-Montage.' },
        { title: 'Industriemaschinen & Werkzeugbau', desc: 'Präzisions-CNC-Bearbeitung, Kunststoff-Spritzgusswerkzeuge und Automatisierung.' },
        { title: 'Solar & Erneuerbare Energien', desc: 'Wechselrichter, Aluminium-Montagesysteme und Stromverteilerkästen.' }
      ],
      faqTitle: 'Häufig gestellte Fragen: Expansion & USMCA 75% RVC',
      faqs: [
        { q: 'Wie erfüllen asiatische Hersteller die 75% RVC-Regel in Mexiko?', a: 'Durch wesentliche Be- und Verarbeitung in Mexiko, sodass nicht-ursprüngliche Vormaterialien aus Asien max. 25% der Nettokosten ausmachen.' },
        { q: 'Beseitigt die Produktion in Mexiko die US Section 301 Zölle?', a: 'Ja. Mit mexikanischem USMCA-Ursprung reisen Waren zollfrei (0%) in die USA ein, ohne Section 301 Zölle.' },
        { q: 'Was ist der Vorteil eines IMMEX Shelter Programms?', a: 'Ein Shelter ermöglicht den Start in 30-90 Tagen unter bestehenden Genehmigungen ohne jahrelanges Auditierungsrisiko.' },
        { q: 'Wie hoch sind die Arbeitskosten in Tijuana und Mexicali 2026?', a: 'Die Gesamtarbeitskosten liegen im Schnitt bei 7,84 $/Std. Tijuana liegt 20-40 Min. von San Diego entfernt.' },
        { q: 'Fällt auf temporäre Importe aus Asien 16% mexikanische MwSt. an?', a: 'Nein. Unter einem Shelter mit Annex 30 Zertifizierung entfällt die Import-MwSt. zu 100% (effektiv 0%).' }
      ],
      ctaTitle: 'Beratung zur asiatischen Kapitalexpansion anfordern',
      ctaDesc: 'Unser Team berechnet Ihre USMCA 75% RVC Konformität und erstellt ein individuelles IMMEX Shelter Angebot.',
      ctaPrimary: 'Landed Cost Rechner Starten',
      ctaSecondary: 'Tijuana Master Guide Ansehen'
    },
    ja: {
      badge: 'USMCA 75% RVC 適合 & アジア進出サポート',
      heroTitle: 'アジア企業のメキシコ進出：USMCA 75% RVC 原産地規則適合 & IMMEX シェルター戦略',
      heroSubtitle: '韓国・中国などの製造企業向けメキシコ進出支援。米国 Section 301 追加関税の回避、USMCA 75% 地域付加価値基準（RVC）適合、30〜90日での IMMEX シェルター立ち上げと VAT 0% 免税を実現。',
      speakableText: '韓国や中国をはじめとするアジアの製造企業は、米国 Section 301 追加関税を回避し USMCA（米国・メキシコ・カナダ協定）の75%地域付加価値基準（RVC）を達成するため、メキシコへの生産拠点移転を加速させています。IMMEXシェルター制度を活用することで、メキシコ現地法人の設立リスクなしに30〜90日での迅速な操業開始が可能となり、一時輸入資材への付加価値税（VAT）0%適用および時給$7.84の労働コスト削減を実現します。',
      metrics: [
        { title: 'USMCA RVC 関税ゼロ基準', subtitle: '自動車部品および産業用コア部品', value: '75%' },
        { title: '米国 Section 301 関税回避率', subtitle: '原産地転換後の米国輸入関税', value: '0%' },
        { title: 'IMMEX シェルター稼働期間', subtitle: '自社法人監査をバイパスした立ち上げ', value: '30-90日' },
        { title: '総労働コスト（2026年基準）', subtitle: '北部国境自由地帯 CONASAMI 時給換算', value: '$7.84/時' }
      ],
      rvcTitle: 'USMCA 第5条：75% 地域付加価値基準（RVC）規則と原産地判定メカニズム',
      rvcDesc: 'USMCA（T-MEC）協定のもと、乗用車・トラックおよび自動車コア部品（エンジン、トランスミッション、車体、シャシー、EVバッテリー）の無関税適用に必要な地域付加価値基準（RVC）は従来の NAFTA 62.5% から 75% へ引き上げられました。アジアの部品メーカーはメキシコで実質的変更（Substantial Transformation）を行い、75% RVC 条件をクリアする必要があります。',
      formulaTitle: 'USMCA 控除コスト法（Net Cost Method）計算式',
      formulaEq: 'RVC = ((NC - VNM) / NC) * 100 >= 75%',
      formulaExplanation: [
        'NC (Net Cost): 製品の製造および出荷に係る総純コスト。',
        'VNM (Value of Non-Originating Materials): アジア等から輸入された非原産材料の総価値。',
        '鉄鋼・アルミニウム調達規制: 完成車・重要部品に使用される鉄鋼およびアルミニウムの70%以上が北米内で溶融・鋳造（Melt & Pour）されていること。',
        '労働付加価値割合 (LVC): 車両価値の 40〜45% は時給 16 ドル以上の北米高賃金労働者によって製造される必要があります。'
      ],
      pillarsTitle: 'アジア企業メキシコ進出の4大戦略ピラー',
      pillars: [
        { title: '1. USMCA 原産地転換 & 税関適合コントロール', desc: 'Annex 24/30 デジタル在庫管理および仮想通関（V1/V5）を活用し、関税分類変更（CTC）の立証と正規 USMCA 原産地証明書を発行します。' },
        { title: '2. IMMEX シェルター傘下活用 & 恒久的施設（PE）課税リスク回避', desc: '自社現地法人（S.A. de C.V.）を設立せず、シェルター事業者の許認可傘下で30〜90日以内に操業開始。メキシコ法人税リスクを回避します。' },
        { title: '3. 戦略的拠点選定（ティフアナ、メヒカリ、モンテレイ、ケレタロ）', desc: '米国国境に近接した Class A 工業団地（Otay Mesa、PIMSA、Santa Catarina）の賃貸交渉および電力インフラ拡張を支援します。' },
        { title: '4. サプライチェーン現地化 & Tier-1/Tier-2 統合', desc: 'アジアからの非原産資材（VNM）割合を25%以下に抑えるため、北米現地サプライヤー（米国製鋼材、メキシコ製樹脂成形品）とのマッチングを行います。' }
      ],
      comparisonTitle: 'アジア製造企業のメキシコ進出 3モデル比較分析',
      comparisonHeaders: ['評価項目', '東アジア直接輸出（韓国・中国）', 'メキシコ自社法人設立（S.A. de C.V.）', 'IMMEX シェルターモデル（推奨）'],
      comparisonRows: [
        ['米国関税および Section 301 リスク', '高（最大25%+ 追加関税）', '関税 0%（75% RVC 達成時）', '関税 0%（75% RVC 達成時）'],
        ['生産立ち上げリードタイム', '海上輸送 30-45日', '6 - 12ヶ月（SAT 認可待ち）', '30 - 90日（即時稼働）'],
        ['メキシコ付加価値税（VAT 16%）', '対象外（米国関税が発生）', '自社で Annex 30 監査が必要', '即時 0% 免税（シェルター許認可活用）'],
        ['恒久的施設（PE）課税リスク', 'なし', '高（メキシコ法人税 30% 適用）', '排除（Safe Harbor 規定適合）'],
        ['米国国境までの輸送時間', '海上コンテナ 30-45日', '2-4時間（ティフアナ〜サンディエゴトラック）', '2-4時間（ティフアナ〜サンディエゴトラック）'],
        ['総労働コスト（2026年時給換算）', '国により異なる（$4.5-$6.5 + 運賃）', '$7.84/時 + 自社人事管理費', '$7.84/時（人事・法務はシェルター一括）']
      ],
      industriesTitle: 'アジア資本が注力する4大産業クラスタ',
      industries: [
        { title: 'EV & 自動車部品クラスタ', desc: 'バッテリーパックケース、ワイヤーハーネス、電動ドライブトレイン、アルミダイカスト品および内装モジュール。' },
        { title: '電子機器 & ハードウェア組立', desc: 'SMT 表面実装ライン、通信機器筐体、医療用センサー、ディスプレイモジュールおよび PCB 組立。' },
        { title: '精密機械 & 金型製造', desc: '精密 CNC 加工、プラスチック射出成形金型、プレス金型および産業用ロボット統合。' },
        { title: 'ソーラー & クリーンエナジー設備', desc: 'パワコン（インバータ）、アルミ架台構造物、蓄電システム配電盤および電力変換装置。' }
      ],
      faqTitle: 'よくある質問：USMCA 75% RVC とメキシコ進出',
      faqs: [
        { q: '韓国や中国企業がメキシコ工場で USMCA 75% RVC 規則に適合するには？', a: 'メキシコ工場で組み立てや精密加工などの実質的変更を行い、アジアからの非原産資材（VNM）割合を総純コスト（NC）の25%以下に抑える必要があります。' },
        { q: 'メキシコで生産すれば米国 Section 301 追加関税は回避できますか？', a: 'はい。メキシコで実質的変更を行い USMCA 原産地規則をクリアすれば、米国輸入時にメキシコ原産として 0% 恵与関税が適用され、Section 301 関税は免除されます。' },
        { q: 'IMMEX シェルターモデルと自社法人設立の最大の違いは何ですか？', a: '自社法人設立は IMMEX や VAT 認可に 6〜12 ヶ月を要しますが、シェルターモデルは実績ある事業者の許認可を活用し 30〜90 日で稼働可能です。' },
        { q: 'ティフアナやメヒカリの2026年労働コストと物流の利点は？', a: '北部国境自由地帯の総労働コストは時給約 $7.84 です。ティフアナはサンディエゴ国境まで 20〜40 分で、当日納品が可能です。' },
        { q: 'アジア本社からメキシコ工場への機械設備や資材の輸入に VAT はかかりますか？', a: 'Annex 30 認可を持つシェルター傘下で一時輸入を行えば、付加価値税（16%）は 100% 免除（実質 0%）となります。' }
      ],
      ctaTitle: 'アジア企業メキシコ進出 & USMCA 適合診断の申込み',
      ctaDesc: '専門アドバイザーが 75% RVC 適合性試算、物件選定、IMMEX シェルター見積もりおよび着地総コスト（TCO）シミュレーションを提供します。',
      ctaPrimary: 'Landed Cost 計算機を起動',
      ctaSecondary: 'ティフアナマスターガイドを見る'
    }
  };

  const curr = dictionary[lang] || dictionary.en;

  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${BASE_URL}/${lang}/services/asian-capital-expansion#service`,
        'name': curr.badge,
        'serviceType': 'Asian Capital Expansion & USMCA 75% RVC Compliance Advisory',
        'provider': {
          '@type': 'Organization',
          'name': 'Nearshore Navigator',
          'url': BASE_URL
        },
        'areaServed': ['Mexico', 'United States', 'South Korea', 'China', 'Tijuana', 'Monterrey', 'Mexicali', 'Querétaro'],
        'description': curr.heroSubtitle
      },
      {
        '@type': 'FAQPage',
        '@id': `${BASE_URL}/${lang}/services/asian-capital-expansion#faq`,
        'mainEntity': curr.faqs.map((f) => ({
          '@type': 'Question',
          'name': f.q,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': f.a
          }
        }))
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${BASE_URL}/${lang}/services/asian-capital-expansion#breadcrumb`,
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': `${BASE_URL}/${lang}`
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Services',
            'item': `${BASE_URL}/${lang}/services`
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': 'Asian Capital Expansion',
            'item': `${BASE_URL}/${lang}/services/asian-capital-expansion`
          }
        ]
      },
      {
        '@type': 'SpeakableSpecification',
        '@id': `${BASE_URL}/${lang}/services/asian-capital-expansion#speakable`,
        'cssSelector': ['.speakable-direct-answer']
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="max-w-6xl mx-auto space-y-16">
        {/* Breadcrumb Navigation */}
        <nav className="flex text-sm text-gray-400 space-x-2" aria-label="Breadcrumb">
          <Link href={`/${lang}`} className="hover:text-primary-400 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href={`/${lang}/services`} className="hover:text-primary-400 transition-colors">
            Services
          </Link>
          <span>/</span>
          <span className="text-gray-200 font-medium">Asian Capital Expansion</span>
        </nav>

        {/* Hero Header & Speakable Block */}
        <header className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-primary-500/10 border border-primary-500/30 rounded-full text-primary-400 text-xs font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            {curr.badge}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {curr.heroTitle}
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-4xl leading-relaxed">
            {curr.heroSubtitle}
          </p>

          {/* Speakable / Direct Answer Block for Voice Search & LLMs */}
          <div className="speakable-direct-answer p-6 sm:p-8 bg-gray-900/90 border border-primary-500/40 rounded-2xl text-gray-200 text-base sm:text-lg leading-relaxed shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="text-xs uppercase font-bold text-primary-400 mb-2 tracking-widest flex items-center gap-2">
              <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Direct Answer / AEO Executive Summary
            </div>
            {curr.speakableText}
          </div>
        </header>

        {/* Metric Cards Grid */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {curr.metrics.map((m, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 bg-gray-900/80 rounded-xl border border-gray-800 hover:border-primary-500/50 transition-all space-y-2 shadow-lg"
            >
              <div className="text-2xl sm:text-4xl font-extrabold text-primary-400 tracking-tight">
                {m.value}
              </div>
              <div className="text-sm font-bold text-white leading-snug">{m.title}</div>
              <div className="text-xs text-gray-400">{m.subtitle}</div>
            </div>
          ))}
        </section>

        {/* USMCA 75% RVC Explanation & Formula Section */}
        <section className="space-y-8 p-8 bg-gray-900/60 rounded-2xl border border-gray-800">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {curr.rvcTitle}
            </h2>
            <p className="text-gray-300 leading-relaxed text-base">
              {curr.rvcDesc}
            </p>
          </div>

          <div className="p-6 bg-gray-950 rounded-xl border border-primary-500/30 space-y-4">
            <h3 className="text-lg font-semibold text-primary-400 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              {curr.formulaTitle}
            </h3>
            <div className="p-4 bg-gray-900 rounded-lg text-emerald-400 font-mono text-center text-lg sm:text-xl font-bold tracking-wide border border-gray-800">
              {curr.formulaEq}
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-300 pt-2">
              {curr.formulaExplanation.map((exp, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-gray-900/40 p-3 rounded-lg border border-gray-800">
                  <span className="text-primary-400 font-bold">•</span>
                  <span>{exp}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 3-Way Comparison Matrix Table */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {curr.comparisonTitle}
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-800 bg-gray-900 shadow-2xl">
            <table itemScope itemType="https://schema.org/Table" className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-gray-800/90 text-primary-400 text-sm font-semibold border-b border-gray-700">
                  <th className="p-4">{curr.comparisonHeaders[0]}</th>
                  <th className="p-4">{curr.comparisonHeaders[1]}</th>
                  <th className="p-4">{curr.comparisonHeaders[2]}</th>
                  <th className="p-4 bg-primary-950/40 text-emerald-400 border-l border-primary-500/30">
                    {curr.comparisonHeaders[3]}
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-800 text-gray-300">
                {curr.comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-800/40 transition-colors">
                    <td className="p-4 font-semibold text-white">{row[0]}</td>
                    <td className="p-4 text-rose-300">{row[1]}</td>
                    <td className="p-4 text-amber-300">{row[2]}</td>
                    <td className="p-4 font-semibold text-emerald-400 bg-primary-950/20 border-l border-primary-500/20">
                      {row[3]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Core Pillars Section */}
        <section className="space-y-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {curr.pillarsTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {curr.pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-6 bg-gray-900/70 rounded-2xl border border-gray-800 hover:border-primary-500/40 transition-all space-y-3"
              >
                <h3 className="text-xl font-bold text-primary-400 leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Industry Focus Sectors */}
        <section className="space-y-8 p-8 bg-gray-900/40 rounded-2xl border border-gray-800">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {curr.industriesTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {curr.industries.map((ind, idx) => (
              <div key={idx} className="p-5 bg-gray-950 rounded-xl border border-gray-800 space-y-2">
                <div className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary-500"></span>
                  {ind.title}
                </div>
                <p className="text-sm text-gray-300 leading-relaxed pl-4">
                  {ind.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Voice Search & Conversational FAQ Section */}
        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {curr.faqTitle}
            </h2>
            <p className="text-sm text-gray-400">
              Answer Engine Optimization (AEO) conversational structured Q&A for cross-border executives.
            </p>
          </div>
          <div className="space-y-4">
            {curr.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-6 bg-gray-900/80 rounded-xl border border-gray-800 space-y-3"
              >
                <h3 className="text-lg font-bold text-white flex items-start gap-2">
                  <span className="text-primary-400 font-extrabold">Q:</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed pl-6 border-l-2 border-primary-500/40">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Calculators & Related Guides CTAs */}
        <section className="bg-gradient-to-r from-primary-950/60 via-gray-900 to-gray-950 border border-primary-500/40 rounded-3xl p-8 sm:p-12 text-center space-y-8 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {curr.ctaTitle}
            </h2>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              {curr.ctaDesc}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={`/${lang}/tools/cost-calculator`}
              className="px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-xl transition-all shadow-xl shadow-primary-600/30 hover:scale-105"
            >
              {curr.ctaPrimary} &rarr;
            </Link>
            <Link
              href={`/${lang}/locations/tijuana/master-guide`}
              className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl border border-gray-700 transition-all hover:scale-105"
            >
              {curr.ctaSecondary}
            </Link>
            <Link
              href={`/${lang}/services/shelter-services`}
              className="px-8 py-4 bg-gray-900 hover:bg-gray-800 text-primary-400 font-semibold rounded-xl border border-primary-500/30 transition-all hover:scale-105"
            >
              IMMEX Shelter Overview
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
