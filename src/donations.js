import { getDonations, getDonationDetails } from "./database/connection.js";
import { Router, json, urlencoded } from "express";
import { validateDonation, handleValidationError } from "./middleware/validation.js";

const router = Router()

router.use(urlencoded({ extended: false }));
router.use(json());

router.get('/', async (req, res) => {
    res.status(200).json(await getDonations())
})

router.get('/:donationID', validateDonation, handleValidationError, async (req, res) => {
    const donationID = req.params.donationID;
    try {
        res.status(200).json(await getDonationDetails(donationID))
    } catch (e) {
        console.log(e)
        res.status(404).json({ error: "Donation not found." })
    }
});

export default router;