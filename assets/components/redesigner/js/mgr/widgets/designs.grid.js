
/**
 *  CMP js file for Redesigner extra
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
 */

Redesigner.grid.Designs = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'redesigner-grid-designs'
        ,url: Redesigner.config.connectorUrl
        ,baseParams: { action: 'mgr/design/getList' }
        ,save_action: 'mgr/design/updateFromGrid'
        ,fields: ['id','name','description','active','mgr','groups','notes']
        ,paging: true
        ,remoteSort: true
        ,autosave: true
        ,anchor: '97%'
        ,autoExpandColumn: 'name'
        ,columns: [{
            header: _('id')
            ,dataIndex: 'id'
            ,sortable: true
            ,width: 60
        },{
            header: _('design.name')
            ,dataIndex: 'name'
            ,sortable: true
            ,width: 100
            ,editor: { xtype: 'textfield' }
        },{
            header: _('design.description')
            ,dataIndex: 'description'
            ,sortable: false
            ,width: 350
            ,editor: { xtype: 'textfield' }
        },{
            header: _('design.active')
            ,dataIndex: 'active'
            ,sortable: false
            ,width: 150
            ,editor: { xtype: 'redesigner-combo-binary' ,renderer:true }
        },{
            header: _('design.mgr')
            ,dataIndex: 'mgr'
            ,sortable: false
            ,width: 150
            ,editor: { xtype: 'redesigner-combo-binary' ,renderer:true }
        }],tbar:[{
            text: _('redesigner.design_create')
            ,handler: { xtype: 'redesigner-window-design-create' ,blankValues: true ,baseParams: {action: 'mgr/design/create'} }
        },'->',{
            xtype: 'textfield'
            ,id: 'designs-search-filter'
            ,emptyText: _('designs.search')
            ,listeners: {
                'change': {fn:this.search,scope:this}
                ,'render': {fn: function(cmp) {
                    new Ext.KeyMap(cmp.getEl(), {
                        key: Ext.EventObject.ENTER
                        ,fn: function() {
                            this.fireEvent('change',this);
                            this.blur();
                            return true;
                        }
                        ,scope: cmp
                    });
                },scope:this}
            }
        }]
    });
    Redesigner.grid.Designs.superclass.constructor.call(this,config)
};
Ext.extend(Redesigner.grid.Designs,MODx.grid.Grid,{
    search: function(tf,nv,ov) {
        var s = this.getStore();
        s.baseParams.query = tf.getValue();
        this.getBottomToolbar().changePage(1);
        this.refresh();
    }
    ,getMenu: function() {
        return [{
            text: _('redesigner.design_update')
            ,handler: this.updateDesign
        },'-',{
            text: _('redesigner.design_remove')
            ,handler: this.removeDesign
        }];
    }
    ,updateDesign: function(btn,e) {
        this.updateDesignWindow = MODx.load({
            xtype: 'redesigner-window-design-update'
            ,record: this.menu.record
            ,baseParams: {action: 'mgr/design/update'}
            ,listeners: {
                'success': {fn:this.refresh,scope:this}
            }
        });
        this.updateDesignWindow.setValues(this.menu.record);
        this.updateDesignWindow.show(e.target);
    }

    ,removeDesign: function() {
        MODx.msg.confirm({
            title: _('redesigner.design_remove')
            ,text: _('redesigner.design_remove_confirm')
            ,url: this.config.url
            ,params: {
                action: 'mgr/design/remove'
                ,id: this.menu.record.id
            }
            ,listeners: {
                'success': {fn:this.refresh,scope:this}
            }
        });
    }
});
Ext.reg('redesigner-grid-designs',Redesigner.grid.Designs);

