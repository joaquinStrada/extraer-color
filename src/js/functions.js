export const $ = (el, parent = document) => parent.querySelector(el)

export const $$ = (el, parent = document) => parent.querySelectorAll(el)

export const $id = id => document.getElementById(id)

export const convertRgbToHex = color => ['#'].concat(String(color).trim()
    .slice(4, color.length - 1).split(',')
    .map(code => parseInt(code).toString(16))).join('')