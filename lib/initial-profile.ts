import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

export const initiaProfile = async () => {
  const user = await currentUser();
  if (!user) {
    return redirectToSignIn('/sign-in');
  }
  const profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  });
  if (profile) {
    return profile;
  }
  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`, 
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });
  return newProfile;
};
function redirectToSignIn(destinationUrl: string) {
  if (!destinationUrl.startsWith('/')) {
    throw new Error("destination url or return back url should be an absolute path url!");
  }
  redirect(destinationUrl); 
}