Redesigner.window.UpdateDesign = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        title: _('redesigner.design_update')
        ,url: Redesigner.config.connectorUrl
		,baseParams: {
            action: 'mgr/design/update'
        }
        ,closeAction: 'close'
        ,fields: [{
            xtype: 'hidden'
            ,name: 'id'
        },{
            xtype: 'textfield'
            ,fieldLabel: _('designs.name')
            ,name: 'name'
            ,anchor: '100%'
        },{
            xtype: 'textfield'
            ,fieldLabel: _('designs.description')
            ,name: 'description'
            ,anchor: '100%'
        },{
                           xtype: 'redesigner-superbox-groups'
                           ,fieldLabel: _('groups')
                           ,name: 'groups'
                           ,hiddenName: 'groups'
                           ,anchor: '100%'
                       },{
            xtype: 'xcheckbox'
            ,boxLabel: _('designs.mgr')
            ,hideLabel: true
            ,description: _('designs.mgr_desc')
            ,name: 'mgr'
            ,id: 'redesigner-designs-mgr'
            ,inputValue: 1

        },{
            xtype: 'xcheckbox'
            ,boxLabel: _('designs.active')
            ,hideLabel: true
            ,description: _('designs.active_desc')
            ,name: 'active'
            ,id: 'redesigner-designs-active'
            ,inputValue: 1

        },{
            xtype: 'textarea'
            ,fieldLabel: _('designs.notes')
            ,name: 'notes'
            ,anchor: '100%'
        },{
            xtype: 'button'
            ,text: 'Initialize All Resources'
            ,handler: this.initializeDesign
            ,design: config.record.id
        },{
            xtype: 'redesigner-grid-maps'
            ,cls: 'main-wrapper'
            ,preventRender: true
            ,design: config.record.id
            ,baseParams: { 
                action: 'mgr/map/getList'
                ,query: config.record.id
	        }
        }]
    });
    Redesigner.window.UpdateDesign.superclass.constructor.call(this,config);
};
Ext.extend(Redesigner.window.UpdateDesign,MODx.Window, {
	initializeDesign: function(btn,e) {
	    MODx.msg.confirm({
		   title: 'Are you sure?'
		   ,text: 'Do you want to initialize this design to all resources with their current templates?'
		   ,url: Redesigner.config.connectorUrl
		   ,params: {
		   	 action: 'mgr/design/initialize'
		     ,id: btn.design
		   },
		});
    }
	
});
Ext.reg('redesigner-window-design-update',Redesigner.window.UpdateDesign);

Redesigner.window.UpdateMap = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        title: _('redesigner.map_update')
        ,url: Redesigner.config.connectorUrl
		,baseParams: {
            action: 'mgr/map/update'
        }
        ,fields: [{
            xtype: 'hidden'
            ,name: 'id'
        },{
            xtype: 'textfield'
            ,fieldLabel: _('maps.resource')
            ,name: 'resource'
            ,anchor: '100%'
        },{
            xtype: 'redesigner-combo-template'
            ,fieldLabel: _('maps.template')
            ,name: 'template'
            ,hiddenName: 'template'
            ,anchor: '100%'
        }]
    });
    Redesigner.window.UpdateMap.superclass.constructor.call(this,config);
};
Ext.extend(Redesigner.window.UpdateMap,MODx.Window);
Ext.reg('redesigner-window-map-update',Redesigner.window.UpdateMap);

Redesigner.combo.Binary = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        store: new Ext.data.ArrayStore({
            id: 0
            ,fields: ['value','text']
            ,data: [
            	    ['1', 'True'],
            	    ['0', 'False'],
            ]
        })
        ,mode: 'local'
        ,displayField: 'text'
        ,valueField: 'value'
    });
    Redesigner.combo.Binary.superclass.constructor.call(this,config);
};
Ext.extend(Redesigner.combo.Binary,MODx.combo.ComboBox);
Ext.reg('redesigner-combo-binary',Redesigner.combo.Binary);

Redesigner.combo.Template = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        url: MODx.config.connectors_url+'element/template.php'
        ,baseParams: { action: 'getList', limit: 0 }
        ,fields: ['id', 'templatename']
        ,displayField: 'templatename'
        ,pageSize: 20
        ,valueField: 'id'
    });
    Redesigner.combo.Template.superclass.constructor.call(this,config);
};
Ext.extend(Redesigner.combo.Template,MODx.combo.ComboBox);
Ext.reg('redesigner-combo-template',Redesigner.combo.Template);

Redesigner.combo.Groups = function (config) {
    config = config || {};
    Ext.applyIf(config, {
      xtype:'superboxselect'
        ,triggerAction: 'all'
   ,mode: 'remote'
        ,valueField: 'id'
        ,displayField: 'name'
        ,resizable: true
   ,store: new Ext.data.JsonStore({ 
      id:'id',
      autoLoad: true,
      root:'results',
      fields: ['name', 'id'],
      url: MODx.config.connectors_url+'security/group.php',
      baseParams:{
         action: 'getList'
         ,limit: 0
      }
   })
    });
    Redesigner.combo.Groups.superclass.constructor.call(this, config);
};
Ext.extend(Redesigner.combo.Groups, Ext.ux.form.SuperBoxSelect);
Ext.reg('redesigner-superbox-groups', Redesigner.combo.Groups );

