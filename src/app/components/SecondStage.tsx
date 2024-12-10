'use client'

// Imports
import { useState, useEffect, useContext, useRef } from "react"
import { stageContext } from "../contexts/stageContext"
import { characterContext } from "../contexts/characterContext"
import { characters } from "@/core/data/constants/Characters"
import CharacterProps from "@/core/data/constants/CharacterInterface"
import { motion } from 'framer-motion'

// Components
import Graphic from "./Graphic"
import Character from "@/core/shared/Character"


export default function SecondStage() {

    /*const [duration, setDuration] = useState<number>(0);

    const handleMetadataLoaded = () => {
        if (audioPreviewCharacterRef.current) {
            setDuration(audioPreviewCharacterRef.current.duration);
        }
    };*/

    const { setStage } = useContext(stageContext)
    const { player1, setPlayer1, player2, setPlayer2 } = useContext(characterContext) || {}

    const [previewCharacter, setPreviewCharacter] = useState<Character | null>(null)

    const audioPreviewCharacterRef = useRef<HTMLAudioElement>(null)
    const audioMusicStageRef = useRef<HTMLAudioElement>(null)

    function SelectPreviewCharacter(character: CharacterProps) {
        if (!player1) {
            setPreviewCharacter(new Character(character.name, character.image, character.strength, character.defense, character.luck, character.speed, character.avatar, character.audio))
            return
        }

        setPreviewCharacter(new Character(character.name, character.image, character.strength, character.defense, character.luck, character.speed, character.avatar, character.audio))
        /*audioMusicStageRef.current!.pause()
        audioPreviewCharacterRef.current?.play()
        audioMusicStageRef.current!.play()*/
    }

    function ConfirmCharacter() {
        if (!player1) {
            setPlayer1!(previewCharacter)
            setPreviewCharacter(null)
            return
        }
        setPlayer2!(previewCharacter)
        setPreviewCharacter(null)
    }

    useEffect(() => {

        async function audio() {
            audioMusicStageRef.current!.play()

            if (audioPreviewCharacterRef.current) {
                audioMusicStageRef.current!.pause()
                audioPreviewCharacterRef.current?.play()
                await new Promise(resolve => setTimeout(resolve, 3000))
                audioMusicStageRef.current!.play()
            }


        }

        audio()
    }, [previewCharacter])



    useEffect(() => {

        async function nextStage() {

            if (player1 && player2) {
                setTimeout(() => {
                    setStage('third')
                }, 4000)
            }

        }

        nextStage()

    }, [player1, player2])

    //console.log('player1', player1)
    //console.log('player2', player2)

    //console.log('previewCharacter', previewCharacter)

    //console.log(audioPreviewCharacterRef)

    return (
        <div className="relative w-full h-full flex justify-between items-center text-white">
            {player1 && player1 ? (
                <div className="w-full h-full flex flex-col justify-around items-center">
                    <h3 className="text-xl">Player 1</h3>
                    <span className="text-4xl font-black tracking-widest">{player1.nameCharacter.charAt(0).toUpperCase() + player1.nameCharacter.slice(1)}</span>

                    <Graphic previewCharacter={player1} />
                    {player1.avatar ? (
                        <img
                            className="w-3/4 h-[300px]"
                            src={player1.avatar}
                            alt={`${player1.name} image`}
                        />
                    ) : (
                        <img
                            className="w-3/4 h-[300px]"
                            src={player1.image}
                            alt={`${player1.name} image`}
                        />
                    )}
                </div>
            ) : previewCharacter ? (
                <div className="w-full h-full flex flex-col justify-around items-center">
                    <h3 className="text-xl">Player 1</h3>
                    <span className="text-4xl font-black tracking-widest">
                        {previewCharacter.name.charAt(0).toUpperCase() + previewCharacter.name.slice(1).toLowerCase()}
                    </span>
                    <Graphic previewCharacter={previewCharacter} />
                    {previewCharacter.avatar ? (
                        <img
                            className="w-3/4 h-[300px]"
                            src={previewCharacter.avatar}
                            alt={`${previewCharacter.name} image`}
                        />
                    ) : (
                        <img
                            className="w-3/4 h-[300px]"
                            src={previewCharacter.image}
                            alt={`${previewCharacter.name} image`}
                        />
                    )}
                    <button
                        onClick={ConfirmCharacter}
                        className="tracking-widest bg-gradient-to-r from-zinc-800 via-white to-zinc-800 w-3/4 py-2 text-black hover:bg-gradient-to-r hover:from-white hover:via-zinc-800 hover:to-white hover:text-white transition-all duration-300"
                    >
                        Confirmar
                    </button>
                </div>
            ) : (
                <div className="w-full h-full  flex-col justify-around items-center" />
            )}
            {player1 && player2 ? (
                <div className="w-full h-full flex flex-col justify-around items-center gap-4">
                    <motion.span
                        className="bg-gradient-to-br from-red-500 to-orange-500 via-orange-800 bg-clip-text text-transparent"
                        initial={{ fontSize: '0px' }}
                        animate={{ fontSize: '40px' }}
                        transition={{ duration: 2 }}
                    >
                        A batalha ira começar!
                    </motion.span>
                    <motion.img
                        initial={{ width: '0px', height: '0px' }}
                        animate={{ width: '240px', height: '240px' }}
                        transition={{ duration: 2 }}
                        className="w-60 h-60"
                        src="/images/versus.png"
                        alt="versus image" />
                </div>
            ) : (
                <div className="w-full h-full flex flex-col items-center gap-4">
                    <span className="font-protest-revolution mt-10 text-4xl">Selecione seu pateta!</span>
                    <div className="flex flex-wrap justify-center items-center">
                        {characters && characters.map((character: CharacterProps) => (
                            player1?.name === character.name ? (
                                <div
                                    key={character.name}
                                    className='border-8 border-emerald-500 cursor-not-allowed'
                                >
                                    <img
                                        className="w-[150px] h-[150px] grayscale"
                                        src={character.image}
                                        alt={`${character.name} image`}
                                    />
                                </div>
                            ) : player2?.name === character.name ? (
                                <div
                                    key={character.name}
                                    className="border-8 border-emerald-500 cursor-not-allowed"
                                >
                                    <img
                                        className="w-[150px] h-[150px] grayscale"
                                        src={character.image}
                                        alt={`${character.name} image`}
                                    />
                                </div>
                            ) : (
                                <div
                                    key={character.name}
                                    className={`${previewCharacter?.name === character.name ? "border-8 border-yellow-300 cursor-pointer" : "border-8 border-white cursor-pointer"}`}
                                    onClick={() => SelectPreviewCharacter(character)}
                                >
                                    <img
                                        className="w-[150px] h-[150px]"
                                        src={character.image}
                                        alt={`${character.name} image`}
                                    />
                                </div>
                            )
                        )
                        )}
                    </div>
                </div>
            )}
            {player2 && player2 ? (
                <div className="w-full h-full flex flex-col justify-around items-center">
                    <h3 className="text-xl">Player 2</h3>
                    <span className="text-4xl font-black tracking-widest">{player2.name.charAt(0).toUpperCase() + player2.name.slice(1)}</span>

                    <Graphic previewCharacter={player2} />
                    {player2.avatar ? (
                        <img
                            className="w-3/4 h-[300px]"
                            src={player2.avatar}
                            alt={`${player2.name} image`}
                        />
                    ) : (
                        <img
                            className="w-3/4 h-[300px]"
                            src={player2.image}
                            alt={`${player2.name} image`}
                        />
                    )}
                </div>
            ) : player1 !== null && previewCharacter ? (
                <div className="w-full h-full flex flex-col justify-around items-center">
                    <h3 className="text-xl">Player 2</h3>
                    <span className="text-4xl font-black tracking-widest">{previewCharacter.nameCharacter.charAt(0).toUpperCase() + previewCharacter.nameCharacter.slice(1)}</span>

                    <Graphic previewCharacter={previewCharacter} />
                    {previewCharacter.avatar ? (
                        <img
                            className="w-3/4 h-[300px]"
                            src={previewCharacter.avatar}
                            alt={`${previewCharacter.name} image`}
                        />
                    ) : (
                        <img
                            className="w-3/4 h-[300px]"
                            src={previewCharacter.image}
                            alt={`${previewCharacter.name} image`}
                        />
                    )}
                    <button
                        onClick={ConfirmCharacter}
                        className="tracking-widest bg-gradient-to-r from-zinc-800 via-white to-zinc-800 w-3/4 py-2 text-black hover:bg-gradient-to-r hover:from-white hover:via-zinc-800 hover:to-white hover:text-white transition-all duration-300"
                    >
                        Confirmar
                    </button>
                </div>
            ) : (
                <div className="w-full h-full  flex-col justify-around items-center" />
            )}
            <audio ref={audioMusicStageRef} src="/audios/dmx.mp3" />
            {previewCharacter?.audio && (
                <audio
                    ref={audioPreviewCharacterRef}
                    src={previewCharacter?.audio}
                //onLoadedMetadata={handleMetadataLoaded} 
                />
            )}
        </div>
    )
}