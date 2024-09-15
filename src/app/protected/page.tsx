// app/protected/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

  return (
    <div>
      <h1>Protected Page</h1>
      <p>Welcome, {session.user?.email}!</p>
    </div>
  );
}
