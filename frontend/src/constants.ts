const Directions = ["LEFT", "RIGHT", "UP", "DOWN"] as const;
type Direction = (typeof Directions)[number];

export type { Direction };
export { Directions };
