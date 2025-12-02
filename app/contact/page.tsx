import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function Contact() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="How can we help?" />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Your message..." rows={5} />
              </div>
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Get in Touch</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Email Support</h3>
              <p className="text-muted-foreground">support@skilldev.com</p>
              <p className="text-sm text-muted-foreground">We typically respond within 24 hours</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Business Inquiries</h3>
              <p className="text-muted-foreground">business@skilldev.com</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Technical Support</h3>
              <p className="text-muted-foreground">tech@skilldev.com</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Office Hours</h3>
              <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM IST</p>
              <p className="text-muted-foreground">Saturday: 10:00 AM - 4:00 PM IST</p>
              <p className="text-muted-foreground">Sunday: Closed</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Address</h3>
              <p className="text-muted-foreground">
                SkillDev Learning Platform<br/>
                123 Education Street<br/>
                Tech City, India - 110001
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}