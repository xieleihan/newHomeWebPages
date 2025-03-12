import { createRoot } from "react-dom/client";

// 引入移动端适配
import "amfe-flexible";

// 引入公共样式
import "./index.css";

// 导入路由内置组件
import { HashRouter } from "react-router-dom";
// 导入项目配置的路由对象
import Router from "./router/index";

// 导入Store
import store from "./store/index";
import { Provider } from "react-redux";

// 导入Lenis
import "lenis/dist/lenis.css";
import Lenis from "lenis";
const lenis = new Lenis();
function raf(time: DOMHighResTimeStamp) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 导入ts
import "./utils/console.js";

// 导入swiper的样式文件
import 'swiper/swiper.scss';

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <HashRouter>
            <Router />
        </HashRouter>
    </Provider>,
);
