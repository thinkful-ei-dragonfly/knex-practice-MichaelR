'use strict';

const ShoppingListService = {
  getAllItems(knex) {
    return knex
      .select('*')
      .from('shopping_list');
  },

  getItemById(knex, id) {
    return knex
      .select('*')
      .from('shopping_list')
      .where({ id })
      .first();
  },

  addItem(knex, item) {
    return knex
      .insert(item)
      .into('shopping_list')
      .returning('*');
  },

  updateItem(knex, id, newItem) {
    return knex
      .where({ id })
      .update(newItem);
  },
  
  deleteItem(knex, id) {
    return knex
      .where({ id })
      .delete();
  }
};

module.exports = ShoppingListService;