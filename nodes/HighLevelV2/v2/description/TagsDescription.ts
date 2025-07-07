import type { INodeProperties } from 'n8n-workflow';

import {
	addLocationIdPreSendAction,
	splitTagsPreSendAction,
} from '../GenericFunctions';

export const tagsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['tags'],
			},
		},
		options: [
			{
				name: 'Add Tags',
				value: 'addTags',
				routing: {
					request: {
						method: 'POST',
						url: '=/contacts/{{$parameter.contactId}}/tags',
					},
					send: {
						preSend: [addLocationIdPreSendAction, splitTagsPreSendAction],
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'contact',
								},
							},
						],
					},
				},
				action: 'Add tags to a contact',
			},
			{
				name: 'Remove Tags',
				value: 'removeTags',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/contacts/{{$parameter.contactId}}/tags',
					},
					send: {
						preSend: [addLocationIdPreSendAction, splitTagsPreSendAction],
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'contact',
								},
							},
						],
					},
				},
				action: 'Remove tags from a contact',
			},
		],
		default: 'addTags',
	},
];

export const tagsFields: INodeProperties[] = [
	// Contact ID - Required for all operations
	{
		displayName: 'Contact ID',
		name: 'contactId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['tags'],
			},
		},
		default: '',
		description: 'ID of the contact to manage tags for',
	},

	// Tags - Required for both operations
	{
		displayName: 'Tags',
		name: 'tags',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['tags'],
				operation: ['addTags', 'removeTags'],
			},
		},
		default: '',
		description: 'Tags to add or remove (comma-separated or array format)',
		routing: {
			send: {
				type: 'body',
				property: 'tags',
			},
		},
	},

	// Additional Fields for Add Tags
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['tags'],
				operation: ['addTags'],
			},
		},
		options: [
			{
				displayName: 'User ID',
				name: 'userId',
				type: 'string',
				default: '',
				description: 'ID of the user adding the tags',
				routing: {
					send: {
						type: 'body',
						property: 'userId',
					},
				},
			},
			{
				displayName: 'Source',
				name: 'source',
				type: 'string',
				default: '',
				description: 'Source of the tag addition (e.g., "workflow", "manual", "form")',
				routing: {
					send: {
						type: 'body',
						property: 'source',
					},
				},
			},
		],
	},

	// Additional Fields for Remove Tags
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['tags'],
				operation: ['removeTags'],
			},
		},
		options: [
			{
				displayName: 'User ID',
				name: 'userId',
				type: 'string',
				default: '',
				description: 'ID of the user removing the tags',
				routing: {
					send: {
						type: 'body',
						property: 'userId',
					},
				},
			},
			{
				displayName: 'Source',
				name: 'source',
				type: 'string',
				default: '',
				description: 'Source of the tag removal (e.g., "workflow", "manual", "cleanup")',
				routing: {
					send: {
						type: 'body',
						property: 'source',
					},
				},
			},
		],
	},
]; 