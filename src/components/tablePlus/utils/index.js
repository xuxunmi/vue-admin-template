/**
 * 生成随机字符串
 * @param {number} length 字符串的长度，默认 10 位
 * @returns 随机字符串
 */
export function randomString(length = 10) {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz'.split('')

  let str = ''
  for (let i = 0; i < length; i++) {
    str += chars[Math.floor(Math.random() * chars.length)]
  }
  return str
}

/**
 * 移除树中的指定节点集合
 * @param {*} tree 树
 * @param {*} items 节点集合
 */
export function removeItemsInTree(tree, items) {
  items.forEach((item) => removeItemInTree(tree, item))
}

/**
 * 移除树中的指定节点
 * @param {*} tree 树
 * @param {*} item 节点
 */
export function removeItemInTree(tree, item) {
  const index = tree.indexOf(item)
  if (index !== -1) {
    tree.splice(index, 1)
    return true
  }
  for (const treeItem of tree) {
    if (treeItem.children?.length) {
      if (removeItemInTree(treeItem.children, item)) {
        break
      }
    }
  }
}
