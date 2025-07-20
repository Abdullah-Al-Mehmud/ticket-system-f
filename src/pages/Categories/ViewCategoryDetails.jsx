import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Hash, Shield, Calendar, Activity, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetCategoryByIdQuery,
  useDeleteCategoryMutation,
} from "../../redux/features/categories/categoriesApiSlice";

export default function ViewCategoryDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, error } = useGetCategoryByIdQuery(id);
  const [deleteCategory] = useDeleteCategoryMutation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-gray-500">Loading category details...</div>
      </div>
    );
  }

  if (error || !data || !data.data) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-red-500">Error loading category details</div>
      </div>
    );
  }

  const category = data.data;

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(category.id);
        alert("Category deleted successfully");
        navigate("/admin/categories", { state: { refresh: true } });
      } catch (err) {
        console.error("Failed to delete category:", err);
        alert("Failed to delete category");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Category Details
            </h1>
            <p className="text-gray-600 mt-1">
              Overview of a specific category
            </p>
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
            <button
              onClick={handleDelete}
              className="text-red-600 hover:text-red-800 hover:bg-red-100 p-2 rounded"
              title="Delete Category"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        <Card className="border border-gray-200">
          <CardHeader className="border-b border-gray-200 bg-white">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <CardTitle className="text-xl text-gray-900">
                  {category.name}
                </CardTitle>
                <p className="text-sm text-gray-500 mt-1">
                  Category ID: #{category.id}
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <div className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Hash className="w-4 h-4 text-gray-400" />
                    <label className="text-sm font-medium text-gray-500">
                      Category ID
                    </label>
                  </div>
                  <p className="text-gray-900 font-mono text-sm bg-gray-50 px-3 py-2 rounded border">
                    {category.id}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-gray-400" />
                    <label className="text-sm font-medium text-gray-500">
                      Status
                    </label>
                  </div>
                  <p className="text-gray-900 capitalize">{category.status}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <label className="text-sm font-medium text-gray-500">
                      Created At
                    </label>
                  </div>
                  <p className="text-gray-900">
                    {new Date(category.created_at).toLocaleString()}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-gray-400" />
                    <label className="text-sm font-medium text-gray-500">
                      Updated At
                    </label>
                  </div>
                  <p className="text-gray-900">
                    {new Date(category.updated_at).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
