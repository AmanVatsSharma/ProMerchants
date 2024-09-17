import { Button } from "@/components/ui/button"
import LoginButton from "@/components/auth/LoginButton"
import { auth } from "../../../../auth"

export default async function Page() {
    const session = await auth()
    // if (!session) return <div className="w-screen h-screen flex items-center justify-center">Not authenticated</div>

    return (
        <div className="flex h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
            <div className="space-y-6 text-center">
                <h1 className="text-6xl font-semibold text-white drop-shadow-md">
                    🔐 Auth
                </h1>
                <p className="text-white text-lg">
                    A Simple Authentication Service
                </p>
                <div>
                    <LoginButton>
                        <Button variant={"secondary"} size={"lg"}>
                            Sign In
                        </Button>
                    </LoginButton>
                </div>
            </div>
        </div>
    )
}