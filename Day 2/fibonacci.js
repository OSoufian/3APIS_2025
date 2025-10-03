function fibonacci(n) {
    if (n <= 0) throw new Error("n should be greater than 0 !");
    if (n == 1) return 1;
    if (n == 2) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2)
}

module.exports = fibonacci;

// console.log(fibonacci(4));