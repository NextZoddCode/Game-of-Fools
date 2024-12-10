import Character from "../shared/Character";

test('Checar se os personanges estao definidos', () => {
    const anddy = new Character('anddy', '/images/anddy.jpg', 2, 2, 10, 1)
    const sarkani = new Character('sarkani', '/images/sarkani.jpg', 8, 5, 5, 5)

    expect(anddy).toBeDefined()
    expect(sarkani).toBeDefined()
})

// Atributos

test('Deve checar se está correto o valor dos atributos do personagem', () => {
    const anddy = new Character('anddy', '/images/anddy.jpg', 2, 2, 10, 1)

    expect(anddy.strength).toBe(2)
    expect(anddy.defense).toBe(2)
    expect(anddy.luck).toBe(10)
    expect(anddy.speed).toBe(1)

})

test('Deve checar se o usuário foi derrotado ao ficar com hp zerado', () => {
    const anddy = new Character('anddy', '/images/anddy.jpg', 2, 2, 10, 1)
    const sarkani = new Character('sarkani', '/images/sarkani.jpg', 8, 5, 5, 5)

    sarkani.hp = 1

    const attack = anddy.punch(sarkani)

    if (sarkani.hp < 100 && anddy.rage > 0) {
        expect(sarkani.isDefeated).toBeTruthy()
        console.log('sarkani foi derrotado')
    } else {
        expect(attack).toBe(`${anddy.name} errou o soco!`)
        console.log('anddy errou o soco')
    }

})

// Golpes

test('Checa se o valor dos golpes está correto', () => {
    const anddy = new Character('anddy', '/images/anddy.jpg', 2, 2, 10, 1)

    expect(anddy.attacks.punch.damage).toBe(4)
    expect(anddy.attacks.kick.damage).toBe(6)
    expect(anddy.attacks.super.damage).toBe(8)
    expect(anddy.attacks.defend.damageReduction).toBe(3)

})

test('Deve reduzir o hp do inimigo com um soco bem-sucedido!', () => {
    const anddy = new Character('anddy', '/images/anddy.jpg', 2, 2, 10, 1)
    const sarkani = new Character('sarkani', '/images/sarkani.jpg', 8, 5, 5, 5)

    const attack = anddy.punch(sarkani)

    if (sarkani.hp < 100 && sarkani.isDefending === false) {
        expect(sarkani.hp).toBe(98.5)
        expect(anddy.hp).toBe(100)
        expect(attack).toBe(`${anddy.nameCharacter} acertou um soco em ${sarkani.nameCharacter} e tirou um total de 1.5 de hp!`)
        console.log('acertou o soco!')
    } else {
        expect(sarkani.hp).toBe(100)
        expect(attack).toBe(`${anddy.nameCharacter} errou o soco!`)
        console.log('errou o soco!')
    }

})

test('Deve retornar que errou o soco!', () => {
    const anddy = new Character('anddy', '/images/anddy.jpg', 2, 2, 10, 1)
    const sarkani = new Character('sarkani', '/images/sarkani.jpg', 8, 5, 5, 5)

    const attack = anddy.punch(sarkani)

    if (sarkani.hp === 100) {
        expect(sarkani.hp).toBe(100)
        expect(attack).toBe(`${anddy.nameCharacter} errou o soco!`)
        console.log('errou o soco!')
    }

})

test('Deve reduzir o hp do inimigo com um chute bem-sucedido!', () => {
    const anddy = new Character('anddy', '/images/anddy.jpg', 2, 2, 10, 1)
    const sarkani = new Character('sarkani', '/images/sarkani.jpg', 8, 5, 5, 5)

    const attack = anddy.kick(sarkani)

    if (sarkani.hp < 100) {
        expect(sarkani.hp).toBe(96.5)
        expect(anddy.hp).toBe(100)
        expect(anddy.rage).toBe(6)
        expect(sarkani.rage).toBe(9)
        expect(attack).toBe(`${anddy.nameCharacter} acertou um chute em ${sarkani.nameCharacter} e retirou um total de 3.5 de hp`)
        console.log('Anddy acertou o chute!')
    } else {
        expect(sarkani.hp).toBe(100)
        expect(anddy.hp).toBe(100)
        expect(anddy.rage).toBe(0)
        expect(sarkani.rage).toBe(0)
        expect(attack).toBe(`${anddy.nameCharacter} errou o chute!`)
        console.log('Anddy errou o chute!')
    }

})

