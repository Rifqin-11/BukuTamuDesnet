<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->resource('guestbook');
$routes->resource('Employee');
$routes->options('(:any)', function() {
    return service('response')->setStatusCode(200);
});

