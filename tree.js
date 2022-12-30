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
    this.inOrder = [];
    this.preOrder = [];
    this.postOrder = [];
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
    if (r === null) {
      r = new Node(data);
      return r;
    }
    if (r.data === data) {
      console.log("Couldn't insert");
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

  levelOrder(cb) {
    let queue = [this.root];
    let levelOrderList = [];

    while (queue.length > 0) {
      let currentNode = queue.shift();
      cb ? cb(currentNode.data) : levelOrderList.push(currentNode.data);

      if (currentNode.left !== null) queue.push(currentNode.left);
      if (currentNode.right !== null) queue.push(currentNode.right)
      
    }
    if (levelOrderList.length > 0) return levelOrderList;
  }

  inorder(cb, root = this.root){
    if (root === null) return;
    this.inorder(cb, root.left)
    cb ? cb(root.data) : this.inOrder.push(root.data);
    this.inorder(cb, root.right)
  }

  preorder(cb, root = this.root){
    if (root === null) return;
    cb ? cb(root.data) : this.preOrder.push(root.data);
    this.preorder(cb, root.left)
    this.preorder(cb, root.right)
  }
  postorder(cb, root = this.root){
    if (root === null) return;
    this.postorder(cb, root.left)
    this.postorder(cb, root.right)
    cb ? cb(root.data) : this.postOrder.push(root.data);
  }

  height(root = this.root){
    if (root === null) return 0;

    let leftHeight = this.height(root.left);
    let rightHeight = this.height(root.right);
    
    return (leftHeight > rightHeight) ? leftHeight + 1 : rightHeight + 1
  }

  depth(val, root = this.root){
    let count = 0;
    while (root != null) {
      count += 1
      if (root.data === val) return count;

      (root.data > val) ? root = root.left : root = root.right
    }
  }

  isBalanced(root = this.root){
    let heightLeft = this.height(root.left);
    let heightRight = this.height(root.right);
    if ((Math.max(heightLeft, heightRight) - Math.min(heightLeft, heightRight)) > 1) {
      return false
    }else{
      return true
    }
  }

  rebalance(root = this.root){
    if (this.isBalanced(root)) {
      return "It's already balanced"
    }else{
      this.inorder()
      let arrayBalanced = this.inOrder
      const treeBalanced = new Tree(arrayBalanced)
      this.root = treeBalanced.root
    }
  }
}

export default Tree;