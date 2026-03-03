export type BlogPost = {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  imageUrl: string;
  tags: string[];
  content?: string; // HTML content or markdown
  locales?: {
    [key: string]: {
      title: string;
      excerpt: string;
      content?: string;
      tags?: string[];
    }
  }
};

export const BLOG_POSTS: BlogPost[] = [
  {
      title: "Nearshoring in Baja California: A Guide for US Companies",
      excerpt: "Everything you need to know about setting up operations in Mexico's manufacturing hub.",
      date: "Oct 24, 2025",
      slug: "nearshoring-in-tijuana-guide-for-us-companies",
      imageUrl: "/images/warehouse.jpg",
      tags: ["Guide", "Strategy"],
      content: `
        <p>Baja California has arguably become the most critical manufacturing hub in North America for companies looking to decouple from Asia. With its strategic proximity to California, a shared time zone, and a deeply integrated cross-border culture, it offers advantages that few other regions can match.</p>
        
        <h2>Why "China+1" Leads to Baja</h2>
        <p>The global supply chain creates risk. Tariffs, geopolitical tension, and rising labor costs in China have forced US companies to seek alternatives. Baja California isn't just a "low-cost" alternative; it's a <strong>high-velocity</strong> partner.</p>
        <p>Being minutes from San Diego allows for:</p>
        <ul>
          <li><strong>Same-day executive oversight:</strong> Your engineering team in California can visit the factory in Tijuana and be back for dinner.</li>
          <li><strong>USMCA Tariff benefits:</strong> Qualifying goods enter the US duty-free, avoiding Section 301 tariffs that plague Asian imports.</li>
          <li><strong>IP Protection:</strong> Mexico's IP laws, strengthened by USMCA, offer far more robust protection than typical Asian jurisdictions.</li>
        </ul>

        <h2>The Workforce Advantage</h2>
        <p>Tijuana and Mexicali are not new to this. They have a 50-year history of aerospace, medical device, and electronics manufacturing. The region produces thousands of engineers annually from top universities like UABC and CETYS.</p>
        <p>Major clusters include:</p>
        <ul>
            <li><strong>Medical Devices:</strong> The highest concentration of MedDev manufacturing in North America (Medtronic, DjO, Breg).</li>
            <li><strong>Aerospace:</strong> High-precision machining and assembly for giants like Honeywell and Collins Aerospace.</li>
            <li><strong>Electronics:</strong> From Samsung to Foxconn, the electronics ecosystem is mature and deep.</li>
        </ul>

        <h2>Getting Started</h2>
        <p>The first step is a feasibility study: assessing your labor needs, power requirements, and logistics flow. Don't sign a lease until you understand your "landed cost" model.</p>
      `,
      locales: {
        ja: {
          title: "バハ・カリフォルニアでのニアショアリング：米国企業向けガイド",
          excerpt: "メキシコの製造ハブで事業を立ち上げるために知っておくべきことのすべて。",
          tags: ["ガイド", "戦略"],
          content: `
            <p>バハ・カリフォルニアは、アジアからのデカップリングを目指す企業にとって、北米で最も重要な製造ハブとなっています。カリフォルニアに近いという戦略的な立地、共通の時間帯、深く統合された国境越えの文化により、他の地域では得られない利点を提供しています。</p>
            
            <h2>なぜ「チャイナ・プラス・ワン」がバハにつながるのか</h2>
            <p>グローバル・サプライチェーンはリスクを生み出します。関税、地政学的緊張、中国での人件費上昇により、米国企業は代替案を模索せざるを得なくなっています。バハ・カリフォルニアは単なる「低コスト」の代替地ではありません。<strong>高速な</strong>パートナーなのです。</p>
            <p>サンディエゴから数分の距離にあることで、以下のことが可能になります：</p>
            <ul>
              <li><strong>同日の経営幹部による監督：</strong>カリフォルニアのエンジニアリングチームは、ティフアナの工場を訪問し、夕食までには戻ることができます。</li>
              <li><strong>USMCA（旧NAFTA）の関税メリット：</strong>適格な商品は無関税で米国に入国でき、アジアからの輸入を悩ませる通商法301条の関税を回避できます。</li>
              <li><strong>知的財産（IP）保護：</strong>USMCAによって強化されたメキシコのIP法は、一般的なアジアの法域よりもはるかに強固な保護を提供します。</li>
            </ul>

            <h2>労働力の優位性</h2>
            <p>ティフアナとメヒカリにとって、これは新しいことではありません。彼らには航空宇宙、医療機器、電子機器製造の50年の歴史があります。この地域は、UABCやCETYSのようなトップ大学から毎年数千人のエンジニアを輩出しています。</p>
            <p>主要なクラスターには以下が含まれます：</p>
            <ul>
                <li><strong>医療機器：</strong>北米で最も医療機器製造が集中している地域（Medtronic、DjO、Breg）。</li>
                <li><strong>航空宇宙：</strong>HoneywellやCollins Aerospaceなどの大手向けの高精度加工と組み立て。</li>
                <li><strong>電子機器：</strong>SamsungからFoxconnまで、電子機器のエコシステムは成熟しており、奥深いです。</li>
            </ul>

            <h2>始め方</h2>
            <p>最初のステップはフィージビリティスタディです。労働力のニーズ、電力要件、物流の流れを評価します。「着地コスト」モデルを理解するまでは、賃貸契約を結ばないでください。</p>
          `
        }
      }
  },
  {
      title: "Baja California vs Asia: Manufacturing Cost Comparison",
      excerpt: "Analyze the total landed cost benefits of manufacturing in Baja California versus traditional Asian hubs.",
      date: "Nov 12, 2025",
      slug: "tijuana-vs-asia-manufacturing-cost-comparison",
      imageUrl: "/images/factory-worker.jpg",
      tags: ["Cost Analysis", "Economics"],
      content: `
        <p>When calculating Total Landed Cost (TLC), Mexico often wins out over Asian competitors not necessarily on labor rates alone, but on the total cost of ownership, speed, and risk mitigation.</p>
        
        <h2>The Logistics Equation</h2>
        <p>The pandemic exposed the fragility of trans-Pacific shipping. A container from Shanghai to Long Beach can take 3-6 weeks and cost anywhere from $2,000 to $20,000 depending on volatility.</p>
        <p><strong>The Baja Difference:</strong> A truck from Tijuana to a distribution center in Otay Mesa takes 2 hours. The cost is stable, predictable, and allows for "Just-in-Time" (JIT) inventory management that is impossible when sourcing from Asia.</p>

        <h2>Labor vs. Automation</h2>
        <p>While unskilled labor in Vietnam or India may be cheaper on paper, Mexico offers a "sweet spot" of skilled labor at competitive rates. The fully burdened cost for a skilled assembly operator in Tijuana is significantly lower than the US, but with productivity rates that often match or exceed US counterparts due to the mature industrial culture.</p>

        <h2>Tariff Avoidance (Section 301)</h2>
        <p>For many industries, the 25% Section 301 tariff on Chinese goods obliterates profit margins. Manufacturing in Mexico under USMCA allows for <strong>duty-free entry</strong> into the US for qualifying products. This single factor often makes Nearshoring 20-25% cheaper than Offshoring, regardless of labor arbitrage.</p>
      `,
      locales: {
        ja: {
          title: "バハ・カリフォルニア対アジア：製造コスト比較",
          excerpt: "バハ・カリフォルニアでの製造と従来のアジアのハブでの製造の総着地コストの利点を分析します。",
          tags: ["コスト分析", "経済"],
          content: `
            <p>総着地コスト（TLC）を計算すると、メキシコはアジアの競合他社に勝ることがよくあります。これは必ずしも人件費の低さだけではなく、総所有コスト、スピード、リスク軽減によるものです。</p>
            
            <h2>物流の方程式</h2>
            <p>パンデミックは、太平洋横断輸送の脆弱性を露呈しました。上海からロングビーチへのコンテナ輸送には3〜6週間かかり、変動によっては2,000ドルから20,000ドルの費用がかかる場合があります。</p>
            <p><strong>バハの違い：</strong>ティフアナからオタイ・メサの配送センターへのトラック輸送は2時間で済みます。コストは安定しており、予測可能で、アジアからの調達では不可能な「ジャスト・イン・タイム」（JIT）在庫管理が可能になります。</p>

            <h2>労働力対自動化</h2>
            <p>ベトナムやインドの非熟練労働者は書類上は安いかもしれませんが、メキシコは競争力のある料金で熟練労働者の「スイートスポット」を提供しています。ティフアナの熟練組立作業員の負担済みコストは米国よりも大幅に低いですが、成熟した産業文化により、生産性は多くの場合、米国の同等の労働者と一致するか、それを上回ります。</p>

            <h2>関税回避（301条）</h2>
            <p>多くの産業にとって、中国製品に対する25％の通商法301条の関税は利益率を消し去ります。USMCAの下でメキシコで製造することで、適格製品の米国への<strong>無関税入国</strong>が可能になります。この単一の要因だけで、労働裁定取引に関係なく、ニアショアリングはオフショアリングよりも20〜25％安くなることがよくあります。</p>
          `
        }
      }
  },
  {
      title: "How Shelter Services Work in Baja California",
      excerpt: "Understanding the shelter model: the fastest, lowest-risk way to start manufacturing in Mexico.",
      date: "Dec 05, 2025",
      slug: "how-shelter-services-work-in-tijuana",
      imageUrl: "/images/consulting.jpg",
      tags: ["Shelter", "Legal"],
      content: `
        <p>For many US companies, the idea of incorporating a Mexican entity, dealing with Mexican labor law, and navigating tax codes (SAT) is a non-starter. Enter the <strong>Shelter Service</strong> model.</p>
        
        <h2>What is a Shelter?</h2>
        <p>A Shelter Service Provider (like the ones we partner with) acts as your legal "umbrella" in Mexico. They are the legal employer of record and the importer of record. You retain full control over your production process, quality, and supply chain.</p>

        <h2>Why Choose a Shelter?</h2>
        <ul>
          <li><strong>Speed to Market:</strong> You can be operational in as little as 90 days. Forming a standalone Mexican corporation can take 6-12 months.</li>
          <li><strong>Immediate Certification:</strong> Shelter companies already possess the coveted "IVA Certification" (VAT Certification), allowing you to import raw materials and machinery without paying 16% VAT upfront.</li>
          <li><strong>Reduced Liability:</strong> The Shelter assumes the labor and legal liability. You focus on making great products.</li>
        </ul>

        <h2>The Cost Structure</h2>
        <p>Shelters typically charge a management fee (often a pass-through plus a markup or a per-head fee). While slightly more expensive than a standalone operation in the long run, the speed and risk reduction make it the preferred entry mode for 80% of foreign manufacturers in Baja.</p>
      `,
      locales: {
        ja: {
          title: "バハ・カリフォルニアでのシェルターサービスの仕組み",
          excerpt: "シェルターモデルを理解する：メキシコで製造を開始するための最速かつ最もリスクの低い方法。",
          tags: ["シェルター", "法務"],
          content: `
            <p>多くの米国企業にとって、メキシコ法人の設立、メキシコの労働法の取り扱い、税法（SAT）への対応は、最初からつまづく原因となります。そこで<strong>シェルターサービス</strong>モデルの登場です。</p>
            
            <h2>シェルターとは？</h2>
            <p>シェルターサービスプロバイダー（私たちが提携しているような）は、メキシコにおけるあなたの法的な「傘」として機能します。彼らは法的な記録上の雇用主であり、記録上の輸入者です。あなたは生産プロセス、品質、サプライチェーンに対する完全な管理権を保持します。</p>

            <h2>なぜシェルターを選ぶのか？</h2>
            <ul>
              <li><strong>市場投入までのスピード：</strong>最短90日で操業を開始できます。独立したメキシコ法人を設立するには6〜12ヶ月かかる場合があります。</li>
              <li><strong>即時の認証：</strong>シェルター企業はすでに切望されている「IVA認証」（VAT認証）を保有しており、16％のVATを前払いすることなく原材料や機械を輸入できます。</li>
              <li><strong>責任の軽減：</strong>シェルターは労働および法的責任を負います。あなたは素晴らしい製品を作ることに集中できます。</li>
            </ul>

            <h2>コスト構造</h2>
            <p>シェルターは通常、管理手数料（多くの場合、パススルー費用に上乗せ、または一人当たりの手数料）を請求します。長期的には独立した事業よりもわずかに高価になりますが、スピードとリスク軽減により、バハに進出する外国メーカーの80％にとって好ましい参入モードとなっています。</p>
          `
        }
      }
  },
  {
      title: "Industrial Parks Map Overview 2026",
      excerpt: "A deep dive into the top industrial zones: Otay, El Florido, and Pacifico.",
      date: "Jan 10, 2026",
      slug: "industrial-parks-in-tijuana-map-and-overview",
      imageUrl: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&q=80&w=800",
      tags: ["Real Estate", "Maps"],
      content: `
        <p>Tijuana boasts over 70 industrial parks and more than 80 million square feet of industrial inventory. Choosing the right park is critical for your labor strategy and logistics.</p>

        <h2>Otay Mesa / Chilpancingo</h2>
        <p><strong>Profile:</strong> The logistics heart of the city. Located immediately adjacent to the Commercial Border Crossing.</p>
        <p><strong>Ideal For:</strong> High-volume logistics, medical devices, and companies needing rapid border access. Rents are typically higher here due to demand.</p>

        <h2>El Florido / El Refugio</h2>
        <p><strong>Profile:</strong> The growth corridor. Home to massive campuses for Samsung, Coca-Cola, and DJO Global. Known for having larger land reserves and a dense labor pool.</p>
        <p><strong>Ideal For:</strong> Large-scale manufacturing, electronics, and heavy industry.</p>

        <h2>Pacifico / Nordika</h2>
        <p><strong>Profile:</strong> Established, stable industrial zones with good access to the Rosarito labor pool.</p>
        <p><strong>Ideal For:</strong> Mid-sized manufacturing and assembly operations.</p>

        <h2>Valle Bonito</h2>
        <p><strong>Profile:</strong> A newer, modern corridor offering Class A buildings at slightly more competitive rates than Otay.</p>
        <p><strong>Ideal For:</strong> Companies needing modern infrastructure and willing to drive 15-20 mins further east.</p>
      `
  },
  {
      title: "The $6B Investment: Mexico's 2025 Nearshoring Boom",
      excerpt: "Why 2025 is the most critical year for industrial expansion and the upcoming 2026 USMCA review.",
      date: "Feb 11, 2026",
      slug: "mexico-2025-nearshoring-boom-usmca-review",
      imageUrl: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&q=80&w=800",
      tags: ["Market Report", "Investment"],
      content: `
        <p>Investment in industrial parks across Mexico is projected to reach US $6 billion in 2025. This surge is driven by global companies de-risking from Asia and the strategic necessity of the North American market.</p>
        
        <h2>The 2026 USMCA Review</h2>
        <p>The upcoming review of the USMCA (T-MEC) agreement is driving a frenzy of activity. Companies are racing to establish North American content to ensure they remain tariff-free. The definition of "Rules of Origin" is tightening, and physically manufacturing in Mexico is the safest bet.</p>

        <h2>Vacancy Rates & Rents</h2>
        <p>Developing industrial land in Tijuana is challenging due to topography. This supply constraint, coupled with record demand, has pushed vacancy rates to near-historic lows (<2%).</p>
        <p><strong>The Strategy:</strong> Companies cannot wait for a building to be finished. Pre-leasing (often 6-9 months out) is now the standard operating procedure for Class A space.</p>

        <h2>The Energy Question</h2>
        <p>Power availability remains the #1 constraint. Private investment in substations and cogeneration is booming to meet the needs of energy-intensive industries like data centers and heavy manufacturing.</p>
      `
  },
  {
      title: "The Ultimate Guide to Nearshore Shelter Services in Baja California",
      excerpt: "Learn how US manufacturers use the Mexican shelter model to rapidly bypass red tape, slash costs by 40%, and launch operations in Baja California within 90 days.",
      date: "Mar 02, 2026",
      slug: "ultimate-guide-nearshore-shelter-services-baja-california",
      imageUrl: "/images/consulting.jpg",
      tags: ["Nearshoring", "Shelter Services", "Baja California", "Supply Chain"],
      content: `
        <p>For US manufacturers looking to reduce operational costs without sacrificing quality or proximity to the North American market, Mexico has emerged as the premier destination. However, the complexities of establishing a foreign legal entity, navigating Mexican labor laws, and managing cross-border customs can be daunting.</p>
        <p>Enter the <strong>immex shelter model</strong>.</p>
        <p>In this guide, we break down exactly what a shelter service is, how it works in Baja California, and why it is the fastest, lowest-risk entry strategy for foreign manufacturers.</p>
        
        <h2>What is a Shelter Company? The Definition & Legal Framework</h2>
        <p>A shelter company is a Mexican legal entity that essentially "shelters" foreign manufacturers from the administrative and legal liabilities of operating in Mexico from day one. Under the IMMEX program, the shelter assumes the role of the legal employer and importer of record.</p>
        <p>You, the manufacturer, retain 100% control over:</p>
        <ul>
          <li>Production processes</li>
          <li>Quality control</li>
          <li>Intellectual property</li>
          <li>Machinery and raw materials (which you own)</li>
        </ul>
        <p>The shelter handles:</p>
        <ul>
          <li>Human Resources and Payroll</li>
          <li>Accounting and Tax Compliance</li>
          <li>Customs and Import/Export Administration</li>
          <li>Environmental/Health/Safety (EHS) Permits</li>
        </ul>

        <h2>Top 5 Benefits of Using a Shelter Service</h2>
        <ol>
          <li><strong>Speed to Market:</strong> Reduce setup time from 6-12 months down to 90 days.</li>
          <li><strong>Zero Legal Liability:</strong> The shelter absorbs employment and corporate risk in Mexico.</li>
          <li><strong>Cost Savings:</strong> Immediate 40-60% labor and overhead reduction without fronting the sunk costs of standalone HR/Customs departments.</li>
          <li><strong>Tax Advantages:</strong> Benefit from VAT exemption on temporary imports of materials and equipment under the shelter's IMMEX certification.</li>
          <li><strong>Focus on Production:</strong> Let the local experts navigate the bureaucracy while you focus purely on quality manufacturing.</li>
        </ol>

        <h2>Shelter vs. Standalone Entity vs. Contract Manufacturing</h2>
        <p>It's crucial to understand where the shelter model sits on the spectrum of nearshoring strategies:</p>
        <ul>
          <li><strong>Contract Manufacturing:</strong> You outsource the actual production of parts to a 3rd party. Zero capex. <a href="/en/locations/tijuana/contract-manufacturing">Learn about our Tijuana partnerships</a>.</li>
          <li><strong>Shelter Service:</strong> You lease a building and manage production, but the shelter handles all admin. High control, medium capex.</li>
          <li><strong>Standalone Entity:</strong> You incorporate a Mexican corporation (S.A. de C.V.) and handle everything natively. Maximum control, high capex, slow timeline.</li>
        </ul>

        <h2>Key Industrial Hubs for Shelter Operations in Baja California</h2>
        <p>Baja California offers specialized ecosystems depending on your industry.</p>
        <h3>Tijuana: The Medical Device and Aerospace Capital</h3>
        <p>With over 70 million square feet of industrial space and a legacy spanning 50+ years of twin-plant operations, Tijuana is ideal for complex assembly. Learn more about <a href="/en/locations/tijuana/industrial-real-estate">industrial real estate in Tijuana</a>.</p>
        <h3>Mexicali: Logistics and Heavy Manufacturing</h3>
        <p>Located directly on the California border with abundant water and power infrastructure, Mexicali serves heavy industrials, aerospace primes, and food processing. Explore <a href="/en/locations/mexicali/contract-manufacturing">manufacturing in Mexicali</a>.</p>

        <h2>A Step-by-Step Guide to Launching Your Operation</h2>
        <ol>
          <li><strong>Strategic Site Selection:</strong> Identifying the right industrial park relative to the labor pool.</li>
          <li><strong>Shelter Agreement:</strong> Negotiating transparent fee structures (headcount vs. percentage).</li>
          <li><strong>Talent Acquisition:</strong> Leveraging the shelter's recruiting engine to staff direct labor and engineers.</li>
          <li><strong>Machinery Import:</strong> Utilizing the shelter's IMMEX permit to import your equipment tax-free.</li>
          <li><strong>Start of Production (SOP):</strong> Achieving first-article inspection and full ramp-up.</li>
        </ol>

        <h2>Is a Shelter Service Right for You?</h2>
        <p>The shelter model is generally the most effective strategy for companies with 50 to 500 employees looking to establish operations in Mexico quickly and securely.</p>
        <p>Ready to explore your options? <a href="/en/about">Book a Discovery Call with Denisse Martinez</a> to analyze your specific operational needs and see if Baja California is the right fit.</p>
      `
  },
  {
      title: "How 2025 Tariffs Are Reshaping Baja California's Manufacturing Supply Chain",
      excerpt: "Explore the macroeconomic shifts driving supply chains out of Asia and into the USMCA safe harbor of Baja California following the implementation of aggressive 2025 tariffs.",
      date: "Mar 02, 2026",
      slug: "2025-tariffs-baja-california-supply-chain",
      imageUrl: "/images/warehouse.jpg",
      tags: ["Economics", "Tariffs", "Supply Chain", "USMCA"],
      content: `
        <p>The aggressive tariff structures enacted in late 2024 and 2025 have fundamentally altered the calculus of global manufacturing. As Section 301 tariffs escalate on Asian imports—particularly targeting critical materials, electronics, and automotive components—US manufacturers are facing unprecedented margin pressure.</p>
        <p>The result? A tectonic shift toward North American supply chain integration, with Baja California serving as the undisputed epicenter for nearshoring operations under the protection of the USMCA.</p>

        <h2>The Financial Impact of the 2025 Tariff Hikes</h2>
        <p>The recent rounds of tariffs have moved beyond simple consumer goods, heavily targeting intermediate components and raw materials essential to US assembly lines. Companies reliant on trans-Pacific logistics are now battling a dual threat:</p>
        <ol>
          <li><strong>Direct Tariff Costs:</strong> Adding 25% to 100% onto the landed cost of goods depending on the HS code.</li>
          <li><strong>Geopolitical Risk:</strong> Increasing uncertainty regarding sudden trade barriers and logistics bottlenecks.</li>
        </ol>
        <p>For highly engineered sectors—like aerospace and medical devices—absorbing these costs is no longer mathematically viable. Total Landed Cost (TLC) models that previously favored Asian production even with moderate logistics costs have completely flipped in the new tariff era.</p>

        <h2>Why Baja California provides a "USMCA Safe Harbor"</h2>
        <p>Baja California, and specifically the Cali-Baja mega-region encompassing San Diego and Tijuana, offers a unique geostrategic advantage.</p>
        <p>Under the United States-Mexico-Canada Agreement (USMCA), goods manufactured or substantially transformed in Mexico benefit from duty-free entry into the US and Canada, provided they meet Regional Value Content (RVC) requirements.</p>
        <p>This means companies can import raw tier-2 inputs into Mexico (often under IMMEX/shelter programs avoiding Mexican duties), perform the labor-heavy value-add assembly in Baja California using highly skilled workers at a fraction of US labor rates, and export the finished product into the US duty-free.</p>

        <h2>Industrial Real Estate Squeeze vs. Contract Manufacturing Solutions</h2>
        <p>As the nearshoring wave accelerates, the demand for <a href="/en/services/industrial-real-estate-baja">Industrial Real Estate in Baja</a> has heavily compressed vacancy rates.</p>
        <p>For companies unable or unwilling to commit to long-term 5-year leases or the capital expenditure of a greenfield facility, <a href="/en/services/contract-manufacturing-tijuana">Contract Manufacturing in Tijuana</a> has emerged as the most agile solution. Partnering with a vetted, ISO-certified contract manufacturer allows US firms to bypass real estate constraints completely, achieving tariff immunity and cost reductions within months rather than years.</p>

        <h2>The Path Forward: Securing Your Supply Chain</h2>
        <p>Waiting out the tariff storm is no longer a viable corporate strategy. The fragmentation of the global supply chain is structural. The most resilient organizations are actively localizing their supply chains to the North American block.</p>
        <p><strong>Ready to analyze your Total Landed Cost?</strong><br>The first step is a data-driven comparison of your current tariff exposure versus nearshore production costs.</p>
        <p><a href="https://calendly.com/denisse-martinez-nearshore/30min" target="_blank" rel="noopener noreferrer">Book a Strategic Discovery Call with Denisse Martinez</a> to evaluate the feasibility of a Baja California footprint for your specific product lines.</p>
      `
  }
];

export function getAllPosts(): BlogPost[] {
  return BLOG_POSTS;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(post => post.slug === slug);
}
