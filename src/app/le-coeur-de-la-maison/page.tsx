import { redirect } from "next/navigation";

// Ancienne route conservée : redirige vers la nouvelle URL « Legacy ».
export default function LeCoeurDeLaMaisonRedirect() {
  redirect("/legacy");
}
