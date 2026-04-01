"use client";
import { useSession } from "next-auth/react";

export default function UserProfilePage() {
    const { data: session } = useSession();
    return (
        <div className="flex justify-center py-8">
            <div className="max-w-md w-full bg-black/80 border border-white/10 p-8 shadow-2xl">
               <h2 className="text-2xl font-heading text-white mb-6 uppercase tracking-widest">Account Profile</h2>
               {session?.user && (
                 <div className="space-y-4 text-[10px] uppercase font-bold tracking-widest">
                    <p className="text-white/60">Email: <span className="text-white ml-2">{session.user.email}</span></p>
                    <p className="text-white/60">Name: <span className="text-white ml-2">{session.user.name}</span></p>
                 </div>
               )}
            </div>
        </div>
    );
}
