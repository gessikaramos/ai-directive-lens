import { Outlet } from 'react-router-dom';
import TopNav from './TopNav';
import StudioFooter from './StudioFooter';

export default function StudioLayout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopNav />
      <div className="flex-1 pt-16">
        <Outlet />
      </div>
      <StudioFooter />
    </div>
  );
}
