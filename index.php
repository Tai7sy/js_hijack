<?php

class hijack
{

    public $base_path;
    public $url_path;

    public function __construct()
    {
        $this->base_path = realpath(__DIR__);
        $this->url_path = $_SERVER['PHP_SELF'];
        if (strpos($this->url_path, 'vconsole/lib/vconsole.min.js') !== FALSE) {
            die(file_get_contents($this->base_path . '/hijack.js'));
        }
        if (strpos($this->url_path, '..') !== FALSE) {
            die('');
        }

    }

    function run()
    {
        die(file_get_contents($this->base_path . '/js/' . $this->url_path));
    }
}

$h = new hijack();
$h->run();
