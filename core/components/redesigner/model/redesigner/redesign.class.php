<?php
class reDesign extends xPDOSimpleObject {
	
	public function initializeAllResources($newTemplate=0, $mappedTo, $whereArray) {
		$c = $this->xpdo->newQuery('modResource');
		
		if(!empty($whereArray)){
			$c->where($whereArray);
		}
		
		$resourcesIterator = $this->xpdo->getIterator('modResource', $c);
		foreach ($resourcesIterator as $resource) {
			//$this->xpdo->log(modX::LOG_LEVEL_DEBUG, 'initializing resource: '.$resource->id);
			$thisTemplate = $resource->template;
			if($newTemplate) {
				$thisTemplate = $newTemplate;
			}
			$existingMaps = array();
			$r = $this->xpdo->newQuery('reMap');
			$r->where(array('resource' => $resource->id, 'design' => $this->id ));
			if(!empty($mappedTo[0])) {
				$this->xpdo->log(modX::LOG_LEVEL_DEBUG, 'mappedTo not empty');
				$r->where(array('template:IN' => $mappedTo));
			}
			$existingMaps = $this->xpdo->getCollection('reMap', $r);
			if(!empty($existingMaps)) {
				foreach($existingMaps as $existingMap) {
					//$this->xpdo->log(modX::LOG_LEVEL_DEBUG, 'setting template for map '.$existingMap->id.' map resource = '.$existingMap->resource.' to template '.$thisTemplate.' for resource '.$resource->id);
					$existingMap->set('template', $thisTemplate);
					$existingMap->save();
				}
			}else if(empty($mappedTo[0])){
				$this->xpdo->log(modX::LOG_LEVEL_DEBUG, 'mappedTo empty');
			    $newMap = $this->xpdo->newObject('reMap', 
			        array(
			            'template' => $thisTemplate,
			            'resource' => $resource->id
			        )
			    );
			    $newMap->addOne($this);
			    $newMap->save();
				//$this->xpdo->log(modX::LOG_LEVEL_DEBUG, 'creating new map '.$newMap->id);
			}
		}	
		
	}
	
}