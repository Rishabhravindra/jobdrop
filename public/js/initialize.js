 var skillsHelp = [];
 $('.chips-placeholder').material_chip({
    placeholder: 'Enter what you need help with (Eg: #design)'
});

$('.chips').on('chip.add', function(e, chip){
 	skillsHelp.push(chip.tag);
  });

$('.chips').on('chip.delete', function(e, chip){
    skillsHelp.splice(skillsHelp.indexOf(chip.tag),1);
  });

 function updateChipInput(chip){
       var newval= $(chip).material_chip('data')
          .reduce(function(result,val){ result.push(val.tag); return result;},[]).join(",")
  
       $('input[name="chips"]').val(newval);
     }
    
    $(document).ready(function(){
     var data= $('input[name="chips"]').val().split(',') 
       .map(function(tag){
         return {tag:tag}
       })
    
     $('.chips').material_chip({
       data: data
    });
    
     $('.chips').on('chip.add', function(e, chip){
       updateChipInput(this);
    })
     .on('chip.delete', function(e, chip){
       updateChipInput(this);
    });  
   });


// Tooltips Initialization
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})



