<?php 

    http_response_code(200);

    echo json_encode([
        "status" => 200,
        "message" => "Login Success"
    ]);