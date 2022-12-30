/* eslint import/extensions: [0, {  <js>: "always"  }] */
import Node from './nodes.js';

const mergeSort = (arr) => {
  if (arr.length < 2) return arr;
  const middleIndex = Math.ceil(arr.length / 2);
  const firstHalf = arr.splice(0, middleIndex);
  const secondHalf = arr.splice(-middleIndex);
  const a = mergeSort(firstHalf);
  const b = mergeSort(secondHalf);
  const c = [];
  const length = a.length + b.length;
  while (length !== c.length) {
    if (a[0] > b[0] || a[0] === undefined) c.push(b.shift());
    else c.push(a.shift());
  }
  return c;
};

const buildTree = (arr) => {
  const array = mergeSort([...new Set(arr)]);
  if (array.length - 1 < 0) return null;

  const middleIndex = Math.floor(array.length / 2);
  const node = new Node(array[middleIndex]);

  const firstHalf = array.slice(0, middleIndex);
  const secondHalf = array.slice(middleIndex + 1, array.length);

  node.left = buildTree(firstHalf);
  node.right = buildTree(secondHalf);

  return node;
};

class Tree {
  constructor(array) {
    this.root = buildTree(array);
  }

  prettyPrint(node = this.root, prefix = '', isLeft = true) {
    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

  minValue(root = this.root) {
    let r = root;
    let minV = r.data;
    while (r.left != null) {
      r = r.left;
      minV = r.data;
    }
    return minV;
  }

  insert(data, root = this.root) {
    let r = root;
    if (r.data === data) {
      console.log("Couldn't insert");
      return r;
    }
    if (r === null) {
      r = new Node(data);
      return r;
    }

    if (data < r.data) r.left = this.insert(data, r.left);
    else if (data > r.data) r.right = this.insert(data, r.right);
    return r;
  }

  delete(data, root = this.root) {
    const r = root;
    if (r === null) return r;

    if (data < r.data) r.left = this.delete(data, r.left);
    else if (data > r.data) r.right = this.delete(data, r.right);
    else {
      if (r.left === null) return r.right;
      if (r.right === null) return r.left;
      r.data = this.minValue(r.right);
      r.right = this.delete(r.data, r.right);
    }
    return r;
  }

  find(data, root = this.root) {
    if (root === null) return root;

    if (data < root.data) return this.find(data, root.left);
    if (data > root.data) return this.find(data, root.right);

    return root;
  }
}

const binaryTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
// binaryTree.delete(4);
binaryTree.prettyPrint();
console.log(binaryTree.find(7));
