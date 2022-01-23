import * as React from "react";
import {Player} from "../models/Player";
import {Client, Room} from "colyseus.js";
import * as Colyseus from "colyseus.js";
import {LocationSet} from "../models/LocationSet";
import deepEqual from "deep-equal";

// TYPES
type Settings = {
    settingRounds: number,
    settingLocationSet: string,
    settingTimeLimit: number
}

type Action =
    {
        type: 'setRoom',
        room: Room
    } |
    {type: 'setAdmin', value: boolean} |
    {type: 'setSettingRounds', settingRounds: number} |
    {type: 'setSettingLocationSet', settingLocationSet: string} |
    {type: 'setSettingTimeLimit', settingTimeLimit: number} |
    {type: 'setSettings', settings: Settings} |
    {type: 'incrementRound'} |
    {type: 'resetRounds'} |
    {type: 'setPlayer', player: Player} |
    {type: 'removePlayer', player: Player} |
    {type: 'setTimeout', timeout: number}

type Dispatch = (action: Action) => void

type Game = {
    client: Client,
    room: Room | undefined,
    players: Map<string, Player>,
    isAdmin: boolean,
    settingRounds: number,
    settingLocationSet: string,
    settingLocationSetAvailable: Map<string, LocationSet>,
    settingTimeLimit: number,
    currentRound: number,
    timeout: number
}
type GameProviderProps = {children: React.ReactNode}

// DEFAULT VALUE
const defaultGame = {
    client: new Colyseus.Client('ws://localhost:2567'),
    room: undefined,
    isAdmin: false,
    players: new Map<string, Player>(),
    settingRounds: 4,
    settingLocationSet: 'C_WW',
    settingLocationSetAvailable: new Map<string, LocationSet>([
        ["C_WW", new LocationSet("C_WW", "Worldwide", "Cities", "No info")],
        ["C_EU", new LocationSet("C_EU", "Europe", "Cities", "No info")],
        ["S_EU", new LocationSet("S_EU", "Europe", "Football Stadiums", "No info")],
        ["S_DE", new LocationSet("S_DE", "Germany", "Football Stadiums", "No info")]
    ]),// TODO send along with game/started message from backend
    settingTimeLimit: 30,
    currentRound: 0,
    timeout: 0
}

export const GameContext = React.createContext<{
    game: Game,
    dispatchGame: Dispatch
}>({
    game: defaultGame,
    dispatchGame: () => {}
})

function gameReducer(game: Game, action: Action): Game {
    switch (action.type) {
        case 'setRoom': {
            if(action.room === game.room) return game   // TODO equality check may not be working properly => deepEqual?
            return ({ ...game, ...({ room: action.room }) })
        }
        case 'setAdmin': {
            if(action.value === game.isAdmin) return game
            return ({ ...game, ...({ isAdmin: action.value }) })
        }
        case 'setSettingRounds': {
            if(action.settingRounds === game.settingRounds) return game
            return ({ ...game, ...({ settingRounds: action.settingRounds }) })
        }
        case 'setSettingLocationSet': {
            if(action.settingLocationSet === game.settingLocationSet) return game
            return ({ ...game, ...({ settingLocationSet: action.settingLocationSet }) })
        }
        case 'setSettingTimeLimit': {
            if(action.settingTimeLimit === game.settingTimeLimit) return game
            return ({ ...game, ...({ settingTimeLimit: action.settingTimeLimit }) })
        }
        case 'setSettings': {
            if(
                action.settings.settingRounds === game.settingRounds &&
                action.settings.settingLocationSet === game.settingLocationSet &&
                action.settings.settingTimeLimit === game.settingTimeLimit
            ) {
                return game
            }
            return (
                {
                    ...game,
                    ...({settingRounds: action.settings.settingRounds}),
                    ...({settingLocationSet: action.settings.settingLocationSet}),
                    ...({settingTimeLimit: action.settings.settingTimeLimit})
                }
            )
        }
        case 'incrementRound': { return ({ ...game, ...({ currentRound: game.currentRound + 1 }) }) }
        case 'resetRounds': {
            if(game.currentRound === 0) return game
            return ({ ...game, ...({ currentRound: 0 }) })
        }
        case 'setPlayer': {
            const oldPlayers = new Map(game.players)
            const newPlayers = game.players.set(action.player.id!, action.player)
            if(deepEqual(oldPlayers, newPlayers)) { return game }
            return ({ ...game, ...({ players: newPlayers }) })
        }
        case 'removePlayer': {
            const oldPlayers = new Map(game.players)
            const newPlayers = new Map(game.players)
            newPlayers.delete(action.player.id!)
            if(deepEqual(oldPlayers, newPlayers)) return game
            return ({ ...game, ...({ players: newPlayers }) })
        }
        case 'setTimeout': {
            if(action.timeout === game.timeout) return game
            return ({ ...game, ...({ timeout: action.timeout }) })
        }
        default: {
            throw new Error(`Unhandled action: ${action}`)
        }
    }
}

export default function GameProvider({children}: GameProviderProps) {
    const [game, dispatchGame] = React.useReducer(gameReducer, defaultGame)
    const value = {game, dispatchGame}
    return (
        <GameContext.Provider value={value}>{children}</GameContext.Provider>
    )
}

export function useGame() {
    const context = React.useContext(GameContext)

    if (context === undefined) {
        throw new Error('useCount must be used within a CountProvider')
    }

    return context
}