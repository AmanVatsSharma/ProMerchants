//components/sign_in_google.tsx
import { signIn } from "../../auth"


export default function SignInGoogle() {
    return (
        <div className="bg-secondary p-2 rounded-lg border ">
            <form
                action={async () => {
                    "use server"
                    await signIn("google")
                }}
            >
                <button type="submit">Signin with Google</button>
            </form>
        </div>
    )
}