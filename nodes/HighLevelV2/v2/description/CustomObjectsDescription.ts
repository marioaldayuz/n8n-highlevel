import type { INodeProperties } from 'n8n-workflow';

import {
	addLocationIdPreSendAction,
} from '../GenericFunctions';

export const customObjectsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['customObjects'],
			},
		},
		options: [
			{
				name: 'Create Custom Object',
				value: 'createObject',
				routing: {
					request: {
						method: 'POST',
						url: '/objects/',
					},
					send: {
						preSend: [addLocationIdPreSendAction],
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'object',
								},
							},
						],
					},
				},
				action: 'Create a custom object schema',
			},
			{
				name: 'Create Record',
				value: 'createRecord',
				routing: {
					request: {
						method: 'POST',
						url: '=/objects/{{$parameter.objectId}}/records',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'record',
								},
							},
						],
					},
				},
				action: 'Create a record in a custom object',
			},
			{
				name: 'Delete Record',
				value: 'deleteRecord',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/objects/{{$parameter.objectId}}/records/{{$parameter.recordId}}',
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
				action: 'Delete a record from a custom object',
			},
			{
				name: 'Get All Objects',
				value: 'getAllObjects',
				routing: {
					request: {
						method: 'GET',
						url: '/objects/',
					},
					send: {
						preSend: [addLocationIdPreSendAction],
						paginate: true,
					},
				},
				action: 'Get all custom objects for a location',
			},
			{
				name: 'Get Object Schema',
				value: 'getObjectSchema',
				routing: {
					request: {
						method: 'GET',
						url: '=/objects/{{$parameter.objectId}}',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'object',
								},
							},
						],
					},
				},
				action: 'Get a custom object schema by ID',
			},
			{
				name: 'Get Record',
				value: 'getRecord',
				routing: {
					request: {
						method: 'GET',
						url: '=/objects/{{$parameter.objectId}}/records/{{$parameter.recordId}}',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'record',
								},
							},
						],
					},
				},
				action: 'Get a record from a custom object by ID',
			},
			{
				name: 'Search Records',
				value: 'searchRecords',
				routing: {
					request: {
						method: 'GET',
						url: '=/objects/{{$parameter.objectId}}/records/search',
					},
					send: {
						paginate: true,
					},
				},
				action: 'Search records in a custom object',
			},
			{
				name: 'Update Object Schema',
				value: 'updateObjectSchema',
				routing: {
					request: {
						method: 'PUT',
						url: '=/objects/{{$parameter.objectId}}',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'object',
								},
							},
						],
					},
				},
				action: 'Update a custom object schema',
			},
			{
				name: 'Update Record',
				value: 'updateRecord',
				routing: {
					request: {
						method: 'PUT',
						url: '=/objects/{{$parameter.objectId}}/records/{{$parameter.recordId}}',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'record',
								},
							},
						],
					},
				},
				action: 'Update a record in a custom object',
			},
		],
		default: 'createObject',
	},
];

// Object Schema Operations
const createObjectProperties: INodeProperties[] = [
	{
		displayName: 'Object Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['customObjects'],
				operation: ['createObject'],
			},
		},
		default: '',
		description: 'Name of the custom object',
		routing: {
			send: {
				type: 'body',
				property: 'name',
			},
		},
	},
	{
		displayName: 'Schema',
		name: 'schema',
		type: 'json',
		required: true,
		displayOptions: {
			show: {
				resource: ['customObjects'],
				operation: ['createObject'],
			},
		},
		default: '{}',
		description: 'JSON schema definition for the custom object',
		routing: {
			send: {
				type: 'body',
				property: 'schema',
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
				resource: ['customObjects'],
				operation: ['createObject'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description of the custom object',
				routing: {
					send: {
						type: 'body',
						property: 'description',
					},
				},
			},
			{
				displayName: 'Display Field',
				name: 'displayField',
				type: 'string',
				default: '',
				description: 'Field to use as display name for records',
				routing: {
					send: {
						type: 'body',
						property: 'displayField',
					},
				},
			},
			{
				displayName: 'Enable API Access',
				name: 'enableApiAccess',
				type: 'boolean',
				default: true,
				description: 'Whether API access is enabled for this object',
				routing: {
					send: {
						type: 'body',
						property: 'enableApiAccess',
					},
				},
			},
		],
	},
];

const updateObjectSchemaProperties: INodeProperties[] = [
	{
		displayName: 'Object ID',
		name: 'objectId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['customObjects'],
				operation: ['updateObjectSchema'],
			},
		},
		default: '',
		description: 'ID of the custom object to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['customObjects'],
				operation: ['updateObjectSchema'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description of the custom object',
				routing: {
					send: {
						type: 'body',
						property: 'description',
					},
				},
			},
			{
				displayName: 'Display Field',
				name: 'displayField',
				type: 'string',
				default: '',
				description: 'Field to use as display name for records',
				routing: {
					send: {
						type: 'body',
						property: 'displayField',
					},
				},
			},
			{
				displayName: 'Enable API Access',
				name: 'enableApiAccess',
				type: 'boolean',
				default: true,
				description: 'Whether API access is enabled for this object',
				routing: {
					send: {
						type: 'body',
						property: 'enableApiAccess',
					},
				},
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Name of the custom object',
				routing: {
					send: {
						type: 'body',
						property: 'name',
					},
				},
			},
			{
				displayName: 'Schema',
				name: 'schema',
				type: 'json',
				default: '{}',
				description: 'JSON schema definition for the custom object',
				routing: {
					send: {
						type: 'body',
						property: 'schema',
					},
				},
			},
		],
	},
];

