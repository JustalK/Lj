<?php
    // If the request is a post
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
        // Filter the email and putting in lowercase (Normalization's system)
        $email = filter_var(strtolower($email), FILTER_VALIDATE_EMAIL);
        
        // If everything is fine, I send myself an email
        if($name && $email && mail("lj@gmail.com", subject($name,$email), body("Nothing for now"), headers($name,$email))) {
            echo json_encode(array(0,$name,$email));
        }
        
    }
    
    echo json_encode(array(1));
?>