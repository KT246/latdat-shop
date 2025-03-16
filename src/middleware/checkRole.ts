import { redirect } from "next/navigation";
import useAuthStore from "@/stores/authStores";
export function protectRole() {
  const { user } = useAuthStore();

  const path = user?.path;

  if (path === 1) {
    redirect("/admin");
  }
  if (path === 2) {
    redirect("/cashier");
  }
}
