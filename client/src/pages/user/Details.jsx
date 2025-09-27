import { useParams, useNavigate, data } from "react-router-dom";
import { Loader2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { ArrowLeft, CreditCard, Wallet2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Footer from "@/components/user/Footer";
import Navbar from "@/components/user/Navbar";
import { useFetchShopDataById } from "@/hooks/useFetchShopById";
import { usePlaceOrder } from "@/hooks/usePlaceOrder";
import { loadStripe } from '@stripe/stripe-js';
import { toast } from "sonner";
import axios from "axios";
import { PAYMENT_API_END_POINT } from "@/utils/constants";




const LaundryDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch shop data
  const { data: shop, isLoading, isError } = useFetchShopDataById(id);

  //Place order
  const { isLoading: orderLoading, mutate } = usePlaceOrder()

  const [formData, setFormData] = useState({
    name: "sdadad",
    phone: 9850475652,
    address: "dsadasda",
    pickupDate: "",
    note: "vvssss",
    selectedServices: [{ service: "", quantity: 1, unit_amount: null }],
  });


  console.log(formData)

  //Loading
  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center p-10 text-gray-600 animate-pulse">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-3" />
        <p className="text-lg font-medium">Fetching shop details...</p>
        <p className="text-sm text-gray-400">Please wait a moment</p>
      </div>
    );

  if (isError || !shop)
    return (
      <div className="flex flex-col items-center justify-center p-10 text-red-600">
        <AlertCircle className="w-8 h-8 mb-3" />
        <p className="text-lg font-semibold">Oops! Something went wrong</p>
        <p className="text-sm text-gray-500">We couldn’t load the shop details.</p>
        <button
          onClick={() => refetch?.()} // if using react-query
          className="mt-4 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
        >
          Retry
        </button>
      </div>
    );



  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });



  //Submit Handler
  const handleSubmit = async (paymentType) => {

    if (!formData?.selectedServices || formData?.selectedServices.length === 0) {
      toast.error("Please select at least one service");
      return;
    }

    const stripe = await loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);


    //Find Total Amount
    const totalAmount = formData.selectedServices.reduce((acc, s) => {
      const serviceData = shop.services.find((srv) => srv.name === s.service);
      return acc + (serviceData?.cost || 0) * s.quantity;
    }, 0);

    const confirmOrder = window.confirm(
      `Please confirm your booking:\n\nPayment: ${paymentType}\nTotal Amount: ₹${totalAmount}\n\nDo you want to proceed?`
    );
    if (!confirmOrder) return;

    const orderPayload = {
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      note: formData.note,
      service_date: formData.pickupDate,
      services: formData.selectedServices.map((s) => ({
        service: s.service,
        quantity: s.quantity,
        unit_amount:s.unit_amount
      })),
      paymentMethod: paymentType === "Cash on Delivery" ? "cashOnDelivery" : "online",
      totalAmount,
      paymentStatus: paymentType === "Cash on Delivery" ? "pending" : "initiated",
      paymentId: null,
    };


    try {
      mutate(orderPayload, {
        onSuccess: async (createdOrder) => {
          if (paymentType === "Online Payment") {

            try {
              const payRes = await axios.post(
                `${PAYMENT_API_END_POINT}/create-checkout-session`,
                { orderId: createdOrder._id, orderData: orderPayload },
                { withCredentials: true }
              );

              const { sessionId } = payRes.data;
              const result = await stripe.redirectToCheckout({ sessionId });

              if (result?.error) {
                toast.error(result.error.message);
                return;
              }
            } catch (err) {
              console.error(err);
              toast.error("Payment initialization failed");
            }
          } else {
            // COD → reset form + redirect
            setFormData({
              name: "",
              phone: "",
              address: "",
              pickupDate: "",
              note: "",
              selectedServices: [{ service: "", quantity: 1, unit_amount: 0 }],
            });
            navigate("/services");
          }
        },
        onError: (err) => {
          toast.error(err?.response?.data?.message || "Order creation failed");
        },
      });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };




  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
        <Button
          onClick={() => navigate(-1)}
          className="flex items-center text-white gap-2 text-sm hover:text-red-500 hover:bg-white hover:border-2 hover:transition-all"
        >
          <ArrowLeft size={16} /> Back
        </Button>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Shop Details */}
          <div className="md:w-1/2 space-y-4 px-1">
            <img
              src={shop?.image || "/shop_img.jpg"}
              alt={shop?.shopName}
              className="w-full h-64 object-cover rounded-xl"
            />
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-slate-800">{shop?.shopName}</h2>
              <span
                className={`${shop?.isOpen ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"} shadow px-4 py-0.5 rounded-full font-semibold`}
              >
                {shop?.isOpen ? "Open" : "Closed"}
              </span>
            </div>
            <p className="text-sm text-slate-600">{shop?.address}</p>
            <p className="text-sm text-slate-500">📞 {shop?.phone}</p>
            <p className="text-sm text-slate-500">⏰ {shop?.openingTime} – {shop?.closingTime}</p>

            <div className="pt-2">
              <h4 className="font-medium text-slate-700 mb-1">Services:</h4>
              <div className="flex flex-wrap gap-2">
                {shop?.services?.map((service, index) => (
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
                <Input name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required />
                <Input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required />
                <Textarea name="address" value={formData.address} onChange={handleChange} placeholder="Your Address" required />

                {formData?.selectedServices?.map((entry, index) => (
                  <div key={index} className="flex gap-4 items-center">
                    <div className="flex-1">
                      <Select value={entry.service} onValueChange={(value) => {
                        const updated = [...formData.selectedServices];
                        updated[index].service = value;
                        const selectedService = shop?.services?.find(
                          (item) => item?.name === formData?.selectedServices[index].service
                        );

                        updated[index].unit_amount = selectedService?.cost

                        setFormData({ ...formData, selectedServices: updated });
                      }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Service" />
                        </SelectTrigger>
                        <SelectContent>
                          {shop?.services?.map((service, i) => (
                            <SelectItem key={i} value={service?.name}>{service?.name}</SelectItem>
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
                        updated[index].quantity = Number(e.target.value);

                        setFormData({ ...formData, selectedServices: updated });
                      }}
                      className="w-[100px]"
                    />

                    <Button variant="destructive" onClick={() => {
                      const updated = formData.selectedServices.filter((_, i) => i !== index);
                      setFormData({ ...formData, selectedServices: updated });
                    }}>Remove</Button>
                  </div>
                ))}

                <Button type="button" variant="secondary" onClick={() =>
                  setFormData({
                    ...formData,
                    selectedServices: [...formData.selectedServices, { service: "", quantity: 1 }],
                  })
                }>
                  + Add Another Service
                </Button>

                <Textarea name="note" value={formData.note} onChange={handleChange} placeholder="Additional Notes (Optional)" />
                <Input name="pickupDate" type="date"  min={new Date().toISOString().split("T")[0]} value={formData.pickupDate} onChange={handleChange} required />

                <Popover>
                  <PopoverTrigger asChild>
                    <Button type="button" className="w-full bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-white">Confirm Booking</Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-72 p-4 rounded-xl shadow-lg border bg-white">
                    <h3 className="text-lg font-semibold text-slate-800 mb-3 text-center ">Select Payment Method</h3>
                    <div className="flex flex-col gap-3">
                      <Button variant="outline" onClick={() => handleSubmit("Cash on Delivery")} disabled={orderLoading} className="cursor-pointer flex items-center justify-start gap-2">
                        {orderLoading ? "Processing..." : <><Wallet2 className="w-4 h-4" /> Cash on Delivery</>}
                      </Button>
                      <Button variant="outline" onClick={() => handleSubmit("Online Payment")} disabled={orderLoading} className="cursor-pointer flex items-center justify-start gap-2">
                        {orderLoading ? "Processing..." : <><CreditCard className="w-4 h-4" /> Online Payment</>}
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Pricing Table */}
        <div>
          <h3 className="text-xl font-semibold">Service Pricing</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shop?.services?.map((service, index) => (
                <TableRow key={index}>
                  <TableCell>{service?.name}</TableCell>
                  <TableCell>₹{service?.cost}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Map */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-4 text-slate-800">Location on Map</h3>
          <div className="rounded-lg overflow-hidden border">
            <iframe
              title="Laundry Location"
              src={`https://www.google.com/maps?q=${shop?.location?.lat},${shop?.location?.lng}&z=15&output=embed`}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
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
