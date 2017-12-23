const path = require('path')

const faker = require('faker')
const jsonfile = require('jsonfile')

const times = require('lodash.times')

const filePath = path.join(__dirname, 'mock.json')

const data = times(1000, () => ({
  name: faker.name.findName(),
  phone: faker.phone.phoneNumber(),
  id: faker.random.uuid(),
  profilePic: faker.internet.avatar(),
  birthday: faker.date.past(),
  balance: faker.finance.amount(),
}))

jsonfile.writeFileSync(filePath, data)