import './navbar.scss'

const Navbar = () => {
    return ( 
        <header>
            <p>Nene's delicacy</p>
            <div>
                <div className="user">
                    <ion-icon size="small" name="chevron-down-sharp"></ion-icon>
                    <ion-icon name="person-outline"></ion-icon>

                    <div className="dropdown">
                            <ul>
                                <li>My orders</li>
                                <li>Sign out</li>
                            </ul>
                    </div>
                </div>

                <ion-icon name="bag-outline"></ion-icon>
            </div>
        </header>
     );
}

export default Navbar;