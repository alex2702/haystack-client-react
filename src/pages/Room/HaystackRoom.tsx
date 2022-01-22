import React from "react";
import {Route, Routes} from "react-router-dom";

export const HaystackRoom = () => {
    return (
        <Routes>
            <Route path="/" element={<div>/room</div>} />
            <Route path="/create" element={<div>/room/create</div>} />
        </Routes>
    )
}