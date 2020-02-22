import React, { useState, Component } from 'react';

function Pokemon(props) {
    const { pokemonName, pokemonIndex } = props;
    return <li>
        <img style={{ "height": 60, "width": 60 }} src={"/sprites/" + pokemonIndex + ".png"} /><span>{pokemonName}</span>
    </li>
}



function Pokedex(props) {
    const { pokemonNames, pokemonNameIndexMap } = props
    const [value, setValue] = useState("");
    const filteredPokemonNames = pokemonNames.filter(pokemonName => pokemonName.includes(value))
    const elements = filteredPokemonNames.map((pokemonName, index) => <Pokemon key={pokemonName} pokemonIndex={pokemonNameIndexMap[pokemonName]} pokemonName={pokemonName} />)
    return <div>
        <h1> PokeDex</h1>
        <input value={value} onChange={(event) => {
            setValue(event.target.value)
        }} />
        <ol>
            {elements}
        </ol>
    </div>
}

class PokeApiFetcher extends Component {
    state = {
        results: [],
        loaded: false,
    }
    componentDidMount() {
        // const pokedexResponse = localStorage.getItem("pokedex");
        // if (pokedexResponse) {
        //     return this.setState({
        //         results: JSON.parse(pokedexResponse).results,
        //         loaded: true
        //     })
        // }
        setTimeout(() => {
            fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
                .then(response => response.json())
                .then(jsonResponse => {
                    //localStorage.setItem("pokedex", JSON.stringify(jsonResponse))
                    this.setState({
                        results: jsonResponse.results,
                        loaded: true
                    })
                })
        }, 3000)
    }
    render() {
        const pokemonNames = this.state.results.map(obj => obj.name);
        const pokemonNameIndexMap = {}

        pokemonNames.forEach((pokemonName, index) => {
            pokemonNameIndexMap[pokemonName] = index + 1
        })

        if (this.state.loaded) {
            return <Pokedex pokemonNames={pokemonNames}
                pokemonNameIndexMap={pokemonNameIndexMap} >

            </Pokedex>
        } else {
            return <p> .... Loading ...</p>
        }
    }
}


export default PokeApiFetcher;