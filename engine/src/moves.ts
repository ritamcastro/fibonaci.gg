const moveNumbersToEnd = (line: number[]): number[] =>  {

    const zeros = line.filter(n => n === 0)
    const nonZeros = line.filter(n => n !== 0)

    return [...zeros, ...nonZeros]
  }

  export {moveNumbersToEnd}