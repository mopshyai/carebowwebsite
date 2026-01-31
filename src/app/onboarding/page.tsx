import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function OnboardingPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const userType = session.user.type;

  // Redirect based on user type
  if (userType === "FAMILY") {
    redirect("/family/onboarding");
  } else if (userType === "CAREGIVER") {
    redirect("/caregiver/onboarding");
  } else {
    redirect("/admin/dashboard");
  }
}
