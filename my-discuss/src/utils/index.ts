/**
 * @description 睡眠
 * @param ms
 */
export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

/**
 * @description 生成随机数
 * @param min
 * @param max
 */
export const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min)
