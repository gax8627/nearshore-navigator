import Link from "next/link";

export const metadata = {
    title: "Terms of Service | Nearshore Navigator",
    description: "Terms of Service for Nearshore Navigator - Guidelines for using our services.",
};

export default function TermsPage() {
    return (
        <div className="container mx-auto px-4 py-20 max-w-4xl">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Terms of Service</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">Last updated: January 2026</p>

            <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        By accessing and using the Nearshore Navigator website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Services Description</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        Nearshore Navigator provides consulting and advisory services related to industrial nearshoring, real estate, shelter services, and manufacturing in Tijuana, Mexico. We act as intermediaries connecting clients with service providers and do not assume liability for third-party services.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. User Responsibilities</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        You agree to provide accurate information when using our services and to use our website only for lawful purposes. You are responsible for maintaining the confidentiality of any account credentials.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Intellectual Property</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        All content on this website, including text, graphics, logos, and images, is the property of Nearshore Navigator and is protected by copyright and trademark laws.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Limitation of Liability</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        Nearshore Navigator shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services or reliance on information provided on this website.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Governing Law</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        These Terms of Service shall be governed by and construed in accordance with the laws of the State of California, United States.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Contact</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        For questions about these Terms of Service, please contact us at{" "}
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
