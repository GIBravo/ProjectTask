<?php

/**
 * It takes 3 lines to launch your app
 */

/// Include DataLatte
include 'latte/latte.php';

LatteModule::memoryLoad('latte.api');

// Load app
LatteModule::loadMain('app', 'es');

/// Create document
$doc = new LatteDocument();