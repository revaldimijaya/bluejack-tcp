import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function NavBar() {
    return (
        <div>
           <nav className="navbar navbar-expand-lg navbar-light bg-light m-0 p-0">
                <div className="container-fluid m-0 p-0">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12 m-0 p-0">
                        <div className="col-sm-12 col-12 border-bottom pb-2 d-flex justify-content-center">
                            <div className="col-sm-11 col-10">
                                <div className="col-xl-6 col-lg-8 col-md-12 col-sm-12 col-8 d-flex align-items-stretch justify-content-start">
                                    <div className="col-lg-1 col-md-1 col-sm-1 col-2 d-flex justify-content-end">
                                        <img src="https://academic-slc.apps.binus.ac.id/assets/ribbon.png" className="img-fluid" alt=""/>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-3 col-10 d-flex justify-content-start p-3">
                                        <img src="https://academic-slc.apps.binus.ac.id/assets/logo.png" className="img-fluid" alt=""/>
                                    </div>
                                    <div className="col-lg-8 col-md-8 col-sm-8"></div>
                                </div>
                                <div className="col-xl-6 col-lg-4 col-md-6"></div>
                            </div>
                        </div>
                        <div className="col-lg-12 border-bottom pb-2 pt-2 shadow-sm d-flex justify-content-center m-0 p-0">
                            <div className="col-lg-11 col-md-11 col-11 m-0 p-0">
                                <div className="container-fluid d-lg-none">
                                    <div className="col-lg-12 d-flex justify-content-between align-items-center">
                                        <div className="col-lg-1">
                                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                                <span className="navbar-toggler-icon"></span>
                                            </button>
                                        </div>
                                        <div className="col-lg-1">
                                            <strong className="col-lg-12 d-flex justify-content-end">
                                                <a href="/" className="link-secondary text-decoration-none col-lg-12">
                                                    <div className="col-lg-12 d-flex align-items-center">
                                                        <div className="col-lg-4 d-flex justify-content-end p-2">
                                                            <FontAwesomeIcon icon="faSignOutAlt" />
                                                            <i className="fas fa-sign-out-alt"></i>
                                                        </div>
                                                        <div className="col-lg-8 d-flex justify-content-start m-0 p-0">
                                                            Sign Out
                                                        </div>
                                                    </div>
                                                </a>
                                            </strong>
                                        </div>
                                    </div>
                                </div>
                                <div className="container-fluid col-lg-12 d-flex justify-content-center align-items-center">
                                    <div className="collapse navbar-collapse col-lg-6" id="navbarSupportedContent">
                                        <div className="col-lg-1"></div>
                                        <div className="col-lg-7 d-flex align-items-center">
                                            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-between">
                                                <li className="nav-item">
                                                    <Link to="/home" style={{ color: '#777777' }} className="font-bold nav-link link-secondary text-decoration-none"><strong>Home</strong></Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to="/home" style={{ color: '#777777' }} className="font-bold nav-link link-secondary text-decoration-none"><strong>Contact Us</strong></Link>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-lg-4"></div>
                                    </div>
                                    <div className="col-lg-6 d-flex justify-content-end d-none d-lg-flex">
                                        <div className="col-lg-2">
                                            <strong>
                                                <a href="/" className="link-secondary text-decoration-none">
                                                    <div className="row d-flex align-items-center">
                                                        <div className="col-lg-4 d-flex justify-content-end">
                                                            <i className="fas fa-sign-out-alt"></i>
                                                        </div>
                                                        <div className="col-lg-8 d-flex justify-content-start m-0 p-0">
                                                            Sign Out
                                                        </div>
                                                    </div>
                                                </a>
                                            </strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar