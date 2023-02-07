
import './lib/dayjs'
import { AuthGoogleProvider } from './contexts/AuthContext';
import { AppRoutes } from './routes/routes';
import { SignIn } from './screens/Auth';
import './styles/global.css';

export function App() {
  return (
      <AuthGoogleProvider>
      <AppRoutes />
      </AuthGoogleProvider>
  )
}

