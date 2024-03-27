module.exports = {
  async up(db) {
    return db.createCollection('favorites')
  },

  async down(db) {
    return db.collection('favorites').drop()
  },
}
