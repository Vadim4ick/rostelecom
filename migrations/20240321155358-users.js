module.exports = {
  async up(db) {
    return db.createCollection('users')
  },

  async down(db) {
    return db.collection('users').drop()
  },
}
