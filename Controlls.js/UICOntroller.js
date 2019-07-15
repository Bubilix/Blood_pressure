const DOMstrings = require('../public/DOMstrings');

module.exports = {
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