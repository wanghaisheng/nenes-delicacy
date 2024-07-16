import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const Navbar = lazy(() => import( '../navbar/navbar'));
const Footer = lazy(() => import('../footer/footer'));

function Layout() {
    return ( 
        <>
        <Suspense><Navbar /></Suspense>
        <Outlet />
        <Suspense><Footer/></Suspense>
        </>
     );
}

export default Layout;