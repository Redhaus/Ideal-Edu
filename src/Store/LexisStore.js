import { Container } from 'unstated';
import LexisData from '../Containers/Data_EN/lexisData'

class LexisStore extends Container {
    state = {
      lexisData: LexisData,
      lexisSearch: [],
      lexisSelected: [],
      lexisDetail: null,
      lexisID: null
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

    // removeSelected = (id) => {
    //     this.setState({ lexisSelected: this.state.lexisSelected.filter(selected => selected !== id) })
    // }
  
    // decrement = () => {
    //   this.setState({ count: this.state.count - 1 })
    // }
  }
  
  export default LexisStore