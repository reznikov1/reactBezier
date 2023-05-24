import { TPoint } from "../types/Points";

const sum = (point1: TPoint, point2: TPoint): TPoint => {
  return { x: point1.x + point2.x, y: point1.y + point2.y };
};

const add = (point1: TPoint, offsetx: number,offsety: number): TPoint => {
  return { x: point1.x + offsetx, y: point1.y + offsety};
};


const delta = (point1: TPoint, point2: TPoint): TPoint => {
  return { x: Math.abs(point1.x - point2.x), y: Math.abs(point1.y - point2.y) };
};

const substract = (point1: TPoint, point2: TPoint): TPoint => {
  return { x: point1.x - point2.x, y: point1.y - point2.y };
};

const clampNegative = (point: TPoint): TPoint => {
  return { x: point.x < 0 ? 0 : point.x, y: point.y < 0 ? 0 : point.y };
};

const getPointBetween = (point1: TPoint, point2: TPoint): TPoint => {
  return { x: (point1.x + point2.x) / 2, y: (point1.y + point2.y) / 2 };
};

export const VectorOperations = {
  sum,
  add,
  delta,
  substract,
  clampNegative,
  getPointBetween,
};
