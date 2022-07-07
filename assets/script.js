(function(){
  
    let list = document.querySelector('#list')
    let form = document.querySelector('form')
    let item = document.querySelector('#item')
    let button = document.querySelector('#submit')
    

    // Toggles event when you press "Enter"
    form.addEventListener('submit',function(event){
      event.preventDefault();
      list.innerHTML += '<li>' + item.value + '</li>';
      store();
      item.value = "";
    },false)
    
    // Toggles event when you click the "Add" button
    button.addEventListener('click', function(event){
        event.preventDefault();
        list.innerHTML += '<li>' + item.value + '</li>';
        store();
        item.value = "";
      },false)


    // Checks if you click on one of the todo elements  
    list.addEventListener('click',function(event){
      var test = event.target;
      if(test.classList.contains('checked')){
        test.parentNode.removeChild(test);
      } else {
        test.classList.add('checked');
      }
      store();
    },false)
    

    // Stores todo items in local storage
    function store() {
      window.localStorage.myitems = list.innerHTML;
    }
    

    // Retreives the locally stored items and updates the html
    function getValues() {
      var storedValues = window.localStorage.myitems;
      if(!storedValues) {
        list.innerHTML = '';
      }
      else {
        list.innerHTML = storedValues;
      }
    }
    getValues();
  })();