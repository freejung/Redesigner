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


class RedesignerHomeManagerController extends RedesignerManagerController {
    public function process(array $scriptProperties = array()) {

    }
    public function getPageTitle() { return $this->modx->lexicon('redesigner'); }
    public function loadCustomCssJs() {
        $this->addJavascript($this->redesigner->config['jsUrl'].'mgr/widgets/designs.grid.js');
        //$this->addJavascript($this->redesigner->config['jsUrl'].'mgr/widgets/maps.grid.js');
        $this->addJavascript($this->redesigner->config['jsUrl'].'mgr/widgets/home.panel.js');
        $this->addLastJavascript($this->redesigner->config['jsUrl'].'mgr/sections/index.js');
    }
    public function getTemplateFile() { return $this->redesigner->config['templatesPath'].'home.tpl'; }
}