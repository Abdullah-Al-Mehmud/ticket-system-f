import React, { useState, useEffect } from "react";
import { Switch } from "../../../../components/ui/switch";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import { useGetPaymentMethodsQuery, useUpdatePaymentMethodStatusMutation } from "../../../../store/features/paymentMethod/PaymentMethodApiSlice";
import TableRowSkeleton from "../../../../components/common/loaderComponent/TableRowSkeleton";

const PaymentMethodsList = () => {
    const [configPage, setConfigPage] = useState({
        page: 1,
        count: 10,
        search: "",
        status: "",
    });

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");

    const [paymentMethods, setPaymentMethods] = useState([]);

    const { data, isLoading, isError, refetch } = useGetPaymentMethodsQuery(configPage);

    const [updateStatus] = useUpdatePaymentMethodStatusMutation();

    useEffect(() => {
        if (data?.data) {
            setPaymentMethods(data.data);
        }
    }, [data]);

    useEffect(() => {
        refetch();
    }, [refetch]);

    const handleStatusToggle = async (id, checked) => {
        const newValue = checked ? 1 : 0;

        setPaymentMethods((prev) =>
            prev.map((pm) => (pm.id === id ? { ...pm, is_active: newValue } : pm))
        );

        try {

            await updateStatus({ id, data: { is_active: newValue } }).unwrap();
            toast.success(`Payment method ${checked ? "activated" : "deactivated"}!`);
        } catch (err) {
            console.error("Failed to update status:", err);

            toast.error("Failed to update status. Please try again.");

            const oldValue = !checked ? 1 : 0;
            setPaymentMethods((prev) =>
                prev.map((pm) => (pm.id === id ? { ...pm, is_active: oldValue } : pm))
            );
        }
    };


    const lastPage = data?.last_page || 1;
    const currentPage = data?.current_page || 1;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Page Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-semibold text-gray-900">All Payment Methods</h1>
                    <p className="mt-2 text-gray-600">Manage all payment methods and their status.</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg border p-6 mb-6">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    {/* Search Input */}
                    <div className="flex-1 flex gap-2 w-full flex-wrap">
                        <div className="relative flex-1 min-w-[180px]">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search payment methods..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        setConfigPage((prev) => ({ ...prev, search, page: 1 }));
                                    }
                                }}
                                className="w-full pl-10 pr-4 py-3 border border-amber-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                            />
                        </div>

                        <button
                            onClick={() => setConfigPage((prev) => ({ ...prev, search, status, page: 1 }))}
                            className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                        >
                            Search
                        </button>

                        <button
                            onClick={() => {
                                setSearch("");
                                setStatus("");
                                setConfigPage((prev) => ({ ...prev, search: "", status: "", page: 1 }));
                            }}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm font-medium"
                        >
                            Clear
                        </button>
                    </div>

                    {/* Status Filter */}
                    <select
                        value={status}
                        onChange={(e) => {
                            const value = e.target.value;
                            setStatus(value);
                            setConfigPage((prev) => ({ ...prev, status: value, page: 1 }));
                        }}
                        className="w-full sm:w-48 px-4 py-3 border border-amber-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                        <option value="">All Status</option>
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg border overflow-hidden">
                {isError ? (
                    <div className="p-6 text-center text-red-500">Failed to load payment methods. Please try again later.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    {["ID", "Name", "Status", "Config"].map((heading) => (
                                        <th
                                            key={heading}
                                            className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            {heading}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {isLoading ? (
                                    <TableRowSkeleton count={4} />
                                ) : paymentMethods.length > 0 ? (
                                    paymentMethods.map((method) => (
                                        <tr key={method.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">#{method.id}</td>
                                            <td className="px-6 py-4 text-sm">{method.name}</td>
                                            <td className="px-6 py-4 text-sm ">
                                                <Switch
                                                    checked={method.is_active}
                                                    onCheckedChange={(checked) => handleStatusToggle(method.id, checked)}
                                                />
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <pre>{JSON.stringify(method.config, null, 2)}</pre>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="text-center py-12 text-gray-500">
                                            No payment methods found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {lastPage > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
                    {[...Array(lastPage)].map((_, idx) => {
                        const pageNum = idx + 1;
                        return (
                            <button
                                key={pageNum}
                                onClick={() => setConfigPage((prev) => ({ ...prev, page: pageNum }))}
                                className={`px-4 py-2 text-sm rounded-md border ${pageNum === currentPage
                                    ? "bg-amber-600 text-white"
                                    : "bg-white hover:bg-amber-100 text-gray-700 border-gray-300"
                                    }`}
                            >
                                {pageNum}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default PaymentMethodsList;