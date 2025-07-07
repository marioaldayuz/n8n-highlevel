import type { INodeProperties } from 'n8n-workflow';

import {
	addLocationIdPreSendAction,
} from '../GenericFunctions';

export const customValuesOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['customValues'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				routing: {
					request: {
						method: 'POST',
						url: '/custom-values',
					},
					send: {
						preSend: [addLocationIdPreSendAction],
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'customValue',
								},
							},
						],
					},
				},
				action: 'Create a new custom value',
			},
			{
				name: 'Get',
				value: 'get',
				routing: {
					request: {
						method: 'GET',
						url: '=/custom-values/{{$parameter.customValueId}}',
					},
					send: {
						preSend: [addLocationIdPreSendAction],
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'customValue',
								},
							},
						],
					},
				},
				action: 'Get a specific custom value',
			},
			{
				name: 'Get All',
				value: 'getAll',
				routing: {
					request: {
						method: 'GET',
						url: '/custom-values',
					},
					send: {
						preSend: [addLocationIdPreSendAction],
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'customValues',
								},
							},
						],
					},
				},
				action: 'Get all custom values',
			},
			{
				name: 'Update',
				value: 'update',
				routing: {
					request: {
						method: 'PUT',
						url: '=/custom-values/{{$parameter.customValueId}}',
					},
					send: {
						preSend: [addLocationIdPreSendAction],
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'customValue',
								},
							},
						],
					},
				},
				action: 'Update an existing custom value',
			},
			{
				name: 'Delete',
				value: 'delete',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/custom-values/{{$parameter.customValueId}}',
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
				action: 'Delete a custom value',
			},
		],
		default: 'getAll',
	},
];

export const customValuesFields: INodeProperties[] = [
	// Custom Value ID - Required for get, update, delete operations
	{
		displayName: 'Custom Value ID',
		name: 'customValueId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['customValues'],
				operation: ['get', 'update', 'delete'],
			},
		},
		default: '',
		description: 'ID of the custom value to get, update, or delete',
	},

	// Create Operation Fields
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['customValues'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Name of the custom value',
		routing: {
			send: {
				type: 'body',
				property: 'name',
			},
		},
	},
	{
		displayName: 'Value',
		name: 'value',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['customValues'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Value of the custom value',
		routing: {
			send: {
				type: 'body',
				property: 'value',
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
				resource: ['customValues'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description of the custom value',
				routing: {
					send: {
						type: 'body',
						property: 'description',
					},
				},
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				default: 'text',
				description: 'Type of the custom value',
				options: [
					{
						name: 'Text',
						value: 'text',
					},
					{
						name: 'Number',
						value: 'number',
					},
					{
						name: 'Boolean',
						value: 'boolean',
					},
					{
						name: 'Date',
						value: 'date',
					},
					{
						name: 'URL',
						value: 'url',
					},
					{
						name: 'Email',
						value: 'email',
					},
				],
				routing: {
					send: {
						type: 'body',
						property: 'type',
					},
				},
			},
			{
				displayName: 'Category',
				name: 'category',
				type: 'string',
				default: '',
				description: 'Category to organize custom values',
				routing: {
					send: {
						type: 'body',
						property: 'category',
					},
				},
			},
			{
				displayName: 'Is Active',
				name: 'isActive',
				type: 'boolean',
				default: true,
				description: 'Whether the custom value is active',
				routing: {
					send: {
						type: 'body',
						property: 'isActive',
					},
				},
			},
			{
				displayName: 'Sort Order',
				name: 'sortOrder',
				type: 'number',
				default: 0,
				description: 'Sort order for displaying custom values',
				routing: {
					send: {
						type: 'body',
						property: 'sortOrder',
					},
				},
			},
		],
	},

	// Update Operation Fields
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['customValues'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Updated name of the custom value',
				routing: {
					send: {
						type: 'body',
						property: 'name',
					},
				},
			},
			{
				displayName: 'Value',
				name: 'value',
				type: 'string',
				default: '',
				description: 'Updated value of the custom value',
				routing: {
					send: {
						type: 'body',
						property: 'value',
					},
				},
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Updated description of the custom value',
				routing: {
					send: {
						type: 'body',
						property: 'description',
					},
				},
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				default: 'text',
				description: 'Updated type of the custom value',
				options: [
					{
						name: 'Text',
						value: 'text',
					},
					{
						name: 'Number',
						value: 'number',
					},
					{
						name: 'Boolean',
						value: 'boolean',
					},
					{
						name: 'Date',
						value: 'date',
					},
					{
						name: 'URL',
						value: 'url',
					},
					{
						name: 'Email',
						value: 'email',
					},
				],
				routing: {
					send: {
						type: 'body',
						property: 'type',
					},
				},
			},
			{
				displayName: 'Category',
				name: 'category',
				type: 'string',
				default: '',
				description: 'Updated category to organize custom values',
				routing: {
					send: {
						type: 'body',
						property: 'category',
					},
				},
			},
			{
				displayName: 'Is Active',
				name: 'isActive',
				type: 'boolean',
				default: true,
				description: 'Whether the custom value is active',
				routing: {
					send: {
						type: 'body',
						property: 'isActive',
					},
				},
			},
			{
				displayName: 'Sort Order',
				name: 'sortOrder',
				type: 'number',
				default: 0,
				description: 'Sort order for displaying custom values',
				routing: {
					send: {
						type: 'body',
						property: 'sortOrder',
					},
				},
			},
		],
	},

	// Get All Operation Fields
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['customValues'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Category',
				name: 'category',
				type: 'string',
				default: '',
				description: 'Filter by category',
				routing: {
					send: {
						type: 'query',
						property: 'category',
					},
				},
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				default: '',
				description: 'Filter by type',
				options: [
					{
						name: 'All',
						value: '',
					},
					{
						name: 'Text',
						value: 'text',
					},
					{
						name: 'Number',
						value: 'number',
					},
					{
						name: 'Boolean',
						value: 'boolean',
					},
					{
						name: 'Date',
						value: 'date',
					},
					{
						name: 'URL',
						value: 'url',
					},
					{
						name: 'Email',
						value: 'email',
					},
				],
				routing: {
					send: {
						type: 'query',
						property: 'type',
					},
				},
			},
			{
				displayName: 'Is Active',
				name: 'isActive',
				type: 'options',
				default: '',
				description: 'Filter by active status',
				options: [
					{
						name: 'All',
						value: '',
					},
					{
						name: 'Active',
						value: 'true',
					},
					{
						name: 'Inactive',
						value: 'false',
					},
				],
				routing: {
					send: {
						type: 'query',
						property: 'isActive',
					},
				},
			},
			{
				displayName: 'Search',
				name: 'search',
				type: 'string',
				default: '',
				description: 'Search custom values by name or value',
				routing: {
					send: {
						type: 'query',
						property: 'search',
					},
				},
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 50,
				description: 'Maximum number of custom values to return',
				routing: {
					send: {
						type: 'query',
						property: 'limit',
					},
				},
			},
			{
				displayName: 'Offset',
				name: 'offset',
				type: 'number',
				default: 0,
				description: 'Number of custom values to skip',
				routing: {
					send: {
						type: 'query',
						property: 'offset',
					},
				},
			},
		],
	},
]; 