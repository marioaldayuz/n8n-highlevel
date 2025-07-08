import type { INodeProperties } from 'n8n-workflow';

import {
	addLocationIdPreSendAction,
} from '../GenericFunctions';

export const calendarResourceOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['calendarResource'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				routing: {
					request: {
						method: 'POST',
						url: '/calendars/resources',
						headers: {
							'Version': '2021-07-28',
						},
					},
					send: {
						preSend: [addLocationIdPreSendAction],
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'resource',
								},
							},
						],
					},
				},
				action: 'Create a new calendar resource',
			},
			{
				name: 'Delete',
				value: 'delete',
				routing: {
					request: {
						method: 'DELETE',
						url: '/calendars/resources/={{$parameter["resourceId"]}}',
						headers: {
							'Version': '2021-07-28',
						},
					},
					send: {
						preSend: [addLocationIdPreSendAction],
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
				action: 'Delete a calendar resource',
			},
			{
				name: 'Get',
				value: 'get',
				routing: {
					request: {
						method: 'GET',
						url: '/calendars/resources/={{$parameter["resourceId"]}}',
						headers: {
							'Version': '2021-07-28',
						},
					},
					send: {
						preSend: [addLocationIdPreSendAction],
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'resource',
								},
							},
						],
					},
				},
				action: 'Get a calendar resource',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				routing: {
					request: {
						method: 'GET',
						url: '/calendars/resources',
						headers: {
							'Version': '2021-07-28',
						},
					},
					send: {
						preSend: [addLocationIdPreSendAction],
						paginate: true,
					},
				},
				action: 'Get many calendar resources',
			},
			{
				name: 'Update',
				value: 'update',
				routing: {
					request: {
						method: 'PUT',
						url: '/calendars/resources/={{$parameter["resourceId"]}}',
						headers: {
							'Version': '2021-07-28',
						},
					},
					send: {
						preSend: [addLocationIdPreSendAction],
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'resource',
								},
							},
						],
					},
				},
				action: 'Update a calendar resource',
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
				resource: ['calendarResource'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The name of the calendar resource',
		routing: {
			send: {
				type: 'body',
				property: 'name',
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
				resource: ['calendarResource'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'The description of the calendar resource',
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
				type: 'string',
				default: '',
				description: 'The type of the calendar resource',
				routing: {
					send: {
						type: 'body',
						property: 'type',
					},
				},
			},
			{
				displayName: 'Quantity',
				name: 'quantity',
				type: 'number',
				default: 1,
				description: 'The quantity of the calendar resource',
				routing: {
					send: {
						type: 'body',
						property: 'quantity',
					},
				},
			},
			{
				displayName: 'Is Active',
				name: 'isActive',
				type: 'boolean',
				default: true,
				description: 'Whether the calendar resource is active',
				routing: {
					send: {
						type: 'body',
						property: 'isActive',
					},
				},
			},
		],
	},
];

const getProperties: INodeProperties[] = [
	{
		displayName: 'Resource ID',
		name: 'resourceId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['calendarResource'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'ID of the calendar resource to retrieve',
	},
];

const updateProperties: INodeProperties[] = [
	{
		displayName: 'Resource ID',
		name: 'resourceId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['calendarResource'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'ID of the calendar resource to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['calendarResource'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The name of the calendar resource',
				routing: {
					send: {
						type: 'body',
						property: 'name',
					},
				},
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'The description of the calendar resource',
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
				type: 'string',
				default: '',
				description: 'The type of the calendar resource',
				routing: {
					send: {
						type: 'body',
						property: 'type',
					},
				},
			},
			{
				displayName: 'Quantity',
				name: 'quantity',
				type: 'number',
				default: 1,
				description: 'The quantity of the calendar resource',
				routing: {
					send: {
						type: 'body',
						property: 'quantity',
					},
				},
			},
			{
				displayName: 'Is Active',
				name: 'isActive',
				type: 'boolean',
				default: true,
				description: 'Whether the calendar resource is active',
				routing: {
					send: {
						type: 'body',
						property: 'isActive',
					},
				},
			},
		],
	},
];

const getAllProperties: INodeProperties[] = [
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['calendarResource'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Return All',
				name: 'returnAll',
				type: 'boolean',
				default: false,
				description: 'Whether to return all results or only up to a given limit',
				routing: {
					send: {
						paginate: '!{{$value}}',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'resources',
								},
							},
						],
					},
				},
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 50,
				displayOptions: {
					show: {
						'/additionalFields/returnAll': [false],
					},
				},
				description: 'Max number of results to return',
				routing: {
					send: {
						type: 'query',
						property: 'limit',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'resources',
								},
							},
							{
								type: 'limit',
								properties: {
									maxResults: '={{$parameter["limit"]}}',
								},
							},
						],
					},
				},
			},
		],
	},
];

const deleteProperties: INodeProperties[] = [
	{
		displayName: 'Resource ID',
		name: 'resourceId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['calendarResource'],
				operation: ['delete'],
			},
		},
		default: '',
		description: 'ID of the calendar resource to delete',
	},
];

export const calendarResourceFields: INodeProperties[] = [
	...createProperties,
	...getProperties,
	...updateProperties,
	...getAllProperties,
	...deleteProperties,
]; 