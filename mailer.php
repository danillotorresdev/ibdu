<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require $_SERVER["DOCUMENT_ROOT"] . '/PHPMailer/src/PHPMailer.php';
    require $_SERVER["DOCUMENT_ROOT"] . '/PHPMailer/src/SMTP.php';
    require $_SERVER["DOCUMENT_ROOT"] . '/PHPMailer/src/Exception.php';

$data = json_decode(file_get_contents("php://input"), true);

    $name = $data["name"];
    $email = $data["email"];
    $city = $data["city"];
    $state = $data["state"];
    $country = $data["country"];
    $subject = $data["subject"];
    $message = $data["message"];


    $mail = new PHPMailer(true);                              // Passing `true` enables exceptions
    try {
        //Server settings
        $mail->SMTPDebug = 0;                                 // Enable verbose debug output
        $mail->isSMTP();                                      // Set mailer to use SMTP
        $mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
        $mail->SMTPAuth = true;                               // Enable SMTP authentication
        $mail->Username = 'victortineolayer@gmail.com';                 // SMTP username
        $mail->Password = 'mikemiz141';                           // SMTP password
        $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
        $mail->Port = 465;                                    // TCP port to connect to

        //Recipients
        $mail->setFrom('from@example.com', 'Mailer');
        $mail->addAddress('victortineolayer@gmail.com', 'Victor'); // Add a recipient
        $mail->addReplyTo('victortineolayer@gmail.com', 'Information');

        //Content
        $mail->isHTML(true);                                  // Set email format to HTML
        $mail->Subject = "IBDU | SITE: $subject";
        $mail->Body    = "
        <h2> Mensagem enviada do Site </h2>
        <p><b>Nome</b>: {$name}</p>
        <p><b>Email</b>: {$email}</p>
        <p><b>Assunto</b>: {$subject}</p>
        <p><b>Localização</b>:  {$city}, {$state} - {$country}</p>
        <p><b>Mensagem</b>:</p>
        <p><i>{$message}</i></p>
        ";
        $mail->AltBody = "
         Mensagem enviada do Site |
        |Nome: {$name} |Email: {$email} |Assunto: {$subject} |De {$city}, {$state} - {$country} |Mensagem: |{$message} ";

        $mail->send();
       
        echo "mail_sent: true";
    } catch (Exception $e) {
        echo "mail_sent:false";
    }