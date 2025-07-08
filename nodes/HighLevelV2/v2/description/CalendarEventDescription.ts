import type { INodeProperties } from 'n8n-workflow';

import {
	addLocationIdPreSendAction,
} from '../GenericFunctions';

export const calendarEventOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['calendarEvent'],
			},
		},
		options: [
			{
				name: 'Create Appointment',
				value: 'createAppointment',
				routing: {
					request: {
						method: 'POST',
						url: '/calendars/events/appointments',
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
									property: 'appointment',
								},
							},
						],
					},
				},
				action: 'Create a new appointment',
			},
			{
				name: 'Create Block Slot',
				value: 'createBlockSlot',
				routing: {
					request: {
						method: 'POST',
						url: '/calendars/blocked-slots',
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
									property: 'blockedSlot',
								},
							},
						],
					},
				},
				action: 'Create a new blocked slot',
			},
			{
				name: 'Delete Event',
				value: 'deleteEvent',
				routing: {
					request: {
						method: 'DELETE',
						url: '/calendars/events/={{$parameter["eventId"]}}',
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
				action: 'Delete an event',
			},
			{
				name: 'Get Appointment',
				value: 'getAppointment',
				routing: {
					request: {
						method: 'GET',
						url: '/calendars/events/appointments/={{$parameter["appointmentId"]}}',
						headers: {
							'Version': '2021-07-28',
						},
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'appointment',
								},
							},
						],
					},
				},
				action: 'Get an appointment by ID',
			},
			{
				name: 'Get Blocked Slots',
				value: 'getBlockedSlots',
				routing: {
					request: {
						method: 'GET',
						url: '/calendars/blocked-slots',
						headers: {
							'Version': '2021-07-28',
						},
					},
					send: {
						paginate: true,
					},
				},
				action: 'Get blocked time slots',
			},
			{
				name: 'Update Appointment',
				value: 'updateAppointment',
				routing: {
					request: {
						method: 'PUT',
						url: '/calendars/events/appointments/={{$parameter["appointmentId"]}}',
						headers: {
							'Version': '2021-07-28',
						},
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'appointment',
								},
							},
						],
					},
				},
				action: 'Update an existing appointment',
			},
			{
				name: 'Update Block Slot',
				value: 'updateBlockSlot',
				routing: {
					request: {
						method: 'PUT',
						url: '/calendars/blocked-slots/={{$parameter["blockSlotId"]}}',
						headers: {
							'Version': '2021-07-28',
						},
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'blockedSlot',
								},
							},
						],
					},
				},
				action: 'Update an existing blocked slot',
			},
		],
		default: 'createAppointment',
	},
];

