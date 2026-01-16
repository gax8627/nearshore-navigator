import Link from "next/link";

export const metadata = {
    title: "Privacy Policy | Nearshore Navigator",
    description: "Privacy Policy for Nearshore Navigator - How we collect, use, and protect your information.",
};

export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-20 max-w-4xl">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Privacy Policy</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">Last updated: January 2026</p>

            <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Information We Collect</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        We collect information you provide directly to us, such as when you fill out a contact form, request a consultation, or subscribe to our newsletter. This may include your name, email address, phone number, company name, and any other information you choose to provide.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. How We Use Your Information</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        We use the information we collect to provide, maintain, and improve our services, to communicate with you about our services, and to send you marketing communications (with your consent).
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Information Sharing</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as necessary to provide our services or as required by law.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Data Security</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Cookies</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        We use cookies and similar technologies to enhance your experience on our website, analyze site usage, and assist in our marketing efforts.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Contact Us</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        If you have any questions about this Privacy Policy, please contact us at{" "}
                        <a href="mailto:info@nearshorenavigator.com" className="text-primary-600 dark:text-primary-400 hover:underline">
                            info@nearshorenavigator.com
                        </a>
                    </p>
                </section>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                <Link href="/" className="text-primary-600 dark:text-primary-400 hover:underline">
                    ← Back to Home
                </Link>
            </div>
        </div>
    );
}
