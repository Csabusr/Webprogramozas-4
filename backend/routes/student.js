const express = require('express');
const router = express.Router();
const service = require('../service/student');

router.get('/', async (_req, res) => {
    try {
        const [rows] = await service.findAll();

        if (rows.length > 0) {
            res.status(200).json(rows.map(row => ({
                    id: row.id,
                    name: row.name,
                    tin: row.tin,
                    ssn: row.ssn,
                    email: row.email,
                    phone: row.phone,
                    neptun_id: {
                        id: row.neptunid,
                        neptun_Code: row.neptun_Code
                    },
                    address_id: {
                        id: row.addressid,
                        zip_code: row.zip_code,
                        city: row.city,
                        street_name: row.street_name,
                        street_number: row.street_number
                    }
                }
            )));
        } else {
            res.status(404).json({
                message: "No student found"
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "Error getting student",
            error: err
        })
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const [rows] = await service.findById(id);
        const data = rows[0];

        if (rows.length > 0) {
            res.status(200).json({
              id: data.id,
              name: data.name,
              tin: data.tin,
              ssn: data.ssn,
              email: data.email,
              phone: data.phone,
              neptun_id: {
                  id: data.neptunid,
                  neptun_Code: data.neptun_Code
              },
              address_id: {
                  id: data.addressid,
                  zip_code: data.zip_code,
                  city: data.city,
                  street_name: data.street_name,
                  street_number: data.street_number
              }
            });
        } else {
            res.status(404).json({
                message: "Error getting student"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Error getting student",
            error: err
        });
    }
});

router.post('/', async (req, res) => {
    if (!req.body.name ||!req.body.tin ||!req.body.ssn ||!req.body.email ||!req.body.phone ||!req.body.neptun_id||!req.body.address_id) {
        res.status(400).json({
            message: "Something is required"
        });
        return;
    }

    try {
        const student = {
          name: req.body.name,
          tin: req.body.tin,
          ssn: req.body.ssn,
          email: req.body.email,
          phone: req.body.phone,
          neptun_id: {
              id: req.body.neptun_id,
              neptun_Code: req.body.neptun_Code
          },
          address_id: {
              id: req.body.address_id,
              zip_code: req.body.zip_code,
              city: req.body.city,
              street_name: req.body.street_name,
              street_number: req.body.street_number
          }
        }

        const [results] = await service.create(student);

        if (results.affectedRows === 1) {
            res.status(200).json({
                message: "student created successfully",
                student: student
            });
        } else {
            res.status(500).json({
                message: "Error creating student"
            });
        }

    } catch (err) {
        res.status(500).json({
            message: "Error creating student",
            error: err
        });
    }
});

router.put('/:id', async (req, res) => {
const id = req.params.id;
    try {
        const [rows] = await service.findById(id);
        const student = rows[0];

        if (rows.length > 0) {

            const data = {
                id: req.body.id || student.id,
                name: req.body.name || student.name,
                tin: req.body.tin || student.tin,
                ssn: req.body.ssn || student.ssn,
                email: req.body.email || student.email,
                phone: req.body.phone || student.phone,
                neptun_id: req.body.neptun_id || student.neptun_id,
                address_id: req.body.address_id || student.address_id
            }

            const [result] = await service.update(id, data);

            if (result.affectedRows === 1) {
                res.status(200).json({
                    message: "student updated successfully",
                    student: data
                });
            } else {
                res.status(500).json({
                    message: "Error updating student"
                });
            }

        } else {
            res.status(500).json({
                message: "Error updating student"
            });
        }

    } catch (err) {
        res.status(500).json({
            message: "Error updating student",
            error: err
        });
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const [rows] = await service.findById(id);
        const student = rows[0];

        if (rows.length > 0) {
            await service.delete(id);

            res.status(200).json({
                message: "student deleted successfully",
                student: student
            });

        } else {
            res.status(404).json({
                message: "student not found"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Error deleting student",
            error: err
        });
    }
});

module.exports = router