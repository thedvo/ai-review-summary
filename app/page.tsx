import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
 
export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Product Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              A modern Next.js app for displaying customer reviews
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}