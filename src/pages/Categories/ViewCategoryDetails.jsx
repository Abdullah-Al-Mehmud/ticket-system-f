import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetCategoryByIdQuery,
  useDeleteCategoryMutation,
} from "../../redux/features/categories/categoriesApiSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import {
  Hash,
  Shield,
  Calendar,
  Activity,
  Trash2,
  Pencil,
  User,
} from "lucide-react";
import PageLoading from "../../components/LoderComponent/PageLoading";

const ViewCategoryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetCategoryByIdQuery(id);
  const [deleteCategory] = useDeleteCategoryMutation();

  const category = data?.data;

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(category.id).unwrap();
        toast.success("Category deleted successfully");
        navigate("/admin/categories", { state: { refresh: true } });
      } catch (err) {
        toast.error(err?.data?.message || "Failed to delete category");
        console.error("❌ Delete Error:", err);
      }
    }
  };

  const handleEdit = () => {
    navigate(`/admin/categories/edit/${category.id}`);
  };

  if (isLoading)
    return <p className="text-center text-gray-500 mt-10"><PageLoading/></p>;

  if (error || !category)
    return (
      <p className="text-center text-red-500 mt-10">
        Failed to load category details.
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Category Details
            </h1>
            <p className="text-gray-600 text-sm">Overview of category</p>
          </div>

          <div className="flex items-center gap-2">
            <Badge
              variant={
                category.status === "active"
                  ? "outline"
                  : category.status === "inactive"
                  ? "destructive"
                  : "secondary"
              }
              className="capitalize px-3 py-1"
            >
              {category.status}
            </Badge>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleEdit}
              title="Edit Category"
              className="text-blue-600 hover:bg-blue-100"
            >
              <Pencil size={18} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleDelete}
              title="Delete Category"
              className="text-red-600 hover:bg-red-100"
            >
              <Trash2 size={18} />
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="bg-white border-b">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <CardTitle className="text-xl text-gray-900">
                  {category.name}
                </CardTitle>
                <p className="text-sm text-gray-500 mt-1">
                  ID: #{category.id}
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Info label="Category ID" icon={<Hash />} value={category.id} />
            <Info
              label="Status"
              icon={<Shield />}
              value={category.status}
              className="capitalize"
            />
            <Info
              label="Created At"
              icon={<Calendar />}
              value={new Date(category.created_at).toLocaleString()}
            />
            <Info
              label="Updated At"
              icon={<Activity />}
              value={new Date(category.updated_at).toLocaleString()}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// 🔹 Info Component
const Info = ({ label, value, icon, className = "" }) => (
  <div className="space-y-1">
    <div className="flex items-center gap-2 text-sm text-gray-500">
      {icon}
      <span>{label}</span>
    </div>
    <p className={`text-gray-900 ${className}`}>{value}</p>
  </div>
);

export default ViewCategoryDetails;
