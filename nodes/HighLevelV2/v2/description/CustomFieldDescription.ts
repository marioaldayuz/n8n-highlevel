import type { INodeProperties } from 'n8n-workflow';

import {
	addLocationIdPreSendAction,
} from '../GenericFunctions';

export const customFieldOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['customField'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				routing: {
					request: {
						method: 'POST',
						url: '/locations/{{$parameter.locationId}}/customFields',
					},
					send: {
						preSend: [addLocationIdPreSendAction],
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'customField',
								},
							},
						],
					},
				},
				action: 'Create a custom field',
			},
			{
				name: 'Update',
				value: 'update',
				routing: {
					request: {
						method: 'PUT',
						url: '=/locations/{{$parameter.locationId}}/customFields/{{$parameter.customFieldId}}',
					},
					send: {
						preSend: [addLocationIdPreSendAction],
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'customField',
								},
							},
						],
					},
				},
				action: 'Update a custom field',
			},
			{
				name: 'Delete',
				value: 'delete',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/locations/{{$parameter.locationId}}/customFields/{{$parameter.customFieldId}}',
					},
					output: {
						postReceive: [
							{
								type: 'set',
								properties: {
									value: '={{ { "success": true } }}',
								},
							},
						],
					},
				},
				action: 'Delete a custom field',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				routing: {
					request: {
						method: 'GET',
						url: '/locations/{{$parameter.locationId}}/customFields',
					},
					send: {
						preSend: [addLocationIdPreSendAction],
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'customFields',
								},
							},
						],
					},
				},
				action: 'Get all custom fields',
			},
			{
				name: 'Create Folder',
				value: 'createFolder',
				routing: {
					request: {
						method: 'POST',
						url: '/locations/{{$parameter.locationId}}/customFields/folders',
					},
					send: {
						preSend: [addLocationIdPreSendAction],
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'customFieldsFolder',
								},
							},
						],
					},
				},
				action: 'Create a custom field folder',
			},
			{
				name: 'Get Folder',
				value: 'getFolder',
				routing: {
					request: {
						method: 'GET',
						url: '=/locations/{{$parameter.locationId}}/customFields/folders/{{$parameter.folderId}}',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'customFieldsFolder',
								},
							},
						],
					},
				},
				action: 'Get a custom field folder',
			},
			{
				name: 'Update Folder',
				value: 'updateFolder',
				routing: {
					request: {
						method: 'PUT',
						url: '=/locations/{{$parameter.locationId}}/customFields/folders/{{$parameter.folderId}}',
					},
					send: {
						preSend: [addLocationIdPreSendAction],
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'customFieldsFolder',
								},
							},
						],
					},
				},
				action: 'Update a custom field folder',
			},
			{
				name: 'Delete Folder',
				value: 'deleteFolder',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/locations/{{$parameter.locationId}}/customFields/folders/{{$parameter.folderId}}',
					},
					output: {
						postReceive: [
							{
								type: 'set',
								properties: {
									value: '={{ { "success": true } }}',
								},
							},
						],
					},
				},
				action: 'Delete a custom field folder',
			},
		],
		default: 'create',
	},
];

