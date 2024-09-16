// app/protected/page.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Session } from "next-auth";

const session: Session | null = await getServerSession(authOptions);

export default async function ProtectedPage() {
  
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
