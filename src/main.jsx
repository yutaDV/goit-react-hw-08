import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; // Імпортуємо PersistGate
import { store, persistor } from './redux/store'; 
import App from './App.jsx';
import './index.css';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <Provider store={store}>
    {/* PersistGate використовується для очікування відновлення стану */}
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

