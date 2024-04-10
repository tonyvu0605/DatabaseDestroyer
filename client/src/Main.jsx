import 'themes/global.scss';
import { Provider } from 'react-redux';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { store, persistor } from 'reduxes/store';
import { HelmetProvider } from 'react-helmet-async';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Suspense fallback="">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <HelmetProvider>
            <QueryClientProvider client={queryClient}>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </QueryClientProvider>
          </HelmetProvider>
        </PersistGate>
      </Provider>
    </Suspense>
  </React.StrictMode>
);
