$(document).ready( function () {
upDog();
getClient();

//Add a client
  $('#clientSubmit').on('click', postClient);

  // event listeners for Movies list
  //$('#movieList').on('click', '.update', putMovie);
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
          var clientData = ['name','breed', 'color'];
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
      },
    });
  }

//Add client
  function postClient (event){
    event.preventDefault();

    var client = {};

    $.each($('.owner').serializeArray(), function (i, field) {
      client[field.name] = field.value;
    });

    $.ajax({
      type: 'POST',
      url: '/owners',
      data: client,
      success: function (data) {
          console.log(data);
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
         for (var i = 0; i < owners.length; i++){
         $('#owners').append('<option id="' + owners[i].first_name + owners[i].last_name + '">' + owners[i].first_name + ' ' + owners[i].last_name + '</option>');
       }
   }
 });
 }