const createAppointmentProperties: INodeProperties[] = [
	{
		displayName: 'Calendar ID',
		name: 'calendarId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['calendarEvent'],
				operation: ['createAppointment'],
			},
		},
		default: '',
		description: 'The calendar ID to create the appointment in',
		routing: {
			send: {
				type: 'body',
				property: 'calendarId',
			},
		},
	},
	{
		displayName: 'Contact ID',
		name: 'contactId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['calendarEvent'],
				operation: ['createAppointment'],
			},
		},
		default: '',
		description: 'The contact ID for the appointment',
		routing: {
			send: {
				type: 'body',
				property: 'contactId',
			},
		},
	},
	{
		displayName: 'Start Time',
		name: 'startTime',
		type: 'dateTime',
		required: true,
		displayOptions: {
			show: {
				resource: ['calendarEvent'],
				operation: ['createAppointment'],
			},
		},
		default: '',
		description: 'The start time of the appointment',
		routing: {
			send: {
				type: 'body',
				property: 'startTime',
			},
		},
	},
	{
		displayName: 'End Time',
		name: 'endTime',
		type: 'dateTime',
		required: true,
		displayOptions: {
			show: {
				resource: ['calendarEvent'],
				operation: ['createAppointment'],
			},
		},
		default: '',
		description: 'The end time of the appointment',
		routing: {
			send: {
				type: 'body',
				property: 'endTime',
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
				resource: ['calendarEvent'],
				operation: ['createAppointment'],
			},
		},
		options: [
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'Title of the appointment',
				routing: {
					send: {
						type: 'body',
						property: 'title',
					},
				},
			},
			{
				displayName: 'Appointment Status',
				name: 'appointmentStatus',
				type: 'options',
				options: [
					{
						name: 'Confirmed',
						value: 'confirmed',
					},
					{
						name: 'Cancelled',
						value: 'cancelled',
					},
					{
						name: 'Showed',
						value: 'showed',
					},
					{
						name: 'No Show',
						value: 'noshow',
					},
					{
						name: 'Invalid',
						value: 'invalid',
					},
				],
				default: 'confirmed',
				description: 'Status of the appointment',
				routing: {
					send: {
						type: 'body',
						property: 'appointmentStatus',
					},
				},
			},
			{
				displayName: 'Assigned User ID',
				name: 'assignedUserId',
				type: 'string',
				default: '',
				description: 'User ID assigned to the appointment',
				routing: {
					send: {
						type: 'body',
						property: 'assignedUserId',
					},
				},
			},
			{
				displayName: 'Address',
				name: 'address',
				type: 'string',
				default: '',
				description: 'Address for the appointment',
				routing: {
					send: {
						type: 'body',
						property: 'address',
					},
				},
			},
			{
				displayName: 'Notes',
				name: 'notes',
				type: 'string',
				default: '',
				description: 'Notes for the appointment',
				routing: {
					send: {
						type: 'body',
						property: 'notes',
					},
				},
			},
		],
	},
];

const updateAppointmentProperties: INodeProperties[] = [
	{
		displayName: 'Appointment ID',
		name: 'appointmentId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['calendarEvent'],
				operation: ['updateAppointment'],
			},
		},
		default: '',
		description: 'ID of the appointment to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['calendarEvent'],
				operation: ['updateAppointment'],
			},
		},
		options: [
			{
				displayName: 'Start Time',
				name: 'startTime',
				type: 'dateTime',
				default: '',
				description: 'The start time of the appointment',
				routing: {
					send: {
						type: 'body',
						property: 'startTime',
					},
				},
			},
			{
				displayName: 'End Time',
				name: 'endTime',
				type: 'dateTime',
				default: '',
				description: 'The end time of the appointment',
				routing: {
					send: {
						type: 'body',
						property: 'endTime',
					},
				},
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'Title of the appointment',
				routing: {
					send: {
						type: 'body',
						property: 'title',
					},
				},
			},
			{
				displayName: 'Appointment Status',
				name: 'appointmentStatus',
				type: 'options',
				options: [
					{
						name: 'Confirmed',
						value: 'confirmed',
					},
					{
						name: 'Cancelled',
						value: 'cancelled',
					},
					{
						name: 'Showed',
						value: 'showed',
					},
					{
						name: 'No Show',
						value: 'noshow',
					},
					{
						name: 'Invalid',
						value: 'invalid',
					},
				],
				default: 'confirmed',
				description: 'Status of the appointment',
				routing: {
					send: {
						type: 'body',
						property: 'appointmentStatus',
					},
				},
			},
			{
				displayName: 'Assigned User ID',
				name: 'assignedUserId',
				type: 'string',
				default: '',
				description: 'User ID assigned to the appointment',
				routing: {
					send: {
						type: 'body',
						property: 'assignedUserId',
					},
				},
			},
			{
				displayName: 'Address',
				name: 'address',
				type: 'string',
				default: '',
				description: 'Address for the appointment',
				routing: {
					send: {
						type: 'body',
						property: 'address',
					},
				},
			},
			{
				displayName: 'Notes',
				name: 'notes',
				type: 'string',
				default: '',
				description: 'Notes for the appointment',
				routing: {
					send: {
						type: 'body',
						property: 'notes',
					},
				},
			},
		],
	},
];

const getAppointmentProperties: INodeProperties[] = [
	{
		displayName: 'Appointment ID',
		name: 'appointmentId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['calendarEvent'],
				operation: ['getAppointment'],
			},
		},
		default: '',
		description: 'ID of the appointment to retrieve',
	},
];

