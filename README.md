Validator
=========

Plugin jQuery validator

Require jQuery 1.8+

EXAMPLE

1/ INSERT THE SCRIPT
<script type="text/javascript" src="validator.js"></script>


2/ USE IT LIKE THIS
<form id="formID">
  <input type="text" name="name" data-rules="required" data-name="Name of the field" />
</form>
$(document).ready(function(){
  $("#formID").validator();
});

YOU CAN USE A CALLBACK LIKE THIS
<form id="formID">
  <input type="text" name="name" data-rules="required" data-name="Name of the field" />
</form>
$(document).ready(function(){
  $("#formID").validator(function(){
    alert('ok');
  });
});
