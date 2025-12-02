import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CancellationRefunds() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Cancellation & Refunds Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">Cancellation Policy</h2>
            <p>You can cancel your course enrollment within 7 days of purchase for a full refund, provided you have not completed more than 20% of the course content.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">Refund Policy</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Full refund within 7 days if less than 20% course completion</li>
              <li>No refund after 30 days from purchase date</li>
              <li>Refunds processed within 5-7 business days</li>
              <li>Original payment method will be credited</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">How to Request Refund</h2>
            <p>Contact our support team at support@skilldev.com with your order details and reason for refund.</p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}