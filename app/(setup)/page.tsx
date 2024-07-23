import { redirect } from "next/navigation";

import { initiaProfile } from "@/lib/initial-profile";
import { db } from "@/lib/db";

const SetupPage = async () =>{
   const profile = await initiaProfile();
   if (!profile) {
      return redirect('/sign-in'); 
    }

   const server = await db.server.findFirst({
      where: { 
         members:{
            some:{
               profileId: profile.id,
            } ,
         },
      },
   });

   if(server && "id" in server){
      return redirect(`/servers/${server.id}`);
   }
   return <div>Create a Server </div>

};

export default SetupPage;