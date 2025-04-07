import { Router, json, urlencoded } from "express";
import { handleValidationError, validateDonor, validateName } from "./middleware/validation.js";
import { getDonationDetails, getDonations, getDonorDetails, getDonors } from "./database/connection.js";

const router = Router()

router.use(urlencoded({ extended: false }));
router.use(json());

router.get('/', validateName, handleValidationError, async (req, res) => {
    const first_name = req.query.first_name;
    const last_name = req.query.last_name;
    res.status(200).json(await getDonors(first_name, last_name));
});

router.get('/:donorID', validateDonor, handleValidationError, async (req, res) => {
    const donorID = req.params.donorID;
    try {
        res.status(200).json(await getDonorDetails(donorID));
    } catch (e) {
        res.status(404).json({ error: "Donor not found." })
    }
});

export default router;