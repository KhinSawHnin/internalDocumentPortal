import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './app/store';
import { AuthProvider } from './features/auth/AuthProvider';
import AppRouter from './router/AppRouter';
import { Toaster } from 'react-hot-toast';
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <AppRouter />
             <Toaster position="bottom-right" />
         
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
}
