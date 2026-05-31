<?php

require "../vendor/autoload.php";

use GuzzleHttp\Client;

$client = new Client();

$pokemon = $_GET["name"] ?? "pikachu";

try {
    $response = $client->request(
        "GET",
        "https://pokeapi.co/api/v2/pokemon/" . strtolower($pokemon),
    );

    header("Access-Control-Allow-Origin:*");
    header("Content-Type: application/json");
    echo $response->getBody();
} catch (exception $err) {
    http_response_code(500);
    echo json_encode([
        "error" => $err,
    ]);
}
