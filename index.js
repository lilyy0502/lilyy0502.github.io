function calculateFactorial() {
    const input = document.getElementById('factorialInput').value;
    const steps = [];
    const result = factorial(parseInt(input), steps);
    
    // Hiển thị các bước
    const stepsHtml = steps.map(step => `<div class="step">${step}</div>`).join('');
    document.getElementById('factorialSteps').innerHTML = stepsHtml;
    
    document.getElementById('factorialResult').textContent = 
        `Giai thừa của ${input} là: ${result}`;
}

function factorial(n, steps = []) {
    // Thêm bước gọi hàm vào mảng steps
    steps.push(`Gọi factorial(${n})`);
    
    // Điều kiện cơ sở
    if (n <= 1) {
        steps.push(`→ factorial(${n}) = 1 (điều kiện cơ sở)`);
        return 1;
    }
    
    // Công thức đệ quy
    const result = n * factorial(n-1, steps);
    steps.push(`← Quay lại factorial(${n}): ${n} × factorial(${n-1}) = ${result}`);
    return result;
}

function calculateFibonacci() {
    const input = document.getElementById('fibonacciInput').value;
    const steps = [];
    const memo = new Map(); // Thêm memoization để tránh tính toán lại
    
    // Tính kết quả với các bước
    const result = fibonacci(parseInt(input), steps, memo);
    
    // Tạo dãy Fibonacci
    const sequence = [];
    for(let i = 0; i <= parseInt(input); i++) {
        sequence.push(memo.get(i));
    }
    
    // Hiển thị các bước một cách rõ ràng hơn
    const stepsHtml = steps.map(step => {
        let className = 'step';
        if (step.includes('→')) className += ' base-case';
        if (step.includes('←')) className += ' return-case';
        return `<div class="${className}">${step}</div>`;
    }).join('');
    
    document.getElementById('fibonacciSteps').innerHTML = stepsHtml;
    
    // Hiển thị kết quả và dãy số
    document.getElementById('fibonacciResult').innerHTML = 
        `<div class="result">Số Fibonacci thứ ${input} là: ${result}</div>` +
        `<div class="sequence">Dãy Fibonacci: ${sequence.join(' → ')}</div>`;
}

function fibonacci(n, steps = [], memo = new Map()) {
    // Kiểm tra nếu đã tính trước đó
    if (memo.has(n)) {
        return memo.get(n);
    }
    
    // Thêm bước gọi hàm vào mảng steps
    steps.push(`Tính F(${n})`);
    
    // Điều kiện cơ sở
    if (n <= 1) {
        steps.push(`→ F(${n}) = ${n} [điều kiện cơ sở]`);
        memo.set(n, n);
        return n;
    }
    
    // Tính các giá trị con
    const result1 = fibonacci(n-1, steps, memo);
    const result2 = fibonacci(n-2, steps, memo);
    const result = result1 + result2;
    
    // Lưu kết quả vào memo
    memo.set(n, result);
    
    steps.push(`← F(${n}) = F(${n-1}) + F(${n-2}) = ${result1} + ${result2} = ${result}`);
    return result;
}
