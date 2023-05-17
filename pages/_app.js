import store from '@/features/store';
import '@/styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ToastContainer />
    </QueryClientProvider>
  </Provider>

}
