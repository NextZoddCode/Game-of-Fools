export default class Character {
    public name: string
    public image: string
    public avatar?: string | null
    public audio?: string | null
    public strength: number
    public defense: number
    public luck: number
    public speed: number
    public hp: number
    public rage: number
    public isDefending: boolean
    public isPower: boolean
    public isDefeated: boolean
    public attacks: {
        punch: { damage: number, missChance: number };
        kick: { damage: number, missChance: number };
        defend: { damageReduction: number, missChance: number };
        super: { damage: number, missChance: number };
    };

    constructor(
        name: string,
        image: string,
        strength: number,
        defense: number,
        luck: number,
        speed: number,
        avatar?: string,
        audio?: string,
    ) {

        if (name === '' || name === null || name === undefined || name.length < 2) throw new Error('Digite um nome válido')
        if (image === '' || image === null || image === undefined) throw new Error('A imagem é obrigatória')
        if (strength < 0 || strength > 10) throw new Error('Força nao pode ser menor que 10 e nem maior que 10')
        if (defense < 0 || defense > 10) throw new Error('Defesa nao pode ser menor que 10 e nem maior que 10')
        if (luck < 0 || luck > 10) throw new Error('Sorte nao pode ser menor que 10 e nem maior que 10')
        if (speed < 0 || speed > 10) throw new Error('Velocidade nao pode ser menor que 10 e nem maior que 10')

        this.name = name
        this.image = image
        this.avatar = avatar ?? null
        this.audio = audio ?? null
        this.strength = strength
        this.defense = defense
        this.luck = luck
        this.speed = speed
        this.hp = 100
        this.rage = 0
        this.isDefending = false
        this.isPower = false
        this.isDefeated = false
        this.attacks = {
            punch: { damage: Math.floor(strength * 2), missChance: 1 },
            kick: { damage: strength * 3, missChance: 3 },
            defend: { damageReduction: Math.floor(defense * 1.5), missChance: 2 },
            super: { damage: strength * 4, missChance: 6 }
        }

    }

    get nameCharacter(): string {
        return `${this.name}`
    }

    private calculateMissChance(opponent: Character, missChance: number): boolean {
        const chanceMiss = (10 - this.luck) + (10 - missChance)
        const randomNumber = Math.floor(Math.random() * 20);

        if (opponent.isDefending) {
            return randomNumber < chanceMiss + 3
        }

        return randomNumber < chanceMiss
    }

    private incrementsRage(attacker: Character, opponent: Character): void {
        // Atualiza o rage do atacante
        attacker.rage += attacker.strength;

        // Atualiza o rage do oponente com um valor maior, mas de forma separada
        opponent.rage += attacker.strength * 2;

        if (this.rage >= 30) {
            this.rage = 30
            this.isPower = true
        }

        // Limita o rage do oponente também a 30, caso ele ultrapasse
        if (opponent.rage >= 30) {
            opponent.rage = 30;
            opponent.isPower = true
        }
    }

    punch(opponent: Character): string {

        if (this.calculateMissChance(opponent, this.attacks.punch.missChance)) {
            return `${this.name} errou o soco!`
        }

        const damageTaken = opponent.takeDamage(this.attacks.punch.damage);
        if (this.rage < 30) {
            this.incrementsRage(this, opponent)
        }

        return `${this.name} acertou um soco em ${opponent.name} e tirou um total de ${damageTaken} de hp!`
    }

    kick(opponent: Character): string {

        if (this.calculateMissChance(opponent, this.attacks.kick.missChance)) {
            return `${this.name} errou o chute!`
        }

        const damageTaken = opponent.takeDamage(this.attacks.kick.damage)
        this.incrementsRage(this, opponent)

        return `${this.name} acertou um chute em ${opponent.name} e retirou um total de ${damageTaken} de hp`
    }

    defenseAttack(opponent: Character): string {

        if (this.calculateMissChance(opponent, this.attacks.defend.missChance)) {
            return `${this.name} falhou ao tentar entrar em modo de defesa!`
        }

        this.isDefending = true

        return `${this.name} está em modo de defesa!`

    }

    superAttack(opponent: Character): string {

        if (this.rage < 30) {
            return `Rage não suficiente!`
        }

        if (this.calculateMissChance(opponent, this.attacks.super.missChance)) {
            this.rage = 0
            this.isPower = false
            return `${this.name} errou o super poder!`
        }

        const damageTaken = opponent.takeDamage(this.attacks.super.damage);
        this.rage = 0
        this.isPower = false
        this.incrementsRage(this, opponent)

        return `${this.name} acertou o seu super poder em ${opponent.name} e retirou um total de ${damageTaken} de hp!`
    }

    takeDamage(damage: number): number | string {

        let damageReceived: number;

        if (this.rage >= 30) {
            this.rage = 30
            this.isPower = true
        }

        if (this.isDefending) {
            damageReceived = damage / 5
            this.hp -= damage / 5
            this.isDefending = false
        } else {
            damageReceived = damage - (this.defense / 2)
            this.hp -= damageReceived
        }

        if (this.hp <= 0) {
            this.hp = 0
            this.isDefeated = true
            return `${this.name} foi derrotado!`
        }

        return damageReceived

    }


}