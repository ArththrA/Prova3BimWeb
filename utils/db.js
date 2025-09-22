// não estou usando




const fs = require("fs").promises
const path = require("path")

class db {
  constructor(filename) {
    this.filepath = path.join(__dirname, "..", "db", filename)
    this.ensureDataDir()
  }

  async ensureDataDir() {
    const dataDir = path.dirname(this.filepath)
    await fs.access(dataDir)
  }

  async readData() {
    try {
      const data = await fs.readFile(this.filepath, "utf8")
      return JSON.parse(data)
    } catch (error) {
      return []
    }
  }

  async writeData(data) {
    await fs.writeFile(this.filepath, JSON.stringify(data, null, 2))
  }

  // ========================================
  // OPERAÇÕES CRUD (Create, Read, Update, Delete)
  // ========================================


  async findAll() {
    return await this.readData()
  }

  async findById(id) {
    const data = await this.readData()
    return data.find((item) => item.id === id)
  }

  async create(item) {
    const data = await this.readData()

    const newId = data.length > 0 ? Math.max(...data.map((i) => i.id)) + 1 : 1

    const newItem = {
      id: newId,
      ...item,
      createdAt: new Date().toISOString(),
    }

    data.push(newItem)
    await this.writeData(data)
    return newItem
  }

  async update(id, updates) {
    const data = await this.readData()
    const index = data.findIndex((item) => item.id === id)

    if (index === -1) {
      return null
    }

    data[index] = {
      ...data[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    await this.writeData(data)
    return data[index]
  }

  async delete(id) {
    const data = await this.readData()
    const index = data.findIndex((item) => item.id === id)

    if (index === -1) {
      return false
    }

    data.splice(index, 1)
    await this.writeData(data)
    return true
  }
}