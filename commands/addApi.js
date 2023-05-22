/*
 * Copyright (c) 2022.
 * Author: Enrique Nieto Martínez
 * Company: Palace Resorts
 * Created:  2022 / 9 / 17 4:15:7
 *
 */
const path = require('path')
const colors = require('colors')
const {readline, toPascalCase, toCamelCase, writeFile, readFile} = require('./utils')
const {apiServerTemplate, apiInterfaceTemplate} = require('./apiServerTemplate')

const inputName = () => {
  const executor = resolve => {
    readline.question('Api name: '.yellow, value => {
      resolve(value)
    })
  }
  return new Promise(executor)
}

const inputUrl = () => {
  const executor = resolve => {
    readline.question('Url: '.yellow, value => {
      readline.close()
      resolve(value)
    })
  }
  return new Promise(executor)
}

console.log('== Add a new API ==\n\n'.brightBlue)

const apisFolder = './src/app/network/restApis'
const apisTypesFile = './src/app/common/types/httpTypes.ts'

const registerSymbol = async fileName => {
  console.log('Registering Symbol: ', fileName)
  try {
    const file = await readFile(apisTypesFile)
    const toReplace = `,
}`
    const newSymbol = `,
  ${fileName}: Symbol('${fileName}')${toReplace}`
    const content = file.replaceAll(toReplace, newSymbol)
    console.log(content)
    console.log(newSymbol)
    await writeFile(apisTypesFile, content)
    console.log(`Types are updated!`.brightGreen)
  } catch (err) {
    console.error(err)
  }
}

const registerContainers = async (containerFilePath, className, fileName) => {
  try {
    const containersFile = await readFile(containerFilePath)
    let newContainers = containersFile.replaceAll(
      '// ADD HERE NEW APIS IMPORTS',
      `import {${className}} from "../restApis/${fileName}";
// ADD HERE NEW APIS IMPORTS`
    )

    newContainers = newContainers.replaceAll(
      '// ADD HERE NEW BINDS',
      `  bind<HttpApi>(httpTypes.${fileName}).to(${className});
// ADD HERE NEW BINDS`
    )
    await writeFile(containerFilePath, newContainers)
    console.log(`Containers are updated!`.brightGreen)
  } catch (err) {
    console.error(err)
  }
}

const createApiFile = async () => {
  const baseName = await inputName()
  const baseUrl = await inputUrl()
  const PascalBaseName = toPascalCase(baseName)
  const camelBaseName = toCamelCase(baseName)
  const fileName = `${camelBaseName}HttpApi`
  const className = `${PascalBaseName}HttpApi`
  const apiFilePath = path.join(apisFolder, fileName + '.ts')
  const containerFilePath = path.join(apisFolder, 'apisContainer.ts')
  let content = apiServerTemplate
  content = content.replaceAll('$CLASS_NAME$', className)
  content = content.replaceAll('$API_URL$', baseUrl)
  try {
    const fileResult = await writeFile(apiFilePath, content)
    console.log(fileResult.brightGreen)
  } catch (err) {
    console.error(err)
  }
  await registerContainers(containerFilePath, className, fileName)
  await registerSymbol(fileName)
}

createApiFile()
