module.exports = {
    add(basket, item) {
        basket.contents.push(item)
        return basket
    },
    change(basket, id, amount) {
        let find = basket.contents.find(item => item.id_product == id)
        find.quantity += amount
        return basket
    },
    delete(basket, id) {
        let find = basket.contents.find(item => item.id_product == id)
        basket.contents.splice(basket.contents.indexOf(find), 1)
        return basket
    }
}