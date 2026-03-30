import { redirect } from 'next/navigation';
import { Metadata } from 'next';

// Explicit canonical tells Google the preferred URL is /en, not the root domain.
// This resolves the GSC "Duplicate, Google chose different canonical" warning for
// the homepage, caused by the root → /en redirect being interpreted by Google as
// nearshorenavigator.com being the canonical rather than /en.
export const metadata: Metadata = {
  alternates: {
    canonical: 'https://nearshorenavigator.com/en',
    languages: {
      'x-default': 'https://nearshorenavigator.com/en',
    }
  },
};

export default function RootPage() {
  redirect('/en');
}
