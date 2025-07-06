import type { INodeProperties } from 'n8n-workflow';

import {
	addLocationIdPreSendAction,
	addCompanyIdPreSendAction,
} from '../GenericFunctions';

export const saasOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['saas'],
			},
		},
		options: [
			{
				name: 'Get Locations by Stripe ID',
				value: 'getLocationsByStripeId',
				routing: {
					request: {
						method: 'GET',
						url: '/saas/locations/stripe',
					},
					send: {
						preSend: [addCompanyIdPreSendAction],
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'locations',
								},
							},
						],
					},
				},
			},
			{
				name: 'Update SaaS Subscription',
				value: 'updateSubscription',
				routing: {
					request: {
						method: 'PUT',
						url: '/saas/subscription',
					},
					send: {
						preSend: [addLocationIdPreSendAction],
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'subscription',
								},
							},
						],
					},
				},
			},
			{
				name: 'Disable SaaS for Locations',
				value: 'disableSaas',
				routing: {
					request: {
						method: 'POST',
						url: '/saas/locations/disable',
					},
					send: {
						preSend: [addLocationIdPreSendAction],
					},
				},
			},
			{
				name: 'Enable SaaS for Sub-Account',
				value: 'enableSaas',
				routing: {
					request: {
						method: 'POST',
						url: '/saas/locations/enable',
					},
					send: {
						preSend: [addLocationIdPreSendAction],
					},
				},
			},
			{
				name: 'Pause Location',
				value: 'pauseLocation',
				routing: {
					request: {
						method: 'POST',
						url: '/saas/locations/pause',
					},
					send: {
						preSend: [addLocationIdPreSendAction],
					},
				},
			},
			{
				name: 'Update Rebilling',
				value: 'updateRebilling',
				routing: {
					request: {
						method: 'PUT',
						url: '/saas/rebilling',
					},
					send: {
						preSend: [addLocationIdPreSendAction],
					},
				},
			},
			{
				name: 'Get Agency Plans',
				value: 'getAgencyPlans',
				routing: {
					request: {
						method: 'GET',
						url: '/saas/plans',
					},
					send: {
						preSend: [addCompanyIdPreSendAction],
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'plans',
								},
							},
						],
					},
				},
			},
			{
				name: 'Get Location Subscription Details',
				value: 'getLocationSubscriptionDetails',
				routing: {
					request: {
						method: 'GET',
						url: '/saas/subscription/details',
					},
					send: {
						preSend: [addLocationIdPreSendAction],
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'subscription',
								},
							},
						],
					},
				},
			},
			{
				name: 'Bulk Enable SaaS',
				value: 'bulkEnableSaas',
				routing: {
					request: {
						method: 'POST',
						url: '/saas/bulk/enable',
					},
					send: {
						preSend: [addCompanyIdPreSendAction],
					},
				},
			},
			{
				name: 'Get SaaS Locations',
				value: 'getSaasLocations',
				routing: {
					request: {
						method: 'GET',
						url: '/saas/locations',
					},
					send: {
						preSend: [addCompanyIdPreSendAction],
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'locations',
								},
							},
						],
					},
				},
			},
			{
				name: 'Get SaaS Plan',
				value: 'getSaasPlan',
				routing: {
					request: {
						method: 'GET',
						url: '/saas/plan',
					},
					send: {
						preSend: [addCompanyIdPreSendAction],
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'plan',
								},
							},
						],
					},
				},
			},
		],
		default: 'getLocationsByStripeId',
	},
];

