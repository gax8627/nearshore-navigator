export type LeadScore = {
  score: number; // 0-100
  category: 'High' | 'Medium' | 'Low';
  tags: string[];
  reason: string;
};

export function scoreLead(data: {
  name: string;
  company: string;
  email: string;
  message: string;
}): LeadScore {
  let score = 20; // Base score
  const tags: string[] = [];
  const reasons: string[] = [];

  const messageLower = data.message.toLowerCase();
  const companyLower = data.company.toLowerCase();

  // Industry Keywords (High Value)
  const highValueKeywords = [
    'medical', 'pharma', 'device', 'aerospace', 'electronics', 'semiconductor', 
    'automotive', 'battery', 'ev', 'energy'
  ];

  highValueKeywords.forEach(keyword => {
    if (messageLower.includes(keyword) || companyLower.includes(keyword)) {
      score += 20;
      tags.push(keyword.charAt(0).toUpperCase() + keyword.slice(1));
      reasons.push(`Matched high-value industry keyword: ${keyword}`);
    }
  });

  // Intent Keywords
  if (messageLower.includes('section 321') || messageLower.includes('duty-free')) {
    score += 15;
    tags.push('Section 321');
    reasons.push('Specific interest in Section 321 distribution');
  }

  if (messageLower.includes('shelter') || messageLower.includes('immex')) {
    score += 15;
    tags.push('Shelter Services');
    reasons.push('Interest in low-risk soft-landing (Shelter)');
  }

  if (messageLower.includes('build-to-suit') || messageLower.includes('square feet') || messageLower.includes('sq ft')) {
    score += 10;
    tags.push('Real Estate');
    reasons.push('Specific property requirements mentioned');
  }

  // Business Email Check
  const commonFreeEmails = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'aol.com'];
  const emailDomain = data.email.split('@')[1]?.toLowerCase();
  if (emailDomain && !commonFreeEmails.includes(emailDomain)) {
    score += 15;
    tags.push('Business Email');
  } else {
    score -= 10;
  }

  // Cap score at 100
  score = Math.min(Math.max(score, 0), 100);

  let category: 'High' | 'Medium' | 'Low' = 'Low';
  if (score >= 70) category = 'High';
  else if (score >= 40) category = 'Medium';

  return {
    score,
    category,
    tags: Array.from(new Set(tags)),
    reason: reasons.length > 0 ? reasons.join('; ') : 'General inquiry'
  };
}
