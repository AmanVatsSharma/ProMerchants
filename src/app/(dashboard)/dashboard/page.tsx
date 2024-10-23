import LoginButton from "@/components/auth/LoginButton"
import { auth } from "../../../../auth"
import ProButton from "@/components/ProUi/ProButton"

export default async function Page() {

    const session = await auth()
    // if (!session) return <div className="w-screen h-screen flex items-center justify-center">Not authenticated</div>
    console.log(session)

    return (
        <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-400 to-green-800 p-3">
            <div className="space-y-6 text-center">
                <h1 className="text-6xl font-semibold text-white drop-shadow-md">
                    🔐 Auth
                </h1>
                <p className="text-white text-lg">
                    A Simple Authentication Service
                </p>
                <div>
                    <LoginButton>
                        <ProButton animated variant={"primary"} size={"md"}>
                            Sign In
                        </ProButton>
                    </LoginButton>
                </div>
                {JSON.stringify(session)}
            </div>
        </div>
    )
}