Redesigner.window.CreateDesign = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        title: _('redesigner.design_create')
        ,url: Redesigner.config.connectorUrl
        ,fields: [{
            xtype: 'textfield'
            ,fieldLabel: _('designs.name')
            ,name: 'name'
            ,anchor: '100%'
        },{
            xtype: 'textfield'
            ,fieldLabel: _('designs.description')
            ,name: 'description'
            ,anchor: '100%'
        },{
                           xtype: 'redesigner-superbox-groups'
                           ,fieldLabel: _('groups')
                           ,name: 'groups'
                           ,hiddenName: 'groups'
                           ,anchor: '100%'
                       },{
            xtype: 'xcheckbox'
            ,boxLabel: _('designs.mgr')
            ,hideLabel: true
            ,description: _('designs.mgr_desc')
            ,name: 'mgr'
            ,id: 'redesigner-designs-mgr'
            ,inputValue: 1

        },{
            xtype: 'xcheckbox'
            ,boxLabel: _('designs.active')
            ,hideLabel: true
            ,description: _('designs.active_desc')
            ,name: 'active'
            ,id: 'redesigner-designs-active'
            ,inputValue: 1

        },{
            xtype: 'textarea'
            ,fieldLabel: _('designs.notes')
            ,name: 'notes'
            ,anchor: '100%'
        }]
    });
    Redesigner.window.CreateDesign.superclass.constructor.call(this,config);
};
Ext.extend(Redesigner.window.CreateDesign,MODx.Window);
Ext.reg('redesigner-window-design-create',Redesigner.window.CreateDesign);

Redesigner.grid.Maps = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'redesigner-grid-maps'
        ,url: Redesigner.config.connectorUrl
        ,baseParams: { action: 'mgr/map/getList' }
        ,save_action: 'mgr/map/updateFromGrid'
        ,fields: ['id','resource','template','resourcetitle']
        ,paging: true
        ,remoteSort: true
        ,autosave: true
        ,anchor: '97%'
        ,autoExpandColumn: 'resource'
        ,columns: [{
            header: _('id')
            ,dataIndex: 'id'
            ,sortable: true
            ,width: 20
        },{
            header: _('map.resource')
            ,dataIndex: 'resourcetitle'
            ,sortable: true
            ,width: 100
            /*,editor: { xtype: 'textfield' }*/
        },{
            header: _('map.template')
            ,dataIndex: 'template'
            ,sortable: true
            ,width: 100
            ,editor: { xtype: 'redesigner-combo-template', renderer:true }
        }],tbar:[{
            text: _('redesigner.map_create')
            ,handler: { 
                xtype: 'redesigner-window-map-create' 
                ,blankValues: true 
                ,design : config.design
                ,baseParams: {action: 'mgr/map/create'} }
        },'->',{
            xtype: 'textfield'
            ,id: 'maps-search-filter'
            ,emptyText: _('maps.search')
            ,listeners: {
                'change': {fn:this.search,scope:this}
                ,'render': {fn: function(cmp) {
                    new Ext.KeyMap(cmp.getEl(), {
                        key: Ext.EventObject.ENTER
                        ,fn: function() {
                            this.fireEvent('change',this);
                            this.blur();
                            return true;
                        }
                        ,scope: cmp
                    });
                },scope:this}
            }
        }]
    });
    Redesigner.grid.Maps.superclass.constructor.call(this,config)
};
Ext.extend(Redesigner.grid.Maps,MODx.grid.Grid,{
    search: function(tf,nv,ov) {
        var s = this.getStore();
        s.baseParams.query = tf.getValue();
        this.getBottomToolbar().changePage(1);
        this.refresh();
    }
    ,getMenu: function() {
        return [{
            text: _('redesigner.map_update')
            ,handler: this.updateMap
        }];
    }
    ,updateMap: function(btn,e) {
        if (!this.updateMapWindow) {
            this.updateMapWindow = MODx.load({
                xtype: 'redesigner-window-map-update'
                ,record: this.menu.record
                ,baseParams: {action: 'mgr/map/update'}
                ,listeners: {
                    'success': {fn:this.refresh,scope:this}
                }
            });
        }
        this.updateMapWindow.setValues(this.menu.record);
        this.updateMapWindow.show(e.target);
    }
});
Ext.reg('redesigner-grid-maps',Redesigner.grid.Maps);

Redesigner.window.CreateMap = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        title: _('redesigner.map_create')
        ,url: Redesigner.config.connectorUrl
        ,fields: [{
            xtype: 'hidden'
            ,name: 'id'
        },{
            xtype: 'hidden'
            ,name: 'design'
            ,value: config.design
        },{
            xtype: 'textfield'
            ,fieldLabel: _('maps.resource')
            ,name: 'resource'
            ,anchor: '100%'
        },{
            xtype: 'redesigner-combo-template'
            ,fieldLabel: _('maps.template')
            ,name: 'template'
            ,hiddenName: 'template'
            ,anchor: '100%'
        }]
    });
    Redesigner.window.CreateMap.superclass.constructor.call(this,config);
};
Ext.extend(Redesigner.window.CreateMap,MODx.Window);
Ext.reg('redesigner-window-map-create',Redesigner.window.CreateMap);