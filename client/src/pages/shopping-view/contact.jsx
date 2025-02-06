import React from 'react';
import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { contactUsFormControls } from "@/config";
import { submitContactForm } from "@/store/shop/contact-slice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonForm from "@/components/common/form";
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

function ContactUs() {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { toast } = useToast();

    const initialState = {
        name: user ? user?.firstName + " " + user?.lastName : "",
        email: user ? user?.email : "",
        phoneNumber: user ? user?.phoneNumber : "",
        inquiryType: "",
        message: ""
    };

    const [formData, setFormData] = useState(initialState);

    function onSubmit(event) {
        event.preventDefault();
        dispatch(submitContactForm(formData)).then(
            (data) => {
                if (data?.payload?.success) {
                    toast({
                        title: "Form submitted success"
                    })
                    setFormData(initialState)
                }
            }
        )
    }

    function isFormValid() {
        return Object.keys(formData)
            .map((key) => formData[key]?.trim() !== "")
            .every((item) => item);
    }

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

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <motion.div 
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-extrabold text-primary mb-4">Get in Touch</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </motion.div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid md:grid-cols-3 gap-8"
                >
                    {/* Contact Information */}
                    <motion.div 
                        variants={itemVariants}
                        className="md:col-span-1 space-y-6"
                    >
                        <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                            <div className="space-y-6">
                                {[
                                    { 
                                        icon: MapPin, 
                                        title: "Office Address", 
                                        details: ["Rasaa Agro Products Pvt Ltd.", "190/10,2B, Colombo Rd,", "Piliyandala, Sri Lanka"]
                                    },
                                    { 
                                        icon: MapPin, 
                                        title: "Factory Address", 
                                        details: ["Wilimbula Road,", "Malwathuhiripitiya,", "Sri Lanka"]
                                    },
                                    { 
                                        icon: Phone, 
                                        title: "Phone", 
                                        details: ["+94 11 270 7000"]
                                    },
                                    { 
                                        icon: Mail, 
                                        title: "Email", 
                                        details: ["rasaaspices@gmail.com"]
                                    },
                                    { 
                                        icon: Clock, 
                                        title: "Business Hours", 
                                        details: ["Monday - Friday: 9:00 AM - 6:00 PM"]
                                    }
                                ].map((section, index) => (
                                    <motion.div 
                                        key={index}
                                        variants={itemVariants}
                                        className="flex items-start space-x-3"
                                    >
                                        <section.icon className="w-6 h-6 text-primary mt-1" />
                                        <div>
                                            <h3 className="font-bold text-gray-900">{section.title}</h3>
                                            {section.details.map((detail, idx) => (
                                                <p key={idx} className="text-gray-600">{detail}</p>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </Card>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div 
                        variants={itemVariants}
                        className="md:col-span-2"
                    >
                        <Card className="p-6 shadow-sm border bg-white hover:shadow-lg transition-shadow duration-300">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6">
                                Send us a Message
                            </h2>
                            <CommonForm
                                formControls={contactUsFormControls}
                                buttonText="Send Message"
                                formData={formData}
                                setFormData={setFormData}
                                onSubmit={onSubmit}
                                isBtnDisabled={!isFormValid()}
                            />
                        </Card>
                    </motion.div>
                </motion.div>

                {/* FAQ Section */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="mt-16"
                >
                    <motion.h2 
                        variants={itemVariants}
                        className="text-3xl font-bold text-primary mb-6 text-center"
                    >
                        Frequently Asked Questions
                    </motion.h2>
                    <motion.div 
                        variants={containerVariants}
                        className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
                    >
                        {[
                            {
                                question: "What are your response times?",
                                answer: "We typically respond to all inquiries within 24 hours during business days."
                            },
                            {
                                question: "Do you offer support on weekends?",
                                answer: "We offer limited support on weekends for urgent matters only."
                            }
                        ].map((faq, index) => (
                            <motion.div 
                                key={index}
                                variants={itemVariants}
                                className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-300"
                            >
                                <h3 className="font-medium text-gray-900 mb-2">{faq.question}</h3>
                                <p className="text-gray-600">{faq.answer}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default ContactUs;