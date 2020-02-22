import React, { Component } from 'react';
import { withRouter } from 'react-router';

class SpecificPokemon extends Component {
    state = {
        data: null,
        loaded: false
    }
    componentDidMount() {
        const pokemonIndex = this.props.match.params.pokemonIndex;
        setTimeout(() => {
            fetch("https://pokeapi.co/api/v2/pokemon-species/" + pokemonIndex)
                .then(response => response.json())
                .then(jsonReponse => {
                    this.setState({
                        data: jsonReponse,
                        loaded: true
                    })
                })
        }, 3000)
    }
    render() {
        const pokemonName = this.props.match.params.pokemonName;
        if (!this.state.loaded) {
            return null;
        }
        return (
            <div>
                <h1>{pokemonName}</h1>
                <h3>Stats</h3>
                <ol>
                    <li>Base happiness : {this.state.data.base_happiness}</li>
                    <li>Capture Rate : {this.state.data.capture_rate}</li>
                </ol>
            </div>
        );
    }
}

export default withRouter(SpecificPokemon);