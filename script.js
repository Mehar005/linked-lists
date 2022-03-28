class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /////////////////////////////////////// pseudo code for push method ///////////////////////////////////////
  // 1. function will take a value
  // 2. create a node from this value
  // 3. check if there is no head in the list ( list is empty ) then assign list head and tail to newly created node
  // 4. if there is head exist on the list then assign next pointer of the tail to be the newly created node and updated the tail to be
  // the new created node
  // update the length property by one
  // return list
  push(val) {
    if (!val === null) return;
    const newNode = new Node(val);

    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length++;
    return this;
  }

  /////////////////////////////////////// pseudo code for push method ///////////////////////////////////////
  // 1. if there is no node in the list return undefined
  // 2. loop over the list untill the tail
  // 3. set the next pointer of the 2nd last node to null
  // 4. set the tail to be the 2nd last node
  // 5. decrement the length property by 1
  // 6. return the node removed

  pop() {
    if (!this.head) return undefined;
    let current = this.head;
    let newTail = null;
    while (current.next) {
      newTail = current;
      current = current.next;
    }

    if (newTail) {
      newTail.next = null;
      this.tail = newTail;
    } else {
      this.head = null;
      this.tail = null;
    }
    this.length--;
    return current;
  }

  /////////////////////////////////////// pseudo code for shift method ///////////////////////////////////////
  // 1. if there is no node in the list return undefined
  // 2. save the head in a variable
  // 3. update the head property to be the next property of current head
  // 4. decrease the length property by one
  // 5. return the node removed

  shift() {
    if (!this.head) return undefined;
    let currentHead = this.head;
    if (currentHead.next) {
      this.head = currentHead.next;
    } else {
      this.head = null;
      this.tail = null;
    }

    this.length--;
    return currentHead;
  }

  /////////////////////////////////////// pseudo code for unshift method ///////////////////////////////////////
  // 1. create a node from the given value
  // 2. check if there is no head(list is empty) then assign the head and tail property of the list to be the newly creatd node
  // 3. other wise update the next property of the new node to be the head of the list
  // 4. update the head of the list to be the newly created node
  // 5. increment the length property by one
  // 6. return the linked list

  unshift(val) {
    if (!val) return;
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return this;
  }

  /////////////////////////////////////// pseudo code for get method ///////////////////////////////////////
  // 1. this methoed should accepts an index
  // 2. check if index is less than 0 or greater than or equal to the length of the list return null
  // 3. loop through the list until you reach the index and than return node at that specific index
  get(index) {
    if (index < 0 || index >= this.length) return null;
    let value = this.head;
    for (let i = 0; i < index; i++) {
      value = value.next;
    }
    return value;
  }

  /////////////////////////////////////// pseudo code for set method ///////////////////////////////////////
  // 1. this methoed should accepts an index and a value
  // 2. use get method to find the specific node
  // 3. if node not found return false
  // 4. if node found update the value of the node to be the value paased to the function and return true
  set(index, value) {
    let node = this.get(index);
    if (!node) return false;
    node.val = value;
    return true;
  }

  /////////////////////////////////////// pseudo code for insert method ///////////////////////////////////////
  // 1. this methoed should accepts an index and a value
  // 2. return false if index less than zero or greater than length of the list
  // 3. if index is equal to length than use push method to add new node
  // 4. if index is equal to 0 than use unshift method to add new node
  // 5. else access the index -1 node using get method
  // 6. set the next property of the newly created node to be the next of found node
  // 7. update the next property of found node to be the newly created node
  // 8. increament the length by 1
  // 9. return true
  insert(index, val) {
    if (index < 0 || index > this.length) return false;
    const newNode = new Node(val);
    if (index === this.length) return !!this.push(val);
    if (index === 0) return !!this.unshift(val);
    const prevNode = this.get(index - 1);
    newNode.next = prevNode.next;
    prevNode.next = newNode;
    this.length++;
    return true;
  }
}

const list = new SinglyLinkedList();
list.push("hello");
list.push("there");
list.push("!");
// list.unshift(1);
// list.shift();
// list.shift();
list.set(0, "Hellow world");
console.log(list);
console.log(list.insert(1, "!!!!!"));
console.log(list);
