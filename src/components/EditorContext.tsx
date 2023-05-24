import { createContext } from "react";

export const EditorContext = createContext({
    scale: {x: 0, y: 0},
    sizes: {x: 0, y: 0},
    offset: {x: 0, y: 0},
    windowOffset: {x: 0, y: 0},
    scaleRatio: {x: 0, y: 0},
    gridScale: 0.5,
    gridSize: 0.5
});