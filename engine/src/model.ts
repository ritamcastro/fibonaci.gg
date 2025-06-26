const Directions = ['UP', "DOWN", "LEFT", "RIGHT"] as const
type Direction = typeof Directions[number]

export type {Direction}