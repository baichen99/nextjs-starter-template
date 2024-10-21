import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import db from "@/db";

export default async function Home() {
  const users = await db.query.users.findMany();
  return (
    <Card className="mt-4 w-full">
      <CardHeader>
        <CardTitle>当前注册用户</CardTitle>
      </CardHeader>
      <CardContent>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <p>{user.email}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
