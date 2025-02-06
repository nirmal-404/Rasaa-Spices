import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import {
    Camera,
    Target,
    Award
} from 'lucide-react';

import founderOne from "../../assets/images/founders/D1.jpg"
import founderTwo from "../../assets/images/founders/D2.jpg"
import founderThree from "../../assets/images/founders/D3.jpg"

import SpicesCategoryImage from "../../assets/images/category icons/category-spices.jpg"
import PowdersCategoryImage from "../../assets/images/category icons/category-powders.jpg"
import CrushedAndRoastedCategoryImage from "../../assets/images/category icons/category-crushed.jpg"
import HealthyRangeCategoryImage from "../../assets/images/category icons/category-healthy.jpg"
import { useNavigate } from 'react-router-dom';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6
        }
    }
};

const categoriesWithIcons = [
    { id: "spices", label: "Spices", icon: SpicesCategoryImage },
    { id: "powders", label: "Powders", icon: PowdersCategoryImage },
    { id: "crushed-and-roasted", label: "Crushed & Roasted", icon: CrushedAndRoastedCategoryImage },
    { id: "healthy-range-products", label: "Healthy Range", icon: HealthyRangeCategoryImage },
];

const FounderCard = ({ name, title, imageUrl }) => (
    <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
    >
        <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
            <CardContent className="flex flex-col items-center p-6">
                <div className="relative mb-4">
                    <img
                        src={imageUrl}
                        alt={name}
                        className="w-48 h-48 object-cover rounded-full border-4 border-primary/50 shadow-lg"
                    />
                    <div className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2">
                        <Award size={24} />
                    </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">{name}</h3>
                <p className="text-muted-foreground">{title}</p>
            </CardContent>
        </Card>
    </motion.div>
);

const AboutUs = () => {
    const [activeSection, setActiveSection] = useState('vision');
    const navigate = useNavigate();
    
    const sections = {
        vision: {
            title: 'Our Vision',
            content: 'To become the foremost company of manufacturing and marketing of processed food ingredients in Sri Lanka and to be a leading player in the local and export market.',
            icon: <Target className="text-primary" size={48} />
        },
        mission: {
            title: 'Our Mission',
            content: 'To provide high quality, delicious and healthy processed food ingredients by using the latest technology and also to make every effort to improve productivity, marketing and sales in both local & International markets, thereby guaranteeing total customer satisfactions.',
            icon: <Camera className="text-primary" size={48} />
        }
    };

    const founders = [
        {
            name: 'Duminda Munasinghe',
            title: 'Founder / CEO',
            imageUrl: founderOne
        },
        {
            name: 'Rasadari Peiris Munasinghe',
            title: 'Co-Founder / Directress',
            imageUrl: founderTwo
        },
        {
            name: 'Benul Pasandula Munasinghe',
            title: 'Co-Founder / Director',
            imageUrl: founderThree
        }
    ];

    function handleNavigateToListingPage(getCurrentItem, section) {
        sessionStorage.removeItem("filters")

        const currentFilter = {
            [section]: [getCurrentItem.id]
        }

        sessionStorage.setItem("filters", JSON.stringify(currentFilter))
        navigate("/shop/listing")
    }

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-6xl mx-auto space-y-12">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl font-extrabold text-primary mb-4">
                        Rasaa Agro Products Pvt Ltd
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Delivering Trust, Quality, and Innovation in Every Spice
                    </p>
                </motion.div>

                {/* Vision & Mission Toggle Section */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Card className="bg-white/70 backdrop-blur-md">
                        <CardContent className="py-8">
                            <div className="flex justify-center space-x-4 mb-6">
                                {Object.keys(sections).map((key) => (
                                    <button
                                        key={key}
                                        onClick={() => setActiveSection(key)}
                                        className={`
                                            px-6 py-2 rounded-full transition-all duration-300
                                            ${activeSection === key
                                                ? 'bg-primary text-white shadow-lg'
                                                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}
                                        `}
                                    >
                                        {sections[key].title}
                                    </button>
                                ))}
                            </div>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeSection}
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 50 }}
                                    transition={{ duration: 0.5 }}
                                    className="text-center flex items-center justify-center gap-6"
                                >
                                    {sections[activeSection].icon}
                                    <p className="text-lg max-w-2xl">
                                        {sections[activeSection].content}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Product Categories */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="bg-white/70 backdrop-blur-md rounded-xl p-8"
                >
                    <motion.h2
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-3xl font-bold text-center mb-8 text-primary"
                    >
                        Our Product Range
                    </motion.h2>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4"
                    >
                        {categoriesWithIcons.map((categoryItem) => (
                            <motion.div
                                key={categoryItem.id}
                                variants={itemVariants}
                            >
                                <Card
                                    onClick={() => handleNavigateToListingPage(categoryItem, "category")}
                                    className="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden"
                                >
                                    <div
                                        style={{ backgroundImage: `url(${categoryItem.icon})` }}
                                        className="absolute inset-0 bg-cover bg-center overflow-hidden"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-40 hover:bg-opacity-20 transition-all duration-300" />

                                    <CardContent className="relative flex flex-col items-center justify-center p-6 h-48">
                                        <span className="font-bold text-center text-white text-xl drop-shadow-lg">
                                            {categoryItem.label}
                                        </span>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.section>

                {/* Founders Section */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-3xl font-bold text-center mb-8 text-primary">
                        Our Founders
                    </h2>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid md:grid-cols-3 gap-8"
                    >
                        {founders.map((founder) => (
                            <FounderCard
                                key={founder.name}
                                name={founder.name}
                                title={founder.title}
                                imageUrl={founder.imageUrl}
                            />
                        ))}
                    </motion.div>
                </motion.section>

                {/* Company Description */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Card className="bg-white/70 backdrop-blur-md">
                        <CardContent className="py-8 px-12">
                            <h2 className="text-3xl font-bold text-center mb-6 text-primary">
                                About Our Company
                            </h2>
                            <p className="text-lg text-center max-w-4xl mx-auto text-muted-foreground">
                                Rasaa Agro Products Pvt Ltd is a trusted name in spices, offering innovative food products that meet the highest standards of quality and hygiene. We pride ourselves on producing homemade-style spices without preservatives, winning the trust of housewives across the island.
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
};

export default AboutUs;