const express = require('express');
const router = express.Router();
const service = require('../service/neptun');

router.get('/', async (_req, res) => {
    try {
        const [rows] = await service.findAll();

        if (rows.length > 0) {
            res.status(200).json(rows);
        } else {
            res.status(404).json({
                message: "No neptun found"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Error getting neptuns",
            error: err
        });
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const [rows] = await service.findById(id);
        const reader = rows[0];

        if (rows.length > 0) {
            res.status(200).json(reader);
        } else {
            res.status(404).json({
                message: "Reader not found"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Error getting neptun",
            error: err
        });
    }
});

router.post('/', async (req, res) => {
    if (!req.body.neptun_Code) {
        res.status(400).json({
            message: "Neptun_Code is required"
        });
        return;
    }

    const neptun_Code = req.body.neptun_Code;

    try {
        const reader = {
            neptun_Code: neptun_Code
        };

        const [results] = await service.create(reader);

        if (results.affectedRows === 1) {
            res.status(200).json({
                message: "Neptun created successfully",
                reader: {
                    id: results.insertId,
                    neptun_Code: reader.neptun_Code
                }
            });
        }
        else {
            res.status(500).json({
                message: "Error creating neptun",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Error creating neptun",
            error: err
        });
    }
});

router.put('/:id', async (req, res) => {
    if (!req.body.neptun_Code) {
        res.status(400).json({
            message: "neptun_Code is required"
        });
        return;
    }
    const id = req.params.id;
    const neptun_Code = req.body.neptun_Code;
    
    try {
        const [rows] = await service.findById(id);
        const reader = rows[0];

        if (rows.length > 0) {
            const data = {
              neptun_Code: neptun_Code || reader.neptun_Code
            };

            const [result] = await service.update(id, data);

            if (result.affectedRows === 1) {
                res.status(200).json({
                    message: "Neptun updated successfully",
                    reader: {
                        id: id,
                        neptun_Code: data.neptun_Code
                    }
                });
            } else {
                res.status(500).json({
                    message: "Error updating neptun"
                });
            }
        } else {
            res.status(404).json({
                message: "Neptun not found"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Error updating neptun",
            error: err
        });
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const [rows] = await service.findById(id);
        const reader = rows[0];

        if (rows.length > 0) {
            await service.delete(id);
            res.status(200).json({
                message: "Neptun deleted successfully",
                reader: reader
            });
        } else {
            res.status(404).json({
                message: "Neptun not found"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Error deleting neptun",
            error: err
        });
    }
});

module.exports = router;