import createStore from 'unistore';
import LexisData from '../Containers/Data_EN/lexisData';
import devtools    from 'unistore/devtools';

// create initial store state
let initialState = { 
    LexisData: LexisData,
    lexisSearch: [],
    lexisSelected: [],
    lexisDetail: null,
    lexisID: null,
    lexisFilter: []
};


// create store and use redux tools to view store
let store = process.env.NODE_ENV === 'production' ?  createStore(initialState) : devtools(createStore(initialState));


// create actions pass in store to function as param
const actions = (store) => ({
    // create functions in this object destruction what you want to update  i.e. {count}
    // implicitly return the updated piece of data with ({ count: count + 1 })

// store will be passed to every function so need to add vars after that
    selectedLexis: (store, id) => {

        console.log("ID: " , id)

        console.log("Store: " , store.lexisSelected)

        if(store.lexisSelected.includes(id)){
            return ({ lexisSelected: store.lexisSelected.filter(selected => selected !== id) })
        }else{
            return ({ lexisSelected: [...store.lexisSelected, id] })
        }
        
    },

    selectedID: (store, id) => {
        console.log("SelectedID: " , id)

        // const { lexisID } = store;
        return ({ lexisID: id })
    },

    storeFilters: (store, filter, filterCallback) => {

        if(filter === "clear"){
            return({lexisFilter: []});
            // return 
        }
    

        if(store.lexisFilter.includes(filter)){
            return({ lexisFilter: store.lexisFilter.filter(selected => selected !== filter) })
        }else{
            return({ lexisFilter: [...store.lexisFilter , filter] })
        }

        filterCallback();
    }




})

export { store , actions};






// storeFilters = (filter) => {

//     if(filter === "clear"){
//         this.setState({lexisFilter: []});
//         return
//     }
  

//     if(this.state.lexisFilter.includes(filter)){
//         this.setState({ lexisFilter: this.state.lexisFilter.filter(selected => selected !== filter) })
//     }else{
//         this.setState({ lexisFilter: [...this.state.lexisFilter , filter] })
//     }
// }


