<?php
/**
 * Redesigner class file for Redesigner extra
 *
 * Copyright 2013 by Eli Snyder <freejung@gmail.com>
 * Created on 05-10-2013
 *
 * Redesigner is free software; you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation; either version 2 of the License, or (at your option) any later
 * version.
 *
 * Redesigner is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * Redesigner; if not, write to the Free Software Foundation, Inc., 59 Temple
 * Place, Suite 330, Boston, MA 02111-1307 USA
 *
 * @package redesigner
 * @subpackage controllers
 */

require_once dirname(__FILE__) . '/model/redesigner/redesigner.class.php';

abstract class RedesignerManagerController extends modExtraManagerController {
    public $redesigner;
    public function initialize() {
        $this->redesigner = new Redesigner($this->modx);

        //$this->addCss($this->redesigner->config['cssUrl'].'mgr.css');
        $this->addJavascript($this->redesigner->config['jsUrl'].'mgr/redesigner.js');
        $this->addHtml('<script type="text/javascript">
        Ext.onReady(function() {
            Redesigner.config = '.$this->modx->toJSON($this->redesigner->config).';
        });
        </script>');
        return parent::initialize();
    }
    public function getLanguageTopics() {
        return array('redesigner:default');
    }
    public function checkPermissions() { return true;}
}

/**
 * @package redesigner
 * @subpackage controllers
 */
 
class IndexManagerController extends RedesignerManagerController {
    public static function getDefaultController() { return 'home'; }
}