test('Deve retornar que errou o chute!', () => {
    const anddy = new Character('anddy', '/images/anddy.jpg', 2, 2, 10, 1)
    const sarkani = new Character('sarkani', '/images/sarkani.jpg', 8, 5, 5, 5)

    const attack = anddy.kick(sarkani)

    if (sarkani.hp === 100) {
        expect(sarkani.hp).toBe(100)
        expect(anddy.hp).toBe(100)
        expect(attack).toBe(`${anddy.nameCharacter} errou o chute!`)
        console.log('Anddy errou o chute!')
    }

})

test('Deve reduzir o hp do inimigo com um super bem-sucedido!', () => {
    const anddy = new Character('anddy', '/images/anddy.jpg', 2, 2, 10, 1)
    const sarkani = new Character('sarkani', '/images/sarkani.jpg', 8, 5, 5, 5)

    anddy.rage = 30

    const attack = anddy.superAttack(sarkani)

    if (sarkani.hp < 100) {
        expect(anddy.isPower).toBeFalsy()
        expect(sarkani.hp).toBe(94.5)
        expect(anddy.hp).toBe(100)
        expect(attack).toBe(`${anddy.nameCharacter} acertou o seu super poder em ${sarkani.nameCharacter} e retirou um total de 5.5 de hp!`)
        console.log('Anddy acertou o super!')
    } else {
        expect(sarkani.hp).toBe(100)
        expect(anddy.isPower).toBeFalsy()
        expect(attack).toBe(`${anddy.nameCharacter} errou o super poder!`)
        console.log('Anddy errou o super!')
    }

})

test('Deve retornar que errou o super!', () => {
    const anddy = new Character('anddy', '/images/anddy.jpg', 2, 2, 10, 1)
    const sarkani = new Character('sarkani', '/images/sarkani.jpg', 8, 5, 5, 5)

    anddy.rage = 30

    const attack = anddy.superAttack(sarkani)

    if (sarkani.hp === 100) {
        expect(sarkani.hp).toBe(100)
        expect(attack).toBe(`${anddy.nameCharacter} errou o super poder!`)
        console.log('Anddy errou o super!')
    }

})

// Rage

test('Deve checar se o rage está no limite máximo', () => {

    const anddy = new Character('anddy', '/images/anddy.jpg', 2, 2, 10, 1)

    anddy.rage = 35

    if (anddy.rage >= 30) {
        anddy.rage = 30
        anddy.isPower = true
    }

    expect(anddy.rage).toBe(30)
    expect(anddy.isPower).toBeTruthy()

})

test('Deve aumentar o rage de quem acerta o golpe e de quem leva o golpe', () => {
    const anddy = new Character('anddy', '/images/anddy.jpg', 2, 2, 10, 1)
    const sarkani = new Character('sarkani', '/images/sarkani.jpg', 8, 5, 5, 5)

    const attack = anddy.punch(sarkani)

    if (sarkani.hp < 100) {
        expect(anddy.rage).toBe(4)
        expect(sarkani.rage).toBe(6)
        expect(typeof attack).toBe('string')
        console.log('rage aumentada')
    } else {
        expect(anddy.rage).toBe(0)
        expect(sarkani.rage).toBe(0)
        expect(typeof attack).toBe('string')
        console.log('rage permanece a mesma')
    }

})

test('Deve zerar o rage ao usar um super ataque e também cancelar de poder usar seu super ataque!', () => {
    const anddy = new Character('anddy', '/images/anddy.jpg', 2, 2, 10, 1)
    const sarkani = new Character('sarkani', '/images/sarkani.jpg', 8, 5, 5, 5)

    anddy.rage = 30

    const attack = anddy.superAttack(sarkani)

    if (sarkani.hp < 100) {
        expect(anddy.rage).toBe(0)
        expect(anddy.isPower).toBeFalsy()
        expect(typeof attack).toBe('string')
        console.log('rage zerado e nao pode usar novamente o super')
    } else {
        expect(anddy.rage).toBe(0)
        expect(anddy.isPower).toBeFalsy()
        expect(typeof attack).toBe('string')
        console.log('rage zerado e nao pode usar novamente o super')
    }

})

