import type { INodeProperties } from 'n8n-workflow';

import {
	addLocationIdPreSendAction,
	splitTagsPreSendAction,
} from '../GenericFunctions';

export const conversationOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['conversation'],
			},
		},
		options: [
			// Conversation Operations
			{
				name: 'Get Conversation',
				value: 'getConversation',
				routing: {
					request: {
						method: 'GET',
						url: '=/conversations/{{$parameter.conversationId}}',
					},
					send: {
						preSend: [addLocationIdPreSendAction],
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'conversation',
								},
							},
						],
					},
				},
			},
			{
				name: 'Create Conversation',
				value: 'createConversation',
				routing: {
					request: {
						method: 'POST',
						url: '/conversations',
					},
					send: {
						preSend: [addLocationIdPreSendAction, splitTagsPreSendAction],
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'conversation',
								},
							},
						],
					},
				},
			},
			{
				name: 'Update Conversation',
				value: 'updateConversation',
				routing: {
					request: {
						method: 'PUT',
						url: '=/conversations/{{$parameter.conversationId}}',
					},
					send: {
						preSend: [addLocationIdPreSendAction, splitTagsPreSendAction],
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'conversation',
								},
							},
						],
					},
				},
			},
			{
				name: 'Delete Conversation',
				value: 'deleteConversation',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/conversations/{{$parameter.conversationId}}',
					},
					send: {
						preSend: [addLocationIdPreSendAction],
					},
				},
			},
			{
				name: 'Search Conversations',
				value: 'searchConversations',
				routing: {
					request: {
						method: 'GET',
						url: '/conversations/search',
					},
					send: {
						preSend: [addLocationIdPreSendAction],
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'conversations',
								},
							},
						],
					},
				},
			},

			// Message Operations
			{
				name: 'Get Message',
				value: 'getMessage',
				routing: {
					request: {
						method: 'GET',
						url: '=/conversations/messages/{{$parameter.messageId}}',
					},
					send: {
						preSend: [addLocationIdPreSendAction],
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'message',
								},
							},
						],
					},
				},
			},
			{
				name: 'Send Message',
				value: 'sendMessage',
				routing: {
					request: {
						method: 'POST',
						url: '/conversations/messages',
					},
					send: {
						preSend: [addLocationIdPreSendAction],
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'message',
								},
							},
						],
					},
				},
			},
			{
				name: 'Get Messages by Conversation',
				value: 'getMessagesByConversation',
				routing: {
					request: {
						method: 'GET',
						url: '=/conversations/{{$parameter.conversationId}}/messages',
					},
					send: {
						preSend: [addLocationIdPreSendAction],
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'messages',
								},
							},
						],
					},
				},
			},
			{
				name: 'Add Inbound Message',
				value: 'addInboundMessage',
				routing: {
					request: {
						method: 'POST',
						url: '/conversations/messages/inbound',
					},
					send: {
						preSend: [addLocationIdPreSendAction],
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'message',
								},
							},
						],
					},
				},
			},
			{
				name: 'Add External Outbound Call',
				value: 'addExternalOutboundCall',
				routing: {
					request: {
						method: 'POST',
						url: '/conversations/messages/outbound-call',
					},
					send: {
						preSend: [addLocationIdPreSendAction],
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'call',
								},
							},
						],
					},
				},
			},
			{
				name: 'Update Message Status',
				value: 'updateMessageStatus',
				routing: {
					request: {
						method: 'PUT',
						url: '=/conversations/messages/{{$parameter.messageId}}/status',
					},
					send: {
						preSend: [addLocationIdPreSendAction],
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'message',
								},
							},
						],
					},
				},
			},
			{
				name: 'Cancel Scheduled Message',
				value: 'cancelScheduledMessage',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/conversations/messages/{{$parameter.messageId}}/schedule',
					},
					send: {
						preSend: [addLocationIdPreSendAction],
					},
				},
			},

			// Email Operations
			{
				name: 'Get Email',
				value: 'getEmail',
				routing: {
					request: {
						method: 'GET',
						url: '=/conversations/emails/{{$parameter.emailId}}',
					},
					send: {
						preSend: [addLocationIdPreSendAction],
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'email',
								},
							},
						],
					},
				},
			},
			{
				name: 'Cancel Scheduled Email',
				value: 'cancelScheduledEmail',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/conversations/emails/{{$parameter.emailId}}/schedule',
					},
					send: {
						preSend: [addLocationIdPreSendAction],
					},
				},
			},

			// File Operations
			{
				name: 'Upload File Attachment',
				value: 'uploadFileAttachment',
				routing: {
					request: {
						method: 'POST',
						url: '/conversations/attachments/upload',
					},
					send: {
						preSend: [addLocationIdPreSendAction],
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'attachment',
								},
							},
						],
					},
				},
			},

			// Recording/Transcription Operations
			{
				name: 'Get Recording',
				value: 'getRecording',
				routing: {
					request: {
						method: 'GET',
						url: '=/conversations/messages/{{$parameter.messageId}}/recording',
					},
					send: {
						preSend: [addLocationIdPreSendAction],
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'recording',
								},
							},
						],
					},
				},
			},
			{
				name: 'Get Transcription',
				value: 'getTranscription',
				routing: {
					request: {
						method: 'GET',
						url: '=/conversations/messages/{{$parameter.messageId}}/transcription',
					},
					send: {
						preSend: [addLocationIdPreSendAction],
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'transcription',
								},
							},
						],
					},
				},
			},
			{
				name: 'Download Transcription',
				value: 'downloadTranscription',
				routing: {
					request: {
						method: 'GET',
						url: '=/conversations/messages/{{$parameter.messageId}}/transcription/download',
					},
					send: {
						preSend: [addLocationIdPreSendAction],
					},
				},
			},
		],
		default: 'getConversation',
	},
];

