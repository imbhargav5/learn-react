import React from 'react';
import { connect } from 'react-redux'

function Home(props) {
    const { pokemonCount } = props;
    return (
        <div>
            <p>Welcome! We have {pokemonCount} loaded. </p>
        </div>
    );
}

function mapStateToProps(state) {
    const { pokedex } = state
    const { pokemonList } = pokedex;
    return {
        pokemonCount: pokemonList.length
    }
}

export default connect(mapStateToProps)(Home);