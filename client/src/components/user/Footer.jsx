import {
    Facebook,
    Instagram,
    Twitter,
} from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-black border-t py-10">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10 text-gray-700">

                {/* Brand Section */}
                <div className="flex flex-col gap-2 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-emerald-600">BubbleDrop</h3>
                    <p className="text-sm text-gray-500">
                        Fast, affordable, and convenient laundry services tailored to your lifestyle.
                    </p>
                </div>

                {/* Navigation Section (Single Column Centered) */}
                <div className="flex flex-col items-center md:items-start">
                    <h4 className="text-base font-semibold mb-4 text-blue-800">Quick Links</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li>
                            <a
                                href="#"
                                className="hover:text-red-600 hover:underline transition duration-200"
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="hover:text-red-600 hover:underline transition duration-200"
                            >
                                Services
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="hover:text-red-600 hover:underline transition duration-200"
                            >
                                Pricing
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="hover:text-red-600 hover:underline transition duration-200"
                            >
                                Support
                            </a>
                        </li>
                    </ul>
                </div>


                {/* Social & Copyright */}
                <div className="flex flex-col items-center md:items-end gap-4">
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-blue-600 text-white transition">
                            <Facebook size={20} />
                        </a>
                        <a href="#" className="hover:text-pink-500 text-white transition">
                            <Instagram size={20} />
                        </a>
                        <a href="#" className="hover:text-sky-500 transition text-white">
                            <Twitter size={20} />
                        </a>
                    </div>
                    <p className="text-xs text-gray-400 text-center md:text-right">
                        &copy; {new Date().getFullYear()} BubbleDrop Laundry. All rights reserved.
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
