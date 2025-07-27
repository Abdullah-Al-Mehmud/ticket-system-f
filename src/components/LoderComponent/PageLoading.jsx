export default function DataLoadingLoader() {
  return (
    <div className="flex items-center justify-center min-h-[150px]">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-dashed border-blue-500 rounded-full animate-spin"></div>
        <div className="absolute inset-4 bg-blue-500 rounded-full animate-ping"></div>
      </div>
      <p className="ml-4 text-blue-600 font-semibold text-lg animate-pulse">
        Loading data...
      </p>
    </div>
  );
}
