<?php
/**
 * propertySets transport file for Redesigner extra
 *
 * Copyright 2013 by Eli Snyder <freejung@gmail.com>
 * Created on 05-10-2013
 *
 * @package redesigner
 * @subpackage build
 */

if (! function_exists('stripPhpTags')) {
    function stripPhpTags($filename) {
        $o = file_get_contents($filename);
        $o = str_replace('<' . '?' . 'php', '', $o);
        $o = str_replace('?>', '', $o);
        $o = trim($o);
        return $o;
    }
}
/* @var $modx modX */
/* @var $sources array */
/* @var xPDOObject[] $propertySets */


$propertySets = array();

$propertySets[1] = $modx->newObject('modPropertySet');
$propertySets[1]->fromArray(array(
    'id' => '1',
    'name' => 'templateSwitcher',
    'description' => 'Properties for the templateSwitcher plugin',
), '', true, true);
return $propertySets;
