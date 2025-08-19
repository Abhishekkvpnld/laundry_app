import { Facebook, Instagram, Twitter } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
   <footer className="bg-black border-t py-12">

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-gray-700">
        
        {/* Brand Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-3 text-center md:text-left"
        >
          <h3 className="text-3xl font-extrabold text-emerald-600 tracking-tight">
            BubbleDrop
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            Fast, affordable, and convenient laundry services tailored to your lifestyle. 
            Experience hassle-free freshness delivered to your doorstep.
          </p>
        </motion.div>

        {/* Navigation Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center md:items-start"
        >
          <h4 className="text-lg font-semibold mb-4 text-blue-800">Quick Links</h4>
          <ul className="space-y-3 text-sm text-gray-600">
            {["Home", "Services", "Pricing", "Support"].map((link, i) => (
              <motion.li
                key={i}
                whileHover={{ x: 5, color: "#dc2626" }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <a href="#" className="hover:underline">
                  {link}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Social & Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="flex flex-col items-center md:items-end gap-5"
        >
          <div className="flex space-x-5">
            {[
              { icon: <Facebook size={22} />, color: "hover:text-blue-600" },
              { icon: <Instagram size={22} />, color: "hover:text-pink-500" },
              { icon: <Twitter size={22} />, color: "hover:text-sky-500" },
            ].map((social, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ scale: 1.2, rotate: 5 }}
                className={`transition text-gray-700 ${social.color}`}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
          <p className="text-xs text-gray-400 text-center md:text-right">
            &copy; {new Date().getFullYear()} <span className="font-medium text-gray-500">BubbleDrop Laundry</span>.  
            All rights reserved.
          </p>
        </motion.div>

      </div>
    </footer>
  );
};

export default Footer;
