<?php

    const GOOD_SEND = 0;
    const BAD_SEND = 1;
    const MY_EMAIL = "justal.kevin@gmail.com";
    
    // If the request is a post (a hacker can change that but I'm not sure if it's really worth it...Mb for spam bombing me :/)
    // I could check the refere but it does not really be better since a hacker can still change that :/
    if($_SERVER["REQUEST_METHOD"] == "POST") {
        /**
         * Check the datas before sending anything to me
         * @param string $data the datas send to me
         */
        function validateData($data) {
            // If the variable is undefined or is empty
            if(!isset($data) || $data==="") return false;
            return $data;
        }
    
        // The subject of the email
        function subject($n,$e) {
            return mb_encode_mimeheader("New email for Latsuj from my website : ".$n." - ".$e, 'UTF-8', 'Q');
        }
        
        // The content of the email
        function body($msg) {
            return $msg;
        }
        
        // The header of the email
        function headers($n,$e) {
            return sprintf("From: %s <%s>",mb_encode_mimeheader($n, 'UTF-8', 'Q'),$e);
        }
    
        $name = validateData($_POST["sname"]);
        $email = validateData($_POST["semail"]);
        $msg = validateData($_POST["smsg"]);
        // Filter the email and putting in lowercase (Normalization's system)
        $email = filter_var(strtolower($email), FILTER_VALIDATE_EMAIL);
        
        // If everything is fine, I send myself an email
        if($name && $email && $msg && mail(MY_EMAIL, subject($name,$email), body($msg), headers($name,$email))) {
            echo json_encode(array(GOOD_SEND,$name,$email));
        }
        
    }
    
    echo json_encode(array(BAD_SEND));
?>