function sayHi(name) {
    console.log(`Hello ${name}`)
}

const sayHi2 = (name) => {
    console.log(`Howdy ${name} `)
}

const sayHi3 = (name) => {
    return (`WASSUP ${name} `)
}

module.exports = {sayHi, sayHi3}