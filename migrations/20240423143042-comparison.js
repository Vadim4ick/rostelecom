module.exports = {
  async up(db) {
    return db.createCollection('comparison')
  },

  async down(db) {
    return db.collection('comparison').drop()
  },
}
