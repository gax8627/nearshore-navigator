import { LeadForm } from "@/components/LeadForm";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata = {
    title: "Contact Us | Nearshore Navigator",
    description: "Get in touch with our team for a consultation on manufacturing in Tijuana.",
};

export default function ContactPage() {
    return (
        <div className="bg-gray-50 dark:bg-gray-900/50 min-h-screen py-20 transition-colors">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Contact Us</h1>
                        <p className="text-gray-600 dark:text-gray-300 mb-12 text-lg">
                            Ready to explore nearshoring opportunities? Fill out the form or reach out directly. We typically respond within 24 hours.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 flex-shrink-0">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white">Email</h3>
                                    <a href="mailto:info@nearshorenavigator.com" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">info@nearshorenavigator.com</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 flex-shrink-0">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white">Phone</h3>
                                    <p className="text-gray-600 dark:text-gray-300">+1 (619) 555-0123</p>
                                    <p className="text-xs text-gray-400 dark:text-gray-500">Mon-Fri, 9am - 5pm PST</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 flex-shrink-0">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white">Offices</h3>
                                    <p className="text-gray-600 dark:text-gray-300">San Diego, CA (Headquarters)</p>
                                    <p className="text-gray-600 dark:text-gray-300">Tijuana, BC (Operations)</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <LeadForm title="Send us a Message" subtitle=" " className="shadow-2xl" />
                    </div>
                </div>
            </div>
        </div>
    );
}
