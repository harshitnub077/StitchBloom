import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <SignIn
                appearance={{
                    elements: {
                        formButtonPrimary: "bg-primary text-primary-foreground hover:bg-primary/90",
                        footerActionLink: "text-primary hover:text-primary/90",
                        card: "shadow-xl border border-gray-200"
                    }
                }}
            />
        </div>
    );
}
