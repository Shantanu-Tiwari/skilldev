import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Shipping() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Shipping & Delivery Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">Digital Products</h2>
            <p>SkillDev offers digital courses and educational content. All products are delivered electronically and instantly upon successful payment.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">Delivery Method</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Instant access upon payment confirmation</li>
              <li>Course materials available in your dashboard</li>
              <li>Email confirmation with access details</li>
              <li>No physical shipping required</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">Access Issues</h2>
            <p>If you experience any issues accessing your purchased content, please contact our support team immediately at support@skilldev.com</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">Certificate Delivery</h2>
            <p>Course completion certificates are generated digitally and available for download from your profile upon course completion.</p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}