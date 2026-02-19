import HomeClient from "./HomeClient";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nearshore Navigator | Industrial Manufacturing In Baja California',
  description: 'Strategic advisory for US companies expanding to Mexico. We connect you with verified contract manufacturers and industrial real estate in Tijuana and Baja California.',
};

export default function Home() {
  return (
    <>
      {/*
       * SSR-only H1 for Googlebot – visually hidden but present in initial HTML.
       * HomeClient renders the animated visual heading; this ensures crawlers
       * always see the primary keyword-bearing heading without client-side JS.
       */}
      <h1 className="sr-only">
        Nearshore Navigator – Your Trusted Partner for Manufacturing in Baja California, Mexico
      </h1>
      <HomeClient />
    </>
  );
}
