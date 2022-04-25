import { BrowserRouter } from "react-router-dom"
import AppRoute from "./router/AppRouter";
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';
function App() {
  return <ConfigProvider locale={zhCN}>
    <div style={{ width: '100%', height: '100%' }}>
      <BrowserRouter>
        <AppRoute />
      </BrowserRouter>
    </div>
  </ConfigProvider>
}
export default App;
