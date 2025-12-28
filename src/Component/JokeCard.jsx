import { useState } from "react";

const JokeCard = () => {
    const [joke, setJoke] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    const fetchJoke = async () => {
        setLoading(true);
        setJoke(null);
        setError(null);

        try {
            const response = await fetch("https://official-joke-api.appspot.com/random_jok");
            const data = await response.json();
            setJoke(data);
        }
        catch {
            setError("Could not fetch a joke. Try again.")
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <>
            <div className="container">
                <h1>Random Joke</h1>
                <p>Click the button to fetch a fresh one.</p>
                <button onClick={fetchJoke} disabled={loading}>
                    {loading ? "Fetching..." : "Fetch joke"}
                </button>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {error && <p className="retry" onClick={fetchJoke}>
                    Try again
                </p>}
                {
                    joke && (
                        <div>
                            <p>{joke.setup}</p>
                            <p>
                                <strong>
                                    {joke.punchline}
                                </strong>
                            </p>
                        </div>
                    )
                }
                {!joke && !loading && !error && <p>No joke yet.</p>}
            </div>
        </>
    )
}

export default JokeCard;