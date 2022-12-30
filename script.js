/* eslint import/extensions: [0, {  <js>: "always"  }] */
import Tree from './tree.js';

let binaryTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
binaryTree.insert(10)
binaryTree.insert(2)
binaryTree.insert(20)
binaryTree.insert(21)
binaryTree.insert(22)
binaryTree.prettyPrint();
// console.log(binaryTree.isBalanced());
// console.log(binaryTree);
console.log(binaryTree.rebalance());
binaryTree.prettyPrint();