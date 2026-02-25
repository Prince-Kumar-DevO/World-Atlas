import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="home-container">
            <div className="home-content">
                <h1 className="home-title">World Atlas</h1>
                <p className="home-description">
                    World Atlas lets you explore every country with clear,
                    focused facts like capital, population, region, subregion,
                    timezone, local date, and current time, all in one clean view.
                </p>

                <div className="region-buttons">
                    <button className="region-btn">ALL OVER THE WORLD 🌎 ATLAS</button>
                </div>
            </div>

            <div className="home-globe">
                <img src={`${import.meta.env.BASE_URL}globe-png.png`} alt="World Globe" className="rotating-globe" />
            </div>
        </div>
    );
}

export default Home;
