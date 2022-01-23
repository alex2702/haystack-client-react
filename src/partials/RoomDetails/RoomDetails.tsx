import React from "react";
import {HaystackCard} from "../../components/HaystackCard/HaystackCard";
import {
    IoCopy,
    IoGlobeOutline,
    IoInformationCircle,
    IoLocationSharp,
    IoReload,
    IoShareSocial,
    IoStopwatchOutline
} from "react-icons/io5";
import {Box, Button, IconButton, Link, Tooltip, useClipboard} from "@chakra-ui/react";
import {IRoomDetailsProps} from "./IRoomDetailsProps";
import {HaystackActions} from "../../components/Actions/HaystackActions";
import {matchPath, useLocation} from "react-router-dom";

export const RoomDetails = (props: IRoomDetailsProps) => {
    const adminButtonProps = {
        admin: "true"
    }

    const { hasCopied, onCopy } = useClipboard(window.location.href)

    const { pathname } = useLocation()
    const matchNotLobby = !matchPath({ path: "/room/:roomId/lobby" }, pathname)

    const onShare = () => {
        const shareData = {
            title: "Haystack",
            text: "Join a game of Haystack",
            url: `${window.location.protocol}//${window.location.host}/room/${props.roomId}`,
        }
        navigator.share(shareData)
    }

    return (
        <>
            <HaystackCard title="Game">
                <Box display="flex" alignItems="center" py={2}>
                    <Box color="gray.600"><IoGlobeOutline size="1.5em" /></Box>

                    <Link
                        color="haystack.600"
                        ml={2}
                        href={`/room/${props.roomId}`}
                        isExternal>/room/{props.roomId}</Link>

                    <Box marginLeft="auto">
                        <Tooltip label="Copied" placement="top" isOpen={hasCopied}>
                            <IconButton
                                aria-label="Copy Room Link"
                                icon={<IoCopy />}
                                onClick={onCopy}
                                size="sm"
                                variant="ghost"
                                ml={2}
                            />
                        </Tooltip>

                        <IconButton
                            aria-label="Share Room Link"
                            icon={<IoShareSocial />}
                            onClick={onShare}
                            size="sm"
                            variant="ghost"
                            ml={2}
                        />
                    </Box>

                </Box>

                <Box display="flex" alignItems="center" py={2}>
                    <Box color="gray.600"><IoReload size="1.5em" /></Box>
                    <Box ml={2}>{props.settingRounds} rounds</Box>
                </Box>

                <Box display="flex" alignItems="center" py={2}>
                    <Box color="gray.600"><IoLocationSharp size="1.5em" /></Box>
                    <Box ml={2}>
                        {props.settingLocationSetAvailable.get(props.settingLocationSet)?.group} –
                        {props.settingLocationSetAvailable.get(props.settingLocationSet)?.name}
                    </Box>
                    <Box marginLeft="auto">
                        <Tooltip
                            label={props.settingLocationSetAvailable.get(props.settingLocationSet)?.info}
                            placement="top"
                            shouldWrapChildren={true}>
                            <Box color="gray.600"><IoInformationCircle size="1.5em" /></Box>
                        </Tooltip>
                    </Box>
                </Box>

                <Box display="flex" alignItems="center" py={2}>
                    <Box color="gray.600"><IoStopwatchOutline size="1.5em" /></Box>
                    <Box ml={2}>{props.settingTimeLimit} seconds</Box>
                </Box>

                {matchNotLobby && props.gameActive &&
                    <HaystackActions userIsAdmin={props.userIsAdmin}>
                        <Button onClick={props.cancelGame} {...adminButtonProps}>Cancel</Button>
                    </HaystackActions>
                }
            </HaystackCard>
        </>
    )
}