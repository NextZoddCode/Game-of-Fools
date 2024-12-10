import ChangeTurn from "../shared/ChangeTurn";
import Character from "../shared/Character";

test('Deve testar quem começa primeiro jogando baseado em sua velocidade', () => {

    const anddy = new Character('anddy', '/images/anddy.jpg', 2, 2, 10, 1)
    const sarkani = new Character('sarkani', '/images/sarkani.jpg', 8, 5, 5, 5)

    const mudarTurno = new ChangeTurn(anddy, sarkani)

    expect(mudarTurno.getCurrentPlayer).toBe(sarkani)

    console.log('sarkani é o primeiro')

})

test('Deve testar se o player com menor velocidade nao é o primeiro a jogar', () => {

    const anddy = new Character('anddy', '/images/anddy.jpg', 2, 2, 10, 1)
    const sarkani = new Character('sarkani', '/images/sarkani.jpg', 8, 5, 5, 5)

    const mudarTurno = new ChangeTurn(anddy, sarkani)

    expect(mudarTurno.getCurrentPlayer).not.toBe(anddy)

    console.log('anddy nao é o primeiro')

})

test('Deve alterar a vez de player ao mudar de turno', () => {

    const anddy = new Character('anddy', '/images/anddy.jpg', 2, 2, 10, 1)
    const sarkani = new Character('sarkani', '/images/sarkani.jpg', 8, 5, 5, 5)

    const mudarTurno = new ChangeTurn(anddy, sarkani)

    mudarTurno.nextTurn()

    expect(mudarTurno.getCurrentPlayer).toBe(anddy)

    console.log('vez de anddy')

    mudarTurno.nextTurn()

    expect(mudarTurno.getCurrentPlayer).toBe(sarkani)

    console.log('vez de sarkani')

})