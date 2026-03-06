import { Metadata } from 'next';
import QuestionnaireClient from './QuestionnaireClient';

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  return {
    title: '3PL Operation Questionnaire | Nearshore Navigator',
    description: 'Confidential assessment form for manufacturing and logistics operations in Baja California.',
    alternates: {
      canonical: `https://nearshorenavigator.com/${lang}/resources/questionnaire`,
      languages: {
        'en': 'https://nearshorenavigator.com/en/resources/questionnaire',
        'es': 'https://nearshorenavigator.com/es/resources/questionnaire',
        'fr': 'https://nearshorenavigator.com/fr/resources/questionnaire',
        'de': 'https://nearshorenavigator.com/de/resources/questionnaire',
        'ja': 'https://nearshorenavigator.com/ja/resources/questionnaire',
        'zh': 'https://nearshorenavigator.com/zh/resources/questionnaire',
        'ko': 'https://nearshorenavigator.com/ko/resources/questionnaire',
        'it': 'https://nearshorenavigator.com/it/resources/questionnaire',
        'pt': 'https://nearshorenavigator.com/pt/resources/questionnaire',
        'ru': 'https://nearshorenavigator.com/ru/resources/questionnaire',
        'x-default': 'https://nearshorenavigator.com/en/resources/questionnaire',
      }
    }
  };
}

export default function QuestionnairePage() {
  return <QuestionnaireClient />;
}
