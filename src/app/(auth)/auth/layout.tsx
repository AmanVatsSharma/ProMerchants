const AuthLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-400 to-green-800 p-3">
            {children}
        </div>
    )
}

export default AuthLayout