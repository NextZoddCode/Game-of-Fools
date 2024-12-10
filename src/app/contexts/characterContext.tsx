'use client'

// Imports
import { useState, createContext, Dispatch, SetStateAction } from "react";
import Character from "../../core/shared/Character";

interface CharacterContextProps {
    player1: Character | null
    setPlayer1: Dispatch<SetStateAction<Character | null>>
    player2: Character | null
    setPlayer2: Dispatch<SetStateAction<Character | null>>
}

export const characterContext = createContext<CharacterContextProps | null>(null)

export const CharacterContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [player1, setPlayer1] = useState<Character | null>(null)
    const [player2, setPlayer2] = useState<Character | null>(null)

    return (
        <characterContext.Provider value={{ player1, setPlayer1, player2, setPlayer2 }}>
            {children}
        </characterContext.Provider>
    )
}