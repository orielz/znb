<?php
	$owner_email = $_POST["owner_email"];
	$headers = 'From:' . $_POST["email"];
	$subject = 'התקבלה הודעה חדשה ממבקר באתר - ' . $_POST["name"];
	$messageBody = "";
	
	$messageBody .= '<p>שם: ' . $_POST["name"] . '</p>' . "\n";
	$messageBody .= '<br>' . "\n";
	$messageBody .= '<p>דואר אלקטרוני: ' . $_POST['email'] . '</p>' . "\n";
	$messageBody .= '<br>' . "\n";
	$messageBody .= '<p>טלפון:: ' . $_POST['phone'] . '</p>' . "\n";
	$messageBody .= '<br>' . "\n";
	$messageBody .= '<p>הודעה: ' . $_POST['message'] . '</p>' . "\n";
	
	if($_POST["stripHTML"] == 'true'){
		$messageBody = strip_tags($messageBody);
	}

	try{
		if(!mail($owner_email, $subject, $messageBody, $headers)){
			throw new Exception('mail failed');
		}else{
			echo 'mail sent';
		}
	}catch(Exception $e){
		echo $e->getMessage() ."\n";
	}
?>