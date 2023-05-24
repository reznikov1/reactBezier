import { useContext } from "react";
import { TPoint } from "../types/Points";
import Point from "./Point";
import { EditorContext } from "./EditorContext";
import { getCssValue } from "../utils/cssValue";

const BezierPoint = ({
  point,
  handlePoint,
  onPointChange,
  onHandleChange,
  onPointClick,
  isSelected = false,
}: {
  point: TPoint;
  handlePoint: TPoint;
  onPointChange: (point: TPoint) => void;
  onHandleChange: (point: TPoint) => void;
  onPointClick: (_event: React.MouseEvent) => void;
  isSelected: boolean;
}) => {
  const editorContext = useContext(EditorContext);

  const handlerLineColor = getCssValue("--handler-line");

  const secondHandlePoint = {
    x: 2 * point.x - handlePoint.x,
    y: 2 * point.y - handlePoint.y,
  };

  const onSecondHandleChange = (delta: TPoint) => {
    onHandleChange({ x: -delta.x, y: -delta.y });
  };

  return (
    <>
      <line
        strokeWidth={1 * editorContext.scaleRatio.x}
        strokeLinecap="round"
        fill="transparent"
        stroke={handlerLineColor}
        x1={point.x}
        y1={point.y}
        x2={handlePoint.x}
        y2={handlePoint.y}
      />
      <line
        strokeWidth={1 * editorContext.scaleRatio.x}
        strokeLinecap="round"
        fill="transparent"
        stroke={handlerLineColor}
        x1={point.x}
        y1={point.y}
        x2={secondHandlePoint.x}
        y2={secondHandlePoint.y}
      />
      <Point
        point={point}
        onPointChange={onPointChange}
        onPointClick={onPointClick}
        isSelected={isSelected}
      />
      <Point point={handlePoint} onPointChange={onHandleChange} />
      <Point point={secondHandlePoint} onPointChange={onSecondHandleChange} />
    </>
  );
};

export default BezierPoint;