export const saasFields: INodeProperties[] = [
	// Get Locations by Stripe ID Fields
	{
		displayName: 'Stripe Customer ID',
		name: 'stripeCustomerId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['saas'],
				operation: ['getLocationsByStripeId'],
			},
		},
		default: '',
		description: 'Stripe customer ID to search for locations',
	},
	{
		displayName: 'Company ID',
		name: 'companyId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['saas'],
				operation: ['getLocationsByStripeId'],
			},
		},
		default: '',
		description: 'Company ID to filter locations',
	},

	// Update SaaS Subscription Fields
	{
		displayName: 'Subscription ID',
		name: 'subscriptionId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['saas'],
				operation: ['updateSubscription'],
			},
		},
		default: '',
		description: 'ID of the subscription to update',
	},
	{
		displayName: 'Plan ID',
		name: 'planId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['saas'],
				operation: ['updateSubscription'],
			},
		},
		default: '',
		description: 'New plan ID for the subscription',
	},
	{
		displayName: 'Status',
		name: 'status',
		type: 'options',
		options: [
			{
				name: 'Active',
				value: 'active',
			},
			{
				name: 'Paused',
				value: 'paused',
			},
			{
				name: 'Cancelled',
				value: 'cancelled',
			},
			{
				name: 'Past Due',
				value: 'past_due',
			},
			{
				name: 'Unpaid',
				value: 'unpaid',
			},
		],
		displayOptions: {
			show: {
				resource: ['saas'],
				operation: ['updateSubscription'],
			},
		},
		default: 'active',
		description: 'New status for the subscription',
	},
	{
		displayName: 'Cancel at Period End',
		name: 'cancelAtPeriodEnd',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['saas'],
				operation: ['updateSubscription'],
			},
		},
		default: false,
		description: 'Whether to cancel the subscription at the end of the current period',
	},

	// Disable SaaS Fields
	{
		displayName: 'Location IDs',
		name: 'locationIds',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['saas'],
				operation: ['disableSaas'],
			},
		},
		default: '',
		description: 'Comma-separated list of location IDs to disable SaaS for',
	},

	// Enable SaaS Fields
	{
		displayName: 'Location ID',
		name: 'locationId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['saas'],
				operation: ['enableSaas'],
			},
		},
		default: '',
		description: 'Location ID to enable SaaS for',
	},
	{
		displayName: 'Plan ID',
		name: 'planId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['saas'],
				operation: ['enableSaas'],
			},
		},
		default: '',
		description: 'SaaS plan ID to assign to the location',
	},
	{
		displayName: 'Trial Days',
		name: 'trialDays',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['saas'],
				operation: ['enableSaas'],
			},
		},
		default: 0,
		description: 'Number of trial days to provide',
	},

	// Pause Location Fields
	{
		displayName: 'Location ID',
		name: 'locationId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['saas'],
				operation: ['pauseLocation'],
			},
		},
		default: '',
		description: 'Location ID to pause',
	},
	{
		displayName: 'Pause Reason',
		name: 'pauseReason',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['saas'],
				operation: ['pauseLocation'],
			},
		},
		default: '',
		description: 'Reason for pausing the location',
	},

	// Update Rebilling Fields
	{
		displayName: 'Location ID',
		name: 'locationId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['saas'],
				operation: ['updateRebilling'],
			},
		},
		default: '',
		description: 'Location ID to update rebilling settings for',
	},
	{
		displayName: 'Enabled',
		name: 'enabled',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['saas'],
				operation: ['updateRebilling'],
			},
		},
		default: true,
		description: 'Whether rebilling is enabled',
	},
	{
		displayName: 'Markup Percentage',
		name: 'markupPercentage',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['saas'],
				operation: ['updateRebilling'],
			},
		},
		default: 0,
		description: 'Markup percentage for rebilling',
	},
	{
		displayName: 'Minimum Charge',
		name: 'minimumCharge',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['saas'],
				operation: ['updateRebilling'],
			},
		},
		default: 0,
		description: 'Minimum charge amount',
	},
	{
		displayName: 'Auto Recharge',
		name: 'autoRecharge',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['saas'],
				operation: ['updateRebilling'],
			},
		},
		default: false,
		description: 'Whether automatic recharge is enabled',
	},
	{
		displayName: 'Recharge Threshold',
		name: 'rechargeThreshold',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['saas'],
				operation: ['updateRebilling'],
				autoRecharge: [true],
			},
		},
		default: 0,
		description: 'Threshold amount for automatic recharge',
	},
	{
		displayName: 'Recharge Amount',
		name: 'rechargeAmount',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['saas'],
				operation: ['updateRebilling'],
				autoRecharge: [true],
			},
		},
		default: 0,
		description: 'Amount to recharge when threshold is reached',
	},

	// Get Agency Plans Fields
	{
		displayName: 'Company ID',
		name: 'companyId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['saas'],
				operation: ['getAgencyPlans'],
			},
		},
		default: '',
		description: 'Company ID to get plans for',
	},
	{
		displayName: 'Status Filter',
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
			{
				name: 'Archived',
				value: 'archived',
			},
		],
		displayOptions: {
			show: {
				resource: ['saas'],
				operation: ['getAgencyPlans'],
			},
		},
		default: 'all',
		description: 'Filter plans by status',
	},

	// Get Location Subscription Details Fields
	{
		displayName: 'Location ID',
		name: 'locationId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['saas'],
				operation: ['getLocationSubscriptionDetails'],
			},
		},
		default: '',
		description: 'Location ID to get subscription details for',
	},

	// Bulk Enable SaaS Fields
	{
		displayName: 'Location IDs',
		name: 'locationIds',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['saas'],
				operation: ['bulkEnableSaas'],
			},
		},
		default: '',
		description: 'Comma-separated list of location IDs to enable SaaS for',
	},
	{
		displayName: 'Plan ID',
		name: 'planId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['saas'],
				operation: ['bulkEnableSaas'],
			},
		},
		default: '',
		description: 'SaaS plan ID to assign to all locations',
	},
	{
		displayName: 'Trial Days',
		name: 'trialDays',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['saas'],
				operation: ['bulkEnableSaas'],
			},
		},
		default: 0,
		description: 'Number of trial days to provide for all locations',
	},

	// Get SaaS Locations Fields
	{
		displayName: 'Company ID',
		name: 'companyId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['saas'],
				operation: ['getSaasLocations'],
			},
		},
		default: '',
		description: 'Company ID to get SaaS locations for',
	},
	{
		displayName: 'Status Filter',
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
				name: 'Paused',
				value: 'paused',
			},
			{
				name: 'Cancelled',
				value: 'cancelled',
			},
			{
				name: 'Trial',
				value: 'trial',
			},
			{
				name: 'Suspended',
				value: 'suspended',
			},
		],
		displayOptions: {
			show: {
				resource: ['saas'],
				operation: ['getSaasLocations'],
			},
		},
		default: 'all',
		description: 'Filter locations by status',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['saas'],
				operation: ['getSaasLocations'],
			},
		},
		default: 50,
		description: 'Maximum number of locations to return',
	},
	{
		displayName: 'Offset',
		name: 'offset',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['saas'],
				operation: ['getSaasLocations'],
			},
		},
		default: 0,
		description: 'Number of locations to skip',
	},

	// Get SaaS Plan Fields
	{
		displayName: 'Plan ID',
		name: 'planId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['saas'],
				operation: ['getSaasPlan'],
			},
		},
		default: '',
		description: 'SaaS plan ID to get details for',
	},
	{
		displayName: 'Company ID',
		name: 'companyId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['saas'],
				operation: ['getSaasPlan'],
			},
		},
		default: '',
		description: 'Company ID that owns the plan',
	},
	{
		displayName: 'Include Analytics',
		name: 'includeAnalytics',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['saas'],
				operation: ['getSaasPlan'],
			},
		},
		default: false,
		description: 'Whether to include analytics data in the response',
	},
]; 