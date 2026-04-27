document.addEventListener('DOMContentLoaded',function(){
  // Setup WhatsApp float
  const wa = document.getElementById('whatsappFloat');
  if(wa){
    wa.href = `https://wa.me/${SITE_CONFIG.WHATSAPP_NUMBER.replace(/\D/g,'')}?text=${encodeURIComponent('Hi Evolver, I am interested in Embedded Systems training')}`;
  }

  // Demo form submit -> Formspree
  const demoForm = document.getElementById('demoForm');
  if(demoForm){
    demoForm.addEventListener('submit',async function(e){
      e.preventDefault();
      const data = new FormData(demoForm);
      try{
        await fetch(SITE_CONFIG.FORM_ENDPOINT,{method:'POST',body:data,headers:{'Accept':'application/json'}});
        alert('Demo request sent — we will contact you soon.');
        var modal = bootstrap.Modal.getInstance(document.getElementById('demoModal'));
        if(modal) modal.hide();
      }catch(err){
        alert('Could not send demo request. Please email ' + SITE_CONFIG.CONTACT_EMAIL);
      }
    });
  }

  // Lead form submit (contact section)
  const leadForm = document.getElementById('leadForm');
  if(leadForm){
    leadForm.addEventListener('submit',async function(e){
      e.preventDefault();
      const data = new FormData(leadForm);
      try{
        await fetch(SITE_CONFIG.FORM_ENDPOINT,{method:'POST',body:data,headers:{'Accept':'application/json'}});
        alert('Thanks — we received your request.');
        leadForm.reset();
      }catch(err){
        alert('Submit failed — please email ' + SITE_CONFIG.CONTACT_EMAIL);
      }
    });
  }

  // Download syllabus gating: ask for email, submit then download
  const dl = document.getElementById('downloadSyllabus');
  if(dl){
    dl.addEventListener('click',function(){
      const email = prompt('Enter your email to download the full syllabus');
      if(!email) return;
      // send a lightweight request to Formspree
      fetch(SITE_CONFIG.FORM_ENDPOINT,{method:'POST',body:JSON.stringify({email}),headers:{'Content-Type':'application/json','Accept':'application/json'}})
      .then(()=>{
        // trigger download
        window.location.href = SITE_CONFIG.SYLLABUS_PATH;
      }).catch(()=>{
        alert('Could not send download request — please email ' + SITE_CONFIG.CONTACT_EMAIL);
      });
    });
  }
});
