var bloodPressureController = (function() {
    //IDs of upper and lower pressure input data
    var DOMstrings = {
      upperPressureValueInput: '#upper-pressure-input-field',
      lowerPressureValueInput: '#lower-pressure-input-field'
    }
    //input values
    var NewMeasurement = function (enumerator, day, month, year, upper, lower) {
      this.enumerator = enumerator;
      this.date = day + "." + month + "." + year + ".";
      this.upperPressure = upper;
      this.lowerPressure = lower;
    };
    //collection of objects representing measurings
    var dataCollection = {
      items: []
    };
    
    return {
      getInput: function () {
        //return array of all measured data
        return dataCollection.items;
      },
      //add new data to the collection of data
      addDataToCollection: function () {
        //define item number, date when generated and upper and lower value
        var num, day, month, upper, lower, item;
        if (dataCollection.items.length) {
          num = dataCollection.items.length;         
        } else {
          num = 0;
        };
        day = new Date().getDate();
        day = (day < 10) ? ("0" + day) : day;
        month = new Date().getMonth() + 1;
        month = (month < 10) ? ("0" + month) : month;
        upper = document.querySelector(DOMstrings.upperPressureValueInput).value;
        lower = document.querySelector(DOMstrings.lowerPressureValueInput).value;
        //create new item and put it on the last place in the collection list of items
        item = new NewMeasurement(num, day, month, new Date().getFullYear(), upper, lower);
        dataCollection.items.push(item);
        console.log(item);
        console.log(dataCollection.items);
      }
    }
    
  })();
  
  var UIController = (function() {
     
    //input css defined IDs and classes
    var DOMstrings = {
      nav: 'nav',
      newMeasure: '#new-measure',
      arrayMeasures: '#new-multiple-measures',
      graphicalChart: '#graphics',
      newData: '.new-measurings',
      upperPressureValueInput: '#upper-pressure-input-field',
      lowerPressureValueInput: '#lower-pressure-input-field',
      submitUpperPressure: '#submit-upper-pressure',
      submitLowerPressure: '#submit-lower-pressure'
    };
    
    return {
      getDOMstrings: function() {
         return DOMstrings;
       },
      //initializes the UI by moving all fields at the original point and setting input values at zero
      initialSettings: function() {
         document.querySelector(DOMstrings.nav).className = 'nonactive-nav';
         document.querySelector(DOMstrings.newData).className = 'new-measurings hidden';
         document.querySelector(DOMstrings.upperPressureValueInput).value = "";
         document.querySelector(DOMstrings.lowerPressureValueInput).value = "";
       },
      //inserts form to input new data
      insertNewData: function() {
         document.querySelector(DOMstrings.nav).classList.toggle('active-nav');
         document.querySelector(DOMstrings.nav).classList.toggle('nonactive-nav');
         document.querySelector(DOMstrings.newData).classList.toggle('visible');
         document.querySelector(DOMstrings.newData).classList.toggle('hidden');
         document.querySelector(DOMstrings.upperPressureValueInput).select();
       },
      //change input field from upper pressure input field to lower pressure input field
      changeInputField: function() {
          document.querySelector(DOMstrings.lowerPressureValueInput).select();
       }
    }
  })();
  
  var controller = (function(bloodCtrl, UICtrl) {
    var DOM;
    //input used IDs ans classes from UICtrl
    DOM = UICtrl.getDOMstrings();  
    
    //function that calls another function whenever clicked or enter pressed
    var setupEventListeners = function(id, type, callback) {
      //handle mouse click
      if (type === 'click') {
        document.querySelector(id).addEventListener('click', callback);
      } else if (type === 'any') {
        //handle mouse click
        document.querySelector(id).addEventListener('click', callback);
        //handle enter event
        document.addEventListener('keypress', function(event) {
          if (event.keyCode === 13 || event.which === 13) {
            if (document.querySelector("#" + id.slice(8) + "-input-field").value > 0) {
              callback();
                 }
             }
          })
        }
      };
    return {
      init: function() {
        UICtrl.initialSettings();
        setupEventListeners(DOM.newMeasure, 'click', UICtrl.insertNewData);
        setupEventListeners(DOM.submitUpperPressure, 'any', UICtrl.changeInputField);
        setupEventListeners(DOM.submitLowerPressure, 'any', bloodCtrl.addDataToCollection);
        setupEventListeners(DOM.submitLowerPressure, 'any', UICtrl.initialSettings);
      }
    }
  })(bloodPressureController, UIController);
  
  //controller.init();
  