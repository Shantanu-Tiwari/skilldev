import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Privacy() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Personal information (name, email, phone)</li>
              <li>Payment information (processed securely)</li>
              <li>Usage data and learning progress</li>
              <li>Device and browser information</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">How We Use Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide and improve our services</li>
              <li>Process payments and transactions</li>
              <li>Send course updates and notifications</li>
              <li>Analyze platform usage and performance</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">Data Security</h2>
            <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">Third-Party Services</h2>
            <p>We use trusted third-party services for payments (Razorpay), analytics, and email delivery. These services have their own privacy policies.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">Your Rights</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate information</li>
              <li>Delete your account and data</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
            <p>For privacy-related questions, contact us at privacy@skilldev.com</p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}