import { useEffect, useState } from "react";
import { getAllCountries } from "../services/CountryApi";
import CountryCard from "../components/CountryCard";
import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";

function Countries() {
    const [countries, setCountries] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let ignore = false;

        const fetchCountries = async () => {
            try {
                setLoading(true);
                const res = await getAllCountries();

                if (!ignore) {
                    const sortedCountries = res.data.sort((a, b) =>
                        a.name.common.localeCompare(b.name.common)
                    );
                    setCountries(sortedCountries);
                    setLoading(false);
                }
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchCountries();

        return () => {
            ignore = true;
        };
    }, []);

    if (loading) return <Loader />;

    const filteredCountries = countries.filter(c =>
        c.name.common.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <SearchBar search={search} setSearch={setSearch} />

            <div className="country-grid">
                {filteredCountries.map(country => (
                    <CountryCard key={country.cca3} country={country} />
                ))}
            </div>
        </>
    );
}

export default Countries;
