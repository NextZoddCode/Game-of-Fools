'use client'

// Imports
import { useContext, useEffect, useRef, useState } from "react"
import { characterContext } from "../contexts/characterContext"
import { stageContext } from "../contexts/stageContext"
import ChangeTurn from "@/core/shared/ChangeTurn"
import Character from "@/core/shared/Character"
import { motion } from 'framer-motion'

//Components
import ButtonAttack from "./ButtonAttack"
import { IoShield } from 'react-icons/io5'

export default function ThirdStage() {

    const { setStage } = useContext(stageContext)

    const { player1, player2, setPlayer1, setPlayer2 } = useContext(characterContext) || {}

    const [turn] = useState<ChangeTurn>(new ChangeTurn(player1!, player2!))

    const [battleMessages, setBattleMessages] = useState<string[]>(['Batalha começou!']) // Mensagens de batalha

    const messageContainerRef = useRef<HTMLDivElement | null>(null) // Ref para o container de mensagens

    function ResetGame() {
        setPlayer1!(null)
        setPlayer2!(null)
        setStage('first')
    }

    function Punch(character: Character, opponent: Character) {

        const attackPunch = character.punch(opponent)

        setBattleMessages(prev =>
            [...prev, `${new Intl.DateTimeFormat('pt-BR', {
                timeStyle: 'medium'
            }).format(new Date())}: ${attackPunch}`])

        setBattleMessages(prev => [...prev, `É a vez de ${turn.getCurrentPlayer.name}!`])

        turn.nextTurn()

    }

    function Kick(character: Character, opponent: Character) {

        const attackKick = character.kick(opponent)

        setBattleMessages(prev =>
            [...prev, `${new Intl.DateTimeFormat('pt-BR', {
                timeStyle: 'medium'
            }).format(new Date())}: ${attackKick}`])

        setBattleMessages(prev => [...prev, `É a vez de ${turn.getCurrentPlayer.name}`])

        turn.nextTurn()

    }

    function Defense(character: Character, opponent: Character) {

        const defenseAttack = character.defenseAttack(opponent)

        setBattleMessages(prev =>
            [...prev, `${new Intl.DateTimeFormat('pt-BR', {
                timeStyle: 'medium'
            }).format(new Date())}: ${defenseAttack}`])

        setBattleMessages(prev => [...prev, `É a vez de ${turn.getCurrentPlayer.name}`])

        turn.nextTurn()

    }

    function Super(character: Character, opponent: Character) {

        const superAttack = character.superAttack(opponent)

        setBattleMessages(prev =>
            [...prev, `${new Intl.DateTimeFormat('pt-BR', {
                timeStyle: 'medium'
            }).format(new Date())}: ${superAttack}`])

        setBattleMessages(prev => [...prev, `É a vez de ${turn.getCurrentPlayer.name}`])

        turn.nextTurn()

    }


    // Scroll automático para o final quando a mensagem for atualizada
    useEffect(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight
        }
    }, [battleMessages]) // Sempre que as mensagens mudam, rola até o final

    console.log(player1)

    return (
        <div className="w-full h-screen flex justify-between items-start text-white gap-10">
            <div className="h-screen flex flex-col gap-16 items-center mt-5">
                <span
                    className="text-2xl font-bold"
                >
                    Player 1
                </span>
                <span
                    className="text-4xl font-black tracking-widest"
                >
                    {player1!.name.charAt(0).toUpperCase() + player1!.name.slice(1)}
                </span>
                {player1!.avatar ? (
                    <>
                        {player1!.isDefending ? (
                            <div className="flex flex-col justify-center items-center gap-2">
                                <div className="flex items-center gap-2">
                                    <IoShield size={30} className="text-yellow-800" />
                                    {/* <span>Modo de defesa!</span> */}
                                </div>
                                <img
                                    className="w-72 h-60"
                                    src={player1!.avatar}
                                    alt={`${player1!.name} image`}
                                />
                            </div>
                        ) : (
                            <img
                                className="w-72 h-60"
                                src={player1!.avatar}
                                alt={`${player1!.name} image`}
                            />
                        )}
                    </>
                ) : (
                    <>
                        {player1!.isDefending ? (
                            <div className="flex flex-col justify-center items-center gap-2">
                                <div className="flex items-center gap-2">
                                    <IoShield size={30} className="text-yellow-800" />
                                    {/* <span>Modo de defesa!</span> */}
                                </div>
                                <img
                                    className="w-72 h-60"
                                    src={player1!.image ?? `/images/${player1?.image}`}
                                    alt={`${player1!.name} image`}
                                />
                            </div>
                        ) : (
                            <img
                                className="w-72 h-60"
                                src={player1!.image ?? `/images/${player1?.image}`}
                                alt={`${player1!.name} image`}
                            />
                        )}
                    </>
                )}
                <div className="w-full flex flex-col gap-2">
                    <div className="w-full flex justify-center items-center gap-3">
                        <span>
                            HP:
                        </span>
                        <div className="w-full bg-white h-5 text-center ml-3">
                            <div className="bg-red-500 z-10 h-5" style={{ width: `${player1!.hp}%` }}>
                                {`${Math.floor(player1!.hp)}%`}
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex justify-start items-center gap-3">
                        <span>
                            Fúria:
                        </span>
                        <div className="bg-orange-500 h-5 text-center" style={{ width: `${player1!.rage}%` }}>
                            {player1!.rage < 30 && `${Math.floor(player1!.rage)}%`}
                            {player1!.rage >= 30 && `MAX`}
                        </div>
                    </div>
                </div>
            </div>
            {player1!.hp === 0 ? (
                <div
                    className="w-full h-full flex flex-col gap-20 text-center mt-40"
                >
                    <motion.span
                        className=""
                        initial={{ fontSize: '0px' }}
                        animate={{ fontSize: '80px' }}
                        transition={{ duration: 2, delay: 0.5 }}
                    >
                        {`Pateta ${player2!.name} venceu!`}
                    </motion.span>
                    <button
                        className="w-40 self-center bg-gradient-to-r from-zinc-800 via-white to-zinc-800 py-2 text-black hover:bg-gradient-to-r hover:from-white hover:via-zinc-800 hover:to-white hover:text-white transition-all duration-300 tracking-wide"
                        onClick={ResetGame}
                    >
                        Resetar Jogo
                    </button>
                </div>
            ) : player2!.hp === 0 ? (
                <div
                    className="w-full h-full flex flex-col gap-20 text-center mt-40"
                >
                    <motion.span
                        className=""
                        initial={{ fontSize: '0px' }}
                        animate={{ fontSize: '80px' }}
                        transition={{ duration: 2, delay: 0.5 }}
                    >
                        {`Pateta ${player1!.name} venceu!`}
                    </motion.span>
                    <button
                        className="w-40 self-center bg-gradient-to-r from-zinc-800 via-white to-zinc-800 py-2 text-black hover:bg-gradient-to-r hover:from-white hover:via-zinc-800 hover:to-white hover:text-white transition-all duration-300 tracking-wide"
                        onClick={ResetGame}
                    >
                        Resetar Jogo
                    </button>
                </div>
            ) : (
                <div className="h-screen w-3/4 flex flex-col items-center gap-10">
                    <div className="h-10 mt-5 flex gap-2 text-xl">
                        Vez de jogar:
                        <span className="font-black tracking-widest"> {turn.getCurrentPlayer.name.charAt(0).toUpperCase() + turn.getCurrentPlayer.name.slice(1)}</span>
                    </div>
                    <div className="w-full flex flex-col justify-center gap-10">
                        <div
                            ref={messageContainerRef}
                            className="overflow-y-auto h-60 border-4 border-white rounded-sm"
                        >
                            {battleMessages.map((message: string, index: number) => {
                                return (
                                    <div className="mt-1" key={index}>
                                        {message.includes('Batalha') && (
                                            <span className="ml-3">{message}</span>
                                        )}
                                        {message.includes('acertou') && (
                                            <span className="ml-3 text-emerald-500">{message}</span>
                                        )}
                                        {message.includes('está em modo de defesa!') && (
                                            <span className="ml-3 text-emerald-500">{message}</span>
                                        )}
                                        {message.includes('errou') && (
                                            <span className="ml-3 text-red-500">{message}</span>
                                        )}
                                        {message.includes('falhou') && (
                                            <span className="ml-3 text-red-500">{message}</span>
                                        )}
                                        {message.includes('vez') && (
                                            <span className="ml-3">{message}</span>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                        {turn.getCurrentPlayer.name === player1!.name ? (
                            <div className="h-60 flex flex-col justify-around items-center">
                                <div className="flex justify-around items-center gap-10">

                                    <ButtonAttack
                                        onClick={() => Punch(player1!, player2!)}
                                    >
                                        {turn.getCurrentPlayer.name === 'anddy' && 'Soco Supersonico Anddy'}
                                        {turn.getCurrentPlayer.name === 'sarkani' && 'Soco narigudo'}
                                        {(turn.getCurrentPlayer.name !== 'sarkani' &&
                                            turn.getCurrentPlayer.name !== 'anddy') && 'Soco'}
                                    </ButtonAttack>

                                    <ButtonAttack
                                        onClick={() => Kick(player1!, player2!)}
                                    >
                                        {turn.getCurrentPlayer.name === 'anddy' && 'Chute Supersonico Anddy'}
                                        {turn.getCurrentPlayer.name === 'sarkani' && 'Chute narigudo'}
                                        {(turn.getCurrentPlayer.name !== 'sarkani' &&
                                            turn.getCurrentPlayer.name !== 'anddy') && 'Chute'}
                                    </ButtonAttack>

                                </div>
                                <div className="flex justify-around items-center gap-10">

                                    {!(player1!.isDefending) && (
                                        <ButtonAttack
                                            onClick={() => Defense(player1!, player2!)}
                                        >
                                            {turn.getCurrentPlayer.name === 'anddy' && 'Defesa abominável'}
                                            {turn.getCurrentPlayer.name === 'sarkani' && 'Defesa de nariz'}
                                            {(turn.getCurrentPlayer.name !== 'sarkani' &&
                                                turn.getCurrentPlayer.name !== 'anddy') && 'Defender'}
                                        </ButtonAttack>
                                    )}

                                    {player1?.isPower && (
                                        <ButtonAttack
                                            onClick={() => Super(player1!, player2!)}
                                        >
                                            {turn.getCurrentPlayer.name === 'anddy' && 'Super golpe abominavel'}
                                            {turn.getCurrentPlayer.name === 'sarkani' && 'Super narigada brutal'}
                                            {(turn.getCurrentPlayer.name !== 'sarkani' &&
                                                turn.getCurrentPlayer.name !== 'anddy') && 'Super'}
                                        </ButtonAttack>
                                    )}

                                </div>
                            </div>
                        ) : (
                            <div className="h-60 flex flex-col justify-around items-center">
                                <div className="flex justify-around items-center gap-10">

                                    <ButtonAttack
                                        onClick={() => Punch(player2!, player1!)}
                                    >
                                        {turn.getCurrentPlayer.name === 'anddy' && 'Soco Supersonico Anddy'}
                                        {turn.getCurrentPlayer.name === 'sarkani' && 'Soco narigudo'}
                                        {(turn.getCurrentPlayer.name !== 'sarkani' &&
                                            turn.getCurrentPlayer.name !== 'anddy') && 'Soco'}
                                    </ButtonAttack>

                                    <ButtonAttack
                                        onClick={() => Kick(player2!, player1!)}
                                    >
                                        {turn.getCurrentPlayer.name === 'anddy' && 'Chute Supersonico Anddy'}
                                        {turn.getCurrentPlayer.name === 'sarkani' && 'Chute narigudo'}
                                        {(turn.getCurrentPlayer.name !== 'sarkani' &&
                                            turn.getCurrentPlayer.name !== 'anddy') && 'Chute'}
                                    </ButtonAttack>

                                </div>
                                <div className="flex justify-around items-center gap-10">

                                    {!(player2!.isDefending) && (
                                        <ButtonAttack
                                            onClick={() => Defense(player2!, player1!)}
                                        >
                                            {turn.getCurrentPlayer.name === 'anddy' && 'Defesa abominável'}
                                            {turn.getCurrentPlayer.name === 'sarkani' && 'Defesa de nariz'}
                                            {(turn.getCurrentPlayer.name !== 'sarkani' &&
                                                turn.getCurrentPlayer.name !== 'anddy') && 'Defender'}
                                        </ButtonAttack>
                                    )}

                                    {player2!.isPower && (
                                        <ButtonAttack
                                            onClick={() => Super(player2!, player1!)}
                                        >
                                            {turn.getCurrentPlayer.name === 'anddy' && 'Super golpe abominavel'}
                                            {turn.getCurrentPlayer.name === 'sarkani' && 'Super narigada brutal'}
                                            {(turn.getCurrentPlayer.name !== 'sarkani' &&
                                                turn.getCurrentPlayer.name !== 'anddy') && 'Super'}
                                        </ButtonAttack>
                                    )}

                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
            <div className="h-screen flex flex-col gap-16 items-center mt-5">
                <span
                    className="text-2xl font-bold"
                >
                    Player 2
                </span>
                <span
                    className="text-4xl font-black tracking-widest"
                >
                    {player2!.name.charAt(0).toUpperCase() + player2!.name.slice(1)}
                </span>
                {player2!.avatar ? (
                    <>
                        {player2!.isDefending ? (
                            <div className="flex flex-col justify-center items-center gap-2">
                                <div className="flex items-center gap-2">
                                    <IoShield size={30} className="text-yellow-800" />
                                    {/* <span>Modo de defesa!</span> */}
                                </div>
                                <img
                                    className="w-72 h-60"
                                    src={player2!.avatar ?? `/images/${player2?.avatar}`}
                                    alt={`${player2!.name} image`}
                                />
                            </div>
                        ) : (
                            <img
                                className="w-72 h-60"
                                src={player2!.avatar ?? `/images/${player2?.avatar}`}
                                alt={`${player2!.name} image`}
                            />
                        )}
                    </>
                ) : (
                    <>
                        {player2!.isDefending ? (
                            <div className="flex flex-col justify-center items-center gap-2">
                                <div className="flex items-center gap-2">
                                    <IoShield size={30} className="text-yellow-800" />
                                    {/* <span>Modo de defesa!</span> */}
                                </div>
                                <img
                                    className="w-72 h-60"
                                    src={player2!.image ?? `/images/${player2?.image}`}
                                    alt={`${player2!.name} image`}
                                />
                            </div>
                        ) : (
                            <img
                                className="w-72 h-60"
                                src={player2!.image ?? `/images/${player2?.image}`}
                                alt={`${player2!.name} image`}
                            />
                        )}
                    </>
                )}

                <div className="w-full flex flex-col gap-2">
                    <div className="w-full flex justify-center items-center gap-3">
                        <span>
                            HP:
                        </span>
                        <div className="w-full bg-white h-5 text-center ml-3">
                            <div className="bg-red-500 z-10 h-5" style={{ width: `${player2!.hp}%` }}>
                                {`${Math.floor(player2!.hp)}%`}
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex justify-start items-center gap-3">
                        <span>
                            Fúria:
                        </span>
                        <div className="bg-orange-500 h-5 text-center" style={{ width: `${player2!.rage}%` }}>
                            {player2!.rage < 30 && `${Math.floor(player2!.rage)}%`}
                            {player2!.rage >= 30 && `MAX`}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}