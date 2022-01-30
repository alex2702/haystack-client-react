# Haystack Client (React)

This is a (work-in-progress) client/frontend implementation of Haystack, a multiplayer geography quiz game. 
It is implemented in TypeScript and the React framework. The UI is realized with
[Chakra UI](https://github.com/chakra-ui/chakra-ui).

Communication with the backend is realized with
[colyseus.js](https://docs.colyseus.io/colyseus/getting-started/javascript-client/) via Websockets.

The map view is realized with [Leaflet](https://github.com/Leaflet/Leaflet) and 
[react-leaflet](https://github.com/PaulLeCam/react-leaflet).

A running version of the game (with the initial [haystack-client](https://github.com/alex2702/haystack-client)) 
can be found at [haystack.axm.li](https://haystack.axm.li/).

For rules and features of the game, see
[haystack-server](https://github.com/alex2702/haystack-server#game-logic-and-features).

## Screenshots

![Lobby](/screenshot_lobby.png "Lobby")
![Solution of a Round](/screenshot_result.png "Solution of a Round")

## Known Issues

- The player list doesn't update right away after someone leaves the room.
- The scores table marks players that are not taking part in the current game (or have left the room) with "no guess".
  Instead, they shouldn't be included in the table at all.
- The countdown before a round is currently shown even for players that are waiting in the lobby and not taking part
  in the current game.
- The listener for the `player/finished` message is not yet implemented, which means that the player list isn't update
  after a player has made their guess.
- Some React components seem to render too often. Investigate with a tool like 
  [why-did-you-render](https://github.com/welldone-software/why-did-you-render).

## Running the Project

From create-react-app:

### `npm start`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. 
The page will reload if you make edits. You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode. See the section about 
[running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the 
build for the best performance. The build is minified and the filenames include the hashes. Your app is ready to be 
deployed! See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more 
information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will 
remove the single build dependency from your project. Instead, it will copy all the configuration files and the 
transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. 
All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. 
At this point you’re on your own. You don’t have to ever use `eject`. The curated feature set is suitable for small 
and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool 
wouldn’t be useful if you couldn’t customize it when you are ready for it.