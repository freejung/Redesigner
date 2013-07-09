<?php
/**
 * Designs update processor for Redesigner extra
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
 * @subpackage processors
 */


class DesignUpdateProcessor extends modObjectUpdateProcessor {
    public $classKey = 'reDesign';
    public $languageTopics = array('redesigner:default');
    public $objectType = 'redesigner.design';
    
    public function beforeSave() {
        
    	$this->modx->setLogLevel(modX::LOG_LEVEL_DEBUG);
    	$this->modx->log(modX::LOG_LEVEL_DEBUG, "running update design processor");        
        
        return parent::beforeSave();
    }
}
return 'DesignUpdateProcessor';