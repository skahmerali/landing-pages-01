<?php
ini_set( 'display_errors', 1 );
error_reporting( E_ALL );

extract($_POST);

$from = "info@contentluxury.com";
// $to = "info@contentluxury.com";

$to = ["info@contentluxury.com", "Alexmillervp@gmail.com"];

$subject = "Luxury Content - Contact Form";

$message = "Message form luxuxry content, contact form <br>";
$message .= "<br>Fullname: ".$name ?? '';
$message .= "<br>Company: ".$company ?? '';
$message .= "<br>Email: ".$email ?? '';
$message .= "<br>Phone: ".$phone ?? '';
$message .= "<br>Website: ".$website ?? '';
$message .= "<br>Budget: ".$budget ?? '';
$message .= "<br>Details: ".$details ?? '';
$message .= " ";

// To send HTML mail, the Content-type header must be set
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/html; charset=iso-8859-1';
  

foreach($to as $mail) {

    // Additional headers
    $headers[] = 'To: Content Luxury <'.$mail.'>';
    $headers[] = 'From: Content Luxury <'.$from.'>';

    $mail = mail($mail, $subject, $message, implode("\r\n", $headers)); 
}


if($mail) {
    $response = json_encode([
        "status"    => true,
        "message"   => "Your message recevied successfully.",
    ]);
} else {
    $response = json_encode([
        "status"    => false,
        "message"   => "Something went wrong, please contact support.",
    ]);
}

print_r($response);