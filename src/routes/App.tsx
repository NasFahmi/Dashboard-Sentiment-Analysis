import { AuthProvider } from '@/provider/AuthProvider';
import AppRouter from './AppRouter';

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
