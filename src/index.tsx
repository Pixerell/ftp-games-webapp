import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/store'
import {Provider} from 'react-redux'
import {ConfigProvider} from 'antd';
import {customTheme} from './themeConfig';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
        <React.StrictMode>
            <ConfigProvider theme={customTheme}>
                <App/>
            </ConfigProvider>
        </React.StrictMode>
    </Provider>
);

reportWebVitals();
