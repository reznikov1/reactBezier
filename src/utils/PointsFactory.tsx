import { TBezierPoint } from "../types/Points";

const createDefaultPoints = (): TBezierPoint[] => {
  return [
    createPoint(0, 0, 0, -1),
    createPoint(3, -3, 1, -3),
    createPoint(6, 2, 4, 2),
  ];
};

const createPointsFromString = (points: number[]): TBezierPoint[] => {
  if (points.length % 4 !== 0) {
    throw new Error("Wrong array length");
  }
  const result = [];
  for (let i = 0; i < points.length; i += 4) {
    result.push(
      createPoint(points[i], points[i + 1], points[i + 2], points[i + 3])
    );
  }
  return result;
};

const createPoint = (
  x: number,
  y: number,
  hx: number,
  hy: number
): TBezierPoint => {
  return {
    position: { x: x, y: y },
    handlerPosition: { x: hx, y: hy },
    isSelected: false,
  };
};

export const PointsFactory = {
  createDefaultPoints,
  createPoint,
  createPointsFromString,
};
