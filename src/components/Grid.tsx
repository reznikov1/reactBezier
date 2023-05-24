import { useContext } from "react";
import { EditorContext } from "./EditorContext";
import { getCssValue } from "../utils/cssValue";

const Grid = () => {
  const editorBackground = getCssValue("--editor-background");
  const scaleText = getCssValue("--scale-text");
  const gridThickLine = getCssValue("--grid-thick-line");
  const gridThinLine = getCssValue("--grid-thin-line");
  const gridAxisLine = getCssValue("--grid-axis-line");

  const editorContext = useContext(EditorContext);

  const gridSize = editorContext.gridSize * editorContext.gridScale;

  return (
    <g pointerEvents="none">
      <rect
        className="background"
        x={editorContext.offset.x}
        y={editorContext.offset.y}
        width={editorContext.scale.x}
        height={editorContext.scale.y}
        fill={editorBackground}
        pointerEvents="none"
      />
      <g fill={gridThinLine} className="thin-lines">
        {[...Array(Math.ceil(editorContext.scale.x / gridSize)).keys()].map(
          (index) => {
            return (
              <rect
                className="horizontal-thin-line"
                key={index + "h"}
                x={editorContext.offset.x}
                y={
                  index * gridSize +
                  editorContext.offset.y -
                  (editorContext.offset.y % gridSize)
                }
                width={editorContext.scale.x}
                height={editorContext.scaleRatio.y}
              />
            );
          }
        )}
        {[...Array(Math.ceil(editorContext.scale.x / gridSize)).keys()].map(
          (index) => {
            return (
              <rect
                className="vertical-thin-line"
                key={index + "v"}
                y={editorContext.offset.y}
                x={
                  index * gridSize +
                  editorContext.offset.x -
                  (editorContext.offset.x % gridSize)
                }
                height={editorContext.scale.y}
                width={editorContext.scaleRatio.x}
              />
            );
          }
        )}
      </g>
      <g fill={gridThickLine} className="thick-lines">
        {[
          ...Array(Math.ceil(editorContext.scale.y / (gridSize / 2))).keys(),
        ].map((index) => {
          return (
            <rect
              className="horizontal-thick-line"
              key={index + "fh"}
              x={editorContext.offset.x}
              y={
                index * gridSize * 2 +
                editorContext.offset.y -
                (editorContext.offset.y % (gridSize * 2))
              }
              width={editorContext.scale.x}
              height={editorContext.scaleRatio.y}
            />
          );
        })}
        {[
          ...Array(Math.ceil(editorContext.scale.x / (gridSize / 2))).keys(),
        ].map((index) => {
          return (
            <rect
              className="vertical-thick-line"
              key={index + "fv"}
              y={editorContext.offset.y}
              x={
                index * (gridSize * 2) +
                editorContext.offset.x -
                (editorContext.offset.x % (gridSize * 2))
              }
              height={editorContext.scale.y}
              width={editorContext.scaleRatio.x}
            />
          );
        })}
      </g>
      <rect
        className="horizontal-axis"
        x={editorContext.offset.x}
        y={0}
        width={editorContext.scale.x}
        height={editorContext.scaleRatio.y * 1.5}
        fill={gridAxisLine}
      />
      <rect
        className="vertical-axis"
        x={0}
        y={editorContext.offset.y}
        height={editorContext.scale.y}
        width={editorContext.scaleRatio.x * 1.5}
        fill={gridAxisLine}
      />
      <rect
        className="horizontal-scale-background"
        x={editorContext.offset.x}
        y={editorContext.offset.y}
        width={editorContext.scale.x}
        height={25 * editorContext.scaleRatio.y}
        fill={editorBackground}
      />
      <rect
        className="vertical-scale-background"
        x={editorContext.offset.x}
        y={editorContext.offset.y}
        width={25 * editorContext.scaleRatio.x}
        height={editorContext.scale.y}
        fill={editorBackground}
      />
      {[...Array(Math.ceil(editorContext.scale.x / (gridSize / 2))).keys()].map(
        (index) => {
          return (
            <text
              className="horizontal-scale-number"
              y={editorContext.offset.y + 15 * editorContext.scaleRatio.y}
              key={index + "th"}
              x={
                index * gridSize * 2 +
                editorContext.offset.x -
                (editorContext.offset.x % (gridSize * 2)) -
                0.1
              }
              style={{ fontSize: 0.03 * editorContext.scale.x + "px" }}
              fill={scaleText}
            >
              {(index +
                (editorContext.offset.x > 0
                  ? Math.floor(editorContext.offset.x / (gridSize * 2))
                  : Math.ceil(editorContext.offset.x / (gridSize * 2)))) *
                2 *
                editorContext.gridScale}
            </text>
          );
        }
      )}
      {[...Array(Math.ceil(editorContext.scale.y / (gridSize / 2))).keys()].map(
        (index) => {
          return (
            <text
              className="vertical-scale-number"
              x={editorContext.offset.x + 8 * editorContext.scaleRatio.x}
              key={index + "tv"}
              y={
                index * gridSize * 2 +
                editorContext.offset.y -
                (editorContext.offset.y % (gridSize * 2)) +
                0.1
              }
              style={{ fontSize: 0.03 * editorContext.scale.x + "px" }}
              fill={scaleText}
            >
              {(index +
                (editorContext.offset.y > 0
                  ? Math.floor(editorContext.offset.y / (gridSize * 2))
                  : Math.ceil(editorContext.offset.y / (gridSize * 2)))) *
                -2 *
                editorContext.gridScale}
            </text>
          );
        }
      )}
    </g>
  );
};

export default Grid;
