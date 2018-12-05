import createStore from 'unistore';
import LexisData from '../Containers/Data_EN/lexisData';
import devtools    from 'unistore/devtools';
import _ from 'lodash';

// create initial store state
let initialState = { 
    LexisData: LexisData,
    lexisSearch: '',
    lexisSelected: [],
    lexisDetail: null,
    lexisID: null,
    lexisFilter: [],
    filteredLexis: LexisData
};


// create store and use redux tools to view store
let store = process.env.NODE_ENV === 'production' ?  createStore(initialState) : devtools(createStore(initialState));


// create actions pass in store to function as param
const actions = ( store ) => ({
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

    },


    // This is the function that will filter the totalLexis based on category selections
    filterCategory: (store) => {

        // if no filter return fullLexis
        if(store.lexisFilter.length < 1){
            console.log('not called')
            return({filteredLexis: [...LexisData]});
        }

       

            const filters = store.lexisFilter;
        
            console.log(store.filteredLexis)
            // maps though each lex object to get to icons array
            // const fff = store.filteredLexis.map(item => {
                // console.log('outsideCalled')
        
                // filter through lex icons to compare icons arr with filter arr if no difference keep it in
                const filteredLex =  store.LexisData.filter(
                item => _.difference(filters, item.icons).length === 0
                );
    
                // console.log('agter:', filteredLex);
                console.log('filteredLexis', filteredLex)
                // 
                return({ filteredLexis: [...filteredLex] });



    },

    // this filters via search accepts lexis array, search term, and filters
    filterSearch: (store, search) => {

        

        // if there is a search term filter lexis based on it and return
        if(store.lexisSearch){

            search = store.lexisSearch.toUpperCase();
            let searchLex = store.filteredLexis.filter(lexis => lexis.word.toUpperCase().includes(search));
            return ( { filteredLexis: [...searchLex]} );
        }

        // if filters selected search filtered lexis
        if(store.lexisFilter.length > 0){
            search = store.lexisSearch.toUpperCase();
            let searchLex = store.filteredLexis.filter(lexis => lexis.word.toUpperCase().includes(search));
            return ( { filteredLexis: [...searchLex]} );
        }else{ //if no filter and no search search full lexis
            search = store.lexisSearch.toUpperCase();
            let searchLex = store.LexisData.filter(lexis => lexis.word.toUpperCase().includes(search));
            return ( { filteredLexis: [...searchLex]} );
        }

       

    },

    //save search term to store
    searchTerm: (store, term) => {
        return ( { lexisSearch: term } );
    },

    // save detail to store
    detailUpdate: (store) => {
        console.log('detail updte fitred')

        return( { lexisDetail: {...store.filteredLexis[0]} } )
    },

    detailRollover: (store, id) => {
        console.log('rollover updte fitred')

        var detail = store.filteredLexis.filter(item => item.id === id);
        return( { lexisDetail: {...detail[0]}} )
    },

    resetSelected: () => {
        return({ 
            lexisSelected: [...[]],
            lexisSearch: ''

        
        } )
    }

  




})

export { store , actions};

