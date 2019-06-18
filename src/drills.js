'use strict';

require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: ('pg'),
  connection: process.env.DB_URL
});

console.log('connection successful');

function searchByTerm(searchTerm) {
  const data = knexInstance
    .select('*')
    .from('shopping_list')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(res => {
      console.log(res);
    })
    .finally(() => knexInstance.destroy());
}

function paginateData(pageNumber) {
  console.log(`Page #: ${pageNumber}`);
  const itemsPerPage = 6;
  const offset = itemsPerPage * (pageNumber - 1);
  knexInstance
    .select('*')
    .from('shopping_list').
    limit(itemsPerPage)
    .offset(offset)
    .then(res => {
      console.log(res);
    })
    .finally(() => knexInstance.destroy());
}

function getItemsAfterDate(daysAgo) {
  knexInstance
    .select('*')
    .from('shopping_list')
    .where(
      'date_added',
      '>',
      knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
    )
    .then(res => {
      console.log(res);
    })
    .finally(() => knexInstance.destroy());
}

function totalCategoryCosts() {
  knexInstance
    .select('category')
    .from('shopping_list')
    .groupBy('category')
    .count('price as total')
    .then(res => {
      console.log(res);
    })
    .finally(() => knexInstance.destroy());
}

// searchByTerm('FISH');
// paginateData(3);
// getItemsAfterDate(4);
totalCategoryCosts();