const createProperties: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['customField'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Name of the custom field',
		routing: {
			send: {
				type: 'body',
				property: 'name',
			},
		},
	},
	{
		displayName: 'Data Type',
		name: 'dataType',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['customField'],
				operation: ['create'],
			},
		},
		options: [
			{
				name: 'Text',
				value: 'TEXT',
			},
			{
				name: 'Number',
				value: 'NUMBER',
			},
			{
				name: 'Date',
				value: 'DATE',
			},
			{
				name: 'Date Time',
				value: 'DATETIME',
			},
			{
				name: 'Single Select',
				value: 'SINGLE_SELECT',
			},
			{
				name: 'Multiple Select',
				value: 'MULTIPLE_SELECT',
			},
			{
				name: 'Checkbox',
				value: 'CHECKBOX',
			},
			{
				name: 'File Upload',
				value: 'FILE_UPLOAD',
			},
			{
				name: 'Textarea',
				value: 'TEXTAREA',
			},
		],
		default: 'TEXT',
		description: 'Data type of the custom field',
		routing: {
			send: {
				type: 'body',
				property: 'dataType',
			},
		},
	},
	{
		displayName: 'Model',
		name: 'model',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['customField'],
				operation: ['create'],
			},
		},
		options: [
			{
				name: 'Contact',
				value: 'contact',
			},
			{
				name: 'Opportunity',
				value: 'opportunity',
			},
		],
		default: 'contact',
		description: 'Model to which the custom field belongs',
		routing: {
			send: {
				type: 'body',
				property: 'model',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['customField'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Position',
				name: 'position',
				type: 'number',
				default: 0,
				description: 'Position of the custom field in the form',
				routing: {
					send: {
						type: 'body',
						property: 'position',
					},
				},
			},
			{
				displayName: 'Required',
				name: 'isRequired',
				type: 'boolean',
				default: false,
				description: 'Whether the custom field is required',
				routing: {
					send: {
						type: 'body',
						property: 'isRequired',
					},
				},
			},
			{
				displayName: 'Multiple Values',
				name: 'isMultipleValues',
				type: 'boolean',
				default: false,
				description: 'Whether the custom field can have multiple values',
				routing: {
					send: {
						type: 'body',
						property: 'isMultipleValues',
					},
				},
			},
			{
				displayName: 'Important',
				name: 'isImportant',
				type: 'boolean',
				default: false,
				description: 'Whether the custom field is important',
				routing: {
					send: {
						type: 'body',
						property: 'isImportant',
					},
				},
			},
			{
				displayName: 'Parent Folder ID',
				name: 'parentId',
				type: 'string',
				default: '',
				description: 'ID of the parent folder',
				routing: {
					send: {
						type: 'body',
						property: 'parentId',
					},
				},
			},
			{
				displayName: 'Placeholder',
				name: 'placeholder',
				type: 'string',
				default: '',
				description: 'Placeholder text for the custom field',
				routing: {
					send: {
						type: 'body',
						property: 'placeholder',
					},
				},
			},
			{
				displayName: 'File Type',
				name: 'fileType',
				type: 'options',
				displayOptions: {
					show: {
						dataType: ['FILE_UPLOAD'],
					},
				},
				options: [
					{
						name: 'Image',
						value: 'image',
					},
					{
						name: 'Document',
						value: 'document',
					},
					{
						name: 'Video',
						value: 'video',
					},
					{
						name: 'Audio',
						value: 'audio',
					},
				],
				default: 'image',
				description: 'Type of file allowed for file upload fields',
				routing: {
					send: {
						type: 'body',
						property: 'fileType',
					},
				},
			},
			{
				displayName: 'Accepted Format',
				name: 'acceptedFormat',
				type: 'string',
				displayOptions: {
					show: {
						dataType: ['FILE_UPLOAD'],
					},
				},
				default: '',
				description: 'Accepted file formats (comma-separated)',
				routing: {
					send: {
						type: 'body',
						property: 'acceptedFormat',
					},
				},
			},
			{
				displayName: 'Options',
				name: 'picklistOptions',
				type: 'json',
				displayOptions: {
					show: {
						dataType: ['SINGLE_SELECT', 'MULTIPLE_SELECT'],
					},
				},
				default: '[]',
				description: 'Options for select fields (JSON array)',
				routing: {
					send: {
						type: 'body',
						property: 'picklistOptions',
					},
				},
			},
		],
	},
];

const updateProperties: INodeProperties[] = [
	{
		displayName: 'Custom Field ID',
		name: 'customFieldId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['customField'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'ID of the custom field to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['customField'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Name of the custom field',
				routing: {
					send: {
						type: 'body',
						property: 'name',
					},
				},
			},
			{
				displayName: 'Data Type',
				name: 'dataType',
				type: 'options',
				options: [
					{
						name: 'Text',
						value: 'TEXT',
					},
					{
						name: 'Number',
						value: 'NUMBER',
					},
					{
						name: 'Date',
						value: 'DATE',
					},
					{
						name: 'Date Time',
						value: 'DATETIME',
					},
					{
						name: 'Single Select',
						value: 'SINGLE_SELECT',
					},
					{
						name: 'Multiple Select',
						value: 'MULTIPLE_SELECT',
					},
					{
						name: 'Checkbox',
						value: 'CHECKBOX',
					},
					{
						name: 'File Upload',
						value: 'FILE_UPLOAD',
					},
					{
						name: 'Textarea',
						value: 'TEXTAREA',
					},
				],
				default: 'TEXT',
				description: 'Data type of the custom field',
				routing: {
					send: {
						type: 'body',
						property: 'dataType',
					},
				},
			},
			{
				displayName: 'Position',
				name: 'position',
				type: 'number',
				default: 0,
				description: 'Position of the custom field in the form',
				routing: {
					send: {
						type: 'body',
						property: 'position',
					},
				},
			},
			{
				displayName: 'Required',
				name: 'isRequired',
				type: 'boolean',
				default: false,
				description: 'Whether the custom field is required',
				routing: {
					send: {
						type: 'body',
						property: 'isRequired',
					},
				},
			},
			{
				displayName: 'Multiple Values',
				name: 'isMultipleValues',
				type: 'boolean',
				default: false,
				description: 'Whether the custom field can have multiple values',
				routing: {
					send: {
						type: 'body',
						property: 'isMultipleValues',
					},
				},
			},
			{
				displayName: 'Important',
				name: 'isImportant',
				type: 'boolean',
				default: false,
				description: 'Whether the custom field is important',
				routing: {
					send: {
						type: 'body',
						property: 'isImportant',
					},
				},
			},
			{
				displayName: 'Placeholder',
				name: 'placeholder',
				type: 'string',
				default: '',
				description: 'Placeholder text for the custom field',
				routing: {
					send: {
						type: 'body',
						property: 'placeholder',
					},
				},
			},
			{
				displayName: 'File Type',
				name: 'fileType',
				type: 'options',
				displayOptions: {
					show: {
						dataType: ['FILE_UPLOAD'],
					},
				},
				options: [
					{
						name: 'Image',
						value: 'image',
					},
					{
						name: 'Document',
						value: 'document',
					},
					{
						name: 'Video',
						value: 'video',
					},
					{
						name: 'Audio',
						value: 'audio',
					},
				],
				default: 'image',
				description: 'Type of file allowed for file upload fields',
				routing: {
					send: {
						type: 'body',
						property: 'fileType',
					},
				},
			},
			{
				displayName: 'Accepted Format',
				name: 'acceptedFormat',
				type: 'string',
				displayOptions: {
					show: {
						dataType: ['FILE_UPLOAD'],
					},
				},
				default: '',
				description: 'Accepted file formats (comma-separated)',
				routing: {
					send: {
						type: 'body',
						property: 'acceptedFormat',
					},
				},
			},
			{
				displayName: 'Options',
				name: 'picklistOptions',
				type: 'json',
				displayOptions: {
					show: {
						dataType: ['SINGLE_SELECT', 'MULTIPLE_SELECT'],
					},
				},
				default: '[]',
				description: 'Options for select fields (JSON array)',
				routing: {
					send: {
						type: 'body',
						property: 'picklistOptions',
					},
				},
			},
		],
	},
];

