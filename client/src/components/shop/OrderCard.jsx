import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
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
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                {order?.customerName}
              </h3>
              <p className="text-sm text-slate-500">{order?.address}</p>
            </div>
            <Badge
              variant="outline"
              className="text-xs px-2 py-0.5 border-slate-300"
            >
              #{order?.id}
            </Badge>
          </div>
        </CardHeader>
  
        <CardContent className="space-y-2 text-sm">
          {/* Location */}
          <div className="flex items-center gap-2 text-blue-600">
            <MapPin className="w-4 h-4" />
            {order.place}
          </div>
  
          {/* Bill */}
          <div className="flex justify-between">
            <span className="font-medium text-slate-700">Bill:</span>
            <span className="text-green-600 font-semibold">
              ₹{order?.billAmount}
            </span>
          </div>
  
          {/* Payment Status */}
          <div className="flex justify-between">
            <span className="font-medium text-slate-700">Payment:</span>
            {order?.isPaid ? (
              <Badge className="bg-green-100 text-green-700">Paid</Badge>
            ) : (
              <Badge className="bg-red-100 text-red-700">Unpaid</Badge>
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
          <div className="flex justify-between items-center">
            <span className="font-medium text-slate-700">Status:</span>
            <Select
              defaultValue={order?.status}
              onValueChange={(value) => onStatusChange(order.id, value)}
            >
              <SelectTrigger className="w-[140px] h-8 text-xs">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  export default OrderCard;
  