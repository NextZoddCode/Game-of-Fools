'use client'

// Imports
import { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react'

interface StageContext {
    stage: string,
    setStage: Dispatch<SetStateAction<string>>,
    changeStage: (stage: string) => void
}

const stageContextValue: StageContext = {
    stage: 'first',
    setStage: () => { },
    changeStage: () => { }
}

export const stageContext = createContext<StageContext>(stageContextValue)

interface ContextProviderProps {
    children: ReactNode
}

export const StageContextProvider = ({ children }: ContextProviderProps) => {

    const [stage, setStage] = useState('first')

    function changeStage(stage: string) {
        setStage(stage)
    }

    return (
        <stageContext.Provider value={{ stage, setStage, changeStage }}>
            {children}
        </stageContext.Provider>
    )

}