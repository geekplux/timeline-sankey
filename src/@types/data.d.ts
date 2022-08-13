export type Item = {
  [id: string];
  id?: number;
  key?: string;
  title: string;
  color?: string;
};

export type Filters = {
  [key: string]: Set;
};

export type Data = {
  [id: string];
  id: number;
  year_start: number;
  year_finish: number;
  influenced: Data[];
  influenced_by: Data[];
  cross_influenced: Data[];
  cross_influenced_by: Data[];
  tags: Item[];
  categories: Item[];
  column: Item;
};

export type VisParams = {
  yearStep: number;
  yearHeight: number;
  mobileYearHeight: number;
  nodeGap: number;
  nodeTitleGap: number;
  nodeWidth: number;
  mobileNodeWidth: number;
  linkDefaultColor: string;
  crossLinkStrokeDashArray: number;
  crossLinkTriangleSize: number;
  gridGap: number;
}

export type TimelineProps = {
  data: Data[];
  visParams: VisParams;
};

export type Node = Data & {
  // _sideBySideCount?: number;
  // _column?: number;
  _x0: number;
  _x1: number;
  _y0: number;
  _y1: number;
  _width: number;
  _height: number;
  _color: string;
  _xMidPoint: number;
  _yMidPoint: number;
  _halfWidth: number;
};

export type Link = {
  source: number;
  target: number;
  sourceNode: Node;
  targetNode: Node;
  type: string;
  d?: string;
  triangle?: string;
  strokeWidth?: number;
  rotate?: number;
};
