import type { INodeProperties } from 'n8n-workflow';

import {
	addLocationIdPreSendAction,
} from '../GenericFunctions';

export const redirectOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['redirect'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				routing: {
					request: {
						method: 'POST',
						url: '/redirects/',
					},
					send: {
						preSend: [addLocationIdPreSendAction],
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'redirect',
								},
							},
						],
					},
				},
				action: 'Create a new redirect',
			},
			{
				name: 'Get All',
				value: 'getAll',
				routing: {
					request: {
						method: 'GET',
						url: '/redirects/',
					},
					send: {
						preSend: [addLocationIdPreSendAction],
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'redirects',
								},
							},
						],
					},
				},
				action: 'Get all redirects',
			},
			{
				name: 'Update',
				value: 'update',
				routing: {
					request: {
						method: 'PUT',
						url: '=/redirects/{{$parameter.redirectId}}',
					},
					send: {
						preSend: [addLocationIdPreSendAction],
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'redirect',
								},
							},
						],
					},
				},
				action: 'Update a redirect',
			},
			{
				name: 'Delete',
				value: 'delete',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/redirects/{{$parameter.redirectId}}',
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
				action: 'Delete a redirect',
			},
		],
		default: 'getAll',
	},
];

export const redirectFields: INodeProperties[] = [
	// Create Operation Fields
	{
		displayName: 'Source URL',
		name: 'sourceUrl',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['redirect'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The source URL to redirect from',
		routing: {
			send: {
				type: 'body',
				property: 'sourceUrl',
			},
		},
	},
	{
		displayName: 'Target URL',
		name: 'targetUrl',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['redirect'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The target URL to redirect to',
		routing: {
			send: {
				type: 'body',
				property: 'targetUrl',
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
				resource: ['redirect'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Redirect Type',
				name: 'redirectType',
				type: 'options',
				options: [
					{
						name: 'Permanent (301)',
						value: '301',
					},
					{
						name: 'Temporary (302)',
						value: '302',
					},
				],
				default: '301',
				description: 'Type of redirect',
				routing: {
					send: {
						type: 'body',
						property: 'redirectType',
					},
				},
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description of the redirect',
				routing: {
					send: {
						type: 'body',
						property: 'description',
					},
				},
			},
			{
				displayName: 'Is Active',
				name: 'isActive',
				type: 'boolean',
				default: true,
				description: 'Whether the redirect is active',
				routing: {
					send: {
						type: 'body',
						property: 'isActive',
					},
				},
			},
		],
	},

	// Update Operation Fields
	{
		displayName: 'Redirect ID',
		name: 'redirectId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['redirect'],
				operation: ['update', 'delete'],
			},
		},
		default: '',
		description: 'ID of the redirect to update or delete',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['redirect'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Source URL',
				name: 'sourceUrl',
				type: 'string',
				default: '',
				description: 'The source URL to redirect from',
				routing: {
					send: {
						type: 'body',
						property: 'sourceUrl',
					},
				},
			},
			{
				displayName: 'Target URL',
				name: 'targetUrl',
				type: 'string',
				default: '',
				description: 'The target URL to redirect to',
				routing: {
					send: {
						type: 'body',
						property: 'targetUrl',
					},
				},
			},
			{
				displayName: 'Redirect Type',
				name: 'redirectType',
				type: 'options',
				options: [
					{
						name: 'Permanent (301)',
						value: '301',
					},
					{
						name: 'Temporary (302)',
						value: '302',
					},
				],
				default: '301',
				description: 'Type of redirect',
				routing: {
					send: {
						type: 'body',
						property: 'redirectType',
					},
				},
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description of the redirect',
				routing: {
					send: {
						type: 'body',
						property: 'description',
					},
				},
			},
			{
				displayName: 'Is Active',
				name: 'isActive',
				type: 'boolean',
				default: true,
				description: 'Whether the redirect is active',
				routing: {
					send: {
						type: 'body',
						property: 'isActive',
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
				resource: ['redirect'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 20,
				description: 'Maximum number of redirects to return',
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
				description: 'Number of redirects to skip',
				routing: {
					send: {
						type: 'query',
						property: 'offset',
					},
				},
			},
			{
				displayName: 'Search',
				name: 'search',
				type: 'string',
				default: '',
				description: 'Search term to filter redirects',
				routing: {
					send: {
						type: 'query',
						property: 'search',
					},
				},
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{
						name: 'All',
						value: 'all',
					},
					{
						name: 'Active',
						value: 'active',
					},
					{
						name: 'Inactive',
						value: 'inactive',
					},
				],
				default: 'all',
				description: 'Filter by redirect status',
				routing: {
					send: {
						type: 'query',
						property: 'status',
					},
				},
			},
		],
	},
]; 