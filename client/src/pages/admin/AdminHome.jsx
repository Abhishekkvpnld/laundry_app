import AdminChart from "@/components/admin/AdminCharts";


const AdminHome = () => {
  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Welcome Back, Admin!</h1>
        <p className="text-gray-600 mt-1">Here’s a quick overview of your laundry service activity.</p>
      </div>
      <AdminChart />
    </div>
  );
};

export default AdminHome;
