import AppProvider from './contexts/AppContext';
import AppNavigation from './navigations/AppNavigation';

export default function App() {

  return (
    <AppProvider>
      <AppNavigation />
    </AppProvider>
  )
}
