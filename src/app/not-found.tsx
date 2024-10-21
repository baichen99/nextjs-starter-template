import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function NotFound() {
  return (
    <Card className="max-w mx-2 mt-4 flex flex-col items-center">
      <CardHeader className="text-4xl">404</CardHeader>
      <CardContent>
        <p>页面不存在</p>
      </CardContent>
    </Card>
  );
}
