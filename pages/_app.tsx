import '../styles/globals.scss';
import ContentLayout from '../shared/layout-components/layout/content-layout';
import Authenticationlayout from "../shared/layout-components/layout/authentication-layout";
import Landinglayout from '@/shared/layout-components/layout/landing-layout';
import { Provider } from "react-redux";
import { persistor, store } from "../src/state";
import { PersistGate } from "redux-persist/integration/react";

const layouts:any = {

  Contentlayout: ContentLayout,
  Landinglayout: Landinglayout,
  Authenticationlayout: Authenticationlayout,

};
function MyApp({ Component, pageProps }:any) {
  
  const Layout = layouts[Component.layout] || ((pageProps: any) => <Component>{pageProps}</Component>);

  return (
    <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
       <Layout>
      <Component {...pageProps} />
    </Layout>

       </PersistGate>
      


    </Provider>

  
    
  )
}

export default MyApp;