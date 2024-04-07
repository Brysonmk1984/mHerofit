const contactForm = $('#contact-form');
const deleteForm = $('#delete-form');

const DELETE_ACCOUNT = "DELETE_ACCOUNT";
const CONTACT = "CONTACT";


jQuery(document).ready(function () {

  deleteForm.submit(function (e) {
    e.preventDefault();
    sendEmail(DELETE_ACCOUNT);
  });

  contactForm.submit(function (e) {
    e.preventDefault();
    sendEmail();
  });
});

function sendEmail(type = CONTACT) {
  const formToUse = type === DELETE_ACCOUNT ? deleteForm : contactForm;
  const dataStr = formToUse.serialize();
  const serverEmailFile = type === DELETE_ACCOUNT ? "delete-account-email.php" : "send-email.php"
  const resultMessageEl = type === DELETE_ACCOUNT ?  $("#delete-result-message") :  $("#result-message");
  console.log(dataStr);

  $.ajax({
    type: "POST",
    url: serverEmailFile,
    data: dataStr,
    success: function (result) {
      if (result == "success") {
        formToUse.trigger("reset");
        showMessage(true, "Your message was sent successfully.", resultMessageEl);
      } else {
        showMessage(false, result, resultMessageEl);
      }
    }
  });
}

function showMessage(valid, msg, resultMessageEl) {
  var msgClasses;
  if (valid) {
    msgClasses = "alert alert-success";
  } else {
    msgClasses = "alert alert-danger";
  }
  resultMessageEl
    .removeClass()
    .addClass(msgClasses)
    .text(msg);
}