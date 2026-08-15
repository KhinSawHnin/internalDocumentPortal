import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Topbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 bg-slate-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
