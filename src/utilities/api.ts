import {Client} from "colyseus.js";

export async function joinRoom(
    rejoin: boolean, roomId: string, sessionId: string, playerName: string, client: Client
) {
    if(rejoin && roomId && sessionId && client) {
        try {
            let room = await client.reconnect(roomId, sessionId);
            return { message: "rejoined", room: room };
        } catch (e) {
            // error, try joining anew
            try {
                let room = await client.joinById(roomId, {
                    playerName: playerName
                });

                return { message: "joinedWithNewUser", room: room };
            } catch (e: any) {
                // specific message if room was not found
                if(e.code === 4212) {
                    return { message: "roomNotFound" };
                } else if(e.code === 400 && e.message === "usernameTaken") { // username taken
                    return { message: "usernameTaken" };
                } else {
                    return { message: e };
                }
            }
        }
    } else if(!rejoin && roomId && playerName && client) {
        try {
            let room = await client.joinById(roomId, {
                playerName: playerName
            });

            return { message: "joined", room: room };
        } catch (e: any) {
            // specific message if room was not found
            if(e.code === 4212) {
                return { message: "roomNotFound" };
            } else if(e.code === 400 && e.message === "usernameTaken") { // username taken
                return { message: "usernameTaken" };
            } else {
                return { message: e };
            }
        }
    }
}

export async function createRoom(playerName: string, client: Client) {
    try {
        let room = await client.create("haystack_room", {
            playerName: playerName
        });

        return { message: "created", room: room };
    } catch (e) {
        return { message: e };
    }
}