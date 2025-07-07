import type { INodeProperties } from 'n8n-workflow';

export const calendarOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['calendar'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				routing: {
					request: {
						method: 'POST',
						url: 'https://services.leadconnectorhq.com/calendars/',
						headers: {
							'Version': '2021-07-28',
						},
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'calendar',
								},
							},
						],
					},
				},
				action: 'Create a calendar',
			},
			{
				name: 'Delete',
				value: 'delete',
				routing: {
					request: {
						method: 'DELETE',
						url: 'https://services.leadconnectorhq.com/calendars/={{$parameter["calendarId"]}}',
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
				action: 'Delete a calendar',
			},
			{
				name: 'Get',
				value: 'get',
				routing: {
					request: {
						method: 'GET',
						url: 'https://services.leadconnectorhq.com/calendars/={{$parameter["calendarId"]}}',
						headers: {
							'Version': '2021-07-28',
						},
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'calendar',
								},
							},
						],
					},
				},
				action: 'Get a calendar',
			},
			{
				name: 'Get Free Slots',
				value: 'getFreeSlots',
				routing: {
					request: {
						method: 'GET',
						url: 'https://services.leadconnectorhq.com/calendars/={{$parameter["calendarId"]}}/free-slots',
						headers: {
							'Version': '2021-07-28',
						},
					},
				},
				action: 'Get free slots for a calendar',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				routing: {
					request: {
						method: 'GET',
						url: 'https://services.leadconnectorhq.com/calendars/',
						headers: {
							'Version': '2021-07-28',
						},
					},
					send: {
						paginate: true,
					},
				},
				action: 'Get many calendars',
			},
			{
				name: 'Update',
				value: 'update',
				routing: {
					request: {
						method: 'PUT',
						url: 'https://services.leadconnectorhq.com/calendars/={{$parameter["calendarId"]}}',
						headers: {
							'Version': '2021-07-28',
						},
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'calendar',
								},
							},
						],
					},
				},
				action: 'Update a calendar',
			},
		],
		default: 'create',
	},
];

