/* eslint import/extensions: [0, {  <js>: "always"  }] */
import Tree from './tree.js';

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
let randomArray = [];

for (let i = 0; i < getRandomInt(100); i++) {
  randomArray[i] = getRandomInt(100) 
}

let binaryTree = new Tree(randomArray);
binaryTree.prettyPrint();
console.log(binaryTree.isBalanced());
console.log(binaryTree.levelOrder());
console.log(binaryTree.printPreorder());
console.log(binaryTree.printPostorder());
console.log(binaryTree.printInorder());
binaryTree.insert(1000)
binaryTree.insert(1001)
binaryTree.insert(1002)
binaryTree.insert(1003)
binaryTree.insert(1004)
binaryTree.insert(1005)
console.log(binaryTree.isBalanced());
binaryTree.prettyPrint()
binaryTree.rebalance()
console.log(binaryTree.isBalanced());
binaryTree.prettyPrint()
console.log(binaryTree.levelOrder());
console.log(binaryTree.printPreorder());
console.log(binaryTree.printPostorder());
console.log(binaryTree.printInorder());