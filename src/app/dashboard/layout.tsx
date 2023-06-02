import { DashboardProvider } from '@/contexts/DashboardContext';

export default function DashboardLayout({ children }: { children: React.ReactNode; }) {
  return <>
    <main>
      <DashboardProvider>
        {children}
      </DashboardProvider>
    </main>
  </>;
}