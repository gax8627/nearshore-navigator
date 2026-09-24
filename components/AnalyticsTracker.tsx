"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Client-Side Bot & Automation Detection
    const isHeadless = Boolean(
      (window.navigator as any).webdriver ||
      /HeadlessChrome|Bytespider|PetalBot|crawler|spider|bot|preview/i.test(navigator.userAgent) ||
      (window.outerWidth === 0 && window.outerHeight === 0)
    );

    // 2. Microsoft Teams & Excel Dark Social Tracking
    const referrer = document.referrer.toLowerCase();
    const isMSTeams = referrer.includes("teams.public.onecdn.static.microsoft") || referrer.includes("teams.microsoft.com");
    const isMSExcel = referrer.includes("usc-excel.officeapps.live.com") || referrer.includes("officeapps.live.com") || referrer.includes("excel.live.com");

    // 3. Persist UTM Parameters & Dark Social Referrers to sessionStorage
    try {
      const currentSource = searchParams?.get("utm_source");
      const currentMedium = searchParams?.get("utm_medium");
      const currentCampaign = searchParams?.get("utm_campaign");
      const currentContent = searchParams?.get("utm_content");
      const currentTerm = searchParams?.get("utm_term");

      if (currentSource || currentMedium || currentCampaign) {
        sessionStorage.setItem("nn_utm_source", currentSource || "");
        sessionStorage.setItem("nn_utm_medium", currentMedium || "");
        sessionStorage.setItem("nn_utm_campaign", currentCampaign || "");
        sessionStorage.setItem("nn_utm_content", currentContent || "");
        sessionStorage.setItem("nn_utm_term", currentTerm || "");
      } else if (isMSTeams && !sessionStorage.getItem("nn_utm_source")) {
        sessionStorage.setItem("nn_utm_source", "microsoft_teams");
        sessionStorage.setItem("nn_utm_medium", "internal_share");
        sessionStorage.setItem("nn_utm_campaign", "enterprise_teams_referral");
        sessionStorage.setItem("nn_utm_content", "teams_link_unfurl");
      } else if (isMSExcel && !sessionStorage.getItem("nn_utm_source")) {
        sessionStorage.setItem("nn_utm_source", "microsoft_excel");
        sessionStorage.setItem("nn_utm_medium", "internal_share");
        sessionStorage.setItem("nn_utm_campaign", "enterprise_financial_model");
        sessionStorage.setItem("nn_utm_content", "excel_hyperlink");
      }
    } catch {
      // Ignore private browsing storage restrictions
    }

    // 4. Send Custom Telemetry to GA4
    if ((window as any).gtag) {
      if (isHeadless) {
        (window as any).gtag("set", "user_properties", {
          traffic_type: "datacenter_bot",
          automation_detected: "true",
        });
      }

      if (isMSTeams) {
        (window as any).gtag("event", "enterprise_dark_social_visit", {
          source_platform: "microsoft_teams",
          event_category: "buying_committee_sharing",
          page_location: window.location.href,
        });
      } else if (isMSExcel) {
        (window as any).gtag("event", "enterprise_dark_social_visit", {
          source_platform: "microsoft_excel",
          event_category: "financial_model_evaluation",
          page_location: window.location.href,
        });
      }

      // Track AI Search Engine Referrals (Copilot, ChatGPT, Gemini, Perplexity)
      if (referrer.includes("copilot.microsoft.com")) {
        (window as any).gtag("event", "ai_search_referral", {
          ai_engine: "microsoft_copilot",
          page_location: window.location.href,
        });
      } else if (referrer.includes("chatgpt.com") || referrer.includes("chat.openai.com")) {
        (window as any).gtag("event", "ai_search_referral", {
          ai_engine: "chatgpt_search",
          page_location: window.location.href,
        });
      } else if (referrer.includes("gemini.google.com")) {
        (window as any).gtag("event", "ai_search_referral", {
          ai_engine: "google_gemini",
          page_location: window.location.href,
        });
      } else if (referrer.includes("perplexity.ai")) {
        (window as any).gtag("event", "ai_search_referral", {
          ai_engine: "perplexity",
          page_location: window.location.href,
        });
      }
    }
  }, [pathname, searchParams]);

  return null;
}
