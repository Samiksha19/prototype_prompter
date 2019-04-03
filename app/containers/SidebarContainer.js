import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import SideBar from '../screens/SideBar/SideBar';

const mapStateToProps = (state, ownProps) => {
    return {
        ...state
    }
  }
  
  const mapDispatchToProps = dispatch => (bindActionCreators({
  }, dispatch));
  
  const SidebarContainer =  connect(mapStateToProps, mapDispatchToProps)(SideBar);

  export default SidebarContainer;