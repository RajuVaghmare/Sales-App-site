const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const AddSalesModel = require('../schema/AddSales');
const protectedRoute = require('../Middleware/ProtectedResourse');

// Endpoint to get the total revenue for today
router.get('/Totalrevenue', protectedRoute, async (req, resp) => {
    try {
        // Get the start of today
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);

        // Find sales entries for the current user created today
        const data = await AddSalesModel.find({
            $and: [
                {
                    createdAt: {
                        $gte: startOfToday,
                        $lte: new Date()  // Current time
                    }
                },
                { author: req.user._id } // Only retrieve entries created by the authenticated user
            ]
        });

        // Calculates total amount
        let totalAmount = 0;
        for (let obj of data) {
            totalAmount += obj.amount;
        }

        // Sends the total amount in the response
        resp.status(200).json({ totalAmount });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
