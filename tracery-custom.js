exports.modifiers = function(g) {
  var current_city = "";
  
  var state = {
    city: "",
    dungeon: "",
    hero: {},
    villain: {}
  }
  return {
    test: function(s) {
      return("test returned: " + s);
    },
    indirect: function(s) {
      return(g.flatten("#" + s + "#"));
    },
    
    current_city: function(s) {
      if(s) {
        current_city = s;
        return(s);
      } else {
        return current_city;
      }
    },
    
    current_tribe: function(s) {
      if(s) {
        current_tribe = s;
        return(s);
      } else {
        return(current_tribe);
      }
    }
    
    // fetch character info
    name: function(s) {
      return state[s].name;
    },
    
    weapon: function(s) {
      return state[s].weapon;
    }
  };
};