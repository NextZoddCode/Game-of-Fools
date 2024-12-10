'use client'

// Imports
import { useContext } from "react"
import { stageContext } from "../contexts/stageContext"

// Components
import FirstStage from "./FirstStage"
import SecondStage from "./SecondStage"
import ThirdStage from "./ThirdStage"

export default function Game() {

    const { stage } = useContext(stageContext)

    return (
        <div className="w-full h-full">
            {stage === 'first' && <FirstStage />}
            {stage === 'second' && <SecondStage />}
            {stage === 'third' && <ThirdStage />}
        </div>
    )
}