import ClientNavbar from "./ClientNavbar";
import { auth } from "@/lib/auth";

export default async function Navbar() {
  const session = await auth()

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full">
      <ClientNavbar session={session} />
    </div>
  );
}
