$(document).ready( function () {
upDog();
getClient();

//Add a client
  $('#clientSubmit').on('click', postClient);

  // event listeners for Client list
  $('#addpet').on('click', addPet );
  //$('#movieList').on('click', '.delete', deleteMovie);
});

//Pet List to DOM
  function upDog() {
    $.ajax({
      type: 'GET',
      url: '/pets',
      success: function (pets) {
        console.log(pets);
        $('#clientList').empty();
        pets.forEach(function (pet) {
          $container = $('<div></div>');

          //Editable field
          var clientData = ['fullname', 'name','breed', 'color'];
          clientData.forEach(function (prop) {
            var $el = $('<input type="text" id="' + prop + '" name="' + prop + '" />');
            $el.val(pet[prop]);
            $container.append($el);

          });

          $container.data('ownerID', pets.owner_id);
          $container.append('<button class="update">Update</button>');
          $container.append('<button class="delete">Delete</button>');
          $('#clientList').append($container);
        });
        document.getElementById('fullname').readOnly = true;
      },
    });
  }

//Add client
  function postClient (event){
    event.preventDefault();

    var owner = {};

    $.each($('.owner').serializeArray(), function (i, field) {
      owner[field.name] = field.value;
    });

    $.ajax({
      type: 'POST',
      url: '/owners',
      data: owner,
      success: function (data) {
        getClient();
      }

    });
   };

//Populate drop-down
   function getClient () {
     $.ajax({
       type: 'GET',
       url: '/owners',
       success: function (owners) {
         console.log(owners);
         $('#owners').empty();
         for (var i = 0; i < owners.length; i++){
         $('#owners').append('<option id="' + owners[i].id + '">' + owners[i].first_name + ' ' + owners[i].last_name + '</option>');
         console.log(owners[i].id);
       }
   }
 });
 }

 //add a pets
  function addPet (){
    event.preventDefault();

    var newPet = {};

    $.each($('#pets').serializeArray(), function (i, field) {
      newPet[field.name] = field.value;

    });
    newPet.owner_id = $('select :selected').attr('id');
    console.log(newPet.owner_id);
    $.ajax({
      type: 'POST',
      url: '/pets',
      data: newPet,
      success: function (data) {
        console.log('added');
        upDog();
      }
    })
  }
