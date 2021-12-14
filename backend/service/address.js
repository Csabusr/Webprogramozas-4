exports.findAll = async () => {
  return db.query("SELECT * FROM `address`");
}

exports.findById = async (id) => {
  return db.query("SELECT * FROM `address` WHERE `id` = ?", [id]);
}

exports.create = async (address) => {
  return db.execute("INSERT INTO address (zip_code,city,street_name,street_number) VALUES (?,?,?,?)",
      [address.zip_code,address.city,address.street_name,address.street_number]);
}

exports.update = async (id, address) => {
  return db.execute("UPDATE address SET `zip_code` = ?,`city` = ?,`street_name` = ?,`street_number` = ? WHERE `id` = ?",
      [address.zip_code,address.city,address.street_name,address.street_number,id]);
}

exports.delete = async (id) => {
  return db.execute("DELETE FROM address WHERE id = ?", [id]);
}
