import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Navbar from "@/components/user/Navbar";
import Footer from "@/components/user/Footer";
import { services } from "@/utils/Data";
import { useNavigate } from "react-router-dom";
import Pricing from "@/components/user/Pricing";


const UserHome = () => {

    const navigate = useNavigate();

    return (
        <>
            <Navbar />
            <div className="min-h-screen p-6 bg-gray-50">
                {/* Hero Section */}
                <section className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-blue-800 mb-2">Welcome to BubbleDrop Laundry</h1>
                    <p className="text-gray-600 text-lg max-w-xl mx-auto">
                        Fast, reliable, and affordable laundry & dry cleaning service at your doorstep.
                    </p>
                    <Button onClick={() => navigate("/services")} className="mt-4 cursor-pointer">Schedule a Pickup</Button>
                </section>

                {/* Services Section */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">Our Services</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {services?.map((service, index) => {
                            const Icon = service.icon;
                            return (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <Card className="shadow-md cursor-pointer hover:shadow-xl">
                                        <CardHeader className="flex flex-col items-center">
                                            <Icon className="w-10 h-10 text-blue-500 mb-2" />
                                            <CardTitle>{service?.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-gray-700 text-center">{service?.desc}</p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>

                <Pricing />
            </div>
            <Footer />
        </>
    );
};

export default UserHome;

