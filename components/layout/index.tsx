import type { NextPage } from 'next';
import NavBar from '../navbar';
import Footer from '../footer';

const Layout: NextPage = ({ children }) => {
    return (
        <div>
            <NavBar />
            <main> {children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
