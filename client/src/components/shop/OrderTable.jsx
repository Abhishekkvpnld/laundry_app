import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { MapPin } from "lucide-react";

const getStatusClass = (status) => {
  switch (status) {
    case "Received":
      return "bg-purple-100 text-purple-700 border border-purple-300";
    case "In Process":
      return "bg-blue-100 text-blue-700 border border-blue-300";
    case "Ready for Pickup":
      return "bg-yellow-100 text-yellow-700 border border-yellow-300";
    case "Delivered":
      return "bg-green-100 text-green-700 border border-green-300";
    default:
      return "bg-gray-100 text-gray-700 border border-gray-300";
  }
};

const OrderTable = ({ orders, onStatusChange }) => {
  return (
    <Card className="shadow-md border rounded-2xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold text-slate-800 tracking-tight">
          📦 Order History
        </CardTitle>
      </CardHeader>

      <CardContent className="overflow-x-auto">
        <Table className="min-w-full border-collapse">
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="text-slate-600 font-semibold">Order ID</TableHead>
              <TableHead className="text-slate-600 font-semibold">Customer</TableHead>
              <TableHead className="text-slate-600 font-semibold">Address</TableHead>
              <TableHead className="text-slate-600 font-semibold">Location</TableHead>
              <TableHead className="text-slate-600 font-semibold">Bill</TableHead>
              <TableHead className="text-slate-600 font-semibold">Payment</TableHead>
              <TableHead className="text-slate-600 font-semibold">Type</TableHead>
              <TableHead className="text-slate-600 font-semibold">Date</TableHead>
              <TableHead className="text-slate-600 font-semibold">Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders?.map((order) => (
              <TableRow
                key={order?.id}
                className="hover:bg-slate-50 transition-colors"
              >
                <TableCell className="text-slate-700 font-medium">
                  #{order?.id}
                </TableCell>
                <TableCell className="font-semibold text-slate-800">
                  {order?.customerName}
                </TableCell>
                <TableCell className="text-slate-600">{order?.address}</TableCell>
                <TableCell className="flex items-center gap-2 text-blue-600 font-medium">
                  <MapPin className="w-4 h-4" />
                  {order?.place}
                </TableCell>
                <TableCell className="text-green-600 font-bold">
                  ₹{order?.billAmount}
                </TableCell>
                <TableCell>
                  {order?.isPaid ? (
                    <Badge className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                      Paid
                    </Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-700 px-3 py-1 rounded-full">
                      Unpaid
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="capitalize text-slate-700">
                  {order?.paymentType}
                </TableCell>
                <TableCell className="text-slate-500">
                  {new Date(order?.date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Select
                    defaultValue={order?.status}
                    onValueChange={(value) => onStatusChange(order?.id, value)}
                  >
                    <SelectTrigger
                      className={`w-[160px] rounded-full text-sm font-medium ${getStatusClass(
                        order?.status
                      )}`}
                    >
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Received">📥 Received</SelectItem>
                      <SelectItem value="In Process">⚙️ In Process</SelectItem>
                      <SelectItem value="Ready for Pickup">📦 Ready for Pickup</SelectItem>
                      <SelectItem value="Delivered">✅ Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default OrderTable;
