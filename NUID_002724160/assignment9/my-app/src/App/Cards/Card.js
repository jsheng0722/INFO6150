import React from 'react';

class Square extends React.Component {
  render() {
    var squareStyle = {
      height: 150,
      backgroundColor: this.props.color,
      borderRadius: "10px 10px 0 0",
      position: "relative"
    };
    
    return (
      <div style={squareStyle}>
        <img src={this.props.image} alt={this.props.color} style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px 10px 0 0"}} />
      </div>
    );
  }
}

class Label extends React.Component {
  render() {
    var labelStyle = {
      fontFamily: "sans-serif",
      fontWeight: "bold",
      padding: 13,
      margin: 0,
      backgroundColor: "#FFF",
      borderBottomLeftRadius: "10px",
      borderBottomRightRadius: "10px"
    };
    
    var textStyle = {
      fontFamily: "sans-serif",
      padding: "10px",
      paddingLeft: 20,
    };

    return (
      <div>
        <p style={labelStyle}>{this.props.title}</p>
        <p style={textStyle}>{this.props.text}</p>
      </div>
    );
  }
}

class Card extends React.Component {
  render() {
    var cardStyle = {
      height: 250,
      width: 180,
      backgroundColor: "#FFF",
      WebkitFilter: "drop-shadow(0px 0px 5px #666)",
      filter: "drop-shadow(0px 0px 5px #666)",
      borderRadius: "10px",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      margin: "10px auto"
    };
    return (
      <div style={cardStyle}>
        <Square color={this.props.color} image={this.props.image} />
        <Label title={this.props.title} text={this.props.text}/>
        
      </div>
    );
  }
}

export default Card;