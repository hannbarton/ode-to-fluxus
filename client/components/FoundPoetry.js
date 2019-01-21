import React from 'react'
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class FoundPoetry extends React.Component {

        render(){
          var circleStyle = {
            padding:10,
            margin:20,
            display:"inline-block",
            // backgroundColor: "blue",
            borderStyle: 'solid',
            borderColor: '#1f252d',
            borderWidth: 2,
            borderRadius: "50%",
            width:100,
            height:100,
          };

          return (
            <div><div style={circleStyle}/>

                <p>hellowowlrd</p>
            </div>
          );

          }


}

export default FoundPoetry
