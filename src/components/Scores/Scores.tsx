import {IScoresProps} from "./IScoresProps";
import {Badge, Table, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import React from "react";
import {Player} from "../../models/Player";

export const Scores = (props: IScoresProps) => {
    return (
        <Table variant="simple" width={{ base: "100%", md: "xl" }} m="auto">
            <Thead>
                <Tr>
                    <Th />
                    <Th />
                    <Th />
                    <Th />
                </Tr>
            </Thead>
            <Tbody>
                {
                    Array.from(props.players, ([name, value]) => (value))
                        .sort((a:any, b:any) => (a.score < b.score) ? 1 : (a.lastScore < b.lastScore) ? 1 : -1)
                        .map((player: Player, index: number) => {
                            return (
                                <Tr key={player.id}>
                                    <Td>{index+1}</Td>
                                    <Td px={{ base: 2, md: 6 }} py={{ base: 2, md: 4 }}>
                                        {player.name}
                                        {player.lastDistance &&
                                            <Badge ml={2}>{Math.floor(player.lastDistance).toLocaleString(window.navigator.language)} km</Badge>
                                        }
                                        {player.lastTimeNeeded &&
                                            <Badge ml={2} variant="outline">{Number((player.lastTimeNeeded/1000).toPrecision(2)).toLocaleString(window.navigator.language)} secs</Badge>
                                        }
                                        {!player.lastDistance &&
                                            <Badge ml={2}>no guess</Badge>
                                        }
                                    </Td>
                                    <Td isNumeric>{player.lastScore && `+${player.lastScore.toLocaleString(window.navigator.language)}`}</Td>
                                    <Td fontWeight="bold"
                                        isNumeric>{player.score.toLocaleString(window.navigator.language)}</Td>
                                </Tr>
                            )
                        })
                }
            </Tbody>
        </Table>
    )
}