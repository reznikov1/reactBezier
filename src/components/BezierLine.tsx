import {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { TBezierPoint, TPoint } from "../types/Points";
import BezierPoint from "./BezierPoint";
import { VectorOperations as Utils } from "../utils/VectorOperations";
import { PointsFactory } from "../utils/PointsFactory";

import { EditorContext } from "./EditorContext";
import { useKeyDown } from "../hooks/useKey";
import { getCssValue } from "../utils/cssValue";

const BezierLine = forwardRef(function (props, ref) {
  const editorContext = useContext(EditorContext);

  const lineColor = getCssValue("--line");

  useImperativeHandle(ref, () => ({
    getPoints() {
      return getPointsAsArray();
    },
    deselectAll,
    onDeletePress,
    onAddPress,
  }));

  const [points, setPoints] = useState<TBezierPoint[]>(
    PointsFactory.createDefaultPoints()
  );

  useEffect(() => {
    const newPoints = points.map((point, i) => {
      return point;
    });
    setPoints(newPoints);
  }, []);

  const onAddPress = () => {
    let leftPoint = null;
    const newPoints: TBezierPoint[] = [];
    for (let i = 0; i < points.length; i++) {
      let point = points[i];
      if (point.isSelected) {
        if (leftPoint === null) {
          leftPoint = points[i];
        } else {
          const newPointPosition = Utils.getPointBetween(
            leftPoint.position,
            point.position
          );
          newPoints.push({
            position: newPointPosition,
            isSelected: false,
            handlerPosition: Utils.add(newPointPosition, 1, 0),
          });
          leftPoint = points[i];
        }
      } else {
        leftPoint = null;
      }
      newPoints.push(point);
    }
    setPoints(newPoints);
  };

  const onDeletePress = () => {
    const newPoints = points.filter((point, index) => {
      return !point.isSelected || index === 0 || index == points.length - 1;
    });
    setPoints(newPoints);
  };

  useKeyDown(onAddPress, ["a"]);
  useKeyDown(onDeletePress, ["d"]);

  const getPointsAsArray = () => {
    return points
      .map((point) => [
        point.position.x,
        -point.position.y,
        point.handlerPosition.x,
        -point.handlerPosition.y,
      ])
      .reduce((arr, mainarr) => arr.concat(mainarr), []);
  };

  const onPointChange = (delta: TPoint, index: number) => {
    const newPoints = points.map((point, i) => {
      if (i === index) {
        let newPositionX = point.position.x + delta.x;
        let newPositionY = point.position.y + delta.y;
        //snapping
        if (
          (Math.abs(Math.round(newPositionX) - newPositionX) *
            (editorContext.gridSize) /2) < 0.1 &&
          (Math.abs(Math.round(newPositionY) - newPositionY) *
            (editorContext.gridSize) /2) < 0.1
        ) {
          newPositionX = Math.round(newPositionX);
          newPositionY = Math.round(newPositionY);
        }

        const actualXDelta = newPositionX - point.position.x;
        const actualYDelta = newPositionY - point.position.y;

        return {
          position: { x: newPositionX, y: newPositionY },
          handlerPosition: {
            x: point.handlerPosition.x + actualXDelta,
            y: point.handlerPosition.y + actualYDelta,
          },
          isSelected: point.isSelected,
        };
      }

      return point;
    });
    setPoints(newPoints);
  };

  const onHandlePointChange = (delta: TPoint, index: number) => {
    const newPoints = points.map((point, i) => {
      if (i === index) {
        return {
          position: point.position,
          isSelected: false,
          handlerPosition: Utils.sum(point.handlerPosition, delta),
        };
      }
      return point;
    });
    setPoints(newPoints);
  };

  const buildCurve = useCallback(() => {
    return ` M ${points[0].position.x} ${points[0].position.y} C ${
      points[0].handlerPosition.x
    } ${points[0].handlerPosition.y}, ${points[1].handlerPosition.x} ${
      points[1].handlerPosition.y
    } ${points[1].position.x} ${points[1].position.y}${points
      .slice(2)
      .map(
        (point) =>
          ` S ${point.handlerPosition.x} ${point.handlerPosition.y}, ${point.position.x} ${point.position.y}`
      )}`;
  }, [points]);

  const onPointClick = (index: number, _event: React.MouseEvent) => {
    _event.stopPropagation();
    const newPoints = points.map((point, i) => {
      if (i === index) {
        point.isSelected = true;
      }
      return point;
    });
    setPoints(newPoints);
  };

  const deselectAll = () => {
    const newPoints = points.map((point, i) => {
      point.isSelected = false;

      return point;
    });
    setPoints(newPoints);
  };

  return (
    <>
      <path
        strokeWidth={1 * editorContext.scaleRatio.x}
        strokeLinecap="round"
        fill="none"
        pointerEvents="none"
        stroke={lineColor}
        d={buildCurve()}
      />
      {points.map((point, index) => (
        <BezierPoint
          key={"point" + index}
          point={point.position}
          handlePoint={point.handlerPosition}
          onPointChange={(delta) => {
            onPointChange(delta, index);
          }}
          isSelected={point.isSelected}
          onPointClick={(_event: React.MouseEvent) => {
            onPointClick(index, _event);
          }}
          onHandleChange={(delta) => {
            onHandlePointChange(delta, index);
          }}
        />
      ))}
    </>
  );
});

export default BezierLine;
