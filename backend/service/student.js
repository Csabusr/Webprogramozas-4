exports.findAll = async () => {
  return db.query("SELECT student.id as id, name, tin, ssn, email, phone, neptun.id as neptunid, neptun_Code, address.id as addressid, zip_code, city, street_name, street_number FROM student INNER JOIN address ON student.address_id = address.id INNER JOIN  neptun ON student.neptun_id = neptun.id");
}

exports.findById = async (id) => {
  return db.query("SELECT student.id as id, name, tin, ssn, email, phone, neptun.id as neptunid, neptun_Code, address.id as addressid, zip_code, city, street_name, street_number FROM student INNER JOIN address ON student.address_id = address.id INNER JOIN  neptun ON student.neptun_id = neptun.id WHERE student.id = ?", [id]);
}

exports.create = async (student) => {
  return db.execute("INSERT INTO student (name,tin,ssn,email,phone,neptun_id,address_id) VALUES (?,?,?,?,?,?,?)",
      [student.name,student.tin,student.ssn,student.email,student.phone,student.neptun_id.id,student.address_id.id]);
}

exports.update = async (id, student) => {
  return db.execute("UPDATE student SET name = ?,tin=?,ssn=?,email=?,phone=?,neptun_id=?,address_id=?  WHERE student.id = ?",
      [student.name,student.tin,student.ssn,student.email,student.phone,student.neptun_id,student.address_id,id]);
}

exports.delete = async (id) => {
  return db.execute("DELETE FROM student WHERE student.id = ?", [id]);
}
