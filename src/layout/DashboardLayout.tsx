// src/components/layout/DashboardLayout.tsx
import { Outlet } from 'react-router';
import MobileOverlay from '@/components/dashboard/MobileOverlay';
import SidebarComponent from '@/components/dashboard/SidebarComponent';
import TopHeaderBarComponent from '@/components/dashboard/TopHeaderBarComponent';


const DashboardLayout = () => {
  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
      <MobileOverlay />
      
      <div className="flex h-screen max-h-screen overflow-hidden">
        <SidebarComponent />
        
        <div className="flex flex-col flex-1 lg:ml-70 bg-white">
          <TopHeaderBarComponent />
          
          {/* Area konten halaman spesifik */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="mx-auto max-w-7xl w-full">
               <Outlet /> {/* 👈 Child routes akan muncul di sini */}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;