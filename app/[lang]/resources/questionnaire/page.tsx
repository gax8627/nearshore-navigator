import { getAlternateLanguages } from '@/app/constants/seo-config';
import { Metadata } from 'next';
import QuestionnaireClient from './QuestionnaireClient';
import { getDictionary } from "@/app/i18n/get-dictionary";

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  const t = await getDictionary(lang);
  
  return {
    title: `${t.questionnaire.title} | Nearshore Navigator`,
    description: t.questionnaire.subtitle,
    alternates: {
      canonical: `https://nearshorenavigator.com/${lang}/resources/questionnaire`,
      languages: getAlternateLanguages('/resources/questionnaire')
    }
  };
}

export default async function QuestionnairePage(props: { params: Promise<{ lang: string }> }) {
  const { lang } = await props.params;
  return <QuestionnaireClient />;
}
