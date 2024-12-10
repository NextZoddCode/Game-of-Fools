import { ReactNode, ComponentProps } from "react"

interface ButtonAttackProps extends ComponentProps<'button'> {
    children: ReactNode
}

export default function ButtonAttack({ children, ...rest }: ButtonAttackProps) {
    return (
        <button
            className="w-40 h-10 text-sm bg-gradient-to-r from-zinc-800 via-white to-zinc-800 py-2 text-black hover:bg-gradient-to-r hover:from-white hover:via-zinc-800 hover:to-white hover:text-white transition-all duration-300 tracking-wide"
            {...rest}
        >
            {children}
        </button>
    )
}