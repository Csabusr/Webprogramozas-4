exports.findAll = async () => {
  return db.query("SELECT * FROM neptun");
}

exports.findById = async (id) => {
  return db.query("SELECT * FROM neptun WHERE id = ?", [id]);
}

exports.create = async (neptun) => {
  return db.execute("INSERT INTO neptun (neptun_code) VALUES (?)",
      [neptun.neptun_Code]);
}

exports.update = async (id, neptun) => {
  return db.execute("UPDATE neptun SET neptun_code = ? WHERE id = ?",
      [neptun.neptun_Code, id]);
}

exports.delete = async (id) => {
  return db.execute("DELETE FROM neptun WHERE id = ?", [id]);
}
