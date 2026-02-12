import { Metadata } from 'next';
import QuestionnaireClient from './QuestionnaireClient';

export const metadata: Metadata = {
  title: '3PL Operation Questionnaire | Nearshore Navigator',
  description: 'Confidential assessment form for manufacturing and logistics operations in Baja California.',
};

export default function QuestionnairePage() {
  return <QuestionnaireClient />;
}
