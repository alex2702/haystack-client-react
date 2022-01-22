import React from "react";
import {Home} from "../pages/Home/Home";
import {
    MemoryRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import {ChakraProvider, Container} from "@chakra-ui/react";
import {HaystackTheme} from "./HaystackTheme";
import {HaystackRoom} from "../pages/Room/HaystackRoom";
import {Header} from "../components/Header/Header";

function App() {
    return (
        <ChakraProvider theme={HaystackTheme}>
            <Router initialEntries={[window.location.pathname]}>
                <Container maxW="container.xl" display="flex" flexDir="column" p={{ base: 2, sm: 4 }}>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/room/*" element={<HaystackRoom />} />
                    </Routes>
                </Container>
            </Router>
        </ChakraProvider>
    );
}

export default App;