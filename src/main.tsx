import React from 'react';

import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { IntlProvider } from "react-intl";
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './services/auth';
import { Provider } from "react-redux";
import { store } from './Store/store';

const messages = {
  "driverProfile.inviteDriver": "Invite driver",
  "driverProfile.logOut": "Log out",
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
    <IntlProvider locale="ru" messages={messages}>
    <UserProvider>
        <BrowserRouter >
          <App />
        </BrowserRouter>
        </UserProvider>
        </IntlProvider>
    </Provider>
  </React.StrictMode>
);
