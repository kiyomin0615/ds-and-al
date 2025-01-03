// base case: 재귀가 끝나는 경우, 'return'을 포함해야 한다
// recursive case: 재귀가 발생하는 경우
// base case에 대한 정의가 반드시 필요하다, 그렇지 않으면 '스택 오버플로우'가 발생한다
function factorial(n) {
  // base case
  if (n === 1) {
    return 1;
  }

  // recursive case
  return n * factorial(n - 1);
}

console.log(factorial(1));
console.log(factorial(2));
console.log(factorial(3));
console.log(factorial(4));
console.log(factorial(5));
