/*
 * Copyright (c) 2022.
 * Author: Enrique Nieto Martínez
 * Company: Palace Resorts
 * Created:  2022 / 9 / 17 4:15:55
 *
 */

const fs = require('fs')

function toPascalCase(string) {
  return `${string}`
    .toLowerCase()
    .replace(new RegExp(/[-_]+/, 'g'), ' ')
    .replace(new RegExp(/[^\w\s]/, 'g'), '')
    .replace(new RegExp(/\s+(.)(\w*)/, 'g'), (_$1, $2, $3) => `${$2.toUpperCase() + $3}`)
    .replace(new RegExp(/\w/), s => s.toUpperCase())
}

function toCamelCase(string) {
  return string
    .replace(new RegExp(/[-_]+/, 'g'), ' ')
    .replace(new RegExp(/(?:^\w|[A-Z]|\b\w)/, 'g'), (word, index) =>
      index === 0 ? word.toLowerCase() : word.toUpperCase()
    )
    .replace(new RegExp(/\s+/, 'g'), '')
}

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

const writeFile = (fileName, content) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, content, function (err) {
      if (err) {
        reject(err)
      }
      resolve('File is created successfully: ' + fileName)
    })
  })
}

const readFile = fileName => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf8', (err, data) => {
      if (err) {
        return reject(err)
      }
      resolve(data)
    })
  })
}

module.exports = {
  readline,
  readFile,
  writeFile,
  toCamelCase,
  toPascalCase
}
