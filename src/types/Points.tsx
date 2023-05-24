export interface TBezierPoint {
    position: TPoint,
    handlerPosition: TPoint,
    isSelected: boolean
}

export interface TPoint {
    x: number,
    y: number
}

export interface IGetPointsInterface {
    getPoints: () => number[]
  }

  export interface IBezierLineInterface {
    getPoints: () => number[]
    deselectAll: () => void
    onAddPress: () => void
    onDeletePress: () => void
  }