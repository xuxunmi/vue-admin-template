/**
 * 根据 class 名称获取当前的层级
 * @param {string} className
 * @return {number}
 */
export function getLevelFromClassName(className) {
  return Number((/--level-(\d+)/.exec(className) || [])[1] || 0)
}
