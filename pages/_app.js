import '../styles/globals.css';
import { Fragment } from 'react';

import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Navigation />
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;
