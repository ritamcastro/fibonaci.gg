const moveNumbersRight = (line: number[]): number[] =>  {

    const zeros = line.filter(n => n === 0)
    const nonZeros = line.filter(n => n !== 0)

    return [...zeros, ...nonZeros]
  }

  const moveNumbersLeft = (line: number[]): number[] =>  {

    const zeros = line.filter(n => n === 0)
    const nonZeros = line.filter(n => n !== 0)

    return [...nonZeros, ...zeros]
  }


  export {moveNumbersRight, moveNumbersLeft}