import express from "express"

import {
    getHeroImage,
    addHeroImage,
    deleteHeroImage
} from "../../controllers/common/hero-img-controller.js"

const router = express.Router();

router.post("/add", addHeroImage);
router.get("/get", getHeroImage);
router.delete("/delete/:id", deleteHeroImage);


export default router;
