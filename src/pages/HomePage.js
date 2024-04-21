import anonymityIcon from './assets/anonimity.svg'; // Ensure the file name is correct
import communityIcon from './assets/globe.svg';
import fundingIcon from './assets/piggy.svg';
import accessIcon from './assets/open.svg';

import talkOnlineLogo from './assets/talk_online_logo.ico';  // Example logos
import galadrielLogo from './assets/galadriel_logo.webp';

function HomePage() {
    return (
    <div>
        <section className="hero">
            <div className="container">
            <div className="hero-content">
                <h1 className="hero-heading text-xxl">
                Submit your research papers with confidence.
                </h1>
                <p className="hero-text">
                Join the new decentralized way to discover credible research papers.
                </p>
                <div className="hero-buttons">
                <a href="submit" className="btn btn-primary">Submit a paper</a>
                <a href="browse" className="btn"><i className="fas fa-laptop"></i> Explore papers</a>
                </div>
            </div>
            </div>
        </section>
        <section className="features bg-ac767f">
            <div className="container">
                <div className="feature-grid">
                    {/* Feature Item */}
                    <div className="feature-item">
                        <img src={anonymityIcon} alt="Anonymity" className="feature-icon"/>
                        <h3 className="feature-title">Anonymity</h3>
                        <p>Keep your identity private while submitting or reviewing papers.</p>
                    </div>
                    {/* Repeat for other features */}
                    <div className="feature-item">
                        <img src={communityIcon} alt="Community Driven" className="feature-icon"/>
                        <h3 className="feature-title">Community Driven</h3>
                        <p>After an initial check by AI, the community votes on the validity and quality of submitted papers.</p>
                    </div>
                    <div className="feature-item">
                        <img src={fundingIcon} alt="Self-Funding" className="feature-icon"/>
                        <h3 className="feature-title">Self-Funding</h3>
                        <p>Authors whose papers are accepted receive monetary rewards from a central pool, which is funded by donors and distributed quarterly.</p>
                    </div>
                    <div className="feature-item">
                        <img src={accessIcon} alt="Equal Access" className="feature-icon"/>
                        <h3 className="feature-title">Equal Access</h3>
                        <p>Every researcher has an equal opportunity to submit, view and review papers.</p>
                    </div>
                </div>
            </div>
        </section>
        {/* Powered by section */}
        <section className="powered-by">
            <div className="container">
                <h2 className="powered-title">Powered By</h2>
                <div className="logos">
                    <a href="https://galadriel.com" target="_blank" rel="noopener noreferrer">
                        <img src={galadrielLogo} alt="Galadriel Logo" className="logo" />
                    </a>
                    <a href="https://talk.online/" target="_blank" rel="noopener noreferrer">
                        <img src={talkOnlineLogo} alt="Talk Online Logo" className="logo" />
                    </a>
                </div>
            </div>
        </section>

    </div>
      
    );
}

export default HomePage