test('Deve não deixar usar o super caso não tenha rage necessária', () => {
    const anddy = new Character('anddy', '/images/anddy.jpg', 2, 2, 10, 1)
    const sarkani = new Character('sarkani', '/images/sarkani.jpg', 8, 5, 5, 5)

    const attack = anddy.superAttack(sarkani)

    if (sarkani.hp < 100) {
        expect(sarkani.hp).toBe(94.5)
        expect(anddy.hp).toBe(100)
        expect(attack).toBe(`${anddy.nameCharacter} acertou o seu super poder em ${sarkani.nameCharacter} e retirou um total de 5.5 de hp!`)
        console.log('Anddy acertou o super!')
    } else {
        expect(sarkani.hp).toBe(100)
        expect(attack).toBe('Rage não suficiente!')
        console.log('Anddy errou o super!')
    }

})

// Defesa

test('Deve permanecer em estado de defesa quando usar a defesa', () => {
    const anddy = new Character('anddy', '/images/anddy.jpg', 2, 2, 10, 1)
    const sarkani = new Character('sarkani', '/images/sarkani.jpg', 8, 5, 5, 5)

    const defend = anddy.defenseAttack(sarkani)

    if (anddy.isDefending) {
        expect(anddy.isDefending).toBeTruthy()
        expect(defend).toBe(`${anddy.nameCharacter} está em modo de defesa!`)
        console.log('Modo de defesa')
    } else {
        expect(anddy.isDefending).toBeFalsy()
        expect(defend).toBe(`${anddy.nameCharacter} falhou ao tentar entrar em modo de defesa!`)
        console.log('Falhou ao tentar se defender!')
    }
})

test('Deve retornar que falhou ao tentar se defender', () => {
    const anddy = new Character('anddy', '/images/anddy.jpg', 2, 2, 10, 1)
    const sarkani = new Character('sarkani', '/images/sarkani.jpg', 8, 5, 5, 5)

    const defend = anddy.defenseAttack(sarkani)

    if (!anddy.isDefending) {
        expect(anddy.isDefending).toBeFalsy()
        expect(defend).toBe(`${anddy.nameCharacter} falhou ao tentar entrar em modo de defesa!`)
        console.log('Falhou ao tentar se defender!')
    }
})

test('Deve diminuir o dano do oponente com a defesa ativada', () => {
    const anddy = new Character('anddy', '/images/anddy.jpg', 2, 2, 10, 1)
    const sarkani = new Character('sarkani', '/images/sarkani.jpg', 8, 5, 5, 5)

    anddy.isDefending = true
    expect(anddy.isDefending).toBeTruthy()

    const attack = sarkani.punch(anddy)

    if (anddy.hp < 100) {
        expect(anddy.hp).toBe(96.8)
        expect(anddy.isDefending).toBeFalsy()
        expect(attack).toBe(`${sarkani.nameCharacter} acertou um soco em ${anddy.nameCharacter} e tirou um total de 3.2 de hp!`)
        console.log('Anddy tomou o golpe de sarkani!')

    } else {
        expect(anddy.hp).toBe(100)
        expect(attack).toBe(`${sarkani.nameCharacter} errou o soco!`)
        console.log('Sarkani errou o golpe!')
    }

})


test('Deve retirar o modo de defesa após sofrer um dano', () => {
    const anddy = new Character('anddy', '/images/anddy.jpg', 2, 2, 10, 1)
    const sarkani = new Character('sarkani', '/images/sarkani.jpg', 8, 5, 5, 5)

    sarkani.isDefending = true
    expect(sarkani.isDefending).toBeTruthy()

    anddy.punch(sarkani)

    if (sarkani.hp < 100) {
        expect(sarkani.isDefending).toBeFalsy()
        console.log('Retirou defesa de sarkani!')
    } else {
        expect(sarkani.isDefending).toBeTruthy()
        console.log('Modo de defesa ainda permanece!')
    }

})