import { useContext, useRef } from "react";
import { TPoint } from "../types/Points";
import { EditorContext } from "./EditorContext";
import { useMouse } from "../hooks/useMouse";
import { getCssValue } from "../utils/cssValue";

const Point = ({
  point,
  onPointChange,
  onPointClick,
  isSelected = false,
}: {
  point: TPoint;
  onPointChange?: (delta: TPoint) => void;
  onPointClick?: (_event: React.MouseEvent) => void;
  onOutsideClick?: () => void;
  isSelected?: boolean;
}) => {
  const editorContext = useContext(EditorContext);
  const circleRef = useRef<SVGCircleElement>(null);

  const onClickedMouseMove = (_event: MouseEvent, mouseStart: TPoint) => {
    const x = _event.screenX;
    const y = _event.screenY;

    const relXMoved = (x - mouseStart.x) * editorContext.scaleRatio.x;
    const relYMoved = (y - mouseStart.y) * editorContext.scaleRatio.y;

    const delta = { x: relXMoved, y: relYMoved };

    if (onPointChange) onPointChange(delta);
  };

  const onMouseDown = useMouse(onClickedMouseMove);

  const pointColor = getCssValue("--point");
  const pointSelectedColor = getCssValue("--point-selected");

  return (
    <>
      <circle
        cx={point.x}
        cy={point.y}
        r={3 * editorContext.scaleRatio.x}
        stroke={isSelected ? pointSelectedColor : pointColor}
        className="point"
        strokeWidth={2 * editorContext.scaleRatio.x}
        fill="transparent"
        pointerEvents={"none"}
      />
      <circle
        ref={circleRef}
        cx={point.x}
        cy={point.y}
        r={6 * editorContext.scaleRatio.x}
        stroke="transparent"
        className="point"
        strokeWidth={2 * editorContext.scaleRatio.x}
        fill="transparent"
        pointerEvents={"all"}
        onMouseDown={onMouseDown}
        onClick={onPointClick}
        onMouseMove={(_event) => {
          _event.stopPropagation();
        }}
      />
    </>
  );
};

export default Point;
