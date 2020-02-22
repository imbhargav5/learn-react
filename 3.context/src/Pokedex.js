import React, { useState, Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { loadPokedex } from './action-creators'

function Pokemon(props) {
    const { pokemonName, pokemonIndex } = props;
    return <li>
        <img style={{ "height": 60, "width": 60 }} src={"/sprites/" + pokemonIndex + ".png"} />
        <span><Link to={`/pokedex/${pokemonName}/${pokemonIndex}`}>
            {pokemonName}
        </Link></span>
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
    componentDidMount() {
        // const pokedexResponse = localStorage.getItem("pokedex");
        // if (pokedexResponse) {
        //     return this.setState({
        //         results: JSON.parse(pokedexResponse).results,
        //         loaded: true
        //     })
        // }
        const { dispatch } = this.props;
        dispatch(loadPokedex());

    }
    render() {
        const { pokedex } = this.props;
        const { pokemonList, loaded } = pokedex;
        const pokemonNames = pokemonList.map(obj => obj.name);
        const pokemonNameIndexMap = {}

        pokemonNames.forEach((pokemonName, index) => {
            pokemonNameIndexMap[pokemonName] = index + 1
        })

        if (loaded) {
            return <Pokedex pokemonNames={pokemonNames}
                pokemonNameIndexMap={pokemonNameIndexMap} >

            </Pokedex>
        } else {
            return <p> .... Loading ...</p>
        }
    }
}

function mapStateToProps(state) {
    return {
        pokedex: state.pokedex
    }
}


export default connect(mapStateToProps)(PokeApiFetcher);