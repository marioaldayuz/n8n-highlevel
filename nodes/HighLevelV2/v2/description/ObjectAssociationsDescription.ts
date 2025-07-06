import type { INodeProperties } from 'n8n-workflow';

import {
	addLocationIdPreSendAction,
} from '../GenericFunctions';

export const objectAssociationsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['objectAssociations'],
			},
		},
		options: [
			{
				name: 'Create Association',
				value: 'createAssociation',
				routing: {
					request: {
						method: 'POST',
						url: '/associations/',
					},
					send: {
						preSend: [addLocationIdPreSendAction],
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'association',
								},
							},
						],
					},
				},
				action: 'Create a new association between objects',
			},
			{
				name: 'Create Relation',
				value: 'createRelation',
				routing: {
					request: {
						method: 'POST',
						url: '=/associations/{{$parameter.associationId}}/relations',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'relation',
								},
							},
						],
					},
				},
				action: 'Create a relation between associated entities',
			},
			{
				name: 'Delete Association',
				value: 'deleteAssociation',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/associations/{{$parameter.associationId}}',
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
				action: 'Delete an association',
			},
			{
				name: 'Delete Relation',
				value: 'deleteRelation',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/associations/{{$parameter.associationId}}/relations/{{$parameter.relationId}}',
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
				action: 'Delete a relation between associated entities',
			},
			{
				name: 'Get All Associations',
				value: 'getAllAssociations',
				routing: {
					request: {
						method: 'GET',
						url: '/associations/',
					},
					send: {
						preSend: [addLocationIdPreSendAction],
						paginate: true,
					},
				},
				action: 'Get all associations for a location',
			},
			{
				name: 'Get All Relations by Record ID',
				value: 'getAllRelationsByRecordId',
				routing: {
					request: {
						method: 'GET',
						url: '=/associations/{{$parameter.associationId}}/relations',
					},
					send: {
						paginate: true,
					},
				},
				action: 'Get all relations by record ID',
			},
			{
				name: 'Get Association by ID',
				value: 'getAssociationById',
				routing: {
					request: {
						method: 'GET',
						url: '=/associations/{{$parameter.associationId}}',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'association',
								},
							},
						],
					},
				},
				action: 'Get an association by its ID',
			},
			{
				name: 'Get Association by Object Keys',
				value: 'getAssociationByObjectKeys',
				routing: {
					request: {
						method: 'GET',
						url: '=/associations/{{$parameter.fromObjectType}}/{{$parameter.fromObjectId}}/{{$parameter.toObjectType}}/{{$parameter.toObjectId}}',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'association',
								},
							},
						],
					},
				},
				action: 'Get an association by object keys',
			},
			{
				name: 'Get Association Key by Key Name',
				value: 'getAssociationKeyByKeyName',
				routing: {
					request: {
						method: 'GET',
						url: '=/associations/keys/{{$parameter.keyName}}',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'associationKey',
								},
							},
						],
					},
				},
				action: 'Get an association key by its name',
			},
			{
				name: 'Update Association',
				value: 'updateAssociation',
				routing: {
					request: {
						method: 'PUT',
						url: '=/associations/{{$parameter.associationId}}',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'association',
								},
							},
						],
					},
				},
				action: 'Update an association by ID',
			},
		],
		default: 'createAssociation',
	},
];

// Association Operations
const createAssociationProperties: INodeProperties[] = [
	{
		displayName: 'Association Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['objectAssociations'],
				operation: ['createAssociation'],
			},
		},
		default: '',
		description: 'Name of the association',
		routing: {
			send: {
				type: 'body',
				property: 'name',
			},
		},
	},
	{
		displayName: 'From Object Type',
		name: 'fromObjectType',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['objectAssociations'],
				operation: ['createAssociation'],
			},
		},
		default: '',
		description: 'Type of the source object (e.g., contact, opportunity)',
		routing: {
			send: {
				type: 'body',
				property: 'fromObjectType',
			},
		},
	},
	{
		displayName: 'To Object Type',
		name: 'toObjectType',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['objectAssociations'],
				operation: ['createAssociation'],
			},
		},
		default: '',
		description: 'Type of the target object (e.g., contact, opportunity)',
		routing: {
			send: {
				type: 'body',
				property: 'toObjectType',
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
				resource: ['objectAssociations'],
				operation: ['createAssociation'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description of the association',
				routing: {
					send: {
						type: 'body',
						property: 'description',
					},
				},
			},
			{
				displayName: 'Cardinality',
				name: 'cardinality',
				type: 'options',
				options: [
					{
						name: 'One to One',
						value: 'ONE_TO_ONE',
					},
					{
						name: 'One to Many',
						value: 'ONE_TO_MANY',
					},
					{
						name: 'Many to One',
						value: 'MANY_TO_ONE',
					},
					{
						name: 'Many to Many',
						value: 'MANY_TO_MANY',
					},
				],
				default: 'ONE_TO_ONE',
				description: 'Cardinality of the association',
				routing: {
					send: {
						type: 'body',
						property: 'cardinality',
					},
				},
			},
		],
	},
];

const updateAssociationProperties: INodeProperties[] = [
	{
		displayName: 'Association ID',
		name: 'associationId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['objectAssociations'],
				operation: ['updateAssociation'],
			},
		},
		default: '',
		description: 'ID of the association to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['objectAssociations'],
				operation: ['updateAssociation'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Name of the association',
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
				description: 'Description of the association',
				routing: {
					send: {
						type: 'body',
						property: 'description',
					},
				},
			},
			{
				displayName: 'Cardinality',
				name: 'cardinality',
				type: 'options',
				options: [
					{
						name: 'One to One',
						value: 'ONE_TO_ONE',
					},
					{
						name: 'One to Many',
						value: 'ONE_TO_MANY',
					},
					{
						name: 'Many to One',
						value: 'MANY_TO_ONE',
					},
					{
						name: 'Many to Many',
						value: 'MANY_TO_MANY',
					},
				],
				default: 'ONE_TO_ONE',
				description: 'Cardinality of the association',
				routing: {
					send: {
						type: 'body',
						property: 'cardinality',
					},
				},
			},
		],
	},
];

