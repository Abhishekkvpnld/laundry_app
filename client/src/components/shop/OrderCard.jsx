import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const OrderCard = ({ order, onStatusChange }) => {
  return (
    <Card className="p-2 sm:p-4">
      {/* Header */}
      <CardHeader className="p-0 mb-2">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-800">
              {order?.customerName}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">{order?.address}</p>
          </div>
          <Badge
            variant="outline"
            className="self-start sm:self-center text-[10px] sm:text-xs px-2 py-0.5 border-slate-300"
          >
            #{order?.id}
          </Badge>
        </div>
      </CardHeader>

      {/* Body */}
      <CardContent className="space-y-2 text-xs sm:text-sm">
        {/* Location */}
        <div className="flex items-center gap-2 text-blue-600">
          <MapPin className="w-4 h-4" />
          <span className="truncate">{order.place}</span>
        </div>

        {/* Bill */}
        <div className="flex justify-between">
          <span className="font-medium text-slate-700">Bill:</span>
          <span className="text-green-600 font-semibold">
            ₹{order?.billAmount}
          </span>
        </div>

        {/* Payment Status */}
        <div className="flex justify-between items-center">
          <span className="font-medium text-slate-700">Payment:</span>
          {order?.isPaid ? (
            <Badge className="bg-green-100 text-green-700 text-[10px] sm:text-xs">
              Paid
            </Badge>
          ) : (
            <Badge className="bg-red-100 text-red-700 text-[10px] sm:text-xs">
              Unpaid
            </Badge>
          )}
        </div>

        {/* Payment Type */}
        <div className="flex justify-between">
          <span className="font-medium text-slate-700">Payment Type:</span>
          <span className="capitalize">{order?.paymentType}</span>
        </div>

        {/* Date */}
        <div className="flex justify-between">
          <span className="font-medium text-slate-700">Date:</span>
          <span>{new Date(order?.date).toLocaleDateString()}</span>
        </div>

        {/* Status Update */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <span className="font-medium text-slate-700">Status:</span>
          <Select
            defaultValue={order?.status}
            onValueChange={(value) => onStatusChange(order.id, value)}
          >
            <SelectTrigger className="w-full sm:w-[140px] h-8 text-xs">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Received">📥 Received</SelectItem>
              <SelectItem value="In Process">⚙️ In Process</SelectItem>
              <SelectItem value="Ready for Pickup">📦 Ready for Pickup</SelectItem>
              <SelectItem value="Delivered">✅ Delivered</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
