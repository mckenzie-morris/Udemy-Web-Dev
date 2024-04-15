// var generateName = require('sillyname');

import generateName from 'sillyname';

import superHeroes from 'superheroes';

var sillyName = generateName();

var superName = superHeroes.random();

console.log(`My name is ${superName}.`);
