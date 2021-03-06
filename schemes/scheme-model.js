const db = require("../data/db-config");

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
};

function find() {
  return db("schemes").then(schemes => {
    return schemes;
  });
}

function findById(id) {
  return db("schemes")
    .where({ id })
    .first();
}

function findSteps(id) {
  return db("schemes")
    .join("steps", "schemes.id", "steps.scheme_id")
    .select("schemes.scheme_name", "steps.step_number", "steps.instructions")
    .where({ scheme_id: id })
    .orderBy("steps.step_number", "asc");
}

function add(scheme) {
  return db("schemes")
    .insert(scheme)
    .then(([id]) => {
      return findById(id);
    });
}

function update(changes, id) {
  return db("schemes")
    .where({ id })
    .update(changes, [])
    .then(updatedScheme => {
      return findById(id);
    });
}

function remove(id) {
  return db("schemes")
    .where({ id })
    .del()
    .then(deleted => {
      return findById(id);
    });
}
