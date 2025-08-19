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
    case "Pending":
      return "bg-yellow-600 text-white font-semibold border border-yellow-300";
    case "In Progress":
      return "bg-blue-600 text-white font-semibold border border-blue-300";
    case "Completed":
      return "bg-green-600 text-white border font-semibold border-green-300";
    default:
      return "bg-gray-100 text-gray-700 border font-semibold border-gray-300";
  }
};

const OrderTable = ({ orders, onStatusChange }) => {
  return (
    <Card className={"overflow-x-scroll"}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-slate-800">
          Order History
        </CardTitle>
      </CardHeader>
      <CardContent className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Bill</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.map((order) => (
              <TableRow key={order?.id}>
                <TableCell className={"text-slate-500 font-semibold"}>
                  {order?.id}
                </TableCell>
                <TableCell>{order?.customerName}</TableCell>
                <TableCell>{order?.address}</TableCell>
                <TableCell className="flex items-center gap-1 text-blue-700">
                  <MapPin className="w-4 h-4" />
                  {order?.place}
                </TableCell>
                <TableCell className="text-green-600 font-semibold">
                  ₹{order?.billAmount}
                </TableCell>
                <TableCell>
                  {order?.isPaid ? (
                    <Badge className="bg-green-100 text-green-700">
                      Paid
                    </Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-700">Unpaid</Badge>
                  )}
                </TableCell>
                <TableCell className="capitalize">
                  {order?.paymentType}
                </TableCell>
                <TableCell className={"text-slate-500 font-semibold"}>
                  {new Date(order?.date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Select
                    defaultValue={order?.status}
                    onValueChange={(value) => onStatusChange(order?.id, value)}
                  >
                    <SelectTrigger
                      className={`w-[140px] ${getStatusClass(order?.status)}`}
                    >
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
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
