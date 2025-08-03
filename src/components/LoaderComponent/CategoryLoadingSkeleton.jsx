// components/CategoryLoadingSkeleton.jsx
const CategoryLoadingSkeleton = ({ count }) => {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className="h-8 w-24 animate-pulse rounded-full bg-gray-200"
        ></div>
      ))}
    </>
  );
};

export default CategoryLoadingSkeleton;
