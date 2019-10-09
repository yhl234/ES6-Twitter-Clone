const data = [
  {
    firstName: 'Wyatt',
    lastName: 'Larson',
    age: 59,
    pet: 'dog',
    friends: [],
  },
  { firstName: 'Diana', lastName: 'MacGyver', age: 16, pet: 'dog' },
  { firstName: 'Raphael', lastName: 'Yost', age: 60, pet: 'cat' },
  { firstName: 'Joannie', lastName: 'Gerlach', age: 42, pet: 'hamster' },
];
function groupPeopleByPets(people) {
  return people.reduce((acc, cur) => {
    const petName = cur.pet;
    if (!acc[petName]) {
      acc[petName] = [];
    }
    acc[petName].push(cur.firstName);
    console.log(acc);
    return acc;
  }, {});
}

groupPeopleByPets(data);

const votes = [
  { _id: 'd', tally: 1 },
  { _id: 'c', tally: 3 },
  { _id: 'a', tally: 2 },
  { _id: 'b', tally: 4 },
];
function cleanJSON(votesArray) {
  return votesArray.reduce((acc, cur) => {
    acc[cur._id] = cur.tally;
    return acc;
  }, {});
}

// { a: 1, b: 2, c: 3, d: 4}
cleanJSON(votes);
