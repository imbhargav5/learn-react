
/** 
 *  fuction dispatch(arg){
 *    if(arg is a function){
 *         const returned_function = arg()
 *          returned_function(store, dispatch);
 * }
 * }
 * 
*/

export function loadPokedex() {
    return (dispatch, getState) => {
        dispatch({
            type: "POKEMONLIST_LOADING",
            payload: "We are within thunk"
        })
        fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
            .then(response => response.json())
            .then(jsonResponse => {
                //localStorage.setItem("pokedex", JSON.stringify(jsonResponse))
                // this.setState({
                //     results: jsonResponse.results,
                //     loaded: true
                // })
                dispatch({
                    type: "POKEMONLIST_LOADED",
                    payload: {
                        pokemonList: jsonResponse.results,
                        loaded: true
                    }
                })
            })
    }
}