const getObjectSchemaProperties: INodeProperties[] = [
	{
		displayName: 'Object ID',
		name: 'objectId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['customObjects'],
				operation: ['getObjectSchema'],
			},
		},
		default: '',
		description: 'ID of the custom object to retrieve',
	},
];

const getAllObjectsProperties: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['customObjects'],
				operation: ['getAllObjects'],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['customObjects'],
				operation: ['getAllObjects'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
		},
		default: 50,
		description: 'Max number of results to return',
	},
];

// Record Operations
const createRecordProperties: INodeProperties[] = [
	{
		displayName: 'Object ID',
		name: 'objectId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['customObjects'],
				operation: ['createRecord'],
			},
		},
		default: '',
		description: 'ID of the custom object to create record in',
	},
	{
		displayName: 'Record Data',
		name: 'recordData',
		type: 'json',
		required: true,
		displayOptions: {
			show: {
				resource: ['customObjects'],
				operation: ['createRecord'],
			},
		},
		default: '{}',
		description: 'JSON data for the record according to the object schema',
		routing: {
			send: {
				type: 'body',
				property: 'data',
			},
		},
	},
];

const updateRecordProperties: INodeProperties[] = [
	{
		displayName: 'Object ID',
		name: 'objectId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['customObjects'],
				operation: ['updateRecord'],
			},
		},
		default: '',
		description: 'ID of the custom object',
	},
	{
		displayName: 'Record ID',
		name: 'recordId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['customObjects'],
				operation: ['updateRecord'],
			},
		},
		default: '',
		description: 'ID of the record to update',
	},
	{
		displayName: 'Record Data',
		name: 'recordData',
		type: 'json',
		required: true,
		displayOptions: {
			show: {
				resource: ['customObjects'],
				operation: ['updateRecord'],
			},
		},
		default: '{}',
		description: 'JSON data for the record according to the object schema',
		routing: {
			send: {
				type: 'body',
				property: 'data',
			},
		},
	},
];

const getRecordProperties: INodeProperties[] = [
	{
		displayName: 'Object ID',
		name: 'objectId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['customObjects'],
				operation: ['getRecord'],
			},
		},
		default: '',
		description: 'ID of the custom object',
	},
	{
		displayName: 'Record ID',
		name: 'recordId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['customObjects'],
				operation: ['getRecord'],
			},
		},
		default: '',
		description: 'ID of the record to retrieve',
	},
];

const deleteRecordProperties: INodeProperties[] = [
	{
		displayName: 'Object ID',
		name: 'objectId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['customObjects'],
				operation: ['deleteRecord'],
			},
		},
		default: '',
		description: 'ID of the custom object',
	},
	{
		displayName: 'Record ID',
		name: 'recordId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['customObjects'],
				operation: ['deleteRecord'],
			},
		},
		default: '',
		description: 'ID of the record to delete',
	},
];

const searchRecordsProperties: INodeProperties[] = [
	{
		displayName: 'Object ID',
		name: 'objectId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['customObjects'],
				operation: ['searchRecords'],
			},
		},
		default: '',
		description: 'ID of the custom object to search in',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['customObjects'],
				operation: ['searchRecords'],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['customObjects'],
				operation: ['searchRecords'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
		},
		default: 50,
		description: 'Max number of results to return',
	},
	{
		displayName: 'Search Options',
		name: 'searchOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['customObjects'],
				operation: ['searchRecords'],
			},
		},
		options: [
			{
				displayName: 'Query',
				name: 'query',
				type: 'string',
				default: '',
				description: 'Search query string',
				routing: {
					send: {
						type: 'query',
						property: 'query',
					},
				},
			},
			{
				displayName: 'Filter',
				name: 'filter',
				type: 'json',
				default: '{}',
				description: 'JSON filter criteria for the search',
				routing: {
					send: {
						type: 'query',
						property: 'filter',
					},
				},
			},
			{
				displayName: 'Sort Field',
				name: 'sortBy',
				type: 'string',
				default: '',
				description: 'Field to sort by',
				routing: {
					send: {
						type: 'query',
						property: 'sortBy',
					},
				},
			},
			{
				displayName: 'Sort Order',
				name: 'sortOrder',
				type: 'options',
				options: [
					{
						name: 'Ascending',
						value: 'asc',
					},
					{
						name: 'Descending',
						value: 'desc',
					},
				],
				default: 'asc',
				description: 'Sort order for the results',
				routing: {
					send: {
						type: 'query',
						property: 'sortOrder',
					},
				},
			},
		],
	},
];

export const customObjectsFields: INodeProperties[] = [
	...createObjectProperties,
	...updateObjectSchemaProperties,
	...getObjectSchemaProperties,
	...getAllObjectsProperties,
	...createRecordProperties,
	...updateRecordProperties,
	...getRecordProperties,
	...deleteRecordProperties,
	...searchRecordsProperties,
]; 