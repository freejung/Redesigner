<?php
class reDesign extends xPDOSimpleObject {
	
	public function initializeAllResources() {
		$resourcesIterator = $this->xpdo->getIterator('modResource');
		foreach ($resourcesIterator as $resource) {
			$existingMaps = $this->getMany('reMap', array('resource' => $resource->id));
			if(!empty($existingMaps)) {
				foreach($existingMaps as $existingMap) {
					$existingMap->set('template', $resource->template);
					$existingMap->save();
				}
			}else{
			    $newMap = $this->xpdo->newObject('reMap', 
			        array(
			            'template' => $resource->template,
			            'design' => $this->id,
			            'resource' => $resource->id
			        )
			    );
			    $newMap->save();
			}
		}	
	}
	
}