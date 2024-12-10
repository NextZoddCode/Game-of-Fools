import Character from "./Character"

export default class ChangeTurn {

    private currentPlayer: Character
    private character1: Character
    private character2: Character

    constructor(character1: Character, character2: Character) {
        this.character1 = character1
        this.character2 = character2
        this.currentPlayer = character1.speed > character2.speed ? character1 : character2
    }

    get getCurrentPlayer(): Character {
        return this.currentPlayer
    }

    nextTurn() {
        this.currentPlayer = this.currentPlayer === this.character1 ? this.character2 : this.character1
    }

}