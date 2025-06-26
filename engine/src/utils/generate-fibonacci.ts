
  const generateFibonacci = (limit: number): number[] => {

    const fib = new Array<number>(limit)
    fib[0] = 0
    fib[1] = 1

    for (let index = 2; index < limit; index++) {
      fib[index] = fib[index - 1] + fib[index - 2]
    }

    return fib
  }

  export {generateFibonacci}