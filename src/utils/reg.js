/**
 * 通用的正则表达式
 */

// 3到12位（中文，字母，数字，下划线）
export const ACC_REG = /^[a-zA-Z0-9_\u4E00-\u9FA5]{3,12}$/;

// 3到12位（字母，数字，下划线）
export const PWD_REG = /^[a-zA-Z0-9_]{3,12}$/;