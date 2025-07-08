import type { INodeProperties } from 'n8n-workflow';

import {
	addLocationIdPreSendAction,
} from '../GenericFunctions';

export const appointmentNotesOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['appointmentNotes'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				routing: {
					request: {
						method: 'POST',
						url: '/notes/',
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
									property: 'note',
								},
							},
						],
					},
				},
				action: 'Create a new appointment note',
			},
			{
				name: 'Delete',
				value: 'delete',
				routing: {
					request: {
						method: 'DELETE',
						url: '/notes/={{$parameter["noteId"]}}',
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
				action: 'Delete an appointment note',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				routing: {
					request: {
						method: 'GET',
						url: '/notes/',
						headers: {
							'Version': '2021-07-28',
						},
					},
					send: {
						paginate: true,
					},
				},
				action: 'Get many appointment notes',
			},
			{
				name: 'Update',
				value: 'update',
				routing: {
					request: {
						method: 'PUT',
						url: '/notes/={{$parameter["noteId"]}}',
						headers: {
							'Version': '2021-07-28',
						},
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'note',
								},
							},
						],
					},
				},
				action: 'Update an appointment note',
			},
		],
		default: 'create',
	},
];

const createProperties: INodeProperties[] = [
	{
		displayName: 'Contact ID',
		name: 'contactId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['appointmentNotes'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The contact ID for the appointment note',
		routing: {
			send: {
				type: 'body',
				property: 'contactId',
			},
		},
	},
	{
		displayName: 'Body',
		name: 'body',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['appointmentNotes'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The content of the appointment note',
		routing: {
			send: {
				type: 'body',
				property: 'body',
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
				resource: ['appointmentNotes'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'User ID',
				name: 'userId',
				type: 'string',
				default: '',
				description: 'User ID who created the note',
				routing: {
					send: {
						type: 'body',
						property: 'userId',
					},
				},
			},
			{
				displayName: 'Appointment ID',
				name: 'appointmentId',
				type: 'string',
				default: '',
				description: 'The appointment ID this note is associated with',
				routing: {
					send: {
						type: 'body',
						property: 'appointmentId',
					},
				},
			},
		],
	},
];

const updateProperties: INodeProperties[] = [
	{
		displayName: 'Note ID',
		name: 'noteId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['appointmentNotes'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'ID of the appointment note to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['appointmentNotes'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Body',
				name: 'body',
				type: 'string',
				default: '',
				description: 'The content of the appointment note',
				routing: {
					send: {
						type: 'body',
						property: 'body',
					},
				},
			},
			{
				displayName: 'User ID',
				name: 'userId',
				type: 'string',
				default: '',
				description: 'User ID who created the note',
				routing: {
					send: {
						type: 'body',
						property: 'userId',
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
				resource: ['appointmentNotes'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Contact ID',
				name: 'contactId',
				type: 'string',
				default: '',
				description: 'Filter by contact ID',
				routing: {
					send: {
						type: 'query',
						property: 'contactId',
					},
				},
			},
			{
				displayName: 'User ID',
				name: 'userId',
				type: 'string',
				default: '',
				description: 'Filter by user ID',
				routing: {
					send: {
						type: 'query',
						property: 'userId',
					},
				},
			},
			{
				displayName: 'Appointment ID',
				name: 'appointmentId',
				type: 'string',
				default: '',
				description: 'Filter by appointment ID',
				routing: {
					send: {
						type: 'query',
						property: 'appointmentId',
					},
				},
			},
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
									property: 'notes',
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
									property: 'notes',
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
		displayName: 'Note ID',
		name: 'noteId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['appointmentNotes'],
				operation: ['delete'],
			},
		},
		default: '',
		description: 'ID of the appointment note to delete',
	},
];

export const appointmentNotesFields: INodeProperties[] = [
	...createProperties,
	...updateProperties,
	...getAllProperties,
	...deleteProperties,
]; 