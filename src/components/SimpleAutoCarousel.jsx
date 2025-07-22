

const categories = [
  { name: "Fashion Shows", icon: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=250&fit=crop" },
  { name: "Conferences", icon: "https://plus.unsplash.com/premium_photo-1679547203090-6313a91d4478?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Seminars", icon: "https://plus.unsplash.com/premium_photo-1679547202440-356042e564a3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Reunions", icon: "https://images.unsplash.com/photo-1745487383545-f937fc876836?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Exhibitions", icon: "https://plus.unsplash.com/premium_photo-1706445408078-7d629e7a3edf?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Launching", icon: "https://images.unsplash.com/photo-1710371281650-6164e4133ae7?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Stand-up", icon: "https://plus.unsplash.com/premium_photo-1705883063972-4b90b784a086?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Drama", icon: "https://images.unsplash.com/photo-1630050525402-06c617847d27?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Party", icon: "https://plus.unsplash.com/premium_photo-1683121126477-17ef068309bc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Pop Culture", icon: "https://images.unsplash.com/photo-1577640905050-83665af216b9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
];

export default function TrustedOrgsCarousel() {

  
  return (
    <div className="w-full">
      <div className="overflow-hidden whitespace-nowrap w-full bg-white py-4">
      <div
        className="inline-flex animate-scroll"
        style={{
          animation: "scroll 20s linear infinite"
        }}
      >
        {categories.concat(categories).map((item, index) => (
          <div key={index} className="flex flex-col items-center justify-center mx-6">
            <img src={item.icon} alt={item.name} className="h-12 mb-1" />
            <p className="text-sm text-gray-800">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
