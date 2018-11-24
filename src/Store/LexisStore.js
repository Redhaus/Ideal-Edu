import { Container } from 'unstated';
import LexisData from '../Containers/Data_EN/lexisData'

class LexisStore extends Container {
    state = {
      lexisData: LexisData,
      lexisSearch: [],
      lexisSelected: [],
      lexisDetail: null,
      lexisID: null,
      lexisFilter: []
    }
  
    selectedLexis = (id) => {
        if(this.state.lexisSelected.includes(id)){
            this.setState({ lexisSelected: this.state.lexisSelected.filter(selected => selected !== id) })
        }else{
            this.setState({ lexisSelected: [...this.state.lexisSelected , id] })
        }
    }

    selectedID = (id) => {
        this.setState({
            lexisID: id
        })
    }

    storeFilters = (filter) => {

        if(filter === "clear"){
            this.setState({lexisFilter: []});
            return
        }
      

        if(this.state.lexisFilter.includes(filter)){
            this.setState({ lexisFilter: this.state.lexisFilter.filter(selected => selected !== filter) })
        }else{
            this.setState({ lexisFilter: [...this.state.lexisFilter , filter] })
        }
    }

    

    // removeSelected = (id) => {
    //     this.setState({ lexisSelected: this.state.lexisSelected.filter(selected => selected !== id) })
    // }
  
    // decrement = () => {
    //   this.setState({ count: this.state.count - 1 })
    // }
  }
  
  export default LexisStore