const createProperties: INodeProperties[] = [
	{
		displayName: 'Location ID',
		name: 'locationId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['calendar'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The HighLevel location ID',
		routing: {
			send: {
				type: 'body',
				property: 'locationId',
			},
		},
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['calendar'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Name of the calendar',
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
		displayOptions: {
			show: {
				resource: ['calendar'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Description of the calendar',
		routing: {
			send: {
				type: 'body',
				property: 'description',
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
				resource: ['calendar'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Appointment Duration',
				name: 'appointmentDuration',
				type: 'number',
				default: 30,
				description: 'Default appointment duration in minutes',
				routing: {
					send: {
						type: 'body',
						property: 'appointmentDuration',
					},
				},
			},
			{
				displayName: 'Availability',
				name: 'availability',
				type: 'json',
				default: '{}',
				description: 'Availability settings for the calendar',
				routing: {
					send: {
						type: 'body',
						property: 'availability',
					},
				},
			},
			{
				displayName: 'Buffer Time',
				name: 'bufferTime',
				type: 'number',
				default: 0,
				description: 'Buffer time in minutes between appointments',
				routing: {
					send: {
						type: 'body',
						property: 'bufferTime',
					},
				},
			},
			{
				displayName: 'Calendar Type',
				name: 'calendarType',
				type: 'options',
				options: [
					{
						name: 'Round Robin - Event',
						value: 'round_robin_event',
					},
					{
						name: 'Round Robin - Availability',
						value: 'round_robin_availability',
					},
					{
						name: 'Service Menu',
						value: 'service_menu',
					},
					{
						name: 'Class Booking',
						value: 'class_booking',
					},
				],
				default: 'round_robin_event',
				description: 'Type of calendar',
				routing: {
					send: {
						type: 'body',
						property: 'calendarType',
					},
				},
			},
			{
				displayName: 'Enable Recurring',
				name: 'enableRecurring',
				type: 'boolean',
				default: false,
				description: 'Whether to enable recurring appointments',
				routing: {
					send: {
						type: 'body',
						property: 'enableRecurring',
					},
				},
			},
			{
				displayName: 'Event Color',
				name: 'eventColor',
				type: 'color',
				default: '#039BE5',
				description: 'Color for calendar events',
				routing: {
					send: {
						type: 'body',
						property: 'eventColor',
					},
				},
			},
			{
				displayName: 'Event Title',
				name: 'eventTitle',
				type: 'string',
				default: '',
				description: 'Default title for calendar events',
				routing: {
					send: {
						type: 'body',
						property: 'eventTitle',
					},
				},
			},
			{
				displayName: 'Slug',
				name: 'slug',
				type: 'string',
				default: '',
				description: 'URL slug for the calendar',
				routing: {
					send: {
						type: 'body',
						property: 'slug',
					},
				},
			},
		],
	},
];

const updateProperties: INodeProperties[] = [
	{
		displayName: 'Calendar ID',
		name: 'calendarId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['calendar'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'ID of the calendar to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['calendar'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Appointment Duration',
				name: 'appointmentDuration',
				type: 'number',
				default: 30,
				description: 'Default appointment duration in minutes',
				routing: {
					send: {
						type: 'body',
						property: 'appointmentDuration',
					},
				},
			},
			{
				displayName: 'Availability',
				name: 'availability',
				type: 'json',
				default: '{}',
				description: 'Availability settings for the calendar',
				routing: {
					send: {
						type: 'body',
						property: 'availability',
					},
				},
			},
			{
				displayName: 'Buffer Time',
				name: 'bufferTime',
				type: 'number',
				default: 0,
				description: 'Buffer time in minutes between appointments',
				routing: {
					send: {
						type: 'body',
						property: 'bufferTime',
					},
				},
			},
			{
				displayName: 'Calendar Type',
				name: 'calendarType',
				type: 'options',
				options: [
					{
						name: 'Round Robin - Event',
						value: 'round_robin_event',
					},
					{
						name: 'Round Robin - Availability',
						value: 'round_robin_availability',
					},
					{
						name: 'Service Menu',
						value: 'service_menu',
					},
					{
						name: 'Class Booking',
						value: 'class_booking',
					},
				],
				default: 'round_robin_event',
				description: 'Type of calendar',
				routing: {
					send: {
						type: 'body',
						property: 'calendarType',
					},
				},
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description of the calendar',
				routing: {
					send: {
						type: 'body',
						property: 'description',
					},
				},
			},
			{
				displayName: 'Enable Recurring',
				name: 'enableRecurring',
				type: 'boolean',
				default: false,
				description: 'Whether to enable recurring appointments',
				routing: {
					send: {
						type: 'body',
						property: 'enableRecurring',
					},
				},
			},
			{
				displayName: 'Event Color',
				name: 'eventColor',
				type: 'color',
				default: '#039BE5',
				description: 'Color for calendar events',
				routing: {
					send: {
						type: 'body',
						property: 'eventColor',
					},
				},
			},
			{
				displayName: 'Event Title',
				name: 'eventTitle',
				type: 'string',
				default: '',
				description: 'Default title for calendar events',
				routing: {
					send: {
						type: 'body',
						property: 'eventTitle',
					},
				},
			},
			{
				displayName: 'Location ID',
				name: 'locationId',
				type: 'string',
				default: '',
				description: 'The HighLevel location ID',
				routing: {
					send: {
						type: 'body',
						property: 'locationId',
					},
				},
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Name of the calendar',
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
				default: '',
				description: 'URL slug for the calendar',
				routing: {
					send: {
						type: 'body',
						property: 'slug',
					},
				},
			},
		],
	},
];

const deleteProperties: INodeProperties[] = [
	{
		displayName: 'Calendar ID',
		name: 'calendarId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['calendar'],
				operation: ['delete'],
			},
		},
		default: '',
		description: 'ID of the calendar to delete',
	},
];

const getProperties: INodeProperties[] = [
	{
		displayName: 'Calendar ID',
		name: 'calendarId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['calendar'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'ID of the calendar to retrieve',
	},
];

const getAllProperties: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['calendar'],
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
				resource: ['calendar'],
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
				resource: ['calendar'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Location ID',
				name: 'locationId',
				type: 'string',
				default: '',
				description: 'Filter calendars by location ID',
				routing: {
					send: {
						type: 'query',
						property: 'locationId',
					},
				},
			},
		],
	},
];

const getFreeSlotsProperties: INodeProperties[] = [
	{
		displayName: 'Calendar ID',
		name: 'calendarId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['calendar'],
				operation: ['getFreeSlots'],
			},
		},
		default: '',
		description: 'ID of the calendar to get free slots for',
	},
	{
		displayName: 'Start Date',
		name: 'startDate',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['calendar'],
				operation: ['getFreeSlots'],
			},
		},
		default: '',
		description: 'Start date for fetching free calendar slots (Unix timestamp in milliseconds). Example: 1548898600000.',
		routing: {
			send: {
				type: 'query',
				property: 'startDate',
			},
		},
	},
	{
		displayName: 'End Date',
		name: 'endDate',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['calendar'],
				operation: ['getFreeSlots'],
			},
		},
		default: '',
		description: 'End date for fetching free calendar slots (Unix timestamp in milliseconds). Example: 1601490599999.',
		routing: {
			send: {
				type: 'query',
				property: 'endDate',
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
				resource: ['calendar'],
				operation: ['getFreeSlots'],
			},
		},
		options: [
			{
				displayName: 'Timezone',
				name: 'timezone',
				type: 'string',
				default: '',
				description: 'Timezone to use for the returned slots. Example: America/Chihuahua.',
				routing: {
					send: {
						type: 'query',
						property: 'timezone',
					},
				},
			},
			{
				displayName: 'User ID',
				name: 'userId',
				type: 'string',
				default: '',
				description: 'User ID to filter the slots (optional)',
				routing: {
					send: {
						type: 'query',
						property: 'userId',
					},
				},
			},
		],
	},
];

export const calendarFields: INodeProperties[] = [
	...createProperties,
	...updateProperties,
	...deleteProperties,
	...getProperties,
	...getAllProperties,
	...getFreeSlotsProperties,
];
