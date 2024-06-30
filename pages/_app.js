import Layout from '@/components/layout/layout';
import { SocketProvider } from '@/context/SocketContext';
import '@/styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App({ Component, pageProps }) {
  return (
    <SocketProvider>
      <Layout>
        <Component {...pageProps} />;
      </Layout>
    </SocketProvider>
  );
}
