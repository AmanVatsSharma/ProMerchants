import { signIn } from "../../auth"
import SignInGoogle from "./sign-in_google"

export function SignInForm() {
    return (
        <div
            className="flex flex-col bg-blue-600 py-10 px-3 rounded-xl"
        >
            <form
                action={async (formData) => {
                    "use server"
                    await signIn("credentials", formData)
                }}
            >

                <div className="flex flex-col gap-5 items-center justify-center">
                    <div >
                        <label className=" flex gap-2">
                            Email
                            <input name="email" type="email" />
                        </label>
                    </div>
                    <div>
                        <label className=" flex gap-2">
                            Password
                            <input name="password" type="password" />
                        </label>
                    </div>
                    <button className=" rounded-lg bg-gray-800 p-3">Sign In</button>

                </div>

            </form>

            <div className="p-3">
                <SignInGoogle />
            </div>

        </div>

    )
}