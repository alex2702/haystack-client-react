import React from "react";
import './RoomMembers.scss';
import {HaystackCard} from "../../components/HaystackCard/HaystackCard";
import {Avatar, AvatarBadge, Badge, Box, Tooltip} from "@chakra-ui/react";
import { IoCheckmarkCircle } from "react-icons/io5";
import {Player} from "../../models/Player";
import {IRoomMembersProps} from "./IRoomMembersProps"

const RoomMembers = (props: IRoomMembersProps) => {
    function getAvatar(pl: any) {
        let badgeColor = "green.500"
        let tooltip = ""

        if(props.gameActive && !pl.inGame && !pl.disconnectedCurrently) {
            badgeColor = "yellow.600"
            tooltip = "connected but not playing right now"
        }

        if(pl.disconnectedCurrently) {
            badgeColor = "red.600"
            tooltip = "disconnected"
        }

        // calculate avatar font color
        const avatarColor = [
            parseInt(pl.color.substring(0, 2), 16) / 255,
            parseInt(pl.color.substring(2, 4), 16) / 255,
            parseInt(pl.color.substring(4, 6), 16) / 255
        ]
        let cols = avatarColor.map((c) => {
            if(c <= 0.03928) {
                return c/12.92
            }
            return Math.pow((c + 0.055) / 1.055, 2.4)
        })
        let luminance = (0.2126 * cols[0]) + (0.7152 * cols[1]) + (0.0722 * cols[2])

        return (
            <Tooltip label={tooltip} placement="top" isDisabled={tooltip.length === 0}>
                <Avatar
                    name={pl.name}
                    bg={`#${pl.color}`}
                    color={luminance > 0.19 ? "black" : "white"}
                    h={9}
                    w={9}
                    size="md"
                    fontWeight="bold"
                    getInitials={((name: string) => name.slice(0, 1).toUpperCase())}
                >
                    <AvatarBadge boxSize="0.9em" bg={badgeColor} />
                </Avatar>
            </Tooltip>
        )
    }

    return (
        <>
            <HaystackCard title="Players">
                {
                    Array.from(props.players, ([name, value]) => (value))
                        .map((pl: Player) => {
                            return (
                                <Box className="hs-room-player" key={pl.id} display="flex" flexDir="row" alignItems="center" mb={3}>
                                    {getAvatar(pl)}

                                    <Box ml={2} color={pl.disconnectedCurrently ? "gray.400" : ""}>{pl.name}</Box>

                                    {pl.admin && <Badge ml={2} variant="solid">Admin</Badge>}

                                    {pl.roundDone && pl.inGame &&
                                        <Box display="flex" flex="auto" justifyContent="end">
                                            <IoCheckmarkCircle color="var(--chakra-colors-green-500)" size="1.5em"/>
                                        </Box>
                                    }

                                    {props.solveMode && !pl.roundDone && pl.inGame &&
                                    <Box display="flex" flex="auto" justifyContent="end">
                                        <IoCheckmarkCircle color="var(--chakra-colors-red-500)" size="1.5em"/>
                                    </Box>
                                    }
                                </Box>
                            )
                        })
                }
            </HaystackCard>
        </>
    )
}

RoomMembers.whyDidYouRender = true
export { RoomMembers }