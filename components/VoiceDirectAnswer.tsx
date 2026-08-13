import React from 'react';

interface VoiceDirectAnswerProps {
  question?: string;
  answer: string;
  sourceLabel?: string;
  sourceUrl?: string;
  className?: string;
}

export function VoiceDirectAnswer({ question, answer, sourceLabel, sourceUrl, className = '' }: VoiceDirectAnswerProps) {
  return (
    <div className={`my-8 p-6 bg-slate-900 text-white rounded-2xl border-l-4 border-primary-500 shadow-xl speakable-direct-answer direct-answer-capsule ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary-500/20 text-primary-300 border border-primary-500/30 uppercase tracking-wider">
          Direct Executive Answer
        </span>
        <span className="text-xs text-slate-400">| Voice Assistant & AI Optimized</span>
      </div>
      {question && <h3 className="text-lg font-bold text-white mb-2">{question}</h3>}
      <p className="text-slate-200 text-base leading-relaxed font-normal speakable-summary" id="faq-direct-response">
        {answer}
      </p>
      {sourceLabel && sourceUrl && (
        <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400">
          Source: <a href={sourceUrl} className="text-primary-400 underline hover:text-primary-300">{sourceLabel}</a>
        </div>
      )}
    </div>
  );
}
