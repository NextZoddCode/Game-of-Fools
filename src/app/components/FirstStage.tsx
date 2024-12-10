'use client'

// Imports
import { useContext, useRef } from "react"
import { stageContext } from "../contexts/stageContext"

// Components
import Image from "next/image"

export default function FirstStage() {

    const { setStage } = useContext(stageContext)

    // Ref para o áudio
    const audioRef = useRef<HTMLAudioElement | null>(null)

    async function playAudioAndStartGame() {
        if (audioRef.current) {
            audioRef.current.play()
        }
        // Usando setTimeout dentro de uma Promise para aguardar 3 segundos
        await new Promise(resolve => setTimeout(resolve, 3000));
        setStage('second')
    }


    return (
        <div className="relative w-full h-full flex flex-col items-center gap-40 text-white bg-gray-200 divcinza">
            {/*  <Image
                src='/images/marvel.jpg'
                alt="Image Painel"
                fill
                objectFit="cover"
                quality={100}
                className="absolute inset-0 grayscale blur-[1px]"
            /> */}
            <div className="absolute inset-0 w-full">
                <div className="flex justify-between items-center">
                    <img
                        className="grayscale w-96 h-[330px]"
                        src='/images/sarkani.jpg'
                        alt="Character image"
                    />
                    <img
                        className="grayscale w-96 h-[330px]"
                        src='/images/graucio.jpg'
                        alt="Character image"
                    />
                </div>
                <div className="flex justify-between items-center">
                    <img
                        className="grayscale w-96 h-[330px]"
                        src='/images/jao.jpg'
                        alt="Character image"
                    />
                    <img

                        className="grayscale w-96 h-[330px]"
                        src='/images/profile.jpg'
                        alt="Character image"
                    />
                </div>

            </div>
            <div className="absolute inset-0 justify-items-center self-center">
                <Image
                    className="grayscale"
                    src='/images/anddy.jpg'
                    alt="Character image"
                    width={500}
                    height={500}
                    quality={100}
                />
            </div>
            <div className="relative z-10 mt-20 flex flex-col gap-4">
                <h2 className="font-protest-revolution text-[100px] font-black text-red-700">Batalha dos patetas</h2>
                <span className="font-protest-revolution mx-auto text-2xl text-red-700">created by anddy</span>
            </div>
            <button
                onClick={playAudioAndStartGame}
                className="relative cursor-pointer bg-red-700 rounded-full"
            >
                <span
                    className="font-protest-revolution w-full h-full flex items-center gap-2 px-8 py-3 bg-red-700 rounded-full"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                    >
                        <path
                            d="M8 13V9m-2 2h4m5-2v.001M18 12v.001m4-.334v5.243a3.09 3.09 0 0 1-5.854 1.382L16 18a3.618 3.618 0 0 0-3.236-2h-1.528c-1.37 0-2.623.774-3.236 2l-.146.292A3.09 3.09 0 0 1 2 16.91v-5.243A6.667 6.667 0 0 1 8.667 5h6.666A6.667 6.667 0 0 1 22 11.667Z"
                        >
                        </path>
                    </svg>
                    Play Game</span>
            </button>

            {/* Elemento de áudio com ref */}
            <audio ref={audioRef} src="/audios/goh.ogg" />
        </div>
    )
}
