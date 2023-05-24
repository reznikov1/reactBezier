import { useRef, useState } from "react";
import { IBezierLineInterface, TPoint } from "../types/Points";
import normalizeWheel from "normalize-wheel";
import BezierLine from "./BezierLine";
import { EditorContext } from "./EditorContext";
import Grid from "./Grid";
import { useMouse } from "../hooks/useMouse";
import { VectorOperations as Utils } from "../utils/VectorOperations";

const BezierEditor = function () {
  const lineRef = useRef<IBezierLineInterface>(null!);

  const editor = useRef<HTMLDivElement>(null);
  const gridSize = 1;
  const [width, height] = [500, 500];
  const [scale, setScale] = useState<TPoint>({ x: 20, y: 20 });
  const [gridScale, setGridScale] = useState<number>(1);
  const [output, setOutput] = useState<number[]>([]);
  const [offset, setOffset] = useState<TPoint>({ x: -2, y: -12 });
  const scaleRatio: TPoint = { x: scale.x / width, y: scale.y / height };

  const onWheel = (_event: React.WheelEvent<HTMLDivElement>) => {
    const normalized = normalizeWheel(_event);

    let newScale = {
      x: Math.max(scale.x + normalized.spinY * 2,1),
      y: Math.max(scale.y + normalized.spinY * 2,1)
    };
    const x = (_event.screenX - (editor.current?.offsetLeft || 0)) / width;
    const y = (_event.screenY - (editor.current?.offsetTop || 0)) / height;

    setScale(Utils.clampNegative(newScale));

    if (newScale.x < 10) {
      setGridScale(0.5);
    } else {
      setGridScale(Math.ceil(newScale.x / 20));
    }

    setOffset({
      x: offset.x - x * Math.sign(normalized.spinY),
      y: offset.y - y * Math.sign(normalized.spinY),
    });
  };

  const onMouseMove = (_event: MouseEvent, mouseStart: TPoint) => {
    const x = _event.screenX;
    const y = _event.screenY;

    const relXMoved = (x - mouseStart.x) * scaleRatio.x;
    const relYMoved = (y - mouseStart.y) * scaleRatio.y;

    setOffset({ x: offset.x - relXMoved, y: offset.y - relYMoved });
  };

  const onPointClick = () => {
    lineRef.current.deselectAll();
  };

  const onAddClick = (_event: React.MouseEvent) => {
    _event.stopPropagation();
    lineRef.current.onAddPress();
  };

  const onDelClick = (_event: React.MouseEvent) => {
    _event.stopPropagation();
    lineRef.current.onDeletePress();
  };

  const onMouseDown = useMouse(onMouseMove);

  const onExportClick = () => {
    setOutput(lineRef.current.getPoints());
  };
  return (
    <div className="bezier-editor-container">
      <div>
        <div
          className="bezier-editor"
          ref={editor}
          onClick={onPointClick}
          onWheel={onWheel}
          onMouseDown={onMouseDown}
        >
          <div className="action-buttons-container">
            <button className="action-button" onClick={onAddClick}>
              Add
            </button>
            <button className="action-button" onClick={onDelClick}>
              Del
            </button>
          </div>
          <svg
            className="bezier-editor-svg"
            width={width + "px"}
            height={height + "px"}
            viewBox={`${offset.x} ${offset.y} ${scale.x} ${scale.y}`}
            xmlns="http://www.w3.org/2000/svg"
            pointerEvents="none"
          >
            <EditorContext.Provider
              value={{
                scale: scale,
                sizes: { x: width, y: height },
                scaleRatio: scaleRatio,
                windowOffset: {
                  x: editor.current?.offsetLeft || 0,
                  y: editor.current?.offsetTop || 0,
                },
                offset: offset,
                gridScale: gridScale,
                gridSize: gridSize,
              }}
            >
              <Grid />
              <BezierLine ref={lineRef} />
            </EditorContext.Provider>
          </svg>
        </div>
        <div className="output">
          <button className="action-button" onClick={onExportClick}>
            Export
          </button>
          <div className="output-text">
            {"[" + output.map((val) => val.toFixed(2)).join(", ") + "]"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BezierEditor;
