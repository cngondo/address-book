//business logic

//Contact constructor
function Contact(first, last) {
  this.firstName = first;
  this.lastName = last;
  //initializing every contact with an empty address array
  this.addresses = [];
}
//Address constructor
function Address(street, city, state) {
  this.street = street;
  this.city = city;
  this.state = state;
}
//a prototype method is a method meant to be called on a specific type of object
//adds a prototype method that returns the full name  based on first and last name
Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}
//address prototype that returns all properties of the address object as a single string
Address.prototype.fullAddress = function() {
  return this.street + ", " + this.city + ", " + this.state;
}
//function to reset the fields
function resetFields() {
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input.new-street").val("");
    $("input.new-city").val("");
    $("input.new-state").val("");
}

// user interface logic
$(document).ready(function() {
  //receive more address form fields
  $("#add-address").click(function() {
    $("#new-addresses").append('<div class="new-address">' +
                                 '<div class="form-group">' +
                                   '<label for="new-street">Street</label>' +
                                   '<input type="text" class="form-control new-street">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-city">City</label>' +
                                   '<input type="text" class="form-control new-city">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-state">State</label>' +
                                   '<input type="text" class="form-control new-state">' +
                                 '</div>' +
                               '</div>');
  });
//jQuery callback that will collect the user input from the form, and assign it to variables on submit
  $("form#new-contact").submit(function(event) {
    event.preventDefault();

    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    //the input to create new Contact objects with our constructor.
    var newContact = new Contact(inputtedFirstName, inputtedLastName);
    //add jQuery logic to our form submit listener in order to collect and utilize the address information provided by the user
    //each() method looks through all elements in the jquery class
    //this keyword refers to the current element.
    //find method looks through all child elements of the provided element
    $(".new-address").each(function() {
      var inputtedStreet = $(this).find("input.new-street").val();
      var inputtedCity = $(this).find("input.new-city").val();
      var inputtedState = $(this).find("input.new-state").val();
      var newAddress = new Address(inputtedStreet, inputtedCity, inputtedState)
      newContact.addresses.push(newAddress)
    });
    //append the new objects to our list for display to the user.
    //updates UI 
    $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");
    // JavaScript to show the contact information when submit is clicked.
    //adding last(), binds the event to most recently-inserted contact.
    $(".contact").last().click(function() {
      $("#show-contact").show();
      $("#show-contact h2").text(newContact.fullName());
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);
      //it displays the address on the front end
      $("ul#addresses").text("");
      newContact.addresses.forEach(function(address) {
        $("ul#addresses").append("<li>" + address.fullAddress() + "</li>");
      });
    });
    //calling the function that resets the fields, code refactoring
    resetFields();

  });
});