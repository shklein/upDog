$(document).ready( function () {
upDog();
getClient();

//Add a client
  $('#clientSubmit').on('click', postClient);

  // event listeners for Client list
  $('#addpet').on('click', addPet );
  $('#clientList').on('click', '.delete', deletePet);
  $('#clientList').on('click', '.update', putPet);
});

//**FUNCTIONS**

//Pet List to DOM
  function upDog() {
    $.ajax({
      type: 'GET',
      url: '/pets',
      success: function (pets) {
        console.log(pets);
        $('#clientList').empty();
        pets.forEach(function (pet) {
          $container = $('<div class ="' + pet.id + '" ></div>');

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

 //Add a pet
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

  function getPetId(button) {
    // get the pet ID
    var petId = button.parent().attr('class');
    console.log('getPetId', petId);
    return petId;
  }

  //Delete a pet
  function deletePet(event) {
  event.preventDefault();

 var petId = getPetId($(this));


  $.ajax({
    type: 'DELETE',
    url: '/pets/' + petId,
    success: function (data) {
      upDog();
    },
  });
}
function dataPrep(button) {
  // get the pet data
  var pet = {};
  console.log(button.parent().children());
  console.log(button.parent().children().serializeArray());
  $.each(button.parent().children().serializeArray(), function (i, field) {
  pet[field.name] = field.value;
  });



  return pet;
}


//Update a pet
function putPet(event) {
  event.preventDefault();

  var preparedData = dataPrep($(this));
  var petId = getPetId($(this));

  $.ajax({
    type: 'PUT',
    url: '/pets/' + petId,
    data: preparedData,
    success: function (data) {
      upDog();
    },
  });
}
