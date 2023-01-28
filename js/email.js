import apiKeys from './apikeys'


window.onload = function(){
    
    emailjs.init(apiKeys.PUBLIC_KEY);
    document.getElementById('contact_form').addEventListener('submit', function(event) {
        event.preventDefault();
        // generate a five digit number for the contact_number variable
        // this.contact_number.value = Math.random() * 100000 | 0;
        // these IDs from the previous steps
        emailjs.sendForm(apiKeys.Service_ID, apiKeys.TEMPLATE_KEY, this)
            .then(function() {
                console.log('SUCCESS!');
                alert("SUCCESS!");
            }, function(error) {
                console.log('FAILED...', error);
                alert("FAILED...");
            });
    });
} 