"use client";

import { useState, useEffect } from "react";
import { CheckCircle, AlertTriangle, XCircle, Search, Eye } from "lucide-react";

interface SeoSidebarProps {
  title: string;
  excerpt: string;
  content: string;
  slug: string;
}

export function SeoSidebar({ title, excerpt, content, slug }: SeoSidebarProps) {
  const [score, setScore] = useState(0);
  const [checks, setChecks] = useState<any[]>([]);

  useEffect(() => {
    analyze();
  }, [title, excerpt, content, slug]);

  const analyze = () => {
    const newChecks = [];
    let passed = 0;
    
    // 1. Title Length
    if (title.length > 30 && title.length < 60) {
        newChecks.push({ label: "Title length optimal (30-60 chars)", status: "pass" });
        passed++;
    } else {
        newChecks.push({ label: `Title is ${title.length} chars (aim for 30-60)`, status: "warn" });
    }

    // 2. Keyword in Slug
    if (slug.length > 5) {
        newChecks.push({ label: "Slug is present", status: "pass" });
        passed++;
    } else {
        newChecks.push({ label: "Slug is empty or too short", status: "fail" });
    }

    // 3. Content Length
    const wordCount = content.split(" ").length;
    if (wordCount > 300) {
        newChecks.push({ label: `Content length good (${wordCount} words)`, status: "pass" });
        passed++;
    } else {
        newChecks.push({ label: `Content too short (${wordCount}/300 words)`, status: "fail" });
    }

    // 4. Excerpt
    if (excerpt.length > 50 && excerpt.length < 160) {
        newChecks.push({ label: "Meta description optimal", status: "pass" });
        passed++;
    } else {
        newChecks.push({ label: "Meta description missing or poor length", status: "warn" });
    }

    // Calculate Score (Simple)
    setScore(Math.round((passed / 4) * 100));
    setChecks(newChecks);
  };

  return (
    <div className="glass-card p-6 w-80 sticky top-24 h-fit border-l border-white/5">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Search className="w-4 h-4 text-emerald-400" />
            SEO Score
        </h3>
        <div className={`text-xl font-black ${score > 80 ? 'text-emerald-400' : score > 50 ? 'text-yellow-400' : 'text-red-400'}`}>
            {score}/100
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800 h-2 rounded-full mb-6 overflow-hidden">
        <div 
            className={`h-full rounded-full transition-all duration-500 ${score > 80 ? 'bg-emerald-500' : score > 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
            style={{ width: `${score}%` }}
        />
      </div>

      {/* Checklist */}
      <div className="space-y-3 mb-8">
        {checks.map((check, i) => (
            <div key={i} className="flex items-start gap-3 text-xs">
                {check.status === 'pass' && <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />}
                {check.status === 'warn' && <AlertTriangle className="w-4 h-4 text-yellow-500 shrink-0" />}
                {check.status === 'fail' && <XCircle className="w-4 h-4 text-red-500 shrink-0" />}
                <span className="text-slate-300">{check.label}</span>
            </div>
        ))}
      </div>

      {/* SERP Preview */}
      <div className="border border-white/10 rounded-lg p-4 bg-white/5">
        <h4 className="text-xs font-semibold text-slate-400 mb-3 flex items-center gap-2">
            <Eye className="w-3 h-3" /> Google Preview
        </h4>
        <div className="font-sans">
            <div className="text-[10px] text-slate-400 mb-1 flex items-center gap-1">
                <div className="w-4 h-4 rounded-full bg-slate-700"></div>
                nearshorenavigator.com › insights
            </div>
            <div className="text-[#8ab4f8] text-sm font-medium hover:underline truncate cursor-pointer">
                {title || "Your Post Title Here"}
            </div>
            <div className="text-slate-300 text-xs mt-1 line-clamp-2">
                {excerpt || "This is how your post description will appear in Google search results. Keep it punchy and relevant."}
            </div>
        </div>
      </div>
    </div>
  );
}
