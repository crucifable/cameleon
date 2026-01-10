import { Header } from "@/components/header-with-search"
import { Particles } from "@/components/ui/particles"


export default function PrivacyPolicy() {
    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            <Header />
            {/* Full-screen particle background */}
            <div className="absolute inset-0 z-0">
                <Particles quantity={300} className="h-full w-full" color="#000000" />
            </div>

            <div className="relative z-10 container mx-auto px-4 py-16 max-w-4xl">
                <div className="bg-background/50 backdrop-blur-md p-8 rounded-xl border border-white/10 shadow-xl">
                    <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
                    <p className="text-muted-foreground mb-8">Last Updated: January 10, 2026</p>

                    <div className="space-y-6 text-foreground/90">
                        <section>
                            <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
                            <p>
                                Crucible Cameleon ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy
                                explains how we collect, use, disclose, and safeguard your information when you use our Service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">2. Information We Collect</h2>

                            <h3 className="text-xl font-semibold mb-2 mt-4">2.1 Information from Discord</h3>
                            <p>When you authenticate with Discord, we collect:</p>
                            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                                <li>Your Discord username and user ID</li>
                                <li>Your Discord email address</li>
                                <li>Your Discord profile picture</li>
                                <li>Your Discord server membership information (to verify access)</li>
                            </ul>

                            <h3 className="text-xl font-semibold mb-2 mt-4">2.2 Usage Information</h3>
                            <p>We automatically collect certain information when you use our Service, including:</p>
                            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                                <li>Browser type and version</li>
                                <li>Operating system</li>
                                <li>IP address</li>
                                <li>Pages visited and time spent on pages</li>
                                <li>Tool usage statistics</li>
                            </ul>

                            <h3 className="text-xl font-semibold mb-2 mt-4">2.3 User-Submitted Information</h3>
                            <p>Information you voluntarily provide, such as:</p>
                            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                                <li>Tool requests and feature suggestions</li>
                                <li>Feedback and communications</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">3. How We Use Your Information</h2>
                            <p>We use the collected information to:</p>
                            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                                <li>Provide, operate, and maintain our Service</li>
                                <li>Authenticate users and verify server membership</li>
                                <li>Process and respond to tool requests</li>
                                <li>Improve and personalize user experience</li>
                                <li>Communicate with you about updates and features</li>
                                <li>Monitor and analyze usage patterns</li>
                                <li>Detect and prevent fraud or abuse</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">4. Information Sharing and Disclosure</h2>
                            <p>
                                We do not sell, trade, or rent your personal information to third parties. We may share your information
                                in the following circumstances:
                            </p>
                            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                                <li><strong>Discord:</strong> We use Discord's OAuth2 for authentication</li>
                                <li><strong>Service Providers:</strong> We may share data with trusted service providers who assist in operating our Service</li>
                                <li><strong>Legal Requirements:</strong> We may disclose information if required by law or to protect our rights</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">5. Data Security</h2>
                            <p>
                                We implement appropriate technical and organizational security measures to protect your information.
                                However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">6. Data Retention</h2>
                            <p>
                                We retain your personal information only for as long as necessary to fulfill the purposes outlined in this
                                Privacy Policy, unless a longer retention period is required by law.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">7. Your Rights</h2>
                            <p>You have the right to:</p>
                            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                                <li>Access the personal information we hold about you</li>
                                <li>Request correction of inaccurate information</li>
                                <li>Request deletion of your information</li>
                                <li>Withdraw consent for data processing</li>
                                <li>Object to processing of your information</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">8. Cookies and Tracking</h2>
                            <p>
                                We use cookies and similar tracking technologies to track activity on our Service and store certain information.
                                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">9. Third-Party Links</h2>
                            <p>
                                Our Service may contain links to third-party websites. We are not responsible for the privacy practices
                                of these external sites and encourage you to review their privacy policies.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">10. Children's Privacy</h2>
                            <p>
                                Our Service is not intended for users under the age of 13. We do not knowingly collect personal information
                                from children under 13. If you become aware that a child has provided us with personal information, please
                                contact us.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">11. Changes to This Privacy Policy</h2>
                            <p>
                                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                                Privacy Policy on this page and updating the "Last Updated" date.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">12. Contact Us</h2>
                            <p>
                                If you have any questions about this Privacy Policy, please contact us through our Discord server or
                                via the contact information provided on our website.
                            </p>
                        </section>
                    </div>
                </div>
            </div>

        </div>
    )
}
