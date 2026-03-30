export default function PropertySkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border animate-pulse">
      {/* Image Placeholder */}
      <div className="w-full h-48 bg-gray-200"></div>
      
      <div className="p-5">
        {/* Title Placeholder */}
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
        {/* Price Placeholder */}
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
        
        <div className="flex flex-col gap-3">
          {/* Status Dropdown Placeholder */}
          <div className="h-10 bg-gray-100 rounded border w-full"></div>
          
          {/* Buttons Placeholder */}
          <div className="flex gap-2 mt-2">
            <div className="h-10 bg-gray-200 rounded w-1/2"></div>
            <div className="h-10 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}