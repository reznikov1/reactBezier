import { useEffect, useState } from "react";
import { TPoint } from "../types/Points";

export const useMouse = (
  onMouseMoveCallback: (_event: MouseEvent, movingStartPoint: TPoint) => void,
  onPointClick?: (_event: React.MouseEvent) => void
) => {
  const [movingStartPoint, setMovingStartPoint] = useState<TPoint>({
    x: 0,
    y: 0,
  });

  const [isMovingStarted, setIsMovingStarted] = useState<boolean>(false);

  const onMouseDown = (_event: React.MouseEvent) => {
    _event.stopPropagation();
    if (onPointClick) {
      onPointClick(_event);
    }
    if (!isMovingStarted) {
      setIsMovingStarted(true);
      setMovingStartPoint({
        x: _event.screenX,
        y: _event.screenY,
      });
    }
  };

  useEffect(() => {
    const onViewMouseUp = (_event: MouseEvent) => {
      setIsMovingStarted(false);
    };

    const onViewMouseMove = (_event: MouseEvent) => {
      if (isMovingStarted) {
        onMouseMoveCallback(_event, movingStartPoint);
      }
    };
    if (isMovingStarted) {
      window.addEventListener("mousemove", onViewMouseMove);
      window.addEventListener("mouseup", onViewMouseUp);
    } else {
      window.removeEventListener("mousemove", onViewMouseMove);
      window.removeEventListener("mouseup", onViewMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", onViewMouseMove);
      window.removeEventListener("mouseup", onViewMouseUp);
    };
  }, [isMovingStarted, setIsMovingStarted]);

  return onMouseDown;
};
