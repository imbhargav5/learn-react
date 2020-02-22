import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

class SpecificPokemon extends Component {
    componentDidMount() {
        const pokemonIndex = this.props.match.params.pokemonIndex;
        const pokemonName = this.props.match.params.pokemonName;

        const { dispatch } = this.props;
        fetch("https://pokeapi.co/api/v2/pokemon-species/" + pokemonIndex)
            .then(response => response.json())
            .then(jsonReponse => {
                dispatch({
                    type: "SPECIFIC_POKEMON_LOADED",
                    payload: {
                        pokemonName: pokemonName,
                        data: jsonReponse
                    }
                })
            })
    }
    render() {
        const pokemonName = this.props.match.params.pokemonName;
        const { specificPokemon } = this.props;
        const dataForPokemon = specificPokemon[pokemonName];
        if (dataForPokemon) {
            return (
                <div>
                    <h1>{pokemonName}</h1>
                    <h3>Stats</h3>
                    <ol>
                        <li>Base happiness : {dataForPokemon.base_happiness}</li>
                        <li>Capture Rate : {dataForPokemon.capture_rate}</li>
                    </ol>
                </div>
            );
        } else {
            return null;
        }

    }
}

function mapStateToProps(state) {
    return {
        specificPokemon: state.specificPokemon
    }
}

export default connect(mapStateToProps)(withRouter(SpecificPokemon));