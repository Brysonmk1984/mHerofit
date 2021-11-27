<?php

    $to = "bryson.kruk@protonmail.com"; // <<<<<< TODO: Replace with your email.    
    $from = "contactForm@herofitgame.com";
    $subject = "HeroFit Marketing Contact Form Message";
    $error = "";

    // Filter Spam
    if(isset($_POST['url']) && $_POST['url'] != ''){
        echo "success";
        exit(0);
    }

    foreach ($_POST as $param_name => $param_val) {
        if($param_name == 'url') {
            // Do not include spam filter variable
            continue;
        }
        $body .= ucwords(str_replace("_", " ", $param_name)) . ": " . $param_val . "\n";
    }

    // if(isset($_POST['email'])) {
    //     $from = $_POST['email'];
    // } else if(isset($_POST['contact_email'])) {
    //     $from = $_POST['contact_email'];
    // } else if(isset($_POST['contact-email'])) {
    //     $from = $_POST['contact-email'];
    // }

    if($from != "") {
        $success = mail($to, $subject, $body, "From:".$from);
    } else {
        $error = "Email is required";
    }
    
    if ($success && $error == ""){
        echo "success";
    } else {
        if($error == ""){
            echo "Something went wrong :(";
        } else {
            echo $error;
        }
    } 
?>
