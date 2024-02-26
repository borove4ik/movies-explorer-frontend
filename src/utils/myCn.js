const myCn = (defaultStyle = '', conditionStyles = {}) => {
    let styles = defaultStyle;
  
    for (const item of Object.entries(conditionStyles)) {
      if (item[1]) {
        styles += ` ${item[0]}`;
      }
    }
  
    return styles;
  };

  export default myCn