/** 
 * JS file for Redesigner extra
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
 * @package redesigner
 */
 
 var Redesigner = function(config) {
    config = config || {};
    Redesigner.superclass.constructor.call(this,config);
};
Ext.extend(Redesigner,Ext.Component,{
    page:{},window:{},grid:{},tree:{},panel:{},combo:{},config: {}
});
Ext.reg('redesigner',Redesigner);
Redesigner = new Redesigner();

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

Redesigner.window.CreateDesign = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        title: _('redesigner.design_create~~Create Design')
        ,url: Redesigner.config.connectorUrl
        ,fields: [{
            xtype: 'textfield'
            ,fieldLabel: _('designs.name~~Name')
            ,name: 'name'
            ,anchor: '100%'
        },{
            xtype: 'textfield'
            ,fieldLabel: _('documents.description~~Description')
            ,name: 'description'
            ,anchor: '100%'
        }]
    });
    Redesigner.window.CreateDesign.superclass.constructor.call(this,config);
};
Ext.extend(Redesigner.window.CreateDesign,MODx.Window);
Ext.reg('redesigner-window-design-create',Redesigner.window.CreateDesign);