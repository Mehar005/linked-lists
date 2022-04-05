class Node {
	constructor(val) {
		this.prev = null;
		this.val = val;
		this.next = null;
	}
}

class DoublyLinkedList {
	constructor() {
		this.head = null;
		this.tail = null;
		this.length = 0;
	}

	/////////////////////////////////////// pseudo code for push method ///////////////////////////////////////
	// 1. function will take a value
	// 2. create a node from this value
	// 3. check if there is no head in the list ( list is empty ) then assign list head and tail to newly created node
	// 4. if there is head exist on the list then assign next pointer of the tail to be the newly created node
	// 5. set the prev pointer on new node to be the tail
	// 6. updated the tail to be the new created node
	// 7. update the length property by one
	// 8. return list
	push(val) {
		const newNode = new Node(val);
		if (!this.head) {
			this.head = newNode;
			this.tail = this.head;
		} else {
			this.tail.next = newNode;
			newNode.prev = this.tail;
			this.tail = newNode;
		}
		this.length++;
		return this;
	}

	/////////////////////////////////////// pseudo code for pop method ///////////////////////////////////////
	// 1. check if there is no head (list is empty) return null
	// 2. save tail in a variabe
	// 3. if length is equal to 1 set the head and tail to be null
	// 4. else update the next pointer of 2nd last node to be null
	// 5. update the tail to be the 2nd last node (prev of the removed node)
	// 6. Decrement length by 1
	// 7. return value of removed node
	pop() {
		if (!this.head) return null;
		const oldTail = this.tail;
		if (this.length === 1) {
			this.head = null;
			this.tail = null;
		} else {
			this.tail = oldTail.prev;
			this.tail.next = null;
		}
		this.length--;
		return oldTail;
	}

	/////////////////////////////////////// pseudo code for shift method ///////////////////////////////////////
	// 1. check if there is no head (list is empty) return null
	// 2. save head in a variabe
	// 3. if length is equal to 1 set the head and tail to be null
	// 4. else update the prev pointer of 2nd node to be null
	// 5. update the head to be the 2nd  node (next of the removed node)
	// 6. Decrement length by 1
	// 7. return value of removed node

	shift() {
		if (!this.head) return null;
		const oldHead = this.head;
		if (this.length === 1) {
			this.head = null;
			this.tail = null;
		} else {
			this.head = oldHead.next;
			this.head.prev = null;
		}
		this.length--;
		return oldHead;
	}

	/////////////////////////////////////// pseudo code for unshift method ///////////////////////////////////////
	// 1. function will take a value
	// 2. create a node from this value
	// 3. check if there is no head in the list ( list is empty ) then assign list head and tail to newly created node
	// 4. if there is head exist on the list then assign prev pointer of the head to be the newly created node
	// 5. set the next pointer on new node to be the head
	// 6. updated the head to be the new created node
	// 7. update the length property by one
	// 8. return list
	unshift(val) {
		const newNode = new Node(val);
		if (!this.head) {
			this.head = newNode;
			this.tail = newNode;
		} else {
			this.head.prev = newNode;
			newNode.next = this.head;
			this.head = newNode;
		}
		this.length++;
		return this;
	}

	/////////////////////////////////////// pseudo code for get method ///////////////////////////////////////
	// 1. function should accept index
	// 2. if index less than 0 or equal or greater than length of the list return null
	// 3. store head in a variable
	// 4. if the index is less than or equal to half of the length loop through the list from head towards middle, return the node once it found
	// 5. if the index is greater than half of the length loop through the list from tail towards middle , return the node once it found

	get(index) {
		if (index < 0 || index >= this.length) return null;
		let current;
		if (index <= this.length / 2) {
			current = this.head;
			for (let i = 0; i !== index; i++) {
				current = current.next;
			}
		} else {
			current = this.tail;
			for (let i = this.length - 1; i !== index; i--) {
				current = current.prev;
			}
		}

		return current;
	}

	/////////////////////////////////////// pseudo code for set method ///////////////////////////////////////
	// 1. function should accept and index and value
	// 2. find the node at specific index using get method
	// 3. if no node found return false
	// 4. else update the value of the found node
	// 5. return true

	set(index, value) {
		const foundNode = this.get(index);
		if (!foundNode) return false;
		foundNode.val = value;
		return true;
	}

	/////////////////////////////////////// pseudo code for insert method ///////////////////////////////////////
	// 1. function should accept an index and value
	// 2. create new node using value
	// 3. if index is less than 0 or greater than length return false
	// 4. if index is equal to 0, use unshift method to add new node
	// 5. if index is equal ot length + 1, use push method to add new node
	// 6. else find the node at position index-1 using get method
	// 7. set the next ponter of newly created node to be the next of found node
	// 8. set the prev pointer of newly created node to be the found node
	// 9. update the prev pointer of next of found node to be newly created node
	// 10. update the next pointer of found node to be the new node
	// 11. increment length by 1
	// 12. return true
	insert(index, val) {
		if (index < 0 || index > this.length) return false;
		if (index === 0) return !!this.unshift(val);
		if (index === this.length) return !!this.push(val);

		const newNode = new Node(val);
		const prevNode = this.get(index - 1);
		const nextNode = prevNode.next;

		(newNode.next = nextNode), (newNode.prev = prevNode);
		(nextNode.prev = newNode), (prevNode.next = newNode);
		this.length++;
		return true;
	}

	/////////////////////////////////////// pseudo code for remove method ///////////////////////////////////////
	// 1. function should accept an index
	// 2. if index less than zero or equal or greater than length return null
	// 3. if index is equal to 0 use shift method to remove node
	// 4. if index is equal to length - 1 use pop method to remove node
	// 5. else find node at position index using get method
	// 6. update the next and prev properties to remove node form the list
	// 7. set prev and next to be null on found node
	// 8. decrement length by one
	// 9. return removed node
	remove(index) {
		if (index < 0 || index >= this.length) return null;
		if (index === 0) return this.shift();
		if (index === this.length - 1) return this.pop();

		const removedNode = this.get(index);

		removedNode.prev.next = removedNode.next;
		removedNode.next.prev = removedNode.prev;
		removedNode.next = null;
		removedNode.prev = null;
		this.length--;
		return removedNode;
	}

	/////////////////////////////////////// pseudo code for reverse method ///////////////////////////////////////
	// 1.
}

const list = new DoublyLinkedList();
list.push('A');
list.push('B');
list.push('C');
list.push('D');
// list.push("E");
// list.push("F");
// list.push("G");