export const conversationFields: INodeProperties[] = [
	// Common ID Fields
	{
		displayName: 'Conversation ID',
		name: 'conversationId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['getConversation', 'updateConversation', 'deleteConversation', 'getMessagesByConversation'],
			},
		},
		default: '',
		description: 'ID of the conversation',
	},
	{
		displayName: 'Message ID',
		name: 'messageId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['getMessage', 'updateMessageStatus', 'cancelScheduledMessage', 'getRecording', 'getTranscription', 'downloadTranscription'],
			},
		},
		default: '',
		description: 'ID of the message',
	},
	{
		displayName: 'Email ID',
		name: 'emailId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['getEmail', 'cancelScheduledEmail'],
			},
		},
		default: '',
		description: 'ID of the email',
	},

	// Create Conversation Fields
	{
		displayName: 'Contact ID',
		name: 'contactId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['createConversation'],
			},
		},
		default: '',
		description: 'Contact ID to create conversation with',
	},
	{
		displayName: 'Type',
		name: 'type',
		type: 'options',
		options: [
			{
				name: 'SMS',
				value: 'SMS',
			},
			{
				name: 'Email',
				value: 'Email',
			},
			{
				name: 'WhatsApp',
				value: 'WhatsApp',
			},
			{
				name: 'Phone',
				value: 'Phone',
			},
			{
				name: 'Voicemail',
				value: 'Voicemail',
			},
			{
				name: 'Chat',
				value: 'Chat',
			},
			{
				name: 'Review',
				value: 'Review',
			},
			{
				name: 'Facebook',
				value: 'Facebook',
			},
			{
				name: 'Instagram',
				value: 'Instagram',
			},
		],
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['createConversation', 'sendMessage', 'addInboundMessage'],
			},
		},
		default: 'SMS',
		description: 'Type of conversation or message',
	},

	// Update Conversation Fields
	{
		displayName: 'Status',
		name: 'status',
		type: 'options',
		options: [
			{
				name: 'Open',
				value: 'open',
			},
			{
				name: 'Closed',
				value: 'closed',
			},
			{
				name: 'Archived',
				value: 'archived',
			},
		],
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['createConversation', 'updateConversation'],
			},
		},
		default: 'open',
		description: 'Status of the conversation',
	},
	{
		displayName: 'Assigned To',
		name: 'assignedTo',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['createConversation', 'updateConversation'],
			},
		},
		default: '',
		description: 'User ID to assign the conversation to',
	},
	{
		displayName: 'Tags',
		name: 'tags',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['createConversation', 'updateConversation'],
			},
		},
		default: '',
		description: 'Comma-separated list of tags for the conversation',
	},

	// Search Conversations Fields
	{
		displayName: 'Search Query',
		name: 'searchQuery',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['searchConversations'],
			},
		},
		default: '',
		description: 'Search query to find conversations',
	},
	{
		displayName: 'Contact ID Filter',
		name: 'contactId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['searchConversations'],
			},
		},
		default: '',
		description: 'Filter by contact ID',
	},
	{
		displayName: 'Type Filter',
		name: 'typeFilter',
		type: 'options',
		options: [
			{
				name: 'All',
				value: 'all',
			},
			{
				name: 'SMS',
				value: 'SMS',
			},
			{
				name: 'Email',
				value: 'Email',
			},
			{
				name: 'WhatsApp',
				value: 'WhatsApp',
			},
			{
				name: 'Phone',
				value: 'Phone',
			},
			{
				name: 'Voicemail',
				value: 'Voicemail',
			},
			{
				name: 'Chat',
				value: 'Chat',
			},
			{
				name: 'Review',
				value: 'Review',
			},
			{
				name: 'Facebook',
				value: 'Facebook',
			},
			{
				name: 'Instagram',
				value: 'Instagram',
			},
		],
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['searchConversations'],
			},
		},
		default: 'all',
		description: 'Filter conversations by type',
	},
	{
		displayName: 'Status Filter',
		name: 'statusFilter',
		type: 'options',
		options: [
			{
				name: 'All',
				value: 'all',
			},
			{
				name: 'Open',
				value: 'open',
			},
			{
				name: 'Closed',
				value: 'closed',
			},
			{
				name: 'Archived',
				value: 'archived',
			},
		],
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['searchConversations'],
			},
		},
		default: 'all',
		description: 'Filter conversations by status',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['searchConversations', 'getMessagesByConversation'],
			},
		},
		default: 20,
		description: 'Maximum number of results to return',
	},
	{
		displayName: 'Offset',
		name: 'offset',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['searchConversations', 'getMessagesByConversation'],
			},
		},
		default: 0,
		description: 'Number of results to skip',
	},

	// Send Message Fields
	{
		displayName: 'Conversation ID',
		name: 'conversationId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['sendMessage'],
			},
		},
		default: '',
		description: 'ID of the conversation to send message to',
	},
	{
		displayName: 'Contact ID',
		name: 'contactId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['sendMessage', 'addInboundMessage', 'addExternalOutboundCall'],
			},
		},
		default: '',
		description: 'Contact ID to send message to',
	},
	{
		displayName: 'Message Body',
		name: 'body',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['sendMessage', 'addInboundMessage'],
			},
		},
		default: '',
		description: 'Content of the message',
	},
	{
		displayName: 'Subject',
		name: 'subject',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['sendMessage', 'addInboundMessage'],
				type: ['Email'],
			},
		},
		default: '',
		description: 'Subject line for email messages',
	},
	{
		displayName: 'From',
		name: 'from',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['sendMessage', 'addInboundMessage'],
			},
		},
		default: '',
		description: 'Sender information',
	},
	{
		displayName: 'To',
		name: 'to',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['sendMessage', 'addInboundMessage', 'addExternalOutboundCall'],
			},
		},
		default: '',
		description: 'Recipient information',
	},
	{
		displayName: 'Scheduled Date',
		name: 'scheduledDate',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['sendMessage'],
			},
		},
		default: '',
		description: 'Schedule the message for later sending',
	},

	// Update Message Status Fields
	{
		displayName: 'New Status',
		name: 'newStatus',
		type: 'options',
		options: [
			{
				name: 'Sent',
				value: 'sent',
			},
			{
				name: 'Delivered',
				value: 'delivered',
			},
			{
				name: 'Read',
				value: 'read',
			},
			{
				name: 'Failed',
				value: 'failed',
			},
			{
				name: 'Pending',
				value: 'pending',
			},
			{
				name: 'Cancelled',
				value: 'cancelled',
			},
			{
				name: 'Opened',
				value: 'opened',
			},
			{
				name: 'Clicked',
				value: 'clicked',
			},
			{
				name: 'Bounced',
				value: 'bounced',
			},
		],
		required: true,
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['updateMessageStatus'],
			},
		},
		default: 'delivered',
		description: 'New status for the message',
	},
	{
		displayName: 'Status Reason',
		name: 'statusReason',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['updateMessageStatus'],
			},
		},
		default: '',
		description: 'Reason for the status change',
	},
	{
		displayName: 'Error Message',
		name: 'errorMessage',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['updateMessageStatus'],
				newStatus: ['failed'],
			},
		},
		default: '',
		description: 'Error message if status is failed',
	},

	// External Outbound Call Fields
	{
		displayName: 'From Phone',
		name: 'fromPhone',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['addExternalOutboundCall'],
			},
		},
		default: '',
		description: 'Caller phone number',
	},
	{
		displayName: 'To Phone',
		name: 'toPhone',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['addExternalOutboundCall'],
			},
		},
		default: '',
		description: 'Called phone number',
	},
	{
		displayName: 'Call Status',
		name: 'callStatus',
		type: 'options',
		options: [
			{
				name: 'Completed',
				value: 'completed',
			},
			{
				name: 'Failed',
				value: 'failed',
			},
			{
				name: 'Busy',
				value: 'busy',
			},
			{
				name: 'No Answer',
				value: 'no-answer',
			},
			{
				name: 'In Progress',
				value: 'in-progress',
			},
		],
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['addExternalOutboundCall'],
			},
		},
		default: 'completed',
		description: 'Status of the call',
	},
	{
		displayName: 'Duration (seconds)',
		name: 'duration',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['addExternalOutboundCall'],
			},
		},
		default: 0,
		description: 'Call duration in seconds',
	},
	{
		displayName: 'Recording URL',
		name: 'recordingUrl',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['addExternalOutboundCall'],
			},
		},
		default: '',
		description: 'URL to call recording (if available)',
	},
	{
		displayName: 'Call Cost',
		name: 'cost',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['addExternalOutboundCall'],
			},
		},
		default: 0,
		description: 'Call cost in system currency',
	},
	{
		displayName: 'Call Notes',
		name: 'notes',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['addExternalOutboundCall'],
			},
		},
		default: '',
		description: 'Call notes or description',
	},
	{
		displayName: 'Started At',
		name: 'startedAt',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['addExternalOutboundCall'],
			},
		},
		default: '',
		description: 'When the call started',
	},
	{
		displayName: 'Ended At',
		name: 'endedAt',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['addExternalOutboundCall'],
			},
		},
		default: '',
		description: 'When the call ended',
	},

	// File Upload Fields
	{
		displayName: 'File',
		name: 'file',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['uploadFileAttachment'],
			},
		},
		default: '',
		description: 'File to upload (base64 encoded or file path)',
	},
	{
		displayName: 'Filename',
		name: 'filename',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['uploadFileAttachment'],
			},
		},
		default: '',
		description: 'Original filename of the file',
	},
	{
		displayName: 'MIME Type',
		name: 'mimeType',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['uploadFileAttachment'],
			},
		},
		default: '',
		description: 'MIME type of the file',
	},

	// Transcription Download Fields
	{
		displayName: 'Format',
		name: 'format',
		type: 'options',
		options: [
			{
				name: 'Text',
				value: 'txt',
			},
			{
				name: 'JSON',
				value: 'json',
			},
			{
				name: 'SRT',
				value: 'srt',
			},
			{
				name: 'VTT',
				value: 'vtt',
			},
			{
				name: 'Word Document',
				value: 'docx',
			},
			{
				name: 'PDF',
				value: 'pdf',
			},
		],
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['downloadTranscription'],
			},
		},
		default: 'txt',
		description: 'Format for transcription download',
	},

	// Additional Options
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['createConversation', 'updateConversation', 'sendMessage', 'addInboundMessage'],
			},
		},
		options: [
			{
				displayName: 'Custom Fields',
				name: 'customFields',
				type: 'fixedCollection',
				description: 'Custom fields for the conversation or message',
				default: {},
				typeOptions: {
					multipleValues: true,
				},
				options: [
					{
						name: 'values',
						displayName: 'Custom Field',
						values: [
							{
								displayName: 'Field Name',
								name: 'name',
								type: 'string',
								default: '',
								description: 'Name of the custom field',
							},
							{
								displayName: 'Field Value',
								name: 'value',
								type: 'string',
								default: '',
								description: 'Value of the custom field',
							},
						],
					},
				],
			},
			{
				displayName: 'Metadata',
				name: 'metadata',
				type: 'json',
				default: '{}',
				description: 'Additional metadata as JSON object',
			},
		],
	},
]; 