const getAssociationByIdProperties: INodeProperties[] = [
	{
		displayName: 'Association ID',
		name: 'associationId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['objectAssociations'],
				operation: ['getAssociationById'],
			},
		},
		default: '',
		description: 'ID of the association to retrieve',
	},
];

const getAssociationByObjectKeysProperties: INodeProperties[] = [
	{
		displayName: 'From Object Type',
		name: 'fromObjectType',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['objectAssociations'],
				operation: ['getAssociationByObjectKeys'],
			},
		},
		default: '',
		description: 'Type of the source object',
	},
	{
		displayName: 'From Object ID',
		name: 'fromObjectId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['objectAssociations'],
				operation: ['getAssociationByObjectKeys'],
			},
		},
		default: '',
		description: 'ID of the source object',
	},
	{
		displayName: 'To Object Type',
		name: 'toObjectType',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['objectAssociations'],
				operation: ['getAssociationByObjectKeys'],
			},
		},
		default: '',
		description: 'Type of the target object',
	},
	{
		displayName: 'To Object ID',
		name: 'toObjectId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['objectAssociations'],
				operation: ['getAssociationByObjectKeys'],
			},
		},
		default: '',
		description: 'ID of the target object',
	},
];

const getAssociationKeyByKeyNameProperties: INodeProperties[] = [
	{
		displayName: 'Key Name',
		name: 'keyName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['objectAssociations'],
				operation: ['getAssociationKeyByKeyName'],
			},
		},
		default: '',
		description: 'Name of the association key to retrieve',
	},
];

const deleteAssociationProperties: INodeProperties[] = [
	{
		displayName: 'Association ID',
		name: 'associationId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['objectAssociations'],
				operation: ['deleteAssociation'],
			},
		},
		default: '',
		description: 'ID of the association to delete',
	},
];

const getAllAssociationsProperties: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['objectAssociations'],
				operation: ['getAllAssociations'],
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
				resource: ['objectAssociations'],
				operation: ['getAllAssociations'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
		},
		default: 50,
		description: 'Max number of results to return',
	},
];

// Relation Operations
const createRelationProperties: INodeProperties[] = [
	{
		displayName: 'Association ID',
		name: 'associationId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['objectAssociations'],
				operation: ['createRelation'],
			},
		},
		default: '',
		description: 'ID of the association to create relation in',
	},
	{
		displayName: 'From Object ID',
		name: 'fromObjectId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['objectAssociations'],
				operation: ['createRelation'],
			},
		},
		default: '',
		description: 'ID of the source object',
		routing: {
			send: {
				type: 'body',
				property: 'fromObjectId',
			},
		},
	},
	{
		displayName: 'To Object ID',
		name: 'toObjectId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['objectAssociations'],
				operation: ['createRelation'],
			},
		},
		default: '',
		description: 'ID of the target object',
		routing: {
			send: {
				type: 'body',
				property: 'toObjectId',
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
				resource: ['objectAssociations'],
				operation: ['createRelation'],
			},
		},
		options: [
			{
				displayName: 'Metadata',
				name: 'metadata',
				type: 'json',
				default: '{}',
				description: 'Additional metadata for the relation',
				routing: {
					send: {
						type: 'body',
						property: 'metadata',
					},
				},
			},
		],
	},
];

const getAllRelationsByRecordIdProperties: INodeProperties[] = [
	{
		displayName: 'Association ID',
		name: 'associationId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['objectAssociations'],
				operation: ['getAllRelationsByRecordId'],
			},
		},
		default: '',
		description: 'ID of the association to get relations for',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['objectAssociations'],
				operation: ['getAllRelationsByRecordId'],
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
				resource: ['objectAssociations'],
				operation: ['getAllRelationsByRecordId'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
		},
		default: 50,
		description: 'Max number of results to return',
	},
	{
		displayName: 'Filter Options',
		name: 'filterOptions',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['objectAssociations'],
				operation: ['getAllRelationsByRecordId'],
			},
		},
		options: [
			{
				displayName: 'Record ID',
				name: 'recordId',
				type: 'string',
				default: '',
				description: 'ID of the record to filter by',
				routing: {
					send: {
						type: 'query',
						property: 'recordId',
					},
				},
			},
		],
	},
];

const deleteRelationProperties: INodeProperties[] = [
	{
		displayName: 'Association ID',
		name: 'associationId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['objectAssociations'],
				operation: ['deleteRelation'],
			},
		},
		default: '',
		description: 'ID of the association',
	},
	{
		displayName: 'Relation ID',
		name: 'relationId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['objectAssociations'],
				operation: ['deleteRelation'],
			},
		},
		default: '',
		description: 'ID of the relation to delete',
	},
];

export const objectAssociationsFields: INodeProperties[] = [
	...createAssociationProperties,
	...updateAssociationProperties,
	...getAssociationByIdProperties,
	...getAssociationByObjectKeysProperties,
	...getAssociationKeyByKeyNameProperties,
	...deleteAssociationProperties,
	...getAllAssociationsProperties,
	...createRelationProperties,
	...getAllRelationsByRecordIdProperties,
	...deleteRelationProperties,
]; 