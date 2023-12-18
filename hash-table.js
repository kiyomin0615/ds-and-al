class HashTable {
  constructor(size = 7) {
    this.dataMap = new Array(size);
  }

  // 직접 호출하면 안되는 메소드 앞에 _를 붙인다
  _hash(key) {
    let hash = 0;

    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i) * 23) % this.dataMap.length;
    }

    return hash;
  }

  set(key, value) {
    let index = this._hash(key);

    if (!this.dataMap[index]) {
      this.dataMap[index] = [];
    }

    this.dataMap[index].push([key, value]);

    return this;
  }
}

let hashTable = new HashTable();
hashTable.set("bolts", 1400);
hashTable.set("washers", 50);
hashTable.set("lumber", 70);
console.log(hashTable);
