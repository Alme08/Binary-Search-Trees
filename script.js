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

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

class Tree {
  constructor(array) {
    this.root = buildTree(array);
  }
}

const binaryTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(binaryTree.root);
