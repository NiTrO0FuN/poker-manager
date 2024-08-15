import { computed, ref, reactive } from "vue";
import { Ref, Reactive } from "vue";

import { TableLayout, TableShape } from "./TableLayout";

export class Game {
  layout: TableLayout;

  blinds: Reactive<Map<Blind, number>> = reactive(new Map<Blind, number>());
  players: Reactive<Map<number, Player>> = reactive(new Map<number, Player>());
  hasPlayed: Reactive<Map<number, boolean>> = reactive(new Map<number, boolean>());
  activeSeat: Ref<number> = ref(0);

  step: Ref<GameStep> = ref(GameStep.PlayerSelection);

  blindAmount: Ref<number> = ref(0);
  callAmount: Ref<number> = ref(0);
  currentBet: Ref<number> = ref(0);
  pot: Ref<number> = ref(0);

  constructor(layout: TableLayout) {
    this.layout = layout;
  }

  #chooseBlinds() {
    let smallBlind = this.#nextPlayerSeat(this.activeSeat.value);
    let bigBlind = this.#nextPlayerSeat(smallBlind);
    this.blinds.set(Blind.Small, smallBlind);
    this.blinds.set(Blind.Big, bigBlind);
  }

  #resetRound() {
    this.hasPlayed.clear();
    this.players.forEach((player, _) => (player.betAmount = 0));
    this.callAmount.value = 0;
    this.currentBet.value = 0;
    this.activeSeat.value = this.#nextPlayerSeat(this.blinds.get(Blind.Big) as number);
  }

  #playerSelectionStep() {
    if (this.players.size < 3) return;
    this.step.value = GameStep.StartingSelection;
  }

  #startingSelectionStep() {
    if (this.activeSeat.value == 0) return; // Did not choose a dealer
    this.#chooseBlinds();
    this.activeSeat.value = this.#nextPlayerSeat(this.blinds.get(Blind.Big) as number);
    this.step.value = GameStep.BlindSelection;
  }

  #blindSelectionStep() {
    let blind = this.blindAmount.value;
    let smallBlindSeat = this.blinds.get(Blind.Small);
    let bigBlindSeat = this.blinds.get(Blind.Big);
    if (!(smallBlindSeat && bigBlindSeat)) return;

    let smallBlind = this.players.get(smallBlindSeat);
    let bigBlind = this.players.get(bigBlindSeat);
    if (!(smallBlind && bigBlind)) return;

    smallBlind.betAmount = blind;
    bigBlind.betAmount = blind * 2;
    this.pot.value = blind * 3;
    this.callAmount.value = blind * 2;
    this.step.value = GameStep.InGame;
  }

  #gameStep() {
    let player = this.players.get(this.activeSeat.value);
    if (!player || this.currentBet.value < this.amountToCall.value) return;

    this.hasPlayed.set(this.activeSeat.value, true);
    player.betAmount += this.currentBet.value;
    this.pot.value += this.currentBet.value;
    this.callAmount.value = Math.max(this.callAmount.value, player.betAmount);
    this.activeSeat.value = this.#nextPlayerSeat(this.activeSeat.value);

    if (this.hasPlayed.get(this.activeSeat.value) && this.amountToCall.value == 0) {
      this.#resetRound();
    }
  }

  #nextPlayerSeat(seat: number): number {
    let nextSeat = seat;
    do {
      nextSeat = (nextSeat % this.playerNumber()) + 1;
    } while (!this.players.has(nextSeat) || this.players.get(nextSeat)?.folded);
    return nextSeat;
  }

  playerNumber(): number {
    return this.layout.shape == TableShape.Rectangle
      ? this.layout.size.x * 2 + this.layout.size.y * 2
      : this.layout.size.x;
  }

  info = computed(() => {
    return this.step.value == GameStep.PlayerSelection
      ? "game.select_players"
      : this.step.value == GameStep.StartingSelection
      ? "game.select_dealer"
      : this.step.value == GameStep.BlindSelection
      ? "game.select_blind"
      : this.step.value == GameStep.InGame
      ? "game.insert_bet"
      : this.step.value == GameStep.Ended
      ? "game.ended"
      : "";
  });

  amountToCall = computed(() => {
    let player = this.players.get(this.activeSeat.value);
    if (!player) return 0;
    return Math.max(this.callAmount.value - player.betAmount, 0);
  });

  togglePlayer(seat: number) {
    if (!this.players.delete(seat)) {
      this.players.set(seat, new Player());
    }
  }

  fold() {
    let player = this.players.get(this.activeSeat.value);
    if (!player) return;
    player.folded = true;

    if ([...this.players.values()].every((player) => player.folded)) {
      this.step.value = GameStep.Ended;
      return;
    }
    this.activeSeat.value = this.#nextPlayerSeat(this.activeSeat.value);

    if (this.hasPlayed.get(this.activeSeat.value) && this.amountToCall.value == 0) {
      this.#resetRound();
    }
  }

  nextStep() {
    if (this.step.value == GameStep.PlayerSelection) {
      this.#playerSelectionStep();
    } else if (this.step.value == GameStep.StartingSelection) {
      this.#startingSelectionStep();
    } else if (this.step.value == GameStep.BlindSelection) {
      this.#blindSelectionStep();
    } else if (this.step.value == GameStep.InGame) {
      this.#gameStep();
    }
  }
}

export class Player {
  betAmount: number = 0;
  folded: boolean = false;
}

export enum Blind {
  Small,
  Big,
}

export enum GameStep {
  PlayerSelection,
  StartingSelection,
  BlindSelection,
  InGame,
  Ended,
}