const createBlockSlotProperties: INodeProperties[] = [
	{
		displayName: 'Calendar ID',
		name: 'calendarId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['calendarEvent'],
				operation: ['createBlockSlot'],
			},
		},
		default: '',
		description: 'The calendar ID to create the blocked slot in',
		routing: {
			send: {
				type: 'body',
				property: 'calendarId',
			},
		},
	},
	{
		displayName: 'Start Time',
		name: 'startTime',
		type: 'dateTime',
		required: true,
		displayOptions: {
			show: {
				resource: ['calendarEvent'],
				operation: ['createBlockSlot'],
			},
		},
		default: '',
		description: 'The start time of the blocked slot',
		routing: {
			send: {
				type: 'body',
				property: 'startTime',
			},
		},
	},
	{
		displayName: 'End Time',
		name: 'endTime',
		type: 'dateTime',
		required: true,
		displayOptions: {
			show: {
				resource: ['calendarEvent'],
				operation: ['createBlockSlot'],
			},
		},
		default: '',
		description: 'The end time of the blocked slot',
		routing: {
			send: {
				type: 'body',
				property: 'endTime',
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
				resource: ['calendarEvent'],
				operation: ['createBlockSlot'],
			},
		},
		options: [
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'Title of the blocked slot',
				routing: {
					send: {
						type: 'body',
						property: 'title',
					},
				},
			},
			{
				displayName: 'User ID',
				name: 'userId',
				type: 'string',
				default: '',
				description: 'User ID for the blocked slot',
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

const updateBlockSlotProperties: INodeProperties[] = [
	{
		displayName: 'Block Slot ID',
		name: 'blockSlotId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['calendarEvent'],
				operation: ['updateBlockSlot'],
			},
		},
		default: '',
		description: 'ID of the blocked slot to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['calendarEvent'],
				operation: ['updateBlockSlot'],
			},
		},
		options: [
			{
				displayName: 'Start Time',
				name: 'startTime',
				type: 'dateTime',
				default: '',
				description: 'The start time of the blocked slot',
				routing: {
					send: {
						type: 'body',
						property: 'startTime',
					},
				},
			},
			{
				displayName: 'End Time',
				name: 'endTime',
				type: 'dateTime',
				default: '',
				description: 'The end time of the blocked slot',
				routing: {
					send: {
						type: 'body',
						property: 'endTime',
					},
				},
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'Title of the blocked slot',
				routing: {
					send: {
						type: 'body',
						property: 'title',
					},
				},
			},
			{
				displayName: 'User ID',
				name: 'userId',
				type: 'string',
				default: '',
				description: 'User ID for the blocked slot',
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

const getBlockedSlotsProperties: INodeProperties[] = [
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['calendarEvent'],
				operation: ['getBlockedSlots'],
			},
		},
		options: [
			{
				displayName: 'Calendar ID',
				name: 'calendarId',
				type: 'string',
				default: '',
				description: 'Filter by calendar ID',
				routing: {
					send: {
						type: 'query',
						property: 'calendarId',
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
				displayName: 'Start Date',
				name: 'startDate',
				type: 'dateTime',
				default: '',
				description: 'Filter by start date',
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
				type: 'dateTime',
				default: '',
				description: 'Filter by end date',
				routing: {
					send: {
						type: 'query',
						property: 'endDate',
					},
				},
			},
		],
	},
];

const deleteEventProperties: INodeProperties[] = [
	{
		displayName: 'Event ID',
		name: 'eventId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['calendarEvent'],
				operation: ['deleteEvent'],
			},
		},
		default: '',
		description: 'ID of the event to delete',
	},
];

export const calendarEventFields: INodeProperties[] = [
	...createAppointmentProperties,
	...updateAppointmentProperties,
	...getAppointmentProperties,
	...createBlockSlotProperties,
	...updateBlockSlotProperties,
	...getBlockedSlotsProperties,
	...deleteEventProperties,
]; 