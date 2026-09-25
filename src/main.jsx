import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import App from "~/App.jsx";
import { store, persistor } from "~/store/store";
import "~/styles/reset.css";
import "~/styles/main.css";
import "~/i18n";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
);
