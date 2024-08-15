export class TableLayout {
  id: string;
  shape: TableShape;
  name: string = "";
  size = { x: 1, y: 1 };

  constructor(shape: TableShape) {
    this.id = crypto.randomUUID();
    this.shape = shape;
  }
}

export enum TableShape {
  Rectangle = "rectangle",
  Circle = "circle",
}
