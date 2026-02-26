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
        'x-default': 'https://nearshorenavigator.com/en/resources/questionnaire',
      }
    }
  };
}

export default function QuestionnairePage() {
  return <QuestionnaireClient />;
}
