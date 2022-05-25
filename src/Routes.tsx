
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import App from './App';
import Home from './views/Home';
import Pricing from './views/Pricing';

// 路由配置
const routes = [
    {
        path: '/',
        element: App,
        children: [
            {
                path: '',
                element: Home,
            },
            {
                path: 'pricing',
                element: Pricing,
            },
        ]
    },
];

/**
 * 嵌套路由
 */
function nestRoute(routeMap: any[]) {
    return routeMap.map((route, index) =>
    (
        <Route key={index} path={route.path} element={<route.element />} >
            {
                (route.children && route.children.length) ? nestRoute(route.children) : null
            }
        </Route>
    )
    );
}

export default function () {
    return (
        <BrowserRouter>
            <Routes>
                {
                    nestRoute(routes)
                }
            </Routes>
        </BrowserRouter>
    )
}