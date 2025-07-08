import type { INodeProperties } from 'n8n-workflow';

import {
	addLocationIdPreSendAction,
} from '../GenericFunctions';

export const calendarGroupOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['calendarGroup'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				routing: {
					request: {
						method: 'POST',
						url: '/calendar-groups/',
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
									property: 'group',
								},
							},
						],
					},
				},
				action: 'Create a calendar group',
			},
			{
				name: 'Delete',
				value: 'delete',
				routing: {
					request: {
						method: 'DELETE',
						url: '/calendar-groups/={{$parameter["groupId"]}}',
						headers: {
							'Version': '2021-07-28',
						},
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
				action: 'Delete a calendar group',
			},
			{
				name: 'Disable',
				value: 'disable',
				routing: {
					request: {
						method: 'PUT',
						url: '/calendar-groups/={{$parameter["groupId"]}}/disable',
						headers: {
							'Version': '2021-07-28',
						},
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'group',
								},
							},
						],
					},
				},
				action: 'Disable a calendar group',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				routing: {
					request: {
						method: 'GET',
						url: '/calendar-groups/',
						headers: {
							'Version': '2021-07-28',
						},
					},
					send: {
						paginate: true,
						preSend: [addLocationIdPreSendAction],
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'groups',
								},
							},
						],
					},
				},
				action: 'Get many calendar groups',
			},
			{
				name: 'Update',
				value: 'update',
				routing: {
					request: {
						method: 'PUT',
						url: '/calendar-groups/={{$parameter["groupId"]}}',
						headers: {
							'Version': '2021-07-28',
						},
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'group',
								},
							},
						],
					},
				},
				action: 'Update a calendar group',
			},
			{
				name: 'Validate Slug',
				value: 'validateSlug',
				routing: {
					request: {
						method: 'GET',
						url: '/calendar-groups/validate/slug',
						headers: {
							'Version': '2021-07-28',
						},
					},
					send: {
						preSend: [addLocationIdPreSendAction],
					},
				},
				action: 'Validate calendar group slug',
			},
		],
		default: 'getAll',
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
				resource: ['calendarGroup'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Name of the calendar group',
		routing: {
			send: {
				type: 'body',
				property: 'name',
			},
		},
	},
	{
		displayName: 'Slug',
		name: 'slug',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['calendarGroup'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'URL slug for the calendar group',
		routing: {
			send: {
				type: 'body',
				property: 'slug',
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
				resource: ['calendarGroup'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description of the calendar group',
				routing: {
					send: {
						type: 'body',
						property: 'description',
					},
				},
			},
			{
				displayName: 'Calendar IDs',
				name: 'calendarIds',
				type: 'string',
				typeOptions: {
					multipleValues: true,
				},
				default: [],
				description: 'Array of calendar IDs to include in the group',
				routing: {
					send: {
						type: 'body',
						property: 'calendarIds',
					},
				},
			},
			{
				displayName: 'Is Active',
				name: 'isActive',
				type: 'boolean',
				default: true,
				description: 'Whether the calendar group is active',
				routing: {
					send: {
						type: 'body',
						property: 'isActive',
					},
				},
			},
			{
				displayName: 'Team ID',
				name: 'teamId',
				type: 'string',
				default: '',
				description: 'Team ID associated with the calendar group',
				routing: {
					send: {
						type: 'body',
						property: 'teamId',
					},
				},
			},
		],
	},
];

const updateProperties: INodeProperties[] = [
	{
		displayName: 'Group ID',
		name: 'groupId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['calendarGroup'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'ID of the calendar group to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['calendarGroup'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Name of the calendar group',
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
				description: 'Description of the calendar group',
				routing: {
					send: {
						type: 'body',
						property: 'description',
					},
				},
			},
			{
				displayName: 'Slug',
				name: 'slug',
				type: 'string',
				default: '',
				description: 'URL slug for the calendar group',
				routing: {
					send: {
						type: 'body',
						property: 'slug',
					},
				},
			},
			{
				displayName: 'Calendar IDs',
				name: 'calendarIds',
				type: 'string',
				typeOptions: {
					multipleValues: true,
				},
				default: [],
				description: 'Array of calendar IDs to include in the group',
				routing: {
					send: {
						type: 'body',
						property: 'calendarIds',
					},
				},
			},
			{
				displayName: 'Is Active',
				name: 'isActive',
				type: 'boolean',
				default: true,
				description: 'Whether the calendar group is active',
				routing: {
					send: {
						type: 'body',
						property: 'isActive',
					},
				},
			},
			{
				displayName: 'Team ID',
				name: 'teamId',
				type: 'string',
				default: '',
				description: 'Team ID associated with the calendar group',
				routing: {
					send: {
						type: 'body',
						property: 'teamId',
					},
				},
			},
		],
	},
];

const deleteProperties: INodeProperties[] = [
	{
		displayName: 'Group ID',
		name: 'groupId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['calendarGroup'],
				operation: ['delete'],
			},
		},
		default: '',
		description: 'ID of the calendar group to delete',
	},
];

const disableProperties: INodeProperties[] = [
	{
		displayName: 'Group ID',
		name: 'groupId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['calendarGroup'],
				operation: ['disable'],
			},
		},
		default: '',
		description: 'ID of the calendar group to disable',
	},
];

const validateSlugProperties: INodeProperties[] = [
	{
		displayName: 'Slug',
		name: 'slug',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['calendarGroup'],
				operation: ['validateSlug'],
			},
		},
		default: '',
		description: 'Slug to validate for the calendar group',
		routing: {
			send: {
				type: 'query',
				property: 'slug',
			},
		},
	},
];

const getAllProperties: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['calendarGroup'],
				operation: ['getAll'],
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
				resource: ['calendarGroup'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,

		},
		default: 50,
		description: 'Max number of results to return',
		routing: {
			send: {
				type: 'query',
				property: 'limit',
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
				resource: ['calendarGroup'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Search',
				name: 'search',
				type: 'string',
				default: '',
				description: 'Search term to filter calendar groups',
				routing: {
					send: {
						type: 'query',
						property: 'search',
					},
				},
			},
		],
	},
];

export const calendarGroupFields: INodeProperties[] = [
	...createProperties,
	...updateProperties,
	...deleteProperties,
	...disableProperties,
	...validateSlugProperties,
	...getAllProperties,
]; 