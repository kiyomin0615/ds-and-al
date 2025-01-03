// Quick Sort는 정렬이 되지 않았을 때 "O(nlogn)"으로 효율적이다
// Quick Sort는 정렬이 완료됐을 때 "O(n^2)"으로 비효율적이다
  // 정렬이 (거의) 완료됐을 때는 Insertion Sort가 효율적이다
// Quick Sort는 공간 복잡도 측면에서도 Merge Sort보다 효율적이다
function swap(array, firstIndex, secondIndex) {
  let temp = array[firstIndex];
  array[firstIndex] = array[secondIndex];
  array[secondIndex] = temp;
}

function pivot(array, pivotIndex = 0, endIndex = array.length - 1) {
  let swapIndex = pivotIndex;

  for (let i = pivotIndex + 1; i <= endIndex; i++) {
    if (array[i] < array[pivotIndex]) {
      swapIndex++;
      swap(array, swapIndex, i);
    }
  }

  swap(array, pivotIndex, swapIndex);

  return swapIndex;
}

function quickSort(array, left = 0, right = array.length - 1) {
  if (left < right) {
    let pivotIndex = pivot(array, left, right);

    quickSort(array, left, pivotIndex - 1);
    quickSort(array, pivotIndex + 1, right);
  }

  return array;
}

let array = [4, 6, 1, 7, 3, 2, 5];
console.log(quickSort(array));
