/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For complete reference see:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config
	config.language = 'en';
	
	// The toolbar groups arrangement, optimized for two toolbar rows.
	config.toolbarGroups = [
	                        
        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
        { name: 'paragraph',   groups: [ 'list', 'align' ] },
        { name: 'insert'}, 
        { name: 'tools',       groups: [ 'Maximize' ]},
		{ name: 'styles' },
		{ name: 'colors' }
	];

	// Remove some buttons provided by the standard plugins, which are
	// not needed in the Standard(s) toolbar.
	config.removeButtons = 'RemoveFormat,Strike,Subscript,Superscript,Flash,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,ShowBlocks';

	// Set the most common block elements.
	//config.format_tags = 'p;h1;h2;h3;pre';

	// Simplify the dialog windows.
	//config.removeDialogTabs = 'image:advanced;link:advanced';
};
