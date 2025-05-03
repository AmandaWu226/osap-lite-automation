import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto">
        <Outlet />
      </main>
    </div>
  );
}