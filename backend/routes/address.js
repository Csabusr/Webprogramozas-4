const express = require('express');
const router = express.Router();
const service = require('../service/address');

router.get('/', async (_req, res) => {
    try {
        const [rows] = await service.findAll();

        if (rows.length > 0) {
            res.status(200).json(rows);
        } else {
            res.status(404).json({
                message: "No address found"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Error getting address",
            error: err
        });
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const [rows] = await service.findById(id);
        const address = rows[0];

        if (rows.length > 0) {
            res.status(200).json(address);
        } else {
            res.status(404).json({
                message: "Address not found"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Error getting author",
            error: err
        });
    }
});
router.post('/', async (req, res) => {
    if (!req.body.zip_code || !req.body.city || !req.body.street_name || !req.body.street_number) {
        res.status(400).json({
            message: "Something is required"
        });
        return;
    }

    try {
        const address = {
          zip_code: req.body.zip_code,
          city: req.body.city,
          street_name: req.body.street_name,
          street_number: req.body.street_number
        };

        const [results] = await service.create(address);

        if (results.affectedRows === 1) {
            res.status(200).json({
                message: "Address created successfully",
                address: {
                    id: results.insertId,
                    zip_code: req.body.zip_code,
                    city: req.body.city,
                    street_name: req.body.street_name,
                    street_number: req.body.street_number
                }
            });
        }
        else {
            res.status(500).json({
                message: "Error creating address",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Error creating address",
            error: err
        });
    }
});

router.put('/:id', async (req, res) => {
    let id = req.params.id;

    try {
        const [rows] = await service.findById(id);
        const address = rows[0];

        if (rows.length > 0) {
            const data = {
              zip_code: req.body.zip_code || address.zip_code,
              city: req.body.city || address.city,
              street_name: req.body.street_name || address.street_name,
              street_number: req.body.street_number || address.street_number
            };

            const [result] = await service.update(id, data);

            if (result.affectedRows === 1) {
                res.status(200).json({
                    message: "Address updated successfully",
                    address: {
                      id: id,
                      zip_code: req.body.zip_code,
                      city: req.body.city,
                      street_name: req.body.street_name,
                      street_number: req.body.street_number
                  }
                });
            } else {
                res.status(500).json({
                    message: "Error updating address"
                });
            }
        } else {
            res.status(404).json({
                message: "Address not found"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Error updating address",
            error: err
        });
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const [rows] = await service.findById(id);
        const address = rows[0];

        if (rows.length > 0) {
            await service.delete(id);

            res.status(200).json({
                message: "Address deleted successfully",
                address: address
            });

        } else {
            res.status(404).json({
                message: "Address not found"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Error deleting address",
            error: err
        });
    }
});

module.exports = router;