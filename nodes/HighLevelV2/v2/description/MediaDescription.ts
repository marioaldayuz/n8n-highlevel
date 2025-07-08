import type { INodeProperties } from 'n8n-workflow';

import {
	addLocationIdPreSendAction,
} from '../GenericFunctions';

export const mediaOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['media'],
			},
		},
		options: [
			{
				name: 'Get List of Files',
				value: 'getFiles',
				routing: {
					request: {
						method: 'GET',
						url: '/media/',
					},
					send: {
						preSend: [addLocationIdPreSendAction],
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'files',
								},
							},
						],
					},
				},
				action: 'Get a list of all files in the media library',
			},
			{
				name: 'Upload File',
				value: 'uploadFile',
				routing: {
					request: {
						method: 'POST',
						url: '/media/upload-file',
					},
					send: {
						preSend: [addLocationIdPreSendAction],
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'file',
								},
							},
						],
					},
				},
				action: 'Upload a file to the media library',
			},
			{
				name: 'Delete File or Folder',
				value: 'deleteFile',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/media/{{$parameter.fileId}}',
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
				action: 'Delete a file or folder from the media library',
			},
		],
		default: 'getFiles',
	},
];

export const mediaFields: INodeProperties[] = [
	// Get Files Operation Fields
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['media'],
				operation: ['getFiles'],
			},
		},
		options: [
			{
				displayName: 'Folder ID',
				name: 'folderId',
				type: 'string',
				default: '',
				description: 'ID of the folder to get files from. Leave empty for root folder.',
				routing: {
					send: {
						type: 'query',
						property: 'folderId',
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
				description: 'Max number of results to return',
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
				description: 'Number of files to skip',
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
				description: 'Search term to filter files',
				routing: {
					send: {
						type: 'query',
						property: 'search',
					},
				},
			},
			{
				displayName: 'Sort By',
				name: 'sortBy',
				type: 'options',
				options: [
					{
						name: 'Name',
						value: 'name',
					},
					{
						name: 'Date Created',
						value: 'createdAt',
					},
					{
						name: 'Date Modified',
						value: 'updatedAt',
					},
					{
						name: 'Size',
						value: 'size',
					},
				],
				default: 'name',
				description: 'Sort files by specified field',
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
				description: 'Sort order for files',
				routing: {
					send: {
						type: 'query',
						property: 'sortOrder',
					},
				},
			},
		],
	},

	// Upload File Operation Fields
	{
		displayName: 'File Data',
		name: 'fileData',
		type: 'string',
		typeOptions: {
			rows: 4,
		},
		required: true,
		displayOptions: {
			show: {
				resource: ['media'],
				operation: ['uploadFile'],
			},
		},
		default: '',
		description: 'The file data to upload (base64 encoded)',
		routing: {
			send: {
				type: 'body',
				property: 'fileData',
			},
		},
	},
	{
		displayName: 'File Name',
		name: 'fileName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['media'],
				operation: ['uploadFile'],
			},
		},
		default: '',
		description: 'Name of the file to upload',
		routing: {
			send: {
				type: 'body',
				property: 'fileName',
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
				resource: ['media'],
				operation: ['uploadFile'],
			},
		},
		options: [
			{
				displayName: 'Folder ID',
				name: 'folderId',
				type: 'string',
				default: '',
				description: 'ID of the folder to upload file to. Leave empty for root folder.',
				routing: {
					send: {
						type: 'body',
						property: 'folderId',
					},
				},
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description of the file',
				routing: {
					send: {
						type: 'body',
						property: 'description',
					},
				},
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'string',
				default: '',
				description: 'Tags for the file (comma-separated)',
				routing: {
					send: {
						type: 'body',
						property: 'tags',
					},
				},
			},
			{
				displayName: 'Is Public',
				name: 'isPublic',
				type: 'boolean',
				default: false,
				description: 'Whether the file should be publicly accessible',
				routing: {
					send: {
						type: 'body',
						property: 'isPublic',
					},
				},
			},
		],
	},

	// Delete File Operation Fields
	{
		displayName: 'File ID',
		name: 'fileId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['media'],
				operation: ['deleteFile'],
			},
		},
		default: '',
		description: 'ID of the file or folder to delete',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['media'],
				operation: ['deleteFile'],
			},
		},
		options: [
			{
				displayName: 'Force Delete',
				name: 'forceDelete',
				type: 'boolean',
				default: false,
				description: 'Whether to force delete the file even if it is referenced elsewhere',
				routing: {
					send: {
						type: 'query',
						property: 'forceDelete',
					},
				},
			},
		],
	},
]; 