const { json } = require('micro')
const sleep = require('then-sleep')

module.exports = async (req, res) => {
  const { time } = await json(req)
  
  await sleep(time)
  return `Waited ${time}`
}