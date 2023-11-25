const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const AddSalesModel = require('../schema/AddSales');

const protectedRoute = require('../Middleware/ProtectedResourse');

/**
 * Route to add a new sales entry.
 * Requires authentication using the protectedRoute middleware.
 */
router.post('/addsales', protectedRoute, async (req, res) => {
    const { product_name, quantity, amount } = req.body;

    // Check if mandatory fields are empty
    if (!product_name || !quantity || !amount) {
        return res.status(400).json({ error: "One or more mandatory fields are empty" });
    } else {
        try {
            req.user.password = undefined;
            const product = new AddSalesModel({ product_name, quantity, amount, author: req.user });
            const newproduct = await product.save();
            res.status(201).json({ product: newproduct });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'An error occurred while adding a new sales entry' });
        }
    }
});

/**
 * Route to get the top sales entries for the current day.
 * Requires authentication using the protectedRoute middleware.
 */
router.get('/topsales', protectedRoute, async (req, res) => {
    try {
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);
        const sales = await AddSalesModel.find({
            $and: [
                {
                    createdAt: {
                        $gte: startOfToday,
                        $lte: new Date()  // Current time
                    }
                },
                { author: req.user._id }
            ]
        }).sort({
            amount: -1
        }).limit(5);

        res.status(200).json({ sales: sales });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while fetching top sales' });
    }
});

module.exports = router;
