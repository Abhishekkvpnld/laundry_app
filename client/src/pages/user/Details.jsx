import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import Footer from "@/components/user/Footer";
import Navbar from "@/components/user/Navbar";
import { CreditCard, Wallet2, ShoppingCart } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const laundryShopsData = [
    {
        id: "1",
        name: "Sparkle Wash & Fold",
        image: "/images/laundry1.jpg",
        address: "123 Clean Street, Kochi",
        contact: "9876543210",
        openingHours: "8:00 AM - 9:00 PM",
        rating: 4.3,
        services: [
            { name: "Dry Cleaning", price: "100" },
            { name: "Ironing", price: "40" },
            { name: "Pickup & Delivery", price: "60" },
        ],
        location: "123 Clean Street, Kochi",
        status: "close"
    },
];

const LaundryDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        pickupDate: "",
        note: "",
        selectedServices: [{ service: "", quantity: 1 }],
    });

    const shop = laundryShopsData.find((s) => s.id === id);
    if (!shop)
        return <div className="text-center p-10 text-gray-600">Laundry shop not found.</div>;

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (paymentType) => {
        const details = formData.selectedServices
            .map((s) => `${s.quantity} x ${s.service}`)
            .join(", ");

        alert(`Booking Submitted!\nPayment: ${paymentType}\nServices: ${details}`);

        setFormData({
            name: "",
            phone: "",
            address: "",
            pickupDate: "",
            note: "",
            selectedServices: [{ service: "", quantity: 1 }],
        });
    };

    return (
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
                <Button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-white gap-2 text-sm  hover:text-red-500 hover:bg-white hover:border-2 hover:transition-all"
                >
                    <ArrowLeft size={16} /> Back
                </Button>

                <div className="flex flex-col md:flex-row gap-10">
                    {/* Shop Details */}
                    <div className="md:w-1/2 space-y-4 px-1">
                        <img
                            src={"/shop_img.jpg"}
                            alt={shop?.name}
                            className="w-full h-64 object-cover rounded-xl"
                        />
                        <div className="flex items-center justify-between">
                            <h2 className="text-3xl font-bold text-slate-800">{shop?.name}</h2>
                            <span className={`text-green-700 font-semibold text-md ${shop?.status == "close" ? "text-red-700 bg-red-50" : "text-green-600 bg-green-50"} shadow px-4 py-0.5 rounded-full`}>
                                {shop?.status == "close" ? "close" : "open"}
                            </span>
                        </div>
                        <p className="text-sm text-slate-600">{shop?.address}</p>
                        <p className="text-sm text-slate-500">📞 {shop?.contact}</p>
                        <p className="text-sm text-slate-500">⏰ {shop?.openingHours}</p>

                        <div className="flex gap-1 text-yellow-500 text-sm">
                            {Array.from({ length: 5 }, (_, i) => (
                                <span key={i}>{i < Math.round(shop?.rating) ? "★" : "☆"}</span>
                            ))}
                            <span className="ml-1 text-gray-500">({shop?.rating})</span>
                        </div>

                        <div className="pt-2">
                            <h4 className="font-medium text-slate-700 mb-1">Services:</h4>
                            <div className="flex flex-wrap gap-2">
                                {shop?.services.map((service, index) => (
                                    <span
                                        key={index}
                                        className="bg-muted text-slate-600 text-xs px-3 py-1 rounded-full border"
                                    >
                                        {service?.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Booking Form */}
                    <Card className="md:w-1/2 shadow-md">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">Book Your Service</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4">
                                <Input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your Name"
                                    required
                                />
                                <Input
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Phone Number"
                                    required
                                />
                                <Textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Your Address"
                                    required
                                />

                                {formData.selectedServices.map((entry, index) => (
                                    <div key={index} className="flex gap-4 items-center">
                                        <div className="flex-1">
                                            <Select
                                                value={entry.service}
                                                onValueChange={(value) => {
                                                    const updated = [...formData.selectedServices];
                                                    updated[index].service = value;
                                                    setFormData({ ...formData, selectedServices: updated });
                                                }}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a Service" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {shop.services.map((service, i) => (
                                                        <SelectItem key={i} value={service?.name}>
                                                            {service?.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <Input
                                            type="number"
                                            min={1}
                                            placeholder="Qty"
                                            value={entry.quantity}
                                            onChange={(e) => {
                                                const updated = [...formData.selectedServices];
                                                updated[index].quantity = e.target.value;
                                                setFormData({ ...formData, selectedServices: updated });
                                            }}
                                            className="w-[100px]"
                                        />

                                        <Button
                                            variant="destructive"
                                            onClick={() => {
                                                const updated = formData.selectedServices.filter((_, i) => i !== index);
                                                setFormData({ ...formData, selectedServices: updated });
                                            }}
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                ))}

                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={() =>
                                        setFormData({
                                            ...formData,
                                            selectedServices: [...formData.selectedServices, { service: "", quantity: 1 }],
                                        })
                                    }
                                >
                                    + Add Another Service
                                </Button>

                                <Textarea
                                    name="note"
                                    value={formData.note || ""}
                                    onChange={handleChange}
                                    placeholder="Additional Notes (Optional)"
                                />

                                <Input
                                    name="pickupDate"
                                    type="date"
                                    value={formData.pickupDate}
                                    onChange={handleChange}
                                    required
                                />

                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button type="button" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                                            Confirm Booking
                                        </Button>
                                    </PopoverTrigger>

                                    <PopoverContent className="w-72 p-4 rounded-xl shadow-lg border bg-white">
                                        <h3 className="text-lg font-semibold text-slate-800 mb-3 text-center">Select Payment Method</h3>
                                        <div className="flex flex-col gap-3">
                                            <Button
                                                variant="outline"
                                                onClick={() => handleSubmit("Cash on Delivery")}
                                                className="flex items-center justify-start gap-2"
                                            >
                                                <Wallet2 className="w-4 h-4" />
                                                Cash on Delivery
                                            </Button>

                                            <Button
                                                variant="outline"
                                                onClick={() => handleSubmit("Online Payment")}
                                                className="flex items-center justify-start gap-2"
                                            >
                                                <CreditCard className="w-4 h-4" />
                                                Online Payment
                                            </Button>

                                            <Button
                                                variant="ghost"
                                                className="flex items-center justify-center gap-2 text-blue-600 hover:bg-blue-50 mt-2"
                                                onClick={() => alert("Redirecting to cart...")}
                                            >
                                                <ShoppingCart className="w-4 h-4" />
                                                View Cart
                                            </Button>
                                        </div>
                                    </PopoverContent>
                                </Popover>

                            </form>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-12 space-y-4">
                    <h3 className="text-xl font-semibold text-slate-800">Service Pricing</h3>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[200px] text-slate-700">Service</TableHead>
                                <TableHead className="text-slate-700">Price</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {shop?.services.map((service, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium text-blue-700">{service?.name}</TableCell>
                                    <TableCell className="text-green-600 font-semibold">&#8377;{service?.price}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <div className="mt-12">
                    <h3 className="text-xl font-semibold mb-4 text-slate-800">Location on Map</h3>
                    <div className="rounded-lg overflow-hidden border">
                        <iframe
                            title="Laundry Location"
                            src="https://www.google.com/maps?q=11.866736, 75.371641&z=15&output=embed"
                            width="100%"
                            height="400"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default LaundryDetailsPage;