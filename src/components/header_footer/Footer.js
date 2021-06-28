import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <footer id="footer">
                <div className="container">
                    <div className="copyright">
                        &copy; Copyright <strong><span>Farid Pathan</span></strong>
                    </div>
                    <div className="credits">
                        Designed by <a href="https://plenarysoft.com/">Farid Pathan</a>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;