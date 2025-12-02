import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsConditions() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Terms & Conditions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">Acceptance of Terms</h2>
            <p>By accessing and using SkillDev, you accept and agree to be bound by the terms and provision of this agreement.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">Use License</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Personal, non-commercial use only</li>
              <li>No redistribution of course materials</li>
              <li>Account sharing is prohibited</li>
              <li>Respect intellectual property rights</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">User Conduct</h2>
            <p>Users must not engage in any activity that disrupts or interferes with the platform or other users' experience.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">Limitation of Liability</h2>
            <p>SkillDev shall not be liable for any indirect, incidental, special, consequential, or punitive damages.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">Contact Information</h2>
            <p>For questions about these Terms, contact us at legal@skilldev.com</p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}