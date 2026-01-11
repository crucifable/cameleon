import { Header } from "@/components/header-with-search"
import { Particles } from "@/components/ui/particles"


export default function TermsOfService() {
    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            <Header />
            {/* Full-screen particle background */}
            <div className="absolute inset-0 z-0">
                <Particles quantity={300} className="h-full w-full" color="#000000" />
            </div>

            <div className="relative z-10 container mx-auto px-4 py-16 max-w-4xl">
                <div className="bg-background/50 backdrop-blur-md p-8 rounded-xl border border-white/10 shadow-xl">
                    <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
                    <p className="text-muted-foreground mb-8">Last Updated: January 10, 2026</p>

                    <div className="space-y-6 text-foreground/90">
                        <section>
                            <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
                            <p>
                                By accessing and using Spunix Cameleon ("the Service"), you accept and agree to be bound by the terms
                                and provision of this agreement. If you do not agree to these Terms of Service, please do not use the Service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">2. Description of Service</h2>
                            <p>
                                Spunix Cameleon provides a collection of online tools and utilities accessible through our website.
                                The Service allows users to access various tools, request new features, and interact with our platform
                                through Discord authentication.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">3. User Accounts</h2>
                            <p>
                                To access certain features of the Service, you may be required to authenticate using your Discord account.
                                You are responsible for maintaining the confidentiality of your account credentials and for all activities
                                that occur under your account.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">4. User Conduct</h2>
                            <p>You agree not to:</p>
                            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                                <li>Use the Service for any unlawful purpose or in violation of any applicable laws</li>
                                <li>Attempt to gain unauthorized access to any portion of the Service</li>
                                <li>Interfere with or disrupt the Service or servers connected to the Service</li>
                                <li>Submit false, misleading, or malicious content through our request forms</li>
                                <li>Use automated systems to access the Service without our express written permission</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">5. Intellectual Property</h2>
                            <p>
                                The Service and its original content, features, and functionality are owned by Spunix Cameleon and are
                                protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">6. Disclaimer of Warranties</h2>
                            <p>
                                The Service is provided "AS IS" and "AS AVAILABLE" without warranties of any kind, either express or implied.
                                We do not warrant that the Service will be uninterrupted, secure, or error-free.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">7. Limitation of Liability</h2>
                            <p>
                                In no event shall Spunix Cameleon be liable for any indirect, incidental, special, consequential, or
                                punitive damages resulting from your use of or inability to use the Service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">8. Changes to Terms</h2>
                            <p>
                                We reserve the right to modify or replace these Terms at any time. We will provide notice of any changes
                                by posting the new Terms on this page and updating the "Last Updated" date.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">9. Contact Information</h2>
                            <p>
                                If you have any questions about these Terms of Service, please contact us through our Discord server
                                or via the contact information provided on our website.
                            </p>
                        </section>
                    </div>
                </div>
            </div>

        </div>
    )
}
