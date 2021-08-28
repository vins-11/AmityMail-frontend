$(document).ready( function () {
    $('#for_all').DataTable();
} );
$(document).ready( function () {
    $('#for_all2').DataTable();
} );
$("#send_sms_type").change(function(){
   if($(this).val()=="2")
   {    
       $(".course_sms").show();
   }
    else
    {
       $(".course_sms").hide();
    }
});
$("#send_sms_type").change(function(){
   if($(this).val()=="3")
   {    
	   $(".course_sms").show();
       $(".subject_sms").show();
   }
    else
    {
       $(".subject_sms").hide();
       $(".course_sms").hide();
    }
});
$("#send_sms_type").change(function(){
   if($(this).val()=="4")
   {    
       $(".ind_sms").show();
   }
    else
    {
       $(".ind_sms").hide();
    }
});