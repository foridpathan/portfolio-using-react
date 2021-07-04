import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <footer id="footer">
                <div className="container">
                    <div className="copyright">
                        &copy; Copyright <strong><span>iPortfolio</span></strong>
                    </div>
                    <div className="credits">
                        Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a> | Develop by <a href="https://forid-pathan.web.app">Faridul Islam</a>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
