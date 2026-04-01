import { signIn } from "@/auth";

export default function Page() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black to-background z-0" />
            <div className="relative z-10 w-full max-w-md">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-heading text-white tracking-[0.2em] font-light uppercase">Crochetverse</h1>
                    <p className="text-white/50 tracking-[0.3em] text-[10px] uppercase mt-4">The Archive Access</p>
                </div>
                
                <div className="bg-black/80 backdrop-blur-md border border-white/10 shadow-2xl p-8 lg:p-12 relative flex flex-col items-center">
                    <div className="mb-10 text-center">
                        <h2 className="text-white font-heading tracking-widest uppercase font-light text-xl mb-3">Welcome Back</h2>
                        <p className="text-white/50 tracking-wide font-light text-sm">Please authenticate to continue.</p>
                    </div>

                    <form action={async () => {
                        "use server";
                        await signIn("google", { redirectTo: "/" });
                    }} className="w-full">
                        <button type="submit" className="w-full border border-white/20 bg-transparent text-white hover:bg-white hover:text-black transition-all duration-500 uppercase tracking-widest text-[10px] font-bold py-5 flex items-center justify-center gap-4">
                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Continue with Google
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
