import { NavLink } from "react-router-dom";

function CountryCard({ country }) {
    const { flags, name, population, region, capital } = country;

    return (
        <div className="country-card">
            <div className="container-card">
                <img src={flags.svg} alt={flags.alt} className="country-flag" />
                <div className="countryInfo">
                    <p className="card-title">
                        {name.common.length > 10
                            ? name.common.slice(0, 10) + "..."
                            : name.common}
                    </p>
                    <p>
                        <strong>Population:</strong> {population.toLocaleString()}
                    </p>
                    <p>
                        <strong>Region:</strong> {region}
                    </p>
                    <p>
                        <strong>Capital:</strong> {capital?.[0]}
                    </p>

                    <NavLink to={`/country/${country.cca3}`}>
                        <button className="read-more-btn">Read More</button>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default CountryCard;
