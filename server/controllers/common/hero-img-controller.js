import HeroImage from "../../models/HeroImage.js"

export const addHeroImage = async (req, res) => {
    try {
        const { image } = req.body;
        const heroImages = new HeroImage({ image })

        await heroImages.save()

        res.status(201).json({
            success: true,
            data: heroImages,
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        })
    }
}

export const getHeroImage = async (req, res) => {
    try {
        const images = await HeroImage.find({})

        res.status(200).json({
            success: true,
            data: images,
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        })
    }
} 