<?php
    $to = "bryson.kruk@protonmail.com";   
    $from = "deleteForm@herofitgame.com";
    $subject = "HeroFit Delete Account Form Message";
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
