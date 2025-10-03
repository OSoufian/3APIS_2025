function operation(operator, n1, n2) {
    if (operator == "add") {
        console.log(n1+n2);
    }
    if (operator == "multiply") {
        console.log(n1*n2);
    }
    if (operator == "divide") {
        console.log(n1/n2);
    }
    if (operator == "substract") {
        console.log(n1-n2);
    }
}

console.log(process.argv)
operation(process.argv[2], Number(process.argv[3]), Number(process.argv[4]));