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


const PAGE_LIMIT = 20


function Pokedex(props) {
    const { pokemonNames, pokemonNameIndexMap } = props
    const [value, setValue] = useState("");
    const [pageNumber, setPageNumber] = useState(0)

    const filteredPokemonNames = pokemonNames.filter(pokemonName => pokemonName.includes(value))

    function goToNextPage() {
        setPageNumber(Math.min(pageNumber + 1, pokemonNames.length / PAGE_LIMIT))
    }

    function goToPrevPage() {
        setPageNumber(Math.max(0, pageNumber - 1))
    }

    console.log({ pageNumber })
    const elements = filteredPokemonNames.map((pokemonName, index) => <Pokemon key={pokemonName} pokemonIndex={pokemonNameIndexMap[pokemonName]} pokemonName={pokemonName} />)
    const startIndex = pageNumber * PAGE_LIMIT
    const endIndex = startIndex + PAGE_LIMIT
    const pagedElements = elements.slice(startIndex, endIndex)
    return <div>
        <h1> PokeDex</h1>
        <input value={value} onChange={(event) => {
            setValue(event.target.value)
        }} />
        <ul>
            {pagedElements}
        </ul>
        <button onClick={goToNextPage}>Next</button>
        <button onClick={goToPrevPage}>Prev</button>
        <br />
        <br /><br />
        <br />
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