const deleteProperties: INodeProperties[] = [
	{
		displayName: 'Custom Field ID',
		name: 'customFieldId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['customField'],
				operation: ['delete'],
			},
		},
		default: '',
		description: 'ID of the custom field to delete',
	},
];

const getAllProperties: INodeProperties[] = [
	{
		displayName: 'Model',
		name: 'model',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['customField'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				name: 'Contact',
				value: 'contact',
			},
			{
				name: 'Opportunity',
				value: 'opportunity',
			},
		],
		default: 'contact',
		description: 'Model to get custom fields for',
		routing: {
			send: {
				type: 'query',
				property: 'model',
			},
		},
	},
];

const createFolderProperties: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['customField'],
				operation: ['createFolder'],
			},
		},
		default: '',
		description: 'Name of the custom field folder',
		routing: {
			send: {
				type: 'body',
				property: 'name',
			},
		},
	},
	{
		displayName: 'Model',
		name: 'model',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['customField'],
				operation: ['createFolder'],
			},
		},
		options: [
			{
				name: 'Contact',
				value: 'contact',
			},
			{
				name: 'Opportunity',
				value: 'opportunity',
			},
		],
		default: 'contact',
		description: 'Model to which the folder belongs',
		routing: {
			send: {
				type: 'body',
				property: 'model',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['customField'],
				operation: ['createFolder'],
			},
		},
		options: [
			{
				displayName: 'Position',
				name: 'position',
				type: 'number',
				default: 0,
				description: 'Position of the folder',
				routing: {
					send: {
						type: 'body',
						property: 'position',
					},
				},
			},
		],
	},
];

const getFolderProperties: INodeProperties[] = [
	{
		displayName: 'Folder ID',
		name: 'folderId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['customField'],
				operation: ['getFolder'],
			},
		},
		default: '',
		description: 'ID of the folder to get',
	},
];

const updateFolderProperties: INodeProperties[] = [
	{
		displayName: 'Folder ID',
		name: 'folderId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['customField'],
				operation: ['updateFolder'],
			},
		},
		default: '',
		description: 'ID of the folder to update',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['customField'],
				operation: ['updateFolder'],
			},
		},
		default: '',
		description: 'New name of the folder',
		routing: {
			send: {
				type: 'body',
				property: 'name',
			},
		},
	},
];

const deleteFolderProperties: INodeProperties[] = [
	{
		displayName: 'Folder ID',
		name: 'folderId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['customField'],
				operation: ['deleteFolder'],
			},
		},
		default: '',
		description: 'ID of the folder to delete',
	},
];

export const customFieldFields: INodeProperties[] = [
	...createProperties,
	...updateProperties,
	...deleteProperties,
	...getAllProperties,
	...createFolderProperties,
	...getFolderProperties,
	...updateFolderProperties,
	...deleteFolderProperties,
]; 