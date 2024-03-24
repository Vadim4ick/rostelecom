module.exports = {
  async up(db) {
    return db.createCollection('cart')
  },

  async down(db) {
    return db.collection('cart').drop()
  },
}
