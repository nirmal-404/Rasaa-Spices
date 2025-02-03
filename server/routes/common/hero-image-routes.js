import express from "express"

import {
    getHeroImage,
    addHeroImage,
} from "../../controllers/common/hero-img-controller.js"

const router = express.Router();

router.post("/add", addHeroImage);
router.get("/get", getHeroImage);

export default router;
