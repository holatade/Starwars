import React, { useEffect, useState } from "react";
import agent from "../../api/agent";
import axios from "axios";
import { ReactComponent as Logo } from "../../asset/starwars.svg";
import "./homepage.styles.scss";
import Table from "../../components/table/table.component";
import Loader from "../../components/loader/loader.component";

const HomePage = () => {
    const [selectedFilm, setSelectedFilm] = useState(null);
    const [films, setFilms] = useState([]);
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const numStars = 100;

    useEffect(() => {
        agent.Film.getAllFilms()
            .then(data => {
                setFilms(data.results);
            })
            .catch(err => console.log(err))
            .then(() => setLoading(false))
    }, []);

    const getRandomPosition = () => {
        let y = window.innerWidth;
        let x = window.innerHeight;
        let randomX = Math.floor(Math.random() * x);
        let randomY = Math.floor(Math.random() * y);
        return [randomX, randomY];
    }

    const fetchCharacters = async (e) => {
        setSelectedFilm(null);
        setCharacters([]);
        setLoading(true);
       
        var film = JSON.parse(e.target.value);
        let selectFilm = {
            title: film.title,
            episode: "Episode " + film.episode_id,
            opening_crawl: film.opening_crawl
        };

        let characterData = [];
        var charactersLinks = film.characters;
        const promisesInfo = await charactersLinks.map(link =>
            agent.requests.get(link)
        );
        axios.all(promisesInfo).then(data =>
            data.forEach(val => {
                var charObj = {
                    name: val.name,
                    gender: val.gender,
                    height: parseInt(val.height)
                };
                characterData.push(charObj);
                setCharacters(characterData);
                setSelectedFilm(selectFilm);
            })
        ).catch((err) => alert(err) )
        .then(() => {
            setLoading(false);
        })
    }

    return (
        <div className="homepage">
            {
                [...Array(numStars)].map((x, index) => {
                    let xy = getRandomPosition();
                    return (<div key={index} className="star" style={{
                        top: xy[0] + 'px', left: xy[1]
                            + 'px'
                    }}></div>);
                })
            }            
            <Loader loading={loading} /> 
            <div className="logo-container">
                <Logo className={selectedFilm ? "active-logo" : "inactive-logo"} />
            </div>
            <select id="films" name="cars" onChange={fetchCharacters}>
                <option >Chosse a star wars movie</option>
                {films.map((item, index) => (<option key={index} value={JSON.stringify(item)}>
                    {item.title}</option>))}
            </select>
            {
                selectedFilm ? (
                    <div>
                        <div id="scroll-container">
                            <div id="scroll-text">
                                <p id="title">{selectedFilm.title}</p>
                                <p id="subtitle">{selectedFilm.episode}</p>
                                <p>{selectedFilm.opening_crawl}</p>
                            </div>
                        </div>
                        <Table characters={characters} />
                    </div>
                ) : ""
            }
        </div>
    );
}

export default HomePage;