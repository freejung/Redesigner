
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
        ,fields: ['id','name','description','active','mgr']
        ,paging: true
        ,remoteSort: true
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
            ,emptyText: _('designs.search...')
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
Ext.extend(Redesigner.grid.Designs,MODx.grid.Grid);
Ext.reg('redesigner-grid-designs',Redesigner.grid.Designs);