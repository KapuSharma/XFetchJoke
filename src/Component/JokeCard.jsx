import { useState } from "react";

const JokeCard = () => {
    const [joke, setJoke] = useState();
    const [error, setError] = useState();
    const [loading, setLoading]= useState();

    const fetchJoke = async() => {
        setLoading(true);
        setJoke(null);
        setError(null);

        try {
            const response = await fetch("https://official-joke-api.appspot.com/random_joke");
            const data = await response.json();
        setJoke(data);
        } 
        catch {
            setError("Could not fetch a joke. Try Again.")
        }
        finally{
            setLoading(false);
        }
    }
    return(
        <>
            <div className="container">
                <h1>Random Joke</h1>
                <p>Click the button to fetch a fresh one.</p>
                <button onClick={fetchJoke} disabled={loading}>
                    {loading ? "Fetching..." : "Fetch Joke"}
                </button>
                {error && <p style={{ color: "red" }}>{error}</p>}
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
                {!joke && <p>No joke yet.</p>}
            </div>
        </>
    )
}

export default JokeCard;