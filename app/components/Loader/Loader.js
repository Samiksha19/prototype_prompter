
//loader that get called on page open
import React from 'react';
import { ActivityIndicator } from 'react-native';
//Pure, stateless component
const Loader = (props) => {
    if (props.visible == true) {
        return (
               <ActivityIndicator
                    animating={true}
                    style={{                   
                    marginTop: '60%',
                    zIndex: 10
                }}
                    size="large"/>
        );
    }
    else{
        return null;
    }
}

export default Loader;
