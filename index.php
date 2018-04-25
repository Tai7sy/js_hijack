<?php

class hijack
{

    public $base_path;
    public $url_path;

    public function __construct()
    {
        header('Cache-Control: no-cache,must-revalidate');
        header('Pragma: no-cache');
        header('Expires: 0');

        $this->base_path = realpath(__DIR__);

        $this->url_path = $_SERVER['REQUEST_URI'];
        if (strpos($this->url_path, 'vconsole/lib/vconsole.min.js') !== FALSE) {
            header('Content-Type: application/javascript');
            echo '// ' . date('Y-m-d H:i:s') . "\r\n";
            echo file_get_contents($this->base_path . DIRECTORY_SEPARATOR . 'hijack.js');
            exit;
        }
    }

    function run()
    {
        die('<h1>It Works!</h1>');
    }
}

$h = new hijack();
$h->run();
