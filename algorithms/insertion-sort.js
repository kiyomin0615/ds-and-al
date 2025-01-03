// Insertion Sort는 언제나 두번째 아이템부터 시작한다
// Insertion Sort는 정렬이 거의 완료됐을 때 "O(n)"으로 효율적이다
function insertionSort(array) {
  let temp;

  for (let i = 1; i < array.length; i++) {
    temp = array[i];

    for (var j = i - 1; j > -1 && array[j] > temp; j--) {
      array[j + 1] = array[j];
    }

    array[j + 1] = temp;
  }

  return array;
}

console.log(insertionSort([2, 4, 6, 5, 1, 3]));
