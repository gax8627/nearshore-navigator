import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  // This layout wrapper might be redundant if metadata is handled in page.tsx, 
  // keeping it minimal or removing if unused. 
  // Assuming it's a layout wrapper for the blog post content.
  return {};
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12">
      {children}
    </div>
  );
}
