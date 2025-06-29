const generateFibonacci = (limit: number): number[] => {
    const fib = new Array<number>(limit)
    fib[0] = 0
    fib[1] = 1
    
    for (let index = 2; index < limit; index++) {
        fib[index] = fib[index - 1] + fib[index - 2]
    }
    
    return fib
}

const fibSequence = generateFibonacci(2^16)

const areConsecutiveInFibSequence = (
	n1: number,
	n2: number,
): boolean => {
	const index2 = fibSequence.indexOf(n1);
	const index1 = fibSequence.indexOf(n2);

	return index1 === index2 - 1;
};


export {areConsecutiveInFibSequence}