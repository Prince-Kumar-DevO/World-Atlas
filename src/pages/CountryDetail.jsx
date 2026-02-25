import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getCountryByCode } from "../services/CountryApi";
import Loader from "../components/Loader";

function CountryDetail() {
    const { code } = useParams();
    const [country, setCountry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [dateTime, setDateTime] = useState(new Date());

    // We use a ref to store the calculated offset in milliseconds so we don't recalculate it every second
    const offsetRef = useRef(0);

    // Fetch country data
    useEffect(() => {
        const fetchCountry = async () => {
            try {
                const res = await getCountryByCode(code);
                const countryData = res.data[0];
                setCountry(countryData);

                // --- CALCULATE OFFSET ONCE HERE ---
                if (countryData?.timezones?.length > 0) {
                    const tz = countryData.timezones[0]; // e.g., "UTC+05:30", "UTC-04:00", or "UTC"

                    if (tz === "UTC") {
                        offsetRef.current = 0;
                    } else {
                        const match = tz.match(/UTC([+-]\d{2}):?(\d{2})?/);
                        if (match) {
                            const hours = parseInt(match[1], 10);
                            const minutes = match[2] ? parseInt(match[2], 10) : 0;

                            // If hours are negative, we must subtract the minutes too
                            const totalMinutes = (hours * 60) + (hours < 0 ? -minutes : minutes);
                            offsetRef.current = totalMinutes * 60 * 1000;
                        }
                    }
                }
            } catch (err) {
                console.error("Failed to fetch country:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCountry();
    }, [code]);

    // Update clock
    useEffect(() => {
        if (!country) return;

        const interval = setInterval(() => {
            const now = new Date();
            // 1. Get current UTC time in ms
            const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);

            // 2. Add the country's specific offset we calculated earlier
            const countryTime = utcTime + offsetRef.current;

            setDateTime(new Date(countryTime));
        }, 1000);

        return () => clearInterval(interval);
    }, [country]);

    if (loading) return <Loader />;
    if (!country) return <p>Country not found</p>;

    // Formatting Logic remains the same...
    const dateStr = dateTime.toLocaleDateString("en-GB", { // specific locale ensures consistency
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    const timeStr = dateTime.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });

    return (
        <div className="country-details-container">
            <div className="country-details-card">
                <img
                    src={country.flags.svg}
                    alt={`${country.name.common} flag`}
                    className="country-flag"
                />

                <h1>{country.name.common}</h1>

                <p><strong>Capital:</strong> {country.capital?.[0] || "N/A"}</p>
                <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                <p><strong>Region:</strong> {country.region}</p>
                <p><strong>Subregion:</strong> {country.subregion}</p>
                {/* Visual Note: Only showing the first timezone, but countries like Russia have many */}
                <p><strong>Timezone:</strong> {country.timezones[0]}</p>

                <hr />

                <p><strong>Date/Day:</strong> {dateStr}</p>
                <p><strong>Time:</strong> {timeStr}</p>
            </div>
        </div>
    );
}

export default CountryDetail;